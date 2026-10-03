import { createExecute, type ToolResult, type WebMcpTool } from "../register";

/** Runs a tool exactly like the browser would, with the input as a JSON string. */
export async function call(tool: WebMcpTool, input: unknown): Promise<ToolResult> {
  const execute = createExecute(tool, () => undefined);
  return JSON.parse(await execute(JSON.stringify(input))) as ToolResult;
}

export function okData<T = Record<string, unknown>>(result: ToolResult): T {
  if (!result.ok) throw new Error(`expected ok, got ${JSON.stringify(result.erro)}`);
  return result.dados as T;
}
