import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  MessageCircle,
  Repeat2,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { TrackedLink } from "@/components/analytics/tracked-link";
import {
  InstitutionalFilm,
  InstitutionalFilmSchema,
} from "@/components/marketing/institutional-film";
import { WHATSAPP_URL } from "@/components/cta-links";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const PATH = "/demonstracao-agendamento-whatsapp";

export const metadata = buildMetadata({
  title: "Demonstração: Agendamento pelo WhatsApp com IA",
  description:
    "Veja o fluxo validado da Flowo: a IA atende no WhatsApp, consulta a disponibilidade e confirma o agendamento na agenda da barbearia.",
  path: PATH,
});

const testedCapabilities = [
  {
    icon: MessageCircle,
    title: "Entrada e resposta no WhatsApp",
    description:
      "A mensagem chegou ao ambiente de produção da Flowo, foi interpretada e recebeu resposta pelo mesmo fluxo de atendimento.",
  },
  {
    icon: CalendarCheck2,
    title: "Agendamento na agenda real",
    description:
      "A IA consultou a disponibilidade, concluiu a escolha e registrou o horário na agenda do profissional correto.",
  },
  {
    icon: Repeat2,
    title: "Consulta, remarcação e cancelamento",
    description:
      "O teste percorreu as mudanças que mais acontecem depois da marcação, sempre conferindo o estado da agenda.",
  },
  {
    icon: UserRoundCheck,
    title: "Controle humano",
    description:
      "Uma pessoa assumiu a conversa, preservou o histórico e devolveu o atendimento para a IA quando a situação foi resolvida.",
  },
] as const;

const faqItems = [
  {
    question: "A demonstração usa um cliente real?",
    answer:
      "Não. O fluxo foi executado em produção com números, tenants e contatos controlados pela própria Flowo. Isso comprova o funcionamento técnico sem apresentar um ambiente de teste como se fosse cliente.",
  },
  {
    question: "O agendamento realmente aparece na agenda?",
    answer:
      "Sim. A certificação criou e confirmou um agendamento na agenda e também exercitou consulta, remarcação e cancelamento.",
  },
  {
    question: "A equipe pode assumir a conversa?",
    answer:
      "Sim. O atendimento humano pode assumir com o histórico disponível, pausar a IA e devolver a conversa depois.",
  },
  {
    question: "Isso garante aumento de faturamento?",
    answer:
      "Não. O teste comprova o fluxo de atendimento e agenda. Tempo economizado, ocupação e receita serão medidos com os primeiros clientes e só serão publicados com período e metodologia.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(PATH)}#webpage`,
      url: absoluteUrl(PATH),
      name: "Demonstração de agendamento pelo WhatsApp com IA",
      description:
        "Demonstração e escopo da validação em produção do atendimento da Flowo, da mensagem no WhatsApp ao agendamento na agenda.",
      inLanguage: "pt-BR",
      dateModified: "2026-07-31",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "Demonstração",
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

export default function DemonstracaoAgendamentoWhatsappPage() {
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
        <section className="pb-section-normal pt-32 md:pt-40">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Demonstração", href: PATH },
              ]}
            />
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end lg:gap-20">
              <div>
                <p className="text-label font-medium text-faint-ink">
                  Teste concluído em produção · 26 de julho de 2026
                </p>
                <h1 className="mt-4 max-w-[18ch] text-h2 font-semibold leading-tight text-ink-strong">
                  Da mensagem no WhatsApp ao horário confirmado na agenda.
                </h1>
                <p className="mt-6 max-w-measure text-lead text-muted-ink">
                  A Flowo executou o fluxo completo com ativos controlados de
                  teste: recebeu a conversa, consultou a disponibilidade,
                  confirmou o agendamento e atualizou a agenda.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#video-flowo"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-label font-semibold text-cream transition-opacity hover:opacity-90"
                  >
                    Assistir à demonstração
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                  <Link
                    href="/sistema-agendamento-barbearia"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 py-3 text-label font-medium text-ink transition-colors hover:bg-surface"
                  >
                    Conhecer o sistema
                  </Link>
                </div>
              </div>

              <aside className="border-y border-line py-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                  <div>
                    <p className="font-semibold text-ink">Prova técnica, sem resultado inventado</p>
                    <p className="mt-2 text-label leading-relaxed text-muted-ink">
                      O teste comprova funcionamento. Resultados de tempo,
                      ocupação e receita serão publicados somente depois de
                      medidos em clientes reais.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <InstitutionalFilm />

        <section className="section-normal border-b border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
              <div>
                <h2 className="text-h2 font-semibold leading-tight text-ink-strong">
                  O que foi exercitado no fluxo real
                </h2>
                <p className="mt-5 max-w-measure text-body text-muted-ink">
                  A prova cobre o trabalho que acontece antes e depois do
                  primeiro “tem horário?”, não apenas uma resposta de chat.
                </p>
              </div>
              <ol className="divide-y divide-line border-y border-line">
                {testedCapabilities.map((item, index) => (
                  <li
                    key={item.title}
                    className="grid gap-4 py-6 sm:grid-cols-[2.75rem_minmax(0,1fr)]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-label font-semibold text-ink">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <item.icon aria-hidden="true" className="h-5 w-5 text-ink" />
                        <h3 className="font-semibold text-ink">{item.title}</h3>
                      </div>
                      <p className="mt-2 max-w-measure text-body text-muted-ink">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="text-h3 font-semibold text-ink">
                O que essa validação permite afirmar
              </h2>
              <ul className="mt-7 divide-y divide-line border-y border-line">
                {[
                  "A IA atende pelo WhatsApp e usa a disponibilidade da agenda.",
                  "O agendamento concluído é registrado no profissional correto.",
                  "Remarcação e cancelamento atualizam o estado da agenda.",
                  "A equipe pode assumir e devolver a conversa para a IA.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 py-4 text-body text-muted-ink">
                    <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-h3 font-semibold text-ink">
                O que ainda será medido com clientes
              </h2>
              <ul className="mt-7 divide-y divide-line border-y border-line">
                {[
                  "tempo economizado por semana no atendimento manual",
                  "quantidade de pedidos que deixaram de ficar sem resposta",
                  "ocupação adicional de horários e redução de faltas",
                  "receita atribuída e uso depois de 30, 60 e 90 dias",
                ].map((item) => (
                  <li key={item} className="py-4 text-body text-muted-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <h2 className="text-h2 font-semibold text-ink-strong">
                Dúvidas sobre a demonstração
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-5">
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

        <section className="on-ink section-normal">
          <div className="container-page grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="max-w-2xl">
              <p className="text-label text-muted-ink">Próximo passo</p>
              <h2 className="mt-4 text-h2 font-semibold text-ink">
                Veja o mesmo fluxo aplicado à sua barbearia.
              </h2>
              <p className="mt-4 text-lead text-muted-ink">
                Conte como sua equipe trabalha e mostramos serviços, horários e
                profissionais dentro da conversa.
              </p>
            </div>
            <TrackedLink
              href={WHATSAPP_URL}
              event="CTA Clicked"
              properties={{
                page: PATH,
                placement: "final_cta",
                destination: "whatsapp_sales",
                intent: "request_demo",
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-label font-semibold text-cream transition-opacity hover:opacity-90"
            >
              Pedir uma demonstração
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
