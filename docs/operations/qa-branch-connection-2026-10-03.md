# Branch permanente QA — 2026-10-03

## Configuração remota comprovada

- Projeto dedicado: `flowo-landing-qa`
  (`prj_5G0fONriezOUC1MimjJbaYem4SDc`), equipe Devled.
- Repositório: `devledsolutions/flowo-landing`, branch de publicação `qa`.
- Git deployments habilitados; previews desativados; instalação com lockfile
  congelado, Node 22 e build `pnpm build`.
- Domínio próprio `qa.flowo.com.br`, verificado na Vercel. O target chamado
  `production` pertence ao projeto QA isolado, não ao projeto do site de produção.
- O projeto de produção foi somente lido e permaneceu em `main` com previews
  desativados. Nenhuma configuração, variável ou credencial sua foi alterada.
- GitHub Actions e required checks não são pré-requisitos nesta etapa.
  Segment fica desativado/opcional; não foi criada outra conta ou fonte.

## Primeira publicação e correção de configuração

O deployment `dpl_CWNPHVYwLd3eyhHBRWf9nLCbQkkC`, do branch `qa` e SHA
`3938e77dc9392ac391d413ca457254ef41d0dfb3`, foi criado no projeto QA correto.
O build recusou a ausência de `FLOWO_QA_TURNSTILE_SITE_KEY` e
`FLOWO_PRODUCTION_TURNSTILE_SITE_KEY`, sem atualizar o alias público.

Os dois seletores não secretos já existiam no GitHub Environment `qa`.
Antes de adicioná-los ao runtime Vercel QA, a metadata atual confirmou as
credenciais Turnstile somente no projeto dedicado QA e ausência de configuração
Turnstile no projeto de produção. A referência de produção representa esse
estado desativado; não é uma credencial emprestada nem sucesso simulado.
As duas inclusões foram relidas e comparadas em memória, sem imprimir valores.
Nenhuma validação de isolamento foi removida ou desabilitada.

O push `b13f0272659d7e33dd3c49ded4f2d07fd74c871f` disparou automaticamente
o deployment Git `dpl_2qs7AH8ueoWNvGhQdLix7v5S77jH` do projeto QA correto,
confirmando a conexão Git sem depender de Actions. O guard recusou apenas
`FLOWO_PRODUCTION_TURNSTILE_DISABLED`, marcador complementar exigido quando
a referência de produção é `disabled`. Depois da revalidação da ausência de
Turnstile no projeto de produção, esse marcador foi adicionado como `true`
somente no projeto QA e relido. Isso descreve o estado real de produção;
não desativa o Turnstile QA nem enfraquece o guard.

O próximo push de `qa` deve comprovar o build com os três seletores sincronizados.
Até existir deployment `READY`, alias e health do SHA esperado, a publicação
pública permanece não comprovada. Build/health não certificam formulários,
Siteverify, entrega de leads, e-mail ou WhatsApp: esses fluxos exigem evidência
end-to-end com destinatários QA autorizados.
