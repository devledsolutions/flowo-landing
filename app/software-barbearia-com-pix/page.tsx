import Link from "next/link";
import {
  BellRing,
  MessageCircle,
  QrCode,
  ReceiptText,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  CommercialCta,
  CommercialHero,
  RelatedSolutions,
} from "@/components/marketing/commercial-page";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { PLANS } from "@/data/pricing-data";

const PATH = "/software-barbearia-com-pix";

export const metadata = buildMetadata({
  title: "Software para Barbearia com Pagamento por PIX",
  description:
    "O cliente paga o atendimento por PIX ou cartão direto no WhatsApp. Comanda fechada na hora, caixa organizado e confirmação automática contra faltas.",
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
      name: "Software para Barbearia com PIX",
      item: absoluteUrl(PATH),
    },
  ],
};

const paymentSteps = [
  {
    icon: ReceiptText,
    title: "O atendimento termina, a comanda fecha",
    description:
      "Corte, barba e produtos entram na comanda do cliente dentro do Flowo, sem papelzinho nem conta de cabeça.",
  },
  {
    icon: QrCode,
    title: "A cobrança chega no WhatsApp",
    description:
      "O cliente recebe o link de pagamento na própria conversa e paga por PIX ou cartão em segundos, sem baixar aplicativo.",
  },
  {
    icon: MessageCircle,
    title: "O caixa registra sozinho",
    description:
      "O pagamento entra no financeiro da barbearia na hora, com o histórico do cliente atualizado.",
  },
];

export default function PixSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main>
        <CommercialHero
          current="Software para Barbearia com PIX"
          eyebrow="Comanda e caixa no mesmo atendimento"
          title="PIX e cartão no atendimento, com o caixa registrado no Flowo"
          description="No Flowo, o pagamento acontece no atendimento: a barbearia envia a cobrança pelo WhatsApp e o cliente paga por PIX ou cartão. A baixa entra no financeiro sem pedir sinal para reservar."
          preview="pagamento"
        />

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">
              Como funciona o pagamento no Flowo
            </h2>
            <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {paymentSteps.map((step, index) => (
                <li key={step.title} className="flex flex-col">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-label font-semibold text-ink"
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-body font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-measure text-body text-muted-ink">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-h3 font-semibold text-ink">
                Sem sinal, sem pagamento antecipado
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                O Flowo não cobra sinal para agendar: pedir dinheiro antes do
                corte espanta cliente. Contra faltas, o que funciona é a{" "}
                <Link
                  href="/recursos/guias/reduzindo-faltas"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  confirmação automática pelo WhatsApp
                </Link>{" "}
                antes do horário. O pagamento fica para o atendimento, do jeito
                que o cliente espera.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-lg bg-surface-2 p-5">
                <BellRing aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                <p className="max-w-measure text-body text-muted-ink">
                  A IA lembra o cliente e pede a confirmação de presença antes
                  do horário. Quem não vai avisa com antecedência, e o horário
                  volta para a agenda.
                </p>
              </div>
              <p className="mt-6 text-body text-muted-ink">
                Quer entender o PIX na prática? Veja o guia de{" "}
                <Link
                  href="/recursos/guias/pagamentos-pix"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  pagamentos com PIX
                </Link>
                . Se o financeiro ainda vive em planilha, compare em{" "}
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
          items={[
            {
              href: "/recursos/guias/pagamentos-pix",
              label: "Guia de pagamentos",
              description:
                "Entenda taxas, conciliação e o fluxo ideal para o atendimento.",
            },
            {
              href: "/recursos/guias/controle-financeiro-barbearia",
              label: "Controle financeiro",
              description:
                "Organize entradas, saídas e fechamento sem depender da memória.",
            },
            {
              href: "/flowo-vs-planilha",
              label: "Comparar com planilha",
              description:
                "Veja a diferença entre registrar e executar a rotina.",
            },
          ]}
        />
        <CommercialCta
          title="Agenda no WhatsApp, pagamento no atendimento."
          description="A mesma operação que marca o corte fecha a comanda e registra o caixa."
          price={PLANS[0].monthly}
        />
      </main>
      <Footer />
    </>
  );
}
