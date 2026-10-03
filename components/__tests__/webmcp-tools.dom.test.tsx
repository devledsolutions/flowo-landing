// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WebMcpTools } from "@/components/webmcp/webmcp-tools";

declare global { var IS_REACT_ACT_ENVIRONMENT: boolean | undefined; }

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let root: Root;
let container: HTMLDivElement;
let registered: ModelContextToolDefinition[];
let fetchSpy: ReturnType<typeof vi.fn>;
const leadRequests = () =>
  fetchSpy.mock.calls.filter(([url]) => String(url).includes("/api/lead-capture")).length;

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  registered = [];
  Object.defineProperty(document, "modelContext", {
    configurable: true,
    value: { registerTool: (tool: ModelContextToolDefinition) => void registered.push(tool) },
  });
  fetchSpy = vi.fn(async () => new Response(JSON.stringify({ success: true }), { status: 200 }));
  vi.stubGlobal("fetch", fetchSpy);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  Reflect.deleteProperty(document, "modelContext");
  vi.unstubAllGlobals();
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
});

async function waitFor<T>(read: () => T | null | undefined, ms = 3000): Promise<T> {
  for (let waited = 0; waited < ms; waited += 25) {
    const value = read();
    if (value) return value;
    await act(async () => sleep(25));
  }
  throw new Error("timed out");
}

describe("WebMcpTools with a WebMCP browser", () => {
  it("announces through a live region that exists before the request, and a script cannot approve", async () => {
    await act(async () => root.render(<WebMcpTools />));
    await waitFor(() => (registered.length === 14 ? registered : null));
    const live = container.querySelector('[data-webmcp-live][aria-live="polite"]');
    expect(live?.textContent).toBe("");

    const tool = registered.find((item) => item.name === "falar_com_vendas");
    let output = "";
    const call = tool!
      .execute(JSON.stringify({ nome: "Pessoa Teste", whatsapp: "(11) 98765-4321", consentimento: true }))
      .then((value) => (output = value));
    const dialog = await waitFor(() => container.querySelector<HTMLElement>('[role="dialog"]'));
    expect(container.querySelector("[data-webmcp-live]")).toBe(live);
    expect(live?.textContent).toContain("Um assistente de IA quer enviar seus dados à Flowo");

    await act(async () => sleep(700));
    const approve = Array.from(dialog.querySelectorAll("button")).find((item) => item.textContent?.trim() === "Autorizar e enviar");
    expect(approve?.disabled).toBe(false);
    await act(async () => approve?.click());
    await act(async () => sleep(100));
    expect(container.querySelector('[role="dialog"]')).not.toBeNull();
    expect(leadRequests()).toBe(0);

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await act(async () => call);
    expect(JSON.parse(output).erro.codigo).toBe("cancelado_pela_pessoa");
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(live?.textContent).toBe("");
    expect(leadRequests()).toBe(0);
    const usage = fetchSpy.mock.calls.filter(([url]) => String(url).includes("/api/webmcp-usage"));
    expect(usage).toHaveLength(1);
    expect(JSON.parse(String((usage[0][1] as RequestInit).body))).toMatchObject({
      tool: "falar_com_vendas",
      outcome: "cancelado_pela_pessoa",
    });
  });
});
