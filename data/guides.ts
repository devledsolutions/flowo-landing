export type GuideGroupId = "operacao" | "relacionamento" | "gestao";

export type GuideIconKey =
  | "calendar"
  | "users"
  | "credit-card"
  | "message"
  | "bell"
  | "chart";

export interface GuideEntry {
  path: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  topics: string[];
  group: GuideGroupId;
  icon: GuideIconKey;
  publishedTime: string;
  modifiedTime: string;
  relatedPaths: string[];
}

export const GUIDE_GROUPS: {
  id: GuideGroupId;
  title: string;
  description: string;
}[] = [
  {
    id: "operacao",
    title: "Agenda e operação",
    description:
      "Organize capacidade, horários, equipe e faltas sem criar regras que o produto não executa.",
  },
  {
    id: "relacionamento",
    title: "WhatsApp e relacionamento",
    description:
      "Ative o canal oficial, cuide das conversas e trabalhe retorno e fidelização com consentimento.",
  },
  {
    id: "gestao",
    title: "Receita e gestão",
    description:
      "Feche atendimentos, acompanhe indicadores e use os números com o que o Flowo faz de verdade.",
  },
];

export const GUIDES: GuideEntry[] = [
  {
    path: "/recursos/guias/guia-definitivo-agendamento",
    title: "Guia de agendamento para barbearias",
    description:
      "Configure serviços, horários gerais e individuais, confirmação e pagamento pós-atendimento no Flowo.",
    readTime: "10 min",
    category: "Agendamento",
    topics: ["Horários individuais", "Confirmação", "Pagamento pós-serviço"],
    group: "operacao",
    icon: "calendar",
    publishedTime: "2024-12-16T22:06:44.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/gerenciamento-equipe",
      "/recursos/guias/reduzindo-faltas",
      "/recursos/guias/configurando-whatsapp",
    ],
  },
  {
    path: "/recursos/guias/gerenciamento-equipe",
    title: "Gerenciamento de equipe para barbearias",
    description:
      "Cadastre profissionais, serviços, horários e folgas e entenda como funcionam disponibilidade e comissões.",
    readTime: "11 min",
    category: "Equipe",
    topics: ["Agendas individuais", "Folgas", "Comissões no Empresarial"],
    group: "operacao",
    icon: "users",
    publishedTime: "2024-12-16T22:06:44.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/escala-equipe",
      "/recursos/guias/guia-definitivo-agendamento",
      "/recursos/guias/relatorios-metricas",
    ],
  },
  {
    path: "/recursos/guias/reduzindo-faltas",
    title: "Como reduzir faltas na barbearia",
    description:
      "Use confirmação, lembrete, registro de no-show e lista de espera sem cancelar por silêncio ou cobrar sinal.",
    readTime: "9 min",
    category: "Faltas",
    topics: ["Confirmação", "No-show", "Lista de espera"],
    group: "operacao",
    icon: "bell",
    publishedTime: "2025-12-18T00:28:16.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/guia-definitivo-agendamento",
      "/recursos/guias/configurando-whatsapp",
      "/recursos/guias/fidelizacao-clientes",
    ],
  },
  {
    path: "/recursos/guias/escala-equipe",
    title: "Escala de equipe para barbearias",
    description:
      "Configure horários, serviços e folgas por profissional e saiba por que disponibilidade não significa rodízio.",
    readTime: "8 min",
    category: "Equipe",
    topics: ["Horários individuais", "Folgas", "Disponibilidade"],
    group: "operacao",
    icon: "users",
    publishedTime: "2026-02-21T04:45:31.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/gerenciamento-equipe",
      "/recursos/guias/guia-definitivo-agendamento",
      "/recursos/guias/relatorios-metricas",
    ],
  },
  {
    path: "/recursos/guias/configurando-whatsapp",
    title: "Como configurar o WhatsApp com IA",
    description:
      "Prepare o número, o nome público e a ativação oficial antes de atender e agendar clientes com a IA.",
    readTime: "9 min",
    category: "WhatsApp",
    topics: ["Ativação oficial", "Nome público", "Controle humano"],
    group: "relacionamento",
    icon: "message",
    publishedTime: "2025-12-18T00:28:16.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/guia-definitivo-agendamento",
      "/recursos/guias/reduzindo-faltas",
      "/recursos/guias/fidelizacao-clientes",
    ],
  },
  {
    path: "/recursos/guias/fidelizacao-clientes",
    title: "Fidelização de clientes para barbearias",
    description:
      "Use histórico, clientes em risco, campanhas e fidelidade com consentimento, limites e ativação claros.",
    readTime: "9 min",
    category: "Clientes",
    topics: ["Histórico", "Campanhas", "Fidelidade"],
    group: "relacionamento",
    icon: "message",
    publishedTime: "2026-02-21T04:45:31.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/configurando-whatsapp",
      "/recursos/guias/reduzindo-faltas",
      "/recursos/guias/aumentar-ticket-medio",
    ],
  },
  {
    path: "/recursos/guias/pagamentos-pix",
    title: "Pagamentos com PIX na barbearia",
    description:
      "Ative a conta de recebimento e feche comandas com dinheiro, PIX ou cartão depois do atendimento.",
    readTime: "10 min",
    category: "Pagamentos",
    topics: ["Comanda", "PIX e cartão", "Saldo disponível"],
    group: "gestao",
    icon: "credit-card",
    publishedTime: "2025-12-18T00:28:16.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/controle-financeiro-barbearia",
      "/recursos/guias/aumentar-ticket-medio",
      "/recursos/guias/relatorios-metricas",
    ],
  },
  {
    path: "/recursos/guias/controle-financeiro-barbearia",
    title: "Controle financeiro para barbearias",
    description:
      "Controle receita operacional, comandas, saldo e pagamentos sem confundir o Flowo com contabilidade completa.",
    readTime: "9 min",
    category: "Financeiro",
    topics: ["Comandas", "Saldo", "Limites contábeis"],
    group: "gestao",
    icon: "chart",
    publishedTime: "2026-02-21T04:45:31.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/pagamentos-pix",
      "/recursos/guias/relatorios-metricas",
      "/recursos/guias/aumentar-ticket-medio",
    ],
  },
  {
    path: "/recursos/guias/aumentar-ticket-medio",
    title: "Como aumentar o ticket médio da barbearia",
    description:
      "Organize combos, produtos e comandas e acompanhe o ticket médio sem prometer upsell automático.",
    readTime: "8 min",
    category: "Receita",
    topics: ["Combos", "Produtos", "Comanda"],
    group: "gestao",
    icon: "credit-card",
    publishedTime: "2026-02-21T04:45:31.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/pagamentos-pix",
      "/recursos/guias/controle-financeiro-barbearia",
      "/recursos/guias/fidelizacao-clientes",
    ],
  },
  {
    path: "/recursos/guias/relatorios-metricas",
    title: "Relatórios e métricas para barbearias",
    description:
      "Veja quais indicadores aparecem no Flowo, o que depende do plano e o que ainda exige cálculo complementar.",
    readTime: "9 min",
    category: "Métricas",
    topics: ["Receita concluída", "Clientes em risco", "Horários de pico"],
    group: "gestao",
    icon: "chart",
    publishedTime: "2025-12-18T00:28:16.000Z",
    modifiedTime: "2026-07-29T12:23:48.000Z",
    relatedPaths: [
      "/recursos/guias/controle-financeiro-barbearia",
      "/recursos/guias/aumentar-ticket-medio",
      "/recursos/guias/gerenciamento-equipe",
    ],
  },
  {
    path: "/recursos/guias/melhor-sistema-para-barbearia",
    title: "Melhor sistema para barbearia: como escolher",
    description:
      "Compare agenda, WhatsApp, aplicativo, equipe, financeiro, preço e implantação antes de escolher um sistema para sua barbearia.",
    readTime: "12 min",
    category: "Comparação",
    topics: ["Critérios de escolha", "Preço total", "Comparativo de sistemas"],
    group: "gestao",
    icon: "chart",
    publishedTime: "2026-07-31T00:00:00.000Z",
    modifiedTime: "2026-07-31T00:00:00.000Z",
    relatedPaths: [
      "/recursos/guias/guia-definitivo-agendamento",
      "/recursos/guias/gerenciamento-equipe",
      "/recursos/guias/controle-financeiro-barbearia",
    ],
  },
];

export const GUIDE_BY_PATH = Object.fromEntries(
  GUIDES.map((guide) => [guide.path, guide]),
) as Record<string, GuideEntry>;

export function getGuide(path: string): GuideEntry {
  const guide = GUIDE_BY_PATH[path];

  if (!guide) {
    throw new Error(`Guia não cadastrado: ${path}`);
  }

  return guide;
}
