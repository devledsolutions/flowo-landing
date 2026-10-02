/** Average weeks in a month, used by every monthly projection on the site. */
export const WEEKS_PER_MONTH = 4.33;

/** Keeps a numeric input inside the range the calculator accepts. NaN falls to the minimum. */
export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);
}
