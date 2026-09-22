import path from "node:path";
import { fileURLToPath } from "node:url";

import { validateLandingEnvironment } from "./check-environment-isolation.mjs";

function value(environment, name) {
  return environment[name]?.trim() ?? "";
}

const REQUIRED_ISOLATION_PAIRS = Object.freeze([
  ["NEXT_PUBLIC_SITE_URL", "FLOWO_PRODUCTION_MARKETING_ORIGIN"],
  ["NEXT_PUBLIC_APP_URL", "FLOWO_PRODUCTION_APP_ORIGIN"],
  ["CONVEX_URL", "FLOWO_PRODUCTION_CONVEX_URL"],
  [
    "FLOWO_QA_LANDING_VERCEL_PROJECT_ID",
    "FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID",
  ],
  ["NEXT_PUBLIC_CONSENT_COOKIE_NAME", "FLOWO_PRODUCTION_CONSENT_COOKIE_NAME"],
  ["NEXT_PUBLIC_WHATSAPP_NUMBER", "FLOWO_PRODUCTION_SALES_WHATSAPP_NUMBER"],
  ["NEXT_PUBLIC_TURNSTILE_SITE_KEY", "FLOWO_PRODUCTION_TURNSTILE_SITE_KEY"],
  ["UPSTASH_REDIS_REST_URL", "FLOWO_PRODUCTION_REDIS_REST_URL"],
]);

const OPTIONAL_ISOLATION_PAIRS = Object.freeze([
  ["NEXT_PUBLIC_SEGMENT_WRITE_KEY", "FLOWO_PRODUCTION_SEGMENT_WEB_WRITE_KEY"],
  ["NEXT_PUBLIC_GA_MEASUREMENT_ID", "FLOWO_PRODUCTION_GA_MEASUREMENT_ID"],
  ["NEXT_PUBLIC_GOOGLE_ADS_ID", "FLOWO_PRODUCTION_GOOGLE_ADS_ID"],
  [
    "NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL",
    "FLOWO_PRODUCTION_GOOGLE_ADS_LEAD_CONVERSION_LABEL",
  ],
  ["NEXT_PUBLIC_META_PIXEL_ID", "FLOWO_PRODUCTION_META_PIXEL_ID"],
  ["NEXT_PUBLIC_TIKTOK_PIXEL_ID", "FLOWO_PRODUCTION_TIKTOK_PIXEL_ID"],
]);

function comparePair(environment, qaName, productionName, errors, required) {
  const qaValue = value(environment, qaName);
  const productionValue = value(environment, productionName);

  if (required && !productionValue) {
    errors.push(`${productionName}: required to prove QA isolation`);
    return;
  }
  if (!qaValue) return;
  if (!productionValue) {
    errors.push(`${productionName}: required when ${qaName} is configured`);
    return;
  }
  if (qaValue === productionValue) {
    errors.push(`${qaName}: must differ from ${productionName}`);
  }
}

export function validateQaLandingBoundary(environment) {
  const errors = [...validateLandingEnvironment(environment)];

  if (value(environment, "NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT") !== "qa") {
    errors.push("NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: must equal qa");
  }
  if (value(environment, "NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN") !== "host-only") {
    errors.push("NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN: must equal host-only in QA");
  }
  if (!value(environment, "FLOWO_QA_VERCEL_ORG_ID")) {
    errors.push("FLOWO_QA_VERCEL_ORG_ID: required");
  }
  if (!value(environment, "FLOWO_QA_LANDING_VERCEL_PROJECT_ID")) {
    errors.push("FLOWO_QA_LANDING_VERCEL_PROJECT_ID: required");
  }

  for (const [qaName, productionName] of REQUIRED_ISOLATION_PAIRS) {
    comparePair(environment, qaName, productionName, errors, true);
  }
  for (const [qaName, productionName] of OPTIONAL_ISOLATION_PAIRS) {
    comparePair(environment, qaName, productionName, errors, false);
  }

  return [...new Set(errors)];
}

export function runQaLandingBoundaryCheck(environment = process.env) {
  const errors = validateQaLandingBoundary(environment);
  if (errors.length) {
    console.error("QA landing boundary check failed:");
    for (const error of errors) console.error(`- ${error}`);
    return 1;
  }
  console.log("QA landing boundary check passed.");
  return 0;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && currentFile === path.resolve(process.argv[1])) {
  process.exitCode = runQaLandingBoundaryCheck();
}
