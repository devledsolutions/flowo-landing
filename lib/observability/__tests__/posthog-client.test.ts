// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mock = vi.hoisted(() => ({
  consent: false,
  init: vi.fn(),
  set_config: vi.fn(),
  register: vi.fn(),
  capture: vi.fn(),
  reset: vi.fn(),
  stopSessionRecording: vi.fn(),
}));
vi.mock("posthog-js", () => ({ default: mock }));
vi.mock("@/lib/consent", () => ({ hasAnalyticsConsent: () => mock.consent }));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  mock.consent = false;
  window.history.replaceState({}, "", "/");
  vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "phc_test_fixture");
  vi.stubEnv("NODE_ENV", "production");
  // Isolate global listeners between module instances.
  vi.spyOn(window, "addEventListener").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("landing PostHog consent lifecycle", () => {
  it("starts with operational errors only, no replay, persistence or pageviews", async () => {
    const { initializeLandingPostHog } = await import("../posthog-client");
    initializeLandingPostHog();
    expect(mock.init.mock.calls[0][1]).toMatchObject({
      disable_session_recording: true, disable_persistence: true,
      capture_pageview: false, autocapture: false, capture_exceptions: true,
    });
    expect(mock.capture).not.toHaveBeenCalled();
  });
  it("grants consent, emits one pageview, and keeps remote recording conditions", async () => {
    mock.consent = true;
    const { initializeLandingPostHog, syncLandingPostHogConsent } = await import("../posthog-client");
    initializeLandingPostHog();
    syncLandingPostHogConsent();
    expect(mock.set_config).toHaveBeenCalledTimes(1);
    expect(mock.set_config).toHaveBeenCalledWith(expect.objectContaining({
      disable_session_recording: false, capture_pageview: false,
      disable_persistence: false,
    }));
    expect(mock.capture.mock.calls).toEqual([["$pageview"]]);
    expect(mock.init.mock.calls[0][1].session_recording).not.toHaveProperty("maskAllInputs");
  });
  it("withdraws, stops and resets, then resumes exactly once after renewed consent", async () => {
    const { initializeLandingPostHog, syncLandingPostHogConsent } = await import("../posthog-client");
    initializeLandingPostHog();
    mock.consent = true;
    syncLandingPostHogConsent();
    mock.consent = false;
    syncLandingPostHogConsent();
    expect(mock.stopSessionRecording).toHaveBeenCalledTimes(1);
    expect(mock.reset).toHaveBeenCalledTimes(1);
    expect(mock.set_config).toHaveBeenLastCalledWith(expect.objectContaining({
      disable_session_recording: true, autocapture: false,
      capture_pageview: false, capture_pageleave: false, disable_persistence: true,
    }));
    mock.consent = true;
    syncLandingPostHogConsent();
    expect(mock.capture).toHaveBeenCalledTimes(2);
  });
  it("drops behavioral events after withdrawal, but retains sanitized exceptions", async () => {
    const { initializeLandingPostHog } = await import("../posthog-client");
    initializeLandingPostHog();
    const beforeSend = mock.init.mock.calls[0][1].before_send;
    expect(beforeSend({ event: "$autocapture", properties: {} })).toBeNull();
    expect(beforeSend({ event: "$exception", properties: { token: "secret" } }))
      .toMatchObject({ properties: { token: "[Redacted]" } });
  });
  it("does not enable recording in local development even after consent", async () => {
    vi.stubEnv("NODE_ENV", "development");
    mock.consent = true;
    const { initializeLandingPostHog } = await import("../posthog-client");
    initializeLandingPostHog();
    expect(mock.set_config).toHaveBeenCalledWith(expect.objectContaining({ disable_session_recording: true }));
  });
  it("initializes once and attaches consent/focus listeners", async () => {
    const { initializeLandingPostHog } = await import("../posthog-client");
    initializeLandingPostHog();
    initializeLandingPostHog();
    expect(mock.init).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledWith("consent-updated", expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith("focus", expect.any(Function));
  });
  it("captures exactly once per Next.js route, including after consent on the initial document", async () => {
    mock.consent = true;
    const { initializeLandingPostHog, captureLandingPageview } = await import("../posthog-client");
    initializeLandingPostHog();
    captureLandingPageview();
    expect(mock.capture).toHaveBeenCalledTimes(1);
    window.history.pushState({}, "", "/precos");
    captureLandingPageview();
    captureLandingPageview();
    expect(mock.capture).toHaveBeenCalledTimes(2);
    window.history.pushState({}, "", "/recursos");
    captureLandingPageview();
    // A return to a prior route is a new pageview, not a duplicate.
    window.history.replaceState({}, "", "/precos");
    captureLandingPageview();
    expect(mock.capture).toHaveBeenCalledTimes(4);
  });
  it("does not record new routes after withdrawal and resumes the current route once", async () => {
    mock.consent = true;
    const { initializeLandingPostHog, captureLandingPageview, syncLandingPostHogConsent } = await import("../posthog-client");
    initializeLandingPostHog();
    mock.consent = false;
    syncLandingPostHogConsent();
    window.history.pushState({}, "", "/precos");
    captureLandingPageview();
    expect(mock.capture).toHaveBeenCalledTimes(1);
    mock.consent = true;
    syncLandingPostHogConsent();
    captureLandingPageview();
    expect(mock.capture).toHaveBeenCalledTimes(2);
  });
});
