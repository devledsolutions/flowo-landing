import Link from "next/link";
import {
  BarChart3,
  CalendarCheck2,
  Check,
  Clock3,
  CreditCard,
  MessageCircle,
  ReceiptText,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  CommercialCta,
  CommercialHero,
  RelatedSolutions,
} from "@/components/marketing/commercial-page";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getPlan, hasPublishedPrice, PLANS } from "@/data/pricing-data";
import {
  InstitutionalFilm,
  InstitutionalFilmSchema,
} from "@/components/marketing/institutional-film";

const PATH = "/sistema-agendamento-barbearia";

export const metadata = buildMetadata({
  title: "Sistema para Barbearia com Agenda e IA no WhatsApp",
  description:
    "Sistema de agendamento para barbearia com IA no WhatsApp: agenda por profissional, confirmação, comandas e pagamentos integrados opcionais.",
  path: PATH,
});

const validatedFacts = [
  "mensagem recebida e respondida pela IA no fluxo de produção",
  "agendamento criado e confirmado na agenda do profissional",
  "consulta, remarcação e cancelamento exercitados",
  "takeover humano, pausa e retomada da IA validados",
] as const;

const capabilityGroups = [
  {
    icon: MessageCircle,
    title: "WhatsApp e atendimento",
    items: [
      "IA para perguntas, disponibilidade e agendamento",
      "remarcação e cancelamento dentro da conversa",
      "histórico e controle humano quando necessário",
    ],
  },
  {
    icon: UsersRound,
    title: "Agenda e equipe",
    items: [
      "dias, turnos, folgas e serviços por profissional",
      "agenda centralizada e disponibilidade atualizada",
      "planos para profissional solo, equipe e várias unidades",
    ],
  },
  {
    icon: CreditCard,
    title: "Comanda e recebimento",
    items: [
      "serviços e produtos na mesma comanda",
      "dinheiro e maquininha própria continuam válidos",
      "PIX e cartão Flowo são opcionais e pós-atendimento",
    ],
  },
  {
    icon: BarChart3,
    title: "Clientes e gestão",
    items: [
      "cadastro, histórico e relacionamento com a base",
      "comissões, campanhas e relatórios conforme o plano",
      "cashback e recursos fiscais sujeitos à ativação",
    ],
  },
] as const;

