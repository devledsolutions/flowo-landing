# Funil de aquisição do site Flowo

Última atualização: 12 de agosto de 2026.

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

O aceite necessário para responder a uma solicitação é separado dos opt-ins
opcionais de e-mail e SMS marketing. Os dois canais têm consentimentos
independentes: aceitar e-mail não autoriza SMS, e vice-versa. Downloads e
pedidos de contato continuam funcionando sem qualquer opt-in de marketing.

O plano gratuito do Segment inclui até 1.000 visitantes mensais, duas fontes e
distribuição para destinos, mas não substitui uma ferramenta de campanhas nem
oferece o produto completo de Consent Management. A
aplicação é, portanto, responsável por impedir o carregamento do Analytics.js
até que o visitante autorize cookies analíticos. Destinos de publicidade não
recebem a fonte inteira. Meta, Google Ads e TikTok usam loaders dedicados,
carregados somente com consentimento de marketing. O Segment distribui a fonte
do site apenas para PostHog e S3; Pixel e Conversions API do TikTok não podem
ser destinos dessa fonte, pois consentimento analítico não autoriza
publicidade.

O Pixel e a API de Conversões compartilham o mesmo `event_id` no evento `Lead`.
Isso permite deduplicação entre navegador e servidor. O servidor cria o evento
somente quando o cookie de marketing está autorizado, registra o consentimento
e guarda IP e user-agent apenas durante a tentativa de entrega. E-mail e
telefone são normalizados e convertidos em SHA-256 antes de sair da Flowo.

## Atribuição automática

Cada chamada de página e cada evento recebem:

- `page_path`;
- `first_landing_path` e `first_referrer`;
- `first_utm_source`, `first_utm_medium`, `first_utm_campaign`,
  `first_utm_content` e `first_utm_term`;
- os parâmetros `utm_*` presentes na página atual;
- os identificadores de clique disponíveis (`fbclid`, `gclid`, `gbraid`,
  `wbraid`, `msclkid` e `ttclid`), sem criar identificadores próprios nem
  copiar dados pessoais;
- `consent_analytics` e `consent_marketing`.

Antes da escolha de cookies, a primeira origem fica somente na sessão para que
uma navegação interna não apague a campanha que trouxe o contato. Com
consentimento analítico, ela é promovida para armazenamento de até 90 dias. A
origem persistente e a cópia de sessão são removidas quando o consentimento é
retirado.

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
As conversões confirmadas incluem apenas os booleanos
`email_marketing_opt_in` e `sms_marketing_opt_in`, sem copiar e-mail ou telefone
para propriedades do evento. O trait legado `marketing_opt_in` representa
somente e-mail e existe apenas para preservar a série histórica.

### Newsletter

O rodapé de todas as páginas oferece **A Semana da Barbearia** com opt-in de
e-mail explícito, não pré-marcado. A inscrição usa a origem
`newsletter:site-footer`, grava a atribuição no lead e inicia a jornada de
conteúdo prático; ela não entra na sequência comercial de pedido de contato.

| Evento | Momento |
| --- | --- |
| `Newsletter Form Submitted` | tentativa de inscrição enviada |
| `Newsletter Subscribed` | API confirmou lead e opt-in |
| `Newsletter Subscription Failed` | API ou rede recusou a inscrição |

### Diagnóstico de agenda

A rota `/recursos/diagnostico-agenda-barbearia` possui uma sequência própria
para separar intenção, entrega e interesse no produto:

| Evento | Momento |
| --- | --- |
| `Lead Magnet Viewed` | landing montada no navegador |
| `Lead Magnet CTA Clicked` | clique em um atalho para o formulário |
| `Lead Magnet Form Started` | primeiro foco em um campo |
| `Lead Magnet Form Submitted` | tentativa enviada à API |
| `Lead Magnet Form Failed` | erro HTTP ou de rede |
| `Lead Magnet Delivered` | API confirmou o lead e liberou o material |
| `Lead Magnet Downloaded` | pessoa acionou o link do PDF |
| `Lead Magnet Nurture Started` | pelo menos um opt-in opcional foi autorizado |
| `Lead Magnet Product CTA Clicked` | clique da confirmação para a página comercial |

`track` recebe apenas `resource_id`, estado de opt-in, presença de telefone,
posição e código HTTP. Nome, e-mail e telefone aparecem somente no `identify`
separado. O PDF estático é liberado na própria página; a cópia por e-mail é
transacional e não depende de consentimento de marketing.

A rota `/recepcionista-ia-barbearia` usa a origem
`sales-campaign:<placement>` em todos os pontos de conversão. Os placements
distinguem hero, cabeçalho, vídeo, plano, fechamento e CTA fixo de celular sem
criar nomes de evento novos.

