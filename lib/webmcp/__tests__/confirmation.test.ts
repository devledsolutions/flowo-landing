import { afterEach, describe, expect, it, vi } from "vitest";
import { ToolError } from "../errors";
import {
  CONFIRMATION_TIMEOUT_MS,
  VERIFICATION_TIMEOUT_MS,
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
  const currentId = () => {
    const view = views.at(-1);
    if (!view) throw new Error("no open request");
    return view.id;
  };
  return { controller, views, currentId };
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
    const { controller, views, currentId } = setup(false);
    const pending = controller.request(REQUEST, new AbortController().signal);
    expect(views).toEqual([{ id: 1, request: REQUEST, step: "confirm" }]);
    controller.approve(currentId());
    await expect(pending).resolves.toBe("");
    expect(views.at(-1)).toBeNull();
  });

  it("runs the security check only after the click", async () => {
    const { controller, views, currentId } = setup(true);
    const pending = controller.request(REQUEST, new AbortController().signal);
    controller.provideToken("too-early");
    expect(views.at(-1)).toEqual({ id: 1, request: REQUEST, step: "confirm" });
    controller.approve(currentId());
    expect(views.at(-1)).toEqual({ id: 1, request: REQUEST, step: "verify" });
    controller.provideToken("");
    controller.provideToken("token-ok");
    await expect(pending).resolves.toBe("token-ok");
  });

  it("returns cancelado_pela_pessoa on Cancelar", async () => {
    const { controller, currentId } = setup(true);
    const pending = controller.request(REQUEST, new AbortController().signal);
    controller.approve(currentId());
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

    const { controller, views, currentId } = setup(true);
    const during = new AbortController();
    const pending = controller.request(REQUEST, during.signal);
    controller.approve(currentId());
    during.abort();
    expect(await codeOf(pending)).toBe("cancelado_pelo_assistente");
    expect(views.at(-1)).toBeNull();
    controller.provideToken("late-token");
  });

  it("refuses a second request while one is open", async () => {
    const { controller, currentId } = setup(false);
    const first = controller.request(REQUEST, new AbortController().signal);
    expect(await codeOf(controller.request(REQUEST, new AbortController().signal))).toBe("verificacao_pendente");
    controller.approve(currentId());
    await expect(first).resolves.toBe("");
  });

  it("rejects the open request when the page component goes away", async () => {
    const { controller } = setup(false);
    const pending = controller.request(REQUEST, new AbortController().signal);
    controller.dispose();
    expect(await codeOf(pending)).toBe("cancelado_pelo_assistente");
  });

  it("ignores an approval meant for another request", async () => {
    vi.useFakeTimers();
    const { controller, views, currentId } = setup(false);
    const first = controller.request(REQUEST, new AbortController().signal);
    const firstId = currentId();
    controller.cancel();
    expect(await codeOf(first)).toBe("cancelado_pela_pessoa");

    const second = controller.request({ ...REQUEST, titulo: "Outro pedido" }, new AbortController().signal);
    expect(currentId()).not.toBe(firstId);
    controller.approve(firstId);
    expect(views.at(-1)).toMatchObject({ step: "confirm" });
    controller.approve(currentId());
    await expect(second).resolves.toBe("");
  });

  it("gives the security check fresh time after the click", async () => {
    vi.useFakeTimers();
    const { controller, currentId } = setup(true);
    let settled = "";
    const pending = controller.request(REQUEST, new AbortController().signal).then(
      (token) => (settled = `token:${token}`),
      (error: ToolError) => (settled = error.codigo),
    );
    vi.advanceTimersByTime(CONFIRMATION_TIMEOUT_MS - 1_000);
    controller.approve(currentId());
    vi.advanceTimersByTime(VERIFICATION_TIMEOUT_MS - 1_000);
    await Promise.resolve();
    expect(settled).toBe("");
    controller.provideToken("token-ok");
    await pending;
    expect(settled).toBe("token:token-ok");
  });

  it("still times out if the security check never finishes", async () => {
    vi.useFakeTimers();
    const { controller, currentId } = setup(true);
    const pending = controller.request(REQUEST, new AbortController().signal);
    controller.approve(currentId());
    vi.advanceTimersByTime(VERIFICATION_TIMEOUT_MS);
    expect(await codeOf(pending)).toBe("verificacao_pendente");
  });
});
