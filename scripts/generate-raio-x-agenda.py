#!/usr/bin/env python3
"""Generate the production Flowo Raio-X da Agenda workbook."""

from __future__ import annotations

import importlib.util
import shutil
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = ROOT / "scripts" / "generate-lead-magnet-mockups.py"
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "downloads"
PDF_PATH = OUTPUT_DIR / "raio-x-da-agenda-flowo.pdf"
PUBLIC_PATH = PUBLIC_DIR / "raio-x-da-agenda-flowo.pdf"

spec = importlib.util.spec_from_file_location("flowo_pdf_base", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Não foi possível importar {BASE_SCRIPT}")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

PAGE_W, PAGE_H = A4
M = 42
CONTENT_W = PAGE_W - 2 * M

INK = HexColor("#171810")
CREAM = HexColor("#F4F0E5")
PAPER = HexColor("#FFFDF8")
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#69685F")
LINE = HexColor("#D8D4C7")
GREEN = HexColor("#76B38A")
GREEN_DARK = HexColor("#2C6A43")
GREEN_PALE = HexColor("#E1F0E5")
RED_PALE = HexColor("#F7E7E2")


def page_bg(c: canvas.Canvas, color=PAPER) -> None:
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def page_footer(c: canvas.Canvas, page: int, dark: bool = False) -> None:
    color = base.rgb_with_alpha("#FFFFFF", 0.62) if dark else MUTED
    line = base.rgb_with_alpha("#FFFFFF", 0.18) if dark else LINE
    c.setStrokeColor(line)
    c.line(M, 30, PAGE_W - M, 30)
    c.setFillColor(color)
    c.setFont("PoppinsMedium", 6.5)
    c.drawString(M, 16, "FLOWO • RAIO-X DA AGENDA")
    c.drawRightString(PAGE_W - M, 16, f"{page:02d}")


def page_header(
    c: canvas.Canvas,
    section: str,
    title: str,
    intro: str,
    page: int,
    *,
    dark: bool = False,
    serif: bool = True,
) -> float:
    text = WHITE if dark else INK
    muted = base.rgb_with_alpha("#FFFFFF", 0.62) if dark else MUTED
    base.draw_logo(c, M, PAGE_H - 71, 66)
    c.setFillColor(muted)
    c.setFont("PoppinsSemiBold", 7)
    c.drawRightString(PAGE_W - M, PAGE_H - 54, section.upper())
    c.setFillColor(text)
    c.setFont("Lora" if serif else "PoppinsBold", 27)
    title_lines = base.wrap_text(title, "Lora" if serif else "PoppinsBold", 27, CONTENT_W)
    y = PAGE_H - 125
    for line in title_lines:
        c.drawString(M, y, line)
        y -= 34
    y = base.paragraph(
        c,
        intro,
        M,
        y - 5,
        440,
        "Poppins",
        8.5,
        12,
        muted,
    )
    page_footer(c, page, dark=dark)
    return y - 24


def writing_lines(
    c: canvas.Canvas,
    x: float,
    y: float,
    width: float,
    count: int,
    gap: float = 25,
    color=LINE,
) -> float:
    c.setStrokeColor(color)
    for _ in range(count):
        c.line(x, y, x + width, y)
        y -= gap
    return y


def checkbox(c: canvas.Canvas, x: float, y: float, size: float = 13) -> None:
    c.setStrokeColor(INK)
    c.setLineWidth(0.8)
    c.rect(x, y - size + 3, size, size, fill=0, stroke=1)


def cover(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 76)
    c.setFillColor(MUTED)
    c.setFont("PoppinsSemiBold", 7.2)
    c.drawString(M, PAGE_H - 112, "FLOWO • RAIO-X PARA BARBEARIAS")

    c.setFillColor(INK)
    c.rect(0, 478, PAGE_W, 250, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsBold", 43)
    c.drawString(M, 655, "RAIO-X")
    c.drawString(M, 606, "DA AGENDA")
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.66))
    c.setFont("PoppinsMedium", 9)
    c.drawString(M, 563, "12 SITUAÇÕES REAIS • 1 PRIMEIRO AJUSTE")

    c.setFillColor(GREEN)
    c.rect(PAGE_W - 138, 478, 138, 250, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 72)
    c.drawCentredString(PAGE_W - 69, 612, "12")
    c.setFont("PoppinsSemiBold", 7)
    c.drawCentredString(PAGE_W - 69, 577, "PERGUNTAS")

    base.paragraph(
        c,
        "Um material para descobrir onde sua barbearia perde tempo entre WhatsApp, agenda e horários de cada barbeiro.",
        M,
        428,
        440,
        "PoppinsSemiBold",
        12.5,
        18,
        INK,
    )

    c.setFillColor(CREAM)
    c.roundRect(M, 228, CONTENT_W, 130, 8, fill=1, stroke=0)
    base.label(c, "Kit Operação sem Interrupção", M + 18, 331)
    kit = [
        "Diagnóstico em 12 perguntas",
        "Escala de cada barbeiro",
        "Regras para confirmar, encaixar ou chamar a equipe",
        "Teste na prática e plano de 7 dias",
    ]
    y = 300
    for index, item in enumerate(kit, start=1):
        c.setFillColor(GREEN_PALE)
        c.circle(M + 26, y + 1, 9, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK)
        c.setFont("PoppinsBold", 6.4)
        c.drawCentredString(M + 26, y - 1, str(index))
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 7.8)
        c.drawString(M + 47, y - 1, item)
        y -= 25

    c.setFillColor(INK)
    c.roundRect(M, 76, CONTENT_W, 98, 8, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, 145, "SAÍDA ESPERADA")
    c.setFillColor(WHITE)
    c.setFont("Lora", 18)
    c.drawString(M + 18, 115, "1 prioridade. 1 responsável. 1 teste.")
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.62))
    c.setFont("Poppins", 6.8)
    c.drawString(M + 18, 93, "Sem promessa de faturamento ou resultado automático.")
    page_footer(c, 1)
    c.showPage()


