import Link from "next/link";
import {
  ArrowUpRight,
  Clapperboard,
  Download,
  Timer,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "@/components/lead-capture-modal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Roteiros de Shorts e Reels para Barbearias",
  description:
    "8 roteiros prontos de Shorts e Reels, com hook, estrutura e CTA, para divulgar sua barbearia e gerar agendamentos.",
  path: "/recursos/videos",
});

const shortsPlan = [
  {
    title: "Como aumentar ticket médio sem parecer venda forçada",
    duration: "45-60s",
    hook: "Seu cliente já ia gastar R$ 50. Como fazer virar R$ 72 com naturalidade?",
    steps: [
      "Mostre um combo simples (corte + barba + acabamento).",
      "Explique quando ofertar: no agendamento e na confirmação.",
      "Feche com um exemplo de conta por semana.",
    ],
    cta: "Baixe a planilha de combos e aplique hoje.",
    sourceUrl: "/recursos/guias/aumentar-ticket-medio",
  },
  {
    title: "Fluxo de confirmação no WhatsApp que reduz no-show",
    duration: "45-60s",
    hook: "Você ainda confirma no braço? Esse fluxo de 3 mensagens resolve.",
    steps: [
      "Mensagem de lembrete 24h antes.",
      "Confirmação final 2h antes.",
      "Remarcação automática para horário liberado.",
    ],
    cta: "Pegue o checklist no link e copie o fluxo.",
    sourceUrl: "/agenda-barbearia-whatsapp",
  },
  {
    title: "Escala de equipe sem conflito de horários",
    duration: "45-60s",
    hook: "Sua equipe vive em conflito de agenda? Use essa regra semanal.",
    steps: [
      "Defina blocos fixos por barbeiro.",
      "Distribua por especialidade e demanda.",
      "Revise capacidade todo domingo.",
    ],
    cta: "Veja o passo a passo completo no guia.",
    sourceUrl: "/recursos/guias/escala-equipe",
  },
  {
    title: "Fidelização de clientes em 30 dias",
    duration: "45-60s",
    hook: "Parou de depender só de cliente novo? Faça este plano de 30 dias.",
    steps: [
      "Pós-atendimento em até 24h.",
      "Reativação segmentada para inativos 45+ dias.",
      "Oferta de retorno com contexto.",
    ],
    cta: "Abra o roteiro de reativação e adapte.",
    sourceUrl: "/recursos/guias/fidelizacao-clientes",
  },
  {
    title: "Controle financeiro que cabe na rotina da barbearia",
    duration: "45-60s",
    hook: "Barbearia cheia e caixa apertado? Falta este painel semanal.",
    steps: [
      "Separe faturamento de margem.",
      "Defina meta semanal por barbeiro.",
      "Acompanhe ticket e ocupação juntos.",
    ],
    cta: "Baixe o fluxo de caixa semanal no material gratuito.",
    sourceUrl: "/recursos/guias/controle-financeiro-barbearia",
  },
  {
    title: "Flowo vs Planilha: o custo oculto do manual",
    duration: "45-60s",
    hook: "Planilha parece barata, mas qual é o custo de oportunidade?",
    steps: [
      "Mostre o tempo perdido em retrabalho.",
      "Mostre os erros de conflito de horários.",
      "Mostre o impacto no no-show e no faturamento.",
    ],
    cta: "Veja o comparativo completo e decida com dados.",
    sourceUrl: "/flowo-vs-planilha",
  },
  {
    title: "No-show: confirmação automática pelo WhatsApp",
    duration: "45-60s",
    hook: "Quer reduzir no-show sem constranger cliente? Confirmação automática.",
    steps: [
      "Lembrete 24h antes com pedido de confirmação.",
      "Sem resposta? O horário pode ser liberado para outro cliente.",
      "Comunique a política de cancelamento de forma transparente.",
    ],
    cta: "Confira o guia de confirmação e pagamentos.",
    sourceUrl: "/software-barbearia-com-pix",
  },
  {
    title: "Flowo vs Agenda Manual: quando migrar",
    duration: "45-60s",
    hook: "Sua agenda manual virou gargalo? 3 sinais para migrar hoje.",
    steps: [
      "Mensagens repetitivas consumindo o dia.",
      "Conflitos de horário recorrentes.",
      "Falta de visão de desempenho por barbeiro.",
    ],
    cta: "Acesse o comparativo e veja o ponto de virada.",
    sourceUrl: "/flowo-vs-agenda-manual",
  },
];

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <Breadcrumb
                items={[
                  { label: "Início", href: "/" },
                  { label: "Recursos", href: "/recursos" },
                  { label: "Vídeos", href: "/recursos/videos" },
                ]}
              />

              {/* Hero */}
              <div className="mt-10 mb-14">
                <h1 className="text-h2 font-bold leading-tight text-ink">
                  8 roteiros de vídeos curtos prontos para publicar
                </h1>
                <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
                  Cada roteiro está conectado a um guia ou comparativo do site.
                  Use os scripts para transformar conteúdo em alcance e gerar
                  mais agendamentos.
                </p>
              </div>

              {/* Download pack */}
              <div className="mb-10 flex flex-col gap-4 rounded-lg border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-h3 font-bold text-ink">
                    Pacote de distribuição pronto
                  </h2>
                  <p className="mt-1 text-label text-muted-ink">
                    Inclui hook, estrutura de roteiro e CTA para cada tema.
                  </p>
                </div>
                <Button variant="outline" asChild className="rounded-full sm:flex-shrink-0">
                  <Link href="/downloads/lead-magnets/roteiros-shorts-reels-30-dias.csv">
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    Baixar roteiros (CSV)
                  </Link>
                </Button>
              </div>

              {/* Scripts */}
              <ol className="space-y-4">
                {shortsPlan.map((item, index) => (
                  <li key={item.title}>
                    <article className="rounded-lg border border-line bg-surface p-6 sm:p-7">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-caption font-medium text-muted-ink">
                            <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" />
                            Roteiro {index + 1}
                          </span>
                          <h3 className="mt-3 text-h3 font-semibold text-ink">
                            {item.title}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-2 self-start rounded-full bg-surface-2 px-3 py-1 text-caption font-medium text-muted-ink">
                          <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                          {item.duration}
                        </span>
                      </div>

                      <p className="mt-4 text-muted-ink">
                        <strong className="font-semibold text-ink">Hook:</strong>{" "}
                        {item.hook}
                      </p>
                      <ol className="mt-4 list-decimal space-y-1 pl-5 text-muted-ink marker:text-faint-ink">
                        {item.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                      <p className="mt-4 text-muted-ink">
                        <strong className="font-semibold text-ink">CTA:</strong>{" "}
                        {item.cta}
                      </p>
                      <Link
                        href={item.sourceUrl}
                        className="mt-4 inline-flex items-center gap-1 text-label font-semibold text-ink underline-offset-4 hover:underline"
                      >
                        Ver página base do roteiro
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </article>
                  </li>
                ))}
              </ol>

              {/* CTA */}
              <div className="on-ink mt-16 rounded-lg p-8 sm:p-10">
                <div className="max-w-2xl">
                  <h2 className="text-h3 font-bold">
                    Quer transformar esses roteiros em agenda cheia?
                  </h2>
                  <p className="mt-3 text-muted-ink">
                    Estruture sua operação com a IA do Flowo no WhatsApp e
                    receba os agendamentos que o conteúdo gerar.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <LeadCaptureModal>
                      <Button size="lg" className="rounded-full px-7">
                        Começar agora
                      </Button>
                    </LeadCaptureModal>
                    <Link
                      href="/precos"
                      className="text-label font-medium underline-offset-4 hover:underline"
                    >
                      Ver planos e preços
                    </Link>
                  </div>
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
