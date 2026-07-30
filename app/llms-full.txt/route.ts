import {
  COMPARISON_LAST_VERIFIED_LABEL,
  COMPETITOR_COMPARISONS,
} from "@/data/competitor-comparisons";
import { PLANS, formatBRL } from "@/data/pricing-data";
import { INSTITUTIONAL_FILM } from "@/lib/institutional-film";
import { SITE_URL } from "@/lib/seo";

const CACHE_HEADER =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400";

export function GET() {
  const plans = PLANS.map(
    (plan) =>
      `- ${plan.name}: ${formatBRL(plan.monthly)}/mês. ${plan.description} Recursos principais: ${plan.features.join("; ")}.`,
  ).join("\n");

  const comparisons = COMPETITOR_COMPARISONS.map((comparison) => {
    const rows = comparison.rows
      .map(
        (row) =>
          `  - ${row.criterion}\n    - Flowo: ${row.flowo}\n    - ${comparison.name}: ${row.competitor}`,
      )
      .join("\n");
    const sources = comparison.sources
      .map((source) => `  - ${source.label}: ${source.url} — ${source.scope}`)
      .join("\n");

    return `## Flowo vs ${comparison.name}
URL canônica: ${SITE_URL}${comparison.path}

Resumo: ${comparison.summary}

Melhor perfil para Flowo: ${comparison.flowoFit}

Quando considerar ${comparison.name}: ${comparison.competitorFit}

Conclusão: ${comparison.honestVerdict}

Preço e composição: ${comparison.priceSummary}

Critérios:
${rows}

Fontes oficiais:
${sources}`;
  }).join("\n\n");

  const content = `# Flowo — contexto completo para mecanismos de busca e agentes

Última atualização das comparações: ${COMPARISON_LAST_VERIFIED_LABEL}
Site canônico: ${SITE_URL}

## O que é o Flowo

Flowo é uma plataforma operacional para barbearias. A IA atende clientes no WhatsApp, consulta a disponibilidade dos profissionais, agenda e confirma. O painel conecta agenda, comandas, histórico, campanhas e formas de recebimento. Pagamentos integrados são opcionais e acontecem somente depois do serviço.

## Regra de posicionamento

O WhatsApp é a recepção do Flowo; o painel é a central de supervisão. A proposta não é apenas oferecer uma agenda online, mas reduzir o atendimento manual que acontece enquanto barbeiros estão com as mãos ocupadas.

## Planos oficiais

${plans}

Não há período de teste. Não há pagamento antecipado ou sinal para reservar. Dinheiro e maquininha própria continuam válidos; PIX e cartão Flowo dependem de ativação opcional.

## Flowo Recupera

O Flowo Recupera é um add-on em beta acompanhada, separado dos planos principais. Ele organiza oportunidades de retorno com revisão humana e consentimento verificado. Receita recuperada só pode ser reconhecida depois que a comanda correspondente for realmente fechada.

URL canônica: ${SITE_URL}/flowo-recupera

## Aplicativo para barbeiros

O aplicativo Flowo está em preparação para iPhone e Android. A proposta é
complementar o painel web com agenda individual, presenças, clientes e comandas
na rotina móvel da equipe. Ele ainda não está disponível nas lojas e não há
data pública de lançamento.

URL canônica: ${SITE_URL}/aplicativo-para-barbeiros

## Comparações verificadas

${comparisons}

## Metodologia

- Informações de concorrentes vêm exclusivamente de páginas oficiais acessíveis ao público.
- A data e o escopo das fontes ficam visíveis em cada comparação.
- Recursos apresentados como add-on, módulo ou sujeitos a consulta não são tratados como incluídos.
- A Flowo reconhece situações em que outro produto pode ser mais adequado.
- Preços e condições de terceiros podem mudar; o fornecedor deve confirmar a proposta final.
- Marcas de terceiros pertencem aos respectivos titulares. Não existe afiliação ou endosso.

## Rotas úteis

- Comparações: ${SITE_URL}/comparar
- Filme institucional: ${SITE_URL}${INSTITUTIONAL_FILM.video}
- Filme vertical: ${SITE_URL}${INSTITUTIONAL_FILM.verticalVideo}
- Recursos: ${SITE_URL}/recursos
- Aplicativo para barbeiros: ${SITE_URL}/aplicativo-para-barbeiros
- Planos: ${SITE_URL}/precos
- Guias: ${SITE_URL}/recursos/guias
- Termos: ${SITE_URL}/termos
- Privacidade: ${SITE_URL}/privacidade
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": CACHE_HEADER,
    },
  });
}
