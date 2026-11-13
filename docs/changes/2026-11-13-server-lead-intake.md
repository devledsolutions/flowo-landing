# Captura de leads pelo servidor

Os formulários enviam um identificador estável enquanto não recebem confirmação.
As rotas da landing conferem validação, limite por IP e anti-robô, acrescentam a
prova privada de servidor e encaminham o pedido ao backend. Erros do backend
são tratados antes de log/telemetria para remover a prova de servidor.

A confirmação encerra o identificador; somente passar 30 minutos não cria um
novo pedido. Recarregar a mesma aba preserva a tentativa quando o armazenamento
está disponível. Uma correção de contato ou de conteúdo é processada pelo backend
como pedido diferente, sem descartar a alteração.

Validação local: 264/264 testes, tipos e lint; gates de produto, marca e
consentimento, e build Next.js aprovados. A exportação local não revela os
valores privados de produção, então o gate completo do ambiente deve ser
comprovado no build hospedado. Nenhuma credencial foi sobrescrita.

Ordem de publicação: backend compatível, landing, backend final. O backend
precisa aceitar `serverSecret` e `submissionId` antes de esta versão receber
tráfego. A alteração não comprova entrega do SDR e não muda seu provedor.
