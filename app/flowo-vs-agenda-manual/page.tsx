import Link from "next/link";
import { Check, Minus } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  CommercialCta,
  CommercialHero,
  RelatedSolutions,
} from "@/components/marketing/commercial-page";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat, type ChatMessage } from "@/components/home/whatsapp-chat";
import { ProductDisclaimer } from "@/components/home/product-previews";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getPlan } from "@/data/pricing-data";
import { FlowoProductProof } from "@/components/marketing/flowo-product-proof";

const PATH = "/flowo-vs-agenda-manual";

export const metadata = buildMetadata({
  title: "Flowo vs Agenda Manual para Barbearias",
  description:
    "Compare a Flowo com o caderno: a Flowo responde no WhatsApp, marca na agenda do barbeiro certo e confirma o horário. Menos retrabalho para a equipe.",
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

/** Illustrative names and prices, the same ones the app screenshots use. */
const conversation: ChatMessage[] = [
  { day: "Quinta" },
  { from: "cliente", text: "Boa tarde! Tem horário sábado de manhã com o João?", at: "14:12" },
  {
    from: "flowo",
    text: "Tenho sábado com o João às 09:00, 10:30 e 11:00. Qual fica melhor pra você?",
    at: "14:12",
  },
  { from: "cliente", text: "10:30", at: "14:13" },
  {
    from: "flowo",
    text: "Agendado. Corte masculino sábado às 10:30 com o João, 40 min, R$ 55. Se precisar mudar, é só me chamar aqui.",
    at: "14:13",
  },
  { day: "Sexta" },
  {
    from: "flowo",
    text: "Oi! Lembrete do seu corte amanhã às 10:30 com o João. Confirma pra mim?",
    at: "10:00",
  },
  { from: "cliente", text: "Confirmado!", at: "10:04" },
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
      <main id="main-content">
        <CommercialHero
          current="Flowo vs Agenda Manual"
          eyebrow="O custo escondido do caderno"
          title="O caderno guarda horários. O Flowo cuida deles."
          description="O caderno funciona até o movimento crescer. Depois vêm horário duplicado, falta sem aviso e retrabalho. Veja o que muda."
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
            <div className="mx-auto w-[340px] max-w-full lg:w-full lg:max-w-[24rem]">
              <PhoneFrame className="lg:hidden">
                <WhatsAppChat width={340} logicalHeight={900} messages={conversation} />
              </PhoneFrame>
              <PhoneFrame className="hidden lg:block">
                <WhatsAppChat width={384} logicalHeight={900} messages={conversation} />
              </PhoneFrame>
              <ProductDisclaimer label="Conversa ilustrativa, com o fluxo testado em produção" className="mt-4" />
            </div>
            <div>
              <h2 className="text-h3 font-semibold text-ink">
                O que a agenda manual não faz por você
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                O caderno não responde WhatsApp. Não lembra o cliente do horário.
                Não avisa quando dois barbeiros marcaram a mesma cadeira. A Flowo
                responde a conversa, marca no horário livre do barbeiro certo e
                pede a confirmação antes do corte.
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

        <section className="section-tight border-t border-line bg-surface">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink-strong">O que já testamos</h2>
            <p className="mt-3 max-w-measure text-body text-muted-ink">
              A conversa desta página é ilustrativa. O fluxo de marcar, confirmar,
              remarcar e cancelar foi testado em produção com números de teste da
              própria Flowo, em 26 de julho de 2026. Ainda não medimos quantas
              faltas ou conflitos uma barbearia evita com a Flowo. Por isso esta
              página não promete número.
            </p>
          </div>
        </section>

        <CommercialCta
          title="Pare de apagar incêndio na agenda."
          description="A Flowo agenda, confirma e lembra pelo WhatsApp. A equipe inteira trabalha com a mesma informação."
          price={getPlan("solo").monthly}
        />
      </main>
      <Footer />
    </>
  );
}
