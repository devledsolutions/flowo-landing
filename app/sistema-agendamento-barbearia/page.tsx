import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat, type ChatMessage } from "@/components/home/whatsapp-chat";
import { ProductDisclaimer } from "@/components/home/product-previews";
import { CommercialCta, RelatedSolutions } from "@/components/marketing/commercial-page";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { formatBRL, getPlan, hasPublishedPrice, PLANS } from "@/data/pricing-data";
import {
  InstitutionalFilm,
  InstitutionalFilmSchema,
} from "@/components/marketing/institutional-film";

const PATH = "/sistema-agendamento-barbearia";
const soloPrice = formatBRL(getPlan("solo").monthly);
const equipePrice = formatBRL(getPlan("equipe").monthly);

export const metadata = buildMetadata({
  title: "Como funciona: a Flowo na rotina da barbearia",
  description:
    "O cliente chama no WhatsApp, a Flowo olha a agenda e confirma. Lembrete, comanda e recebimento seguem no mesmo lugar. Veja o dia a dia, passo a passo.",
  path: PATH,
});

/**
 * One afternoon at the shop: a same-day request, the booking, the reminder
 * an hour before. Illustrative names and prices, the same ones the product
 * screenshots use.
 */
const conversation: ChatMessage[] = [
  { from: "cliente", text: "Boa tarde! Tem horário hoje pra corte e barba?", at: "14:02" },
  {
    from: "flowo",
    text: "Boa tarde! Hoje tenho 16:30 com o Rafa e 18:00 com o João. Corte e barba leva 1 hora, R$ 85. Qual você prefere?",
    at: "14:02",
  },
  { from: "cliente", text: "16:30 com o Rafa", at: "14:03" },
  {
    from: "flowo",
    text: "Fechado. Corte e barba hoje às 16:30 com o Rafa. Te mando um lembrete uma hora antes.",
    at: "14:03",
  },
  {
    from: "flowo",
    text: "Lembrete: seu horário com o Rafa é hoje às 16:30. Se não puder vir, me avisa aqui que eu libero o horário.",
    at: "15:30",
  },
  { from: "cliente", text: "Confirmado!", at: "15:31" },
];

const steps = [
  {
    number: "02",
    title: "A agenda já está atualizada",
    text: "O horário entra na agenda do Rafa na hora. Ninguém digita nada. Cada barbeiro tem os próprios dias, turnos e folgas, e a Flowo só oferece o que cabe.",
    image: "/images/product/dashboard-agenda.png",
    alt: "Agenda da Flowo com os horários de cada barbeiro no dia",
  },
  {
    number: "03",
    title: "Comanda fechada no fim do corte",
    text: "Serviço e produto na mesma comanda. Dinheiro e maquininha própria continuam valendo. PIX e cartão pela Flowo são opcionais, e sempre depois do atendimento.",
    image: "/images/product/dashboard-comandas.png",
    alt: "Comandas do dia na Flowo, com serviços, produtos e forma de pagamento",
  },
  {
    number: "04",
    title: "Sua equipe assume quando quiser",
    text: "Todas as conversas ficam no painel. Você pausa a Flowo, responde você mesmo e devolve o atendimento depois.",
    image: "/images/product/dashboard-conversas.png",
    alt: "Conversas do WhatsApp da barbearia dentro da Flowo",
  },
] as const;

const capabilityGroups = [
  {
    title: "WhatsApp e atendimento",
    items: [
      "responde perguntas, mostra horários e agenda",
      "remarca e cancela dentro da conversa",
      "histórico e controle da equipe quando precisar",
    ],
  },
  {
    title: "Agenda e equipe",
    items: [
      "dias, turnos, folgas e serviços por barbeiro",
      "uma agenda só, sempre atualizada",
      "planos para barbeiro solo, equipe e várias unidades",
    ],
  },
  {
    title: "Comanda e recebimento",
    items: [
      "serviços e produtos na mesma comanda",
      "dinheiro e maquininha própria continuam valendo",
      "PIX e cartão Flowo opcionais, depois do atendimento",
    ],
  },
  {
    title: "Clientes e gestão",
    items: [
      "cadastro, histórico e relacionamento com a base",
      "comissões, campanhas e relatórios conforme o plano",
      "cashback e nota fiscal dependem de ativação",
    ],
  },
] as const;

