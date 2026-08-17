import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  Clapperboard,
  Clock,
  CreditCard,
  Download,
  FileSpreadsheet,
  MessageCircle,
  ReceiptText,
  RotateCcw,
  Smartphone,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { ResourceNav } from "@/components/resources/resource-nav";
import { ResourceCollectionStructuredData } from "@/components/resources/resource-structured-data";
import { SIGNUP_URL } from "@/components/cta-links";
import {
  GUIDE_BY_PATH,
  type GuideIconKey,
} from "@/data/guides";
import { buildMetadata } from "@/lib/seo";
import { LEGAL_ENTITY } from "@/lib/legal-identity";

const PAGE_TITLE = "Recursos e Guias para Barbearias";
const PAGE_DESCRIPTION =
  "Guias e páginas de produto para organizar agenda, equipe, WhatsApp, aplicativo, pagamentos, comissões, cashback e financeiro da sua barbearia.";

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/recursos",
});

const guideIcons: Record<GuideIconKey, typeof Calendar> = {
  calendar: Calendar,
  users: Users,
  "credit-card": CreditCard,
  message: MessageCircle,
  bell: Bell,
  chart: BarChart3,
};

const featuredGuides = [
  "/recursos/guias/guia-definitivo-agendamento",
  "/recursos/guias/gerenciamento-equipe",
  "/recursos/guias/configurando-whatsapp",
  "/recursos/guias/pagamentos-pix",
].map((path) => GUIDE_BY_PATH[path]);

const downloads = [
  {
    title: "Planilha de Precificação",
    description: "Calcule o preço ideal dos seus serviços",
    icon: FileSpreadsheet,
  },
  {
    title: "Calendário de Conteúdo",
    description: "30 dias de ideias para Instagram",
    icon: Calendar,
  },
  {
    title: "Planilha de Comissões",
    description: "Controle pagamentos da equipe",
    icon: FileSpreadsheet,
  },
];

const TOTAL_GUIDES = 10;

const startingPoints = [
  {
    title: "Organizar a agenda",
    description: "Horários, lembretes e confirmações em um fluxo único.",
    href: "/recursos/guias/guia-definitivo-agendamento",
  },
  {
    title: "Dividir horários da equipe",
    description: "Agenda e disponibilidade diferentes para cada barbeiro.",
    href: "/recursos/guias/gerenciamento-equipe",
  },
  {
    title: "Reduzir faltas",
    description: "Confirmação, lembrete, no-show e lista de espera sem cancelar por silêncio.",
    href: "/recursos/guias/reduzindo-faltas",
  },
  {
    title: "Entender o caixa",
    description: "Comandas, pagamentos, saldo e limites do painel financeiro.",
    href: "/recursos/guias/controle-financeiro-barbearia",
  },
] as const;

const productResources = [
  {
    icon: CreditCard,
    label: "Opcional",
    title: "Pagamentos no atendimento",
    description:
      "Dinheiro, maquininha própria ou pagamentos Flowo ativados pela barbearia.",
    href: "/software-barbearia-com-pix",
  },
  {
    icon: Users,
    label: "Empresarial",
    title: "Comissões",
    description:
      "Cálculo depois da comanda paga e repasse iniciado pelo gestor.",
    href: "/recursos/comissoes-barbeiros",
  },
  {
    icon: BadgePercent,
    label: "Configurável",
    title: "Cashback",
    description:
      "Percentual, validade e limites definidos antes de ativar o benefício.",
    href: "/recursos/cashback-barbearia",
  },
  {
    icon: ReceiptText,
    label: "Piloto",
    title: "Nota fiscal",
    description:
      "Ativação assistida, sujeita a município, dados fiscais e homologação.",
    href: "/recursos/nota-fiscal-barbearia",
  },
  {
    icon: Smartphone,
    label: "Em preparação",
    title: "Aplicativo para a equipe",
    description:
      "Agenda, presenças, clientes e comandas no celular de barbeiros e gestores.",
    href: "/aplicativo-para-barbeiros",
  },
  {
    icon: RotateCcw,
    label: "Add-on · beta",
    title: "Flowo Recupera",
    description:
      "Módulo separado, com oportunidades revisadas por pessoas e resultado ligado à comanda.",
    href: "/flowo-recupera",
  },
] as const;

