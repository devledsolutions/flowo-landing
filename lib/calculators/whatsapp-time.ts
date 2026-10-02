import { clampNumber, WEEKS_PER_MONTH } from "./shared";

export const WHATSAPP_TIME_LIMITS = {
  messagesPerDay: { min: 0, max: 300 },
  minutesPerMessage: { min: 0.5, max: 15 },
  daysPerWeek: { min: 1, max: 7 },
  serviceMinutes: { min: 10, max: 240 },
} as const;

export const WHATSAPP_TIME_NOTE =
  "Estimativa baseada somente nos dados informados. Ela mede tempo, não faturamento nem horários efetivamente perdidos.";

export type WhatsAppTimeInput = {
  messagesPerDay: number;
  minutesPerMessage: number;
  daysPerWeek: number;
  serviceMinutes: number;
};

export type WhatsAppTimeResult = {
  weeklyHours: number;
  monthlyHours: number;
  serviceSlots: number;
};

export function calculateWhatsAppTime({
  messagesPerDay,
  minutesPerMessage,
  daysPerWeek,
  serviceMinutes,
}: WhatsAppTimeInput): WhatsAppTimeResult {
  const limits = WHATSAPP_TIME_LIMITS;
  const dailyMinutes =
    clampNumber(messagesPerDay, limits.messagesPerDay.min, limits.messagesPerDay.max) *
    clampNumber(minutesPerMessage, limits.minutesPerMessage.min, limits.minutesPerMessage.max);
  const weeklyHours =
    (dailyMinutes * clampNumber(daysPerWeek, limits.daysPerWeek.min, limits.daysPerWeek.max)) / 60;
  const monthlyHours = weeklyHours * WEEKS_PER_MONTH;
  const serviceSlots = Math.floor(
    (monthlyHours * 60) /
      clampNumber(serviceMinutes, limits.serviceMinutes.min, limits.serviceMinutes.max),
  );
  return { weeklyHours, monthlyHours, serviceSlots };
}