const fitCases = [
  "Barbeiro solo que perde a tarde respondendo mensagem.",
  "Equipe com mais de um barbeiro e horários diferentes.",
  "Barbearia em crescimento que quer o WhatsApp respondido sempre do mesmo jeito.",
];

const faqItems = [
  {
    question: "O Flowo é só uma agenda online?",
    answer:
      "Não. A agenda é a base. Em cima dela, a Flowo atende no WhatsApp, organiza clientes, equipe, comandas e recebimentos, conforme o plano.",
  },
  {
    question: "Cada barbeiro pode ter horários diferentes?",
    answer:
      "Sim. Nos planos com equipe, cada barbeiro tem dias, turnos, folgas, serviços e duração próprios. A Flowo só oferece os horários que cabem.",
  },
  {
    question: "O cliente precisa baixar aplicativo para agendar?",
    answer:
      "Não. O cliente agenda no WhatsApp da barbearia. A equipe usa o painel da Flowo. O app para barbeiros ainda está em preparação para as lojas.",
  },
  {
    question: "O pagamento pela Flowo é obrigatório?",
    answer:
      "Não. A barbearia pode continuar recebendo em dinheiro ou na própria maquininha. PIX e cartão pela Flowo são opcionais e usados só depois do atendimento.",
  },
  {
    question: "Tem cobrança de sinal para reservar horário?",
    answer:
      "Não. A Flowo não pede depósito nem pagamento adiantado para agendar. O recebimento acontece depois do serviço.",
  },
  {
    question: "Uma pessoa pode assumir a conversa?",
    answer:
      "Sim. A equipe assume a conversa com o histórico na tela, pausa a Flowo e devolve o atendimento depois.",
  },
  {
    question: "Quanto custa?",
    answer:
      `Os planos mensais são Solo por ${soloPrice} e Equipe por ${equipePrice}. O Empresarial é sob consulta. Sem fidelidade. Clientes elegíveis de Solo ou Equipe podem receber uma avaliação assistida de 14 dias, sem cartão e sem cobrança automática.`,
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(PATH)}#webpage`,
      url: absoluteUrl(PATH),
      name: "Como funciona: a Flowo na rotina da barbearia",
      description:
        "O dia a dia com a Flowo: atendimento no WhatsApp, agenda por barbeiro, lembrete, comanda e recebimento opcional.",
      inLanguage: "pt-BR",
      dateModified: "2026-09-03",
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
        { "@type": "ListItem", position: 2, name: "Como funciona", item: absoluteUrl(PATH) },
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
        <section className="border-b border-line bg-cream">
          <div className="container-page grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start lg:gap-16 lg:py-16">
            <div className="lg:sticky lg:top-24">
              <Breadcrumb
                items={[
                  { label: "Início", href: "/" },
                  { label: "Como funciona", href: PATH },
                ]}
              />
              <p className="mt-6 text-caption font-medium uppercase tracking-[0.12em] text-faint-ink">
                Passo 01
              </p>
              <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,1.8rem+1.3vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink-strong">
                O cliente chama.
                <br />A Flowo responde.
              </h1>
              <p className="mt-5 max-w-measure text-lead text-muted-ink">
                Ela olha a agenda, oferece só o que cabe e confirma. Uma hora antes, lembra o cliente.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Responde na hora, de dia ou de noite",
                  "Só oferece horário que o barbeiro tem",
                  "Confirma na própria conversa",
                  "Remarca e cancela sem você parar de cortar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body text-ink">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-ink" />
                    {item}
                  </li>
                ))}
              </ul>
              <ProductDisclaimer className="mt-8" label="Conversa e telas com dados ilustrativos" />
            </div>
            <div className="flex justify-center lg:justify-end">
              <PhoneFrame className="lg:hidden">
                <WhatsAppChat width={340} logicalHeight={900} messages={conversation} />
              </PhoneFrame>
              <PhoneFrame className="hidden lg:block">
                <WhatsAppChat width={384} logicalHeight={900} messages={conversation} />
              </PhoneFrame>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn("grid gap-6 lg:items-center lg:gap-14", index % 2 === 1 ? "lg:grid-cols-[1fr_minmax(0,20rem)]" : "lg:grid-cols-[minmax(0,20rem)_1fr]")}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <p className="text-caption font-medium uppercase tracking-[0.12em] text-faint-ink">
                    Passo {step.number}
                  </p>
                  <h2 className="mt-3 text-h2 font-semibold leading-tight text-ink-strong">
                    {step.title}
                  </h2>
                  <p className="mt-4 max-w-measure text-body text-muted-ink">{step.text}</p>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={1920}
                    height={1041}
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="w-full rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-24px_rgba(23,24,16,0.35)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <InstitutionalFilm compact />

        <section className="section-normal border-t border-line bg-surface">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">
                O WhatsApp abre a conversa. O resto continua no mesmo lugar.
              </h2>
            </div>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {capabilityGroups.map((group) => (
                <div
                  key={group.title}
                  className="grid gap-5 py-7 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10"
                >
                  <h3 className="font-semibold text-ink">{group.title}</h3>
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
            <p className="mt-6 max-w-measure text-label text-muted-ink">
              Nota fiscal, pagamento pela Flowo, cashback e campanhas dependem do plano e da ativação na sua barbearia.
            </p>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">Para quem é</h2>
              <ul className="mt-8 space-y-5">
                {fitCases.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <span className="max-w-measure text-body text-muted-ink">{item}</span>
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
                . Em dúvida entre a agenda de papel e a Flowo? Compare em{" "}
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

        <section className="section-normal border-t border-line">
          <div className="container-page grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
            <div>
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">
                Perguntas de quem está escolhendo
              </h2>
              <p className="mt-5 max-w-measure text-body text-muted-ink">
                Compare o dia a dia inteiro e as condições, não só a mensalidade.
              </p>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <details key={item.question} className="py-5">
                  <summary className="cursor-pointer list-none pr-8 font-semibold text-ink">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-measure text-body text-muted-ink">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-surface py-8 md:py-10">
          <div className="container-page">
            <p className="max-w-measure text-label text-muted-ink">
              <strong className="font-semibold text-ink">O que já foi testado.</strong> Este atendimento
              (resposta, agendamento, remarcação, cancelamento e a passagem para a equipe) foi testado pela
              Flowo no WhatsApp em 26 de julho de 2026, com números de teste da própria Flowo. Ainda não
              medimos resultado em barbearias clientes. Cada barbearia começa com a configuração acompanhada
              pela equipe Flowo.{" "}
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="font-medium text-ink underline underline-offset-4"
              >
                Ver a demonstração completa
              </Link>
              .
            </p>
          </div>
        </section>

        <RelatedSolutions
          items={[
            {
              href: "/agenda-barbearia-whatsapp",
              label: "Agendamento no WhatsApp",
              description: "A conversa do primeiro pedido até a confirmação.",
            },
            {
              href: "/recursos/guias/escala-equipe",
              label: "Escala da equipe",
              description: "Monte horários diferentes para cada barbeiro.",
            },
            {
              href: "/software-barbearia-com-pix",
              label: "Recebimento no atendimento",
              description: "Dinheiro ou maquininha própria e, se quiser, PIX e cartão pela Flowo.",
            },
          ]}
        />
        <CommercialCta
          title="Agenda organizada é atendimento que rende."
          description="Deixe marcar, confirmar e lembrar com a Flowo. Sua equipe cuida do corte."
          price={getPlan("solo").monthly}
        />
      </main>
      <Footer />
    </>
  );
}