### Intenção e consumo

| Evento | Momento |
| --- | --- |
| `Pricing Viewed` | seção de preços exibida e ciclo selecionado |
| `Pricing Cycle Changed` | alternância mensal/anual |
| `Plan Selected` | clique num plano da Home, com `plan_id`, ciclo e preço exibido |
| `Validation Profiles Viewed` | dois perfis de uso baseados na validação técnica controlada exibidos antes dos planos |
| `Validation Case Opened` | abertura do caso completo a partir da Home, com perfil e origem da prova |
| `Validation Profile Selected` | clique de um perfil para o plano indicado; inclui `proof_origin=controlled_production_validation` |
| `FAQ Interaction` | pergunta aberta ou fechada |
| `Search Performed` | busca na FAQ após pausa de digitação |
| `Video Engagement` | play, pause, 25%, 50%, 75% e conclusão |
| `External Link Clicked` | WhatsApp ou loja de aplicativo |

### Cadastro e ativação no produto

Estes eventos são enviados diretamente pelo PostHog do painel, mantendo a mesma
pessoa que chegou pelo Segment:

| Evento | Momento |
| --- | --- |
| `signup_started` | painel recebeu a entrada de cadastro decorada pelo site |
| `acquisition_identity_linked` | ID anônimo do site unido ao usuário Clerk |
| `signup_completed` | conta Clerk criada nos últimos dez minutos |
| `onboarding_completed` | backend confirmou onboarding; inclui `ai_activated` |
| `onboarding_completion_failed` | tentativa final recusada ou falhou |

Os links de plano carregam `plan`, `cycle` e UTMs até o painel. O painel valida
esses valores, guarda a preferência somente na sessão da aba e reapresenta a
escolha no passo de plano. A preferência é orientação de UX: preço, acesso e
contratação continuam sendo validados novamente pelo checkout e pelo backend.

## Registro durável dos leads

`/api/lead-capture` grava primeiro em `websiteLeads` no Convex. A chave de
deduplicação é o WhatsApp normalizado quando informado e o e-mail normalizado
quando o telefone é opcional; reenvios atualizam origem e consentimento sem
criar linhas ilimitadas. A função pública possui limite global e por contato.
O workspace comercial super-admin fica em `/plataforma/aquisicao`, com
responsável, etapa, próxima ação, atrasos e histórico.

O Convex é a fonte de verdade de lead, consentimento, estágio comercial e
supressão. O Segment coleta e distribui sinais de aquisição; ele não dispara
campanhas e não decide quem pode recebê-las.

Com opt-in explícito de e-mail, uma ação assíncrona sincroniza o contato e emite
o evento de entrada para uma Automation do Resend. O Resend centraliza os
templates, atrasos, métricas e o descadastro nativo do canal. O webhook
`contact.updated` devolve o descadastro ao Convex.

O payload classifica a intenção de aquisição em três jornadas sem copiar PII
para eventos: `sales`, `resource` e `app_waitlist`. Ele também carrega a
variante estável do primeiro e-mail, o identificador/título do material e URLs
permitidas para o próximo passo. O programa completo contém 21 templates em
cinco automações: aquisição, institucional, conteúdo, newsletter e promoção.
Todas permanecem desabilitadas até o domínio de marketing, o webhook assinado e
a coorte controlada passarem nos testes.

O site é a primeira fonte do Segment. O segundo slot do plano gratuito fica
reservado para o app mobile da Flowo. Twenty não é fonte de eventos: se for
mantido, recebe somente leads qualificados como destino comercial, sem duplicar
o histórico bruto que pertence ao Convex.

Quando a captura contém `requestedResource`, uma ação transacional separada
envia o link solicitado pelo Resend operacional. Ela não inscreve o contato em
Automation, não altera opt-in e não utiliza o remetente de marketing.

Com opt-in explícito de SMS e telefone brasileiro válido, o Convex controla uma
fila separada para leads e envia pelo adaptador neutro de SMS configurado para
SMSDev. Essa fila não usa campanhas, franquias ou cobrança de mensagens dos
tenants. Ela respeita janela de envio, limite diário, resposta `SAIR`,
supressão, DLR e pausa comercial.

Falha de sincronização ou de entrega nunca pode fazer a Flowo perder o lead,
impedir download/entrada na lista ou transformar consentimento de um canal em
consentimento do outro.
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
5. Conteúdo editorial: `Newsletter Form Submitted` →
   `Newsletter Subscribed` → clique em conteúdo → pedido de diagnóstico ou
   demonstração.

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
