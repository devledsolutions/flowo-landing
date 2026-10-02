export const RETURN_SERVICES = {
  corte: "corte",
  barba: "barba",
  corte_e_barba: "corte e barba",
  outro: "procedimento",
} as const;

export type ReturnService = keyof typeof RETURN_SERVICES;
export type ReturnTone = "proximo" | "direto";

export const RETURN_INTERVAL_LIMITS = { min: 1, max: 365 } as const;
export const RETURN_ADVANCE_LIMITS = { min: 0, max: 60 } as const;

export const RETURN_PLANNER_NOTE =
  "Revise consentimento, agendamento futuro e conversas abertas antes de enviar. O intervalo é uma referência informada por você, não uma regra para todos os clientes.";

export type ReturnPlanInput = {
  /** Last visit as YYYY-MM-DD (calendar date, no time zone). */
  lastVisit: string;
  intervalDays: number;
  advanceDays: number;
  service: ReturnService;
  tone: ReturnTone;
};

export type ReturnPlan = {
  /** Estimated return date, YYYY-MM-DD. */
  returnDate: string;
  /** Suggested date to review the contact, YYYY-MM-DD. */
  contactDate: string;
  message: string;
};

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function isoFromUtcMs(ms: number): string {
  const date = new Date(ms);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** Midnight UTC of a YYYY-MM-DD string, or null when it is not a real calendar date. */
export function parseIsoDate(value: string): number | null {
  const match = ISO_DATE.exec(value);
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const ms = Date.UTC(year, month - 1, day);
  return isoFromUtcMs(ms) === value ? ms : null;
}

export function isValidIsoDate(value: string): boolean {
  return parseIsoDate(value) !== null;
}

/**
 * Calendar date in the visitor's own time zone. `toISOString()` would use UTC
 * and move the date one day ahead after 21:00 in Brazil.
 */
export function localIsoDate(now: Date = new Date(), daysAgo = 0): string {
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function returnMessage(service: ReturnService, tone: ReturnTone): string {
  const noun = RETURN_SERVICES[service];
  return tone === "direto"
    ? `Olá! Aqui é da [nome da barbearia]. Pela data do seu último ${noun}, pode estar chegando a hora de cuidar do visual de novo. Quer que eu consulte os horários? Se não quiser receber este tipo de lembrete, é só avisar.`
    : `Oi! Tudo bem? Aqui é da [nome da barbearia]. Lembramos do seu último ${noun} e queríamos saber se faz sentido ver um próximo horário. Posso consultar a agenda para você? Se preferir não receber lembretes, é só falar.`;
}

function wholeDays(value: number, min: number, max: number): number {
  const days = Number.isFinite(value) ? Math.floor(value) : min;
  return Math.min(Math.max(days, min), max);
}

/** Returns null when `lastVisit` is not a valid YYYY-MM-DD date. */
export function planReturn({
  lastVisit,
  intervalDays,
  advanceDays,
  service,
  tone,
}: ReturnPlanInput): ReturnPlan | null {
  const base = parseIsoDate(lastVisit);
  if (base === null) return null;
  const interval = wholeDays(intervalDays, RETURN_INTERVAL_LIMITS.min, RETURN_INTERVAL_LIMITS.max);
  const advance = wholeDays(advanceDays, RETURN_ADVANCE_LIMITS.min, RETURN_ADVANCE_LIMITS.max);
  const target = base + interval * DAY_MS;
  return {
    returnDate: isoFromUtcMs(target),
    contactDate: isoFromUtcMs(target - advance * DAY_MS),
    message: returnMessage(service, tone),
  };
}
