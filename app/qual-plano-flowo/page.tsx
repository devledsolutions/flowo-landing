import type { Metadata } from "next";
import { GrowthToolLanding } from "@/components/marketing/growth-tools/growth-tool-landing";
import { GrowthToolSchema } from "@/components/marketing/growth-tools/growth-tool-schema";
import { PlanSelector } from "@/components/marketing/growth-tools/business-tools";
import { buildMetadata } from "@/lib/seo";

const PATH = "/qual-plano-flowo";
const TITLE = "Qual Plano da Flowo Combina com a sua Barbearia?";
const DESCRIPTION = "Responda três perguntas e veja um ponto de partida entre Solo, Equipe e Empresarial, com as diferenças explicadas sem enrolação.";
const faqs = [
  { question: "A recomendação é uma contratação automática?", answer: "Não. Ela só organiza a conversa. Você ainda pode comparar planos, falar com o time e escolher o que faz sentido para a operação." },
  { question: "E se eu tiver profissionais com horários diferentes?", answer: "A escolha do plano é apenas o primeiro passo. A configuração de horários por profissional acontece na implantação e pode ser aprofundada depois." },
  { question: "Posso começar sozinho e crescer?", answer: "Sim. O Solo atende a operação individual; quando a equipe cresce, a conversa passa a considerar profissionais, regras e visão compartilhada." },
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
        title: <>O plano certo começa pela forma como vocês trabalham.</>,
        lead: "Responda três perguntas sobre equipe, número e prioridade. A recomendação aparece na tela para você continuar a conversa com contexto.",
        trust: ["Solo, Equipe ou Empresarial", "Sem cartão para descobrir", "Preços claros antes do cadastro"],
        tool: <PlanSelector />,
        problemLabel: "Preço sem contexto vira comparação rasa.",
        problemTitle: "O plano precisa caber na rotina, não só na tabela.",
        problemCopy: "Uma barbearia solo e uma operação com vários profissionais não precisam começar pelo mesmo lugar. A conversa muda quando a agenda, o WhatsApp e o fechamento também mudam.",
        sectionLabel: "Como escolher sem complicar",
        sectionTitle: "Comece pela operação que você quer organizar.",
        sectionCopy: "Veja o que cada plano resolve e converse com o time quando houver uma exceção, mais de uma unidade ou uma regra própria.",
        steps: [
          { title: "Conte quem atende", copy: "Inclua quem realmente precisa usar a agenda, não apenas quem aparece no quadro." },
          { title: "Explique o número", copy: "Diga se todos chegam pelo mesmo WhatsApp ou se a operação está espalhada." },
          { title: "Escolha a primeira dor", copy: "Agenda, equipe ou caixa? Uma prioridade ajuda a começar sem excesso de configuração." },
          { title: "Veja os detalhes", copy: "Compare o plano recomendado com os outros e tire dúvidas antes de contratar." },
        ],
        materialTitle: "Guia de Gestão da Barbearia",
        materialSubtitle: "Um plano de 30 dias para organizar a operação sem tentar mudar tudo de uma vez.",
        materialItems: ["Agenda e atendimento no mesmo fluxo.", "Equipe, comissões e responsabilidades.", "Caixa e recebimentos com contexto.", "Próxima ação para começar pequeno."],
        formTitle: "Receba o guia para organizar a primeira semana.",
        formCopy: "O material ajuda a transformar a recomendação em uma conversa prática com quem atende, fecha o caixa e cuida dos clientes.",
        formNotes: ["PDF curto e aplicável.", "Você não precisa contratar para usar.", "Marketing e WhatsApp são opcionais."],
        formConfig: { resourceId: "guia_gestao_barbearia", resourceUrl: "/downloads/guia-completo-barbearia.pdf", source: "download:qual-plano-flowo", submitLabel: "Receber meu guia", successTitle: "Seu guia de gestão está pronto.", productCtaLabel: "Comparar os planos da Flowo", productCtaHref: "/precos" },
        faqs,
      }} />
    </>
  );
}
