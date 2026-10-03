import { afterEach, expect, it, vi } from "vitest";

afterEach(() => vi.unstubAllEnvs());

it("embeds the Vercel commit for browser-side provenance", async () => {
  vi.stubEnv("NEXT_PUBLIC_RELEASE", "");
  vi.stubEnv("VERCEL_GIT_COMMIT_SHA", "published-sha-fixture");
  vi.resetModules();
  const { default: config } = await import("../../../next.config");
  expect(config.env?.NEXT_PUBLIC_RELEASE).toBe("published-sha-fixture");
});

it("honors an explicit non-empty release label", async () => {
  vi.stubEnv("NEXT_PUBLIC_RELEASE", "release-override");
  vi.stubEnv("VERCEL_GIT_COMMIT_SHA", "published-sha-fixture");
  vi.resetModules();
  const { default: config } = await import("../../../next.config");
  expect(config.env?.NEXT_PUBLIC_RELEASE).toBe("release-override");
});
