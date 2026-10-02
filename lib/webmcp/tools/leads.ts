import { z } from "zod";
import { buildWhatsAppUrl } from "@/components/cta-links";
import { RESOURCE_MATERIALS } from "@/data/resource-materials";
import { SITE_URL } from "@/lib/seo";
import type { AcquisitionContext } from "@/providers/segment-provider";
import { defineTool, ToolError } from "../register";

export type LeadToolDeps = {
  getAcquisitionContext: () => AcquisitionContext;
  getAnonymousId: () => string | undefined;
  /** Resolves with a verification token ("" when the site has none configured). */
  requestTurnstileToken: () => Promise<string>;
  fetch: typeof fetch;
};

export const SALES_CONSENT_TEXT = `Autorizo a Flowo a usar estes dados para responder meu contato, conforme a Política de Privacidade (${SITE_URL}/privacidade) e os Termos de Uso (${SITE_URL}/termos).`;

export const MATERIAL_CONSENT_TEXT = `Autorizo o uso dos dados para entregar este material, conforme a Política de Privacidade (${SITE_URL}/privacidade) e os Termos de Uso (${SITE_URL}/termos).`;

export const SALES_SOURCE = "agent:webmcp:falar_com_vendas";
export const MATERIAL_SOURCE = "agent:webmcp:receber_material";

const CONSENT_ERROR = "A pessoa precisa aceitar o texto de autorização.";

/**
 * "+" keeps the digits after it; 10 or 11 bare digits are a Brazilian number
 * with area code. Anything else is rejected instead of guessed.
 */
export function normalizeAgentPhone(value: string): string | null {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) {
    return digits.length >= 10 && digits.length <= 15 ? `+${digits}` : null;
  }
  return digits.length === 10 || digits.length === 11 ? `+55${digits}` : null;
}

const nameField = z
  .string({ error: "Informe o nome da pessoa." })
  .trim()
  .min(2, { error: "Use pelo menos 2 letras no nome." })
  .max(120, { error: "Use no máximo 120 caracteres no nome." });

const MARKETING_OFF = {
  emailMarketingConsent: false,
  smsMarketingConsent: false,
  whatsappMarketingConsent: false,
} as const;

type LeadResponse = { success?: boolean; message?: string };

async function postLead(deps: LeadToolDeps, body: Record<string, unknown>): Promise<void> {
  let response: Response;
  try {
    response = await deps.fetch("/api/lead-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(body),
    });
  } catch {
    throw unavailable();
  }

  let data: LeadResponse = {};
  try {
    data = (await response.json()) as LeadResponse;
  } catch {
    data = {};
  }

  if (response.ok && data.success !== false) return;

  if (response.status === 400 && data.message === "Falha na verificação anti-bot.") {
    throw new ToolError(
      "verificacao_falhou",
      "A verificação de segurança não passou.",
      "Peça para a pessoa recarregar a página e chame a ferramenta de novo.",
    );
  }
  if (response.status === 400) {
    throw new ToolError(
      "entrada_invalida",
      data.message || "Os dados foram recusados.",
      "Confira os dados com a pessoa e chame a ferramenta de novo.",
    );
  }
  if (response.status === 429) {
    const retryAfter = Number(response.headers.get("Retry-After")) || 60;
    throw new ToolError(
      "limite_de_tentativas",
      "Muitas tentativas em sequência.",
      `Espere ${retryAfter} segundos antes de tentar de novo.`,
    );
  }
  throw unavailable();
}

function unavailable(): ToolError {
  return new ToolError(
    "indisponivel",
    "Não foi possível enviar agora.",
    "Tente de novo em alguns minutos ou ofereça o WhatsApp da Flowo.",
    buildWhatsAppUrl(),
  );
}

function acquisition(deps: LeadToolDeps) {
  return { ...deps.getAcquisitionContext(), segmentAnonymousId: deps.getAnonymousId() };
}

