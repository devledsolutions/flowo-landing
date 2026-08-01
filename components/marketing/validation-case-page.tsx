import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  Check,
  CheckCircle2,
  MessageCircleMore,
  Settings2,
  UserRoundCheck,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildSignupUrl } from "@/components/cta-links";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ValidationProductMedia } from "@/components/marketing/validation-product-media";
import type { ValidationCase } from "@/data/validation-cases";
import { absoluteUrl } from "@/lib/seo";

interface ValidationCasePageProps {
  validationCase: ValidationCase;
}

const flowIcons = [
  MessageCircleMore,
  Settings2,
  UserRoundCheck,
  CalendarCheck2,
] as const;

export function ValidationCasePage({
  validationCase,
}: ValidationCasePageProps) {
  const pagePath = `/casos-de-validacao/${validationCase.slug}`;
  const signupUrl = buildSignupUrl({
    plan: validationCase.plan.toLowerCase() as "solo" | "equipe",
    campaign: "validation_case",
    content: validationCase.slug,
  });
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": absoluteUrl(`${pagePath}#article`),
        headline: validationCase.headline,
        description: validationCase.summary,
        inLanguage: "pt-BR",
        datePublished: "2026-07-31",
        dateModified: "2026-07-31",
        author: {
          "@type": "Organization",
          name: "Flowo",
          url: absoluteUrl("/"),
        },
        publisher: {
          "@type": "Organization",
          name: "Flowo",
          url: absoluteUrl("/"),
        },
        mainEntityOfPage: absoluteUrl(pagePath),
        about: {
          "@type": "SoftwareApplication",
          name: "Flowo",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, Android, iOS",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${pagePath}#breadcrumb`),
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
            item: absoluteUrl("/casos-de-validacao"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: validationCase.name,
            item: absoluteUrl(pagePath),
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: validationCase.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
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
                { label: "Flowo em ação", href: "/casos-de-validacao" },
                { label: validationCase.name, href: pagePath },
              ]}
            />

            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:items-center lg:gap-20">
              <div>
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f4f0e5] p-1">
                    <Image
                      src={validationCase.logo}
                      alt=""
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{validationCase.name}</p>
                    <p className="mt-1 text-caption text-muted-ink">
                      {validationCase.location} · {validationCase.profile}
                    </p>
                  </div>
                </div>

                <h1 className="mt-8 max-w-[16ch] text-display font-semibold leading-[1.03] tracking-[-0.035em] text-ink-strong">
                  {validationCase.headline}
                </h1>
                <p className="mt-6 max-w-[62ch] text-lead leading-relaxed text-muted-ink">
                  {validationCase.campaignPromise}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <TrackedLink
                    href={signupUrl}
                    event="Validation Case Signup Clicked"
                    properties={{
                      page: pagePath,
                      profile: validationCase.slug,
                      plan: validationCase.plan.toLowerCase(),
                      placement: "hero",
                    }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold text-[#171810] transition-opacity hover:opacity-90"
                  >
                    Começar com o plano {validationCase.plan}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                  <TrackedLink
                    href="/demonstracao-agendamento-whatsapp"
                    event="Validation Case Demo Clicked"
                    properties={{ page: pagePath, placement: "hero" }}
                    className="inline-flex min-h-12 items-center justify-center px-5 font-semibold text-ink underline underline-offset-4"
                  >
                    Ver a demonstração completa
                  </TrackedLink>
                </div>

                <p className="mt-5 max-w-[68ch] text-[0.75rem] leading-relaxed text-faint-ink">
                  WhatsApp oficial, agenda conectada e controle humano no mesmo
                  fluxo.
                </p>
              </div>

              <ValidationProductMedia
                media={validationCase.heroMedia}
                priority
                dark
              />
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="container-page grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {validationCase.proofPoints.map((item) => (
              <div
                key={item}
                className="flex min-h-24 items-center gap-3 bg-surface px-5 py-5 sm:px-6"
              >
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-ink"
                  aria-hidden="true"
                />
                <p className="text-label font-semibold leading-snug text-ink">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-caption font-semibold text-muted-ink">
                A rotina antes da conexão
              </p>
              <h2 className="mt-3 max-w-[12ch] text-h2 font-semibold leading-tight text-ink-strong">
                O problema não é a mensagem. É tudo que vem depois dela.
              </h2>
              <p className="mt-5 max-w-measure text-body leading-relaxed text-muted-ink">
                {validationCase.challenge}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              <div className="grid grid-cols-[1fr_1fr] border-b border-line bg-surface-2 px-5 py-4 text-caption font-semibold text-ink sm:px-7">
                <span>Sem conexão com a agenda</span>
                <span className="pl-5 sm:pl-8">Com a Flowo</span>
              </div>
              <ul className="divide-y divide-line">
                {validationCase.beforeAfter.map((item) => (
                  <li
                    key={item.before}
                    className="grid grid-cols-[1fr_1fr] gap-5 px-5 py-5 text-label leading-relaxed sm:gap-8 sm:px-7"
                  >
                    <p className="text-muted-ink">{item.before}</p>
                    <p className="font-semibold text-ink">{item.after}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="on-ink section-normal overflow-hidden">
          <div className="container-page">
            <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-caption font-semibold text-muted-ink">
                  Da conversa para a operação
                </p>
                <h2 className="mt-3 max-w-[13ch] text-h2 font-semibold leading-tight text-ink-strong">
                  Quatro movimentos. Um único contexto.
                </h2>
              </div>
              <p className="max-w-[62ch] text-body leading-relaxed text-muted-ink">
                O cliente continua no WhatsApp. A Flowo conecta intenção,
                disponibilidade, escolha e registro para que a equipe não precise
                reconstruir a conversa em outro lugar.
              </p>
            </div>

            <ol className="mt-10 border-y border-line">
              {validationCase.steps.map((step, index) => {
                const StepIcon = flowIcons[index] ?? CheckCircle2;
                return (
                  <li
                    key={step.title}
                    className="grid gap-4 border-b border-line py-6 last:border-b-0 md:grid-cols-[3rem_minmax(13rem,0.72fr)_minmax(0,1fr)] md:items-start md:gap-8"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">
                      <StepIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="max-w-[66ch] text-body leading-relaxed text-muted-ink">
                      {step.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="section-normal border-b border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
              <h2 className="max-w-[13ch] text-h2 font-semibold leading-tight text-ink-strong">
                O produto aparece onde a rotina precisa dele.
              </h2>
              <p className="max-w-[62ch] text-body leading-relaxed text-muted-ink">
                Veja como conversa, agenda e controle operacional se encontram na
                rotina: o pedido entra pelo WhatsApp, vira compromisso e continua
                visível para quem cuida da operação.
              </p>
            </div>

            <div
              className={`mt-10 grid gap-5 ${
                validationCase.supportingMedia.length > 2
                  ? "lg:grid-cols-3"
                  : "md:grid-cols-2"
              }`}
            >
              {validationCase.supportingMedia.map((media) => (
                <ValidationProductMedia key={media.src} media={media} compact />
              ))}
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-caption font-semibold text-muted-ink">
                O que precisa estar pronto
              </p>
              <h2 className="mt-3 max-w-[13ch] text-h2 font-semibold leading-tight text-ink-strong">
                A automação funciona em cima da sua regra.
              </h2>
              <p className="mt-5 max-w-measure text-body leading-relaxed text-muted-ink">
                O onboarding organiza as informações que a IA e a agenda precisam
                respeitar. A equipe da Flowo orienta a implantação conforme o plano
                contratado.
              </p>
            </div>

            <ul className="divide-y divide-line border-y border-line">
              {validationCase.setup.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 py-5 text-body leading-relaxed text-muted-ink"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-line bg-surface section-normal">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="text-caption font-semibold text-muted-ink">
                  O fluxo funcionando de ponta a ponta
                </p>
                <h2 className="mt-3 max-w-[13ch] text-h2 font-semibold leading-tight text-ink-strong">
                  Do pedido do cliente ao horário confirmado.
                </h2>
              </div>
              <div>
                <p className="max-w-[68ch] text-lead leading-relaxed text-ink">
                  {validationCase.operationalOutcome}
                </p>
                <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 text-label text-muted-ink sm:flex-row sm:items-center sm:justify-between">
                  <span>
                    Atendimento no WhatsApp, agenda atualizada e equipe no controle.
                  </span>
                  <Link
                    href="/demonstracao-agendamento-whatsapp"
                    className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline underline-offset-4"
                  >
                    Ver a Flowo funcionando
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <h2 className="max-w-[12ch] text-h2 font-semibold leading-tight text-ink-strong">
                  O que muda na sua rotina.
                </h2>
                <p className="mt-5 max-w-measure text-body leading-relaxed text-muted-ink">
                  Não é uma coleção de telas. É uma ligação operacional entre o
                  canal em que o cliente chama e a agenda em que sua equipe trabalha.
                </p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-3">
                {validationCase.capabilities.map((item) => (
                  <article key={item.title} className="bg-surface p-6 sm:p-7">
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-3 text-label leading-relaxed text-muted-ink">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-label text-muted-ink">
                Perfil indicado para o plano {validationCase.plan}
              </p>
              <h2 className="mt-4 max-w-[13ch] text-h2 font-semibold leading-tight text-ink-strong">
                Esse cenário se parece com sua barbearia?
              </h2>
            </div>
            <div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {validationCase.suitedFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t border-line py-4 text-body text-muted-ink"
                  >
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-ink"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href={signupUrl}
                  event="Validation Case Signup Clicked"
                  properties={{
                    page: pagePath,
                    profile: validationCase.slug,
                    plan: validationCase.plan.toLowerCase(),
                    placement: "profile_fit",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold text-[#171810]"
                >
                  Escolher o plano {validationCase.plan}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href="/recursos/diagnostico-agenda-barbearia"
                  event="Lead Magnet CTA Clicked"
                  properties={{
                    page: pagePath,
                    placement: "profile_fit",
                    lead_magnet: "diagnostico_agenda_barbearia",
                  }}
                  className="inline-flex min-h-12 items-center justify-center px-5 font-semibold text-ink underline underline-offset-4"
                >
                  Fazer o Raio-X antes de escolher
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div>
              <p className="text-caption font-semibold text-muted-ink">
                Dúvidas antes de decidir
              </p>
              <h2 className="mt-3 max-w-[12ch] text-h2 font-semibold leading-tight text-ink-strong">
                Sem condição escondida.
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {validationCase.faqs.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink marker:content-none">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="text-xl font-normal transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[68ch] pb-2 pr-8 text-body leading-relaxed text-muted-ink">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-surface section-tight">
          <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/casos-de-validacao"
              className="inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink underline-offset-4 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Ver os dois perfis
            </Link>
            <Link
              href={`/${validationCase.planAnchor}`}
              className="inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink underline underline-offset-4"
            >
              Comparar todos os planos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
