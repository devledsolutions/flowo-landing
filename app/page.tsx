import SchemaMarkup from "@/components/schema-markup";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonials";
import HowItWorks from "@/components/how-it-works";
import Features from "@/components/features";
import HomePricingSection from "@/components/home-pricing-section";
import SupportSection from "@/components/support-section";
import FAQ from "@/components/faq";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sistema de Agendamento para Barbearia | WhatsApp + IA - Flowo",
  description:
    "A IA da Flowo atende no WhatsApp, agenda e confirma seus clientes. Lembretes automáticos contra faltas e pagamento do atendimento por PIX ou cartão.",
  path: "/",
  absoluteTitle: true,
});

/**
 * Home composition. Each section component owns its own <section>, background
 * band and vertical cadence (no double-wrapping, no duplicated ids: the
 * `como-funciona` anchor lives inside HowItWorks). Order follows the
 * Barbearia Noir art direction: hero, proof band, how it works, features,
 * pricing, support, FAQ, closing ink CTA band above the footer.
 */
export default function Home() {
  return (
    <>
      <SchemaMarkup />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Testimonials />
        <HowItWorks />
        <Features />
        <section id="precos" className="section-normal scroll-mt-24">
          <div className="container-page">
            <HomePricingSection />
          </div>
        </section>
        <SupportSection />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
