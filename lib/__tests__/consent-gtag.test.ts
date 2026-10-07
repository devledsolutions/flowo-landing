// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { applyConsent, initializeDefaultConsent } from "@/lib/consent";

/** gtag.js ignores dataLayer entries that are not Arguments objects. */
const isArguments = (entry: unknown) =>
  Object.prototype.toString.call(entry) === "[object Arguments]";
const command = (entry: unknown) => Array.from(entry as ArrayLike<unknown>);

describe("Google consent mode", () => {
  beforeEach(() => {
    window.dataLayer = [];
    delete window.gtag;
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  it("pushes commands gtag.js can read, so accepting grants analytics and ads", () => {
    initializeDefaultConsent();
    applyConsent({ necessary: true, analytics: true, marketing: true });
    window.gtag?.("config", "AW-0000000000", { send_page_view: false });
    expect(window.dataLayer!.length).toBeGreaterThanOrEqual(3);
    expect(window.dataLayer!.every(isArguments)).toBe(true);
    const update = window.dataLayer!.map(command).find(
      ([kind, action]) => kind === "consent" && action === "update",
    );
    expect(update?.[2]).toMatchObject({
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  });
});
