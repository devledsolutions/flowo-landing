import type { Metadata } from "next";
import Footer from "@/components/footer";
import { DiagnosisLanding } from "@/components/design-review/lead-offer-landing";
import { LeadMagnetForm } from "@/components/marketing/lead-magnet-form";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const PAGE_PATH = "/recursos/diagnostico-agenda-barbearia";
const TITLE = "Diagnóstico de Agenda para Barbearia | PDF Gratuito Flowo";
const DESCRIPTION =
  "Baixe o Raio-X da Agenda: 12 perguntas para descobrir onde sua barbearia perde tempo entre WhatsApp, agenda e horários de cada barbeiro.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PAGE_PATH,
  absoluteTitle: true,
});

const faq = [
  {
    question: "O diagnóstico de agenda é gratuito?",
    answer:
      "Não há cobrança pelo material. A assinatura do produto Flowo é paga e apresentada separadamente.",
  },
  {
    question: "Preciso informar telefone?",
    answer:
      "Não. Nome e e-mail são suficientes para liberar o material. Telefone e consentimento de SMS são opcionais.",
  },
  {
    question: "O material serve para quem atende sozinho?",
    answer:
      "Sim. O diagnóstico funciona tanto para quem atende sozinho quanto para barbearias em que cada profissional tem seus próprios dias, turnos e folgas.",
  },
];

export default function DiagnosisAgendaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(`${PAGE_PATH}#webpage`),
        url: absoluteUrl(PAGE_PATH),
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "pt-BR",
        breadcrumb: { "@id": absoluteUrl(`${PAGE_PATH}#breadcrumb`) },
      },
      {
        "@type": "CreativeWork",
        name: "Raio-X da Agenda",
        description: DESCRIPTION,
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        publisher: {
          "@type": "Organization",
          name: "Flowo",
          url: absoluteUrl("/"),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${PAGE_PATH}#breadcrumb`),
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
            name: "Diagnóstico de agenda",
            item: absoluteUrl(PAGE_PATH),
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <DiagnosisLanding review={false} form={<LeadMagnetForm />} />
      <Footer />
    </>
  );
}
