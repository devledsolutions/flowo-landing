import { z } from "zod";
import { formatBRL, getPlan } from "@/data/pricing-data";
import { SITE_URL } from "@/lib/seo";
import {
  AGENDA_OCCUPANCY_LIMITS,
  AGENDA_OCCUPANCY_NOTE,
  calculateAgendaOccupancy,
} from "@/lib/calculators/agenda-occupancy";
import {
  AGENDA_READINESS_QUESTIONS,
  scoreAgendaReadiness,
  type AgendaReadinessScore,
} from "@/lib/calculators/agenda-readiness";
import { calculateCommission, COMMISSION_NOTE } from "@/lib/calculators/commission";
import {
  MANAGEMENT_DIAGNOSTIC_NOTE,
  MANAGEMENT_QUESTIONS,
  scoreManagementDiagnostic,
  type ManagementQuestionId,
} from "@/lib/calculators/management-diagnostic";
import {
  PLAN_NAMES,
  PLAN_PRIORITIES,
  PLAN_RECOMMENDATION_NOTE,
  PLAN_SUMMARIES,
  planRecommendationReason,
  PROFESSIONALS_LIMITS,
  recommendPlan,
  UNITS_LIMITS,
} from "@/lib/calculators/plan-recommendation";
import {
  isValidIsoDate,
  planReturn,
  RETURN_PLANNER_NOTE,
} from "@/lib/calculators/return-planner";
import {
  calculateWhatsAppOpportunity,
  WHATSAPP_OPPORTUNITY_LIMITS,
  WHATSAPP_OPPORTUNITY_NOTE,
} from "@/lib/calculators/whatsapp-opportunity";
import {
  calculateWhatsAppTime,
  WHATSAPP_TIME_LIMITS,
  WHATSAPP_TIME_NOTE,
} from "@/lib/calculators/whatsapp-time";
import { defineTool } from "../register";
import { agentSignupUrl, planPriceText } from "./read-only";

function round(value: number, digits = 1): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function numberIn(min: number, max: number, { int = false } = {}) {
  const range = `Use um número de ${min.toLocaleString("pt-BR")} a ${max.toLocaleString("pt-BR")}.`;
  const base = z.number({ error: range });
  const typed = int ? base.int({ error: "Use um número inteiro." }) : base;
  return typed.min(min, { error: range }).max(max, { error: range });
}

const CALCULATOR = { readOnlyHint: true } as const;

export const calcularTempoWhatsapp = defineTool({
  name: "calcular_tempo_whatsapp",
  title: "Calcular o tempo gasto no WhatsApp",
  description:
    "Estima quantas horas por semana e por mês a barbearia gasta respondendo pedidos de horário no WhatsApp, e quantos serviços caberiam nesse tempo. Mede tempo, não faturamento.",
  input: z.object({
    mensagens_por_dia: numberIn(WHATSAPP_TIME_LIMITS.messagesPerDay.min, WHATSAPP_TIME_LIMITS.messagesPerDay.max)
      .describe("Mensagens sobre horário recebidas por dia."),
    minutos_por_conversa: numberIn(WHATSAPP_TIME_LIMITS.minutesPerMessage.min, WHATSAPP_TIME_LIMITS.minutesPerMessage.max)
      .describe("Minutos gastos em cada conversa, de 0,5 a 15."),
    dias_por_semana: numberIn(WHATSAPP_TIME_LIMITS.daysPerWeek.min, WHATSAPP_TIME_LIMITS.daysPerWeek.max, { int: true })
      .describe("Dias abertos por semana."),
    duracao_servico_min: numberIn(WHATSAPP_TIME_LIMITS.serviceMinutes.min, WHATSAPP_TIME_LIMITS.serviceMinutes.max)
      .describe("Duração média de um serviço, em minutos."),
  }),
  annotations: CALCULATOR,
  run: (input) => {
    const result = calculateWhatsAppTime({
      messagesPerDay: input.mensagens_por_dia,
      minutesPerMessage: input.minutos_por_conversa,
      daysPerWeek: input.dias_por_semana,
      serviceMinutes: input.duracao_servico_min,
    });
    return {
      dados: {
        horas_por_semana: round(result.weeklyHours),
        horas_por_mes: round(result.monthlyHours),
        servicos_equivalentes_por_mes: result.serviceSlots,
        observacao: WHATSAPP_TIME_NOTE,
      },
      fonte: `${SITE_URL}/calculadora-tempo-whatsapp-barbearia`,
    };
  },
});

