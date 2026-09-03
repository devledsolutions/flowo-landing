import { SalesCampaignPage } from "@/components/marketing/sales-campaign-page";
import { InstitutionalFilmSchema } from "@/components/marketing/institutional-film";
import { formatBRL, getPlan, hasPublishedPrice, PLANS } from "@/data/pricing-data";
import { buildMetadata, absoluteUrl } from "@/lib/seo";

const PAGE_PATH = "/recepcionista-ia-barbearia";
const soloPrice = formatBRL(getPlan("solo").monthly);

export const metadata = buildMetadata({
  title: "Recepcionista com IA para Barbearia no WhatsApp | Flowo",
  description:
    `A Flowo responde "tem horário?" no WhatsApp da barbearia, olha a agenda de cada barbeiro e confirma. Planos desde ${soloPrice}/mês.`,
  path: PAGE_PATH,
  absoluteTitle: true,
});

const faq = [
  {
    question: "Cada barbeiro pode ter horários diferentes?",
    answer:
      "Sim. Nos planos com equipe, cada barbeiro tem dias, turnos, folgas, serviços e duração próprios. A Flowo só oferece o que está livre para ele.",
  },
  {
    question: "O pagamento integrado é obrigatório?",
    answer:
      "Não. Dinheiro e maquininha própria continuam valendo. PIX e cartão Flowo são opcionais e usados depois do atendimento.",
  },
  {
    question: "O Flowo tem período de teste?",
    answer:
      "Não há teste automático. Nos planos Solo e Equipe, a equipe Flowo pode liberar uma avaliação assistida de 14 dias, sem cartão e sem cobrança automática.",
  },
];

export default function RecepcionistaIaBarbeariaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(`${PAGE_PATH}#webpage`),
        url: absoluteUrl(PAGE_PATH),
        name: "Recepcionista com IA para Barbearia no WhatsApp",
        description:
          "A Flowo atende no WhatsApp da barbearia, olha a agenda de cada barbeiro e confirma o horário. Comandas e pagamentos opcionais.",
        inLanguage: "pt-BR",
        isPartOf: {
          "@type": "WebSite",
          name: "Flowo",
          url: absoluteUrl("/"),
        },
      },
      {
        "@type": "BreadcrumbList",
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
            name: "Recepcionista com IA para barbearia",
            item: absoluteUrl(PAGE_PATH),
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "Flowo",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: absoluteUrl(PAGE_PATH),
        description:
          "Atendimento no WhatsApp ligado à agenda da barbearia, com horários por barbeiro, comandas e pagamentos opcionais.",
        offers: PLANS.filter(hasPublishedPrice).map((plan) => ({
          "@type": "Offer",
          name: `Plano ${plan.name}`,
          price: plan.monthly,
          priceCurrency: "BRL",
          url: absoluteUrl("/precos"),
        })),
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
      <InstitutionalFilmSchema pagePath={PAGE_PATH} />
      <SalesCampaignPage />
    </>
  );
}
