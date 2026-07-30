import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  CircleUserRound,
  ClipboardCheck,
  Home,
  Scissors,
  ShieldCheck,
  Smartphone,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { MobileAppWaitlistForm } from "@/components/mobile-app-waitlist-form";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { SIGNUP_URL } from "@/components/cta-links";

const PATH = "/aplicativo-para-barbeiros";

export const metadata = buildMetadata({
  title: "Aplicativo para Barbeiros e Gestores",
  description:
    "Conheça o aplicativo Flowo em preparação para iPhone e Android: agenda, presenças, clientes e comandas para a equipe da barbearia.",
  path: PATH,
});

const faqItems = [
  {
    question: "O aplicativo Flowo já está disponível?",
    answer:
      "Ainda não. O aplicativo está em preparação para iPhone e Android. Esta página mostra uma prévia baseada no produto em desenvolvimento e permite registrar interesse no lançamento.",
  },
  {
    question: "O painel web vai deixar de existir?",
    answer:
      "Não. O painel web continua como a central de gestão da barbearia. O aplicativo complementa o painel na rotina móvel de barbeiros e gestores.",
  },
  {
    question: "O que a equipe poderá fazer pelo aplicativo?",
    answer:
      "A proposta atual inclui acompanhar a agenda individual, atualizar presenças, consultar clientes e trabalhar com comandas conforme a função e as permissões de cada pessoa.",
  },
  {
    question: "Preciso esperar o aplicativo para usar a Flowo?",
    answer:
      "Não. O painel web e o atendimento com IA no WhatsApp são a porta de entrada atual. A lista serve apenas para receber novidades do aplicativo.",
  },
] as const;

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: "Aplicativo para barbeiros",
      item: absoluteUrl(PATH),
    },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const features = [
  {
    icon: CalendarDays,
    title: "Agenda individual",
    description:
      "Cada profissional acompanha os próprios horários, serviços e intervalos sem misturar a agenda da equipe.",
  },
  {
    icon: ClipboardCheck,
    title: "Presenças e atendimento",
    description:
      "O status do cliente e a rotina da cadeira ficam acessíveis no celular durante o dia.",
  },
  {
    icon: CircleUserRound,
    title: "Clientes e comandas",
    description:
      "Informações necessárias para atender e registrar a operação sem depender do computador.",
  },
  {
    icon: ShieldCheck,
    title: "Acesso por função",
    description:
      "Barbeiro, gestor e dono veem o que precisam conforme as permissões configuradas.",
  },
] as const;

