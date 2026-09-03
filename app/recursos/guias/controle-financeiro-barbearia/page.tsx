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
import { GuideHonesty, GuideScreenshot } from "@/app/recursos/_components/guide-media";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/controle-financeiro-barbearia");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "limite", label: "O que a Flowo controla" },
  { id: "fechamento", label: "Feche cada atendimento" },
  { id: "saldo", label: "Recebido, pendente e disponível" },
  { id: "custos", label: "Custos e lucro ficam fora do painel" },
];

export default function FinancialControlGuidePage() {
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
            lead="A Flowo controla a receita dos atendimentos. Custos, lucro, impostos e contabilidade continuam com você e seu contador."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Operação",
                value: "Comandas e pagamentos",
                description: "Serviço, produto, desconto e forma de pagamento ficam ligados ao atendimento.",
              },
              {
                label: "Financeiro",
                value: "Saldo, histórico e saques",
                description: "Veja o que já está disponível e o que ainda está pendente.",
              },
              {
                label: "Métricas",
                value: "Receita concluída",
                description: "O relatório conta atendimentos concluídos e compara períodos.",
              },
              {
                label: "Não entra",
                value: "DRE e contabilidade",
                description: "Aluguel, folha, impostos e lucro líquido não são calculados pelo painel.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="limite" icon={BookOpenCheck} title="O que a Flowo controla">
              <GuideCards
                items={[
                  {
                    title: "Receita do atendimento",
                    description: "Serviços e produtos das comandas fechadas.",
                  },
                  {
                    title: "PIX e cartão pela Flowo",
                    description: "Com os estados de pendente, confirmado, recebido e estornado.",
                  },
                  {
                    title: "Dinheiro e maquininha",
                    description: "Registro do que foi recebido no balcão, ao fechar a comanda.",
                  },
                  {
                    title: "Saldo da conta",
                    description: "O que já pode ser sacado e o que ainda está liquidando.",
                  },
                ]}
              />
              <GuideScopeNote status="practice" title="Receita não é lucro">
                A receita na Flowo não desconta aluguel, folha, produto gasto nem imposto. Para
                chegar ao lucro, use seu contador e uma rotina financeira própria.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="fechamento" icon={ReceiptText} title="Feche cada atendimento">
              <GuideChecklist
                items={[
                  "Abra a comanda no cliente certo",
                  "Inclua só o que saiu de verdade",
                  "Aplique desconto antes de gerar a cobrança",
                  "Registre como recebeu",
                  "Resolva pendências antes de fechar o dia",
                ]}
              />
              <GuideCallout title="O relatório começa na comanda">
                Serviço recebido fora da Flowo ou comanda deixada aberta não entram direito na
                leitura do período.
              </GuideCallout>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Comandas",
                    action: "registre e feche cada atendimento com os itens certos.",
                  },
                  {
                    surface: "App",
                    path: "Comandas",
                    action: "feche na hora, com PIX, cartão, maquininha ou dinheiro.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="saldo" icon={Wallet} title="Recebido, pendente e disponível">
              <p>
                Uma cobrança confirmada pode ainda estar liquidando. Não trate o total vendido
                como dinheiro que já pode sair.
              </p>
              <GuideScreenshot
                src="/images/product/dashboard-financeiro.png"
                alt="Tela Financeiro da Flowo: saldo disponível, recebido no dia, valor em aberto e o que vai para a equipe"
                caption="Tela Financeiro, com dados ilustrativos. Cada linha vem de uma comanda recebida."
                height={1082}
              />
              <GuideCards
                items={[
                  {
                    title: "Receita concluída",
                    description: "O valor dos atendimentos que aconteceram.",
                  },
                  {
                    title: "Pagamento pendente",
                    description: "Cobrança criada, ainda sem confirmação.",
                  },
                  {
                    title: "Saldo disponível",
                    description: "Já liquidado. Pode virar saque ou repasse autorizado.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Financeiro → Histórico",
                    action: "veja pagamentos e estados antes de sacar.",
                  },
                  {
                    surface: "App",
                    path: "Mais → Financeiro",
                    action: "saldo, pagamentos, chaves PIX e saques.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="custos" icon={BarChart3} title="Custos e lucro ficam fora do painel">
              <p>
                Mantenha uma rotina separada para despesas, impostos, pró-labore, folha e compras.
                O relatório de receita da Flowo é uma das entradas, não o resultado final.
              </p>
              <GuideChecklist
                items={[
                  "Anote a receita concluída do período",
                  "Bata PIX, cartão, maquininha e dinheiro",
                  "Some despesas fixas e variáveis fora da Flowo",
                  "Confira impostos com a contabilidade",
                  "Compare lucro e caixa: não são a mesma coisa",
                ]}
              />
              <GuideScopeNote status="practice" title="Meta semanal é decisão sua">
                Você pode criar metas a partir do relatório, mas a Flowo não configura nem cobra
                meta de caixa por barbeiro.
              </GuideScopeNote>
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "Comandas, formas de pagamento, saldo disponível e saque: conferidos no produto em 3 de setembro de 2026.",
            ]}
            notMeasured={[
              "Tempo economizado no fechamento do caixa em barbearias reais.",
            ]}
          />

          <GuideCta
            title="Quer fechar agenda e receita no mesmo lugar?"
            description="Use comandas e pagamentos na Flowo e deixe a contabilidade com quem cuida do financeiro."
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
