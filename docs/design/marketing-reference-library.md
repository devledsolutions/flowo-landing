# Flowo — biblioteca de referências de produto e marketing

Data da consolidação: 29 de julho de 2026  
Escopo: site público, páginas comerciais, recursos, preços e futuras
aplicações da mesma linguagem no dashboard e no aplicativo.

## Objetivo

Este documento preserva as fontes e decisões que orientaram a arquitetura
comercial de 2026. Ele não é uma lista de sites para copiar. Cada referência
tem um papel delimitado, e as verdades do produto Flowo prevalecem sobre
qualquer padrão visual ou mensagem externa.

Para a direção específica dos comparativos, consulte
[`comparison-storytelling-reference-lock-2026-07-29.md`](./comparison-storytelling-reference-lock-2026-07-29.md).

## Design brief

Projetar um site mobile-first para donos e gestores de barbearias brasileiras.

- Objetivo: explicar o fluxo completo do WhatsApp ao pós-atendimento e remover
  objeções antes da conversão.
- Tom: profissional, direto, brasileiro e operacional.
- Sensação: software premium que mostra o produto, não uma página genérica de
  startup.
- Objeções principais: medo de trocar a rotina, dúvida sobre o que está no
  plano, impressão de pagamento obrigatório e desconfiança de promessas de IA.
- Restrição: preservar a marca Flowo em preto, creme e tinta oliva, com Poppins
  e Lora, sem criar um segundo sistema visual.
- Ideia memorável: a mesma informação acompanha mensagem, agenda, atendimento,
  comanda e resultado.

## Reference lock

Direção dominante: a home Flowo aprovada em 29 de julho, com fundo creme,
tipografia compacta, faixas claras e escuras e demonstrações do produto em
molduras de navegador.

Preservar:

1. produto visível como prova principal;
2. Poppins para interface e texto; Lora somente em ênfases editoriais já
   existentes;
3. creme, branco quente e tinta oliva, com cor semântica rara;
4. bordas finas, elevação baixa e raio de 12–14 px;
5. ritmo editorial alternando explicação, prova e condição;
6. títulos curtos e corpo em português brasileiro;
7. condições de plano ou ativação antes do CTA;
8. mobile sem perda de contexto, rótulos ou condições.

Rejeitar:

- gradientes ornamentais;
- ícones decorativos sem função;
- cards dentro de cards;
- listas genéricas de benefícios sem evidência;
- screenshots falsos sem legenda de demonstração;
- promessa de receita, automação ou disponibilidade não comprovada;
- apresentar pagamentos, cashback, fiscal ou Recupera como obrigatórios;
- linguagem de fintech ou hardware como identidade principal da Flowo.

## Referências do Refero

### Direção visual

| Referência | Papel delimitado | Elementos adaptados |
| --- | --- | --- |
| Super | Fundação visual principal | Hierarquia editorial, contraste monocromático e produto em destaque |
| Dia Browser | Tratamento do software | Molduras de navegador, controles de janela e profundidade baixa |
| N26 | Clareza financeira | Condições visíveis, linguagem simples e escolha antes da ação |
| Mews | Operação confiável | Densidade, títulos objetivos e informação transacional |
| Operate | Listas e ledger | Divisores, baixa elevação e leitura rápida |
| GlossGenius | Marketing vertical para beleza | Produto visível, linguagem premium e condição comercial clara |
| Attio | Precisão editorial de SaaS | Molduras de interface, hierarquia tipográfica e cor funcional rara |
| Cal.com | Utilidade monocromática | Cards discretos, CTAs binários e agenda como prova |
| Krea | Profundidade do produto | Luz e profundidade reservadas ao mockup, sem importar um segundo tema |

### Páginas e componentes

