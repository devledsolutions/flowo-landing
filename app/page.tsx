import SchemaMarkup from "@/components/schema-markup";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProductStory from "@/components/home/product-story";
import OptionalOperations from "@/components/home/optional-operations";
import { RecoveryHomeSection } from "@/components/marketing/recovery-preview";
import HomePricingSection from "@/components/home-pricing-section";
import FAQ from "@/components/faq";
import OnboardingClose from "@/components/home/onboarding-close";
import Footer from "@/components/footer";
import {
  InstitutionalFilm,
  InstitutionalFilmSchema,
} from "@/components/marketing/institutional-film";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sistema de Agendamento para Barbearia | WhatsApp + IA - Flowo",
  description:
    "A IA da Flowo atende no WhatsApp, agenda e confirma clientes. Organize horários, comandas e formas de recebimento — com pagamentos integrados opcionais.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <SchemaMarkup />
      <InstitutionalFilmSchema pagePath="/" />
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProductStory />
        <InstitutionalFilm />
        <OptionalOperations />
        <RecoveryHomeSection />
        <section id="precos" className="section-normal scroll-mt-24">
          <div className="container-page">
            <HomePricingSection />
          </div>
        </section>
        <FAQ compact />
        <OnboardingClose />
      </main>
      <Footer />
    </>
  );
}
