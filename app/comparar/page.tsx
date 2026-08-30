import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  FlowoDeliveryMap,
  FlowoProductProof,
} from "@/components/marketing/flowo-product-proof";
import { CompetitiveMatrix } from "@/components/marketing/competitive-matrix";
import {
  COMPARISON_LAST_VERIFIED_LABEL,
  COMPETITOR_COMPARISONS,
} from "@/data/competitor-comparisons";
import { formatBRL, getPlan } from "@/data/pricing-data";
import { absoluteUrl, buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flowo vs Trinks, BestBarbers e Outros Sistemas",
  description:
    "Compare Flowo com Trinks, BestBarbers, AppBarber, Barbeiro.app, Opero, Barva, Avec e Graces em IA, agenda, gestão, preço e perfil ideal.",
  path: "/comparar",
});

const criteria = [
  {
    label: "Atendimento no WhatsApp",
    manual: "A equipe responde e confere horários",
    flowo: "A IA conversa e consulta a agenda",
  },
  {
    label: "Horários por profissional",
    manual: "Regras separadas e conferência manual",
    flowo: "Disponibilidade individual na mesma agenda",
  },
  {
    label: "Confirmação",
    manual: "Lembretes enviados um a um",
    flowo: "Lembretes e confirmação no fluxo",
  },
  {
    label: "Comanda e caixa",
    manual: "Anotações e planilhas separadas",
    flowo: "Atendimento, comanda e registro conectados",
  },
] as const;

const soloPrice = formatBRL(getPlan("solo").monthly);

const manualComparisons = [
  {
    icon: CalendarDays,
    title: "Flowo vs agenda manual",
    description:
      "Para quem ainda cruza caderno, calendário e mensagens antes de confirmar cada horário.",
    href: "/flowo-vs-agenda-manual",
  },
  {
    icon: ClipboardList,
    title: "Flowo vs planilha",
    description:
      "Para quem registra dados depois do trabalho, mas ainda executa a rotina fora da planilha.",
    href: "/flowo-vs-planilha",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp conectado à operação",
    description:
      "Para entender a diferença entre apenas conversar e usar a agenda como fonte da resposta.",
    href: "/agenda-barbearia-whatsapp",
  },
] as const;

const decisionPaths = [
  {
    label: "WhatsApp como recepção",
    detail: "Compare Flowo, Opero e Barva",
    href: "/flowo-vs-opero",
  },
  {
    label: "Aplicativo próprio",
    detail: "Compare AppBarber e BestBarbers",
    href: "/flowo-vs-appbarber",
  },
  {
    label: "Gestão e backoffice amplos",
    detail: "Compare Trinks, Avec e Graces",
    href: "/flowo-vs-trinks",
  },
  {
    label: "Menor preço de entrada",
    detail: "Compare Barbeiro.app e Opero",
    href: "/flowo-vs-barbeiro-app",
  },
] as const;

const hubFaq = [
  {
    question: "Qual é o melhor sistema para barbearia?",
    answer:
      "Depende do gargalo. O Flowo tende a fazer mais sentido quando o WhatsApp é a principal porta de entrada e a equipe precisa de uma IA que atenda e agende. Outras plataformas podem ser mais adequadas quando marketplace, estoque detalhado, aplicativo próprio ou menor preço inicial são prioridades.",
  },
  {
    question: "O Flowo é mais barato que Trinks, AppBarber ou Barbeiro.app?",
    answer:
      `Não necessariamente. O Flowo começa em ${soloPrice}/mês e inclui o atendimento no WhatsApp ligado à agenda. Alguns concorrentes têm planos-base mais baratos, mas podem cobrar módulos adicionais. Compare o pacote completo necessário para a sua rotina.`,
  },
  {
    question: "Como as comparações foram feitas?",
    answer:
      "A Flowo consulta páginas oficiais dos concorrentes, registra a data e o escopo da fonte e separa recursos incluídos de módulos adicionais. Não usamos avaliações anônimas para afirmar vantagens.",
  },
] as const;

