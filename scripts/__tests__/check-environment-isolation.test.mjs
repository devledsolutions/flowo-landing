import test from "node:test";
import assert from "node:assert/strict";
import { validateLandingEnvironment } from "../check-environment-isolation.mjs";

function qaEnvironment(overrides = {}) {
  return {
    NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: "qa",
    NEXT_PUBLIC_SITE_URL: "https://qa.flowo.example",
    NEXT_PUBLIC_APP_URL: "https://qa.barber.flowo.example",
    CONVEX_URL: "https://qa-isolated.convex.cloud",
    NEXT_PUBLIC_CONVEX_URL: "https://qa-isolated.convex.cloud",
    NEXT_PUBLIC_WHATSAPP_NUMBER: "5511999990000",
    NEXT_PUBLIC_CONSENT_COOKIE_NAME: "flowoQaConsent",
    NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN: "host-only",
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "turnstile_site_qa",
    TURNSTILE_SECRET_KEY: "turnstile_secret_qa",
    NEXT_PUBLIC_POSTHOG_KEY: "phc_qa",
    POSTHOG_API_KEY: "phc_qa",
    ...overrides,
  };
}

test("accepts a complete isolated QA environment", () => {
  assert.deepEqual(validateLandingEnvironment(qaEnvironment()), []);
});

test("rejects production-style cookie scope in QA", () => {
  assert.match(
    validateLandingEnvironment(
      qaEnvironment({ NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN: ".flowo.com.br" }),
    ).join("\n"),
    /QA consent and analytics cookies must remain host-only/,
  );
});

test("rejects local or non-HTTPS origins in hosted QA", () => {
  const errors = validateLandingEnvironment(
    qaEnvironment({ NEXT_PUBLIC_SITE_URL: "http://localhost:3001" }),
  );
  assert.ok(errors.some((error) => error.includes("hosted HTTPS origin")));
});

test("rejects a mismatched Convex browser deployment", () => {
  const errors = validateLandingEnvironment(
    qaEnvironment({ NEXT_PUBLIC_CONVEX_URL: "https://other.convex.cloud" }),
  );
  assert.ok(errors.includes("CONVEX_URL and NEXT_PUBLIC_CONVEX_URL must match"));
});

test("requires Turnstile and PostHog in hosted QA", () => {
  const errors = validateLandingEnvironment(
    qaEnvironment({
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "",
      TURNSTILE_SECRET_KEY: "",
      NEXT_PUBLIC_POSTHOG_KEY: "",
      POSTHOG_API_KEY: "",
    }),
  ).join("\n");
  assert.match(errors, /TURNSTILE/);
  assert.match(errors, /NEXT_PUBLIC_POSTHOG_KEY/);
});

test("rejects production search verification outside production", () => {
  const errors = validateLandingEnvironment(
    qaEnvironment({ NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "production-token" }),
  );
  assert.ok(
    errors.includes(
      "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION must be absent outside production",
    ),
  );
});
