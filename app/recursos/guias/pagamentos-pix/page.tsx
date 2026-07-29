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
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pagamentos com PIX no Atendimento",
  description:
    "Ative a conta de recebimento e feche comandas com dinheiro, PIX ou cartão depois do serviço no Flowo.",
  path: "/recursos/guias/pagamentos-pix",
});

const tableOfContents = [
  { id: "regra", label: "A regra: pagamento depois do serviço" },
  { id: "ativacao", label: "Ative a conta de recebimento" },
  { id: "comanda", label: "Feche a comanda com o valor correto" },
  { id: "checkout", label: "PIX e cartão pelo checkout" },
  { id: "caixa", label: "Acompanhe saldo e histórico" },
];

export default function PixPaymentsGuidePage() {
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
              { label: "Pagamentos PIX", href: "#" },
            ]}
            readTime="10 min"
            title="Pagamentos com PIX na barbearia"
            lead="Receba depois de concluir o atendimento. O Flowo liga a forma de pagamento à comanda e mantém agenda, cliente e financeiro no mesmo fluxo."
          />

          <GuideAvailability
            items={[
              {
                label: "Formas de pagamento",
                value: "Dinheiro, PIX e cartão",
                description:
                  "O fechamento pode registrar dinheiro ou gerar uma cobrança digital vinculada ao atendimento.",
              },
              {
                label: "Momento da cobrança",
                value: "Depois do serviço",
                description:
                  "Não existe sinal, depósito ou pagamento obrigatório para reservar horário.",
              },
              {
                label: "Onde operar",
                value: "Painel web e app móvel",
                description:
                  "Comandas, checkout, histórico, chaves PIX e saldo têm superfícies operacionais nas duas experiências.",
              },
              {
                label: "Ativação",
                value: "Conta aprovada e dados válidos",
                description:
                  "Cobranças digitais dependem da conta de pagamento ativa e dos dados exigidos para o cliente.",
              },
            ]}
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="regra"
              icon={Shield}
              title="A regra: pagamento depois do serviço"
            >
              <p>
                No Flowo, agendamento e pagamento são etapas separadas. O cliente
                reserva sem pagar e a barbearia cobra quando o serviço foi
                realizado, pelo fechamento da comanda.
              </p>
              <GuideScopeNote title="Sem sinal e sem pagamento antecipado">
                PIX e cartão são opções para quitar o atendimento já prestado.
                Não use o checkout como condição para confirmar um horário.
              </GuideScopeNote>
              <GuideCallout title="Por que isso importa">
                Os relatórios de receita consideram atendimentos concluídos e
                comandas fechadas. Uma cobrança gerada antes da execução
                distorceria a operação e contraria a regra comercial do produto.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="ativacao"
              icon={Wallet}
              title="Ative a conta de recebimento"
            >
              <p>
                Para gerar PIX ou cartão, a barbearia precisa concluir o cadastro
                da conta de pagamento. Informe dados verdadeiros do titular ou da
                empresa e acompanhe o estado até aparecer como ativo.
              </p>
              <GuideSteps
                items={[
                  {
                    title: "Abra as configurações de pagamentos",
                    description:
                      "Use Configurações no painel web ou a área equivalente no app móvel.",
                  },
                  {
                    title: "Preencha o cadastro",
                    description:
                      "Informe CPF/CNPJ, responsável, telefone e endereço solicitados pelo fluxo.",
                  },
                  {
                    title: "Acompanhe a análise",
                    description:
                      "Cadastro pendente ou rejeitado ainda não permite uma cobrança digital real.",
                  },
                  {
                    title: "Cadastre a chave de retirada",
                    description:
                      "Depois da ativação, use uma chave PIX da própria barbearia para retirar saldo disponível.",
                  },
                ]}
              />
              <GuideScopeNote
                status="conditional"
                title="Saldo disponível não é igual a saldo futuro"
              >
                Valores de cartão podem levar tempo para liquidar. Saques e
                repasses só usam o saldo realmente disponível, não cobranças
                ainda pendentes.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="comanda"
              icon={ReceiptText}
              title="Feche a comanda com o valor correto"
            >
              <p>
                A comanda reúne serviços, produtos, descontos e o profissional
                responsável. Revise os itens antes de escolher a forma de
                pagamento.
              </p>
              <GuideChecklist
                items={[
                  "Confirme serviço, produto, quantidade e desconto",
                  "Vincule o profissional correto quando o item gerar comissão",
                  "Use dinheiro quando o valor já foi recebido presencialmente",
                  "Gere PIX ou cartão apenas para o total final da comanda",
                  "Não crie uma segunda cobrança se já existir uma pendente válida",
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Comandas",
                    action:
                      "abra o atendimento, revise os itens e escolha como fechar.",
                  },
                  {
                    surface: "App móvel",
                    path: "Comandas",
                    action:
                      "faça o mesmo fluxo e compartilhe o checkout quando necessário.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="checkout"
              icon={CreditCard}
              title="PIX e cartão pelo checkout"
            >
              <p>
                Para PIX, o Flowo gera QR Code e código copia e cola. Para
                cartão, abre um checkout protegido. O link pode ser compartilhado
                com o cliente depois do atendimento, inclusive pelo WhatsApp
                quando o canal estiver conectado.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "PIX",
                    description:
                      "A cobrança pendente válida é reaproveitada; uma expirada pode ser regenerada sem duplicar o pagamento.",
                  },
                  {
                    title: "Cartão",
                    description:
                      "O checkout valida os dados e acompanha aprovação, pendência ou recusa antes de fechar a comanda.",
                  },
                ]}
              />
              <GuideScopeNote
                status="conditional"
                title="Há requisitos mínimos do provedor"
              >
                Cobranças digitais exigem valor mínimo de R$ 5,00 e CPF/CNPJ
                válido do cliente. Se esses dados faltarem, use uma forma
                presencial ou corrija o cadastro.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="caixa"
              icon={Wallet}
              title="Acompanhe saldo e histórico"
            >
              <p>
                Em Financeiro, acompanhe pagamentos, saldo disponível, valores
                pendentes e retiradas. Esse controle é operacional; ele não
                substitui contabilidade, conciliação fiscal ou demonstrativo de
                lucro.
              </p>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Financeiro → Histórico / Chaves PIX",
                    action:
                      "consulte transações e gerencie os destinos de retirada.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → Financeiro",
                    action:
                      "acompanhe saldo, pagamentos, histórico e retirada.",
                  },
                ]}
              />
            </GuideSection>
          </article>

          <GuideCta
            title="Quer fechar o atendimento sem separar agenda e caixa?"
            description="Use comandas para registrar o serviço e receber por dinheiro, PIX ou cartão depois da execução."
          />

          <GuidePrevNext
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
