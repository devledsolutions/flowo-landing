import { SalesCampaignPage } from "@/components/marketing/sales-campaign-page";
import { InstitutionalFilmSchema } from "@/components/marketing/institutional-film";
import { PLANS } from "@/data/pricing-data";
import { buildMetadata, absoluteUrl } from "@/lib/seo";

const PAGE_PATH = "/recepcionista-ia-barbearia";

export const metadata = buildMetadata({
  title: "Recepcionista com IA para Barbearia no WhatsApp | Flowo",
  description:
    "A IA da Flowo atende no WhatsApp, consulta horários por profissional e agenda clientes. Planos desde R$ 249/mês, sem fidelidade.",
  path: PAGE_PATH,
  absoluteTitle: true,
});

const faq = [
  {
    question: "Cada barbeiro pode ter horários diferentes?",
    answer:
      "Sim. Nos planos com equipe, cada profissional pode ter dias, turnos, folgas, serviços e duração próprios.",
  },
  {
    question: "O pagamento integrado é obrigatório?",
    answer:
      "Não. A barbearia pode continuar recebendo em dinheiro ou na própria maquininha. PIX e cartão Flowo são opcionais e usados depois do atendimento.",
  },
  {
    question: "O Flowo tem período de teste?",
    answer:
      "Não. A assinatura começa no primeiro dia, com configuração acompanhada pela equipe Flowo e sem fidelidade.",
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
          "Página de produto da Flowo para barbearias que querem conectar atendimento no WhatsApp, agenda por profissional e operação.",
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
          "Sistema para barbearias com recepção por inteligência artificial no WhatsApp, agenda por barbeiro, comandas e pagamentos opcionais.",
        offers: PLANS.map((plan) => ({
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
