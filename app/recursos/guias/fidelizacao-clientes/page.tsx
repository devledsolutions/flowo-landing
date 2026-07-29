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
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fidelização de Clientes na Barbearia",
  description:
    "Use histórico, clientes em risco, campanhas e fidelidade no Flowo respeitando ativação, plano e opt-out.",
  path: "/recursos/guias/fidelizacao-clientes",
});

const tableOfContents = [
  { id: "base", label: "Construa a base pelo atendimento" },
  { id: "historico", label: "Use histórico e clientes em risco" },
  { id: "campanhas", label: "Reative sem enviar spam" },
  { id: "fidelidade", label: "Entenda o módulo de fidelidade" },
];

export default function FidelizacaoGuidePage() {
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
              { label: "Fidelização de Clientes", href: "#" },
            ]}
            readTime="9 min"
            title="Fidelização de clientes sem automação vazia"
            lead="Registre o atendimento, entenda quem parou de voltar e use campanhas com consentimento. Fidelidade começa na operação; o canal só ajuda a manter o relacionamento."
          />

          <GuideAvailability
            items={[
              {
                label: "CRM",
                value: "Clientes e histórico",
                description:
                  "Cadastro, visitas, agendamentos e sinais de relacionamento ficam vinculados à barbearia.",
              },
              {
                label: "Clientes em risco",
                value: "Detalhe nos planos superiores",
                description:
                  "O painel identifica clientes com histórico que estão há mais tempo sem retornar.",
              },
              {
                label: "Campanhas",
                value: "WhatsApp ativo + limite do plano",
                description:
                  "Envios dependem de templates, opt-in, audiência válida e cota mensal.",
              },
              {
                label: "Fidelidade",
                value: "Módulo adicional",
                description:
                  "Pontos e níveis funcionam com programa ativo; o resgate dentro da comanda ainda não tem fluxo completo.",
              },
            ]}
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="base"
              icon={HeartHandshake}
              title="Construa a base pelo atendimento"
            >
              <p>
                Um cliente recorrente nasce de um cadastro correto e de uma
                agenda bem fechada. Use o mesmo telefone em todos os canais para
                evitar duplicidade e marque o resultado real de cada visita.
              </p>
              <GuideChecklist
                items={[
                  "Confirme nome e telefone do cliente",
                  "Feche o atendimento e registre a forma de pagamento",
                  "Marque cancelamento ou no-show com precisão",
                  "Mantenha preferências e observações úteis, sem dados excessivos",
                  "Respeite pedidos para não receber mensagens",
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Clientes",
                    action:
                      "busque o cadastro, abra o detalhe e confira o histórico.",
                  },
                  {
                    surface: "App móvel",
                    path: "Clientes",
                    action:
                      "crie, edite, consulte visitas e inicie um novo agendamento.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="historico"
              icon={Users}
              title="Use histórico e clientes em risco"
            >
              <p>
                Em Métricas, os planos superiores mostram a lista de clientes em
                risco com base no histórico e no tempo desde a última visita.
                Use esse recorte como ponto de partida, não como diagnóstico
                automático de churn.
              </p>
              <GuideCards
                items={[
                  {
                    title: "Cliente novo",
                    description:
                      "Garanta que o primeiro atendimento foi fechado e que o contato está correto.",
                  },
                  {
                    title: "Cliente recorrente",
                    description:
                      "Use a frequência real para escolher quando faz sentido sugerir retorno.",
                  },
                  {
                    title: "Cliente em risco",
                    description:
                      "Considere serviço anterior, última visita e consentimento antes de entrar em contato.",
                  },
                ]}
              />
              <GuideScopeNote
                status="practice"
                title="45 dias não é uma regra universal"
              >
                A cadência depende do serviço e do cliente. Barba semanal, corte
                mensal e tratamento ocasional não devem usar o mesmo prazo.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="campanhas"
              icon={MessageCircle}
              title="Reative sem enviar spam"
            >
              <p>
                Campanhas usam uma audiência resolvida pelo backend e respeitam
                opt-out, limites de segurança e a cota mensal do plano. A área
                mostra uso e limite; não cobra uma tarifa surpresa por envio.
              </p>
              <GuideChecklist
                items={[
                  "Escolha um segmento coerente com a oferta",
                  "Exclua quem não autorizou mensagens",
                  "Use uma mensagem específica e fácil de recusar",
                  "Revise público, texto e horário antes de aprovar",
                  "Se atingir a cota, reduza o público ou mude de plano",
                ]}
              />
              <GuideScopeNote
                status="conditional"
                title="Envio real depende do WhatsApp e dos templates"
              >
                A campanha pode ser preparada no produto, mas só é enviada com
                canal conectado, template aprovado e destinatários válidos.
              </GuideScopeNote>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Campanhas",
                    action:
                      "crie o rascunho, revise audiência e aprove o envio.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → Campanhas",
                    action:
                      "acompanhe, edite, publique e consulte resultados.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="fidelidade"
              icon={ShieldCheck}
              title="Entenda o módulo de fidelidade"
            >
              <p>
                Com o módulo ativo, um programa pode acumular pontos após comandas
                fechadas, classificar níveis e exibir o saldo ao cliente. Sem
                programa ativo, nada é acumulado.
              </p>
              <GuideCallout title="Limite atual">
                O mecanismo de resgate existe no backend, mas o resgate completo
                dentro do checkout da comanda ainda está pendente. Não venda o
                módulo como um caixa de recompensas totalmente automatizado.
              </GuideCallout>
              <GuideScopeNote
                status="conditional"
                title="Módulo, programa e regras precisam estar ativos"
              >
                Pontos não aparecem por padrão em toda conta. Verifique a
                assinatura, ative o programa e revise as regras antes de divulgar
                um benefício ao cliente.
              </GuideScopeNote>
            </GuideSection>
          </article>

          <GuideCta
            title="Quer organizar o relacionamento sem perder o contexto?"
            description="Use histórico, métricas e campanhas do Flowo dentro dos limites do seu plano e do consentimento do cliente."
          />

          <GuidePrevNext
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
