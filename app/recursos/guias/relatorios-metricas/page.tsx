import {
  BarChart3,
  Clock,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideCallout,
  GuideCards,
  GuideChecklist,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideSection,
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Relatórios e Métricas para Barbearias",
  description:
    "As métricas essenciais para acompanhar o desempenho da sua barbearia: ocupação, ticket médio, no-show e desempenho por barbeiro.",
  path: "/recursos/guias/relatorios-metricas",
});

const tableOfContents = [
  { id: "metricas-essenciais", label: "Métricas essenciais" },
  { id: "taxa-ocupacao", label: "Taxa de ocupação" },
  { id: "desempenho-profissional", label: "Desempenho por profissional" },
  { id: "horarios-pico", label: "Horários de pico" },
  { id: "usando-dados", label: "Usando dados para crescer" },
];

const occupancyBands = [
  { range: "Abaixo de 50%", label: "Precisa de mais clientes", width: "40%" },
  { range: "50% a 75%", label: "Bom, mas tem espaço", width: "65%" },
  { range: "Acima de 75%", label: "Excelente demanda", width: "90%" },
];

const peakPattern = [
  { period: "Segunda a quarta", label: "Menor movimento", width: "40%" },
  { period: "Quinta e sexta", label: "Movimento médio", width: "70%" },
  { period: "Sábado", label: "Pico máximo", width: "95%" },
];

