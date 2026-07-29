import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ProductCapabilityPage } from "@/components/marketing/product-capability-page";
import { PRODUCT_CAPABILITIES } from "@/data/product-capabilities";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const capability = PRODUCT_CAPABILITIES.fiscal;

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
    { "@type": "ListItem", position: 2, name: "Recursos", item: absoluteUrl("/recursos") },
    {
      "@type": "ListItem",
      position: 3,
      name: capability.breadcrumb,
      item: absoluteUrl(capability.path),
    },
  ],
};

export default function FiscalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main id="main-content">
        <ProductCapabilityPage capability={capability} />
      </main>
      <Footer />
    </>
  );
}
