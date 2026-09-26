import { createHash } from "node:crypto";
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

const REQUIRED_QA_RUNTIME_BINDINGS = Object.freeze([
  ["NEXT_PUBLIC_SITE_URL", "FLOWO_QA_MARKETING_ORIGIN"],
  ["NEXT_PUBLIC_APP_URL", "FLOWO_QA_APP_ORIGIN"],
  ["CONVEX_URL", "FLOWO_QA_CONVEX_URL"],
  ["NEXT_PUBLIC_CONVEX_URL", "FLOWO_QA_CONVEX_URL"],
  ["NEXT_PUBLIC_CONSENT_COOKIE_NAME", "FLOWO_QA_CONSENT_COOKIE_NAME"],
  ["NEXT_PUBLIC_WHATSAPP_NUMBER", "FLOWO_QA_SALES_WHATSAPP_NUMBER"],
  ["NEXT_PUBLIC_TURNSTILE_SITE_KEY", "FLOWO_QA_TURNSTILE_SITE_KEY"],
  ["NEXT_PUBLIC_POSTHOG_KEY", "FLOWO_QA_POSTHOG_PROJECT_KEY"],
]);

const OPTIONAL_QA_RUNTIME_BINDINGS = Object.freeze([
  ["NEXT_PUBLIC_SEGMENT_WRITE_KEY", "FLOWO_QA_SEGMENT_WEB_WRITE_KEY"],
  ["NEXT_PUBLIC_GA_MEASUREMENT_ID", "FLOWO_QA_GA_MEASUREMENT_ID"],
  ["NEXT_PUBLIC_GOOGLE_ADS_ID", "FLOWO_QA_GOOGLE_ADS_ID"],
  [
    "NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL",
    "FLOWO_QA_GOOGLE_ADS_LEAD_CONVERSION_LABEL",
  ],
  ["NEXT_PUBLIC_META_PIXEL_ID", "FLOWO_QA_META_PIXEL_ID"],
  ["NEXT_PUBLIC_TIKTOK_PIXEL_ID", "FLOWO_QA_TIKTOK_PIXEL_ID"],
]);

const REQUIRED_QA_SELECTOR_PAIRS = Object.freeze([
  ["FLOWO_QA_MARKETING_ORIGIN", "FLOWO_PRODUCTION_MARKETING_ORIGIN", "origin"],
  ["FLOWO_QA_APP_ORIGIN", "FLOWO_PRODUCTION_APP_ORIGIN", "origin"],
  ["FLOWO_QA_CONVEX_URL", "FLOWO_PRODUCTION_CONVEX_URL", "origin"],
  [
    "FLOWO_QA_LANDING_VERCEL_PROJECT_ID",
    "FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID",
    "project",
  ],
  [
    "FLOWO_QA_CONSENT_COOKIE_NAME",
    "FLOWO_PRODUCTION_CONSENT_COOKIE_NAME",
    "cookie",
  ],
  [
    "FLOWO_QA_SALES_WHATSAPP_NUMBER",
    "FLOWO_PRODUCTION_SALES_WHATSAPP_NUMBER",
    "phone",
  ],
  [
    "FLOWO_QA_TURNSTILE_SITE_KEY",
    "FLOWO_PRODUCTION_TURNSTILE_SITE_KEY",
    "site-key",
  ],
]);

const OPTIONAL_QA_SELECTOR_PAIRS = Object.freeze([
  ["FLOWO_QA_SEGMENT_WEB_WRITE_KEY", "FLOWO_PRODUCTION_SEGMENT_WEB_WRITE_KEY"],
  ["FLOWO_QA_GA_MEASUREMENT_ID", "FLOWO_PRODUCTION_GA_MEASUREMENT_ID"],
  ["FLOWO_QA_GOOGLE_ADS_ID", "FLOWO_PRODUCTION_GOOGLE_ADS_ID"],
  [
    "FLOWO_QA_GOOGLE_ADS_LEAD_CONVERSION_LABEL",
    "FLOWO_PRODUCTION_GOOGLE_ADS_LEAD_CONVERSION_LABEL",
  ],
  ["FLOWO_QA_META_PIXEL_ID", "FLOWO_PRODUCTION_META_PIXEL_ID"],
  ["FLOWO_QA_TIKTOK_PIXEL_ID", "FLOWO_PRODUCTION_TIKTOK_PIXEL_ID"],
]);

function postHogQaSelector(environment) {
  const projectKey = value(environment, "FLOWO_QA_POSTHOG_PROJECT_KEY");
  const publicKey = value(environment, "FLOWO_QA_POSTHOG_PUBLIC_KEY");
  return { projectKey, publicKey, selected: projectKey || publicKey };
}

function comparableSelector(raw, kind) {
  if (kind === "phone") return raw.replace(/\D/g, "");
  if (kind === "origin") {
    try {
      const url = new URL(raw);
      if (
        url.protocol !== "https:" ||
        url.username ||
        url.password ||
        url.port ||
        url.pathname !== "/" ||
        url.search ||
        url.hash
      ) {
        return "";
      }
      return url.origin;
    } catch {
      return "";
    }
  }
  return raw;
}

