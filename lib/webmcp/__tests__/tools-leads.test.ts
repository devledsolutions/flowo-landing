import { describe, expect, it, vi } from "vitest";
import { createExecute, ToolError, type ToolResult } from "../register";
import {
  createFalarComVendas,
  createReceberMaterial,
  normalizeAgentPhone,
  SALES_CONSENT_TEXT,
  type LeadToolDeps,
} from "../tools/leads";
import { call } from "./helpers";

function deps(response: Response | Error = jsonResponse(200, { success: true })) {
  const fetch = vi.fn(async () => {
    if (response instanceof Error) throw response;
    return response;
  });
  const confirm = vi.fn(async () => "token-ok");
  const value: LeadToolDeps = {
    getAcquisitionContext: () => ({ landingPath: "/precos", utmSource: "google" }),
    getAnonymousId: () => undefined,
    confirmSubmission: confirm,
    fetch: fetch as unknown as typeof globalThis.fetch,
  };
  return { value, fetch, token: confirm };
}

function jsonResponse(status: number, body: unknown, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

const VALID = {
  nome: "Pessoa Teste",
  whatsapp: "(11) 98765-4321",
  email: "flowo-qa-webmcp-unit@flowo.com.br",
  nome_barbearia: "Barbearia Teste",
  profissionais: 3,
  unidades: 1,
  mensagem: "Quero ver uma demonstração.",
  consentimento: true,
};

function sentBody(fetch: ReturnType<typeof vi.fn>) {
  const [url, init] = fetch.mock.calls[0] as [string, RequestInit];
  return { url, body: JSON.parse(String(init.body)) as Record<string, unknown> };
}

describe("normalizeAgentPhone", () => {
  it.each([
    ["(11) 98765-4321", "+5511987654321"],
    ["1133334444", "+551133334444"],
    ["+1 555 010 0001", "+15550100001"],
    ["+55 (11) 98765-4321", "+5511987654321"],
    ["5511987654321", null],
    ["98765-4321", null],
    ["+123", null],
  ])("%s -> %s", (input, expected) => {
    expect(normalizeAgentPhone(input)).toBe(expected);
  });
});

describe("falar_com_vendas", () => {
  it.each([[{ ...VALID, consentimento: false }], [{ ...VALID, consentimento: undefined }], [{ ...VALID, consentimento: "sim" }]])(
    "refuses without explicit consent and sends nothing (%#)",
    async (input) => {
      const { value, fetch, token } = deps();
      const result = await call(createFalarComVendas(() => value), input);
      expect(!result.ok && result.erro.codigo).toBe("entrada_invalida");
      expect(!result.ok && result.erro.campos).toContainEqual({
        campo: "consentimento",
        problema: "A pessoa precisa aceitar o texto de autorização.",
      });
      expect(fetch).not.toHaveBeenCalled();
      expect(token).not.toHaveBeenCalled();
    },
  );

  it("makes one POST marked as an agent sales request, without honeypot or marketing", async () => {
    const { value, fetch } = deps();
    const result = await call(createFalarComVendas(() => value), VALID);
    expect(result.ok).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    const { url, body } = sentBody(fetch);
    expect(url).toBe("/api/lead-capture");
    expect(body).toMatchObject({
      name: "Pessoa Teste",
      whatsapp: "+5511987654321",
      email: "flowo-qa-webmcp-unit@flowo.com.br",
      source: "agent:webmcp:falar_com_vendas",
      businessName: "Barbearia Teste",
      professionalsCount: 3,
      unitsCount: 1,
      consent: true,
      salesContactRequestChannels: ["whatsapp"],
      salesContactRequestMessage: "Quero ver uma demonstração.",
      emailMarketingConsent: false,
      smsMarketingConsent: false,
      whatsappMarketingConsent: false,
      landingPath: "/precos",
      utmSource: "google",
      turnstileToken: "token-ok",
    });
    expect(body).not.toHaveProperty("company");
    expect(body).not.toHaveProperty("voiceContactConsent");
  });

  it("repeats the full consent text in the tool description", () => {
    const tool = createFalarComVendas(() => deps().value);
    expect(tool.description).toContain(SALES_CONSENT_TEXT);
  });

  it.each([
    [jsonResponse(400, { success: false, message: "Falha na verificação anti-bot." }), "verificacao_falhou"],
    [jsonResponse(400, { success: false, message: "Informe um WhatsApp válido." }), "entrada_invalida"],
    [jsonResponse(429, { success: false }, { "Retry-After": "42" }), "limite_de_tentativas"],
    [jsonResponse(503, { success: false }), "indisponivel"],
    [new TypeError("network down"), "indisponivel"],
  ] as const)("maps the server answer (%#) to %s", async (response, code) => {
    const { value } = deps(response);
    const result = await call(createFalarComVendas(() => value), VALID);
    expect(!result.ok && result.erro.codigo).toBe(code);
    if (!result.ok && code === "limite_de_tentativas") expect(result.erro.como_resolver).toContain("42 segundos");
    if (!result.ok && code === "indisponivel") expect(result.erro.alternativa).toMatch(/^https:\/\/wa\.me\//);
  });

  it("shows the exact data and the consent kind before sending", async () => {
    const { value, token } = deps();
    await call(createFalarComVendas(() => value), VALID);
    expect(token).toHaveBeenCalledTimes(1);
    const [request] = token.mock.calls[0] as unknown as [unknown];
    expect(request).toEqual({
      titulo: "Pedido de contato com a equipe comercial",
      campos: [
        { rotulo: "Nome", valor: "Pessoa Teste" },
        { rotulo: "WhatsApp", valor: "+5511987654321" },
        { rotulo: "E-mail", valor: "flowo-qa-webmcp-unit@flowo.com.br" },
        { rotulo: "Barbearia", valor: "Barbearia Teste" },
        { rotulo: "Profissionais", valor: "3" },
        { rotulo: "Unidades", valor: "1" },
        { rotulo: "Mensagem", valor: "Quero ver uma demonstração." },
      ],
      consentimento: "vendas",
    });
  });

  it("treats empty optional fields as not informed", async () => {
    const { value, fetch, token } = deps();
    const result = await call(createFalarComVendas(() => value), {
      nome: "Pessoa Teste",
      whatsapp: "(11) 98765-4321",
      email: "",
      nome_barbearia: " ",
      profissionais: "",
      unidades: "",
      mensagem: "",
      consentimento: true,
    });
    expect(result.ok).toBe(true);
    const { body } = sentBody(fetch);
    for (const key of ["email", "businessName", "professionalsCount", "unitsCount", "salesContactRequestMessage"]) {
      expect(body).not.toHaveProperty(key);
    }
    const [request] = token.mock.calls[0] as unknown as [{ campos: Array<{ rotulo: string }> }];
    expect(request.campos.map((campo) => campo.rotulo)).toEqual(["Nome", "WhatsApp"]);
  });

  it("sends nothing when the person does not confirm in time or cancels", async () => {
    for (const error of [
      new ToolError("verificacao_pendente", "Não terminou.", "Peça para concluir."),
      new ToolError("cancelado_pela_pessoa", "Cancelou.", "Não envie de novo."),
    ]) {
      const { value, fetch } = deps();
      value.confirmSubmission = vi.fn(async () => {
        throw error;
      });
      const result = await call(createFalarComVendas(() => value), VALID);
      expect(!result.ok && result.erro.codigo).toBe(error.codigo);
      expect(fetch).not.toHaveBeenCalled();
    }
  });
});

describe("receber_material", () => {
  it("maps the material to the backend resource and returns an absolute link", async () => {
    const { value, fetch } = deps();
    const result = await call(createReceberMaterial(() => value), {
      material_id: "comissoes-sem-planilha",
      nome: "Pessoa Teste",
      email: "flowo-qa-webmcp-unit@flowo.com.br",
      consentimento: true,
    });
    expect(result.ok).toBe(true);
    const { body } = sentBody(fetch);
    expect(body).toMatchObject({
      source: "agent:webmcp:receber_material",
      requestedResource: "comissoes_sem_planilha",
      consent: true,
      emailMarketingConsent: false,
    });
    expect(body).not.toHaveProperty("company");
    expect(body).not.toHaveProperty("salesContactRequestChannels");
    expect(result.ok && (result.dados as { link_para_baixar: string }).link_para_baixar).toBe(
      "http://localhost:3001/downloads/comissoes-sem-planilha-flowo.pdf",
    );
  });

  it("rejects an unknown material and missing consent", async () => {
    const { value, fetch } = deps();
    const result = await call(createReceberMaterial(() => value), {
      material_id: "nao-existe",
      nome: "Pessoa Teste",
      email: "pessoa@exemplo.com.br",
    });
    expect(!result.ok && result.erro.campos?.map((field) => field.campo).sort()).toEqual([
      "consentimento",
      "material_id",
    ]);
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("abort signal", () => {
  async function run(tool: ReturnType<typeof createFalarComVendas>, signal: AbortSignal): Promise<ToolResult> {
    const execute = createExecute(tool, () => undefined);
    return JSON.parse(await execute(JSON.stringify(VALID), { signal })) as ToolResult;
  }

  it("does not open the confirmation for a call already cancelled", async () => {
    const { value, fetch, token } = deps();
    const controller = new AbortController();
    controller.abort();
    const result = await run(createFalarComVendas(() => value), controller.signal);
    expect(!result.ok && result.erro.codigo).toBe("cancelado_pelo_assistente");
    expect(token).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("passes the signal to the confirmation", async () => {
    const { value, token } = deps();
    const controller = new AbortController();
    await run(createFalarComVendas(() => value), controller.signal);
    expect((token.mock.calls[0] as unknown as [unknown, AbortSignal])[1]).toBe(controller.signal);
  });

  it("does not send when the call is cancelled right after the confirmation", async () => {
    const { value, fetch } = deps();
    const controller = new AbortController();
    value.confirmSubmission = vi.fn(async () => {
      controller.abort();
      return "token-ok";
    });
    const result = await run(createFalarComVendas(() => value), controller.signal);
    expect(!result.ok && result.erro.codigo).toBe("cancelado_pelo_assistente");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does the same for receber_material", async () => {
    const { value, fetch } = deps();
    const controller = new AbortController();
    value.confirmSubmission = vi.fn(async () => {
      controller.abort();
      return "";
    });
    const execute = createExecute(createReceberMaterial(() => value), () => undefined);
    const result = JSON.parse(
      await execute(
        JSON.stringify({ material_id: "comissoes-sem-planilha", nome: "Pessoa", email: "pessoa@exemplo.com.br", consentimento: true }),
        { signal: controller.signal },
      ),
    ) as ToolResult;
    expect(!result.ok && result.erro.codigo).toBe("cancelado_pelo_assistente");
    expect(fetch).not.toHaveBeenCalled();
  });
});
