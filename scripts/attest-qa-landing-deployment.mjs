#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SHA_PATTERN = /^[0-9a-f]{40}$/;

function value(environment, name) {
  return environment[name]?.trim() ?? "";
}

function exactHttpsOrigin(input, name) {
  try {
    const url = new URL(input);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      throw new Error();
    }
    return url.origin;
  } catch {
    throw new Error(`${name} must be an exact HTTPS origin.`);
  }
}

function deploymentUrl(input) {
  const candidate = input.includes("://") ? input : `https://${input}`;
  return exactHttpsOrigin(candidate, "Vercel deployment URL");
}

function robotsMetaBlocksIndexing(html) {
  const tags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  return tags.some((tag) => {
    const name = tag.match(/\bname=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    const content = tag.match(/\bcontent=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    return name === "robots" && content?.includes("noindex");
  });
}

export async function buildQaLandingDeploymentAttestation({
  environment,
  vercelDeployment,
  fetchImpl = fetch,
  now = () => new Date(),
}) {
  const sourceRevision = value(environment, "GITHUB_SHA");
  const sourceRef = value(environment, "GITHUB_REF");
  const repository = value(environment, "GITHUB_REPOSITORY");
  const runId = value(environment, "GITHUB_RUN_ID");
  const runAttempt = value(environment, "GITHUB_RUN_ATTEMPT");
  if (!SHA_PATTERN.test(sourceRevision)) {
    throw new Error("GITHUB_SHA must be a full lowercase commit SHA.");
  }
  if (sourceRef !== "refs/heads/main") {
    throw new Error("Permanent QA landing attestations require refs/heads/main.");
  }
  if (!repository || !/^\d+$/.test(runId) || !/^\d+$/.test(runAttempt)) {
    throw new Error("GitHub workflow identity is incomplete.");
  }

  const landingOrigin = exactHttpsOrigin(
    value(environment, "FLOWO_QA_MARKETING_ORIGIN"),
    "FLOWO_QA_MARKETING_ORIGIN",
  );
  const appOrigin = exactHttpsOrigin(
    value(environment, "FLOWO_QA_APP_ORIGIN"),
    "FLOWO_QA_APP_ORIGIN",
  );
  if (landingOrigin === appOrigin) {
    throw new Error("QA landing and application origins must differ.");
  }
  const expectedProjectId = value(
    environment,
    "FLOWO_QA_LANDING_VERCEL_PROJECT_ID",
  );
  const productionProjectId = value(
    environment,
    "FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID",
  );
  if (!expectedProjectId || !productionProjectId) {
    throw new Error("Vercel project identity is incomplete.");
  }
  if (expectedProjectId === productionProjectId) {
    throw new Error("QA and production Vercel project IDs must differ.");
  }

  const deployedProjectId =
    vercelDeployment?.projectId ?? vercelDeployment?.project?.id ?? "";
  const deployedUrl = deploymentUrl(vercelDeployment?.url ?? "");
  const metadata = vercelDeployment?.meta ?? {};
  const gitSource = vercelDeployment?.gitSource;
  if (
    vercelDeployment?.readyState !== "READY" ||
    vercelDeployment?.target !== "production" ||
    deployedProjectId !== expectedProjectId ||
    metadata.flowoEnvironment !== "qa" ||
    metadata.flowoSourceRef !== "main" ||
    metadata.flowoSourceRevision !== sourceRevision ||
    (gitSource && (gitSource.ref !== "main" || gitSource.sha !== sourceRevision))
  ) {
    throw new Error(
      "Vercel landing deployment provenance does not match the approved QA revision.",
    );
  }

  const [root, robots] = await Promise.all([
    fetchImpl(`${landingOrigin}/`, { cache: "no-store", redirect: "error" }),
    fetchImpl(`${landingOrigin}/robots.txt`, {
      cache: "no-store",
      redirect: "error",
    }),
  ]);
  if (!root.ok) throw new Error("Permanent QA landing root check failed.");
  if (!robots.ok) throw new Error("Permanent QA landing robots check failed.");

  const rootContentType = root.headers.get("content-type")?.toLowerCase() ?? "";
  const xRobotsTag = root.headers.get("x-robots-tag")?.toLowerCase() ?? "";
  const html = await root.text();
  const robotsText = await robots.text();
  if (!rootContentType.includes("text/html")) {
    throw new Error("Permanent QA landing root did not return HTML.");
  }
  if (!xRobotsTag.includes("noindex") || !xRobotsTag.includes("nofollow")) {
    throw new Error("Permanent QA landing X-Robots-Tag is unsafe.");
  }
  if (!robotsMetaBlocksIndexing(html)) {
    throw new Error("Permanent QA landing HTML robots metadata is unsafe.");
  }
  if (!html.includes(appOrigin)) {
    throw new Error("Permanent QA landing does not link to the QA application origin.");
  }
  if (!/^\s*User-agent:\s*\*\s*$/im.test(robotsText) ||
      !/^\s*Disallow:\s*\/\s*$/im.test(robotsText)) {
    throw new Error("Permanent QA landing robots.txt does not block crawling.");
  }

  return {
    schema: "flowo.qa-landing-deployment-attestation.v1",
    status: "verified",
    environment: "qa",
    checkedAt: now().toISOString(),
    source: {
      repository,
      ref: sourceRef,
      revision: sourceRevision,
    },
    workflow: {
      runId,
      runAttempt,
      url: `https://github.com/${repository}/actions/runs/${runId}`,
    },
    targets: {
      landingOrigin,
      applicationOrigin: appOrigin,
      vercelProjectId: expectedProjectId,
      vercelDeploymentUrl: deployedUrl,
    },
    checks: {
      mainRevision: true,
      vercelProjectIsolation: true,
      vercelReady: true,
      vercelRevision: true,
      permanentOrigin: true,
      appOriginLink: true,
      robotsHeader: true,
      robotsMetadata: true,
      robotsFile: true,
    },
  };
}

async function main() {
  const [vercelDeploymentPath, outputPath] = process.argv.slice(2);
  if (!vercelDeploymentPath || !outputPath) {
    throw new Error(
      "Use attest-qa-landing-deployment.mjs <vercel-inspect.json> <output.json>.",
    );
  }
  const vercelDeployment = JSON.parse(
    await readFile(resolve(vercelDeploymentPath), "utf8"),
  );
  const attestation = await buildQaLandingDeploymentAttestation({
    environment: process.env,
    vercelDeployment,
  });
  const resolvedOutput = resolve(outputPath);
  await mkdir(dirname(resolvedOutput), { recursive: true });
  await writeFile(resolvedOutput, `${JSON.stringify(attestation, null, 2)}\n`, {
    mode: 0o600,
  });
  process.stdout.write("QA landing deployment attestation verified and written.\n");
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await main();
}
