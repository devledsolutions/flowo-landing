import { ToolError } from "./errors";
import type { ConsentKind } from "./consent";

/** What the visitor sees before anything is sent. */
export type LeadConfirmationRequest = {
  titulo: string;
  campos: Array<{ rotulo: string; valor: string }>;
  consentimento: ConsentKind;
};

export type ConfirmationView = {
  /** Changes for every request, so an approval always refers to the data on screen. */
  id: number;
  request: LeadConfirmationRequest;
  /** "confirm" waits for the click; "verify" runs the security check after it. */
  step: "confirm" | "verify";
} | null;

/** Time the visitor has to read and decide. */
export const CONFIRMATION_TIMEOUT_MS = 90_000;
/** Fresh time after the click, so an interactive security challenge can finish. */
export const VERIFICATION_TIMEOUT_MS = 90_000;

const RETRY_HINT =
  "Peça para a pessoa conferir os dados na página e clicar em Autorizar e enviar, depois chame a ferramenta de novo.";

export function confirmationTimeoutError(): ToolError {
  return new ToolError("verificacao_pendente", "A pessoa não confirmou o envio a tempo.", RETRY_HINT);
}

export function confirmationBusyError(): ToolError {
  return new ToolError(
    "verificacao_pendente",
    "Já existe um pedido esperando a confirmação da pessoa.",
    "Espere a pessoa responder ao pedido aberto na página.",
  );
}

export function cancelledByPersonError(): ToolError {
  return new ToolError(
    "cancelado_pela_pessoa",
    "A pessoa cancelou o envio na página.",
    "Não envie de novo, a menos que a pessoa peça.",
  );
}

export function cancelledByAssistantError(): ToolError {
  return new ToolError(
    "cancelado_pelo_assistente",
    "A chamada foi cancelada antes do envio. Nada foi enviado.",
    "Chame a ferramenta de novo se a pessoa ainda quiser enviar.",
  );
}

type Pending = {
  id: number;
  request: LeadConfirmationRequest;
  step: "confirm" | "verify";
  resolve: (token: string) => void;
  reject: (error: ToolError) => void;
  restartTimer: (ms: number) => void;
  release: () => void;
};

/**
 * One pending confirmation at a time. Nothing resolves until the visitor
 * clicks "Autorizar e enviar"; with a security check configured, the check
 * runs only after that click. Cancel, timeout and the call's abort signal all
 * reject without sending anything.
 */
export function createConfirmationController({
  needsVerification,
  onChange,
  timeoutMs = CONFIRMATION_TIMEOUT_MS,
  verificationTimeoutMs = VERIFICATION_TIMEOUT_MS,
}: {
  needsVerification: () => boolean;
  onChange: (view: ConfirmationView) => void;
  timeoutMs?: number;
  verificationTimeoutMs?: number;
}) {
  let pending: Pending | null = null;
  let lastId = 0;

  function finish(outcome: { token: string } | { error: ToolError }) {
    const current = pending;
    if (!current) return;
    pending = null;
    current.release();
    onChange(null);
    if ("token" in outcome) current.resolve(outcome.token);
    else current.reject(outcome.error);
  }

  return {
    request(request: LeadConfirmationRequest, signal: AbortSignal): Promise<string> {
      if (signal.aborted) return Promise.reject(cancelledByAssistantError());
      if (pending) return Promise.reject(confirmationBusyError());
      return new Promise<string>((resolve, reject) => {
        const id = ++lastId;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const restartTimer = (ms: number) => {
          clearTimeout(timer);
          timer = setTimeout(() => finish({ error: confirmationTimeoutError() }), ms);
        };
        const onAbort = () => finish({ error: cancelledByAssistantError() });
        signal.addEventListener("abort", onAbort, { once: true });
        restartTimer(timeoutMs);
        pending = {
          id,
          request,
          step: "confirm",
          resolve,
          reject,
          restartTimer,
          release: () => {
            clearTimeout(timer);
            signal.removeEventListener("abort", onAbort);
          },
        };
        onChange({ id, request, step: "confirm" });
      });
    },
    /** Approves only the request whose data is on screen. */
    approve(id: number) {
      if (!pending || pending.id !== id || pending.step !== "confirm") return;
      if (!needsVerification()) {
        finish({ token: "" });
        return;
      }
      pending.step = "verify";
      pending.restartTimer(verificationTimeoutMs);
      onChange({ id: pending.id, request: pending.request, step: "verify" });
    },
    provideToken(token: string) {
      if (pending?.step === "verify" && token) finish({ token });
    },
    cancel() {
      finish({ error: cancelledByPersonError() });
    },
    dispose() {
      finish({ error: cancelledByAssistantError() });
    },
  };
}

export type ConfirmationController = ReturnType<typeof createConfirmationController>;
