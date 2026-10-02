import { describe, expect, it } from "vitest";
import { COMPETITOR_COMPARISONS } from "@/data/competitor-comparisons";
import {
  buscarMateriais,
  buscarPerguntasFrequentes,
  compararConcorrente,
  verPlanos,
} from "../tools/read-only";
import { call, okData } from "./helpers";

const INTERNAL_PRICES = /\b1\.?578|157800|15780|\b449\b|\b929\b|44900|92900/;

type Planos = {
  precos_validos_ate: string;
  planos: Array<{
    id: string;
    preco: { mensal: number; anual_total: number; anual_por_mes: number } | null;
    preco_texto: string;
    link_para_contratar: string | null;
    comparativo: Array<{ valor: string }>;
  }>;
  condicoes: string[];
};

describe("ver_planos", () => {
  it("returns the public prices and no internal or store prices", async () => {
    const result = await call(verPlanos, {});
    const data = okData<Planos>(result);
    expect(data.precos_validos_ate).toBe("2026-12-31");
    const prices = data.planos.flatMap((plan) =>
      plan.preco ? [plan.preco.mensal, plan.preco.anual_total, plan.preco.anual_por_mes] : [],
    );
    expect(prices.sort((a, b) => a - b)).toEqual([316, 379, 658, 789, 3790, 7890]);
    const empresarial = data.planos.find((plan) => plan.id === "empresarial");
    expect(empresarial?.preco).toBeNull();
    expect(empresarial?.preco_texto).toBe("Sob consulta");
    expect(empresarial?.link_para_contratar).toBeNull();
    expect(JSON.stringify(result)).not.toMatch(INTERNAL_PRICES);
    expect(data.condicoes.join(" ")).toContain("14 dias");
    expect(data.planos[0].comparativo.some((row) => row.valor === "Sim" || row.valor === "Não")).toBe(true);
  });

  it("builds the signup link for the chosen cycle with the agent UTM", async () => {
    const data = okData<Planos>(await call(verPlanos, { plano: "solo", ciclo: "anual" }));
    expect(data.planos).toHaveLength(1);
    const link = new URL(data.planos[0].link_para_contratar ?? "");
    expect(link.search).toContain("plan=solo&cycle=yearly");
    expect(link.searchParams.get("utm_source")).toBe("assistente_ia");
    expect(link.searchParams.get("utm_medium")).toBe("webmcp");
    expect(data.planos[0].preco_texto.replace(/\u00a0/g, " ")).toBe(
      "R$ 316/mês no plano anual (R$ 3.790 por ano)",
    );
  });

  it("rejects an unknown cycle", async () => {
    const result = await call(verPlanos, { ciclo: "semanal" });
    expect(!result.ok && result.erro.codigo).toBe("entrada_invalida");
  });
});

type Faq = { resultados: Array<{ pergunta: string; resposta: string }> };

describe("buscar_perguntas_frequentes", () => {
  it("finds the price question first", async () => {
    const data = okData<Faq>(await call(buscarPerguntasFrequentes, { busca: "quanto custa" }));
    expect(data.resultados[0].pergunta).toBe("Quanto custa o Flowo?");
  });

  it("finds it through the price synonym", async () => {
    const data = okData<Faq>(await call(buscarPerguntasFrequentes, { busca: "preço" }));
    expect(data.resultados[0].pergunta).toBe("Quanto custa o Flowo?");
  });

  it("matches accents and word forms", async () => {
    const data = okData<Faq>(await call(buscarPerguntasFrequentes, { busca: "remarcacao", limite: 5 }));
    expect(data.resultados.length).toBeGreaterThan(0);
    expect(data.resultados.every((item) => /remarca/i.test(`${item.pergunta} ${item.resposta}`))).toBe(true);
  });

  it("finds the calendar question", async () => {
    const data = okData<Faq>(await call(buscarPerguntasFrequentes, { busca: "sincroniza google" }));
    expect(data.resultados[0].pergunta).toBe("O Flowo sincroniza com meu Google Calendar?");
  });

  it("respects the limit and warns when nothing matches", async () => {
    const limited = okData<Faq>(await call(buscarPerguntasFrequentes, { busca: "whatsapp", limite: 2 }));
    expect(limited.resultados).toHaveLength(2);
    const nothing = await call(buscarPerguntasFrequentes, { busca: "xyzzy qwerty" });
    expect(okData<Faq>(nothing).resultados).toEqual([]);
    expect(nothing.ok && nothing.aviso).toBe("Sem resposta oficial. Ofereça falar_com_vendas.");
  });
});

describe("comparar_concorrente", () => {
  it.each(COMPETITOR_COMPARISONS.map((comparison) => comparison.id))("%s has dated sources", async (id) => {
    const data = okData<{ fontes: Array<{ url: string; verificado_em: string }>; pagina: string }>(
      await call(compararConcorrente, { concorrente: id }),
    );
    expect(data.fontes.length).toBeGreaterThan(0);
    for (const source of data.fontes) {
      expect(source.url).toMatch(/^https?:\/\//);
      expect(source.verificado_em).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    expect(data.pagina).toContain("/flowo-vs-");
  });

  it("rejects an unknown competitor", async () => {
    const result = await call(compararConcorrente, { concorrente: "fresha" });
    expect(!result.ok && result.erro.codigo).toBe("entrada_invalida");
  });
});

type Materials = {
  materiais: Array<{ material_id: string; titulo: string; formato: string }>;
  guias: Array<{ url: string }>;
};

describe("buscar_materiais", () => {
  it("ranks the commission material near the top", async () => {
    const data = okData<Materials>(await call(buscarMateriais, { tema: "comissao" }));
    expect(data.materiais.slice(0, 3).map((item) => item.material_id)).toContain("comissoes-sem-planilha");
  });

  it("filters by format and never exposes download links", async () => {
    const result = await call(buscarMateriais, { tema: "caixa", formato: "XLSX" });
    const data = okData<Materials>(result);
    expect(data.materiais.length).toBeGreaterThan(0);
    expect(data.materiais.every((item) => item.formato === "XLSX")).toBe(true);
    expect(data.guias).toEqual([]);
    expect(JSON.stringify(result)).not.toContain("/downloads/");
  });

  it("returns featured items without a theme", async () => {
    const result = await call(buscarMateriais, {});
    const data = okData<Materials>(result);
    expect(data.materiais.length).toBeGreaterThan(0);
    expect(data.guias.length).toBeGreaterThan(0);
    expect(JSON.stringify(result)).not.toContain("/downloads/");
  });
});
