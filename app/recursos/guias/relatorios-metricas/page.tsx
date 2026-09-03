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
  GuideContent,
} from "@/components/resources/guide-shell";
import { GuideStructuredData } from "@/components/resources/resource-structured-data";
import { GuideHonesty, GuideScreenshot } from "@/app/recursos/_components/guide-media";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/relatorios-metricas");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "painel", label: "O que aparece em Métricas" },
  { id: "receita", label: "Como a Flowo conta a receita" },
  { id: "planos", label: "O que cada plano mostra" },
  { id: "ocupacao", label: "Ocupação: conta por fora" },
  { id: "rotina", label: "Rotina semanal de decisão" },
];

const planRows = [
  ["Agenda e receita", "Todos os planos", "Ver a evolução do período"],
  ["Clientes sumidos", "Lista no Equipe e no Empresarial", "Escolher quem chamar de volta"],
  ["Receita por serviço", "Equipe e Empresarial", "Rever catálogo e oferta"],
  ["Horários de pico", "Todos; sugestões no Equipe e no Empresarial", "Ajustar escala"],
  ["Atendimentos por barbeiro", "Equipe e Empresarial", "Ver a carga de cada um"],
  ["Clientes VIP", "Empresarial", "Reconhecer quem mais volta"],
] as const;

