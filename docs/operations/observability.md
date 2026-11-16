# Observabilidade do landing

O landing usa o PostHog como canal único de telemetria operacional de erros. O
código não depende do PostHog para responder ao visitante: falha no monitoramento
é absorvida e nunca vira uma segunda falha para o cliente.

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

## Contagem de visitas sem cookies

O SDK do navegador usa `cookieless_mode: "on_reject"` e liga
`opt_out_capturing_by_default` para quem ainda não aceitou a análise; quem já
aceitou começa no modo persistido e mantém a identidade. Quem recusa ou não responde ao
aviso de cookies envia apenas `$pageview` com `$cookieless_mode=true`; o
`before_send` descarta qualquer outro evento comportamental sem consentimento.
Nada é gravado no aparelho, e o PostHog agrupa a visita por um hash diário do
lado do servidor. Quem aceita passa ao modo persistido sem um segundo
`$pageview` para a mesma rota. A opção "Enable cookieless tracking" do projeto
239500 precisa estar ligada; desligada, o PostHog descarta esses eventos.

Em relatórios, filtre `properties.$cookieless_mode` para separar as duas
populações. A mesma pessoa pode aparecer uma vez em cada modo quando aceita a
análise e continua navegando.

Até 15/11/2026 o SDK iniciava sempre em memória e criava um id anônimo novo a
cada carregamento de página, mesmo com consentimento. Visitantes únicos do site
anteriores a essa data contam carregamentos, não pessoas.

## Verificação e alertas

1. Confirmar no projeto `D Flowo - Convex` que `Error tracking > Configuration >
   Exception autocapture` está habilitado.
2. Validar uma exceção controlada em um deployment QA manual ou no harness
   local e conferir o par `surface=landing`/`environment=qa` (ou
   `environment=development`). Os Previews automáticos da Vercel estão
   desabilitados; não tratar uma URL antiga de Preview como evidência atual.
3. Repetir em produção com o `release` do deploy e conferir a exceção no
   PostHog, separada por `surface=landing`, `platform=web` e `environment=production`.
4. Alertas devem filtrar `surface` e `environment`; nunca misturar landing,
   dashboard, mobile ou backend no mesmo alerta.

## Critério de aceite

Uma build verde não prova observabilidade. Antes de considerar a migração
concluída, confirmar em produção eventos JavaScript e servidor no PostHog,
redaction, stack trace útil, alertas acionáveis e uma janela de operação sem
perda de telemetria. Essa exigência é específica da Landing; o mobile mantém
seu próprio gate de crash nativo até a paridade física ser comprovada.
