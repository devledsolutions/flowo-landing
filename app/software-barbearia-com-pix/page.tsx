import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ProductCapabilityPage } from "@/components/marketing/product-capability-page";
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
