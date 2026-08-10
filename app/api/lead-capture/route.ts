import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { getClientIp } from "@/lib/request-ip";
import { applyRateLimit } from "@/lib/rate-limit";
import { leadCaptureSchema, getValidationMessage } from "@/lib/validation";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";
export const preferredRegion = ["gru1"];

const LEAD_CAPTURE_WINDOW_MS = 60_000;
const LEAD_CAPTURE_LIMIT = 15;

type CaptureWebsiteLeadArgs = {
  name: string;
  email?: string;
  phone?: string;
  source: string;
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
  segmentAnonymousId?: string;
  consent: true;
  emailMarketingConsent?: boolean;
  smsMarketingConsent?: boolean;
  marketingConsent?: boolean;
  website?: string;
};

const captureWebsiteLead = makeFunctionReference<
  "mutation",
  CaptureWebsiteLeadArgs,
  { accepted: true }
>("growth:captureWebsiteLead");

function optional(value: string | undefined): string | undefined {
  return value || undefined;
}

function tooManyRequestsResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    {
      success: false,
      message: "Muitas tentativas em sequência. Aguarde alguns segundos.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    }
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await applyRateLimit({
    bucket: "lead-capture",
    key: ip,
    limit: LEAD_CAPTURE_LIMIT,
    windowMs: LEAD_CAPTURE_WINDOW_MS,
  });

  if (!rateLimit.allowed) {
    Sentry.captureMessage("Lead capture rate limit exceeded", {
      level: "warning",
      tags: {
        component: "lead-capture",
        error_type: "rate_limit",
      },
    });

    return tooManyRequestsResponse(rateLimit.retryAfterSeconds);
  }

  try {
    const body = await request.json();
    const parsed = leadCaptureSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: getValidationMessage(parsed.error) },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      whatsapp,
      source = "",
      requestedResource = "",
      company = "",
      consent,
      emailMarketingConsent,
      smsMarketingConsent,
      marketingConsent,
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
      segmentAnonymousId = "",
      turnstileToken = "",
    } = parsed.data;

    // Return success for honeypot hits to avoid feedback loops for bots.
    if (company) {
      return NextResponse.json({
        success: true,
        message: "Lead captured successfully",
      });
    }

    const turnstileCheck = await verifyTurnstile({
      token: turnstileToken,
      ip,
      expectedAction: "lead_capture",
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
      Sentry.captureMessage("Convex configuration missing for lead capture", {
        level: "error",
        tags: {
          component: "lead-capture",
          error_type: "configuration",
        },
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
      email: optional(email),
      phone: optional(whatsapp),
      source,
      requestedResource: optional(requestedResource),
      landingPath: landingPath || refererHeader || "/",
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
      segmentAnonymousId: optional(segmentAnonymousId),
      consent,
      emailMarketingConsent:
        emailMarketingConsent ?? marketingConsent ?? false,
      smsMarketingConsent,
      website: optional(company),
    });

    Sentry.addBreadcrumb({
      category: "lead-capture",
      message: "Lead persisted",
      level: "info",
      data: {
        hasEmail: Boolean(email),
        source,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
    });
  } catch (error) {
    console.error("Error capturing lead:", error);

    Sentry.captureException(error, {
      level: "error",
      tags: {
        component: "lead-capture",
        error_type: "uncaught",
      },
      contexts: {
        lead: {
          name: "Lead Information",
          data: {
            source: "website",
          },
        },
      },
    });

    return NextResponse.json(
      { success: false, message: "Não foi possível registrar o contato agora." },
      { status: 500 }
    );
  }
}
