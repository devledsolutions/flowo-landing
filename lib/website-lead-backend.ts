import { createHash } from "node:crypto";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { resolveConvexUrl } from "@/lib/server-environment";

/**
 * Fronteira servidor -> backend da captura de lead.
 *
 * `growth:captureWebsiteLead` só aceita quem apresenta `CONVEX_SERVER_SECRET`.
 * Só as rotas de servidor do site têm esse valor, e elas só chegam aqui depois
 * do limite por IP e do anti-robô. Este módulo importa `node:crypto`: o build
 * falha se um componente de navegador tentar importá-lo.
 */

export type WebsiteLead = {
  name: string;
  email?: string;
  phone?: string;
  source: string;
  businessName?: string;
  professionalsCount?: number;
  unitsCount?: number;
  purchaseTimeline?: "now" | "quarter" | "planning";
  experimentKey?: string;
  experimentVariant?: string;
  requestedResource?: string;
  landingPath: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  fbc?: string;
  fbp?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  ttclid?: string;
  ctwaClid?: string;
  segmentAnonymousId?: string;
  consent: true;
  salesContactRequestChannels?: Array<"email" | "phone" | "whatsapp">;
  voiceContactConsent?: boolean;
  voiceContactConsentVersion?: string;
  salesContactRequestMessage?: string;
  emailMarketingConsent?: boolean;
  smsMarketingConsent?: boolean;
  whatsappMarketingConsent?: boolean;
  marketingConsent?: boolean;
  advertisingConsent?: boolean;
  advertisingConsentVersion?: string;
  metaEventId?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  eventSourceUrl?: string;
  website?: string;
};

type CaptureWebsiteLeadArgs = WebsiteLead & {
  serverSecret: string;
  submissionId: string;
};

const captureWebsiteLead = makeFunctionReference<
  "mutation",
  CaptureWebsiteLeadArgs,
  { accepted: true }
>("growth:captureWebsiteLead");

export type WebsiteLeadBackend = {
  convexUrl: string;
  serverSecret: string;
};

export type WebsiteLeadBackendResolution =
  | { ok: true; backend: WebsiteLeadBackend }
  | { ok: false; missing: "convex_url" | "server_secret" };

/**
 * Sem endereço do backend ou sem o segredo do servidor não há envio: a rota
 * responde que não conseguiu registrar, em vez de chamar o backend sem prova.
 */
export function resolveWebsiteLeadBackend(): WebsiteLeadBackendResolution {
  const convexUrl = resolveConvexUrl();
  if (!convexUrl) return { ok: false, missing: "convex_url" };
  const serverSecret = process.env.CONVEX_SERVER_SECRET;
  if (!serverSecret?.trim()) return { ok: false, missing: "server_secret" };
  return { ok: true, backend: { convexUrl, serverSecret } };
}

const REDACTED = "[Redacted credential]";

/**
 * O backend pode devolver os argumentos recusados dentro da mensagem de erro.
 * A rota registra e reporta esse erro, então o segredo sai dele antes.
 */
function withoutServerSecret(error: unknown, serverSecret: string): Error {
  // O backend imprime os argumentos como texto entre aspas, com escape.
  const quoted = JSON.stringify(serverSecret).slice(1, -1);
  const redact = (text: string) =>
    text.split(serverSecret).join(REDACTED).split(quoted).join(REDACTED);
  if (!(error instanceof Error)) return new Error(redact(String(error)));
  const safe = new Error(redact(error.message));
  safe.name = error.name;
  safe.stack = error.stack ? redact(error.stack) : undefined;
  return safe;
}

export async function sendWebsiteLead(
  backend: WebsiteLeadBackend,
  submissionId: string,
  lead: WebsiteLead
): Promise<void> {
  const convex = new ConvexHttpClient(backend.convexUrl);
  try {
    await convex.mutation(captureWebsiteLead, {
      ...lead,
      serverSecret: backend.serverSecret,
      submissionId,
    });
  } catch (error) {
    throw withoutServerSecret(error, backend.serverSecret);
  }
}

/**
 * Identificador do evento de conversão do envio. Vem do identificador do
 * envio para que a nova tentativa do mesmo formulário use o mesmo evento: o
 * navegador e o servidor reportam uma conversão só, não duas.
 */
export function websiteLeadMetaEventId(submissionId: string): string {
  const hex = createHash("sha256")
    .update(`flowo:website-lead:meta-event:${submissionId}`)
    .digest("hex");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}