| Referência | Uso |
| --- | --- |
| Understory product landing | Hero de produto com explicação e prova lado a lado |
| Polar feature page | Página de recurso com uma tese, fluxo e condições |
| Resend pricing | Separação entre plano principal e capacidade adicional |
| GlossGenius pricing | Comparação de planos com disponibilidade legível |
| Acuity Scheduling / Calendly | Relatórios de agenda e evidência de resultado |

### Fluxos

| Referência | Uso |
| --- | --- |
| TidyCal Provider Account Setup | Ativação de pagamento com “configurar agora” e “deixar para depois” igualmente válidos |
| GlossGenius commission setup | Regra de comissão antes do saldo e da ação financeira |
| Apple Invites | Revisão explícita, decisão humana e atualização imediata do estado |
| Cron Calendar / Attio | Selo compacto de anúncio e hierarquia entre marca principal e produto adicional |
| Copperx Savings Interest Signup | Interesse em um clique e confirmação no mesmo lugar |
| Amie Calendar — iOS | Agenda diária escaneável, data fixa e blocos de atendimento |
| Fresha waitlist | Condição e revisão antes da confirmação |

As pesquisas foram feitas no Refero em 29 de julho de 2026. Os nomes acima são
mantidos para permitir uma nova busca e atualização futura, sem transformar
tokens de um produto em tokens globais da Flowo.

### Referências específicas do aplicativo

Pesquisa realizada no Refero em 29 de julho de 2026:

- GlossGenius, style `4d3d9817-68f9-4f33-adb8-f347b4eb5bd6`;
- Attio, style `9f0c028b-6b11-415e-ab92-f32e4597cbe2`;
- Cal.com, style `23fd2b9b-b9ea-45e3-8370-7451ea05cee6`;
- Krea, style `3a63b3fa-dc79-4dc3-935e-3f8f4ab447a7`;
- Amie Calendar iOS, screen `0806337f-6596-46ef-b042-a407652f8411`;
- Fresha waitlist, screen `8526b814-25e9-4708-8b72-622bac2d2611`;
- Copperx Savings Interest Signup, flow `8902`.

Pesquisa complementar realizada no Refero em 30 de julho de 2026 para ampliar
a página do aplicativo:

- Square, style `498eab31-2815-4b0a-a4be-d2bd82d49240`;
- Flighty, style `21386b79-b498-4cdc-b291-1c85cc86071b`;
- Mangomint mobile apps, screen `b7e7677d-fb92-4c97-9068-76b41221d527`;
- Shopify Orders iOS, screen `ce43cc1f-30c8-42cf-8992-e966feb8c62e`;
- Fresha Sales help navigation, flow `4977`.

Reference lock do aplicativo:

1. GlossGenius orienta a confiança vertical e o produto como prova.
2. Square orienta a organização de muitas capacidades em grupos operacionais,
   sem transformar a página em uma grade repetitiva de cards.
3. Flighty e Krea contribuem somente com profundidade e enquadramento dos
   dispositivos; a interface dentro deles segue o app real.
4. Attio e Cal.com orientam divisores, hierarquia e superfícies.
5. Mangomint orienta a alternância entre narrativa, tela do produto e inventário
   completo de recursos.
6. Amie, Shopify e as evidências móveis da Flowo orientam a leitura funcional
   de agenda, listas e indicadores, sem copiar tokens de terceiros.
7. Copperx orienta o cadastro de interesse em dois estados: ação e confirmação.
8. Fresha reforça que condição e expectativa devem aparecer antes do envio.

Rejeições: badges de loja sem URL real, QR code sem destino útil, data de
lançamento inventada, screenshots de aplicativo genérico e um novo sistema de
cores fora da identidade Flowo.

### Decision ledger da página completa do aplicativo

