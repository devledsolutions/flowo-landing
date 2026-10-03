"use client";

import posthog from "posthog-js";
import { hasAnalyticsConsent } from "@/lib/consent";
import { webAutocaptureOptions, webReplayOptions } from "@/lib/observability/replay-config";
import {
  POSTHOG_HOST,
  buildLandingExceptionProperties,
  landingTelemetryDimensions,
  redactLandingText,
  redactLandingTelemetry,
  sanitizeLandingError,
  sanitizeLandingPostHogEvent,
} from "@/lib/observability/posthog-shared";

let initialized = false;
let analyticsEnabled = false;

export function syncLandingPostHogConsent(): void {
  if (!initialized) return;
  const allowed = hasAnalyticsConsent();
  if (allowed === analyticsEnabled) return;
  analyticsEnabled = allowed;
  if (!allowed) {
    posthog.stopSessionRecording();
    posthog.reset();
  }
  posthog.set_config({
    capture_pageview: allowed ? "history_change" : false,
    capture_pageleave: allowed,
    autocapture: allowed ? webAutocaptureOptions : false,
    disable_session_recording: !allowed || process.env.NODE_ENV === "development",
    disable_persistence: !allowed,
    persistence: allowed ? "localStorage+cookie" : "memory",
  });
  posthog.register(landingTelemetryDimensions);
  // set_config does not send an initial pageview; history changes are automatic.
  if (allowed) posthog.capture("$pageview");
}

export function initializeLandingPostHog(): void {
  if (initialized || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  initialized = true;
  posthog.init(key, {
    api_host: POSTHOG_HOST,
    ui_host: "https://us.posthog.com",
    capture_pageview: false,
    capture_pageleave: false,
    autocapture: false,
    capture_exceptions: true,
    disable_session_recording: true,
    disable_persistence: true,
    persistence: "memory",
    person_profiles: "never",
    session_recording: webReplayOptions,
    enable_recording_console_log: false,
    before_send(event) {
      // Recheck the durable preference to close races during withdrawal.
      if (event?.event !== "$exception" && !hasAnalyticsConsent()) return null;
      return sanitizeLandingPostHogEvent(event, key);
    },
    loaded(instance) {
      instance.register(landingTelemetryDimensions);
    },
  });
  syncLandingPostHogConsent();
  window.addEventListener("consent-updated", syncLandingPostHogConsent);
  window.addEventListener("focus", syncLandingPostHogConsent);
}

export function captureLandingException(
  error: unknown,
  context: string,
  details?: Record<string, unknown>,
  level: "error" | "warning" = "error",
): void {
  if (!initialized) initializeLandingPostHog();
  if (!initialized) return;
  posthog.captureException(
    sanitizeLandingError(error),
    buildLandingExceptionProperties(context, details, level),
  );
}

export function captureLandingMessage(
  message: string,
  context: string,
  details?: Record<string, unknown>,
  level: "error" | "warning" = "error",
): void {
  captureLandingException(new Error(message), context, details, level);
}

export function addLandingExceptionStep(
  message: string,
  details?: Record<string, unknown>,
): void {
  if (!initialized) initializeLandingPostHog();
  if (!initialized) return;
  const sanitizedDetails = details
    ? redactLandingTelemetry(details)
    : undefined;
  posthog.addExceptionStep(redactLandingText(message), {
    ...landingTelemetryDimensions,
    ...(sanitizedDetails && typeof sanitizedDetails === "object" && !Array.isArray(sanitizedDetails)
      ? sanitizedDetails
      : {}),
  });
}
