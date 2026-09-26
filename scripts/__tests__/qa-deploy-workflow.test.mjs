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

test("preflight validates isolated selectors without requiring unreadable runtime secrets", () => {
  const isolationJob = workflow.split("\n  deploy:")[0];
  assert.match(workflow, /pnpm test:qa-isolation/);
  assert.match(isolationJob, /check-qa-landing-boundary\.mjs --selectors-only/);
  assert.doesNotMatch(isolationJob, /pnpm env:check/);
  assert.doesNotMatch(isolationJob, /TURNSTILE_SECRET_KEY|POSTHOG_API_KEY/);
  assert.match(workflow, /check-qa-vercel-project-policy\.mjs/);
  assert.match(workflow, /FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID/);
  assert.match(workflow, /FLOWO_PRODUCTION_POSTHOG_PUBLIC_KEY_SHA256/);
  assert.match(workflow, /FLOWO_QA_POSTHOG_PROJECT_KEY: \$\{\{ vars\.FLOWO_QA_POSTHOG_PUBLIC_KEY \}\}/);
  assert.doesNotMatch(workflow, /FLOWO_PRODUCTION_POSTHOG_PROJECT_KEY/);
});

test("production Turnstile may be marked disabled only after Vercel metadata proves absence", () => {
  const metadataCheck = workflow.indexOf(
    "Verify Turnstile keys are scoped only to the QA Vercel project",
  );
  const selectorCheck = workflow.indexOf(
    "check-qa-landing-boundary.mjs --selectors-only",
  );
  assert.ok(metadataCheck > -1 && metadataCheck < selectorCheck);
  assert.match(workflow, /check-qa-turnstile-project-policy\.mjs/);
  assert.match(workflow, /vercel@59\.11\.7 env ls production --format=json/);
  assert.match(workflow, /FLOWO_PRODUCTION_TURNSTILE_DISABLED: "true"/);
});

test("QA source is built remotely with runtime secrets kept in the isolated Vercel project", () => {
  const deploy = workflow.indexOf("vercel@59.11.7 deploy --prod --yes");
  assert.ok(deploy > -1);
  assert.equal(
    workflow.match(/vercel@59\.11\.7 deploy --prod --yes/g)?.length,
    1,
  );
  assert.doesNotMatch(workflow, /vercel@59\.11\.7 deploy --prebuilt/);
  assert.match(workflow, /--build-env "FLOWO_QA_POSTHOG_PROJECT_KEY=\$FLOWO_QA_POSTHOG_PROJECT_KEY"/);
  assert.match(workflow, /--build-env "FLOWO_PRODUCTION_TURNSTILE_SITE_KEY=\$FLOWO_PRODUCTION_TURNSTILE_SITE_KEY"/);
  assert.match(workflow, /--build-env "FLOWO_PRODUCTION_TURNSTILE_DISABLED=\$FLOWO_PRODUCTION_TURNSTILE_DISABLED"/);
  assert.doesNotMatch(workflow, /--build-env [^\\\n]*(?:TURNSTILE_SECRET_KEY|POSTHOG_API_KEY)/);
});

test("every QA landing build invokes the boundary guard before Next.js", () => {
  const packageJson = JSON.parse(
    readFileSync(resolve(import.meta.dirname, "../../package.json"), "utf8"),
  );
  assert.match(packageJson.scripts.build, /check-qa-landing-boundary\.mjs --if-qa/);
});

test("post-deploy evidence binds exact SHA and all anti-indexing layers", () => {
  assert.match(workflow, /FLOWO_QA_MARKETING_ORIGIN\/api\/health/);
  assert.match(workflow, /Attest revision, target, health, app link and noindex defenses/);
  assert.match(workflow, /--meta flowoSourceRevision="\$GITHUB_SHA"/);
  assert.match(workflow, /vercel@59\.11\.7 inspect/);
  assert.match(workflow, /attest-qa-landing-deployment\.mjs/);
  assert.match(workflow, /flowo-qa-landing-deployment-\$\{\{ github\.sha \}\}/);
  assert.match(workflow, /actions\/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a/);
  assert.match(workflow, /retention-days: 30/);
});
