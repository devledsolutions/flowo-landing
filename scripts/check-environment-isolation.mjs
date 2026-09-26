import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveFlowoLegalContactEmails } from "../lib/legal-contact-emails.mjs";

const COOKIE_NAME_PATTERN = /^[A-Za-z0-9_-]+$/;
const COOKIE_DOMAIN_PATTERN = /^\.[A-Za-z0-9.-]+$/;
const BRAZILIAN_E164_PATTERN = /^55\d{10,11}$/;

function value(env, name) {
  return env[name]?.trim() ?? "";
}

function exactOrigin(env, name, errors) {
  const raw = value(env, name);
  if (!raw) {
    errors.push(`${name} is required`);
    return undefined;
  }

  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    errors.push(`${name} must be an absolute HTTP(S) origin`);
    return undefined;
  }

  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  ) {
    errors.push(`${name} must be an exact HTTP(S) origin`);
    return undefined;
  }
  return parsed;
}

function requirePair(env, left, right, errors, required) {
  const leftValue = value(env, left);
  const rightValue = value(env, right);
  if (Boolean(leftValue) !== Boolean(rightValue)) {
    errors.push(`${left} and ${right} must be configured together`);
  }
  if (required && (!leftValue || !rightValue)) {
    errors.push(`${left} and ${right} are required in hosted environments`);
  }
}

export function validateLandingEnvironment(env) {
  const errors = [];
  const deploymentEnvironment = value(env, "NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT");
  if (!new Set(["development", "qa", "production"]).has(deploymentEnvironment)) {
    errors.push(
      "NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT must be development, qa, or production",
    );
  }
  const hosted = deploymentEnvironment === "qa" || deploymentEnvironment === "production";

  const site = exactOrigin(env, "NEXT_PUBLIC_SITE_URL", errors);
  const app = exactOrigin(env, "NEXT_PUBLIC_APP_URL", errors);
  if (site && app && site.origin === app.origin) {
    errors.push("NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_APP_URL must differ");
  }
  if (hosted) {
    for (const [name, parsed] of [
      ["NEXT_PUBLIC_SITE_URL", site],
      ["NEXT_PUBLIC_APP_URL", app],
    ]) {
      if (
        parsed &&
        (parsed.protocol !== "https:" ||
          parsed.hostname === "localhost" ||
          parsed.hostname === "127.0.0.1" ||
          parsed.port)
      ) {
        errors.push(`${name} must be a hosted HTTPS origin`);
      }
    }
  }

  const serverConvex = exactOrigin(env, "CONVEX_URL", errors);
  const browserConvex = exactOrigin(env, "NEXT_PUBLIC_CONVEX_URL", errors);
  if (serverConvex && browserConvex && serverConvex.origin !== browserConvex.origin) {
    errors.push("CONVEX_URL and NEXT_PUBLIC_CONVEX_URL must match");
  }
  if (hosted) {
    for (const [name, parsed] of [
      ["CONVEX_URL", serverConvex],
      ["NEXT_PUBLIC_CONVEX_URL", browserConvex],
    ]) {
      if (
        parsed &&
        (parsed.protocol !== "https:" || !parsed.hostname.endsWith(".convex.cloud"))
      ) {
        errors.push(`${name} must identify a hosted Convex deployment`);
      }
    }
  }

  const whatsapp = value(env, "NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/\D/g, "");
  if (!BRAZILIAN_E164_PATTERN.test(whatsapp)) {
    errors.push(
      "NEXT_PUBLIC_WHATSAPP_NUMBER must be an explicit Brazilian E.164 number",
    );
  }

  if (new Set(["development", "qa", "production"]).has(deploymentEnvironment)) {
    try {
      resolveFlowoLegalContactEmails({
        deploymentEnvironment,
        contactEmail: value(env, "NEXT_PUBLIC_FLOWO_SALES_EMAIL") || undefined,
        supportEmail: value(env, "NEXT_PUBLIC_FLOWO_SUPPORT_EMAIL") || undefined,
        privacyEmail: value(env, "NEXT_PUBLIC_FLOWO_PRIVACY_EMAIL") || undefined,
      });
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "Legal contact emails are invalid");
    }
  }

  const cookieName = value(env, "NEXT_PUBLIC_CONSENT_COOKIE_NAME");
  if (!COOKIE_NAME_PATTERN.test(cookieName)) {
    errors.push("NEXT_PUBLIC_CONSENT_COOKIE_NAME must be an explicit safe cookie name");
  }
  const cookieDomain = value(env, "NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN");
  if (cookieDomain !== "host-only" && !COOKIE_DOMAIN_PATTERN.test(cookieDomain)) {
    errors.push(
      "NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN must be host-only or an explicit domain",
    );
  }
  if (deploymentEnvironment === "qa" && cookieDomain !== "host-only") {
    errors.push("QA consent and analytics cookies must remain host-only");
  }
  if (deploymentEnvironment === "production" && cookieDomain !== ".flowo.com.br") {
    errors.push("Production cookie domain must be .flowo.com.br");
  }

  requirePair(
    env,
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
    "TURNSTILE_SECRET_KEY",
    errors,
    hosted,
  );
  requirePair(
    env,
    "NEXT_PUBLIC_GOOGLE_ADS_ID",
    "NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL",
    errors,
    false,
  );

  const posthogNames = ["NEXT_PUBLIC_POSTHOG_KEY", "POSTHOG_API_KEY"];
  const posthogValues = posthogNames.map((name) => value(env, name));
  const anyPostHog = posthogValues.some(Boolean);
  if (hosted || anyPostHog) {
    for (const [index, name] of posthogNames.entries()) {
      if (!posthogValues[index]) errors.push(`${name} is required for PostHog isolation`);
    }
  }
  if (posthogValues[0] && !posthogValues[0].startsWith("phc_")) {
    errors.push("NEXT_PUBLIC_POSTHOG_KEY must be a PostHog project key");
  }

  if (deploymentEnvironment !== "production") {
    for (const name of [
      "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION",
      "NEXT_PUBLIC_BING_SITE_VERIFICATION",
      "NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION",
    ]) {
      if (value(env, name)) errors.push(`${name} must be absent outside production`);
    }
  }

  return [...new Set(errors)];
}

export function runEnvironmentCheck(env = process.env) {
  const errors = validateLandingEnvironment(env);
  if (errors.length) {
    console.error("Landing environment isolation check failed:");
    for (const error of errors) console.error(`- ${error}`);
    return 1;
  }
  console.log("Landing environment isolation check passed.");
  return 0;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && currentFile === path.resolve(process.argv[1])) {
  process.exitCode = runEnvironmentCheck();
}