def how_to_use(c: canvas.Canvas) -> None:
    page_bg(c, CREAM)
    y = page_header(
        c,
        "Como usar",
        "Faça o diagnóstico com a rotina real na mesa.",
        "Separe de 25 a 40 minutos. Convide quem responde o WhatsApp, atualiza a agenda ou organiza a equipe.",
        2,
    )

    steps = [
        ("01", "Marque", "Responda as 12 perguntas sem tentar parecer mais organizado do que hoje."),
        ("02", "Escolha", "Compare o que mais atrapalha com o que dá para mudar agora."),
        ("03", "Desenhe", "Registre escalas, regras e responsáveis com a equipe."),
        ("04", "Teste", "Simule os cenários prioritários antes de mudar a rotina real."),
    ]
    for number, title, body in steps:
        c.setFillColor(PAPER)
        c.roundRect(M, y - 63, CONTENT_W, 63, 7, fill=1, stroke=0)
        c.setFillColor(GREEN_PALE)
        c.circle(M + 28, y - 31, 12, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK)
        c.setFont("PoppinsBold", 6.7)
        c.drawCentredString(M + 28, y - 33, number)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 9)
        c.drawString(M + 58, y - 24, title)
        base.paragraph(c, body, M + 58, y - 42, 420, size=7.3, leading=10, color=MUTED)
        y -= 77

    c.setFillColor(INK)
    c.roundRect(M, 93, CONTENT_W, 106, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(M + 18, 169, "COMBINE ANTES DE COMEÇAR")
    base.paragraph(
        c,
        "Este material olha para a rotina, não para o desempenho de uma pessoa. Se uma regra está apenas na cabeça de alguém, marque como ponto de atenção.",
        M + 18,
        145,
        CONTENT_W - 36,
        size=8,
        leading=12,
        color=base.rgb_with_alpha("#FFFFFF", 0.76),
    )
    c.showPage()


DIAGNOSTIC = [
    ("Canal", "Uma mensagem fica sem resposta enquanto você está cortando ou atendendo outro cliente."),
    ("Agenda", "Quem responde precisa parar o que está fazendo para conferir se tem horário."),
    ("Duração", "Corte, barba e combo nem sempre ocupam na agenda o tempo que levam de verdade."),
    ("Equipe", "Cada barbeiro tem seus dias, turnos, almoço e folgas, mas isso não está registrado num só lugar."),
    ("Preferência", "O cliente pede o barbeiro de sempre e recebe opções sem considerar essa escolha."),
    ("Exceção", "Encaixe, atraso, falta ou bloqueio ainda são resolvidos no improviso."),
    ("Intervenção", "A equipe não combinou quando a conversa precisa passar para uma pessoa."),
    ("Registro", "O cliente confirma no WhatsApp, mas o horário não aparece certo na agenda."),
    ("Mudança", "O cliente remarca na conversa, mas o horário antigo continua reservado."),
    ("Confirmação", "Lembretes e confirmações só saem quando alguém lembra de enviar."),
    ("Responsável", "Quando dá errado, ninguém sabe quem deveria conferir e corrigir."),
    ("Ajuste", "Os casos que deram retrabalho não viram uma regra melhor para a próxima vez."),
]


def diagnostic_page(c: canvas.Canvas, page: int, start: int) -> None:
    page_bg(c, PAPER if page == 3 else CREAM)
    end = start + 6
    y = page_header(
        c,
        f"Diagnóstico • {start + 1:02d}-{end:02d}",
        "Marque o que acontece hoje.",
        "Considere as últimas duas semanas. Um caso recorrente já é suficiente para marcar.",
        page,
        serif=False,
    )
    for index, (category, prompt) in enumerate(DIAGNOSTIC[start:end], start=start + 1):
        c.setFillColor(CREAM if page == 3 else PAPER)
        c.roundRect(M, y - 68, CONTENT_W, 68, 6, fill=1, stroke=0)
        checkbox(c, M + 16, y - 23)
        c.setFillColor(MUTED)
        c.setFont("PoppinsSemiBold", 6.3)
        c.drawString(M + 45, y - 19, f"{index:02d} • {category.upper()}")
        base.paragraph(
            c,
            prompt,
            M + 45,
            y - 39,
            CONTENT_W - 65,
            "PoppinsMedium",
            7.6,
            10.5,
            INK,
            max_lines=2,
        )
        y -= 79
    c.showPage()


def priority_map(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    y = page_header(
        c,
        "Decisão",
        "Escolha o ponto que merece atenção primeiro.",
        "Quantidade de marcações não é nota. Prioridade combina impacto na rotina com o controle que você já possui.",
        5,
    )

    grid_x, grid_y, grid_w, grid_h = M + 48, 257, CONTENT_W - 48, 333
    c.setStrokeColor(INK)
    c.setLineWidth(1)
    c.rect(grid_x, grid_y, grid_w, grid_h, fill=0, stroke=1)
    c.line(grid_x + grid_w / 2, grid_y, grid_x + grid_w / 2, grid_y + grid_h)
    c.line(grid_x, grid_y + grid_h / 2, grid_x + grid_w, grid_y + grid_h / 2)
    cells = [
        (grid_x + 15, grid_y + grid_h - 28, "ALTO IMPACTO", "EXECUTAR"),
        (grid_x + grid_w / 2 + 15, grid_y + grid_h - 28, "ALTO IMPACTO", "PREPARAR"),
        (grid_x + 15, grid_y + grid_h / 2 - 28, "BAIXO IMPACTO", "SIMPLIFICAR"),
        (grid_x + grid_w / 2 + 15, grid_y + grid_h / 2 - 28, "BAIXO IMPACTO", "ADIAR"),
    ]
    for x, top, label, action in cells:
        c.setFillColor(MUTED)
        c.setFont("PoppinsMedium", 6)
        c.drawString(x, top, label)
        c.setFillColor(INK)
        c.setFont("PoppinsBold", 9.2)
        c.drawString(x, top - 19, action)
        writing_lines(c, x, top - 63, 168, 3, 35)

    c.saveState()
    c.translate(M + 20, grid_y + grid_h / 2)
    c.rotate(90)
    c.setFillColor(MUTED)
    c.setFont("PoppinsSemiBold", 6.5)
    c.drawCentredString(0, 0, "IMPACTO NA ROTINA")
    c.restoreState()
    c.setFillColor(MUTED)
    c.setFont("PoppinsSemiBold", 6.5)
    c.drawCentredString(grid_x + grid_w / 2, grid_y - 24, "CONTROLE PARA MUDAR")

    c.setFillColor(GREEN_PALE)
    c.roundRect(M, 76, CONTENT_W, 112, 7, fill=1, stroke=0)
    base.label(c, "Minha saída", M + 16, 160, GREEN_DARK)
    prompts = [
        ("Prioridade", 105),
        ("Responsável", 105),
        ("Teste na prática", 180),
    ]
    x = M + 16
    for title, width in prompts:
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 6.5)
        c.drawString(x, 134, title)
        c.setStrokeColor(GREEN_DARK)
        c.line(x, 102, x + width - 12, 102)
        x += width
    c.showPage()


def method_page(c: canvas.Canvas) -> None:
    page_bg(c, INK)
    y = page_header(
        c,
        "Método C.A.D.E.I.R.A.",
        "A conversa precisa conhecer a agenda.",
        "Use sete perguntas para sair do “tem horário?” até a confirmação, sem esconder quando alguém da equipe precisa entrar.",
        6,
        dark=True,
    )
    method = [
        ("C", "Canal", "Onde o pedido chega."),
        ("A", "Agenda", "Onde a disponibilidade nasce."),
        ("D", "Duração", "Quanto o serviço ocupa."),
        ("E", "Equipe", "Qual barbeiro pode atender."),
        ("I", "Intervenção", "Quando chamar a equipe."),
        ("R", "Registro", "Onde o horário fica salvo."),
        ("A", "Ajuste", "O que corrigir depois."),
    ]
    for index, (letter, title, body) in enumerate(method):
        fill = GREEN if index in {1, 3, 4} else base.rgb_with_alpha("#FFFFFF", 0.08)
        c.setFillColor(fill)
        c.roundRect(M, y - 48, CONTENT_W, 48, 6, fill=1, stroke=0)
        c.setFillColor(INK if index in {1, 3, 4} else WHITE)
        c.setFont("PoppinsBold", 11)
        c.drawCentredString(M + 27, y - 30, letter)
        c.setFont("PoppinsSemiBold", 8.3)
        c.drawString(M + 58, y - 22, title)
        c.setFillColor(
            INK if index in {1, 3, 4} else base.rgb_with_alpha("#FFFFFF", 0.62)
        )
        c.setFont("Poppins", 7)
        c.drawString(M + 165, y - 22, body)
        y -= 58
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.08))
    c.roundRect(M, 76, CONTENT_W, 70, 7, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 16, 119, "LEMBRETE")
    base.paragraph(
        c,
        "C.A.D.E.I.R.A. é um método editorial deste workbook. Não é uma tecnologia proprietária nem uma garantia de resultado.",
        M + 16,
        98,
        CONTENT_W - 32,
        size=7.2,
        leading=10,
        color=base.rgb_with_alpha("#FFFFFF", 0.68),
    )
    c.showPage()


