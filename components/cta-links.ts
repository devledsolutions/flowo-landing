/**
 * Shared CTA destinations for the hero/nav slice.
 * Flowo is subscribers-only, pay-first: the primary CTA goes straight to the
 * app signup (no trial, no lead modal). The soft CTA opens WhatsApp.
 */
export const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";
export const LOGIN_URL = "https://barber.flowo.com.br";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5519998053595";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Flowo e gostaria de tirar algumas dúvidas."
)}`;
