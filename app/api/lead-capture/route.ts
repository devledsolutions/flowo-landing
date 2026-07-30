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
  phone: string;
  source: string;
  landingPath: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  segmentAnonymousId?: string;
  consent: true;
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
      company = "",
      consent,
      marketingConsent,
      landingPath = "",
      referrer = "",
      utmSource = "",
      utmMedium = "",
      utmCampaign = "",
      utmContent = "",
      utmTerm = "",
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
      phone: whatsapp,
      source,
      landingPath: landingPath || refererHeader || "/",
      referrer: optional(referrer),
      utmSource: optional(utmSource),
      utmMedium: optional(utmMedium),
      utmCampaign: optional(utmCampaign),
      utmContent: optional(utmContent),
      utmTerm: optional(utmTerm),
      segmentAnonymousId: optional(segmentAnonymousId),
      consent,
      marketingConsent,
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
