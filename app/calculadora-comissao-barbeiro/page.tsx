import type { Metadata } from "next";
import { CommissionCalculator } from "@/components/marketing/growth-tools/commission-calculator";
import { GrowthToolLanding } from "@/components/marketing/growth-tools/growth-tool-landing";
import { GrowthToolSchema } from "@/components/marketing/growth-tools/growth-tool-schema";
import { buildMetadata } from "@/lib/seo";

const PATH = "/calculadora-comissao-barbeiro";
const TITLE = "Calculadora de Comissão de Barbeiro | Simulação Gratuita Flowo";
const DESCRIPTION =
  "Simule comissão por serviços e produtos, registre ajustes e baixe um checklist de fechamento para conferir o acerto da equipe.";

const faqs = [
  {
    question: "A simulação substitui contador ou contrato?",
    answer:
      "Não. A ferramenta mostra a conta por escrito. Vínculo, impostos, pagamento e documentos precisam de contador e orientação trabalhista.",
  },
  {
    question: "Posso usar percentuais diferentes para serviço e produto?",
    answer:
      "Sim. A simulação separa as duas bases para deixar a regra visível. Se sua operação possui mais faixas, faça uma simulação para cada regra.",
  },
  {
    question: "Como entram descontos e estornos?",
    answer:
      "Nesta ferramenta, você informa um valor de ajuste que reduz a base de serviços. A política real precisa dizer quando cada desconto ou estorno entra no acerto.",
  },
  {
    question: "O Flowo controla comissões?",
    answer:
      "Sim, no plano Empresarial. O gestor revisa a comissão de cada barbeiro a partir das comandas fechadas e inicia o repasse.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  absoluteTitle: true,
});

export default function CommissionCalculatorPage() {
  return (
    <>
      <GrowthToolSchema
        path={PATH}
        title={TITLE}
        description={DESCRIPTION}
        name="Calculadora de Comissão de Barbeiro"
        faqs={faqs}
      />
      <GrowthToolLanding
        content={{
          kind: "commission",
          campaign: true,
          navCta: "Baixar checklist",
          kicker: "Simulador gratuito de fechamento da equipe",
          title: (
            <>
              Faça o acerto com a <strong>regra à vista.</strong>
            </>
          ),
          lead:
            "Separe serviços, produtos e ajustes e veja de onde saiu a comissão. Fácil de conferir antes de pagar.",
          trust: [
            "Resultado sem cadastro",
            "Serviço e produto separados",
            "Sem esconder a base",
          ],
          tool: <CommissionCalculator />,
          problemLabel: "O problema raramente é só a porcentagem.",
          problemTitle:
            "Desconto, produto e estorno entram na conversa quando o total já chegou.",
          problemCopy:
            "Sem uma memória comum, dono e barbeiro refazem a mesma conta com regras diferentes. O fechamento vira discussão mesmo quando ninguém tentou errar.",
          sectionLabel: "Fechamento que dá para conferir",
          sectionTitle: "Escreva a regra antes de apertar a calculadora.",
          sectionCopy:
            "A simulação organiza as bases, mas a política da barbearia precisa responder o que entra, quando conta e como uma correção aparece no período seguinte.",
          steps: [
            {
              title: "Feche as comandas",
              copy:
                "Use atendimentos concluídos como origem. Não some agenda futura, orçamento ou venda ainda aberta.",
            },
            {
              title: "Separe as bases",
              copy:
                "Serviço e produto podem ter regras diferentes. Registre cada uma sem misturar os percentuais.",
            },
            {
              title: "Mostre os ajustes",
              copy:
                "Descontos, estornos e adiantamentos precisam aparecer em linha própria e com responsável.",
            },
            {
              title: "Confira antes de pagar",
              copy:
                "Compartilhe a memória com o barbeiro e corrija divergências enquanto o período ainda está aberto.",
            },
          ],
          materialTitle: "Fechamento da equipe",
          materialSubtitle:
            "Política de comissão, folha de conferência e checklist para fechar o período.",
          materialItems: [
            "Modelo para escrever a regra de cada profissional e sua vigência.",
            "Conferência separada de serviços, produtos, descontos e estornos.",
            "Roteiro de sete passos do fechamento ao comprovante.",
            "Campos para aprovação e registro de diferenças.",
          ],
          formTitle: "Baixe o fechamento que explica a conta.",
          formCopy:
            "O PDF ajuda a combinar as regras com a equipe e deixa um caminho de conferência antes do pagamento.",
          formNotes: [
            "Material prático. Não é parecer de contador ou advogado.",
            "Nome e e-mail liberam o PDF.",
            "WhatsApp e marketing são opcionais.",
          ],
          formConfig: {
            resourceId: "fechamento_equipe",
            resourceUrl: "/downloads/fechamento-equipe-flowo.pdf",
            source: "download:fechamento-equipe",
            submitLabel: "Baixar meu checklist de fechamento",
            successTitle: "Seu checklist Fechamento da Equipe está pronto.",
            productCtaLabel: "Conhecer comandas e gestão de equipe",
            productCtaHref: "/recursos/comissoes-barbeiros",
          },
          faqs,
        }}
      />
    </>
  );
}
