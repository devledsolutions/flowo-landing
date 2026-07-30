# Runtime e integrações de produção

Atualizado em 30 de julho de 2026.

Este documento registra como a landing se conecta ao restante da plataforma
Flowo. Ele é operacional: não substitui a documentação de produto nem autoriza
ativação de provedores financeiros.

## Mapa dos ambientes

| Camada | Produção | Responsabilidade |
| --- | --- | --- |
| Site institucional | `https://www.flowo.com.br` | Marketing, SEO, conteúdo e aquisição |
| Aplicação web | `https://barber.flowo.com.br` | Login, onboarding e operação das barbearias |
| Backend | Convex `handsome-oriole-443` | Dados multi-tenant, regras de negócio, jobs e integrações |
| App móvel | EAS Update, canal `production`, runtime `1.0.1` | Operação nativa iOS e Android |
| Webhook Asaas | `https://barber.flowo.com.br/api/webhooks/asaas` | Eventos de pagamentos e transferências |

As URLs geradas pela Vercel com sufixo `vercel.app` são identificadores de
deploy ou preview. Integrações externas e documentação pública devem usar os
domínios canônicos acima.

## Landing versus aplicação

A landing não processa pagamentos nem recebe webhooks da Asaas. Seus links de
conversão direcionam para a aplicação, que concentra:

1. autenticação e criação do tenant;
2. onboarding da barbearia;
3. agenda, clientes, comandas e financeiro;
4. integração oficial com WhatsApp;
5. pagamentos, split, saldo e retirada;
6. processamento de webhooks no backend.

Essa separação evita que uma mudança editorial na landing altere o runtime
transacional.

## Webhook sem túnel em produção

Em produção, a Asaas chama diretamente:

```text
POST https://barber.flowo.com.br/api/webhooks/asaas
```

O endpoint é público, HTTPS e estável. Portanto, não há necessidade de ngrok,
Cloudflare Tunnel ou qualquer túnel local.

Um túnel só é necessário quando um provedor externo precisa alcançar um servidor
rodando na máquina do desenvolvedor. URLs de túnel nunca devem ser cadastradas
como webhook de produção.

O webhook deve:

- exigir o token canônico configurado no servidor;
- rejeitar chamadas sem autenticação;
- deduplicar eventos antes de aplicar efeitos financeiros;
- não registrar tokens, chaves PIX ou payloads sensíveis;
- manter reprocessamento idempotente.

## Estado atual da Asaas

O código de pagamentos, split, atualização de saldo e retirada está implantado
na infraestrutura de produção da Flowo. Entretanto, o provedor permanece
deliberadamente em homologação:

```text
ASAAS_SANDBOX=true
PAYMENT_PROVIDER_SANDBOX=true
```

Isso significa:

- a aplicação de produção acessa a API sandbox da Asaas;
- nenhum pagamento real foi autorizado por esta configuração;
- “deploy de produção” não significa “Asaas real ativada”;
- a landing não deve anunciar movimentação financeira real como disponível
  antes do go-live financeiro.

Para ativar a Asaas real, é necessário um release financeiro separado com:

1. credenciais e wallet de produção validadas;
2. subconta real verificada;
3. webhook real autenticado e conferido;
4. flags de sandbox removidas de forma coordenada;
5. teste controlado de baixo valor, explicitamente autorizado;
6. conferência de cobrança, split, saldo, retirada e idempotência.

Alterar somente as flags com credenciais de sandbox interromperia o fluxo.

## Regra de publicação coordenada

Mudanças no contrato entre dashboard e Convex devem ser publicadas a partir da
mesma revisão:

1. validar lint, tipos, build e testes do escopo alterado;
2. integrar a revisão na `main`;
3. publicar Convex de produção;
4. publicar o dashboard na Vercel;
5. validar `GET /api/health`;
6. executar smoke tests read-only;
7. publicar OTA apenas quando o fingerprint nativo for compatível.

Uma OTA não substitui um novo binário quando houver mudança de dependência
nativa, plugin Expo, permissão, ícone, splash, SDK ou versão de runtime.

## Checklist após deploy

- [ ] `https://www.flowo.com.br` responde `200`.
- [ ] `https://barber.flowo.com.br/api/health` responde `200`.
- [ ] Domínios canônicos apontam para os deployments esperados.
- [ ] Convex e dashboard correspondem à mesma revisão da `main`.
- [ ] Webhook autenticado rejeita token ausente ou inválido.
- [ ] Nenhum segredo aparece em logs ou respostas HTTP.
- [ ] Canal e runtime da OTA são compatíveis com os binários instalados.
- [ ] O estado sandbox/produção de cada provedor está declarado sem ambiguidade.

## Limites de comunicação

Até a ativação financeira real:

- permitido: “pagamentos integrados em homologação” ou “infraestrutura
  preparada para pagamentos integrados”;
- não permitido: afirmar que dinheiro real, split real ou saques reais estão
  liberados para clientes em produção.

Essa restrição vale para páginas, campanhas, apresentações e materiais gerados
a partir deste repositório.
