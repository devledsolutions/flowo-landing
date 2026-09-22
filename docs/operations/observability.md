# Observabilidade do landing

O landing usa dual-write durante a migração: Sentry continua sendo a rede de
segurança e o PostHog recebe as mesmas exceções operacionais. O código não deve
depender do PostHog para responder ao visitante.

## Configuração

- `NEXT_PUBLIC_POSTHOG_KEY`: project token público (`phc_...`) para exceções do
  navegador.
- `POSTHOG_API_KEY`: chave de ingestão do servidor, mantida como secret.
- `NEXT_PUBLIC_POSTHOG_HOST` e `POSTHOG_HOST`: host regional do PostHog; em US,
  `https://us.i.posthog.com`.
- `NEXT_PUBLIC_RELEASE`: commit ou release que deve aparecer nos eventos.

Todos os eventos carregam `surface=landing`, `platform=web`,
`environment` e `release`. Mensagens, URLs, headers, e-mail, telefone e
identificadores enviados pelo formulário são redigidos antes do envio.
Session replay e autocapture genérico permanecem desligados.

## Verificação e alertas

1. Confirmar no projeto `D Flowo - Convex` que `Error tracking > Configuration >
   Exception autocapture` está habilitado.
2. Validar uma exceção controlada em um deployment QA manual ou no harness
   local e conferir o par `surface=landing`/`environment=qa` (ou
   `environment=development`). Os Previews automáticos da Vercel estão
   desabilitados; não tratar uma URL antiga de Preview como evidência atual.
3. Repetir em produção com o `release` do deploy e conferir a mesma issue no
   PostHog e no Sentry.
4. Alertas devem filtrar `surface` e `environment`; nunca misturar landing,
   dashboard, mobile ou backend no mesmo alerta.

## Critério para retirar o Sentry

Não remover Sentry por uma build verde. A retirada só é permitida depois de
confirmar, em produção, eventos JavaScript e servidor no PostHog, redaction,
stack trace útil, alertas acionáveis e uma janela de operação sem perda de
telemetria. Até lá, alterações no Sentry devem ser apenas de privacidade,
segmentação ou redução de ruído.
