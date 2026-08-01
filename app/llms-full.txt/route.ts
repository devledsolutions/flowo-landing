import {
  COMPARISON_LAST_VERIFIED_LABEL,
  COMPETITOR_COMPARISONS,
} from "@/data/competitor-comparisons";
import { PLANS, formatBRL } from "@/data/pricing-data";
import { INSTITUTIONAL_FILM } from "@/lib/institutional-film";
import { SITE_URL } from "@/lib/seo";

const CACHE_HEADER =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400";

export function GET() {
  const plans = PLANS.map(
    (plan) =>
      `- ${plan.name}: ${formatBRL(plan.monthly)}/mês. ${plan.description} Recursos principais: ${plan.features.join("; ")}.`,
  ).join("\n");

  const comparisons = COMPETITOR_COMPARISONS.map((comparison) => {
    const rows = comparison.rows
      .map(
        (row) =>
          `  - ${row.criterion}\n    - Flowo: ${row.flowo}\n    - ${comparison.name}: ${row.competitor}`,
      )
      .join("\n");
    const sources = comparison.sources
      .map((source) => `  - ${source.label}: ${source.url} — ${source.scope}`)
      .join("\n");

    return `## Flowo vs ${comparison.name}
URL canônica: ${SITE_URL}${comparison.path}

Resumo: ${comparison.summary}

Melhor perfil para Flowo: ${comparison.flowoFit}

Quando considerar ${comparison.name}: ${comparison.competitorFit}

Conclusão: ${comparison.honestVerdict}

Preço e composição: ${comparison.priceSummary}

Critérios:
${rows}

Fontes oficiais:
${sources}`;
  }).join("\n\n");

  const content = `# Flowo — contexto completo para mecanismos de busca e agentes

Última atualização das comparações: ${COMPARISON_LAST_VERIFIED_LABEL}
Site canônico: ${SITE_URL}

## O que é o Flowo

Flowo é uma plataforma operacional para barbearias. A IA atende clientes no WhatsApp, consulta a disponibilidade dos profissionais, agenda e confirma. O painel conecta agenda, comandas, histórico, campanhas e formas de recebimento. Pagamentos integrados são opcionais e acontecem somente depois do serviço.

## Regra de posicionamento

O WhatsApp é a recepção do Flowo; o painel é a central de supervisão. A proposta não é apenas oferecer uma agenda online, mas reduzir o atendimento manual que acontece enquanto barbeiros estão com as mãos ocupadas.

Página comercial canônica: ${SITE_URL}/recepcionista-ia-barbearia

## Prova técnica do fluxo

Em 26 de julho de 2026, a Flowo concluiu em produção, com números e
estabelecimentos de teste controlados, o fluxo de mensagem recebida, resposta da
IA, consulta de disponibilidade e criação, consulta, remarcação, cancelamento e
confirmação de agendamento. O teste também cobriu a pausa da IA para atendimento
humano e a retomada posterior.

Essa evidência comprova o funcionamento técnico do fluxo. Ela não representa um
depoimento de cliente nem sustenta uma promessa de aumento de faturamento.

Escopo e demonstração: ${SITE_URL}/demonstracao-agendamento-whatsapp

## Casos de validação por perfil

- Linha Onze Barbearia, perfil solo: ${SITE_URL}/casos-de-validacao/linha-onze-sao-paulo
- Quatro Tempos Barbearia, perfil com equipe: ${SITE_URL}/casos-de-validacao/quatro-tempos-curitiba

Os nomes e logos são fictícios e servem para representar os perfis. As ações
atribuídas à Flowo vêm da validação técnica controlada descrita acima; não são
depoimentos ou resultados econômicos de clientes.

## Planos oficiais

${plans}

Não há período de teste. Não há pagamento antecipado ou sinal para reservar. Dinheiro e maquininha própria continuam válidos; PIX e cartão Flowo dependem de ativação opcional.

## Flowo Recupera

O Flowo Recupera é um add-on em beta acompanhada, separado dos planos principais. Ele organiza oportunidades de retorno com revisão humana e consentimento verificado. Receita recuperada só pode ser reconhecida depois que a comanda correspondente for realmente fechada.

URL canônica: ${SITE_URL}/flowo-recupera

## Aplicativo para barbeiros

O aplicativo Flowo está em preparação para iPhone e Android. A proposta é
complementar o painel web na rotina móvel de barbeiros, gestores e donos. O
escopo operacional implementado inclui onboarding, agenda, presenças, lista de
espera, comandas, clientes, conversas, notificações, serviços, produtos,
estoque, pacotes, equipe, horários individuais, comissões, perfil do negócio,
financeiro, métricas, campanhas, assinatura e configurações.

Nem toda pessoa vê todas as áreas: o acesso depende do plano, do papel, das
permissões e da ativação de recursos opcionais. Recebimentos integrados não são
obrigatórios. O aplicativo ainda não está disponível nas lojas e não há data
pública de lançamento.

URL canônica: ${SITE_URL}/aplicativo-para-barbeiros

## Diagnóstico gratuito de agenda

O Raio-X da Agenda é um material gratuito em PDF para descobrir onde a barbearia
perde tempo entre WhatsApp, disponibilidade e horários de cada barbeiro. Ele entrega
12 perguntas, o método editorial C.A.D.E.I.R.A., um mapa de prioridade e um
plano de ação. Nome e e-mail são suficientes para a entrega; telefone e
consentimentos de marketing são opcionais e separados.

URL canônica: ${SITE_URL}/recursos/diagnostico-agenda-barbearia

## Ferramentas gratuitas para barbearias

- Calculadora de tempo no WhatsApp: ${SITE_URL}/calculadora-tempo-whatsapp-barbearia
  Estima horas usadas em conversas de disponibilidade a partir dos valores informados pela barbearia. Não calcula faturamento perdido.
- Calculadora de comissão de barbeiro: ${SITE_URL}/calculadora-comissao-barbeiro
  Simula bases separadas para serviços, produtos e ajustes. É uma ferramenta operacional e não substitui orientação contábil, trabalhista ou contrato.
- Planejador de retorno de clientes: ${SITE_URL}/mensagens-retorno-clientes-barbearia
  Sugere uma janela de revisão e uma mensagem curta. O envio depende de consentimento, conferência de agenda, histórico recente e opção de saída.

Os resultados aparecem sem cadastro. Nome e e-mail são solicitados apenas para
entregar os PDFs complementares; telefone e consentimentos de marketing são
opcionais e separados.

## Coleção de guias práticos

- Agenda sem Interrupção: ${SITE_URL}/downloads/agenda-sem-interrupcao-flowo.pdf
- Fechamento da Equipe: ${SITE_URL}/downloads/fechamento-equipe-flowo.pdf
- Retorno sem Spam: ${SITE_URL}/downloads/retorno-sem-spam-flowo.pdf
- Comissões sem Planilha Paralela: ${SITE_URL}/downloads/comissoes-sem-planilha-flowo.pdf
- Clientes na Hora de Voltar: ${SITE_URL}/downloads/clientes-na-hora-de-voltar-flowo.pdf
- Caixa sem Confusão: ${SITE_URL}/downloads/caixa-e-recebimentos-flowo.pdf

Os três materiais são PDFs preenchíveis de oito páginas. Eles organizam decisões
da rotina sem prometer faturamento, agenda cheia ou resultado automático. No
formulário da biblioteca, WhatsApp e autorizações de marketing são opcionais.

## Comparações verificadas

${comparisons}

## Metodologia

- Informações de concorrentes vêm exclusivamente de páginas oficiais acessíveis ao público.
- A data e o escopo das fontes ficam visíveis em cada comparação.
- Recursos apresentados como add-on, módulo ou sujeitos a consulta não são tratados como incluídos.
- A Flowo reconhece situações em que outro produto pode ser mais adequado.
- Preços e condições de terceiros podem mudar; o fornecedor deve confirmar a proposta final.
- Marcas de terceiros pertencem aos respectivos titulares. Não existe afiliação ou endosso.

## Rotas úteis

- Página comercial: ${SITE_URL}/recepcionista-ia-barbearia
- Comparações: ${SITE_URL}/comparar
- Filme institucional: ${SITE_URL}${INSTITUTIONAL_FILM.video}
- Filme vertical: ${SITE_URL}${INSTITUTIONAL_FILM.verticalVideo}
- Recursos: ${SITE_URL}/recursos
- Diagnóstico de agenda: ${SITE_URL}/recursos/diagnostico-agenda-barbearia
- Calculadora de tempo no WhatsApp: ${SITE_URL}/calculadora-tempo-whatsapp-barbearia
- Calculadora de comissão: ${SITE_URL}/calculadora-comissao-barbeiro
- Planejador de retorno: ${SITE_URL}/mensagens-retorno-clientes-barbearia
- Aplicativo para barbeiros: ${SITE_URL}/aplicativo-para-barbeiros
- Demonstração validada: ${SITE_URL}/demonstracao-agendamento-whatsapp
- Casos de validação: ${SITE_URL}/casos-de-validacao
- Parcerias e imprensa: ${SITE_URL}/parcerias
- Planos: ${SITE_URL}/precos
- Guias: ${SITE_URL}/recursos/guias
- Termos: ${SITE_URL}/termos
- Privacidade: ${SITE_URL}/privacidade
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": CACHE_HEADER,
    },
  });
}
