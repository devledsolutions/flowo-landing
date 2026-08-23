import { FAQItem } from "@/types/faq"
import { getPlan, formatBRL } from "@/data/pricing-data"

const solo = getPlan("solo")
const equipe = getPlan("equipe")

export const faqItems: FAQItem[] = [
  {
    question: "Como funciona o agendamento pelo WhatsApp?",
    answer: "O cliente chama no WhatsApp da barbearia, explica o que precisa e a Flowo consulta a agenda antes de oferecer horários. O agendamento só é criado depois que o cliente escolhe e confirma. A equipe acompanha as conversas e pode assumir o atendimento quando necessário.",
    category: "WhatsApp"
  },
  {
    question: "Como funciona o pagamento via PIX?",
    answer: "PIX e cartão integrados são opcionais e usados somente depois do serviço. A barbearia também pode receber em dinheiro ou na própria maquininha e registrar a forma de pagamento na comanda. O Flowo nunca exige sinal ou pagamento para reservar.",
    category: "Pagamento"
  },
  {
    question: "O Flowo sincroniza com meu Google Calendar?",
    answer: "Nos planos Equipe e Empresarial, você pode conectar Google Calendar, Apple Calendar e Microsoft Outlook. O Google permite sincronização nos dois sentidos; Apple e Outlook recebem os compromissos criados ou alterados na Flowo.",
    category: "Calendário"
  },
  {
    question: "Quanto tempo leva para configurar o Flowo na minha barbearia?",
    answer: "A configuração inclui os dados da barbearia, serviços, profissionais, horários e a conexão do WhatsApp. Antes de ativar o atendimento, a equipe confere as regras e testa o fluxo com você. O tempo varia conforme o número de profissionais e a situação do WhatsApp.",
    category: "Configuração"
  },
  {
    question: "Serve para barbeiro solo ou só para barbearias grandes?",
    answer: "Serve para os dois. O Solo atende um profissional. O Equipe organiza até cinco profissionais em uma unidade, com horários individuais. O Empresarial é contratado com a equipe Flowo para operações maiores ou com várias unidades.",
    category: "Planos"
  },
  {
    question: "Quanto custa o Flowo?",
    answer: `São três planos: Solo por ${formatBRL(solo.monthly)}/mês, Equipe por ${formatBRL(equipe.monthly)}/mês e Empresarial sob consulta, com proposta e implantação acompanhadas. No plano anual você leva 2 meses grátis (o Solo, por exemplo, sai por ${formatBRL(solo.annualTotal)}/ano). Sem fidelidade.`,
    category: "Planos"
  },
  {
    question: "Tem período de teste grátis?",
    answer: "Não há teste automático no site. A equipe Flowo pode oferecer uma avaliação assistida de 14 dias a clientes elegíveis dos planos Solo ou Equipe. Ela é concedida manualmente, não exige cartão, não renova nem gera cobrança automática e começa depois da configuração.",
    category: "Assinatura"
  },
  {
    question: "Como os lembretes reduzem as faltas?",
    answer: "O sistema envia lembretes antes do horário, direto no WhatsApp do cliente. Ele pode confirmar ou cancelar respondendo à mensagem; nos planos Equipe e Empresarial, também pode pedir remarcação. A falta de resposta não cancela nem libera o horário automaticamente.",
    category: "Lembretes"
  },
  {
    question: "Preciso trocar meu número de WhatsApp?",
    answer: "A equipe verifica se o número que você já usa pode ser conectado mantendo sua rotina atual. Quando isso não for possível, as alternativas são explicadas antes da ativação. Seus clientes continuam falando com a barbearia pelo WhatsApp, sem instalar outro aplicativo.",
    category: "WhatsApp"
  },
  {
    question: "Consigo gerenciar vários barbeiros na mesma agenda?",
    answer: "Sim, nos planos Equipe e Empresarial. Cada profissional pode ter horários, folgas, serviços, duração e preços próprios. A Flowo consulta a disponibilidade correta antes de oferecer um horário. A conexão com calendários pessoais também está disponível nesses planos.",
    category: "Equipe"
  },
  {
    question: "Posso integrar o Flowo com outros sistemas?",
    answer: "Equipe e Empresarial podem conectar Google Calendar, Apple Calendar e Microsoft Outlook. Pagamentos integrados podem ser ativados separadamente; dinheiro e maquininha própria continuam válidos. Para outra integração, fale com a equipe e confirme o que está disponível para a sua operação.",
    category: "Integrações"
  },
  {
    question: "O sistema guarda histórico dos clientes?",
    answer: "Sim. O histórico reúne cadastro, atendimentos, serviços, observações e situação dos agendamentos. Isso ajuda a equipe a continuar o atendimento com contexto e consultar o que aconteceu antes, sem depender de anotações espalhadas.",
    category: "Clientes"
  },
  {
    question: "Como funciona a assinatura? Tem fidelidade?",
    answer: "A assinatura é mensal ou anual (no anual você leva 2 meses grátis) e começa a valer assim que você contrata. Não tem fidelidade: você pode cancelar quando quiser, sem multa, e usa o sistema até o fim do período já pago.",
    category: "Assinatura"
  },
  {
    question: "E se eu precisar de ajuda? Tem suporte?",
    answer: "Sim. O Solo inclui suporte por e-mail. O Equipe inclui e-mail e WhatsApp. O Empresarial inclui e-mail, WhatsApp e telefone, além de implantação acompanhada.",
    category: "Suporte"
  }
]

const homeFaqQuestions = new Set([
  "Como funciona o agendamento pelo WhatsApp?",
  "Como funciona o pagamento via PIX?",
  "Quanto tempo leva para configurar o Flowo na minha barbearia?",
  "Serve para barbeiro solo ou só para barbearias grandes?",
  "Quanto custa o Flowo?",
  "Tem período de teste grátis?",
  "Consigo gerenciar vários barbeiros na mesma agenda?",
  "E se eu precisar de ajuda? Tem suporte?",
])

/** Questions shown on the home page and mirrored in its FAQ structured data. */
export const homeFaqItems = faqItems.filter((item) =>
  homeFaqQuestions.has(item.question)
)
