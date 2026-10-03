// The visitor's confirmation for a contact request made by an AI assistant.
// All approvals and cancels use real input sent by the driver (CDP mouse/keyboard).
// CHECK_ARGS='{"mode":"approve"}'    real click on "Autorizar e enviar"; one request (optional "expect": outcome).
// CHECK_ARGS='{"mode":"keyboard"}'   real Tab then Enter from "Cancelar"; one request.
// CHECK_ARGS='{"mode":"cancel"}'     real click on "Cancelar"; nothing is sent.
// CHECK_ARGS='{"mode":"escape"}'     focus leaves the panel, then a real Escape; nothing is sent.
// CHECK_ARGS='{"mode":"synthetic"}'  a script calls .click() on "Autorizar e enviar"; it must not send.
// CHECK_ARGS='{"mode":"timeout"}'    waits for the 90 s limit; nothing is sent.
// CHECK_ARGS='{"mode":"show"}'       leaves the panel open, for a screenshot.
(async () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const args = globalThis.__webmcpCheckArgs || {};
  const mode = args.mode || "cancel";
  const realInput = globalThis.__webmcpRealInput;
  const mc = document.modelContext;
  if (!mc) return { ok: false, problems: ["document.modelContext is missing"] };
  if (!realInput) return { ok: false, problems: ["run this check through scripts/webmcp/cdp.mjs"] };
  const tool = (await mc.getTools()).find((item) => item.name === "falar_com_vendas");
  const findDialog = () => document.querySelector('[role="dialog"][aria-labelledby="agent-confirmation-title"]');
  const leadRequests = () =>
    performance.getEntriesByType("resource").filter((entry) => entry.name.includes("/api/lead-capture")).length;
  const button = (dialog, label) =>
    Array.from(dialog.querySelectorAll("button")).find((item) => item.textContent.trim() === label);
  const stamp = Date.now().toString(36);
  // Reserved test number (+1 555 ...), unique per run: the backend refuses the same contact twice in a row.
  const testPhone = `+1555${String(Date.now() % 10_000_000).padStart(7, "0")}`;
  const email = `flowo-qa-webmcp-confirm-${stamp}@flowo.com.br`;
  const problems = [];

  // Something on the page has focus before the assistant asks; it gets focus back afterwards.
  const before = Array.from(document.querySelectorAll("a[href]")).find((item) => item.offsetParent !== null);
  before?.focus();

  performance.clearResourceTimings();
  const pending = mc
    .executeTool(
      tool,
      JSON.stringify({
        nome: "Teste WebMCP",
        whatsapp: testPhone,
        email,
        nome_barbearia: "Barbearia Teste WebMCP",
        mensagem: "",
        consentimento: true,
      }),
    )
    .then((raw) => (typeof raw === "string" ? JSON.parse(raw) : raw));

  let dialog = null;
  for (let waited = 0; waited < 5000 && !dialog; waited += 100) {
    dialog = findDialog();
    if (!dialog) await sleep(100);
  }
  if (!dialog) return { ok: false, problems: ["the confirmation panel did not appear"] };
  const approveDisabledAtFirst = button(dialog, "Autorizar e enviar").disabled;
  await sleep(300);

  const panelText = dialog.textContent;
  const active = document.activeElement;
  const focused = active && active.tagName === "BUTTON" ? active.textContent.trim() : active && active.tagName;
  const panelRect = dialog.getBoundingClientRect();
  const fixedBars = Array.from(document.querySelectorAll("[data-bottom-fixed]"))
    .map((element) => element.getBoundingClientRect())
    .filter((rect) => rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight);
  const overlaps = fixedBars.filter((rect) => panelRect.bottom > rect.top + 1 && panelRect.top < rect.bottom).length;
  const live = document.querySelector("[data-webmcp-live]");
  if (!panelText.includes(email) || !panelText.includes(testPhone) || !panelText.includes("Barbearia Teste WebMCP")) {
    problems.push("the panel does not show the data to be sent");
  }
  if (panelText.includes("Mensagem")) problems.push("an empty message was shown as a field");
  if (!panelText.includes("Autorizo a Flowo a usar estes dados para responder meu contato")) problems.push("consent text missing");
  if (focused !== "Cancelar") problems.push(`focus starts on ${focused}`);
  if (!approveDisabledAtFirst) problems.push("Autorizar e enviar was enabled immediately");
  if (overlaps) problems.push(`the panel covers ${overlaps} bar(s) fixed to the bottom`);
  if (!live || !live.textContent.includes("Um assistente de IA quer enviar seus dados")) problems.push("no live announcement");
  await sleep(500);
  if (leadRequests() !== 0) problems.push("a request left before the click");

  const layout = { fixedBars: fixedBars.length, panelBottom: Math.round(panelRect.bottom), barsTop: fixedBars.map((rect) => Math.round(rect.top)) };
  if (mode === "show") return { ok: problems.length === 0, panelVisible: true, layout, problems };

  let syntheticIgnored = null;
  if (mode === "approve") await realInput({ click: "Autorizar e enviar" });
  if (mode === "keyboard") await realInput({ keys: ["Tab", "Enter"] });
  if (mode === "cancel") await realInput({ click: "Cancelar" });
  if (mode === "escape") {
    document.activeElement?.blur();
    await realInput({ keys: ["Escape"] });
  }
  if (mode === "synthetic") {
    button(dialog, "Autorizar e enviar").click();
    await sleep(1500);
    syntheticIgnored = Boolean(findDialog()) && leadRequests() === 0;
    if (!syntheticIgnored) problems.push("a script click approved the request");
    await realInput({ click: "Cancelar" });
  }

  const result = await pending;
  await sleep(500);
  const shouldSend = mode === "approve" || mode === "keyboard";
  const expected = shouldSend
    ? args.expect || "ok"
    : mode === "timeout"
      ? "verificacao_pendente"
      : "cancelado_pela_pessoa";
  const outcome = result.ok ? "ok" : result.erro.codigo;
  const sent = leadRequests();
  if (outcome !== expected) problems.push(`expected ${expected}, got ${outcome}`);
  if (findDialog()) problems.push("the panel is still open");
  if (sent !== (shouldSend ? 1 : 0)) problems.push(`lead requests: ${sent}`);
  const focusReturned = mode === "escape" ? null : document.activeElement === before;
  if (focusReturned === false) problems.push("focus did not return to where it was");
  return { ok: problems.length === 0, mode, outcome, sent, focused, syntheticIgnored, focusReturned, layout, email, problems };
})()
