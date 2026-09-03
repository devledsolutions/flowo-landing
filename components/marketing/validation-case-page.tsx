import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  Check,
  CheckCircle2,
  MessageCircle,
  Repeat2,
  UserRoundCheck,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildSignupUrl } from "@/components/cta-links";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat, type ChatMessage } from "@/components/home/whatsapp-chat";
import { ProductDisclaimer } from "@/components/home/product-previews";
import type { ValidationCase } from "@/data/validation-cases";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface ValidationCasePageProps {
  validationCase: ValidationCase;
}

const stepIcons = [CalendarCheck2, Repeat2, UserRoundCheck, MessageCircle] as const;

const CASES_PATH = "/casos-de-validacao";
const DATE_MODIFIED = "2026-09-03";

export function ValidationCasePage({ validationCase }: ValidationCasePageProps) {
  const pagePath = `${CASES_PATH}/${validationCase.slug}`;
  const conversation = validationCase.conversation as ChatMessage[];
  const headline = validationCase.headline.join(" ");
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
        headline,
        description: validationCase.summary,
        inLanguage: "pt-BR",
        datePublished: "2026-07-31",
        dateModified: DATE_MODIFIED,
        author: { "@type": "Organization", name: "Flowo", url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: "Flowo", url: absoluteUrl("/") },
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
          { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Flowo em ação", item: absoluteUrl(CASES_PATH) },
          { "@type": "ListItem", position: 3, name: validationCase.name, item: absoluteUrl(pagePath) },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: validationCase.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main-content">
        <section className="border-b border-line bg-cream pb-16 pt-32 md:pt-40 lg:pb-24">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Flowo em ação", href: CASES_PATH },
                { label: validationCase.name, href: pagePath },
              ]}
            />

            <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
              <div className="lg:sticky lg:top-28">
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

                <h1 className="mt-8 text-[clamp(2rem,1.6rem+1.1vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink-strong">
                  {validationCase.headline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="mt-6 max-w-[30rem] text-lead text-muted-ink">{validationCase.lead}</p>

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
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
                  >
                    Começar com o plano {validationCase.plan}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                  <TrackedLink
                    href="/demonstracao-agendamento-whatsapp"
                    event="Validation Case Demo Clicked"
                    properties={{ page: pagePath, placement: "hero" }}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-control-border px-7 text-label font-semibold text-ink transition-colors hover:bg-surface"
                  >
                    Ver a demonstração completa
                  </TrackedLink>
                </div>

                <h2 className="mt-14 text-caption font-semibold uppercase tracking-[0.1em] text-faint-ink">
                  O que aconteceu na agenda
                </h2>
                <ol className="mt-4 divide-y divide-line border-y border-line">
                  {validationCase.agendaSteps.map(({ title, detail, tone }, index) => {
                    const Icon = stepIcons[index] ?? CheckCircle2;
                    return (
                      <li key={title} className="flex items-start gap-4 py-4">
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                            tone === "ok"
                              ? "bg-[oklch(0.91_0.08_150)] text-[oklch(0.43_0.11_150)]"
                              : "bg-surface-2 text-muted-ink"
                          )}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink">{title}</p>
                          <p className="mt-0.5 text-caption text-muted-ink">{detail}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="mx-auto w-[340px] max-w-full lg:w-full lg:max-w-[24rem] lg:justify-self-end">
                <PhoneFrame className="border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)] lg:hidden">
                  <WhatsAppChat width={340} logicalHeight={validationCase.conversationHeight} messages={conversation} businessName={validationCase.name} />
                </PhoneFrame>
                <PhoneFrame className="hidden border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)] lg:block">
                  <WhatsAppChat width={384} logicalHeight={validationCase.conversationHeight} messages={conversation} businessName={validationCase.name} />
                </PhoneFrame>
                <ProductDisclaimer label="Conversa ilustrativa, com nomes de demonstração" className="mt-4" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="container-page grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {validationCase.proofPoints.map((item) => (
              <div key={item} className="flex min-h-24 items-center gap-3 bg-surface px-5 py-5 sm:px-6">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
                <p className="text-label font-semibold leading-snug text-ink">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-caption font-semibold text-muted-ink">Como é hoje</p>
              <h2 className="mt-3 max-w-[14ch] text-h2 font-semibold leading-tight text-ink-strong">
                O problema não é a mensagem. É o que vem depois dela.
              </h2>
              <p className="mt-5 max-w-measure text-body leading-relaxed text-muted-ink">
                {validationCase.routine}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              <div className="grid grid-cols-[1fr_1fr] border-b border-line bg-surface-2 px-5 py-4 text-caption font-semibold text-ink sm:px-7">
                <span>Sem a Flowo</span>
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

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
              <h2 className="max-w-[14ch] text-h2 font-semibold leading-tight text-ink-strong">
                O horário aparece na agenda. Na hora.
              </h2>
              <p className="max-w-[62ch] text-body leading-relaxed text-muted-ink">
                O que a Flowo combina no WhatsApp entra na agenda que você e a equipe já olham.
              </p>
            </div>

            <div className="mt-10 grid gap-8">
              {validationCase.screens.map((screen) => (
                <figure key={screen.src}>
                  <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_36px_80px_-44px_oklch(0.08_0.01_110/0.9)]">
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={1920}
                      height={1041}
                      sizes="(min-width: 1280px) 1200px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="text-label text-muted-ink">
                      <span className="font-semibold text-ink">{screen.label}.</span> {screen.caption}
                    </p>
                    <ProductDisclaimer label="Telas do app com dados ilustrativos" className="shrink-0" />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-caption font-semibold text-muted-ink">O que precisa estar pronto</p>
              <h2 className="mt-3 max-w-[14ch] text-h2 font-semibold leading-tight text-ink-strong">
                A Flowo segue a sua regra.
              </h2>
              <p className="mt-5 max-w-measure text-body leading-relaxed text-muted-ink">
                Na configuração, você cadastra o que a Flowo precisa respeitar. A equipe da Flowo ajuda
                conforme o plano.
              </p>
            </div>

            <ul className="divide-y divide-line border-y border-line">
              {validationCase.setup.map((item) => (
                <li key={item} className="flex items-start gap-4 py-5 text-body leading-relaxed text-muted-ink">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <h2 className="max-w-[12ch] text-h2 font-semibold leading-tight text-ink-strong">
                  O que muda no seu dia.
                </h2>
                <p className="mt-5 max-w-measure text-body leading-relaxed text-muted-ink">
                  O WhatsApp em que o cliente chama e a agenda em que vocês trabalham passam a ser a
                  mesma coisa.
                </p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-3">
                {validationCase.capabilities.map((item) => (
                  <article key={item.title} className="bg-surface p-6 sm:p-7">
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-3 text-label leading-relaxed text-muted-ink">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-label text-muted-ink">Plano {validationCase.plan}</p>
              <h2 className="mt-4 max-w-[14ch] text-h2 font-semibold leading-tight text-ink-strong">
                Parece com a sua barbearia?
              </h2>
            </div>
            <div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {validationCase.suitedFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-t border-line py-4 text-body text-muted-ink">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
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
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold text-cream"
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
              <p className="text-caption font-semibold text-muted-ink">Dúvidas antes de decidir</p>
              <h2 className="mt-3 max-w-[12ch] text-h2 font-semibold leading-tight text-ink-strong">
                Sem condição escondida.
              </h2>
              <p className="mt-5 flex items-start gap-3 text-body text-muted-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                Esta é uma barbearia cliente da Flowo. A conversa e a agenda desta página são
                ilustrativas, com dados de teste e nomes de demonstração. O atendimento foi testado no
                sistema real da Flowo em 26 de julho de 2026, com números de teste nossos. Ainda não
                medimos tempo economizado nem faturamento nesta barbearia; quando medirmos, publicamos
                com período e contexto.
              </p>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {validationCase.faqs.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink marker:content-none">
                    {item.question}
                    <span aria-hidden="true" className="text-xl font-normal transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-[68ch] pb-2 pr-8 text-body leading-relaxed text-muted-ink">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-surface section-tight">
          <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={CASES_PATH}
              className="inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink underline-offset-4 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Ver as duas barbearias
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
