import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Minus } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { PLANS } from "@/data/pricing-data";

const PATH = "/flowo-vs-planilha";
const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";

export const metadata = buildMetadata({
  title: "Flowo vs Planilha para Barbearia",
  description:
    "Compare o Flowo com planilhas na gestão da agenda da barbearia: agendamento pelo WhatsApp, confirmação automática e visão da equipe em tempo real.",
  path: PATH,
});

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: "Flowo vs Planilha",
      item: absoluteUrl(PATH),
    },
  ],
};

const comparison: {
  criteria: string;
  flowo: boolean | string;
  spreadsheet: boolean | string;
}[] = [
  {
    criteria: "Agendamento automático pelo WhatsApp",
    flowo: true,
    spreadsheet: false,
  },
  {
    criteria: "Lembrete e confirmação de presença",
    flowo: true,
    spreadsheet: false,
  },
  {
    criteria: "Agenda da equipe atualizada em tempo real",
    flowo: true,
    spreadsheet: false,
  },
  {
    criteria: "Risco de erro manual",
    flowo: "baixo",
    spreadsheet: "alto",
  },
  {
    criteria: "Pagamento do atendimento por PIX ou cartão",
    flowo: true,
    spreadsheet: false,
  },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-label font-medium text-muted-ink">{value}</span>;
  }
  return value ? (
    <Check role="img" aria-label="Sim" className="inline-block h-5 w-5 text-ink" />
  ) : (
    <Minus role="img" aria-label="Não" className="inline-block h-5 w-5 text-faint-ink" />
  );
}

export default function FlowoVsPlanilhaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main>
        <section className="pt-32 pb-section-tight md:pt-40">
          <div className="container-page">
            <Crumbs current="Flowo vs Planilha" />
            <div className="mt-10 max-w-3xl">
              <h1 className="text-h2 font-semibold text-ink-strong">
                Flowo vs planilha: a planilha não responde WhatsApp.{" "}
                <em className="font-serif italic">A Flowo responde.</em>
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                Planilha resolve no começo, mas vira gargalo quando a operação
                cresce: alguém precisa digitar cada horário, e ninguém confirma
                o cliente. Compare lado a lado.
              </p>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container-page">
            <div className="relative overflow-x-auto rounded-lg border border-line bg-surface">
              <table
                aria-label="Comparativo entre Flowo e planilha para gestão de barbearia"
                className="w-full min-w-[36rem] border-collapse text-left"
              >
                <thead>
                  <tr className="border-b border-line">
                    <th
                      scope="col"
                      className="px-6 py-4 text-label font-semibold text-ink"
                    >
                      Critério
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-label font-semibold text-ink"
                    >
                      Flowo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-label font-semibold text-ink"
                    >
                      Planilha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr
                      key={row.criteria}
                      className="border-b border-line last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 text-body font-normal text-ink"
                      >
                        {row.criteria}
                      </th>
                      <td className="px-6 py-4 text-center">
                        <CellValue value={row.flowo} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CellValue value={row.spreadsheet} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-h3 font-semibold text-ink">
                Da planilha para uma operação que roda sozinha
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                Na planilha, cada agendamento depende de alguém parar para
                anotar. No Flowo, a IA atende o cliente no WhatsApp, marca no
                horário livre e confirma presença antes do corte. A agenda da
                equipe fica atualizada em tempo real, e o pagamento do
                atendimento sai por PIX ou cartão na própria conversa.
              </p>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                Para organizar também o caixa, veja os guias de{" "}
                <Link
                  href="/recursos/guias/controle-financeiro-barbearia"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  controle financeiro para barbearia
                </Link>{" "}
                e{" "}
                <Link
                  href="/recursos/guias/aumentar-ticket-medio"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  como aumentar o ticket médio
                </Link>
                . Se a agenda ainda é no caderno, compare em{" "}
                <Link
                  href="/flowo-vs-agenda-manual"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  Flowo vs agenda manual
                </Link>
                .
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=1200&q=80"
                alt="Barbeiro de avental fazendo o acabamento do corte de um cliente na cadeira"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="img-duotone object-cover"
              />
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

function Crumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-caption text-muted-ink">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-ink"
          >
            Início
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <span aria-current="page" className="text-ink">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function CtaBand() {
  return (
    <section className="on-ink relative isolate overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[oklch(0.185_0.01_110/0.75)] via-[oklch(0.185_0.01_110/0.62)] to-[oklch(0.185_0.01_110/0.85)]"
      />
      <div className="container-page section-normal relative">
        <div className="max-w-2xl">
          <h2 className="font-serif text-h2 font-medium text-ink-strong">
            Saia do improviso. Profissionalize a agenda.
          </h2>
          <p className="mt-4 max-w-measure text-lead text-muted-ink">
            Troque o controle manual por uma agenda que atende, confirma e
            cobra pelo WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-label font-medium text-cream transition-opacity duration-200 ease-out-quint hover:opacity-90"
            >
              Começar agora
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 text-label font-medium text-ink transition-colors duration-200 ease-out-quint hover:bg-surface"
            >
              Ver planos
            </Link>
          </div>
          <p className="mt-5 text-caption text-muted-ink">
            A partir de R$ {PLANS[0].monthly}/mês no plano Solo.
          </p>
        </div>
      </div>
    </section>
  );
}
