import { PostHog } from "posthog-node";
import {
  POSTHOG_HOST,
  buildLandingExceptionProperties,
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
