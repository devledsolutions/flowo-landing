# Funil de aquisição do site Flowo

Última atualização: 30 de julho de 2026.

## Camada de coleta

O site usa o workspace **Flowo** e a fonte **Flowo Website** do Segment como
camada única de eventos. A URL cadastrada na fonte é
`https://www.flowo.com.br`. Não carregar outro SDK de analytics diretamente nas
páginas. Os eventos consentidos são distribuídos pelo Segment ao PostHog
(análise de produto e conversão) e ao AWS S3 (arquivo), sem adicionar esses SDKs
ao JavaScript do site.

Eventos só são enviados depois do consentimento de analytics. Nenhum evento
abaixo contém nome, e-mail, telefone ou outra informação pessoal.

Quando uma pessoa envia voluntariamente um formulário e aceita o texto de
consentimento, o site faz um `identify` separado com os dados declarados. Esses
dados ficam em traits de pessoa e nunca são copiados para propriedades de
eventos.

O aceite necessário para responder a uma solicitação é separado do opt-in
opcional de e-mail marketing. Somente o segundo pode inscrever o contato no
Resend. Downloads e pedidos de contato continuam funcionando sem opt-in de
marketing.

O plano gratuito do Segment inclui até 1.000 visitantes mensais, duas fontes e
distribuição para destinos, mas não substitui uma ferramenta de campanhas nem
oferece o produto completo de Consent Management. A
aplicação é, portanto, responsável por impedir o carregamento do Analytics.js
até que o visitante autorize cookies analíticos. Destinos de publicidade não
devem ser ligados à fonte enquanto não houver controle separado pelo
consentimento de marketing.

## Atribuição automática

Cada chamada de página e cada evento recebem:

- `page_path`;
- `first_landing_path` e `first_referrer`;
- `first_utm_source`, `first_utm_medium`, `first_utm_campaign`,
  `first_utm_content` e `first_utm_term`;
- os parâmetros `utm_*` presentes na página atual;
- `consent_analytics` e `consent_marketing`.

A primeira origem é mantida por até 90 dias e removida quando o consentimento
analítico é retirado.

Todo link para `barber.flowo.com.br` recebe, no momento do clique e somente com
consentimento analítico, o `flowo_aid` do Segment e as UTMs de primeira origem.
O painel remove esse identificador da URL, guarda-o apenas durante a sessão e
faz a união determinística com o usuário Clerk no PostHog. A organização ativa
continua sendo registrada como grupo `organization`, permitindo analisar o
funil por tenant sem criar uma terceira fonte no Segment.

## Eventos

### `CTA Clicked`

Usado nas ações principais da Home, Preços, navegação e página do aplicativo.

Propriedades:

- `page`: rota ou superfície de origem;
- `placement`: hero, navbar, card, seção ou fechamento;
- `destination`: destino lógico;
- `intent`: intenção comercial;
- `billing_cycle`: somente quando a escolha de mensal/anual já existe.

O clique em “Tirar dúvidas” é identificado por
`destination=whatsapp_sales` e `intent=ask_question`. Ele é uma
microconversão, não um lead confirmado. O lead só deve ser confirmado quando o
formulário for aceito ou quando uma mensagem realmente chegar ao WhatsApp.

### Lista de interesse do aplicativo

| Evento | Momento |
| --- | --- |
| `App Waitlist Viewed` | formulário montado na página |
| `App Waitlist Started` | primeiro foco em um campo |
| `App Waitlist Submitted` | API confirmou o cadastro |
| `App Waitlist Failed` | erro HTTP ou de rede |

### Contato comercial

| Evento | Momento |
| --- | --- |
| `Lead Form Opened` | modal de contato aberto |
| `Lead Form Submitted` | tentativa enviada |
| `Lead Form Succeeded` | API confirmou o cadastro |
| `Lead Form Failed` | erro HTTP ou de rede |

Os mesmos quatro eventos usam `form=resource_download` nos materiais. Depois
da confirmação da API, também é emitido `Resource Downloaded`.
As conversões confirmadas incluem apenas o booleano `marketing_opt_in`, sem
copiar o e-mail para propriedades do evento, permitindo medir a taxa de opt-in.

### Intenção e consumo

| Evento | Momento |
| --- | --- |
| `Pricing Viewed` | seção de preços exibida e ciclo selecionado |
| `Pricing Cycle Changed` | alternância mensal/anual |
| `FAQ Interaction` | pergunta aberta ou fechada |
| `Search Performed` | busca na FAQ após pausa de digitação |
| `Video Engagement` | play, pause, 25%, 50%, 75% e conclusão |
| `External Link Clicked` | WhatsApp ou loja de aplicativo |

### Cadastro e ativação no produto

Estes eventos são enviados diretamente pelo PostHog do painel, mantendo a mesma
pessoa que chegou pelo Segment:

| Evento | Momento |
| --- | --- |
| `acquisition_identity_linked` | ID anônimo do site unido ao usuário Clerk |
| `signup_completed` | conta Clerk criada nos últimos dez minutos |
| `onboarding_completed` | backend confirmou onboarding; inclui `ai_activated` |
| `onboarding_completion_failed` | tentativa final recusada ou falhou |

## Registro durável dos leads

`/api/lead-capture` grava primeiro em `websiteLeads` no Convex. A chave de
deduplicação é o WhatsApp normalizado; reenvios atualizam origem e consentimento
sem criar linhas ilimitadas. A função pública possui limite global e por contato.
O workspace comercial super-admin fica em `/plataforma/aquisicao`, com
responsável, etapa, próxima ação, atrasos e histórico.

O Convex é a fonte de verdade. O Segment coleta e distribui sinais de aquisição;
ele não dispara campanhas. Quando existe opt-in explícito, uma ação interna
assíncrona sincroniza o contato com um segmento e um tópico do Resend Marketing.
Broadcasts e Automations continuam no Resend, que centraliza descadastro,
preferências e métricas. Falha de sincronização nunca pode fazer a Flowo perder
o lead nem impedir download/entrada na lista.
Turnstile é uma camada adicional quando
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` estiverem configuradas;
honeypot e limites distribuídos permanecem ativos no caminho principal.

## Funis recomendados

1. Home: `CTA Clicked` com `intent=see_product` → `compare_plans` →
   `start_plan` ou `start_now`.
2. Aplicativo: `learn_about_app` → `App Waitlist Viewed` →
   `App Waitlist Started` → `App Waitlist Submitted`.
3. Venda assistida: `ask_question` ou abertura do formulário →
   `Lead Form Succeeded`.
4. Aquisição até ativação: `CTA Clicked` com
   `destination=dashboard_signup` → `signup_completed` →
   `onboarding_completed`.

## Regras

- Não chamar um clique de cadastro concluído.
- Não identificar visitantes anônimos. Identificar somente após envio
  consentido de formulário ou autenticação.
- Não incluir texto livre, URL completa com parâmetros pessoais ou valores de
  campos nos eventos.
- Preservar os nomes de evento para manter séries históricas.
- Usar o Debugger e a aba Schema da fonte **Flowo Website** antes de promover
  novos eventos.
- Manter o arquivo como tracking plan enquanto o produto Protocols não fizer
  parte do plano contratado.