const faqItems = [
  {
    question: "O Flowo é apenas uma agenda online?",
    answer:
      "Não. A agenda é a base, mas o Flowo também conecta atendimento por IA no WhatsApp, clientes, equipe, comandas, recebimentos e recursos de gestão conforme o plano.",
  },
  {
    question: "Cada barbeiro pode trabalhar em horários diferentes?",
    answer:
      "Sim. Nos planos com equipe, cada profissional pode ter dias, turnos, folgas, serviços e duração próprios. A IA oferece somente os horários compatíveis com a configuração.",
  },
  {
    question: "O cliente precisa baixar aplicativo para agendar?",
    answer:
      "Não. O atendimento pode acontecer no WhatsApp da barbearia. A equipe administra a operação pelo Flowo e o aplicativo para profissionais ainda está em preparação para as lojas.",
  },
  {
    question: "O pagamento pela Flowo é obrigatório?",
    answer:
      "Não. A barbearia pode continuar recebendo em dinheiro ou na própria maquininha. PIX e cartão integrados são opcionais e usados somente depois do atendimento.",
  },
  {
    question: "Existe cobrança de sinal para reservar horário?",
    answer:
      "Não. A Flowo não exige depósito ou pagamento antecipado para agendar. O recebimento está ligado ao serviço realizado.",
  },
  {
    question: "A IA pode ser interrompida por uma pessoa?",
    answer:
      "Sim. A equipe pode assumir a conversa com o histórico disponível, pausar a IA e devolver o atendimento depois.",
  },
  {
    question: "O funcionamento pelo WhatsApp já foi testado?",
    answer:
      "Sim. O fluxo foi executado em produção com ativos controlados da Flowo, incluindo resposta, agendamento, consulta, remarcação, cancelamento e controle humano. O onboarding comercial de cada cliente continua acompanhado.",
  },
  {
    question: "Quanto custa o sistema?",
    answer:
      "Os planos mensais são Solo por R$ 379 e Equipe por R$ 789. O Empresarial é sob consulta. A jornada pública é paga e sem fidelidade; clientes elegíveis de Solo ou Equipe podem receber uma avaliação assistida de 14 dias, concedida manualmente e sem cobrança automática.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(PATH)}#webpage`,
      url: absoluteUrl(PATH),
      name: "Sistema para Barbearia com Agenda e IA no WhatsApp",
      description:
        "Página principal do sistema Flowo para agenda, atendimento no WhatsApp, equipe, clientes, comandas e recebimentos opcionais.",
      inLanguage: "pt-BR",
    },
    {
      "@type": "SoftwareApplication",
      name: "Flowo",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absoluteUrl(PATH),
      featureList: capabilityGroups.flatMap((group) => group.items),
      offers: PLANS.filter(hasPublishedPrice).map((plan) => ({
        "@type": "Offer",
        name: `Plano ${plan.name}`,
        price: plan.monthly,
        priceCurrency: "BRL",
        url: absoluteUrl("/precos"),
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "Sistema de Agendamento para Barbearia",
          item: absoluteUrl(PATH),
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const benefits = [
  {
    icon: MessageCircle,
    title: "Agendamento pelo WhatsApp",
    description:
      "O cliente marca no canal que já usa todos os dias, sem baixar aplicativo. A IA da Flowo responde, agenda e confirma na própria conversa.",
  },
  {
    icon: CalendarCheck2,
    title: "Agenda centralizada",
    description:
      "Nos planos com equipe, cada barbeiro pode ter seus próprios dias e horários. Tudo fica no mesmo painel e sincronizado com o que a IA marca no WhatsApp.",
  },
  {
    icon: Clock3,
    title: "Confirmação automática",
    description:
      "Lembrete antes do atendimento com confirmação pelo WhatsApp. Quem vai faltar avisa antes, e o horário volta para a agenda.",
  },
];

const fitCases = [
  "Barbeiro solo que perde tempo respondendo mensagem o dia todo.",
  "Equipe com mais de um barbeiro que precisa organizar horários e disponibilidade.",
  "Barbearia em crescimento que quer padronizar o atendimento no WhatsApp.",
];

export default function SchedulingSystemPage() {
  return (
    <>
      <InstitutionalFilmSchema pagePath={PATH} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="main-content">
        <CommercialHero
          current="Sistema de Agendamento para Barbearia"
          eyebrow="Agenda por profissional, atendimento pelo WhatsApp"
          title="Sistema de agendamento para barbearia com a rotina no lugar"
          description="O Flowo centraliza os horários da equipe e coloca uma IA para atender, agendar e confirmar seus clientes pelo WhatsApp. Menos conversa repetitiva, mais clareza para quem está na cadeira."
          preview="agenda"
        />

        <InstitutionalFilm compact />

        <section className="border-y border-line bg-surface py-8 md:py-10">
          <div className="container-page grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-caption font-medium text-faint-ink">
                Validado em produção com ativos de teste Flowo
              </p>
              <h2 className="mt-2 text-h3 font-semibold text-ink">
                O fluxo não termina numa resposta de chat.
              </h2>
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink underline underline-offset-4"
              >
                Ver a demonstração e o escopo do teste
              </Link>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {validatedFacts.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3.5 text-label text-muted-ink">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">
              O que muda na prática com o Flowo
            </h2>
            <div className="mt-8 divide-y divide-line">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 py-7 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10"
                >
                  <div className="flex items-start gap-3">
                    <item.icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <h3 className="text-body font-semibold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="max-w-measure text-body text-muted-ink">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-h3 font-semibold text-ink">
                Para quem é este sistema de agendamento
              </h2>
              <ul className="mt-8 space-y-5">
                {fitCases.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <span className="max-w-measure text-body text-muted-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-body text-muted-ink">
                Quer reduzir faltas com lembrete e confirmação? Veja o guia{" "}
                <Link
                  href="/recursos/guias/reduzindo-faltas"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  reduzindo faltas na barbearia
                </Link>
                . Em dúvida entre manter o processo manual ou migrar? Compare
                em{" "}
                <Link
                  href="/flowo-vs-agenda-manual"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  Flowo vs agenda manual
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section-normal border-t border-line bg-surface">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">
                Um sistema para a operação inteira da barbearia
              </h2>
              <p className="mt-5 max-w-measure text-lead text-muted-ink">
                O WhatsApp abre a conversa. Agenda, equipe, cliente, comanda e
                gestão continuam no mesmo fluxo.
              </p>
            </div>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {capabilityGroups.map((group) => (
                <div
                  key={group.title}
                  className="grid gap-5 py-7 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10"
                >
                  <div className="flex items-start gap-3">
                    <group.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                    <h3 className="font-semibold text-ink">{group.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-body text-muted-ink">
                        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-ink" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 flex items-start gap-3 text-label text-muted-ink">
              <ReceiptText aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
              Recursos fiscais, pagamentos integrados, cashback e campanhas
              dependem do plano, da ativação e da configuração da barbearia.
            </p>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
            <div>
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">
                O que perguntar antes de escolher o sistema
              </h2>
              <p className="mt-5 max-w-measure text-body text-muted-ink">
                Compare o fluxo completo, as condições e o trabalho de
                implantação — não somente a mensalidade inicial.
              </p>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <details key={item.question} className="py-5">
                  <summary className="cursor-pointer list-none pr-8 font-semibold text-ink">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-measure text-body text-muted-ink">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedSolutions
          items={[
            {
              href: "/agenda-barbearia-whatsapp",
              label: "Agendamento no WhatsApp",
              description:
                "Entenda a conversa do primeiro pedido até a confirmação.",
            },
            {
              href: "/recursos/guias/escala-equipe",
              label: "Escala da equipe",
              description:
                "Monte disponibilidade diferente para cada profissional.",
            },
            {
              href: "/software-barbearia-com-pix",
              label: "Recebimento no atendimento",
              description:
                "Registre dinheiro ou maquininha própria e, se quiser, ative PIX e cartão Flowo.",
            },
          ]}
        />
        <CommercialCta
          title="Agenda organizada é atendimento que rende."
          description="Deixe a rotina de marcar, confirmar e lembrar com a Flowo. Sua equipe cuida do corte."
          price={getPlan("solo").monthly}
        />
      </main>
      <Footer />
    </>
  );
}
