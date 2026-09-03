export type ComparisonLayer = "direct" | "alternative" | "substitute";
export type EvidenceStatus =
  | "official"
  | "self_declared"
  | "observed_substitute"
  | "not_verified";

export const COMPETITIVE_SCENARIOS = [
  "Pedido ‘tem horário hoje?’",
  "Disponibilidade por profissional",
  "Confirmação",
  "Remarcação",
  "Cancelamento",
  "Atendimento enquanto o barbeiro trabalha",
  "Vários profissionais no mesmo número",
  "Clientes e histórico",
  "Comandas",
  "Comissões",
  "Financeiro opcional",
  "Fiscal",
  "Migração",
  "Suporte",
  "Preço e avaliação",
] as const;

export type CompetitiveScenario = (typeof COMPETITIVE_SCENARIOS)[number];

export interface CompetitiveSource {
  url: string;
  scope: string;
  checkedAt: string;
}

export interface CompetitiveEntry {
  name: string;
  layer: ComparisonLayer;
  officialUrl?: string;
  status: EvidenceStatus;
  declared: string;
  whereFlowoDiffers: string;
  sourceNote: string;
  sources: readonly CompetitiveSource[];
}

export const COMPETITIVE_ENTRIES: readonly CompetitiveEntry[] = [
  {
    name: "Trinks",
    layer: "direct",
    officialUrl: "https://negocios.trinks.com/negocios/barbearias/",
    status: "official",
    declared: "Agenda, comunicação, gestão e módulos para barbearias; composição e adicionais devem ser confirmados.",
    whereFlowoDiffers: "A Flowo inclui a IA do WhatsApp no plano; na Trinks a IA é contratada à parte, por créditos.",
    sourceNote: "Página oficial consultada; recursos e preços podem variar por pacote.",
    sources: [],
  },
  {
    name: "AppBarber",
    layer: "direct",
    officialUrl: "https://www.appbarber.com.br/",
    status: "official",
    declared: "Agenda, site, satisfação, clube, comandas e comissões aparecem na página oficial.",
    whereFlowoDiffers: "A prova pública da Flowo concentra-se no pedido de horário e na confirmação pelo WhatsApp.",
    sourceNote: "Página oficial consultada; não inferimos recursos não publicados.",
    sources: [],
  },
  {
    name: "BestBarbers",
    layer: "direct",
    officialUrl: "https://www.bestbarbers.app/sistema-para-barbearia",
    status: "official",
    declared: "Publica plano básico gratuito e App Exclusivo a partir de R$ 299/mês, com app próprio, clube de assinaturas, nota fiscal, totem opcional e multi-unidades.",
    whereFlowoDiffers: "O BestBarbers apresenta o agendamento online como substituto do WhatsApp; a Flowo coloca a IA dentro da conversa do WhatsApp.",
    sourceNote: "Página comercial oficial; números de uso são tratados como declaração da empresa.",
    sources: [],
  },
  {
    name: "Barbeiro.app",
    layer: "direct",
    officialUrl: "https://www.barbeiro.app/",
    status: "self_declared",
    declared: "Publica teste e números de uso, além de agenda e módulos para barbearias.",
    whereFlowoDiffers: "A Flowo não copia métricas de terceiros: publica apenas o atendimento que já mostrou funcionando.",
    sourceNote: "Números de uso e a promessa de até 70% menos faltas são declarações publicadas pelo próprio site do concorrente.",
    sources: [],
  },
  {
    name: "Barva",
    layer: "direct",
    officialUrl: "https://www.barva.com.br/",
    status: "official",
    declared: "Software de gestão para barbearias com proposta de operação digital.",
    whereFlowoDiffers: "A Flowo parte do atendimento no WhatsApp e da agenda real por profissional.",
    sourceNote: "Página oficial consultada; detalhes de pacote ficam sujeitos à proposta vigente.",
    sources: [],
  },
  {
    name: "Barberia.io",
    layer: "direct",
    officialUrl: "https://barberia.io/",
    status: "official",
    declared:
      "Publica cinco planos de R$ 49 a R$ 499 por mês, IA no WhatsApp a partir do plano de R$ 99, app do cliente nas lojas, multi-unidade e 14 dias de teste sem cartão.",
    whereFlowoDiffers:
      "A Flowo inclui a IA no WhatsApp já no plano de entrada e não publica app do cliente nas lojas.",
    sourceNote:
      "Preços, limites por plano e o teste de 14 dias foram lidos na home oficial.",
    sources: [
      {
        url: "https://barberia.io/",
        scope:
          "Módulos, IA no WhatsApp, app do cliente, os cinco preços mensais, limites de profissionais e unidades, teste de 14 dias e ausência de fidelidade.",
        checkedAt: "2026-09-03",
      },
    ],
  },
  {
    name: "Avec",
    layer: "direct",
    officialUrl: "https://www.avec.com.br/",
    status: "official",
    declared: "Ecossistema de gestão, agenda, pagamentos e módulos para negócios de beleza.",
    whereFlowoDiffers: "A Flowo mantém o foco no WhatsApp e deixa o pagamento integrado opcional.",
    sourceNote: "Página oficial consultada; alguns itens são módulos adicionais.",
    sources: [],
  },
  {
    name: "Google Calendar",
    layer: "alternative",
    officialUrl: "https://workspace.google.com/intl/pt-BR/products/calendar/",
    status: "official",
    declared:
      "Calendário do Google Workspace, com agendas compartilhadas e uma página de agendamento para outras pessoas marcarem horário.",
    whereFlowoDiffers:
      "A Flowo atende o cliente no WhatsApp e trabalha com serviços, profissionais e comanda da barbearia. O Google Agenda não faz nada disso.",
    sourceNote:
      "Página oficial do produto em português. Nenhum preço aparece nela.",
    sources: [
      {
        url: "https://workspace.google.com/intl/pt-BR/products/calendar/",
        scope:
          "Agendas compartilhadas, várias agendas, página de agendamento para terceiros e integrações com Gmail e Meet.",
        checkedAt: "2026-09-03",
      },
    ],
  },
  {
    name: "Booksy",
    layer: "alternative",
    officialUrl: "https://biz.booksy.com/pt-br",
    status: "official",
    declared:
      "Marketplace de beleza mais o painel Booksy Biz, publicado a R$ 99,99 por mês com todos os recursos e R$ 20 por agenda adicional.",
    whereFlowoDiffers:
      "A Flowo publica IA no WhatsApp que atende, agenda e confirma nos três planos. O Booksy Biz não publica bot nem IA no WhatsApp.",
    sourceNote:
      "Preço, cobrança por agenda adicional e ausência de fidelidade lidos na página oficial do Booksy Biz em português.",
    sources: [
      {
        url: "https://biz.booksy.com/pt-br",
        scope:
          "Preço mensal em reais, valor por agenda adicional, recursos do painel e convite ao teste gratuito, sem duração publicada.",
        checkedAt: "2026-09-03",
      },
      {
        url: "https://booksy.com/pt-br/",
        scope:
          "Lado do consumidor: descoberta de estabelecimentos, avaliações e agendamento pelo aplicativo.",
        checkedAt: "2026-09-03",
      },
    ],
  },
  {
    name: "Fresha",
    layer: "alternative",
    officialUrl: "https://www.fresha.com/pt/pricing",
    status: "official",
    declared:
      "Agenda e gestão para beleza com marketplace, publicada em português a R$ 39,95 por mês no plano autônomo e R$ 26,95 por colaborador no plano de equipe.",
    whereFlowoDiffers:
      "A Flowo publica IA no WhatsApp que atende, agenda e confirma nos três planos. A Fresha não publica bot nem IA no WhatsApp.",
    sourceNote:
      "Preços em reais e a cobrança por colaborador foram lidos na página oficial de valores em português.",
    sources: [
      {
        url: "https://www.fresha.com/pt/pricing",
        scope:
          "Preços em reais por plano, cobrança por colaborador, plano Empresas sob taxas personalizadas e novos clientes do marketplace sem custo.",
        checkedAt: "2026-09-03",
      },
      {
        url: "https://www.fresha.com/pt/for-business",
        scope:
          "Proposta para negócios de beleza e a política de complementos opcionais como pagamentos online e marketing.",
        checkedAt: "2026-09-03",
      },
    ],
  },
  {
    name: "Agenda genérica",
    layer: "alternative",
    status: "observed_substitute",
    declared: "Resolve registro de horários, mas não conhece a rotina de uma barbearia.",
    whereFlowoDiffers: "A Flowo inclui serviços, profissionais e conversa de agendamento no mesmo fluxo.",
    sourceNote: "Categoria, não uma marca; comparar o produto específico escolhido.",
    sources: [],
  },
  {
    name: "WhatsApp manual",
    layer: "substitute",
    status: "observed_substitute",
    declared: "O dono ou a equipe leem mensagens e conferem horários manualmente.",
    whereFlowoDiffers: "A Flowo oferece os horários da agenda e registra a marcação enquanto a equipe atende.",
    sourceNote: "Substituto observado na rotina; resultado depende da configuração e do consentimento.",
    sources: [],
  },
  {
    name: "Planilha",
    layer: "substitute",
    status: "observed_substitute",
    declared: "Registra dados, mas exige conferência e atualização manual.",
    whereFlowoDiffers: "A Flowo mantém cliente, comanda e agenda no contexto do atendimento.",
    sourceNote: "Substituto operacional; não é comparável a um pacote de software vertical completo.",
    sources: [],
  },
  {
    name: "Caderno",
    layer: "substitute",
    status: "observed_substitute",
    declared: "Funciona sem configuração, mas depende da memória e da presença do dono.",
    whereFlowoDiffers: "A Flowo torna a disponibilidade consultável para o cliente.",
    sourceNote: "Substituto operacional, sem fonte comercial externa.",
    sources: [],
  },
  {
    name: "Memória do dono",
    layer: "substitute",
    status: "observed_substitute",
    declared: "Decisões ficam concentradas em uma pessoa.",
    whereFlowoDiffers: "A Flowo registra a conversa e a agenda para a equipe acompanhar.",
    sourceNote: "Substituto operacional; risco de perda de contexto é o motivo da comparação.",
    sources: [],
  },
  {
    name: "Recepcionista entre cortes",
    layer: "substitute",
    status: "observed_substitute",
    declared: "Uma pessoa interrompe o atendimento para responder e confirmar horários.",
    whereFlowoDiffers: "A Flowo reduz a interrupção e chama uma pessoa quando a conversa sai do combinado.",
    sourceNote: "Substituto humano; não é promessa de substituição de pessoas.",
    sources: [],
  },
] as const;

export const FLOWO_SCENARIO_SUMMARY: readonly {
  scenario: CompetitiveScenario;
  evidence: string;
}[] = COMPETITIVE_SCENARIOS.map((scenario) => ({
  scenario,
  evidence:
    "Atendimento da Flowo mostrado com dados de teste; confirme o plano e a configuração antes de prometer.",
}));

export const LAYER_LABELS: Record<ComparisonLayer, string> = {
  direct: "Concorrentes diretos",
  alternative: "Alternativas de software",
  substitute: "Substitutos reais",
};