def journey_page(c: canvas.Canvas) -> None:
    page_bg(c, CREAM)
    y = page_header(
        c,
        "Caminho do pedido",
        "Acompanhe a mensagem até o horário confirmado.",
        "Preencha uma linha para o pedido mais comum e outra para a situação que mais tira a equipe do atendimento.",
        7,
    )
    stages = [
        ("01", "Pedido", "O que o cliente diz?"),
        ("02", "Pedido", "Qual serviço e barbeiro?"),
        ("03", "Horário", "Quem está livre?"),
        ("04", "Resposta", "O que pode ser confirmado?"),
        ("05", "Equipe", "Quem entra se sair da regra?"),
    ]
    for number, title, question in stages:
        c.setFillColor(PAPER)
        c.roundRect(M, y - 73, CONTENT_W, 73, 7, fill=1, stroke=0)
        c.setFillColor(GREEN_PALE)
        c.circle(M + 26, y - 25, 10, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK)
        c.setFont("PoppinsBold", 6.3)
        c.drawCentredString(M + 26, y - 27, number)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 8.3)
        c.drawString(M + 49, y - 20, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 6.8)
        c.drawString(M + 170, y - 20, question)
        writing_lines(c, M + 49, y - 50, CONTENT_W - 68, 1, 20)
        y -= 84
    c.setFillColor(INK)
    c.roundRect(M, 78, CONTENT_W, 80, 7, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 16, 132, "CRITÉRIO DE CONCLUSÃO")
    base.paragraph(
        c,
        "A equipe consegue explicar por que aquele horário foi oferecido, qual regra foi usada e onde a confirmação ficou salva.",
        M + 16,
        109,
        CONTENT_W - 32,
        size=7.5,
        leading=10.5,
        color=base.rgb_with_alpha("#FFFFFF", 0.72),
    )
    c.showPage()


