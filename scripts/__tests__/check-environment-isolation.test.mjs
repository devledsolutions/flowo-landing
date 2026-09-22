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
    UPSTASH_REDIS_REST_URL: "https://qa-redis.example",
    UPSTASH_REDIS_REST_TOKEN: "redis_qa",
    SENTRY_DSN: "https://server@sentry.example/1",
    NEXT_PUBLIC_SENTRY_DSN: "https://client@sentry.example/1",
    SENTRY_ENVIRONMENT: "qa",
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: "qa",
    SENTRY_ORG: "flowo-qa",
    SENTRY_PROJECT: "landing-qa",
    SENTRY_AUTH_TOKEN: "sentry_qa",
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

test("requires Turnstile, Redis and Sentry in hosted QA", () => {
  const errors = validateLandingEnvironment(
    qaEnvironment({
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "",
      TURNSTILE_SECRET_KEY: "",
      UPSTASH_REDIS_REST_URL: "",
      UPSTASH_REDIS_REST_TOKEN: "",
      SENTRY_DSN: "",
      NEXT_PUBLIC_SENTRY_DSN: "",
      SENTRY_ORG: "",
      SENTRY_PROJECT: "",
      SENTRY_AUTH_TOKEN: "",
    }),
  ).join("\n");
  assert.match(errors, /TURNSTILE/);
  assert.match(errors, /UPSTASH/);
  assert.match(errors, /SENTRY_DSN/);
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
