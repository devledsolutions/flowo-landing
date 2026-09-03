/**
 * The two scenarios the case pages describe: one solo barber, one shop with
 * a team. Everything a case page shows comes from here. The conversations are
 * illustrative and match what each scenario describes; no result number
 * (minutes saved, clients, percentages) has been measured yet, so none lives
 * here.
 */

export type ValidationCaseMessage =
  | { from: "cliente" | "flowo" | "equipe"; text: string; at: string }
  | { day: string };

export interface ValidationCaseMedia {
  src: string;
  alt: string;
  label: string;
  caption: string;
}

export interface ValidationCaseAgendaStep {
  title: string;
  detail: string;
  tone: "ok" | "muted";
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
  /** Two lines on desktop, one string per line. */
  headline: readonly [string, string];
  /** Under the headline; at most 20 words. */
  lead: string;
  /** Meta description and Article schema. */
  summary: string;
  /** The routine before the Flowo, in the owner's words. */
  routine: string;
  conversation: readonly ValidationCaseMessage[];
  /** Height of the drawn phone screen, in logical pt. */
  conversationHeight: number;
  agendaSteps: readonly ValidationCaseAgendaStep[];
  /** What the Flowo did in this scenario, three or four short lines. */
  proofPoints: readonly string[];
  beforeAfter: readonly ValidationCaseBeforeAfter[];
  /** Real product screens shown on the case page. */
  screens: readonly ValidationCaseMedia[];
  setup: readonly string[];
  capabilities: readonly {
    title: string;
    description: string;
  }[];
  suitedFor: readonly string[];
  faqs: readonly ValidationCaseFaq[];
  plan: "Solo" | "Equipe";
  planAnchor: "#plano-solo" | "#plano-equipe";
}

const agendaScreen: ValidationCaseMedia = {
  src: "/images/product/dashboard-agenda.png",
  alt: "Agenda da Flowo no computador, com a semana, cinco barbeiros e os horários de cada um.",
  label: "A agenda no computador",
  caption: "Cada barbeiro tem a própria coluna. O horário que a Flowo marca aparece aqui na hora.",
};

const conversasScreen: ValidationCaseMedia = {
  src: "/images/product/dashboard-conversas.png",
  alt: "Tela de conversas da Flowo, com a lista de clientes e o botão para a equipe assumir a conversa.",
  label: "As conversas no computador",
  caption: "A equipe vê o que a Flowo respondeu e assume a conversa com um clique.",
};

