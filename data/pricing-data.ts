import { Calendar, MessageCircle, Shield, Star, Users } from 'lucide-react'

/**
 * SINGLE SOURCE OF TRUTH for Flowo pricing on the landing site.
 * Values mirror the app backend (packages/backend convex subscriptions/constants.ts,
 * TIER_PRICING v3) and docs/product/flowo-product-spec.md:
 *   Solo R$249/mês (anual R$2.490), Equipe R$549/mês (anual R$5.490),
 *   Empresarial R$1.049/mês (anual R$10.490). Anual = 2 meses grátis.
 * No trials, no deposits: Flowo is pay-first, subscribers-only.
 * Any component or JSON-LD that shows a price MUST import from here.
 */

export type PlanId = 'solo' | 'equipe' | 'empresarial'
export type BillingCycle = 'monthly' | 'yearly'

export interface Plan {
  id: PlanId
  name: string
  description: string
  /** R$ per month, monthly billing. */
  monthly: number
  /** R$ per year, annual billing (equals 10x monthly: 2 months free). */
  annualTotal: number
  /** Rounded R$/month equivalent when billed annually (matches the app's rounding). */
  annualPerMonth: number
  isPopular?: boolean
  /** Verified plan facts (backend featureGates.ts + product spec §3a). */
  features: string[]
  /** Sales-assisted plan (Empresarial): CTA is "falar com a gente", not checkout. */
  salesLed?: boolean
}

export const PRICE_VALID_UNTIL = '2026-12-31'
export const ANNUAL_DISCOUNT_LABEL = '2 meses grátis'
export const CURRENCY = 'BRL'

export const PLANS: readonly Plan[] = [
  {
    id: 'solo',
    name: 'Solo',
    description: 'Para o barbeiro que trabalha sozinho e quer a IA atendendo no WhatsApp.',
    monthly: 249,
    annualTotal: 2490,
    annualPerMonth: 208,
    features: [
      '1 profissional',
      'Até 200 agendamentos por mês',
      'IA no WhatsApp: atende, agenda e confirma',
      'Lembretes e confirmação automática',
      'Pagamento no atendimento por PIX ou cartão',
      'Histórico de clientes',
      '50 mensagens de campanha por mês',
    ],
  },
  {
    id: 'equipe',
    name: 'Equipe',
    description: 'Para barbearias com equipe: agenda de todos os barbeiros em um lugar.',
    monthly: 549,
    annualTotal: 5490,
    annualPerMonth: 458,
    isPopular: true,
    features: [
      'Até 5 profissionais',
      'Agendamentos ilimitados',
      'IA no WhatsApp: atende, agenda e confirma',
      'Sincronização com Google, Apple e Outlook',
      'Remarcação pelo WhatsApp',
      'Relatórios de faturamento',
      '150 mensagens de campanha por mês',
    ],
  },
  {
    id: 'empresarial',
    name: 'Empresarial',
    description: 'Para redes e barbearias de alto volume, com várias unidades.',
    monthly: 1049,
    annualTotal: 10490,
    annualPerMonth: 875,
    salesLed: true,
    features: [
      'Profissionais ilimitados',
      'Múltiplas unidades',
      'Agendamentos ilimitados',
      'IA no WhatsApp: atende, agenda e confirma',
      'Relatórios de faturamento',
      '1.000 mensagens de campanha por mês',
      'Atendimento próximo do time Flowo',
    ],
  },
] as const

export const PRICING = {
  currency: CURRENCY,
  priceValidUntil: PRICE_VALID_UNTIL,
  annualDiscountLabel: ANNUAL_DISCOUNT_LABEL,
  plans: PLANS,
} as const

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id)
  if (!plan) throw new Error(`Unknown plan: ${id}`)
  return plan
}

/** "R$ 249" (pt-BR, no cents). */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Price for a cycle: monthly price, or the R$/month equivalent when annual. */
export function planPriceForCycle(plan: Plan, cycle: BillingCycle): number {
  return cycle === 'yearly' ? plan.annualPerMonth : plan.monthly
}

/* ------------------------------------------------------------------ */
/* Legacy shape kept so existing components compile until the redesign
   replaces them. Values are corrected; DO NOT reintroduce trials.     */
/* ------------------------------------------------------------------ */

export const pricingPlans = PLANS.map((plan) => ({
  name: plan.name,
  description: plan.description,
  monthlyPrice: plan.monthly,
  yearlyPrice: plan.annualPerMonth,
  isPopular: plan.isPopular,
  features: [...plan.features],
}))

export const featuredResources = [
  {
    icon: Star,
    title: 'IA que atende como gente',
    description: 'Atendimento no WhatsApp 24/7 que entende linguagem natural e agenda automaticamente',
    benefits: [
      'Resposta em segundos, mesmo com a barbearia cheia',
      'Cliente marca, remarca e cancela pelo chat',
    ],
  },
  {
    icon: MessageCircle,
    title: 'Confirmação automática',
    description: 'Lembretes e confirmação pelo WhatsApp antes do horário marcado, sem esforço da equipe',
    benefits: [
      'Cliente confirma, remarca ou cancela respondendo a mensagem',
      'Menos cadeira vazia por esquecimento',
    ],
  },
  {
    icon: Calendar,
    title: 'Sync de calendários',
    description: 'Integração automática com Google Calendar, Apple Calendar e Microsoft Outlook',
    benefits: [
      'Agendamentos no seu celular',
      'Evita conflitos de horário',
    ],
  },
  {
    icon: Shield,
    title: 'Pagamento no atendimento',
    description: 'PIX e cartão para cobrar o atendimento, sem o cliente precisar de dinheiro na mão',
    benefits: [
      'Cobrança direto pelo chat ou na comanda',
      'Conformidade com LGPD e dados protegidos',
    ],
  },
  {
    icon: Users,
    title: 'Suporte humanizado',
    description: 'Equipe brasileira disponível para garantir seu sucesso com o Flowo',
    benefits: [
      'Atendimento em português',
      'Ajuda na configuração inicial',
    ],
  },
]

export const trustSignals = [
  {
    icon: 'Shield',
    title: 'Segurança de dados',
    description: 'Seus dados e os dos seus clientes protegidos',
  },
  {
    icon: 'ThumbsUp',
    title: 'Sem fidelidade',
    description: 'Cancele quando quiser, sem multa',
  },
  {
    icon: 'CreditCard',
    title: 'Pagamento seguro',
    description: 'Assinatura por PIX ou cartão',
  },
]
