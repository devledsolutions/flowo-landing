import type { Metadata } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AgendaReadinessDiagnostic } from "@/components/marketing/agenda-readiness-diagnostic";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const PAGE_PATH = "/recursos/diagnostico-agenda-barbearia";
const TITLE = "Diagnóstico de Agenda para Barbearia Grátis | Flowo";
const DESCRIPTION =
  "Responda 5 perguntas e descubra na hora se a agenda da sua barbearia depende de improviso. Resultado grátis, sem cadastro, com plano em PDF opcional.";

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
      "Sim. As cinco perguntas e o resultado aparecem sem cadastro. O PDF complementar também é gratuito e a assinatura da Flowo é apresentada separadamente.",
  },
  {
    question: "Preciso informar meus dados para ver o resultado?",
    answer:
      "Não. O resultado aparece assim que você termina as cinco perguntas. Nome e e-mail são pedidos apenas para liberar o PDF complementar; telefone e marketing são opcionais.",
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
        "@type": "WebApplication",
        name: "Diagnóstico de Agenda para Barbearia",
        description: DESCRIPTION,
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: absoluteUrl(PAGE_PATH),
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
      <Navbar />
      <main id="main-content">
        <AgendaReadinessDiagnostic />
      </main>
      <Footer compact />
    </>
  );
}
