/**
 * Shared CTA destinations for the hero/nav slice.
 * Flowo is subscribers-only, pay-first: the primary CTA goes straight to the
 * app signup (no trial, no lead modal). The soft CTA opens WhatsApp.
 */
export const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";
export const LOGIN_URL = "https://barber.flowo.com.br";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "551150265112";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Oi! Quero saber mais sobre o Flowo."
)}`;
