import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MessageCircle,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  CommercialCta,
  CommercialHero,
  RelatedSolutions,
} from "@/components/marketing/commercial-page";
import { getPlan } from "@/data/pricing-data";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const PATH = "/software-para-barbearia";
const solo = getPlan("solo");

export const metadata = buildMetadata({
  title: "Software para Barbearia com IA no WhatsApp | Flowo",
  description:
    "Software para barbearia com agenda por profissional, atendimento no WhatsApp com IA, comandas, clientes e recebimento opcional. Conheça o Flowo.",
  path: PATH,
  absoluteTitle: true,
});

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: "Software para barbearia",
      item: absoluteUrl(PATH),
    },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${absoluteUrl(PATH)}#software`,
      name: "Flowo",
      alternateName: "Software para barbearia Flowo",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      url: absoluteUrl(PATH),
      description:
        "Software de gestão para barbearias com atendimento no WhatsApp, agenda por profissional, comandas e recebimento opcional.",
      inLanguage: "pt-BR",
      brand: { "@type": "Brand", name: "Flowo" },
      offers: {
        "@type": "Offer",
        price: String(solo.monthly),
        priceCurrency: "BRL",
        url: absoluteUrl("/precos"),
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Agenda por profissional",
        "Atendimento e agendamento no WhatsApp",
        "Confirmação e lembretes",
        "Clientes e histórico",
        "Comandas e recebimentos pós-atendimento",
      ],
    },
    breadcrumbSchema,
  ],
};

const faq = [
  {
    question: "O que é um software para barbearia?",
    answer:
      "É uma plataforma que reúne agenda, clientes, atendimento, equipe, comandas e indicadores da operação. No Flowo, a conversa pode começar no WhatsApp e a disponibilidade considera a agenda configurada.",
  },
  {
    question: "O Flowo funciona para quem atende sozinho?",
    answer:
      "Sim. O plano Solo é para um profissional e inclui atendimento no WhatsApp, agenda, confirmação, histórico e recebimentos integrados opcionais.",
  },
  {
    question: "Cada barbeiro pode ter horários diferentes?",
    answer:
      "Sim. Nos planos com equipe, cada profissional pode ter dias, turnos, folgas e serviços próprios. A agenda usa essa disponibilidade ao oferecer horários.",
  },
  {
    question: "Preciso usar o pagamento integrado?",
    answer:
      "Não. A barbearia pode continuar recebendo em dinheiro ou na própria maquininha. PIX e cartão integrados são opcionais e usados depois do atendimento.",
  },
] as const;

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const capabilities = [
  {
    icon: MessageCircle,
    title: "Atendimento no WhatsApp",
    description:
      "O cliente pergunta, a Flowo consulta a disponibilidade configurada e conduz o próximo passo sem deixar a equipe presa ao celular.",
  },
  {
    icon: CalendarDays,
    title: "Agenda que respeita a equipe",
    description:
      "Horário geral, agenda individual, serviço, folga e compromisso existente entram na mesma decisão.",
  },
  {
    icon: UsersRound,
    title: "Clientes e operação",
    description:
      "Histórico, profissionais e permissões ficam organizados para a rotina do negócio — no painel e no celular.",
  },
  {
    icon: WalletCards,
    title: "Comanda e recebimento",
    description:
      "Feche o atendimento, registre a forma de pagamento e acompanhe a operação. O pagamento integrado é opcional.",
  },
] as const;

const steps = [
  "Cadastre negócio, serviços, profissionais e horários.",
  "Conecte o WhatsApp oficial e defina quando a equipe assume.",
  "Acompanhe agenda, clientes, comandas e resultados conforme a operação acontece.",
] as const;

export default function SoftwareParaBarbeariaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...softwareSchema,
            "@graph": [...softwareSchema["@graph"], faqSchema],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="main-content">
        <CommercialHero
          current="Software para barbearia"
          eyebrow="Gestão feita para a rotina do corte"
          title="Um software para barbearia que começa no WhatsApp e termina na operação."
          description="O Flowo conecta atendimento, agenda por profissional, clientes, comandas e recebimentos em um só lugar. Você escolhe o que ativar e mantém o controle da rotina."
          preview="comparacao"
        />

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="max-w-2xl">
              <p className="text-label font-medium text-faint-ink">
                O que precisa funcionar de verdade
              </p>
              <h2 className="mt-4 text-h2 font-semibold text-ink-strong">
                Menos promessa. Mais rotina resolvida.
              </h2>
              <p className="mt-4 text-lead text-muted-ink">
                Um sistema só vale a pena quando reduz trabalho no horário mais
                corrido e deixa claro o que a equipe precisa fazer em seguida.
              </p>
            </div>
            <div className="mt-12 grid gap-0 border-y border-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
              {capabilities.map(({ icon: Icon, title, description }) => (
                <article key={title} className="border-b border-line py-7 sm:px-6 lg:border-b-0 lg:first:pl-0 lg:last:pr-0">
                  <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-label font-medium text-faint-ink">Como começa</p>
              <h2 className="mt-4 text-h2 font-semibold text-ink-strong">
                Da configuração ao primeiro agendamento.
              </h2>
              <p className="mt-4 text-lead text-muted-ink">
                A implantação acompanha o que a sua barbearia realmente faz. Os
                horários individuais podem ser preenchidos agora ou depois, com
                um aviso claro para manter a resposta correta.
              </p>
            </div>
            <ol className="divide-y divide-line border-y border-line">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-5 py-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-cream">
                    {index + 1}
                  </span>
                  <p className="max-w-xl pt-1 text-base leading-relaxed text-ink">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-tight border-y border-line bg-surface">
          <div className="container-page grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-label font-medium text-faint-ink">Para decidir sem dúvida</p>
              <h2 className="mt-4 text-h3 font-semibold text-ink-strong">
                Veja a agenda funcionando antes de escolher.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link href="/demonstracao-agendamento-whatsapp" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-label font-semibold text-cream hover:opacity-90">
                Ver demonstração
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/comparar" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 py-3 text-label font-medium text-ink hover:bg-surface-2">
                Comparar sistemas
              </Link>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-8 md:grid-cols-2">
            {faq.map((item) => (
              <article key={item.question} className="border-t border-line pt-5">
                <h2 className="text-lg font-semibold text-ink">{item.question}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-ink">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <CommercialCta
          title="Pronto para organizar a sua barbearia?"
          description="Comece pelo que hoje mais interrompe o seu atendimento e veja o produto com os seus próprios horários e serviços."
          price={solo.monthly}
        />

        <RelatedSolutions
          items={[
            {
              href: "/sistema-agendamento-barbearia",
              label: "Sistema de agendamento",
              description: "Agenda por profissional, confirmação e operação conectada.",
            },
            {
              href: "/agenda-barbearia-whatsapp",
              label: "Agenda no WhatsApp",
              description: "O cliente pergunta e a Flowo conduz o horário disponível.",
            },
            {
              href: "/aplicativo-para-barbeiros",
              label: "Aplicativo para a equipe",
              description: "Leve agenda, clientes e gestão para o celular do time.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
