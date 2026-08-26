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

export interface CompetitiveEntry {
  name: string;
  layer: ComparisonLayer;
  officialUrl?: string;
  status: EvidenceStatus;
  declared: string;
  whereFlowoDiffers: string;
  sourceNote: string;
}

export const COMPETITIVE_ENTRIES: readonly CompetitiveEntry[] = [
  {
    name: "Trinks",
    layer: "direct",
    officialUrl: "https://negocios.trinks.com/negocios/barbearias/",
    status: "official",
    declared: "Agenda, comunicação, gestão e módulos para barbearias; composição e adicionais devem ser confirmados.",
    whereFlowoDiffers: "A Flowo começa pela conversa no WhatsApp ligada à agenda, sem obrigar o pagamento integrado.",
    sourceNote: "Página oficial consultada; recursos e preços podem variar por pacote.",
  },
  {
    name: "AppBarber",
    layer: "direct",
    officialUrl: "https://www.appbarber.com.br/",
    status: "official",
    declared: "Agenda, site, satisfação, clube, comandas e comissões aparecem na página oficial.",
    whereFlowoDiffers: "A prova pública da Flowo concentra-se no pedido de horário e na confirmação pelo WhatsApp.",
    sourceNote: "Página oficial consultada; não inferimos recursos não publicados.",
  },
  {
    name: "BestBarbers",
    layer: "direct",
    officialUrl: "https://www.bestbarbers.app/sistema-para-barbearia",
    status: "official",
    declared: "Apresenta planos e uma proposta de gestão para barbearias.",
    whereFlowoDiffers: "A Flowo mostra o caminho da mensagem à agenda e mantém recebimentos como escolha.",
    sourceNote: "Página comercial oficial; números de uso são tratados como declaração da empresa.",
  },
  {
    name: "Barbeiro.app",
    layer: "direct",
    officialUrl: "https://www.barbeiro.app/",
    status: "self_declared",
    declared: "Publica teste e números de uso, além de agenda e módulos para barbearias.",
    whereFlowoDiffers: "A Flowo não copia métricas de terceiros: publica apenas o fluxo de atendimento validado.",
    sourceNote: "Claims de uso e redução de faltas são auto-declarados no site do concorrente.",
  },
  {
    name: "Barva",
    layer: "direct",
    officialUrl: "https://www.barva.com.br/",
    status: "official",
    declared: "Software de gestão para barbearias com proposta de operação digital.",
    whereFlowoDiffers: "A Flowo parte do atendimento no WhatsApp e da agenda real por profissional.",
    sourceNote: "Página oficial consultada; detalhes de pacote ficam sujeitos à proposta vigente.",
  },
  {
    name: "Barberia.io",
    layer: "direct",
    officialUrl: "https://barberia.io/",
    status: "official",
    declared: "Apresenta gestão e agenda para barbearias.",
    whereFlowoDiffers: "A Flowo mostra uma conversa de venda e atendimento antes de listar módulos.",
    sourceNote: "Página oficial consultada; sem extrapolar capacidades não demonstradas.",
  },
  {
    name: "Hyperbarber",
    layer: "direct",
    status: "not_verified",
    declared: "Não encontramos, nesta revisão, uma página oficial verificável para confirmar a matriz.",
    whereFlowoDiffers: "Nenhuma vantagem ou limitação é afirmada sem fonte.",
    sourceNote: "Aguardando fonte oficial; não usar como afirmação comparativa.",
  },
  {
    name: "Avec",
    layer: "direct",
    officialUrl: "https://www.avec.com.br/",
    status: "official",
    declared: "Ecossistema de gestão, agenda, pagamentos e módulos para negócios de beleza.",
    whereFlowoDiffers: "A Flowo mantém o foco no WhatsApp e deixa o pagamento integrado opcional.",
    sourceNote: "Página oficial consultada; alguns itens são módulos adicionais.",
  },
  {
    name: "Google Calendar",
    layer: "alternative",
    officialUrl: "https://calendar.google.com/",
    status: "official",
    declared: "Calendário genérico para registrar compromissos.",
    whereFlowoDiffers: "A Flowo responde o cliente e transforma disponibilidade em agendamento.",
    sourceNote: "Alternativa de calendário, não software vertical de barbearia.",
  },
  {
    name: "Booksy",
    layer: "alternative",
    officialUrl: "https://booksy.com/",
    status: "official",
    declared: "Marketplace e agenda para descoberta e marcação de serviços.",
    whereFlowoDiffers: "A Flowo prioriza o número e a rotina já usados pela barbearia.",
    sourceNote: "Alternativa de marketplace; disponibilidade por país e pacote deve ser confirmada.",
  },
  {
    name: "Fresha",
    layer: "alternative",
    officialUrl: "https://www.fresha.com/",
    status: "official",
    declared: "Agenda e gestão para negócios de beleza, com descoberta em marketplace.",
    whereFlowoDiffers: "A Flowo é vendida como atendimento no WhatsApp conectado à agenda.",
    sourceNote: "Alternativa internacional; condições brasileiras podem diferir.",
  },
  {
    name: "Agenda genérica",
    layer: "alternative",
    status: "observed_substitute",
    declared: "Resolve registro de horários, mas não conhece a rotina de uma barbearia.",
    whereFlowoDiffers: "A Flowo inclui serviços, profissionais e conversa de agendamento no mesmo fluxo.",
    sourceNote: "Categoria, não uma marca; comparar o produto específico escolhido.",
  },
  {
    name: "WhatsApp manual",
    layer: "substitute",
    status: "observed_substitute",
    declared: "O dono ou a equipe leem mensagens e conferem horários manualmente.",
    whereFlowoDiffers: "A Flowo oferece os horários da agenda e registra a marcação enquanto a equipe atende.",
    sourceNote: "Substituto observado na rotina; resultado depende da configuração e do consentimento.",
  },
  {
    name: "Planilha",
    layer: "substitute",
    status: "observed_substitute",
    declared: "Registra dados, mas exige conferência e atualização manual.",
    whereFlowoDiffers: "A Flowo mantém cliente, comanda e agenda no contexto do atendimento.",
    sourceNote: "Substituto operacional; não é comparável a um pacote de software vertical completo.",
  },
  {
    name: "Caderno",
    layer: "substitute",
    status: "observed_substitute",
    declared: "Funciona sem configuração, mas depende da memória e da presença do dono.",
    whereFlowoDiffers: "A Flowo torna a disponibilidade consultável para o cliente.",
    sourceNote: "Substituto operacional, sem fonte comercial externa.",
  },
  {
    name: "Memória do dono",
    layer: "substitute",
    status: "observed_substitute",
    declared: "Decisões ficam concentradas em uma pessoa.",
    whereFlowoDiffers: "A Flowo registra a conversa e a agenda para a equipe acompanhar.",
    sourceNote: "Substituto operacional; risco de perda de contexto é o motivo da comparação.",
  },
  {
    name: "Recepcionista entre cortes",
    layer: "substitute",
    status: "observed_substitute",
    declared: "Uma pessoa interrompe o atendimento para responder e confirmar horários.",
    whereFlowoDiffers: "A Flowo reduz a interrupção e chama uma pessoa quando a conversa sai do combinado.",
    sourceNote: "Substituto humano; não é promessa de substituição de pessoas.",
  },
] as const;

export const FLOWO_SCENARIO_SUMMARY: readonly {
  scenario: CompetitiveScenario;
  evidence: string;
}[] = COMPETITIVE_SCENARIOS.map((scenario) => ({
  scenario,
  evidence:
    "Fluxo Flowo demonstrado com dados controlados; confirmar escopo do plano e da configuração antes de prometer.",
}));

export const LAYER_LABELS: Record<ComparisonLayer, string> = {
  direct: "Concorrentes diretos",
  alternative: "Alternativas de software",
  substitute: "Substitutos reais",
};
