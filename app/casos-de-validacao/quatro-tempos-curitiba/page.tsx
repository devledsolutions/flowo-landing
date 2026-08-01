import { ValidationCasePage } from "@/components/marketing/validation-case-page";
import { getValidationCase } from "@/data/validation-cases";
import { buildMetadata } from "@/lib/seo";

const validationCase = getValidationCase("quatro-tempos-curitiba");

export const metadata = buildMetadata({
  title: "Caso de Validação: Agenda de Barbearia com Equipe",
  description:
    "Veja como o fluxo validado da Flowo trata consulta, remarcação, cancelamento e controle humano em uma barbearia com equipe.",
  path: `/casos-de-validacao/${validationCase.slug}`,
  type: "article",
  publishedTime: "2026-07-31",
  modifiedTime: "2026-07-31",
});

export default function QuatroTemposValidationCasePage() {
  return <ValidationCasePage validationCase={validationCase} />;
}
