# Plano Detalhado: Redução de Edge Requests (Vercel)

## Contexto Atual
- Projeto: `flowo-landing`
- Janela: últimos 30 dias
- Volume: `2,872,873` Edge Requests (97.9% do total da conta)
- Distribuição: `iad1` com `2,850,903` (99.2%), muito acima de `gru1` (128)

Hipótese principal: tráfego automatizado/crawler centralizado + requests evitáveis no app (prefetch, rotas dinâmicas desnecessárias, cache insuficiente de assets públicos).

## Objetivos e KPIs
- **KPI-1**: reduzir Edge Requests totais em 40-60% em 30 dias.
- **KPI-2**: reduzir participação de `iad1` para <60% em 14 dias.
- **KPI-3**: manter conversão de lead (sem regressão >5%).
- **KPI-4**: manter SEO indexável (GSC sem queda relevante de cobertura).

---

## Fase 1 - Diagnóstico Operacional (D0-D1)
### 1.1 Instrumentar baseline de requests por rota
- Extrair Top rotas, UAs, ASNs, status code, método.
- Ferramentas: Vercel Observability + logs por path.

### 1.2 Separar humano vs bot
- Filtrar por `user-agent`, bursts por IP, taxa de erro e padrão de navegação.
- Classificar: SEO bots permitidos, bots abusivos, scanners.

### 1.3 Definir SLO de tráfego aceitável
- Ex.: até X requests/min por IP para páginas públicas.

## Fase 2 - Quick Wins de Código (D0-D2)
### 2.1 Remover rotas de ícone dinâmicas (Edge)
- Trocar `app/icon.tsx` e `app/apple-icon.tsx` por arquivos estáticos.

### 2.2 Reduzir requests de prefetch
- Desabilitar `prefetch` em links globais com baixa intenção imediata.

### 2.3 Evitar túnel Sentry por padrão
- Manter `tunnelRoute` desligado, ativado somente via env.

## Fase 3 - Estratégia de Cache HTTP (D1-D3)
### 3.1 Cache para assets públicos
- Configurar `Cache-Control` para `/images/*`, `/downloads/*`, logos.

### 3.2 Revisão de TTL
- Iniciar com `max-age=7d` + `stale-while-revalidate=30d`, ajustar por risco de conteúdo stale.

### 3.3 Auditoria com `curl`
```bash
curl -I https://flowo.com.br/downloads/guia-completo-barbearia.pdf
curl -I https://flowo.com.br/images/barbershops/success-1.jpg
```

## Fase 4 - Renderização e Static Enforcement (D2-D4)
### 4.1 Garantir páginas estáticas por padrão
- Validar output do build (rotas `○` estáticas).

### 4.2 Evitar fontes de dinamismo acidental
- Não usar `cookies()`, `headers()`, `no-store` em páginas de marketing.

### 4.3 Gate de PR
```bash
pnpm build
# Falhar PR se surgir rota dinâmica fora de /api/*
```

## Fase 5 - Proteção de APIs (D3-D6)
### 5.1 Rate limit em `/api/lead-capture` e `/api/contact-form`
- Aplicar limite por IP + janela temporal.

### 5.2 Anti-abuso de formulário
- Honeypot + validação server-side + throttling.

### 5.3 Implementação (Convex)
```ts
// As rotas chamam uma política fixa via apiRateLimits:consume no Convex.
// O IP é hasheado antes de sair do processo da aplicação.
```

## Fase 6 - Vercel Firewall / WAF (D1-D5)
### 6.1 Criar regras em modo monitor
- Challenge/deny por padrões de bot agressivo.

### 6.2 Regras por geografia e ASN (com cuidado)
- Como o tráfego está concentrado em `iad1`, validar origem real antes de bloquear.

### 6.3 Escalonamento de política
- 48h monitor -> 48h challenge -> deny para ofensores confirmados.

## Fase 7 - Política de Crawlers (D4-D7)
### 7.1 Revisar `robots.txt`
- Permitir bots de SEO essenciais, restringir crawlers irrelevantes/abusivos.

### 7.2 Sitemap e canonical consistentes
- Preservar crawl budget para páginas estratégicas.

## Fase 8 - Otimização de Frontend (D5-D9)
### 8.1 Reduzir JS inicial
- Carregar widgets pesados sob demanda.

### 8.2 Corrigir `<img>` para `next/image`
- Evitar downloads maiores do que o necessário.

### 8.3 Exemplo
```tsx
import Image from "next/image";
<Image src="/images/barbershops/success-1.jpg" alt="..." width={1200} height={800} />
```

## Fase 9 - Rollout Controlado (D7-D12)
### 9.1 Deploy por lotes
- Lote A: caching + static icons + prefetch.
- Lote B: WAF/rate-limit.

### 9.2 Janela de observação por lote
- 24-48h com comparação de requests e conversão.

### 9.3 Rollback definido
- Regras WAF e feature flags reversíveis em minutos.

## Fase 10 - Operação Contínua (D12+)
### 10.1 Alertas e orçamento
- Alertas por pico anômalo de requests e spikes por região.

### 10.2 Ritual semanal
- Revisar top rotas, bots e eficácia de cache/WAF.

### 10.3 Runbook
- Procedimento para incidentes de tráfego abusivo.

---

## Execução Iniciada Nesta Sessão
### 10.1 Implementado (código)
- `app/icon.tsx` e `app/apple-icon.tsx` removidos.
- `app/icon.png` e `app/apple-icon.png` adicionados (estáticos).
- `next.config.ts`:
  - cache headers para `/downloads/*`, `/images/*`, `/flowo-logo.svg`, `/logo.svg`, `/logo.png`;
  - `tunnelRoute` da Sentry condicionado a `SENTRY_TUNNEL_ROUTE=1`.
- Prefetch reduzido:
  - `components/navbar.tsx`
  - `components/footer.tsx`
  - `components/cookie-banner.tsx`
- `.env.example` atualizado com toggle `SENTRY_TUNNEL_ROUTE`.
- Fase 5 iniciada (proteção de API):
  - `lib/request-ip.ts` para identificação de IP;
  - `lib/rate-limit.ts` para throttling por janela com Convex e fallback local;
  - rate limit, validação `zod` e honeypot aplicados em `app/api/lead-capture/route.ts` e `app/api/contact-form/route.ts`;
  - Turnstile aplicado frontend/backend para bloqueio anti-bot;
  - campos honeypot (`company`) adicionados em formulários cliente;
  - `app/robots.ts` e `app/sitemap.ts` adicionados para crawl budget.
- Fase 6 executada parcialmente via Vercel CLI/API:
  - região padrão de funções alterada para `gru1`;
  - regras de firewall aplicadas (challenge para UAs suspeitas + deny para paths de exploração);
  - execução documentada em `docs/plans/2026-02-21-vercel-cli-execution-log.md`.

### 10.2 Validação executada
```bash
pnpm build
```
- Resultado: apenas rotas dinâmicas em `/api/*`; ícones agora estáticos (`/icon.png`, `/apple-icon.png`).

### 10.3 Próxima execução imediata (próximo commit)
1. Fase 1: baseline consolidado por rota + UA + ASN (antes/depois).
2. Fase 5.2: calibrar limites por rota após 48h de telemetria.
3. Fase 6.3: revisar falso positivo e ajustar allowlist para bots SEO essenciais.