def schedules_page(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    y = page_header(
        c,
        "Equipe",
        "Cada barbeiro tem sua própria escala.",
        "Registre os horários reais. Use uma linha por profissional e indique almoço, folga ou bloqueio recorrente.",
        8,
    )
    cols = [
        ("Profissional", 104),
        ("Seg", 50),
        ("Ter", 50),
        ("Qua", 50),
        ("Qui", 50),
        ("Sex", 50),
        ("Sáb", 50),
    ]
    table_x = M
    c.setFillColor(INK)
    c.roundRect(table_x, y - 34, CONTENT_W, 34, 6, fill=1, stroke=0)
    x = table_x
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 6.2)
    for title, width in cols:
        c.drawString(x + 7, y - 21, title.upper())
        x += width
    y -= 34
    for row in range(5):
        fill = CREAM if row % 2 == 0 else PAPER
        c.setFillColor(fill)
        c.rect(table_x, y - 57, CONTENT_W, 57, fill=1, stroke=0)
        x = table_x
        c.setStrokeColor(LINE)
        for _, width in cols:
            c.line(x + width, y, x + width, y - 57)
            x += width
        c.line(table_x, y - 57, table_x + CONTENT_W, y - 57)
        y -= 57

    c.setFillColor(CREAM)
    c.roundRect(M, 118, CONTENT_W, 150, 7, fill=1, stroke=0)
    base.label(c, "Decisões com a equipe", M + 16, 240)
    questions = [
        "Quem atualiza uma folga ou bloqueio?",
        "Qual intervalo mínimo precisa ser respeitado?",
        "Quando oferecer outro profissional?",
        "Quando transferir a conversa para alguém?",
    ]
    qy = 207
    for question in questions:
        checkbox(c, M + 16, qy + 4, 11)
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 7.1)
        c.drawString(M + 37, qy, question)
        c.setStrokeColor(LINE)
        c.line(M + 270, qy, PAGE_W - M - 16, qy)
        qy -= 29
    c.showPage()


