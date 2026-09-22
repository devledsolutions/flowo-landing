import { resolveCname } from "node:dns/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_ORIGINS = Object.freeze([
  "FLOWO_QA_MARKETING_ORIGIN",
  "FLOWO_QA_APP_ORIGIN",
]);

function value(environment, name) {
  return environment[name]?.trim() ?? "";
}

function originHost(environment, name, errors) {
  const configured = value(environment, name);
  if (!configured) {
    errors.push(`${name}: missing`);
    return null;
  }

  try {
    const url = new URL(configured);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      errors.push(`${name}: must be an exact HTTPS origin`);
      return null;
    }
    return url.hostname.toLowerCase();
  } catch {
    errors.push(`${name}: must be an exact HTTPS origin`);
    return null;
  }
}

function recordsFor(records, host) {
  const configured = records[host];
  if (!configured) return [];
  return (Array.isArray(configured) ? configured : [configured])
    .filter((record) => typeof record === "string")
    .map((record) => record.trim().toLowerCase().replace(/\.$/, ""));
}

export function validateQaLandingDns(environment, records) {
  const errors = [];
  const checks = [];
  const seenHosts = new Set();

  for (const name of REQUIRED_ORIGINS) {
    const host = originHost(environment, name, errors);
    if (!host || seenHosts.has(host)) continue;
    seenHosts.add(host);

    if (recordsFor(records, host).length === 0) {
      errors.push(`${name}: CNAME missing for ${host}`);
      checks.push({ host, ok: false });
      continue;
    }
    checks.push({ host, ok: true });
  }

  return { errors, checks, ok: errors.length === 0 };
}

async function resolveOrigins(environment) {
  const errors = [];
  const records = {};
  const hosts = new Set();

  for (const name of REQUIRED_ORIGINS) {
    const host = originHost(environment, name, errors);
    if (host) hosts.add(host);
  }

  await Promise.all(
    [...hosts].map(async (host) => {
      try {
        records[host] = await resolveCname(host);
      } catch {
        records[host] = [];
      }
    }),
  );

  return { errors, records };
}

export async function runQaDnsCheck(environment = process.env) {
  const resolved = await resolveOrigins(environment);
  const result = validateQaLandingDns(environment, resolved.records);
  const errors = [...resolved.errors, ...result.errors].filter(
    (error, index, all) => all.indexOf(error) === index,
  );

  if (errors.length > 0) {
    console.error("QA landing DNS check failed:");
    for (const error of errors) console.error(`- ${error}`);
    return 1;
  }

  console.log(
    `QA landing DNS check passed: ${result.checks.length} origins have CNAME records.`,
  );
  return 0;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && currentFile === path.resolve(process.argv[1])) {
  process.exitCode = await runQaDnsCheck();
}
