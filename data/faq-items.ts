import { FAQItem } from "@/types/faq"
import { getPlan, formatBRL } from "@/data/pricing-data"

const solo = getPlan("solo")
const equipe = getPlan("equipe")
const empresarial = getPlan("empresarial")

export const faqItems: FAQItem[] = [
  {
    question: "Como funciona o agendamento pelo WhatsApp?",
    answer: "Seu cliente manda uma mensagem no WhatsApp da barbearia pedindo pra marcar horário. A IA do Flowo responde automaticamente mostrando os horários disponíveis dos seus barbeiros, serviços e preços. Cliente escolhe e pronto: está agendado. Funciona 24/7, mesmo você dormindo.",
    category: "WhatsApp"
  },
  {
    question: "Como funciona o pagamento via PIX?",
    answer: "O Flowo cobra o atendimento por PIX ou cartão: o cliente recebe o link e paga sem precisar de dinheiro na mão. O pagamento é do atendimento, não uma condição para agendar. Contra faltas, o que trabalha é a confirmação automática pelo WhatsApp antes do horário.",
    category: "Pagamento"
  },
  {
    question: "O Flowo sincroniza com meu Google Calendar?",
    answer: "Sim! Sincroniza com Google Calendar, Apple Calendar e Microsoft Outlook. Quando um cliente agenda, o horário aparece automaticamente no seu calendário pessoal em segundos. Se você criar um compromisso no seu calendário, o Flowo também bloqueia o horário. Tudo em tempo real, sem conflitos.",
    category: "Calendário"
  },
  {
    question: "Quanto tempo leva para configurar o Flowo na minha barbearia?",
    answer: "Pouco tempo: você cadastra seus barbeiros, serviços (corte, barba, degradê, etc) e horários de funcionamento, conecta o WhatsApp e pronto. Nossa equipe acompanha o onboarding para garantir que tudo funcione desde o primeiro dia.",
    category: "Configuração"
  },
  {
    question: "Serve para barbeiro solo ou só para barbearias grandes?",
    answer: "Serve para os dois. O plano Solo é para quem trabalha sozinho e quer a agenda simples, com a IA atendendo no WhatsApp. Nos planos Equipe e Empresarial, o sistema organiza vários barbeiros, distribui os clientes entre eles e comporta mais de uma unidade.",
    category: "Planos"
  },
  {
    question: "Quanto custa o Flowo?",
    answer: `São três planos: Solo por ${formatBRL(solo.monthly)}/mês, Equipe por ${formatBRL(equipe.monthly)}/mês e Empresarial por ${formatBRL(empresarial.monthly)}/mês. No plano anual você leva 2 meses grátis (o Solo, por exemplo, sai por ${formatBRL(solo.annualTotal)}/ano). Sem taxa de instalação e sem fidelidade.`,
    category: "Planos"
  },
  {
    question: "Tem período de teste grátis?",
    answer: "Não. O Flowo é uma assinatura paga desde o primeiro dia, sem período de teste. Você contrata o plano, configura com a ajuda do nosso time e começa a usar no mesmo dia. E como não tem fidelidade, você pode cancelar quando quiser.",
    category: "Assinatura"
  },
  {
    question: "Como os lembretes reduzem as faltas?",
    answer: "O sistema manda lembrete automático 24h antes e 2h antes do horário marcado, direto no WhatsApp do cliente. O cliente pode confirmar, remarcar ou cancelar respondendo a mensagem. Se não responder, o sistema pode liberar o horário automaticamente.",
    category: "Lembretes"
  },
  {
    question: "Preciso trocar meu número de WhatsApp?",
    answer: "Não! O Flowo funciona com o número de WhatsApp que você já usa na barbearia. Seus clientes continuam mandando mensagem no mesmo número de sempre. A diferença é que agora a IA responde automaticamente.",
    category: "WhatsApp"
  },
  {
    question: "Consigo gerenciar vários barbeiros na mesma agenda?",
    answer: "Sim! Você cadastra cada barbeiro com seus horários, serviços e especialidades. Quando o cliente agenda, o sistema mostra os horários de quem está disponível. Cada profissional pode ter preços diferentes e a agenda individual sincroniza com o calendário pessoal dele.",
    category: "Equipe"
  },
  {
    question: "Posso integrar o Flowo com outros sistemas?",
    answer: "O Flowo sincroniza a agenda com Google Calendar, Apple Calendar e Microsoft Outlook em tempo real, e os pagamentos por PIX e cartão já são integrados ao sistema. Precisa de outra integração? Fale com a gente e contamos o que já está no plano da sua barbearia.",
    category: "Integrações"
  },
  {
    question: "O sistema guarda histórico dos clientes?",
    answer: "Sim. Cada vez que um cliente vem, o sistema registra: que serviço fez, quanto tempo levou, preferências, se chegou no horário, etc. Na próxima vez que ele agendar, a IA já sabe do histórico dele e pode sugerir combos ou serviços complementares automaticamente.",
    category: "Clientes"
  },
  {
    question: "Como funciona a assinatura? Tem fidelidade?",
    answer: "A assinatura é mensal ou anual (no anual você leva 2 meses grátis) e começa a valer assim que você contrata. Não tem fidelidade: você pode cancelar quando quiser, sem multa, e usa o sistema até o fim do período já pago.",
    category: "Assinatura"
  },
  {
    question: "E se eu precisar de ajuda? Tem suporte?",
    answer: "Tem! Suporte via WhatsApp e email com resposta rápida. Além disso, você tem acesso a uma base de conhecimento com vídeos e guias passo a passo. No plano Empresarial, o atendimento é ainda mais próximo do time Flowo.",
    category: "Suporte"
  }
]
