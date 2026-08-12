import Link from "next/link";
import {
  Calendar,
  Calculator,
  Clock3,
  DollarSign,
  Download,
  FileSpreadsheet,
  FileText,
  MessageCircle,
  RotateCcw,
  Users,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { DownloadGateModal } from "@/components/download-gate-modal";
import { ResourceNav } from "@/components/resources/resource-nav";
import { ResourceCollectionStructuredData } from "@/components/resources/resource-structured-data";
import { SIGNUP_URL } from "@/components/cta-links";
import { buildMetadata } from "@/lib/seo";

const PAGE_TITLE = "Materiais Gratuitos para Barbearias";
const PAGE_DESCRIPTION =
  "Planilhas, checklists e guias em PDF gratuitos para organizar a agenda, o financeiro e o marketing da sua barbearia.";

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/recursos/materiais",
});

interface Downloadable {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  downloadUrl: string;
  resourceType: "pdf" | "spreadsheet";
  requestedResource?: string;
  tags: string[];
}

const groups: { heading: string; description: string; items: Downloadable[] }[] = [
  {
    heading: "Guias práticos em PDF",
    description: "Materiais para preencher com a rotina real da barbearia",
    items: [
      {
        id: "guia-gestao-barbearia",
        title: "Guia de Gestão da Barbearia",
        description:
          "Estruture agenda, equipe, caixa e atendimento em um plano prático de 30 dias.",
        icon: FileText,
        downloadUrl: "/downloads/guia-completo-barbearia.pdf",
        resourceType: "pdf",
        requestedResource: "guia_gestao_barbearia",
        tags: ["Gestão", "Operação"],
      },
      {
        id: "agenda-sem-interrupcao",
        title: "Agenda sem Interrupção",
        description:
          "Mapeie perguntas repetidas, escala da equipe e regras de confirmação em um teste de sete dias.",
        icon: Clock3,
        downloadUrl: "/downloads/agenda-sem-interrupcao-flowo.pdf",
        resourceType: "pdf",
        requestedResource: "agenda_sem_interrupcao",
        tags: ["WhatsApp", "Agenda"],
      },
      {
        id: "fechamento-equipe",
        title: "Fechamento da Equipe",
        description:
          "Escreva regras, confira bases e registre ajustes antes de pagar as comissões.",
        icon: DollarSign,
        downloadUrl: "/downloads/fechamento-equipe-flowo.pdf",
        resourceType: "pdf",
        requestedResource: "fechamento_equipe",
        tags: ["Comissões", "Equipe"],
      },
      {
        id: "retorno-sem-spam",
        title: "Retorno sem Spam",
        description:
          "Organize consentimento, janela de contato e mensagens sem pressão ou urgência falsa.",
        icon: RotateCcw,
        downloadUrl: "/downloads/retorno-sem-spam-flowo.pdf",
        resourceType: "pdf",
        requestedResource: "retorno_sem_spam",
        tags: ["Clientes", "Retorno"],
      },
      {
        id: "comissoes-sem-planilha",
        title: "Comissões sem Planilha Paralela",
        description:
          "Combine regras, confira comandas e feche o acerto de cada barbeiro sem depender da memória.",
        icon: DollarSign,
        downloadUrl: "/downloads/comissoes-sem-planilha-flowo.pdf",
        resourceType: "pdf",
        requestedResource: "comissoes_sem_planilha",
        tags: ["Comissões", "Equipe"],
      },
      {
        id: "clientes-na-hora-de-voltar",
        title: "Clientes na Hora de Voltar",
        description:
          "Plano de 30 dias para organizar contatos de retorno sem spam ou desconto automático.",
        icon: Users,
        downloadUrl: "/downloads/clientes-na-hora-de-voltar-flowo.pdf",
        resourceType: "pdf",
        requestedResource: "clientes_hora_voltar",
        tags: ["Clientes", "Retorno"],
      },
      {
        id: "caixa-e-recebimentos",
        title: "Caixa sem Confusão",
        description:
          "Separe venda, recebimento, comissão e resultado sem trocar sua maquininha.",
        icon: DollarSign,
        downloadUrl: "/downloads/caixa-e-recebimentos-flowo.pdf",
        resourceType: "pdf",
        requestedResource: "caixa_recebimentos",
        tags: ["Caixa", "Recebimentos"],
      },
      {
        id: "painel-semanal-barbearia",
        title: "Painel Semanal da Barbearia",
        description:
          "Transforme agenda, faltas, ticket e retorno em uma ação clara para a semana.",
        icon: FileText,
        downloadUrl: "/downloads/referencia-rapida-barbearia.pdf",
        resourceType: "pdf",
        requestedResource: "painel_semanal_barbearia",
        tags: ["Indicadores", "Gestão"],
      },
      {
        id: "stories-com-cara-da-barbearia",
        title: "Stories com Cara da sua Barbearia",
        description:
          "Planeje prova, bastidor, informação e horários sem cair em promoção genérica.",
        icon: FileText,
        downloadUrl: "/downloads/templates-stories-barbearia.pdf",
        resourceType: "pdf",
        requestedResource: "stories_barbearia",
        tags: ["Marketing", "Stories"],
      },
    ],
  },
  {
    heading: "Planilhas de gestão",
    description: "Modelos prontos para preço, equipe e caixa",
    items: [
      {
        id: "planilha-precificacao",
        title: "Planilha de Precificação de Serviços",
        description:
          "Calcule o preço ideal dos seus serviços considerando custos, margem e concorrência.",
        icon: FileSpreadsheet,
        downloadUrl: "/downloads/planilha-precificacao-barbearia.xlsx",
        resourceType: "spreadsheet",
        requestedResource: "planilha_precificacao",
        tags: ["Financeiro", "Preços"],
      },
      {
        id: "calendario-conteudo",
        title: "Calendário de Conteúdo para Instagram",
        description:
          "30 dias de ideias de posts para o Instagram da sua barbearia com legendas prontas.",
        icon: Calendar,
        downloadUrl: "/downloads/calendario-conteudo-instagram.xlsx",
        resourceType: "spreadsheet",
        requestedResource: "calendario_conteudo",
        tags: ["Marketing", "Instagram"],
      },
      {
        id: "checklist-abertura",
        title: "Checklist de Abertura de Barbearia",
        description:
          "Tudo que você precisa fazer antes de abrir: documentação, equipamentos e mais.",
        icon: FileText,
        downloadUrl: "/downloads/checklist-abertura-barbearia.xlsx",
        resourceType: "spreadsheet",
        requestedResource: "checklist_abertura",
        tags: ["Gestão", "Iniciantes"],
      },
      {
        id: "planilha-comissoes",
        title: "Planilha de Comissões por Barbeiro",
        description:
          "Controle comissões, calcule automaticamente e evite erros no pagamento da equipe.",
        icon: DollarSign,
        downloadUrl: "/downloads/planilha-comissoes-barbearia.xlsx",
        resourceType: "spreadsheet",
        requestedResource: "planilha_comissoes",
        tags: ["Financeiro", "Equipe"],
      },
      {
        id: "guia-fidelizacao",
        title: "Guia de Fidelização de Clientes",
        description:
          "Estratégias para transformar clientes novos em clientes fiéis que voltam sempre.",
        icon: Users,
        downloadUrl: "/downloads/guia-fidelizacao-clientes.xlsx",
        resourceType: "spreadsheet",
        requestedResource: "guia_fidelizacao",
        tags: ["Marketing", "Clientes"],
      },
    ],
  },
  {
    heading: "WhatsApp e agendamento",
    description: "Fluxos e mensagens prontas para o dia a dia",
    items: [
      {
        id: "checklist-agendamento-whatsapp",
        title: "Checklist de Agendamento no WhatsApp",
        description:
          "Checklist prático para configurar fluxo de agendamento e confirmação via WhatsApp.",
        icon: MessageCircle,
        downloadUrl: "/downloads/lead-magnets/checklist-agendamento-whatsapp.csv",
        resourceType: "spreadsheet",
        requestedResource: "checklist_agendamento_whatsapp",
        tags: ["WhatsApp", "Agendamento"],
      },
      {
        id: "script-confirmacao-whatsapp",
        title: "Scripts de Confirmação no WhatsApp",
        description:
          "Mensagens prontas para confirmar horários, remarcar e recuperar quem faltou.",
        icon: MessageCircle,
        downloadUrl: "/downloads/lead-magnets/script-confirmacao-whatsapp.csv",
        resourceType: "spreadsheet",
        requestedResource: "script_confirmacao_whatsapp",
        tags: ["WhatsApp", "Confirmação"],
      },
      {
        id: "roteiro-reativacao",
        title: "Roteiro de Reativação de Clientes",
        description:
          "Mensagens segmentadas para recuperar clientes inativos pelo WhatsApp.",
        icon: Users,
        downloadUrl: "/downloads/lead-magnets/roteiro-reativacao-clientes.csv",
        resourceType: "spreadsheet",
        requestedResource: "roteiro_reativacao",
        tags: ["WhatsApp", "Fidelização"],
      },
      {
        id: "checklist-fidelizacao-30",
        title: "Checklist de Fidelização (30 dias)",
        description: "Plano de ações para aumentar o retorno de clientes em 30 dias.",
        icon: Users,
        downloadUrl: "/downloads/lead-magnets/checklist-fidelizacao-30-dias.csv",
        resourceType: "spreadsheet",
        requestedResource: "checklist_fidelizacao_30",
        tags: ["Fidelização", "Plano"],
      },
    ],
  },
  {
    heading: "Financeiro e metas",
    description: "Caixa, ticket e faturamento sob controle",
    items: [
      {
        id: "fluxo-caixa-semanal",
        title: "Fluxo de Caixa Semanal da Barbearia",
        description: "Modelo para acompanhar entradas, saídas e saldo semanal.",
        icon: DollarSign,
        downloadUrl: "/downloads/lead-magnets/fluxo-caixa-semanal-barbearia.csv",
        resourceType: "spreadsheet",
        requestedResource: "fluxo_caixa_semanal",
        tags: ["Financeiro", "Caixa"],
      },
      {
        id: "plano-metas-faturamento",
        title: "Plano de Metas de Faturamento",
        description: "Template para desdobrar meta mensal em meta semanal e diária.",
        icon: FileSpreadsheet,
        downloadUrl: "/downloads/lead-magnets/plano-metas-faturamento.csv",
        resourceType: "spreadsheet",
        requestedResource: "plano_metas_faturamento",
        tags: ["Financeiro", "Metas"],
      },
      {
        id: "planilha-combos-ticket",
        title: "Planilha de Combos para Ticket Médio",
        description:
          "Modelo para montar combos e precificação para aumentar receita por atendimento.",
        icon: DollarSign,
        downloadUrl: "/downloads/lead-magnets/planilha-combos-ticket-medio.csv",
        resourceType: "spreadsheet",
        requestedResource: "planilha_combos_ticket",
        tags: ["Financeiro", "Ticket médio"],
      },
      {
        id: "calculadora-ticket",
        title: "Calculadora de Ticket Médio",
        description: "Planilha simples para acompanhar ticket médio e evolução semanal.",
        icon: FileSpreadsheet,
        downloadUrl: "/downloads/lead-magnets/calculadora-ticket-medio.csv",
        resourceType: "spreadsheet",
        requestedResource: "calculadora_ticket",
        tags: ["Financeiro", "Ticket médio"],
      },
    ],
  },
  {
    heading: "Marketing em vídeo",
    description: "Conteúdo curto para alcançar novos clientes",
    items: [
      {
        id: "roteiros-shorts-reels",
        title: "Roteiros de Shorts e Reels (30 dias)",
        description:
          "8 roteiros prontos com hook, estrutura e CTA para transformar guias em vídeos curtos.",
        icon: Calendar,
        downloadUrl: "/downloads/lead-magnets/roteiros-shorts-reels-30-dias.csv",
        resourceType: "spreadsheet",
        requestedResource: "roteiros_shorts_reels",
        tags: ["Marketing", "Vídeo"],
      },
    ],
  },
];

