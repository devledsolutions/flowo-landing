import {
  ArrowDown,
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  BellRing,
  CalendarDays,
  Check,
  CircleUserRound,
  ClipboardCheck,
  CreditCard,
  FileText,
  Gift,
  Megaphone,
  MessageCircleMore,
  Package,
  ReceiptText,
  Scissors,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { MobileAppWaitlistForm } from "@/components/mobile-app-waitlist-form";
import { TrackedLink } from "@/components/analytics/tracked-link";
import {
  AgendaPhone,
  ClientsPhone,
  ComandasPhone,
  ConversationsPhone,
  FinancePhone,
  OperationsPhone,
} from "@/components/mobile-app-product-previews";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { SIGNUP_URL } from "@/components/cta-links";

const PATH = "/aplicativo-para-barbeiros";

export const metadata = buildMetadata({
  title: "Aplicativo para Barbearia: Agenda, Clientes e Gestão",
  description:
    "Conheça o aplicativo Flowo em preparação para iPhone e Android: agenda, comandas, clientes, equipe, financeiro, conversas, estoque, campanhas e gestão da barbearia pelo celular.",
  path: PATH,
});

const faqItems = [
  {
    question: "O aplicativo Flowo já está disponível nas lojas?",
    answer:
      "Ainda não. O produto móvel já possui o escopo operacional implementado, mas a distribuição pública para iPhone e Android continua em preparação e depende das etapas finais de loja e validação em aparelhos. A lista de interesse é o canal para receber novidades do lançamento.",
  },
  {
    question: "O que já foi construído no aplicativo?",
    answer:
      "O app já cobre onboarding, agenda, presenças, comandas, clientes, conversas, notificações, lista de espera, serviços, produtos, estoque, pacotes, equipe, horários, comissões, perfil do negócio, financeiro, métricas, campanhas, assinatura e configurações. O acesso final varia conforme plano, função, permissão e ativação de cada recurso.",
  },
  {
    question: "Todos da equipe enxergam as mesmas informações?",
    answer:
      "Não. O aplicativo respeita os papéis e permissões da operação. Dono, administrador, gestor, financeiro e barbeiro acessam apenas as áreas autorizadas para sua função.",
  },
  {
    question: "Cada barbeiro pode ter horários e comissões diferentes?",
    answer:
      "Sim, quando o plano e a permissão da operação incluem gestão de equipe. A Flowo mantém horários, disponibilidade e regras por profissional; o aplicativo dá acesso à configuração ou à consulta conforme a função de cada pessoa.",
  },
  {
    question: "Preciso receber pagamentos pela Flowo?",
    answer:
      "Não. Os recebimentos integrados são opcionais. A barbearia pode usar comandas e registrar a operação sem ser obrigada a processar o pagamento pela plataforma. Quando ativados, os recursos financeiros seguem o plano e a configuração da empresa.",
  },
  {
    question: "O painel web vai deixar de existir?",
    answer:
      "Não. App e painel usam a mesma operação. O aplicativo atende a rotina no celular; o painel web continua disponível para configuração, supervisão e tarefas que pedem mais espaço.",
  },
  {
    question: "Preciso esperar o aplicativo para usar a Flowo?",
    answer:
      "Não. O painel web e o atendimento com IA no WhatsApp são a entrada atual da Flowo. O cadastro nesta página serve apenas para receber novidades do aplicativo.",
  },
] as const;

const capabilityGroups = [
  {
    title: "Atendimento",
    icon: CalendarDays,
    description: "Da chegada do cliente ao fechamento do serviço.",
    items: [
      "Agenda individual e da equipe",
      "Novo horário e detalhe do agendamento",
      "Presenças e lista de espera",
      "Comandas, itens e fechamento",
      "Clientes e histórico de atendimento",
    ],
  },
  {
    title: "Relacionamento",
    icon: MessageCircleMore,
    description: "Contexto para continuar a conversa sem perder o cliente.",
    items: [
      "Conversas e busca de mensagens",
      "Assumir ou devolver o atendimento à IA",
      "Notificações do operador",
      "Campanhas e marketing",
      "Avaliações, lembretes e automações",
    ],
  },
  {
    title: "Cadastros e equipe",
    icon: UsersRound,
    description: "A base que mantém cada agenda e serviço corretos.",
    items: [
      "Serviços, produtos e catálogo",
      "Estoque, pacotes e galeria",
      "Equipe, horários individuais e comissões",
      "Horários do negócio",
      "Perfil, links e página de agendamento",
    ],
  },
  {
    title: "Gestão",
    icon: BarChart3,
    description: "Leitura da operação e configuração no mesmo aplicativo.",
    items: [
      "Financeiro, histórico e retiradas",
      "Recebimentos e chaves Pix",
      "Notas e visão por profissional",
      "Métricas da barbearia",
      "Plano, assinatura, conta e integrações",
    ],
  },
] as const;

const productChapters = [
  {
    title: "Atender sem voltar para o computador.",
    description:
      "O profissional consulta a agenda, confirma presença, abre a comanda e acompanha o fechamento no contexto do atendimento.",
    bullets: [
      "Agenda separada por profissional",
      "Status do agendamento e presenças",
      "Comanda com serviços, produtos e valor",
    ],
    icon: Scissors,
  },
  {
    title: "Reconhecer o cliente antes de responder.",
    description:
      "Cadastro, histórico e conversa ficam conectados. A equipe autorizada entra quando a IA precisa de apoio humano e mantém o mesmo contexto.",
    bullets: [
      "Busca de cliente e histórico",
      "Conversas centralizadas",
      "Notificações e retomada humana",
    ],
    icon: CircleUserRound,
  },
  {
    title: "Levar a gestão junto, quando fizer sentido.",
    description:
      "Dono e gestores podem acompanhar caixa, recebimentos, equipe, métricas e configurações sem expor essas áreas a quem não tem permissão.",
    bullets: [
      "Financeiro e repasses",
      "Métricas e campanhas",
      "Cadastros, equipe e configurações",
    ],
    icon: ShieldCheck,
  },
] as const;

const journey = [
  {
    title: "Configure a operação",
    description: "Negócio, serviços, equipe, horários e permissões.",
    icon: Settings,
  },
  {
    title: "Organize a agenda",
    description: "Disponibilidade real por profissional e lista de espera.",
    icon: CalendarDays,
  },
  {
    title: "Atenda o cliente",
    description: "Presença, cadastro, histórico e conversa no contexto.",
    icon: ClipboardCheck,
  },
  {
    title: "Feche a comanda",
    description: "Serviços, produtos e recebimento opcional.",
    icon: ReceiptText,
  },
  {
    title: "Acompanhe e retorne",
    description: "Financeiro, métricas, campanhas e automações.",
    icon: BarChart3,
  },
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
    "Visão do aplicativo Flowo em preparação para a operação móvel de barbearias.",
  url: absoluteUrl(PATH),
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

function ChapterList({
  bullets,
}: {
  bullets: readonly string[];
}) {
  return (
    <ul className="mt-7 border-y border-line">
      {bullets.map((bullet) => (
        <li
          key={bullet}
          className="flex min-h-12 items-center gap-3 border-b border-line py-3 last:border-b-0"
        >
          <Check className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
          <span className="text-label font-semibold text-ink">{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MobileAppPage() {
  return (
    <>
      {[breadcrumbLd, faqLd, pageLd].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />
      <main id="main-content">
        <section className="relative isolate overflow-hidden bg-cream pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-56 border-y border-line bg-surface-2"
          />
          <div className="container-page grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div>
              <div className="inline-flex min-h-9 items-center gap-2 border-y border-line py-2 text-caption font-semibold text-muted-ink">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                Produto construído
                <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
                lançamento em preparação
              </div>
              <h1 className="mt-7 max-w-[12ch] text-display font-semibold leading-[1.02] tracking-[-0.04em] text-ink-strong">
                A barbearia inteira cabe no seu celular.
              </h1>
              <p className="mt-6 max-w-xl text-lead text-muted-ink">
                Agenda, presenças, clientes, comandas, equipe, conversas,
                financeiro e gestão no aplicativo Flowo para barbeiros e
                gestores.
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
              <p className="mt-5 max-w-lg text-caption text-faint-ink">
                Ainda não disponível nas lojas. As telas mostram o produto em
                desenvolvimento com dados ilustrativos.
              </p>
            </div>

            <div className="relative min-h-[590px] sm:min-h-[640px] lg:min-h-[680px]">
              <div
                aria-hidden="true"
                className="absolute inset-x-2 bottom-4 top-8 rounded-xl bg-ink sm:inset-x-8"
              />
              <FinancePhone className="absolute left-1/2 top-16 z-0 hidden -translate-x-[112%] -rotate-[7deg] opacity-90 sm:block" />
              <ComandasPhone className="absolute left-1/2 top-16 z-0 hidden translate-x-[12%] rotate-[7deg] opacity-90 sm:block" />
              <AgendaPhone className="absolute left-1/2 top-7 z-10 -translate-x-1/2" />
              <p className="absolute inset-x-0 bottom-7 z-20 mx-auto w-fit bg-ink px-3 py-1 text-center text-caption text-white/65">
                Prévia baseada nas telas reais do app
              </p>
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
              <p className="text-label font-semibold text-muted-ink">
                Lista de interesse do aplicativo
              </p>
              <h2 id="lista-de-interesse-title" className="mt-4 text-h3 font-semibold text-ink">
                Receba notícias do lançamento.
              </h2>
              <p className="mt-4 text-body text-muted-ink">
                Um cadastro curto, confirmação imediata e nenhuma promessa de
                data que ainda não foi definida.
              </p>
            </div>
            <MobileAppWaitlistForm />
          </div>
        </section>

        <section className="section-loose">
          <div className="container-page">
            <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-label font-semibold text-muted-ink">
                  Já implementado no produto
                </p>
                <h2 className="mt-4 max-w-[12ch] text-h2 font-semibold text-ink">
                  Não é apenas uma agenda móvel.
                </h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-ink lg:justify-self-end">
                O aplicativo acompanha a rotina desde a configuração do negócio
                até o relacionamento depois do atendimento. Cada pessoa vê o
                que sua função e seu plano permitem.
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
                      <p className="mt-2 max-w-sm text-body text-muted-ink">
                        {group.description}
                      </p>
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
            <p className="mt-5 max-w-3xl text-caption text-faint-ink">
              A disponibilidade de cada área depende do plano contratado, do
              papel da pessoa, das permissões e da ativação de recursos
              opcionais.
            </p>
          </div>
        </section>

        <section className="on-ink section-loose overflow-hidden">
          <div className="container-page">
            <div className="max-w-4xl">
              <p className="text-label font-semibold text-muted-ink">
                Rotina de atendimento
              </p>
              <h2 className="mt-4 text-h2 font-semibold text-ink">
                Do primeiro horário à comanda fechada.
              </h2>
              <p className="mt-5 max-w-3xl text-lead text-muted-ink">
                A tela muda, mas o contexto continua. Agenda e comanda usam a
                mesma operação configurada para a barbearia e para cada
                profissional.
              </p>
            </div>
            <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line">
                  <Scissors className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-h3 font-semibold text-ink">
                  {productChapters[0].title}
                </h3>
                <p className="mt-4 text-body text-muted-ink">
                  {productChapters[0].description}
                </p>
                <ChapterList bullets={productChapters[0].bullets} />
              </div>
              <div className="relative min-h-[610px] overflow-hidden rounded-xl bg-[#11130e] sm:min-h-[650px]">
                <AgendaPhone className="absolute left-1/2 top-8 z-10 -translate-x-[88%] -rotate-[4deg]" />
                <ComandasPhone className="absolute left-1/2 top-16 translate-x-[-8%] rotate-[5deg]" />
                <p className="absolute bottom-5 left-5 z-20 text-caption text-white/55">
                  Dados ilustrativos para demonstrar a interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-loose overflow-hidden">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-20">
            <div className="relative min-h-[610px] overflow-hidden rounded-xl border border-line bg-surface-2 sm:min-h-[650px]">
              <ClientsPhone className="absolute left-1/2 top-9 -translate-x-[92%] -rotate-[4deg]" />
              <ConversationsPhone className="absolute left-1/2 top-14 z-10 translate-x-[-4%] rotate-[5deg]" />
              <p className="absolute bottom-5 left-5 z-20 text-caption text-faint-ink">
                Cliente e conversa ligados ao mesmo atendimento.
              </p>
            </div>
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface">
                <CircleUserRound className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-h3 font-semibold text-ink">
                {productChapters[1].title}
              </h2>
              <p className="mt-4 text-body text-muted-ink">
                {productChapters[1].description}
              </p>
              <ChapterList bullets={productChapters[1].bullets} />
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-surface-2 section-loose overflow-hidden">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-h3 font-semibold text-ink">
                {productChapters[2].title}
              </h2>
              <p className="mt-4 text-body text-muted-ink">
                {productChapters[2].description}
              </p>
              <ChapterList bullets={productChapters[2].bullets} />
            </div>
            <div className="relative min-h-[610px] overflow-hidden rounded-xl bg-ink sm:min-h-[650px]">
              <FinancePhone className="absolute left-1/2 top-8 z-10 -translate-x-[90%] -rotate-[4deg]" />
              <OperationsPhone className="absolute left-1/2 top-16 translate-x-[-3%] rotate-[5deg]" />
              <p className="absolute bottom-5 left-5 z-20 text-caption text-white/55">
                Visibilidade condicionada ao papel e às permissões.
              </p>
            </div>
          </div>
        </section>

        <section className="section-loose">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-label font-semibold text-muted-ink">
                  Uma operação conectada
                </p>
                <h2 className="mt-4 max-w-[13ch] text-h2 font-semibold text-ink">
                  A rotina de ponta a ponta.
                </h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-ink lg:justify-self-end">
                O aplicativo não cria uma operação paralela. Ele usa os mesmos
                clientes, agendas, regras e registros do painel Flowo.
              </p>
            </div>

            <ol className="mt-12 border-y border-line">
              {journey.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-4 border-b border-line py-6 last:border-b-0 sm:grid-cols-[3rem_1fr_1.3fr] sm:items-center sm:gap-7"
                >
                  <span className="text-caption font-semibold text-faint-ink">
                    0{index + 1}
                  </span>
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

        <section className="on-ink section-normal">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="text-label font-semibold text-muted-ink">
                  Condições transparentes
                </p>
                <h2 className="mt-4 text-h2 font-semibold text-ink">
                  Completo não significa obrigatório.
                </h2>
                <p className="mt-5 text-body text-muted-ink">
                  A Flowo adapta o aplicativo ao plano, à função e às escolhas
                  da barbearia.
                </p>
              </div>
              <div className="divide-y divide-line border-y border-line">
                {[
                  {
                    icon: CreditCard,
                    title: "Recebimentos integrados são opcionais",
                    text: "A barbearia decide se quer receber pela plataforma. Comandas e gestão não obrigam o uso do pagamento integrado.",
                  },
                  {
                    icon: UsersRound,
                    title: "Equipe funciona por papel e permissão",
                    text: "Horários individuais, comissões e dados financeiros aparecem apenas para os planos e acessos autorizados.",
                  },
                  {
                    icon: FileText,
                    title: "Fiscal e integrações exigem ativação",
                    text: "Recursos fiscais, financeiros e de integração dependem de configuração, elegibilidade e disponibilidade do serviço.",
                  },
                  {
                    icon: Store,
                    title: "Lojas ainda em preparação",
                    text: "O escopo do produto foi construído, mas a liberação pública depende da conclusão das etapas finais de iPhone e Android.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="grid gap-4 py-6 sm:grid-cols-[2.75rem_1fr]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 text-body text-muted-ink">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page">
            <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-label font-semibold text-muted-ink">
                  Mais do que a operação básica
                </p>
                <h2 className="mt-4 text-h2 font-semibold text-ink">
                  Recursos que crescem com a barbearia.
                </h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-ink lg:justify-self-end">
                O mesmo aplicativo também concentra as áreas que ajudam a
                organizar recorrência, comunicação e administração.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {[
                [Gift, "Cashback configurável"],
                [Megaphone, "Campanhas"],
                [BellRing, "Lembretes e notificações"],
                [BadgeDollarSign, "Comissões"],
                [ShoppingBag, "Produtos e estoque"],
                [WalletCards, "Financeiro"],
                [Sparkles, "Automações"],
                [Package, "Pacotes"],
              ].map(([Icon, label]) => {
                const FeatureIcon = Icon as typeof Gift;
                return (
                  <span
                    key={label as string}
                    className="inline-flex min-h-11 items-center gap-2 border-b border-line py-2 text-label font-semibold text-ink"
                  >
                    <FeatureIcon className="h-4 w-4" aria-hidden="true" />
                    {label as string}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-surface-2 section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-label font-semibold text-muted-ink">
                Perguntas frequentes
              </p>
              <h2 className="mt-4 text-h2 font-semibold text-ink">
                O que já dá para afirmar.
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-ink marker:content-none">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="text-xl font-normal transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-body text-muted-ink">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-cream">
          <div className="container-page section-tight flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-label font-semibold text-ink">
                <Check className="h-4 w-4" aria-hidden="true" />
                Não precisa esperar o aplicativo.
              </p>
              <p className="mt-2 max-w-2xl text-body text-muted-ink">
                O painel web e a IA no WhatsApp já são a porta de entrada da
                Flowo. O app vai complementar essa mesma operação.
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
