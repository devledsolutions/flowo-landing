import Link from "next/link";
import {
  ArrowRight,
  Check,
  ExternalLink,
  MessageCircle,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { FlowoProductProof } from "@/components/marketing/flowo-product-proof";
import { WHATSAPP_URL } from "@/components/cta-links";
import {
  COMPARISON_LAST_VERIFIED,
  COMPARISON_LAST_VERIFIED_LABEL,
  COMPETITOR_COMPARISONS,
  type CompetitorComparison,
} from "@/data/competitor-comparisons";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

interface CompetitorComparisonPageProps {
  comparison: CompetitorComparison;
}

function ComparisonSchema({
  comparison,
}: {
  comparison: CompetitorComparison;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.seoTitle,
    description: comparison.seoDescription,
    datePublished: comparison.publishedAt,
    dateModified: COMPARISON_LAST_VERIFIED,
    inLanguage: "pt-BR",
    mainEntityOfPage: absoluteUrl(comparison.path),
    author: {
      "@type": "Organization",
      name: "Flowo",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Flowo",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/flowo-logo.svg"),
      },
    },
    about: [
      {
        "@type": "SoftwareApplication",
        name: "Flowo",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: SITE_URL,
      },
      {
        "@type": "SoftwareApplication",
        name: comparison.name,
        applicationCategory: "BusinessApplication",
      },
    ],
    citation: comparison.sources.map((source) => source.url),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Comparar",
        item: absoluteUrl("/comparar"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Flowo vs ${comparison.name}`,
        item: absoluteUrl(comparison.path),
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {[articleSchema, breadcrumbSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full border border-cream/50" />
      <span className="h-2.5 w-2.5 rounded-full border border-cream/50" />
      <span className="h-2.5 w-2.5 rounded-full border border-cream/50" />
    </div>
  );
}

function ComparisonSnapshot({
  comparison,
}: {
  comparison: CompetitorComparison;
}) {
  return (
    <div className="relative isolate pb-5 pr-3 sm:pr-5">
      <div
        className="absolute inset-0 translate-x-3 translate-y-5 border border-line bg-surface-2 sm:translate-x-5"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden border border-ink bg-surface">
        <div className="flex min-h-11 items-center justify-between bg-ink px-4 text-cream">
          <WindowDots />
          <span className="text-[0.65rem] font-semibold tracking-[0.08em] text-cream/70">
            quadro-de-decisao.flowo
          </span>
          <span className="w-[3.25rem]" aria-hidden="true" />
        </div>

        <div className="p-5 sm:p-7">
          <p className="text-caption font-semibold text-muted-ink">
            Decisão em 30 segundos
          </p>
          <h2 className="mt-2 text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {comparison.snapshotQuestion}
          </h2>

          <div className="mt-6 overflow-hidden border border-line">
            <div className="grid grid-cols-[0.82fr_1fr_1fr] border-b border-line bg-surface-2 text-caption font-semibold text-ink">
              <span className="px-3 py-3 text-muted-ink">Critério</span>
              <span className="border-l border-line px-3 py-3">Flowo</span>
              <span className="border-l border-line px-3 py-3">
                {comparison.name}
              </span>
            </div>
            {comparison.snapshotRows.map((row) => (
              <div
                key={row.criterion}
                className="grid grid-cols-[0.82fr_1fr_1fr] border-b border-line text-[0.72rem] leading-snug text-ink last:border-b-0 sm:text-sm"
              >
                <span className="px-3 py-3 font-medium text-muted-ink">
                  {row.criterion}
                </span>
                <span className="border-l border-line bg-surface-2 px-3 py-3 font-medium">
                  {row.flowo}
                </span>
                <span className="border-l border-line px-3 py-3">
                  {row.competitor}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-2 text-caption leading-relaxed text-muted-ink">
            <ShieldCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-ink"
              aria-hidden="true"
            />
            <span>
              Sem nota inventada. Compare o que muda na rotina e confirme as
              condições vigentes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DecisionSummary({
  comparison,
}: {
  comparison: CompetitorComparison;
}) {
  return (
    <section
      id="resumo"
      className="section-tight scroll-mt-28 border-y border-line bg-surface"
    >
      <div className="container-page">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-muted-ink">
              A resposta curta
            </p>
            <h2 className="mt-3 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
              Comece pelo tipo de rotina que você quer operar.
            </h2>
          </div>

          <div>
            <p className="mb-7 max-w-[70ch] text-body text-muted-ink">
              {comparison.summary}
            </p>
            <dl className="border-y border-line">
              <div className="grid gap-3 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-ink">Escolha Flowo se</dt>
                <dd className="text-body text-muted-ink">
                  {comparison.flowoFit}
                </dd>
              </div>
              <div className="grid gap-3 py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-ink">
                  Considere {comparison.name} se
                </dt>
                <dd className="text-body text-muted-ink">
                  {comparison.competitorFit}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-4 bg-surface-2 p-5 sm:p-6">
              <Scale className="mt-1 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
              <div>
                <h3 className="text-base font-semibold text-ink">
                  Veredito sem vencedor automático
                </h3>
                <p className="mt-2 text-body text-muted-ink">
                  {comparison.honestVerdict}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailedComparison({
  comparison,
}: {
  comparison: CompetitorComparison;
}) {
  return (
    <section id="comparacao" className="section-normal scroll-mt-28">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-20">
          <h2 className="text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
            O que muda na rotina, critério por critério.
          </h2>
          <p className="text-lead text-muted-ink">
            Cada linha separa o que a Flowo entrega do que a plataforma
            concorrente declara publicamente. Módulos, limites e condições
            devem ser confirmados antes da contratação.
          </p>
        </div>

        <div className="mt-10 hidden overflow-hidden border border-line md:block">
          <table className="w-full border-collapse">
            <caption className="sr-only">
              Comparação entre Flowo e {comparison.name}
            </caption>
            <thead>
              <tr className="border-b border-line bg-surface">
                <th className="w-[22%] px-6 py-5 text-left text-label font-medium text-muted-ink">
                  Critério
                </th>
                <th className="w-[39%] border-l border-line bg-surface-2 px-6 py-5 text-left text-label font-semibold text-ink">
                  Flowo
                </th>
                <th className="w-[39%] border-l border-line px-6 py-5 text-left text-label font-semibold text-ink">
                  {comparison.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr
                  key={row.criterion}
                  className="border-b border-line last:border-b-0"
                >
                  <th
                    scope="row"
                    className="bg-surface px-6 py-6 text-left align-top text-sm font-semibold text-ink"
                  >
                    {row.criterion}
                  </th>
                  <td className="border-l border-line bg-surface-2 px-6 py-6 align-top text-sm leading-relaxed text-ink">
                    {row.flowo}
                  </td>
                  <td className="border-l border-line px-6 py-6 align-top text-sm leading-relaxed text-muted-ink">
                    {row.competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 divide-y divide-line border-y border-line md:hidden">
          {comparison.rows.map((row) => (
            <article key={row.criterion} className="py-6">
              <h3 className="text-base font-semibold text-ink">
                {row.criterion}
              </h3>
              <dl className="mt-4 grid gap-4">
                <div className="bg-surface-2 p-4">
                  <dt className="text-caption font-semibold text-ink">Flowo</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink">
                    {row.flowo}
                  </dd>
                </div>
                <div className="border border-line bg-surface p-4">
                  <dt className="text-caption font-semibold text-ink">
                    {comparison.name}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-ink">
                    {row.competitor}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CompetitorComparisonPage({
  comparison,
}: CompetitorComparisonPageProps) {
  const related = COMPETITOR_COMPARISONS.filter(
    (item) => item.id !== comparison.id,
  ).slice(0, 3);

  return (
    <>
      <ComparisonSchema comparison={comparison} />
      <Navbar />
      <main id="main-content">
        <section className="pb-section-normal pt-28 md:pt-32">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Comparar", href: "/comparar" },
                {
                  label: `Flowo vs ${comparison.name}`,
                  href: comparison.path,
                },
              ]}
            />

            <div className="mt-10 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
              <div>
                <p className="text-sm font-semibold text-muted-ink">
                  {comparison.eyebrow}
                </p>
                <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,4.2vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-strong">
                  {comparison.headline}
                </h1>
                <p className="mt-6 max-w-[65ch] text-lead text-muted-ink">
                  {comparison.heroSummary}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#resumo"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-label font-semibold text-cream transition-colors duration-200 hover:bg-ink/90"
                  >
                    Ver a resposta em 30 segundos
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link
                    href="/precos"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-surface px-6 text-label font-semibold text-ink transition-colors duration-200 hover:bg-surface-2"
                  >
                    Ver planos e condições
                  </Link>
                </div>

                <p className="mt-5 flex items-start gap-2 text-caption text-muted-ink">
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  Fontes oficiais verificadas em {COMPARISON_LAST_VERIFIED_LABEL}.
                </p>
              </div>

              <ComparisonSnapshot comparison={comparison} />
            </div>
          </div>
        </section>

        <DecisionSummary comparison={comparison} />
        <DetailedComparison comparison={comparison} />

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
              <h2 className="text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                Compare o pacote que resolve o problema.
              </h2>
              <div>
                <p className="text-lead text-muted-ink">
                  {comparison.priceSummary}
                </p>
                <ul className="mt-7 space-y-4">
                  {comparison.keyDifferences.map((difference) => (
                    <li
                      key={difference}
                      className="flex items-start gap-3 text-body text-ink"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      {difference}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/precos"
                  className="mt-8 inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-muted-ink"
                >
                  Conferir os planos Flowo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FlowoProductProof
          competitorName={comparison.name}
          includeFilm={false}
          compact
        />

        <section className="section-normal">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
              <div>
                <h2 className="text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Dúvidas antes de decidir.
                </h2>
                <p className="mt-4 text-lead text-muted-ink">
                  Respostas diretas, sem esconder quando a outra opção pode fazer
                  mais sentido.
                </p>
              </div>
              <div className="border-t border-line">
                {comparison.faq.map((item) => (
                  <details
                    key={item.question}
                    className="group border-b border-line"
                  >
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-semibold text-ink marker:content-none">
                      {item.question}
                      <span
                        className="text-xl font-normal transition-transform duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-[70ch] pb-6 text-body text-muted-ink">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-tight border-y border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
              <div>
                <h2 className="text-h3 font-semibold text-ink-strong">
                  Metodologia e fontes
                </h2>
                <p className="mt-3 text-body text-muted-ink">
                  Consultamos somente páginas oficiais acessíveis ao público.
                  Não usamos avaliações anônimas nem presumimos que um recurso
                  está incluído quando o fornecedor o apresenta como adicional.
                </p>
              </div>
              <div>
                <ul className="space-y-3">
                  {comparison.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-14 items-start justify-between gap-4 border border-line bg-cream p-4 text-sm text-ink transition-colors duration-200 hover:bg-surface-2"
                      >
                        <span>
                          <span className="font-semibold">{source.label}</span>
                          <span className="mt-1 block text-muted-ink">
                            {source.scope}
                          </span>
                        </span>
                        <ExternalLink
                          className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-caption text-muted-ink">
                  Publicado em {comparison.publishedAt.split("-").reverse().join("/")}.
                  Última verificação: {COMPARISON_LAST_VERIFIED_LABEL}. Marcas e
                  nomes de terceiros pertencem aos respectivos titulares. A
                  Flowo não possui afiliação com {comparison.name}.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal on-ink">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-20">
              <h2 className="max-w-[16ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                Agora compare com a rotina real da sua barbearia.
              </h2>
              <div>
                <p className="text-lead text-muted-ink">
                  Conte como sua equipe agenda, confirma e recebe. A gente mostra
                  o fluxo real, as condições do plano e o que precisa ser
                  configurado.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-light mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-surface px-6 text-label font-semibold text-ink transition-colors duration-200 hover:bg-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Falar sobre minha barbearia
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <h2 className="text-h3 font-semibold text-ink-strong">
                Compare com outra opção.
              </h2>
              <Link
                href="/comparar"
                className="inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-7 divide-y divide-line border-y border-line">
              {related.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="group flex min-h-16 items-center justify-between gap-6 py-4 text-ink"
                >
                  <span className="font-semibold">Flowo vs {item.name}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
