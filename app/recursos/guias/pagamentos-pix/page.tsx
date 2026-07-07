import {
  CalendarCheck,
  CreditCard,
  MessageCircle,
  Shield,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideCallout,
  GuideCards,
  GuideChatSample,
  GuideChecklist,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideSection,
  GuideSteps,
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pagamentos com PIX no Atendimento",
  description:
    "Receba o pagamento do atendimento por PIX ou cartão direto pelo WhatsApp, com conta digital integrada e política de cancelamento clara.",
  path: "/recursos/guias/pagamentos-pix",
});

const tableOfContents = [
  { id: "como-funciona", label: "Como funciona o pagamento no atendimento" },
  { id: "configurando-conta", label: "Configurando sua conta" },
  { id: "cobranca-whatsapp", label: "Cobrança pelo WhatsApp" },
  { id: "politica-cancelamento", label: "Política de cancelamento" },
  { id: "comunicando-clientes", label: "Comunicando aos clientes" },
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
            readTime="12 min"
            title="Pagamentos com PIX na barbearia"
            lead="Receba o pagamento do atendimento por PIX ou cartão direto pelo WhatsApp. Sem maquininha na frente do espelho, sem conta pendente no fim do dia."
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="como-funciona"
              icon={CreditCard}
              title="Como funciona o pagamento no atendimento"
            >
              <p>
                No Flowo, o pagamento é uma comodidade do atendimento: depois
                que o horário está combinado, o cliente pode pagar por PIX ou
                cartão pelo próprio WhatsApp, ou na hora, como preferir. Agendar
                nunca depende de pagar. Contra faltas, o que trabalha é a{" "}
                <strong>confirmação automática pelo WhatsApp</strong>, não
                cobrança antecipada.
              </p>
              <GuideCards
                items={[
                  {
                    title: "Menos fricção no caixa",
                    description:
                      "O cliente paga pelo celular e sai da cadeira com tudo resolvido.",
                  },
                  {
                    title: "Tudo registrado",
                    description:
                      "Cada pagamento fica ligado ao atendimento e aparece no seu painel financeiro.",
                  },
                  {
                    title: "Sem constrangimento",
                    description:
                      "Nada de lembrar cliente de conta pendente: a cobrança chega no WhatsApp com o valor certo.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="configurando-conta"
              icon={Wallet}
              title="Configurando sua conta de recebimento"
            >
              <p>
                O Flowo usa uma conta digital integrada para processar seus
                pagamentos. Na configuração inicial, você cadastra:
              </p>
              <GuideSteps
                items={[
                  {
                    title: "Dados pessoais ou da empresa",
                    description: "CPF ou CNPJ, nome completo, data de nascimento.",
                  },
                  {
                    title: "Endereço comercial",
                    description: "Para fins de cadastro e segurança.",
                  },
                  {
                    title: "Telefone para verificação",
                    description: "Um SMS de confirmação será enviado.",
                  },
                ]}
              />
              <GuideCallout>
                Seus recebimentos caem na conta digital integrada e você
                transfere para sua conta bancária quando quiser.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="cobranca-whatsapp"
              icon={MessageCircle}
              title="Cobrança pelo WhatsApp"
            >
              <p>
                Você escolhe como oferecer o pagamento em cada atendimento:
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Pelo WhatsApp",
                    description:
                      "A IA envia o link de pagamento com o valor do serviço. O cliente paga por PIX ou cartão em segundos.",
                  },
                  {
                    title: "Na barbearia",
                    description:
                      "Prefere cobrar presencialmente? Sem problema: registre o pagamento na comanda e o financeiro continua fechando certinho.",
                  },
                ]}
              />
              <p>
                Nos dois caminhos o valor fica vinculado ao atendimento, então
                o relatório do dia bate sem contas manuais.
              </p>
            </GuideSection>

            <GuideSection
              id="politica-cancelamento"
              icon={Shield}
              title="Política de cancelamento clara"
            >
              <p>
                Uma política clara evita atrito e educa o cliente a avisar com
                antecedência. Exemplo simples que funciona:
              </p>
              <GuideChecklist
                items={[
                  "Cancelou com mais de 24h? Remarca sem burocracia.",
                  "Cancelou em cima da hora? O horário é liberado para a fila de espera.",
                  "Não apareceu? O histórico do cliente registra a falta.",
                ]}
              />
              <p>
                O Flowo comunica a política automaticamente quando o cliente
                agenda e registra o histórico de faltas de cada um. Sem
                surpresas para ninguém.
              </p>
            </GuideSection>

            <GuideSection
              id="comunicando-clientes"
              icon={CalendarCheck}
              title="Comunicando aos clientes"
            >
              <p>
                A chave é a transparência desde o início. Com o horário já
                confirmado, a IA do Flowo oferece o pagamento como opção:
              </p>
              <GuideChatSample
                customer="Fechou, sábado às 15h então!"
                reply="Confirmado, sábado às 15h com o João. Se quiser, já dá pra deixar pago por aqui via PIX ou cartão. Senão, paga na hora, sem problema."
              />
              <GuideChecklist
                items={[
                  "Ofereça o pagamento depois de confirmar o horário, nunca como condição",
                  "Seja claro sobre a política de cancelamento",
                  "Deixe o cliente escolher entre pagar online ou na barbearia",
                ]}
              />
            </GuideSection>
          </article>

          <GuideCta
            title="Ative pagamentos PIX no seu Flowo"
            description="Cobre o atendimento pelo WhatsApp e feche o caixa do dia sem contas manuais."
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