export const calcularOportunidadeWhatsapp = defineTool({
  name: "calcular_oportunidade_whatsapp",
  title: "Calcular conversas de WhatsApp para revisar",
  description:
    "Estima quantas conversas por mês ficam sem resposta e um valor de referência em reais, para decidir o que revisar primeiro. É um cenário, não uma promessa de faturamento perdido.",
  input: z.object({
    perguntas_por_dia: numberIn(WHATSAPP_OPPORTUNITY_LIMITS.messagesPerDay.min, WHATSAPP_OPPORTUNITY_LIMITS.messagesPerDay.max)
      .describe("Perguntas sobre horário recebidas por dia."),
    dias_por_semana: numberIn(WHATSAPP_OPPORTUNITY_LIMITS.daysPerWeek.min, WHATSAPP_OPPORTUNITY_LIMITS.daysPerWeek.max, { int: true })
      .describe("Dias abertos por semana."),
    percentual_sem_resposta: numberIn(WHATSAPP_OPPORTUNITY_LIMITS.unansweredRate.min, WHATSAPP_OPPORTUNITY_LIMITS.unansweredRate.max)
      .describe("Percentual de conversas que ficam sem resposta, de 0 a 100."),
    ticket_medio: numberIn(WHATSAPP_OPPORTUNITY_LIMITS.averageTicket.min, WHATSAPP_OPPORTUNITY_LIMITS.averageTicket.max)
      .describe("Valor médio de um atendimento, em reais."),
  }),
  annotations: CALCULATOR,
  run: (input) => {
    const result = calculateWhatsAppOpportunity({
      messagesPerDay: input.perguntas_por_dia,
      daysPerWeek: input.dias_por_semana,
      unansweredRate: input.percentual_sem_resposta,
      averageTicket: input.ticket_medio,
    });
    return {
      dados: {
        mensagens_por_mes: Math.round(result.monthlyMessages),
        conversas_para_revisar_por_mes: Math.round(result.conversationsToReview),
        valor_de_referencia_reais: Math.round(result.scenarioValue),
        valor_de_referencia_texto: formatBRL(result.scenarioValue),
        observacao: WHATSAPP_OPPORTUNITY_NOTE,
      },
      fonte: `${SITE_URL}/calculadora-dinheiro-perdido-whatsapp-barbearia`,
    };
  },
});

export const calcularOcupacaoAgenda = defineTool({
  name: "calcular_ocupacao_agenda",
  title: "Calcular a ocupação da agenda",
  description:
    "Calcula a capacidade semanal da equipe, o percentual ocupado e quantos horários sobram, a partir de profissionais, horas, dias e duração média do serviço.",
  input: z.object({
    profissionais: numberIn(AGENDA_OCCUPANCY_LIMITS.professionals.min, AGENDA_OCCUPANCY_LIMITS.professionals.max, { int: true })
      .describe("Profissionais atendendo."),
    horas_por_dia: numberIn(AGENDA_OCCUPANCY_LIMITS.hoursPerDay.min, AGENDA_OCCUPANCY_LIMITS.hoursPerDay.max)
      .describe("Horas de atendimento por profissional por dia."),
    dias_por_semana: numberIn(AGENDA_OCCUPANCY_LIMITS.daysPerWeek.min, AGENDA_OCCUPANCY_LIMITS.daysPerWeek.max, { int: true })
      .describe("Dias abertos por semana."),
    duracao_servico_min: numberIn(AGENDA_OCCUPANCY_LIMITS.serviceMinutes.min, AGENDA_OCCUPANCY_LIMITS.serviceMinutes.max)
      .describe("Duração média de um serviço, em minutos."),
    atendimentos_marcados_semana: numberIn(AGENDA_OCCUPANCY_LIMITS.bookedPerWeek.min, AGENDA_OCCUPANCY_LIMITS.bookedPerWeek.max, { int: true })
      .describe("Atendimentos marcados na semana."),
  }),
  annotations: CALCULATOR,
  run: (input) => {
    const result = calculateAgendaOccupancy({
      professionals: input.profissionais,
      hoursPerDay: input.horas_por_dia,
      daysPerWeek: input.dias_por_semana,
      serviceMinutes: input.duracao_servico_min,
      bookedPerWeek: input.atendimentos_marcados_semana,
    });
    return {
      dados: {
        capacidade_semanal: Math.floor(result.weeklyCapacity),
        ocupacao_percentual: round(result.occupancy),
        horarios_livres_semana: Math.floor(result.openSlots),
        observacao: AGENDA_OCCUPANCY_NOTE,
      },
      fonte: `${SITE_URL}/calculadora-ocupacao-agenda-barbearia`,
    };
  },
});

const MONEY_MAX = 10_000_000;

