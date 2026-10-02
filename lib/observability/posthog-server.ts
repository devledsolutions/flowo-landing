import { PostHog } from "posthog-node";
import {
  POSTHOG_HOST,
  buildLandingExceptionProperties,
  landingTelemetryDimensions,
  sanitizeLandingError,
} from "@/lib/observability/posthog-shared";

const posthogKey = process.env.POSTHOG_API_KEY ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthog = posthogKey
  ? new PostHog(posthogKey, {
      host: process.env.POSTHOG_HOST ?? POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
      requestTimeout: 10000,
      fetchRetryCount: 3,
    })
  : null;

export async function captureLandingException(
  error: unknown,
  context: string,
  details?: Record<string, unknown>,
  level: "error" | "warning" = "error",
): Promise<void> {
  if (!posthog) return;
  try {
    await posthog.captureExceptionImmediate(
      sanitizeLandingError(error),
      "flowo-landing-server",
      buildLandingExceptionProperties(context, details, level),
    );
  } catch {
    // Monitoring must never turn a customer-facing failure into a second failure.
  }
}

export async function captureLandingMessage(
  message: string,
  context: string,
  details?: Record<string, unknown>,
  level: "error" | "warning" = "error",
): Promise<void> {
  await captureLandingException(new Error(message), context, details, level);
}

/**
 * Aggregate usage counter that needs no consent: one shared distinct id, no
 * person profile, no GeoIP and no IP forwarded. Callers pass only fixed
 * dimensions (tool name, outcome, page path), never visitor input.
 */
export async function captureLandingUsage(
  event: string,
  properties: Record<string, string | boolean>,
): Promise<void> {
  if (!posthog) return;
  try {
    await posthog.captureImmediate({
      distinctId: "flowo-landing-aggregate",
      event,
      properties: {
        ...landingTelemetryDimensions,
        ...properties,
        $process_person_profile: false,
      },
      disableGeoip: true,
    });
  } catch {
    // The counter is best effort and never fails the request.
  }
}
