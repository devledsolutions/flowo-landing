import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../../..");
const copied = [
  "providers/paid-media-provider.tsx",
  "providers/segment-provider.tsx",
  "app/layout.tsx",
  "app/api/webmcp-usage/route.ts",
  "lib/observability/posthog-server.ts",
  "lib/webmcp",
  "components/webmcp",
];
let workdir: string | undefined;

function audit(mutate?: (dir: string) => void): { ok: boolean; output: string } {
  workdir = mkdtempSync(join(tmpdir(), "flowo-consent-"));
  for (const entry of copied) cpSync(join(root, entry), join(workdir, entry), { recursive: true });
  mutate?.(workdir);
  try {
    execFileSync(process.execPath, [join(root, "scripts/audit-ad-consent.mjs")], { cwd: workdir, stdio: "pipe" });
    return { ok: true, output: "" };
  } catch (error) {
    return { ok: false, output: String((error as { stdout?: Buffer }).stdout ?? "") };
  }
}

function edit(dir: string, file: string, change: (source: string) => string) {
  const path = join(dir, file);
  writeFileSync(path, change(readFileSync(path, "utf8")));
}

afterEach(() => {
  if (workdir) rmSync(workdir, { recursive: true, force: true });
  workdir = undefined;
});

describe("consent audit for WebMCP", () => {
  it("passes on the current code", () => {
    expect(audit().ok).toBe(true);
  });

  it("fails when the usage route reads cookies", () => {
    const result = audit((dir) =>
      edit(dir, "app/api/webmcp-usage/route.ts", (source) => `${source}\nconst c = (r: Request) => r.headers.get("cookie");\n`),
    );
    expect(result.ok).toBe(false);
    expect(result.output).toContain("não pode ler cookies");
  });

  it("fails when the counter enables GeoIP or person profiles", () => {
    const geo = audit((dir) =>
      edit(dir, "lib/observability/posthog-server.ts", (source) => source.replace("disableGeoip: true", "disableGeoip: false")),
    );
    expect(geo.ok).toBe(false);
    rmSync(workdir!, { recursive: true, force: true });
    const person = audit((dir) =>
      edit(dir, "lib/observability/posthog-server.ts", (source) =>
        source.replace("$process_person_profile: false", "$process_person_profile: true"),
      ),
    );
    expect(person.ok).toBe(false);
  });

  it("fails when WebMCP code calls an ad pixel directly", () => {
    const result = audit((dir) =>
      edit(dir, "lib/webmcp/usage.ts", (source) => `${source}\nexport const leak = () => window.fbq?.("track", "Lead");\n`),
    );
    expect(result.ok).toBe(false);
    expect(result.output).toContain("lib/webmcp/usage.ts");
  });
});
