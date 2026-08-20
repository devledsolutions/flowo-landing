import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { getClientIp } from "@/lib/request-ip";
import { applyRateLimit } from "@/lib/rate-limit";
import { VOICE_CONTACT_CONSENT_VERSION } from "@/lib/voice-verification";

export const runtime = "nodejs";
export const preferredRegion = ["gru1"];

/**
 * Pede o código que prova a posse do telefone.
 *
 * Este limite por IP é o primeiro de três: o backend cobra mais dois, por
 * telefone e global, além de um teto diário. Aqui é só para um script não
 * queimar crédito de SMS antes mesmo de chegar ao Convex.
 */
const WINDOW_MS = 60_000;
const LIMIT = 5;

const requestPhoneVerificationCode = makeFunctionReference<
  "mutation",
  { phone: string; source: string; consentVersion: string; website?: string },
  { accepted: true; channel: string; codeLength: number; expiresInSeconds: number }
>("growthLeadPhoneVerification:requestPhoneVerificationCode");

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await applyRateLimit({
    bucket: "voice-verification-request",
    key: ip,
    limit: LIMIT,
    windowMs: WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, message: "Muitas tentativas. Aguarde um minuto." },
      { status: 429 }
    );
  }

  let payload: { phone?: unknown; source?: unknown; website?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  if (!phone) {
    return NextResponse.json(
      { success: false, message: "Informe o telefone." },
      { status: 400 }
    );
  }

  const convexUrl = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    Sentry.captureMessage("Convex configuration missing for voice verification", {
      level: "error",
    });
    return NextResponse.json(
      { success: false, message: "Não foi possível enviar o código agora." },
      { status: 503 }
    );
  }

  try {
    const convex = new ConvexHttpClient(convexUrl);
    const result = await convex.mutation(requestPhoneVerificationCode, {
      phone,
      source: "landing",
      consentVersion: VOICE_CONTACT_CONSENT_VERSION,
      // Campo-armadilha: robô preenche, gente não vê.
      website: typeof payload.website === "string" ? payload.website : undefined,
    });
    // A resposta é sempre a mesma, com ou sem lead correspondente. Revelar a
    // diferença entregaria quem já é lead a quem tentar adivinhar telefones.
    return NextResponse.json({
      success: true,
      codeLength: result.codeLength,
      expiresInSeconds: result.expiresInSeconds,
    });
  } catch (error) {
    Sentry.captureException(error, { tags: { component: "voice-verification" } });
    return NextResponse.json(
      { success: false, message: "Não foi possível enviar o código agora." },
      { status: 502 }
    );
  }
}
