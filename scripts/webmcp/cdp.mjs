#!/usr/bin/env node
/**
 * Minimal Chrome DevTools Protocol driver for the WebMCP checks.
 *
 * Start an isolated Chrome first, for example:
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
 *     --user-data-dir=/tmp/webmcp-profile --remote-debugging-port=9334 \
 *     --enable-features=WebMCP --no-first-run about:blank
 *
 * Then:
 *   CDP_PORT=9334 node scripts/webmcp/cdp.mjs <url> <check-file> [waitMs]
 *   CDP_PORT=9334 node scripts/webmcp/cdp.mjs --close-browser
 *
 * Optional environment:
 *   CHECK_ARGS='{"submit":true}'  exposed to the check as globalThis.__webmcpCheckArgs
 *   SCREENSHOT=/tmp/page.png      saves a viewport screenshot after the check
 *   VIEWPORT=1280x900             viewport for the page
 *   VERBOSE=1                     prints page console errors
 *   KEYS=Tab,Enter                real key presses sent while the check runs
 *   KEYS_DELAY_MS=3000            when to send them, after the check starts
 *
 * Every page opened by this driver sets sessionStorage["flowo:webmcp-teste"]="1",
 * so its calls are marked as tests in the usage counter.
 * The process exits with 1 when the check returns { ok: false } or fails.
 */
import { readFile, writeFile } from "node:fs/promises";

const port = Number(process.env.CDP_PORT || 9333);
const [, , target, checkFile, waitArg] = process.argv;

class CdpConnection {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(`${message.error.message} (${message.error.code})`));
        else resolve(message.result);
        return;
      }
      for (const listener of this.listeners.get(message.method) ?? []) listener(message.params, message.sessionId);
    });
  }

  static async open(url) {
    const socket = new WebSocket(url);
    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    });
    return new CdpConnection(socket);
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  on(method, listener) {
    const list = this.listeners.get(method) ?? [];
    list.push(listener);
    this.listeners.set(method, list);
  }

  waitFor(method, sessionId, timeoutMs) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`timeout waiting for ${method}`)), timeoutMs);
      this.on(method, (params, eventSession) => {
        if (sessionId && eventSession !== sessionId) return;
        clearTimeout(timer);
        resolve(params);
      });
    });
  }

  close() {
    this.socket.close();
  }
}

async function browserSocketUrl() {
  const response = await fetch(`http://127.0.0.1:${port}/json/version`);
  if (!response.ok) throw new Error(`Chrome is not listening on port ${port}`);
  return (await response.json()).webSocketDebuggerUrl;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const KEY_CODES = { Tab: 9, Enter: 13, Escape: 27, " ": 32 };

async function pressKey(cdp, sessionId, key) {
  const code = KEY_CODES[key];
  if (!code) throw new Error(`Unsupported key: ${key}`);
  const base = { key, code: key === " " ? "Space" : key, windowsVirtualKeyCode: code, nativeVirtualKeyCode: code };
  await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", ...base, ...(key === "Enter" ? { text: "\r" } : {}) }, sessionId);
  await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", ...base }, sessionId);
}

async function closeBrowser() {
  const cdp = await CdpConnection.open(await browserSocketUrl());
  await cdp.send("Browser.close").catch(() => undefined);
  cdp.close();
  console.log(JSON.stringify({ ok: true, closed: true }));
}

async function runCheck() {
  if (!target || !checkFile) {
    console.error("Usage: CDP_PORT=9334 node scripts/webmcp/cdp.mjs <url> <check-file> [waitMs]");
    process.exit(2);
  }
  const waitMs = Number(waitArg || 3000);
  const check = await readFile(checkFile, "utf8");
  const checkArgs = process.env.CHECK_ARGS ? JSON.parse(process.env.CHECK_ARGS) : {};
  const cdp = await CdpConnection.open(await browserSocketUrl());
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const consoleErrors = [];
  cdp.on("Runtime.exceptionThrown", (params, eventSession) => {
    if (eventSession === sessionId) consoleErrors.push(params.exceptionDetails?.exception?.description ?? params.exceptionDetails?.text);
  });
  cdp.on("Runtime.consoleAPICalled", (params, eventSession) => {
    if (eventSession === sessionId && params.type === "error") {
      consoleErrors.push(params.args.map((arg) => arg.value ?? arg.description ?? "").join(" "));
    }
  });

  let exitCode = 1;
  try {
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);
    const [width, height] = (process.env.VIEWPORT || "1280x900").split("x").map(Number);
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 }, sessionId);
    await cdp.send(
      "Page.addScriptToEvaluateOnNewDocument",
      {
        source: `try { sessionStorage.setItem("flowo:webmcp-teste", "1"); } catch {}
globalThis.__webmcpCheckArgs = ${JSON.stringify(checkArgs)};`,
      },
      sessionId,
    );
    const loaded = cdp.waitFor("Page.loadEventFired", sessionId, 60_000);
    await cdp.send("Page.navigate", { url: target }, sessionId);
    await loaded;
    await sleep(waitMs);

    const evaluationPromise = cdp.send(
      "Runtime.evaluate",
      { expression: check, awaitPromise: true, returnByValue: true, userGesture: true },
      sessionId,
    );
    if (process.env.KEYS) {
      await sleep(Number(process.env.KEYS_DELAY_MS || 3000));
      for (const key of process.env.KEYS.split(",").map((item) => item.trim()).filter(Boolean)) {
        await pressKey(cdp, sessionId, key);
        await sleep(300);
      }
    }
    const evaluation = await evaluationPromise;
    if (evaluation.exceptionDetails) {
      console.log(JSON.stringify({ ok: false, exception: evaluation.exceptionDetails.exception?.description ?? evaluation.exceptionDetails.text }, null, 2));
    } else {
      const value = evaluation.result.value;
      console.log(JSON.stringify(value, null, 2));
      exitCode = value && value.ok === false ? 1 : 0;
    }

    if (process.env.SCREENSHOT) {
      const shot = await cdp.send("Page.captureScreenshot", { format: "png" }, sessionId);
      await writeFile(process.env.SCREENSHOT, Buffer.from(shot.data, "base64"));
    }
    if (process.env.VERBOSE && consoleErrors.length) {
      console.error(JSON.stringify({ consoleErrors }, null, 2));
    }
  } finally {
    await cdp.send("Target.closeTarget", { targetId }).catch(() => undefined);
    cdp.close();
  }
  process.exit(exitCode);
}

if (target === "--close-browser") await closeBrowser();
else await runCheck();
