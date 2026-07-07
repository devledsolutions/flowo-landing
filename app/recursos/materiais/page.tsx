import {
  Calendar,
  DollarSign,
  Download,
  FileSpreadsheet,
  FileText,
  Instagram,
  MessageCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { DownloadGateModal } from "@/components/download-gate-modal";
import { LeadCaptureModal } from "@/components/lead-capture-modal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Materiais Gratuitos para Barbearias",
  description:
    "Planilhas, checklists e guias em PDF gratuitos para organizar a agenda, o financeiro e o marketing da sua barbearia.",
  path: "/recursos/materiais",
});

interface Downloadable {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  downloadUrl: string;
  resourceType: "pdf" | "spreadsheet";
  tags: string[];
}

const groups: { heading: string; description: string; items: Downloadable[] }[] = [
  {
    heading: "Guias em PDF",
    description: "Leitura de referência para imprimir ou guardar",
    items: [
      {
        id: "guia-completo",
        title: "Guia Completo para Barbearias",
        description:
          "Checklist de abertura, precificação, fidelização e como automatizar sua barbearia.",
        icon: FileText,
        downloadUrl: "/downloads/guia-completo-barbearia.pdf",
        resourceType: "pdf",
        tags: ["Guia", "Completo"],
      },
      {
        id: "templates-stories",
        title: "Templates de Stories para Instagram",
        description:
          "10 ideias de Stories prontas para usar na sua barbearia, com CTAs que convertem.",
        icon: Instagram,
        downloadUrl: "/downloads/templates-stories-barbearia.pdf",
        resourceType: "pdf",
        tags: ["Marketing", "Instagram"],
      },
      {
        id: "referencia-rapida",
        title: "Cartão de Referência Rápida",
        description:
          "Métricas essenciais, checklist diário e metas para ter sempre à mão.",
        icon: FileText,
        downloadUrl: "/downloads/referencia-rapida-barbearia.pdf",
        resourceType: "pdf",
        tags: ["Gestão", "Métricas"],
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
        tags: ["WhatsApp", "Agendamento"],
      },
      {
        id: "script-confirmacao-whatsapp",
        title: "Scripts de Confirmação no WhatsApp",
        description:
          "Mensagens prontas para confirmar horários, remarcar e recuperar no-show.",
        icon: MessageCircle,
        downloadUrl: "/downloads/lead-magnets/script-confirmacao-whatsapp.csv",
        resourceType: "spreadsheet",
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
        tags: ["WhatsApp", "Fidelização"],
      },
      {
        id: "checklist-fidelizacao-30",
        title: "Checklist de Fidelização (30 dias)",
        description: "Plano de ações para aumentar o retorno de clientes em 30 dias.",
        icon: Users,
        downloadUrl: "/downloads/lead-magnets/checklist-fidelizacao-30-dias.csv",
        resourceType: "spreadsheet",
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
        tags: ["Financeiro", "Caixa"],
      },
      {
        id: "plano-metas-faturamento",
        title: "Plano de Metas de Faturamento",
        description: "Template para desdobrar meta mensal em meta semanal e diária.",
        icon: FileSpreadsheet,
        downloadUrl: "/downloads/lead-magnets/plano-metas-faturamento.csv",
        resourceType: "spreadsheet",
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
        tags: ["Financeiro", "Ticket médio"],
      },
      {
        id: "calculadora-ticket",
        title: "Calculadora de Ticket Médio",
        description: "Planilha simples para acompanhar ticket médio e evolução semanal.",
        icon: FileSpreadsheet,
        downloadUrl: "/downloads/lead-magnets/calculadora-ticket-medio.csv",
        resourceType: "spreadsheet",
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
        tags: ["Marketing", "Vídeo"],
      },
    ],
  },
];

export default function MaterialsPage() {
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
                  { label: "Materiais", href: "/recursos/materiais" },
                ]}
              />

              {/* Hero */}
              <div className="mt-10 mb-14">
                <h1 className="text-h2 font-bold leading-tight text-ink">
                  Materiais para sua barbearia
                </h1>
                <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
                  Planilhas, checklists e guias gratuitos para organizar seu
                  negócio, atrair mais clientes e acompanhar o faturamento.
                </p>
              </div>

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
                  className="font-medium text-ink underline-offset-4 hover:underline"
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
                    <LeadCaptureModal>
                      <Button size="lg" className="w-full rounded-full px-7 md:w-auto">
                        Começar agora
                      </Button>
                    </LeadCaptureModal>
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
