import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  Clock,
  CreditCard,
  MessageCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "@/components/lead-capture-modal";

const guides = [
  {
    title: "Guia Definitivo de Agendamento",
    description:
      "Configure horários, lembretes e confirmação automática pelo WhatsApp. O guia completo para organizar sua agenda.",
    readTime: "10 min",
    category: "Agendamento",
    href: "/recursos/guias/guia-definitivo-agendamento",
    icon: Calendar,
    topics: ["Lembretes automáticos", "Confirmação no WhatsApp", "Liberação de horários"],
  },
  {
    title: "Gerenciamento de Equipe",
    description:
      "Organize a agenda de cada barbeiro, acompanhe desempenho e distribua clientes de forma inteligente.",
    readTime: "15 min",
    category: "Equipe",
    href: "/recursos/guias/gerenciamento-equipe",
    icon: Users,
    topics: ["Agendas individuais", "Métricas de desempenho", "Comissões"],
  },
  {
    title: "Pagamentos com PIX",
    description:
      "Receba o pagamento do atendimento por PIX ou cartão direto pelo WhatsApp, sem maquininha na frente do espelho.",
    readTime: "12 min",
    category: "Pagamentos",
    href: "/recursos/guias/pagamentos-pix",
    icon: CreditCard,
    topics: ["PIX no atendimento", "Cartão", "Conta digital"],
  },
  {
    title: "Configurando WhatsApp com IA",
    description:
      "Transforme seu WhatsApp em um assistente que responde clientes e agenda a qualquer hora do dia.",
    readTime: "8 min",
    category: "WhatsApp",
    href: "/recursos/guias/configurando-whatsapp",
    icon: MessageCircle,
    topics: ["IA no WhatsApp", "Respostas automáticas", "Agendamento sem telefone"],
  },
  {
    title: "Reduzindo Faltas na Barbearia",
    description:
      "Como usar lembretes e confirmação automática pelo WhatsApp para proteger sua agenda dos no-shows.",
    readTime: "10 min",
    category: "No-shows",
    href: "/recursos/guias/reduzindo-faltas",
    icon: Bell,
    topics: ["Lembretes 24h/2h", "Confirmação automática", "Política de cancelamento"],
  },
  {
    title: "Relatórios e Métricas",
    description:
      "Entenda as métricas essenciais para acompanhar o desempenho da sua barbearia e crescer.",
    readTime: "10 min",
    category: "Métricas",
    href: "/recursos/guias/relatorios-metricas",
    icon: BarChart3,
    topics: ["Taxa de ocupação", "Desempenho por barbeiro", "Horários de pico"],
  },
  {
    title: "Aumentar Ticket Médio",
    description:
      "Estratégias para vender mais por atendimento com combos, upgrades e oferta contextual.",
    readTime: "9 min",
    category: "Financeiro",
    href: "/recursos/guias/aumentar-ticket-medio",
    icon: CreditCard,
    topics: ["Combos", "Upsell inteligente", "Preço por valor"],
  },
  {
    title: "Fidelização de Clientes",
    description:
      "Aumente a frequência de retorno com reativação e relacionamento contínuo no WhatsApp.",
    readTime: "10 min",
    category: "Marketing",
    href: "/recursos/guias/fidelizacao-clientes",
    icon: MessageCircle,
    topics: ["Reativação", "Recorrência", "Pós-atendimento"],
  },
  {
    title: "Escala de Equipe",
    description:
      "Organize turnos e distribua a agenda entre os barbeiros com previsibilidade, sem conflito de horários.",
    readTime: "11 min",
    category: "Equipe",
    href: "/recursos/guias/escala-equipe",
    icon: Users,
    topics: ["Blocos por barbeiro", "Capacidade semanal", "Revisão de escala"],
  },
  {
    title: "Controle Financeiro da Barbearia",
    description:
      "Aprenda a acompanhar caixa, margem e indicadores essenciais para tomar decisões melhores.",
    readTime: "12 min",
    category: "Financeiro",
    href: "/recursos/guias/controle-financeiro-barbearia",
    icon: BarChart3,
    topics: ["Fluxo de caixa", "Margem", "Metas semanais"],
  },
];

export function GuideGrid() {
  return (
    <section className="pb-section-tight pt-10">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <ul className="space-y-4">
            {guides.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="group block rounded-lg border border-line bg-surface p-6 transition-colors duration-200 ease-out-quint hover:border-ink/40 sm:p-7"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="w-fit rounded-lg bg-surface-2 p-3">
                      <guide.icon className="h-6 w-6 text-ink" aria-hidden="true" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-line px-2.5 py-0.5 text-caption font-medium text-muted-ink">
                          {guide.category}
                        </span>
                        <span className="flex items-center gap-1 text-caption text-faint-ink">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {guide.readTime} de leitura
                        </span>
                      </div>

                      <h3 className="text-h3 font-semibold text-ink">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-muted-ink">{guide.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {guide.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full bg-surface-2 px-2.5 py-1 text-caption text-muted-ink"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hidden items-center self-center sm:flex">
                      <ArrowRight
                        className="h-5 w-5 text-faint-ink transition-transform duration-200 ease-out-quint group-hover:translate-x-1 group-hover:text-ink"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="on-ink mt-16 rounded-lg p-8 text-center sm:p-10">
            <h2 className="text-h3 font-bold">Quer ver o Flowo na prática?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-ink">
              Configure sua barbearia em poucos minutos e aplique o que você leu
              nos guias.
            </p>
            <div className="mt-6">
              <LeadCaptureModal>
                <Button size="lg" className="rounded-full px-7">
                  Começar agora
                </Button>
              </LeadCaptureModal>
            </div>
          </div>

          <p className="mt-12 text-center text-label text-muted-ink">
            Mais guias em breve. Tem uma dúvida específica?{" "}
            <a
              href="mailto:contato@flowo.com.br"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              Fale conosco
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
