import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ClipboardCheck,
  MessageCircleMore,
  ReceiptText,
  Settings,
  Smartphone,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { MobileAppWaitlistForm } from "@/components/mobile-app-waitlist-form";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { PhoneFrame } from "@/components/home/phone-frame";
import { ProductDisclaimer } from "@/components/home/product-previews";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { SIGNUP_URL } from "@/components/cta-links";

const PATH = "/aplicativo-para-barbeiros";

export const metadata = buildMetadata({
  title: "Aplicativo para Barbearia: Agenda, Clientes e Gestão",
  description:
    "O app da Flowo para barbeiros e gestores: agenda, comandas, clientes, conversas e financeiro no celular. Em preparação para iPhone e Android.",
  path: PATH,
});

const faqItems = [
  {
    question: "O app já está nas lojas?",
    answer:
      "Ainda não. O app está construído, mas ainda não foi publicado para iPhone e Android. Não temos data. A lista de interesse avisa quando sair.",
  },
  {
    question: "O que já existe no app?",
    answer:
      "Agenda, presenças, comandas, clientes, conversas, lista de espera, serviços, produtos, estoque, pacotes, equipe, horários, comissões, financeiro, métricas, campanhas e configurações. O que cada pessoa vê depende do plano e da função.",
  },
  {
    question: "Todo mundo da equipe vê a mesma coisa?",
    answer: "Não. Dono, gerente, financeiro e barbeiro veem só o que a função permite.",
  },
  {
    question: "Preciso receber pela Flowo?",
    answer:
      "Não. Dinheiro e maquininha própria continuam valendo. PIX e cartão Flowo são opcionais e usados depois do atendimento.",
  },
  {
    question: "Preciso esperar o app para usar a Flowo?",
    answer:
      "Não. O painel web e o atendimento no WhatsApp já funcionam hoje. O app vai usar a mesma agenda e os mesmos clientes. O painel continua existindo.",
  },
] as const;

const capabilityGroups = [
  {
    title: "Atendimento",
    icon: CalendarDays,
    description: "Da chegada do cliente ao fechamento da comanda.",
    items: [
      "Agenda por barbeiro",
      "Presenças e lista de espera",
      "Comanda com serviços, produtos e total",
      "Clientes e histórico de cortes",
    ],
  },
  {
    title: "Conversas",
    icon: MessageCircleMore,
    description: "O WhatsApp da barbearia, no celular de quem atende.",
    items: [
      "Conversas com a Flowo e a equipe no mesmo histórico",
      "Assumir a conversa e devolver para a Flowo",
      "Avisos no celular",
    ],
  },
  {
    title: "Cadastros e equipe",
    icon: UsersRound,
    description: "O que mantém cada agenda e cada serviço certos.",
    items: [
      "Serviços, produtos e estoque",
      "Equipe, horários e comissões",
      "Horários da barbearia",
      "Perfil e página de agendamento",
    ],
  },
  {
    title: "Gestão",
    icon: BarChart3,
    description: "Os números da barbearia, para quem tem permissão.",
    items: [
      "Financeiro e retiradas",
      "Recebimentos e chave PIX",
      "Métricas da barbearia",
      "Campanhas",
      "Plano e assinatura",
    ],
  },
] as const;

const journey = [
  { title: "Configure", description: "Barbearia, serviços, equipe, horários e permissões.", icon: Settings },
  { title: "Organize a agenda", description: "Horários livres por barbeiro e lista de espera.", icon: CalendarDays },
  { title: "Atenda", description: "Presença, cliente, histórico e conversa na mesma tela.", icon: ClipboardCheck },
  { title: "Feche a comanda", description: "Serviços, produtos e como o cliente pagou.", icon: ReceiptText },
  { title: "Acompanhe", description: "Financeiro, métricas e campanhas.", icon: BarChart3 },
] as const;

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: "Aplicativo para barbeiros",
      item: absoluteUrl(PATH),
    },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Aplicativo Flowo para barbeiros e gestores",
  description:
    "O app da Flowo para a rotina da barbearia no celular: agenda, comandas, clientes, conversas e financeiro. Em preparação para iPhone e Android.",
  url: absoluteUrl(PATH),
  inLanguage: "pt-BR",
  dateModified: "2026-09-03",
  isPartOf: {
    "@type": "WebSite",
    name: "Flowo",
    url: absoluteUrl("/"),
  },
  about: {
    "@type": "SoftwareApplication",
    name: "Flowo",
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Android",
  },
};

