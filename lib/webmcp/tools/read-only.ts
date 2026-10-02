import { z } from "zod";
import { buildSignupUrl } from "@/components/cta-links";
import {
  COMPARISON_LAST_VERIFIED,
  COMPETITOR_COMPARISONS,
} from "@/data/competitor-comparisons";
import { faqItems } from "@/data/faq-items";
import { featureComparison } from "@/data/feature-comparison";
import { GUIDES } from "@/data/guides";
import {
  ANNUAL_DISCOUNT_LABEL,
  CURRENCY,
  formatBRL,
  hasPublishedPrice,
  PLANS,
  PRICE_VALID_UNTIL,
  type Plan,
  type PlanId,
} from "@/data/pricing-data";
import { RESOURCE_MATERIALS } from "@/data/resource-materials";
import { SITE_URL } from "@/lib/seo";
import { defineTool } from "../register";
import { rankByQuery } from "../search";

const AGENT_UTM = { source: "assistente_ia", medium: "webmcp", campaign: "webmcp" } as const;

export function agentSignupUrl(plan: "solo" | "equipe", cycle: "monthly" | "yearly" | undefined, content: string) {
  return buildSignupUrl({ plan, cycle, ...AGENT_UTM, content });
}

const CYCLE_FROM_PT = { mensal: "monthly", anual: "yearly" } as const;

export function planPriceText(plan: Plan, ciclo?: "mensal" | "anual"): string {
  if (!hasPublishedPrice(plan)) return plan.consultationLabel;
  if (ciclo === "anual") {
    return `${formatBRL(plan.annualPerMonth)}/mês no plano anual (${formatBRL(plan.annualTotal)} por ano)`;
  }
  if (ciclo === "mensal") return `${formatBRL(plan.monthly)}/mês`;
  return `${formatBRL(plan.monthly)}/mês ou ${formatBRL(plan.annualTotal)} por ano no plano anual`;
}

function comparisonFor(planId: PlanId) {
  return Object.entries(featureComparison).flatMap(([categoria, items]) =>
    items.map((item) => {
      const value = item[planId];
      return {
        categoria,
        recurso: item.name,
        valor: typeof value === "boolean" ? (value ? "Sim" : "Não") : value,
        ...(item.note ? { observacao: item.note } : {}),
      };
    }),
  );
}

const TRIAL_QUESTION = "Tem período de teste grátis?";

export const verPlanos = defineTool({
  name: "ver_planos",
  title: "Ver planos e preços da Flowo",
  description:
    "Mostra os planos da Flowo (Solo, Equipe e Empresarial), com preços em reais para contratação pelo site, o que cada plano inclui e até quando os preços valem. Use para preço, limite de profissionais ou diferença entre planos. O Empresarial não tem preço público: ofereça falar_com_vendas.",
  input: z.object({
    plano: z
      .enum(["solo", "equipe", "empresarial"], { error: "Use solo, equipe ou empresarial." })
      .optional()
      .describe("Filtra um plano. Sem este campo, mostra os três."),
    ciclo: z
      .enum(["mensal", "anual"], { error: "Use mensal ou anual." })
      .optional()
      .describe("Mostra o preço e o link de contratação para este ciclo de cobrança."),
  }),
  annotations: { readOnlyHint: true },
  run: ({ plano, ciclo }) => {
    const cycle = ciclo ? CYCLE_FROM_PT[ciclo] : undefined;
    const planos = PLANS.filter((plan) => !plano || plan.id === plano).map((plan) => ({
      id: plan.id,
      nome: plan.name,
      para_quem: plan.description,
      preco: hasPublishedPrice(plan)
        ? { mensal: plan.monthly, anual_total: plan.annualTotal, anual_por_mes: plan.annualPerMonth }
        : null,
      preco_texto: planPriceText(plan, ciclo),
      contratacao: hasPublishedPrice(plan) ? "pelo site" : "com a equipe Flowo",
      inclui: [...plan.features],
      comparativo: comparisonFor(plan.id),
      link_para_contratar: hasPublishedPrice(plan)
        ? agentSignupUrl(plan.id, cycle, `ver_planos_${plan.id}`)
        : null,
    }));
    const trial = faqItems.find((item) => item.question === TRIAL_QUESTION)?.answer;
    const today = new Date().toISOString().slice(0, 10);
    return {
      dados: {
        moeda: CURRENCY,
        precos_validos_ate: PRICE_VALID_UNTIL,
        desconto_anual: ANNUAL_DISCOUNT_LABEL,
        planos,
        condicoes: [
          ...(trial ? [trial] : []),
          "Sem fidelidade. Cancele quando quiser.",
          "Pagamentos integrados são opcionais.",
          "Os preços valem para contratação pelo site.",
        ],
      },
      fonte: `${SITE_URL}/precos`,
      ...(today > PRICE_VALID_UNTIL
        ? { aviso: `Estes preços valiam até ${PRICE_VALID_UNTIL}. Confirme o valor atual em ${SITE_URL}/precos.` }
        : {}),
    };
  },
});

