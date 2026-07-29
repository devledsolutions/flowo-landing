# Recursos e páginas comerciais — evidência de revisão

Data: 2026-07-29

## Referências e decisões

Referências pesquisadas no Refero antes da implementação:

- Square: clareza operacional, alto contraste e imagens de produto usadas como
  prova, não como decoração.
- time2book: páginas comerciais de software de agendamento com texto direto,
  interface realista e seções que alternam problema, produto e próxima ação.
- Jasper Prompt Library: navegação explícita entre tipos de conteúdo e entrada
  pelo problema que o visitante quer resolver.
- GlossGenius: contexto visual próprio para salões, com ritmo editorial e
  produto apresentado perto do benefício.
- Hashnode: hierarquia de biblioteca, metadados concisos e listas fáceis de
  percorrer.

Reference lock aplicado:

- preservar o sistema Flowo “Barbearia Noir”, preto e creme, Poppins, bordas
  leves e cadência existente;
- usar texto específico, prova de interface e navegação por intenção;
- manter cores saturadas restritas aos elementos que representam literalmente
  o WhatsApp dentro das demonstrações existentes;
- identificar nomes e números de demonstração como dados de exemplo;
- rejeitar palavra isolada em serif/itálico, gradientes decorativos, estatísticas
  sem fonte, depoimentos inventados e grades genéricas de benefícios.

## Escopo implementado

- `/recursos`
- `/recursos/guias`
- `/recursos/materiais`
- `/recursos/videos`
- `/sistema-agendamento-barbearia`
- `/agenda-barbearia-whatsapp`
- `/software-barbearia-com-pix`

## Evidência visual

Capturas feitas no Chrome com a implementação local:

- desktop: 1464 px de largura, uma captura por rota;
- mobile: 390 × 844 px, uma captura por rota;
- `walkthrough-desktop.mp4`: sequência curta das sete páginas em desktop.

Validação nas sete rotas:

- exatamente um `h1`;
- sem overflow horizontal em desktop ou mobile;
- sem links vazios;
- CTA de cadastro apontando diretamente para
  `https://barber.flowo.com.br/sign-up`;
- demonstrações do painel identificadas como dados de exemplo.
