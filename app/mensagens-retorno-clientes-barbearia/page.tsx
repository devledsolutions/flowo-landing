import type { Metadata } from "next";
import { GrowthToolLanding } from "@/components/marketing/growth-tools/growth-tool-landing";
import { GrowthToolSchema } from "@/components/marketing/growth-tools/growth-tool-schema";
import { ReturnPlanner } from "@/components/marketing/growth-tools/return-planner";
import { buildMetadata } from "@/lib/seo";

const PATH = "/mensagens-retorno-clientes-barbearia";
const TITLE = "Planejador de Retorno de Clientes para Barbearia | Flowo";
const DESCRIPTION =
  "Planeje a data de retorno do cliente e crie uma mensagem responsável de WhatsApp, com lembrete de consentimento e saída.";

const faqs = [
  {
    question: "O intervalo de retorno é igual para todo cliente?",
    answer:
      "Não. O planejador usa a referência escolhida por você. Serviço, preferência, cabelo, barba e costume do cliente mudam o intervalo real.",
  },
  {
    question: "Posso enviar a mensagem para toda a minha base?",
    answer:
      "Não é recomendado. Antes do envio, confirme consentimento, agendamento futuro, contatos recentes, conversas abertas e pedidos para não receber novas mensagens.",
  },
  {
    question: "A mensagem oferece desconto?",
    answer:
      "Não. O modelo convida o cliente a consultar a agenda sem desconto automático, escassez falsa ou promessa de resultado.",
  },
  {
    question: "Como o Flowo ajuda no retorno de clientes?",
    answer:
      "O Flowo organiza histórico e comunicação; o Flowo Recupera é um add-on em beta acompanhada. Disponibilidade e consentimento dependem da contratação e da configuração.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  absoluteTitle: true,
});

export default function CustomerReturnMessagesPage() {
  return (
    <>
      <GrowthToolSchema
        path={PATH}
        title={TITLE}
        description={DESCRIPTION}
        name="Planejador de Retorno de Clientes para Barbearias"
        faqs={faqs}
      />
      <GrowthToolLanding
        content={{
          kind: "return",
          campaign: true,
          navCta: "Receber o kit",
          kicker: "Planejador gratuito de retorno de clientes",
          title: (
            <>
              Chame o cliente na hora de voltar. <strong>Sem forçar.</strong>
            </>
          ),
          lead:
            "Escolha o intervalo do serviço, veja uma data de referência e adapte uma mensagem curta, reconhecível e fácil de recusar.",
          trust: [
            "Mensagem sem desconto automático",
            "Saída clara",
            "Data definida por você",
          ],
          tool: <ReturnPlanner />,
          problemLabel: "Lembrar não é o mesmo que pressionar.",
          problemTitle:
            "Uma boa mensagem chega com contexto. Uma mensagem em massa só aumenta o ruído.",
          problemCopy:
            "O cliente precisa reconhecer a barbearia, entender por que recebeu o contato e conseguir dizer que não quer novos lembretes. Antes disso, a equipe precisa confirmar se ele já agendou.",
          sectionLabel: "Contato responsável",
          sectionTitle: "A data ajuda. O critério decide se a mensagem deve sair.",
          sectionCopy:
            "Use o planejador como ponto de revisão. O envio só faz sentido quando a situação do cliente, o consentimento e o histórico de contato estão claros.",
          steps: [
            {
              title: "Escolha o intervalo",
              copy:
                "Use a frequência comum daquele serviço como referência, sem tratar todos os clientes da mesma forma.",
            },
            {
              title: "Confira a situação",
              copy:
                "Retire quem já agendou, está em conversa com a equipe ou pediu para não receber contato.",
            },
            {
              title: "Adapte a mensagem",
              copy:
                "Identifique a barbearia, explique o motivo e convide a consultar horários sem criar urgência falsa.",
            },
            {
              title: "Meça até a comanda",
              copy:
                "Mensagem enviada não é cliente recuperado. Registre agendamento, comparecimento e atendimento concluído separadamente.",
            },
          ],
          materialTitle: "Retorno sem spam",
          materialSubtitle:
            "Calendário de contato, checklist de consentimento e mensagens para situações reais.",
          materialItems: [
            "Filtro para retirar quem não deve receber a mensagem.",
            "Calendário de revisão por tipo de serviço.",
            "Modelos de lembrete, resposta, pausa e saída.",
            "Acompanhamento do contato até o atendimento concluído.",
          ],
          formTitle: "Receba o kit de contato responsável.",
          formCopy:
            "O PDF coloca consentimento, contexto e frequência no mesmo lugar, para a equipe revisar antes de chamar qualquer lista.",
          formNotes: [
            "Não use lista comprada.",
            "Nome e e-mail liberam o PDF.",
            "WhatsApp e marketing são opcionais.",
          ],
          formConfig: {
            resourceId: "retorno_sem_spam",
            resourceUrl: "/downloads/retorno-sem-spam-flowo.pdf",
            source: "download:retorno-sem-spam",
            submitLabel: "Receber meu kit de retorno",
            successTitle: "Seu kit Retorno sem Spam está pronto.",
            productCtaLabel: "Conhecer o Flowo Recupera",
            productCtaHref: "/flowo-recupera",
          },
          faqs,
        }}
      />
    </>
  );
}
