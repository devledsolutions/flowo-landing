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

const PATH = "/flowo-vs-agenda-manual";

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
        <CommercialHero
          current="Flowo vs Agenda Manual"
          eyebrow="O custo escondido do caderno"
          title="O caderno guarda horários. O Flowo cuida deles."
          description="Agenda de papel funciona até certo ponto. Quando o volume cresce, aparecem conflitos, faltas sem aviso e retrabalho. Veja o que muda quando confirmação e disponibilidade deixam de depender da memória."
          preview="comparacao"
        />

        <FlowoProductProof competitorName="agenda manual" />

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

        <RelatedSolutions
          title="Decida com mais contexto"
          items={[
            {
              href: "/flowo-vs-planilha",
              label: "Flowo vs planilha",
              description:
                "Compare com uma rotina digital que ainda exige atualização manual.",
            },
            {
              href: "/agenda-barbearia-whatsapp",
              label: "Agenda no WhatsApp",
              description:
                "Veja como o cliente agenda e confirma na própria conversa.",
            },
            {
              href: "/recursos/guias/reduzindo-faltas",
              label: "Guia para reduzir faltas",
              description:
                "Estruture lembretes e confirmação sem depender de promessa de resultado.",
            },
          ]}
        />
        <CommercialCta
          title="Pare de apagar incêndio na agenda."
          description="Automatize agendamento, confirmação e lembrete pelo WhatsApp e deixe a equipe trabalhar com a mesma informação."
          price={PLANS[0].monthly}
        />
      </main>
      <Footer />
    </>
  );
}
