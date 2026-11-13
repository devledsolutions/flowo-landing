# Variáveis de Ambiente - Segurança e Redução de Custo

## Turnstile (Cloudflare)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: chave pública usada nos formulários.
- `TURNSTILE_SECRET_KEY`: chave privada para validação server-side.

Sem `TURNSTILE_SECRET_KEY`, a validação é ignorada (modo compatibilidade).

## Convex (Rate Limit distribuído e captura de lead)
- `CONVEX_URL` ou `NEXT_PUBLIC_CONVEX_URL`: endpoint do deployment Convex.
- `CONVEX_SERVER_SECRET`: segredo server-only usado pelo mutation de rate limit
  e pela captura de lead (`growth:captureWebsiteLead`). Tem de ser o mesmo valor
  configurado no deployment Convex daquele ambiente. Nunca usar prefixo
  `NEXT_PUBLIC_`. Sem ele, `/api/lead-capture` e `/api/contact-form` respondem
  503 e não chamam o backend, inclusive em desenvolvimento local.

As rotas públicas usam políticas fixas no Convex. O fallback em memória existe
somente para desenvolvimento local sem essas variáveis e não substitui a
configuração obrigatória nos ambientes publicados.

## Sentry Tunnel (opcional)
- `SENTRY_TUNNEL_ROUTE=1` habilita `/monitoring`.
- Padrão recomendado para custo: desabilitado.
