# Evidência — landing do aplicativo

Data: 29 de julho de 2026  
Rota: `/aplicativo-para-barbeiros`

## Capturas

- `app-landing-desktop.png`: hero em 1440 × 1000.
- `app-landing-tablet-768.png`: navegação compacta e hero em tablet.
- `app-landing-mobile-390.png`: hero em viewport móvel principal.
- `app-landing-mobile-320.png`: largura mínima auditada, sem overflow.
- `app-waitlist-desktop.png`: formulário no desktop.
- `app-waitlist-filled-mobile-390.png`: campos preenchidos no mobile.
- `app-waitlist-success-mobile-390.png`: confirmação inline após resposta 200
  simulada da API.
- `app-landing-desktop.yaml`: snapshot acessível com caixas.

## Lighthouse

Produção local servida por `next start`, Chrome headless:

| Página e perfil | Performance | Acessibilidade | Boas práticas | SEO |
| --- | ---: | ---: | ---: | ---: |
| Aplicativo, desktop | 100 | 100 | 100 | 100 |
| Aplicativo, mobile | 95 | 100 | 100 | 100 |
| Home, mobile | 93 | 100 | 100 | 100 |

Métricas do aplicativo:

- desktop: FCP 0,3 s; LCP 0,7 s; TBT 0 ms; CLS 0;
- mobile simulado: FCP 1,1 s; LCP 3,0 s; TBT 10 ms; CLS 0.

Relatórios brutos:

- `lighthouse-desktop.json`;
- `lighthouse-mobile.json`;
- `lighthouse-home-mobile.json`.

## Verificações funcionais

- formulário possui labels persistentes;
- nenhuma rolagem horizontal em 320, 390, 768 ou 1440 px;
- menu móvel é usado em 768 px para evitar colisão da navegação;
- cadastro de interesse foi validado com resposta 200 simulada;
- confirmação substitui o formulário no mesmo contexto;
- nenhum evento de analytics inclui nome, e-mail ou telefone;
- sitemap, canonical, FAQ/Breadcrumb JSON-LD, `llms.txt` e `robots.txt`
  contêm a nova rota.

