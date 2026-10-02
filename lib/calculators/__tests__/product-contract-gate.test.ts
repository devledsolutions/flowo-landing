import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../../..");
const files = [
  "data/flowo-product-contract.json",
  "data/pricing-data.ts",
  "components/home-pricing-section.tsx",
  "lib/calculators/plan-recommendation.ts",
];
let workdir: string | undefined;

function runGate(mutate?: (source: string) => string): { ok: boolean; output: string } {
  workdir = mkdtempSync(join(tmpdir(), "flowo-contract-"));
  for (const file of files) cpSync(join(root, file), join(workdir, file), { recursive: true });
  if (mutate) {
    const target = join(workdir, "lib/calculators/plan-recommendation.ts");
    writeFileSync(target, mutate(readFileSync(target, "utf8")));
  }
  try {
    const output = execFileSync(process.execPath, [join(root, "scripts/check-product-contract.mjs")], {
      cwd: workdir,
      encoding: "utf8",
      stdio: "pipe",
    });
    return { ok: true, output };
  } catch (error) {
    const failure = error as { stderr?: string };
    return { ok: false, output: failure.stderr ?? "" };
  }
}

afterEach(() => {
  if (workdir) rmSync(workdir, { recursive: true, force: true });
  workdir = undefined;
});

describe("product contract gate for the plan recommendation", () => {
  it("passes with the current limits", () => {
    expect(runGate().ok).toBe(true);
  });

  it("fails when the Equipe limit drifts from the contract", () => {
    const result = runGate((source) =>
      source.replace("export const EQUIPE_MAX_PROFESSIONALS = 5;", "export const EQUIPE_MAX_PROFESSIONALS = 6;"),
    );
    expect(result.ok).toBe(false);
    expect(result.output).toContain("Equipe professional limit drifted");
  });

  it("fails when the Solo limit drifts from the contract", () => {
    const result = runGate((source) =>
      source.replace("export const SOLO_MAX_PROFESSIONALS = 1;", "export const SOLO_MAX_PROFESSIONALS = 2;"),
    );
    expect(result.ok).toBe(false);
    expect(result.output).toContain("Solo professional limit drifted");
  });
});
