import { pathToFileURL } from "node:url";

const EXPECTED_PROJECT_SETTINGS = Object.freeze({
  buildCommand: "pnpm build",
  framework: "nextjs",
  installCommand: "pnpm install --frozen-lockfile",
  nodeVersion: "22.x",
  rootDirectory: "",
});

function value(record, key) {
  const candidate = record?.[key];
  return typeof candidate === "string" ? candidate.trim() : "";
}

export function validateQaVercelProjectPolicy(
  project,
  { expectedProjectId, productionProjectId, expectedRepository },
) {
  const errors = [];
  if (!project || typeof project !== "object" || Array.isArray(project)) {
    return { errors: ["project: invalid response"], ok: false };
  }

  if (!expectedProjectId || value(project, "id") !== expectedProjectId) {
    errors.push("project.id: does not match FLOWO_QA_LANDING_VERCEL_PROJECT_ID");
  }
  if (!productionProjectId || expectedProjectId === productionProjectId) {
    errors.push("project.id: QA and production project IDs must differ");
  }

  for (const [name, expected] of Object.entries(EXPECTED_PROJECT_SETTINGS)) {
    if (value(project, name) !== expected) {
      errors.push(`${name}: must equal ${expected || "an empty root"}`);
    }
  }

  if (project.gitProviderOptions?.createDeployments !== "disabled") {
    errors.push("gitProviderOptions.createDeployments: must equal disabled");
  }

  const [expectedOwner, expectedRepo] = expectedRepository.split("/");
  if (
    project.link?.type !== "github" ||
    project.link?.org !== expectedOwner ||
    project.link?.repo !== expectedRepo ||
    project.link?.productionBranch !== "main"
  ) {
    errors.push("link: must resolve to GITHUB_REPOSITORY on main");
  }

  return { errors, ok: errors.length === 0 };
}

async function readStdin() {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  return input;
}

async function main() {
  const expectedProjectId =
    process.env.FLOWO_QA_LANDING_VERCEL_PROJECT_ID?.trim() ?? "";
  const productionProjectId =
    process.env.FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID?.trim() ?? "";
  const expectedRepository = process.env.GITHUB_REPOSITORY?.trim() ?? "";
  if (
    !expectedProjectId ||
    !productionProjectId ||
    !expectedRepository.includes("/")
  ) {
    console.error("QA landing Vercel policy check is missing its expected target.");
    process.exitCode = 1;
    return;
  }

  let project;
  try {
    project = JSON.parse(await readStdin());
  } catch {
    console.error("QA landing Vercel policy check received invalid JSON.");
    process.exitCode = 1;
    return;
  }

  const result = validateQaVercelProjectPolicy(project, {
    expectedProjectId,
    productionProjectId,
    expectedRepository,
  });
  if (!result.ok) {
    console.error("QA landing Vercel policy check failed:");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    "QA landing Vercel policy check passed: Git auto-deploy is disabled and the locked repository build owns publication.",
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await main();
}
