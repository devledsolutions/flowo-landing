import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  applyRateLimit: vi.fn(),
  verifyTurnstile: vi.fn(),
  captureLandingException: vi.fn(),
  captureLandingMessage: vi.fn(),
  mutation: vi.fn(),
  clients: [] as string[],
}));

vi.mock("@/lib/rate-limit", () => ({ applyRateLimit: mocks.applyRateLimit }));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: mocks.verifyTurnstile }));
vi.mock("@/lib/observability/posthog-server", () => ({
  captureLandingException: mocks.captureLandingException,
  captureLandingMessage: mocks.captureLandingMessage,
}));
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

import { getFunctionName } from "convex/server";
import { POST } from "../route";

const CONVEX_URL = "https://fixture-landing-000.convex.cloud";
const SECRET = "fixture-landing-server-secret";
const SUBMISSION = "0b6f6a52-6f0e-4c8e-9a51-1d2c3b4a5f60";

const FORM = {
  name: "Pessoa Fixture",
  email: "pessoa.fixture@example.com",
  whatsapp: "+5511900000001",
  source: "enterprise_home_pricing",
  businessName: "Barbearia Fixture",
  consent: true,
  salesContactRequestChannels: ["whatsapp"],
  whatsappMarketingConsent: false,
  landingPath: "/precos",
  utmSource: "google",
  turnstileToken: "fixture-turnstile-token",
  submissionId: SUBMISSION,
};

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3001/api/lead-capture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.7",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function sentArgs(call = 0): Record<string, unknown> {
  return mocks.mutation.mock.calls[call]![1] as Record<string, unknown>;
}

function everythingReported(): string {
  return JSON.stringify([
    mocks.captureLandingException.mock.calls.map(([error, ...rest]) => [
      String(error),
      (error as Error | undefined)?.stack,
      rest,
    ]),
    mocks.captureLandingMessage.mock.calls,
  ]);
}

