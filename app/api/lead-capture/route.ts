import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
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
  ctwaClid?: string;
  segmentAnonymousId?: string;
  consent: true;
  emailMarketingConsent?: boolean;
  smsMarketingConsent?: boolean;
  whatsappMarketingConsent?: boolean;
  marketingConsent?: boolean;
  advertisingConsent?: boolean;
  advertisingConsentVersion?: string;
  metaEventId?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  eventSourceUrl?: string;
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

function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;

  let match: string | undefined;
  for (const entry of header.split(";")) {
    const separator = entry.indexOf("=");
    if (separator < 0) continue;
    const key = entry.slice(0, separator).trim();
    if (key !== name) continue;
    const value = entry.slice(separator + 1).trim();
    try {
      match = decodeURIComponent(value);
    } catch {
      match = value;
    }
  }
  return match;
}

function readAdvertisingConsent(request: Request): {
  value?: boolean;
  granted: boolean;
  version?: string;
} {
  const rawPreferences = readCookie(request, "cookieConsent");
  if (!rawPreferences) {
    return { granted: false };
  }
  try {
    const preferences = JSON.parse(rawPreferences) as { marketing?: unknown };
    const metadata = JSON.parse(
      readCookie(request, "cookieConsentDate") || "{}"
    ) as { consentVersion?: unknown };
    if (preferences.marketing !== true && preferences.marketing !== false) {
      return { granted: false };
    }
    return {
      value: preferences.marketing,
      granted: preferences.marketing === true,
      version:
        typeof metadata.consentVersion === "string"
          ? metadata.consentVersion.slice(0, 40)
          : undefined,
    };
  } catch {
    return { granted: false };
  }
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
      whatsappMarketingConsent,
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
      ctwaClid = "",
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
    const advertisingConsent = readAdvertisingConsent(request);
    const metaEventId = advertisingConsent.granted ? randomUUID() : undefined;
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
      ctwaClid: optional(ctwaClid),
      segmentAnonymousId: optional(segmentAnonymousId),
      consent,
      emailMarketingConsent:
        emailMarketingConsent ?? marketingConsent ?? false,
      smsMarketingConsent,
      whatsappMarketingConsent,
      advertisingConsent: advertisingConsent.value,
      advertisingConsentVersion: advertisingConsent.version,
      metaEventId,
      clientIpAddress:
        advertisingConsent.granted && ip !== "unknown" ? ip : undefined,
      clientUserAgent: advertisingConsent.granted
        ? optional(request.headers.get("user-agent") || undefined)
        : undefined,
      eventSourceUrl: advertisingConsent.granted
        ? landingPath || refererHeader || "https://www.flowo.com.br/"
        : undefined,
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
      metaEventId,
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