| Decisão | Fonte | Regra preservada | Motivo |
| --- | --- | --- | --- |
| Hero com três telas operacionais | Flighty + Krea + evidências Flowo | Dispositivo como objeto; profundidade restrita ao mockup | Comunica amplitude antes da primeira rolagem |
| Quatro grupos de capacidades em linhas | Square + manifesto móvel | Hierarquia utilitária, sem cards repetidos | Permite cobrir o produto sem perder leitura |
| Três capítulos com pares de telas | Mangomint + GlossGenius | Produto acompanha cada argumento | Mostra agenda/comanda, cliente/conversa e financeiro/operação |
| Jornada em cinco passos | Manifesto móvel + produto Flowo | Números apenas onde a ordem é real | Explica continuidade do onboarding ao pós-atendimento |
| Faixa de condições antes do FAQ | Produto Flowo + Fresha | Condição junto do benefício | Evita prometer plano, permissão, pagamento, fiscal ou loja |
| Previews code-native com dados ilustrativos | Evidências Flowo | Estrutura e UI reais; nenhum dado é claim | Evita screenshot obsoleto e preserva performance |

## Referências competitivas

As páginas oficiais abaixo servem para estudar estrutura comercial, não para
publicar afirmações comparativas sem nova verificação:

- [Trinks para barbearias](https://negocios.trinks.com/negocios/barbearias/)
- [Avec para negócios](https://negocios.avec.app/sistema-para-barbearia-gestao-e-clientes)
- [Graces para barbearias](https://graces.com.br/barbearia/)
- [AppBarber](https://www.appbarber.com.br/)
- [Barbeiro.app](https://www.barbeiro.app/funcionalidades)

A pesquisa nominal para as comparações publicadas em 29 de julho de 2026 está
registrada em
[`docs/research/competitor-comparisons-2026-07-29.md`](../research/competitor-comparisons-2026-07-29.md).

Regra: qualquer comparação nominal deve registrar data da captura, URL, frase
observada e escopo. A Flowo não deve afirmar ser “melhor” sem critério
verificável e correspondente no produto.

## Mockups aprovados

- [Home — recebimento e operação](../artifacts/site-product-architecture-2026-07-29/reference-mockups/mockup-home-optional-operations-desktop.png)
- [Páginas de pagamentos, cashback, comissões e fiscal](../artifacts/site-product-architecture-2026-07-29/reference-mockups/mockup-product-pages-desktop.png)
- [Preços e recursos no mobile](../artifacts/site-product-architecture-2026-07-29/reference-mockups/mockup-pricing-resources-mobile.png)

Esses mockups são referências de hierarquia e mensagem. A implementação deve
usar componentes reais, conteúdo responsivo e estados acessíveis.

## Fontes de verdade do produto

Repositório: `flowo-app-v2/flowo-app`.

- `docs/product/flowo-product-spec.md`: preços, planos e contrato comercial.
- `docs/product/code-vs-spec-gap-ledger.md`: diferenças entre código e produto.
- `docs/specs/`: comportamento validado por domínio.
- `docs/plans/2026-07-26-flowo-recupera.md`: conceito, segurança e atribuição do
  Flowo Recupera.
- `docs/plans/2026-07-26-flowo-recupera-build-spec.md`: empacotamento proposto,
  ondas e gates do Recupera.
- `docs/plans/artifacts/flowo-recupera/mockups-v2-current-state/README.md`:
  referência visual final do Recupera para web e mobile.
- `apps/dashboard/src/app/(dashboard)/resultados/page.tsx`: relatório de valor
  existente.
- `apps/dashboard/src/components/dashboard/widgets/action-feed/`: fila e
  decisão existentes.
- `packages/backend/convex/internal/actionFeed.ts`: geração conservadora das
  oportunidades atuais.
- `packages/backend/convex/outboundDispatch.ts`: evidência e idempotência de
  contato.
- `packages/backend/convex/waitlist.ts`: correlação explícita de horários
  recuperados.

## Verdades comerciais preservadas

### Pagamentos

- Nunca existe depósito, sinal ou pagamento para reservar.
- Dinheiro e maquininha própria continuam válidos.
- PIX e cartão integrados são opcionais.
- O registro acontece depois do serviço.

### Cashback

- Cashback é diferente de pontos de fidelidade.
- Percentual, validade, mínimo e teto precisam ser configuráveis.
- A ativação e a pausa pertencem à barbearia.
- A embalagem comercial ainda precisa de confirmação antes de expor preço.

### Comissões

- Disponível no Empresarial quando habilitado.
- O saldo nasce de uma comanda paga.
- O gestor inicia o repasse por PIX.
- Não existe repasse semanal automático.

### Fiscal

- Está em piloto e ativação assistida.
- Depende de município, UF, documento, credenciais e homologação.
- Não substitui o contador.

### Flowo Recupera

- É um módulo Flowo, não uma empresa ou sistema paralelo.
- É um add-on contratado separadamente dos planos principais.
- A fundação de Action Feed, waitlist e Resultados já existe.
- A fase de segurança do win-back está coberta no backend.
- A fila dedicada, a atribuição completa e o empacotamento comercial ainda
  precisam ser concluídos.
- A primeira versão exige revisão humana.
- Horário vago precisa de disponibilidade comprovada.
- Receita realizada exige atendimento concluído e comanda fechada.
- Preço e allowances do documento de build são hipóteses, não oferta pública.

## Ledger de decisões

| Decisão | Fonte | Regra preservada | Motivo |
| --- | --- | --- | --- |
| Mostrar dinheiro, maquininha própria e Flowo como escolhas equivalentes | Usuário + fluxo TidyCal | Pagamento integrado opcional | Remove falsa obrigação |
| Separar recursos adicionais dos planos | Resend + N26 | Condição antes do CTA | Evita esconder ativação ou disponibilidade |
| Uma página por capacidade | Polar + SEO | Uma intenção de busca por página | Melhora compreensão e indexação |
| Moldura de navegador com UI demonstrativa | Dia Browser + home aprovada | Produto como prova | Torna o software concreto |
| Assinatura “Flowo / Recupera” com selo de add-on | Cron + Attio + marca Flowo | Marca principal preservada; status em selo compacto | Comunica extensão de produto sem criar uma empresa paralela |
| Recursos organizados por problema | Understory + biblioteca atual | Intenção do usuário primeiro | Reduz navegação por taxonomia interna |
| Recupera como beta em preparação | Specs internas | Sem promessa de GA | Preserva verdade do produto |
| Potencial, agendamento, atendimento e receita separados | Contrato Recupera | Receita apenas com comanda fechada | Evita ROI inventado |
| Filme institucional em 16:9 e 9:16 | Frame.io + Attio + Glide | Produto, condições e logo Flowo como narrativa principal | Atende site e mídia social sem criar uma segunda identidade |
| Player sem autoplay, com VTT e transcrição | Acessibilidade + performance | Usuário controla som e reprodução | Preserva Core Web Vitals e consumo mobile |
| Página própria `/aplicativo-para-barbeiros` | GlossGenius + Square + Flighty + Mangomint + fonte móvel real | Escopo implementado separado da distribuição pública | Cria intenção de busca, mostra profundidade e não finge lançamento |
| Lista de interesse inline em dois estados | Copperx flow 8902 | Sem data pública e sem modal | Reduz atrito e confirma o resultado no contexto |
| Segment como camada de eventos | Arquitetura existente do site | Consentimento e zero PII nos eventos | Evita segundo SDK, peso e custo de instrumentação |
| Perfis de uso baseados na validação técnica | Validação controlada de produção de 26/07/2026 + `/demonstracao-agendamento-whatsapp` | Nomes fictícios identificados; somente capacidades efetivamente exercitadas; sem atribuir resultado econômico ou depoimento | Mostra como a prova técnica se aplica à rotina solo e de equipe sem inventar cliente ou métrica |

### Casos de validação da Home

Os nomes “Linha Onze Barbearia” e “Quatro Tempos Barbearia”, assim como seus
logos, são fictícios e representam perfis de uso, não identidades ou
depoimentos de clientes. A evidência apresentada vem da validação técnica
concluída em produção, com ativos próprios, em 26 de julho de 2026:

- resposta pelo WhatsApp;
- consulta de disponibilidade;
- criação e consulta de agendamento;
- remarcação, cancelamento e confirmação;
- pausa e retomada da IA durante atendimento humano.

Os perfis não publicam volume, economia de tempo, receita ou outra métrica ainda
não observada. Quando existirem clientes autorizados, a seção poderá evoluir
para casos comerciais com período, amostra, método e consentimento documentados.

Os nomes exatos foram pesquisados antes da publicação. “Clube da Barba
Curitiba”, opção descartada, coincide com uma empresa ativa e não deve ser
usado como identidade fictícia. As identidades aprovadas continuam marcadas
como fictícias na Home, no hub e nas páginas individuais.

### Identidades visuais dos casos de validação

As duas marcas foram geradas no ChatGPT Image em 31 de julho de 2026 e
exportadas em PNG de 768 × 768 px para uso no site:

- `public/images/validation-cases/linha-onze-professional-v2.png`: assinatura
  tipográfica vertical com monograma XI, ornamentação gravada e acento em latão;
- `public/images/validation-cases/quatro-tempos-professional-v2.png`: emblema
  arquitetônico de traço mais largo, número quatro integrado e ritmo radial em
  quatro partes, com acento bordô.

Direção dos prompts: identidade completa de barbearia premium, com lettering
protagonista, hierarquia de fachada, composição legível e acabamento de marca
histórica. A Black Stive Barbearia, de Campinas, foi observada somente como
referência de nível de acabamento — presença tipográfica, moldura ornamental e
leitura de letreiro. Nenhum nome, símbolo, lettering, composição ou ornamento da
marca real foi reproduzido. As duas soluções são originais e deliberadamente
distintas entre si.

As imagens permanecem identidades fictícias dos perfis de validação e não devem
ser reutilizadas como logos de clientes reais. O layout reserva 96 px na Home e
até 160 px nas páginas individuais para não reduzir uma assinatura completa ao
tamanho de um ícone genérico.

### Auditoria factual dos casos

As afirmações operacionais foram confrontadas com o produto em 31 de julho de
2026:

- serviços, duração, agenda por profissional, horários individuais e folgas:
  `flowo-app-v2/flowo-app/docs/specs/business-catalog.md`;
- disponibilidade e respeito ao horário do profissional:
  `packages/backend/convex/appointments/availability.ts` e
  `convex/__tests__/business-hours-validation.test.ts` (35 testes aprovados);
- criação, confirmação e proibição de alegar sucesso sem a mutação concluir:
  `packages/backend/convex/ai/prompt_v2.ts` e
  `convex/__tests__/booking-audit-fixes.test.ts` (16 testes aprovados);
- remarcação sem criar agendamento duplicado e cancelamento explícito:
  `packages/backend/convex/ai/prompt_v2.ts`;
- pausa para atendimento humano e retorno à IA:
  `docs/specs/conversations-inbox.md` e
  `convex/__tests__/human-handoff-intent.test.ts` (3 testes aprovados).

Os casos não afirmam volume, economia, receita, redução de faltas ou resultado
comercial ainda não medido.

## Processo para usar esta biblioteca

1. Conferir a fonte de verdade do produto antes de escrever.
2. Escolher uma referência dominante e atribuir funções estreitas às demais.
3. Registrar novas decisões neste ledger.
4. Produzir mockup quando a hierarquia mudar materialmente.
5. Implementar com os tokens e componentes existentes.
6. Capturar desktop e mobile.
7. Comparar contra o mockup e corrigir drift.
8. Atualizar esta biblioteca quando uma capacidade mudar de piloto, opcional ou
   indisponível para GA.