export const calcularComissao = defineTool({
  name: "calcular_comissao",
  title: "Simular a comissão de um barbeiro",
  description:
    "Simula o acerto de comissão de um profissional: serviços e produtos com percentuais próprios, descontando estornos da base de serviços. É uma simulação, não orientação contábil ou trabalhista.",
  input: z.object({
    servicos_reais: numberIn(0, MONEY_MAX).describe("Total de serviços fechados no período, em reais."),
    comissao_servicos_pct: numberIn(0, 100).describe("Comissão sobre serviços, de 0 a 100."),
    produtos_reais: numberIn(0, MONEY_MAX).default(0).describe("Total de produtos vendidos, em reais."),
    comissao_produtos_pct: numberIn(0, 100).default(0).describe("Comissão sobre produtos, de 0 a 100."),
    descontos_reais: numberIn(0, MONEY_MAX)
      .default(0)
      .describe("Descontos ou estornos que reduzem a base de serviços, em reais."),
  }),
  annotations: CALCULATOR,
  run: (input) => {
    const result = calculateCommission({
      services: input.servicos_reais,
      serviceRate: input.comissao_servicos_pct,
      products: input.produtos_reais,
      productRate: input.comissao_produtos_pct,
      adjustments: input.descontos_reais,
    });
    return {
      dados: {
        base_servicos_reais: round(result.serviceBase, 2),
        comissao_servicos_reais: round(result.serviceCommission, 2),
        comissao_produtos_reais: round(result.productCommission, 2),
        total_reais: round(result.total, 2),
        total_texto: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(result.total),
        observacao: COMMISSION_NOTE,
      },
      fonte: `${SITE_URL}/calculadora-comissao-barbeiro`,
    };
  },
});

export const planejarRetornoCliente = defineTool({
  name: "planejar_retorno_cliente",
  title: "Planejar quando chamar um cliente de volta",
  description:
    "Calcula a data estimada de retorno de um cliente e quando revisar o contato, e sugere uma mensagem curta com opção de não receber lembretes. A mensagem é um rascunho para a barbearia revisar.",
  input: z.object({
    ultima_visita: z
      .string({ error: "Use a data no formato AAAA-MM-DD." })
      .refine(isValidIsoDate, { error: "Use uma data real no formato AAAA-MM-DD." })
      .describe("Data da última visita, no formato AAAA-MM-DD."),
    intervalo_dias: numberIn(7, 120, { int: true }).describe("Intervalo comum entre visitas, em dias."),
    antecedencia_dias: numberIn(0, 14, { int: true })
      .default(3)
      .describe("Quantos dias antes da data estimada revisar o contato."),
    servico: z
      .enum(["corte", "barba", "corte_e_barba", "outro"], { error: "Use corte, barba, corte_e_barba ou outro." })
      .default("corte")
      .describe("Serviço da última visita."),
    tom: z
      .enum(["proximo", "direto"], { error: "Use proximo ou direto." })
      .default("proximo")
      .describe("proximo (mais cuidadoso) ou direto (mais objetivo)."),
  }),
  annotations: CALCULATOR,
  run: (input) => {
    const plan = planReturn({
      lastVisit: input.ultima_visita,
      intervalDays: input.intervalo_dias,
      advanceDays: input.antecedencia_dias,
      service: input.servico,
      tone: input.tom,
    });
    if (!plan) throw new Error("validated date became invalid");
    return {
      dados: {
        data_retorno_estimada: plan.returnDate,
        data_para_revisar_contato: plan.contactDate,
        mensagem_sugerida: plan.message,
        observacao: RETURN_PLANNER_NOTE,
      },
      fonte: `${SITE_URL}/mensagens-retorno-clientes-barbearia`,
    };
  },
});

export const recomendarPlano = defineTool({
  name: "recomendar_plano",
  title: "Recomendar o plano da Flowo",
  description:
    "Recomenda Solo, Equipe ou Empresarial pelo número de profissionais e de unidades, com a mesma regra do cadastro da Flowo. Devolve o motivo, o preço e o próximo passo: um link de contratação, ou falar_com_vendas no Empresarial.",
  input: z.object({
    profissionais: numberIn(PROFESSIONALS_LIMITS.min, PROFESSIONALS_LIMITS.max, { int: true })
      .describe("Profissionais que atendem clientes com horário marcado."),
    unidades: numberIn(UNITS_LIMITS.min, UNITS_LIMITS.max, { int: true })
      .default(1)
      .describe("Unidades da barbearia. Unidade é cada endereço com atendimento."),
    prioridade: z
      .enum(["agenda", "equipe", "financeiro"], { error: "Use agenda, equipe ou financeiro." })
      .optional()
      .describe("O que a pessoa quer resolver primeiro. Não muda o plano."),
  }),
  annotations: CALCULATOR,
  run: ({ profissionais, unidades, prioridade }) => {
    const plan = recommendPlan(profissionais, unidades);
    const proximoPasso =
      plan === "empresarial"
        ? {
            tipo: "ferramenta",
            ferramenta: "falar_com_vendas",
            explicacao: "O Empresarial é contratado com a equipe Flowo. Se a pessoa quiser, use falar_com_vendas.",
          }
        : {
            tipo: "link",
            url: agentSignupUrl(plan, undefined, "recomendar_plano"),
            explicacao: `Cria a conta já com o ${PLAN_NAMES[plan]} indicado. A pessoa confirma o plano antes de pagar.`,
          };
    return {
      dados: {
        plano: plan,
        nome: PLAN_NAMES[plan],
        resumo: PLAN_SUMMARIES[plan],
        motivo: planRecommendationReason(profissionais, unidades),
        preco_texto: planPriceText(getPlan(plan)),
        ...(prioridade ? { prioridade: PLAN_PRIORITIES[prioridade].label } : {}),
        proximo_passo: proximoPasso,
        observacao: PLAN_RECOMMENDATION_NOTE,
      },
      fonte: `${SITE_URL}/qual-plano-flowo`,
    };
  },
});

