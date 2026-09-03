import Image from "next/image";
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
import { ProductDisclaimer } from "@/components/home/product-previews";
import { getPlan } from "@/data/pricing-data";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const PATH = "/software-para-barbearia";
const solo = getPlan("solo");

export const metadata = buildMetadata({
  title: "Software para Barbearia com IA no WhatsApp | Flowo",
  description:
    "Agenda por barbeiro, atendimento no WhatsApp com IA, comandas e clientes em um só painel. Recebimento opcional. Conheça a Flowo.",
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
        "Software para barbearia com atendimento no WhatsApp, agenda por barbeiro, comandas, clientes e recebimento opcional.",
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
        "Agenda por barbeiro",
        "Atendimento e agendamento no WhatsApp",
        "Lembretes e confirmação",
        "Clientes e histórico",
        "Comandas e recebimento depois do atendimento",
      ],
    },
    breadcrumbSchema,
  ],
};

const faq = [
  {
    question: "O que é um software para barbearia?",
    answer:
      "É o sistema que junta agenda, clientes, atendimento, equipe e comandas. Na Flowo, o atendimento começa no WhatsApp e a agenda responde.",
  },
  {
    question: "Funciona para quem atende sozinho?",
    answer:
      "Sim. O plano Solo é para um barbeiro: atendimento no WhatsApp, agenda, lembretes, histórico de clientes e recebimento opcional.",
  },
  {
    question: "Cada barbeiro pode ter horários diferentes?",
    answer:
      "Sim. Nos planos com equipe, cada barbeiro tem dias, turnos, folgas e serviços próprios. A Flowo só oferece o que está livre para ele.",
  },
  {
    question: "Preciso usar o pagamento integrado?",
    answer:
      "Não. Dinheiro e maquininha própria continuam valendo. PIX e cartão Flowo são opcionais e usados depois do atendimento.",
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
      "O cliente pergunta. A Flowo olha a agenda e responde na hora. Sua equipe não para de cortar.",
  },
  {
    icon: CalendarDays,
    title: "Agenda que respeita a equipe",
    description:
      "A Flowo só oferece horário livre. Ela olha o horário da barbearia, a agenda de cada barbeiro, a duração do serviço e as folgas.",
  },
  {
    icon: UsersRound,
    title: "Clientes e histórico",
    description:
      "Cada cliente com seu histórico de cortes. Cada pessoa da equipe vê só o que a função permite.",
  },
  {
    icon: WalletCards,
    title: "Comanda e recebimento",
    description:
      "Feche o atendimento e registre como o cliente pagou. Dinheiro, maquininha ou, se quiser, PIX e cartão Flowo.",
  },
] as const;

const steps = [
  "Cadastre a barbearia, os serviços, os barbeiros e os horários.",
  "Conecte o WhatsApp da barbearia e diga quando a equipe assume.",
  "Acompanhe agenda, clientes e comandas no painel, no dia a dia.",
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
          eyebrow="Feito para a rotina do corte"
          title="Software para barbearia com IA."
          description="Atendimento no WhatsApp, agenda por barbeiro, clientes e comandas em um só painel. Você escolhe o que ativar."
          preview="comparacao"
        />

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">A tela de hoje da sua barbearia.</h2>
              <p className="mt-5 max-w-measure text-body text-muted-ink">
                Quem está na cadeira, quem atrasou e o que precisa de você. Tudo na mesma tela, atualizado na
                hora.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-xl border border-ink/15 bg-surface shadow-[0_30px_70px_-45px_oklch(0.17_0.012_110/0.55)]">
              <Image
                src="/images/product/dashboard-hoje.png"
                alt="Painel da Flowo, tela Hoje: as cadeiras ocupadas agora, a lista do dia, um atraso a resolver e o valor recebido até o momento."
                width={1920}
                height={1041}
                sizes="(min-width: 1280px) 1120px, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>
            <ProductDisclaimer label="Telas do app com dados ilustrativos" className="mt-4" />
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="max-w-2xl">
              <p className="text-label font-medium text-faint-ink">O que precisa funcionar de verdade</p>
              <h2 className="mt-4 text-h2 font-semibold text-ink-strong">Menos promessa. Mais rotina resolvida.</h2>
              <p className="mt-4 text-lead text-muted-ink">
                Um sistema só vale a pena se tira trabalho da hora mais cheia. E se deixa claro o que fazer em
                seguida.
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
              <h2 className="mt-4 text-h2 font-semibold text-ink-strong">Três passos e pronto.</h2>
              <p className="mt-4 text-lead text-muted-ink">
                Você configura com a equipe Flowo. Os horários de cada barbeiro podem entrar agora ou depois.
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
              <h2 className="mt-4 text-h3 font-semibold text-ink-strong">Veja a agenda funcionando antes de escolher.</h2>
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

        <section className="border-t border-line bg-surface py-8 md:py-10">
          <div className="container-page">
            <p className="max-w-measure text-label text-muted-ink">
              <strong className="font-semibold text-ink">O que já foi testado.</strong> O atendimento no
              WhatsApp ligado à agenda (resposta, agendamento, remarcação, cancelamento e a passagem para a
              equipe) foi testado pela Flowo em 26 de julho de 2026, com números de teste da própria Flowo.
              As telas desta página são do produto, com dados ilustrativos. Ainda não medimos resultado em
              barbearias clientes.{" "}
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="font-medium text-ink underline underline-offset-4"
              >
                Ver a demonstração completa
              </Link>
              .
            </p>
          </div>
        </section>

        <CommercialCta
          title="Pronto para organizar a sua barbearia?"
          description="Comece pelo que mais interrompe o seu atendimento. Veja o produto com os seus horários e serviços."
          price={solo.monthly}
        />

        <RelatedSolutions
          items={[
            {
              href: "/sistema-agendamento-barbearia",
              label: "Sistema de agendamento",
              description: "Agenda por barbeiro, lembretes e confirmação.",
            },
            {
              href: "/agenda-barbearia-whatsapp",
              label: "Agenda no WhatsApp",
              description: "O cliente pergunta e a Flowo oferece o horário livre.",
            },
            {
              href: "/aplicativo-para-barbeiros",
              label: "Aplicativo para a equipe",
              description: "Agenda e comandas no celular. Em preparação para iPhone e Android.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
