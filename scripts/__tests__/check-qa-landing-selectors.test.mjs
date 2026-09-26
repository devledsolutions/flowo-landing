import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import { validateQaLandingSelectors } from "../check-qa-landing-boundary.mjs";

const productionPostHogKey = "phc_production_public_key";
const productionPostHogHash = createHash("sha256")
  .update(productionPostHogKey)
  .digest("hex");

function validSelectors() {
  return {
    NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: "qa",
    FLOWO_QA_VERCEL_ORG_ID: "team_qa",
    FLOWO_QA_LANDING_VERCEL_PROJECT_ID: "prj_qaLanding",
    FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID: "prj_prodLanding",
    FLOWO_QA_MARKETING_ORIGIN: "https://qa.flowo.com.br",
    FLOWO_PRODUCTION_MARKETING_ORIGIN: "https://www.flowo.com.br",
    FLOWO_QA_APP_ORIGIN: "https://qa.barber.flowo.com.br",
    FLOWO_PRODUCTION_APP_ORIGIN: "https://barber.flowo.com.br",
    FLOWO_QA_CONVEX_URL: "https://qa-flowo.convex.cloud",
    FLOWO_PRODUCTION_CONVEX_URL: "https://prod-flowo.convex.cloud",
    FLOWO_QA_CONSENT_COOKIE_NAME: "flowo_qa_consent",
    FLOWO_PRODUCTION_CONSENT_COOKIE_NAME: "flowo_consent",
    FLOWO_QA_SALES_WHATSAPP_NUMBER: "+5511999990001",
    FLOWO_PRODUCTION_SALES_WHATSAPP_NUMBER: "+5511999990002",
    FLOWO_QA_TURNSTILE_SITE_KEY: "qa-turnstile-site-key",
    FLOWO_PRODUCTION_TURNSTILE_SITE_KEY: "production-turnstile-site-key",
    FLOWO_QA_POSTHOG_PUBLIC_KEY: "phc_qa_public_key",
    FLOWO_PRODUCTION_POSTHOG_PUBLIC_KEY_SHA256: productionPostHogHash,
  };
}

test("accepts complete QA selectors without importing server-side secrets", () => {
  const selectors = validSelectors();

  assert.deepEqual(validateQaLandingSelectors(selectors), []);
  assert.equal("TURNSTILE_SECRET_KEY" in selectors, false);
  assert.equal("POSTHOG_API_KEY" in selectors, false);
});

test("fails closed when any required QA or production identity is absent", () => {
  const selectors = validSelectors();
  delete selectors.FLOWO_QA_TURNSTILE_SITE_KEY;
  delete selectors.FLOWO_PRODUCTION_SALES_WHATSAPP_NUMBER;

  const errors = validateQaLandingSelectors(selectors);

  assert.ok(errors.some((error) => error.includes("FLOWO_QA_TURNSTILE_SITE_KEY")));
  assert.ok(errors.some((error) => error.includes("FLOWO_PRODUCTION_SALES_WHATSAPP_NUMBER")));
});

test("rejects production identities reused by QA", () => {
  const selectors = validSelectors();
  selectors.FLOWO_QA_APP_ORIGIN = selectors.FLOWO_PRODUCTION_APP_ORIGIN;
  selectors.FLOWO_QA_LANDING_VERCEL_PROJECT_ID =
    selectors.FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID;
  selectors.FLOWO_QA_TURNSTILE_SITE_KEY =
    selectors.FLOWO_PRODUCTION_TURNSTILE_SITE_KEY;
  selectors.FLOWO_QA_POSTHOG_PUBLIC_KEY = productionPostHogKey;

  const errors = validateQaLandingSelectors(selectors);

  assert.ok(errors.some((error) => error.includes("FLOWO_QA_APP_ORIGIN")));
  assert.ok(errors.some((error) => error.includes("Vercel project IDs must differ")));
  assert.ok(errors.some((error) => error.includes("FLOWO_QA_TURNSTILE_SITE_KEY")));
  assert.ok(errors.some((error) => error.includes("matches the production resource")));
});

test("rejects malformed QA origins, contacts, and cookie selectors", () => {
  const selectors = validSelectors();
  selectors.FLOWO_QA_MARKETING_ORIGIN = "http://qa.flowo.com.br/path";
  selectors.FLOWO_QA_SALES_WHATSAPP_NUMBER = "+14155550100";
  selectors.FLOWO_QA_CONSENT_COOKIE_NAME = "flowo consent";

  const errors = validateQaLandingSelectors(selectors);

  assert.ok(errors.some((error) => error.includes("FLOWO_QA_MARKETING_ORIGIN")));
  assert.ok(errors.some((error) => error.includes("FLOWO_QA_SALES_WHATSAPP_NUMBER")));
  assert.ok(errors.some((error) => error.includes("FLOWO_QA_CONSENT_COOKIE_NAME")));
});

test("requires optional marketing identities to be isolated as complete pairs", () => {
  const selectors = validSelectors();
  selectors.FLOWO_QA_META_PIXEL_ID = "qa-meta-pixel";

  assert.ok(
    validateQaLandingSelectors(selectors).some((error) =>
      error.includes("FLOWO_QA_META_PIXEL_ID and FLOWO_PRODUCTION_META_PIXEL_ID"),
    ),
  );

  selectors.FLOWO_PRODUCTION_META_PIXEL_ID = "qa-meta-pixel";
  assert.ok(
    validateQaLandingSelectors(selectors).some((error) =>
      error.includes("FLOWO_QA_META_PIXEL_ID: must differ"),
    ),
  );
});

test("rejects conflicting aliases for the QA PostHog public key", () => {
  const selectors = validSelectors();
  selectors.FLOWO_QA_POSTHOG_PROJECT_KEY = "phc_other_qa_key";

  assert.ok(
    validateQaLandingSelectors(selectors).some((error) =>
      error.includes("QA PostHog project-key selectors must agree"),
    ),
  );
});

test("accepts an explicit production Turnstile-disabled marker only when attested", () => {
  const selectors = validSelectors();
  selectors.FLOWO_PRODUCTION_TURNSTILE_SITE_KEY = "disabled";
  selectors.FLOWO_PRODUCTION_TURNSTILE_DISABLED = "true";

  assert.deepEqual(validateQaLandingSelectors(selectors), []);

  delete selectors.FLOWO_PRODUCTION_TURNSTILE_DISABLED;
  assert.ok(
    validateQaLandingSelectors(selectors).some((error) =>
      error.includes("FLOWO_PRODUCTION_TURNSTILE_DISABLED"),
    ),
  );
});
