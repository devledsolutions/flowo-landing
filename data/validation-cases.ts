export interface ValidationCaseStep {
  title: string;
  description: string;
}

export interface ValidationCaseMedia {
  src: string;
  alt: string;
  label: string;
  caption: string;
}

export interface ValidationCaseBeforeAfter {
  before: string;
  after: string;
}

export interface ValidationCaseFaq {
  question: string;
  answer: string;
}

export interface ValidationCase {
  slug: string;
  name: string;
  logo: string;
  location: string;
  profile: string;
  headline: string;
  summary: string;
  campaignPromise: string;
  challenge: string;
  heroMedia: ValidationCaseMedia;
  supportingMedia: readonly ValidationCaseMedia[];
  proofPoints: readonly string[];
  beforeAfter: readonly ValidationCaseBeforeAfter[];
  setup: readonly string[];
  steps: readonly ValidationCaseStep[];
  validatedOutcome: string;
  capabilities: readonly {
    title: string;
    description: string;
  }[];
  suitedFor: readonly string[];
  faqs: readonly ValidationCaseFaq[];
  plan: "Solo" | "Equipe";
  planAnchor: "#plano-solo" | "#plano-equipe";
}

const bookingMedia: ValidationCaseMedia = {
  src: "/images/validation-cases/product/whatsapp-booking.png",
  alt: "Conversa demonstrativa em que a IA da Flowo oferece três horários e confirma o agendamento",
  label: "Conversa até a confirmação",
  caption:
    "A IA consulta a disponibilidade configurada, apresenta opções e registra a escolha na mesma conversa.",
};

const dashboardMedia: ValidationCaseMedia = {
  src: "/images/validation-cases/product/home-dashboard.png",
  alt: "Tela inicial do aplicativo Flowo com os próximos horários da barbearia",
  label: "A rotina em um só lugar",
  caption:
    "O compromisso confirmado passa a fazer parte da agenda que o profissional acompanha no celular.",
};

const agendaMedia: ValidationCaseMedia = {
  src: "/images/validation-cases/product/agenda-team.png",
  alt: "Agenda do aplicativo Flowo com horários, serviços e profissionais diferentes",
  label: "Agenda organizada por profissional",
  caption:
    "Cada horário mantém serviço, duração, profissional e situação visíveis para a operação.",
};

const conversationMedia: ValidationCaseMedia = {
  src: "/images/validation-cases/product/conversation-control.png",
  alt: "Conversa no aplicativo Flowo com atendimento ativo e agendamento confirmado",
  label: "A equipe acompanha a conversa",
  caption:
    "Quando o atendimento pede uma pessoa, a equipe assume no mesmo histórico e mantém o contexto.",
};

const teamMedia: ValidationCaseMedia = {
  src: "/images/validation-cases/product/team-controls.png",
  alt: "Tela de gestão da Flowo com acessos para equipe, conversas e configurações da barbearia",
  label: "Controle para uma operação maior",
  caption:
    "Serviços, equipe, conversas e regras ficam acessíveis em uma estrutura preparada para mais de um profissional.",
};

