import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { LEGAL_ENTITY, LEGAL_UPDATED_AT } from "@/lib/legal-identity";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Exclusão de Conta e Dados",
  description:
    "Como solicitar acesso, exportação, desconexão do WhatsApp ou exclusão de dados no Flowo.",
  path: "/exclusao-de-dados",
});

const sections: LegalSection[] = [
  {
    id: "solicitacoes",
    title: "Solicitações disponíveis",
    content: (
      <ul>
        <li>acesso e correção de dados pessoais;</li>
        <li>exportação dos dados do estabelecimento;</li>
        <li>desconexão da conta WhatsApp Business;</li>
        <li>exclusão da conta e dos dados sem obrigação de retenção;</li>
        <li>
          exclusão de dados de um cliente final pela barbearia controladora.
        </li>
      </ul>
    ),
  },
  {
    id: "como-solicitar",
    title: "Como solicitar",
    content: (
      <>
        <p>
          Um administrador autenticado pode iniciar o encerramento nas
          configurações da conta. Também é possível usar a{" "}
          <a
            className="underline underline-offset-4"
            href="https://barber.flowo.com.br/excluir-conta"
          >
            página segura de exclusão da conta
          </a>{" "}
          ou escrever para{" "}
          <a
            className="underline underline-offset-4"
            href={`mailto:${LEGAL_ENTITY.supportEmail}?subject=Exclus%C3%A3o%20de%20conta%20e%20dados`}
          >
            {LEGAL_ENTITY.supportEmail}
          </a>{" "}
          usando o e-mail cadastrado.
        </p>
        <p>
          Informe o estabelecimento, o e-mail da conta e o tipo de solicitação.
          Não envie senhas, tokens, documentos completos ou conteúdo de
          conversas por e-mail. Podemos pedir confirmação adicional de
          identidade e autoridade para proteger a conta.
        </p>
      </>
    ),
  },
  {
    id: "whatsapp",
    title: "Desconexão do WhatsApp",
    content: (
      <p>
        A desconexão interrompe o uso dos ativos e credenciais da conta
        WhatsApp Business pelo Flowo. Ela não exclui automaticamente a conta ou
        o histórico mantido pela Meta. Para exclusão diretamente na Meta ou no
        WhatsApp, use também as ferramentas oferecidas por essas plataformas.
      </p>
    ),
  },
  {
    id: "prazo-e-retencao",
    title: "Prazo e retenção",
    content: (
      <p>
        Confirmaremos o recebimento e responderemos nos prazos aplicáveis. Após
        a validação, eliminamos ou anonimizamos dados sem outra base de retenção.
        Alguns registros podem permanecer pelo período exigido para obrigações
        fiscais, prevenção de fraude, segurança, exercício de direitos ou ciclos
        limitados de backup, com acesso restrito e finalidade definida.
      </p>
    ),
  },
  {
    id: "clientes-finais",
    title: "Pedidos de clientes finais",
    content: (
      <p>
        Quando o pedido diz respeito ao cliente de uma barbearia, a barbearia é
        normalmente a controladora responsável por validar e instruir a
        solicitação. A Devled, operadora da plataforma Flowo nesse contexto,
        apoiará a execução conforme o contrato e a legislação aplicável.
      </p>
    ),
  },
  {
    id: "contato",
    title: "Contato",
    content: (
      <>
        <p>
          {LEGAL_ENTITY.name} — CNPJ {LEGAL_ENTITY.taxId}
          <br />
          {LEGAL_ENTITY.address}
          <br />
          {LEGAL_ENTITY.supportEmail}
        </p>
        <p>
          Consulte também a{" "}
          <Link className="underline underline-offset-4" href="/privacidade">
            Política de Privacidade
          </Link>{" "}
          e os{" "}
          <Link className="underline underline-offset-4" href="/termos">
            Termos de Uso
          </Link>
          .
        </p>
      </>
    ),
  },
];

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Exclusão de Conta e Dados"
      breadcrumbLabel="Exclusão de Dados"
      path="/exclusao-de-dados"
      updatedAt={LEGAL_UPDATED_AT}
      intro="Como titulares e estabelecimentos podem exercer direitos sobre dados tratados pelo Flowo, inclusive desconectar a integração com o WhatsApp Business."
      sections={sections}
    />
  );
}
