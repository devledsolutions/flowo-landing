import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CalendarDays,
  Check,
  ClipboardList,
  MessageCircle,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  FlowoDeliveryMap,
  FlowoProductProof,
} from "@/components/marketing/flowo-product-proof";
import { InstitutionalFilmSchema } from "@/components/marketing/institutional-film";
import {
  COMPARISON_LAST_VERIFIED_LABEL,
  COMPETITOR_COMPARISONS,
} from "@/data/competitor-comparisons";
import { absoluteUrl, buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flowo vs Trinks, AppBarber, Barbeiro.app e Outros",
  description:
    "Compare Flowo com Trinks, AppBarber, Barbeiro.app, Avec e Graces. Veja WhatsApp com IA, agenda, gestão, preços e o perfil ideal de cada sistema.",
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

const comparisons = [
  {
    icon: CalendarDays,
    title: "Flowo vs agenda manual",
    description:
      "Para quem ainda cruza caderno, calendário e mensagens antes de confirmar cada horário.",
    href: "/flowo-vs-agenda-manual",
    cta: "Comparar a agenda",
  },
  {
    icon: ClipboardList,
    title: "Flowo vs planilha",
    description:
      "Para quem registra dados depois do trabalho, mas ainda executa a rotina fora da planilha.",
    href: "/flowo-vs-planilha",
    cta: "Comparar o controle",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp conectado à operação",
    description:
      "Para entender a diferença entre apenas conversar e usar a agenda como fonte da resposta.",
    href: "/agenda-barbearia-whatsapp",
    cta: "Ver a agenda no WhatsApp",
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
      "Não necessariamente. O Flowo começa em R$ 249/mês e inclui a recepção com IA no WhatsApp. Alguns concorrentes têm planos-base mais baratos, mas podem cobrar módulos adicionais. Compare o pacote completo necessário para a sua rotina.",
  },
  {
    question: "Como as comparações foram feitas?",
    answer:
      "A Flowo consulta páginas oficiais dos concorrentes, registra a data e o escopo da fonte e separa recursos incluídos de módulos ou add-ons. Não usamos avaliações anônimas para afirmar vantagens.",
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

export default function ComparePage() {
  return (
    <>
      <ComparisonHubSchema />
      <InstitutionalFilmSchema pagePath="/comparar" />
      <Navbar />
      <main id="main-content">
        <section className="pt-32 pb-section-tight md:pt-40">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Comparar", href: "/comparar" },
              ]}
            />
            <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Compare com fontes, não por promessa
                </p>
                <h1 className="mt-4 max-w-[15ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Flowo vs os principais sistemas para barbearias.
                </h1>
              </div>
              <p className="max-w-measure text-lead text-muted-ink">
                Compare Flowo com Trinks, AppBarber, Barbeiro.app, Avec e
                Graces. Mostramos onde cada plataforma é forte, o que aparece
                como adicional e quando outra opção pode fazer mais sentido.
              </p>
            </div>
            <p className="mt-8 flex items-start gap-2 text-caption text-muted-ink">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              Fontes oficiais verificadas em {COMPARISON_LAST_VERIFIED_LABEL}.
            </p>
          </div>
        </section>

        <FlowoProductProof />

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Comparações diretas
              </p>
              <h2 className="mt-4 text-h2 font-semibold text-ink-strong">
                Escolha pelo fluxo que sua equipe precisa.
              </h2>
              <p className="mt-4 text-lead text-muted-ink">
                Cada página compara canal de agendamento, IA, operação, preço e
                perfil ideal — com links para as fontes consultadas.
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {COMPETITOR_COMPARISONS.map((comparison, index) => (
                <Link
                  key={comparison.path}
                  href={comparison.path}
                  className="group flex min-h-72 flex-col bg-cream p-7 transition-colors hover:bg-surface-2"
                >
                  <div className="flex items-center justify-between">
                    {index % 2 === 0 ? (
                      <Scale className="h-5 w-5 text-ink" aria-hidden="true" />
                    ) : (
                      <Boxes className="h-5 w-5 text-ink" aria-hidden="true" />
                    )}
                    <span className="text-caption tabular-nums text-faint-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-ink">
                    Flowo vs {comparison.name}
                  </h3>
                  <p className="mt-3 text-body text-muted-ink">
                    {comparison.summary}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-8 text-label font-semibold text-ink">
                    Ver comparação completa
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

        <FlowoDeliveryMap />

        <section className="section-normal">
          <div className="container-page">
            <div className="mb-10 grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Critérios que importam
                </p>
                <h2 className="mt-4 text-h2 font-semibold text-ink-strong">
                  Antes da marca, compare a rotina.
                </h2>
              </div>
              <p className="text-lead text-muted-ink">
                Uma mensalidade menor não ajuda se o cliente continua esperando
                resposta. Uma plataforma ampla também pode ser a escolha certa
                quando estoque, marketplace ou fiscal são o centro da decisão.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-line bg-cream [contain:paint]">
              <table className="w-full min-w-[44rem] border-collapse">
                <caption className="sr-only">
                  Comparação entre rotina manual e rotina conectada pelo Flowo
                </caption>
                <thead>
                  <tr className="border-b border-line">
                    <th className="w-[28%] px-6 py-5 text-left text-label font-medium text-muted-ink">
                      Critério
                    </th>
                    <th className="px-6 py-5 text-left text-label font-semibold text-ink">
                      Rotina espalhada
                    </th>
                    <th className="bg-ink px-6 py-5 text-left text-label font-semibold text-cream">
                      Com Flowo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-b-0">
                      <th scope="row" className="px-6 py-5 text-left text-sm font-semibold text-ink">
                        {row.label}
                      </th>
                      <td className="px-6 py-5 text-sm text-muted-ink">{row.manual}</td>
                      <td className="bg-ink px-6 py-5 text-sm text-cream">
                        <span className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                          {row.flowo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 flex items-start gap-2 text-caption text-muted-ink">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Este quadro explica o contraste entre uma rotina espalhada e o
              Flowo. As páginas nominais usam somente informações públicas dos
              concorrentes.
            </p>
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="text-h2 font-semibold text-ink-strong">
                Ainda no manual? Comece pelo gargalo atual.
              </h2>
              <p className="mt-4 text-lead text-muted-ink">
                Compare também o Flowo com caderno, planilha ou um WhatsApp
                desconectado da agenda.
              </p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
              {comparisons.map(({ icon: Icon, ...item }, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-72 flex-col bg-surface p-7 transition-colors hover:bg-surface-2"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                    <span className="text-caption tabular-nums text-faint-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-body text-muted-ink">{item.description}</p>
                  <span className="mt-auto flex items-center gap-2 pt-8 text-label font-semibold text-ink">
                    {item.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface">
                  <Search className="h-5 w-5 text-ink" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-h2 font-semibold text-ink-strong">
                  Perguntas que ajudam a decidir.
                </h2>
              </div>
              <div className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
                {hubFaq.map((item) => (
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
