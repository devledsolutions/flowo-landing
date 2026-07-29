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
import { SIGNUP_URL, WHATSAPP_URL } from "@/components/cta-links";
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
    datePublished: COMPARISON_LAST_VERIFIED,
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

function DecisionCard({
  title,
  description,
  highlighted = false,
}: {
  title: string;
  description: string;
  highlighted?: boolean;
}) {
  return (
    <article
      className={
        highlighted
          ? "on-ink rounded-xl border border-line p-7 md:p-8"
          : "rounded-xl border border-line bg-surface p-7 md:p-8"
      }
    >
      <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
        {title}
      </p>
      <p className="mt-4 text-lead font-medium text-ink">{description}</p>
    </article>
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
        <section className="pb-section-tight pt-32 md:pt-40">
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

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  {comparison.eyebrow}
                </p>
                <h1 className="mt-4 max-w-[17ch] text-display font-semibold tracking-[-0.035em] text-ink-strong">
                  {comparison.headline}
                </h1>
              </div>
              <div>
                <p className="text-lead text-muted-ink">{comparison.summary}</p>
                <p className="mt-5 flex items-start gap-2 text-caption text-muted-ink">
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  Fontes oficiais verificadas em{" "}
                  {COMPARISON_LAST_VERIFIED_LABEL}.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={SIGNUP_URL}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
              >
                Conhecer os planos Flowo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#comparacao"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-surface px-6 text-label font-semibold text-ink transition-colors hover:bg-surface-2"
              >
                Ir para a comparação
              </a>
            </div>
          </div>
        </section>

        <section className="section-tight border-y border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-4 md:grid-cols-2">
              <DecisionCard
                title="Escolha Flowo se"
                description={comparison.flowoFit}
                highlighted
              />
              <DecisionCard
                title={`Considere ${comparison.name} se`}
                description={comparison.competitorFit}
              />
            </div>
            <div className="mt-6 rounded-xl border border-line bg-cream p-6 md:flex md:items-start md:gap-5 md:p-8">
              <Scale
                className="h-5 w-5 shrink-0 text-ink"
                aria-hidden="true"
              />
              <div className="mt-4 md:mt-0">
                <h2 className="text-lg font-semibold text-ink">
                  Resposta curta e honesta
                </h2>
                <p className="mt-2 max-w-4xl text-body text-muted-ink">
                  {comparison.honestVerdict}
                </p>
              </div>
            </div>
          </div>
        </section>

        <FlowoProductProof competitorName={comparison.name} />

        <section id="comparacao" className="section-normal scroll-mt-24">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Comparação por critérios
              </p>
              <h2 className="mt-4 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                O que muda na rotina, não só na lista de recursos.
              </h2>
              <p className="mt-4 text-lead text-muted-ink">
                Cada linha separa o que a Flowo entrega do que a plataforma
                concorrente declara publicamente. Módulos e condições devem ser
                confirmados antes da contratação.
              </p>
            </div>

            <div className="mt-10 hidden overflow-hidden rounded-xl border border-line md:block">
              <table className="w-full border-collapse">
                <caption className="sr-only">
                  Comparação entre Flowo e {comparison.name}
                </caption>
                <thead>
                  <tr className="border-b border-line bg-surface">
                    <th className="w-[22%] px-6 py-5 text-left text-label font-medium text-muted-ink">
                      Critério
                    </th>
                    <th className="w-[39%] bg-ink px-6 py-5 text-left text-label font-semibold text-cream">
                      Flowo
                    </th>
                    <th className="w-[39%] px-6 py-5 text-left text-label font-semibold text-ink">
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
                      <td className="bg-ink px-6 py-6 align-top text-sm leading-relaxed text-cream">
                        <span className="flex items-start gap-3">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          {row.flowo}
                        </span>
                      </td>
                      <td className="px-6 py-6 align-top text-sm leading-relaxed text-muted-ink">
                        {row.competitor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-4 md:hidden">
              {comparison.rows.map((row) => (
                <article
                  key={row.criterion}
                  className="overflow-hidden rounded-xl border border-line bg-surface"
                >
                  <h3 className="border-b border-line px-5 py-4 text-label font-semibold text-ink">
                    {row.criterion}
                  </h3>
                  <dl>
                    <div className="on-ink px-5 py-5">
                      <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-faint-ink">
                        Flowo
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ink">
                        {row.flowo}
                      </dd>
                    </div>
                    <div className="px-5 py-5">
                      <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-faint-ink">
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

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Preço e composição
                </p>
                <h2 className="mt-4 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Compare o pacote que resolve o problema.
                </h2>
              </div>
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
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Perguntas frequentes
              </p>
              <h2 className="mt-4 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                Flowo ou {comparison.name}?
              </h2>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-2">
              {comparison.faq.map((item) => (
                <article key={item.question} className="bg-surface p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-ink">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-body text-muted-ink">
                    {item.answer}
                  </p>
                </article>
              ))}
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
                        className="group flex min-h-14 items-start justify-between gap-4 rounded-xl border border-line bg-cream p-4 text-sm text-ink transition-colors hover:bg-surface-2"
                      >
                        <span>
                          <span className="font-semibold">{source.label}</span>
                          <span className="mt-1 block text-muted-ink">
                            {source.scope}
                          </span>
                        </span>
                        <ExternalLink
                          className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-caption text-muted-ink">
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
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Veja na sua rotina
                </p>
                <h2 className="mt-4 max-w-[16ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Descubra se a recepção no WhatsApp é o que falta hoje.
                </h2>
              </div>
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
                  className="preview-light mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-surface px-6 text-label font-semibold text-ink transition-colors hover:bg-white"
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
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Outras comparações
                </p>
                <h2 className="mt-3 text-h3 font-semibold text-ink-strong">
                  Compare antes de decidir.
                </h2>
              </div>
              <Link
                href="/comparar"
                className="hidden min-h-11 items-center gap-2 text-label font-semibold text-ink sm:inline-flex"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="group flex min-h-48 flex-col bg-surface p-6 transition-colors hover:bg-surface-2"
                >
                  <span className="text-caption font-semibold uppercase tracking-[0.12em] text-faint-ink">
                    Comparativo
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-ink">
                    Flowo vs {item.name}
                  </h3>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-label font-semibold text-ink">
                    Ver diferenças
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
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
