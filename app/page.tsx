import SchemaMarkup from "@/components/schema-markup";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProductStory from "@/components/home/product-story";
import OptionalOperations from "@/components/home/optional-operations";
import SwitchingReassurance from "@/components/home/switching-reassurance";
import ScenarioSelector from "@/components/home/scenario-selector";
import HomePricingSection from "@/components/home-pricing-section";
import FAQ from "@/components/faq";
import OnboardingClose from "@/components/home/onboarding-close";
import { ValidatedProof } from "@/components/home/validated-proof";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flowo | IA no WhatsApp e Gestão para Barbearias",
  description:
    "Chegou “tem horário hoje?” A Flowo confere e já marca. Você continua no corte; o cliente recebe os horários livres e o agendamento fica na agenda.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <SchemaMarkup />
      <Navbar />
      <main id="main-content">
        <Hero />
        <ValidatedProof />
        <ProductStory />
        <OptionalOperations />
        <SwitchingReassurance />
        <ScenarioSelector />
        <section id="precos" className="section-normal scroll-mt-24">
          <div className="container-page">
            <HomePricingSection />
          </div>
        </section>
        <FAQ compact />
        <OnboardingClose />
      </main>
      <Footer compact />
    </>
  );
}
