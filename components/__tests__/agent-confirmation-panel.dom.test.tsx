// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AgentConfirmationPanel, { APPROVE_ARM_MS } from "@/components/webmcp/agent-confirmation-panel";
import type { ConfirmationView } from "@/lib/webmcp/confirmation";

declare global { var IS_REACT_ACT_ENVIRONMENT: boolean | undefined; }

const VIEW: NonNullable<ConfirmationView> = {
  id: 3,
  step: "confirm",
  request: {
    titulo: "Pedido de contato com a equipe comercial",
    campos: [{ rotulo: "Nome", valor: "Pessoa Teste" }],
    consentimento: "vendas",
  },
};

let root: Root;
let container: HTMLDivElement;
let outside: HTMLButtonElement;

function button(label: string): HTMLButtonElement {
  const found = Array.from(container.querySelectorAll("button")).find((item) => item.textContent?.trim() === label);
  if (!found) throw new Error(`missing ${label}`);
  return found;
}

async function mount(props: Partial<Parameters<typeof AgentConfirmationPanel>[0]> = {}) {
  const handlers = { onApprove: vi.fn(), onCancel: vi.fn(), onToken: vi.fn() };
  await act(async () => {
    root.render(<AgentConfirmationPanel view={VIEW} {...handlers} {...props} />);
  });
  return handlers;
}

beforeEach(() => {
  vi.useFakeTimers();
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  outside = document.createElement("button");
  outside.textContent = "Fora do painel";
  document.body.appendChild(outside);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  outside.remove();
  vi.useRealTimers();
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
});

describe("agent confirmation panel in the browser", () => {
  it("moves focus to Cancelar and gives it back on close", async () => {
    outside.focus();
    await mount();
    expect(document.activeElement).toBe(button("Cancelar"));
    await act(async () => root.unmount());
    root = createRoot(container);
    expect(document.activeElement).toBe(outside);
  });

  it("cancels on Escape even when focus moved elsewhere", async () => {
    const { onCancel } = await mount();
    outside.focus();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("keeps Autorizar e enviar disabled for a moment after it appears", async () => {
    await mount();
    expect(button("Autorizar e enviar").disabled).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(APPROVE_ARM_MS);
    });
    expect(button("Autorizar e enviar").disabled).toBe(false);
  });

  it("ignores a script click on Autorizar e enviar", async () => {
    const { onApprove } = await mount();
    await act(async () => {
      vi.advanceTimersByTime(APPROVE_ARM_MS);
    });
    await act(async () => button("Autorizar e enviar").click());
    expect(onApprove).not.toHaveBeenCalled();
  });

  it("approves the request on screen when the event is real input", async () => {
    const { onApprove } = await mount({ acceptsEvent: () => true });
    await act(async () => button("Autorizar e enviar").click());
    expect(onApprove).not.toHaveBeenCalled();
    await act(async () => {
      vi.advanceTimersByTime(APPROVE_ARM_MS);
    });
    await act(async () => button("Autorizar e enviar").click());
    expect(onApprove).toHaveBeenCalledExactlyOnceWith(3);
  });

  it("cannot be approved again during the security check", async () => {
    const { onApprove } = await mount({ acceptsEvent: () => true, view: { ...VIEW, step: "verify" } });
    await act(async () => {
      vi.advanceTimersByTime(APPROVE_ARM_MS);
    });
    expect(button("Autorizar e enviar").disabled).toBe(true);
    await act(async () => button("Autorizar e enviar").click());
    expect(onApprove).not.toHaveBeenCalled();
  });

  it("stays above every bar fixed to the bottom of the screen", async () => {
    const banner = document.createElement("section");
    banner.setAttribute("data-bottom-fixed", "true");
    banner.getBoundingClientRect = () => ({ top: 668, bottom: 768, height: 100, width: 390, left: 0, right: 390, x: 0, y: 668, toJSON: () => ({}) });
    document.body.appendChild(banner);
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 844 });
    await mount();
    const panel = container.querySelector<HTMLElement>('[role="dialog"]');
    expect(panel?.style.bottom).toBe(`${844 - 668 + 16}px`);
    banner.remove();
  });
});
