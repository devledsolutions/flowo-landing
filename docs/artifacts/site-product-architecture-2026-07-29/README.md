# Arquitetura comercial do site — 29/07/2026

## Objetivo

Registrar os mockups aprovados e, depois da implementação, as evidências
desktop/mobile das páginas que completam a história comercial do Flowo.

## Referências visuais

Os arquivos em `reference-mockups/` são os mockups aprovados antes da
implementação:

- `mockup-home-optional-operations-desktop.png`
- `mockup-product-pages-desktop.png`
- `mockup-pricing-resources-mobile.png`

## Escopo implementado

- recebimento opcional e recursos operacionais na home;
- página de pagamentos reescrita;
- páginas de cashback, comissões e nota fiscal;
- recursos adicionais separados dos planos;
- novo hub de comparação;
- recursos organizados por problema e por capacidade;
- Flowo Recupera apresentado como beta em preparação, sem promessa de GA.

## Evidências da implementação

As capturas em `implementation/` foram geradas contra o build de produção local:

- `home-desktop-full.png` e `home-mobile.png`;
- `home-recupera-addon-desktop.png` e `home-recupera-addon-mobile.png`;
- `pagamentos-desktop-full.png` e `pagamentos-mobile-full.png`;
- `precos-desktop-full.png` e `precos-mobile-full.png`;
- `recursos-desktop-full.png` e `recursos-mobile-full.png`;
- `recupera-desktop-full.png` e `recupera-mobile-full.png`;
- páginas de cashback, comissões, fiscal e comparação em desktop e mobile.

Viewports verificados:

- desktop: 1512 × 982 px;
- mobile: 390 × 844 px.

Todas as páginas principais permaneceram sem overflow horizontal. O menu mobile
foi aberto e fechado por seu nome acessível. As novas rotas públicas retornaram
HTTP 200; o Recupera usa `noindex, nofollow` e não aparece no sitemap enquanto
o módulo não estiver comercialmente aprovado.

## Validação local

- `pnpm lint`;
- `pnpm exec tsc --noEmit`;
- `pnpm build`;
- navegação e capturas no Chrome contra `next start`;
- inspeção dos metadados e do sitemap.

## Fonte das decisões

Veja `docs/design/marketing-reference-library.md`.
