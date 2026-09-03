import { HeartHandshake, MessageCircle, ShieldCheck, Users } from "lucide-react";
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

const guide = getGuide("/recursos/guias/fidelizacao-clientes");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "base", label: "Comece pelo atendimento bem fechado" },
  { id: "historico", label: "Use o histórico e os clientes sumidos" },
  { id: "campanhas", label: "Chame de volta sem virar spam" },
  { id: "fidelidade", label: "Cashback: o benefício que existe hoje" },
];

export default function CustomerLoyaltyGuidePage() {
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
              { label: "Fidelização de Clientes", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Fidelização de clientes na barbearia"
            lead="Feche bem o atendimento, veja quem parou de voltar e chame de volta com permissão. Fidelidade começa na cadeira, não na mensagem."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Clientes",
                value: "Cadastro e histórico",
                description: "Visitas, horários, observações do corte e faltas ficam no cadastro.",
              },
              {
                label: "Clientes sumidos",
                value: "Lista nos planos Equipe e Empresarial",
                description: "A Flowo mostra quem tem histórico e está há mais tempo sem voltar. O Solo vê só o total.",
              },
              {
                label: "Campanhas",
                value: "WhatsApp conectado + limite do plano",
                description: "Só saem com mensagem aprovada, permissão do cliente e dentro do limite do mês.",
              },
              {
                label: "Cashback",
                value: "Ligado pela barbearia",
                description: "Crédito em reais para a próxima visita. Só existe se você ligar e configurar.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="base" icon={HeartHandshake} title="Comece pelo atendimento bem fechado">
              <p>
                Cliente que volta nasce de um cadastro certo e de uma comanda fechada. Use o
                mesmo telefone em todo canal para não duplicar e marque o que aconteceu em cada
                visita.
              </p>
              <GuideChecklist
                items={[
                  "Confirme nome e telefone do cliente",
                  "Feche a comanda e registre como recebeu",
                  "Marque cancelamento ou falta do jeito certo",
                  "Anote a preferência do corte, sem dado demais",
                  "Respeite quem pediu para não receber mensagem",
                ]}
              />
              <GuideScreenshot
                src="/images/product/dashboard-clientes.png"
                alt="Tela Clientes da Flowo: lista com o filtro Sumidos há 30 dias, o cadastro de um cliente com total gasto, visitas, cashback, faltas, histórico e observação do corte"
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Clientes",
                    action: "busque o cliente, abra o cadastro e veja o histórico.",
                  },
                  {
                    surface: "App",
                    path: "Clientes",
                    action: "crie, edite, veja visitas e agende de novo.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="historico" icon={Users} title="Use o histórico e os clientes sumidos">
              <p>
                Em Clientes e em Métricas, os planos Equipe e Empresarial mostram quem está há
                mais tempo sem voltar. Use como ponto de partida, não como sentença.
              </p>
              <GuideCards
                items={[
                  {
                    title: "Cliente novo",
                    description: "Confira se a primeira comanda foi fechada e se o telefone está certo.",
                  },
                  {
                    title: "Cliente de sempre",
                    description: "Use a frequência real dele para decidir quando sugerir a volta.",
                  },
                  {
                    title: "Cliente sumido",
                    description: "Olhe o último serviço, a última visita e a permissão antes de chamar.",
                  },
                ]}
              />
              <GuideScopeNote status="practice" title="Um prazo só não serve para todo mundo">
                Barba semanal, corte mensal e tratamento de vez em quando não podem usar o mesmo
                prazo de “sumiu”.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="campanhas" icon={MessageCircle} title="Chame de volta sem virar spam">
              <p>
                A campanha respeita quem pediu para não receber, o limite de segurança e o limite
                do seu plano no mês. A tela mostra o uso e o limite. Não há cobrança surpresa por
                mensagem.
              </p>
              <GuideChecklist
                items={[
                  "Escolha um grupo que combine com a oferta",
                  "Deixe de fora quem não autorizou mensagem",
                  "Escreva uma mensagem curta e fácil de recusar",
                  "Revise público, texto e horário antes de aprovar",
                  "Bateu o limite? Reduza o público ou mude de plano",
                ]}
              />
              <GuideScopeNote status="conditional" title="O envio depende do WhatsApp e da mensagem aprovada">
                A campanha pode ficar pronta no painel, mas só sai com número conectado, modelo
                de mensagem aprovado pelo WhatsApp e clientes válidos.
              </GuideScopeNote>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Campanhas",
                    action: "monte o rascunho, revise o público e aprove.",
                  },
                  {
                    surface: "App",
                    path: "Mais → Campanhas",
                    action: "acompanhe, edite e veja o resultado.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="fidelidade" icon={ShieldCheck} title="Cashback: o benefício que existe hoje">
              <p>
                O cashback devolve uma parte do valor pago como crédito para a próxima visita. Você
                define a porcentagem, o prazo para usar, o valor mínimo e o limite por comanda. O
                saldo aparece no cadastro do cliente.
              </p>
              <GuideCallout title="Sem pontos e sem níveis">
                A Flowo não tem programa de pontos ativo. O único benefício de fidelidade é o
                cashback em reais. Não venda nível, selo ou carimbo que o app não tem.
              </GuideCallout>
              <GuideScopeNote status="conditional" title="Só existe depois que você liga">
                Nenhuma conta ganha cashback por padrão. Ligue, configure as regras e só então
                conte ao cliente.
              </GuideScopeNote>
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "Cadastro, histórico, filtro de clientes sumidos e cashback: conferidos no produto em 3 de setembro de 2026.",
              "Campanhas saem só com mensagem aprovada pelo WhatsApp e dentro do limite do plano: conferido no produto na mesma data.",
            ]}
            notMeasured={[
              "Quantos clientes sumidos voltam depois de uma campanha.",
              "Efeito do cashback na frequência de visitas.",
            ]}
          />

          <GuideCta
            title="Quer cuidar do relacionamento sem perder o contexto?"
            description="Use histórico, clientes sumidos, campanhas e cashback dentro do seu plano e com permissão do cliente."
          />

          <GuidePrevNext
            currentPath={guide.path}
            next={{
              href: "/recursos/guias/aumentar-ticket-medio",
              label: "Aumentar Ticket Médio",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
