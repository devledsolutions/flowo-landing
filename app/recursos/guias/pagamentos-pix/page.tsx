import { CreditCard, ReceiptText, Shield, Wallet } from "lucide-react";
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
import { GuideHonesty, GuideScreenshot } from "@/app/recursos/_components/guide-media";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/pagamentos-pix");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "regra", label: "A regra: pagar depois do serviço" },
  { id: "ativacao", label: "Ative a conta de recebimento" },
  { id: "comanda", label: "Feche a comanda com o valor certo" },
  { id: "checkout", label: "PIX e cartão pela Flowo" },
  { id: "caixa", label: "Acompanhe saldo e histórico" },
];

export default function PixPaymentsGuidePage() {
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
              { label: "Pagamentos PIX", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Pagamentos com PIX na barbearia"
            lead="Receba depois do corte. A comanda guarda o serviço, o barbeiro e a forma de pagamento no mesmo lugar."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Como receber",
                value: "Dinheiro, maquininha, PIX e cartão",
                description: "Dinheiro e maquininha própria são só registro. PIX e cartão pela Flowo geram a cobrança.",
              },
              {
                label: "Quando",
                value: "Depois do serviço",
                description: "Não existe sinal, depósito nem pagamento para reservar horário.",
              },
              {
                label: "Onde",
                value: "Painel e app",
                description: "Comandas, cobrança, histórico, chaves PIX e saldo nos dois.",
              },
              {
                label: "Ativação",
                value: "Conta aprovada",
                description: "PIX e cartão pela Flowo pedem a conta de recebimento ativa e dados do cliente.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="regra" icon={Shield} title="A regra: pagar depois do serviço">
              <p>
                Na Flowo, agendar e pagar são etapas separadas. O cliente reserva sem pagar. A
                barbearia cobra quando o serviço foi feito, ao fechar a comanda.
              </p>
              <GuideScopeNote title="Sem sinal e sem pagamento antecipado">
                PIX e cartão servem para quitar o atendimento feito. Não use a cobrança como
                condição para confirmar horário.
              </GuideScopeNote>
              <GuideCallout title="Por que isso importa">
                O relatório de receita conta atendimentos concluídos e comandas fechadas. Uma
                cobrança antes do corte bagunçaria esses números.
              </GuideCallout>
            </GuideSection>

            <GuideSection id="ativacao" icon={Wallet} title="Ative a conta de recebimento">
              <p>
                Para gerar PIX ou cartão pela Flowo, a barbearia conclui o cadastro da conta de
                recebimento. Informe dados verdadeiros e acompanhe até aparecer como ativa.
              </p>
              <GuideSteps
                items={[
                  {
                    title: "Abra as configurações de pagamento",
                    description: "Em Configurações no painel, ou na área equivalente do app.",
                  },
                  {
                    title: "Preencha o cadastro",
                    description: "CPF ou CNPJ, responsável, telefone e endereço.",
                  },
                  {
                    title: "Espere a análise",
                    description: "Cadastro pendente ou recusado ainda não gera cobrança de verdade.",
                  },
                  {
                    title: "Cadastre a chave PIX de saque",
                    description: "Uma chave da própria barbearia, para retirar o saldo disponível.",
                  },
                ]}
              />
              <GuideScopeNote status="conditional" title="Saldo disponível não é saldo futuro">
                Cartão pode levar dias para liquidar. Saques e repasses usam só o que já está
                disponível, não o que ainda está pendente.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="comanda" icon={ReceiptText} title="Feche a comanda com o valor certo">
              <p>
                A comanda reúne serviços, produtos, desconto e o barbeiro. Revise os itens antes
                de escolher como receber.
              </p>
              <GuideScreenshot
                src="/images/product/dashboard-comandas.png"
                alt="Tela Comandas da Flowo: comanda aberta com corte e barba, botões para adicionar serviço, produto e desconto, e as opções Dinheiro, Maquininha, PIX Flowo e Cartão Flowo"
              />
              <GuideChecklist
                items={[
                  "Confira serviço, produto, quantidade e desconto",
                  "Ligue o barbeiro certo quando o item gera comissão",
                  "Use dinheiro ou maquininha quando já recebeu no balcão",
                  "Gere PIX ou cartão só pelo total final da comanda",
                  "Não crie outra cobrança se já existe uma pendente válida",
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Comandas",
                    action: "abra o atendimento, revise os itens e escolha como fechar.",
                  },
                  {
                    surface: "App",
                    path: "Comandas",
                    action: "o mesmo fechamento, e compartilhe a cobrança quando precisar.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="checkout" icon={CreditCard} title="PIX e cartão pela Flowo">
              <p>
                Para PIX, a Flowo gera o QR Code e o código copia e cola. Para cartão, abre uma
                página de pagamento protegida. O link pode ir para o cliente depois do corte,
                inclusive pelo WhatsApp conectado.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "PIX",
                    description: "A cobrança pendente é reaproveitada. Uma vencida pode ser gerada de novo sem duplicar.",
                  },
                  {
                    title: "Cartão",
                    description: "A página confere os dados e acompanha aprovação, pendência ou recusa antes de fechar.",
                  },
                ]}
              />
              <GuideScopeNote status="conditional" title="Tem valor mínimo e dados do cliente">
                Cobrança pela Flowo pede no mínimo R$ 5,00 e CPF ou CNPJ válido do cliente. Se
                faltar, receba no balcão ou corrija o cadastro.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="caixa" icon={Wallet} title="Acompanhe saldo e histórico">
              <p>
                Em Financeiro, veja pagamentos, saldo disponível, valores pendentes e saques. É
                um controle da operação. Não substitui contador nem conciliação fiscal.
              </p>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Financeiro → Histórico / Chaves PIX",
                    action: "consulte os pagamentos e as chaves de saque.",
                  },
                  {
                    surface: "App",
                    path: "Mais → Financeiro",
                    action: "saldo, pagamentos, histórico e saque.",
                  },
                ]}
              />
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "Fechar comanda, gerar PIX e cartão e ver o saldo: conferidos no produto em 3 de setembro de 2026.",
              "Valor mínimo de R$ 5,00 por cobrança: conferido no produto na mesma data.",
            ]}
            notMeasured={[
              "Quanto do recebimento das barbearias passa a ser por PIX ou cartão pela Flowo.",
              "Tempo economizado no fechamento do caixa.",
            ]}
          />

          <GuideCta
            title="Quer fechar o atendimento sem separar agenda e caixa?"
            description="Use a comanda para registrar o serviço e receber em dinheiro, maquininha, PIX ou cartão depois do corte."
          />

          <GuidePrevNext
            currentPath={guide.path}
            next={{
              href: "/recursos/guias/configurando-whatsapp",
              label: "Configurando WhatsApp",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
