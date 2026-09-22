import assert from "node:assert/strict";
import test from "node:test";

import { buildQaLandingDeploymentAttestation } from "../attest-qa-landing-deployment.mjs";

const revision = "a".repeat(40);
const environment = Object.freeze({
  GITHUB_SHA: revision,
  GITHUB_REF: "refs/heads/main",
  GITHUB_REPOSITORY: "devledsolutions/flowo-landing",
  GITHUB_RUN_ID: "12345",
  GITHUB_RUN_ATTEMPT: "2",
  FLOWO_QA_MARKETING_ORIGIN: "https://qa.flowo.example",
  FLOWO_QA_APP_ORIGIN: "https://qa.barber.flowo.example",
  FLOWO_QA_LANDING_VERCEL_PROJECT_ID: "prj_flowo_landing_qa",
  FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID: "prj_flowo_landing_production",
});

function response({ body = "", headers = {}, status = 200 }) {
  const normalizedHeaders = new Map(
    Object.entries(headers).map(([name, value]) => [name.toLowerCase(), value]),
  );
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get(name) {
        return normalizedHeaders.get(name.toLowerCase()) ?? null;
      },
    },
    async text() {
      return body;
    },
  };
}

function fetchFixture(url) {
  if (url.endsWith("/robots.txt")) {
    return response({ body: "User-agent: *\nDisallow: /\n" });
  }
  return response({
    body:
      '<html><head><meta content="noindex, nofollow" name="robots"></head>' +
      '<body><a href="https://qa.barber.flowo.example/sign-up">App</a></body></html>',
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}

function inputs(overrides = {}) {
  return {
    environment,
    vercelDeployment: {
      readyState: "READY",
      target: "production",
      projectId: environment.FLOWO_QA_LANDING_VERCEL_PROJECT_ID,
      url: "flowo-landing-qa.vercel.app",
      meta: {
        flowoEnvironment: "qa",
        flowoSourceRef: "main",
        flowoSourceRevision: revision,
      },
      gitSource: { ref: "main", sha: revision },
      privateEnvironment: "must-not-leak",
    },
    fetchImpl: fetchFixture,
    now: () => new Date("2026-09-21T23:00:00.000Z"),
    ...overrides,
  };
}

test("attests the exact main revision and permanent QA landing", async () => {
  const result = await buildQaLandingDeploymentAttestation(inputs());
  assert.equal(result.status, "verified");
  assert.equal(result.source.revision, revision);
  assert.equal(
    result.targets.vercelDeploymentUrl,
    "https://flowo-landing-qa.vercel.app",
  );
  assert.equal(Object.values(result.checks).every(Boolean), true);
  assert.doesNotMatch(JSON.stringify(result), /must-not-leak/);
});

test("rejects branch dispatch or mismatched provenance", async () => {
  await assert.rejects(
    buildQaLandingDeploymentAttestation({
      ...inputs(),
      environment: { ...environment, GITHUB_REF: "refs/heads/topic" },
    }),
    /refs\/heads\/main/,
  );
  await assert.rejects(
    buildQaLandingDeploymentAttestation({
      ...inputs(),
      vercelDeployment: {
        ...inputs().vercelDeployment,
        meta: {
          ...inputs().vercelDeployment.meta,
          flowoSourceRevision: "b".repeat(40),
        },
      },
    }),
    /approved QA revision/,
  );
});

test("rejects a production Vercel project reused as QA", async () => {
  await assert.rejects(
    buildQaLandingDeploymentAttestation({
      ...inputs(),
      environment: {
        ...environment,
        FLOWO_QA_LANDING_VERCEL_PROJECT_ID:
          environment.FLOWO_PRODUCTION_LANDING_VERCEL_PROJECT_ID,
      },
    }),
    /project IDs must differ/,
  );
});

test("rejects a missing noindex response header", async () => {
  await assert.rejects(
    buildQaLandingDeploymentAttestation({
      ...inputs(),
      fetchImpl(url) {
        if (url.endsWith("/robots.txt")) return fetchFixture(url);
        return response({
          body: "<html><head></head><body>Production</body></html>",
          headers: { "content-type": "text/html" },
        });
      },
    }),
    /X-Robots-Tag/,
  );
});

test("rejects HTML without noindex metadata", async () => {
  await assert.rejects(
    buildQaLandingDeploymentAttestation({
      ...inputs(),
      fetchImpl(url) {
        if (url.endsWith("/robots.txt")) return fetchFixture(url);
        return response({
          body:
            '<html><head></head><body><a href="https://qa.barber.flowo.example">App</a></body></html>',
          headers: {
            "content-type": "text/html",
            "x-robots-tag": "noindex, nofollow",
          },
        });
      },
    }),
    /HTML robots metadata/,
  );
});

test("rejects a landing that links to no QA application origin", async () => {
  await assert.rejects(
    buildQaLandingDeploymentAttestation({
      ...inputs(),
      fetchImpl(url) {
        if (url.endsWith("/robots.txt")) return fetchFixture(url);
        return response({
          body:
            '<html><head><meta name="robots" content="noindex"></head><body>No app</body></html>',
          headers: {
            "content-type": "text/html",
            "x-robots-tag": "noindex, nofollow",
          },
        });
      },
    }),
    /does not link to the QA application origin/,
  );
});

test("rejects robots.txt that permits QA crawling", async () => {
  await assert.rejects(
    buildQaLandingDeploymentAttestation({
      ...inputs(),
      fetchImpl(url) {
        if (url.endsWith("/robots.txt")) {
          return response({ body: "User-Agent: *\nAllow: /\n" });
        }
        return fetchFixture(url);
      },
    }),
    /robots\.txt does not block crawling/,
  );
});
