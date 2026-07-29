import { BarChart3, CalendarClock, UserCheck, Users, Wallet } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideAvailability,
  GuideCallout,
  GuideCards,
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
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/gerenciamento-equipe");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "estrutura", label: "O que cadastrar para cada profissional" },
  { id: "horarios", label: "Horários individuais e folgas" },
  { id: "distribuicao", label: "Como a agenda escolhe o profissional" },
  { id: "desempenho", label: "Métricas que realmente estão disponíveis" },
  { id: "comissoes", label: "Comissões: plano e limites atuais" },
];

export default function TeamManagementGuidePage() {
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
              { label: "Equipe", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Gerenciamento de equipe para barbearias"
            lead="Configure cada profissional como ele trabalha de verdade: serviços, dias, horários e folgas. Depois use a agenda e os relatórios sem confundir capacidade com promessa."
          />

          <GuideAvailability
            items={[
              {
                label: "Planos",
                value: "Equipe e Empresarial",
                description:
                  "O Solo mantém um profissional ativo. Equipes com mais de um profissional usam os planos próprios para essa capacidade.",
              },
              {
                label: "Onde usar",
                value: "Painel web e app móvel",
                description:
                  "Cadastros, horários individuais, folgas, agenda e operação têm rotas equivalentes nas duas experiências.",
              },
              {
                label: "Comissões",
                value: "Empresarial, com ativação",
                description:
                  "O saldo é calculado após o pagamento. O repasse PIX é iniciado por um responsável; não há repasse automático por agenda semanal.",
              },
              {
                label: "Distribuição",
                value: "Por elegibilidade e disponibilidade",
                description:
                  "“Qualquer profissional” usa alguém apto e livre. O Flowo não promete rodízio equilibrado ou distribuição automática por meta.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection
              id="estrutura"
              icon={UserCheck}
              title="O que cadastrar para cada profissional"
            >
              <p>
                Em <strong>Equipe</strong>, cada pessoa recebe um cadastro próprio.
                Marque se ela atende clientes, quais serviços realiza e se está
                ativa. Isso evita oferecer um serviço a quem não o executa.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Serviços permitidos",
                    description:
                      "A lista é individual. A agenda só considera o profissional para os serviços atribuídos a ele.",
                  },
                  {
                    title: "Duração do serviço",
                    description:
                      "Hoje a duração pertence ao serviço, não ao profissional. Um mesmo serviço usa o mesmo tempo para toda a equipe.",
                  },
                  {
                    title: "Profissional agendável",
                    description:
                      "Quem não atende clientes pode permanecer na equipe sem aparecer como opção de agenda.",
                  },
                  {
                    title: "Dados de contato",
                    description:
                      "Nome, apelido e dados operacionais ajudam a identificar a pessoa no painel e no atendimento.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Equipe",
                    action:
                      "adicione ou edite o profissional e escolha os serviços que ele realiza.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → Equipe",
                    action:
                      "faça o mesmo cadastro e abra o detalhe do profissional.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="horarios"
              icon={CalendarClock}
              title="Horários individuais e folgas"
            >
              <p>
                O horário geral da barbearia funciona como padrão. Cada
                profissional pode herdar esse horário ou ter uma agenda própria,
                com dias de trabalho e faixas diferentes.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Horário geral",
                    description:
                      "Define quando a barbearia abre. Ninguém recebe horário fora dessa janela.",
                  },
                  {
                    title: "Horário do profissional",
                    description:
                      "Restringe os dias e períodos em que aquela pessoa pode receber agendamentos.",
                  },
                  {
                    title: "Folgas e ausências",
                    description:
                      "Bloqueiam intervalos específicos sem alterar a escala normal.",
                  },
                  {
                    title: "Conflitos",
                    description:
                      "A disponibilidade considera horário, serviço, folga e agendamentos já existentes.",
                  },
                ]}
              />
              <GuideScopeNote title="A configuração individual já está ligada à disponibilidade">
                Os horários salvos no cadastro do profissional são os mesmos
                consultados pela agenda, pela página pública e pela IA de
                agendamento.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="distribuicao"
              icon={Users}
              title="Como a agenda escolhe o profissional"
            >
              <p>
                O cliente pode escolher uma pessoa específica ou selecionar
                <strong> qualquer profissional</strong>. Nesse segundo caso, o
                Flowo procura alguém ativo, habilitado para o serviço, dentro do
                horário e sem conflito.
              </p>
              <GuideCallout title="O que o sistema não faz">
                A escolha automática não é um rodízio por quantidade de clientes,
                comissão, meta ou faturamento. Se sua equipe precisa de uma regra
                comercial de distribuição, acompanhe os dados e ajuste a escala;
                não anuncie um balanceamento que o produto ainda não executa.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="desempenho"
              icon={BarChart3}
              title="Métricas que realmente estão disponíveis"
            >
              <p>
                Em <strong>Métricas</strong>, os planos superiores mostram
                indicadores operacionais como faturamento concluído, agendamentos,
                faltas, clientes em risco, receita por serviço e horários de pico.
                Parte do detalhamento varia conforme o plano.
              </p>
              <GuideScopeNote
                status="practice"
                title="Nem toda decisão de equipe vem pronta em um ranking"
              >
                Use agenda, receita por serviço e horários de pico para revisar a
                escala. Não trate “quem precisa de treinamento” ou “quem está
                sobrecarregado” como conclusões automáticas do painel.
              </GuideScopeNote>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Métricas",
                    action:
                      "compare períodos e consulte os blocos liberados pelo seu plano.",
                  },
                  {
                    surface: "Operação",
                    path: "Agenda",
                    action:
                      "filtre o dia e confira a carga real de cada profissional.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="comissoes"
              icon={Wallet}
              title="Comissões: plano e limites atuais"
            >
              <p>
                No plano Empresarial, com o módulo ativado, o Flowo pode creditar
                a comissão do profissional quando uma comanda ou atendimento é
                pago. O responsável define a porcentagem e a chave PIX.
              </p>
              <GuideScopeNote
                status="conditional"
                title="Crédito automático não significa repasse automático"
              >
                O saldo de comissão é formado automaticamente após o pagamento,
                mas o repasse PIX disponível hoje é iniciado manualmente por um
                responsável autorizado e depende de saldo liquidado na conta da
                barbearia.
              </GuideScopeNote>
              <GuideCallout title="Resumo honesto">
                Equipe organiza profissionais, serviços e horários. Empresarial
                adiciona o fluxo de comissão quando habilitado. Nenhum plano deve
                ser vendido com a promessa de repasse semanal automático.
              </GuideCallout>
            </GuideSection>
          </GuideContent>

          <GuideCta
            title="Sua equipe trabalha em horários diferentes?"
            description="Conheça os planos com múltiplos profissionais e configure a disponibilidade real de cada pessoa."
          />

          <GuidePrevNext
            currentPath={guide.path}
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
