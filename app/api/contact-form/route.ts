import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getClientIp } from "@/lib/request-ip";
import { applyRateLimit } from "@/lib/rate-limit";
import { contactFormSchema, getValidationMessage } from "@/lib/validation";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  resolveWebsiteLeadBackend,
  sendWebsiteLead,
} from "@/lib/website-lead-backend";
import {
  captureLandingException,
  captureLandingMessage,
} from "@/lib/observability/posthog-server";

export const runtime = "nodejs";
export const preferredRegion = ["gru1"];

const CONTACT_WINDOW_MS = 60_000;
const CONTACT_LIMIT = 10;

function optional(value: string | undefined): string | undefined {
  return value || undefined;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await applyRateLimit({
    bucket: "contact-form",
    key: ip,
    limit: CONTACT_LIMIT,
    windowMs: CONTACT_WINDOW_MS,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "Muitas tentativas em sequência. Aguarde alguns segundos.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: getValidationMessage(parsed.error) },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone = "",
      contactChannel = "email",
      message,
      company = "",
      consent,
      emailMarketingConsent,
      landingPath = "",
      referrer = "",
      utmSource = "",
      utmMedium = "",
      utmCampaign = "",
      utmContent = "",
      utmTerm = "",
      fbclid = "",
      fbc = "",
      fbp = "",
      gclid = "",
      gbraid = "",
      wbraid = "",
      msclkid = "",
      ttclid = "",
      ctwaClid = "",
      segmentAnonymousId = "",
      turnstileToken = "",
      submissionId = randomUUID(),
    } = parsed.data;

    // Return success for honeypot submissions to discourage bot retries.
    if (company) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully",
      });
    }

    const turnstileCheck = await verifyTurnstile({
      token: turnstileToken,
      ip,
      expectedAction: "contact_form",
    });

    if (!turnstileCheck.success) {
      return NextResponse.json(
        { success: false, message: "Falha na verificação anti-bot." },
        { status: 400 }
      );
    }

    const resolved = resolveWebsiteLeadBackend();
    if (!resolved.ok) {
      await captureLandingMessage(
        "Convex configuration missing for contact form",
        "contact-form.configuration",
        {
          component: "contact-form",
          error_type: "configuration",
          missing: resolved.missing,
        },
      );
      return NextResponse.json(
        { success: false, message: "Não foi possível registrar o contato agora." },
        { status: 503 }
      );
    }

    const refererHeader = request.headers.get("referer") || "";
    await sendWebsiteLead(resolved.backend, submissionId, {
      name,
      email,
      phone: optional(phone),
      source: "contact:site",
      landingPath: landingPath || refererHeader || "/contato",
      referrer: optional(referrer),
      utmSource: optional(utmSource),
      utmMedium: optional(utmMedium),
      utmCampaign: optional(utmCampaign),
      utmContent: optional(utmContent),
      utmTerm: optional(utmTerm),
      fbclid: optional(fbclid),
      fbc: optional(fbc),
      fbp: optional(fbp),
      gclid: optional(gclid),
      gbraid: optional(gbraid),
      wbraid: optional(wbraid),
      msclkid: optional(msclkid),
      ttclid: optional(ttclid),
      ctwaClid: optional(ctwaClid),
      segmentAnonymousId: optional(segmentAnonymousId),
      consent,
      salesContactRequestChannels:
        contactChannel === "whatsapp" ? ["whatsapp"] : ["email"],
      salesContactRequestMessage: message,
      emailMarketingConsent,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    await captureLandingException(error, "contact-form.uncaught", {
      component: "contact-form",
      route: "/api/contact-form",
    });
    return NextResponse.json(
      { success: false, message: "Não foi possível enviar sua mensagem." },
      { status: 500 }
    );
  }
}
