export const COMPARISON_LAST_VERIFIED = "2026-07-29";
export const COMPARISON_LAST_VERIFIED_LABEL = "29 de julho de 2026";

export interface ComparisonSource {
  label: string;
  url: string;
  scope: string;
}

export interface ComparisonRow {
  criterion: string;
  flowo: string;
  competitor: string;
}

export interface ComparisonFaq {
  question: string;
  answer: string;
}

export interface CompetitorComparison {
  id: "appbarber" | "trinks" | "barbeiro-app" | "avec" | "graces";
  name: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  summary: string;
  flowoFit: string;
  competitorFit: string;
  honestVerdict: string;
  priceSummary: string;
  keyDifferences: ReadonlyArray<string>;
  rows: ReadonlyArray<ComparisonRow>;
  faq: ReadonlyArray<ComparisonFaq>;
  sources: ReadonlyArray<ComparisonSource>;
}

export const COMPETITOR_COMPARISONS: readonly CompetitorComparison[] = [
  {
    id: "appbarber",
    name: "AppBarber",
    path: "/flowo-vs-appbarber",
    seoTitle: "Flowo vs AppBarber: Comparativo para Barbearias",
    seoDescription:
      "Compare Flowo e AppBarber em agendamento, WhatsApp, aplicativo, gestão e preço. Veja qual abordagem combina com a rotina da sua barbearia.",
    eyebrow: "WhatsApp com IA ou aplicativo para agendar",
    headline: "Flowo vs AppBarber: qual rotina você quer entregar ao cliente?",
    summary:
      "O AppBarber organiza a experiência em um aplicativo para clientes e profissionais, apoiado por um módulo administrativo. O Flowo coloca a recepção com IA dentro do WhatsApp e usa o painel como central de supervisão da operação.",
    flowoFit:
      "Barbearias que querem atender, agendar, confirmar e remarcar na conversa do WhatsApp, sem transformar o download de um aplicativo no caminho principal do cliente.",
    competitorFit:
      "Operações que preferem um aplicativo dedicado para cliente e profissional e valorizam recursos como estoque, programa de fidelidade, pacotes e clube de clientes.",
    honestVerdict:
      "A escolha não é entre uma agenda boa e uma ruim. É entre colocar a conversa no centro da operação ou conduzir o cliente para uma experiência própria de aplicativo.",
    priceSummary:
      "O Flowo começa em R$ 249/mês, sem período de teste. Em sua tabela pública, o AppBarber mostra plano mensal a partir de R$ 79,90 para um profissional e teste grátis de 30 dias. Recursos e condições podem mudar; confirme no site oficial.",
    keyDifferences: [
      "No Flowo, a IA no WhatsApp faz parte do produto principal.",
      "No AppBarber, o aplicativo é um dos canais centrais para clientes e profissionais.",
      "O AppBarber publica uma entrada de preço menor; o Flowo inclui uma proposta de recepção conversacional mais abrangente.",
    ],
    rows: [
      {
        criterion: "Caminho principal do agendamento",
        flowo:
          "O cliente conversa no WhatsApp da barbearia e a IA consulta a disponibilidade antes de agendar.",
        competitor:
          "O site oficial apresenta o aplicativo do cliente como canal para agendamentos, notícias, promoções e lembretes.",
      },
      {
        criterion: "WhatsApp e automação",
        flowo:
          "Atendimento conversacional, agendamento e confirmação pelo WhatsApp estão incluídos nos planos.",
        competitor:
          "O site destaca lembretes e mensagens automáticas; o aplicativo permanece central na experiência descrita.",
      },
      {
        criterion: "Equipe",
        flowo:
          "Cada profissional pode ter serviços e horários próprios; a IA oferece apenas a disponibilidade válida.",
        competitor:
          "Profissionais acessam agenda e comissões pelo aplicativo, com permissões definidas pelo gestor.",
      },
      {
        criterion: "Gestão além da agenda",
        flowo:
          "Comandas, histórico, campanhas e recebimento opcional ficam conectados ao atendimento.",
        competitor:
          "O portfólio público inclui estoque, fidelidade, pacotes, relatórios e clube de clientes.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          "Planos de R$ 249, R$ 549 e R$ 1.049 por mês; contratação paga desde o primeiro dia e sem fidelidade.",
        competitor:
          "Preço mensal a partir de R$ 79,90 para um profissional e teste grátis de 30 dias, conforme a página oficial.",
      },
    ],
    faq: [
      {
        question: "Qual é a principal diferença entre Flowo e AppBarber?",
        answer:
          "O Flowo usa o WhatsApp com IA como recepção principal. O AppBarber apresenta uma experiência baseada em aplicativo para clientes e profissionais, além do módulo WebAdmin.",
      },
      {
        question: "Flowo ou AppBarber: qual é mais barato?",
        answer:
          "Na verificação de 29 de julho de 2026, o AppBarber publicava mensalidade a partir de R$ 79,90 para um profissional, enquanto o Flowo começava em R$ 249/mês. Os escopos são diferentes: no Flowo, a recepção com IA no WhatsApp faz parte do produto principal.",
      },
      {
        question: "Qual deles reduz mais etapas para o cliente agendar?",
        answer:
          "Se o cliente já conversa com a barbearia pelo WhatsApp, o Flowo evita direcioná-lo para um aplicativo como caminho principal. Se a barbearia quer uma experiência dedicada de app, o AppBarber pode fazer mais sentido.",
      },
      {
        question: "O AppBarber pode ser a melhor escolha para algumas barbearias?",
        answer:
          "Sim. Ele pode ser mais adequado para quem prioriza aplicativo dedicado, estoque, fidelidade e uma mensalidade inicial menor. A comparação deve considerar o fluxo desejado, não apenas a lista de recursos.",
      },
    ],
    sources: [
      {
        label: "Site oficial do AppBarber",
        url: "https://appbarber.com.br/index.html",
        scope:
          "Módulos, funcionalidades, preços publicados e período de teste.",
      },
    ],
  },
  {
    id: "trinks",
    name: "Trinks",
    path: "/flowo-vs-trinks",
    seoTitle: "Flowo vs Trinks: Comparativo para Barbearias",
    seoDescription:
      "Compare Flowo e Trinks em WhatsApp com IA, agenda, marketplace, pagamentos, comissões, preço e implantação para escolher com clareza.",
    eyebrow: "Recepção no WhatsApp ou ecossistema de beleza",
    headline: "Flowo vs Trinks: profundidade no WhatsApp ou amplitude de ecossistema?",
    summary:
      "A Trinks oferece um ecossistema amplo para beleza e bem-estar, com agenda online, marketplace, estoque, clube de assinaturas, soluções fiscais e pagamentos. O Flowo concentra sua proposta na recepção com IA pelo WhatsApp conectada à agenda e à operação da barbearia.",
    flowoFit:
      "Barbearias que recebem grande parte dos pedidos pelo WhatsApp e querem a IA atendendo e agendando como parte central de todos os planos.",
    competitorFit:
      "Negócios que valorizam marketplace, fila de espera, estoque, clube de assinaturas, autoatendimento e um ecossistema maduro para beleza e bem-estar.",
    honestVerdict:
      "A Trinks é mais ampla como ecossistema. O Flowo é mais específico na tese de transformar o WhatsApp em recepção operacional. A melhor opção depende de onde hoje nasce a maior parte dos seus agendamentos.",
    priceSummary:
      "O Flowo começa em R$ 249/mês e não oferece teste grátis. A Trinks publica valor anual a partir de R$ 76/mês para 1 a 2 profissionais e teste de 5 dias; chatbot, comunicação e outras soluções aparecem como adicionais. Confirme a composição final com a Trinks.",
    keyDifferences: [
      "A IA no WhatsApp é núcleo do Flowo, não um complemento posterior.",
      "A Trinks declara uma base ampla de marketplace, pagamentos, estoque, fiscal e autoatendimento.",
      "A contratação da Trinks pode combinar plano e recursos adicionais; o Flowo publica três planos com a recepção de IA incluída.",
    ],
    rows: [
      {
        criterion: "Caminho principal do agendamento",
        flowo:
          "A conversa no WhatsApp consulta agenda, serviços e profissionais antes de confirmar.",
        competitor:
          "Agenda online via site, app, redes sociais e Google; a página de planos apresenta chatbot como recurso adicional.",
      },
      {
        criterion: "WhatsApp e IA",
        flowo:
          "IA que atende, agenda e confirma incluída nos planos; remarcação disponível a partir do Equipe.",
        competitor:
          "Rotinas de mensagens, lembretes e chatbot são divulgados, com parte da comunicação classificada como adicional.",
      },
      {
        criterion: "Descoberta de novos clientes",
        flowo:
          "A proposta é converter melhor a demanda que já chega aos canais da própria barbearia.",
        competitor:
          "A Trinks mantém marketplace e canais de agendamento que também ajudam clientes a encontrar estabelecimentos.",
      },
      {
        criterion: "Operação e financeiro",
        flowo:
          "Agenda, comanda e recebimento opcional conectados; comissão com revisão do gestor no Empresarial.",
        competitor:
          "Portfólio amplo com estoque, clube, fiscal, Belezinha, split e pagamento de profissionais.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          "Planos públicos de R$ 249, R$ 549 e R$ 1.049/mês, sem período de teste e sem fidelidade.",
        competitor:
          "Valor anual publicado a partir de R$ 76/mês para 1 a 2 profissionais, teste de 5 dias e recursos adicionais.",
      },
    ],
    faq: [
      {
        question: "Qual é a principal diferença entre Flowo e Trinks?",
        answer:
          "A Trinks oferece um ecossistema amplo de gestão e descoberta para beleza e bem-estar. O Flowo concentra a experiência na recepção com IA pelo WhatsApp, conectada à agenda da barbearia.",
      },
      {
        question: "Flowo ou Trinks: qual é melhor para agendar pelo WhatsApp?",
        answer:
          "No Flowo, a IA no WhatsApp faz parte do produto principal. Na Trinks, a agenda online é central e o site de planos apresenta chatbot e comunicação como recursos adicionais. Confirme com a Trinks o pacote necessário para o seu cenário.",
      },
      {
        question: "Quando a Trinks pode ser a melhor escolha?",
        answer:
          "Quando marketplace, fila de espera, estoque, clube de assinaturas, autoatendimento ou uma estrutura ampla para beleza e bem-estar pesam mais do que ter o WhatsApp como recepção central.",
      },
      {
        question: "Quando o Flowo tende a fazer mais sentido?",
        answer:
          "Quando a equipe perde agendamentos enquanto atende clientes e precisa que a conversa do WhatsApp responda, consulte horários e marque sem depender da recepção.",
      },
    ],
    sources: [
      {
        label: "Trinks para barbearias",
        url: "https://negocios.trinks.com/negocios/barbearias/",
        scope:
          "Agenda, app profissional, comissões, clube, fiscal, estoque e suporte.",
      },
      {
        label: "Planos oficiais da Trinks",
        url: "https://negocios.trinks.com/planos/",
        scope:
          "Preço publicado, teste, adicionais, integrações e condições comerciais.",
      },
    ],
  },
  {
    id: "barbeiro-app",
    name: "Barbeiro.app",
    path: "/flowo-vs-barbeiro-app",
    seoTitle: "Flowo vs Barbeiro.app: Comparativo Completo",
    seoDescription:
      "Compare Flowo e Barbeiro.app em WhatsApp com IA, página de agendamento, fidelidade, pagamentos, preço e suporte para sua barbearia.",
    eyebrow: "IA incluída ou plataforma modular de baixo custo",
    headline: "Flowo vs Barbeiro.app: compare o produto completo, não só a mensalidade.",
    summary:
      "As duas plataformas falam diretamente com barbearias. O Barbeiro.app combina página de agendamento, plano gratuito e módulos opcionais de WhatsApp e IA. O Flowo parte da recepção com IA no WhatsApp como recurso central de todos os planos.",
    flowoFit:
      "Barbearias dispostas a investir em uma implantação acompanhada e querem o atendimento conversacional no WhatsApp já incluído no produto.",
    competitorFit:
      "Quem prioriza começar com baixo custo, configurar sozinho e adicionar WhatsApp oficial, IA, fiscal ou loja conforme a necessidade.",
    honestVerdict:
      "O Barbeiro.app tem uma entrada comercial mais acessível e mais módulos de autosserviço. O Flowo custa mais porque vende a recepção com IA no WhatsApp como parte do pacote principal, não como uma extensão opcional.",
    priceSummary:
      "O Flowo começa em R$ 249/mês. O Barbeiro.app publica plano gratuito, Pro a partir de R$ 59,90/mês e complementos como Assistente de IA por R$ 29,90/mês e WhatsApp Pro por R$ 39,90/mês. Compare o conjunto necessário, não apenas o plano-base.",
    keyDifferences: [
      "Flowo inclui a recepção com IA no WhatsApp em todos os planos.",
      "Barbeiro.app oferece plano gratuito e vende IA, WhatsApp inbound, fiscal e loja como complementos em parte dos planos.",
      "Barbeiro.app enfatiza página pública, fidelidade, indicação e assinaturas; Flowo enfatiza conversa, agenda e supervisão operacional.",
    ],
    rows: [
      {
        criterion: "Caminho principal do agendamento",
        flowo:
          "O cliente conversa com a IA no WhatsApp da barbearia e agenda sem sair da conversa.",
        competitor:
          "Página própria de agendamento é o canal-base; WhatsApp Pro permite atendimento inbound como complemento.",
      },
      {
        criterion: "IA",
        flowo:
          "Atendimento, agendamento e confirmação por IA fazem parte dos planos.",
        competitor:
          "Assistente de IA é divulgado por R$ 29,90/mês e incluído sem custo adicional no Enterprise.",
      },
      {
        criterion: "Fidelização e comércio",
        flowo:
          "Histórico, campanhas e cashback configurável; pagamentos integrados são opcionais.",
        competitor:
          "Pontos, indicação, assinaturas recorrentes, venda de produtos e loja online aparecem no portfólio.",
      },
      {
        criterion: "Implantação",
        flowo:
          "Onboarding acompanhado para configurar negócio, equipe, agenda e canal.",
        competitor:
          "Proposta de autosserviço com criação de conta em poucos minutos e teste sem cartão.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          "R$ 249, R$ 549 e R$ 1.049/mês, sem teste grátis; IA no WhatsApp incluída.",
        competitor:
          "Plano gratuito, Pro a partir de R$ 59,90/mês e complementos opcionais com preços próprios.",
      },
    ],
    faq: [
      {
        question: "Qual é a principal diferença entre Flowo e Barbeiro.app?",
        answer:
          "No Flowo, a recepção com IA no WhatsApp está incluída em todos os planos. No Barbeiro.app, a página de agendamento é central e WhatsApp Pro e Assistente de IA aparecem como complementos em parte dos planos.",
      },
      {
        question: "Barbeiro.app é mais barato que o Flowo?",
        answer:
          "O preço de entrada publicado é menor: o Barbeiro.app oferece plano gratuito e Pro a partir de R$ 59,90/mês. Para comparar corretamente, some os complementos necessários, como WhatsApp Pro e Assistente de IA, e avalie o nível de implantação e suporte desejado.",
      },
      {
        question: "Qual oferece mais recursos de fidelidade?",
        answer:
          "O Barbeiro.app divulga pontos, níveis, indicação e assinaturas. O Flowo trabalha com histórico, campanhas e cashback configurável. São modelos de relacionamento diferentes.",
      },
      {
        question: "Para quem o Flowo tende a ser melhor?",
        answer:
          "Para uma barbearia que trata o WhatsApp como principal porta de entrada e quer atendimento, agenda e confirmação conectados desde o início, com configuração acompanhada.",
      },
    ],
    sources: [
      {
        label: "Funcionalidades do Barbeiro.app",
        url: "https://www.barbeiro.app/funcionalidades",
        scope:
          "Recursos, plano gratuito, preço inicial e valores publicados dos complementos.",
      },
      {
        label: "Site oficial do Barbeiro.app",
        url: "https://www.barbeiro.app/",
        scope:
          "Posicionamento, página de agendamento, WhatsApp oficial e gestão.",
      },
    ],
  },
  {
    id: "avec",
    name: "Avec",
    path: "/flowo-vs-avec",
    seoTitle: "Flowo vs Avec: Comparativo para Barbearias",
    seoDescription:
      "Compare Flowo e Avec em IA no WhatsApp, agenda, pagamentos, split, estoque, relatórios, preço e perfil ideal de barbearia.",
    eyebrow: "Recepção conversacional ou plataforma ampla de beleza",
    headline: "Flowo vs Avec: onde a automação precisa começar na sua barbearia?",
    summary:
      "A Avec conecta agenda, pagamentos, split, estoque, fiscal, clube e dados para vários segmentos de beleza. O Flowo começa pelo gargalo mais visível da barbearia: o cliente esperando resposta no WhatsApp enquanto a equipe está atendendo.",
    flowoFit:
      "Barbearias que querem automatizar a recepção no WhatsApp e manter agenda, equipe e comanda ligadas à mesma conversa.",
    competitorFit:
      "Operações que priorizam pagamentos e split no ato, estoque, clube de assinaturas, BI ou uma plataforma ampla para diferentes negócios de beleza.",
    honestVerdict:
      "A Avec apresenta maior amplitude de backoffice e serviços financeiros. O Flowo é mais focado na experiência conversacional da barbearia e torna essa IA parte do plano, não um add-on.",
    priceSummary:
      "O Flowo publica três planos a partir de R$ 249/mês. A Avec mostra R$ 88,90/mês para 1 a 2 profissionais na opção anual e valores sob consulta nas faixas seguintes; WhatsApp integrado, Avec IA, pagamentos e outros itens aparecem como add-ons na tabela pública.",
    keyDifferences: [
      "A IA de recepção no WhatsApp está incluída nos planos Flowo.",
      "A Avec apresenta IA, WhatsApp e várias capacidades financeiras como add-ons.",
      "Avec é uma plataforma horizontal para beleza e bem-estar; Flowo fala diretamente com a rotina de barbearias.",
    ],
    rows: [
      {
        criterion: "Caminho principal do agendamento",
        flowo:
          "A IA conversa no WhatsApp, consulta horários individuais e registra o agendamento.",
        competitor:
          "Agenda online e link de agendamento formam a base; Avec IA automatiza o WhatsApp como solução adicional.",
      },
      {
        criterion: "IA e WhatsApp",
        flowo:
          "Recepção com IA incluída; atende, agenda e confirma em todos os planos.",
        competitor:
          "A tabela pública identifica WhatsApp integrado/marketing e Avec IA como add-ons.",
      },
      {
        criterion: "Pagamentos e comissões",
        flowo:
          "Pagamento integrado opcional no pós-atendimento; no Empresarial, o gestor revisa e inicia o repasse.",
        competitor:
          "Avec Pay, split no ato e antecipação de comissão fazem parte do ecossistema financeiro divulgado.",
      },
      {
        criterion: "Gestão ampla",
        flowo:
          "Agenda, equipe, comandas, histórico, campanhas e relatórios com foco em barbearia.",
        competitor:
          "Estoque, fiscal, clube, BI Avec Lake, metas e múltiplos segmentos de beleza.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          "R$ 249, R$ 549 e R$ 1.049/mês; sem teste e sem fidelidade.",
        competitor:
          "R$ 88,90/mês para 1 a 2 profissionais na opção anual; outras faixas sob consulta e diversos add-ons.",
      },
    ],
    faq: [
      {
        question: "Qual é a principal diferença entre Flowo e Avec?",
        answer:
          "A Avec oferece uma plataforma ampla para beleza, com pagamentos, split, estoque e dados. O Flowo concentra a proposta na recepção com IA pelo WhatsApp conectada à agenda da barbearia.",
      },
      {
        question: "A IA no WhatsApp está incluída nos dois sistemas?",
        answer:
          "No Flowo, a IA que atende, agenda e confirma está incluída nos planos. Na tabela pública da Avec, WhatsApp integrado e Avec IA aparecem como add-ons. Confirme os valores e o pacote vigente diretamente com a Avec.",
      },
      {
        question: "Quando a Avec pode ser a melhor escolha?",
        answer:
          "Quando split automático, antecipação, estoque, clube de assinaturas, fiscal e inteligência de dados pesam mais na decisão do que uma recepção de WhatsApp incluída no plano.",
      },
      {
        question: "Quando escolher o Flowo?",
        answer:
          "Quando o principal gargalo é responder e agendar clientes no WhatsApp enquanto a equipe trabalha, e a barbearia quer esse fluxo como núcleo do produto.",
      },
    ],
    sources: [
      {
        label: "Avec para barbearias",
        url: "https://negocios.avec.app/sistema-para-barbearia-gestao-e-clientes",
        scope:
          "Agenda, WhatsApp, pagamentos, split, estoque, clube, fiscal e dados.",
      },
      {
        label: "Planos oficiais da Avec",
        url: "https://negocios.avec.app/avec-planos",
        scope:
          "Preço publicado, faixas por profissionais e identificação de add-ons.",
      },
    ],
  },
  {
    id: "graces",
    name: "Graces",
    path: "/flowo-vs-graces",
    seoTitle: "Flowo vs Graces: Comparativo para Barbearias",
    seoDescription:
      "Compare Flowo e Graces em agenda, WhatsApp com IA, estoque, fiscal, marketing, preço e implantação para sua barbearia.",
    eyebrow: "WhatsApp como recepção ou gestão robusta de backoffice",
    headline: "Flowo vs Graces: compare a conversa do cliente e o controle da gestão.",
    summary:
      "A Graces apresenta uma gestão detalhada de agenda, caixa, comissão, estoque, fiscal e marketing, com módulos adicionais. O Flowo organiza a operação em torno da IA que recebe o cliente no WhatsApp e consulta a agenda em tempo real.",
    flowoFit:
      "Barbearias que querem reduzir o atendimento manual no WhatsApp e preferem uma implantação focada em recepção, agenda, equipe e comandas.",
    competitorFit:
      "Negócios que priorizam estoque detalhado, fiscal, conciliação, pacotes, convênios e controles administrativos mais extensos.",
    honestVerdict:
      "A Graces descreve um backoffice mais profundo em estoque e financeiro. O Flowo é mais direto para quem quer transformar o WhatsApp em recepção com IA sem montar esse recurso como módulo separado.",
    priceSummary:
      "O Flowo começa em R$ 249/mês. A Graces publica plano mensal a partir de R$ 94,90 para até três profissionais e anual a partir de R$ 79,90/mês; automação de WhatsApp, IA e fiscal são apresentados na área de módulos. Confirme o pacote aplicável.",
    keyDifferences: [
      "Flowo inclui a IA no WhatsApp em todos os planos.",
      "Graces apresenta forte profundidade em estoque, financeiro, fiscal e marketing.",
      "A Graces publica entrada de preço menor; o Flowo reúne recepção conversacional e operação em uma proposta mais específica.",
    ],
    rows: [
      {
        criterion: "Caminho principal do agendamento",
        flowo:
          "O cliente conversa no WhatsApp e a IA agenda com base na disponibilidade real.",
        competitor:
          "Agenda com a marca da barbearia, lembretes automáticos e módulos de WhatsApp/IA divulgados separadamente.",
      },
      {
        criterion: "IA e WhatsApp",
        flowo:
          "Atendimento, agendamento e confirmação por IA incluídos nos planos.",
        competitor:
          "O site lista automação de mensagens e agendamento com IA na área de módulos; o escopo deve ser confirmado.",
      },
      {
        criterion: "Financeiro e estoque",
        flowo:
          "Comandas e formas de recebimento conectadas; pagamentos integrados são opcionais.",
        competitor:
          "Contas a pagar/receber, conciliação, estoque por doses e transferências entre lojas aparecem na lista pública.",
      },
      {
        criterion: "Marketing e relacionamento",
        flowo:
          "Campanhas com franquia mensal por plano, histórico e cashback configurável.",
        competitor:
          "Campanhas, convênios, vouchers, vale-presente e CRM aparecem no portfólio.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          "R$ 249, R$ 549 e R$ 1.049/mês; IA de recepção incluída.",
        competitor:
          "Mensal a partir de R$ 94,90 para até três profissionais e anual a partir de R$ 79,90/mês, com módulos adicionais.",
      },
    ],
    faq: [
      {
        question: "Qual é a principal diferença entre Flowo e Graces?",
        answer:
          "O Flowo coloca a IA no WhatsApp no centro da recepção. A Graces apresenta um conjunto mais amplo de controles de backoffice, como estoque detalhado, financeiro, fiscal e marketing.",
      },
      {
        question: "Flowo ou Graces: qual é mais barato?",
        answer:
          "Na verificação de 29 de julho de 2026, a Graces publicava preço mensal a partir de R$ 94,90 e o Flowo a partir de R$ 249. Compare também quais módulos são necessários e se a IA no WhatsApp está incluída na configuração escolhida.",
      },
      {
        question: "Quando a Graces pode fazer mais sentido?",
        answer:
          "Quando a prioridade é uma gestão administrativa extensa, com estoque, conciliação, fiscal, pacotes e controles detalhados de profissionais.",
      },
      {
        question: "Quando o Flowo tende a ser a melhor escolha?",
        answer:
          "Quando o principal problema é perder conversas e horários no WhatsApp e a barbearia quer que a IA responda e agende como parte central do sistema.",
      },
    ],
    sources: [
      {
        label: "Graces para barbearias",
        url: "https://graces.com.br/barbearia/",
        scope:
          "Agenda, comissões, estoque, marketing, fiscal, WhatsApp e suporte.",
      },
      {
        label: "Planos oficiais da Graces",
        url: "https://graces.com.br/planos/",
        scope:
          "Preços publicados, faixas, funcionalidades e módulos adicionais.",
      },
    ],
  },
] as const;

export function getCompetitorComparison(
  id: CompetitorComparison["id"],
): CompetitorComparison {
  const comparison = COMPETITOR_COMPARISONS.find((item) => item.id === id);

  if (!comparison) {
    throw new Error(`Unknown competitor comparison: ${id}`);
  }

  return comparison;
}
