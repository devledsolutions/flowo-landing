import { ValidationCasePage } from "@/components/marketing/validation-case-page";
import { getValidationCase } from "@/data/validation-cases";
import { buildMetadata } from "@/lib/seo";

const validationCase = getValidationCase("quatro-tempos-curitiba");

export const metadata = buildMetadata({
  title: "Agenda de Barbearia com Equipe e IA",
  description:
    "Barbearia com equipe: a Flowo remarca na agenda do barbeiro certo e passa a conversa para a recepção quando precisa. Veja a conversa e a agenda.",
  path: `/casos-de-validacao/${validationCase.slug}`,
  type: "article",
  publishedTime: "2026-07-31",
  modifiedTime: "2026-09-03",
});

export default function QuatroTemposValidationCasePage() {
  return <ValidationCasePage validationCase={validationCase} />;
}
