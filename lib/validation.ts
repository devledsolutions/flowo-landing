import { z } from "zod";

function trimOrEmpty(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

const whatsappSchema = z
  .string()
  .trim()
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }, "Informe um WhatsApp válido.");

export const leadCaptureSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .optional()
    .or(z.literal("")),
  whatsapp: whatsappSchema.optional().or(z.literal("")),
  source: z.string().trim().min(1).max(120),
  requestedResource: z.string().trim().max(120).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  consent: z.literal(true),
  emailMarketingConsent: z.boolean().optional(),
  smsMarketingConsent: z.boolean().optional(),
  // Backward-compatible while older cached clients finish rolling over.
  marketingConsent: z.boolean().optional(),
  landingPath: z.string().trim().max(300).optional().or(z.literal("")),
  referrer: z.string().trim().max(500).optional().or(z.literal("")),
  utmSource: z.string().trim().max(100).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(100).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(150).optional().or(z.literal("")),
  utmContent: z.string().trim().max(150).optional().or(z.literal("")),
  utmTerm: z.string().trim().max(150).optional().or(z.literal("")),
  fbclid: z.string().trim().max(300).optional().or(z.literal("")),
  fbc: z.string().trim().max(300).optional().or(z.literal("")),
  fbp: z.string().trim().max(300).optional().or(z.literal("")),
  gclid: z.string().trim().max(300).optional().or(z.literal("")),
  gbraid: z.string().trim().max(300).optional().or(z.literal("")),
  wbraid: z.string().trim().max(300).optional().or(z.literal("")),
  msclkid: z.string().trim().max(300).optional().or(z.literal("")),
  ttclid: z.string().trim().max(300).optional().or(z.literal("")),
  segmentAnonymousId: z.string().trim().max(200).optional().or(z.literal("")),
  turnstileToken: z
    .string()
    .trim()
    .max(4096)
    .optional()
    .or(z.literal("")),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  message: z.string().trim().min(10).max(2000),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  turnstileToken: z
    .string()
    .trim()
    .max(4096)
    .optional()
    .or(z.literal("")),
});

export function getValidationMessage(error: z.ZodError): string {
  const firstIssue = error.issues[0];
  return firstIssue?.message || "Dados inválidos.";
}

export function getHoneypotValue(input: unknown): string {
  if (!input || typeof input !== "object") return "";
  const record = input as Record<string, unknown>;
  return trimOrEmpty(record.company || record.website || record.hp || record.honeypot);
}