export const VALIDATION_CASES: readonly ValidationCase[] = [
  {
    slug: "linha-onze-sao-paulo",
    name: "Linha Onze Barbearia",
    logo: "/images/validation-cases/linha-onze-professional-v2.png",
    location: "São Paulo, SP",
    profile: "Barbeiro solo",
    headline: ["O cliente marca sozinho.", "Você não para o corte."],
    lead: "Uma cadeira, uma agenda. A Flowo responde, olha o que está livre e confirma.",
    summary:
      "Barbeiro que trabalha sozinho, com o WhatsApp como principal porta de entrada de horários. A Flowo responde, consulta a agenda e confirma.",
    routine:
      "Quem trabalha sozinho para o corte a cada pedido de horário: abre a agenda, responde, espera a escolha e ainda precisa lembrar de anotar. Com a Flowo, a conversa olha a sua agenda. O pedido não depende mais da sua memória.",
    conversation: [
      { day: "Terça" },
      { from: "cliente", text: "Oi! Tem horário sábado de manhã?", at: "12:14" },
      {
        from: "flowo",
        text: "Tenho sábado às 9:00, 9:30 e 10:30. Qual fica melhor pra você?",
        at: "12:14",
      },
      { from: "cliente", text: "9:30", at: "12:15" },
      {
        from: "flowo",
        text: "Agendado. Corte no sábado às 9:30. Se precisar remarcar, é só me chamar aqui.",
        at: "12:15",
      },
      { from: "cliente", text: "Valeu!", at: "12:15" },
    ],
    conversationHeight: 620,
    agendaSteps: [
      {
        title: "Sábado, 9:30 · Corte",
        detail: "O horário entrou na sua agenda enquanto você cortava.",
        tone: "ok",
      },
      {
        title: "Confirmação enviada",
        detail: "O cliente recebeu a confirmação na mesma conversa.",
        tone: "ok",
      },
      {
        title: "Você assume quando quiser",
        detail: "Uma pergunta que a Flowo não deve responder vai para você, com o histórico.",
        tone: "muted",
      },
    ],
    proofPoints: [
      "A Flowo entendeu o pedido na conversa",
      "Ofereceu só horários livres na sua agenda",
      "Marcou o horário e confirmou com o cliente",
    ],
    beforeAfter: [
      {
        before: "Parar o corte para abrir a agenda.",
        after: "A Flowo olha a agenda por você.",
      },
      {
        before: "Responder as opções uma a uma.",
        after: "O cliente recebe os horários livres de uma vez.",
      },
      {
        before: "Lembrar de anotar o combinado.",
        after: "A escolha vira horário na agenda na hora.",
      },
    ],
    screens: [agendaScreen],
    setup: [
      "seus serviços, com duração e preço",
      "seus dias, turnos, intervalos e folgas",
      "seu WhatsApp conectado à Flowo",
      "quando a Flowo confirma sozinha e quando passa para você",
    ],
    capabilities: [
      {
        title: "Só oferece o que está livre",
        description: "A Flowo olha o que você configurou e o que já está ocupado. Não chuta horário.",
      },
      {
        title: "Você entra quando quiser",
        description: "Assuma a conversa quando surgir uma exceção. Depois a Flowo volta a atender.",
      },
      {
        title: "Agenda no celular",
        description: "Os próximos horários ficam no seu celular, prontos para consultar entre um cliente e outro.",
      },
    ],
    suitedFor: [
      "barbeiro que trabalha sozinho",
      "uma cadeira, uma agenda",
      "corte interrompido por pedido de horário",
      "quem quer começar simples",
    ],
    faqs: [
      {
        question: "A Flowo pode oferecer um horário que já está ocupado?",
        answer:
          "Ela olha a sua agenda antes de oferecer. Por isso serviços, duração, expediente e folgas precisam estar certos.",
      },
      {
        question: "Preciso receber pela Flowo para agendar?",
        answer:
          "Não. Pagamento pela Flowo é opcional e acontece depois do serviço, se você quiser usar.",
      },
      {
        question: "Posso responder eu mesmo quando quiser?",
        answer:
          "Sim. Você assume a conversa e a Flowo fica em espera até você devolver.",
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
    profile: "Barbearia com equipe",
    headline: ["A agenda de cada um.", "A recepção no controle."],
    lead: "Vários barbeiros, horários diferentes. A Flowo remarca na agenda certa e passa a conversa para a equipe quando precisa.",
    summary:
      "Barbearia com mais de um barbeiro, agendas individuais e uma recepção que acompanha confirmações, mudanças e exceções.",
    routine:
      "Com equipe, o difícil não é achar um espaço livre. É respeitar a escala de cada barbeiro, achar o horário certo quando o cliente muda de ideia e não ter duas pessoas respondendo ao mesmo tempo. A Flowo trabalha em cima da agenda de cada um e do histórico da conversa.",
    conversation: [
      { day: "Quarta" },
      { from: "cliente", text: "Oi! Consigo mudar meu corte de quinta com o Rafael?", at: "10:02" },
      {
        from: "flowo",
        text: "Consigo. Seu horário com o Rafael é quinta às 16:00. Ele tem sexta às 10:00, 14:30 ou sábado às 9:00. Qual prefere?",
        at: "10:02",
      },
      { from: "cliente", text: "Sexta 14:30", at: "10:03" },
      {
        from: "flowo",
        text: "Pronto. Corte com o Rafael remarcado para sexta às 14:30. A quinta ficou livre.",
        at: "10:03",
      },
      { from: "cliente", text: "Se eu levar meu irmão, faz um preço pros dois?", at: "10:05" },
      {
        from: "equipe",
        text: "Oi! Aqui é a Laura, da recepção. Preço combinado a gente fecha por aqui. Quer que eu já reserve os dois horários com o Rafael na sexta?",
        at: "10:08",
      },
    ],
    conversationHeight: 760,
    agendaSteps: [
      {
        title: "Quinta, 16:00 · Corte com Rafael",
        detail: "A Flowo achou o horário na agenda do Rafael, não na de outro barbeiro.",
        tone: "ok",
      },
      {
        title: "Remarcado para sexta, 14:30",
        detail: "A quinta ficou livre e a sexta ocupada, sem ninguém apagar nada.",
        tone: "ok",
      },
      {
        title: "A recepção assumiu",
        detail: "A pergunta de preço foi para a equipe. A Flowo ficou em espera.",
        tone: "muted",
      },
      {
        title: "A Flowo voltou a atender",
        detail: "Quando a recepção devolveu a conversa, a Flowo retomou de onde parou.",
        tone: "ok",
      },
    ],
    proofPoints: [
      "Respeitou a agenda de cada barbeiro",
      "Remarcou e cancelou na agenda certa",
      "Passou a conversa para a recepção, com o histórico",
      "Ficou em espera e voltou quando a equipe devolveu",
    ],
    beforeAfter: [
      {
        before: "Conferir várias agendas antes de responder.",
        after: "A Flowo olha a agenda do barbeiro certo.",
      },
      {
        before: "Combinar na conversa e esquecer de mudar a agenda.",
        after: "A mudança vai direto para o horário certo.",
      },
      {
        before: "Recepção e robô respondendo ao mesmo tempo.",
        after: "A equipe assume, a Flowo espera e volta quando vocês quiserem.",
      },
    ],
    screens: [agendaScreen, conversasScreen],
    setup: [
      "cada barbeiro com os seus serviços",
      "dias, turnos, intervalos e folgas de cada um",
      "o WhatsApp da barbearia conectado à Flowo",
      "quem da equipe pode assumir a conversa",
    ],
    capabilities: [
      {
        title: "Horário por barbeiro",
        description: "Dias, turnos, intervalos e folgas de cada um. A Flowo respeita a escala de todos.",
      },
      {
        title: "Conversa e agenda juntas",
        description: "A equipe vê o histórico e a situação do horário sem caçar mensagem solta.",
      },
      {
        title: "A equipe manda",
        description: "Você define as regras. A recepção assume exceções sem perder o contexto do cliente.",
      },
    ],
    suitedFor: [
      "barbearia com dois ou mais barbeiros",
      "equipe com dias, turnos e folgas diferentes",
      "recepção que acompanha mudanças de agenda",
      "dono que quer a equipe no controle das conversas",
    ],
    faqs: [
      {
        question: "Cada barbeiro pode ter um horário diferente?",
        answer:
          "Sim. Dias, turnos, intervalos e folgas são configurados por barbeiro, conforme o plano contratado.",
      },
      {
        question: "O que acontece quando a recepção assume a conversa?",
        answer:
          "A Flowo para de responder, para não ter duas respostas ao mesmo tempo. A equipe continua no mesmo histórico e decide quando a Flowo volta.",
      },
      {
        question: "Todo mundo precisa receber pela Flowo?",
        answer:
          "Não. Pagamento pela Flowo é opcional. Agenda e atendimento funcionam sem isso.",
      },
    ],
    plan: "Equipe",
    planAnchor: "#plano-equipe",
  },
] as const;

export function getValidationCase(slug: string): ValidationCase {
  const validationCase = VALIDATION_CASES.find((item) => item.slug === slug);

  if (!validationCase) {
    throw new Error(`Caso não encontrado: ${slug}`);
  }

  return validationCase;
}