export default function MetricsGuidePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <GuidePage>
          <GuideHeader
            crumbs={[
              { label: "Início", href: "/" },
              { label: "Recursos", href: "/recursos" },
              { label: "Guias", href: "/recursos/guias" },
              { label: "Relatórios e Métricas", href: "#" },
            ]}
            readTime="10 min"
            title="Relatórios e métricas para barbearias"
            lead="Entenda quais números realmente importam e como usá-los para tomar decisões melhores no seu negócio."
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="metricas-essenciais"
              icon={BarChart3}
              title="Métricas essenciais para acompanhar"
            >
              <p>
                Não precisa acompanhar dezenas de números. Com 5 métricas você
                já entende a saúde do seu negócio:
              </p>
              <GuideCards
                items={[
                  {
                    title: "Agendamentos do dia, semana e mês",
                    description:
                      "Quantos clientes você atendeu? Está crescendo ou estagnado?",
                  },
                  {
                    title: "Faturamento",
                    description:
                      "Quanto entrou? Qual o ticket médio por cliente?",
                  },
                  {
                    title: "Taxa de ocupação",
                    description:
                      "Quantos horários disponíveis foram ocupados?",
                  },
                  {
                    title: "Clientes atendidos",
                    description:
                      "Novos vs recorrentes. Sua base está crescendo?",
                  },
                  {
                    title: "Taxa de no-show (faltas)",
                    description:
                      "Quantos não apareceram? Está melhorando?",
                  },
                ]}
              />
              <GuideCallout>
                O painel do Flowo mostra tudo isso em tempo real. Você
                acompanha os números do dia, compara com períodos anteriores e
                vê tendências sem precisar fazer contas.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="taxa-ocupacao"
              icon={Target}
              title="Taxa de ocupação"
            >
              <p>
                A taxa de ocupação mostra quanto da sua capacidade você está
                usando:
              </p>
              <GuideCallout>
                <strong>
                  Taxa de ocupação = (horários ocupados ÷ horários disponíveis)
                  × 100
                </strong>
              </GuideCallout>
              <div className="my-8 space-y-4 rounded-lg border border-line bg-surface p-6">
                {occupancyBands.map((band) => (
                  <div key={band.range}>
                    <div className="mb-1 flex items-baseline justify-between gap-4">
                      <span className="text-label font-semibold text-ink">
                        {band.range}
                      </span>
                      <span className="text-caption text-muted-ink">
                        {band.label}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-ink"
                        style={{ width: band.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p>
                Se sua taxa está abaixo de 50%, invista em marketing, promoções
                ou ajuste seus horários de funcionamento. Se está acima de 90%,
                pode ser hora de contratar mais um profissional.
              </p>
            </GuideSection>

            <GuideSection
              id="desempenho-profissional"
              icon={Users}
              title="Desempenho por profissional"
            >
              <p>
                Se você tem mais de um barbeiro, acompanhe o desempenho
                individual:
              </p>
              <div className="my-8 overflow-x-auto rounded-lg border border-line">
                <table className="w-full min-w-[28rem] text-label">
                  <thead className="border-b border-line bg-surface-2">
                    <tr>
                      <th className="p-4 text-left font-semibold text-ink">
                        Métrica
                      </th>
                      <th className="p-4 text-left font-semibold text-ink">
                        O que mostra
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-surface">
                    {[
                      ["Atendimentos", "Quantos clientes cada um atendeu"],
                      ["Faturamento", "Quanto cada profissional gerou"],
                      ["Ticket médio", "Valor médio por atendimento"],
                      ["Taxa de ocupação", "% dos horários que foram preenchidos"],
                      ["Clientes novos", "Quantos primeiros atendimentos fez"],
                    ].map(([metric, meaning]) => (
                      <tr key={metric}>
                        <td className="p-4 font-medium text-ink">{metric}</td>
                        <td className="p-4 text-muted-ink">{meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Isso ajuda a entender quem precisa de mais treinamento, quem
                está trazendo mais resultado e como distribuir comissões de
                forma justa.
              </p>
            </GuideSection>

            <GuideSection
              id="horarios-pico"
              icon={Clock}
              title="Horários de pico"
            >
              <p>
                Saber quando sua barbearia tem mais demanda ajuda a otimizar
                escalas e preços. Um padrão comum em barbearias:
              </p>
              <div className="my-8 space-y-4 rounded-lg border border-line bg-surface p-6">
                {peakPattern.map((row) => (
                  <div key={row.period}>
                    <div className="mb-1 flex items-baseline justify-between gap-4">
                      <span className="text-label font-semibold text-ink">
                        {row.period}
                      </span>
                      <span className="text-caption text-muted-ink">
                        {row.label}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-ink"
                        style={{ width: row.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <GuideChecklist
                items={[
                  "Escale mais profissionais nos dias de pico",
                  "Considere preços diferenciados para horários nobres",
                  "Ofereça condições especiais para dias de baixo movimento",
                  "Aperte a confirmação automática nos horários mais disputados",
                ]}
              />
            </GuideSection>

            <GuideSection
              id="usando-dados"
              icon={TrendingUp}
              title="Usando dados para crescer"
            >
              <p>
                Ter os dados é só o começo. O importante é usá-los para tomar
                decisões:
              </p>
              <GuideCards
                items={[
                  {
                    title: "Ocupação baixa nas segundas",
                    description:
                      'Crie uma promoção "Segunda do Corte" para preencher a agenda.',
                  },
                  {
                    title: "Um barbeiro com ticket médio menor",
                    description:
                      "Treine a oferta de serviços adicionais no atendimento.",
                  },
                  {
                    title: "Muitos clientes novos, poucos recorrentes",
                    description:
                      "Foque em fidelização: pós-atendimento e reativação pelo WhatsApp.",
                  },
                  {
                    title: "No-show alto com certos clientes",
                    description:
                      "Peça confirmação com mais antecedência e libere o horário mais cedo para esses casos.",
                  },
                  {
                    title: "Sábados sempre lotados",
                    description:
                      "Considere abrir mais cedo ou trazer um reforço para o fim de semana.",
                  },
                ]}
              />
              <GuideCallout title="Dica final">
                Não precisa olhar os relatórios todo dia. Reserve 15 minutos
                por semana para analisar os números e identificar
                oportunidades. Com consistência, os resultados aparecem.
              </GuideCallout>
            </GuideSection>
          </article>

          <GuideCta
            title="Acompanhe suas métricas no Flowo"
            description="Painel completo com os números da sua barbearia em tempo real, sem planilha manual."
          />

          <GuidePrevNext
            prev={{
              href: "/recursos/guias/reduzindo-faltas",
              label: "Reduzindo Faltas",
            }}
            next={{ href: "/recursos/guias", label: "Ver todos os guias" }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
