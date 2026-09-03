import type { Metadata } from "next";
import { GrowthToolLanding } from "@/components/marketing/growth-tools/growth-tool-landing";
import { GrowthToolSchema } from "@/components/marketing/growth-tools/growth-tool-schema";
import { PlanSelector } from "@/components/marketing/growth-tools/business-tools";
import { buildMetadata } from "@/lib/seo";

const PATH = "/qual-plano-flowo";
const TITLE = "Qual Plano da Flowo Combina com a sua Barbearia?";
const DESCRIPTION = "Responda três perguntas e veja por onde começar entre Solo, Equipe e Empresarial, com as diferenças explicadas sem enrolação.";
const faqs = [
  { question: "A recomendação já é uma contratação?", answer: "Não. Ela só aponta um ponto de partida. Você ainda pode comparar os planos, falar com a gente e escolher o que faz sentido para a sua barbearia." },
  { question: "E se meus barbeiros tiverem horários diferentes?", answer: "O plano é só o primeiro passo. Os dias, turnos e folgas de cada barbeiro são configurados na implantação e podem ser ajustados depois." },
  { question: "Posso começar sozinho e crescer depois?", answer: "Sim. O Solo é para quem trabalha sozinho. Quando a equipe crescer, você passa para o Equipe e a agenda de todos fica no mesmo lugar." },
];
export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, absoluteTitle: true });

export default function PlanSelectorPage() {
  return (
    <>
      <GrowthToolSchema path={PATH} title={TITLE} description={DESCRIPTION} name="Escolha guiada de plano Flowo" faqs={faqs} />
      <GrowthToolLanding content={{
        kind: "plan",
        campaign: true,
        navCta: "Ver preços",
        kicker: "Escolha guiada para a rotina da barbearia",
        title: <>O plano certo começa pelo jeito que vocês trabalham.</>,
        lead: "Responda três perguntas sobre equipe, número de WhatsApp e prioridade. A recomendação aparece na hora, sem cadastro.",
        trust: ["Solo, Equipe ou Empresarial", "Sem cartão para descobrir", "Preços claros antes do cadastro"],
        tool: <PlanSelector />,
        problemLabel: "Preço sem contexto vira comparação rasa.",
        problemTitle: "O plano precisa caber na rotina, não só na tabela.",
        problemCopy: "Um barbeiro sozinho e uma barbearia com vários barbeiros não começam pelo mesmo lugar. Agenda, WhatsApp e fechamento mudam de um para o outro.",
        sectionLabel: "Como escolher sem complicar",
        sectionTitle: "Comece pelo que você quer organizar primeiro.",
        sectionCopy: "Veja o que cada plano resolve. Fale com a gente se tiver uma exceção, mais de uma unidade ou uma regra própria.",
        steps: [
          { title: "Conte quem atende", copy: "Só quem vai usar a agenda de verdade, não quem só aparece no quadro." },
          { title: "Explique o número", copy: "Todo mundo chega pelo mesmo WhatsApp ou cada barbeiro tem o seu?" },
          { title: "Escolha a primeira dor", copy: "Agenda, equipe ou caixa? Uma prioridade por vez ajuda a começar sem configurar demais." },
          { title: "Veja os detalhes", copy: "Compare o plano recomendado com os outros e tire dúvidas antes de contratar." },
        ],
        materialTitle: "Guia de Gestão da Barbearia",
        materialSubtitle: "Um plano de 30 dias para organizar a barbearia sem tentar mudar tudo de uma vez.",
        materialItems: ["Agenda e atendimento no mesmo lugar.", "Equipe, comissões e responsabilidades.", "Caixa e recebimentos com contexto.", "O próximo passo para começar pequeno."],
        formTitle: "Receba o guia para organizar a primeira semana.",
        formCopy: "O material ajuda a levar a recomendação para uma conversa prática com quem atende, fecha o caixa e cuida dos clientes.",
        formNotes: ["PDF curto e prático.", "Você não precisa contratar para usar.", "Marketing e WhatsApp são opcionais."],
        formConfig: { resourceId: "guia_gestao_barbearia", resourceUrl: "/downloads/guia-completo-barbearia.pdf", source: "download:qual-plano-flowo", submitLabel: "Receber meu guia", successTitle: "Seu guia de gestão está pronto.", productCtaLabel: "Comparar os planos da Flowo", productCtaHref: "/precos" },
        faqs,
      }} />
    </>
  );
}
