import { BarChart3, PackageCheck, ReceiptText, Sparkles } from "lucide-react";
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
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/aumentar-ticket-medio");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "medir", label: "Calcule a linha de base" },
  { id: "catalogo", label: "Organize serviços, combos e produtos" },
  { id: "oferta", label: "Ofereça no contexto certo" },
  { id: "fechamento", label: "Registre tudo na comanda" },
];

export default function TicketMedioGuidePage() {
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
              { label: "Aumentar Ticket Médio", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Como aumentar o ticket médio sem empurrar serviço"
            lead="Melhore catálogo, oferta e registro da comanda. O Flowo organiza o processo; a recomendação comercial ainda precisa respeitar o cliente e o contexto."
          />

          <GuideAvailability
            items={[
              {
                label: "Catálogo",
                value: "Serviços, combos e produtos",
                description:
                  "Cadastre itens ativos com preço correto antes de oferecer qualquer adicional.",
              },
              {
                label: "Venda",
                value: "Comanda pós-serviço",
                description:
                  "Serviços e produtos entram no atendimento e formam o total final.",
              },
              {
                label: "Análise",
                value: "Receita por serviço",
                description:
                  "Planos superiores detalham serviços no relatório. Ticket médio pode exigir cálculo complementar.",
              },
              {
                label: "Limite atual",
                value: "Sem upsell automático garantido",
                description:
                  "Não trate cada conversa ou confirmação como uma oferta automática configurável.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="medir" icon={BarChart3} title="Calcule a linha de base">
              <p>
                Use apenas atendimentos concluídos: some a receita do período e
                divida pela quantidade de comandas fechadas. Compare intervalos
                equivalentes e não misture agendamentos futuros.
              </p>
              <GuideCallout>
                <strong>Ticket médio = receita concluída ÷ atendimentos pagos.</strong>{" "}
                Registre a data e o período. Uma semana de sábado cheio não
                substitui uma comparação mensal consistente.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="catalogo"
              icon={PackageCheck}
              title="Organize serviços, combos e produtos"
            >
              <GuideCards
                items={[
                  {
                    title: "Combo de serviços",
                    description:
                      "Agrupe serviços que já fazem sentido juntos, como corte e barba, com preço e duração coerentes.",
                  },
                  {
                    title: "Produtos",
                    description:
                      "Cadastre finalizadores e itens vendidos na barbearia para incluí-los na comanda.",
                  },
                  {
                    title: "Pacotes",
                    description:
                      "Quando usar pacotes, acompanhe o saldo de usos e consuma somente depois de prestar o serviço.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Serviços / Pacotes",
                    action:
                      "cadastre catálogo, combos, produtos e saldos de uso.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → Serviços / Produtos",
                    action:
                      "mantenha os itens da operação atualizados.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="oferta"
              icon={Sparkles}
              title="Ofereça no contexto certo"
            >
              <p>
                Sugira algo relacionado ao serviço e ao histórico conhecido, sem
                transformar lembrete ou confirmação em campanha. O cliente deve
                entender o que muda no atendimento e no preço.
              </p>
              <GuideScopeNote
                status="practice"
                title="A estratégia é da barbearia"
              >
                O Flowo disponibiliza catálogo, histórico, conversas e campanhas,
                mas não garante um fluxo automático de upsell por perfil. Defina
                quando a equipe oferece um adicional e treine uma frase simples.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="fechamento"
              icon={ReceiptText}
              title="Registre tudo na comanda"
            >
              <GuideChecklist
                items={[
                  "Inclua cada serviço e produto realmente entregue",
                  "Aplique desconto de forma explícita",
                  "Vincule o profissional correto",
                  "Feche com a forma de pagamento recebida",
                  "Revise receita por serviço antes de mudar preço ou combo",
                ]}
              />
              <GuideScopeNote title="O relatório depende da comanda correta">
                Itens oferecidos, mas não vendidos, não entram na receita. Itens
                vendidos fora do Flowo também não aparecem automaticamente.
              </GuideScopeNote>
            </GuideSection>
          </GuideContent>

          <GuideCta
            title="Quer ligar catálogo, atendimento e receita?"
            description="Cadastre os itens que sua barbearia realmente vende e feche cada atendimento na comanda."
          />

          <GuidePrevNext
            currentPath={guide.path}
            next={{
              href: "/recursos/guias/fidelizacao-clientes",
              label: "Fidelização de Clientes",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
