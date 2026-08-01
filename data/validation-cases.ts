export interface ValidationCaseStep {
  title: string;
  description: string;
}

export interface ValidationCase {
  slug: string;
  name: string;
  logo: string;
  location: string;
  profile: string;
  headline: string;
  summary: string;
  challenge: string;
  setup: readonly string[];
  steps: readonly ValidationCaseStep[];
  validatedOutcome: string;
  suitedFor: readonly string[];
  plan: "Solo" | "Equipe";
  planAnchor: "#plano-solo" | "#plano-equipe";
}

export const VALIDATION_CASES: readonly ValidationCase[] = [
  {
    slug: "linha-onze-sao-paulo",
    name: "Linha Onze Barbearia",
    logo: "/images/validation-cases/linha-onze-professional-v2.png",
    location: "São Paulo, SP",
    profile: "Operação solo",
    headline: "O pedido de horário chega enquanto o barbeiro está atendendo.",
    summary:
      "Um perfil de barbearia com uma cadeira, agenda concentrada no proprietário e WhatsApp como principal porta de entrada.",
    challenge:
      "Responder sem interromper o corte, conferir um horário realmente disponível e fazer a informação chegar à agenda sem depender da memória.",
    setup: [
      "serviços e duração cadastrados",
      "horário de trabalho do profissional configurado",
      "WhatsApp conectado ao fluxo de atendimento",
      "agenda disponível para consulta pela IA",
    ],
    steps: [
      {
        title: "O cliente chama no WhatsApp",
        description:
          "A IA recebe a conversa e identifica que a pessoa quer marcar um horário.",
      },
      {
        title: "A disponibilidade é consultada",
        description:
          "O fluxo procura horários compatíveis com o serviço e com a agenda configurada.",
      },
      {
        title: "O cliente escolhe",
        description:
          "A conversa mantém o contexto até a definição do horário desejado.",
      },
      {
        title: "O agendamento é confirmado",
        description:
          "O compromisso é criado e aparece na agenda do profissional correto.",
      },
    ],
    validatedOutcome:
      "Na validação controlada, a Flowo concluiu o caminho entre mensagem recebida, consulta de disponibilidade, criação e confirmação do agendamento.",
    suitedFor: [
      "barbeiro que trabalha sozinho",
      "agenda concentrada em uma cadeira",
      "atendimento interrompido por mensagens de horário",
    ],
    plan: "Solo",
    planAnchor: "#plano-solo",
  },
  {
    slug: "quatro-tempos-curitiba",
    name: "Quatro Tempos Barbearia",
    logo: "/images/validation-cases/quatro-tempos-professional-v2.png",
    location: "Curitiba, PR",
    profile: "Operação com equipe",
    headline: "Conversa e agenda precisam continuar alinhadas quando algo muda.",
    summary:
      "Um perfil de barbearia em que mais de um profissional atende e a recepção precisa manter o controle das mudanças de horário.",
    challenge:
      "Consultar o compromisso certo, atualizar a agenda quando o cliente remarca ou cancela e permitir que a equipe assuma uma conversa sem competir com a IA.",
    setup: [
      "profissionais e serviços organizados individualmente",
      "horários e folgas definidos por profissional",
      "conversas ligadas ao histórico de agendamento",
      "controle humano disponível para exceções",
    ],
    steps: [
      {
        title: "O horário existente é localizado",
        description:
          "A conversa recupera o contexto necessário antes de alterar a agenda.",
      },
      {
        title: "A mudança é registrada",
        description:
          "Remarcação ou cancelamento atualiza o estado do compromisso, sem deixar duas versões do mesmo horário.",
      },
      {
        title: "A equipe pode assumir",
        description:
          "Quando a situação pede uma pessoa, a IA é pausada e o atendimento humano continua no mesmo contexto.",
      },
      {
        title: "A IA pode voltar ao fluxo",
        description:
          "Depois da intervenção da equipe, a automação é retomada de forma controlada.",
      },
    ],
    validatedOutcome:
      "A validação controlada cobriu consulta, remarcação, cancelamento e confirmação, além da pausa da IA para atendimento humano e sua retomada posterior.",
    suitedFor: [
      "barbearia com equipe e horários individuais",
      "recepção que acompanha mudanças de agenda",
      "gestor que precisa manter controle humano sobre conversas",
    ],
    plan: "Equipe",
    planAnchor: "#plano-equipe",
  },
] as const;

export function getValidationCase(slug: string): ValidationCase {
  const validationCase = VALIDATION_CASES.find((item) => item.slug === slug);

  if (!validationCase) {
    throw new Error(`Caso de validação não encontrado: ${slug}`);
  }

  return validationCase;
}
