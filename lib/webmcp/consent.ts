import { SITE_URL } from "@/lib/seo";

/**
 * Consent sentences for the contact tools. The agent shows the full sentence
 * with the two URLs; the confirmation panel shows the same sentence with the
 * two documents as links, exactly like the site's own forms.
 */
export const CONSENT_PREFIX = {
  vendas: "Autorizo a Flowo a usar estes dados para responder meu contato",
  material: "Autorizo o uso dos dados para entregar este material",
} as const;

export type ConsentKind = keyof typeof CONSENT_PREFIX;

export function consentTextWithUrls(kind: ConsentKind): string {
  return `${CONSENT_PREFIX[kind]}, conforme a Política de Privacidade (${SITE_URL}/privacidade) e os Termos de Uso (${SITE_URL}/termos).`;
}
