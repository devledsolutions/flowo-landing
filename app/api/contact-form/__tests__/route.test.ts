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
const SUBMISSION = "5d4c3b2a-1f0e-4d9c-8b7a-6f5e4d3c2b1a";

const FORM = {
  name: "Pessoa Fixture",
  email: "pessoa.fixture@example.com",
  phone: "+5511900000001",
  contactChannel: "whatsapp",
  message: "Quero entender como funciona para duas unidades.",
  consent: true,
  emailMarketingConsent: false,
  landingPath: "/contato",
  turnstileToken: "fixture-turnstile-token",
  submissionId: SUBMISSION,
};

function request(body: unknown) {
  return new Request("http://localhost:3001/api/contact-form", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.8" },
    body: JSON.stringify(body),
  });
}

function sentArgs(call = 0): Record<string, unknown> {
  return mocks.mutation.mock.calls[call]![1] as Record<string, unknown>;
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
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/contact-form", () => {
  it("envia o contato ao backend com a prova do servidor e o identificador do envio", async () => {
    const response = await POST(request(FORM));

    expect(response.status).toBe(200);
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
      source: "contact:site",
      landingPath: "/contato",
      consent: true,
      salesContactRequestChannels: ["whatsapp"],
      salesContactRequestMessage: "Quero entender como funciona para duas unidades.",
      emailMarketingConsent: false,
    });
    const text = await response.text();
    expect(text).not.toContain(SECRET);
  });

  it("pedido de resposta por e-mail segue sem canal de WhatsApp", async () => {
    await POST(request({ ...FORM, contactChannel: "email", phone: "" }));
    expect(sentArgs()).toMatchObject({
      salesContactRequestChannels: ["email"],
      phone: undefined,
    });
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
    expect(mocks.captureLandingMessage.mock.calls[0]![1]).toBe(
      "contact-form.configuration"
    );
  });

  it("anti-robô recusado, limite atingido e campo-armadilha não chegam ao backend", async () => {
    mocks.verifyTurnstile.mockResolvedValueOnce({
      success: false,
      skipped: false,
      errors: ["invalid-input-response"],
    });
    expect((await POST(request(FORM))).status).toBe(400);

    mocks.applyRateLimit.mockResolvedValueOnce({ allowed: false, retryAfterSeconds: 7 });
    expect((await POST(request(FORM))).status).toBe(429);

    expect((await POST(request({ ...FORM, company: "bot" }))).status).toBe(200);
    expect(mocks.mutation).not.toHaveBeenCalled();
    expect(mocks.verifyTurnstile).toHaveBeenCalledWith({
      token: "fixture-turnstile-token",
      ip: "203.0.113.8",
      expectedAction: "contact_form",
    });
  });

  it("o navegador não consegue escolher a prova do servidor", async () => {
    await POST(request({ ...FORM, serverSecret: "escolhido-pelo-navegador" }));
    expect(sentArgs().serverSecret).toBe(SECRET);
  });

  it("página antiga em cache (sem identificador) ainda envia, com um identificador por requisição", async () => {
    const legacy = { ...FORM, submissionId: undefined };
    await POST(request(legacy));
    await POST(request(legacy));
    expect(sentArgs(0).submissionId).toMatch(/^[0-9a-f-]{36}$/);
    expect(sentArgs(0).submissionId).not.toBe(sentArgs(1).submissionId);
  });

  it("recusa do backend vira erro honesto e a prova não vaza na telemetria", async () => {
    mocks.mutation.mockRejectedValueOnce(
      new Error(`Server Error\nObject: {serverSecret: "${SECRET}"}`)
    );
    const response = await POST(request(FORM));
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      success: false,
      message: "Não foi possível enviar sua mensagem.",
    });
    const reported = JSON.stringify(
      mocks.captureLandingException.mock.calls.map(([error, ...rest]) => [
        String(error),
        (error as Error | undefined)?.stack,
        rest,
      ])
    );
    expect(mocks.captureLandingException).toHaveBeenCalledTimes(1);
    expect(reported).not.toContain(SECRET);
  });
});
