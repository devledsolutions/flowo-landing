export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

const sensitiveKeyPattern = /(authorization|token|secret|password|senha|certificate|certificado|csc|cpf|cnpj|document|email|phone|telefone|card|cartao|pix|address|endereco|name|nome)/i;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const bearerPattern = /\bBearer\s+[A-Z0-9._~-]+/gi;
const credentialPattern = /\b(?:sess|sk|pk|tok|jwt)_[A-Z0-9_-]{8,}/gi;
const longDigitPattern = /(?<!\d)\+?\d(?:[\s().-]*\d){9,15}(?!\d)/g;

export type LandingTelemetryValue =
  | string
  | number
  | boolean
  | null
  | LandingTelemetryValue[]
  | { [key: string]: LandingTelemetryValue };

export type LandingTelemetryProperties = Record<string, LandingTelemetryValue>;

export const landingTelemetryDimensions: LandingTelemetryProperties = {
  surface: "landing",
  platform: "web",
  environment: process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT ?? "development",
  release:
    process.env.NEXT_PUBLIC_RELEASE ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    "unversioned",
};

export function redactLandingText(value: string): string {
  return value
    .replace(bearerPattern, "[Redacted credential]")
    .replace(credentialPattern, "[Redacted credential]")
    .replace(emailPattern, "[Redacted email]")
    .replace(longDigitPattern, "[Redacted number]");
}

export function redactLandingTelemetry(
  value: unknown,
  depth = 0,
): LandingTelemetryValue | undefined {
  if (depth > 6 || value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value === "string") return redactLandingText(value);
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) {
    return value
      .map((item) => redactLandingTelemetry(item, depth + 1))
      .filter((item): item is LandingTelemetryValue => item !== undefined);
  }
  if (typeof value !== "object") return redactLandingText(String(value));

  const output: Record<string, LandingTelemetryValue> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (sensitiveKeyPattern.test(key)) {
      output[key] = "[Redacted]";
      continue;
    }
    const redacted = redactLandingTelemetry(item, depth + 1);
    if (redacted !== undefined) output[key] = redacted;
  }
  return output;
}

export function sanitizeLandingError(error: unknown): Error {
  const original = error instanceof Error ? error : new Error(String(error));
  const sanitized = new Error(redactLandingText(original.message));
  sanitized.name = redactLandingText(original.name);
  if (original.stack) sanitized.stack = redactLandingText(original.stack);
  return sanitized;
}

export function buildLandingExceptionProperties(
  context: string,
  details?: Record<string, unknown>,
  level: "error" | "warning" = "error",
): LandingTelemetryProperties {
  return {
    ...landingTelemetryDimensions,
    source: "landing",
    context: redactLandingText(context),
    level,
    ...(details
      ? { details: redactLandingTelemetry(details) ?? {} }
      : {}),
  };
}

export function sanitizeLandingPostHogEvent<T extends {
  event?: string;
  properties?: Record<string, unknown>;
  $set?: Record<string, unknown>;
  $set_once?: Record<string, unknown>;
}>(event: T | null): T | null {
  if (!event) return event;
  const sanitizeProperties = (properties: Record<string, unknown> | undefined) => {
    const redacted = redactLandingTelemetry(properties);
    return redacted && typeof redacted === "object" && !Array.isArray(redacted)
      ? redacted as Record<string, unknown>
      : {};
  };

  if (event.properties) {
    const properties = sanitizeProperties(event.properties);
    for (const key of ["$current_url", "$initial_current_url", "$session_entry_url"]) {
      if (key in properties && typeof properties[key] === "string") {
        try {
          const url = new URL(properties[key] as string);
          properties[key] = `${url.origin}${url.pathname}`;
        } catch {
          properties[key] = "[Redacted url]";
        }
      }
    }
    event.properties = properties;
  }
  if (event.$set) event.$set = sanitizeProperties(event.$set);
  if (event.$set_once) event.$set_once = sanitizeProperties(event.$set_once);
  return event;
}
