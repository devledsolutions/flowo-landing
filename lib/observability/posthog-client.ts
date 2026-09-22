"use client";

import posthog from "posthog-js";
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
    before_send: sanitizeLandingPostHogEvent,
    loaded(instance) {
      instance.register(landingTelemetryDimensions);
    },
  });
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
