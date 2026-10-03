/**
 * Port of the app's `recommendTier` (packages/backend/convex/modules/featureGates.ts).
 * The two limits below are checked against data/flowo-product-contract.json by
 * scripts/check-product-contract.mjs at build time.
 */
export const SOLO_MAX_PROFESSIONALS = 1;
export const EQUIPE_MAX_PROFESSIONALS = 5;
export const EQUIPE_MAX_UNITS = 1;

export const PROFESSIONALS_LIMITS = { min: 1, max: 500 } as const;
export const UNITS_LIMITS = { min: 1, max: 100 } as const;

export type RecommendedPlan = "solo" | "equipe" | "empresarial";
export type PlanPriority = "agenda" | "equipe" | "financeiro";

export const PLAN_NAMES: Record<RecommendedPlan, string> = {
  solo: "Solo",
  equipe: "Equipe",
  empresarial: "Empresarial",
};

export const PLAN_SUMMARIES: Record<RecommendedPlan, string> = {
  solo: "Para quem atende sozinho e quer parar de largar o celular para responder horário.",
  equipe: "Para uma equipe de até cinco profissionais, com agenda e operação no mesmo lugar.",
  empresarial: "Para operações com mais de cinco profissionais ou mais de uma unidade.",
};

export const PLAN_PRIORITIES: Record<PlanPriority, { option: string; label: string }> = {
  agenda: { option: "Responder e marcar horários", label: "Agenda e WhatsApp" },
  equipe: { option: "Organizar equipe e comissões", label: "Equipe" },
  financeiro: { option: "Acompanhar caixa e recebimentos", label: "Financeiro" },
};

export const PLAN_RECOMMENDATION_NOTE =
  "A recomendação usa profissionais e unidades, a mesma regra do cadastro. A prioridade só indica por onde começar a configuração.";

function wholeAtLeastOne(value: number): number {
  return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1;
}

export function recommendPlan(professionals: number, units: number): RecommendedPlan {
  const pros = wholeAtLeastOne(professionals);
  const branches = wholeAtLeastOne(units);
  if (branches > EQUIPE_MAX_UNITS || pros > EQUIPE_MAX_PROFESSIONALS) return "empresarial";
  if (pros > SOLO_MAX_PROFESSIONALS) return "equipe";
  return "solo";
}

/** One short sentence explaining why the plan fits the reported size. */
export function planRecommendationReason(professionals: number, units: number): string {
  const pros = wholeAtLeastOne(professionals);
  const branches = wholeAtLeastOne(units);
  const plan = recommendPlan(pros, branches);
  const team = `${pros} ${pros === 1 ? "profissional" : "profissionais"}`;
  const place = `${branches} ${branches === 1 ? "unidade" : "unidades"}`;
  if (plan === "empresarial") {
    return branches > EQUIPE_MAX_UNITS
      ? `Com ${place}, o Empresarial é o plano que reúne todas as unidades.`
      : `Com ${team}, a equipe passa do limite de cinco profissionais do Equipe.`;
  }
  if (plan === "equipe") {
    return `Com ${team} em 1 unidade, o Equipe comporta a equipe toda.`;
  }
  return "Com 1 profissional em 1 unidade, o Solo atende a rotina.";
}
