import assert from "node:assert/strict";
import test from "node:test";

process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT = "qa";
process.env.NEXT_PUBLIC_RELEASE = "test-release";

const {
  buildLandingExceptionProperties,
  landingTelemetryDimensions,
  redactLandingTelemetry,
  sanitizeLandingPostHogEvent,
} = await import("../../lib/observability/posthog-shared.ts");

test("landing exceptions keep stable dimensions", () => {
  assert.deepEqual(landingTelemetryDimensions, {
    surface: "landing",
    platform: "web",
    environment: "qa",
    release: "test-release",
  });

  assert.deepEqual(
    buildLandingExceptionProperties("lead-capture.network-error", {
      component: "lead-capture",
      email: "customer@example.com",
      phone: "+55 11 99999-9999",
    }),
    {
      surface: "landing",
      platform: "web",
      environment: "qa",
      release: "test-release",
      source: "landing",
      context: "lead-capture.network-error",
      level: "error",
      details: {
        component: "lead-capture",
        email: "[Redacted]",
        phone: "[Redacted]",
      },
    },
  );
});

test("landing telemetry redacts sensitive keys and text", () => {
  assert.deepEqual(
    redactLandingTelemetry({
      name: "Luiz",
      email: "customer@example.com",
      safe: "request failed",
      nested: { authorization: "Bearer secret-value" },
    }),
    {
      name: "[Redacted]",
      email: "[Redacted]",
      safe: "request failed",
      nested: { authorization: "[Redacted]" },
    },
  );
});

test("PostHog URLs lose query parameters before capture", () => {
  const event = sanitizeLandingPostHogEvent({
    event: "$exception",
    properties: {
      "$current_url": "https://flowo.com.br/recursos?email=customer@example.com",
      detail: "email=customer@example.com",
    },
  });

  assert.deepEqual(event?.properties, {
    "$current_url": "https://flowo.com.br/recursos",
    detail: "email=[Redacted email]",
  });
});