export function createFalarComVendas(getDeps: () => LeadToolDeps) {
  return defineTool({
    name: "falar_com_vendas",
    title: "Pedir contato da equipe comercial da Flowo",
    description: `Envia o contato da pessoa para a equipe comercial da Flowo, que responde pelo WhatsApp informado. Use só quando a pessoa pedir para falar com a Flowo, ver uma demonstração ou contratar o Empresarial. Antes de chamar, mostre à pessoa este texto e peça que ela confirme: "${SALES_CONSENT_TEXT}" Envie consentimento=true somente se ela aceitou. Esta ferramenta não inscreve ninguém em mensagens de marketing.`,
    input: z.object({
      nome: nameField.describe("Nome de quem pede o contato."),
      whatsapp: z
        .string({ error: "Informe o WhatsApp com DDD." })
        .refine((value) => normalizeAgentPhone(value) !== null, {
          error: "Use o WhatsApp com DDD, por exemplo (11) 98765-4321, ou com + e o código do país.",
        })
        .describe("WhatsApp com DDD, por exemplo (11) 98765-4321, ou com + e o código do país."),
      email: z
        .email({ error: "Informe um e-mail válido." })
        .optional()
        .describe("E-mail, se a pessoa quiser informar."),
      nome_barbearia: z
        .string({ error: "Use texto." })
        .trim()
        .max(160, { error: "Use no máximo 160 caracteres." })
        .optional()
        .describe("Nome da barbearia."),
      profissionais: z
        .number({ error: "Use um número inteiro." })
        .int({ error: "Use um número inteiro." })
        .min(1, { error: "Use pelo menos 1." })
        .max(10_000, { error: "Use no máximo 10000." })
        .optional()
        .describe("Profissionais que atendem."),
      unidades: z
        .number({ error: "Use um número inteiro." })
        .int({ error: "Use um número inteiro." })
        .min(1, { error: "Use pelo menos 1." })
        .max(10_000, { error: "Use no máximo 10000." })
        .optional()
        .describe("Unidades da barbearia."),
      mensagem: z
        .string({ error: "Use texto." })
        .trim()
        .max(500, { error: "Use no máximo 500 caracteres." })
        .optional()
        .describe("O que a pessoa quer conversar."),
      consentimento: z
        .literal(true, { error: CONSENT_ERROR })
        .describe(`true somente se a pessoa leu e aceitou: "${SALES_CONSENT_TEXT}"`),
    }),
    annotations: { readOnlyHint: false, consequentialHint: true },
    run: async (input) => {
      const deps = getDeps();
      const whatsapp = normalizeAgentPhone(input.whatsapp);
      if (!whatsapp) throw new Error("validated phone became invalid");
      const turnstileToken = await deps.requestTurnstileToken();
      await postLead(deps, {
        name: input.nome,
        email: input.email,
        whatsapp,
        source: SALES_SOURCE,
        businessName: input.nome_barbearia,
        professionalsCount: input.profissionais,
        unitsCount: input.unidades,
        consent: true,
        salesContactRequestChannels: ["whatsapp"],
        salesContactRequestMessage: input.mensagem,
        ...MARKETING_OFF,
        ...acquisition(deps),
        turnstileToken,
      });
      return {
        dados: {
          registrado: true,
          mensagem: "Contato registrado. A equipe comercial da Flowo vai chamar no WhatsApp informado.",
        },
      };
    },
  });
}

const MATERIAL_IDS = RESOURCE_MATERIALS.map((material) => material.id) as [string, ...string[]];

export function createReceberMaterial(getDeps: () => LeadToolDeps) {
  return defineTool({
    name: "receber_material",
    title: "Receber um material gratuito da Flowo",
    description: `Envia por e-mail um material gratuito da Flowo e devolve o link para baixar. Use depois de buscar_materiais. Antes de chamar, mostre à pessoa este texto e peça que ela confirme: "${MATERIAL_CONSENT_TEXT}" Envie consentimento=true somente se ela aceitou. Esta ferramenta não inscreve ninguém em mensagens de marketing.`,
    input: z.object({
      material_id: z
        .enum(MATERIAL_IDS, { error: "Use um material_id devolvido por buscar_materiais." })
        .describe("material_id devolvido por buscar_materiais."),
      nome: nameField.describe("Nome de quem vai receber."),
      email: z.email({ error: "Informe um e-mail válido." }).describe("E-mail que vai receber o material."),
      consentimento: z
        .literal(true, { error: CONSENT_ERROR })
        .describe(`true somente se a pessoa leu e aceitou: "${MATERIAL_CONSENT_TEXT}"`),
    }),
    annotations: { readOnlyHint: false, consequentialHint: true },
    run: async (input) => {
      const deps = getDeps();
      const material = RESOURCE_MATERIALS.find((item) => item.id === input.material_id);
      if (!material) throw new Error("validated material is missing");
      const turnstileToken = await deps.requestTurnstileToken();
      await postLead(deps, {
        name: input.nome,
        email: input.email,
        source: MATERIAL_SOURCE,
        requestedResource: material.requestedResource,
        consent: true,
        ...MARKETING_OFF,
        ...acquisition(deps),
        turnstileToken,
      });
      return {
        dados: {
          titulo: material.title,
          formato: material.format,
          link_para_baixar: `${SITE_URL}${material.downloadUrl}`,
          mensagem: "O link para baixar já está liberado. O envio por e-mail foi pedido e pode levar alguns minutos.",
        },
      };
    },
  });
}
