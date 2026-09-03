export type ProductCapabilityId =
  | "payments"
  | "cashback"
  | "commissions"
  | "fiscal";

export interface ProductCapability {
  id: ProductCapabilityId;
  path: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  description: string;
  statusLabel: string;
  statusDetail: string;
  seoTitle: string;
  seoDescription: string;
  proofTitle: string;
  proofDescription: string;
  steps: ReadonlyArray<{
    title: string;
    description: string;
  }>;
  safeguards: ReadonlyArray<string>;
  related: ReadonlyArray<{
    href: string;
    label: string;
    description: string;
  }>;
}

export const PRODUCT_CAPABILITIES: Record<
  ProductCapabilityId,
  ProductCapability
> = {
  payments: {
    id: "payments",
    path: "/software-barbearia-com-pix",
    breadcrumb: "Pagamentos no atendimento",
    eyebrow: "Recebimento opcional",
    title: "Receba do seu jeito. Registre tudo no mesmo lugar.",
    description:
      "Dinheiro, maquininha própria ou pagamento integrado Flowo: a barbearia escolhe a forma de receber depois do serviço. Nada de sinal para reservar.",
    statusLabel: "Opcional",
    statusDetail:
      "Você não precisa ativar pagamentos integrados para usar a agenda, o WhatsApp ou as comandas.",
    seoTitle: "Software para Barbearia com PIX Opcional",
    seoDescription:
      "Receba depois do atendimento em dinheiro, maquininha própria, PIX ou cartão. O pagamento integrado Flowo é opcional e nunca exige sinal para agendar.",
    proofTitle: "A escolha acontece no fechamento da comanda",
    proofDescription:
      "O atendimento é concluído primeiro. Depois, a equipe registra como o cliente pagou e mantém o caixa ligado à comanda.",
    steps: [
      {
        title: "Conclua o atendimento",
        description:
          "Serviços e produtos ficam reunidos na comanda, com o valor final conferido pela equipe.",
      },
      {
        title: "Escolha como receber",
        description:
          "Dinheiro, maquininha da própria barbearia ou pagamentos integrados Flowo, quando ativados.",
      },
      {
        title: "Registre o caixa",
        description:
          "A forma de pagamento e a comanda concluída ficam no histórico financeiro da operação.",
      },
    ],
    safeguards: [
      "Sem depósito, sinal ou pagamento antecipado",
      "Dinheiro e maquininha própria continuam válidos",
      "Pagamentos integrados dependem de ativação",
      "O recebimento acontece somente depois do serviço",
    ],
    related: [
      {
        href: "/recursos/guias/pagamentos-pix",
        label: "Guia de pagamentos",
        description:
          "Entenda ativação, saldo, conciliação e as formas de fechar uma comanda.",
      },
      {
        href: "/recursos/guias/controle-financeiro-barbearia",
        label: "Controle financeiro",
        description:
          "Organize entradas e comandas sem confundir o Flowo com uma contabilidade completa.",
      },
      {
        href: "/precos",
        label: "Planos e recursos",
        description:
          "Veja o que faz parte dos planos e quais recursos dependem de ativação.",
      },
    ],
  },
  cashback: {
    id: "cashback",
    path: "/recursos/cashback-barbearia",
    breadcrumb: "Cashback para barbearia",
    eyebrow: "Recorrência configurável",
    title: "Cashback que cabe na margem da sua barbearia.",
    description:
      "Defina percentual, validade, valor mínimo e limite por comanda. O benefício só entra na operação quando a barbearia decide ativá-lo.",
    statusLabel: "Configurável",
    statusDetail:
      "Cashback é separado de pontos e fidelidade. A disponibilidade e a ativação devem ser confirmadas para a sua conta.",
    seoTitle: "Cashback para Barbearia: Fidelização com Controle",
    seoDescription:
      "Configure cashback para sua barbearia com percentual, validade, mínimo de resgate e limite por comanda. Recurso opcional e controlado pela gestão.",
    proofTitle: "A regra vem antes da recompensa",
    proofDescription:
      "A barbearia decide quanto conceder e como o saldo pode ser usado. O cliente vê o benefício sem a gestão perder o controle da margem.",
    steps: [
      {
        title: "Defina a regra",
        description:
          "Escolha percentual, prazo de validade, produtos elegíveis e limite de uso por comanda.",
      },
      {
        title: "Gere saldo no atendimento",
        description:
          "Quando a regra estiver ativa, a comanda elegível gera o saldo conforme a configuração.",
      },
      {
        title: "Controle o resgate",
        description:
          "Aplique mínimo de resgate e teto por compra para proteger a margem da operação.",
      },
    ],
    safeguards: [
      "Ativação e pausa sob controle da barbearia",
      "Percentual e validade configuráveis",
      "Mínimo de resgate e teto por comanda",
      "Cashback não é o mesmo que pontos de fidelidade",
    ],
    related: [
      {
        href: "/recursos/guias/fidelizacao-clientes",
        label: "Guia de fidelização",
        description:
          "Combine histórico, consentimento e benefícios sem criar descontos sem critério.",
      },
      {
        href: "/recursos/guias/aumentar-ticket-medio",
        label: "Aumentar o ticket médio",
        description:
          "Use produtos, combos e comandas para crescer receita com uma operação sustentável.",
      },
      {
        href: "/precos",
        label: "Consultar disponibilidade",
        description:
          "Veja os planos e fale com a Flowo para confirmar a ativação do recurso.",
      },
    ],
  },
  commissions: {
    id: "commissions",
    path: "/recursos/comissoes-barbeiros",
    breadcrumb: "Comissões de barbeiros",
    eyebrow: "Gestão no Empresarial",
    title: "Comissão calculada. Repasse sob seu controle.",
    description:
      "Depois que o atendimento é pago, o Flowo atualiza o saldo de comissão. O responsável confere os valores e inicia o repasse por PIX.",
    statusLabel: "Plano Empresarial",
    statusDetail:
      "O cálculo depende da configuração da equipe. O repasse não acontece sozinho: o gestor revisa e inicia a transferência.",
    seoTitle: "Comissão de Barbeiros: Cálculo e Repasse por PIX",
    seoDescription:
      "Calcule comissões após comandas pagas, confira o saldo de cada profissional e inicie o repasse por PIX com controle do gestor.",
    proofTitle: "Automatize a conta, preserve a decisão",
    proofDescription:
      "O sistema reduz a planilha de comissão sem retirar a conferência financeira de quem administra a barbearia.",
    steps: [
      {
        title: "Configure a comissão",
        description:
          "Defina as regras aplicáveis aos serviços e profissionais dentro da operação.",
      },
      {
        title: "Feche a comanda",
        description:
          "A comissão é calculada quando o atendimento elegível é concluído e pago.",
      },
      {
        title: "Revise e repasse",
        description:
          "O gestor confere o saldo e inicia o repasse por PIX. Não existe execução semanal automática.",
      },
    ],
    safeguards: [
      "Disponível no Empresarial quando habilitado",
      "Cálculo ligado a comandas pagas",
      "Saldo separado por profissional",
      "Repasse iniciado pelo gestor",
    ],
    related: [
      {
        href: "/recursos/guias/gerenciamento-equipe",
        label: "Gerenciamento de equipe",
        description:
          "Entenda cadastros, horários individuais, folgas e como as comissões funcionam de verdade.",
      },
      {
        href: "/recursos/guias/controle-financeiro-barbearia",
        label: "Controle financeiro",
        description:
          "Veja como comandas, receita e saldos aparecem na operação.",
      },
      {
        href: "/precos",
        label: "Conhecer o Empresarial",
        description:
          "Compare limites, unidades e recursos disponíveis para operações maiores.",
      },
    ],
  },
  fiscal: {
    id: "fiscal",
    path: "/recursos/nota-fiscal-barbearia",
    breadcrumb: "Nota fiscal para barbearia",
    eyebrow: "Ativação assistida",
    title: "Emissão ligada à comanda, com ativação assistida.",
    description:
      "O Flowo prepara o fluxo fiscal a partir do atendimento, mas a emissão depende de dados fiscais, liberação da prefeitura e disponibilidade no município.",
    statusLabel: "Piloto acompanhado",
    statusDetail:
      "A cobertura não é nacional e automática. A Flowo confirma município, credenciais e tipo de documento antes da ativação.",
    seoTitle: "Nota Fiscal para Barbearia com Ativação Assistida",
    seoDescription:
      "Entenda como a emissão fiscal pode se conectar às comandas da barbearia. Disponibilidade sujeita a município, dados fiscais e liberação da prefeitura.",
    proofTitle: "Primeiro a elegibilidade. Depois a emissão.",
    proofDescription:
      "A ativação começa pela conferência do município e das credenciais. Só então a comanda pode seguir para o provedor fiscal.",
    steps: [
      {
        title: "Verifique a disponibilidade",
        description:
          "A equipe Flowo confirma município, documento fiscal aplicável e requisitos da operação.",
      },
      {
        title: "Homologue os dados",
        description:
          "Credenciais e informações fiscais são conferidas antes do uso.",
      },
      {
        title: "Emita a partir da comanda",
        description:
          "Quando ativado, o fluxo fiscal usa os dados do atendimento fechado para preparar a emissão.",
      },
    ],
    safeguards: [
      "Disponibilidade depende do município e da UF",
      "Credenciais e dados fiscais precisam ser liberados pela prefeitura",
      "Ativação acompanhada pela equipe Flowo",
      "Não substitui a orientação do contador",
    ],
    related: [
      {
        href: "/recursos/guias/controle-financeiro-barbearia",
        label: "Controle financeiro",
        description:
          "Entenda o que o painel financeiro registra e o que continua sendo responsabilidade contábil.",
      },
      {
        href: "/recursos/guias/pagamentos-pix",
        label: "Pagamentos e comandas",
        description:
          "Veja como fechar o atendimento antes de avaliar a emissão fiscal.",
      },
      {
        href: "/precos",
        label: "Falar sobre ativação",
        description:
          "Compare os planos e consulte a disponibilidade para a sua operação.",
      },
    ],
  },
};

