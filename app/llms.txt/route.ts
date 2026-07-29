import { GUIDES } from "@/data/guides";
import { PLANS, ANNUAL_DISCOUNT_LABEL, formatBRL } from "@/data/pricing-data";
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

  const content = `# Flowo
> Plataforma de agendamento para barbearias: a IA atende no WhatsApp, agenda e confirma clientes. Lembretes automáticos contra faltas e pagamento do atendimento por PIX ou cartão.

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
- [Pagamentos PIX no atendimento](${SITE_URL}/software-barbearia-com-pix)

## Comparative pages
- [Flowo vs planilha](${SITE_URL}/flowo-vs-planilha)
- [Flowo vs agenda manual](${SITE_URL}/flowo-vs-agenda-manual)

## Guides hub
- [Guias para barbearias](${SITE_URL}/recursos/guias)
${guideLines}

## Media and lead magnets
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