function ComparisonHubSchema() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Comparativos de sistemas para barbearias",
    itemListElement: COMPETITOR_COMPARISONS.map((comparison, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Flowo vs ${comparison.name}`,
      url: absoluteUrl(comparison.path),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hubFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
    ],
  };

  return (
    <>
      {[itemListSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
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

function DecisionWindow() {
  return (
    <div className="relative isolate pb-5 pr-3 sm:pr-5">
      <div
        className="absolute inset-0 translate-x-3 translate-y-5 border border-line bg-surface-2 sm:translate-x-5"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden border border-ink bg-surface">
        <div className="flex min-h-11 items-center justify-between bg-ink px-4 text-cream">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-cream/50" />
            <span className="h-2.5 w-2.5 rounded-full border border-cream/50" />
            <span className="h-2.5 w-2.5 rounded-full border border-cream/50" />
          </div>
          <span className="text-[0.65rem] font-semibold tracking-[0.08em] text-cream/70">
            mapa-de-decisao.flowo
          </span>
          <span className="w-[3.25rem]" aria-hidden="true" />
        </div>

        <div className="p-5 sm:p-7">
          <p className="text-caption font-semibold text-muted-ink">
            Por onde começar
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            O que mais pesa na sua escolha?
          </h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {decisionPaths.map((path) => (
              <Link
                key={path.label}
                href={path.href}
                className="group flex min-h-16 items-center justify-between gap-5 py-4 text-ink"
              >
                <span>
                  <strong className="block text-sm">{path.label}</strong>
                  <span className="mt-1 block text-caption text-muted-ink">
                    {path.detail}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2 text-caption text-muted-ink">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Fontes oficiais verificadas em {COMPARISON_LAST_VERIFIED_LABEL}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const firstColumn = COMPETITOR_COMPARISONS.slice(0, 4);
  const secondColumn = COMPETITOR_COMPARISONS.slice(4);

  return (
    <>
      <ComparisonHubSchema />
      <Navbar />
      <main id="main-content">
        <section className="pb-section-normal pt-28 md:pt-32">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Comparar", href: "/comparar" },
              ]}
            />
            <div className="mt-10 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
              <div>
                <p className="text-sm font-semibold text-muted-ink">
                  Compare com fontes, não por promessa
                </p>
                <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,4.2vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-strong">
                  Compare sistemas para sua barbearia.
                </h1>
                <p className="mt-6 max-w-[65ch] text-lead text-muted-ink">
                  Compare Flowo com AppBarber, Trinks, BestBarbers, Opero,
                  Barva, Barbeiro.app, Avec e Graces. Comece pelo problema que
                  você quer resolver, não pela maior lista de funções.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#comparacoes"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-label font-semibold text-cream transition-colors duration-200 hover:bg-ink/90"
                  >
                    Escolher uma comparação
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link
                    href="/recursos/diagnostico-agenda-barbearia"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-surface px-6 text-label font-semibold text-ink transition-colors duration-200 hover:bg-surface-2"
                  >
                    Diagnosticar minha rotina
                  </Link>
                </div>
              </div>
              <DecisionWindow />
            </div>
          </div>
        </section>

        <section
          id="comparacoes"
          className="section-normal scroll-mt-28 border-y border-line bg-surface"
        >
          <div className="container-page">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-20">
              <h2 className="text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                Abra a comparação que responde à sua dúvida.
              </h2>
              <p className="text-lead text-muted-ink">
                Cada página mostra onde cada plataforma é forte, o preço
                publicado, os recursos adicionais e o perfil de operação que
                tende a aproveitar melhor cada escolha.
              </p>
            </div>

            <div className="mt-10 grid gap-x-14 md:grid-cols-2">
              {[firstColumn, secondColumn].map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className="divide-y divide-line border-y border-line md:first:border-b-0 md:last:border-t-0"
                >
                  {column.map((comparison) => (
                    <Link
                      key={comparison.path}
                      href={comparison.path}
                      className="group flex min-h-28 items-center justify-between gap-6 py-5 text-ink"
                    >
                      <span>
                        <strong className="block text-xl">
                          Flowo vs {comparison.name}
                        </strong>
                        <span className="mt-2 block max-w-[48ch] text-sm leading-relaxed text-muted-ink">
                          {comparison.eyebrow}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <FlowoProductProof includeFilm={false} />
        <FlowoDeliveryMap />
        <CompetitiveMatrix />

        <section className="section-normal">
          <div className="container-page">
            <div className="mb-10 grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end lg:gap-20">
              <h2 className="text-h2 font-semibold text-ink-strong">
                Antes da marca, compare a rotina.
              </h2>
              <p className="text-lead text-muted-ink">
                Uma mensalidade menor não ajuda se o cliente continua esperando
                resposta. Uma plataforma ampla pode ser a escolha certa quando
                estoque, marketplace ou fiscal são o centro da decisão.
              </p>
            </div>
            <div className="overflow-x-auto border border-line bg-cream [contain:paint]">
              <table className="w-full min-w-[44rem] border-collapse">
                <caption className="sr-only">
                  Comparação entre rotina manual e rotina conectada pelo Flowo
                </caption>
                <thead>
                  <tr className="border-b border-line bg-surface">
                    <th className="w-[28%] px-6 py-5 text-left text-label font-medium text-muted-ink">
                      Critério
                    </th>
                    <th className="border-l border-line px-6 py-5 text-left text-label font-semibold text-ink">
                      Rotina espalhada
                    </th>
                    <th className="border-l border-line bg-surface-2 px-6 py-5 text-left text-label font-semibold text-ink">
                      Com Flowo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-line last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="px-6 py-5 text-left text-sm font-semibold text-ink"
                      >
                        {row.label}
                      </th>
                      <td className="border-l border-line px-6 py-5 text-sm text-muted-ink">
                        {row.manual}
                      </td>
                      <td className="border-l border-line bg-surface-2 px-6 py-5 text-sm text-ink">
                        <span className="flex items-start gap-3">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          {row.flowo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-tight border-y border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
              <div>
                <h2 className="text-h3 font-semibold text-ink-strong">
                  Ainda no manual?
                </h2>
                <p className="mt-3 text-body text-muted-ink">
                  Compare também com caderno, planilha ou WhatsApp desconectado
                  da agenda.
                </p>
              </div>
              <div className="divide-y divide-line border-y border-line">
                {manualComparisons.map(({ icon: Icon, ...item }) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex min-h-20 items-center gap-4 py-4 text-ink"
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="block text-base">{item.title}</strong>
                      <span className="mt-1 block text-sm text-muted-ink">
                        {item.description}
                      </span>
                    </span>
                    <ArrowRight
                      className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
              <h2 className="text-h2 font-semibold text-ink-strong">
                Dúvidas antes de comparar.
              </h2>
              <div className="border-t border-line">
                {hubFaq.map((item) => (
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
      </main>
      <Footer />
    </>
  );
}
