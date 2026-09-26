import { PUBLIC_ENVIRONMENT } from "@/lib/environment";
import { resolveFlowoLegalContactEmails } from "./legal-contact-emails.mjs";

export const LEGAL_ENTITY = {
  name: "Devled Tecnologia e Consultoria LTDA",
  taxId: "49.034.715/0001-54",
  address:
    "Rua Carlos Augusto Cornelsen, 203, Loja 01, Bom Retiro, Curitiba/PR, CEP 80520-560",
  ...resolveFlowoLegalContactEmails({
    deploymentEnvironment: PUBLIC_ENVIRONMENT.deploymentEnvironment,
    contactEmail: process.env.NEXT_PUBLIC_FLOWO_SALES_EMAIL,
    supportEmail: process.env.NEXT_PUBLIC_FLOWO_SUPPORT_EMAIL,
    privacyEmail: process.env.NEXT_PUBLIC_FLOWO_PRIVACY_EMAIL,
  }),
} as const;

export const LEGAL_UPDATED_AT = "8 de setembro de 2026";
export const LEGAL_TERMS_UPDATED_AT = "29 de agosto de 2026";
