import type { LucideIcon } from "lucide-react"
import { CalendarCheck2, CreditCard, MessageCircle, Users } from "lucide-react"

/**
 * Social-proof content, HONESTY-LOCKED.
 *
 * Flowo não publica métricas agregadas de clientes. Nada neste módulo pode
 * afirmar um resultado medido (percentuais, R$, contagem de clientes, notas).
 * Dois tipos de conteúdo são permitidos:
 *   1. productFacts / noShowMechanism / beforeAfterFlowo: capacidades
 *      verificáveis, espelhadas do product spec e de data/pricing-data.ts.
 *   2. illustrativeScenarios: exemplos de uso claramente rotulados, sem
 *      números e sem nomes fictícios de clientes.
 * Quando existirem dados auditáveis de casos reais, adicione aqui com fonte.
 */

export const ILLUSTRATIVE_LABEL = "Cenários ilustrativos"

export const ILLUSTRATIVE_NOTE =
  "Exemplos de uso do produto. Não são casos reais de clientes nem promessa de resultado."

export interface ProductFact {
  icon: LucideIcon
  title: string
  detail: string
}

/** O que o Flowo faz, sem número inventado. Espelha data/pricing-data.ts. */
export const productFacts: readonly ProductFact[] = [
  {
    icon: MessageCircle,
    title: "A IA atende no WhatsApp",
    detail:
      "Responde na hora, entende o pedido e agenda sozinha, mesmo com a barbearia cheia.",
  },
  {
    icon: CalendarCheck2,
    title: "Confirmação automática",
    detail:
      "Lembrete antes do horário. O cliente confirma, remarca ou cancela respondendo a mensagem.",
  },
  {
    icon: CreditCard,
    title: "Pagamento no atendimento",
    detail:
      "PIX e cartão para cobrar o atendimento, direto pelo chat ou na comanda. Nunca como condição para agendar.",
  },
  {
    icon: Users,
    title: "Agenda da equipe em um lugar",
    detail:
      "Cada barbeiro vê a própria agenda, sincronizada com Google, Apple e Outlook.",
  },
]

export interface MechanismStep {
  title: string
  detail: string
}

/** Como o Flowo combate a cadeira vazia: confirmação, nunca sinal. */
export const noShowMechanism: readonly MechanismStep[] = [
  {
    title: "Lembrete automático",
    detail:
      "Antes do horário, o Flowo manda a mensagem de confirmação pelo WhatsApp.",
  },
  {
    title: "O cliente responde no chat",
    detail:
      "Confirma, remarca ou cancela sem ligar e sem interromper a equipe.",
  },
  {
    title: "A agenda se ajusta sozinha",
    detail:
      "Cancelou? O horário volta a ficar disponível para outro cliente na hora.",
  },
]

export interface IllustrativeScenario {
  id: "solo" | "equipe" | "rede"
  name: string
  story: string
  image: string
  imageAlt: string
}

/** Cenários de uso claramente rotulados. Sem números, sem clientes fictícios. */
export const illustrativeScenarios: readonly IllustrativeScenario[] = [
  {
    id: "solo",
    name: "O barbeiro que trabalha sozinho",
    story:
      "Cada mensagem era um corte interrompido. Com a IA respondendo e agendando no WhatsApp, o celular fica no bolso e a agenda se preenche sem parar a tesoura.",
    image:
      "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Máquina de cortar cabelo em close sobre a bancada",
  },
  {
    id: "equipe",
    name: "A barbearia com equipe",
    story:
      "O cliente escolhe o profissional no chat e cada barbeiro vê a própria agenda, sincronizada no celular. Ninguém marca em cima de ninguém.",
    image:
      "https://images.unsplash.com/photo-1536520002442-39764a41e987?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Fileira de cadeiras clássicas sob luminárias industriais numa barbearia de piso de madeira",
  },
  {
    id: "rede",
    name: "A rede com várias unidades",
    story:
      "Unidades no mesmo padrão de atendimento, com relatórios de faturamento para acompanhar o todo sem depender de planilha.",
    image:
      "https://images.unsplash.com/photo-1621645582931-d1d3e6564943?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Cadeira de barbeiro preta e cromada, retrato de objeto",
  },
]

export interface ComparisonPair {
  before: string
  after: string
}

/** Antes e depois qualitativo, capacidade verificável, sem métricas. */
export const beforeAfterFlowo: readonly ComparisonPair[] = [
  {
    before: "O WhatsApp toca enquanto você corta e o cliente fica sem resposta.",
    after: "A IA responde na hora e agenda sem interromper o corte.",
  },
  {
    before: "Cliente esquece o horário e a cadeira fica vazia.",
    after: "Confirmação automática pelo WhatsApp antes de cada horário.",
  },
  {
    before: "Agenda no caderno e cada barbeiro com um controle diferente.",
    after: "Agenda da equipe em um lugar só, sincronizada no celular.",
  },
  {
    before: "Cobrança no dinheiro trocado ou no fiado.",
    after: "PIX e cartão no atendimento, registrado na comanda.",
  },
]
