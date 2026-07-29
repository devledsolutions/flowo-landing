# Auditoria dos guias de produto — 29/07/2026

## Escopo

Revisão de conteúdo, navegação e responsividade das dez guias publicadas em
`/recursos/guias`. O conteúdo foi confrontado com a especificação canônica e
com as superfícies atuais do dashboard, mobile e backend da Flowo.

| Guia | Fonte principal de verdade |
| --- | --- |
| Agendamento | `public-booking`, `agenda-appointments`, `onboarding` |
| Equipe | `business-catalog`, `agenda-appointments`, `commissions-payouts` |
| WhatsApp | `whatsapp-ai-assistant`, `campaigns-marketing` |
| Pagamentos PIX | `payments`, especificação canônica do produto |
| Redução de faltas | `agenda-appointments`, `whatsapp-ai-assistant` |
| Relatórios e métricas | `analytics-reporting` e página `/metricas` |
| Ticket médio | `business-catalog`, comandas e relatórios atuais |
| Fidelização | `crm-clientes`, `loyalty`, `campaigns-marketing` |
| Escala da equipe | horários individuais, folgas e serviços elegíveis |
| Controle financeiro | `payments` e superfícies financeiras operacionais |

## Decisões de precisão

- Pagamentos no fluxo atual acontecem depois do atendimento, pela comanda; as
  guias não prometem sinal nem pagamento antecipado.
- Falta de resposta à confirmação não cancela nem libera automaticamente um
  horário.
- Cada profissional pode ter horários, folgas e serviços próprios. A opção
  “qualquer profissional” considera elegibilidade e disponibilidade, sem
  prometer distribuição em rodízio.
- Comissões exigem o plano Empresarial e a configuração correspondente. O
  crédito pode ser calculado pelo sistema, mas o repasse PIX é iniciado pelo
  responsável.
- O WhatsApp só é apresentado como disponível depois da aprovação e conexão do
  canal oficial.
- A área financeira é descrita como controle operacional, não como
  contabilidade, DRE ou gestão completa de despesas.
- As métricas publicadas correspondem aos indicadores presentes hoje no
  produto. Ocupação e desempenho individual não foram anunciados como painéis
  prontos quando ainda exigem cálculo complementar.
- Campanhas, fidelidade e recursos avançados aparecem com os respectivos
  requisitos de plano, ativação e permissão.

## Referência visual

O padrão foi consolidado a partir de referências pesquisadas no Refero:

- Square para utilidade, contraste e prova concreta do produto;
- Hashnode para navegação editorial;
- Instacart, Sunsama e Monday para hierarquia de passos, avisos e conteúdo
  relacionado.

Foram preservados o sistema visual monocromático da Flowo, Poppins/Lora,
contraste alto, bordas finas e foco no uso real. Foram evitados gradientes
decorativos, estatísticas inventadas, depoimentos artificiais e grades
genéricas de funcionalidades.

## Validação

| Verificação | Resultado |
| --- | --- |
| `pnpm lint` | Aprovado |
| `pnpm exec tsc --noEmit` | Aprovado |
| `pnpm build` | Aprovado — 38 páginas estáticas |
| Desktop | 10/10 guias, 1512 × 861 |
| Mobile | 10/10 guias, 390 × 844 |
| Estrutura | Um H1 por página, sem links visíveis vazios |
| Responsividade | Sem rolagem horizontal |
| Acessibilidade móvel | Ações e controles principais com alvo mínimo de 44 px |
| Sumário | Visível no desktop e recolhido por padrão no celular |

Esta pasta contém vinte capturas em página inteira: uma versão desktop e uma
versão mobile de cada guia.
