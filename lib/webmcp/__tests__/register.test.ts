import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { getModelContext } from "../model-context";
import {
  createExecute,
  defineTool,
  registerTools,
  ToolError,
  type ToolCallReport,
  type ToolResult,
} from "../register";

const echo = defineTool({
  name: "ver_planos",
  title: "Teste",
  description: "Ferramenta de teste.",
  input: z.object({
    plano: z.enum(["solo", "equipe"], { error: "Use solo ou equipe." }),
    quantidade: z.number().int().min(1).default(1),
  }),
  annotations: { readOnlyHint: true },
  run: (input) => ({ dados: input, fonte: "https://flowo.test/precos" }),
});

function fakeModelContext(failOn?: string) {
  const registered: Array<{ tool: ModelContextToolDefinition; options?: { signal?: AbortSignal } }> = [];
  return {
    registered,
    registerTool: vi.fn((tool: ModelContextToolDefinition, options?: { signal?: AbortSignal }) => {
      if (tool.name === failOn) throw new Error("duplicate tool name");
      registered.push({ tool, options });
    }),
  };
}

async function run(tool = echo, input: unknown, reports: ToolCallReport[] = []): Promise<ToolResult> {
  const execute = createExecute(tool, (report) => reports.push(report));
  return JSON.parse(await execute(input)) as ToolResult;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getModelContext", () => {
  it("returns null when the browser has no WebMCP", () => {
    vi.stubGlobal("document", {});
    const top = {};
    vi.stubGlobal("window", Object.assign(top, { top }));
    expect(getModelContext()).toBeNull();
  });

  it("returns null inside an iframe", () => {
    vi.stubGlobal("document", { modelContext: { registerTool: () => undefined } });
    vi.stubGlobal("window", { top: {} });
    expect(getModelContext()).toBeNull();
  });

  it("returns the API on a top-level page", () => {
    const modelContext = { registerTool: () => undefined };
    vi.stubGlobal("document", { modelContext });
    const top = {};
    vi.stubGlobal("window", Object.assign(top, { top }));
    expect(getModelContext()).toBe(modelContext);
  });
});

describe("registerTools", () => {
  it("registers each tool with a JSON schema without $schema and the abort signal", async () => {
    const modelContext = fakeModelContext();
    const controller = new AbortController();
    const count = await registerTools(modelContext, [echo], () => undefined, controller.signal);

    expect(count).toBe(1);
    const [{ tool, options }] = modelContext.registered;
    expect(tool.inputSchema).not.toHaveProperty("$schema");
    expect(tool.inputSchema.type).toBe("object");
    expect(tool.annotations).toEqual({ readOnlyHint: true });
    expect(options?.signal).toBe(controller.signal);
  });

  it("keeps going when one registration throws", async () => {
    const other = { ...echo, name: "buscar_materiais" as const };
    const modelContext = fakeModelContext("ver_planos");
    const count = await registerTools(modelContext, [echo, other], () => undefined, new AbortController().signal);
    expect(count).toBe(1);
    expect(modelContext.registered.map((entry) => entry.tool.name)).toEqual(["buscar_materiais"]);
  });
});

describe("execute", () => {
  it("parses a JSON string input", async () => {
    const result = await run(echo, JSON.stringify({ plano: "solo" }));
    expect(result).toEqual({
      ok: true,
      ferramenta: "ver_planos",
      dados: { plano: "solo", quantidade: 1 },
      fonte: "https://flowo.test/precos",
    });
  });

  it("accepts an object input", async () => {
    const result = await run(echo, { plano: "equipe", quantidade: 2 });
    expect(result.ok && result.dados).toEqual({ plano: "equipe", quantidade: 2 });
  });

  it("answers invalid input with entrada_invalida and pt-BR fields", async () => {
    const result = await run(echo, JSON.stringify({ plano: "semanal", quantidade: "x" }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.erro.codigo).toBe("entrada_invalida");
    expect(result.erro.campos).toEqual([
      { campo: "plano", problema: "Use solo ou equipe." },
      { campo: "quantidade", problema: "Tipo inválido: esperado número, recebido string" },
    ]);
    expect(result.erro.como_resolver).toMatch(/Corrija/);
  });

  it("reports missing fields as required", async () => {
    const result = await run(echo, "{}");
    expect(!result.ok && result.erro.campos).toEqual([{ campo: "plano", problema: "Use solo ou equipe." }]);
  });

  it("rejects input that is not JSON", async () => {
    const result = await run(echo, "{plano: solo");
    expect(!result.ok && result.erro.codigo).toBe("entrada_invalida");
  });

  it("keeps the code of a ToolError", async () => {
    const failing = {
      ...echo,
      run: () => {
        throw new ToolError("indisponivel", "Fora do ar.", "Tente depois.", "https://wa.me/5511999999999");
      },
    };
    const result = await run(failing, { plano: "solo" });
    expect(result).toEqual({
      ok: false,
      ferramenta: "ver_planos",
      erro: {
        codigo: "indisponivel",
        mensagem: "Fora do ar.",
        como_resolver: "Tente depois.",
        alternativa: "https://wa.me/5511999999999",
      },
    });
  });

  it("hides unexpected errors behind erro_interno", async () => {
    const failing = {
      ...echo,
      run: () => {
        throw new Error("secret stack detail");
      },
    };
    const result = await run(failing, { plano: "solo" });
    expect(!result.ok && result.erro.codigo).toBe("erro_interno");
    expect(JSON.stringify(result)).not.toContain("secret stack detail");
  });

  it("reports exactly once per call, including errors, and never the input", async () => {
    const reports: ToolCallReport[] = [];
    await run(echo, { plano: "solo" }, reports);
    await run(echo, { plano: "x" }, reports);
    await run({ ...echo, run: () => { throw new Error("boom"); } }, { plano: "solo" }, reports);
    expect(reports.map((report) => report.outcome)).toEqual(["ok", "entrada_invalida", "erro_interno"]);
    expect(reports.every((report) => Object.keys(report).sort().join() === "durationMs,outcome,tool")).toBe(true);
  });

  it("returns the result even when the report throws", async () => {
    const execute = createExecute(echo, () => {
      throw new Error("beacon failed");
    });
    const result = JSON.parse(await execute({ plano: "solo" })) as ToolResult;
    expect(result.ok).toBe(true);
  });
});