export default function ResourcesPage() {
  return (
    <>
      <ResourceCollectionStructuredData
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/recursos"
        breadcrumbLabel="Recursos"
        items={[
          {
            name: "Guias para Barbearias",
            path: "/recursos/guias",
            description: "Dez guias agrupados por agenda, relacionamento e gestão.",
          },
          {
            name: "Materiais Gratuitos para Barbearias",
            path: "/recursos/materiais",
            description: "Planilhas, checklists, roteiros e guias para baixar.",
          },
          {
            name: "Roteiros de Shorts e Reels para Barbearias",
            path: "/recursos/videos",
            description: "Roteiros curtos baseados nas práticas publicadas nas guias.",
          },
          {
            name: "Comissões de Barbeiros",
            path: "/recursos/comissoes-barbeiros",
            description: "Cálculo de comissão e repasse sob controle do gestor.",
          },
          {
            name: "Cashback para Barbearias",
            path: "/recursos/cashback-barbearia",
            description: "Cashback configurável com limites definidos pela barbearia.",
          },
          {
            name: "Aplicativo para Barbeiros",
            path: "/aplicativo-para-barbeiros",
            description:
              "Aplicativo em preparação para agenda, presenças, clientes e comandas da equipe.",
          },
          {
            name: "Nota Fiscal para Barbearias",
            path: "/recursos/nota-fiscal-barbearia",
            description: "Fluxo fiscal com ativação assistida e disponibilidade verificada.",
          },
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <section className="pt-32 pb-section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-4xl">
              <Breadcrumb
                items={[
                  { label: "Início", href: "/" },
                  { label: "Recursos", href: "/recursos" },
                ]}
              />
              <ResourceNav current="/recursos" />

              {/* Hero */}
              <div className="mt-12 mb-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-end">
                <div className="max-w-2xl">
                  <p className="text-label font-semibold uppercase tracking-[0.14em] text-faint-ink">
                    Biblioteca Flowo
                  </p>
                  <h1 className="mt-3 text-h2 font-bold leading-tight text-ink">
                    Guias, planilhas e roteiros para operar sua barbearia
                  </h1>
                  <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
                    Escolha um problema da rotina e vá direto ao material que
                    ajuda a resolvê-lo: agenda, equipe, WhatsApp ou financeiro.
                  </p>
                </div>
                <div className="border-l border-line pl-6">
                  <p className="text-label font-semibold text-ink">
                    Tudo aqui é feito para usar
                  </p>
                  <p className="mt-2 text-label text-muted-ink">
                    Sem teoria solta: cada guia termina com um processo,
                    checklist ou próxima ação para a sua operação.
                  </p>
                </div>
              </div>

              <section aria-labelledby="starting-points-title" className="mb-16">
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-caption font-semibold uppercase tracking-[0.14em] text-faint-ink">
                      Comece pelo problema
                    </p>
                    <h2 id="starting-points-title" className="mt-2 text-h3 font-bold text-ink">
                      O que precisa melhorar primeiro?
                    </h2>
                  </div>
                  <BookOpen
                    className="hidden h-6 w-6 text-faint-ink sm:block"
                    aria-hidden="true"
                  />
                </div>
                <ol className="divide-y divide-line border-y border-line">
                  {startingPoints.map((item, index) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group grid gap-2 py-5 sm:grid-cols-[3rem_1fr_1.25fr_auto] sm:items-center sm:gap-5"
                      >
                        <span className="text-caption tabular-nums text-faint-ink">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-semibold text-ink">{item.title}</span>
                        <span className="text-label text-muted-ink">
                          {item.description}
                        </span>
                        <ArrowRight
                          className="hidden h-4 w-4 text-faint-ink transition-transform duration-200 ease-out-quint group-hover:translate-x-1 group-hover:text-ink sm:block"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="product-resources-title" className="mb-16">
                <div className="mb-8">
                  <p className="text-caption font-semibold uppercase tracking-[0.14em] text-faint-ink">
                    Conheça o produto
                  </p>
                  <h2 id="product-resources-title" className="mt-2 text-h3 font-bold text-ink">
                    Recursos com condições explicadas
                  </h2>
                  <p className="mt-2 max-w-2xl text-label text-muted-ink">
                    O que é opcional, configurável, exclusivo de plano ou ainda
                    está em piloto aparece antes de qualquer chamada para ação.
                  </p>
                </div>
                <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                  {productResources.map(({ icon: Icon, ...item }) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex min-h-56 flex-col bg-surface p-6 transition-colors hover:bg-surface-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                        <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-muted-ink">
                          {item.label}
                        </span>
                      </div>
                      <h3 className="mt-7 font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 text-label text-muted-ink">{item.description}</p>
                      <ArrowRight
                        className="mt-auto h-4 w-4 pt-6 box-content text-faint-ink transition-transform group-hover:translate-x-1 group-hover:text-ink"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </section>

              {/* Guides */}
              <div className="mb-16">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <h2 className="text-h3 font-bold text-ink">Guias disponíveis</h2>
                  <Link
                    href="/recursos/guias"
                    className="flex items-center gap-1 text-label font-medium text-muted-ink transition-colors hover:text-ink"
                  >
                    Ver todos ({TOTAL_GUIDES})
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {featuredGuides.map((guide) => {
                    const Icon = guideIcons[guide.icon];

                    return (
                      <Link
                        key={guide.path}
                        href={guide.path}
                        className="group block rounded-lg border border-line bg-surface p-5 transition-colors duration-200 ease-out-quint hover:border-ink/40"
                      >
                        <div className="flex items-start gap-4">
                          <div className="rounded-lg bg-surface-2 p-2.5">
                            <Icon
                              className="h-5 w-5 text-ink"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="flex items-center gap-1 text-caption text-faint-ink">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {guide.readTime}
                            </span>
                            <h3 className="mt-1 font-semibold text-ink">
                              {guide.title}
                            </h3>
                            <p className="mt-1 text-label text-muted-ink">
                              {guide.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Shorts/Reels */}
              <div className="mb-16 rounded-lg border border-line bg-surface p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-surface-2 p-2.5">
                      <Clapperboard className="h-5 w-5 text-ink" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-h3 font-bold text-ink">
                        Shorts e Reels prontos
                      </h2>
                      <p className="mt-1 text-muted-ink">
                        8 roteiros de vídeos curtos conectados aos guias para
                        divulgar sua barbearia com uma próxima ação clara.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-full sm:flex-shrink-0"
                  >
                    <Link href="/recursos/videos">Ver roteiros de vídeo</Link>
                  </Button>
                </div>
              </div>

              {/* Downloads */}
              <div className="mb-16">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-h3 font-bold text-ink">
                      Materiais gratuitos
                    </h2>
                    <p className="mt-1 text-label text-muted-ink">
                      Planilhas e templates para baixar
                    </p>
                  </div>
                  <Link
                    href="/recursos/materiais"
                    className="flex items-center gap-1 text-label font-medium text-muted-ink transition-colors hover:text-ink"
                  >
                    Ver todos
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {downloads.map((item) => (
                    <Link
                      key={item.title}
                      href="/recursos/materiais"
                      className="group block rounded-lg border border-line bg-surface p-5 transition-colors duration-200 ease-out-quint hover:border-ink/40"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="rounded-lg bg-surface-2 p-2">
                          <item.icon className="h-5 w-5 text-ink" aria-hidden="true" />
                        </div>
                        <Download
                          className="h-4 w-4 text-faint-ink transition-colors group-hover:text-ink"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-label font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-caption text-muted-ink">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="on-ink rounded-lg p-8 sm:p-10">
                <div className="max-w-2xl">
                  <h2 className="text-h3 font-bold">
                    Quer ver o Flowo na prática?
                  </h2>
                  <p className="mt-3 text-muted-ink">
                    Configure sua barbearia e aplique o que você leu nos guias,
                    respeitando o seu plano e os recursos já ativados.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button size="lg" className="rounded-full px-7" asChild>
                      <a href={SIGNUP_URL}>Criar minha conta</a>
                    </Button>
                    <Link
                      href="/precos"
                      className="text-label font-medium underline-offset-4 hover:underline"
                    >
                      Ver planos e preços
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-12 text-center text-label text-muted-ink">
                Mais guias e materiais em breve. Tem uma dúvida específica?{" "}
                <a
                  href={`mailto:${LEGAL_ENTITY.contactEmail}`}
                  className="font-medium text-ink underline underline-offset-4"
                >
                  Fale conosco
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
