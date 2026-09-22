import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const config = readFileSync(resolve(import.meta.dirname, "../../next.config.ts"), "utf8");
const layout = readFileSync(resolve(import.meta.dirname, "../../app/layout.tsx"), "utf8");
const robots = readFileSync(resolve(import.meta.dirname, "../../app/robots.ts"), "utf8");

test("non-production search isolation has header, metadata, and robots.txt defenses", () => {
  assert.match(config, /NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production"/);
  assert.match(config, /key: "X-Robots-Tag"/);
  assert.match(config, /value: "noindex, nofollow, noarchive"/);
  assert.match(layout, /index: PUBLIC_ENVIRONMENT\.isPublicProduction/);
  assert.match(layout, /follow: PUBLIC_ENVIRONMENT\.isPublicProduction/);
  assert.match(robots, /if \(!PUBLIC_ENVIRONMENT\.isPublicProduction\)/);
  assert.match(robots, /disallow: "\/"/);
});
