import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Minus } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { PLANS } from "@/data/pricing-data";

const PATH = "/flowo-vs-agenda-manual";
const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";

export const metadata = buildMetadata({
  title: "Flowo vs Agenda Manual para Barbearias",
  description:
    "Compare o Flowo com a agenda de papel ou caderno: confirmação automática pelo WhatsApp, agenda por barbeiro e menos retrabalho para a equipe.",
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
      name: "Flowo vs Agenda Manual",
      item: absoluteUrl(PATH),
    },
  ],
};

const comparison: {
  criteria: string;
  flowo: boolean | string;
  manual: boolean | string;
}[] = [
  {
    criteria: "Confirmação de horário automática",
    flowo: true,
    manual: false,
  },
  {
    criteria: "Tempo gasto com mensagens repetitivas",
    flowo: "baixo",
    manual: "alto",
  },
  {
    criteria: "Risco de esquecimento ou conflito de horário",
    flowo: "baixo",
    manual: "alto",
  },
  {
    criteria: "Agenda por barbeiro, com a equipe inteira em um painel",
    flowo: true,
    manual: false,
  },
  {
    criteria: "Atendimento no WhatsApp mesmo fora do expediente",
    flowo: true,
    manual: false,
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

export default function FlowoVsAgendaManualPage() {
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
            <Crumbs current="Flowo vs Agenda Manual" />
            <div className="mt-10 max-w-3xl">
              <h1 className="text-h2 font-semibold text-ink-strong">
                Flowo vs agenda manual: o caderno não confirma cliente.{" "}
                <em className="font-serif italic">A Flowo confirma.</em>
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                Agenda de papel funciona até certo ponto. Quando o volume
                cresce, aparecem conflitos de horário, faltas sem aviso e
                retrabalho. Veja lado a lado o que muda.
              </p>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container-page">
            <div className="relative overflow-x-auto rounded-lg border border-line bg-surface">
              <table
                aria-label="Comparativo entre Flowo e agenda manual para barbearias"
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
                      Agenda manual
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
                        <CellValue value={row.manual} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1621645582931-d1d3e6564943?auto=format&fit=crop&w=1000&q=80"
                alt="Cadeira de barbeiro preta e cromada, retrato de objeto"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="img-duotone object-cover"
              />
            </div>
            <div>
              <h2 className="text-h3 font-semibold text-ink">
                O que a agenda manual não faz por você
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                O caderno não responde WhatsApp, não lembra o cliente do
                horário e não avisa quando dois barbeiros marcaram a mesma
                cadeira. No Flowo, a IA atende a conversa, marca no horário
                livre do barbeiro certo e confirma presença antes do corte.
              </p>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                Para aprofundar a decisão, veja os guias de{" "}
                <Link
                  href="/recursos/guias/escala-equipe"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  escala de equipe
                </Link>{" "}
                e{" "}
                <Link
                  href="/recursos/guias/gerenciamento-equipe"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  gerenciamento de equipe com dados
                </Link>
                . Se hoje o controle é em planilha, compare também em{" "}
                <Link
                  href="/flowo-vs-planilha"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  Flowo vs planilha
                </Link>
                .
              </p>
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
            Pare de apagar incêndio na agenda.
          </h2>
          <p className="mt-4 max-w-measure text-lead text-muted-ink">
            Automatize agendamento, confirmação e lembrete pelo WhatsApp e
            ganhe tranquilidade operacional.
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
