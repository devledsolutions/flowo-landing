import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { toolInputSchema } from "../register";
import { TOOL_NAMES } from "../tool-names";
import { buildTools } from "../tools";

const root = resolve(import.meta.dirname, "../../..");
const tools = buildTools(() => {
  throw new Error("dependencies are not needed to describe tools");
});

function sourceFiles(dir: string): string[] {
  const absolute = join(root, dir);
  return readdirSync(absolute).flatMap((name) => {
    const path = join(absolute, name);
    if (statSync(path).isDirectory()) return sourceFiles(join(dir, name));
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });
}

const VENDOR = /convex|vercel|cloudflare|turnstile|posthog|segment|ycloud|resend|clerk|asaas/i;

describe("WebMCP catalog", () => {
  it("registers the fourteen tools with unique snake_case names", () => {
    const names = tools.map((tool) => tool.name);
    expect(names).toHaveLength(14);
    expect(new Set(names).size).toBe(14);
    expect([...names].sort()).toEqual([...TOOL_NAMES].sort());
    for (const name of names) expect(name).toMatch(/^[a-z]+(_[a-z]+)*$/);
  });

  it("keeps descriptions in plain pt-BR without em dash, salão or vendor names", () => {
    for (const tool of tools) {
      const text = `${tool.title} ${tool.description} ${JSON.stringify(toolInputSchema(tool.input))}`;
      expect(text, tool.name).not.toMatch(/—|sal[aã]o/i);
      expect(text, tool.name).not.toMatch(VENDOR);
    }
  });

  it("marks only the contact tools as consequential", () => {
    const consequential = tools.filter((tool) => tool.annotations.consequentialHint).map((tool) => tool.name);
    expect(consequential.sort()).toEqual(["falar_com_vendas", "receber_material"]);
    for (const tool of tools) {
      if (!consequential.includes(tool.name)) expect(tool.annotations.readOnlyHint, tool.name).toBe(true);
    }
  });

  it("never imports the internal product contract from browser code", () => {
    for (const file of [...sourceFiles("lib/webmcp"), ...sourceFiles("components/webmcp"), ...sourceFiles("lib/calculators")]) {
      if (file.includes("__tests__")) continue;
      expect(readFileSync(file, "utf8"), file).not.toMatch(
        /(?:from\s*|import\s*\(\s*|require\s*\(\s*)["'][^"']*flowo-product-contract/,
      );
    }
  });

  it("has no declarative toolname forms", () => {
    for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
      if (file.includes("__tests__")) continue;
      expect(readFileSync(file, "utf8"), file).not.toMatch(/toolname=/i);
    }
  });
});