export default function MobileAppPage() {
  return (
    <>
      {[breadcrumbLd, faqLd, pageLd].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <Navbar />
      <main id="main-content">
        <section className="relative isolate overflow-hidden bg-cream pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-56 border-y border-line bg-surface-2"
          />
          <div className="container-page grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="inline-flex min-h-9 items-center gap-2 border-y border-line py-2 text-caption font-semibold text-muted-ink">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                Em preparação para iPhone e Android
              </p>
              <h1 className="mt-7 max-w-[12ch] text-display font-semibold leading-[1.02] tracking-[-0.04em] text-ink-strong">
                A barbearia no seu bolso.
              </h1>
              <p className="mt-6 max-w-xl text-lead text-muted-ink">
                Agenda, comandas, clientes e conversas no app da Flowo. O mesmo painel, na mão do barbeiro.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href="#lista-de-interesse"
                  event="CTA Clicked"
                  properties={{
                    page: PATH,
                    placement: "hero",
                    destination: "app_waitlist",
                    intent: "app_launch_interest",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
                >
                  Entrar na lista
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href={SIGNUP_URL}
                  event="CTA Clicked"
                  properties={{
                    page: PATH,
                    placement: "hero",
                    destination: "dashboard_signup",
                    intent: "start_now",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-surface/80 px-7 text-label font-semibold text-ink transition-colors hover:bg-surface"
                >
                  Usar o painel agora
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>

            <div>
              <div className="mx-auto flex max-w-[36rem] items-start justify-center gap-4 sm:gap-6">
                <PhoneFrame
                  src="/images/product/app-home.png"
                  alt="Tela inicial do app da Flowo: quem está em cada cadeira agora, um atraso a resolver e os atendimentos do dia."
                  width={720}
                  height={1564}
                  sizes="(min-width: 640px) 16rem, 44vw"
                  className="w-[47%] max-w-[16rem] border-ink/30"
                  priority
                />
                <PhoneFrame
                  src="/images/product/app-agenda.png"
                  alt="Agenda do app da Flowo: a semana, os cinco barbeiros e os horários livres de cada um."
                  width={720}
                  height={1564}
                  sizes="(min-width: 640px) 16rem, 44vw"
                  className="w-[47%] max-w-[16rem] border-ink/30 sm:mt-10"
                  priority
                />
              </div>
              <ProductDisclaimer label="Telas do app com dados ilustrativos" className="mt-6 justify-center" />
            </div>
          </div>
        </section>

        <section
          id="lista-de-interesse"
          aria-labelledby="lista-de-interesse-title"
          className="scroll-mt-24 border-b border-line bg-surface-2"
        >
          <div className="container-page grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16 lg:py-16">
            <div>
              <p className="text-label font-semibold text-muted-ink">Lista de interesse do aplicativo</p>
              <h2 id="lista-de-interesse-title" className="mt-4 text-h3 font-semibold text-ink">
                Receba o aviso do lançamento.
              </h2>
              <p className="mt-4 text-body text-muted-ink">
                Cadastro curto. A gente avisa quando o app sair. Sem prometer data.
              </p>
            </div>
            <MobileAppWaitlistForm />
          </div>
        </section>

        <section className="section-loose">
          <div className="container-page">
            <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-label font-semibold text-muted-ink">O que o app faz</p>
                <h2 className="mt-4 max-w-[14ch] text-h2 font-semibold text-ink">Mais que uma agenda.</h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-ink lg:justify-self-end">
                O app acompanha a rotina da configuração ao retorno do cliente. Cada pessoa vê o que a função e
                o plano permitem.
              </p>
            </div>

            <div className="divide-y divide-line border-b border-line">
              {capabilityGroups.map((group, index) => (
                <article
                  key={group.title}
                  className="grid gap-7 py-9 md:grid-cols-[0.8fr_1.2fr] md:gap-12 lg:grid-cols-[0.72fr_1.28fr]"
                >
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface">
                      <group.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-caption text-faint-ink">0{index + 1}</p>
                      <h3 className="mt-1 text-h3 font-semibold text-ink">{group.title}</h3>
                      <p className="mt-2 max-w-sm text-body text-muted-ink">{group.description}</p>
                    </div>
                  </div>
                  <ul className="grid gap-x-10 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex min-h-12 items-center gap-3 border-b border-line py-3 text-label font-semibold text-ink"
                      >
                        <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-label font-semibold text-muted-ink">A rotina no app</p>
                <h2 className="mt-4 max-w-[14ch] text-h2 font-semibold text-ink">Do horário à comanda.</h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-ink lg:justify-self-end">
                O app não cria outra agenda. Ele usa os mesmos clientes, horários e regras do painel Flowo.
              </p>
            </div>

            <ol className="mt-12 border-y border-line">
              {journey.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-4 border-b border-line py-6 last:border-b-0 sm:grid-cols-[3rem_1fr_1.3fr] sm:items-center sm:gap-7"
                >
                  <span className="text-caption font-semibold text-faint-ink">0{index + 1}</span>
                  <div className="flex items-center gap-3">
                    <step.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                  </div>
                  <p className="text-body text-muted-ink">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-line bg-surface-2 section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-label font-semibold text-muted-ink">Perguntas frequentes</p>
              <h2 className="mt-4 text-h2 font-semibold text-ink">Dúvidas sobre o app.</h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-ink marker:content-none">
                    {item.question}
                    <span aria-hidden="true" className="text-xl font-normal transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-body text-muted-ink">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line py-8 md:py-10">
          <div className="container-page">
            <p className="max-w-measure text-label text-muted-ink">
              <strong className="font-semibold text-ink">O que já dá para afirmar.</strong> O app está
              construído e ainda não foi publicado nas lojas. Não prometemos data. As telas desta página são do
              app de verdade, com dados ilustrativos. Ainda não medimos o uso do app em barbearias clientes.
              Hoje, a entrada na Flowo é o painel web com o atendimento no WhatsApp.{" "}
              <Link href="/demonstracao-agendamento-whatsapp" className="font-medium text-ink underline underline-offset-4">
                Ver o atendimento funcionando
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-b border-line bg-cream">
          <div className="container-page section-tight flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-label font-semibold text-ink">
                <Check className="h-4 w-4" aria-hidden="true" />
                Não precisa esperar o app.
              </p>
              <p className="mt-2 max-w-2xl text-body text-muted-ink">
                O painel web e o atendimento no WhatsApp já funcionam hoje. O app vai usar a mesma agenda.
              </p>
            </div>
            <TrackedLink
              href={SIGNUP_URL}
              event="CTA Clicked"
              properties={{
                page: PATH,
                placement: "closing",
                destination: "dashboard_signup",
                intent: "start_now",
              }}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
            >
              Começar pelo painel web
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
