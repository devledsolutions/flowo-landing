import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { LEGAL_ENTITY, LEGAL_UPDATED_AT } from "@/lib/legal-identity";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de Privacidade",
  description:
    "Como a Flowo coleta, utiliza, compartilha, protege e elimina dados pessoais em conformidade com a LGPD.",
  path: "/privacidade",
});

const externalLinkClass = "underline underline-offset-4";

const sections: LegalSection[] = [
  {
    id: "agentes-de-tratamento",
    title: "Quem participa do tratamento",
    content: (
      <>
        <p>
          A Flowo é um produto operado por <strong>{LEGAL_ENTITY.name}</strong>,
          inscrita no CNPJ sob nº <strong>{LEGAL_ENTITY.taxId}</strong>, com sede
          em {LEGAL_ENTITY.address}.
        </p>
        <p>
          Para dados da própria barbearia, usuários da conta, visitantes,
          candidatos e contatos comerciais, a Devled normalmente atua como
          controladora. Para dados de clientes tratados por instrução da
          barbearia — como cadastro, agenda, conversa e pagamento — a barbearia
          normalmente define as finalidades e atua como controladora, enquanto a
          Devled opera a plataforma Flowo em seu nome. A função exata depende do
          contexto e do contrato aplicável.
        </p>
      </>
    ),
  },
  {
    id: "dados-tratados",
    title: "Dados que podemos tratar",
    content: (
      <>
        <ul>
          <li>identificação, contato, autenticação, função e vínculo;</li>
          <li>
            dados do negócio, serviços, profissionais, horários, clientes e
            preferências;
          </li>
          <li>
            agendamentos, comandas, pagamentos, repasses, documentos fiscais e
            histórico operacional;
          </li>
          <li>
            mensagens e mídias enviadas pelos canais conectados, quando
            necessárias ao atendimento;
          </li>
          <li>
            identificadores da conta WhatsApp Business, número comercial,
            modelos e eventos de envio, entrega, leitura e falha;
          </li>
          <li>
            dispositivo, endereço IP, logs, eventos de segurança e uso do
            produto;
          </li>
          <li>pedidos de suporte, candidatura comercial e pesquisas.</li>
        </ul>
        <p>
          Testes controlados usam dados fictícios ou destinatários autorizados e
          ficam restritos a organizações identificadas para essa finalidade.
          Não utilizamos dados de clientes reais para homologação sem uma
          finalidade, autorização e proteção compatíveis.
        </p>
      </>
    ),
  },
  {
    id: "finalidades-e-bases",
    title: "Para que e com qual fundamento",
    content: (
      <>
        <p>
          Tratamos dados para fornecer e proteger o serviço, autenticar usuários,
          executar agenda e atendimento, processar cobranças, integrar
          provedores, prestar suporte, cumprir obrigações legais, prevenir fraude
          e medir a operação.
        </p>
        <p>
          Conforme o contexto, o tratamento pode se apoiar na execução de
          contrato ou procedimentos preliminares, cumprimento de obrigação legal
          ou regulatória, exercício regular de direitos, legítimo interesse com
          salvaguardas, proteção ao crédito ou consentimento quando exigido. A
          barbearia é responsável por definir e comunicar a base adequada para
          os dados que insere e as mensagens que envia aos seus clientes.
        </p>
      </>
    ),
  },
  {
    id: "ia-e-automacao",
    title: "Inteligência artificial e automação",
    content: (
      <>
        <p>
          A Flowo pode interpretar mensagens, consultar dados autorizados e
          sugerir ou executar ações dentro das permissões da conta. A plataforma
          registra resultado, correção e intervenção humana nos fluxos medidos.
          Ações financeiras, destrutivas, sensíveis ou incertas devem observar
          confirmações e controles humanos previstos no produto.
        </p>
        <p>
          O titular pode pedir informações e, quando a lei aplicar, revisão de
          decisões tomadas unicamente por tratamento automatizado que afetem
          seus interesses.
        </p>
      </>
    ),
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento e operadores",
    content: (
      <>
        <p>
          Compartilhamos apenas o necessário com fornecedores de infraestrutura,
          autenticação, mensagens, IA, e-mail, calendário, pagamentos, emissão
          fiscal, monitoramento e análise. Cada integração depende da
          configuração da conta. Também podemos compartilhar dados para cumprir
          lei, ordem válida, defender direitos ou lidar com incidente.
        </p>
        <p>
          Quando o canal WhatsApp é ativado, utilizamos atualmente:
        </p>
        <ul>
          <li>
            <strong>Meta Platforms / WhatsApp:</strong> responsável pela
            WhatsApp Business Platform, conta comercial, análises de nome de
            exibição e modelos e transporte do canal. Pode receber
            identificadores da empresa e da conta, números, modelos, mensagens,
            mídias e dados de entrega. Consulte os{" "}
            <a
              className={externalLinkClass}
              href="https://www.whatsapp.com/legal/business-terms"
              target="_blank"
              rel="noreferrer"
            >
              Termos do WhatsApp Business
            </a>{" "}
            e a{" "}
            <a
              className={externalLinkClass}
              href="https://www.whatsapp.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Política de Privacidade do WhatsApp
            </a>
            .
          </li>
          <li>
            <strong>YCloud:</strong> provedora técnica e suboperadora utilizada
            atualmente para conectar e administrar números, contas, modelos e
            tráfego do WhatsApp em nome da Flowo. Pode processar identificadores
            da conta e do negócio, contatos, números, modelos, mensagens, mídias,
            conversas, estados de entrega e registros técnicos necessários à
            operação e ao suporte. Consulte a{" "}
            <a
              className={externalLinkClass}
              href="https://www.ycloud.com/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Política de Privacidade da YCloud
            </a>
            .
          </li>
          <li>
            <strong>Twilio Segment e PostHog:</strong> usados, após autorização
            de cookies analíticos, para medir páginas, origem de campanha,
            interações, cadastro e onboarding. Podem processar identificadores
            técnicos, dados de dispositivo e eventos de uso. Nome e contato só
            são associados quando a pessoa envia voluntariamente um formulário
            ou cria uma conta.
          </li>
          <li>
            <strong>Resend:</strong> usado para e-mails operacionais e,
            separadamente, para comunicações de marketing quando a pessoa
            fornece um e-mail e marca o opt-in opcional. O aceite necessário
            para responder a um pedido de contato ou entregar um material não
            inscreve automaticamente a pessoa em marketing. O descadastro e as
            preferências podem ser alterados pelos links presentes nos e-mails.
          </li>
        </ul>
        <p>
          A Flowo pode substituir ou adicionar suboperadores equivalentes,
          mantendo salvaguardas contratuais e atualizando esta política quando a
          mudança for relevante. Isso não altera quem presta suporte ou cobra o
          cliente.
        </p>
        <p>
          Alguns fornecedores podem processar dados fora do Brasil. Nesses
          casos, adotamos os mecanismos de transferência e proteção exigidos
          pela legislação aplicável.
        </p>
      </>
    ),
  },
  {
    id: "retencao-e-eliminacao",
    title: "Retenção, exportação e eliminação",
    content: (
      <>
        <p>
          Conservamos dados enquanto necessários ao serviço, segurança,
          auditoria, prevenção de fraude e prazos legais ou contratuais. Depois,
          eliminamos ou anonimizamos quando não existir outra base de retenção.
          Registros financeiros, fiscais e de segurança podem precisar ser
          preservados.
        </p>
        <p>
          O usuário pode iniciar a exclusão pelo aplicativo ou seguir a página
          pública de{" "}
          <Link className={externalLinkClass} href="/exclusao-de-dados">
            Exclusão de Conta e Dados
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "seguranca",
    title: "Segurança e incidentes",
    content: (
      <p>
        Aplicamos controles de acesso por função, isolamento entre organizações,
        autenticação, registros de auditoria, proteção de segredos, validação de
        webhooks, idempotência e monitoramento. Nenhum sistema é infalível.
        Eventos relevantes são investigados e comunicados aos envolvidos e às
        autoridades quando a legislação exigir.
      </p>
    ),
  },
  {
    id: "direitos",
    title: "Direitos do titular",
    content: (
      <>
        <p>
          Conforme a LGPD e o contexto, você pode solicitar confirmação e
          acesso, correção, informação sobre compartilhamento, anonimização,
          bloqueio ou eliminação, portabilidade, oposição, revogação de
          consentimento e revisão de decisão automatizada. Alguns pedidos podem
          ser limitados por obrigação legal, segredo comercial, segurança ou
          necessidade de manter registros.
        </p>
        <p>
          Para exercer um direito, escreva para{" "}
          <a
            className={externalLinkClass}
            href={`mailto:${LEGAL_ENTITY.supportEmail}?subject=Privacidade%20e%20dados%20pessoais`}
          >
            {LEGAL_ENTITY.supportEmail}
          </a>
          . Podemos pedir informações razoáveis para confirmar sua identidade e
          encaminhar o pedido à barbearia quando ela for a controladora.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies, métricas e comunicações",
    content: (
      <>
        <p>
          O site e os aplicativos usam armazenamento essencial para sessão,
          segurança e preferências. Métricas não essenciais só são ativadas
          depois da sua escolha no aviso de cookies e podem ser recusadas ou
          retiradas nas preferências.
        </p>
        <p>
          Podemos manter a primeira origem de campanha por período limitado para
          entender conversão entre o site e a criação da conta. Comunicações
          promocionais devem respeitar preferências e permitir oposição ou
          descadastro; mensagens transacionais podem continuar quando
          necessárias ao serviço.
        </p>
      </>
    ),
  },
  {
    id: "contato-e-atualizacoes",
    title: "Contato, referências e atualizações",
    content: (
      <>
        <p>
          {LEGAL_ENTITY.name} — CNPJ {LEGAL_ENTITY.taxId}
          <br />
          {LEGAL_ENTITY.address}
          <br />
          Contato de privacidade:{" "}
          <a
            className={externalLinkClass}
            href={`mailto:${LEGAL_ENTITY.supportEmail}`}
          >
            {LEGAL_ENTITY.supportEmail}
          </a>
        </p>
        <p>
          Esta política pode mudar para refletir o produto, fornecedores ou
          regras aplicáveis. Alterações relevantes terão data atualizada e,
          quando necessário, aviso adicional.
        </p>
        <p>
          Consulte o{" "}
          <a
            className={externalLinkClass}
            href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
            target="_blank"
            rel="noreferrer"
          >
            texto oficial da LGPD
          </a>{" "}
          e a página da{" "}
          <a
            className={externalLinkClass}
            href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares"
            target="_blank"
            rel="noreferrer"
          >
            ANPD sobre direitos dos titulares
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      breadcrumbLabel="Política de Privacidade"
      path="/privacidade"
      updatedAt={LEGAL_UPDATED_AT}
      intro="Este documento explica o tratamento de dados no site, na plataforma Flowo, no aplicativo e nas experiências de agendamento e atendimento."
      sections={sections}
    />
  );
}
