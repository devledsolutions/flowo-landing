import assert from "node:assert/strict";
import test from "node:test";

import { validateQaTurnstileProjectPolicy } from "../check-qa-turnstile-project-policy.mjs";

const qaProjectId = "prj_qaLanding";
const productionProjectId = "prj_prodLanding";

function qaEnvironment() {
  return {
    envs: [
      {
        key: "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
        target: ["production"],
        type: "encrypted",
      },
      {
        key: "TURNSTILE_SECRET_KEY",
        target: ["production"],
        type: "sensitive",
      },
    ],
  };
}

test("accepts separate QA Turnstile keys and no production Turnstile variables", () => {
  assert.deepEqual(
    validateQaTurnstileProjectPolicy(qaEnvironment(), { envs: [] }, {
      qaProjectId,
      productionProjectId,
    }),
    [],
  );
});

test("fails closed if either QA Turnstile variable is missing", () => {
  const qa = qaEnvironment();
  qa.envs = qa.envs.filter((entry) => entry.key !== "TURNSTILE_SECRET_KEY");

  assert.ok(
    validateQaTurnstileProjectPolicy(qa, { envs: [] }, {
      qaProjectId,
      productionProjectId,
    }).some((error) => error.includes("TURNSTILE_SECRET_KEY")),
  );
});

test("requires the QA server key to stay in Vercel's sensitive type", () => {
  const qa = qaEnvironment();
  qa.envs.find((entry) => entry.key === "TURNSTILE_SECRET_KEY").type = "plain";

  assert.ok(
    validateQaTurnstileProjectPolicy(qa, { envs: [] }, {
      qaProjectId,
      productionProjectId,
    }).some((error) => error.includes("unsafe or unsupported value type")),
  );
});

test("fails if production configures either Turnstile key", () => {
  const production = {
    envs: [
      {
        key: "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
        target: ["production"],
        type: "encrypted",
      },
    ],
  };

  assert.ok(
    validateQaTurnstileProjectPolicy(qaEnvironment(), production, {
      qaProjectId,
      productionProjectId,
    }).some((error) => error.includes("Production Vercel project unexpectedly")),
  );
});

test("rejects a shared Vercel project and ignores unscoped preview variables", () => {
  const qa = qaEnvironment();
  qa.envs.push({
    key: "TURNSTILE_SECRET_KEY",
    target: ["preview"],
    type: "sensitive",
  });

  assert.ok(
    validateQaTurnstileProjectPolicy(qa, { envs: [] }, {
      qaProjectId,
      productionProjectId: qaProjectId,
    }).some((error) => error.includes("project IDs must differ")),
  );
});
