import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { LEGAL_ENTITY, LEGAL_UPDATED_AT } from "@/lib/legal-identity";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Termos de Uso da Plataforma",
  description:
    "Condições de contratação e uso da plataforma Flowo para barbearias e negócios de serviços no Brasil.",
  path: "/termos",
});

const sections: LegalSection[] = [
  {
    id: "contratacao-e-aceite",
    title: "Contratação e aceite",
    content: (
      <>
        <p>
          A Flowo é um produto operado por <strong>{LEGAL_ENTITY.name}</strong>,
          inscrita no CNPJ sob nº <strong>{LEGAL_ENTITY.taxId}</strong>, com sede
          em {LEGAL_ENTITY.address}.
        </p>
        <p>
          Ao criar uma conta, aceitar uma proposta ou usar o serviço em nome de
          uma empresa, você declara ter capacidade e autorização para vinculá-la
          a estes termos. A criação da conta exige aceite expresso destes Termos
          de Uso e reconhecimento da{" "}
          <Link className="underline underline-offset-4" href="/privacidade">
            Política de Privacidade
          </Link>
          .
        </p>
        <p>
          A candidatura para implantação não cria assinatura nem cobrança. A
          contratação ocorre somente pelo fluxo comercial ou checkout que
          apresente plano, preço, ciclo e condições aplicáveis.
        </p>
      </>
    ),
  },
  {
    id: "servico",
    title: "O que a Flowo fornece",
    content: (
      <>
        <p>
          A Flowo reúne agenda, cadastro, atendimento por canais conectados,
          clientes, comandas, pagamentos, relatórios e outros módulos
          contratados. Certas funções dependem de configuração, aprovação,
          credencial ou cobertura de fornecedores externos.
        </p>
        <p>
          Materiais de demonstração são identificados como exemplos.
          Indicadores, calculadoras e projeções não garantem receita, economia,
          disponibilidade de agenda ou resultado comercial.
        </p>
      </>
    ),
  },
  {
    id: "conta-e-equipe",
    title: "Conta, acesso e equipe",
    content: (
      <ul>
        <li>mantenha dados de cadastro, funções e permissões corretos;</li>
        <li>proteja credenciais e informe suspeita de acesso indevido;</li>
        <li>não compartilhe contas pessoais nem contorne limites de acesso;</li>
        <li>responda pelas ações dos usuários autorizados da organização.</li>
      </ul>
    ),
  },
  {
    id: "responsabilidade",
    title: "Responsabilidade da barbearia",
    content: (
      <>
        <p>
          A barbearia decide quais dados cadastra, quais mensagens envia, quais
          integrações ativa e quais serviços oferece. Ela deve cumprir regras de
          consumo, privacidade, trabalho, tributação, publicidade, opt-out e
          relacionamento com seus clientes, além de manter preços, agenda,
          equipe e políticas atualizados.
        </p>
        <p>
          A Flowo não substitui aconselhamento jurídico, contábil, fiscal,
          trabalhista ou financeiro. A emissão de documentos e o processamento
          de pagamentos dependem de dados e credenciais corretos e das regras do
          fornecedor aplicável.
        </p>
      </>
    ),
  },
  {
    id: "ia-e-mensagens",
    title: "IA, mensagens e confirmação humana",
    content: (
      <>
        <p>
          A automação pode interpretar linguagem natural e executar funções
          autorizadas. Respostas podem ser incompletas ou exigir correção. O
          negócio deve acompanhar exceções, handoffs e ações sensíveis e não
          deve instruir a IA a enganar, discriminar, assediar, violar direitos
          ou realizar atividade ilícita.
        </p>
        <p>
          WhatsApp, e-mail, SMS, calendário, pagamentos e fiscal dependem de
          terceiros e podem ter políticas, limites, aprovações,
          indisponibilidades e tarifas próprias.
        </p>
        <p>
          Para disponibilizar o WhatsApp, a Flowo pode utilizar a Meta,
          responsável pela WhatsApp Business Platform, e a YCloud, atualmente
          contratada como provedora técnica e suboperadora de mensageria. Esses
          fornecedores podem processar identificadores da conta, números de
          telefone, modelos, mensagens, mídias e estados de entrega estritamente
          para operar, proteger e dar suporte ao canal.
        </p>
        <p>
          A relação comercial, o suporte e a cobrança do cliente permanecem com
          a Flowo, salvo acordo escrito em contrário. O cliente não precisa
          contratar ou receber uma fatura separada da YCloud.
        </p>
      </>
    ),
  },
  {
    id: "planos-e-cobranca",
    title: "Planos, cobrança e taxas",
    content: (
      <>
        <p>
          O preço público inicial exibido no site é R$ 379 por mês para o plano
          Solo, salvo atualização, oferta ou contrato específico. Em casos
          elegíveis, a Flowo pode liberar uma avaliação assistida de 14 dias,
          sem cartão e sem renovação automática, somente para Solo ou Equipe.
          A proposta ou checkout informa preço aceito, ciclo, limites e eventual
          data de renovação.
        </p>
        <p>
          Custos de processadores, mensageria, emissão fiscal, excedentes ou
          add-ons são incorporados ou discriminados pela Flowo conforme o plano
          ou contrato. O cliente recebe a cobrança da Flowo e não uma cobrança
          separada dos suboperadores técnicos, salvo contratação específica
          apresentada e aceita previamente.
        </p>
      </>
    ),
  },
  {
    id: "uso-aceitavel",
    title: "Uso aceitável",
    content: (
      <p>
        É proibido usar o serviço para fraude, spam, invasão, engenharia reversa
        ilícita, malware, violação de privacidade, conteúdo ilegal, abuso de
        APIs, tentativa de acessar outra organização ou contorno de cobrança e
        segurança. Podemos limitar ou suspender o acesso necessário para
        proteger pessoas, dados, fornecedores e a plataforma.
      </p>
    ),
  },
  {
    id: "dados-e-propriedade",
    title: "Dados, propriedade e exportação",
    content: (
      <>
        <p>
          A barbearia mantém seus direitos sobre os dados que insere e concede
          as permissões necessárias para a Flowo processá-los e prestar o
          serviço. A Flowo mantém direitos sobre software, marca, documentação,
          modelos, design e melhorias que não incorporem dados identificáveis do
          cliente.
        </p>
        <p>
          Exportações e retenção seguem o produto, o contrato e a{" "}
          <Link className="underline underline-offset-4" href="/privacidade">
            Política de Privacidade
          </Link>
          . Solicitações de desconexão e exclusão seguem a página de{" "}
          <Link
            className="underline underline-offset-4"
            href="/exclusao-de-dados"
          >
            Exclusão de Conta e Dados
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "disponibilidade",
    title: "Disponibilidade, suporte e mudanças",
    content: (
      <>
        <p>
          Buscamos operação confiável, mas não prometemos serviço sem
          interrupção. Manutenção, internet, dispositivo, loja de aplicativos e
          fornecedores podem afetar o acesso. Metas formais de serviço só se
          aplicam quando constarem no contrato.
        </p>
        <p>
          Mudanças materiais de preço ou termos serão comunicadas conforme o
          contrato e a legislação aplicável.
        </p>
      </>
    ),
  },
  {
    id: "cancelamento",
    title: "Cancelamento, suspensão e encerramento",
    content: (
      <p>
        O cliente pode solicitar cancelamento pelo fluxo disponível ou pelo
        suporte, observando ciclo, aviso e obrigações da contratação. Podemos
        suspender acesso por inadimplência, risco, uso proibido ou exigência
        legal. Após o encerramento, exportação, retenção e eliminação seguem o
        contrato, a Política de Privacidade e os prazos obrigatórios.
      </p>
    ),
  },
  {
    id: "legislacao",
    title: "Responsabilidade e legislação",
    content: (
      <p>
        Cada parte responde por seus atos e pelas obrigações que a lei não
        permite excluir. A alocação específica de responsabilidade, limites
        indenizatórios e solução de conflitos consta no contrato comercial
        quando aplicável. Estes termos são regidos pelas leis brasileiras,
        preservados os direitos irrenunciáveis do consumidor e demais normas
        obrigatórias.
      </p>
    ),
  },
  {
    id: "contato",
    title: "Contato",
    content: (
      <p>
        {LEGAL_ENTITY.name} — CNPJ {LEGAL_ENTITY.taxId}
        <br />
        {LEGAL_ENTITY.address}
        <br />
        Dúvidas de conta, cancelamento, segurança ou termos:{" "}
        <a
          className="underline underline-offset-4"
          href={`mailto:${LEGAL_ENTITY.supportEmail}`}
        >
          {LEGAL_ENTITY.supportEmail}
        </a>
        .
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Termos de Uso"
      breadcrumbLabel="Termos de Uso"
      path="/termos"
      updatedAt={LEGAL_UPDATED_AT}
      intro="Estas condições regulam o acesso ao site, à plataforma e ao aplicativo Flowo."
      sections={sections}
    />
  );
}
