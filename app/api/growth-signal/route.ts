import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { z } from "zod";
import { getClientIp } from "@/lib/request-ip";
import { applyRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const preferredRegion = ["gru1"];

const signalSchema = z.object({
  segmentAnonymousId: z.string().trim().min(8).max(200),
  signal: z.enum([
    "pricing_viewed",
    "comparison_viewed",
    "case_study_viewed",
    "demo_requested",
    "signup_started",
    "lead_magnet_viewed",
  ]),
  path: z.string().trim().min(1).max(300).startsWith("/"),
});

type GrowthSignalArgs = z.infer<typeof signalSchema> & {
  analyticsConsent: true;
};

const recordKnownLeadSignal = makeFunctionReference<
  "mutation",
  GrowthSignalArgs,
  { accepted: true }
>("growth:recordKnownLeadSignal");

function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  for (const entry of header.split(";")) {
    const separator = entry.indexOf("=");
    if (separator < 0 || entry.slice(0, separator).trim() !== name) continue;
    const value = entry.slice(separator + 1).trim();
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }
  return undefined;
}

function hasAnalyticsConsent(request: Request): boolean {
  try {
    const consent = JSON.parse(readCookie(request, "cookieConsent") || "{}") as {
      analytics?: unknown;
    };
    return consent.analytics === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!hasAnalyticsConsent(request)) {
    return new NextResponse(null, { status: 204 });
  }
  const ip = getClientIp(request);
  const rateLimit = await applyRateLimit({
    bucket: "growth-signal",
    key: ip,
    limit: 60,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return new NextResponse(null, {
      status: 429,
      headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
    });
  }
  const parsed = signalSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return new NextResponse(null, { status: 400 });
  const convexUrl = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) return new NextResponse(null, { status: 503 });
  const convex = new ConvexHttpClient(convexUrl);
  await convex.mutation(recordKnownLeadSignal, {
    ...parsed.data,
    analyticsConsent: true,
  });
  return new NextResponse(null, { status: 204 });
}
