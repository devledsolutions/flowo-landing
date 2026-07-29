import { Ban, Bell, CalendarCheck, TrendingDown, Users } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideAvailability,
  GuideCallout,
  GuideCards,
  GuideChatSample,
  GuideChecklist,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideProductPath,
  GuideScopeNote,
  GuideSection,
  GuideSteps,
  GuideContent,
} from "@/components/resources/guide-shell";
import { GuideStructuredData } from "@/components/resources/resource-structured-data";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/reduzindo-faltas");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "medir", label: "Meça o custo com os seus dados" },
  { id: "lembretes", label: "Ative confirmação e lembrete" },
  { id: "silencio", label: "Não cancele por silêncio" },
  { id: "no-show", label: "Registre a falta e libere o horário" },
  { id: "politica", label: "Use política clara sem inventar punições" },
];

export default function ReducingNoShowsGuidePage() {
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
              { label: "Reduzindo Faltas", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Reduzindo faltas na barbearia"
            lead="Combine confirmação, lembrete, registro correto do no-show e lista de espera. O objetivo é proteger a agenda sem cobrar sinal e sem cancelar um cliente apenas porque ele ficou em silêncio."
          />

          <GuideAvailability
            items={[
              {
                label: "Confirmação",
                value: "Configurável",
                description:
                  "O prazo padrão é 24 horas. A resposta válida atualiza o compromisso na agenda.",
              },
              {
                label: "Lembrete",
                value: "2 horas antes",
                description:
                  "É programado quando a opção está habilitada e o horário ainda é válido.",
              },
              {
                label: "Canal",
                value: "WhatsApp conectado",
                description:
                  "Sem canal ativo, telefone válido e consentimento, nenhuma mensagem é enviada.",
              },
              {
                label: "Pagamento",
                value: "Sem sinal",
                description:
                  "PIX e cartão só entram no fechamento pós-serviço.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection
              id="medir"
              icon={TrendingDown}
              title="Meça o custo com os seus dados"
            >
              <p>
                Multiplique o número de faltas pelo valor médio dos atendimentos
                que deixaram de acontecer. Separe cancelamento avisado de no-show:
                os dois liberam a cadeira, mas pedem ações diferentes.
              </p>
              <GuideCallout title="Exemplo hipotético">
                Se três profissionais perderem um horário de R$ 50 no mesmo dia,
                a capacidade não utilizada foi de R$ 150. Use seus próprios
                valores; isso não é uma promessa de receita recuperada pelo
                Flowo.
              </GuideCallout>
              <GuideScopeNote
                status="practice"
                title="Defina uma linha de base antes de mudar o processo"
              >
                Compare a taxa de faltas por período em Métricas. Sem um ponto de
                partida, você não consegue separar melhora real de uma semana
                naturalmente mais cheia.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="lembretes"
              icon={Bell}
              title="Ative confirmação e lembrete"
            >
              <p>
                Quando a confirmação está ativa, o pedido substitui o lembrete
                simples de 24 horas. O lembrete final de 2 horas continua sendo
                programado.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Confirmação antecipada",
                    description:
                      "O cliente responde “sim” e o Flowo marca o agendamento como confirmado.",
                  },
                  {
                    title: "Lembrete final",
                    description:
                      "Reforça data, hora, serviço e profissional próximo do atendimento.",
                  },
                ]}
              />
              <GuideChatSample
                customer="Sim, confirmado"
                reply="Fechado! Seu horário está confirmado. Se precisar mudar, me avise por aqui."
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "WhatsApp / Configurações → Notificações",
                    action:
                      "revise a conexão e ajuste confirmação e lembretes.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → WhatsApp",
                    action:
                      "confira o estado do canal e os controles operacionais.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="silencio"
              icon={CalendarCheck}
              title="Não cancele por silêncio"
            >
              <p>
                Se o cliente não responder, o agendamento continua válido. O
                Flowo não cancela nem libera o horário automaticamente só por
                ausência de confirmação.
              </p>
              <GuideScopeNote
                status="practice"
                title="Use a agenda para decidir o próximo contato"
              >
                A equipe pode entrar em contato ou manter o compromisso conforme
                a política da barbearia. Não anuncie uma regra automática que o
                sistema não executa.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="no-show"
              icon={Users}
              title="Registre a falta e libere o horário"
            >
              <GuideSteps
                items={[
                  {
                    title: "Marque o status correto",
                    description:
                      "Na agenda ou na revisão de presença, registre “não compareceu” quando o atendimento realmente não ocorreu.",
                  },
                  {
                    title: "Atualize o histórico",
                    description:
                      "O Flowo incrementa a contagem de faltas do cliente e preserva o contexto para atendimentos futuros.",
                  },
                  {
                    title: "Acione a recuperação",
                    description:
                      "O horário liberado pode buscar uma entrada compatível na lista de espera e oferecer a vaga pelo WhatsApp conectado.",
                  },
                ]}
              />
              <GuideScopeNote
                status="conditional"
                title="A oferta da lista de espera depende de correspondência"
              >
                Serviço, profissional, data, telefone, opt-out e conexão do
                WhatsApp são verificados. Nem toda falta gera uma mensagem e uma
                oferta não significa reserva concluída.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="politica"
              icon={Ban}
              title="Use política clara sem inventar punições"
            >
              <p>
                Cadastre e comunique regras simples de cancelamento, remarcação e
                atraso. Os prazos de cancelamento e remarcação podem limitar ações
                no portal do cliente.
              </p>
              <GuideChecklist
                items={[
                  "Explique até quando o cliente pode cancelar ou remarcar",
                  "Peça aviso assim que ele souber que não poderá comparecer",
                  "Registre no-show apenas quando o atendimento realmente não ocorreu",
                  "Revise casos repetidos antes de bloquear ou restringir atendimento",
                  "Nunca apresente sinal como recurso do Flowo",
                ]}
              />
              <GuideCallout title="Limite atual">
                Alguns campos avançados de política, como número máximo de
                faltas, podem ser armazenados sem bloquear automaticamente um
                cliente. A decisão continua com a barbearia.
              </GuideCallout>
            </GuideSection>
          </GuideContent>

          <GuideCta
            title="Quer enxergar e tratar faltas sem cobrar sinal?"
            description="Conecte o WhatsApp, configure a confirmação e use os estados da agenda com precisão."
          />

          <GuidePrevNext
            currentPath={guide.path}
            prev={{
              href: "/recursos/guias/configurando-whatsapp",
              label: "Configurando WhatsApp",
            }}
            next={{
              href: "/recursos/guias/relatorios-metricas",
              label: "Relatórios e Métricas",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
