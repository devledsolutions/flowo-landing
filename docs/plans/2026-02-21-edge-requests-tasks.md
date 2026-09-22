# Tasks de Execução - Edge Requests (flowo-landing)

## Sprint Atual (redução imediata de custo)
- [x] **T1.1** Remover ícones dinâmicos em Edge (`/icon`, `/apple-icon`).
- [x] **T1.2** Substituir por assets estáticos (`app/icon.png`, `app/apple-icon.png`).
- [x] **T1.3** Reduzir prefetch global em links de navegação.
- [x] **T1.4** Aplicar cache headers em `/downloads/*`, `/images/*` e logos.
- [x] **T1.5** Desligar Sentry tunnel por padrão (ativação só via env flag).

## Em Execução (anti-abuso de endpoints)
- [x] **T2.1** Criar utilitário para captura de IP real (`lib/request-ip.ts`).
- [x] **T2.2** Criar rate limiter distribuído no Convex com fallback local para desenvolvimento (`lib/rate-limit.ts`).
- [x] **T2.3** Integrar rate limit no `/api/lead-capture`.
- [x] **T2.4** Integrar rate limit no `/api/contact-form`.
- [x] **T2.5** Adicionar honeypot nos formulários clientes (`company` hidden field).
- [x] **T2.6** Adicionar validação com `zod` nas APIs de formulário.
- [x] **T2.7** Integrar Cloudflare Turnstile (frontend + backend).
- [ ] **T2.8** Ajustar limites por rota com base no tráfego real (após 48h).

## Próximo Lote (alto impacto fora do código)
- [x] **T3.1** Criar regras WAF na Vercel.
- [x] **T3.2** Aplicar challenge para UAs com padrão de abuso.
- [x] **T3.3** Aplicar deny para paths de exploração comuns.
- [ ] **T3.4** Definir allowlist explícita para bots de SEO essenciais.
- [x] **T3.5** Documentar playbook operacional WAF (`docs/plans/2026-02-21-vercel-waf-playbook.md`).
- [x] **T3.6** Registrar execução com Vercel CLI/API (`docs/plans/2026-02-21-vercel-cli-execution-log.md`).

## Observabilidade e Governança
- [ ] **T4.1** Consolidar baseline por rota + UA + ASN (`D-2` vs `D+2` deploy).
- [ ] **T4.2** Criar alerta de pico em `iad1` e alerta de 429 nas APIs.
- [ ] **T4.3** Revisão semanal com relatório de redução (%) e impacto em leads.
- [x] **T4.4** Definir budget e checklist operacional (`docs/plans/2026-02-21-observability-budget.md`).

## SEO Técnico e Crawl Budget
- [x] **T5.1** Remover SEO legado com `next/head` na App Router.
- [x] **T5.2** Adicionar `app/robots.ts` para política de crawlers.
- [x] **T5.3** Adicionar `app/sitemap.ts` para indexação explícita.
- [x] **T5.4** Lazy-load de widget não essencial (`AIChatbot`).

## Critério de Sucesso (30 dias)
- [ ] **S1** Redução de 40-60% nos Edge Requests totais.
- [ ] **S2** Redução da concentração de `iad1` para abaixo de 60%.
- [ ] **S3** Sem queda >5% na conversão de lead.
