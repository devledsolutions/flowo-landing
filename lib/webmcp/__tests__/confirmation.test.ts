import { afterEach, describe, expect, it, vi } from "vitest";
import { ToolError } from "../errors";
import {
  CONFIRMATION_TIMEOUT_MS,
  createConfirmationController,
  type ConfirmationView,
  type LeadConfirmationRequest,
} from "../confirmation";

const REQUEST: LeadConfirmationRequest = {
  titulo: "Pedido de contato com a equipe comercial",
  campos: [{ rotulo: "Nome", valor: "Pessoa" }],
  consentimento: "vendas",
};

function setup(needsVerification = false) {
  const views: ConfirmationView[] = [];
  const controller = createConfirmationController({
    needsVerification: () => needsVerification,
    onChange: (view) => views.push(view),
  });
  return { controller, views };
}

async function codeOf(promise: Promise<string>): Promise<string> {
  try {
    await promise;
    return "resolved";
  } catch (error) {
    return error instanceof ToolError ? error.codigo : "other";
  }
}

afterEach(() => {
  vi.useRealTimers();
});

describe("confirmation controller", () => {
  it("waits for the click and resolves without a token when there is no security check", async () => {
    const { controller, views } = setup(false);
    const pending = controller.request(REQUEST, new AbortController().signal);
    expect(views).toEqual([{ request: REQUEST, step: "confirm" }]);
    controller.approve();
    await expect(pending).resolves.toBe("");
    expect(views.at(-1)).toBeNull();
  });

  it("runs the security check only after the click", async () => {
    const { controller, views } = setup(true);
    const pending = controller.request(REQUEST, new AbortController().signal);
    controller.provideToken("too-early");
    expect(views.at(-1)).toEqual({ request: REQUEST, step: "confirm" });
    controller.approve();
    expect(views.at(-1)).toEqual({ request: REQUEST, step: "verify" });
    controller.provideToken("");
    controller.provideToken("token-ok");
    await expect(pending).resolves.toBe("token-ok");
  });

  it("returns cancelado_pela_pessoa on Cancelar", async () => {
    const { controller } = setup(true);
    const pending = controller.request(REQUEST, new AbortController().signal);
    controller.approve();
    controller.cancel();
    expect(await codeOf(pending)).toBe("cancelado_pela_pessoa");
  });

  it("returns verificacao_pendente when nobody answers in time", async () => {
    vi.useFakeTimers();
    const { controller, views } = setup(false);
    const pending = controller.request(REQUEST, new AbortController().signal);
    vi.advanceTimersByTime(CONFIRMATION_TIMEOUT_MS);
    expect(await codeOf(pending)).toBe("verificacao_pendente");
    expect(views.at(-1)).toBeNull();
  });

  it("closes the panel when the call is aborted, before or during the wait", async () => {
    const before = new AbortController();
    before.abort();
    expect(await codeOf(setup().controller.request(REQUEST, before.signal))).toBe("cancelado_pelo_assistente");

    const { controller, views } = setup(true);
    const during = new AbortController();
    const pending = controller.request(REQUEST, during.signal);
    controller.approve();
    during.abort();
    expect(await codeOf(pending)).toBe("cancelado_pelo_assistente");
    expect(views.at(-1)).toBeNull();
    controller.provideToken("late-token");
  });

  it("refuses a second request while one is open", async () => {
    const { controller } = setup(false);
    const first = controller.request(REQUEST, new AbortController().signal);
    expect(await codeOf(controller.request(REQUEST, new AbortController().signal))).toBe("verificacao_pendente");
    controller.approve();
    await expect(first).resolves.toBe("");
  });

  it("rejects the open request when the page component goes away", async () => {
    const { controller } = setup(false);
    const pending = controller.request(REQUEST, new AbortController().signal);
    controller.dispose();
    expect(await codeOf(pending)).toBe("cancelado_pelo_assistente");
  });
});
