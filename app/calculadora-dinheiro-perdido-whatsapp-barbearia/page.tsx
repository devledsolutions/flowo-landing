import type { Metadata } from "next";
import { GrowthToolLanding } from "@/components/marketing/growth-tools/growth-tool-landing";
import { GrowthToolSchema } from "@/components/marketing/growth-tools/growth-tool-schema";
import { WhatsAppOpportunityCalculator } from "@/components/marketing/growth-tools/business-tools";
import { buildMetadata } from "@/lib/seo";

const PATH = "/calculadora-dinheiro-perdido-whatsapp-barbearia";
const TITLE = "Calculadora de Oportunidades no WhatsApp da Barbearia | Flowo";
const DESCRIPTION = "Estime quantas conversas de horário merecem revisão na sua barbearia e transforme o resultado em um plano prático de atendimento.";

const faqs = [
  { question: "A ferramenta calcula dinheiro realmente perdido?", answer: "Não. Ela cria um cenário de referência com os números que você informa. Confirme no histórico do WhatsApp quantas conversas realmente viraram atendimento antes de tomar qualquer decisão." },
  { question: "Posso usar sem informar meus dados?", answer: "Sim. O resultado aparece na tela. Nome e e-mail só são pedidos se você quiser receber o material complementar." },
  { question: "O que faço depois do resultado?", answer: "Separe uma semana real, confira as conversas sem resposta e escolha uma regra simples para disponibilidade, confirmação e passagem para uma pessoa." },
];

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, absoluteTitle: true });

export default function WhatsAppOpportunityPage() {
  return (
    <>
      <GrowthToolSchema path={PATH} title={TITLE} description={DESCRIPTION} name="Calculadora de oportunidades no WhatsApp" faqs={faqs} />
      <GrowthToolLanding content={{
        kind: "money",
        campaign: true,
        navCta: "Receber o checklist",
        kicker: "Calculadora gratuita para barbearias",
        title: <>Quanto vale olhar melhor para as conversas que ficam sem resposta?</>,
        lead: "Informe a sua rotina e veja um cenário simples para decidir onde conferir primeiro, sem transformar estimativa em promessa de faturamento.",
        trust: ["Resultado na tela", "Sem cadastro para calcular", "Cenário explicado"],
        tool: <WhatsAppOpportunityCalculator />,
        problemLabel: "O número não é o problema. A falta de visibilidade é.",
        problemTitle: "Você não precisa adivinhar quais mensagens merecem atenção.",
        problemCopy: "Uma semana de conversas já mostra onde o atendimento trava: pergunta repetida, horário que ninguém conferiu ou pedido que ficou para depois.",
        sectionLabel: "Como usar com responsabilidade",
        sectionTitle: "Comece pelo que a equipe consegue conferir hoje.",
        sectionCopy: "Use o resultado como uma pauta de operação. A melhor decisão vem do histórico real, não de um número bonito na tela.",
        steps: [
          { title: "Conte uma semana", copy: "Escolha um período normal e separe as conversas sobre horário, confirmação e remarcação." },
          { title: "Marque as que ficaram abertas", copy: "Não presuma que silêncio virou perda. Marque o que precisa de uma resposta ou conferência." },
          { title: "Escolha uma regra", copy: "Defina quem responde, em qual horário e quando uma pessoa assume a conversa." },
          { title: "Compare de novo", copy: "Repita a conta depois de sete dias e converse com a equipe sobre o que mudou." },
        ],
        materialTitle: "Checklist de Agendamento no WhatsApp",
        materialSubtitle: "Uma revisão curta para transformar conversa, agenda e responsável em uma regra clara.",
        materialItems: ["Perguntas que mais se repetem.", "Horários, folgas e exceções por profissional.", "Ponto de passagem para atendimento humano.", "Mensagens de confirmação e remarcação."],
        formTitle: "Receba o checklist para aplicar em uma semana.",
        formCopy: "O arquivo deixa a equipe com uma lista objetiva: o que revisar, quem decide e qual sinal mostra que a rotina melhorou.",
        formNotes: ["Entrega imediata na tela e por e-mail.", "WhatsApp e marketing são opcionais.", "O material pode ser usado sem contratar a Flowo."],
        formConfig: { resourceId: "checklist_agendamento_whatsapp", resourceUrl: "/downloads/lead-magnets/checklist-agendamento-whatsapp.xlsx", resourceFormat: "XLSX", source: "download:calculadora-oportunidade-whatsapp", submitLabel: "Receber meu checklist", successTitle: "Seu checklist está pronto.", productCtaLabel: "Ver a Flowo atendendo no WhatsApp", productCtaHref: "/demonstracao-agendamento-whatsapp" },
        faqs,
      }} />
    </>
  );
}
