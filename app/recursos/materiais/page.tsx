import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  Clock3,
  Compass,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { MaterialLibrary } from "@/components/resources/material-library";
import { ResourceNav } from "@/components/resources/resource-nav";
import { ResourceCollectionStructuredData } from "@/components/resources/resource-structured-data";
import { SIGNUP_URL } from "@/components/cta-links";
import { RESOURCE_MATERIALS } from "@/data/resource-materials";
import { buildMetadata } from "@/lib/seo";
import { LEGAL_ENTITY } from "@/lib/legal-identity";

const PAGE_TITLE = "Materiais Gratuitos para Barbearias";
const PAGE_DESCRIPTION =
  "Planilhas, checklists e guias gratuitos para organizar agenda, WhatsApp, equipe, clientes, marketing e financeiro da sua barbearia.";

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/recursos/materiais",
});

const freeTools = [
  {
    title: "Tempo no WhatsApp",
    description:
      "Estime quantas horas do mês vão para conversas sobre disponibilidade.",
    href: "/calculadora-tempo-whatsapp-barbearia",
    icon: Clock3,
    cta: "Calcular agora",
  },
  {
    title: "Comissão de barbeiro",
    description:
      "Separe serviço, produto e ajuste numa memória fácil de conferir.",
    href: "/calculadora-comissao-barbeiro",
    icon: Calculator,
    cta: "Simular comissão",
  },
  {
    title: "Retorno de clientes",
    description:
      "Escolha uma janela de retorno e adapte uma mensagem responsável.",
    href: "/mensagens-retorno-clientes-barbearia",
    icon: RotateCcw,
    cta: "Planejar retorno",
  },
  {
    title: "Oportunidade no WhatsApp",
    description: "Encontre conversas que merecem revisão antes de falar em perda.",
    href: "/calculadora-dinheiro-perdido-whatsapp-barbearia",
    icon: MessageCircle,
    cta: "Calcular cenário",
  },
  {
    title: "Ocupação da agenda",
    description: "Compare capacidade da equipe com os atendimentos marcados.",
    href: "/calculadora-ocupacao-agenda-barbearia",
    icon: BarChart3,
    cta: "Ver ocupação",
  },
  {
    title: "Qual plano combina",
    description: "Escolha um ponto de partida entre Solo, Equipe e Empresarial.",
    href: "/qual-plano-flowo",
    icon: Compass,
    cta: "Escolher plano",
  },
  {
    title: "Raio-X da gestão",
    description: "Responda cinco perguntas e escolha a primeira melhoria.",
    href: "/raio-x-gestao-barbearia",
    icon: Calculator,
    cta: "Fazer o Raio-X",
  },
] as const;

const TOTAL_MATERIALS = RESOURCE_MATERIALS.length + 1;

