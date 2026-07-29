# Evidências — home e subrotas comerciais

Capturas registradas em 29 de julho de 2026 após a revisão das páginas
comerciais do Flowo.

## Referência visual

- Base: clareza utilitária e hierarquia editorial do Square.
- Produto: uso de interface como evidência, inspirado no Cal.com.
- Comunicação: texto direto e orientado à rotina, inspirado no Quo.
- Restrições preservadas: paleta tinta + creme, Poppins, bordas finas,
  superfícies planas e ausência de cor decorativa.

## Capturas

- `home-desktop.png` — página inicial em 1512 px.
- `home-mobile.png` — página inicial em 390 × 844 px.
- `sistema-agendamento-desktop.png` — subrota de produto em 1512 px.
- `sistema-agendamento-mobile.png` — subrota de produto em 390 × 844 px.

## Validações

- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `pnpm build`
- Chrome em 1512 px e 390 × 844 px
- Cinco subrotas com uma única `h1`, sem rolagem horizontal e sem erros no
  console
- Menu móvel aberto e fechado por controle acessível
