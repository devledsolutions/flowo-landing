import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ mutation: vi.fn(), clients: [] as string[] }));

vi.mock("convex/browser", () => ({
  ConvexHttpClient: class {
    constructor(url: string) {
      mocks.clients.push(url);
    }
    mutation(reference: unknown, args: unknown) {
      return mocks.mutation(reference, args);
    }
  },
}));

import {
  resolveWebsiteLeadBackend,
  sendWebsiteLead,
  websiteLeadMetaEventId,
} from "../website-lead-backend";

const CONVEX_URL = "https://fixture-landing-000.convex.cloud";
const SECRET = "fixture-landing-server-secret";
const SUBMISSION = "0b6f6a52-6f0e-4c8e-9a51-1d2c3b4a5f60";
const LEAD = {
  name: "Pessoa Fixture",
  email: "pessoa.fixture@example.com",
  source: "newsletter:site-footer",
  landingPath: "/",
  consent: true as const,
};

beforeEach(() => {
  vi.resetAllMocks();
  mocks.clients.length = 0;
  mocks.mutation.mockResolvedValue({ accepted: true });
  vi.stubEnv("CONVEX_URL", CONVEX_URL);
  vi.stubEnv("NEXT_PUBLIC_CONVEX_URL", CONVEX_URL);
  vi.stubEnv("CONVEX_SERVER_SECRET", SECRET);
});

afterEach(() => vi.unstubAllEnvs());

describe("fronteira servidor -> backend da captura de lead", () => {
  it("só existe com endereço do backend e segredo do servidor", () => {
    expect(resolveWebsiteLeadBackend()).toEqual({
      ok: true,
      backend: { convexUrl: CONVEX_URL, serverSecret: SECRET },
    });

    for (const configured of [undefined, "", " \n"]) {
      vi.stubEnv("CONVEX_SERVER_SECRET", configured);
      expect(resolveWebsiteLeadBackend()).toEqual({ ok: false, missing: "server_secret" });
    }

    vi.stubEnv("CONVEX_SERVER_SECRET", SECRET);
    vi.stubEnv("NEXT_PUBLIC_CONVEX_URL", "https://other-000.convex.cloud");
    expect(resolveWebsiteLeadBackend()).toEqual({ ok: false, missing: "convex_url" });
  });

  it("não lê o segredo de nenhuma variável exposta ao navegador", () => {
    vi.stubEnv("CONVEX_SERVER_SECRET", undefined);
    vi.stubEnv("NEXT_PUBLIC_CONVEX_SERVER_SECRET", SECRET);
    expect(resolveWebsiteLeadBackend()).toEqual({ ok: false, missing: "server_secret" });
  });

  it("usa um cliente por envio e manda a prova junto do identificador", async () => {
    const resolved = resolveWebsiteLeadBackend();
    if (!resolved.ok) throw new Error("fixture backend missing");
    await sendWebsiteLead(resolved.backend, SUBMISSION, LEAD);
    await sendWebsiteLead(resolved.backend, SUBMISSION, LEAD);

    expect(mocks.clients).toEqual([CONVEX_URL, CONVEX_URL]);
    expect(mocks.mutation.mock.calls[0]![1]).toEqual({
      ...LEAD,
      serverSecret: SECRET,
      submissionId: SUBMISSION,
    });
  });

  it("um segredo trocado no ambiente vale no envio seguinte, sem cliente guardado", async () => {
    const first = resolveWebsiteLeadBackend();
    if (!first.ok) throw new Error("fixture backend missing");
    await sendWebsiteLead(first.backend, SUBMISSION, LEAD);

    vi.stubEnv("CONVEX_SERVER_SECRET", "fixture-rotated-secret");
    const second = resolveWebsiteLeadBackend();
    if (!second.ok) throw new Error("fixture backend missing");
    await sendWebsiteLead(second.backend, SUBMISSION, LEAD);

    expect(mocks.mutation.mock.calls[1]![1]).toMatchObject({
      serverSecret: "fixture-rotated-secret",
    });
  });

  it("erro do backend é repassado sem o segredo na mensagem nem na pilha", async () => {
    const original = new Error(
      `ArgumentValidationError: Object: {serverSecret: "${SECRET}", name: "x"} / ${SECRET}`
    );
    original.stack = `Error: ${SECRET}\n    at fixture (${SECRET})`;
    mocks.mutation.mockRejectedValueOnce(original);
    const resolved = resolveWebsiteLeadBackend();
    if (!resolved.ok) throw new Error("fixture backend missing");

    const failure = await sendWebsiteLead(resolved.backend, SUBMISSION, LEAD).then(
      () => null,
      (error: unknown) => error
    );
    expect(failure).toBeInstanceOf(Error);
    const text = `${(failure as Error).message}\n${(failure as Error).stack}\n${String(failure)}`;
    expect(text).not.toContain(SECRET);
    expect(text).toContain("ArgumentValidationError");
    expect(text).toContain("[Redacted credential]");
  });

  it("remove também o segredo impresso com escape de aspas e barras", async () => {
    const awkward = 'fixture"secret\\with-escapes';
    vi.stubEnv("CONVEX_SERVER_SECRET", awkward);
    mocks.mutation.mockRejectedValueOnce(
      new Error(`Object: {serverSecret: ${JSON.stringify(awkward)}}`)
    );
    const resolved = resolveWebsiteLeadBackend();
    if (!resolved.ok) throw new Error("fixture backend missing");
    const failure = await sendWebsiteLead(resolved.backend, SUBMISSION, LEAD).then(
      () => null,
      (error: unknown) => error
    );
    const text = String((failure as Error).message);
    expect(text).not.toContain("with-escapes");
    expect(text).toBe('Object: {serverSecret: "[Redacted credential]"}');
  });

  it("falha que não é Error também sai sem o segredo", async () => {
    mocks.mutation.mockRejectedValueOnce(`recusado: ${SECRET}`);
    const resolved = resolveWebsiteLeadBackend();
    if (!resolved.ok) throw new Error("fixture backend missing");
    const failure = await sendWebsiteLead(resolved.backend, SUBMISSION, LEAD).then(
      () => null,
      (error: unknown) => error
    );
    expect(String((failure as Error).message)).toBe("recusado: [Redacted credential]");
  });
});

