# Flowo Landing

Site institucional e de aquisição da Flowo para barbearias brasileiras. O
projeto usa Next.js App Router, conteúdo em pt-BR e publicação pela Vercel.

## URLs oficiais

| Superfície | URL |
| --- | --- |
| Site institucional | <https://www.flowo.com.br> |
| Aplicação para barbearias | <https://barber.flowo.com.br> |
| Webhook público de pagamentos | <https://barber.flowo.com.br/api/webhooks/asaas> |

O site institucional e a aplicação são projetos diferentes. A landing apresenta
o produto e capta demanda; autenticação, onboarding, operação, pagamentos e
webhooks ficam no monorepo da aplicação.

## Desenvolvimento

Este repositório usa `pnpm`.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

O servidor local abre em <http://localhost:3000>. Use `.env.local` somente para
valores locais e nunca versione credenciais.

## Publicação

A Vercel está vinculada ao projeto `flowo-landing`. A `main` é a fonte de
produção; previews são efêmeros e não devem ser usados em documentação,
webhooks ou integrações.

Uma publicação manual só deve ser executada com autorização explícita:

```bash
vercel --prod
```

Depois do deploy, valide pelo menos:

```bash
curl -I https://www.flowo.com.br
curl -I https://www.flowo.com.br/robots.txt
curl -I https://www.flowo.com.br/sitemap.xml
```

## Operação integrada

A arquitetura de produção, as responsabilidades entre os repositórios e o
estado atual das integrações estão em
[`docs/operations/production-runtime.md`](docs/operations/production-runtime.md).

Pontos importantes:

- produção não usa túnel para webhooks;
- o endpoint da Asaas é HTTPS público e estável na aplicação;
- Vercel e Convex devem ser publicados a partir da mesma revisão do app;
- o código financeiro está em produção, mas a Asaas permanece em sandbox até
  uma ativação financeira real ser autorizada e validada.

## Estrutura

- `app/`: rotas, layouts, metadados e handlers;
- `components/`: seções e componentes reutilizáveis;
- `data/`: conteúdo estático de FAQ, preços e comparações;
- `docs/`: decisões, pesquisas, evidências e runbooks;
- `public/`: imagens, vídeos e materiais públicos;
- `scripts/`: geradores e utilitários operacionais.

Leia também [`AGENTS.md`](AGENTS.md) antes de alterar o projeto.
