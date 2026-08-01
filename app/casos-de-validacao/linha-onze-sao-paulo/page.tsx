import { ValidationCasePage } from "@/components/marketing/validation-case-page";
import { getValidationCase } from "@/data/validation-cases";
import { buildMetadata } from "@/lib/seo";

const validationCase = getValidationCase("linha-onze-sao-paulo");

export const metadata = buildMetadata({
  title: "Caso de Validação: Barbearia Solo no WhatsApp",
  description:
    "Veja o fluxo validado da Flowo para uma barbearia solo: atendimento no WhatsApp, consulta de disponibilidade e agendamento confirmado.",
  path: `/casos-de-validacao/${validationCase.slug}`,
  type: "article",
  publishedTime: "2026-07-31",
  modifiedTime: "2026-07-31",
});

export default function LinhaOnzeValidationCasePage() {
  return <ValidationCasePage validationCase={validationCase} />;
}
