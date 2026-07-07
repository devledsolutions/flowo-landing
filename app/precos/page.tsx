import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FAQ from "@/components/faq";
import { PricingSection } from "@/components/pricing/pricing-section";
import { FeatureComparisonTable } from "@/components/pricing/feature-comparison-table";
import { FeaturedResource } from "@/components/pricing/featured-resource";
import { PricingCTA } from "@/components/pricing/pricing-cta";
import { featuredResources, formatBRL, PLANS, PRICING } from "@/data/pricing-data";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const [solo, equipe, empresarial] = PLANS;

export const metadata = buildMetadata({
  title: "Preços e planos",
  description: `Planos para barbearias: Solo por ${formatBRL(solo.monthly)}/mês, Equipe por ${formatBRL(equipe.monthly)}/mês e Empresarial por ${formatBRL(empresarial.monthly)}/mês. IA no WhatsApp, lembretes automáticos e pagamento no atendimento. Sem fidelidade.`,
  path: "/precos",
});

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Flowo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "pt-BR",
  offers: PRICING.plans.map((plan) => ({
    "@type": "Offer",
    name: `Plano ${plan.name}`,
    price: String(plan.monthly),
    priceCurrency: PRICING.currency,
    priceValidUntil: PRICING.priceValidUntil,
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/precos"),
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="pt-24">
        <section className="section-normal">
          <div className="container-page">
            <PricingSection showHeader showTrustSignals />
          </div>
        </section>

        <section className="section-tight">
          <div className="container-page">
            <FeatureComparisonTable />
          </div>
        </section>

        <section aria-labelledby="recursos-title" className="section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h2 id="recursos-title" className="text-h2 font-semibold text-ink-strong">
                O que o Flowo faz pela sua barbearia
              </h2>
              <p className="mt-3 text-lead text-muted-ink">
                Tudo o que vem com a assinatura, do atendimento ao pagamento.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredResources.map((resource) => (
                <FeaturedResource key={resource.title} {...resource} />
              ))}
            </div>
          </div>
        </section>

        <FAQ />

        <PricingCTA />
      </main>
      <Footer />
    </>
  );
}
