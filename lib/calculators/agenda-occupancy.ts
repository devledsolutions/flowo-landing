import { clampNumber } from "./shared";

export const AGENDA_OCCUPANCY_LIMITS = {
  professionals: { min: 1, max: 50 },
  hoursPerDay: { min: 1, max: 16 },
  daysPerWeek: { min: 1, max: 7 },
  serviceMinutes: { min: 10, max: 240 },
  bookedPerWeek: { min: 0, max: 10_000 },
} as const;

export const AGENDA_OCCUPANCY_NOTE =
  "A conta não conhece folgas, encaixes, intervalos ou duração diferente por serviço. Use-a como ponto de conversa para organizar a agenda.";

export type AgendaOccupancyInput = {
  professionals: number;
  hoursPerDay: number;
  daysPerWeek: number;
  serviceMinutes: number;
  bookedPerWeek: number;
};

export type AgendaOccupancyResult = {
  weeklyCapacity: number;
  /** Percentage from 0 to 100. */
  occupancy: number;
  openSlots: number;
};

export function calculateAgendaOccupancy({
  professionals,
  hoursPerDay,
  daysPerWeek,
  serviceMinutes,
  bookedPerWeek,
}: AgendaOccupancyInput): AgendaOccupancyResult {
  const limits = AGENDA_OCCUPANCY_LIMITS;
  const weeklyCapacity =
    (clampNumber(professionals, limits.professionals.min, limits.professionals.max) *
      clampNumber(hoursPerDay, limits.hoursPerDay.min, limits.hoursPerDay.max) *
      60 *
      clampNumber(daysPerWeek, limits.daysPerWeek.min, limits.daysPerWeek.max)) /
    clampNumber(serviceMinutes, limits.serviceMinutes.min, limits.serviceMinutes.max);
  const booked = clampNumber(bookedPerWeek, limits.bookedPerWeek.min, limits.bookedPerWeek.max);
  const occupancy = weeklyCapacity ? (booked / weeklyCapacity) * 100 : 0;
  return {
    weeklyCapacity,
    occupancy: Math.min(100, Math.max(0, occupancy)),
    openSlots: Math.max(0, weeklyCapacity - booked),
  };
}
