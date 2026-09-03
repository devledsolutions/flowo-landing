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
import { GuideHonesty, GuideScreenshot } from "@/app/recursos/_components/guide-media";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/gerenciamento-equipe");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "estrutura", label: "O que cadastrar de cada barbeiro" },
  { id: "horarios", label: "Horário próprio e folgas" },
  { id: "distribuicao", label: "Como a agenda escolhe o barbeiro" },
  { id: "desempenho", label: "Números que existem em Métricas" },
  { id: "comissoes", label: "Comissões: plano e limites de hoje" },
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
            lead="Cadastre cada barbeiro do jeito que ele trabalha: serviços, dias, horários e folgas. A agenda passa a oferecer só o que cabe."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Planos",
                value: "Equipe e Empresarial",
                description: "O Solo tem um barbeiro ativo. Mais de um barbeiro pede um desses planos.",
              },
              {
                label: "Onde usar",
                value: "Painel e app",
                description: "Cadastro, horários, folgas e agenda funcionam nos dois.",
              },
              {
                label: "Comissões",
                value: "Empresarial, com ativação",
                description: "A comissão entra depois do pagamento. O repasse por PIX é feito por um responsável.",
              },
              {
                label: "Quem atende",
                value: "Quem faz o serviço e está livre",
                description: "“Qualquer barbeiro” escolhe alguém apto e livre. Não há rodízio nem meta automática.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="estrutura" icon={UserCheck} title="O que cadastrar de cada barbeiro">
              <p>
                Em <strong>Equipe</strong>, cada pessoa tem o próprio cadastro. Marque se ela
                atende, quais serviços faz e se está ativa. Assim a agenda não oferece barba a
                quem só corta.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Serviços que ele faz",
                    description: "A lista é por barbeiro. A agenda só o oferece para esses serviços.",
                  },
                  {
                    title: "Duração do serviço",
                    description: "Hoje a duração é do serviço, não do barbeiro. O mesmo corte leva o mesmo tempo para todos.",
                  },
                  {
                    title: "Agendável ou não",
                    description: "Quem não atende pode ficar na equipe sem aparecer na agenda.",
                  },
                  {
                    title: "Nome e apelido",
                    description: "É o que aparece no painel e na conversa com o cliente.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Equipe",
                    action: "adicione ou edite o barbeiro e escolha os serviços que ele faz.",
                  },
                  {
                    surface: "App",
                    path: "Mais → Equipe",
                    action: "o mesmo cadastro, no celular.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="horarios" icon={CalendarClock} title="Horário próprio e folgas">
              <p>
                O horário da barbearia é o padrão. Cada barbeiro herda esse horário ou tem uma
                escala própria, com dias e faixas diferentes.
              </p>
              <GuideScreenshot
                src="/images/product/dashboard-agenda.png"
                alt="Tela Agenda da Flowo com uma coluna por barbeiro, cada um com os próprios horários do dia"
              />
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Horário da barbearia",
                    description: "Diz quando ela abre. Ninguém recebe horário fora disso.",
                  },
                  {
                    title: "Horário do barbeiro",
                    description: "Limita os dias e as faixas em que ele recebe agendamento.",
                  },
                  {
                    title: "Folgas",
                    description: "Bloqueiam um intervalo sem mexer na escala da semana.",
                  },
                  {
                    title: "Conflitos",
                    description: "A agenda olha horário, serviço, folga e o que já está marcado.",
                  },
                ]}
              />
              <GuideScopeNote title="O horário do barbeiro já vale na agenda">
                O que você salva no cadastro é o mesmo que a agenda, a página de agendamento e a
                Flowo no WhatsApp consultam.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="distribuicao" icon={Users} title="Como a agenda escolhe o barbeiro">
              <p>
                O cliente escolhe alguém específico ou <strong>qualquer barbeiro</strong>. No
                segundo caso, a Flowo procura quem está ativo, faz o serviço, está no horário e
                sem conflito.
              </p>
              <GuideCallout title="O que a Flowo não faz">
                Não distribui por quantidade de clientes, comissão, meta ou faturamento. Se sua
                equipe precisa dessa regra, acompanhe os números e ajuste a escala. Não anuncie
                um rodízio que o app não executa.
              </GuideCallout>
            </GuideSection>

            <GuideSection id="desempenho" icon={BarChart3} title="Números que existem em Métricas">
              <p>
                Em <strong>Métricas</strong>, os planos Equipe e Empresarial mostram faturamento
                concluído, agendamentos, faltas, clientes sumidos, receita por serviço, horários
                de pico e atendimentos por barbeiro. O detalhe varia com o plano.
              </p>
              <GuideScopeNote status="practice" title="Ranking não decide por você">
                Use agenda, receita por serviço e horários de pico para revisar a escala. “Quem
                precisa de treino” ou “quem está sobrecarregado” é leitura sua, não do painel.
              </GuideScopeNote>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Métricas",
                    action: "compare períodos e veja os blocos do seu plano.",
                  },
                  {
                    surface: "Painel",
                    path: "Agenda",
                    action: "filtre o dia e veja a carga real de cada barbeiro.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="comissoes" icon={Wallet} title="Comissões: plano e limites de hoje">
              <p>
                No plano Empresarial, com o módulo ligado, a Flowo credita a comissão do barbeiro
                quando a comanda é paga. O responsável define a porcentagem e a chave PIX.
              </p>
              <GuideScopeNote status="conditional" title="Crédito automático não é repasse automático">
                O saldo de comissão se forma sozinho depois do pagamento. O repasse por PIX é
                feito por um responsável e depende de saldo disponível na conta da barbearia.
              </GuideScopeNote>
              <GuideCallout title="Resumo">
                Equipe organiza barbeiros, serviços e horários. Empresarial soma a comissão
                quando ligada. Nenhum plano faz repasse semanal automático.
              </GuideCallout>
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "Agendar com o barbeiro certo pelo WhatsApp, respeitando a agenda dele: testado em produção com números de teste da própria Flowo, em 26 de julho de 2026.",
              "Regras de horário por barbeiro, folgas e comissão só após pagamento: conferidas no produto em 3 de setembro de 2026.",
            ]}
            notMeasured={[
              "Tempo que o gestor economiza montando a escala na Flowo.",
              "Efeito da comissão automática no fechamento do mês.",
            ]}
          />

          <GuideCta
            title="Sua equipe trabalha em horários diferentes?"
            description="Veja os planos com mais de um barbeiro e cadastre a rotina real de cada um."
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
