import type { Metadata } from "next";
import { GrowthToolLanding } from "@/components/marketing/growth-tools/growth-tool-landing";
import { GrowthToolSchema } from "@/components/marketing/growth-tools/growth-tool-schema";
import { WhatsAppTimeCalculator } from "@/components/marketing/growth-tools/whatsapp-time-calculator";
import { buildMetadata } from "@/lib/seo";

const PATH = "/calculadora-tempo-whatsapp-barbearia";
const TITLE = "Calculadora de Tempo no WhatsApp para Barbearia | Flowo";
const DESCRIPTION =
  "Calcule quanto tempo sua barbearia passa respondendo perguntas de horário no WhatsApp e baixe um plano prático para reduzir interrupções.";

const faqs = [
  {
    question: "A calculadora mostra faturamento perdido?",
    answer:
      "Não. Ela estima somente o tempo usado em conversas sobre horários, com base nos números informados por você. O resultado não representa vendas nem horários efetivamente perdidos.",
  },
  {
    question: "Preciso cadastrar meus dados para calcular?",
    answer:
      "Não. O cálculo aparece na própria página. Nome e e-mail são pedidos somente se você quiser receber o PDF complementar.",
  },
  {
    question: "A ferramenta serve para quem atende sozinho?",
    answer:
      "Sim. Você pode usar a estimativa tanto em uma operação solo quanto em uma barbearia com equipe e horários diferentes por profissional.",
  },
  {
    question: "O Flowo responde o WhatsApp da barbearia?",
    answer:
      "O Flowo conecta recepção com IA, agenda e regras da equipe. O escopo disponível depende do plano, da configuração e da implantação contratada.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  absoluteTitle: true,
});

export default function WhatsAppTimeCalculatorPage() {
  return (
    <>
      <GrowthToolSchema
        path={PATH}
        title={TITLE}
        description={DESCRIPTION}
        name="Calculadora de Tempo no WhatsApp para Barbearias"
        faqs={faqs}
      />
      <GrowthToolLanding
        content={{
          kind: "time",
          campaign: true,
          navCta: "Receber o plano",
          kicker: "Calculadora gratuita para a rotina da barbearia",
          title: (
            <>
              Descubra quanto tempo o <strong>“tem horário?”</strong> toma do seu mês.
            </>
          ),
          lead:
            "Informe o volume de mensagens e veja uma estimativa clara do tempo usado para consultar agenda, responder e retomar conversas enquanto você atende.",
          trust: [
            "Cálculo sem cadastro",
            "Valores escolhidos por você",
            "Sem promessa de faturamento",
          ],
          tool: <WhatsAppTimeCalculator />,
          problemLabel: "O cliente não vê a interrupção. Você sente cada uma.",
          problemTitle:
            "A máquina para. A conversa abre. O corte espera alguns minutos.",
          problemCopy:
            "Uma mensagem parece rápida. Repetida ao longo de seis dias, ela vira uma segunda rotina de recepção — espalhada entre atendimento, intervalo e fim do expediente.",
          sectionLabel: "Do número para a mudança",
          sectionTitle: "Use a estimativa para organizar, não para assustar.",
          sectionCopy:
            "O cálculo só ganha valor quando vira uma decisão simples: quais perguntas se repetem, quem responde e qual informação precisa estar conectada à agenda.",
          steps: [
            {
              title: "Conte uma semana real",
              copy:
                "Use mensagens sobre disponibilidade, confirmação e remarcação. Não misture conversa pessoal ou atendimento já em andamento.",
            },
            {
              title: "Observe o caminho inteiro",
              copy:
                "Inclua o tempo de abrir a agenda, conferir o barbeiro, responder e voltar ao que estava fazendo.",
            },
            {
              title: "Escolha uma interrupção",
              copy:
                "Comece pela pergunta mais repetida. Padronize a regra antes de automatizar a resposta.",
            },
            {
              title: "Teste por sete dias",
              copy:
                "Compare o mesmo tipo de semana e registre onde a equipe ainda precisa assumir a conversa.",
            },
          ],
          materialTitle: "Agenda sem interrupção",
          materialSubtitle:
            "Escala da equipe, regras de confirmação e kit de mensagens para testar em sete dias.",
          materialItems: [
            "Ficha para mapear as perguntas que mais interrompem o atendimento.",
            "Quadro de horários, almoço, folgas e bloqueios por barbeiro.",
            "Regra de confirmação, encaixe e passagem para uma pessoa da equipe.",
            "Mensagens curtas para disponibilidade, confirmação e remarcação.",
          ],
          formTitle: "Receba o plano de sete dias.",
          formCopy:
            "O PDF transforma a estimativa em uma pequena operação de teste. Você preenche com a rotina real, combina responsáveis e mede o que mudou.",
          formNotes: [
            "Nome e e-mail liberam o PDF.",
            "WhatsApp e marketing são opcionais.",
            "O material não depende de contratar o Flowo.",
          ],
          formConfig: {
            resourceId: "agenda_sem_interrupcao",
            resourceUrl: "/downloads/agenda-sem-interrupcao-flowo.pdf",
            source: "download:agenda-sem-interrupcao",
            submitLabel: "Receber meu plano de sete dias",
            successTitle: "Seu plano Agenda sem Interrupção está pronto.",
            productCtaLabel: "Ver como a IA atende e consulta a agenda",
            productCtaHref: "/recepcionista-ia-barbearia",
          },
          faqs,
        }}
      />
    </>
  );
}