export default function ReportsMetricsGuidePage() {
  return (
    <>
      <GuideStructuredData guide={guide} />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <GuidePage>
          <GuideHeader
            crumbs={[
              { label: "Início", href: "/" },
              { label: "Recursos", href: "/recursos" },
              { label: "Guias", href: "/recursos/guias" },
              { label: "Relatórios e Métricas", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Relatórios e métricas para barbearias"
            lead="Use os números que a Flowo calcula de verdade e saiba onde o painel termina. Dica de gestão não é função do app."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Onde",
                value: "Métricas, no painel",
                description: "Compara períodos com dados da agenda, dos clientes e dos atendimentos concluídos.",
              },
              {
                label: "Equipe e Empresarial",
                value: "Mais detalhe",
                description: "Clientes sumidos, receita por serviço, horários de pico e atendimentos por barbeiro.",
              },
              {
                label: "Empresarial",
                value: "Clientes VIP",
                description: "A lista dos melhores clientes por visitas e receita.",
              },
              {
                label: "Limite de hoje",
                value: "Sem taxa de ocupação pronta",
                description: "O painel não calcula ocupação por barbeiro. A conta está mais abaixo.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="painel" icon={BarChart3} title="O que aparece em Métricas">
              <p>
                A página mostra o período atual e compara com o anterior. O que aparece depende do
                seu plano e da sua permissão.
              </p>
              <GuideCards
                items={[
                  {
                    title: "Receita e agendamentos",
                    description: "Receita dos atendimentos concluídos, número de horários e evolução.",
                  },
                  {
                    title: "Conclusão e faltas",
                    description: "Taxas tiradas dos status da agenda, quando o plano mostra o detalhe.",
                  },
                  {
                    title: "Clientes sumidos",
                    description: "Quem tem histórico e está sem voltar. O Solo vê só o total.",
                  },
                  {
                    title: "Receita por serviço",
                    description: "Quanto cada serviço rendeu no período.",
                  },
                  {
                    title: "Horários de pico",
                    description: "Dia e hora de mais movimento, com sugestão nos planos de equipe.",
                  },
                  {
                    title: "Clientes VIP",
                    description: "Ranking por visitas e receita, no Empresarial.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Métricas",
                    action: "escolha o período e veja os blocos do seu plano.",
                  },
                  {
                    surface: "App",
                    path: "Mais → Métricas",
                    action: "os principais números no celular. O relatório completo fica no painel.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="receita" icon={TrendingUp} title="Como a Flowo conta a receita">
              <p>
                A receita do relatório é dos atendimentos concluídos. É o que aconteceu, não uma
                previsão feita a partir de horários só reservados.
              </p>
              <GuideScreenshot
                src="/images/product/dashboard-financeiro.png"
                alt="Tela Financeiro da Flowo: recebido no dia, valor em aberto, repasse da equipe e ticket médio de 30 dias"
                caption="Tela Financeiro, com dados ilustrativos: recebido, em aberto, repasse e ticket médio. O relatório por período fica em Métricas."
                height={1082}
              />
              <GuideScopeNote title="Pagamento é depois do serviço">
                A Flowo não usa sinal nem depósito. Não misture valor previsto com valor
                concluído ao olhar o caixa.
              </GuideScopeNote>
              <GuideCallout title="Mantenha o status da agenda certo">
                Atendimento feito que ficou como “agendado”, ou falta que não virou “não veio”,
                estraga as taxas. O relatório depende da agenda bem fechada.
              </GuideCallout>
            </GuideSection>

            <GuideSection id="planos" icon={Users} title="O que cada plano mostra">
              <p>
                Um cartão bloqueado não quer dizer que o dado não existe. Quer dizer que aquele
                detalhe não está no seu plano.
              </p>
              <div className="my-8 overflow-x-auto rounded-lg border border-line">
                <table className="w-full min-w-[36rem] text-label">
                  <thead className="border-b border-line bg-surface-2">
                    <tr>
                      <th className="p-4 text-left font-semibold text-ink">Indicador</th>
                      <th className="p-4 text-left font-semibold text-ink">Em que plano</th>
                      <th className="p-4 text-left font-semibold text-ink">Para quê</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-surface">
                    {planRows.map(([metric, availability, use]) => (
                      <tr key={metric}>
                        <td className="p-4 font-medium text-ink">{metric}</td>
                        <td className="p-4 text-muted-ink">{availability}</td>
                        <td className="p-4 text-muted-ink">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <GuideScopeNote status="conditional" title="Permissão também conta">
                Dono, administrador e gerente veem o relatório conforme a permissão. O perfil de
                barbeiro não recebe o relatório completo.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="ocupacao" icon={Target} title="Ocupação: conta por fora">
              <p>
                O painel não mostra taxa de ocupação por barbeiro. Se esse número importa para
                você, calcule com a capacidade planejada e trate como conta complementar.
              </p>
              <GuideCallout>
                <strong>Ocupação = tempo reservado ÷ tempo disponível para atender</strong>. Use a
                duração dos serviços, o horário de cada barbeiro e as folgas. Contar só “quantos
                horários” distorce serviços de durações diferentes.
              </GuideCallout>
              <GuideScopeNote status="practice" title="Não use faixa universal como regra">
                O que é “boa ocupação” depende de margem, duração, procura e estratégia. Compare a
                sua barbearia com o seu próprio ponto de partida.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="rotina" icon={Clock} title="Rotina semanal de decisão">
              <GuideChecklist
                items={[
                  "Feche comandas e acerte os status antes de abrir o relatório",
                  "Compare o mesmo intervalo com o período anterior",
                  "Escolha um problema: faltas, serviço em queda ou clientes sumidos",
                  "Faça uma mudança pequena e anote a data",
                  "Veja o resultado na semana seguinte antes de mexer em outra coisa",
                ]}
              />
              <GuideCallout title="O relatório aponta. Quem decide é você">
                Horário de pico pode sugerir reforço, mas contratar e mudar preço dependem de
                custo, margem e contexto.
              </GuideCallout>
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "Quais indicadores existem em Métricas e em que plano aparecem: conferidos no produto em 3 de setembro de 2026.",
            ]}
            notMeasured={[
              "Se barbearias que olham Métricas toda semana decidem melhor. Não temos esse dado.",
            ]}
          />

          <GuideCta
            title="Quer decidir com os números da sua operação?"
            description="Feche a agenda direito e use Métricas para comparar períodos."
          />

          <GuidePrevNext
            currentPath={guide.path}
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
