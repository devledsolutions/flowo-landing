# Funil de aquisição do site Flowo

Última atualização: 29 de julho de 2026.

## Camada de coleta

O site usa Segment como camada única de eventos. Não carregar outro SDK de
analytics diretamente nas páginas. Um destino como PostHog pode ser conectado
no workspace do Segment sem aumentar o JavaScript do site.

Eventos só são enviados depois do consentimento de analytics. Nenhum evento
abaixo contém nome, e-mail, telefone ou outra informação pessoal.

## Eventos

### `CTA Clicked`

Usado nas ações principais da Home, Preços, navegação e página do aplicativo.

Propriedades:

- `page`: rota ou superfície de origem;
- `placement`: hero, navbar, card, seção ou fechamento;
- `destination`: destino lógico;
- `intent`: intenção comercial;
- `billing_cycle`: somente quando a escolha de mensal/anual já existe.

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

## Funis recomendados

1. Home: `CTA Clicked` com `intent=see_product` → `compare_plans` →
   `start_plan` ou `start_now`.
2. Aplicativo: `learn_about_app` → `App Waitlist Viewed` →
   `App Waitlist Started` → `App Waitlist Submitted`.
3. Venda assistida: `ask_question` ou abertura do formulário →
   `Lead Form Succeeded`.

## Regras

- Não chamar um clique de cadastro concluído.
- Não identificar usuários do site público sem uma base legal e uma decisão de
  produto registrada.
- Não incluir texto livre, URL completa com parâmetros pessoais ou valores de
  campos nos eventos.
- Preservar os nomes de evento para manter séries históricas.

