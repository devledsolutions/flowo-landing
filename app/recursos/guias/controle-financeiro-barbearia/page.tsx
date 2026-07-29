import { BarChart3, BookOpenCheck, ReceiptText, Wallet } from "lucide-react";
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

const guide = getGuide("/recursos/guias/controle-financeiro-barbearia");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "limite", label: "O que o Flowo controla" },
  { id: "fechamento", label: "Feche cada atendimento" },
  { id: "saldo", label: "Separe recebido, pendente e disponível" },
  { id: "custos", label: "Mantenha custos e lucro fora do painel" },
];

export default function ControleFinanceiroGuidePage() {
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
              { label: "Controle Financeiro", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Controle financeiro para barbearia"
            lead="Use o Flowo para controlar a receita operacional dos atendimentos. Custos, lucro contábil, impostos e conciliação completa continuam exigindo gestão financeira própria."
          />

          <GuideAvailability
            items={[
              {
                label: "Operação",
                value: "Comandas e pagamentos",
                description:
                  "Serviços, produtos, descontos e formas de pagamento ficam ligados ao atendimento.",
              },
              {
                label: "Financeiro",
                value: "Saldo, histórico e retiradas",
                description:
                  "Acompanhe valores disponíveis e pendentes da conta integrada.",
              },
              {
                label: "Métricas",
                value: "Receita concluída",
                description:
                  "O relatório usa atendimentos concluídos e permite comparação por período.",
              },
              {
                label: "Fora do escopo",
                value: "DRE e contabilidade completa",
                description:
                  "Custos fixos, folha, impostos e lucro líquido não são calculados automaticamente pelo painel.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection
              id="limite"
              icon={BookOpenCheck}
              title="O que o Flowo controla"
            >
              <GuideCards
                items={[
                  {
                    title: "Receita do atendimento",
                    description:
                      "Valor de serviços e produtos registrados em comandas fechadas.",
                  },
                  {
                    title: "Cobranças digitais",
                    description:
                      "PIX e cartão com estados de pendência, confirmação, recebimento e eventual reversão.",
                  },
                  {
                    title: "Dinheiro",
                    description:
                      "Pagamento presencial registrado no fechamento da comanda.",
                  },
                  {
                    title: "Saldo da conta",
                    description:
                      "Valor disponível para retirada e valores ainda aguardando liquidação.",
                  },
                ]}
              />
              <GuideScopeNote
                status="practice"
                title="Controle operacional não é lucro"
              >
                Receita no Flowo não desconta automaticamente aluguel, folha,
                produtos consumidos, impostos e outras despesas. Use seu contador
                e uma rotina financeira própria para chegar ao lucro.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="fechamento"
              icon={ReceiptText}
              title="Feche cada atendimento"
            >
              <GuideChecklist
                items={[
                  "Abra a comanda para o cliente correto",
                  "Inclua serviços e produtos realmente entregues",
                  "Aplique descontos antes de gerar a cobrança",
                  "Registre a forma de pagamento recebida",
                  "Corrija pendências antes do fechamento do dia",
                ]}
              />
              <GuideCallout title="A qualidade do relatório começa na operação">
                Um serviço recebido fora do Flowo ou uma comanda deixada aberta
                não entra corretamente na leitura do período.
              </GuideCallout>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Comandas",
                    action:
                      "registre e feche cada atendimento com os itens corretos.",
                  },
                  {
                    surface: "App móvel",
                    path: "Comandas",
                    action:
                      "faça o fechamento na operação, inclusive PIX, cartão ou dinheiro.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="saldo"
              icon={Wallet}
              title="Separe recebido, pendente e disponível"
            >
              <p>
                Uma cobrança confirmada pode ainda estar em liquidação. Não use
                o total vendido como se todo o dinheiro já pudesse ser retirado.
              </p>
              <GuideCards
                items={[
                  {
                    title: "Receita concluída",
                    description:
                      "Mostra o valor operacional dos atendimentos realizados.",
                  },
                  {
                    title: "Pagamento pendente",
                    description:
                      "Cobrança criada, mas ainda sem confirmação definitiva.",
                  },
                  {
                    title: "Saldo disponível",
                    description:
                      "Valor liquidado que pode sustentar retirada ou repasse autorizado.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Financeiro → Histórico",
                    action:
                      "consulte pagamentos e estados antes de retirar ou conciliar.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → Financeiro",
                    action:
                      "acompanhe saldo, pagamentos, chaves PIX e retiradas.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="custos"
              icon={BarChart3}
              title="Mantenha custos e lucro fora do painel"
            >
              <p>
                Mantenha uma rotina separada para despesas, impostos, pró-labore,
                folha e compras. Use o relatório de receita do Flowo como uma das
                entradas, não como o demonstrativo final.
              </p>
              <GuideChecklist
                items={[
                  "Exporte ou registre a receita concluída do período",
                  "Concilie recebimentos digitais e dinheiro",
                  "Inclua despesas fixas e variáveis fora do Flowo",
                  "Valide impostos e obrigações com a contabilidade",
                  "Compare lucro e caixa, que não são a mesma coisa",
                ]}
              />
              <GuideScopeNote
                status="practice"
                title="Metas semanais são uma decisão de gestão"
              >
                Você pode criar metas com base nos relatórios, mas o Flowo não
                configura nem cobra automaticamente uma meta de caixa por
                profissional.
              </GuideScopeNote>
            </GuideSection>
          </GuideContent>

          <GuideCta
            title="Quer fechar agenda e receita no mesmo fluxo?"
            description="Use comandas e pagamentos no Flowo e mantenha a contabilidade com o responsável financeiro do negócio."
          />

          <GuidePrevNext
            currentPath={guide.path}
            next={{
              href: "/recursos/guias/escala-equipe",
              label: "Escala de Equipe",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
