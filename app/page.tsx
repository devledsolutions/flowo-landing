import SchemaMarkup from "@/components/schema-markup";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProductStory from "@/components/home/product-story";
import HomePricingSection from "@/components/home-pricing-section";
import FAQ from "@/components/faq";
import OnboardingClose from "@/components/home/onboarding-close";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sistema de Agendamento para Barbearia | WhatsApp + IA - Flowo",
  description:
    "A IA da Flowo atende no WhatsApp, agenda e confirma seus clientes. Lembretes automáticos contra faltas e pagamento do atendimento por PIX ou cartão.",
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
        <ProductStory />
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
