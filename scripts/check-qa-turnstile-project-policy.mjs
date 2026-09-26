import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TURNSTILE_SITE_KEY = "NEXT_PUBLIC_TURNSTILE_SITE_KEY";
const TURNSTILE_SECRET_KEY = "TURNSTILE_SECRET_KEY";

function entries(payload) {
  if (Array.isArray(payload)) return payload;
  return Array.isArray(payload?.envs) ? payload.envs : [];
}

function targetedEntries(payload, name) {
  return entries(payload).filter((entry) => {
    const entryName = entry.key ?? entry.name;
    const target = Array.isArray(entry.target)
      ? entry.target
      : Array.isArray(entry.targets)
        ? entry.targets
        : [];
    return entryName === name && target.includes("production");
  });
}

export function validateQaTurnstileProjectPolicy(
  qaEnvironment,
  productionEnvironment,
  { qaProjectId, productionProjectId },
) {
  const errors = [];
  if (!/^prj_[A-Za-z0-9]+$/.test(qaProjectId ?? "")) {
    errors.push("qaProjectId: invalid QA project identity");
  }
  if (!/^prj_[A-Za-z0-9]+$/.test(productionProjectId ?? "")) {
    errors.push("productionProjectId: invalid production project identity");
  }
  if (qaProjectId && qaProjectId === productionProjectId) {
    errors.push("QA and production Vercel project IDs must differ");
  }

  for (const [name, expectedType] of [
    [TURNSTILE_SITE_KEY, new Set(["encrypted", "plain"])],
    [TURNSTILE_SECRET_KEY, new Set(["sensitive"])],
  ]) {
    const matches = targetedEntries(qaEnvironment, name);
    if (matches.length !== 1) {
      errors.push(`QA Vercel project must define exactly one production ${name}`);
      continue;
    }
    if (!expectedType.has(matches[0].type)) {
      errors.push(`QA Vercel ${name} has an unsafe or unsupported value type`);
    }
  }

  for (const name of [TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY]) {
    if (targetedEntries(productionEnvironment, name).length > 0) {
      errors.push(`Production Vercel project unexpectedly defines ${name}`);
    }
  }

  return [...new Set(errors)];
}

export function runQaTurnstileProjectPolicyCheck({
  qaEnvironment,
  productionEnvironment,
  qaProjectId,
  productionProjectId,
}) {
  const errors = validateQaTurnstileProjectPolicy(
    qaEnvironment,
    productionEnvironment,
    { qaProjectId, productionProjectId },
  );
  if (errors.length) {
    console.error("QA Turnstile project policy check failed:");
    for (const error of errors) console.error(`- ${error}`);
    return 1;
  }
  console.log(
    "QA Turnstile keys are configured only on the isolated QA Vercel project.",
  );
  return 0;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && currentFile === path.resolve(process.argv[1])) {
  const [qaPath, productionPath] = process.argv.slice(2);
  if (!qaPath || !productionPath) {
    console.error("Expected QA and production Vercel env-list JSON paths.");
    process.exitCode = 2;
  } else {
    try {
      process.exitCode = runQaTurnstileProjectPolicyCheck({
        qaEnvironment: JSON.parse(readFileSync(qaPath, "utf8")),
        productionEnvironment: JSON.parse(readFileSync(productionPath, "utf8")),
        qaProjectId: process.env.FLOWO_QA_LANDING_VERCEL_PROJECT_ID,
        productionProjectId:
          process.env.FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID,
      });
    } catch {
      console.error("QA Turnstile project policy check received invalid metadata.");
      process.exitCode = 1;
    }
  }
}