const MANAGEMENT_FIELDS: Record<ManagementQuestionId, string> = {
  whatsapp: "whatsapp_interrompe_atendimento",
  agenda: "horarios_diferentes_por_profissional",
  finance: "fechamento_em_lugares_diferentes",
  return: "tem_rotina_de_retorno",
  numbers: "equipe_sabe_quem_assume",
};

const managementShape = Object.fromEntries(
  MANAGEMENT_QUESTIONS.map((question) => [
    MANAGEMENT_FIELDS[question.id],
    z
      .boolean({ error: "Use true para Sim ou false para Ainda não." })
      .describe(`true se a resposta for Sim para: "${question.label}"`),
  ]),
) as Record<string, z.ZodBoolean>;

export const diagnosticarGestao = defineTool({
  name: "diagnosticar_gestao",
  title: "Raio-X da gestão da barbearia",
  description:
    "Faz o Raio-X da gestão com cinco perguntas de Sim ou Ainda não e devolve quantas rotinas pedem atenção e quais são. Ajuda a escolher a primeira conversa da equipe.",
  input: z.object(managementShape),
  annotations: CALCULATOR,
  run: (input) => {
    const answers = Object.fromEntries(
      MANAGEMENT_QUESTIONS.map((question) => [question.id, input[MANAGEMENT_FIELDS[question.id]]]),
    );
    const result = scoreManagementDiagnostic(answers);
    return {
      dados: {
        rotinas_para_olhar: result.attentionCount,
        achados: result.findings,
        ponto_de_partida: result.result,
        observacao: MANAGEMENT_DIAGNOSTIC_NOTE,
      },
      fonte: `${SITE_URL}/raio-x-gestao-barbearia`,
    };
  },
});

const OPTION_LETTERS = ["a", "b", "c"] as const;

const agendaShape = Object.fromEntries(
  AGENDA_READINESS_QUESTIONS.map((question) => [
    question.id,
    z
      .enum(OPTION_LETTERS, { error: "Use a, b ou c." })
      .describe(
        `${question.question} ${question.options
          .map((option, index) => `${OPTION_LETTERS[index]}) ${option.label}`)
          .join(" ")}`,
      ),
  ]),
) as Record<string, z.ZodEnum<{ a: "a"; b: "b"; c: "c" }>>;

export const diagnosticarAgenda = defineTool({
  name: "diagnosticar_agenda",
  title: "Diagnóstico da agenda da barbearia",
  description:
    "Faz o diagnóstico da agenda com cinco perguntas de múltipla escolha (a, b ou c) e devolve a pontuação de 0 a 100, a faixa, a primeira ação e o ponto mais frágil.",
  input: z.object(agendaShape),
  annotations: CALCULATOR,
  run: (input) => {
    const answers = AGENDA_READINESS_QUESTIONS.map((question) => {
      const letter = input[question.id] as (typeof OPTION_LETTERS)[number];
      return question.options[OPTION_LETTERS.indexOf(letter)].score as AgendaReadinessScore;
    });
    const result = scoreAgendaReadiness(answers);
    return {
      dados: {
        pontuacao: result.score,
        faixa: result.band.name,
        diagnostico: result.band.diagnosis,
        primeira_acao: result.band.action,
        [result.score === 100 ? "proxima_evolucao" : "ponto_mais_fragil"]: result.weakPoint,
      },
      fonte: `${SITE_URL}/recursos/diagnostico-agenda-barbearia`,
    };
  },
});

export const CALCULATOR_TOOLS = [
  calcularTempoWhatsapp,
  calcularOportunidadeWhatsapp,
  calcularOcupacaoAgenda,
  calcularComissao,
  planejarRetornoCliente,
  recomendarPlano,
  diagnosticarGestao,
  diagnosticarAgenda,
];
