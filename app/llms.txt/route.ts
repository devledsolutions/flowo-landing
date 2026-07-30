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
- [Casos de sucesso](${SITE_URL}/casos-de-sucesso)

## Money pages
- [Sistema de agendamento para barbearia](${SITE_URL}/sistema-agendamento-barbearia)
- [Agenda de barbearia no WhatsApp](${SITE_URL}/agenda-barbearia-whatsapp)
- [Pagamentos opcionais no atendimento](${SITE_URL}/software-barbearia-com-pix)
- [Comissões de barbeiros](${SITE_URL}/recursos/comissoes-barbeiros)
- [Cashback para barbearias](${SITE_URL}/recursos/cashback-barbearia)
- [Nota fiscal com ativação assistida](${SITE_URL}/recursos/nota-fiscal-barbearia)

## Add-ons e acesso acompanhado
- [Flowo Recupera](${SITE_URL}/flowo-recupera): add-on em beta acompanhada para identificar oportunidades de retorno; resultados passam por revisão humana, consentimento e fechamento real da comanda.
- [Aplicativo para barbeiros](${SITE_URL}/aplicativo-para-barbeiros): aplicativo em preparação para iPhone e Android, pensado para agenda, presenças, clientes e comandas da equipe. Ainda não está disponível nas lojas.

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