export const buscarPerguntasFrequentes = defineTool({
  name: "buscar_perguntas_frequentes",
  title: "Buscar nas perguntas frequentes da Flowo",
  description:
    "Busca nas perguntas frequentes oficiais da Flowo (WhatsApp, planos, pagamento, teste, calendário, equipe, suporte). Aceita texto sem acento. Use a resposta como está, sem completar com suposições.",
  input: z.object({
    busca: z
      .string({ error: "Escreva o que a pessoa quer saber." })
      .trim()
      .min(2, { error: "Use pelo menos 2 letras." })
      .max(200, { error: "Use no máximo 200 caracteres." })
      .describe("Pergunta ou palavras-chave, por exemplo: tem fidelidade?"),
    limite: z
      .number({ error: "Use um número de 1 a 5." })
      .int({ error: "Use um número inteiro." })
      .min(1, { error: "Use pelo menos 1." })
      .max(5, { error: "Use no máximo 5." })
      .default(3)
      .describe("Quantas respostas devolver, de 1 a 5."),
  }),
  annotations: { readOnlyHint: true },
  run: ({ busca, limite }) => {
    const resultados = rankByQuery(faqItems, busca, (item) => [
      { text: item.question, weight: 3 },
      { text: item.category ?? "", weight: 2 },
      { text: item.answer, weight: 1 },
    ])
      .slice(0, limite)
      .map((item) => ({ pergunta: item.question, resposta: item.answer, categoria: item.category ?? null }));
    return {
      dados: { resultados },
      fonte: `${SITE_URL}/precos`,
      ...(resultados.length === 0
        ? { aviso: "Sem resposta oficial. Ofereça falar_com_vendas." }
        : {}),
    };
  },
});

const COMPETITOR_IDS = COMPETITOR_COMPARISONS.map((comparison) => comparison.id) as [
  (typeof COMPETITOR_COMPARISONS)[number]["id"],
  ...(typeof COMPETITOR_COMPARISONS)[number]["id"][],
];

export const compararConcorrente = defineTool({
  name: "comparar_concorrente",
  title: "Comparar a Flowo com outro sistema",
  description:
    "Compara a Flowo com outro sistema para barbearias usando informações públicas conferidas pela Flowo, com fontes e data da verificação. Concorrentes: AppBarber, Trinks, BestBarbers, Barbeiro App, Avec, Graces, Barva e Opero. Ao citar preço do concorrente, cite a fonte e a data.",
  input: z.object({
    concorrente: z
      .enum(COMPETITOR_IDS, { error: `Use um destes: ${COMPETITOR_IDS.join(", ")}.` })
      .describe(`Identificador do concorrente: ${COMPETITOR_IDS.join(", ")}.`),
  }),
  annotations: { readOnlyHint: true },
  run: ({ concorrente }) => {
    const comparison = COMPETITOR_COMPARISONS.find((item) => item.id === concorrente);
    if (!comparison) throw new Error("competitor missing from data");
    return {
      dados: {
        concorrente: comparison.name,
        resumo: comparison.summary,
        quando_flowo_faz_sentido: comparison.flowoFit,
        quando_o_concorrente_faz_sentido: comparison.competitorFit,
        veredito: comparison.honestVerdict,
        precos: comparison.priceSummary,
        diferencas: [...comparison.keyDifferences],
        criterios: comparison.rows.map((row) => ({
          criterio: row.criterion,
          flowo: row.flowo,
          concorrente: row.competitor,
        })),
        fontes: comparison.sources.map((source) => ({
          titulo: source.label,
          url: source.url,
          escopo: source.scope,
          verificado_em: source.checkedAt,
        })),
        ultima_verificacao: COMPARISON_LAST_VERIFIED,
        pagina: `${SITE_URL}${comparison.path}`,
      },
      fonte: `${SITE_URL}${comparison.path}`,
    };
  },
});

