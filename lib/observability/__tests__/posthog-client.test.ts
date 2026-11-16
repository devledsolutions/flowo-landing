// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mock = vi.hoisted(() => {
  const state = {
    consent: false,
    sdkStatus: "pending" as "granted" | "denied" | "pending",
    init: vi.fn(),
    set_config: vi.fn(),
    register: vi.fn(),
    capture: vi.fn(),
    reset: vi.fn(),
    stopSessionRecording: vi.fn(),
    get_explicit_consent_status: vi.fn(() => state.sdkStatus),
    opt_in_capturing: vi.fn(() => { state.sdkStatus = "granted"; }),
    opt_out_capturing: vi.fn(() => { state.sdkStatus = "denied"; }),
  };
  return state;
});
vi.mock("posthog-js", () => ({ default: mock }));
vi.mock("@/lib/consent", () => ({ hasAnalyticsConsent: () => mock.consent }));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  mock.consent = false;
  mock.sdkStatus = "pending";
  window.history.replaceState({}, "", "/");
  vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "phc_test_fixture");
  vi.stubEnv("NODE_ENV", "production");
  // Isolate global listeners between module instances.
  vi.spyOn(window, "addEventListener").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("landing PostHog consent lifecycle", () => {
  it("starts cookieless, without replay, persistence or autocapture, and still counts the pageview", async () => {
    const { initializeLandingPostHog, captureLandingPageview } = await import("../posthog-client");
    initializeLandingPostHog();
    expect(mock.init.mock.calls[0][1]).toMatchObject({
      cookieless_mode: "on_reject", opt_out_capturing_by_default: true,
      disable_session_recording: true, disable_persistence: true, persistence: "memory",
      capture_pageview: false, autocapture: false, capture_exceptions: true,
    });
    expect(mock.opt_in_capturing).not.toHaveBeenCalled();
    expect(mock.opt_out_capturing).not.toHaveBeenCalled();
    captureLandingPageview();
    expect(mock.capture.mock.calls).toEqual([["$pageview"]]);
  });
  it("without consent sends only cookieless pageviews and sanitized exceptions", async () => {
    const { initializeLandingPostHog } = await import("../posthog-client");
    initializeLandingPostHog();
    const beforeSend = mock.init.mock.calls[0][1].before_send;
    const cookieless = {
      event: "$pageview",
      properties: { token: "phc_test_fixture", distinct_id: "$posthog_cookieless", $cookieless_mode: true },
    };
    expect(beforeSend(cookieless)).toMatchObject({
      properties: { token: "phc_test_fixture", distinct_id: "$posthog_cookieless", $cookieless_mode: true },
    });
    expect(beforeSend({ event: "$pageview", properties: { distinct_id: "0192f0aa-1111-7000-8000-000000000001" } })).toBeNull();
    expect(beforeSend({ event: "$autocapture", properties: { $cookieless_mode: true } })).toBeNull();
    expect(beforeSend({ event: "$pageleave", properties: { $cookieless_mode: true } })).toBeNull();
    expect(beforeSend({ event: "$exception", properties: { token: "secret" } }))
      .toMatchObject({ properties: { token: "[Redacted]" } });
  });
  it("opts in without an extra event and keeps remote recording conditions", async () => {
    mock.consent = true;
    const { initializeLandingPostHog, syncLandingPostHogConsent } = await import("../posthog-client");
    initializeLandingPostHog();
    syncLandingPostHogConsent();
    expect(mock.set_config).toHaveBeenCalledTimes(1);
    expect(mock.set_config).toHaveBeenCalledWith(expect.objectContaining({
      disable_session_recording: false, capture_pageview: false,
      disable_persistence: false, persistence: "localStorage+cookie",
    }));
    expect(mock.opt_in_capturing.mock.calls).toEqual([[{ captureEventName: false }]]);
    // A returning visitor starts persisted, so the stored anonymous id survives reloads and the opt-in.
    expect(mock.init.mock.calls[0][1]).toMatchObject({
      opt_out_capturing_by_default: false, disable_persistence: false, persistence: "localStorage+cookie",
    });
    expect(mock.capture).not.toHaveBeenCalled();
    expect(mock.init.mock.calls[0][1].session_recording).not.toHaveProperty("maskAllInputs");
  });
  it("accepting on the current page does not count the same visit twice", async () => {
    const { initializeLandingPostHog, captureLandingPageview, syncLandingPostHogConsent } = await import("../posthog-client");
    initializeLandingPostHog();
    captureLandingPageview();
    mock.consent = true;
    syncLandingPostHogConsent();
    captureLandingPageview();
    expect(mock.capture).toHaveBeenCalledTimes(1);
    window.history.pushState({}, "", "/precos");
    captureLandingPageview();
    expect(mock.capture).toHaveBeenCalledTimes(2);
  });
  it("withdrawal stops recording, drops the consented identity and resumes cookieless counting", async () => {
    const { initializeLandingPostHog, captureLandingPageview, syncLandingPostHogConsent } = await import("../posthog-client");
    initializeLandingPostHog();
    mock.consent = true;
    syncLandingPostHogConsent();
    mock.consent = false;
    syncLandingPostHogConsent();
    expect(mock.stopSessionRecording).toHaveBeenCalledTimes(1);
    expect(mock.opt_out_capturing).toHaveBeenCalledTimes(1);
    expect(mock.set_config).toHaveBeenLastCalledWith(expect.objectContaining({
      disable_session_recording: true, autocapture: false,
      capture_pageview: false, capture_pageleave: false, disable_persistence: true, persistence: "memory",
    }));
    window.history.pushState({}, "", "/precos");
    captureLandingPageview();
    expect(mock.capture).toHaveBeenCalledTimes(1);
    mock.consent = true;
    syncLandingPostHogConsent();
    expect(mock.opt_in_capturing).toHaveBeenCalledTimes(2);
  });
  it("withdraws an SDK opt-in that outlived the site's consent cookie", async () => {
    mock.sdkStatus = "granted";
    const { initializeLandingPostHog } = await import("../posthog-client");
    initializeLandingPostHog();
    expect(mock.stopSessionRecording).toHaveBeenCalledTimes(1);
    expect(mock.opt_out_capturing).toHaveBeenCalledTimes(1);
    expect(mock.opt_in_capturing).not.toHaveBeenCalled();
  });
  it("repeated focus checks do not repeat a consent transition", async () => {
    mock.consent = true;
    const { initializeLandingPostHog, syncLandingPostHogConsent } = await import("../posthog-client");
    initializeLandingPostHog();
    syncLandingPostHogConsent();
    syncLandingPostHogConsent();
    expect(mock.opt_in_capturing).toHaveBeenCalledTimes(1);
    expect(mock.set_config).toHaveBeenCalledTimes(1);
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
  it("captures exactly once per Next.js route", async () => {
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
});
