export const COMPARISON_LAST_VERIFIED = "2026-07-31";
export const COMPARISON_LAST_VERIFIED_LABEL = "31 de julho de 2026";

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

export interface ComparisonSnapshotRow {
  criterion: string;
  flowo: string;
  competitor: string;
}

export interface CompetitorComparison {
  id:
    | "appbarber"
    | "trinks"
    | "bestbarbers"
    | "barbeiro-app"
    | "avec"
    | "graces"
    | "barva"
    | "opero";
  name: string;
  path: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  heroSummary: string;
  summary: string;
  flowoFit: string;
  competitorFit: string;
  honestVerdict: string;
  snapshotQuestion: string;
  snapshotRows: ReadonlyArray<ComparisonSnapshotRow>;
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
    publishedAt: "2026-07-29",
    seoTitle: "Flowo vs AppBarber: Comparativo para Barbearias",
    seoDescription:
      "Compare Flowo e AppBarber em agendamento, WhatsApp, aplicativo, gestão e preço. Veja qual abordagem combina com a rotina da sua barbearia.",
    eyebrow: "WhatsApp com IA ou aplicativo para agendar",
    headline: "Flowo vs AppBarber: WhatsApp ou aplicativo?",
    heroSummary:
      "O Flowo atende no WhatsApp; o AppBarber conduz clientes e profissionais para um aplicativo dedicado.",
    summary:
      "O AppBarber organiza a experiência em um aplicativo para clientes e profissionais, apoiado por um módulo administrativo. O Flowo coloca a recepção com IA dentro do WhatsApp e usa o painel como central de supervisão da operação.",
    flowoFit:
      "Barbearias que querem atender, agendar e confirmar na conversa do WhatsApp; nos planos Equipe e Empresarial, também remarcar sem exigir um aplicativo do cliente.",
    competitorFit:
      "Operações que preferem um aplicativo dedicado para cliente e profissional e valorizam recursos como estoque, programa de fidelidade, pacotes e clube de clientes.",
    honestVerdict:
      "A escolha não é entre uma agenda boa e uma ruim. É entre colocar a conversa no centro da operação ou conduzir o cliente para uma experiência própria de aplicativo.",
    snapshotQuestion: "WhatsApp ou aplicativo: qual hábito você quer pedir ao cliente?",
    snapshotRows: [
      { criterion: "Canal do cliente", flowo: "WhatsApp", competitor: "Aplicativo próprio" },
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Não é o canal central" },
      { criterion: "Entrada publicada", flowo: "R$ 249/mês", competitor: "R$ 79,90/mês" },
    ],
    priceSummary:
      "O Flowo começa em R$ 249/mês. A jornada pública é paga; a equipe pode conceder uma avaliação assistida de 14 dias a clientes elegíveis do Solo ou Equipe. O AppBarber mostra plano mensal a partir de R$ 79,90 para um profissional e teste grátis de 30 dias. Confirme as condições vigentes.",
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
          "Planos Solo de R$ 249 e Equipe de R$ 549 por mês; Empresarial sob consulta, com contratação assistida e sem fidelidade.",
        competitor:
          "Preço mensal a partir de R$ 79,90 para um profissional e teste grátis de 30 dias, conforme a página oficial.",
      },
    ],
    faq: [
      {
        question: "Qual é a principal diferença entre Flowo e AppBarber?",
        answer:
          "O Flowo usa o WhatsApp com IA como recepção principal. O AppBarber apresenta uma experiência baseada em aplicativo para clientes e profissionais, além do painel administrativo web.",
      },
      {
        question: "Flowo ou AppBarber: qual é mais barato?",
        answer:
          "Na verificação de 31 de julho de 2026, o AppBarber publicava mensalidade a partir de R$ 79,90 para um profissional, enquanto o Flowo começava em R$ 249/mês. Os escopos são diferentes: no Flowo, a recepção com IA no WhatsApp faz parte do produto principal.",
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
    publishedAt: "2026-07-29",
    seoTitle: "Flowo vs Trinks: Comparativo para Barbearias",
    seoDescription:
      "Compare Flowo e Trinks em WhatsApp com IA, agenda, marketplace, pagamentos, comissões, preço e implantação para escolher com clareza.",
    eyebrow: "Recepção no WhatsApp ou ecossistema de beleza",
    headline: "Flowo vs Trinks: WhatsApp ou ecossistema?",
    heroSummary:
      "O Flowo aprofunda a recepção no WhatsApp; a Trinks oferece um ecossistema mais amplo de beleza e bem-estar.",
    summary:
      "A Trinks oferece um ecossistema amplo para beleza e bem-estar, com agenda online, marketplace, estoque, clube de assinaturas, soluções fiscais e pagamentos. O Flowo concentra sua proposta na recepção com IA pelo WhatsApp conectada à agenda e à operação da barbearia.",
    flowoFit:
      "Barbearias que recebem grande parte dos pedidos pelo WhatsApp e querem a IA atendendo e agendando como parte central de todos os planos.",
    competitorFit:
      "Negócios que valorizam marketplace, fila de espera, estoque, clube de assinaturas, autoatendimento e um ecossistema maduro para beleza e bem-estar.",
    honestVerdict:
      "A Trinks é mais ampla como ecossistema. O Flowo é mais específico na tese de transformar o WhatsApp em recepção operacional. A melhor opção depende de onde hoje nasce a maior parte dos seus agendamentos.",
    snapshotQuestion: "Você precisa de uma recepção focada ou de um ecossistema mais amplo?",
    snapshotRows: [
      { criterion: "Canal central", flowo: "WhatsApp", competitor: "Agenda online e ecossistema" },
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Solução adicional" },
      { criterion: "Entrada publicada", flowo: "R$ 249/mês", competitor: "R$ 76/mês no anual" },
    ],
    priceSummary:
      "O Flowo começa em R$ 249/mês. A jornada pública é paga; clientes elegíveis do Solo ou Equipe podem receber uma avaliação assistida de 14 dias. A Trinks publica valor anual a partir de R$ 76/mês para 1 a 2 profissionais e teste de 5 dias; chatbot, comunicação e outras soluções aparecem como adicionais. Confirme a composição final com a Trinks.",
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
          "Solo por R$ 249 e Equipe por R$ 549/mês; Empresarial sob consulta. A avaliação assistida de 14 dias pode ser concedida manualmente a clientes elegíveis do Solo ou Equipe; sem fidelidade.",
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
    id: "bestbarbers",
    name: "BestBarbers",
    path: "/flowo-vs-bestbarbers",
    publishedAt: "2026-07-31",
    seoTitle: "Flowo vs BestBarbers: Comparativo para Barbearias",
    seoDescription:
      "Compare Flowo e BestBarbers em WhatsApp com IA, app próprio, clube de assinaturas, agenda, gestão, preço e implantação.",
    eyebrow: "Recepção no WhatsApp ou aplicativo com a sua marca",
    headline: "Flowo vs BestBarbers: WhatsApp ou app próprio?",
    heroSummary:
      "O Flowo atende no WhatsApp; o BestBarbers transforma o aplicativo com a marca da barbearia em parte central da experiência.",
    summary:
      "O BestBarbers vende um aplicativo próprio com a marca da barbearia, clube de assinaturas e uma operação ampla. O Flowo coloca a recepção com IA no WhatsApp no centro da experiência e conecta a conversa à agenda e ao painel da equipe.",
    flowoFit:
      "Barbearias em que a maior parte dos pedidos já chega pelo WhatsApp e que querem atender e agendar sem exigir download ou login do cliente.",
    competitorFit:
      "Operações que priorizam um aplicativo publicado com a própria marca, clube de assinaturas, notificações push, totem e gestão de várias unidades.",
    honestVerdict:
      "O BestBarbers oferece uma proposta mais forte para app próprio, assinatura e autoatendimento. O Flowo reduz a mudança de hábito do cliente ao usar o WhatsApp como recepção e inclui a IA conversacional no fluxo principal.",
    snapshotQuestion: "A prioridade é atender no WhatsApp ou publicar um app com sua marca?",
    snapshotRows: [
      { criterion: "Canal do cliente", flowo: "WhatsApp", competitor: "App próprio e link" },
      { criterion: "Clube e assinatura", flowo: "Cashback e histórico", competitor: "Clube dentro do app" },
      { criterion: "Entrada publicada", flowo: "R$ 249/mês", competitor: "Básico grátis; app a R$ 299" },
    ],
    priceSummary:
      "O Flowo começa em R$ 249/mês. A jornada pública é paga; clientes elegíveis do Solo ou Equipe podem receber uma avaliação assistida de 14 dias. O BestBarbers publica um plano básico gratuito e o plano App Exclusivo a partir de R$ 299/mês. Confirme os recursos e equipamentos da proposta vigente.",
    keyDifferences: [
      "No Flowo, o cliente pode conversar e agendar no WhatsApp sem baixar um aplicativo.",
      "O BestBarbers diferencia sua oferta com app próprio, clube de assinaturas, notificações push e totem opcional.",
      "As duas propostas cobrem agenda, clientes, financeiro e comissões, mas partem de canais de aquisição e relacionamento diferentes.",
    ],
    rows: [
      {
        criterion: "Caminho principal do agendamento",
        flowo:
          "A IA conversa no WhatsApp, consulta serviços, profissionais e disponibilidade e registra o horário.",
        competitor:
          "O cliente usa o app próprio ou o link de agendamento para escolher profissional, serviço e horário.",
      },
      {
        criterion: "Relacionamento com o cliente",
        flowo:
          "Atendimento, confirmação e retomada acontecem no WhatsApp, com supervisão humana no mesmo histórico.",
        competitor:
          "O app próprio concentra agenda, pagamento e assinatura; notificações push são usadas para lembretes e campanhas.",
      },
      {
        criterion: "Receita recorrente e fidelização",
        flowo:
          "Histórico, campanhas e cashback configurável; o Flowo Recupera é um módulo adicional em fase beta, com acompanhamento.",
        competitor:
          "Clube de assinaturas com cobrança automática, gestão de inadimplência e planos dentro do aplicativo.",
      },
      {
        criterion: "Operação e equipe",
        flowo:
          "Agenda por profissional, comandas, clientes, comissões, pagamentos opcionais e fiscal assistido conforme o plano e a ativação.",
        competitor:
          "Agenda, financeiro, comissões, estoque, multi-unidades, relatórios, nota fiscal e totem opcional são divulgados no site oficial.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          "Solo por R$ 249 e Equipe por R$ 549/mês; Empresarial sob consulta. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe; IA no WhatsApp incluída e sem fidelidade.",
        competitor:
          "Plano básico gratuito e App Exclusivo a partir de R$ 299/mês; app personalizado leva prazo de publicação nas lojas.",
      },
    ],
    faq: [
      {
        question: "Qual é a principal diferença entre Flowo e BestBarbers?",
        answer:
          "O Flowo usa o WhatsApp com IA como recepção principal. O BestBarbers usa um aplicativo próprio com a marca da barbearia como um dos centros da experiência do cliente.",
      },
      {
        question: "Qual deles exige que o cliente baixe um aplicativo?",
        answer:
          "O cliente não precisa baixar aplicativo para conversar e agendar com o Flowo pelo WhatsApp. No BestBarbers, o app próprio é um diferencial central, embora a plataforma também divulgue link de agendamento.",
      },
      {
        question: "Flowo ou BestBarbers: qual é mais barato?",
        answer:
          "O BestBarbers publica um plano básico gratuito e App Exclusivo a partir de R$ 299/mês. O Flowo começa em R$ 249/mês e inclui a recepção com IA no WhatsApp. Compare o pacote completo e o canal que sua barbearia quer priorizar.",
      },
      {
        question: "Quando o BestBarbers pode ser a melhor escolha?",
        answer:
          "Quando app próprio, clube de assinaturas, notificações push, totem ou gestão multi-unidades pesam mais do que manter o WhatsApp como porta principal do agendamento.",
      },
    ],
    sources: [
      {
        label: "BestBarbers para barbearias",
        url: "https://www.bestbarbers.app/sistema-para-barbearia",
        scope:
          "Funcionalidades, plano básico, preço do App Exclusivo, implantação, FAQ e escopo comercial.",
      },
      {
        label: "Site oficial do BestBarbers",
        url: "https://www.bestbarbers.app/",
        scope:
          "App próprio, assinaturas, fiscal, notificações, gestão, processo de entrega e contato.",
      },
    ],
  },
  {
    id: "barbeiro-app",
    name: "Barbeiro.app",
    path: "/flowo-vs-barbeiro-app",
    publishedAt: "2026-07-29",
    seoTitle: "Flowo vs Barbeiro.app: Comparativo Completo",
    seoDescription:
      "Compare Flowo e Barbeiro.app em WhatsApp com IA, página de agendamento, fidelidade, pagamentos, preço e suporte para sua barbearia.",
    eyebrow: "IA incluída ou plataforma modular de baixo custo",
    headline: "Flowo vs Barbeiro.app: IA incluída ou pacote modular?",
    heroSummary:
      "O Flowo inclui a recepção com IA; o Barbeiro.app permite começar com menor custo e montar o pacote por plano e complementos.",
    summary:
      "As duas plataformas falam diretamente com barbearias. O Barbeiro.app combina página de agendamento, plano gratuito e módulos opcionais de WhatsApp e IA. O Flowo parte da recepção com IA no WhatsApp como recurso central de todos os planos.",
    flowoFit:
      "Barbearias dispostas a investir em uma implantação acompanhada e que querem o atendimento conversacional no WhatsApp já incluído no produto.",
    competitorFit:
      "Quem prioriza começar com baixo custo, configurar sozinho e adicionar WhatsApp oficial, IA, fiscal ou loja conforme a necessidade.",
    honestVerdict:
      "O Barbeiro.app tem uma entrada comercial mais acessível e mais módulos de autosserviço. O Flowo custa mais porque vende a recepção com IA no WhatsApp como parte do pacote principal, não como uma extensão opcional.",
    snapshotQuestion: "Você quer a IA incluída ou prefere montar um pacote modular?",
    snapshotRows: [
      { criterion: "Canal principal", flowo: "WhatsApp com IA", competitor: "Página e complementos" },
      { criterion: "IA", flowo: "Incluída", competitor: "Complemento ou Enterprise" },
      { criterion: "Entrada publicada", flowo: "R$ 249/mês", competitor: "Grátis; Pro R$ 59,90" },
    ],
    priceSummary:
      "O Flowo começa em R$ 249/mês. O Barbeiro.app publica plano gratuito, Pro a partir de R$ 59,90/mês e Enterprise a partir de R$ 139,90/mês para 1 a 2 profissionais. Assistente de IA e WhatsApp Pro aparecem como complementos nos planos aplicáveis; a IA é incluída no Enterprise. Compare o pacote completo e os limites vigentes.",
    keyDifferences: [
      "Flowo inclui a recepção com IA no WhatsApp em todos os planos.",
      "Barbeiro.app oferece plano gratuito e vende atendimento recebido pelo WhatsApp, fiscal e loja como complementos em parte dos planos; a IA está incluída no Enterprise.",
      "Barbeiro.app enfatiza página pública, fidelidade, indicação e assinaturas; Flowo enfatiza conversa, agenda e supervisão operacional.",
    ],
    rows: [
      {
        criterion: "Caminho principal do agendamento",
        flowo:
          "O cliente conversa com a IA no WhatsApp da barbearia e agenda sem sair da conversa.",
        competitor:
          "Página própria de agendamento é o canal-base; WhatsApp Pro permite receber atendimentos pelo canal como complemento.",
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
          "Solo por R$ 249 e Equipe por R$ 549/mês; Empresarial sob consulta. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe; IA no WhatsApp incluída.",
        competitor:
          "Plano gratuito, Pro a partir de R$ 59,90/mês e Enterprise a partir de R$ 139,90/mês para 1 a 2 profissionais; complementos variam por plano.",
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
          "O preço de entrada publicado é menor: o Barbeiro.app oferece plano gratuito, Pro a partir de R$ 59,90/mês e Enterprise a partir de R$ 139,90/mês para 1 a 2 profissionais. O Enterprise inclui a IA; nos demais cenários, confirme os complementos necessários e o nível de implantação desejado.",
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
    publishedAt: "2026-07-29",
    seoTitle: "Flowo vs Avec: Comparativo para Barbearias",
    seoDescription:
      "Compare Flowo e Avec em IA no WhatsApp, agenda, pagamentos, split, estoque, relatórios, preço e perfil ideal de barbearia.",
    eyebrow: "Recepção conversacional ou plataforma ampla de beleza",
    headline: "Flowo vs Avec: recepção ou gestão financeira?",
    heroSummary:
      "O Flowo começa pela recepção no WhatsApp; a Avec amplia pagamentos, split, estoque e dados para negócios de beleza.",
    summary:
      "A Avec conecta agenda, pagamentos, split, estoque, fiscal, clube e dados para vários segmentos de beleza. O Flowo começa pelo gargalo mais visível da barbearia: o cliente esperando resposta no WhatsApp enquanto a equipe está atendendo.",
    flowoFit:
      "Barbearias que querem automatizar a recepção no WhatsApp e manter agenda, equipe e comanda ligadas à mesma conversa.",
    competitorFit:
      "Operações que priorizam pagamentos e split no ato, estoque, clube de assinaturas, BI ou uma plataforma ampla para diferentes negócios de beleza.",
    honestVerdict:
      "A Avec apresenta maior amplitude de gestão administrativa e serviços financeiros. O Flowo é mais focado na experiência conversacional da barbearia e torna essa IA parte do plano, não um complemento.",
    snapshotQuestion: "O gargalo está na recepção ou no ecossistema financeiro?",
    snapshotRows: [
      { criterion: "Foco principal", flowo: "Recepção no WhatsApp", competitor: "Gestão e finanças" },
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Solução adicional" },
      { criterion: "Entrada publicada", flowo: "R$ 249/mês", competitor: "R$ 88,90/mês no anual" },
    ],
    priceSummary:
      "O Flowo publica três planos a partir de R$ 249/mês. A Avec mostra R$ 88,90/mês para 1 a 2 profissionais na opção anual e valores sob consulta nas faixas seguintes; WhatsApp integrado, Avec IA, pagamentos e outros itens aparecem como recursos adicionais na tabela pública.",
    keyDifferences: [
      "A IA de recepção no WhatsApp está incluída nos planos Flowo.",
      "A Avec apresenta IA, WhatsApp e várias capacidades financeiras como recursos adicionais.",
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
          "A tabela pública identifica WhatsApp integrado, marketing e Avec IA como recursos adicionais.",
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
          "Solo por R$ 249 e Equipe por R$ 549/mês; Empresarial sob consulta. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe; sem fidelidade.",
        competitor:
          "R$ 88,90/mês para 1 a 2 profissionais na opção anual; outras faixas sob consulta e diversos recursos adicionais.",
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
          "No Flowo, a IA que atende, agenda e confirma está incluída nos planos. Na tabela pública da Avec, WhatsApp integrado e Avec IA aparecem como recursos adicionais. Confirme os valores e o pacote vigente diretamente com a Avec.",
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
          "Preço publicado, faixas por profissionais e identificação de recursos adicionais.",
      },
    ],
  },
  {
    id: "graces",
    name: "Graces",
    path: "/flowo-vs-graces",
    publishedAt: "2026-07-29",
    seoTitle: "Flowo vs Graces: Comparativo para Barbearias",
    seoDescription:
      "Compare Flowo e Graces em agenda, WhatsApp com IA, estoque, fiscal, marketing, preço e implantação para sua barbearia.",
    eyebrow: "WhatsApp como recepção ou gestão robusta de backoffice",
    headline: "Flowo vs Graces: WhatsApp ou gestão administrativa?",
    heroSummary:
      "O Flowo começa pela recepção com IA; a Graces aprofunda controles administrativos, financeiros e de estoque.",
    summary:
      "A Graces apresenta uma gestão detalhada de agenda, caixa, comissão, estoque, fiscal e marketing, com módulos adicionais. O Flowo organiza a operação em torno da IA que recebe o cliente no WhatsApp e consulta a agenda em tempo real.",
    flowoFit:
      "Barbearias que querem reduzir o atendimento manual no WhatsApp e preferem uma implantação focada em recepção, agenda, equipe e comandas.",
    competitorFit:
      "Negócios que priorizam estoque detalhado, fiscal, conciliação, pacotes, convênios e controles administrativos mais extensos.",
    honestVerdict:
      "A Graces descreve um backoffice mais profundo em estoque e financeiro. O Flowo é mais direto para quem quer transformar o WhatsApp em recepção com IA sem montar esse recurso como módulo separado.",
    snapshotQuestion: "Você precisa primeiro de recepção automática ou de gestão administrativa profunda?",
    snapshotRows: [
      { criterion: "Foco principal", flowo: "Recepção no WhatsApp", competitor: "Gestão administrativa" },
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Módulo a confirmar" },
      { criterion: "Entrada publicada", flowo: "R$ 249/mês", competitor: "R$ 94,90/mês" },
    ],
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
          "Solo por R$ 249 e Equipe por R$ 549/mês; Empresarial sob consulta; IA de recepção incluída.",
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
          "Na verificação de 31 de julho de 2026, a Graces publicava preço mensal a partir de R$ 94,90 e o Flowo a partir de R$ 249. Compare também quais módulos são necessários e se a IA no WhatsApp está incluída na configuração escolhida.",
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
  {
    id: "barva",
    name: "Barva",
    path: "/flowo-vs-barva",
    publishedAt: "2026-07-31",
    seoTitle: "Flowo vs Barva: IA no WhatsApp e Gestão",
    seoDescription:
      "Compare Flowo e Barva em IA no WhatsApp, agenda, financeiro, estoque, preço, implantação e perfil ideal para sua barbearia.",
    eyebrow: "IA incluída ou gestão-base com módulos opcionais",
    headline: "Flowo vs Barva: IA incluída ou módulos?",
    heroSummary:
      "O Flowo inclui a IA no produto; o Barva combina uma base obrigatória de gestão com módulos opcionais.",
    summary:
      "O Barva combina uma base obrigatória de gestão com módulos opcionais de IA para atendimento e recuperação de clientes. O Flowo inclui a recepção com IA no WhatsApp em todos os planos e conecta a conversa à agenda e à comanda.",
    flowoFit:
      "Barbearias que querem começar com a IA no WhatsApp como parte do produto, preços públicos e implantação acompanhada da conversa à agenda.",
    competitorFit:
      "Operações que preferem começar por uma gestão ampla, com estoque, fornecedores, compras, clube e dashboards, ativando módulos de IA quando fizer sentido.",
    honestVerdict:
      "O Barva apresenta uma base administrativa mais ampla e permite contratar a gestão sem IA. O Flowo é mais específico para a barbearia que já decidiu transformar o WhatsApp em recepção e quer essa capacidade incluída desde o primeiro plano.",
    snapshotQuestion: "Você quer começar pela IA ou montar a gestão com módulos opcionais?",
    snapshotRows: [
      { criterion: "Arquitetura", flowo: "IA incluída", competitor: "Gestão-base + módulos" },
      { criterion: "Como avaliar", flowo: "Demonstração guiada", competitor: "Teste de 7 dias" },
      { criterion: "Preço", flowo: "Público, desde R$ 249", competitor: "Sob proposta" },
    ],
    priceSummary:
      "O Flowo publica Solo por R$ 249 e Equipe por R$ 549 por mês; o Empresarial é sob consulta. A avaliação assistida de 14 dias pode ser concedida a clientes elegíveis do Solo ou Equipe. O Barva oferece sete dias de teste e monta uma proposta conforme profissionais e módulos.",
    keyDifferences: [
      "A recepção com IA no WhatsApp está incluída nos três planos Flowo.",
      "No Barva, a gestão completa é obrigatória e as IAs de atendimento e recuperação são módulos opcionais.",
      "O Barva divulga estoque, fornecedores, compras e clube; o Flowo concentra a proposta na recepção, agenda, equipe e fechamento do atendimento.",
    ],
    rows: [
      {
        criterion: "IA no WhatsApp",
        flowo:
          "A IA atende, consulta disponibilidade e agenda no WhatsApp como parte dos planos publicados.",
        competitor:
          "A IA para atendimento no WhatsApp é um módulo opcional integrado ao sistema de gestão obrigatório.",
      },
      {
        criterion: "Agenda e equipe",
        flowo:
          "Dias, turnos, folgas, serviços e duração podem variar por profissional nos planos com equipe.",
        competitor:
          "A página oficial apresenta agenda, profissionais, serviços, disponibilidade e encaixes na base de gestão.",
      },
      {
        criterion: "Gestão além da agenda",
        flowo:
          "Comandas, histórico, campanhas, cashback e recebimentos opcionais ficam conectados ao atendimento.",
        competitor:
          "A base divulgada inclui estoque, produtos, fornecedores, compras, financeiro, fidelidade, clube e dashboards.",
      },
      {
        criterion: "Como avaliar antes de contratar",
        flowo:
          "Demonstração pública e conversa acompanhada; clientes elegíveis do Solo ou Equipe podem receber uma avaliação assistida de 14 dias.",
        competitor:
          "Telas, vídeo, demonstração guiada, proposta personalizada e teste grátis de sete dias.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          "Solo por R$ 249 e Equipe por R$ 549/mês; Empresarial sob consulta, IA incluída e sem fidelidade. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe.",
        competitor:
          "Preço sob proposta conforme profissionais e módulos; gestão-base obrigatória e IAs opcionais.",
      },
    ],
    faq: [
      {
        question: "Qual é a principal diferença entre Flowo e Barva?",
        answer:
          "No Flowo, a IA no WhatsApp é parte central de todos os planos. No Barva, o sistema de gestão é a base obrigatória e as IAs de atendimento e recuperação aparecem como módulos opcionais.",
      },
      {
        question: "O Barva tem mais recursos de gestão que o Flowo?",
        answer:
          "A página pública do Barva descreve maior profundidade em estoque, fornecedores, compras e clube de assinaturas. O Flowo apresenta agenda, equipe, comandas, clientes, campanhas e recebimentos, com foco mais específico na recepção pelo WhatsApp.",
      },
      {
        question: "Qual deles permite testar antes?",
        answer:
          "O Barva divulga sete dias de teste grátis. No Flowo, a jornada pública é paga; a equipe pode conceder manualmente uma avaliação assistida de 14 dias a clientes elegíveis do Solo ou Equipe.",
      },
      {
        question: "Como comparar o preço de Flowo e Barva?",
        answer:
          "O Flowo publica três preços mensais. O Barva solicita número de profissionais e módulos para montar a proposta. Compare o valor final com a IA e os módulos necessários, não apenas a base de gestão.",
      },
    ],
    sources: [
      {
        label: "Site oficial do Barva",
        url: "https://www.barva.com.br/",
        scope:
          "Gestão obrigatória, módulos opcionais de IA, funcionalidades, demonstração, teste e proposta comercial.",
      },
    ],
  },
  {
    id: "opero",
    name: "Opero",
    path: "/flowo-vs-opero",
    publishedAt: "2026-07-31",
    seoTitle: "Flowo vs Opero: WhatsApp com IA para Barbearia",
    seoDescription:
      "Compare Flowo e Opero em bot com IA no WhatsApp, agenda por barbeiro, comissão, pagamentos, preço e implantação.",
    eyebrow: "Duas propostas centradas no WhatsApp",
    headline: "Flowo vs Opero: onde o fluxo muda?",
    heroSummary:
      "Os dois divulgam agendamento pelo WhatsApp; preço, implantação e cobrança de sinal separam as propostas.",
    summary:
      "Flowo e Opero colocam o WhatsApp no centro do agendamento e conectam a conversa à agenda por profissional. A diferença aparece no modelo comercial, no escopo administrativo e na escolha sobre cobrança antecipada e implantação.",
    flowoFit:
      "Barbearias que preferem implantação acompanhada, pagamentos opcionais somente depois do serviço e uma proposta que não exige sinal para reservar.",
    competitorFit:
      "Quem prioriza menor preço inicial, sete dias de teste, estoque, clube, pacotes e a possibilidade de cobrar sinal ou vender serviços antecipadamente.",
    honestVerdict:
      "A Opero publica uma entrada de preço menor e um backoffice mais amplo em estoque, clube e pacotes. A Flowo se diferencia pela implantação acompanhada, pela recepção com IA incluída e por manter reserva sem sinal e recebimento integrado como escolha pós-atendimento.",
    snapshotQuestion: "Se os dois usam WhatsApp, onde está a diferença prática?",
    snapshotRows: [
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Incluída conforme plano" },
      { criterion: "Para reservar", flowo: "Sem sinal", competitor: "Pode cobrar sinal" },
      { criterion: "Entrada publicada", flowo: "R$ 249/mês", competitor: "R$ 59/mês" },
    ],
    priceSummary:
      "O Flowo começa em R$ 249/mês. A jornada pública é paga; clientes elegíveis do Solo ou Equipe podem receber uma avaliação assistida de 14 dias. A Opero publica quatro planos de R$ 59 a R$ 299/mês e teste de sete dias. Confirme limites e capacidades na proposta vigente.",
    keyDifferences: [
      "As duas plataformas divulgam IA no WhatsApp conectada à agenda por profissional.",
      "O Flowo não cobra sinal para reservar e deixa o pagamento integrado como opção depois do atendimento.",
      "A Opero publica entrada mais barata, teste grátis e recursos como estoque, clube, pacotes e cobrança antecipada.",
    ],
    rows: [
      {
        criterion: "WhatsApp e agendamento",
        flowo:
          "A IA conversa, consulta horários e registra o agendamento; a equipe pode pausar e retomar a automação.",
        competitor:
          "O site apresenta bot no WhatsApp que entende serviços, consulta disponibilidade por barbeiro e agenda.",
      },
      {
        criterion: "Horários da equipe",
        flowo:
          "Cada profissional pode ter dias, turnos, folgas, serviços e duração próprios nos planos com equipe.",
        competitor:
          "Cada barbeiro tem agenda, horários, serviços e bloqueios próprios, segundo a página oficial.",
      },
      {
        criterion: "Pagamento e reserva",
        flowo:
          "Não há sinal ou pagamento para reservar; PIX e cartão integrados são opcionais depois do atendimento.",
        competitor:
          "A página divulga cobrança de sinal por PIX, clube com cobrança recorrente e pacotes vendidos antecipadamente.",
      },
      {
        criterion: "Operação ampliada",
        flowo:
          "Agenda, comandas, clientes, campanhas, cashback, fiscal assistido e recebimentos opcionais.",
        competitor:
          "Agenda, caixa, comissão, CRM, estoque, clube, fidelidade, pacotes, cupons e relatórios em PDF.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          "Solo por R$ 249 e Equipe por R$ 549/mês; Empresarial sob consulta. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe; sem fidelidade.",
        competitor:
          "Planos de R$ 59, R$ 99, R$ 179 e R$ 299/mês, teste de sete dias e extras de capacidade publicados.",
      },
    ],
    faq: [
      {
        question: "Flowo e Opero agendam pelo WhatsApp?",
        answer:
          "Sim. As duas plataformas apresentam uma automação que consulta disponibilidade por profissional e registra o horário a partir da conversa no WhatsApp.",
      },
      {
        question: "Qual é mais barato, Flowo ou Opero?",
        answer:
          "A Opero publica entrada de R$ 59/mês e o Flowo começa em R$ 249/mês. Compare os limites de profissionais, números, notificações, implantação e recursos necessários em cada plano.",
      },
      {
        question: "Qual cobra sinal para agendar?",
        answer:
          "O Flowo não oferece sinal ou pagamento antecipado para reservar. A Opero divulga cobrança de sinal por PIX como uma das ferramentas para horários de pico.",
      },
      {
        question: "Quando o Flowo pode fazer mais sentido?",
        answer:
          "Quando a barbearia quer configuração acompanhada, atendimento humano no mesmo fluxo e liberdade para receber fora da plataforma sem exigir pagamento antes do serviço.",
      },
    ],
    sources: [
      {
        label: "Opero para barbearias",
        url: "https://operosistemas.com.br/sistema-para-barbearia",
        scope:
          "WhatsApp, agenda, equipe, pagamentos, comissão, CRM, funcionalidades, preços, teste e extras.",
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
