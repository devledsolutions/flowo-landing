import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  MessageCircleMore,
  Settings2,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildSignupUrl } from "@/components/cta-links";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ValidationProductMedia } from "@/components/marketing/validation-product-media";
import { VALIDATION_CASES } from "@/data/validation-cases";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const PAGE_PATH = "/casos-de-validacao";

export const metadata = buildMetadata({
  title: "Flowo em Ação: IA e Agenda para Barbearias",
  description:
    "Veja como a Flowo atende no WhatsApp, consulta horários e mantém a agenda organizada em barbearias solo e com equipe.",
  path: PAGE_PATH,
  type: "article",
  publishedTime: "2026-07-31",
  modifiedTime: "2026-07-31",
});

const flow = [
  {
    icon: MessageCircleMore,
    title: "O cliente chama",
    copy: "A conversa começa no WhatsApp que ele já usa.",
  },
  {
    icon: Settings2,
    title: "A regra entra",
    copy: "Serviço, duração, profissional e expediente orientam a resposta.",
  },
  {
    icon: CalendarCheck2,
    title: "A agenda confirma",
    copy: "A escolha vira um compromisso visível para a operação.",
  },
] as const;

export default function ValidationCasesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl(`${PAGE_PATH}#webpage`),
        url: absoluteUrl(PAGE_PATH),
        name: "Flowo em ação",
        description:
          "Jornadas da Flowo para atendimento e agendamento em barbearias solo e com equipe.",
        inLanguage: "pt-BR",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: VALIDATION_CASES.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: absoluteUrl(`${PAGE_PATH}/${item.slug}`),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Flowo em ação",
            item: absoluteUrl(PAGE_PATH),
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="main-content">
        <section className="on-ink overflow-hidden pb-section-normal pt-32 md:pt-36">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Flowo em ação", href: PAGE_PATH },
              ]}
            />

            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(25rem,1.08fr)] lg:items-center lg:gap-16">
              <div>
                <p className="text-caption font-semibold text-muted-ink">
                  Produto em movimento, não promessa abstrata
                </p>
                <h1 className="mt-4 max-w-[15ch] text-display font-semibold leading-[1.03] tracking-[-0.035em] text-ink-strong">
                  Do “tem horário?” ao compromisso na agenda.
                </h1>
                <p className="mt-6 max-w-[60ch] text-lead leading-relaxed text-muted-ink">
                  Veja como a Flowo aplica o mesmo núcleo de atendimento a dois
                  cenários: quem trabalha sozinho e quem precisa coordenar
                  horários diferentes dentro de uma equipe.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#escolha-seu-perfil"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold text-[#171810]"
                  >
                    Encontrar meu cenário
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <TrackedLink
                    href="/demonstracao-agendamento-whatsapp"
                    event="Validation Hub Demo Clicked"
                    properties={{ page: PAGE_PATH, placement: "hero" }}
                    className="inline-flex min-h-12 items-center justify-center px-5 font-semibold text-ink underline underline-offset-4"
                  >
                    Ver o fluxo completo
                  </TrackedLink>
                </div>
                <p className="mt-5 max-w-[64ch] text-[0.75rem] leading-relaxed text-faint-ink">
                  WhatsApp oficial, agenda conectada e controle humano no mesmo
                  fluxo — do primeiro pedido à confirmação.
                </p>
              </div>

              <div className="relative mx-auto min-h-[34rem] w-full max-w-[38rem] sm:min-h-[39rem]">
                <div className="absolute left-0 top-10 w-[58%] max-w-[19rem] rotate-[-3deg] overflow-hidden rounded-[2.4rem] border-[9px] border-[#11130d] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.28)]">
                  <Image
                    src="/images/validation-cases/product/whatsapp-booking.png"
                    alt="Conversa demonstrativa da Flowo oferecendo horários e confirmando um agendamento"
                    width={1206}
                    height={2622}
                    priority
                    sizes="(max-width: 640px) 54vw, 304px"
                    className="h-auto w-full"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-[58%] max-w-[19rem] rotate-[3deg] overflow-hidden rounded-[2.4rem] border-[9px] border-[#11130d] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.28)]">
                  <Image
                    src="/images/validation-cases/product/agenda-team.png"
                    alt="Agenda demonstrativa da Flowo com profissionais e horários diferentes"
                    width={1080}
                    height={2400}
                    priority
                    sizes="(max-width: 640px) 54vw, 304px"
                    className="h-auto w-full"
                  />
                </div>
                <div className="absolute bottom-20 left-[33%] z-10 max-w-[13rem] rounded-xl bg-[#f8f6f2] p-4 text-[#171810] shadow-[0_8px_20px_rgba(0,0,0,0.22)] sm:max-w-[15rem] sm:p-5">
                  <p className="text-caption font-semibold">A mesma informação</p>
                  <p className="mt-1 text-[0.78rem] leading-relaxed text-[#56594f]">
                    escolhida na conversa e visível para a operação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="container-page grid gap-px bg-line md:grid-cols-3">
            {flow.map((item) => (
              <article
                key={item.title}
                className="flex gap-4 bg-surface px-5 py-6 sm:px-7"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-semibold text-ink">{item.title}</h2>
                  <p className="mt-1 text-label leading-relaxed text-muted-ink">
                    {item.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-normal" id="escolha-seu-perfil">
          <div className="container-page">
            <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-caption font-semibold text-muted-ink">
                  Escolha pela rotina, não pelo tamanho do logo
                </p>
                <h2 className="mt-3 max-w-[13ch] text-h2 font-semibold leading-tight text-ink-strong">
                  Qual dessas operações mais parece com a sua?
                </h2>
              </div>
              <p className="max-w-[62ch] text-body leading-relaxed text-muted-ink">
                Os dois cenários usam o mesmo fundamento: disponibilidade real e
                controle humano. O que muda é a quantidade de profissionais e o
                nível de coordenação que a rotina exige.
              </p>
            </div>
          </div>
        </section>

        {VALIDATION_CASES.map((validationCase, index) => {
          const signupUrl = buildSignupUrl({
            plan: validationCase.plan.toLowerCase() as "solo" | "equipe",
            campaign: "validation_hub",
            content: validationCase.slug,
          });

          return (
            <section
              key={validationCase.slug}
              className={`section-normal border-t border-line ${
                index % 2 === 0 ? "bg-surface" : "on-ink"
              }`}
            >
              <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
                <div className={index % 2 === 0 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f4f0e5] p-1">
                      <Image
                        src={validationCase.logo}
                        alt={`Identidade visual da ${validationCase.name}`}
                        width={80}
                        height={80}
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <div>
                      <p className="text-xl font-semibold text-ink">
                        {validationCase.name}
                      </p>
                      <p className="mt-1 text-caption text-muted-ink">
                        {validationCase.location} · {validationCase.profile}
                      </p>
                    </div>
                  </div>

                  <h2 className="mt-8 max-w-[15ch] text-h2 font-semibold leading-tight text-ink-strong">
                    {validationCase.headline}
                  </h2>
                  <p className="mt-5 max-w-[60ch] text-body leading-relaxed text-muted-ink">
                    {validationCase.campaignPromise}
                  </p>

                  <ul className="mt-7 divide-y divide-line border-y border-line">
                    {validationCase.proofPoints.slice(0, 3).map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 py-4 text-label font-semibold text-ink"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <TrackedLink
                      href={`${PAGE_PATH}/${validationCase.slug}`}
                      event="Validation Case Opened"
                      properties={{
                        page: PAGE_PATH,
                        profile: validationCase.slug,
                        placement: "campaign_profile",
                      }}
                      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold ${
                        index % 2 === 0 ? "text-cream" : "text-[#171810]"
                      }`}
                    >
                      Ver campanha completa
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </TrackedLink>
                    <TrackedLink
                      href={signupUrl}
                      event="Validation Hub Signup Clicked"
                      properties={{
                        page: PAGE_PATH,
                        profile: validationCase.slug,
                        plan: validationCase.plan.toLowerCase(),
                      }}
                      className="inline-flex min-h-12 items-center justify-center px-5 font-semibold text-ink underline underline-offset-4"
                    >
                      Ver plano {validationCase.plan}
                    </TrackedLink>
                  </div>
                </div>

                <ValidationProductMedia
                  media={validationCase.heroMedia}
                  dark={index % 2 !== 0}
                />
              </div>
            </section>
          );
        })}

        <section className="section-normal border-t border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-caption font-semibold text-muted-ink">
                  Da mensagem ao horário marcado
                </p>
                <h2 className="mt-3 max-w-[13ch] text-h2 font-semibold leading-tight text-ink-strong">
                  A IA atende. A agenda acompanha. Você mantém o controle.
                </h2>
              </div>
              <p className="max-w-[68ch] text-lead leading-relaxed text-ink">
                A Flowo transforma pedidos no WhatsApp em compromissos organizados:
                entende o que o cliente precisa, consulta a disponibilidade e
                registra cada mudança na agenda certa.
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-3">
              <article className="bg-surface-2 p-6 sm:p-8">
                <MessageCircleMore className="h-6 w-6 text-ink" aria-hidden="true" />
                <h3 className="mt-6 text-lg font-semibold text-ink">
                  Atende sem interromper o corte
                </h3>
                <p className="mt-3 text-label leading-relaxed text-muted-ink">
                  O cliente recebe respostas e opções de horário no WhatsApp que
                  já usa.
                </p>
              </article>
              <article className="bg-surface-2 p-6 sm:p-8">
                <CalendarCheck2 className="h-6 w-6 text-ink" aria-hidden="true" />
                <h3 className="mt-6 text-lg font-semibold text-ink">
                  Atualiza a agenda no mesmo fluxo
                </h3>
                <p className="mt-3 text-label leading-relaxed text-muted-ink">
                  Confirmações, remarcações e cancelamentos continuam ligados ao
                  compromisso certo.
                </p>
              </article>
              <article className="bg-surface-2 p-6 sm:p-8">
                <Settings2 className="h-6 w-6 text-ink" aria-hidden="true" />
                <h3 className="mt-6 text-lg font-semibold text-ink">
                  Entrega o controle para a equipe
                </h3>
                <p className="mt-3 text-label leading-relaxed text-muted-ink">
                  Quando uma pessoa precisa assumir, o histórico continua no mesmo
                  lugar e a IA pode ser pausada.
                </p>
              </article>
            </div>

            <Link
              href="/demonstracao-agendamento-whatsapp"
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline underline-offset-4"
            >
              Ver a Flowo funcionando
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-caption font-semibold text-muted-ink">
                Se sua rotina não cabe nos dois exemplos
              </p>
              <h2 className="mt-3 max-w-[14ch] text-h2 font-semibold leading-tight text-ink-strong">
                Faça o Raio-X antes de escolher o plano.
              </h2>
            </div>
            <div>
              <p className="max-w-[62ch] text-body leading-relaxed text-muted-ink">
                Mapeie mensagens, escala, intervalos, folgas e regras da equipe.
                Você recebe um diagnóstico gratuito e chega à conversa comercial
                sabendo o que precisa ser configurado.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href="/recursos/diagnostico-agenda-barbearia"
                  event="Lead Magnet CTA Clicked"
                  properties={{
                    page: PAGE_PATH,
                    placement: "closing",
                    lead_magnet: "diagnostico_agenda_barbearia",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold text-[#171810]"
                >
                  Fazer o Raio-X gratuito
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <Link
                  href="/#precos"
                  className="inline-flex min-h-12 items-center justify-center px-5 font-semibold text-ink underline underline-offset-4"
                >
                  Comparar os planos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
