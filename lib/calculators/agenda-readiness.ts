export type AgendaReadinessScore = 0 | 1 | 2;

export type AgendaReadinessOption = {
  label: string;
  score: AgendaReadinessScore;
};

export type AgendaReadinessQuestion = {
  id: string;
  question: string;
  context: string;
  weakPoint: string;
  options: readonly AgendaReadinessOption[];
};

export const AGENDA_READINESS_DIAGNOSTIC_ID = "agenda_readiness_v1";

export const AGENDA_READINESS_QUESTIONS = [
  {
    id: "whatsapp_owner",
    question: "Quem responde o WhatsApp enquanto a equipe está atendendo?",
    context: "Pense principalmente nos horários de maior movimento.",
    weakPoint:
      "Quem responde o WhatsApp: hoje a recepção divide a mão com o corte.",
    options: [
      { label: "Ninguém. A gente vê quando sobra tempo.", score: 0 },
      { label: "Um barbeiro responde entre um corte e outro.", score: 1 },
      { label: "Há uma pessoa ou rotina dedicada à recepção.", score: 2 },
    ],
  },
  {
    id: "availability_discovery",
    question: "Como o cliente descobre quais horários estão livres?",
    context: "Considere o caminho mais comum, não a exceção.",
    weakPoint:
      "Como o cliente descobre horário: ele precisa de você para saber o que está livre.",
    options: [
      { label: "Pergunta no WhatsApp e alguém confere.", score: 0 },
      { label: "Parte consulta sozinha; parte ainda pergunta.", score: 1 },
      { label: "Consulta a disponibilidade sem depender da equipe.", score: 2 },
    ],
  },
  {
    id: "no_show_rule",
    question: "O que acontece antes de um horário que pode virar falta?",
    context: "Escolha o processo que realmente acontece hoje.",
    weakPoint:
      "O que acontece na falta: sem confirmação, o horário vazio não volta para a grade.",
    options: [
      { label: "Nada. Só descobrimos quando o cliente não vem.", score: 0 },
      { label: "A equipe confirma quando lembra ou quando dá tempo.", score: 1 },
      { label: "Existe confirmação com antecedência e regra definida.", score: 2 },
    ],
  },
  {
    id: "schedule_rules",
    question: "Onde ficam folgas, almoço e bloqueios de cada barbeiro?",
    context: "Vale o lugar usado para decidir se um horário pode ser oferecido.",
    weakPoint:
      "Onde ficam folgas e bloqueios: informação que não está no sistema não pode virar regra.",
    options: [
      { label: "Na cabeça da equipe.", score: 0 },
      { label: "Em papel, planilha ou grupo de mensagens.", score: 1 },
      { label: "Na agenda, separados por profissional.", score: 2 },
    ],
  },
  {
    id: "fit_in_rule",
    question: "Quem decide um encaixe de última hora?",
    context: "Pense no que acontece quando o sábado já está cheio.",
    weakPoint: "Quem decide o encaixe: cada exceção volta para a sua mesa.",
    options: [
      { label: "Quem vê a mensagem primeiro.", score: 0 },
      { label: "O dono ou gerente precisa aprovar.", score: 1 },
      { label: "A equipe segue uma regra combinada.", score: 2 },
    ],
  },
] as const satisfies readonly AgendaReadinessQuestion[];

export const AGENDA_READINESS_BANDS = [
  {
    max: 40,
    name: "Agenda reativa",
    diagnosis:
      "Quase todo horário é decidido na hora, por conversa. Funciona no movimento baixo e desmonta quando a agenda aperta.",
    action:
      "Escreva a regra de uma coisa só: o prazo de confirmação. Não tente reorganizar tudo na mesma semana.",
  },
  {
    max: 70,
    name: "Organizada por pessoas",
    diagnosis:
      "Existe processo, mas ele mora na cabeça de alguém. Se essa pessoa falta, a agenda volta a depender de improviso.",
    action:
      "Tire a regra da cabeça e coloque no sistema: horário, almoço e folga por barbeiro.",
  },
  {
    max: 100,
    name: "Agenda com regra",
    diagnosis:
      "A regra está escrita e vale sem você. É a condição para automatizar a recepção sem perder controle.",
    action:
      "Automatize a pergunta mais repetida e meça uma semana comparável antes de ampliar.",
  },
] as const;

export type AgendaReadinessBand = (typeof AGENDA_READINESS_BANDS)[number];

export const AGENDA_READINESS_TOP_SCORE_NEXT_STEP =
  "Próximo ponto de evolução: automatizar uma rotina por vez e acompanhar o resultado.";

export type AgendaReadinessResult = {
  score: number;
  band: AgendaReadinessBand;
  weakestQuestionId: string;
  /** Label for the weak point card: the weakest answer, or the next step at 100. */
  weakPointLabel: "Ponto mais frágil" | "Próxima evolução";
  weakPoint: string;
};

/**
 * Scores the answers in question order. Each answer is the chosen option's
 * score (0, 1 or 2); `null` means not answered yet and counts as 0 points.
 * Ties for the weakest answer resolve to the first question.
 */
export function scoreAgendaReadiness(
  answers: ReadonlyArray<AgendaReadinessScore | null>,
): AgendaReadinessResult {
  const questions = AGENDA_READINESS_QUESTIONS;
  const earned = answers.reduce<number>((total, answer) => total + (answer ?? 0), 0);
  const score = Math.round((earned / (questions.length * 2)) * 100);
  const band =
    AGENDA_READINESS_BANDS.find((item) => score <= item.max) ?? AGENDA_READINESS_BANDS[2];
  const normalized: number[] = questions.map((_, index) => answers[index] ?? 2);
  const lowest = Math.min(...normalized);
  const weakestIndex = Math.max(0, normalized.indexOf(lowest));
  const weakest = questions[weakestIndex];
  return {
    score,
    band,
    weakestQuestionId: weakest.id,
    weakPointLabel: score === 100 ? "Próxima evolução" : "Ponto mais frágil",
    weakPoint: score === 100 ? AGENDA_READINESS_TOP_SCORE_NEXT_STEP : weakest.weakPoint,
  };
}