def handoff_page(c: canvas.Canvas) -> None:
    page_bg(c, CREAM)
    y = page_header(
        c,
        "Regras da recepção",
        "Nem toda mensagem deve ser resolvida sozinha.",
        "Defina o que pode ser confirmado, o que precisa de autorização e o que sempre vai para alguém da equipe.",
        9,
    )
    columns = [
        ("Pode resolver", GREEN_PALE, GREEN_DARK),
        ("Precisa confirmar", PAPER, INK),
        ("Chamar uma pessoa", RED_PALE, INK),
    ]
    gap = 10
    width = (CONTENT_W - gap * 2) / 3
    x = M
    for title, fill, text_color in columns:
        c.setFillColor(fill)
        c.roundRect(x, 260, width, y - 260, 7, fill=1, stroke=0)
        c.setFillColor(text_color)
        c.setFont("PoppinsSemiBold", 7.3)
        c.drawString(x + 13, y - 24, title.upper())
        writing_lines(c, x + 13, y - 64, width - 26, 7, 42)
        x += width + gap

    c.setFillColor(INK)
    c.roundRect(M, 78, CONTENT_W, 118, 7, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 16, 167, "RESPONSABILIDADE")
    labels = ["Quem decide", "Onde avisar", "Tempo para responder"]
    x = M + 16
    widths = [145, 145, 160]
    for label, item_width in zip(labels, widths):
        c.setFillColor(WHITE)
        c.setFont("PoppinsMedium", 6.5)
        c.drawString(x, 140, label)
        c.setStrokeColor(base.rgb_with_alpha("#FFFFFF", 0.34))
        c.line(x, 105, x + item_width - 18, 105)
        x += item_width
    c.showPage()


