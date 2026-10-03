import { z } from "zod";
import { PUBLIC_ENVIRONMENT } from "@/lib/environment";
import { applyRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import { captureLandingUsage } from "@/lib/observability/posthog-server";
import { OUTCOMES, TOOL_NAMES } from "@/lib/webmcp/tool-names";

export const runtime = "nodejs";
export const preferredRegion = ["gru1"];

const USAGE_WINDOW_MS = 60_000;
const USAGE_LIMIT = 60;

const usageSchema = z.strictObject({
  tool: z.enum(TOOL_NAMES),
  outcome: z.enum(OUTCOMES),
  path: z
    .string()
    .max(200)
    .regex(/^\/[A-Za-z0-9/_.-]*$/),
  teste: z.boolean().optional(),
});

const SAME_SITE_FETCHES = new Set(["same-origin", "same-site"]);

/**
 * Only the site's own pages may count. Browsers send `Sec-Fetch-Site` on
 * every request, including `sendBeacon`; when it is absent, a matching
 * `Origin` is required instead. A request with neither is refused.
 */
function isFromThisSite(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite !== null) return SAME_SITE_FETCHES.has(fetchSite);
  const origin = request.headers.get("origin");
  if (origin === null) return false;
  return origin === new URL(request.url).origin || origin === PUBLIC_ENVIRONMENT.siteOrigin;
}

/**
 * Consent-free counter of WebMCP tool calls. No identifier reaches analytics:
 * the client address is only hashed for the rate-limit key.
 */
export async function POST(request: Request) {
  if (!isFromThisSite(request)) return new Response(null, { status: 403 });

  const rateLimit = await applyRateLimit({
    bucket: "growth-signal",
    key: `webmcp:${getClientIp(request)}`,
    limit: USAGE_LIMIT,
    windowMs: USAGE_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return new Response(null, {
      status: 429,
      headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
    });
  }

  let body: unknown;
  try {
    body = JSON.parse(await request.text());
  } catch {
    return new Response(null, { status: 400 });
  }
  const parsed = usageSchema.safeParse(body);
  if (!parsed.success) return new Response(null, { status: 400 });

  await captureLandingUsage("webmcp_tool_called", {
    tool: parsed.data.tool,
    outcome: parsed.data.outcome,
    path: parsed.data.path,
    teste: parsed.data.teste === true,
  });
  return new Response(null, { status: 204 });
}
