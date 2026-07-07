import {
  BarChart3,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideCallout,
  GuideCards,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideSection,
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gerenciamento de Equipe para Barbearias",
  description:
    "Organize a agenda de cada barbeiro, acompanhe desempenho individual e calcule comissões automaticamente com o Flowo.",
  path: "/recursos/guias/gerenciamento-equipe",
});

const tableOfContents = [
  { id: "por-que-organizar", label: "Por que organizar a equipe importa" },
  { id: "cadastrando-barbeiros", label: "Cadastrando barbeiros" },
  { id: "cliente-escolhe", label: "Cliente escolhe o barbeiro" },
  { id: "acompanhando-desempenho", label: "Acompanhando desempenho" },
  { id: "comissoes-pagamentos", label: "Comissões e pagamentos" },
];

export default function TeamManagementGuidePage() {
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
              { label: "Equipe", href: "#" },
            ]}
            readTime="15 min"
            title="Gerenciamento de equipe para barbearias"
            lead="Organize a agenda de cada barbeiro e acompanhe o desempenho da equipe. Dados que ajudam você a tomar decisões."
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="por-que-organizar"
              icon={Users}
              title="Por que organizar a equipe importa"
            >
              <p>
                Quando cada barbeiro tem sua própria agenda no sistema, os
                clientes podem escolher com quem querem cortar. Isso aumenta a
                fidelização e facilita sua vida.
              </p>
              <GuideCallout>
                Sem um sistema, você fica no telefone o dia todo coordenando
                horários. Com o Flowo, o cliente agenda direto pelo WhatsApp e
                escolhe o barbeiro preferido.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="cadastrando-barbeiros"
              icon={UserCheck}
              title="Cadastrando barbeiros"
            >
              <p>Para cada barbeiro da equipe, você configura:</p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Horários de trabalho",
                    description: "Cada barbeiro pode ter horários diferentes.",
                  },
                  {
                    title: "Dias de folga",
                    description: "O sistema bloqueia automaticamente.",
                  },
                  {
                    title: "Serviços",
                    description: "Quais serviços cada barbeiro realiza.",
                  },
                  {
                    title: "Tempo por serviço",
                    description:
                      "Alguns são mais rápidos, outros mais detalhistas.",
                  },
                ]}
              />
              <p>
                Essas configurações garantem que a agenda de cada barbeiro
                reflita a realidade do trabalho dele.
              </p>
            </GuideSection>

            <GuideSection
              id="cliente-escolhe"
              icon={UserCheck}
              title="Cliente escolhe o barbeiro"
            >
              <p>
                Quando o cliente manda mensagem no WhatsApp, a IA do Flowo
                pergunta com qual barbeiro ele quer agendar. Se não tiver
                preferência, mostra os horários disponíveis de todos.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Clientes fiéis",
                    description:
                      "Sempre agendam com o barbeiro de preferência.",
                  },
                  {
                    title: "Novos clientes",
                    description:
                      "São distribuídos entre a equipe conforme disponibilidade.",
                  },
                ]}
              />
              <p>
                O Flowo lembra das preferências do cliente. Na próxima vez, já
                sugere o mesmo barbeiro automaticamente.
              </p>
            </GuideSection>

            <GuideSection
              id="acompanhando-desempenho"
              icon={BarChart3}
              title="Acompanhando desempenho"
            >
              <p>No painel do Flowo, você vê métricas de cada barbeiro:</p>
              <GuideCards
                items={[
                  {
                    title: "Atendimentos no mês",
                    description: "Quantos clientes cada barbeiro atendeu.",
                  },
                  {
                    title: "Faturamento por barbeiro",
                    description: "Quanto cada um gerou de receita.",
                  },
                  {
                    title: "Taxa de confirmação",
                    description: "Quem tem mais faltas de clientes.",
                  },
                  {
                    title: "Serviços mais realizados",
                    description:
                      "O que cada barbeiro mais faz (corte, barba, etc).",
                  },
                ]}
              />
              <GuideCallout title="Decisões baseadas em dados">
                Com essas métricas, você identifica quem precisa de mais
                clientes e quem está sobrecarregado. Ajuste a distribuição
                conforme necessário.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="comissoes-pagamentos"
              icon={Wallet}
              title="Comissões e pagamentos"
            >
              <p>
                Se você trabalha com comissão, o Flowo calcula automaticamente
                quanto cada barbeiro deve receber com base nos atendimentos
                realizados.
              </p>
              <GuideCallout title="Relatório de comissões">
                No final do mês, você exporta um relatório com todos os
                atendimentos e valores de comissão de cada barbeiro. Sem contas
                manuais, sem erros.
              </GuideCallout>
              <p>
                Configure a porcentagem de comissão por serviço ou um valor
                fixo por atendimento. O sistema faz as contas.
              </p>
            </GuideSection>
          </article>

          <GuideCta
            title="Tem equipe? Conheça o plano Equipe."
            description="Agenda individual por barbeiro, métricas de desempenho e comissões calculadas automaticamente."
          />

          <GuidePrevNext
            next={{
              href: "/recursos/guias/guia-definitivo-agendamento",
              label: "Guia de Agendamento",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
