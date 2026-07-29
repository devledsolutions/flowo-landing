# Distribuição técnica: busca, respostas com IA e performance

**Validado em:** 29 de julho de 2026  
**Site canônico:** <https://www.flowo.com.br>

## Objetivo

Manter o conteúdo da Flowo rastreável, indexável e citável por buscadores
tradicionais e experiências de resposta com IA, sem confundir indexação,
grounding e treinamento de modelos.

## Regras por ecossistema

### OpenAI e ChatGPT

- `OAI-SearchBot` é o crawler que permite que páginas apareçam na busca do
  ChatGPT.
- `GPTBot` controla o uso de conteúdo no treinamento de modelos; essa permissão
  é independente da busca.
- `ChatGPT-User` representa acessos iniciados por uma pessoa no ChatGPT.
- A Flowo permite os três agentes nas páginas públicas e bloqueia somente APIs
  e a rota de monitoramento.
- A infraestrutura deve permitir também os intervalos de IP publicados pela
  OpenAI; um `robots.txt` permissivo não supera uma regra de firewall.

Fonte oficial:
<https://developers.openai.com/api/docs/bots>

### Google e Gemini

- `Googlebot` é o crawler que sustenta a inclusão no Google Search, com
  indexação predominantemente mobile-first.
- `Google-Extended` é um token de controle separado para uso em treinamento e
  grounding do Gemini. Ele não determina inclusão nem ranking no Google Search.
- A Flowo permite ambos nas páginas públicas.

Fontes oficiais:

- <https://developers.google.com/search/docs/crawling-indexing/googlebot>
- <https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended>

### Bing e Copilot

- O Bing recomenda URLs canônicas, links internos rastreáveis, sitemap com
  `lastmod` real e IndexNow para sinalizar publicação, alteração ou exclusão.
- A Flowo expõe o sitemap no `robots.txt` e mantém um comando de envio:
  `pnpm seo:indexnow`.
- O comando lê somente URLs canônicas do sitemap e envia o lote ao endpoint
  compartilhado do IndexNow.

Fontes oficiais:

- <https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a>
- <https://www.bing.com/webmasters/help/indexnow-0z209wby>
- <https://www.indexnow.org/documentation>

## Superfícies mantidas

- `/robots.txt`: regras para busca e crawlers de IA.
- `/sitemap.xml`: inventário canônico das páginas públicas.
- `/llms.txt`: resumo factual e links prioritários.
- `/llms-full.txt`: contexto detalhado, preços, metodologia e comparações.
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`,
  `VideoObject`, breadcrumbs e entidades específicas por rota.
- Metadados por rota: título, descrição, canonical, Open Graph e Twitter.
- Verificação opcional por ambiente:
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` e
  `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

## Critérios de aceite

- Google Lighthouse SEO em 100 no desktop e no mobile.
- Nenhuma página canônica retorna `noindex`.
- `robots.txt`, `sitemap.xml`, `llms.txt` e `llms-full.txt` respondem com HTTP
  200 sem desafio de bot.
- O HTML inicial contém título, descrição, canonical, conteúdo principal e
  JSON-LD sem depender de hidratação.
- O LCP mobile fica abaixo de 2,5 s em medições repetidas e o CLS permanece
  abaixo de 0,1.
- Assets versionados usam cache imutável; mídia sem versão tem TTL curto o
  suficiente para não repetir o incidente do filme institucional.

## Operação externa ainda necessária

Código não garante posição nem citação. O responsável pela propriedade deve:

1. cadastrar e verificar o domínio no Google Search Console e Bing Webmaster
   Tools;
2. configurar os dois tokens de verificação na Vercel;
3. enviar o sitemap nas duas ferramentas;
4. executar `pnpm seo:indexnow` após publicações relevantes;
5. monitorar cobertura, Core Web Vitals, consultas e backlinks;
6. permitir no firewall os bots verificados e seus intervalos de IP oficiais.