export const VALIDATION_CASES: readonly ValidationCase[] = [
  {
    slug: "linha-onze-sao-paulo",
    name: "Linha Onze Barbearia",
    logo: "/images/validation-cases/linha-onze-professional-v2.png",
    location: "São Paulo, SP",
    profile: "Operação solo",
    headline: "O WhatsApp agenda enquanto o barbeiro continua na cadeira.",
    summary:
      "Um cenário de uma cadeira, agenda concentrada no proprietário e WhatsApp como principal porta de entrada para novos horários.",
    campaignPromise:
      "O cliente recebe opções reais, escolhe e chega à confirmação sem obrigar o barbeiro a interromper o atendimento para abrir a agenda.",
    challenge:
      "Para quem trabalha sozinho, cada pedido de horário abre uma segunda tarefa: parar o corte, conferir a agenda, responder, esperar a escolha e lembrar de registrar. A Flowo conecta essa conversa à disponibilidade configurada para que o pedido não dependa da memória do profissional.",
    heroMedia: bookingMedia,
    supportingMedia: [dashboardMedia, agendaMedia],
    proofPoints: [
      "pedido entendido na conversa",
      "disponibilidade consultada",
      "horário criado na agenda",
      "confirmação enviada ao cliente",
    ],
    beforeAfter: [
      {
        before: "Parar o atendimento para abrir a agenda.",
        after: "A IA consulta os horários configurados.",
      },
      {
        before: "Responder opções uma a uma no WhatsApp.",
        after: "O cliente recebe alternativas compatíveis na conversa.",
      },
      {
        before: "Confiar na memória para registrar o combinado.",
        after: "A escolha vira compromisso na agenda da Flowo.",
      },
    ],
    setup: [
      "serviços com duração e preço cadastrados",
      "dias, turnos, intervalos e folgas do profissional configurados",
      "WhatsApp conectado ao atendimento da Flowo",
      "regras de confirmação e passagem para atendimento humano definidas",
    ],
    steps: [
      {
        title: "O cliente pede um horário",
        description:
          "A IA entende serviço, preferência de dia e contexto da conversa sem exigir que o cliente aprenda um novo canal.",
      },
      {
        title: "A agenda responde",
        description:
          "A Flowo procura opções que respeitam duração, expediente, intervalos e bloqueios já registrados.",
      },
      {
        title: "O cliente escolhe",
        description:
          "A conversa mantém as opções disponíveis até a definição do horário desejado.",
      },
      {
        title: "O compromisso aparece na rotina",
        description:
          "O agendamento é criado para o profissional correto e a confirmação volta para o cliente.",
      },
    ],
    validatedOutcome:
      "Em ambiente controlado de produção, a Flowo concluiu o caminho entre mensagem recebida, consulta de disponibilidade, criação e confirmação do agendamento. A validação comprova o funcionamento do fluxo; não representa uma promessa de volume de vendas ou ocupação.",
    capabilities: [
      {
        title: "Agenda como fonte de verdade",
        description:
          "A resposta considera o que foi configurado e o que já está ocupado, em vez de oferecer horários por aproximação.",
      },
      {
        title: "Atendimento humano quando necessário",
        description:
          "O profissional pode assumir a conversa quando surgir uma exceção e retomar a automação depois.",
      },
      {
        title: "Rotina visível no celular",
        description:
          "Próximos horários e situações do atendimento ficam disponíveis para consulta rápida.",
      },
    ],
    suitedFor: [
      "barbeiro que trabalha sozinho",
      "agenda concentrada em uma cadeira",
      "atendimento interrompido por pedidos de horário",
      "operação que quer começar com um fluxo simples e controlado",
    ],
    faqs: [
      {
        question: "A IA pode oferecer um horário que já está ocupado?",
        answer:
          "O fluxo consulta a agenda configurada antes de apresentar opções. Por isso, serviços, duração, expediente e bloqueios precisam estar corretos.",
      },
      {
        question: "Preciso usar pagamento pela Flowo para agendar?",
        answer:
          "Não. Pagamentos integrados são opcionais e acontecem depois do serviço quando a barbearia escolhe usar esse recurso.",
      },
      {
        question: "Posso responder pessoalmente quando eu quiser?",
        answer:
          "Sim. O atendimento humano pode assumir a conversa e pausar a IA quando a situação exigir uma decisão do profissional.",
      },
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
    headline: "Cada barbeiro mantém seu horário. A recepção mantém o controle.",
    summary:
      "Um cenário com mais de um profissional, agendas individuais e uma recepção que precisa acompanhar confirmações, mudanças e exceções.",
    campaignPromise:
      "A conversa consulta o profissional certo, atualiza o compromisso certo e continua no mesmo contexto quando a equipe precisa assumir.",
    challenge:
      "Com equipe, a dificuldade não é apenas encontrar um espaço livre. É respeitar a escala de cada barbeiro, localizar o compromisso correto quando algo muda e impedir que automação e recepção respondam ao mesmo tempo. A Flowo organiza esse caminho em torno da agenda e do histórico da conversa.",
    heroMedia: agendaMedia,
    supportingMedia: [conversationMedia, teamMedia, bookingMedia],
    proofPoints: [
      "horários individuais considerados",
      "remarcação e cancelamento registrados",
      "atendimento humano no mesmo histórico",
      "IA pausada e retomada com controle",
    ],
    beforeAfter: [
      {
        before: "Conferir várias agendas antes de responder.",
        after: "A consulta considera o profissional e suas regras.",
      },
      {
        before: "Alterar a conversa e esquecer de atualizar a agenda.",
        after: "A mudança é aplicada ao compromisso localizado.",
      },
      {
        before: "Recepção e automação responderem ao mesmo tempo.",
        after: "A equipe pausa a IA, assume e decide quando retomar.",
      },
    ],
    setup: [
      "profissionais, serviços e vínculos organizados individualmente",
      "dias, turnos, intervalos e folgas definidos por profissional",
      "conversas conectadas ao histórico de agendamento",
      "permissões e passagem para atendimento humano combinadas com a equipe",
    ],
    steps: [
      {
        title: "O contexto certo é localizado",
        description:
          "A conversa recupera o compromisso e o profissional relacionados ao pedido antes de propor uma mudança.",
      },
      {
        title: "A agenda é atualizada",
        description:
          "Remarcação ou cancelamento altera o compromisso existente sem criar duas versões do mesmo horário.",
      },
      {
        title: "A equipe assume quando precisa",
        description:
          "Uma pessoa continua no mesmo histórico, com a IA pausada, para resolver exceções ou negociar alternativas.",
      },
      {
        title: "A automação volta com controle",
        description:
          "Depois da intervenção humana, a equipe escolhe quando a IA pode retomar o fluxo da conversa.",
      },
    ],
    validatedOutcome:
      "Em ambiente controlado de produção, a validação cobriu consulta, remarcação, cancelamento e confirmação, além da pausa da IA para atendimento humano e sua retomada. Ela comprova essas ações técnicas; não atribui métricas comerciais a uma barbearia inexistente.",
    capabilities: [
      {
        title: "Horários por profissional",
        description:
          "Dias, turnos, intervalos e folgas podem refletir a rotina de cada integrante da equipe.",
      },
      {
        title: "Conversa e agenda alinhadas",
        description:
          "A equipe acompanha o histórico e a situação do compromisso sem depender de mensagens soltas.",
      },
      {
        title: "Controle operacional",
        description:
          "Gestores definem a configuração e a equipe assume exceções sem perder o contexto do cliente.",
      },
    ],
    suitedFor: [
      "barbearia com dois ou mais profissionais",
      "equipe com dias, turnos e folgas diferentes",
      "recepção que acompanha mudanças de agenda",
      "gestor que precisa manter controle humano sobre conversas",
    ],
    faqs: [
      {
        question: "Cada barbeiro pode ter um horário diferente?",
        answer:
          "Sim. A operação com equipe permite configurar dias, turnos, intervalos e folgas por profissional, conforme o plano e a implantação contratados.",
      },
      {
        question: "O que acontece quando a recepção assume a conversa?",
        answer:
          "A IA é pausada para evitar respostas concorrentes. A equipe continua no mesmo histórico e decide quando a automação pode voltar.",
      },
      {
        question: "A Flowo exige que todos recebam pela plataforma?",
        answer:
          "Não. Pagamentos integrados são opcionais. A agenda e o atendimento podem funcionar sem obrigar a barbearia a receber pela Flowo.",
      },
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
