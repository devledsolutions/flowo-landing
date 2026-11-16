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
let consentSynced = false;
let analyticsEnabled = false;
let lastPageviewPath: string | undefined;

type CapturedEvent = { event?: string; properties?: Record<string, unknown> } | null;

// Without consent the SDK marks the event cookieless: PostHog counts it with a
// daily server-side hash and nothing is stored on the visitor's device.
function isCookielessPageview(event: CapturedEvent): boolean {
  return event?.event === "$pageview" && event.properties?.$cookieless_mode === true;
}

export function captureLandingPageview(): void {
  if (!initialized) return;
  const pathname = window.location.pathname;
  // A consent change on the same route keeps this guard: one visit is one pageview.
  if (pathname === lastPageviewPath) return;
  lastPageviewPath = pathname;
  posthog.capture("$pageview");
}

export function syncLandingPostHogConsent(): void {
  if (!initialized) return;
  const allowed = hasAnalyticsConsent();
  if (consentSynced && allowed === analyticsEnabled) return;
  // The SDK keeps its own opt-in after the site's consent cookie expires or is cleared.
  const leavingConsent = analyticsEnabled || posthog.get_explicit_consent_status() === "granted";
  consentSynced = true;
  analyticsEnabled = allowed;
  if (!allowed && leavingConsent) {
    posthog.stopSessionRecording();
    // Drops the consented identity and resumes the cookieless count.
    posthog.opt_out_capturing();
  }
  posthog.set_config({
    // One explicit Next.js route observer owns pageviews. The installed SDK
    // does not start HistoryAutocapture when false -> history_change is set
    // after initialization, so toggling that option silently misses SPA pages.
    capture_pageview: false,
    capture_pageleave: allowed,
    autocapture: allowed ? webAutocaptureOptions : false,
    disable_session_recording: !allowed || process.env.NODE_ENV === "development",
    disable_persistence: !allowed,
    persistence: allowed ? "localStorage+cookie" : "memory",
  });
  if (allowed) posthog.opt_in_capturing({ captureEventName: false });
  posthog.register(landingTelemetryDimensions);
}

export function initializeLandingPostHog(): void {
  if (initialized || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  initialized = true;
  // A visitor who already accepted starts persisted: the SDK reuses the stored
  // anonymous id instead of minting one per page load, and the opt-in below
  // does not reset it.
  const consented = hasAnalyticsConsent();
  posthog.init(key, {
    api_host: POSTHOG_HOST,
    ui_host: "https://us.posthog.com",
    capture_pageview: false,
    capture_pageleave: false,
    autocapture: false,
    capture_exceptions: true,
    disable_session_recording: true,
    disable_persistence: !consented,
    persistence: consented ? "localStorage+cookie" : "memory",
    person_profiles: "never",
    // Visitors who reject the banner or never answer it are still counted,
    // cookieless. Accepting switches to the regular, persisted mode.
    cookieless_mode: "on_reject",
    opt_out_capturing_by_default: !consented,
    session_recording: webReplayOptions,
    enable_recording_console_log: false,
    before_send(event) {
      // Recheck the durable preference to close races during withdrawal.
      if (event?.event !== "$exception" && !hasAnalyticsConsent() && !isCookielessPageview(event)) {
        return null;
      }
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
