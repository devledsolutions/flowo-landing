import { ValidationCasePage } from "@/components/marketing/validation-case-page";
import { getValidationCase } from "@/data/validation-cases";
import { buildMetadata } from "@/lib/seo";

const validationCase = getValidationCase("linha-onze-sao-paulo");

export const metadata = buildMetadata({
  title: "Barbeiro Solo com IA no WhatsApp",
  description:
    "Barbeiro que trabalha sozinho: a Flowo responde no WhatsApp, olha a agenda e confirma o horário. Veja a conversa e a agenda.",
  path: `/casos-de-validacao/${validationCase.slug}`,
  type: "article",
  publishedTime: "2026-07-31",
  modifiedTime: "2026-09-03",
});

export default function LinhaOnzeValidationCasePage() {
  return <ValidationCasePage validationCase={validationCase} />;
}
