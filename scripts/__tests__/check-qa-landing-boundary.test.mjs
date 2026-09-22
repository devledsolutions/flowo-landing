import assert from "node:assert/strict";
import test from "node:test";

import { validateQaLandingBoundary } from "../check-qa-landing-boundary.mjs";

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
    NEXT_PUBLIC_POSTHOG_KEY: "phc_qa",
    POSTHOG_API_KEY: "phc_qa",
    FLOWO_QA_VERCEL_ORG_ID: "team_qa",
    FLOWO_QA_LANDING_VERCEL_PROJECT_ID: "prj_qa",
    FLOWO_PRODUCTION_MARKETING_ORIGIN: "https://flowo.example",
    FLOWO_PRODUCTION_APP_ORIGIN: "https://barber.flowo.example",
    FLOWO_PRODUCTION_CONVEX_URL: "https://production.convex.cloud",
    FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID: "prj_production",
    FLOWO_PRODUCTION_CONSENT_COOKIE_NAME: "cookieConsent",
    FLOWO_PRODUCTION_SALES_WHATSAPP_NUMBER: "5511999991111",
    FLOWO_PRODUCTION_TURNSTILE_SITE_KEY: "turnstile_site_production",
    FLOWO_PRODUCTION_REDIS_REST_URL: "https://production-redis.example",
    ...overrides,
  };
}

test("accepts a complete QA landing boundary isolated from production", () => {
  assert.deepEqual(validateQaLandingBoundary(qaEnvironment()), []);
});

test("rejects a production project, origin, or backend reused by QA", () => {
  const environment = qaEnvironment({
    FLOWO_QA_LANDING_VERCEL_PROJECT_ID: "prj_production",
    NEXT_PUBLIC_SITE_URL: "https://flowo.example",
    CONVEX_URL: "https://production.convex.cloud",
    NEXT_PUBLIC_CONVEX_URL: "https://production.convex.cloud",
  });
  const errors = validateQaLandingBoundary(environment).join("\n");
  assert.match(errors, /NEXT_PUBLIC_SITE_URL/);
  assert.match(errors, /CONVEX_URL/);
  assert.match(errors, /FLOWO_QA_LANDING_VERCEL_PROJECT_ID/);
});

test("requires production identities used to prove isolation", () => {
  const errors = validateQaLandingBoundary(
    qaEnvironment({ FLOWO_PRODUCTION_REDIS_REST_URL: "" }),
  );
  assert.ok(
    errors.includes(
      "FLOWO_PRODUCTION_REDIS_REST_URL: required to prove QA isolation",
    ),
  );
});

test("allows analytics disabled but rejects a reused configured identity", () => {
  assert.deepEqual(validateQaLandingBoundary(qaEnvironment()), []);
  const errors = validateQaLandingBoundary(
    qaEnvironment({
      NEXT_PUBLIC_META_PIXEL_ID: "pixel_shared",
      FLOWO_PRODUCTION_META_PIXEL_ID: "pixel_shared",
    }),
  );
  assert.ok(
    errors.includes(
      "NEXT_PUBLIC_META_PIXEL_ID: must differ from FLOWO_PRODUCTION_META_PIXEL_ID",
    ),
  );
});
