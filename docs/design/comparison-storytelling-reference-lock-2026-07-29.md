# Reference lock — comparativos e narrativa de produto

Data: 29 de julho de 2026

## Brief

Página de comparação para donos de barbearias, em desktop e mobile.

- Objetivo: explicar por que o Flowo pode valer mais que um plano-base barato.
- Tom: profissional, confiante, claro e verificável.
- Objeção principal: concorrentes com preço de entrada menor ou backoffice mais amplo.
- Ideia central: a recepção conversa, a agenda decide e a equipe acompanha.
- Restrições: manter a linguagem visual Flowo (creme, tinta, Poppins e Lora),
  não criar métricas, notas ou superioridade sem evidência.

## Pesquisa Refero

### Referência principal

- [Attio — Precision Digital Toolkit](https://attio.com)
  - Preservar: hierarquia editorial, bordas finas, produto dentro de frames
    precisos, pouca cor e contraste entre narrativa humana e interface.
  - Adaptação Flowo: Lora permanece exclusiva para títulos editoriais já
    aprovados; Poppins continua em interface e texto funcional.

### Referências secundárias

- [Glassnode — Analytical Console on Dark Steel](https://glassnode.com)
  - Empréstimo limitado: gráficos tratados como evidência funcional em uma
    faixa escura; sem decoração ou pontuação subjetiva.
- [Ghost — Crisp Blueprint on White Canvas](https://ghost.org)
  - Empréstimo limitado: screenshots reais como prova principal, com um
    contraste forte entre página clara e demonstração do produto.
- [N26 — Teal and White Ledger](https://n26.com)
  - Empréstimo limitado: clareza institucional para explicar categorias,
    condições e ressalvas.
- [Tilda — Compare Plans](https://tilda.cc/pricing-compare/)
  - Padrão de tela: comparação tabular com linhas legíveis, hierarquia simples
    e decisão apoiada por conteúdo, não por ornamentação.
- [Sunsama — product landing](https://sunsama.com/)
  - Padrão de tela: screenshots grandes em frames de produto, matriz de
    comparação e ritmo amplo entre narrativa e prova.
- [Frame.io — Midnight control panel](https://frame.io)
  - Empréstimo limitado: um único momento escuro e cinematográfico para
    concentrar o filme do produto, com interface flutuante e baixa saturação.
- [Krea — Midnight terminal interface](https://krea.ai)
  - Empréstimo limitado: alto contraste, tipografia precisa e profundidade
    criada por camadas do produto, não por efeitos decorativos.
- [Glide — Engineering clarity on white canvas](https://www.glideapps.com)
  - Empréstimo limitado: vídeo como âncora explicativa e alternância clara
    entre seções claras de decisão e uma faixa escura de mídia.

## Referência de visualização

- Protótipo de fluxo produzido com o skill de visualização:
  [O fluxo operacional do Flowo](https://mdn.alipayobjects.com/one_clip/afts/img/SxntSbLKizUAAAAARfAAAAgAoEACAQFr/original)
- Uso: referência estrutural apenas. A versão de produção é code-native,
  responsiva, acessível e usa os tokens da marca.

## Lock de direção

**Direção principal:** instrumento editorial Flowo, com uma faixa de produto em
fundo tinta e evidências claras em frames de interface.

**Preservar:**

1. Canvas creme e tipografia tinta do site.
2. Poppins para função; Lora somente onde já existe papel editorial.
3. Bordas finas e sombras apenas nos screenshots do produto.
4. Screenshots e diagramas funcionais como mídia principal.
5. Leitura em blocos grandes, com ritmo de 64–96 px no desktop.

**Empréstimos limitados:**

1. Glassnode: dados e diagramas em uma faixa escura.
2. Ghost/Sunsama: frames amplos com a interface real como prova.

**Regras de papel:**

- Verde do WhatsApp fica somente dentro do mock da conversa.
- Cores de semáforo ficam somente nos controles da janela.
- Fundo tinta cria contraste narrativo; não representa estado de erro.
- O mapa de entrega é categórico. Tamanho ou posição não comunica pontuação.

**Mídia:**

- Code-native: fluxo operacional e mapa de entrega.
- Produto real: previews de conversa e agenda já alinhados ao aplicativo.
- Vídeo: master de 46 segundos em 16:9 e 9:16, com narração pt-BR, trilha
  original, legendas queimadas, faixa WebVTT e transcrição HTML. A composição
  usa os mesmos fluxos e condições comerciais presentes nas páginas.
- Player: controles nativos, `playsInline`, poster, carregamento por metadados
  e download explícito da versão vertical. Sem autoplay.

**Rejeitar:**

- Radar de notas, estrelas ou barras percentuais sem metodologia.
- Gradientes genéricos, ícones 3D e ilustração abstrata sem papel funcional.
- Tabela desktop comprimida no mobile.
- Afirmações “melhor”, “mais completo” ou “mais barato” sem escopo e fonte.

## Ledger de decisões

| Decisão | Fonte | Regra | Motivo |
| --- | --- | --- | --- |
| Faixa escura para explicar o sistema | Glassnode + tokens Flowo | Gráfico/produto em contraste, não página inteira | Dá gravidade sem abandonar a identidade |
| Diagrama conversa → agenda → confirmação | Brief + visualização de fluxo | Sequência factual, sem pontuação | Torna o diferencial compreensível em segundos |
| Previews reais de conversa e agenda | Ghost + Sunsama | Produto é a mídia principal | Sustenta a promessa com evidência visual |
| Mapa núcleo/opcional/assistido | N26 + especificação Flowo | Categorias explícitas | Evita confundir pagamento e fiscal com recursos obrigatórios |
| Cartões no mobile | Tilda + acessibilidade | Uma decisão por bloco | Evita tabela horizontal ilegível |
| Filme de 46 s nos pontos de maior intenção | Frame.io + Glide + brief | Player acessível, sem autoplay e com versão vertical | Torna o fluxo concreto sem pesar a primeira pintura |
| Trilha original e voz pt-BR | Direitos e acessibilidade | Sem mídia licenciada de terceiros; legenda e transcrição completas | Permite distribuição orgânica e reprodução sem áudio |

## Storyboard e arquivos de produção

1. 0–6 s — a equipe trabalha enquanto novas mensagens chegam.
2. 6–14 s — a IA atende e entende serviço e profissional.
3. 14–25 s — o cliente escolhe somente um horário válido.
4. 25–35 s — gestor e equipe acompanham a agenda individual.
5. 35–42 s — núcleo e adicionais opcionais ficam separados.
6. 42–46 s — assinatura Flowo e CTA.

Fontes de produção:

- `remotion/FlowoFilm.tsx`: composição responsiva horizontal e vertical.
- `public/videos/source/`: voz e trilha originais.
- `public/videos/flowo-institucional.vtt`: legendas para o player.
- `components/marketing/institutional-film.tsx`: player, transcrição e
  `VideoObject`.
