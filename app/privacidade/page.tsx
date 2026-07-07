import { LegalPage, type LegalSection } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de Privacidade",
  description:
    "Saiba como o Flowo coleta, usa e protege seus dados pessoais em conformidade com a LGPD.",
  path: "/privacidade",
});

const sections: LegalSection[] = [
  {
    id: "dados-coletados",
    title: "Dados que Coletamos",
    content: (
      <>
        <p>Coletamos os seguintes dados quando você utiliza nossos serviços:</p>
        <ul>
          <li>
            <strong>Dados de identificação:</strong> nome, e-mail, telefone
          </li>
          <li>
            <strong>Dados do negócio:</strong> nome da barbearia, endereço,
            CNPJ (opcional)
          </li>
          <li>
            <strong>Dados de uso:</strong> interações com a plataforma,
            preferências
          </li>
          <li>
            <strong>Dados de clientes:</strong> informações dos clientes que
            você cadastra para agendamento
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "como-usamos",
    title: "Como Usamos seus Dados",
    content: (
      <>
        <p>Utilizamos seus dados para:</p>
        <ul>
          <li>Fornecer e melhorar nossos serviços de agendamento</li>
          <li>Enviar lembretes e notificações sobre agendamentos</li>
          <li>Processar pagamentos e emitir notas fiscais</li>
          <li>Enviar comunicações sobre atualizações do serviço</li>
          <li>Enviar conteúdo de marketing (apenas com seu consentimento)</li>
          <li>Cumprir obrigações legais</li>
        </ul>
      </>
    ),
  },
  {
    id: "base-legal",
    title: "Base Legal para Tratamento",
    content: (
      <p>
        O tratamento dos seus dados é realizado com base em: execução de
        contrato (para fornecer o serviço), consentimento (para marketing),
        cumprimento de obrigação legal (dados fiscais) e legítimo interesse
        (melhorias do serviço).
      </p>
    ),
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento de Dados",
    content: (
      <>
        <p>Seus dados podem ser compartilhados com:</p>
        <ul>
          <li>
            <strong>Processadores de pagamento:</strong> para processar
            transações financeiras
          </li>
          <li>
            <strong>Provedores de infraestrutura:</strong> serviços de
            hospedagem e banco de dados
          </li>
          <li>
            <strong>Ferramentas de comunicação:</strong> para envio de
            mensagens WhatsApp e e-mail
          </li>
          <li>
            <strong>Autoridades:</strong> quando exigido por lei
          </li>
        </ul>
        <p>Não vendemos seus dados pessoais a terceiros.</p>
      </>
    ),
  },
  {
    id: "seus-direitos",
    title: "Seus Direitos (LGPD)",
    content: (
      <>
        <p>Você tem direito a:</p>
        <ul>
          <li>Confirmar a existência de tratamento de dados</li>
          <li>Acessar seus dados pessoais</li>
          <li>Corrigir dados incompletos ou desatualizados</li>
          <li>
            Solicitar anonimização, bloqueio ou eliminação de dados
            desnecessários
          </li>
          <li>Solicitar portabilidade dos dados</li>
          <li>Revogar consentimento a qualquer momento</li>
          <li>Solicitar informações sobre compartilhamento com terceiros</li>
        </ul>
      </>
    ),
  },
  {
    id: "retencao",
    title: "Retenção de Dados",
    content: (
      <p>
        Mantemos seus dados enquanto você tiver uma conta ativa ou conforme
        necessário para cumprir obrigações legais. Dados fiscais são mantidos
        por 5 anos conforme legislação brasileira. Após o encerramento da
        conta, dados não essenciais são excluídos em até 30 dias.
      </p>
    ),
  },
  {
    id: "seguranca",
    title: "Segurança dos Dados",
    content: (
      <p>
        Implementamos medidas técnicas e organizacionais para proteger seus
        dados, incluindo: criptografia em trânsito e em repouso, controle de
        acesso, monitoramento de segurança e backups regulares.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        Utilizamos cookies essenciais para o funcionamento do site e cookies
        de análise para entender como você usa nossos serviços. Você pode
        gerenciar suas preferências de cookies nas configurações do seu
        navegador.
      </p>
    ),
  },
  {
    id: "contato",
    title: "Contato",
    content: (
      <>
        <p>
          Para exercer seus direitos ou esclarecer dúvidas sobre esta
          política, entre em contato conosco:
        </p>
        <ul className="!list-none !pl-0">
          <li>
            <strong>E-mail:</strong> privacidade@flowo.com.br
          </li>
          <li>
            <strong>Encarregado de Dados (DPO):</strong> dpo@flowo.com.br
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações nesta Política",
    content: (
      <p>
        Podemos atualizar esta política periodicamente. Notificaremos sobre
        mudanças significativas por e-mail ou através de aviso em nosso site.
        O uso continuado dos serviços após alterações constitui aceitação da
        política atualizada.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      breadcrumbLabel="Política de Privacidade"
      path="/privacidade"
      updatedAt="6 de julho de 2026"
      intro="A Flowo está comprometida em proteger sua privacidade. Esta política explica como coletamos, usamos e protegemos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD)."
      sections={sections}
    />
  );
}
