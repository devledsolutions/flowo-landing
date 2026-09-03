import Image from "next/image";
import Link from "next/link";
import { BellRing, CalendarCheck2, Check, Clock3, MessageSquareText, UserRoundCheck } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  CommercialCta,
  CommercialHero,
  RelatedSolutions,
} from "@/components/marketing/commercial-page";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat, type ChatMessage } from "@/components/home/whatsapp-chat";
import { ProductDisclaimer } from "@/components/home/product-previews";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getPlan } from "@/data/pricing-data";

const PATH = "/agenda-barbearia-whatsapp";

export const metadata = buildMetadata({
  title: "Agenda de Barbearia no WhatsApp com IA",
  description:
    "A Flowo responde no WhatsApp da barbearia, marca na agenda do barbeiro certo e lembra o cliente antes do horário. Sua equipe assume quando quiser.",
  path: PATH,
});

/**
 * Illustrative names and prices, the same ones the app screenshots use.
 * The thread shows what this page promises: booking, reminder, confirmation.
 */
const conversation: ChatMessage[] = [
  { day: "Terça" },
  { from: "cliente", text: "Boa tarde! Tem horário quinta de manhã pra corte e barba com o Pedro?", at: "14:12" },
  {
    from: "flowo",
    text: "Boa tarde! O Pedro tem quinta às 09:00, 10:00 e 11:30. Qual fica melhor pra você?",
    at: "14:12",
  },
  { from: "cliente", text: "10:00", at: "14:13" },
  {
    from: "flowo",
    text: "Marcado. Corte e barba quinta às 10:00 com o Pedro, 60 min, R$ 85. Antes do horário eu te lembro por aqui.",
    at: "14:13",
  },
  { day: "Quarta" },
  {
    from: "flowo",
    text: "Oi! Lembrete do seu horário: amanhã às 10:00, corte e barba com o Pedro. Posso confirmar?",
    at: "18:00",
  },
  { from: "cliente", text: "Confirmado!", at: "18:21" },
  { from: "flowo", text: "Combinado. Até amanhã às 10:00.", at: "18:21" },
];

const agendaSteps = [
  {
    icon: CalendarCheck2,
    title: "Quinta, 10:00 · Corte e barba com Pedro",
    detail: "Horário criado na agenda do Pedro, 60 min, R$ 85. Só os horários livres dele foram oferecidos.",
  },
  {
    icon: BellRing,
    title: "Lembrete enviado na véspera",
    detail: "A Flowo mandou a mensagem sozinha. Ninguém da equipe precisou lembrar.",
  },
  {
    icon: UserRoundCheck,
    title: "Presença confirmada",
    detail: "O cliente respondeu e o horário ficou marcado como confirmado na agenda.",
  },
] as const;

const flowSteps = [
  {
    title: "O cliente chama no WhatsApp",
    description:
      "A Flowo entende serviço, dia e horário. Responde na hora, a qualquer hora. Ninguém da equipe para de cortar.",
  },
  {
    title: "A Flowo marca e confirma na mesma conversa",
    description:
      "O horário entra na agenda do barbeiro certo. O cliente recebe a confirmação ali mesmo.",
  },
  {
    title: "Lembrete antes do horário",
    description:
      "O cliente confirma ou cancela pelo WhatsApp. Se cancelar, o horário volta para a agenda na hora. Sem resposta, o horário continua marcado.",
  },
] as const;

const teamBenefits = [
  {
    icon: MessageSquareText,
    title: "Resposta na hora, mesmo com a barbearia cheia",
    description: "O cliente não fica esperando. A Flowo responde do mesmo jeito às 9h e às 21h.",
  },
  {
    icon: CalendarCheck2,
    title: "Agenda por barbeiro",
    description:
      "Nos planos com equipe, cada barbeiro tem seus dias e horários. A Flowo só oferece o que está livre para o barbeiro escolhido.",
  },
  {
    icon: Clock3,
    title: "Menos celular na mão da equipe",
    description:
      "Marcar, confirmar e cancelar saem da mão da equipe. No Equipe e no Empresarial, o cliente também remarca pelo WhatsApp.",
  },
] as const;

