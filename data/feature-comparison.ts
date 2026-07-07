/**
 * Feature comparison for /precos. Every row derives from the verified plan
 * facts in data/pricing-data.ts (mirrored from the app backend featureGates
 * and the product spec). No invented tiers, fees, SLAs or integrations.
 */

export interface FeatureComparisonItem {
  name: string;
  solo: string | boolean;
  equipe: string | boolean;
  empresarial: string | boolean;
  /** Short clarification rendered visibly under the feature name. */
  note?: string;
}

export const featureComparison: Record<string, FeatureComparisonItem[]> = {
  "Equipe e agenda": [
    {
      name: "Profissionais",
      solo: "1",
      equipe: "Até 5",
      empresarial: "Ilimitados",
    },
    {
      name: "Agendamentos por mês",
      solo: "200",
      equipe: "Ilimitados",
      empresarial: "Ilimitados",
    },
    {
      name: "Unidades",
      solo: "1",
      equipe: "1",
      empresarial: "Múltiplas",
    },
    {
      name: "Histórico de clientes",
      solo: true,
      equipe: true,
      empresarial: true,
      note: "Serviços anteriores, preferências e contato de cada cliente",
    },
  ],
  "IA no WhatsApp": [
    {
      name: "IA que atende, agenda e confirma",
      solo: true,
      equipe: true,
      empresarial: true,
      note: "A IA responde seus clientes e marca o horário na própria conversa",
    },
    {
      name: "Lembretes e confirmação automática",
      solo: true,
      equipe: true,
      empresarial: true,
      note: "O cliente confirma o horário respondendo no WhatsApp",
    },
    {
      name: "Remarcação pelo WhatsApp",
      solo: false,
      equipe: true,
      empresarial: true,
      note: "O cliente remarca ou cancela direto na conversa",
    },
    {
      name: "Mensagens de campanha por mês",
      solo: "50",
      equipe: "150",
      empresarial: "1.000",
      note: "Mensagens promocionais para a sua base de clientes",
    },
  ],
  Pagamentos: [
    {
      name: "Pagamento no atendimento",
      solo: true,
      equipe: true,
      empresarial: true,
      note: "O cliente paga o atendimento por PIX ou cartão",
    },
  ],
  Calendários: [
    {
      name: "Google Calendar",
      solo: false,
      equipe: true,
      empresarial: true,
      note: "Sincronização automática da agenda",
    },
    {
      name: "Apple Calendar (iCloud)",
      solo: false,
      equipe: true,
      empresarial: true,
    },
    {
      name: "Microsoft Outlook",
      solo: false,
      equipe: true,
      empresarial: true,
    },
  ],
  "Relatórios e acompanhamento": [
    {
      name: "Relatórios de faturamento",
      solo: false,
      equipe: true,
      empresarial: true,
    },
    {
      name: "Atendimento próximo do time Flowo",
      solo: false,
      equipe: false,
      empresarial: true,
    },
  ],
};
