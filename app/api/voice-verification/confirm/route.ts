import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { getClientIp } from "@/lib/request-ip";
import { applyRateLimit } from "@/lib/rate-limit";
import { resolveConvexUrl } from "@/lib/server-environment";
import { captureLandingException } from "@/lib/observability/posthog-server";

export const runtime = "nodejs";
export const preferredRegion = ["gru1"];

/**
 * Confere o código. O backend conta as tentativas por código e encerra a linha
 * na quinta; este limite por IP só evita que um script varra vários telefones
 * em paralelo.
 */
const WINDOW_MS = 60_000;
const LIMIT = 10;

const confirmPhoneVerificationCode = makeFunctionReference<
  "mutation",
  { phone: string; code: string; website?: string },
  {
    verified: boolean;
    consentGranted: boolean;
    attemptsRemaining: number;
    reason?: string;
  }
>("growthLeadPhoneVerification:confirmPhoneVerificationCode");

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await applyRateLimit({
    bucket: "voice-verification-confirm",
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

  let payload: { phone?: unknown; code?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const code = typeof payload.code === "string" ? payload.code.trim() : "";
  if (!phone || !code) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const convexUrl = resolveConvexUrl();
  if (!convexUrl) {
    return NextResponse.json(
      { success: false, message: "Não foi possível conferir o código agora." },
      { status: 503 }
    );
  }

  try {
    const convex = new ConvexHttpClient(convexUrl);
    const result = await convex.mutation(confirmPhoneVerificationCode, {
      phone,
      code,
    });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    await captureLandingException(error, "voice-verification.confirm.uncaught", {
      component: "voice-verification",
    });
    return NextResponse.json(
      { success: false, message: "Não foi possível conferir o código agora." },
      { status: 502 }
    );
  }
}
