import assert from "node:assert/strict";
import test from "node:test";

import { validateQaVercelProjectPolicy } from "../check-qa-vercel-project-policy.mjs";

const expected = Object.freeze({
  expectedProjectId: "prj_flowo_landing_qa",
  productionProjectId: "prj_flowo_landing_production",
  expectedRepository: "devledsolutions/flowo-landing",
});

const safeProject = Object.freeze({
  id: "prj_flowo_landing_qa",
  framework: "nextjs",
  nodeVersion: "22.x",
  buildCommand: "pnpm build",
  installCommand: "pnpm install --frozen-lockfile",
  rootDirectory: null,
  gitProviderOptions: { createDeployments: "disabled" },
  link: {
    type: "github",
    org: "devledsolutions",
    repo: "flowo-landing",
    productionBranch: "main",
  },
});

test("accepts the manually deployed landing QA project", () => {
  assert.deepEqual(validateQaVercelProjectPolicy(safeProject, expected), {
    errors: [],
    ok: true,
  });
});

test("rejects automatic Git deployments without echoing remote values", () => {
  const result = validateQaVercelProjectPolicy(
    {
      ...safeProject,
      gitProviderOptions: { createDeployments: "enabled" },
    },
    expected,
  );
  assert.deepEqual(result.errors, [
    "gitProviderOptions.createDeployments: must equal disabled",
  ]);
  assert.doesNotMatch(JSON.stringify(result), /enabled|devledsolutions/);
});

test("rejects unlocked installation or unexpected build configuration", () => {
  const result = validateQaVercelProjectPolicy(
    { ...safeProject, installCommand: "pnpm install", buildCommand: null },
    expected,
  );
  assert.deepEqual(result.errors, [
    "buildCommand: must equal pnpm build",
    "installCommand: must equal pnpm install --frozen-lockfile",
  ]);
});

test("rejects a production project ID or repository drift", () => {
  const result = validateQaVercelProjectPolicy(
    {
      ...safeProject,
      id: expected.productionProjectId,
      link: { ...safeProject.link, repo: "other" },
    },
    { ...expected, expectedProjectId: expected.productionProjectId },
  );
  assert.deepEqual(result.errors, [
    "project.id: QA and production project IDs must differ",
    "link: must resolve to GITHUB_REPOSITORY on main",
  ]);
});