const faqItems = [
  {
    question: "O cliente pode remarcar pelo WhatsApp?",
    answer:
      "No Solo, o cliente marca e cancela pelo WhatsApp. No Equipe e no Empresarial, também remarca. Sua equipe remarca pelo painel em qualquer plano.",
  },
  {
    question: "E se o cliente não responder ao lembrete?",
    answer:
      "O horário continua marcado. A Flowo não cancela nem libera a vaga por silêncio. Quem decide é a sua equipe.",
  },
  {
    question: "Cada barbeiro pode ter horários diferentes?",
    answer:
      "Sim. Nos planos com equipe, cada barbeiro tem dias, turnos, folgas, serviços e duração próprios. A Flowo respeita isso ao oferecer horários.",
  },
  {
    question: "Minha equipe pode entrar na conversa?",
    answer: "Sim. Quem assume vê o histórico inteiro. A Flowo fica em espera e volta quando a pessoa devolver a conversa.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(PATH)}#webpage`,
      url: absoluteUrl(PATH),
      name: "Agenda de Barbearia no WhatsApp com IA",
      description:
        "A Flowo responde no WhatsApp da barbearia, marca na agenda do barbeiro certo e lembra o cliente antes do horário.",
      inLanguage: "pt-BR",
      dateModified: "2026-09-03",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "Agenda de Barbearia no WhatsApp",
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

export default function WhatsappAgendaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main-content">
        <CommercialHero
          current="Agenda de Barbearia no WhatsApp"
          eyebrow="Atendimento e agenda no mesmo lugar"
          title="Sua agenda atende no WhatsApp."
          description="O cliente marca pelo WhatsApp. A Flowo olha a agenda do barbeiro e confirma. Sua equipe assume quando quiser."
          preview="whatsapp"
        />

        <section className="section-normal border-t border-line bg-surface">
          <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <p className="text-caption font-medium text-muted-ink">A conversa, do pedido ao lembrete</p>
              <h2 className="mt-4 max-w-[18ch] text-h2 font-semibold leading-tight text-ink-strong">
                Marcado, lembrado e confirmado.
              </h2>
              <p className="mt-5 max-w-measure text-body text-muted-ink">
                É assim que o cliente vê. Ao lado, o que aconteceu na agenda a cada mensagem.
              </p>
              <h3 className="mt-10 text-caption font-semibold uppercase tracking-[0.1em] text-faint-ink">
                O que aconteceu na agenda
              </h3>
              <ol className="mt-4 divide-y divide-line border-y border-line">
                {agendaSteps.map(({ icon: Icon, title, detail }) => (
                  <li key={title} className="flex items-start gap-4 py-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.91_0.08_150)] text-[oklch(0.43_0.11_150)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{title}</p>
                      <p className="mt-0.5 text-caption text-muted-ink">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mx-auto w-[340px] max-w-full lg:w-full lg:max-w-[24rem] lg:justify-self-end">
              <PhoneFrame className="border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)] lg:hidden">
                <WhatsAppChat width={340} logicalHeight={880} messages={conversation} />
              </PhoneFrame>
              <PhoneFrame className="hidden border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)] lg:block">
                <WhatsAppChat width={384} logicalHeight={880} messages={conversation} />
              </PhoneFrame>
              <ProductDisclaimer label="Conversa com dados ilustrativos" className="mt-4" />
            </div>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">
                O horário entra na agenda do barbeiro certo.
              </h2>
              <p className="mt-5 max-w-measure text-body text-muted-ink">
                A mesma agenda que sua equipe vê no painel. Uma coluna por barbeiro, os horários livres à vista.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-xl border border-ink/15 bg-surface shadow-[0_30px_70px_-45px_oklch(0.17_0.012_110/0.55)]">
              <Image
                src="/images/product/dashboard-agenda.png"
                alt="Painel da Flowo, tela Agenda: a semana da barbearia com uma coluna por barbeiro e os horários livres."
                width={1920}
                height={1041}
                sizes="(min-width: 1280px) 1120px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <ProductDisclaimer label="Telas do app com dados ilustrativos" className="mt-4" />
          </div>
        </section>

        <section className="section-normal border-t border-line bg-surface">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">Como funciona a agenda pelo WhatsApp</h2>
            <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {flowSteps.map((step, index) => (
                <li key={step.title} className="flex flex-col">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-label font-semibold text-ink"
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-body font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-measure text-body text-muted-ink">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-h3 font-semibold text-ink">O barbeiro corta. A Flowo atende.</h2>
              <div className="mt-8 divide-y divide-line">
                {teamBenefits.map((item) => (
                  <div key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                    <item.icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <div>
                      <h3 className="text-body font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1 max-w-measure text-body text-muted-ink">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-body text-muted-ink">
                Quer roteiros prontos para o WhatsApp? Veja os{" "}
                <Link
                  href="/recursos/guias"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  guias práticos da Flowo
                </Link>{" "}
                ou compare com a rotina de hoje em{" "}
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
          <div className="container-page grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
            <div>
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">Dúvidas frequentes</h2>
              <p className="mt-5 flex items-start gap-3 text-body text-muted-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                Respostas curtas, sem letra miúda.
              </p>
            </div>
            <dl className="divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <div key={item.question} className="py-5">
                  <dt className="font-semibold text-ink">{item.question}</dt>
                  <dd className="mt-2 max-w-measure text-label text-muted-ink">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-line py-8 md:py-10">
          <div className="container-page">
            <p className="max-w-measure text-label text-muted-ink">
              <strong className="font-semibold text-ink">O que já foi testado.</strong> A conversa desta página
              é ilustrativa. O atendimento (resposta, agendamento, remarcação, cancelamento, confirmação e a
              passagem para a equipe) foi testado pela Flowo no WhatsApp em 26 de julho de 2026, com números
              de teste da própria Flowo. Ainda não medimos faltas evitadas nem tempo economizado em barbearias
              clientes.{" "}
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
              href: "/sistema-agendamento-barbearia",
              label: "Agenda da equipe",
              description: "Dias e horários diferentes para cada barbeiro.",
            },
            {
              href: "/recursos/guias/configurando-whatsapp",
              label: "Guia do WhatsApp",
              description: "Prepare o número, a equipe e as regras antes de ligar a Flowo.",
            },
            {
              href: "/flowo-vs-agenda-manual",
              label: "Comparar com agenda manual",
              description: "O que muda quando a agenda sai do caderno.",
            },
          ]}
        />
        <CommercialCta
          title="Enquanto você corta, a Flowo atende."
          description="Sua agenda no WhatsApp, com lembrete e confirmação. A equipe fica na cadeira."
          price={getPlan("solo").monthly}
        />
      </main>
      <Footer />
    </>
  );
}
