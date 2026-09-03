import type { Metadata } from "next";
import { GrowthToolLanding } from "@/components/marketing/growth-tools/growth-tool-landing";
import { GrowthToolSchema } from "@/components/marketing/growth-tools/growth-tool-schema";
import { ManagementDiagnostic } from "@/components/marketing/growth-tools/business-tools";
import { buildMetadata } from "@/lib/seo";

const PATH = "/raio-x-gestao-barbearia";
const TITLE = "Raio-X da Gestão da Barbearia: Onde Começar? | Flowo";
const DESCRIPTION = "Responda cinco perguntas sobre WhatsApp, agenda, equipe, caixa e retorno de clientes para escolher a primeira melhoria da sua barbearia.";
const faqs = [
  { question: "Preciso conhecer a Flowo para fazer o Raio-X?", answer: "Não. O diagnóstico é uma ferramenta de organização e pode ser usado por qualquer barbearia." },
  { question: "O resultado é uma auditoria completa?", answer: "Não. Ele aponta um ponto de partida. A operação real deve ser revisada com a equipe e com os dados disponíveis." },
  { question: "O que faço depois?", answer: "Baixe o guia, escolha uma rotina e acompanhe a mudança por sete dias. Se quiser, compare como a Flowo conecta atendimento, agenda e operação." },
];
export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, absoluteTitle: true });

export default function ManagementDiagnosticPage() {
  return (
    <>
      <GrowthToolSchema path={PATH} title={TITLE} description={DESCRIPTION} name="Raio-X da gestão da barbearia" faqs={faqs} />
      <GrowthToolLanding content={{
        kind: "diagnostic",
        campaign: true,
        navCta: "Receber o guia",
        kicker: "Raio-X gratuito para a rotina da barbearia",
        title: <>Antes de trocar tudo, descubra o que merece atenção primeiro.</>,
        lead: "Cinco perguntas sobre atendimento, agenda, equipe, caixa e retorno. O resultado aponta uma mudança possível para esta semana.",
        trust: ["5 perguntas", "Resultado imediato", "Sem diagnóstico inventado"],
        tool: <ManagementDiagnostic />,
        problemLabel: "A operação não precisa de mais uma lista genérica.",
        problemTitle: "Precisa de uma primeira decisão que a equipe consiga cumprir.",
        problemCopy: "O Raio-X foi desenhado para uma barbearia de verdade: informal quando precisa, profissional na hora de assumir uma responsabilidade.",
        sectionLabel: "Como transformar resposta em ação",
        sectionTitle: "Uma conversa boa termina com uma próxima ação clara.",
        sectionCopy: "Leve o resultado para quem atende, organiza os horários e fecha o dia. O objetivo não é marcar tudo como urgente.",
        steps: [
          { title: "Responda como é hoje", copy: "Não escolha a resposta ideal. O valor está em registrar onde a rotina realmente aperta." },
          { title: "Escolha um dono", copy: "Toda mudança precisa de alguém para conferir, mesmo que seja você no começo." },
          { title: "Faça uma semana", copy: "Use o guia para testar uma regra simples antes de comprar outra ferramenta." },
          { title: "Conecte o que repetir", copy: "Quando a rotina ficar clara, veja o que pode entrar na agenda e no atendimento da Flowo." },
        ],
        materialTitle: "Guia de Gestão da Barbearia",
        materialSubtitle: "Plano de 30 dias para transformar o Raio-X em pequenas melhorias acompanháveis.",
        materialItems: ["Mapa de atendimento e agenda.", "Rotina de equipe e fechamento.", "Perguntas para revisar o caixa.", "Plano de ação sem excesso de ferramenta."],
        formTitle: "Receba o plano para continuar o Raio-X.",
        formCopy: "O PDF organiza as respostas em uma sequência que você consegue levar para a equipe e revisar no fim da semana.",
        formNotes: ["Resultado do diagnóstico aparece antes do formulário.", "PDF gratuito e direto.", "Você decide se quer falar com a Flowo depois."],
        formConfig: { resourceId: "guia_gestao_barbearia", resourceUrl: "/downloads/guia-completo-barbearia.pdf", source: "download:raio-x-gestao-barbearia", submitLabel: "Receber meu plano", successTitle: "Seu plano está pronto.", productCtaLabel: "Ver a Flowo em funcionamento", productCtaHref: "/" },
        faqs,
      }} />
    </>
  );
}
