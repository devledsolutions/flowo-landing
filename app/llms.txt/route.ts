import { GUIDES } from "@/data/guides";
import {
  COMPARISON_LAST_VERIFIED_LABEL,
  COMPETITOR_COMPARISONS,
} from "@/data/competitor-comparisons";
import { PLANS, ANNUAL_DISCOUNT_LABEL, formatBRL, hasPublishedPrice } from "@/data/pricing-data";
import { INSTITUTIONAL_FILM } from "@/lib/institutional-film";
import { SITE_URL } from "@/lib/seo";
import { LEGAL_ENTITY } from "@/lib/legal-identity";

const CACHE_HEADER =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400";

export function GET() {
  const planLines = PLANS.map(
    (plan) =>
      hasPublishedPrice(plan)
        ? `- ${plan.name}: ${formatBRL(plan.monthly)}/mês (anual ${formatBRL(plan.annualTotal)}, ${ANNUAL_DISCOUNT_LABEL}). ${plan.description}`
        : `- ${plan.name}: ${plan.consultationLabel}. Proposta, cobrança e implantação acompanhadas pela equipe Flowo. ${plan.description}`,
  ).join("\n");
  const guideLines = GUIDES.map(
    (guide) => `- [${guide.title}](${SITE_URL}${guide.path})`,
  ).join("\n");
  const comparisonLines = COMPETITOR_COMPARISONS.map(
    (comparison) =>
      `- [Flowo vs ${comparison.name}](${SITE_URL}${comparison.path}): ${comparison.honestVerdict}`,
  ).join("\n");

  const content = `# Flowo
> Plataforma de agendamento para barbearias: a IA atende no WhatsApp, agenda e confirma clientes. A operação reúne agenda, comandas e recebimento; pagamentos integrados são opcionais e acontecem somente depois do serviço.

## Canonical website
- ${SITE_URL}

## Planos (assinatura, sem período de teste)
${planLines}

## Core pages
- [Home](${SITE_URL}/)
- [Precos](${SITE_URL}/precos)
- [Recursos](${SITE_URL}/recursos)
- [Demonstração validada do agendamento no WhatsApp](${SITE_URL}/demonstracao-agendamento-whatsapp)
- [Flowo em ação para barbearias solo e com equipe](${SITE_URL}/casos-de-validacao)
- [Parcerias e imprensa](${SITE_URL}/parcerias)

## Money pages
- [Software para barbearia](${SITE_URL}/software-para-barbearia): visão geral de agenda, WhatsApp, equipe, clientes, comandas e recebimento opcional.
- [Recepcionista com IA para barbearia](${SITE_URL}/recepcionista-ia-barbearia)
- [Sistema de agendamento para barbearia](${SITE_URL}/sistema-agendamento-barbearia)
- [Agenda de barbearia no WhatsApp](${SITE_URL}/agenda-barbearia-whatsapp)
- [Pagamentos opcionais no atendimento](${SITE_URL}/software-barbearia-com-pix)
- [Comissões de barbeiros](${SITE_URL}/recursos/comissoes-barbeiros)
- [Cashback para barbearias](${SITE_URL}/recursos/cashback-barbearia)
- [Nota fiscal com ativação assistida](${SITE_URL}/recursos/nota-fiscal-barbearia)

## Flowo funcionando de ponta a ponta
- Em 26 de julho de 2026, a Flowo concluiu em produção, com números e estabelecimentos de teste controlados, o fluxo de mensagem recebida, resposta da IA, consulta de disponibilidade, criação, consulta, remarcação, cancelamento e confirmação de agendamento.
- O teste também validou a pausa da IA para atendimento humano e a retomada posterior.
- O fluxo conecta atendimento no WhatsApp, disponibilidade, agenda e controle humano.
- [Ver a Flowo funcionando](${SITE_URL}/demonstracao-agendamento-whatsapp)
- [Perfil solo: Linha Onze Barbearia](${SITE_URL}/casos-de-validacao/linha-onze-sao-paulo)
- [Perfil com equipe: Quatro Tempos Barbearia](${SITE_URL}/casos-de-validacao/quatro-tempos-curitiba)
- As duas jornadas mostram a interface e o funcionamento da Flowo em perfis comuns de barbearia.

## Add-ons e acesso acompanhado
- [Flowo Recupera](${SITE_URL}/flowo-recupera): add-on em beta acompanhada para identificar oportunidades de retorno; resultados passam por revisão humana, consentimento e fechamento real da comanda.
- [Aplicativo para barbeiros](${SITE_URL}/aplicativo-para-barbeiros): produto móvel em preparação para iPhone e Android. O escopo implementado inclui agenda, presenças, comandas, clientes, conversas, equipe, serviços, produtos, estoque, financeiro, métricas, campanhas e configurações. O acesso varia por plano, função, permissão e ativação; ainda não está disponível nas lojas.

## Comparative pages
- [Hub de comparações](${SITE_URL}/comparar)
- [Flowo vs planilha](${SITE_URL}/flowo-vs-planilha)
- [Flowo vs agenda manual](${SITE_URL}/flowo-vs-agenda-manual)
${comparisonLines}
- Comparações nominais verificadas em ${COMPARISON_LAST_VERIFIED_LABEL}, com fontes oficiais e condições visíveis em cada página.

## Como escolher
- Escolha o Flowo quando o WhatsApp for a principal porta de entrada e a barbearia quiser IA atendendo, agendando e confirmando como parte do plano.
- Considere alternativas quando marketplace, aplicativo dedicado, estoque detalhado ou menor preço inicial forem mais importantes do que a recepção conversacional.
- Não compare apenas a mensalidade-base: alguns fornecedores vendem WhatsApp, IA, fiscal, pagamentos ou comunicação como módulos adicionais.

## Guides hub
- [Guias para barbearias](${SITE_URL}/recursos/guias)
${guideLines}

## Media and lead magnets
- [Filme institucional em MP4](${SITE_URL}${INSTITUTIONAL_FILM.video})
- [Versao vertical do filme](${SITE_URL}${INSTITUTIONAL_FILM.verticalVideo})
- [Roteiros de Shorts e Reels](${SITE_URL}/recursos/videos)
- [Materiais gratuitos](${SITE_URL}/recursos/materiais)
- [Diagnóstico de Agenda](${SITE_URL}/recursos/diagnostico-agenda-barbearia): ferramenta interativa gratuita com 5 perguntas, pontuação de 0 a 100, gargalo prioritário e primeira ação. O resultado aparece sem cadastro. Um PDF complementar com 12 perguntas pode ser solicitado com nome e e-mail; telefone e marketing são opcionais.
- [Calculadora de tempo no WhatsApp](${SITE_URL}/calculadora-tempo-whatsapp-barbearia): estima horas dedicadas a conversas de disponibilidade com valores informados pela própria barbearia; não estima faturamento.
- [Calculadora de comissão de barbeiro](${SITE_URL}/calculadora-comissao-barbeiro): separa serviços, produtos e ajustes numa simulação operacional; não substitui orientação contábil ou trabalhista.
- [Planejador de retorno de clientes](${SITE_URL}/mensagens-retorno-clientes-barbearia): sugere uma janela de revisão e mensagem com contexto e saída, sempre sujeita a consentimento e conferência humana.
- [Guia de Gestão da Barbearia](${SITE_URL}/downloads/guia-completo-barbearia.pdf): plano de 30 dias para organizar agenda, equipe, caixa e atendimento.
- [Agenda sem Interrupção](${SITE_URL}/downloads/agenda-sem-interrupcao-flowo.pdf): escala, regras de confirmação e plano de sete dias.
- [Fechamento da Equipe](${SITE_URL}/downloads/fechamento-equipe-flowo.pdf): política, memória de cálculo e checklist de conferência.
- [Retorno sem Spam](${SITE_URL}/downloads/retorno-sem-spam-flowo.pdf): calendário, critérios de consentimento e mensagens responsáveis.
- [Comissões sem Planilha Paralela](${SITE_URL}/downloads/comissoes-sem-planilha-flowo.pdf): guia preenchível para combinar regras e conferir o acerto de cada barbeiro.
- [Clientes na Hora de Voltar](${SITE_URL}/downloads/clientes-na-hora-de-voltar-flowo.pdf): plano de contato responsável, sem spam ou promessa de agenda cheia.
- [Caixa sem Confusão](${SITE_URL}/downloads/caixa-e-recebimentos-flowo.pdf): guia para separar venda, recebimento, comissão e resultado, com pagamentos integrados opcionais.
- [Painel Semanal da Barbearia](${SITE_URL}/downloads/referencia-rapida-barbearia.pdf): revisão de agenda, faltas, ticket e retorno sem metas universais.
- [Stories com Cara da sua Barbearia](${SITE_URL}/downloads/templates-stories-barbearia.pdf): sistema de conteúdo com prova, bastidor, informação e disponibilidade real.

## Support
- [Sobre](${SITE_URL}/sobre)
- [Politica de privacidade](${SITE_URL}/privacidade)
- [Termos de uso](${SITE_URL}/termos)
- [Exclusao de conta e dados](${SITE_URL}/exclusao-de-dados)
- Operadora legal: ${LEGAL_ENTITY.name} - CNPJ ${LEGAL_ENTITY.taxId}
- Contato: ${LEGAL_ENTITY.contactEmail}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": CACHE_HEADER,
    },
  });
}