describe("evento de conversão por envio", () => {
  it("é estável por identificador, não revela o identificador e tem formato de UUID", () => {
    const eventId = websiteLeadMetaEventId(SUBMISSION);
    expect(eventId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(websiteLeadMetaEventId(SUBMISSION)).toBe(eventId);
    expect(eventId).not.toBe(SUBMISSION);
    expect(websiteLeadMetaEventId("7c1d2e3f-4a5b-4c6d-8e7f-90a1b2c3d4e5")).not.toBe(eventId);
  });
});

describe("o segredo do servidor não chega ao navegador", () => {
  const ROOT = process.cwd();
  const SKIP = new Set(["node_modules", ".next", ".git", "worktrees", "tmp", "public", "docs"]);

  function sourceFiles(directory: string): string[] {
    const found: string[] = [];
    for (const entry of readdirSync(directory)) {
      if (SKIP.has(entry)) continue;
      const path = join(directory, entry);
      if (statSync(path).isDirectory()) found.push(...sourceFiles(path));
      else if (/\.(ts|tsx|mjs)$/.test(entry) && !/\.test\.(ts|tsx|mjs)$/.test(entry)) found.push(path);
    }
    return found;
  }

  const files = sourceFiles(ROOT).map((path) => ({
    path: relative(ROOT, path),
    text: readFileSync(path, "utf8"),
  }));

  it("nenhum arquivo de navegador lê o segredo nem importa a fronteira do servidor", () => {
    const clientFiles = files.filter(({ text }) => /^\s*["']use client["']/.test(text));
    expect(clientFiles.length).toBeGreaterThan(20);
    const offenders = clientFiles
      .filter(
        ({ text }) =>
          text.includes("CONVEX_SERVER_SECRET") ||
          text.includes("website-lead-backend") ||
          text.includes("serverSecret")
      )
      .map(({ path }) => path);
    expect(offenders).toEqual([]);
  });

  it("não existe variável pública com o segredo do servidor", () => {
    const offenders = files
      .filter(({ text }) => /NEXT_PUBLIC_[A-Z0-9_]*SERVER_SECRET/.test(text))
      .map(({ path }) => path);
    expect(offenders).toEqual([]);
  });

  it("só módulos de servidor leem CONVEX_SERVER_SECRET", () => {
    const readers = files
      .filter(({ text }) => text.includes("process.env.CONVEX_SERVER_SECRET"))
      .map(({ path }) => path)
      .sort();
    expect(readers).toEqual(["lib/rate-limit.ts", "lib/website-lead-backend.ts"]);
  });

  it("as duas rotas de captura passam pela mesma fronteira", () => {
    for (const route of ["app/api/lead-capture/route.ts", "app/api/contact-form/route.ts"]) {
      const text = files.find(({ path }) => path === route)?.text ?? "";
      expect(text).toContain("resolveWebsiteLeadBackend");
      expect(text).toContain("sendWebsiteLead");
      expect(text).not.toContain("ConvexHttpClient");
      expect(text).toContain("verifyTurnstile");
      expect(text).toContain("applyRateLimit");
    }
  });
});
