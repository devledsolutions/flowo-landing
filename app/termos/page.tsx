import { LegalPage, type LegalSection } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Termos de Uso",
  description:
    "Termos e condições de uso da plataforma Flowo de agendamento para barbearias.",
  path: "/termos",
});

const sections: LegalSection[] = [
  {
    id: "aceitacao",
    title: "Aceitação dos Termos",
    content: (
      <p>
        Ao acessar ou usar o Flowo, você concorda em cumprir estes Termos de
        Uso e nossa Política de Privacidade. Se você não concordar com algum
        termo, não utilize nossos serviços.
      </p>
    ),
  },
  {
    id: "descricao-do-servico",
    title: "Descrição do Serviço",
    content: (
      <p>
        O Flowo é uma plataforma de agendamento online que permite a barbearias
        e estabelecimentos similares gerenciar agendamentos via WhatsApp com
        assistência de inteligência artificial. O serviço inclui: agendamento
        automatizado, lembretes, gestão de equipe, relatórios e integrações.
      </p>
    ),
  },
  {
    id: "cadastro-e-conta",
    title: "Cadastro e Conta",
    content: (
      <>
        <p>Para usar o Flowo, você deve:</p>
        <ul>
          <li>Ter pelo menos 18 anos de idade</li>
          <li>Fornecer informações verdadeiras e completas</li>
          <li>Manter suas credenciais de acesso em sigilo</li>
          <li>Ser responsável por todas as atividades em sua conta</li>
          <li>Notificar-nos imediatamente sobre uso não autorizado</li>
        </ul>
      </>
    ),
  },
  {
    id: "planos-e-pagamentos",
    title: "Planos e Pagamentos",
    content: (
      <>
        <h3 className="text-body font-semibold text-ink">4.1 Contratação</h3>
        <p>
          O Flowo é um serviço por assinatura. O acesso à plataforma é
          liberado após a confirmação do pagamento do plano escolhido, na
          modalidade mensal ou anual. Os planos disponíveis e seus preços
          estão descritos na página de preços.
        </p>
        <h3 className="text-body font-semibold text-ink">4.2 Cobrança</h3>
        <p>
          Os planos são cobrados mensalmente ou anualmente, conforme sua
          escolha. O pagamento pode ser feito via PIX, cartão de crédito ou
          boleto. A cobrança é realizada no início de cada ciclo de
          faturamento.
        </p>
        <h3 className="text-body font-semibold text-ink">
          4.3 Cancelamento e Reembolso
        </h3>
        <p>
          Você pode cancelar sua assinatura a qualquer momento. O acesso
          continua até o final do período já pago. Não oferecemos reembolso
          proporcional para cancelamentos no meio do ciclo, exceto em casos
          previstos pelo Código de Defesa do Consumidor.
        </p>
      </>
    ),
  },
  {
    id: "uso-aceitavel",
    title: "Uso Aceitável",
    content: (
      <>
        <p>Você concorda em não:</p>
        <ul>
          <li>Usar o serviço para atividades ilegais</li>
          <li>Enviar spam ou mensagens não solicitadas</li>
          <li>Tentar acessar sistemas ou dados sem autorização</li>
          <li>Interferir no funcionamento do serviço</li>
          <li>Revender ou redistribuir o serviço sem autorização</li>
          <li>Violar direitos de propriedade intelectual</li>
        </ul>
      </>
    ),
  },
  {
    id: "dados-dos-clientes",
    title: "Dados dos Clientes",
    content: (
      <p>
        Você é responsável por obter consentimento dos seus clientes para
        armazenar seus dados e enviar comunicações via WhatsApp. O Flowo atua
        como operador de dados, e você como controlador. Você deve cumprir a
        LGPD em relação aos dados dos seus clientes.
      </p>
    ),
  },
  {
    id: "propriedade-intelectual",
    title: "Propriedade Intelectual",
    content: (
      <p>
        O Flowo e todo seu conteúdo, funcionalidades e tecnologia são de
        propriedade exclusiva da Flowo ou seus licenciadores. Você recebe uma
        licença limitada, não exclusiva e não transferível para usar o serviço
        conforme estes termos.
      </p>
    ),
  },
  {
    id: "limitacao-de-responsabilidade",
    title: "Limitação de Responsabilidade",
    content: (
      <p>
        O Flowo é fornecido &quot;como está&quot;. Não garantimos que o
        serviço será ininterrupto ou livre de erros. Nossa responsabilidade é
        limitada ao valor pago pelo serviço nos últimos 12 meses. Não nos
        responsabilizamos por danos indiretos, lucros cessantes ou perda de
        dados.
      </p>
    ),
  },
  {
    id: "disponibilidade",
    title: "Disponibilidade do Serviço",
    content: (
      <p>
        Nos esforçamos para manter o serviço disponível 24/7, mas podem
        ocorrer interrupções para manutenção ou por fatores fora do nosso
        controle. Notificaremos sobre manutenções programadas com antecedência
        quando possível.
      </p>
    ),
  },
  {
    id: "suspensao-e-encerramento",
    title: "Suspensão e Encerramento",
    content: (
      <p>
        Podemos suspender ou encerrar sua conta se você violar estes termos,
        não realizar pagamentos ou por determinação legal. Você pode encerrar
        sua conta a qualquer momento através das configurações ou entrando em
        contato conosco.
      </p>
    ),
  },
  {
    id: "alteracoes-nos-termos",
    title: "Alterações nos Termos",
    content: (
      <p>
        Podemos modificar estes termos a qualquer momento. Alterações
        significativas serão comunicadas por e-mail ou aviso no serviço com
        pelo menos 30 dias de antecedência. O uso continuado após alterações
        constitui aceitação dos novos termos.
      </p>
    ),
  },
  {
    id: "lei-aplicavel",
    title: "Lei Aplicável e Foro",
    content: (
      <p>
        Estes termos são regidos pelas leis brasileiras. Qualquer disputa será
        resolvida no foro da comarca de São Paulo, SP, com exceção de casos
        onde o Código de Defesa do Consumidor determinar foro diferente.
      </p>
    ),
  },
  {
    id: "contato",
    title: "Contato",
    content: (
      <>
        <p>Para dúvidas sobre estes termos, entre em contato:</p>
        <ul className="!list-none !pl-0">
          <li>
            <strong>E-mail:</strong> contato@flowo.com.br
          </li>
          <li>
            <strong>Site:</strong> flowo.com.br
          </li>
        </ul>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Termos de Uso"
      breadcrumbLabel="Termos de Uso"
      path="/termos"
      updatedAt="6 de julho de 2026"
      intro="Ao usar o Flowo, você concorda com estes termos. Leia-os atentamente antes de utilizar nossa plataforma."
      sections={sections}
    />
  );
}
