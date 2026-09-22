import assert from "node:assert/strict";
import test from "node:test";
import { validateQaLandingDns } from "../check-qa-dns.mjs";

const environment = Object.freeze({
  FLOWO_QA_MARKETING_ORIGIN: "https://qa.flowo.com.br",
  FLOWO_QA_APP_ORIGIN: "https://qa.barber.flowo.com.br",
});

test("accepts the QA landing and app CNAMEs", () => {
  const result = validateQaLandingDns(environment, {
    "qa.flowo.com.br": ["cname.vercel-dns.com."],
    "qa.barber.flowo.com.br": ["8919120ff4514e4c.vercel-dns-016.com."],
  });

  assert.deepEqual(result.errors, []);
  assert.equal(result.ok, true);
  assert.equal(result.checks.length, 2);
});

test("fails closed when either QA origin has no CNAME", () => {
  const result = validateQaLandingDns(environment, {
    "qa.barber.flowo.com.br": ["8919120ff4514e4c.vercel-dns-016.com."],
  });

  assert.equal(result.ok, false);
  assert.ok(
    result.errors.includes(
      "FLOWO_QA_MARKETING_ORIGIN: CNAME missing for qa.flowo.com.br",
    ),
  );
});
