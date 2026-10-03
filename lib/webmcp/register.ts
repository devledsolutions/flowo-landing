import { z } from "zod";
import { ToolError } from "./errors";
import type { ErroCodigo, ToolName, ToolOutcome } from "./tool-names";

export { ToolError } from "./errors";

export type ToolOk = {
  ok: true;
  ferramenta: string;
  dados: unknown;
  fonte?: string;
  aviso?: string;
};

export type ToolErr = {
  ok: false;
  ferramenta: string;
  erro: {
    codigo: ErroCodigo;
    mensagem: string;
    como_resolver: string;
    campos?: { campo: string; problema: string }[];
    alternativa?: string;
  };
};

export type ToolResult = ToolOk | ToolErr;

export type ToolRunOutput = { dados: unknown; fonte?: string; aviso?: string };

/** Per-call context. `signal` aborts when the browser or the agent cancels the call. */
export type ToolRunContext = { signal: AbortSignal };

export type WebMcpTool<S extends z.ZodObject = z.ZodObject> = {
  name: ToolName;
  title: string;
  description: string;
  input: S;
  annotations: ModelContextToolAnnotations;
  run: (input: z.output<S>, context: ToolRunContext) => Promise<ToolRunOutput> | ToolRunOutput;
};

export function defineTool<S extends z.ZodObject>(tool: WebMcpTool<S>): WebMcpTool {
  return tool as unknown as WebMcpTool;
}

export type ToolCallReport = { tool: ToolName; outcome: ToolOutcome; durationMs: number };
export type ToolCallReporter = (report: ToolCallReport) => void;

const ptLocaleError = z.locales.pt().localeError;

/** pt-BR messages; a missing field reads as "Campo obrigatório." instead of "recebido undefined". */
const ptErrorMap: z.core.$ZodErrorMap = (issue) => {
  if (issue.code === "invalid_type" && issue.input === undefined) return "Campo obrigatório.";
  return ptLocaleError(issue);
};

/** JSON Schema sent to the agent. Chrome does not validate against it; `execute` does. */
export function toolInputSchema(input: z.ZodObject): Record<string, unknown> {
  const schema = {
    ...(z.toJSONSchema(input, { io: "input", unrepresentable: "any" }) as Record<string, unknown>),
  };
  delete schema.$schema;
  return schema;
}

function failure(
  ferramenta: string,
  codigo: ErroCodigo,
  mensagem: string,
  comoResolver: string,
  extra: Pick<ToolErr["erro"], "campos" | "alternativa"> = {},
): ToolErr {
  return {
    ok: false,
    ferramenta,
    erro: { codigo, mensagem, como_resolver: comoResolver, ...extra },
  };
}

function invalidInput(ferramenta: string, campos: { campo: string; problema: string }[]): ToolErr {
  return failure(
    ferramenta,
    "entrada_invalida",
    "Alguns dados não estão no formato esperado.",
    "Corrija os campos indicados e chame a ferramenta de novo.",
    { campos },
  );
}

function readRawInput(raw: unknown): { ok: true; value: unknown } | { ok: false } {
  if (raw === undefined || raw === null || raw === "") return { ok: true, value: {} };
  if (typeof raw !== "string") return { ok: true, value: raw };
  try {
    return { ok: true, value: JSON.parse(raw) };
  } catch {
    return { ok: false };
  }
}

/**
 * Validates, runs and reports one call. Always resolves to a JSON string with
 * the same pt-BR shape, and reports exactly once. Tool inputs never reach the
 * report.
 */
export function createExecute(
  tool: WebMcpTool,
  report: ToolCallReporter,
  now: () => number = () => Date.now(),
): (raw: unknown, client?: { signal?: AbortSignal }) => Promise<string> {
  return async (raw: unknown, client?: { signal?: AbortSignal }) => {
    const started = now();
    const signal = client?.signal ?? new AbortController().signal;
    let result: ToolResult;
    try {
      const input = readRawInput(raw);
      if (!input.ok) {
        result = invalidInput(tool.name, [
          { campo: "(entrada)", problema: "A entrada precisa ser um objeto JSON." },
        ]);
      } else {
        const parsed = tool.input.safeParse(input.value, { error: ptErrorMap });
        if (!parsed.success) {
          result = invalidInput(
            tool.name,
            parsed.error.issues.map((issue) => ({
              campo: issue.path.length ? issue.path.map(String).join(".") : "(entrada)",
              problema: issue.message,
            })),
          );
        } else {
          const output = await tool.run(parsed.data, { signal });
          result = {
            ok: true,
            ferramenta: tool.name,
            dados: output.dados,
            ...(output.fonte ? { fonte: output.fonte } : {}),
            ...(output.aviso ? { aviso: output.aviso } : {}),
          };
        }
      }
    } catch (error) {
      result =
        error instanceof ToolError
          ? failure(tool.name, error.codigo, error.message, error.comoResolver, {
              ...(error.alternativa ? { alternativa: error.alternativa } : {}),
            })
          : failure(
              tool.name,
              "erro_interno",
              "Algo deu errado ao executar a ferramenta.",
              "Tente de novo em alguns segundos.",
            );
    }
    try {
      report({
        tool: tool.name,
        outcome: result.ok ? "ok" : result.erro.codigo,
        durationMs: Math.max(0, Math.round(now() - started)),
      });
    } catch {
      // Counting a call must never change its result.
    }
    return JSON.stringify(result);
  };
}

/**
 * Registers each tool on its own, so one failure (for example a duplicate name
 * after a hot reload) does not stop the rest. Returns how many were registered.
 */
export async function registerTools(
  modelContext: Pick<ModelContext, "registerTool">,
  tools: readonly WebMcpTool[],
  report: ToolCallReporter,
  signal: AbortSignal,
): Promise<number> {
  let registered = 0;
  for (const tool of tools) {
    if (signal.aborted) break;
    try {
      await modelContext.registerTool(
        {
          name: tool.name,
          title: tool.title,
          description: tool.description,
          inputSchema: toolInputSchema(tool.input),
          annotations: tool.annotations,
          execute: createExecute(tool, report),
        },
        { signal },
      );
      registered += 1;
    } catch {
      // Skip this tool and keep registering the others.
    }
  }
  return registered;
}
