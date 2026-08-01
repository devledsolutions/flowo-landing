import { ValidationCasePage } from "@/components/marketing/validation-case-page";
import { getValidationCase } from "@/data/validation-cases";
import { buildMetadata } from "@/lib/seo";

const validationCase = getValidationCase("linha-onze-sao-paulo");

export const metadata = buildMetadata({
  title: "Barbearia Solo com IA no WhatsApp",
  description:
    "Veja como a Flowo atende no WhatsApp, consulta a disponibilidade e confirma agendamentos para quem trabalha sozinho.",
  path: `/casos-de-validacao/${validationCase.slug}`,
  type: "article",
  publishedTime: "2026-07-31",
  modifiedTime: "2026-07-31",
});

export default function LinhaOnzeValidationCasePage() {
  return <ValidationCasePage validationCase={validationCase} />;
}