def test_matrix(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    y = page_header(
        c,
        "Teste na prática",
        "Teste antes de confiar.",
        "Simule com dados de teste. Registre a resposta esperada, o que realmente aconteceu e quem aprovou.",
        10,
    )
    scenarios = [
        "Profissional preferido disponível",
        "Profissional preferido indisponível",
        "Serviços com durações diferentes",
        "Folga ou bloqueio individual",
        "Remarcação de horário existente",
        "Pedido fora da regra autorizada",
    ]
    columns = [("Cenário", 185), ("Esperado", 120), ("Obtido", 120), ("OK", 42)]
    c.setFillColor(INK)
    c.roundRect(M, y - 34, CONTENT_W, 34, 6, fill=1, stroke=0)
    x = M
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 6.2)
    for title, width in columns:
        c.drawString(x + 8, y - 21, title.upper())
        x += width
    y -= 34
    for index, scenario in enumerate(scenarios):
        c.setFillColor(CREAM if index % 2 == 0 else PAPER)
        c.rect(M, y - 60, CONTENT_W, 60, fill=1, stroke=0)
        x = M
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 6.8)
        base.paragraph(c, scenario, x + 8, y - 22, 165, size=6.8, leading=9, color=INK)
        c.setStrokeColor(LINE)
        for _, width in columns:
            c.line(x + width, y, x + width, y - 60)
            x += width
        checkbox(c, PAGE_W - M - 28, y - 21, 12)
        c.line(M, y - 60, PAGE_W - M, y - 60)
        y -= 60

    c.setFillColor(GREEN_PALE)
    c.roundRect(M, 82, CONTENT_W, 105, 7, fill=1, stroke=0)
    base.label(c, "Critério para avançar", M + 16, 158, GREEN_DARK)
    base.paragraph(
        c,
        "Os cenários prioritários funcionam como combinado, a equipe sabe assumir uma exceção e o resultado fica no lugar esperado.",
        M + 16,
        134,
        CONTENT_W - 32,
        "PoppinsMedium",
        7.6,
        11,
        INK,
    )
    c.showPage()


def action_plan(c: canvas.Canvas) -> None:
    page_bg(c, CREAM)
    y = page_header(
        c,
        "Plano de ação",
        "Uma decisão por dia.",
        "Sete dias organizam a execução. Eles não garantem resultado financeiro nem substituem a revisão da equipe.",
        11,
        serif=False,
    )
    days = [
        ("01", "Canal", "Liste onde os pedidos chegam."),
        ("02", "Agenda", "Defina a fonte de verdade."),
        ("03", "Equipe", "Registre a escala de cada barbeiro."),
        ("04", "Serviços", "Revise duração e regras."),
        ("05", "Exceções", "Defina quando alguém assume."),
        ("06", "Teste", "Simule os cenários prioritários."),
        ("07", "Revisão", "Escolha o próximo ajuste."),
    ]
    for day, title, task in days:
        c.setFillColor(PAPER)
        c.roundRect(M, y - 52, CONTENT_W, 52, 6, fill=1, stroke=0)
        c.setFillColor(GREEN if day in {"01", "06", "07"} else GREEN_PALE)
        c.circle(M + 25, y - 26, 10, fill=1, stroke=0)
        c.setFillColor(INK if day in {"01", "06", "07"} else GREEN_DARK)
        c.setFont("PoppinsBold", 6.2)
        c.drawCentredString(M + 25, y - 28, day)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 7.8)
        c.drawString(M + 48, y - 22, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 7)
        c.drawString(M + 145, y - 22, task)
        checkbox(c, PAGE_W - M - 28, y - 20, 11)
        y -= 62

    c.setFillColor(INK)
    c.roundRect(M, 78, CONTENT_W, 90, 7, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 16, 143, "PRÓXIMA REVISÃO")
    c.setStrokeColor(base.rgb_with_alpha("#FFFFFF", 0.36))
    c.line(M + 16, 108, M + 180, 108)
    c.line(M + 220, 108, PAGE_W - M - 16, 108)
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.58))
    c.setFont("Poppins", 6.2)
    c.drawString(M + 16, 92, "DATA")
    c.drawString(M + 220, 92, "RESPONSÁVEL")
    c.showPage()


