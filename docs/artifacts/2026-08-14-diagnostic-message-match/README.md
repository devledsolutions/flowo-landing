# Diagnóstico de agenda: correspondência entre anúncio e produto

Data: 14 de agosto de 2026

## Objetivo

Comprovar visualmente o caminho apresentado pela campanha `Tem horário hoje?`:

1. O cliente chama no WhatsApp.
2. A Flowo consulta a disponibilidade por profissional.
3. O horário confirmado aparece na agenda.

## Evidências visuais

- [Desktop](./desktop-product-proof.png)
- [Mobile, 390 x 844](./mobile-product-proof.png)

## Validações executadas

- `pnpm lint`: aprovado, sem avisos ou erros.
- `pnpm exec tsc --noEmit`: aprovado.
- `pnpm build`: aprovado, incluindo os gates de identidade visual e consentimento de mídia.
- Fluxo completo das cinco perguntas: resultado `Agenda reativa`, pontuação `0 de 100` e formulário do PDF visível.
- Preflight local com navegador, Googlebot, Meta e TikTok: HTTP 200 nos quatro agentes.
- Desktop 1440 x 1000: sem overflow horizontal.
- Mobile 390 x 844: sem overflow horizontal.
- Console do navegador: zero erros.
- CTA da prova do produto: `/recepcionista-ia-barbearia`.
- Domínio exibido no produto: `barber.flowo.com.br/agenda`.
- Lighthouse local: Performance 94, Acessibilidade 100, Boas práticas 100 e SEO 100.
- Métricas Lighthouse: CLS 0 e TBT 7 ms. O LCP simulado foi 3.072 ms, tendo o H1 da página como elemento principal. A nova prova do produto fica abaixo da dobra e não é o elemento de LCP.

## Limites desta evidência

Esta validação comprova a página e a correspondência da mensagem. Ela não autoriza publicação de anúncios, definição de orçamento nem disparo para contatos reais.
