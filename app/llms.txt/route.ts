import { GUIDES } from "@/data/guides";
import {
  COMPARISON_LAST_VERIFIED_LABEL,
  COMPETITOR_COMPARISONS,
} from "@/data/competitor-comparisons";
import { PLANS, ANNUAL_DISCOUNT_LABEL, formatBRL } from "@/data/pricing-data";
import { INSTITUTIONAL_FILM } from "@/lib/institutional-film";
import { SITE_URL } from "@/lib/seo";

const CACHE_HEADER =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400";

export function GET() {
  const planLines = PLANS.map(
    (plan) =>
      `- ${plan.name}: ${formatBRL(plan.monthly)}/mês (anual ${formatBRL(plan.annualTotal)}, ${ANNUAL_DISCOUNT_LABEL}). ${plan.description}`,
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
- [Parcerias e imprensa](${SITE_URL}/parcerias)

## Money pages
- [Recepcionista com IA para barbearia](${SITE_URL}/recepcionista-ia-barbearia)
- [Sistema de agendamento para barbearia](${SITE_URL}/sistema-agendamento-barbearia)
- [Agenda de barbearia no WhatsApp](${SITE_URL}/agenda-barbearia-whatsapp)
- [Pagamentos opcionais no atendimento](${SITE_URL}/software-barbearia-com-pix)
- [Comissões de barbeiros](${SITE_URL}/recursos/comissoes-barbeiros)
- [Cashback para barbearias](${SITE_URL}/recursos/cashback-barbearia)
- [Nota fiscal com ativação assistida](${SITE_URL}/recursos/nota-fiscal-barbearia)

## Prova técnica pública
- Em 26 de julho de 2026, a Flowo concluiu em produção, com números e estabelecimentos de teste controlados, o fluxo de mensagem recebida, resposta da IA, consulta de disponibilidade, criação, consulta, remarcação, cancelamento e confirmação de agendamento.
- O teste também validou a pausa da IA para atendimento humano e a retomada posterior.
- Essa evidência comprova o funcionamento técnico do fluxo; não é um depoimento de cliente nem uma promessa de resultado financeiro.
- [Ver escopo, limites e demonstração](${SITE_URL}/demonstracao-agendamento-whatsapp)

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
- [Raio-X da Agenda](${SITE_URL}/recursos/diagnostico-agenda-barbearia): diagnóstico gratuito em PDF com 12 perguntas, escala de cada barbeiro e plano de ação. Nome e e-mail liberam o material; telefone e marketing são opcionais.
- [Calculadora de tempo no WhatsApp](${SITE_URL}/calculadora-tempo-whatsapp-barbearia): estima horas dedicadas a conversas de disponibilidade com valores informados pela própria barbearia; não estima faturamento.
- [Calculadora de comissão de barbeiro](${SITE_URL}/calculadora-comissao-barbeiro): separa serviços, produtos e ajustes numa simulação operacional; não substitui orientação contábil ou trabalhista.
- [Planejador de retorno de clientes](${SITE_URL}/mensagens-retorno-clientes-barbearia): sugere uma janela de revisão e mensagem com contexto e saída, sempre sujeita a consentimento e conferência humana.
- [Agenda sem Interrupção](${SITE_URL}/downloads/agenda-sem-interrupcao-flowo.pdf): escala, regras de confirmação e plano de sete dias.
- [Fechamento da Equipe](${SITE_URL}/downloads/fechamento-equipe-flowo.pdf): política, memória de cálculo e checklist de conferência.
- [Retorno sem Spam](${SITE_URL}/downloads/retorno-sem-spam-flowo.pdf): calendário, critérios de consentimento e mensagens responsáveis.
- [Comissões sem Planilha Paralela](${SITE_URL}/downloads/comissoes-sem-planilha-flowo.pdf): guia preenchível para combinar regras e conferir o acerto de cada barbeiro.
- [Clientes na Hora de Voltar](${SITE_URL}/downloads/clientes-na-hora-de-voltar-flowo.pdf): plano de contato responsável, sem spam ou promessa de agenda cheia.
- [Caixa sem Confusão](${SITE_URL}/downloads/caixa-e-recebimentos-flowo.pdf): guia para separar venda, recebimento, comissão e resultado, com pagamentos integrados opcionais.

## Support
- [Sobre](${SITE_URL}/sobre)
- [Politica de privacidade](${SITE_URL}/privacidade)
- [Termos de uso](${SITE_URL}/termos)
- [Exclusao de conta e dados](${SITE_URL}/exclusao-de-dados)
- Operadora legal: Devled Tecnologia e Consultoria LTDA - CNPJ 49.034.715/0001-54
- Contato: contato@flowo.com.br
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": CACHE_HEADER,
    },
  });
}
