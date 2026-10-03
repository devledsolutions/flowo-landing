// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("@/lib/consent", () => ({
  getSavedConsent: () => ({ analytics: true, marketing: false }),
}));
vi.mock("@/lib/environment", () => ({ PUBLIC_ENVIRONMENT: {} }));

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT", "production");
  vi.stubEnv("NEXT_PUBLIC_RELEASE", "release-fixture");
  window.history.replaceState({}, "", "/precos?utm_source=qa&utm_medium=e2e");
});
afterEach(() => vi.unstubAllEnvs());

it("adds the same surface/environment/release dimensions to Segment events", async () => {
  const { getAnalyticsContext } = await import("../../../providers/segment-provider");
  expect(getAnalyticsContext()).toMatchObject({
    surface: "landing", platform: "web", environment: "production",
    release: "release-fixture", page_path: "/precos",
    utm_source: "qa", utm_medium: "e2e",
    consent_analytics: true, consent_marketing: false,
  });
});

it("does not relabel a QA deployment as production", async () => {
  vi.stubEnv("NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT", "qa");
  const { getAnalyticsContext } = await import("../../../providers/segment-provider");
  expect(getAnalyticsContext().environment).toBe("qa");
});
