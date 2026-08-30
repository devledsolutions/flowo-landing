# Cobertura de intenção comercial — 29 de julho de 2026

## Objetivo

Evitar duas falhas opostas: deixar uma capacidade importante sem página
encontrável ou criar várias rotas disputando a mesma intenção. A matriz abaixo
cruza o site público com as superfícies implementadas no produto Flowo.

Fontes internas consultadas:

- `apps/mobile/src/navigation/operator-route-manifest.ts`;
- `apps/mobile/OUTSTANDING.md`;
- `docs/product/flowo-product-spec.md`;
- `docs/specs/`;
- rotas e dados estruturados deste site.

## Matriz de cobertura

| Intenção do cliente | Rota principal | Apoio editorial | Condição pública |
| --- | --- | --- | --- |
| sistema de agendamento para barbearia | `/sistema-agendamento-barbearia` | guia definitivo e escala da equipe | disponível; agenda por profissional |
| agenda de barbearia no WhatsApp | `/agenda-barbearia-whatsapp` | configuração do WhatsApp e redução de faltas | IA e WhatsApp como núcleo |
| aplicativo para barbeiros | `/aplicativo-para-barbeiros` | Home e hub `/recursos` | em preparação; sem data pública |
| pagamentos e PIX para barbearia | `/software-barbearia-com-pix` | guia de pagamentos PIX | opcional e pós-atendimento |
| comissão de barbeiros | `/recursos/comissoes-barbeiros` | planilha e guia de equipe | Empresarial quando habilitado |
| cashback para barbearia | `/recursos/cashback-barbearia` | guia de fidelização | configurável; ativação pela barbearia |
| nota fiscal para barbearia | `/recursos/nota-fiscal-barbearia` | guia financeiro | piloto e ativação assistida |
| recuperar clientes e horários | `/flowo-recupera` | Home e comparativos | add-on em beta acompanhada |
| comparar sistemas para barbearia | `/comparar` | páginas nominais por concorrente | fontes oficiais e data visíveis |
| trocar planilha ou agenda manual | `/flowo-vs-planilha`, `/flowo-vs-agenda-manual` | guias de agenda e financeiro | comparação por processo |
| gestão de equipe e horários diferentes | `/sistema-agendamento-barbearia` | `/recursos/guias/gerenciamento-equipe` e `/recursos/guias/escala-equipe` | horários individuais por profissional |
| comandas, clientes e relatórios | `/recursos` | guias de ticket, financeiro e métricas | apresentados como partes da operação |
| preços de sistema para barbearia | `/precos` | Home e comparativos | R$379, R$789 e Empresarial sob consulta; avaliação assistida quando aprovada |

## Decisões

1. A nova rota do aplicativo preencheu a única lacuna de alta intenção que
   precisava de página própria nesta rodada.
2. Não foram criadas páginas separadas para “comandas”, “clientes” e
   “relatórios”. Hoje essas buscas são melhor atendidas pela página do sistema,
   pelo hub de recursos e pelos guias; novas rotas teriam conteúdo estreito e
   risco de canibalização.
3. Não há página de download do app, badge de loja ou QR code até existirem URLs
   públicas verificáveis.
4. O aplicativo é descrito a partir do manifesto completo de rotas móveis:
   atendimento, relacionamento, cadastros, equipe, gestão e configurações. O
   estado de lançamento vem de `apps/mobile/OUTSTANDING.md`; o site separa
   escopo implementado de distribuição pública nas lojas.
5. Claims de pagamento, fiscal, cashback, comissão e Recupera mantêm sua
   condição comercial ao lado do benefício.

## Próxima revisão

Revisar esta matriz quando qualquer uma destas condições mudar:

- publicação do aplicativo na App Store ou Google Play;
- Flowo Recupera sair de beta acompanhada;
- nota fiscal sair do piloto;
- alteração de plano, preço ou disponibilidade de pagamentos, cashback ou
  comissões;
- dados próprios de busca mostrarem demanda suficiente para uma nova página sem
  canibalização.
