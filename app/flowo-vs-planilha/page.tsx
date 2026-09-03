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

const PATH = "/flowo-vs-planilha";

export const metadata = buildMetadata({
  title: "Flowo vs Planilha para Barbearia",
  description:
    "Compare a Flowo com a planilha: a Flowo agenda pelo WhatsApp, confirma o horário e mantém a agenda da equipe atualizada sem ninguém digitar.",
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

/** Illustrative names and prices, the same ones the app screenshots use. */
const conversation: ChatMessage[] = [
  { day: "Terça" },
  { from: "cliente", text: "Oi! Tem horário amanhã depois das 18h com o João?", at: "09:37" },
  {
    from: "flowo",
    text: "Tenho três horários com o João amanhã: 18:00, 18:30 e 19:00. Qual fica melhor pra você?",
    at: "09:37",
  },
  { from: "cliente", text: "18:30", at: "09:38" },
  {
    from: "flowo",
    text: "Agendado. Corte masculino amanhã às 18:30 com o João, 40 min, R$ 55. Se precisar remarcar, é só me chamar aqui.",
    at: "09:38",
  },
  { from: "cliente", text: "Consigo passar pras 19:00?", at: "14:02" },
  { from: "flowo", text: "Consigo. Mudei seu corte com o João para amanhã às 19:00. Te espero!", at: "14:02" },
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
          description="A planilha resolve no começo. Depois alguém precisa responder, anotar e confirmar cada horário. Compare o trabalho que continua manual."
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
                Da planilha para uma agenda que se atualiza sozinha
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                Na planilha, cada agendamento depende de alguém parar para
                anotar. Na Flowo, a conversa do WhatsApp marca no horário livre
                e pede a confirmação antes do corte. Se o cliente remarca, a
                agenda da equipe muda junto. Depois do serviço, a comanda
                registra dinheiro, maquininha própria ou, quando ativados, PIX
                e cartão pela Flowo.
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
            <div className="mx-auto w-[340px] max-w-full lg:w-full lg:max-w-[24rem] lg:justify-self-end">
              <PhoneFrame className="lg:hidden">
                <WhatsAppChat width={340} logicalHeight={900} messages={conversation} />
              </PhoneFrame>
              <PhoneFrame className="hidden lg:block">
                <WhatsAppChat width={384} logicalHeight={900} messages={conversation} />
              </PhoneFrame>
              <ProductDisclaimer label="Conversa ilustrativa, com o fluxo testado em produção" className="mt-4" />
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

        <section className="section-tight border-t border-line bg-surface">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink-strong">O que já testamos</h2>
            <p className="mt-3 max-w-measure text-body text-muted-ink">
              A conversa desta página é ilustrativa. O fluxo de marcar, confirmar,
              remarcar e cancelar foi testado em produção com números de teste da
              própria Flowo, em 26 de julho de 2026. Ainda não medimos quanto
              tempo uma barbearia economiza ao sair da planilha. Por isso esta
              página não promete número.
            </p>
          </div>
        </section>

        <CommercialCta
          title="Troque anotação por execução."
          description="Agenda, confirmação, comanda e recebimento no mesmo lugar. Sem atualizar célula por célula."
          price={getPlan("solo").monthly}
        />
      </main>
      <Footer />
    </>
  );
}
