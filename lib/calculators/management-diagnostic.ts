export const MANAGEMENT_QUESTIONS = [
  {
    id: "whatsapp",
    label: "Quando chega um pedido de horário durante um corte, alguém precisa parar?",
    problemWhen: true,
    finding: "O WhatsApp ainda depende de uma pessoa",
  },
  {
    id: "agenda",
    label: "Cada profissional tem horários, folgas ou intervalos diferentes?",
    problemWhen: true,
    finding: "A agenda precisa de regras por profissional",
  },
  {
    id: "finance",
    label: "Você confere comandas, recebimentos e comissões em lugares diferentes?",
    problemWhen: true,
    finding: "O fechamento pede uma fonte única",
  },
  {
    id: "return",
    label: "Existe uma rotina clara para lembrar clientes de voltar?",
    problemWhen: false,
    finding: "O retorno ainda depende da memória",
  },
  {
    id: "numbers",
    label: "A equipe sabe qual número usar e quem assume uma conversa fora do padrão?",
    problemWhen: false,
    finding: "A passagem para a equipe precisa ficar explícita",
  },
] as const;

export type ManagementQuestionId = (typeof MANAGEMENT_QUESTIONS)[number]["id"];
export type ManagementAnswers = Partial<Record<ManagementQuestionId, boolean>>;

export const MANAGEMENT_DIAGNOSTIC_VERSION = "v2";

export const MANAGEMENT_DIAGNOSTIC_NOTE =
  "O Raio-X não substitui uma análise da operação. Ele ajuda a escolher a primeira conversa da equipe.";

export type ManagementDiagnosticResult = {
  complete: boolean;
  attentionCount: number;
  findings: string[];
  result: string;
};

export function scoreManagementDiagnostic(answers: ManagementAnswers): ManagementDiagnosticResult {
  const flagged = MANAGEMENT_QUESTIONS.filter(
    (question) => answers[question.id] === question.problemWhen,
  );
  const attentionCount = flagged.length;
  return {
    complete: MANAGEMENT_QUESTIONS.every((question) => typeof answers[question.id] === "boolean"),
    attentionCount,
    findings: flagged.map((question) => question.finding),
    result:
      attentionCount >= 3
        ? "Conectar atendimento e operação"
        : attentionCount > 0
          ? "Escolher uma rotina para padronizar"
          : "Manter o que funciona e medir uma semana",
  };
}