export default function MaterialsPage() {
  return (
    <>
      <ResourceCollectionStructuredData
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/recursos/materiais"
        breadcrumbLabel="Materiais"
        items={[
          {
            name: "Raio-X da Agenda + Kit Operação sem Interrupção",
            path: "/recursos/diagnostico-agenda-barbearia",
            canonicalPath: "/recursos/diagnostico-agenda-barbearia",
            description:
              "Diagnóstico prático para organizar WhatsApp, agenda e horários individuais da equipe.",
          },
          ...freeTools.map((tool) => ({
            name: tool.title,
            path: tool.href,
            canonicalPath: tool.href,
            description: tool.description,
          })),
          ...RESOURCE_MATERIALS.map((material) => ({
            name: material.title,
            path: `/recursos/materiais#${material.id}`,
            canonicalPath: `/recursos/materiais#${material.id}`,
            mediaUrl: material.downloadUrl,
            encodingFormat:
              material.format === "PDF"
                ? "application/pdf"
                : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            description: material.description,
          })),
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <section className="pt-32 pb-section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-4xl">
                <Breadcrumb
                  items={[
                    { label: "Início", href: "/" },
                    { label: "Recursos", href: "/recursos" },
                    { label: "Materiais", href: "/recursos/materiais" },
                  ]}
                />
                <ResourceNav current="/recursos/materiais" />
              </div>

              <header className="mt-10 grid items-center gap-10 border-b border-line pb-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
                <div>
                  <p className="text-label font-semibold uppercase tracking-[0.14em] text-faint-ink">
                    {freeTools.length} ferramentas e {TOTAL_MATERIALS} materiais gratuitos
                  </p>
                  <h1 className="mt-4 max-w-3xl text-h2 font-bold leading-[1.05] text-ink">
                    Menos improviso. Uma próxima ação clara para a barbearia.
                  </h1>
                  <p className="mt-5 max-w-2xl text-lead leading-relaxed text-muted-ink">
                    Escolha o problema de hoje e encontre planilhas, guias e
                    checklists para aplicar na rotina — com o que vem no arquivo e
                    o tempo necessário para começar.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3 text-caption text-muted-ink">
                    <span className="rounded-full border border-line bg-surface px-3 py-1.5">
                      Comece em 10 a 30 minutos
                    </span>
                    <span className="rounded-full border border-line bg-surface px-3 py-1.5">
                      Planilhas com exemplos prontos
                    </span>
                    <span className="rounded-full border border-line bg-surface px-3 py-1.5">
                      PDFs para celular ou impressão
                    </span>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="relative mx-auto h-[22rem] w-full max-w-[30rem] overflow-hidden rounded-xl border border-ink/25 bg-surface-2 sm:h-[25rem]"
                >
                  <div className="absolute bottom-7 left-7 top-12 w-[46%] -rotate-6 overflow-hidden rounded-lg border border-ink/20 bg-cream sm:left-10">
                    <Image
                      src="/images/resources/agenda-sem-interrupcao.png"
                      alt=""
                      fill
                      sizes="220px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute bottom-9 right-7 top-9 w-[46%] rotate-5 overflow-hidden rounded-lg border border-ink/20 bg-surface sm:right-10">
                    <Image
                      src="/images/resources/caixa-sem-confusao.png"
                      alt=""
                      fill
                      sizes="220px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute inset-x-[24%] bottom-5 top-5 overflow-hidden rounded-lg border border-ink bg-cream shadow-[10px_12px_0_rgba(23,24,16,0.08)]">
                    <Image
                      src="/images/resources/guia-gestao.png"
                      alt=""
                      fill
                      sizes="240px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </header>

              <section className="py-14" aria-labelledby="diagnostic-title">
                <Link
                  href="/recursos/diagnostico-agenda-barbearia"
                  className="group grid overflow-hidden rounded-xl border border-ink bg-cream transition-transform duration-200 ease-out-quint hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 sm:grid-cols-[1fr_0.72fr]"
                >
                  <div className="p-7 sm:p-10">
                    <span className="text-caption font-semibold uppercase tracking-[0.14em] text-faint-ink">
                      Comece por aqui · diagnóstico interativo
                    </span>
                    <h2
                      id="diagnostic-title"
                      className="mt-4 block text-h3 font-bold text-ink"
                    >
                      Descubra onde a agenda perde tempo e oportunidade
                    </h2>
                    <p className="mt-3 block max-w-xl text-label leading-relaxed text-muted-ink">
                      Responda cinco perguntas e receba um primeiro diagnóstico.
                      Se quiser aprofundar, complete o Raio-X de 12 perguntas e o
                      plano de ação em PDF.
                    </p>
                    <span className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-label font-semibold text-background">
                      Fazer o diagnóstico
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="relative min-h-56 border-t border-ink bg-surface p-7 sm:border-l sm:border-t-0"
                  >
                    <span className="absolute left-10 top-11 h-36 w-28 -rotate-6 rounded-md border border-ink bg-cream shadow-[8px_10px_0_rgba(23,24,16,0.08)]" />
                    <span className="absolute right-8 top-7 flex h-40 w-32 rotate-3 flex-col rounded-md border border-ink bg-surface p-4 shadow-[8px_10px_0_rgba(23,24,16,0.08)]">
                      <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-faint-ink">
                        Flowo · diagnóstico
                      </span>
                      <span className="mt-8 font-serif text-xl leading-tight text-ink">
                        Raio-X da Agenda
                      </span>
                      <span className="mt-auto h-px bg-ink" />
                    </span>
                  </span>
                </Link>
              </section>

              <section className="pb-14" aria-labelledby="free-tools-title">
                <div className="mb-6 flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-caption font-semibold uppercase tracking-[0.14em] text-faint-ink">
                      Resultado na tela
                    </p>
                    <h2 id="free-tools-title" className="mt-1 text-h3 font-bold text-ink">
                      Faça a conta antes de baixar
                    </h2>
                  </div>
                  <p className="text-label text-muted-ink">
                    Sem cadastro · resultado imediato
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                  {freeTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex min-h-52 flex-col rounded-xl border border-line bg-surface p-6 outline-none transition-colors duration-200 ease-out-quint hover:border-ink/40 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
                    >
                      <tool.icon aria-hidden="true" className="h-6 w-6 text-ink" />
                      <h3 className="mt-7 text-lg font-semibold leading-tight text-ink">
                        {tool.title}
                      </h3>
                      <p className="mt-2 text-label leading-relaxed text-muted-ink">
                        {tool.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-label font-semibold text-ink">
                        {tool.cta}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <MaterialLibrary materials={RESOURCE_MATERIALS} />

              <p className="mt-14 text-center text-label text-muted-ink">
                Sentiu falta de algum modelo?{" "}
                <a
                  href={`mailto:${LEGAL_ENTITY.contactEmail}`}
                  className="font-semibold text-ink underline underline-offset-4"
                >
                  Conte para a Flowo
                </a>
                .
              </p>

              <div className="on-ink mt-12 rounded-xl p-8 sm:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex-1">
                    <p className="text-caption font-semibold uppercase tracking-[0.14em] text-muted-ink">
                      Do modelo para a rotina
                    </p>
                    <h2 className="mt-2 text-h3 font-bold">
                      Prefere acompanhar tudo em um só lugar?
                    </h2>
                    <p className="mt-3 max-w-2xl text-muted-ink">
                      Conheça a agenda, o atendimento pelo WhatsApp e a gestão da
                      barbearia dentro da Flowo.
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="w-full flex-shrink-0 rounded-full px-7 md:w-auto"
                    asChild
                  >
                    <a href={SIGNUP_URL}>Conhecer a Flowo</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
