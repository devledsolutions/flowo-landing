#!/usr/bin/env python3
"""Generate the PDF companions for Flowo's interactive growth tools."""

from __future__ import annotations

import importlib.util
import sys
from dataclasses import replace
from pathlib import Path

from reportlab.lib.colors import HexColor


ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = ROOT / "scripts" / "generate-flowo-practical-guides.py"

spec = importlib.util.spec_from_file_location("flowo_practical_guides", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Não foi possível importar {BASE_SCRIPT}")
guides = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = guides
spec.loader.exec_module(guides)


TIME_GUIDE = replace(
    guides.GUIDES[0],
    slug="agenda-sem-interrupcao-flowo",
    collection_name="AGENDA SEM INTERRUPÇÃO",
    title="Agenda sem\ninterrupção",
    subtitle=(
        "Um plano de sete dias para mapear perguntas repetidas, organizar "
        "horários da equipe e testar uma recepção mais previsível."
    ),
    cover_label="ESCALA + REGRAS + KIT DE MENSAGENS",
    cover_items=(
        "Mapa das interrupções da semana",
        "Horários de cada barbeiro",
        "Regras de confirmação e encaixe",
        "Teste simples em sete dias",
    ),
    use_intro=(
        "Preencha este material durante uma semana comum. O objetivo não é "
        "contar toda mensagem, mas enxergar onde a recepção precisa de regra."
    ),
    use_steps=(
        ("01", "Observe", "Anote as perguntas que exigem abrir a agenda."),
        ("02", "Organize", "Registre dias, turnos, almoço e folgas por barbeiro."),
        ("03", "Combine", "Defina quando responder, confirmar ou chamar alguém."),
        ("04", "Teste", "Aplique uma mudança por sete dias e compare a rotina."),
    ),
    before_start=(
        "Tempo estimado não é faturamento perdido. Use os números para escolher "
        "uma mudança operacional, nunca para prometer resultado."
    ),
    audit_title="O que interrompe o atendimento?",
    audit_intro=(
        "Marque as situações que aconteceram na última semana. Ao lado, anote "
        "uma conversa real que represente o problema."
    ),
    audit_items=(
        ("Disponibilidade", "É preciso abrir outra tela para dizer se há horário."),
        ("Profissional", "A equipe pergunta no grupo quem pode atender."),
        ("Duração", "O tempo do serviço não está claro para quem responde."),
        ("Confirmação", "O horário fica reservado sem uma regra comum."),
        ("Remarcação", "Uma mudança exige refazer a busca desde o início."),
        ("Exceção", "Ninguém sabe quando a conversa deve ir para uma pessoa."),
    ),
    framework_title="A regra antes da resposta",
    framework_intro=(
        "Para cada pergunta repetida, escreva quatro respostas. Se uma delas "
        "depende da memória de alguém, existe um ponto para organizar."
    ),
    framework=(
        ("01", "Informação", "Qual dado a recepção precisa consultar?"),
        ("02", "Origem", "Onde esse dado fica registrado e atualizado?"),
        ("03", "Limite", "O que pode ser confirmado sem intervenção?"),
        ("04", "Responsável", "Quem assume quando o pedido sai da regra?"),
    ),
    worksheet_title="Escala que a recepção entende",
    worksheet_intro=(
        "Use uma linha por profissional e turno. Separe almoço, folga e bloqueio "
        "para não tratar presença como disponibilidade."
    ),
    worksheet_columns=(
        ("BARBEIRO", 102),
        ("DIA", 56),
        ("INÍCIO", 62),
        ("ALMOÇO", 73),
        ("FIM", 58),
        ("BLOQUEIO", 126),
    ),
    worksheet_note=(
        "Horário da barbearia não substitui o horário individual. Revise esta "
        "folha sempre que uma escala ou folga mudar."
    ),
    test_title="Kit de mensagens para adaptar",
    test_intro=(
        "Troque os campos entre colchetes e leia em voz alta. A mensagem deve "
        "ser curta, verdadeira e fácil de responder."
    ),
    scenarios=(
        "Disponibilidade: “Tenho [horários] com [barbeiro]. Qual funciona para você?”",
        "Alternativa: “Nesse horário ele não está disponível. Posso ver outra opção?”",
        "Confirmação: “Posso confirmar [serviço], [data] às [hora] com [barbeiro]?”",
        "Remarcação: “Tudo bem. Qual dia ou período fica melhor para consultar de novo?”",
        "Exceção: “Vou chamar alguém da equipe para conferir esse pedido com você.”",
        "Saída: “Se não quiser receber lembretes, é só avisar.”",
    ),
    plan_title="Teste em sete dias",
    plan_intro=(
        "Mude uma parte de cada vez. No fim, compare o mesmo tipo de pergunta e "
        "registre onde a equipe ainda precisou entrar."
    ),
    plan=(
        ("01", "Dia 1", "Conte perguntas de horário e escolha a mais repetida."),
        ("02", "Dia 2", "Preencha a escala individual dos profissionais."),
        ("03", "Dia 3", "Escreva a regra para a pergunta escolhida."),
        ("04", "Dias 4-5", "Use a mensagem e registre as exceções."),
        ("05", "Dia 6", "Revise respostas, atrasos e passagens para a equipe."),
        ("06", "Dia 7", "Decida o que manter, corrigir ou abandonar."),
        ("07", "Próximo ciclo", "Escolha somente a próxima pergunta repetida."),
    ),
    flowo_intro=(
        "Na Flowo, a recepção com IA pode consultar agenda, serviço e profissional "
        "dentro das regras configuradas pela barbearia."
    ),
    flowo_points=(
        "Cada profissional pode ter dias, turnos, almoço, folgas e bloqueios próprios.",
        "A conversa consulta a disponibilidade antes de oferecer um horário.",
        "Pedidos fora da regra podem ser passados para alguém da equipe.",
        "A equipe acompanha agenda e conversa no mesmo fluxo operacional.",
    ),
    disclaimer=(
        "Disponibilidade e automações variam por plano, configuração e implantação. "
        "Confirme o que você contratou antes de mudar a recepção."
    ),
    keywords=(
        "barbearia, WhatsApp, agenda, interrupção, escala, mensagens, Flowo"
    ),
    cta_path="/agenda-barbearia-whatsapp",
)

COMMISSION_GUIDE = replace(
    guides.GUIDES[0],
    slug="fechamento-equipe-flowo",
    collection_name="FECHAMENTO DA EQUIPE",
    title="Fechamento\nda equipe",
    subtitle=(
        "Política, memória de cálculo e checklist para conferir a comissão "
        "antes do pagamento."
    ),
    cover_label="POLÍTICA + CONFERÊNCIA + CHECKLIST",
    cover_items=(
        "Regra escrita e com vigência",
        "Percentual único por profissional",
        "Desconto, estorno e adiantamento",
        "Aprovação antes do pagamento",
    ),
    use_intro=(
        "Use esta folha no fechamento do período, depois de a política de comissão "
        "já estar combinada. Ela serve para conferir os números e registrar a aprovação."
    ),
    use_steps=(
        ("01", "Trave o período", "Defina a data e a hora de corte das comandas."),
        ("02", "Exporte os dados", "Reúna itens, descontos e estornos das comandas."),
        ("03", "Confira por pessoa", "Compare total, ajustes e memória de cálculo."),
        ("04", "Aprove", "Registre a diferença resolvida antes do pagamento."),
    ),
    before_start=(
        "Esta folha pressupõe uma política de comissão já aprovada. Para desenhar ou "
        "alterar regras, use o guia Comissões sem Planilha Paralela."
    ),
    audit_title="Fechamento pronto para conferência?",
    audit_intro=(
        "Antes de calcular, confirme os seis pontos abaixo. Se um deles estiver aberto, "
        "o total ainda não está pronto para aprovação."
    ),
    audit_items=(
        ("Período", "Todas as comandas pertencem ao intervalo informado."),
        ("Status", "Somente atendimentos concluídos e elegíveis entraram na base."),
        ("Base líquida", "Valores e descontos conferem com as comandas."),
        ("Atribuição", "Cada item elegível está ligado ao profissional correto."),
        ("Ajustes", "Estornos e adiantamentos têm motivo e responsável."),
        ("Vigência", "O percentual usado valia na data do atendimento."),
    ),
    framework_title="A memória de cálculo em uma linha",
    framework_intro=(
        "Cada total precisa ser explicado pelos mesmos campos. Evite somas soltas ou "
        "ajustes sem referência à comanda."
    ),
    framework=(
        ("01", "Base", "Total elegível depois dos descontos previstos na regra."),
        ("02", "Percentual", "Um único percentual vigente do profissional."),
        ("03", "Comissão bruta", "Base multiplicada pelo percentual."),
        ("04", "Ajustes", "Estorno, falta, adiantamento ou correção identificada."),
        ("05", "Total aprovado", "Valor final com data e responsável pela conferência."),
    ),
    worksheet_title="Folha de fechamento por profissional",
    worksheet_intro=(
        "Preencha uma linha por profissional e anexe a memória detalhada quando houver "
        "diferença ou ajuste manual."
    ),
    worksheet_columns=(
        ("PROFISSIONAL", 105),
        ("BASE", 80),
        ("COMISSÃO", 82),
        ("AJUSTES", 72),
        ("TOTAL", 72),
        ("APROVOU", 78),
    ),
    worksheet_note=(
        "Esta folha fecha um período. Guarde a política de comissão e a memória das "
        "comandas como documentos separados."
    ),
    test_title="Memória de cálculo do período",
    test_intro=(
        "Refaça a conta com comandas já fechadas. Registre a base usada, o "
        "percentual e cada ajuste antes de mostrar o total."
    ),
    scenarios=(
        "Comanda concluída dentro do período",
        "Atendimento com desconto previsto",
        "Item atribuído ao profissional correto",
        "Estorno lançado depois do atendimento",
        "Adiantamento descontado no período",
        "Diferença corrigida antes da aprovação",
    ),
    plan_title="Checklist de fechamento do mês",
    plan_intro=(
        "Siga a ordem para não pagar antes de a equipe ter acesso ao mesmo número e à "
        "mesma memória de cálculo."
    ),
    plan=(
        ("01", "Cortar o período", "Defina o último atendimento que entra no fechamento."),
        ("02", "Conferir pendências", "Resolva comandas abertas, estornos e descontos."),
        ("03", "Calcular", "Aplique o percentual vigente de cada profissional."),
        ("04", "Revisar", "Compare os totais por profissional e os ajustes."),
        ("05", "Compartilhar", "Entregue a memória antes do pagamento."),
        ("06", "Aprovar", "Registre responsável, data e diferença resolvida."),
        ("07", "Pagar", "Confirme o pagamento somente depois da aprovação."),
    ),
    flowo_intro=(
        "Na Flowo, comandas fechadas e regras configuradas podem compor a memória de "
        "comissão do período, conforme o plano contratado."
    ),
    flowo_points=(
        "Serviço, profissional e valor permanecem ligados à comanda.",
        "O percentual configurado fica associado ao profissional.",
        "A equipe autorizada revisa o fechamento antes do pagamento.",
        "Contrato e decisão trabalhista continuam sob responsabilidade da barbearia.",
    ),
    disclaimer=(
        "Este material é operacional e não substitui contrato, folha, contador "
        "ou orientação trabalhista. Recursos do Flowo variam por plano."
    ),
    keywords=(
        "barbearia, comissão, barbeiro, fechamento, equipe, comanda, Flowo"
    ),
    cover_prompt="Feche o período com base, percentual e ajustes rastreáveis.",
    how_to_title="Confira o mesmo período com toda a equipe.",
    framework_rule="Um total sem comanda, vigência e responsável não está pronto.",
)

RETURN_GUIDE = replace(
    guides.GUIDES[1],
    slug="retorno-sem-spam-flowo",
    collection_name="RETORNO SEM SPAM",
    title="Retorno\nsem spam",
    subtitle=(
        "Calendário, critérios de consentimento e mensagens para revisar antes "
        "de chamar qualquer lista."
    ),
    cover_label="CALENDÁRIO + CONSENTIMENTO + MENSAGENS",
    cover_items=(
        "Intervalo por tipo de serviço",
        "Filtro antes do contato",
        "Mensagem com contexto e saída",
        "Resultado medido até a comanda",
    ),
    use_intro=(
        "Defina uma cadência inicial por serviço, aprove uma versão da mensagem e "
        "decida quem pode receber. As faixas orientam a revisão, nunca o disparo automático."
    ),
    use_steps=(
        ("01", "Justifique", "Registre por que cada pessoa pode receber o contato."),
        ("02", "Exclua", "Retire agendados, atendimentos abertos e pedidos de saída."),
        ("03", "Revise", "Confira identidade, motivo, convite e opção de parar."),
        ("04", "Aprove", "Defina responsável, horário e tamanho do primeiro envio."),
    ),
    before_start=(
        "A mensagem não corrige uma lista sem origem ou consentimento. Na dúvida sobre "
        "a permissão de contato, não envie até a situação ser revisada."
    ),
    audit_title="O envio pode acontecer com segurança?",
    audit_intro=(
        "Marque só quando tiver o registro na mão. Um item em aberto interrompe o envio, "
        "mesmo que o texto esteja pronto."
    ),
    audit_items=(
        ("Origem", "A equipe sabe como o contato entrou na base."),
        ("Consentimento", "Existe permissão válida para o canal e a finalidade."),
        ("Saída", "Pedidos de SAIR já foram aplicados à lista."),
        ("Contexto", "A pessoa reconhece a barbearia e o motivo do contato."),
        ("Agenda", "Não existe horário futuro ou conversa humana aberta."),
        ("Responsável", "Alguém vai acompanhar resposta, falha e reclamação."),
    ),
    framework_title="Uma mensagem que o cliente reconhece",
    framework_intro=(
        "O texto precisa dizer quem chamou, por que chamou e como sair. Nenhuma "
        "mensagem corrige uma lista sem consentimento."
    ),
    framework=(
        ("01", "Quem fala", "Nome da barbearia, sem número ou remetente surpresa."),
        ("02", "Por que chamou", "Contexto reconhecível, sem urgência inventada."),
        ("03", "O que fazer", "Uma pergunta simples ou um próximo passo opcional."),
        ("04", "Como sair", "Instrução curta: responda SAIR para não receber."),
        ("05", "Quem acompanha", "Responsável por respostas e exceções."),
    ),
    worksheet_title="Ficha de aprovação da mensagem",
    worksheet_intro=(
        "Registre a versão e o texto aprovado. Mudou o público, a base ou o motivo? "
        "Crie outra versão antes de reutilizar a mensagem."
    ),
    worksheet_columns=(
        ("VERSÃO", 55),
        ("OBJETIVO", 65),
        ("PÚBLICO/BASE", 90),
        ("TEXTO APROVADO", 170),
        ("SAÍDA", 55),
        ("RESP./APROV.", 76),
    ),
    worksheet_note=(
        "Copie a mensagem integral no campo de texto ou registre um identificador "
        "inequívoco da versão arquivada. Não use lista comprada."
    ),
    test_title="Teste de leitura antes do envio",
    test_intro=(
        "Leia a mensagem como cliente e valide os cenários abaixo com um grupo interno "
        "antes de liberar a lista."
    ),
    scenarios=(
        "Cliente reconhece imediatamente a barbearia",
        "Cliente já tem um horário futuro",
        "Cliente responde SAIR",
        "Cliente pergunta por que recebeu",
        "Número está inválido ou pertence a outra pessoa",
        "Cliente pede atendimento humano",
    ),
    plan_title="Calendário-base por serviço",
    plan_intro=(
        "Use as faixas como ponto de partida editável. Preencha a última visita e a "
        "próxima revisão; histórico e consentimento sempre prevalecem."
    ),
    plan=(
        ("01", "Corte curto · 21–35 d", "Última visita: ____  Próxima revisão: ____"),
        ("02", "Barba · 7–21 d", "Última visita: ____  Próxima revisão: ____"),
        ("03", "Corte + barba · 21–35 d", "Última visita: ____  Próxima revisão: ____"),
        ("04", "Acabamento · 14–28 d", "Última visita: ____  Próxima revisão: ____"),
        ("05", "Tratamento", "Use a orientação técnica. Próxima revisão: ____"),
        ("06", "Hábito individual", "Use o histórico do cliente. Revisar em: ____"),
        ("07", "Antes do envio", "Revalidar consentimento, agenda, saída e contato recente."),
    ),
    flowo_intro=(
        "O Flowo Recupera, quando contratado, organiza oportunidades elegíveis para "
        "revisão contínua. Campanhas continuam sendo o caminho para ações pontuais."
    ),
    flowo_points=(
        "A oportunidade parte de retorno ou horário livre verificado.",
        "Consentimento, frequência, agenda e mensagem são revistos antes do envio.",
        "O responsável aprova a ação antes do contato proativo.",
        "O resultado acompanha agendamento, atendimento e comanda fechada.",
    ),
    disclaimer=(
        "Respeite consentimento, pedidos de saída e legislação aplicável. Flowo "
        "Recupera é um adicional opcional, não um plano separado."
    ),
    keywords=(
        "barbearia, retorno, clientes, WhatsApp, consentimento, mensagens, Flowo"
    ),
    cover_prompt="Defina intervalos e aprove cada mensagem antes do envio.",
    how_to_title="Monte a cadência a partir do serviço e da permissão.",
    framework_rule=(
        "Intervalo sugerido não substitui consentimento nem revisão humana."
    ),
)


GUIDE_SPECS = (
    (TIME_GUIDE, "#76B38A", "#2C6A43", "#E1F0E5"),
    (COMMISSION_GUIDE, "#D6A85F", "#7A5525", "#F4E8D3"),
    (RETURN_GUIDE, "#9AA977", "#4F6035", "#E8ECD9"),
)


def main() -> None:
    guides.base.ensure_fonts()
    for guide, accent, accent_dark, accent_pale in GUIDE_SPECS:
        guides.GREEN = HexColor(accent)
        guides.GREEN_DARK = HexColor(accent_dark)
        guides.GREEN_PALE = HexColor(accent_pale)
        print(guides.build_guide(guide))


if __name__ == "__main__":
    main()
