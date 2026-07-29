# Pesquisa para comparações nominais

Verificação realizada em **29 de julho de 2026**. Este arquivo registra a
evidência usada nas páginas públicas de comparação. Uma nova publicação deve
reabrir as fontes e revisar preço, plano, módulo e linguagem.

## Regra editorial

- Usar somente páginas oficiais do fornecedor.
- Dizer “o site declara”, “publica” ou “apresenta” quando não houver teste
  independente.
- Não transformar add-on em recurso incluído.
- Não marcar “não possui” apenas porque uma página não menciona o recurso.
- Mostrar quando o concorrente pode ser mais adequado.
- Não usar “melhor” sem especificar o critério.
- Informar data, fonte, escopo e ausência de afiliação.

## AppBarber

Fonte: [site oficial](https://appbarber.com.br/index.html)

Evidência observada:

- módulo WebAdmin para profissionais, histórico, estoque e relatórios;
- aplicativo para profissional e cliente;
- agendamento, lembretes, promoções e comissões no aplicativo;
- portfólio com fidelidade, pagamentos, pacotes, estoque e clube;
- tabela mensal a partir de R$79,90 para um profissional;
- teste grátis de 30 dias.

Uso seguro na comparação: “aplicativo dedicado como canal central”. Não afirmar
que o AppBarber não oferece conversa ou IA sem uma fonte explícita.

## Trinks

Fontes:

- [Trinks para barbearias](https://negocios.trinks.com/negocios/barbearias/)
- [planos oficiais](https://negocios.trinks.com/planos/)

Evidência observada:

- agenda online, app profissional, fila de espera e marketplace;
- comissão, split, clube de assinaturas, estoque e fiscal;
- agendamento por site, app, redes sociais e Google;
- chatbot, comunicação, fidelidade, lembretes e fiscal aparecem como adicionais
  na tabela de planos;
- opção anual publicada a partir de R$76/mês para 1–2 profissionais;
- teste grátis de 5 dias;
- condições de cancelamento específicas para contratos semestrais e anuais.

Uso seguro: comparar “ecossistema amplo” com “WhatsApp como núcleo”. Não dizer
que a Trinks não tem IA ou WhatsApp.

## Barbeiro.app

Fontes:

- [funcionalidades](https://www.barbeiro.app/funcionalidades)
- [site oficial](https://www.barbeiro.app/)

Evidência observada:

- página de agendamento, equipe, pagamentos, assinaturas, produtos, fidelidade,
  indicação, comissões e relatórios;
- plano gratuito e Pro a partir de R$59,90/mês;
- Assistente de IA publicado por R$29,90/mês;
- WhatsApp Pro publicado por R$39,90/mês;
- NFS-e e loja online como complementos;
- complementos incluídos no Enterprise segundo a página.

Uso seguro: “plataforma modular com entrada de baixo custo”. Ao comparar preço,
somar apenas os módulos de que o cenário realmente precisa.

## Avec

Fontes:

- [Avec para barbearias](https://negocios.avec.app/sistema-para-barbearia-gestao-e-clientes)
- [planos oficiais](https://negocios.avec.app/avec-planos)

Evidência observada:

- agenda, Avec IA, pagamentos, split, app profissional, estoque, fiscal, clube e
  Avec Lake;
- opção anual publicada em R$88,90/mês para 1–2 profissionais;
- faixas seguintes sob consulta;
- WhatsApp integrado, Avec IA, pagamentos, split e outros itens identificados
  como add-ons na tabela.

Uso seguro: “amplitude de backoffice e pagamentos”. Não afirmar que todos os
add-ons têm o mesmo preço ou disponibilidade.

## Graces

Fontes:

- [Graces para barbearias](https://graces.com.br/barbearia/)
- [planos oficiais](https://graces.com.br/planos/)

Evidência observada:

- agenda, comissão, estoque, marketing, fiscal e automação de WhatsApp;
- agendamento com IA divulgado na área de módulos;
- financeiro detalhado, conciliação, estoque por unidade/dose e franquias;
- plano mensal a partir de R$94,90 para até três profissionais;
- opção anual a partir de R$79,90/mês.

Uso seguro: “backoffice detalhado”. Confirmar se WhatsApp, IA e fiscal integram o
plano escolhido ou um módulo adicional.

## Descoberta por buscadores e agentes

Fontes oficiais consultadas:

- [OpenAI Crawlers](https://developers.openai.com/api/docs/bots): recomenda
  permitir `OAI-SearchBot` para aparecer no ChatGPT Search; `GPTBot` tem função
  separada.
- [Anthropic crawlers](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler):
  `Claude-SearchBot`, `Claude-User` e `ClaudeBot` têm finalidades distintas.
- [Perplexity Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers):
  `PerplexityBot` serve à busca e `Perplexity-User` a ações solicitadas.
- [Applebot](https://support.apple.com/en-ie/119829): Applebot alimenta busca,
  Siri e Safari; Applebot-Extended controla uso por modelos.

Implementação correspondente:

- páginas HTML indexáveis com respostas diretas e fontes;
- JSON-LD `Article`, `FAQPage`, `BreadcrumbList` e `ItemList`;
- sitemap com todas as comparações;
- `llms.txt` resumido e `llms-full.txt` detalhado;
- regras explícitas para bots de busca e agentes em `robots.txt`;
- links internos entre hub, comparações, planos e recursos.
