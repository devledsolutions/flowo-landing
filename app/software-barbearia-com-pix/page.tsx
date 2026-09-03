import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ProductCapabilityPage } from "@/components/marketing/product-capability-page";
import { ProductDisclaimer } from "@/components/home/product-previews";
import { PRODUCT_CAPABILITIES } from "@/data/product-capabilities";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const capability = PRODUCT_CAPABILITIES.payments;

export const metadata = buildMetadata({
  title: capability.seoTitle,
  description: capability.seoDescription,
  path: capability.path,
});

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: capability.breadcrumb,
      item: absoluteUrl(capability.path),
    },
  ],
};

export default function PixSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main id="main-content">
        <ProductCapabilityPage capability={capability} />

        <section className="section-normal border-b border-line">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">A comanda, como ela é no painel.</h2>
              <p className="mt-5 max-w-measure text-body text-muted-ink">
                Serviços, produtos e o total. No fechamento, você escolhe como o cliente pagou: dinheiro,
                maquininha ou, se ativados, PIX e cartão Flowo.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-xl border border-ink/15 bg-surface shadow-[0_30px_70px_-45px_oklch(0.17_0.012_110/0.55)]">
              <Image
                src="/images/product/dashboard-comandas.png"
                alt="Painel da Flowo, tela Comandas: a comanda aberta de um cliente com corte e barba, o total e as opções dinheiro, maquininha, PIX Flowo e cartão Flowo."
                width={1920}
                height={1041}
                sizes="(min-width: 1280px) 1120px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <ProductDisclaimer label="Telas do app com dados ilustrativos" className="mt-4" />
          </div>
        </section>

        <section className="border-b border-line bg-surface py-8 md:py-10">
          <div className="container-page">
            <p className="max-w-measure text-label text-muted-ink">
              <strong className="font-semibold text-ink">O que já foi testado.</strong> O atendimento no
              WhatsApp ligado à agenda foi testado pela Flowo em 26 de julho de 2026, com números de teste da
              própria Flowo. A tela desta página é do produto, com dados ilustrativos. Ainda não medimos
              recebimento por PIX e cartão Flowo em barbearias clientes.{" "}
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="font-medium text-ink underline underline-offset-4"
              >
                Ver a demonstração completa
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