export const buscarMateriais = defineTool({
  name: "buscar_materiais",
  title: "Buscar materiais gratuitos e guias",
  description:
    "Busca materiais gratuitos (PDF e planilhas) e guias da Flowo sobre agenda, WhatsApp, equipe, comissões, caixa, clientes e marketing. Guias abrem direto no site. Para receber um material por e-mail, use receber_material com o material_id.",
  input: z.object({
    tema: z
      .string({ error: "Escreva um tema em texto." })
      .trim()
      .max(120, { error: "Use no máximo 120 caracteres." })
      .optional()
      .describe("Assunto, por exemplo: comissão, faltas, WhatsApp. Sem tema, mostra os destaques."),
    tipo: z
      .enum(["material", "guia", "todos"], { error: "Use material, guia ou todos." })
      .default("todos")
      .describe("material (PDF ou planilha), guia (página do site) ou todos."),
    formato: z
      .enum(["PDF", "XLSX"], { error: "Use PDF ou XLSX." })
      .optional()
      .describe("Filtra materiais por formato. Guias não têm formato."),
    limite: z
      .number({ error: "Use um número de 1 a 10." })
      .int({ error: "Use um número inteiro." })
      .min(1, { error: "Use pelo menos 1." })
      .max(10, { error: "Use no máximo 10." })
      .default(5)
      .describe("Quantos itens devolver em cada lista, de 1 a 10."),
  }),
  annotations: { readOnlyHint: true },
  run: ({ tema, tipo, formato, limite }) => {
    const query = tema?.trim() ?? "";
    const materialPool = RESOURCE_MATERIALS.filter((material) => !formato || material.format === formato);
    const materials = query
      ? rankByQuery(materialPool, query, (material) => [
          { text: material.title, weight: 3 },
          { text: `${material.category} ${material.tags.join(" ")} ${material.problem}`, weight: 2 },
          { text: `${material.description} ${material.outcome}`, weight: 1 },
        ])
      : materialPool.filter((material) => material.featured);
    const guides = formato
      ? []
      : query
        ? rankByQuery(GUIDES, query, (guide) => [
            { text: guide.title, weight: 3 },
            { text: `${guide.category} ${guide.topics.join(" ")}`, weight: 2 },
            { text: guide.description, weight: 1 },
          ])
        : GUIDES;
    return {
      dados: {
        materiais:
          tipo === "guia"
            ? []
            : materials.slice(0, limite).map((material) => ({
                material_id: material.id,
                titulo: material.title,
                descricao: material.description,
                formato: material.format,
                para_resolver: material.problem,
                tempo: material.applicationTime,
                resultado: material.outcome,
                pagina: `${SITE_URL}/recursos/materiais#${material.id}`,
              })),
        guias:
          tipo === "material"
            ? []
            : guides.slice(0, limite).map((guide) => ({
                titulo: guide.title,
                descricao: guide.description,
                leitura: guide.readTime,
                categoria: guide.category,
                url: `${SITE_URL}${guide.path}`,
              })),
      },
      fonte: `${SITE_URL}/recursos/materiais`,
    };
  },
});

export const READ_ONLY_TOOLS = [verPlanos, buscarPerguntasFrequentes, compararConcorrente, buscarMateriais];
