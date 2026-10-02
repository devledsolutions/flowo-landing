import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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
  gitProviderOptions: { createDeployments: "enabled" },
  previewDeploymentsDisabled: true,
  link: {
    type: "github",
    org: "devledsolutions",
    repo: "flowo-landing",
    productionBranch: "qa",
  },
});

test("accepts the landing QA project tracking its dedicated branch", () => {
  assert.deepEqual(validateQaVercelProjectPolicy(safeProject, expected), {
    errors: [],
    ok: true,
  });
});

test("rejects a disabled QA Git connection without echoing remote values", () => {
  const result = validateQaVercelProjectPolicy(
    {
      ...safeProject,
      gitProviderOptions: { createDeployments: "disabled" },
    },
    expected,
  );
  assert.deepEqual(result.errors, [
    "gitProviderOptions.createDeployments: must equal enabled",
  ]);
  assert.doesNotMatch(JSON.stringify(result), /disabled|devledsolutions/);
});

test("rejects main tracking and enabled previews in the QA project", () => {
  const result = validateQaVercelProjectPolicy({
    ...safeProject,
    previewDeploymentsDisabled: false,
    link: { ...safeProject.link, productionBranch: "main" },
  }, expected);
  assert.deepEqual(result.errors, [
    "previewDeploymentsDisabled: must equal true",
    "link: must resolve to GITHUB_REPOSITORY on qa",
  ]);
});

test("the shared source does not override the project's branch tracking", () => {
  const config = JSON.parse(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"));
  assert.equal(config.git?.deploymentEnabled, undefined);
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
    "link: must resolve to GITHUB_REPOSITORY on qa",
  ]);
});
