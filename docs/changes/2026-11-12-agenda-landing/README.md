# Apresentação da Agenda na home

Base: 19846cff84a4d7272ad0ed033c605b2283a54821. A home apresenta primeiro a Agenda, depois a conversa no WhatsApp, a evidência de testes e os recebimentos opcionais. Retirada a tabela repetida de transição; as demais condições continuam nas seções de produto e preços. Os quatro módulos passam a uma lista mais curta.

## Imagens

- agenda-equipe-web-20261112.png: captura real do dashboard local em 1440×850, recortada na captura para mostrar a área de trabalho.
- agenda-equipe-app-20261112.png: recorte real do componente da Agenda no Android, feito pelo agent-device (975×1061). É identificado como detalhe do app, não como uma tela completa de telefone.
- Dados e nomes são fictícios, em ambiente QA local. Nenhuma imagem de interface foi gerada por IA. As capturas de marketing usam as iniciais dos profissionais. Não contêm sessão, ID de conta, telefone ou e-mail.
- Os ícones das seções alteradas usam um recorte documentado dos vetores originais Flowo.

## Verificação

- Typecheck e lint: sem erros.
- Build local com configuração de desenvolvimento explícita: passou; 26 suítes, 211 testes. O export de variáveis de produção omite valores sensíveis, por isso não é usado como substituto da prova de build hospedado.
- Chrome Profile 2: conferência em 1440 e 390 px; Agenda, WhatsApp, recebimentos e fechamento sem rolagem horizontal. Capturas anexas são locais, anteriores ao merge.
- Preços, limites dos planos, trial, consentimento, formulários e integrações não mudaram. Product contract e brand check passaram.

O build e a publicação em produção são verificados à parte. Não foi enviado formulário nem mensagem.