export default function MobileAppPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Navbar />
      <main id="main-content">
        <section className="relative isolate overflow-hidden bg-cream pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_72%_18%,oklch(0.995_0.002_95),transparent_55%)]"
          />
          <div className="container-page grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <div className="inline-flex min-h-9 items-center gap-2 border-y border-line py-2 text-caption font-semibold uppercase tracking-[0.15em] text-muted-ink">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                iPhone e Android
                <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
                em preparação
              </div>
              <h1 className="mt-7 max-w-[12ch] text-display font-semibold leading-[1.02] tracking-[-0.04em] text-ink-strong">
                O Flowo no bolso de quem atende.
              </h1>
              <p className="mt-6 max-w-xl text-lead text-muted-ink">
                O painel web organiza a gestão. O aplicativo leva agenda,
                presenças, clientes e comandas para a rotina móvel de barbeiros
                e gestores.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href="#lista-de-interesse"
                  event="CTA Clicked"
                  properties={{
                    page: PATH,
                    placement: "hero",
                    destination: "app_waitlist",
                    intent: "app_launch_interest",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
                >
                  Entrar na lista
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href={SIGNUP_URL}
                  event="CTA Clicked"
                  properties={{
                    page: PATH,
                    placement: "hero",
                    destination: "dashboard_signup",
                    intent: "start_now",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-surface/70 px-7 text-label font-semibold text-ink transition-colors hover:bg-surface"
                >
                  Usar o painel agora
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
              <p className="mt-5 max-w-lg text-caption text-faint-ink">
                Sem data pública de lançamento. A prévia abaixo representa o
                produto em desenvolvimento.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[620px] py-8 lg:py-4">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 bottom-3 top-3 -z-10 rounded-[3rem] bg-ink"
              />
              <div className="absolute left-0 top-12 hidden w-[210px] border-y border-line bg-cream/95 py-4 lg:block">
                <p className="text-caption uppercase tracking-[0.14em] text-faint-ink">
                  Dia da equipe
                </p>
                <p className="mt-2 font-semibold text-ink">Agenda por profissional</p>
                <p className="text-caption text-muted-ink">Horários e serviços reais</p>
              </div>
              <div className="absolute bottom-14 right-0 hidden w-[210px] border-y border-line bg-cream/95 py-4 text-right lg:block">
                <p className="text-caption uppercase tracking-[0.14em] text-faint-ink">
                  Operação móvel
                </p>
                <p className="mt-2 font-semibold text-ink">Presença e comanda</p>
                <p className="text-caption text-muted-ink">Conforme cada acesso</p>
              </div>

              <div
                role="img"
                aria-label="Prévia do aplicativo Flowo em desenvolvimento com agenda diária, horários de clientes e navegação para início, agenda, comandas e perfil"
                className="relative z-10 mx-auto w-[292px] rounded-[3rem] bg-black p-[9px] shadow-[0_36px_70px_-22px_oklch(0_0_0/0.72)] ring-1 ring-white/20 sm:w-[326px]"
              >
                <div className="absolute left-1/2 top-[17px] z-20 h-[25px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
                <div className="overflow-hidden rounded-[2.4rem] bg-[#f6f6f2] text-[#20231c]">
                  <div className="flex items-center justify-between px-6 pb-2 pt-3 text-[10px] font-semibold">
                    <span>9:41</span>
                    <span aria-hidden="true">● ᴡɪꜰɪ ▰</span>
                  </div>
                  <div className="px-5 pb-5 pt-8">
                    <p className="text-[11px] font-medium text-[#697064]">
                      Bom dia, Rafael
                    </p>
                    <div className="mt-1 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[28px] font-bold tracking-[-0.04em]">
                          Sua agenda
                        </p>
                        <p className="text-[11px] text-[#697064]">
                          Quarta, 29 de julho
                        </p>
                      </div>
                      <span className="rounded-full bg-[#20231c] px-3 py-1.5 text-[9px] font-semibold text-white">
                        4 horários
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-5 gap-1 border-y border-[#d9dcd5] py-4 text-center">
                      {[
                        ["Seg", "27"],
                        ["Ter", "28"],
                        ["Qua", "29"],
                        ["Qui", "30"],
                        ["Sex", "31"],
                      ].map(([day, date], index) => (
                        <div key={day}>
                          <p className="text-[9px] text-[#62675f]">{day}</p>
                          <span
                            className={`mx-auto mt-1.5 flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold ${
                              index === 2
                                ? "bg-[#20231c] text-white"
                                : "text-[#454b42]"
                            }`}
                          >
                            {date}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 space-y-2.5">
                      {[
                        ["09:00", "Lucas Almeida", "Corte", "Confirmado"],
                        ["10:30", "Pedro Martins", "Corte + barba", "Aguardando"],
                        ["13:00", "André Souza", "Barba", "Confirmado"],
                      ].map(([time, customer, service, status], index) => (
                        <div
                          key={time}
                          className="grid grid-cols-[42px_1fr] gap-3 rounded-xl border border-[#d9dcd5] bg-white p-3"
                        >
                          <p className="text-[11px] font-bold">{time}</p>
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-[10px] font-bold">{customer}</p>
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                  index === 1 ? "bg-[#9b9d96]" : "bg-[#4f8b68]"
                                }`}
                              />
                            </div>
                            <p className="mt-0.5 text-[9px] text-[#697064]">
                              {service} · {status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 border-t border-[#d9dcd5] bg-white px-4 pb-5 pt-3 text-[#697064]">
                    {[
                      [Home, "Início"],
                      [CalendarDays, "Agenda"],
                      [Scissors, "Comandas"],
                      [CircleUserRound, "Mais"],
                    ].map(([Icon, label], index) => {
                      const NavIcon = Icon as typeof Home;
                      return (
                        <div
                          key={label as string}
                          className={`flex flex-col items-center gap-1 text-[8px] ${
                            index === 1 ? "font-semibold text-[#20231c]" : ""
                          }`}
                        >
                          <NavIcon className="h-4 w-4" aria-hidden="true" />
                          <span>{label as string}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="relative z-10 mx-auto mt-5 w-fit bg-cream px-3 text-center text-caption text-faint-ink">
                Prévia do produto em desenvolvimento.
              </p>
            </div>
          </div>
        </section>

        <section
          id="lista-de-interesse"
          aria-labelledby="lista-de-interesse-title"
          className="scroll-mt-24 border-y border-line bg-surface-2"
        >
          <div className="container-page grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16 lg:py-16">
            <div>
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-muted-ink">
                Lista de interesse
              </p>
              <h2 id="lista-de-interesse-title" className="mt-4 text-h3 font-semibold text-ink">
                Seja avisado quando o app avançar.
              </h2>
              <p className="mt-4 text-body text-muted-ink">
                Um cadastro curto, uma confirmação imediata e nenhuma promessa
                de data que ainda não existe.
              </p>
            </div>
            <MobileAppWaitlistForm />
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Rotina da equipe
              </p>
              <h2 className="mt-4 text-h2 font-semibold text-ink">
                O que está previsto no aplicativo.
              </h2>
              <p className="mt-5 text-lead text-muted-ink">
                A proposta segue as áreas que já fazem parte da operação Flowo,
                adaptadas para decisões rápidas no celular.
              </p>
            </div>
            <div className="mt-12 grid border-y border-line md:grid-cols-2">
              {features.map((feature, index) => (
                <article
                  key={feature.title}
                  className={`border-b border-line py-7 last:border-b-0 md:p-8 ${
                    index >= 2 ? "md:border-b-0" : ""
                  } ${index % 2 === 0 ? "md:border-r md:border-line" : ""}`}
                >
                  <feature.icon className="h-6 w-6 text-ink" aria-hidden="true" />
                  <h3 className="mt-5 text-h3 font-semibold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-body text-muted-ink">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Um produto, duas superfícies
                </p>
                <h2 className="mt-4 text-h2 font-semibold text-ink">
                  Gestão no painel. Execução no celular.
                </h2>
                <p className="mt-5 text-body text-muted-ink">
                  O app não substitui a central da operação. Ele aproxima do
                  barbeiro as tarefas que fazem sentido durante o atendimento.
                </p>
              </div>
              <div className="divide-y divide-line border-y border-line">
                <div className="grid gap-3 py-7 sm:grid-cols-[10rem_1fr]">
                  <div className="flex items-center gap-3 font-semibold text-ink">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line">
                      <UsersRound className="h-5 w-5" aria-hidden="true" />
                    </span>
                    Painel web
                  </div>
                  <p className="text-body text-muted-ink">
                    Configuração, equipe, disponibilidade, supervisão,
                    relatórios e decisões de gestão.
                  </p>
                </div>
                <div className="grid gap-3 py-7 sm:grid-cols-[10rem_1fr]">
                  <div className="flex items-center gap-3 font-semibold text-ink">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line">
                      <Smartphone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    Aplicativo
                  </div>
                  <p className="text-body text-muted-ink">
                    Agenda do dia, presença, cliente e comanda no contexto de
                    quem está atendendo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Perguntas frequentes
              </p>
              <h2 className="mt-4 text-h2 font-semibold text-ink">
                O que já dá para afirmar.
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-ink marker:content-none">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="text-xl font-normal transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-body text-muted-ink">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-surface-2">
          <div className="container-page section-tight flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-label font-semibold text-ink">
                <Check className="h-4 w-4" aria-hidden="true" />
                Não precisa esperar o aplicativo.
              </p>
              <p className="mt-2 text-body text-muted-ink">
                O painel web e a IA no WhatsApp são a entrada atual da Flowo.
              </p>
            </div>
            <TrackedLink
              href={SIGNUP_URL}
              event="CTA Clicked"
              properties={{
                page: PATH,
                placement: "closing",
                destination: "dashboard_signup",
                intent: "start_now",
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
            >
              Começar pelo painel web
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
