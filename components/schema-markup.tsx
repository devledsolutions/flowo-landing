import { PRICING, formatBRL } from "@/data/pricing-data";
import { faqItems } from "@/data/faq-items";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * JSON-LD for the home page. Rules:
 * - Prices come ONLY from data/pricing-data.ts (mirrored, never hardcoded).
 * - No aggregateRating anywhere (we have no verified review corpus).
 * - ONE Organization node for the whole page (layout.tsx must not add another).
 * - FAQ is generated from data/faq-items.ts so page copy and schema never drift.
 */
export default function SchemaMarkup() {
  const offers = PRICING.plans.map((plan) => ({
    "@type": "Offer",
    name: `Plano ${plan.name}`,
    price: String(plan.monthly),
    priceCurrency: PRICING.currency,
    priceValidUntil: PRICING.priceValidUntil,
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/precos"),
  }));

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flowo",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers,
    description:
      "Sistema de agendamento para barbearias: a IA atende no WhatsApp, agenda e confirma clientes. Lembretes automáticos e pagamento do atendimento por PIX ou cartão.",
    featureList: [
      "Agendamento pelo WhatsApp com IA",
      "Lembretes e confirmação automática",
      "Gestão de múltiplos barbeiros",
      "Sincronização com Google, Apple e Outlook",
      "Histórico de clientes",
      "Relatórios de faturamento",
    ],
    inLanguage: "pt-BR",
    author: {
      "@type": "Organization",
      name: "Flowo",
      url: SITE_URL,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flowo",
    url: SITE_URL,
    logo: absoluteUrl("/flowo-logo.svg"),
    description:
      "Software de agendamento para barbearias via WhatsApp com inteligência artificial",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "contato@flowo.com.br",
      availableLanguage: ["Portuguese"],
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Flowo",
    url: SITE_URL,
    inLanguage: "pt-BR",
  };

  const pricingFaq = {
    "@type": "Question",
    name: "Quanto custa o Flowo?",
    acceptedAnswer: {
      "@type": "Answer",
      text: `Temos 3 planos: ${PRICING.plans
        .map((plan) => `${plan.name} (${formatBRL(plan.monthly)}/mês)`)
        .join(", ")}. No plano anual você leva 2 meses grátis. Sem fidelidade: cancele quando quiser.`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      pricingFaq,
      ...faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
