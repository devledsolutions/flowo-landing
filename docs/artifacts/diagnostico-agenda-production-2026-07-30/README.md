# Diagnóstico de agenda - evidências de produção

## Implementação

- Rota: `/recursos/diagnostico-agenda-barbearia`.
- PDF: `/downloads/raio-x-da-agenda-flowo.pdf`.
- Material: 12 páginas A4 com diagnóstico, método C.A.D.E.I.R.A., mapa de
  jornada, horários individuais, regras de handoff, matriz de testes e plano de
  sete dias.
- Captura: nome e e-mail obrigatórios; WhatsApp, e-mail marketing e SMS
  marketing opcionais.
- Entrega: link imediato na página e cópia transacional por e-mail.
- Descoberta: hub de recursos, materiais, rodapé, página comercial, sitemap,
  `llms.txt` e `llms-full.txt`.

## Screenshots

- `landing-desktop.png` - hero em 1440 x 1000.
- `form-desktop.png` - formulário em 1440 x 1000.
- `form-success-desktop.png` - confirmação em 1440 x 1000.
- `landing-mobile.png` - hero em 390 x 844.
- `form-mobile.png` - formulário em 390 x 844.
- `form-success-mobile.png` - confirmação em 390 x 844.

## Testes de navegador

- Chrome em 1440 x 1000 e 390 x 844.
- Sem overflow horizontal.
- Console sem erros ou avisos.
- Todos os alvos interativos visíveis possuem pelo menos 44 px em um dos eixos
  clicáveis; o skip link permanece visualmente oculto até receber foco.
- Telefone vazio foi aceito no payload de teste.
- Resposta HTTP 503 simulada mostrou erro em `role="alert"` e reabilitou o
  botão.
- Resposta HTTP 200 simulada mostrou `role="status"`, link direto para o PDF e
  próxima ação para a página comercial.
- As respostas da API foram interceptadas no navegador local; nenhum lead real
  foi enviado.

## Validações automatizadas

- `pnpm lint`.
- `pnpm build`.
- PDF com 12 páginas, 94.813 bytes e fontes Poppins/Lora incorporadas.
- Arquivo estático responde `200`, `Content-Type: application/pdf`,
  `Cache-Control: public, max-age=604800, stale-while-revalidate=2592000`.
- Sitemap e arquivos para agentes incluem a rota canônica.

## Referências

O lock de referências, a síntese visual e o decision ledger permanecem em
`../premium-lead-offers-2026-07-30/README.md`.
