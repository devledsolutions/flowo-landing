import { Ban, Bell, CalendarCheck, TrendingDown, Users } from "lucide-react";
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
  GuideSteps,
  GuideContent,
} from "@/components/resources/guide-shell";
import { GuideStructuredData } from "@/components/resources/resource-structured-data";
import type { ChatMessage } from "@/components/home/whatsapp-chat";
import { GuideHonesty, GuideScreenshot, GuideWhatsApp } from "@/app/recursos/_components/guide-media";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/reduzindo-faltas");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "medir", label: "Saiba quanto a falta custa" },
  { id: "lembretes", label: "Ligue confirmação e lembrete" },
  { id: "silencio", label: "Silêncio não cancela" },
  { id: "no-show", label: "Marque a falta e libere a cadeira" },
  { id: "politica", label: "Regra clara, sem punição inventada" },
];

const confirmationConversation: ChatMessage[] = [
  { day: "Quarta" },
  {
    from: "flowo",
    text: "Oi, Marcos! Seu corte + barba com o Luiz é amanhã às 15:00. Confirma pra mim?",
    at: "15:00",
  },
  { from: "cliente", text: "Sim, confirmado", at: "15:04" },
  { from: "flowo", text: "Fechado, horário confirmado. Se precisar mudar, me avise por aqui.", at: "15:04" },
  { day: "Quinta" },
  { from: "flowo", text: "Lembrete: seu horário com o Luiz é hoje às 15:00. Te esperamos!", at: "13:00" },
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
            title="Como reduzir faltas na barbearia"
            lead="Confirmação, lembrete, falta registrada e lista de espera. Sem cobrar sinal e sem cancelar cliente que ficou em silêncio."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Confirmação",
                value: "24 horas antes, ajustável",
                description: "O “sim” do cliente marca o horário como confirmado na agenda.",
              },
              {
                label: "Lembrete",
                value: "2 horas antes",
                description: "Sai quando a opção está ligada e o horário ainda vale.",
              },
              {
                label: "Canal",
                value: "WhatsApp conectado",
                description: "Sem número conectado, telefone válido e permissão do cliente, nada é enviado.",
              },
              {
                label: "Sinal",
                value: "Não existe",
                description: "PIX e cartão só entram depois do atendimento.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="medir" icon={TrendingDown} title="Saiba quanto a falta custa">
              <p>
                Conte as faltas do mês e multiplique pelo valor do serviço que não aconteceu.
                Separe quem avisou de quem sumiu. Os dois liberam a cadeira, mas pedem ações
                diferentes.
              </p>
              <GuideCallout title="Faça a conta com os seus números">
                Falta sem aviso vezes valor médio do serviço. Esse é o tamanho do problema. A
                Flowo não promete recuperar esse valor.
              </GuideCallout>
              <GuideScopeNote status="practice" title="Anote o ponto de partida">
                Veja a taxa de faltas por período em Métricas antes de mudar qualquer coisa.
                Sem isso, você não sabe se melhorou ou se foi só uma semana mais cheia.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="lembretes" icon={Bell} title="Ligue confirmação e lembrete">
              <p>
                Com a confirmação ligada, o pedido de confirmação substitui o lembrete de 24
                horas. O lembrete de 2 horas continua saindo.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Confirmação",
                    description: "O cliente responde “sim” e a Flowo marca o horário como confirmado.",
                  },
                  {
                    title: "Lembrete final",
                    description: "Repete dia, hora, serviço e barbeiro perto do atendimento.",
                  },
                ]}
              />
              <GuideWhatsApp messages={confirmationConversation} logicalHeight={900} />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "WhatsApp / Configurações → Notificações",
                    action: "ligue a confirmação e os lembretes.",
                  },
                  {
                    surface: "App",
                    path: "Mais → WhatsApp",
                    action: "veja se o número está conectado.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="silencio" icon={CalendarCheck} title="Silêncio não cancela">
              <p>
                Se o cliente não responder, o horário continua na agenda. A Flowo não cancela nem
                libera a cadeira só porque ninguém confirmou.
              </p>
              <GuideScopeNote status="practice" title="Quem decide o próximo passo é a barbearia">
                Ligue, mande mensagem ou mantenha o horário. Só não anuncie uma regra automática
                que o app não executa.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="no-show" icon={Users} title="Marque a falta e libere a cadeira">
              <GuideScreenshot
                src="/images/product/dashboard-hoje.png"
                alt="Tela Hoje da Flowo: cadeiras do momento, um cliente atrasado com os botões Chegou e Não veio, e a lista Precisa de você"
              />
              <GuideSteps
                items={[
                  {
                    title: "Marque “não veio”",
                    description: "Na agenda ou na tela Hoje, registre a falta quando o atendimento não aconteceu.",
                  },
                  {
                    title: "O histórico atualiza sozinho",
                    description: "A Flowo soma a falta no cadastro do cliente e guarda o contexto para a próxima.",
                  },
                  {
                    title: "A lista de espera é avisada",
                    description: "Quando a cadeira libera, a Flowo procura alguém na lista de espera e oferece a vaga pelo WhatsApp.",
                  },
                ]}
              />
              <GuideScopeNote status="conditional" title="A oferta da lista de espera precisa combinar">
                Serviço, barbeiro, dia, telefone válido e permissão do cliente. Nem toda falta
                gera uma oferta, e a oferta não é uma reserva.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="politica" icon={Ban} title="Regra clara, sem punição inventada">
              <p>
                Escreva regras simples de cancelamento, remarcação e atraso. O prazo de
                cancelamento e remarcação limita o que o cliente consegue mudar sozinho.
              </p>
              <GuideChecklist
                items={[
                  "Diga até quando o cliente pode cancelar ou remarcar",
                  "Peça aviso assim que ele souber que não vai",
                  "Registre falta só quando o atendimento não aconteceu",
                  "Revise quem falta repetido antes de restringir",
                  "Não apresente sinal como recurso da Flowo",
                ]}
              />
              <GuideCallout title="Limite de hoje">
                O número máximo de faltas pode ser guardado no cadastro, mas a Flowo não bloqueia
                o cliente sozinha. A decisão é da barbearia.
              </GuideCallout>
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "Confirmar, remarcar e cancelar pelo WhatsApp: testado em produção com números de teste da própria Flowo, em 26 de julho de 2026.",
              "Prazos de 24 horas e 2 horas: conferidos no produto em 3 de setembro de 2026.",
            ]}
            notMeasured={[
              "Quantas faltas a confirmação evita em barbearias reais.",
              "Quanto da cadeira liberada a lista de espera preenche.",
            ]}
          />

          <GuideCta
            title="Quer tratar faltas sem cobrar sinal?"
            description="Conecte o WhatsApp, ligue a confirmação e marque presença e falta direto na agenda."
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
