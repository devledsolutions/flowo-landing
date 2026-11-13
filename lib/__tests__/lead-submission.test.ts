import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  leadSubmissionId,
  settleLeadSubmission,
} from "../lead-submission";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const START = Date.parse("2026-11-12T12:00:00Z");

function fakeSessionStorage() {
  const values = new Map<string, string>();
  return {
    values,
    storage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => void values.set(key, value),
      removeItem: (key: string) => void values.delete(key),
    },
  };
}

let scope = 0;
function nextScope(): string {
  scope += 1;
  return `fixture-form-${scope}`;
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(START);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("identificador do envio de formulário", () => {
  it("é um UUID e se repete enquanto o envio não foi confirmado", () => {
    const form = nextScope();
    const first = leadSubmissionId(form);
    expect(first).toMatch(UUID);
    vi.advanceTimersByTime(20_000);
    expect(leadSubmissionId(form)).toBe(first);
    expect(leadSubmissionId(form)).toBe(first);
  });

  it("muda depois do sucesso confirmado: o próximo envio é um pedido novo", () => {
    const form = nextScope();
    const first = leadSubmissionId(form);
    settleLeadSubmission(form);
    const second = leadSubmissionId(form);
    expect(second).toMatch(UUID);
    expect(second).not.toBe(first);
  });

  it("cada formulário tem o seu", () => {
    expect(leadSubmissionId(nextScope())).not.toBe(leadSubmissionId(nextScope()));
  });

  it("não transforma uma tentativa sem confirmação em pedido novo só porque o tempo passou", () => {
    const form = nextScope();
    const first = leadSubmissionId(form);
    vi.advanceTimersByTime(40 * 24 * 60 * 60_000);
    expect(leadSubmissionId(form)).toBe(first);
    settleLeadSubmission(form);
    expect(leadSubmissionId(form)).not.toBe(first);
  });

  it("sobrevive à recarga da página na mesma aba e não guarda dado da pessoa", () => {
    const { storage, values } = fakeSessionStorage();
    vi.stubGlobal("window", { sessionStorage: storage });
    const form = nextScope();
    const first = leadSubmissionId(form);

    expect([...values.keys()]).toEqual([`flowo:lead-submission:${form}`]);
    expect(JSON.parse([...values.values()][0]!)).toEqual({ id: first, startedAt: START });

    // Recarga: o módulo volta do zero, a aba mantém o sessionStorage.
    vi.resetModules();
    return import("../lead-submission").then((reloaded) => {
      expect(reloaded.leadSubmissionId(form)).toBe(first);
      reloaded.settleLeadSubmission(form);
      expect(values.size).toBe(0);
      expect(reloaded.leadSubmissionId(form)).not.toBe(first);
    });
  });

  it("ignora valor guardado que não é um identificador válido", () => {
    const { storage, values } = fakeSessionStorage();
    vi.stubGlobal("window", { sessionStorage: storage });
    for (const stored of [
      "não é json",
      JSON.stringify({ id: "x", startedAt: START }),
      JSON.stringify({ id: 42, startedAt: START }),
      JSON.stringify({ id: "0b6f6a52-6f0e-4c8e-9a51-1d2c3b4a5f60", startedAt: "ontem" }),
      JSON.stringify({ id: "0b6f6a52-6f0e-4c8e-9a51-1d2c3b4a5f60", startedAt: START + 60_000 }),
    ]) {
      const form = nextScope();
      values.set(`flowo:lead-submission:${form}`, stored);
      const id = leadSubmissionId(form);
      expect(id).toMatch(UUID);
      expect(id).not.toBe("0b6f6a52-6f0e-4c8e-9a51-1d2c3b4a5f60");
    }
  });

  it("funciona com o armazenamento da aba bloqueado", () => {
    vi.stubGlobal("window", {
      get sessionStorage(): Storage {
        throw new Error("SecurityError");
      },
    });
    const form = nextScope();
    const first = leadSubmissionId(form);
    expect(first).toMatch(UUID);
    expect(leadSubmissionId(form)).toBe(first);
    settleLeadSubmission(form);
    expect(leadSubmissionId(form)).not.toBe(first);
  });

  it("gera UUID mesmo sem crypto.randomUUID", () => {
    vi.stubGlobal("crypto", {
      getRandomValues: (bytes: Uint8Array) => {
        for (let index = 0; index < bytes.length; index += 1) bytes[index] = (index * 37 + 11) % 256;
        return bytes;
      },
    });
    expect(leadSubmissionId(nextScope())).toMatch(UUID);
  });
});

describe("todo formulário que captura lead usa o identificador", () => {
  const ROOT = process.cwd();
  const SKIP = new Set(["node_modules", ".next", ".git", "worktrees", "tmp", "public", "docs", "__tests__"]);

  function sourceFiles(directory: string): string[] {
    const found: string[] = [];
    for (const entry of readdirSync(directory)) {
      if (SKIP.has(entry)) continue;
      const path = join(directory, entry);
      if (statSync(path).isDirectory()) found.push(...sourceFiles(path));
      else if (/\.(ts|tsx)$/.test(entry)) found.push(path);
    }
    return found;
  }

  const senders = sourceFiles(ROOT)
    .map((path) => ({ path: relative(ROOT, path), text: readFileSync(path, "utf8") }))
    .filter(({ text }) => /fetch\(\s*["']\/api\/(lead-capture|contact-form)["']/.test(text));

  it("encontra os sete pontos de envio conhecidos", () => {
    expect(senders.map(({ path }) => path).sort()).toEqual([
      "components/contact-form.tsx",
      "components/download-gate-modal.tsx",
      "components/lead-capture-modal.tsx",
      "components/marketing/lead-magnet-form.tsx",
      "components/mobile-app-waitlist-form.tsx",
      "components/newsletter-signup.tsx",
      "lib/webmcp/tools/leads.ts",
    ]);
  });

  it.each(senders)("$path envia o identificador e o encerra só depois do sucesso", ({ text }) => {
    const send = text.search(/submissionId:\s*leadSubmissionId\(/);
    const failureCheck = text.indexOf("response.ok", send);
    const settles = [...text.matchAll(/settleLeadSubmission\(/g)].map((match) => match.index);
    expect(send).toBeGreaterThan(-1);
    expect(failureCheck).toBeGreaterThan(send);
    expect(settles).toHaveLength(1);
    expect(settles[0]).toBeGreaterThan(failureCheck);
  });
});

