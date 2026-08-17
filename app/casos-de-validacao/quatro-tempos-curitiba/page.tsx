import { ValidationCasePage } from "@/components/marketing/validation-case-page";
import { getValidationCase } from "@/data/validation-cases";
import { buildMetadata } from "@/lib/seo";

const validationCase = getValidationCase("quatro-tempos-curitiba");

export const metadata = buildMetadata({
  title: "Agenda de Barbearia com Equipe e IA",
  description:
    "Veja como a Flowo organiza horários por profissional, atende no WhatsApp e mantém a recepção no controle da agenda.",
  path: `/casos-de-validacao/${validationCase.slug}`,
  type: "article",
  publishedTime: "2026-07-31",
  modifiedTime: "2026-07-31",
});

export default function QuatroTemposValidationCasePage() {
  return <ValidationCasePage validationCase={validationCase} />;
}
