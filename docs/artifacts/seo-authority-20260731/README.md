# Evidência — SEO, autoridade e páginas comerciais

**Validado em:** 31 de julho de 2026  
**Ambiente:** build de produção local em `http://localhost:3108`  
**Branch:** `codex/seo-authority-20260731`

## Cobertura automática

Comando:

```bash
pnpm seo:audit http://localhost:3108
```

Resultado:

- 46 páginas canônicas lidas do sitemap;
- 49 destinos internos únicos verificados;
- 1 imagem social 1200 × 630 verificada;
- zero erro e zero aviso;
- título e descrição únicos;
- canonical e `og:url` correspondentes;
- Open Graph e Twitter Card completos;
- um H1 e `#main-content` no HTML inicial;
- nenhum `noindex` no sitemap;
- todos os blocos JSON-LD válidos como JSON;
- nenhuma rota ou imagem social quebrada.

## Regressão de renderização corrigida

Antes, a rota de categoria em produção retornava HTML sem H1 e com apenas o
link de acessibilidade; o restante dependia da hidratação. Depois da correção, a
Home local contém `<main>`, H1, texto do hero e 59 links no documento inicial.

O tracking continua condicionado ao consentimento. A query string é lida no
efeito do Segment sem suspender toda a página.

## Lighthouse

| Página e perfil | Performance | Acessibilidade | Boas práticas | SEO | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home, mobile (rodada final) | 93 | 100 | 100 | 100 | 1,4 s | 3,3 s | 20 ms | 0 |
| Sistema para barbearia, mobile | 94 | 100 | 100 | 100 | 1,2 s | 3,0 s | 0 ms | 0 |
| Flowo vs BestBarbers, mobile | 95 | 100 | 100 | 100 | 1,2 s | 2,9 s | 10 ms | 0 |
| Recepcionista com IA, mobile | 93 | 100 | 100 | 100 | 1,2 s | 3,2 s | 10 ms | 0 |
| Home, desktop | 100 | 100 | 100 | 100 | 0,4 s | 0,7 s | 0 ms | 0 |

Os JSONs brutos do Lighthouse são artefatos regeneráveis e ficam ignorados pelo
Git; esta tabela registra os resultados da rodada aprovada. O perfil mobile usa
simulação do Lighthouse; os valores de campo devem ser acompanhados no Search
Console depois da publicação.

## Inspeção visual e funcional

Páginas conferidas em 1440 × 1000 e 390 × 844:

- Home;
- sistema de agendamento para barbearia;
- demonstração do agendamento no WhatsApp;
- hub de comparações;
- Flowo vs Barva;
- Flowo vs Opero;
- Sobre a Flowo.
- recepcionista com IA, incluindo a navegação contextual para demonstração,
  sistema e comparações.
- comparativo Flowo vs BestBarbers;
- guia “Melhor sistema para barbearia”.

Resultado:

- nenhum overflow horizontal;
- exatamente um H1 em cada viewport;
- nenhum link sem nome acessível;
- menu móvel abriu, expôs todas as rotas principais e navegou corretamente para
  a página de preços;
- canonicals, `robots`, idioma, metadados sociais e schemas conferidos no DOM;
- nenhum erro ou aviso de console nas rotas críticas;
- imagens carregadas; o poster de vídeo marcado como pendente em uma passagem
  era lazy-load fora da viewport e respondeu `200 image/jpeg` quando solicitado;
- layouts mantêm o sistema visual existente em desktop e mobile.

As duas rotas novas foram verificadas no HTML inicial e nas larguras de 390 e
1440 px. O comparativo entrega 1 H1, 1.425 palavras aproximadas, 57 links e
schemas Article, SoftwareApplication, BreadcrumbList e FAQPage. O guia entrega
1 H1, 1.165 palavras aproximadas, 74 links e schemas Article, CollectionPage e
BreadcrumbList.

## Capturas

Arquivos `*-desktop.png`, `*-mobile.png`, `*-desktop.jpg` e `*-mobile.jpg` neste
diretório registram as páginas testadas. As versões JPEG foram usadas nas
páginas longas para reduzir o peso do artefato.

## Build

- `pnpm exec tsc --noEmit`: aprovado;
- `pnpm lint`: aprovado sem avisos;
- `pnpm build`: aprovado, 64 rotas geradas;
- bundle da Home: 143 kB de JavaScript inicial;
- páginas de categoria, demonstração, parcerias e comparações: 122 kB de
  JavaScript inicial.

## Limite desta evidência

O teste local não substitui URL Inspection, Rich Results Test, PageSpeed de campo
ou monitoramento no Search Console depois do deploy. A inspeção em produção e a
submissão de sitemap devem ser repetidas após a publicação desta branch.
