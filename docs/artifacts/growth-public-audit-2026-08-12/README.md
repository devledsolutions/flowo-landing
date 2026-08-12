# Auditoria pública de aquisição - 12 de agosto de 2026

## Escopo

Auditoria do site público, materiais de captura, consentimento de publicidade e
superfícies de descoberta antes das primeiras campanhas pagas.

## Produção observada

- `pnpm seo:audit https://www.flowo.com.br`: 49 páginas, 53 links internos, uma
  imagem social, zero erros e zero avisos;
- `pnpm consent:audit`: analytics separado de publicidade; Segment restrito a
  analytics; Meta, Google Ads e TikTok dependentes do consentimento de marketing;
- `pnpm marketing:audit`: o primeiro resultado encontrou quatro PDFs fora do
  catálogo.

## Correções realizadas

- o Raio-X foi classificado como material independente, validado pela referência
  real do formulário do funil;
- três URLs antigas foram preservadas, mas os PDFs foram substituídos por edições
  atuais e alinhadas à marca;
- preços antigos, teste grátis, meta universal e promessa de redução de faltas
  foram removidos;
- Guia de Gestão da Barbearia, Painel Semanal da Barbearia e Stories com Cara da
  sua Barbearia passaram a usar gate de captura e entraram no catálogo;
- `llms.txt` e `llms-full.txt` passaram a descrever os três recursos atuais;
- o auditor agora verifica 23 itens do catálogo e um material independente.

## Qualidade dos PDFs

Cada PDF possui oito páginas, fontes Poppins e Lora incorporadas, metadados de
título/autor/assunto e texto selecionável. As 24 páginas foram renderizadas em
PNG e revisadas em grade; páginas de tabela e encerramento também foram
inspecionadas em resolução maior. Não foram encontrados cortes, sobreposições,
glifos ausentes ou conteúdo ilegível.

## Resultado esperado após publicação

O site mantém URLs que podem ter backlinks, mas deixa de oferecer conteúdo
comercial contraditório. Toda entrada de download conhecida passa a ter um
identificador de recurso e o mesmo contrato de consentimento e atribuição do
restante do funil.
