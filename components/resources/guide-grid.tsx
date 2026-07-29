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
import { SIGNUP_URL } from "@/components/cta-links";

const guides = [
  {
    title: "Guia de Agendamento",
    description:
      "Configure serviços, horários gerais e individuais, confirmação e pagamento pós-atendimento.",
    readTime: "10 min",
    category: "Agendamento",
    href: "/recursos/guias/guia-definitivo-agendamento",
    icon: Calendar,
    topics: ["Horários individuais", "Confirmação", "Pagamento pós-serviço"],
  },
  {
    title: "Gerenciamento de Equipe",
    description:
      "Cadastre serviços, horários e folgas por profissional e entenda os limites atuais de comissões.",
    readTime: "11 min",
    category: "Equipe",
    href: "/recursos/guias/gerenciamento-equipe",
    icon: Users,
    topics: ["Agendas individuais", "Folgas", "Comissões no Empresarial"],
  },
  {
    title: "Pagamentos com PIX",
    description:
      "Ative a conta de recebimento e feche comandas com dinheiro, PIX ou cartão depois do serviço.",
    readTime: "10 min",
    category: "Pagamentos",
    href: "/recursos/guias/pagamentos-pix",
    icon: CreditCard,
    topics: ["Comanda", "PIX e cartão", "Saldo disponível"],
  },
  {
    title: "Configurando o WhatsApp com IA",
    description:
      "Prepare o número, o nome público e a ativação oficial antes de testar a IA com clientes.",
    readTime: "9 min",
    category: "WhatsApp",
    href: "/recursos/guias/configurando-whatsapp",
    icon: MessageCircle,
    topics: ["Ativação oficial", "Nome público", "Controle humano"],
  },
  {
    title: "Reduzindo Faltas na Barbearia",
    description:
      "Use confirmação, lembrete, no-show e lista de espera sem cancelar por silêncio ou cobrar sinal.",
    readTime: "9 min",
    category: "Faltas",
    href: "/recursos/guias/reduzindo-faltas",
    icon: Bell,
    topics: ["Confirmação", "No-show", "Lista de espera"],
  },
  {
    title: "Relatórios e Métricas",
    description:
      "Veja o que realmente aparece em Métricas, o que depende do plano e o que exige cálculo complementar.",
    readTime: "9 min",
    category: "Métricas",
    href: "/recursos/guias/relatorios-metricas",
    icon: BarChart3,
    topics: ["Receita concluída", "Clientes em risco", "Horários de pico"],
  },
  {
    title: "Aumentar Ticket Médio",
    description:
      "Organize combos, produtos e comandas sem prometer um fluxo automático de upsell.",
    readTime: "8 min",
    category: "Financeiro",
    href: "/recursos/guias/aumentar-ticket-medio",
    icon: CreditCard,
    topics: ["Combos", "Produtos", "Comanda"],
  },
  {
    title: "Fidelização de Clientes",
    description:
      "Use histórico, clientes em risco, campanhas e fidelidade com consentimento e limites claros.",
    readTime: "9 min",
    category: "Marketing",
    href: "/recursos/guias/fidelizacao-clientes",
    icon: MessageCircle,
    topics: ["Histórico", "Campanhas", "Fidelidade"],
  },
  {
    title: "Escala de Equipe",
    description:
      "Configure a rotina de cada profissional e saiba por que “qualquer profissional” não é um rodízio.",
    readTime: "8 min",
    category: "Equipe",
    href: "/recursos/guias/escala-equipe",
    icon: Users,
    topics: ["Horários individuais", "Folgas", "Disponibilidade"],
  },
  {
    title: "Controle Financeiro da Barbearia",
    description:
      "Controle receita operacional, saldo e pagamentos sem confundir o Flowo com contabilidade completa.",
    readTime: "9 min",
    category: "Financeiro",
    href: "/recursos/guias/controle-financeiro-barbearia",
    icon: BarChart3,
    topics: ["Comandas", "Saldo", "Limites contábeis"],
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
              <Button size="lg" className="rounded-full px-7" asChild>
                <a href={SIGNUP_URL}>Criar minha conta</a>
              </Button>
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
