import { absoluteUrl } from "@/lib/seo";

export function GrowthToolSchema({
  path,
  title,
  description,
  name,
  faqs,
}: {
  path: string;
  title: string;
  description: string;
  name: string;
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(`${path}#webpage`),
        url: absoluteUrl(path),
        name: title,
        description,
        inLanguage: "pt-BR",
        breadcrumb: { "@id": absoluteUrl(`${path}#breadcrumb`) },
      },
      {
        "@type": "WebApplication",
        name,
        description,
        url: absoluteUrl(path),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "pt-BR",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        provider: {
          "@type": "Organization",
          name: "Flowo",
          url: absoluteUrl("/"),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumb`),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Recursos",
            item: absoluteUrl("/recursos"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name,
            item: absoluteUrl(path),
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
