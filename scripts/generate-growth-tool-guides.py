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
        "Confirme o escopo contratado antes de alterar a recepção."
    ),
    keywords=(
        "barbearia, WhatsApp, agenda, interrupção, escala, mensagens, Flowo"
    ),
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
        "Serviço e produto separados",
        "Desconto, estorno e adiantamento",
        "Aprovação antes do pagamento",
    ),
    test_title="Memória de cálculo do período",
    test_intro=(
        "Refaça a conta com comandas já fechadas. Registre a base usada, o "
        "percentual e cada ajuste antes de mostrar o total."
    ),
    disclaimer=(
        "Este material é operacional e não substitui contrato, folha, contador "
        "ou orientação trabalhista. Recursos do Flowo variam por plano."
    ),
    keywords=(
        "barbearia, comissão, barbeiro, fechamento, equipe, comanda, Flowo"
    ),
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
    framework_title="Uma mensagem que o cliente reconhece",
    framework_intro=(
        "O texto precisa dizer quem chamou, por que chamou e como sair. Nenhuma "
        "mensagem corrige uma lista sem consentimento."
    ),
    plan_title="Calendário de revisão",
    plan_intro=(
        "Planeje a revisão antes do envio. O intervalo é uma referência por "
        "serviço, nunca uma regra universal para toda a base."
    ),
    disclaimer=(
        "Respeite consentimento, pedidos de saída e legislação aplicável. Flowo "
        "Recupera é um add-on em beta acompanhada e possui escopo separado."
    ),
    keywords=(
        "barbearia, retorno, clientes, WhatsApp, consentimento, mensagens, Flowo"
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