export function validateQaLandingSelectors(environment) {
  const errors = [];
  if (value(environment, "NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT") !== "qa") {
    errors.push("NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: must equal qa");
  }
  if (!/^team_[A-Za-z0-9]+$/.test(value(environment, "FLOWO_QA_VERCEL_ORG_ID"))) {
    errors.push("FLOWO_QA_VERCEL_ORG_ID: required Vercel team identity is invalid");
  }

  for (const name of [
    "FLOWO_QA_LANDING_VERCEL_PROJECT_ID",
    "FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID",
  ]) {
    if (!/^prj_[A-Za-z0-9]+$/.test(value(environment, name))) {
      errors.push(`${name}: required Vercel project identity is invalid`);
    }
  }

  if (
    value(environment, "FLOWO_QA_LANDING_VERCEL_PROJECT_ID") &&
    value(environment, "FLOWO_QA_LANDING_VERCEL_PROJECT_ID") ===
      value(environment, "FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID")
  ) {
    errors.push("QA and production landing Vercel project IDs must differ");
  }

  for (const [qaName, productionName, kind] of REQUIRED_QA_SELECTOR_PAIRS) {
    const qaValue = value(environment, qaName);
    const productionValue = value(environment, productionName);
    if (!qaValue) errors.push(`${qaName}: required to identify the QA resource`);
    if (!productionValue) {
      errors.push(`${productionName}: required to prove QA isolation`);
    }
    if (kind === "origin") {
      if (qaValue && !comparableSelector(qaValue, kind)) {
        errors.push(`${qaName}: must be an exact hosted HTTPS origin`);
      }
      if (productionValue && !comparableSelector(productionValue, kind)) {
        errors.push(`${productionName}: must be an exact hosted HTTPS origin`);
      }
    }
    if (kind === "phone") {
      if (qaValue && !/^55\d{10,11}$/.test(comparableSelector(qaValue, kind))) {
        errors.push(`${qaName}: must be an explicit Brazilian E.164 number`);
      }
      if (
        productionValue &&
        !/^55\d{10,11}$/.test(comparableSelector(productionValue, kind))
      ) {
        errors.push(`${productionName}: must be an explicit Brazilian E.164 number`);
      }
    }
    if (kind === "cookie") {
      if (qaValue && !/^[A-Za-z0-9_-]+$/.test(qaValue)) {
        errors.push(`${qaName}: must be an explicit safe cookie name`);
      }
      if (productionValue && !/^[A-Za-z0-9_-]+$/.test(productionValue)) {
        errors.push(`${productionName}: must be an explicit safe cookie name`);
      }
    }
    if (
      qaValue &&
      productionValue &&
      comparableSelector(qaValue, kind) &&
      comparableSelector(qaValue, kind) === comparableSelector(productionValue, kind)
    ) {
      errors.push(`${qaName}: must differ from ${productionName}`);
    }
  }

  const qaOrigins = [
    value(environment, "FLOWO_QA_MARKETING_ORIGIN"),
    value(environment, "FLOWO_QA_APP_ORIGIN"),
  ].map((origin) => comparableSelector(origin, "origin")).filter(Boolean);
  const productionOrigins = [
    value(environment, "FLOWO_PRODUCTION_MARKETING_ORIGIN"),
    value(environment, "FLOWO_PRODUCTION_APP_ORIGIN"),
  ].map((origin) => comparableSelector(origin, "origin")).filter(Boolean);
  if (qaOrigins.length === 2 && qaOrigins[0] === qaOrigins[1]) {
    errors.push("QA marketing and application origins must differ");
  }
  if (qaOrigins.some((origin) => productionOrigins.includes(origin))) {
    errors.push("QA origins must differ from all production origins");
  }

  const qaPostHog = postHogQaSelector(environment);
  if (qaPostHog.projectKey && qaPostHog.publicKey && qaPostHog.projectKey !== qaPostHog.publicKey) {
    errors.push("QA PostHog project-key selectors must agree");
  }
  if (!qaPostHog.selected) {
    errors.push("FLOWO_QA_POSTHOG_PUBLIC_KEY: required to identify the QA resource");
  } else if (!qaPostHog.selected.startsWith("phc_")) {
    errors.push("FLOWO_QA_POSTHOG_PUBLIC_KEY: must be a PostHog project key");
  }

  const productionPostHogFingerprint = value(
    environment,
    "FLOWO_PRODUCTION_POSTHOG_PUBLIC_KEY_SHA256",
  );
  if (!/^[a-f0-9]{64}$/i.test(productionPostHogFingerprint)) {
    errors.push("FLOWO_PRODUCTION_POSTHOG_PUBLIC_KEY_SHA256: required and invalid");
  } else if (
    qaPostHog.selected &&
    createHash("sha256").update(qaPostHog.selected).digest("hex") ===
      productionPostHogFingerprint.toLowerCase()
  ) {
    errors.push("FLOWO_QA_POSTHOG_PUBLIC_KEY: matches the production resource");
  }

  const productionTurnstileSiteKey = value(
    environment,
    "FLOWO_PRODUCTION_TURNSTILE_SITE_KEY",
  );
  const productionTurnstileDisabled =
    value(environment, "FLOWO_PRODUCTION_TURNSTILE_DISABLED") === "true";
  if (productionTurnstileSiteKey === "disabled" && !productionTurnstileDisabled) {
    errors.push(
      "FLOWO_PRODUCTION_TURNSTILE_DISABLED: must be true when the production site key is disabled",
    );
  }
  if (productionTurnstileDisabled && productionTurnstileSiteKey !== "disabled") {
    errors.push(
      "FLOWO_PRODUCTION_TURNSTILE_SITE_KEY: must equal disabled when production Turnstile is absent",
    );
  }

  for (const [qaName, productionName] of OPTIONAL_QA_SELECTOR_PAIRS) {
    const qaValue = value(environment, qaName);
    const productionValue = value(environment, productionName);
    if (Boolean(qaValue) !== Boolean(productionValue)) {
      errors.push(`${qaName} and ${productionName} must be configured together`);
    } else if (qaValue && qaValue === productionValue) {
      errors.push(`${qaName}: must differ from ${productionName}`);
    }
  }

  return [...new Set(errors)];
}

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

