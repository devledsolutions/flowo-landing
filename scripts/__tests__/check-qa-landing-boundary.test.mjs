import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
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
    NEXT_PUBLIC_FLOWO_SALES_EMAIL: "vendas@qa.flowo.com.br",
    NEXT_PUBLIC_FLOWO_SUPPORT_EMAIL: "suporte@qa.flowo.com.br",
    NEXT_PUBLIC_FLOWO_PRIVACY_EMAIL: "privacidade@qa.flowo.com.br",
    NEXT_PUBLIC_CONSENT_COOKIE_NAME: "flowoQaConsent",
    NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN: "host-only",
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "turnstile_site_qa",
    TURNSTILE_SECRET_KEY: "turnstile_secret_qa",
    NEXT_PUBLIC_POSTHOG_KEY: "phc_qa",
    POSTHOG_API_KEY: "phc_qa",
    FLOWO_QA_MARKETING_ORIGIN: "https://qa.flowo.example",
    FLOWO_QA_APP_ORIGIN: "https://qa.barber.flowo.example",
    FLOWO_QA_CONVEX_URL: "https://qa-isolated.convex.cloud",
    FLOWO_QA_CONSENT_COOKIE_NAME: "flowoQaConsent",
    FLOWO_QA_SALES_WHATSAPP_NUMBER: "5511999990000",
    FLOWO_QA_TURNSTILE_SITE_KEY: "turnstile_site_qa",
    FLOWO_QA_POSTHOG_PROJECT_KEY: "phc_qa",
    FLOWO_PRODUCTION_POSTHOG_PUBLIC_KEY_SHA256: createHash("sha256")
      .update("phc_production")
      .digest("hex"),
    FLOWO_QA_VERCEL_ORG_ID: "team_qa",
    FLOWO_QA_LANDING_VERCEL_PROJECT_ID: "prj_qa",
    FLOWO_PRODUCTION_MARKETING_ORIGIN: "https://flowo.example",
    FLOWO_PRODUCTION_APP_ORIGIN: "https://barber.flowo.example",
    FLOWO_PRODUCTION_CONVEX_URL: "https://production.convex.cloud",
    FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID: "prj_production",
    FLOWO_PRODUCTION_CONSENT_COOKIE_NAME: "cookieConsent",
    FLOWO_PRODUCTION_SALES_WHATSAPP_NUMBER: "5511999991111",
    FLOWO_PRODUCTION_TURNSTILE_SITE_KEY: "turnstile_site_production",
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
    qaEnvironment({ FLOWO_PRODUCTION_CONVEX_URL: "" }),
  );
  assert.ok(
    errors.includes(
      "FLOWO_PRODUCTION_CONVEX_URL: required to prove QA isolation",
    ),
  );
});

test("rejects a QA PostHog key whose fingerprint matches production", () => {
  const productionKey = "phc_production";
  const errors = validateQaLandingBoundary(
    qaEnvironment({
      NEXT_PUBLIC_POSTHOG_KEY: productionKey,
      FLOWO_QA_POSTHOG_PROJECT_KEY: productionKey,
      FLOWO_PRODUCTION_POSTHOG_PUBLIC_KEY_SHA256: createHash("sha256")
        .update(productionKey)
        .digest("hex"),
    }),
  );

  assert.ok(errors.includes("FLOWO_QA_POSTHOG_PROJECT_KEY: matches the production resource"));
});

test("requires each effective QA runtime identity to match its QA selector", () => {
  const errors = validateQaLandingBoundary(
    qaEnvironment({
      NEXT_PUBLIC_SITE_URL: "https://another-tenant.flowo.example",
      NEXT_PUBLIC_CONVEX_URL: "https://production.convex.cloud",
    }),
  );

  assert.ok(errors.includes("NEXT_PUBLIC_SITE_URL: must match FLOWO_QA_MARKETING_ORIGIN"));
  assert.ok(errors.includes("NEXT_PUBLIC_CONVEX_URL: must match FLOWO_QA_CONVEX_URL"));
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

test("requires the production Turnstile-disabled marker to be preflight-attested", () => {
  const disabled = qaEnvironment({
    FLOWO_PRODUCTION_TURNSTILE_SITE_KEY: "disabled",
  });
  assert.ok(
    validateQaLandingBoundary(disabled).includes(
      "FLOWO_PRODUCTION_TURNSTILE_DISABLED: must be true when the production site key is disabled",
    ),
  );

  disabled.FLOWO_PRODUCTION_TURNSTILE_DISABLED = "true";
  assert.deepEqual(validateQaLandingBoundary(disabled), []);
});

test("the build wrapper skips the QA-only boundary check outside QA", () => {
  const script = resolve(import.meta.dirname, "../check-qa-landing-boundary.mjs");
  const result = spawnSync(process.execPath, [script, "--if-qa"], {
    encoding: "utf8",
    env: { ...process.env, NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: "production" },
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
});

test("the build wrapper still fails closed when labeled QA without full selectors", () => {
  const script = resolve(import.meta.dirname, "../check-qa-landing-boundary.mjs");
  const result = spawnSync(process.execPath, [script, "--if-qa"], {
    encoding: "utf8",
    env: { ...process.env, NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: "qa" },
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /QA landing boundary check failed/);
});
