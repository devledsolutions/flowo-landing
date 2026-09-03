import { formatBRL, getPlan } from "./pricing-data";

const FLOWO_SOLO_PRICE = formatBRL(getPlan("solo").monthly);
const FLOWO_EQUIPE_PRICE = formatBRL(getPlan("equipe").monthly);

export const COMPARISON_LAST_VERIFIED = "2026-09-03";
export const COMPARISON_LAST_VERIFIED_LABEL = "3 de setembro de 2026";

export interface ComparisonSource {
  label: string;
  url: string;
  scope: string;
  checkedAt: string;
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
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Não divulgada" },
      { criterion: "Entrada publicada", flowo: `${FLOWO_SOLO_PRICE}/mês`, competitor: "R$ 79,90/mês" },
    ],
    priceSummary:
      `O Flowo começa em ${FLOWO_SOLO_PRICE}/mês. A jornada pública é paga; a equipe pode conceder uma avaliação assistida de 14 dias a clientes elegíveis do Solo ou Equipe. O AppBarber publica R$ 79,90/mês para um profissional no plano mensal e R$ 55,90/mês no anual, com faixas maiores conforme o número de profissionais, e teste grátis de 30 dias. Confirme as condições vigentes.`,
    keyDifferences: [
      "No Flowo, a IA no WhatsApp faz parte do produto principal.",
      "No AppBarber, o aplicativo é um dos canais centrais para clientes e profissionais.",
      "As páginas oficiais do AppBarber não divulgam atendimento com IA.",
      "O AppBarber publica uma entrada de preço menor e cobra por faixa de profissionais.",
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
          "A página de funcionalidades descreve lembretes por notificação no aplicativo, e-mail e SMS, e o envio de notícias e promoções pelo aplicativo ou SMS. O blog oficial cita envio de SMS e WhatsApp para divulgar pacotes e promoções.",
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
          `Planos Solo de ${FLOWO_SOLO_PRICE} e Equipe de ${FLOWO_EQUIPE_PRICE} por mês; Empresarial sob consulta, com contratação assistida e sem fidelidade.`,
        competitor:
          "R$ 79,90/mês para um profissional no plano mensal e R$ 55,90/mês no anual, com faixas de 2 a 5, 6 a 15 e mais de 15 profissionais. Teste grátis de 30 dias com todas as funcionalidades.",
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
          `Na conferência de ${COMPARISON_LAST_VERIFIED_LABEL}, o AppBarber publicava R$ 79,90/mês para um profissional no plano mensal e R$ 55,90/mês no anual, enquanto o Flowo começava em ${FLOWO_SOLO_PRICE}/mês. Os produtos são diferentes: no Flowo, a recepção com IA no WhatsApp faz parte do produto principal.`,
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
      {
        question: "O AppBarber atende com IA no WhatsApp?",
        answer:
          "As páginas oficiais do AppBarber que consultamos não divulgam atendimento com inteligência artificial. Os canais descritos são o aplicativo, o e-mail e o SMS, e o blog oficial cita envio de WhatsApp para promoções. Confirme com o AppBarber antes de decidir.",
      },
    ],
    sources: [
      {
        label: "Site oficial do AppBarber",
        url: "https://www.appbarber.com.br/",
        scope:
          "Módulos web e aplicativo, tabela de preços por faixa de profissionais, teste grátis e perguntas frequentes.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Funcionalidades do AppBarber",
        url: "https://www.appbarber.com.br/funcionalidades/",
        scope:
          "Lista de recursos com os canais usados em lembretes, notícias e promoções.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Blog oficial do AppBarber",
        url: "https://blog.appbarber.com.br/2024/02/01/marketing-para-barbearias-estrategias-infaliveis/",
        scope:
          "Único texto oficial que cita envio de mensagens por WhatsApp para promoções.",
        checkedAt: "2026-09-03",
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
      "Compare Flowo e Trinks em IA no WhatsApp, agenda, portal de agendamento, pagamentos, comissões e preço, incluindo o custo do Trinks IA.",
    eyebrow: "IA no plano ou IA cobrada por créditos",
    headline: "Flowo vs Trinks: a IA vem no plano ou à parte?",
    heroSummary:
      "O Flowo inclui a IA do WhatsApp no plano; na Trinks, a IA é contratada à parte do sistema.",
    summary:
      "A Trinks oferece um ecossistema amplo para beleza e bem-estar, com agenda online, portal de agendamento, estoque, clube de assinaturas, soluções fiscais e pagamentos. A Trinks também publica o Trinks IA, uma recepção no WhatsApp cobrada por créditos, além do plano. O Flowo concentra sua proposta na recepção com IA pelo WhatsApp incluída em todos os planos.",
    flowoFit:
      "Barbearias que recebem grande parte dos pedidos pelo WhatsApp e querem a IA atendendo e agendando como parte central de todos os planos.",
    competitorFit:
      "Negócios que valorizam portal de agendamento, fila de espera, estoque, clube de assinaturas, autoatendimento e um ecossistema maduro para beleza e bem-estar.",
    honestVerdict:
      "A Trinks é mais ampla como ecossistema e já tem IA no WhatsApp. A diferença está no pacote: no Flowo a IA vem no plano, na Trinks ela é um contrato separado por créditos. Compare o custo total, não só a mensalidade de entrada.",
    snapshotQuestion: "Você precisa de uma recepção focada ou de um ecossistema mais amplo?",
    snapshotRows: [
      { criterion: "Canal central", flowo: "WhatsApp", competitor: "Agenda online e ecossistema" },
      { criterion: "IA no WhatsApp", flowo: "Incluída no plano", competitor: "Contratada à parte, a partir de R$ 199/mês" },
      { criterion: "Entrada publicada", flowo: `${FLOWO_SOLO_PRICE}/mês`, competitor: "R$ 76/mês no anual" },
    ],
    priceSummary:
      `O Flowo começa em ${FLOWO_SOLO_PRICE}/mês, com a IA do WhatsApp incluída. A jornada pública é paga; clientes elegíveis do Solo ou Equipe podem receber uma avaliação assistida de 14 dias. A Trinks publica R$ 76/mês no plano anual e R$ 110/mês no mensal para 1 a 2 profissionais, sem taxa de adesão e com teste de 5 dias. O Trinks IA é cobrado à parte, a partir de R$ 199/mês por 300 créditos. Confirme a composição final com a Trinks.`,
    keyDifferences: [
      "No Flowo, a IA no WhatsApp vem no plano contratado.",
      "Na Trinks, a IA do WhatsApp é um contrato separado, cobrado por créditos.",
      "A Trinks declara uma base ampla de portal de agendamento, pagamentos, estoque, fiscal e autoatendimento.",
      "Vários recursos da Trinks aparecem como itens adicionais na tabela de planos.",
    ],
    rows: [
      {
        criterion: "Caminho principal do agendamento",
        flowo:
          "A conversa no WhatsApp consulta agenda, serviços e profissionais antes de confirmar.",
        competitor:
          "Agenda online via site, app, redes sociais e Google. O Trinks IA responde no WhatsApp e agenda, contratado à parte por créditos.",
      },
      {
        criterion: "WhatsApp e IA",
        flowo:
          "IA que atende, agenda e confirma incluída nos planos; remarcação disponível a partir do Equipe.",
        competitor:
          "Rotinas de mensagens por WhatsApp, SMS e e-mail aparecem como item adicional. O Trinks IA agenda, cancela e reagenda no WhatsApp, com planos próprios a partir de R$ 199/mês. A Trinks também integra bots de parceiros.",
      },
      {
        criterion: "Descoberta de novos clientes",
        flowo:
          "A proposta é converter melhor a demanda que já chega aos canais da própria barbearia.",
        competitor:
          "A Trinks mantém o portal trinks.com e canais de agendamento que também ajudam clientes a encontrar estabelecimentos.",
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
          `Solo por ${FLOWO_SOLO_PRICE} e Equipe por ${FLOWO_EQUIPE_PRICE}/mês; Empresarial sob consulta. A avaliação assistida de 14 dias pode ser concedida manualmente a clientes elegíveis do Solo ou Equipe; sem fidelidade.`,
        competitor:
          "R$ 76/mês no anual e R$ 110/mês no mensal para 1 a 2 profissionais, demais faixas sob consulta. Sem taxa de adesão, teste de 5 dias e vários recursos como itens adicionais.",
      },
    ],
    faq: [
      {
        question: "Qual é a principal diferença entre Flowo e Trinks?",
        answer:
          "As duas atendem no WhatsApp com IA. A diferença está no pacote: no Flowo a IA vem no plano, e na Trinks o Trinks IA é contratado à parte, por créditos. A Trinks também oferece um ecossistema mais amplo de beleza e bem-estar.",
      },
      {
        question: "Flowo ou Trinks: qual é melhor para agendar pelo WhatsApp?",
        answer:
          "No Flowo, a IA no WhatsApp faz parte do produto principal. Na Trinks, o Trinks IA é vendido em planos de créditos a partir de R$ 199/mês, somados ao valor do sistema. Some os dois valores antes de comparar.",
      },
      {
        question: "Quando a Trinks pode ser a melhor escolha?",
        answer:
          "Quando portal de agendamento, fila de espera, estoque, clube de assinaturas, autoatendimento ou uma estrutura ampla para beleza e bem-estar pesam mais do que ter a IA do WhatsApp incluída no plano.",
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
          "Agenda com fila de espera, app do profissional, comissões com Belezinha e split, clube, notas fiscais e estoque.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Planos oficiais da Trinks",
        url: "https://negocios.trinks.com/planos/",
        scope:
          "Preços por faixa de profissionais no anual e no mensal, teste grátis, ausência de taxa de adesão e itens adicionais.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Trinks IA",
        url: "https://trinks-ia.netlify.app/",
        scope:
          "Página do Trinks IA linkada pela home comercial da Trinks: assistente no WhatsApp, com planos de créditos e preços publicados. Reconfira o endereço, que fica fora do domínio principal.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Comunicação da Trinks",
        url: "https://negocios.trinks.com/solucoes/comunicacao-para-ir-alem/",
        scope:
          "Mensagens automáticas por WhatsApp, SMS e e-mail, e bots de atendimento de parceiros.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Portal de agendamento Trinks",
        url: "https://www.trinks.com/",
        scope:
          "Busca de estabelecimentos por serviço e cidade para o cliente final.",
        checkedAt: "2026-09-03",
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
      "O BestBarbers oferece uma proposta mais forte para app próprio, assinatura e autoatendimento, e diz no site que o agendamento online substitui o WhatsApp. O Flowo faz o contrário: mantém o WhatsApp como recepção e coloca a IA nessa conversa. A escolha é sobre onde você quer o cliente.",
    snapshotQuestion: "A prioridade é atender no WhatsApp ou publicar um app com sua marca?",
    snapshotRows: [
      { criterion: "Canal do cliente", flowo: "WhatsApp", competitor: "App próprio e link" },
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Não divulgada" },
      { criterion: "Entrada publicada", flowo: `${FLOWO_SOLO_PRICE}/mês`, competitor: "Básico grátis; app a R$ 299" },
    ],
    priceSummary:
      `O Flowo começa em ${FLOWO_SOLO_PRICE}/mês. A jornada pública é paga; clientes elegíveis do Solo ou Equipe podem receber uma avaliação assistida de 14 dias. O BestBarbers publica um plano básico gratuito e o plano App Exclusivo a partir de R$ 299/mês. Confirme os recursos e equipamentos da proposta vigente.`,
    keyDifferences: [
      "No Flowo, o cliente pode conversar e agendar no WhatsApp sem baixar um aplicativo.",
      "O BestBarbers diferencia sua oferta com app próprio, clube de assinaturas, notificações push e totem opcional.",
      "O site do BestBarbers apresenta o agendamento online como substituto do WhatsApp.",
      "As duas propostas cobrem agenda, clientes, financeiro e comissões, mas partem de canais diferentes.",
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
          "Histórico, campanhas e cashback configurável. O Flowo Recupera é um módulo à parte, ainda em teste acompanhado.",
        competitor:
          "Clube de assinaturas com cobrança automática por cartão, Pix ou boleto, controle de inadimplentes e planos dentro do aplicativo.",
      },
      {
        criterion: "Posição sobre o WhatsApp",
        flowo:
          "O WhatsApp é a recepção. A IA responde, consulta a agenda e registra o horário na mesma conversa.",
        competitor:
          "O site oficial apresenta o agendamento online como substituto do WhatsApp e das ligações.",
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
          `Solo por ${FLOWO_SOLO_PRICE} e Equipe por ${FLOWO_EQUIPE_PRICE}/mês; Empresarial sob consulta. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe; IA no WhatsApp incluída e sem fidelidade.`,
        competitor:
          "Plano básico gratuito e App Exclusivo a partir de R$ 299/mês. O app com a marca da barbearia leva em média 15 a 30 dias úteis para ser publicado, conforme a aprovação da Apple e do Google.",
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
          "O cliente não precisa baixar aplicativo para conversar e agendar com o Flowo pelo WhatsApp. No BestBarbers, o app próprio é o diferencial central, e a plataforma também oferece um link de agendamento que dispensa download.",
      },
      {
        question: "Flowo ou BestBarbers: qual é mais barato?",
        answer:
          `O BestBarbers publica um plano básico gratuito e App Exclusivo a partir de R$ 299/mês. O Flowo começa em ${FLOWO_SOLO_PRICE}/mês e inclui a recepção com IA no WhatsApp. Compare o pacote completo e o canal que sua barbearia quer priorizar.`,
      },
      {
        question: "Quando o BestBarbers pode ser a melhor escolha?",
        answer:
          "Quando app próprio, clube de assinaturas, notificações push, totem ou gestão multi-unidades pesam mais do que manter o WhatsApp como porta principal do agendamento.",
      },
      {
        question: "O BestBarbers atende com IA no WhatsApp?",
        answer:
          "As páginas oficiais que consultamos não divulgam atendimento com inteligência artificial. Os lembretes são enviados por notificação no aplicativo e por SMS, e o site apresenta o agendamento online como substituto do WhatsApp.",
      },
    ],
    sources: [
      {
        label: "BestBarbers para barbearias",
        url: "https://www.bestbarbers.app/sistema-para-barbearia",
        scope:
          "Funcionalidades, os dois planos com preço, prazo para começar e perguntas frequentes.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Site oficial do BestBarbers",
        url: "https://www.bestbarbers.app/",
        scope:
          "App com a marca da barbearia, assinaturas, notas fiscais, estoque e link de agendamento.",
        checkedAt: "2026-09-03",
      },
      {
        label: "App próprio do BestBarbers",
        url: "https://www.bestbarbers.app/app-proprio-barbearia",
        scope:
          "Prazo de desenvolvimento e publicação nas lojas da Apple e do Google.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Agendamento online do BestBarbers",
        url: "https://www.bestbarbers.app/agendamento-online",
        scope:
          "Link de agendamento, lembretes por push e SMS, e a posição da empresa sobre o WhatsApp.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Totem do BestBarbers",
        url: "https://www.bestbarbers.app/totem-autoatendimento",
        scope:
          "Totem como item opcional somado ao plano App Exclusivo.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Clube de assinaturas do BestBarbers",
        url: "https://www.bestbarbers.app/clube-de-assinaturas",
        scope:
          "Cobrança recorrente por cartão, Pix ou boleto e bloqueio de inadimplentes.",
        checkedAt: "2026-09-03",
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
      "Quem prioriza começar com baixo custo, configurar sozinho e pagar à parte por IA, WhatsApp oficial, NFS-e ou loja online conforme a necessidade.",
    honestVerdict:
      "O Barbeiro.app tem uma entrada comercial mais acessível e mais módulos de autosserviço. O Flowo custa mais porque vende a recepção com IA no WhatsApp como parte do pacote principal, não como uma extensão opcional.",
    snapshotQuestion: "Você quer a IA incluída ou prefere montar um pacote modular?",
    snapshotRows: [
      { criterion: "Canal principal", flowo: "WhatsApp com IA", competitor: "Página e complementos" },
      { criterion: "IA", flowo: "Incluída", competitor: "Complemento ou Enterprise" },
      { criterion: "Entrada publicada", flowo: `${FLOWO_SOLO_PRICE}/mês`, competitor: "Grátis; Pro R$ 59,90" },
    ],
    priceSummary:
      `O Flowo começa em ${FLOWO_SOLO_PRICE}/mês. O Barbeiro.app publica plano gratuito, Pro por R$ 59,90/mês, WhatsApp por R$ 99,00/mês e Enterprise por R$ 139,90/mês, todos para 2 profissionais e com desconto no anual. Assistente de IA, WhatsApp Pro, NFS-e e Loja Online são complementos pagos em qualquer plano e vêm inclusos no Enterprise. Confirme o valor de profissionais extras.`,
    keyDifferences: [
      "Flowo inclui a recepção com IA no WhatsApp em todos os planos.",
      "Barbeiro.app oferece plano gratuito e vende assistente de IA, WhatsApp oficial, NFS-e e loja online como complementos pagos; todos vêm inclusos no plano Enterprise.",
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
          "Assistente de IA custa R$ 29,90/mês e responde dúvidas, agenda e remarca pelo chat. O atendimento pelo WhatsApp oficial é outro complemento, o WhatsApp Pro, por R$ 39,90/mês. Os dois vêm inclusos no Enterprise.",
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
          "Autosserviço. O site fala em conta pronta em 2 a 3 minutos e teste de 14 dias sem cartão.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          `Solo por ${FLOWO_SOLO_PRICE} e Equipe por ${FLOWO_EQUIPE_PRICE}/mês; Empresarial sob consulta. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe; IA no WhatsApp incluída.`,
        competitor:
          "Plano gratuito, Pro por R$ 59,90/mês, WhatsApp por R$ 99,00/mês e Enterprise por R$ 139,90/mês, todos para 2 profissionais; complementos disponíveis em qualquer plano.",
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
          "O preço de entrada publicado é menor: o Barbeiro.app tem plano gratuito, Pro por R$ 59,90/mês, WhatsApp por R$ 99,00/mês e Enterprise por R$ 139,90/mês, cada um para 2 profissionais. O Enterprise já inclui os complementos. Nos outros planos, some o que a sua barbearia precisa e confirme o custo de profissionais extras.",
      },
      {
        question: "Qual oferece mais recursos de fidelidade?",
        answer:
          "O Barbeiro.app publica programa de fidelidade com pontos, recompensas e níveis, programa de indicação e assinaturas recorrentes. O Flowo trabalha com histórico, campanhas e cashback configurável. São modelos de relacionamento diferentes.",
      },
      {
        question: "Para quem o Flowo tende a ser melhor?",
        answer:
          "Para uma barbearia que trata o WhatsApp como principal porta de entrada e quer atendimento, agenda e confirmação conectados desde o início, com configuração acompanhada.",
      },
    ],
    sources: [
      {
        label: "Planos e preços do Barbeiro.app",
        url: "https://www.barbeiro.app/",
        scope:
          "Planos Pro, WhatsApp e Enterprise, valores mensal e anual, profissionais inclusos, complementos e teste de 14 dias.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Funcionalidades do Barbeiro.app",
        url: "https://www.barbeiro.app/funcionalidades",
        scope:
          "Lista de recursos, plano gratuito, fidelidade com pontos e níveis, indicação, loja online e complementos com preço.",
        checkedAt: "2026-09-03",
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
      "Operações que priorizam pagamento e split no ato, antecipação de comissão para a equipe, estoque, clube de assinaturas, dados ou uma plataforma ampla para vários negócios de beleza.",
    honestVerdict:
      "A Avec apresenta maior amplitude de gestão administrativa e serviços financeiros. O Flowo é mais focado na experiência conversacional da barbearia e torna essa IA parte do plano, não um complemento.",
    snapshotQuestion: "O gargalo está na recepção ou no ecossistema financeiro?",
    snapshotRows: [
      { criterion: "Foco principal", flowo: "Recepção no WhatsApp", competitor: "Gestão e finanças" },
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Recurso adicional" },
      { criterion: "Entrada publicada", flowo: `${FLOWO_SOLO_PRICE}/mês`, competitor: "R$ 88,90/mês no anual" },
    ],
    priceSummary:
      `O Flowo publica três planos a partir de ${FLOWO_SOLO_PRICE}/mês. A Avec publica R$ 88,90/mês no anual e R$ 99,90/mês no mensal para 1 a 2 profissionais; as faixas de 3 a 5, 6 a 10, 11 a 20 e 21 ou mais profissionais ficam sob consulta. Na tabela oficial, WhatsApp integrado, Avec IA, Avec Pay, split e emissão de notas fiscais são recursos adicionais.`,
    keyDifferences: [
      "A IA de recepção no WhatsApp está incluída nos planos Flowo.",
      "A Avec marca IA, WhatsApp, Avec Pay, split e notas fiscais como recursos adicionais em todas as faixas de plano.",
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
          "A Avec IA é uma recepção no WhatsApp que atende, agenda e envia lembretes. Na tabela de planos ela aparece como recurso adicional nas cinco faixas, sem preço publicado.",
      },
      {
        criterion: "Pagamentos e comissões",
        flowo:
          "Pagamento integrado opcional no pós-atendimento; no Empresarial, o gestor revisa e inicia o repasse.",
        competitor:
          "Split automático na maquininha AvecPay e Vale Rápido, em que o próprio profissional antecipa as comissões dele pelo app Avec PRO. Avec Pay e split são recursos adicionais.",
      },
      {
        criterion: "Gestão ampla",
        flowo:
          "Agenda, equipe, comandas, histórico, campanhas e relatórios com foco em barbearia.",
        competitor:
          "Estoque, notas fiscais, clube de assinaturas, metas e ranking por barbeiro, e o Avec Lake para dados e BI.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          `Solo por ${FLOWO_SOLO_PRICE} e Equipe por ${FLOWO_EQUIPE_PRICE}/mês; Empresarial sob consulta. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe; sem fidelidade.`,
        competitor:
          "R$ 88,90/mês no anual e R$ 99,90/mês no mensal para 1 a 2 profissionais; faixas maiores sob consulta e vários recursos vendidos à parte.",
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
          "No Flowo, a IA que atende, agenda e confirma está incluída nos planos. A Avec também tem uma IA que atende no WhatsApp, mas a tabela oficial marca a Avec IA como recurso adicional em todas as faixas. Confirme o valor com a Avec.",
      },
      {
        question: "Quando a Avec pode ser a melhor escolha?",
        answer:
          "Quando split na maquininha, antecipação de comissão pelo app do profissional, estoque, clube de assinaturas, notas fiscais e dados pesam mais na decisão do que uma recepção de WhatsApp incluída no plano.",
      },
      {
        question: "Quando escolher o Flowo?",
        answer:
          "Quando o principal gargalo é responder e agendar clientes no WhatsApp enquanto a equipe trabalha, e a barbearia quer esse fluxo como núcleo do produto.",
      },
    ],
    sources: [
      {
        label: "Planos oficiais da Avec",
        url: "https://negocios.avec.app/avec-planos",
        scope:
          "Faixas por número de profissionais, preço mensal e anual da faixa de entrada e quais recursos são adicionais.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Avec para barbearias",
        url: "https://negocios.avec.app/sistema-para-barbearia-gestao-e-clientes",
        scope:
          "Split com a maquininha AvecPay, Vale Rápido, estoque, notas fiscais, clube de assinaturas, metas e Avec Lake.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Avec IA",
        url: "https://negocios.avec.app/funcionalidade/avec-ia",
        scope:
          "Assistente que atende, agenda e confirma pelo WhatsApp, com lembretes e convite de retorno.",
        checkedAt: "2026-09-03",
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
      "Negócios que priorizam estoque detalhado, fiscal, conciliação bancária, pacotes, convênios e controles administrativos mais extensos, com implantação e treinamento ao vivo.",
    honestVerdict:
      "A Graces descreve um backoffice mais profundo em estoque e financeiro, e também divulga agendamento com IA pelo WhatsApp. A diferença é que no Flowo essa recepção vem no plano, e na Graces o WhatsApp entra como módulo adicional.",
    snapshotQuestion: "Você precisa primeiro de recepção automática ou de gestão administrativa profunda?",
    snapshotRows: [
      { criterion: "Foco principal", flowo: "Recepção no WhatsApp", competitor: "Gestão administrativa" },
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Divulgada, plano não publicado" },
      { criterion: "Entrada publicada", flowo: `${FLOWO_SOLO_PRICE}/mês`, competitor: "R$ 94,90/mês no mensal" },
    ],
    priceSummary:
      `O Flowo começa em ${FLOWO_SOLO_PRICE}/mês. A Graces publica Essencial por R$ 94,90/mês no mensal e R$ 79,90/mês no anual, com máximo de 3 profissionais. Controle sai por R$ 121,90/mês e Exclusivo por R$ 179,90/mês, os dois com R$ 12,50 a mais por profissional. WhatsApp, fiscal e aplicativo do cliente são módulos adicionais. Confirme o pacote aplicável.`,
    keyDifferences: [
      "Flowo inclui a IA no WhatsApp em todos os planos. A Graces divulga agendamento com IA pelo WhatsApp, mas não publica em qual plano ele entra.",
      "Graces apresenta forte profundidade em estoque, financeiro, fiscal e marketing.",
      "A Graces publica entrada de preço menor; o Flowo reúne recepção conversacional e operação em uma proposta mais específica.",
    ],
    rows: [
      {
        criterion: "Caminho principal do agendamento",
        flowo:
          "O cliente conversa no WhatsApp e a IA agenda com base na disponibilidade real.",
        competitor:
          "Agenda com a marca da barbearia e lembretes automáticos. O agendamento com IA pelo WhatsApp aparece na página de barbearia, e o aplicativo de agendamento para o cliente é módulo adicional.",
      },
      {
        criterion: "IA e WhatsApp",
        flowo:
          "Atendimento, agendamento e confirmação por IA incluídos nos planos.",
        competitor:
          "A página de barbearia diz que o cliente agenda e altera horários pelo WhatsApp com IA, 24 horas por dia. Na tabela de planos, o envio automático por WhatsApp é módulo adicional e não há linha de IA. Peça por escrito em qual plano ela entra.",
      },
      {
        criterion: "Financeiro e estoque",
        flowo:
          "Comandas e formas de recebimento conectadas; pagamentos integrados são opcionais.",
        competitor:
          "Contas a pagar e a receber, conciliação por extratos bancários e cartões, controle de uso interno por doses, grama ou peso e transferência de estoque entre lojas.",
      },
      {
        criterion: "Marketing e relacionamento",
        flowo:
          "Campanhas com franquia mensal por plano, histórico e cashback configurável.",
        competitor:
          "Campanhas por e-mail e WhatsApp, convênio com empresas, voucher, vale presente e ficha do cliente com histórico, pacotes e sessões.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          `Solo por ${FLOWO_SOLO_PRICE} e Equipe por ${FLOWO_EQUIPE_PRICE}/mês; Empresarial sob consulta; IA de recepção incluída.`,
        competitor:
          "Essencial por R$ 94,90/mês para até 3 profissionais, Controle por R$ 121,90/mês e Exclusivo por R$ 179,90/mês, os dois com R$ 12,50 por profissional; anual mais barato e módulos cobrados à parte.",
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
          `Na conferência de ${COMPARISON_LAST_VERIFIED_LABEL}, a Graces publicava Essencial por R$ 94,90/mês para até 3 profissionais e o Flowo começava em ${FLOWO_SOLO_PRICE}. Os planos Controle e Exclusivo da Graces cobram R$ 12,50 por profissional além do valor base. Compare também quais módulos você precisa contratar à parte.`,
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
      {
        question: "A Graces tem IA no WhatsApp?",
        answer:
          "A página de barbearia da Graces diz que o cliente agenda e altera horários pelo WhatsApp com IA, 24 horas por dia. A tabela de planos não mostra em qual plano isso entra nem o preço. No Flowo, a recepção com IA no WhatsApp está incluída nos planos.",
      },
    ],
    sources: [
      {
        label: "Planos oficiais da Graces",
        url: "https://graces.com.br/planos/",
        scope:
          "Planos Essencial, Controle e Exclusivo, valores mensal e anual, cobrança por profissional, comparativo de recursos e módulos adicionais.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Graces para barbearias",
        url: "https://graces.com.br/barbearia/",
        scope:
          "Agenda com a marca, planos e pacotes, comanda e comissão, estoque, módulos fiscais, automação de WhatsApp com agendamento por IA, implantação e treinamento.",
        checkedAt: "2026-09-03",
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
      "Compare Flowo e Barva em IA no WhatsApp, agenda, financeiro, estoque, preço, teste grátis e perfil ideal para sua barbearia.",
    eyebrow: "IA incluída ou gestão-base com módulos opcionais",
    headline: "Flowo vs Barva: IA incluída ou módulos?",
    heroSummary:
      "O Flowo inclui a IA no produto; o Barva combina uma base obrigatória de gestão com módulos opcionais.",
    summary:
      "O Barva combina uma base obrigatória de gestão com módulos opcionais de IA para atendimento e recuperação de clientes. O Flowo inclui a recepção com IA no WhatsApp em todos os planos e conecta a conversa à agenda e à comanda.",
    flowoFit:
      "Barbearias que querem a IA no WhatsApp como parte do produto, com preço publicado desde o primeiro plano e a conversa ligada à agenda.",
    competitorFit:
      "Operações que preferem começar por uma gestão ampla, com estoque, fornecedores, compras, clube e dashboards, ativando módulos de IA quando fizer sentido.",
    honestVerdict:
      "O Barva apresenta uma base administrativa mais ampla e permite contratar a gestão sem IA. O Flowo é mais específico para a barbearia que já decidiu transformar o WhatsApp em recepção e quer essa capacidade incluída desde o primeiro plano.",
    snapshotQuestion: "Você quer começar pela IA ou montar a gestão com módulos opcionais?",
    snapshotRows: [
      { criterion: "Arquitetura", flowo: "IA incluída", competitor: "Gestão-base + módulos" },
      { criterion: "Como avaliar", flowo: "Avaliação assistida de 14 dias a elegíveis", competitor: "Teste de 7 dias" },
      { criterion: "Preço", flowo: `Público, desde ${FLOWO_SOLO_PRICE}`, competitor: "Sob proposta" },
    ],
    priceSummary:
      `O Flowo publica Solo por ${FLOWO_SOLO_PRICE} e Equipe por ${FLOWO_EQUIPE_PRICE} por mês; o Empresarial é sob consulta. A avaliação assistida de 14 dias pode ser concedida a clientes elegíveis do Solo ou Equipe. O Barva não publica preço em reais: são sete dias de teste e uma proposta montada por profissionais que atendem e módulos escolhidos.`,
    keyDifferences: [
      "A recepção com IA no WhatsApp está incluída nos três planos Flowo.",
      "No Barva, a gestão completa é obrigatória e as IAs de atendimento e recuperação são módulos opcionais.",
      "O Barva divulga estoque, fornecedores, compras e clube; o Flowo concentra a proposta na recepção, agenda, equipe e fechamento do atendimento.",
      "O Barva monta a proposta contando apenas quem atende cliente. Recepção e administração ficam de fora da conta.",
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
          "A agenda de todos os barbeiros fica em um lugar nos planos com equipe, com até 5 profissionais no Equipe e sem limite no Empresarial.",
        competitor:
          "A página oficial apresenta horários, serviços, profissionais e encaixes na base de gestão. A consulta de disponibilidade pela conversa aparece na página de WhatsApp.",
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
          "A jornada pública é paga. A equipe pode conceder uma avaliação assistida de 14 dias, sem cartão, a clientes elegíveis do Solo ou Equipe.",
        competitor:
          "Telas do sistema, vídeo, demonstração guiada, proposta personalizada e teste grátis de sete dias com todas as funcionalidades liberadas.",
      },
      {
        criterion: "Modelo comercial publicado",
        flowo:
          `Solo por ${FLOWO_SOLO_PRICE} e Equipe por ${FLOWO_EQUIPE_PRICE}/mês; Empresarial sob consulta, IA incluída e sem fidelidade. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe.`,
        competitor:
          "Preço sob proposta, montada pelo número de profissionais que atendem e pelos módulos escolhidos. A gestão-base é obrigatória e as IAs são opcionais.",
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
      {
        question: "O Barva cobra por profissional?",
        answer:
          "A proposta do Barva pede quantos profissionais realizam atendimentos. A própria página diz que recepção, administração e outros perfis de apoio não entram nessa contagem.",
      },
    ],
    sources: [
      {
        label: "Barva, página inicial",
        url: "https://www.barva.com.br/",
        scope:
          "Lista de módulos da gestão obrigatória, os dois módulos de IA como opcionais, teste de 7 dias e regra de contagem de profissionais.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Barva, planos e proposta",
        url: "https://www.barva.com.br/precos",
        scope:
          "Proposta personalizada sem preço em reais, gestão obrigatória, módulos de IA opcionais e teste de 7 dias.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Barva, WhatsApp para barbearia",
        url: "https://www.barva.com.br/whatsapp-para-barbearia",
        scope:
          "Como o WhatsApp se liga à agenda e aos clientes, e a IA apresentada como diferencial opcional.",
        checkedAt: "2026-09-03",
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
      "Compare Flowo e Opero em IA no WhatsApp, agenda por barbeiro, comissão, pagamentos, cobrança de sinal, preço e limites por plano.",
    eyebrow: "Duas propostas centradas no WhatsApp",
    headline: "Flowo vs Opero: onde o fluxo muda?",
    heroSummary:
      "Os dois divulgam agendamento pelo WhatsApp com IA. Preço, limites por plano e cobrança de sinal separam as propostas.",
    summary:
      "Flowo e Opero colocam o WhatsApp no centro do agendamento, com IA, e conectam a conversa à agenda por profissional. A diferença aparece no modelo comercial, nos limites de cada plano e na escolha sobre cobrar sinal.",
    flowoFit:
      "Barbearias que não querem cobrar sinal para reservar e preferem deixar o recebimento integrado como escolha depois do atendimento.",
    competitorFit:
      "Quem prioriza menor preço inicial, IA no WhatsApp já no plano de entrada, sete dias de teste, estoque, clube, pacotes e a possibilidade de cobrar sinal ou vender serviços antecipadamente.",
    honestVerdict:
      "As duas incluem IA no WhatsApp em todos os planos publicados. A Opero entra mais barata, trabalha com cota de profissionais e de mensagens por plano e oferece cobrança de sinal, clube e pacotes. O Flowo cobra mais na entrada e se separa por não pedir sinal para reservar, deixando PIX e cartão como escolha depois do serviço.",
    snapshotQuestion: "Se os dois usam WhatsApp, onde está a diferença prática?",
    snapshotRows: [
      { criterion: "IA no WhatsApp", flowo: "Incluída", competitor: "Incluída nos quatro planos" },
      { criterion: "Para reservar", flowo: "Sem sinal", competitor: "Pode cobrar sinal" },
      { criterion: "Entrada publicada", flowo: `${FLOWO_SOLO_PRICE}/mês`, competitor: "R$ 59/mês" },
    ],
    priceSummary:
      `O Flowo começa em ${FLOWO_SOLO_PRICE}/mês. A jornada pública é paga; clientes elegíveis do Solo ou Equipe podem receber uma avaliação assistida de 14 dias. A Opero publica quatro planos de R$ 59 a R$ 299/mês, com 25% de desconto no anual e teste de sete dias sem cartão. Confira quantos profissionais e quantas notificações cada plano cobre.`,
    keyDifferences: [
      "As duas plataformas incluem IA no WhatsApp ligada à agenda por profissional em todos os planos publicados.",
      "O Flowo não cobra sinal para reservar e deixa o pagamento integrado como opção depois do atendimento.",
      "A Opero publica entrada mais barata, teste grátis de sete dias e recursos como estoque, clube, pacotes, cupons e cobrança antecipada.",
      "A Opero define cota de profissionais e de mensagens por plano; o Flowo publica limites de profissionais e de mensagens de campanha por plano.",
    ],
    rows: [
      {
        criterion: "WhatsApp e agendamento",
        flowo:
          "A IA atende, agenda e confirma pelo WhatsApp em todos os planos, e o cliente também cancela pelo chat. A equipe pode pausar a IA, assumir a conversa e devolver depois.",
        competitor:
          "O site apresenta um bot com IA no WhatsApp que entende os serviços, consulta a agenda por barbeiro e marca o horário.",
      },
      {
        criterion: "Horários da equipe",
        flowo:
          "A agenda de todos os barbeiros fica em um lugar. O Equipe cobre até 5 profissionais e o Empresarial não tem limite.",
        competitor:
          "Cada barbeiro tem coluna, horários e bloqueio individual. A cota é por plano: 1, 3, 8 ou 20 profissionais.",
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
          `Solo por ${FLOWO_SOLO_PRICE} e Equipe por ${FLOWO_EQUIPE_PRICE}/mês; Empresarial sob consulta. Avaliação assistida de 14 dias pode ser concedida a elegíveis do Solo ou Equipe; sem fidelidade.`,
        competitor:
          "Planos de R$ 59, R$ 99, R$ 179 e R$ 299/mês, com desconto de 25% no anual. Cada plano define quantos profissionais, unidades e notificações de WhatsApp entram. Teste de sete dias sem cartão.",
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
          `A Opero publica entrada de R$ 59/mês para 1 profissional e 80 notificações de WhatsApp por mês. O Flowo começa em ${FLOWO_SOLO_PRICE}/mês para 1 profissional, com até 200 agendamentos e 50 mensagens de campanha. Compare o limite que a sua barbearia vai usar de verdade, não só a entrada.`,
      },
      {
        question: "Qual cobra sinal para agendar?",
        answer:
          "O Flowo não oferece sinal ou pagamento antecipado para reservar. A Opero divulga cobrança de sinal por PIX como uma das ferramentas para horários de pico.",
      },
      {
        question: "Quando o Flowo pode fazer mais sentido?",
        answer:
          "Quando a barbearia não quer pedir sinal para reservar e prefere receber fora da plataforma, ativando PIX e cartão só depois do atendimento.",
      },
    ],
    sources: [
      {
        label: "Opero para barbearias",
        url: "https://operosistemas.com.br/sistema-para-barbearia",
        scope:
          "Bot com IA no WhatsApp, agenda por barbeiro, comissão, caixa, CRM, lembretes, sinal por PIX e relatório em PDF.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Opero, funcionalidades",
        url: "https://operosistemas.com.br/funcionalidades",
        scope:
          "Estoque, clube de assinatura, fidelidade, pacotes, cupons, relatório em PDF, comissão, caixa e link de agendamento.",
        checkedAt: "2026-09-03",
      },
      {
        label: "Opero, planos e comparativo",
        url: "https://operosistemas.com.br/#planos",
        scope:
          "Os quatro preços mensais, limites de profissionais, unidades, clientes e notificações por plano, teste de sete dias e níveis de onboarding.",
        checkedAt: "2026-09-03",
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