function compareQaRuntimeBinding(environment, runtimeName, qaName, errors, required) {
  const runtimeValue = value(environment, runtimeName);
  const qaValue = value(environment, qaName);

  if (required && !runtimeValue) {
    errors.push(`${runtimeName}: required for a QA build`);
  }
  if (required && !qaValue) {
    errors.push(`${qaName}: required to identify the QA runtime`);
  }
  if (!required && Boolean(runtimeValue) !== Boolean(qaValue)) {
    errors.push(`${runtimeName} and ${qaName} must be configured together`);
  }
  if (runtimeValue && qaValue && runtimeValue !== qaValue) {
    errors.push(`${runtimeName}: must match ${qaName}`);
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
  for (const [runtimeName, qaName] of REQUIRED_QA_RUNTIME_BINDINGS) {
    compareQaRuntimeBinding(environment, runtimeName, qaName, errors, true);
  }
  for (const [runtimeName, qaName] of OPTIONAL_QA_RUNTIME_BINDINGS) {
    compareQaRuntimeBinding(environment, runtimeName, qaName, errors, false);
  }

  const productionTurnstileSiteKey = value(
    environment,
    "FLOWO_PRODUCTION_TURNSTILE_SITE_KEY",
  );
  const productionTurnstileDisabled =
    value(environment, "FLOWO_PRODUCTION_TURNSTILE_DISABLED") === "true";
  if (productionTurnstileSiteKey === "disabled" && !productionTurnstileDisabled) {
    errors.push(
      "FLOWO_PRODUCTION_TURNSTILE_DISABLED: must be true when the production site key is disabled",
    );
  }
  if (productionTurnstileDisabled && productionTurnstileSiteKey !== "disabled") {
    errors.push(
      "FLOWO_PRODUCTION_TURNSTILE_SITE_KEY: must equal disabled when production Turnstile is absent",
    );
  }

  const qaPostHogKey = value(environment, "FLOWO_QA_POSTHOG_PROJECT_KEY");
  const productionPostHogFingerprint = value(
    environment,
    "FLOWO_PRODUCTION_POSTHOG_PUBLIC_KEY_SHA256",
  );
  if (!qaPostHogKey) {
    errors.push("FLOWO_QA_POSTHOG_PROJECT_KEY: required to identify the QA runtime");
  }
  if (!productionPostHogFingerprint) {
    errors.push("FLOWO_PRODUCTION_POSTHOG_PUBLIC_KEY_SHA256: required to prove QA isolation");
  } else if (!/^[a-f0-9]{64}$/i.test(productionPostHogFingerprint)) {
    errors.push("FLOWO_PRODUCTION_POSTHOG_PUBLIC_KEY_SHA256: invalid format");
  } else if (
    qaPostHogKey &&
    createHash("sha256").update(qaPostHogKey).digest("hex") ===
      productionPostHogFingerprint.toLowerCase()
  ) {
    errors.push("FLOWO_QA_POSTHOG_PROJECT_KEY: matches the production resource");
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

export function runQaLandingSelectorCheck(environment = process.env) {
  const errors = validateQaLandingSelectors(environment);
  if (errors.length) {
    console.error("QA landing selector isolation check failed:");
    for (const error of errors) console.error(`- ${error}`);
    return 1;
  }
  console.log("QA landing selectors differ from production.");
  return 0;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && currentFile === path.resolve(process.argv[1])) {
  const skipOutsideQa = process.argv.includes("--if-qa") &&
    value(process.env, "NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT") !== "qa";
  process.exitCode = process.argv.includes("--selectors-only")
    ? runQaLandingSelectorCheck()
    : skipOutsideQa
      ? 0
      : runQaLandingBoundaryCheck();
}