const TOTAL_MATERIALS =
  groups.reduce((total, group) => total + group.items.length, 0) + 1;

const freeTools = [
  {
    title: "Tempo no WhatsApp",
    description:
      "Estime quantas horas do mês vão para conversas sobre disponibilidade.",
    href: "/calculadora-tempo-whatsapp-barbearia",
    icon: Clock3,
  },
  {
    title: "Comissão de barbeiro",
    description:
      "Separe serviço, produto e ajuste numa memória fácil de conferir.",
    href: "/calculadora-comissao-barbeiro",
    icon: Calculator,
  },
  {
    title: "Retorno de clientes",
    description:
      "Escolha uma janela de retorno e adapte uma mensagem responsável.",
    href: "/mensagens-retorno-clientes-barbearia",
    icon: RotateCcw,
  },
] as const;

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
            description:
              "Diagnóstico prático para organizar WhatsApp, agenda e horários individuais da equipe.",
          },
          ...freeTools.map((tool) => ({
            name: tool.title,
            path: tool.href,
            description: tool.description,
          })),
          ...groups.flatMap((group) =>
            group.items.map((item) => ({
              name: item.title,
              path: item.downloadUrl,
              description: item.description,
            })),
          ),
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <section className="pt-32 pb-section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <Breadcrumb
                items={[
                  { label: "Início", href: "/" },
                  { label: "Recursos", href: "/recursos" },
                  { label: "Materiais", href: "/recursos/materiais" },
                ]}
              />
              <ResourceNav current="/recursos/materiais" />

              {/* Hero */}
              <div className="mt-10 mb-14">
                <p className="text-label font-semibold uppercase tracking-[0.14em] text-faint-ink">
                  3 ferramentas e {TOTAL_MATERIALS} materiais para usar
                </p>
                <h1 className="mt-3 text-h2 font-bold leading-tight text-ink">
                  Modelos prontos para tirar tarefas do improviso
                </h1>
                <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
                  Baixe planilhas, checklists e mensagens que você pode adaptar
                  hoje para agenda, equipe, divulgação e financeiro.
                </p>
              </div>

              <section className="mb-14" aria-labelledby="free-tools-title">
                <div className="mb-6 border-b border-line pb-3">
                  <h2 id="free-tools-title" className="text-h3 font-bold text-ink">
                    Ferramentas gratuitas
                  </h2>
                  <p className="mt-1 text-label text-muted-ink">
                    Faça a conta na tela antes de baixar qualquer material
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {freeTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex min-h-64 flex-col border border-line bg-surface p-6 outline-none transition-colors duration-200 ease-out-quint hover:border-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
                    >
                      <tool.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-ink"
                      />
                      <h3 className="mt-8 text-lg font-semibold leading-tight text-ink">
                        {tool.title}
                      </h3>
                      <p className="mt-3 text-label leading-relaxed text-muted-ink">
                        {tool.description}
                      </p>
                      <span className="mt-auto pt-6 text-label font-semibold text-ink underline-offset-4 group-hover:underline">
                        Usar agora
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <Link
                href="/recursos/diagnostico-agenda-barbearia"
                className="group mb-14 grid overflow-hidden rounded-xl border border-ink bg-cream transition-transform duration-200 ease-out-quint hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 sm:grid-cols-[1fr_0.72fr]"
              >
                <span className="p-7 sm:p-9">
                  <span className="text-caption font-semibold uppercase tracking-[0.14em] text-faint-ink">
                    Diagnóstico interativo + PDF · destaque
                  </span>
                  <span className="mt-4 block text-h3 font-bold text-ink">
                    Diagnóstico de Agenda
                  </span>
                  <span className="mt-3 block text-label leading-relaxed text-muted-ink">
                    Resultado imediato em 5 perguntas, com Raio-X de 12
                    perguntas e plano de ação opcionais em PDF.
                  </span>
                  <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-label font-semibold text-background">
                    Fazer o diagnóstico
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="relative min-h-56 border-t border-ink bg-surface p-7 sm:border-l sm:border-t-0"
                >
                  <span className="absolute left-10 top-11 h-36 w-28 rotate-[-6deg] rounded-md border border-ink bg-cream shadow-[8px_10px_0_rgba(23,24,16,0.08)]" />
                  <span className="absolute right-8 top-7 flex h-40 w-32 rotate-[4deg] flex-col rounded-md border border-ink bg-surface p-4 shadow-[8px_10px_0_rgba(23,24,16,0.08)]">
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

              {/* Grouped downloads */}
              <div className="space-y-14">
                {groups.map((group) => (
                  <div key={group.heading}>
                    <div className="mb-6 border-b border-line pb-3">
                      <h2 className="text-h3 font-bold text-ink">
                        {group.heading}
                      </h2>
                      <p className="mt-1 text-label text-muted-ink">
                        {group.description}
                      </p>
                    </div>
                    <div className="grid gap-4">
                      {group.items.map((item) => (
                        <DownloadGateModal
                          key={item.id}
                          resourceTitle={item.title}
                          resourceDescription={item.description}
                          downloadUrl={item.downloadUrl}
                          resourceType={item.resourceType}
                          requestedResource={item.requestedResource}
                        >
                          <button
                            type="button"
                            className="group flex w-full flex-col gap-5 rounded-lg border border-line bg-surface p-6 text-left transition-colors duration-200 ease-out-quint hover:border-ink/40 sm:flex-row sm:items-start"
                          >
                            <span className="w-fit rounded-lg bg-surface-2 p-3">
                              <item.icon
                                className="h-6 w-6 text-ink"
                                aria-hidden="true"
                              />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="mb-2 flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-surface-2 px-2.5 py-0.5 text-caption font-medium text-muted-ink"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </span>
                              <span className="block font-semibold text-ink">
                                {item.title}
                              </span>
                              <span className="mt-1 block text-label text-muted-ink">
                                {item.description}
                              </span>
                            </span>

                            <span className="inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-label font-medium text-ink transition-colors duration-200 ease-out-quint group-hover:bg-ink group-hover:text-background sm:self-center">
                              <Download className="h-4 w-4" aria-hidden="true" />
                              Baixar
                            </span>
                          </button>
                        </DownloadGateModal>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* More coming */}
              <p className="mt-14 text-center text-label text-muted-ink">
                Estamos criando mais templates, planilhas e guias. Tem uma
                sugestão?{" "}
                <a
                  href="mailto:contato@flowo.com.br"
                  className="font-medium text-ink underline underline-offset-4"
                >
                  Fale conosco
                </a>
              </p>

              {/* CTA */}
              <div className="on-ink mt-12 rounded-lg p-8 sm:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex-1">
                    <h2 className="text-h3 font-bold">
                      Prefere que o sistema faça isso por você?
                    </h2>
                    <p className="mt-3 text-muted-ink">
                      O Flowo automatiza agendamentos, confirmações e o controle
                      da sua barbearia direto no WhatsApp.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      size="lg"
                      className="w-full rounded-full px-7 md:w-auto"
                      asChild
                    >
                      <a href={SIGNUP_URL}>Criar minha conta</a>
                    </Button>
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
