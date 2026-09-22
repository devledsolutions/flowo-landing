import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const workflow = readFileSync(
  resolve(import.meta.dirname, "../../.github/workflows/qa-environment-isolation.yml"),
  "utf8",
);

test("landing QA deployment is manual, target-confirmed, and serialized", () => {
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(
    workflow,
    /deploy:\n\s+description:[\s\S]*?type: boolean[\s\S]*?default: false/,
  );
  assert.match(workflow, /if: inputs\.deploy == true/);
  assert.match(workflow, /CONFIRMED_ORIGIN[\s\S]*?FLOWO_QA_MARKETING_ORIGIN/);
  assert.match(workflow, /GITHUB_REF[\s\S]*?refs\/heads\/main/);
  assert.match(workflow, /environment: qa/);
  assert.match(workflow, /cancel-in-progress: false/);
});

test("preflight proves runtime, production separation, and remote Vercel policy", () => {
  assert.match(workflow, /pnpm test:qa-isolation/);
  assert.match(workflow, /pnpm env:check/);
  assert.match(workflow, /check-qa-landing-boundary\.mjs/);
  assert.match(workflow, /check-qa-vercel-project-policy\.mjs/);
  assert.match(workflow, /FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID/);
});

test("build finishes before the only deploy command", () => {
  const build = workflow.indexOf("vercel@59.11.7 build --prod");
  const deploy = workflow.indexOf("vercel@59.11.7 deploy --prebuilt --prod");
  assert.ok(build > -1);
  assert.ok(build < deploy);
  assert.equal(
    workflow.match(/vercel@59\.11\.7 deploy --prebuilt --prod/g)?.length,
    1,
  );
});

test("post-deploy evidence binds exact SHA and all anti-indexing layers", () => {
  assert.match(workflow, /--meta flowoSourceRevision="\$GITHUB_SHA"/);
  assert.match(workflow, /vercel@59\.11\.7 inspect/);
  assert.match(workflow, /attest-qa-landing-deployment\.mjs/);
  assert.match(workflow, /flowo-qa-landing-deployment-\$\{\{ github\.sha \}\}/);
  assert.match(workflow, /actions\/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a/);
  assert.match(workflow, /retention-days: 30/);
});
