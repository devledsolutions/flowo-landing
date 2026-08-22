/**
 * Shared CTA destinations for the hero/nav slice.
 * Flowo is subscribers-only, pay-first: the primary CTA goes straight to the
 * app signup (no trial, no lead modal). The soft CTA opens WhatsApp.
 */
const SIGNUP_BASE_URL = "https://barber.flowo.com.br/sign-up";
export const LOGIN_URL = "https://barber.flowo.com.br";

type SignupPlan = "solo" | "equipe";
type SignupCycle = "monthly" | "yearly";

interface SignupUrlOptions {
  plan?: SignupPlan;
  cycle?: SignupCycle;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
}

/**
 * Keeps the visitor's commercial intent attached to the cross-domain signup.
 * Empresarial is deliberately excluded: that plan always enters the assisted
 * sales flow instead of account creation or checkout. The dashboard treats
 * these values as UX hints only and validates the actual plan and price again
 * during checkout.
 */
export function buildSignupUrl({
  plan,
  cycle,
  source = "flowo_site",
  medium = "website",
  campaign = "signup",
  content,
}: SignupUrlOptions = {}) {
  const url = new URL(SIGNUP_BASE_URL);

  if (plan) url.searchParams.set("plan", plan);
  if (cycle) url.searchParams.set("cycle", cycle);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  if (content) url.searchParams.set("utm_content", content);

  return url.toString();
}

// Keep a useful first-party source on server-rendered links even before the
// analytics provider hydrates and adds the consented anonymous handoff id.
export const SIGNUP_URL = buildSignupUrl();

export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5541936181301"
).replace(/\D/g, "");

export const WHATSAPP_NUMBER_E164 = `+${WHATSAPP_NUMBER}`;

export function buildWhatsAppUrl(
  message = "Olá! Vim pelo site da Flowo e gostaria de tirar algumas dúvidas."
) {
  const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
  url.searchParams.set("text", message);
  return url.toString();
}

export const WHATSAPP_URL = buildWhatsAppUrl();
