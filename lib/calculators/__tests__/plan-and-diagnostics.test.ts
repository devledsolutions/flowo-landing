import { describe, expect, it } from "vitest";
import { scoreAgendaReadiness, type AgendaReadinessScore } from "../agenda-readiness";
import { MANAGEMENT_QUESTIONS, scoreManagementDiagnostic } from "../management-diagnostic";
import { planRecommendationReason, recommendPlan } from "../plan-recommendation";

describe("recommendPlan (same rule as the app's recommendTier)", () => {
  it.each([
    [1, 1, "solo"],
    [2, 1, "equipe"],
    [5, 1, "equipe"],
    [6, 1, "empresarial"],
    [1, 2, "empresarial"],
    [3, 2, "empresarial"],
    [0, 1, "solo"],
    [Number.NaN, Number.NaN, "solo"],
    [5.9, 1, "equipe"],
    [6.1, 1, "empresarial"],
  ] as const)("%s professionals, %s units -> %s", (pros, units, plan) => {
    expect(recommendPlan(pros, units)).toBe(plan);
  });

  it("explains why", () => {
    expect(planRecommendationReason(3, 2)).toContain("2 unidades");
    expect(planRecommendationReason(8, 1)).toContain("8 profissionais");
    expect(planRecommendationReason(3, 1)).toContain("Equipe");
    expect(planRecommendationReason(1, 1)).toContain("Solo");
  });
});

const allAnswers = (value: boolean) =>
  Object.fromEntries(MANAGEMENT_QUESTIONS.map((question) => [question.id, value]));

describe("scoreManagementDiagnostic", () => {
  it("does not count a healthy 'Sim' as a problem", () => {
    const result = scoreManagementDiagnostic(allAnswers(true));
    expect(result.attentionCount).toBe(3);
    expect(result.findings).toEqual([
      "O WhatsApp ainda depende de uma pessoa",
      "A agenda precisa de regras por profissional",
      "O fechamento pede uma fonte única",
    ]);
  });

  it("counts the two positive questions when the answer is 'Ainda não'", () => {
    const result = scoreManagementDiagnostic(allAnswers(false));
    expect(result.attentionCount).toBe(2);
    expect(result.findings).toEqual([
      "O retorno ainda depende da memória",
      "A passagem para a equipe precisa ficar explícita",
    ]);
  });

  it("finds nothing when only the healthy routines are present", () => {
    const result = scoreManagementDiagnostic({
      whatsapp: false,
      agenda: false,
      finance: false,
      return: true,
      numbers: true,
    });
    expect(result.attentionCount).toBe(0);
    expect(result.result).toBe("Manter o que funciona e medir uma semana");
    expect(result.complete).toBe(true);
  });

  it("is incomplete until every question has an answer", () => {
    expect(scoreManagementDiagnostic({ whatsapp: true }).complete).toBe(false);
  });
});

describe("scoreAgendaReadiness", () => {
  const all = (score: AgendaReadinessScore) => [score, score, score, score, score];

  it("gives 100 for the best answers and 0 for the worst", () => {
    const best = scoreAgendaReadiness(all(2));
    expect(best.score).toBe(100);
    expect(best.band.name).toBe("Agenda com regra");
    expect(best.weakPointLabel).toBe("Próxima evolução");
    expect(best.weakPoint).toContain("automatizar uma rotina por vez");

    const worst = scoreAgendaReadiness(all(0));
    expect(worst.score).toBe(0);
    expect(worst.band.name).toBe("Agenda reativa");
  });

  it("scores the middle band and picks the first lowest answer", () => {
    const result = scoreAgendaReadiness([2, 1, 1, 1, 1]);
    expect(result.score).toBe(60);
    expect(result.band.name).toBe("Organizada por pessoas");
    expect(result.weakestQuestionId).toBe("availability_discovery");
    expect(result.weakPointLabel).toBe("Ponto mais frágil");
  });
});
