import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { getClientIp } from "@/lib/request-ip";
import { applyRateLimit } from "@/lib/rate-limit";
import { contactFormSchema, getValidationMessage } from "@/lib/validation";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";
export const preferredRegion = ["gru1"];

const CONTACT_WINDOW_MS = 60_000;
const CONTACT_LIMIT = 10;

type CaptureWebsiteLeadArgs = {
  name: string;
  email: string;
  phone?: string;
  source: string;
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
  salesContactRequestChannels: Array<"email" | "whatsapp">;
  salesContactRequestMessage: string;
  emailMarketingConsent: boolean;
};

const captureWebsiteLead = makeFunctionReference<
  "mutation",
  CaptureWebsiteLeadArgs,
  { accepted: true }
>("growth:captureWebsiteLead");

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

    const convexUrl =
      process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      Sentry.captureMessage("Convex configuration missing for contact form", {
        level: "error",
        tags: { component: "contact-form" },
      });
      return NextResponse.json(
        { success: false, message: "Não foi possível registrar o contato agora." },
        { status: 503 }
      );
    }

    const refererHeader = request.headers.get("referer") || "";
    const convex = new ConvexHttpClient(convexUrl);
    await convex.mutation(captureWebsiteLead, {
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
    Sentry.captureException(error, {
      tags: { component: "contact-form" },
      extra: { route: "/api/contact-form" },
    });
    return NextResponse.json(
      { success: false, message: "Não foi possível enviar sua mensagem." },
      { status: 500 }
    );
  }
}
