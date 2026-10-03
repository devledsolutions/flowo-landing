import type { WebMcpTool } from "../register";
import { CALCULATOR_TOOLS } from "./calculadoras";
import { createFalarComVendas, createReceberMaterial, type LeadToolDeps } from "./leads";
import { READ_ONLY_TOOLS } from "./read-only";

export { registerTools } from "../register";
export type { LeadToolDeps } from "./leads";

/**
 * Every WebMCP tool on the site. Loaded only when the browser exposes
 * `document.modelContext`, so normal visitors never download this chunk.
 * Dependencies are read through a getter at call time, never captured.
 */
export function buildTools(getDeps: () => LeadToolDeps): WebMcpTool[] {
  return [
    ...READ_ONLY_TOOLS,
    ...CALCULATOR_TOOLS,
    createFalarComVendas(getDeps),
    createReceberMaterial(getDeps),
  ];
}
