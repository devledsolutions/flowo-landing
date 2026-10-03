import { clampNumber, WEEKS_PER_MONTH } from "./shared";

export const WHATSAPP_OPPORTUNITY_LIMITS = {
  messagesPerDay: { min: 0, max: 300 },
  daysPerWeek: { min: 1, max: 7 },
  unansweredRate: { min: 0, max: 100 },
  averageTicket: { min: 0, max: 2_000 },
} as const;

export const WHATSAPP_OPPORTUNITY_NOTE =
  "É um cenário para priorizar uma revisão, não uma promessa de faturamento perdido. Confirme quantas conversas realmente viram atendimento.";

export type WhatsAppOpportunityInput = {
  messagesPerDay: number;
  daysPerWeek: number;
  /** Percentage from 0 to 100. */
  unansweredRate: number;
  /** Average ticket in reais. */
  averageTicket: number;
};

export type WhatsAppOpportunityResult = {
  monthlyMessages: number;
  conversationsToReview: number;
  /** Reference value in reais, not a loss estimate. */
  scenarioValue: number;
};

export function calculateWhatsAppOpportunity({
  messagesPerDay,
  daysPerWeek,
  unansweredRate,
  averageTicket,
}: WhatsAppOpportunityInput): WhatsAppOpportunityResult {
  const limits = WHATSAPP_OPPORTUNITY_LIMITS;
  const monthlyMessages =
    clampNumber(messagesPerDay, limits.messagesPerDay.min, limits.messagesPerDay.max) *
    clampNumber(daysPerWeek, limits.daysPerWeek.min, limits.daysPerWeek.max) *
    WEEKS_PER_MONTH;
  const conversationsToReview =
    monthlyMessages *
    (clampNumber(unansweredRate, limits.unansweredRate.min, limits.unansweredRate.max) / 100);
  return {
    monthlyMessages,
    conversationsToReview,
    scenarioValue:
      conversationsToReview *
      clampNumber(averageTicket, limits.averageTicket.min, limits.averageTicket.max),
  };
}
