import type { Metadata } from "next";
import { GrowthToolLanding } from "@/components/marketing/growth-tools/growth-tool-landing";
import { GrowthToolSchema } from "@/components/marketing/growth-tools/growth-tool-schema";
import { OccupancyCalculator } from "@/components/marketing/growth-tools/business-tools";
import { buildMetadata } from "@/lib/seo";

const PATH = "/calculadora-ocupacao-agenda-barbearia";
const TITLE = "Calculadora de Ocupação da Agenda da Barbearia | Flowo";
const DESCRIPTION = "Calcule a capacidade semanal da equipe, compare com os atendimentos marcados e encontre o próximo ponto de organização da agenda.";
const faqs = [
  { question: "A conta considera folgas e encaixes?", answer: "Não. A ferramenta usa os dados que você informa e mostra uma capacidade de referência. Folgas, intervalos e serviços com durações diferentes precisam ser conferidos na rotina real." },
  { question: "Ocupação alta sempre é melhor?", answer: "Não necessariamente. Uma agenda cheia pode esconder atrasos, sobrecarga e pouca margem para remarcações. Use o número junto da experiência da equipe." },
  { question: "Funciona para profissionais com horários diferentes?", answer: "Sim como primeira aproximação. Para uma decisão operacional, separe a capacidade por profissional e configure os horários reais no sistema." },
];
export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, absoluteTitle: true });

export default function OccupancyPage() {
  return (
    <>
      <GrowthToolSchema path={PATH} title={TITLE} description={DESCRIPTION} name="Calculadora de ocupação da agenda" faqs={faqs} />
      <GrowthToolLanding content={{
        kind: "occupancy",
        campaign: true,
        navCta: "Receber o painel semanal",
        kicker: "Calculadora de agenda para barbearias",
        title: <>A agenda está cheia, ou só parece difícil de ler?</>,
        lead: "Compare a capacidade aproximada da equipe com os atendimentos marcados e descubra qual conversa a operação precisa ter primeiro.",
        trust: ["Visão semanal", "Sem cadastro para calcular", "Sem prometer ocupação"],
        tool: <OccupancyCalculator />,
        problemLabel: "Agenda cheia não explica tudo.",
        problemTitle: "A mesma semana pode estar lotada para um barbeiro e vazia para outro.",
        problemCopy: "Quando cada pessoa anota de um jeito, fica difícil saber se falta demanda, regra ou simplesmente uma visão única dos horários.",
        sectionLabel: "Da capacidade para a decisão",
        sectionTitle: "Leia o número junto do que a equipe vive.",
        sectionCopy: "O objetivo não é ocupar cada minuto. É enxergar horários, folgas e responsabilidades para fazer ajustes que a equipe consiga sustentar.",
        steps: [
          { title: "Separe por profissional", copy: "Use horários reais, não apenas o horário geral da barbearia." },
          { title: "Confira os marcados", copy: "Compare atendimentos confirmados, encaixes e espaços que ficaram abertos." },
          { title: "Encontre o desvio", copy: "Veja se o problema é distribuição, duração do serviço ou falta de confirmação." },
          { title: "Ajuste uma regra", copy: "Escolha uma pequena mudança e observe o resultado na próxima semana." },
        ],
        materialTitle: "Painel Semanal da Barbearia",
        materialSubtitle: "Uma referência simples para agenda, faltas, ticket e próxima ação.",
        materialItems: ["Capacidade e agenda por profissional.", "Faltas e remarcações para acompanhar.", "Ticket e retorno sem misturar assuntos.", "Uma ação clara para a semana."],
        formTitle: "Receba o painel para acompanhar a próxima semana.",
        formCopy: "O material foi pensado para uma rotina informal também: poucas linhas, responsáveis visíveis e uma revisão que cabe no fim do expediente.",
        formNotes: ["Arquivo gratuito com exemplos.", "Marketing e WhatsApp são opcionais.", "Você pode começar numa planilha."],
        formConfig: { resourceId: "painel_semanal_barbearia", resourceUrl: "/downloads/referencia-rapida-barbearia.pdf", source: "download:calculadora-ocupacao-agenda", submitLabel: "Receber meu painel", successTitle: "Seu painel semanal está pronto.", productCtaLabel: "Conhecer a agenda da Flowo", productCtaHref: "/sistema-agendamento-barbearia" },
        faqs,
      }} />
    </>
  );
}
