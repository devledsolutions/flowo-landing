/**
 * Identificador de UM envio de formulário de contato.
 *
 * O backend usa este valor só para reconhecer a repetição do mesmo envio:
 * resposta que se perdeu, erro 5xx, clique duplo ou recarga da página. Ele não
 * autoriza nada e não leva dado da pessoa.
 *
 * O identificador é repetido enquanto o site não tiver a confirmação de que
 * aquele envio entrou, e trocado depois do sucesso. Assim um novo pedido da
 * mesma pessoa é um pedido novo. Trocar telefone, e-mail ou qualquer outro
 * campo entre duas tentativas também vira pedido novo: quem decide isso é o
 * backend, que compara o conteúdo.
 */

const STORAGE_PREFIX = "flowo:lead-submission:";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

type PendingSubmission = { id: string; startedAt: number };

const memory = new Map<string, PendingSubmission>();

function tabStorage(): Pick<Storage, "getItem" | "setItem" | "removeItem"> | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.sessionStorage;
  } catch {
    return undefined;
  }
}

function parsePending(raw: string | null): PendingSubmission | undefined {
  if (!raw) return undefined;
  try {
    const value = JSON.parse(raw) as Partial<PendingSubmission> | null;
    if (
      value &&
      typeof value.id === "string" &&
      UUID_PATTERN.test(value.id) &&
      typeof value.startedAt === "number" &&
      Number.isFinite(value.startedAt)
    ) {
      return { id: value.id, startedAt: value.startedAt };
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function readPending(scope: string): PendingSubmission | undefined {
  const remembered = memory.get(scope);
  if (remembered) return remembered;
  try {
    return parsePending(tabStorage()?.getItem(STORAGE_PREFIX + scope) ?? null);
  } catch {
    return undefined;
  }
}

function writePending(scope: string, pending: PendingSubmission): void {
  memory.set(scope, pending);
  try {
    tabStorage()?.setItem(STORAGE_PREFIX + scope, JSON.stringify(pending));
  } catch {
    // Sem armazenamento da aba, o identificador vale até a página recarregar.
  }
}

function randomUuid(): string {
  const source = typeof crypto === "undefined" ? undefined : crypto;
  if (source && typeof source.randomUUID === "function") {
    return source.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (source && typeof source.getRandomValues === "function") {
    source.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex
    .slice(6, 8)
    .join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
}

/**
 * Identificador do envio em andamento deste formulário. `scope` separa os
 * formulários entre si; use a origem (`source`) que o formulário envia.
 */
export function leadSubmissionId(scope: string): string {
  const now = Date.now();
  const pending = readPending(scope);
  if (
    pending &&
    pending.startedAt <= now
  ) {
    return pending.id;
  }
  const created = { id: randomUuid(), startedAt: now };
  writePending(scope, created);
  return created.id;
}

/** O servidor confirmou o envio: o próximo é um pedido novo. */
export function settleLeadSubmission(scope: string): void {
  memory.delete(scope);
  try {
    tabStorage()?.removeItem(STORAGE_PREFIX + scope);
  } catch {
    // Nada a limpar quando o armazenamento da aba está bloqueado.
  }
}
