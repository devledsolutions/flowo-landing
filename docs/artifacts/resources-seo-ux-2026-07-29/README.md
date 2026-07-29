# Recursos e guias — evidência de UX e SEO

Data da validação: 29 de julho de 2026

## Objetivo

Transformar `/recursos` e `/recursos/guias` em uma biblioteca editorial útil,
encontrável e fiel ao produto atual. A revisão cobre arquitetura de informação,
leitura em desktop e mobile, acessibilidade, metadados, dados estruturados,
indexação e consistência dos materiais derivados.

## Decisões de layout

- A central de guias é organizada por problema e etapa da operação, em vez de
  apresentar uma grade única sem hierarquia.
- Cada artigo usa uma coluna principal de leitura e um sumário fixo no desktop.
  No mobile, o sumário vira um bloco recolhido antes do conteúdo.
- Cards mostram categoria, tempo de leitura, resumo e tópicos concretos. Não há
  busca para um acervo de apenas dez artigos.
- O conteúdo diferencia recurso disponível, dependência de plano ou ativação e
  prática recomendada. Não há estatísticas, depoimentos ou promessas inventadas.
- Guias relacionados e próximo/anterior criam caminhos de aprendizagem e links
  internos descritivos.

Referências editoriais consultadas no Refero:

- Square: alto contraste, utilidade e pouca decoração.
- Hashnode e Anthropic: organização por tópico e problema.
- Lovable e Preply: coluna de leitura, sumário e conteúdo relacionado.

## SEO técnico

- Canonical e `og:url` usam `https://www.flowo.com.br`, que é o destino final do
  redirecionamento de produção.
- `robots.txt` não bloqueia mais `/_next/`; rastreadores podem buscar CSS e
  JavaScript para renderizar a página.
- O sitemap contém 29 URLs canônicas, incluindo os 10 guias derivados do registro
  editorial central, e não inclui `/llms.txt` como página HTML.
- Cada guia publica metadados de artigo, `datePublished`, `dateModified`,
  `Article` e `BreadcrumbList`.
- A imagem social de 1200 × 630 usa a extensão `.png`, coerente com o formato
  real do arquivo e com o MIME enviado pelo servidor.
- As páginas de recursos publicam `CollectionPage`, `ItemList` e breadcrumbs.
- O `llms.txt` deriva os 10 guias do mesmo registro, evitando listas divergentes.
- Todas as URLs do sitemap responderam `200` no build local e apontaram para o
  canonical esperado (a raiz é equivalente com ou sem a barra final).

Referências oficiais:

- Google Search Central — SEO Starter Guide
- Google Search Central — Article structured data
- Google Search Central — Breadcrumb structured data
- Google Search Central — canonical URLs
- web.dev — Core Web Vitals

## Validação

- `pnpm lint`: aprovado sem avisos.
- `pnpm build`: aprovado; 38 páginas geradas.
- Lighthouse mobile, guia de equipe:
  - Performance: 88
  - Acessibilidade: 100
  - Boas práticas: 100
  - SEO: 100
  - FCP: 0,9 s
  - LCP: 3,8 s em simulação móvel
  - TBT: 130 ms
  - CLS: 0
- Lighthouse desktop, central de guias:
  - Performance: 100
  - Acessibilidade: 100
  - Boas práticas: 100
  - SEO: 100
  - FCP: 0,3 s
  - LCP: 0,8 s
  - TBT: 0 ms
  - CLS: 0
- A auditoria inicial encontrou contraste marginal em breadcrumbs e rótulos. Os
  tokens foram corrigidos e a segunda execução alcançou 100 em acessibilidade.
- O LCP é texto e não depende de imagem. O principal custo remanescente é
  JavaScript compartilhado da aplicação e CSS bloqueante do Next.js; esta
  alteração não adiciona JavaScript de cliente aos guias.

## Capturas

- `recursos-desktop.png`
- `recursos-mobile.png`
- `guias-desktop.png`
- `guias-mobile.png`
- `guia-equipe-desktop.png`
- `guia-equipe-mobile.png`
- `lighthouse-guia-mobile.json`
- `lighthouse-guias-desktop.json`