beforeEach(() => {
  vi.resetAllMocks();
  mocks.clients.length = 0;
  mocks.applyRateLimit.mockResolvedValue({ allowed: true, retryAfterSeconds: 60 });
  mocks.verifyTurnstile.mockResolvedValue({ success: true, skipped: false, errors: [] });
  mocks.mutation.mockResolvedValue({ accepted: true });
  vi.stubEnv("CONVEX_URL", CONVEX_URL);
  vi.stubEnv("NEXT_PUBLIC_CONVEX_URL", CONVEX_URL);
  vi.stubEnv("CONVEX_SERVER_SECRET", SECRET);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/lead-capture", () => {
  it("envia o lead ao backend com a prova do servidor e o identificador do envio", async () => {
    const response = await POST(request(FORM));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(mocks.clients).toEqual([CONVEX_URL]);
    expect(mocks.mutation).toHaveBeenCalledTimes(1);
    expect(getFunctionName(mocks.mutation.mock.calls[0]![0])).toBe(
      "growth:captureWebsiteLead"
    );
    expect(sentArgs()).toMatchObject({
      serverSecret: SECRET,
      submissionId: SUBMISSION,
      name: "Pessoa Fixture",
      email: "pessoa.fixture@example.com",
      phone: "+5511900000001",
      source: "enterprise_home_pricing",
      businessName: "Barbearia Fixture",
      consent: true,
      salesContactRequestChannels: ["whatsapp"],
      whatsappMarketingConsent: false,
      emailMarketingConsent: false,
      landingPath: "/precos",
      utmSource: "google",
    });
    expect(sentArgs()).not.toHaveProperty("turnstileToken");
  });

  it("a resposta ao navegador nunca carrega a prova do servidor", async () => {
    const response = await POST(request(FORM));
    const text = await response.text();
    expect(text).not.toContain(SECRET);
    expect(text).not.toContain("serverSecret");
  });

  it("confere limite por IP e anti-robô antes de falar com o backend", async () => {
    await POST(request(FORM));
    expect(mocks.applyRateLimit).toHaveBeenCalledWith({
      bucket: "lead-capture",
      key: "203.0.113.7",
      limit: 15,
      windowMs: 60_000,
    });
    expect(mocks.verifyTurnstile).toHaveBeenCalledWith({
      token: "fixture-turnstile-token",
      ip: "203.0.113.7",
      expectedAction: "lead_capture",
    });
    expect(mocks.verifyTurnstile.mock.invocationCallOrder[0]!).toBeLessThan(
      mocks.mutation.mock.invocationCallOrder[0]!
    );
  });

  it("falha fechada sem CONVEX_SERVER_SECRET: 503, nenhuma chamada ao backend", async () => {
    for (const configured of [undefined, "", "   "]) {
      vi.stubEnv("CONVEX_SERVER_SECRET", configured);
      const response = await POST(request(FORM));
      expect(response.status).toBe(503);
      await expect(response.json()).resolves.toEqual({
        success: false,
        message: "Não foi possível registrar o contato agora.",
      });
    }
    expect(mocks.mutation).not.toHaveBeenCalled();
    expect(mocks.clients).toEqual([]);
    expect(mocks.captureLandingMessage).toHaveBeenCalledTimes(3);
    expect(mocks.captureLandingMessage.mock.calls[0]![1]).toBe(
      "lead-capture.configuration"
    );
  });

  it("falha fechada sem endereço do backend: 503, nenhuma chamada", async () => {
    vi.stubEnv("CONVEX_URL", undefined);
    const response = await POST(request(FORM));
    expect(response.status).toBe(503);
    expect(mocks.mutation).not.toHaveBeenCalled();
  });

  it("anti-robô recusado: 400 e nada chega ao backend", async () => {
    mocks.verifyTurnstile.mockResolvedValueOnce({
      success: false,
      skipped: false,
      errors: ["invalid-input-response"],
    });
    const response = await POST(request(FORM));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      message: "Falha na verificação anti-bot.",
    });
    expect(mocks.mutation).not.toHaveBeenCalled();
  });

  it("limite por IP atingido: 429 e nada chega ao backend", async () => {
    mocks.applyRateLimit.mockResolvedValueOnce({ allowed: false, retryAfterSeconds: 9 });
    const response = await POST(request(FORM));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("9");
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.mutation).not.toHaveBeenCalled();
  });

  it("campo-armadilha preenchido: resposta normal, sem anti-robô e sem backend", async () => {
    const response = await POST(request({ ...FORM, company: "bot" }));
    expect(response.status).toBe(200);
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.mutation).not.toHaveBeenCalled();
  });

  it("o navegador não consegue escolher nem sobrescrever a prova do servidor", async () => {
    await POST(request({ ...FORM, serverSecret: "escolhido-pelo-navegador" }));
    expect(sentArgs().serverSecret).toBe(SECRET);
  });

  it("repete o mesmo identificador em toda tentativa do mesmo envio", async () => {
    mocks.mutation.mockRejectedValueOnce(new Error("fetch failed"));
    const failed = await POST(request(FORM));
    expect(failed.status).toBe(500);
    const retried = await POST(request(FORM));
    expect(retried.status).toBe(200);
    expect(sentArgs(0).submissionId).toBe(SUBMISSION);
    expect(sentArgs(1).submissionId).toBe(SUBMISSION);
  });

  it("navegador com página antiga em cache (sem identificador) ainda envia, com um identificador por requisição", async () => {
    const legacy = { ...FORM, submissionId: undefined };
    await POST(request(legacy));
    await POST(request(legacy));
    const first = sentArgs(0).submissionId;
    const second = sentArgs(1).submissionId;
    expect(first).toMatch(/^[0-9a-f-]{36}$/);
    expect(second).toMatch(/^[0-9a-f-]{36}$/);
    expect(first).not.toBe(second);
    expect(sentArgs(0).serverSecret).toBe(SECRET);
  });

  it("recusa identificador fora do formato sem chamar o backend", async () => {
    const response = await POST(request({ ...FORM, submissionId: "não é um identificador" }));
    expect(response.status).toBe(400);
    expect(mocks.mutation).not.toHaveBeenCalled();
  });

  it("o evento de conversão é o mesmo nas tentativas do mesmo envio e muda em outro envio", async () => {
    const consent = {
      cookie: `cookieConsent=${encodeURIComponent(JSON.stringify({ marketing: true }))}`,
    };
    const first = (await (await POST(request(FORM, consent))).json()) as { metaEventId?: string };
    const retry = (await (await POST(request(FORM, consent))).json()) as { metaEventId?: string };
    const other = (await (
      await POST(request({ ...FORM, submissionId: "7c1d2e3f-4a5b-4c6d-8e7f-90a1b2c3d4e5" }, consent))
    ).json()) as { metaEventId?: string };

    expect(first.metaEventId).toBeTruthy();
    expect(retry.metaEventId).toBe(first.metaEventId);
    expect(other.metaEventId).not.toBe(first.metaEventId);
    expect(sentArgs(0).metaEventId).toBe(first.metaEventId);
    expect(sentArgs(1).metaEventId).toBe(first.metaEventId);
    expect(first.metaEventId).not.toBe(SUBMISSION);
  });

  it("sem consentimento de publicidade não há evento de conversão nem IP no envio", async () => {
    const body = (await (await POST(request(FORM))).json()) as { metaEventId?: string };
    expect(body.metaEventId).toBeUndefined();
    expect(sentArgs()).toMatchObject({
      metaEventId: undefined,
      clientIpAddress: undefined,
      clientUserAgent: undefined,
    });
  });

  it("recusa do backend vira erro honesto e a prova não vaza em log nem em telemetria", async () => {
    mocks.mutation.mockRejectedValueOnce(
      new Error(
        `ArgumentValidationError: Object contains extra field.\n\nObject: {name: "x", serverSecret: "${SECRET}"}`
      )
    );
    const response = await POST(request(FORM));
    expect(response.status).toBe(500);
    const text = await response.text();
    expect(JSON.parse(text)).toEqual({
      success: false,
      message: "Não foi possível registrar o contato agora.",
    });
    expect(text).not.toContain(SECRET);
    expect(mocks.captureLandingException).toHaveBeenCalledTimes(1);
    expect(everythingReported()).not.toContain(SECRET);
    const logged = JSON.stringify(
      vi.mocked(console.error).mock.calls.map((call) =>
        call.map((part) => (part instanceof Error ? `${part.message}\n${part.stack}` : part))
      )
    );
    expect(logged).not.toContain(SECRET);
  });

  it("dados inválidos: 400 sem anti-robô e sem backend", async () => {
    const response = await POST(request({ ...FORM, consent: false }));
    expect(response.status).toBe(400);
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.mutation).not.toHaveBeenCalled();
  });
});
