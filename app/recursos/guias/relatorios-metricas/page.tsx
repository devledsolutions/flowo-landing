import { BarChart3, Clock, Target, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideAvailability,
  GuideCallout,
  GuideCards,
  GuideChecklist,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideProductPath,
  GuideScopeNote,
  GuideSection,
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Relatórios e Métricas para Barbearias",
  description:
    "Entenda os indicadores reais da área Métricas do Flowo, os bloqueios por plano e o que ainda precisa ser calculado fora do painel.",
  path: "/recursos/guias/relatorios-metricas",
});

const tableOfContents = [
  { id: "painel", label: "O que aparece em Métricas" },
  { id: "receita", label: "Como o Flowo calcula receita" },
  { id: "planos", label: "Indicadores por plano" },
  { id: "ocupacao", label: "Ocupação: cálculo complementar" },
  { id: "rotina", label: "Rotina semanal de decisão" },
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
            readTime="9 min"
            title="Relatórios e métricas para barbearias"
            lead="Use os números que o Flowo realmente calcula e saiba onde o painel termina. Assim, uma recomendação de gestão não vira uma promessa de funcionalidade."
          />

          <GuideAvailability
            items={[
              {
                label: "Área principal",
                value: "Métricas no painel web",
                description:
                  "A página compara períodos e consulta dados reais da agenda, clientes e atendimentos concluídos.",
              },
              {
                label: "Planos superiores",
                value: "Detalhes avançados",
                description:
                  "Clientes em risco, receita por serviço, horários de pico e outros blocos variam conforme o plano.",
              },
              {
                label: "Empresarial",
                value: "Clientes VIP",
                description:
                  "A lista de melhores clientes por visitas e receita é reservada ao plano Empresarial.",
              },
              {
                label: "Limite atual",
                value: "Sem taxa de ocupação pronta",
                description:
                  "O painel não deve ser vendido como uma tabela completa de ocupação e desempenho individual por profissional.",
              },
            ]}
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="painel"
              icon={BarChart3}
              title="O que aparece em Métricas"
            >
              <p>
                A página reúne indicadores do período atual e comparação com o
                período anterior. Os blocos liberados dependem das permissões do
                usuário e do plano da barbearia.
              </p>
              <GuideCards
                items={[
                  {
                    title: "Receita e agendamentos",
                    description:
                      "Receita de atendimentos concluídos, quantidade de agendamentos e evolução no período.",
                  },
                  {
                    title: "Conclusão e faltas",
                    description:
                      "Taxas derivadas dos estados da agenda, quando o plano libera o detalhamento.",
                  },
                  {
                    title: "Clientes em risco",
                    description:
                      "Clientes com histórico e tempo sem retorno; planos inferiores podem ver apenas o total.",
                  },
                  {
                    title: "Receita por serviço",
                    description:
                      "Distribuição e tendência dos serviços concluídos no período.",
                  },
                  {
                    title: "Horários de pico",
                    description:
                      "Dia e hora de maior movimento, com sugestão adicional nos planos superiores.",
                  },
                  {
                    title: "Clientes VIP",
                    description:
                      "Ranking por visitas e receita no plano Empresarial.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Métricas",
                    action:
                      "escolha o período e consulte os blocos liberados para o seu plano.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → Financeiro / operação",
                    action:
                      "acompanhe os indicadores móveis disponíveis; o relatório completo permanece no painel web.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="receita"
              icon={TrendingUp}
              title="Como o Flowo calcula receita"
            >
              <p>
                A receita do relatório considera atendimentos concluídos. Ela
                representa o serviço realizado e não uma previsão baseada em
                horários apenas reservados.
              </p>
              <GuideScopeNote title="Pagamento é pós-serviço">
                O Flowo não usa sinal ou depósito. Valores previstos e valores
                concluídos não devem ser misturados ao interpretar o caixa.
              </GuideScopeNote>
              <GuideCallout title="Mantenha o status da agenda correto">
                Se um atendimento concluído continuar como agendado, ou uma falta
                não for registrada como no-show, as taxas e tendências perdem
                qualidade. O relatório depende da operação bem fechada.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="planos"
              icon={Users}
              title="Indicadores por plano"
            >
              <p>
                O bloqueio por plano é parte da experiência. Um cartão bloqueado
                não significa ausência de dados; significa que aquele
                detalhamento não está incluído na assinatura atual.
              </p>
              <div className="my-8 overflow-x-auto rounded-lg border border-line">
                <table className="w-full min-w-[36rem] text-label">
                  <thead className="border-b border-line bg-surface-2">
                    <tr>
                      <th className="p-4 text-left font-semibold text-ink">
                        Indicador
                      </th>
                      <th className="p-4 text-left font-semibold text-ink">
                        Disponibilidade
                      </th>
                      <th className="p-4 text-left font-semibold text-ink">
                        Uso prático
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-surface">
                    {[
                      [
                        "KPIs de agenda e receita",
                        "Base",
                        "Acompanhar evolução do período",
                      ],
                      [
                        "Clientes em risco",
                        "Detalhe nos planos superiores",
                        "Priorizar reativação",
                      ],
                      [
                        "Receita por serviço",
                        "Detalhe nos planos superiores",
                        "Rever catálogo e oferta",
                      ],
                      [
                        "Horários de pico",
                        "Base + sugestões nos superiores",
                        "Ajustar escala e disponibilidade",
                      ],
                      [
                        "Clientes VIP",
                        "Empresarial",
                        "Reconhecer os melhores relacionamentos",
                      ],
                    ].map(([metric, availability, use]) => (
                      <tr key={metric}>
                        <td className="p-4 font-medium text-ink">{metric}</td>
                        <td className="p-4 text-muted-ink">{availability}</td>
                        <td className="p-4 text-muted-ink">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <GuideScopeNote
                status="conditional"
                title="Permissão também interfere"
              >
                Proprietário, administrador e gerente podem acessar a análise
                conforme suas permissões. O perfil de profissional não recebe o
                relatório completo.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="ocupacao"
              icon={Target}
              title="Ocupação: cálculo complementar"
            >
              <p>
                A página atual não apresenta uma taxa de ocupação completa por
                profissional. Se essa métrica for importante para sua rotina,
                calcule-a com a capacidade planejada e deixe claro que é uma
                análise complementar.
              </p>
              <GuideCallout>
                <strong>
                  Ocupação = tempo reservado ÷ tempo disponível para atendimento
                </strong>
                . Use duração dos serviços, horário individual e folgas; contar
                apenas “quantidade de horários” pode distorcer serviços de
                durações diferentes.
              </GuideCallout>
              <GuideScopeNote
                status="practice"
                title="Não use faixas universais como regra"
              >
                “75% é excelente” ou “abaixo de 50% é ruim” depende de margem,
                duração, demanda, horário e estratégia. Compare cada barbearia
                com a própria linha de base.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="rotina"
              icon={Clock}
              title="Rotina semanal de decisão"
            >
              <GuideChecklist
                items={[
                  "Feche comandas e atualize status antes de abrir o relatório",
                  "Compare o mesmo intervalo com o período anterior",
                  "Escolha um problema: faltas, serviço em queda ou clientes em risco",
                  "Faça uma mudança pequena e registre a data",
                  "Revise o resultado na semana seguinte antes de trocar outra variável",
                ]}
              />
              <GuideCallout title="O relatório orienta; não decide sozinho">
                Horário de pico pode sugerir reforço, mas contratação e preço
                dependem de custo, margem e contexto. O Flowo mostra o sinal;
                a decisão continua com a gestão.
              </GuideCallout>
            </GuideSection>
          </article>

          <GuideCta
            title="Quer decidir com dados operacionais reais?"
            description="Feche a agenda corretamente e use Métricas para comparar períodos sem confundir recomendação com automação."
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
