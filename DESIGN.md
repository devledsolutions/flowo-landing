# Flowo — sistema visual do site público

## Direção

“Barbearia Noir” é a direção visual aprovada: creme quente, tinta oliva quase
preta, tipografia editorial contida e o produto enquadrado como evidência. O
site deve parecer um software premium construído para uma operação real, não um
template de startup.

## Referências e papéis

- Fundação: linguagem vertical e confiança operacional da GlossGenius.
- Precisão: molduras de produto, bordas e hierarquia da Attio e Cal.com.
- Profundidade: enquadramento cinematográfico da Krea, limitado aos mockups.
- Fluxo de interesse: CTA único e confirmação inline da Copperx.

Essas referências orientam papéis, não cores ou componentes copiados.

## Tipografia

- Poppins: navegação, corpo, rótulos, controles e títulos funcionais.
- Lora: ênfase editorial curta em títulos grandes; nunca para corpo ou UI.
- Títulos: compactos, com largura controlada e sem quebra decorativa artificial.
- Corpo: entre 16 e 22 px conforme hierarquia, com linhas confortáveis e medida
  máxima de leitura.

## Cores

Os tokens canônicos vivem em `app/globals.css`.

- `--bg`: creme principal.
- `--surface`: branco quente para interfaces e campos.
- `--surface-2`: painel rebaixado.
- `--ink` / `--ink-strong`: texto, bordas de alta ênfase e CTAs.
- `--muted-ink` / `--faint-ink`: texto auxiliar, respeitando contraste.
- `--line`: divisores finos.
- `--success` / `--danger`: apenas estados semânticos.

Não adicionar cores de marca. As únicas exceções são cores reais dentro de
demonstrações de produto, controles de janela e estados semânticos.

## Formas e elevação

- Botões e CTAs principais: pílula completa.
- Cards, campos e molduras: 8–12 px de raio.
- Separação por superfície ou borda fina antes de sombra.
- Sombras apenas em molduras de produto e elementos que precisam parecer
  fisicamente acima do plano; sempre suaves e únicas.
- Evitar cards dentro de cards e múltiplos contornos competindo.

## Layout e ritmo

- Container máximo: 1200 px com gutter fluido.
- Seções: cadência curta, normal ou ampla; alternar conforme a narrativa.
- Desktop: grids assimétricos de texto + prova. Exceção: o hero da home é copy
  centrada sobre um palco de produto de largura total, na gramática do fora.so
  (decisão do fundador, 2026-09-02).
- Mobile: uma coluna, CTA primário visível cedo e ordem narrativa preservada.
- Mockups: janela ou dispositivo crível, com legenda clara quando for prévia.

## Componentes

- Navbar em cápsula, fixa, com navegação curta.
- CTA primário: fundo tinta, texto creme, no mínimo 44 px de altura.
- CTA secundário: texto ou contorno, sem competir com a ação principal.
- Campos: label persistente, ajuda breve, erro abaixo do campo e foco visível.
- Lista de interesse: um formulário curto; após sucesso, substituir o formulário
  por confirmação e próximo passo.
- FAQ: perguntas objetivas e respostas com condição explícita.

## Conteúdo e imagem

- Usar screenshots reais quando o recurso já existe.
- Para produto em desenvolvimento, usar prévia identificada e baseada nas rotas
  e telas reais do app.
- Não usar mockup genérico de loja, selo de download ou QR code antes de existir
  um destino público verificável.
- Fotografia, quando usada, deve mostrar trabalho e contexto real; nunca servir
  como preenchimento.

## Movimento

- Transições de estado: 150–250 ms, `ease-out`.
- Entrada de seção: 500–800 ms somente como melhoria progressiva.
- Sem autoplay nem movimento contínuo.
- Parallax só como profundidade de planos no hero, ligado ao scroll, apenas em
  desktop e desligado com redução de movimento. Decisão do fundador em
  2026-09-02, a partir da referência fora.so. Transform apenas, um rAF por
  evento de scroll.
- Com redução de movimento, todo conteúdo permanece visível e funcional.

## Rejeições explícitas

- gradientes ornamentais;
- blobs, glows ou ruído sem significado;
- palavra isolada em itálico apenas como adorno;
- badges repetidos;
- copy genérica como “revolucione seu negócio”;
- gráficos sem dados auditáveis;
- mockups que afirmem disponibilidade ou resultado inexistente.