def next_step(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 76)
    c.setFillColor(MUTED)
    c.setFont("PoppinsSemiBold", 7)
    c.drawRightString(PAGE_W - M, PAGE_H - 54, "PRÓXIMO PASSO")
    c.setFillColor(INK)
    c.setFont("Lora", 34)
    c.drawString(M, PAGE_H - 142, "A ferramenta só entra")
    c.drawString(M, PAGE_H - 182, "depois do Raio-X.")
    base.paragraph(
        c,
        "Se você para o corte para responder preço e horário, a Flowo pode assumir essa primeira conversa e consultar a agenda.",
        M,
        PAGE_H - 220,
        430,
        "PoppinsMedium",
        10,
        15,
        INK,
    )

    c.setFillColor(INK)
    c.roundRect(M, 343, CONTENT_W, 212, 8, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, 524, "COMO A FLOWO SE ENCAIXA")
    points = [
        "A IA atende no WhatsApp e consulta a agenda.",
        "Cada barbeiro pode ter seus próprios horários e folgas.",
        "A equipe acompanha e entra quando a conversa sair da regra.",
        "O horário acompanha o cliente até o fechamento da comanda.",
    ]
    y = 485
    for point in points:
        c.setFillColor(GREEN)
        c.circle(M + 23, y + 2, 4, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("PoppinsMedium", 8)
        c.drawString(M + 40, y - 1, point)
        y -= 36

    c.setFillColor(CREAM)
    c.roundRect(M, 192, CONTENT_W, 106, 8, fill=1, stroke=0)
    base.label(c, "Condições transparentes", M + 16, 270)
    base.paragraph(
        c,
        "Assinatura paga desde o primeiro dia, sem período de teste e sem fidelidade. Pagamentos integrados são opcionais e acontecem depois do atendimento.",
        M + 16,
        244,
        CONTENT_W - 32,
        "PoppinsMedium",
        7.7,
        11,
        INK,
    )

    c.setFillColor(GREEN)
    c.roundRect(M, 107, 248, 48, 24, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 7.5)
    c.drawCentredString(M + 124, 126, "VER A RECEPÇÃO COM IA")
    c.setFillColor(MUTED)
    c.setFont("Poppins", 7)
    c.drawString(M, 82, "flowo.com.br/recepcionista-ia-barbearia")
    page_footer(c, 12)
    c.showPage()


def build_pdf() -> Path:
    base.ensure_fonts()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(PDF_PATH), pagesize=A4, pageCompression=1)
    c.setTitle("Flowo - Raio-X da Agenda")
    c.setAuthor("Flowo")
    c.setSubject("Raio-X da agenda para barbearias")
    c.setKeywords(
        "barbearia, agenda, WhatsApp, horários, equipe, diagnóstico, Flowo"
    )
    cover(c)
    how_to_use(c)
    diagnostic_page(c, 3, 0)
    diagnostic_page(c, 4, 6)
    priority_map(c)
    method_page(c)
    journey_page(c)
    schedules_page(c)
    handoff_page(c)
    test_matrix(c)
    action_plan(c)
    next_step(c)
    c.save()
    shutil.copyfile(PDF_PATH, PUBLIC_PATH)
    return PDF_PATH


if __name__ == "__main__":
    print(build_pdf())
