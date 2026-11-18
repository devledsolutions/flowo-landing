import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..", "..");
const LABEL = /ilustrativ|dados de demonstra|nomes de demonstra|dados de teste/i;

// The two case pages and the llms texts keep their note while the page calls
// those shops customers. The privacy policy describes how tests handle data.
const ALLOWED = new Set([
  "app/casos-de-validacao/page.tsx",
  "components/marketing/validation-case-page.tsx",
  "app/llms.txt/route.ts",
  "app/llms-full.txt/route.ts",
  "app/privacidade/page.tsx",
]);

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === "__tests__" ? [] : sourceFiles(path);
    return /\.tsx?$/.test(name) ? [path] : [];
  });
}

describe("site pages without demo-data labels", () => {
  it("has no illustrative or demo-data label outside the allowed files", () => {
    const offenders = ["app", "components", "data"]
      .flatMap((dir) => sourceFiles(join(ROOT, dir)))
      .map((path) => relative(ROOT, path))
      .filter((path) => !ALLOWED.has(path))
      .filter((path) => LABEL.test(readFileSync(join(ROOT, path), "utf8")));
    expect(offenders).toEqual([]);
  });
});
