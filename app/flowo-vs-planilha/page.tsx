import Image from "next/image";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  CommercialCta,
  CommercialHero,
  RelatedSolutions,
} from "@/components/marketing/commercial-page";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { PLANS } from "@/data/pricing-data";
import { FlowoProductProof } from "@/components/marketing/flowo-product-proof";

const PATH = "/flowo-vs-planilha";

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
    criteria: "Comanda ligada à forma de recebimento",
    flowo: "sim; pagamento integrado é opcional",
    spreadsheet: "depende de registro manual",
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
      <main id="main-content">
        <CommercialHero
          current="Flowo vs Planilha"
          eyebrow="Comparação de rotina, não só de ferramenta"
          title="A planilha registra. O Flowo executa a rotina."
          description="Planilha resolve no começo, mas vira gargalo quando a operação cresce: alguém ainda precisa responder, anotar e confirmar cada horário. Compare o trabalho que continua manual."
          preview="comparacao"
        />

        <FlowoProductProof competitorName="planilha" />

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
                equipe fica atualizada em tempo real. Depois do serviço, a
                comanda registra dinheiro, maquininha própria ou, quando
                ativados, PIX e cartão Flowo.
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

        <RelatedSolutions
          title="Decida com mais contexto"
          items={[
            {
              href: "/flowo-vs-agenda-manual",
              label: "Flowo vs agenda manual",
              description:
                "Compare a operação com caderno, papel ou agenda física.",
            },
            {
              href: "/sistema-agendamento-barbearia",
              label: "Ver o sistema de agenda",
              description:
                "Entenda como horários e profissionais aparecem no produto.",
            },
            {
              href: "/recursos/guias/controle-financeiro-barbearia",
              label: "Guia de controle financeiro",
              description:
                "Aplique um processo semanal antes ou depois de trocar de ferramenta.",
            },
          ]}
        />
        <CommercialCta
          title="Troque anotação por execução."
          description="Centralize agenda, confirmação, comanda e recebimento em uma rotina que não depende de atualizar cada célula."
          price={PLANS[0].monthly}
        />
      </main>
      <Footer />
    </>
  );
}
