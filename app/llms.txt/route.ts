import { GUIDES } from "@/data/guides";
import {
  COMPARISON_LAST_VERIFIED_LABEL,
  COMPETITOR_COMPARISONS,
} from "@/data/competitor-comparisons";
import { PLANS, ANNUAL_DISCOUNT_LABEL, formatBRL, hasPublishedPrice } from "@/data/pricing-data";
import { RESOURCE_MATERIALS } from "@/data/resource-materials";
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
  const materialLines = RESOURCE_MATERIALS.map(
    (material) =>
      `- [${material.title}](${SITE_URL}/recursos/materiais#${material.id}) — ${material.format}. ${material.description}`,
  ).join("\n");
  const pdfCount = RESOURCE_MATERIALS.filter(
    (material) => material.format === "PDF",
  ).length;
  const spreadsheetCount = RESOURCE_MATERIALS.length - pdfCount;

  const content = `# Flowo
> Plataforma de agendamento para barbearias: a IA atende no WhatsApp, agenda e confirma clientes. A operação reúne agenda, comandas e recebimento; pagamentos integrados são opcionais e acontecem somente depois do serviço.

## Canonical website
- ${SITE_URL}

## Planos e condições de acesso
${planLines}
- Solo: 1 profissional, até 200 agendamentos por mês, cancelamento no WhatsApp e suporte por e-mail. Não inclui remarcação no WhatsApp nem calendários externos.
- Equipe: até 5 profissionais em 1 unidade, agendamentos ilimitados, remarcação no WhatsApp, calendários externos e suporte por e-mail e WhatsApp.
- Empresarial: profissionais e unidades sem limite publicado, contratação assistida e suporte por e-mail, WhatsApp e telefone.
- A sincronização bidirecional de calendário está disponível no Google. Apple e Outlook recebem os compromissos da Flowo.
- A jornada pública é paga. A equipe pode conceder uma avaliação assistida de 14 dias a clientes elegíveis de Solo ou Equipe; ela é manual, não exige cartão, não renova e não cobra automaticamente.

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
- [Flowo Recupera](${SITE_URL}/flowo-recupera): add-on em beta acompanhado para identificar oportunidades de retorno; resultados passam por revisão humana, consentimento e fechamento real da comanda.
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

## Guides hub (${GUIDES.length} guias)
- [Guias para barbearias](${SITE_URL}/recursos/guias): artigos em HTML sobre agenda, atendimento, equipe, operação e gestão.
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
- A biblioteca contém ${RESOURCE_MATERIALS.length} downloads: ${pdfCount} PDFs e ${spreadsheetCount} planilhas XLSX. Com o PDF complementar do Diagnóstico de Agenda, são ${RESOURCE_MATERIALS.length + 1} materiais de entrega. Os links abaixo apontam para a explicação HTML de cada material; a entrega do arquivo acontece a partir dessa página.
${materialLines}

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
