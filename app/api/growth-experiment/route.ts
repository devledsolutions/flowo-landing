import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { z } from "zod";
import { getClientIp } from "@/lib/request-ip";
import { applyRateLimit } from "@/lib/rate-limit";
import { resolveConvexUrl } from "@/lib/server-environment";
import { PUBLIC_ENVIRONMENT } from "@/lib/environment";

export const runtime = "nodejs";
export const preferredRegion = ["gru1"];

const assignmentSchema = z.object({
  experimentKey: z.string().trim().min(3).max(80),
  segmentAnonymousId: z.string().trim().min(8).max(200),
});

type AssignmentArgs = z.infer<typeof assignmentSchema> & {
  analyticsConsent: true;
};

const assignWebsiteVariant = makeFunctionReference<
  "mutation",
  AssignmentArgs,
  { variantKey: string; experimentVersion: number } | null
>("growthExperiments:assignWebsiteVariant");

function analyticsConsent(request: Request): boolean {
  const cookie = request.headers.get("cookie") ?? "";
  const entry = cookie
    .split(";")
    .map((value) => value.trim())
    .find((value) =>
      value.startsWith(`${PUBLIC_ENVIRONMENT.consentCookieName}=`),
    );
  if (!entry) return false;
  try {
    const raw = decodeURIComponent(
      entry.slice(`${PUBLIC_ENVIRONMENT.consentCookieName}=`.length),
    );
    return (JSON.parse(raw) as { analytics?: unknown }).analytics === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!analyticsConsent(request)) return NextResponse.json({ variantKey: null });
  const parsed = assignmentSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ variantKey: null }, { status: 400 });
  const limit = await applyRateLimit({
    bucket: "growth-experiment",
    key: getClientIp(request),
    limit: 30,
    windowMs: 60_000,
  });
  if (!limit.allowed) return NextResponse.json({ variantKey: null }, { status: 429 });
  const convexUrl = resolveConvexUrl();
  if (!convexUrl) return NextResponse.json({ variantKey: null }, { status: 503 });
  const convex = new ConvexHttpClient(convexUrl);
  const assignment = await convex.mutation(assignWebsiteVariant, {
    ...parsed.data,
    analyticsConsent: true,
  });
  return NextResponse.json({ variantKey: assignment?.variantKey ?? null });
}
