import { Calendar, MessageCircle, Shield, Star, Users } from 'lucide-react'

/**
 * SINGLE SOURCE OF TRUTH for Flowo pricing on the landing site.
 * Public commercial contract for the landing site. Solo and Equipe have
 * published prices. Empresarial is sales-assisted and deliberately carries no
 * public price; its negotiated value exists only in the authenticated product.
 * The public/default journey is pay-first. Sales can manually grant one
 * cardless 14-day assisted evaluation to eligible Solo or Equipe customers.
 * Any component or JSON-LD that shows a price MUST import from here.
 */

export type PlanId = 'solo' | 'equipe' | 'empresarial'
export type BillingCycle = 'monthly' | 'yearly'

interface BasePlan {
  id: PlanId
  name: string
  description: string
  isPopular?: boolean
  /** Verified plan facts (backend featureGates.ts + product spec §3a). */
  features: string[]
}

export interface PublishedPricePlan extends BasePlan {
  id: 'solo' | 'equipe'
  /** R$ per month, monthly billing. */
  monthly: number
  /** R$ per year, annual billing (equals 10x monthly: 2 months free). */
  annualTotal: number
  /** Rounded R$/month equivalent when billed annually. */
  annualPerMonth: number
  salesLed?: false
}

export interface SalesLedPlan extends BasePlan {
  id: 'empresarial'
  salesLed: true
  consultationLabel: string
}

export type Plan = PublishedPricePlan | SalesLedPlan

export const PRICE_VALID_UNTIL = '2026-12-31'
export const ANNUAL_DISCOUNT_LABEL = '2 meses grátis'
export const CURRENCY = 'BRL'

export const PLANS: readonly Plan[] = [
  {
    id: 'solo',
    name: 'Solo',
    description: 'Para o barbeiro que trabalha sozinho e quer a IA atendendo no WhatsApp.',
    monthly: 379,
    annualTotal: 3790,
    annualPerMonth: 316,
    features: [
      '1 profissional',
      'Até 200 agendamentos por mês',
      'IA no WhatsApp: atende, agenda e confirma',
      'Cancelamento pelo WhatsApp',
      'Lembretes e confirmação automática',
      'Pagamentos integrados opcionais',
      'Histórico de clientes',
      '50 mensagens de campanha por mês',
      'Suporte por e-mail',
    ],
  },
  {
    id: 'equipe',
    name: 'Equipe',
    description: 'Para barbearias com equipe: agenda de todos os barbeiros em um lugar.',
    monthly: 789,
    annualTotal: 7890,
    annualPerMonth: 658,
    isPopular: true,
    features: [
      'Até 5 profissionais',
      'Agendamentos ilimitados',
      'IA no WhatsApp: atende, agenda e confirma',
      'Cancelamento e remarcação pelo WhatsApp',
      'Sincronização com Google, Apple e Outlook',
      'Relatórios de faturamento',
      'Pagamentos integrados opcionais',
      '150 mensagens de campanha por mês',
      'Suporte por e-mail e WhatsApp',
    ],
  },
  {
    id: 'empresarial',
    name: 'Empresarial',
    description: 'Para redes, múltiplas unidades e operações que precisam de implantação acompanhada.',
    salesLed: true,
    consultationLabel: 'Sob consulta',
    features: [
      'Profissionais ilimitados',
      'Múltiplas unidades',
      'Agendamentos ilimitados',
      'IA no WhatsApp: atende, agenda e confirma',
      'Cancelamento e remarcação pelo WhatsApp',
      'Sincronização com Google, Apple e Outlook',
      'Relatórios de faturamento',
      'Pagamentos integrados opcionais',
      '1.000 mensagens de campanha por mês',
      'Suporte por e-mail, WhatsApp e telefone',
    ],
  },
] as const

export const PRICING = {
  currency: CURRENCY,
  priceValidUntil: PRICE_VALID_UNTIL,
  annualDiscountLabel: ANNUAL_DISCOUNT_LABEL,
  plans: PLANS,
} as const

export function getPlan(id: 'solo' | 'equipe'): PublishedPricePlan
export function getPlan(id: 'empresarial'): SalesLedPlan
export function getPlan(id: PlanId): Plan
export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id)
  if (!plan) throw new Error(`Unknown plan: ${id}`)
  return plan
}

/** "R$ 379" (pt-BR, no cents). */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Price for a cycle: monthly price, or the R$/month equivalent when annual. */
export function planPriceForCycle(plan: Plan, cycle: BillingCycle): number {
  if (plan.salesLed) {
    throw new Error('Sales-led plans do not have a public price')
  }
  return cycle === 'yearly' ? plan.annualPerMonth : plan.monthly
}

export function hasPublishedPrice(plan: Plan): plan is PublishedPricePlan {
  return plan.salesLed !== true
}

/* ------------------------------------------------------------------ */
/* Legacy shape kept so existing components compile until the redesign
   replaces them. Values are corrected; the assisted evaluation is
   sales-granted and must never be presented as an automatic trial.  */
/* ------------------------------------------------------------------ */

export const pricingPlans = PLANS.filter(hasPublishedPrice).map((plan) => ({
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
      'Cliente marca e cancela pelo chat; no Equipe, também remarca',
    ],
  },
  {
    icon: MessageCircle,
    title: 'Confirmação automática',
    description: 'Lembretes e confirmação pelo WhatsApp antes do horário marcado, sem esforço da equipe',
    benefits: [
      'Cliente confirma ou cancela respondendo à mensagem',
      'Menos cadeira vazia por esquecimento',
    ],
  },
  {
    icon: Calendar,
    title: 'Sync de calendários',
    description: 'No Equipe e Empresarial, conecte Google Calendar, Apple Calendar e Microsoft Outlook',
    benefits: [
      'Google sincroniza nos dois sentidos',
      'Apple e Outlook recebem os compromissos da Flowo',
    ],
  },
  {
    icon: Shield,
    title: 'Recebimento do seu jeito',
    description: 'Registre dinheiro e maquininha própria ou ative PIX e cartão Flowo',
    benefits: [
      'Pagamento integrado é opcional e pós-atendimento',
      'Conformidade com LGPD e dados protegidos',
    ],
  },
  {
    icon: Users,
    title: 'Suporte humanizado',
    description: 'Canais de suporte definidos conforme o plano contratado',
    benefits: [
      'Solo por e-mail; Equipe também pelo WhatsApp',
      'Empresarial inclui atendimento por telefone',
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
