#!/usr/bin/env python3
"""Generate review mockups for Flowo's lead-magnet PDF system."""

from __future__ import annotations

import math
import urllib.request
from pathlib import Path

from reportlab.graphics import renderPDF
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from svglib.svglib import svg2rlg


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf"
FONT_DIR = ROOT / "tmp" / "pdfs" / "fonts"
PDF_PATH = OUTPUT / "flowo-lead-magnets-mockups-v1.pdf"
LOGO_PATH = ROOT / "public" / "flowo-logo.svg"

PAGE_W, PAGE_H = A4
MARGIN = 42

INK = HexColor("#171810")
CREAM = HexColor("#F4F0E5")
PAPER = HexColor("#FFFDF8")
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#69685F")
LINE = HexColor("#D8D4C7")
GREEN = HexColor("#76B38A")
GREEN_DARK = HexColor("#2C6A43")
GREEN_PALE = HexColor("#E1F0E5")
STONE = HexColor("#E9E4D8")

FONT_URLS = {
    "Poppins": "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Regular.ttf",
    "PoppinsMedium": "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Medium.ttf",
    "PoppinsSemiBold": "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-SemiBold.ttf",
    "PoppinsBold": "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Bold.ttf",
    "Lora": "https://raw.githubusercontent.com/google/fonts/main/ofl/lora/Lora%5Bwght%5D.ttf",
}


def ensure_fonts() -> None:
    FONT_DIR.mkdir(parents=True, exist_ok=True)
    for name, url in FONT_URLS.items():
        path = FONT_DIR / f"{name}.ttf"
        if not path.exists():
            urllib.request.urlretrieve(url, path)
        pdfmetrics.registerFont(TTFont(name, path))


def rgb_with_alpha(hex_color: str, alpha: float) -> Color:
    color = HexColor(hex_color)
    return Color(color.red, color.green, color.blue, alpha=alpha)


def draw_logo(c: canvas.Canvas, x: float, y: float, width: float) -> None:
    drawing = svg2rlg(str(LOGO_PATH))
    if drawing is None:
        raise RuntimeError(f"Não foi possível carregar o logo oficial: {LOGO_PATH}")
    ratio = width / drawing.width
    drawing.width *= ratio
    drawing.height *= ratio
    drawing.scale(ratio, ratio)
    renderPDF.draw(drawing, c, x, y)


def wrap_text(
    text: str, font: str, size: float, max_width: float
) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def paragraph(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    max_width: float,
    font: str = "Poppins",
    size: float = 10,
    leading: float | None = None,
    color=INK,
    max_lines: int | None = None,
) -> float:
    leading = leading or size * 1.45
    lines = wrap_text(text, font, size, max_width)
    if max_lines is not None:
        lines = lines[:max_lines]
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def label(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    color=MUTED,
) -> None:
    c.setFillColor(color)
    c.setFont("PoppinsSemiBold", 7.5)
    c.drawString(x, y, text.upper())


def pill(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    fill=INK,
    text_color=WHITE,
) -> float:
    size = 7.2
    padding_x = 10
    width = pdfmetrics.stringWidth(text.upper(), "PoppinsSemiBold", size) + 2 * padding_x
    c.setFillColor(fill)
    c.roundRect(x, y - 5, width, 20, 10, fill=1, stroke=0)
    c.setFillColor(text_color)
    c.setFont("PoppinsSemiBold", size)
    c.drawString(x + padding_x, y + 1, text.upper())
    return width


def footer(c: canvas.Canvas, page_number: int, dark: bool = False) -> None:
    color = WHITE if dark else MUTED
    c.setStrokeColor(rgb_with_alpha("#FFFFFF", 0.22) if dark else LINE)
    c.line(MARGIN, 29, PAGE_W - MARGIN, 29)
    c.setFillColor(color)
    c.setFont("PoppinsMedium", 6.5)
    c.drawString(MARGIN, 15, "MOCKUP PARA APROVAÇÃO • NÃO É O MATERIAL FINAL")
    c.drawRightString(PAGE_W - MARGIN, 15, f"FLOWO • {page_number:02d}")


def page_cover(c: canvas.Canvas) -> None:
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_logo(c, MARGIN, PAGE_H - 80, 82)

    pill(c, "Playbook operacional", MARGIN, PAGE_H - 125, INK, WHITE)
    label(c, "Edição 01 • Agenda e atendimento", PAGE_W - 220, PAGE_H - 116)

    c.setFillColor(INK)
    c.setFont("Lora", 39)
    c.drawString(MARGIN, PAGE_H - 220, "Agenda sem")
    c.drawString(MARGIN, PAGE_H - 268, "interrupção.")

    paragraph(
        c,
        "Um playbook prático para organizar WhatsApp, equipe e horários sem copiar informação entre ferramentas.",
        MARGIN,
        PAGE_H - 310,
        320,
        "PoppinsMedium",
        12,
        18,
        INK,
    )

    c.setFillColor(STONE)
    c.roundRect(PAGE_W - 190, 175, 128, 425, 10, fill=1, stroke=0)
    c.setFillColor(PAPER)
    c.roundRect(PAGE_W - 210, 153, 128, 425, 10, fill=1, stroke=0)
    c.setStrokeColor(INK)
    c.setLineWidth(1.2)
    c.roundRect(PAGE_W - 210, 153, 128, 425, 10, fill=0, stroke=1)

    c.setFillColor(INK)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(PAGE_W - 193, 548, "MAPA DE OPERAÇÃO")
    c.setStrokeColor(LINE)
    c.line(PAGE_W - 193, 534, PAGE_W - 99, 534)

    nodes = [
        ("01", "ENTRADA", "Pedido chega"),
        ("02", "AGENDA", "Horário certo"),
        ("03", "EQUIPE", "Responsável"),
        ("04", "RETORNO", "Cliente avisado"),
    ]
    node_y = 498
    for number, title, note in nodes:
        c.setFillColor(GREEN_PALE if number in {"02", "03"} else CREAM)
        c.circle(PAGE_W - 176, node_y, 13, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK if number in {"02", "03"} else INK)
        c.setFont("PoppinsBold", 6.5)
        c.drawCentredString(PAGE_W - 176, node_y - 2, number)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 7)
        c.drawString(PAGE_W - 152, node_y + 3, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 6.4)
        c.drawString(PAGE_W - 152, node_y - 9, note)
        if number != "04":
            c.setStrokeColor(LINE)
            c.line(PAGE_W - 176, node_y - 15, PAGE_W - 176, node_y - 49)
        node_y -= 78

    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, 92, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsMedium", 8)
    c.drawString(MARGIN, 56, "PARA BARBEARIAS QUE QUEREM ORGANIZAR A OPERAÇÃO")
    c.setFont("Poppins", 7)
    c.setFillColor(rgb_with_alpha("#FFFFFF", 0.68))
    c.drawString(MARGIN, 40, "Sem fórmula mágica. Com critérios, checklists e decisões claras.")
    footer(c, 1, dark=True)
    c.showPage()


def page_contents(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_logo(c, MARGIN, PAGE_H - 72, 68)
    label(c, "Visão geral", MARGIN, PAGE_H - 113)
    c.setFillColor(INK)
    c.setFont("Lora", 30)
    c.drawString(MARGIN, PAGE_H - 155, "O que este playbook")
    c.drawString(MARGIN, PAGE_H - 192, "ajuda você a decidir.")
    paragraph(
        c,
        "O material começa pelo diagnóstico, organiza a rotina e termina em um plano aplicável — sem esconder a resposta atrás de um discurso de venda.",
        MARGIN,
        PAGE_H - 225,
        420,
        size=9.5,
        leading=14,
        color=MUTED,
    )

    modules = [
        ("01", "Diagnosticar o gargalo", "Identifique onde agenda, WhatsApp e equipe deixam de conversar."),
        ("02", "Definir a fonte de verdade", "Escolha onde cada informação nasce, muda e fica disponível."),
        ("03", "Organizar horários individuais", "Considere jornadas diferentes para cada profissional."),
        ("04", "Padronizar o atendimento", "Use mensagens úteis sem transformar o contato em robô."),
        ("05", "Medir e ajustar", "Acompanhe sinais operacionais antes de criar metas."),
    ]
    y = PAGE_H - 320
    for number, title, body in modules:
        c.setStrokeColor(LINE)
        c.line(MARGIN, y + 25, PAGE_W - MARGIN, y + 25)
        c.setFillColor(GREEN_PALE if number == "03" else CREAM)
        c.roundRect(MARGIN, y - 8, 38, 30, 6, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK if number == "03" else INK)
        c.setFont("PoppinsBold", 8)
        c.drawCentredString(MARGIN + 19, y + 2, number)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 10.5)
        c.drawString(MARGIN + 54, y + 8, title)
        paragraph(c, body, MARGIN + 54, y - 8, 390, size=7.6, leading=11, color=MUTED)
        y -= 78

    c.setFillColor(INK)
    c.roundRect(MARGIN, 72, PAGE_W - 2 * MARGIN, 70, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 9)
    c.drawString(MARGIN + 18, 116, "PRINCÍPIO EDITORIAL")
    paragraph(
        c,
        "Cada recomendação precisa apontar uma decisão ou uma ação. Nenhuma estatística entra sem fonte.",
        MARGIN + 18,
        96,
        PAGE_W - 2 * MARGIN - 36,
        size=8,
        leading=11,
        color=rgb_with_alpha("#FFFFFF", 0.76),
    )
    footer(c, 2)
    c.showPage()


def page_diagnostic(c: canvas.Canvas) -> None:
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_logo(c, MARGIN, PAGE_H - 72, 68)
    label(c, "Ferramenta 01 • Diagnóstico", MARGIN, PAGE_H - 113)
    c.setFillColor(INK)
    c.setFont("Lora", 29)
    c.drawString(MARGIN, PAGE_H - 155, "Onde a agenda")
    c.drawString(MARGIN, PAGE_H - 190, "perde fluidez?")
    paragraph(
        c,
        "Marque os pontos que acontecem hoje. O resultado não é uma nota de desempenho: é um mapa de prioridade.",
        MARGIN,
        PAGE_H - 220,
        365,
        size=9,
        leading=13,
        color=MUTED,
    )

    prompts = [
        "Mensagens interrompem um atendimento em andamento.",
        "Um horário muda, mas nem toda a equipe fica sabendo.",
        "Profissionais com jornadas diferentes são tratados como iguais.",
        "Confirmações dependem de alguém lembrar de enviar.",
        "O histórico do cliente fica espalhado entre conversas e anotações.",
        "Não existe um próximo passo claro para clientes que deixaram de voltar.",
    ]
    y = PAGE_H - 305
    for index, prompt in enumerate(prompts, 1):
        fill = PAPER if index % 2 else WHITE
        c.setFillColor(fill)
        c.roundRect(MARGIN, y - 38, PAGE_W - 2 * MARGIN, 54, 7, fill=1, stroke=0)
        c.setStrokeColor(INK)
        c.setLineWidth(1)
        c.rect(MARGIN + 15, y - 16, 13, 13, fill=0, stroke=1)
        c.setFillColor(MUTED)
        c.setFont("PoppinsMedium", 7)
        c.drawString(MARGIN + 40, y + 1, f"{index:02d}")
        paragraph(c, prompt, MARGIN + 68, y + 3, 390, size=8.2, leading=11, color=INK)
        y -= 66

    c.setFillColor(INK)
    c.roundRect(MARGIN, 67, PAGE_W - 2 * MARGIN, 92, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8.5)
    c.drawString(MARGIN + 18, 133, "LEITURA DO RESULTADO")
    bands = [
        ("0–2", "Base estável", "refine"),
        ("3–4", "Atrito recorrente", "priorize"),
        ("5–6", "Rotina fragmentada", "reorganize"),
    ]
    x = MARGIN + 18
    for score, title, action in bands:
        c.setFillColor(GREEN if score == "5–6" else rgb_with_alpha("#FFFFFF", 0.16))
        c.roundRect(x, 84, 142, 34, 5, fill=1, stroke=0)
        c.setFillColor(INK if score == "5–6" else WHITE)
        c.setFont("PoppinsBold", 7.5)
        c.drawString(x + 10, 102, score)
        c.setFont("PoppinsMedium", 6.8)
        c.drawString(x + 39, 102, title)
        c.setFont("Poppins", 6.2)
        c.drawString(x + 39, 91, action)
        x += 151
    footer(c, 3)
    c.showPage()


def page_action_plan(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_logo(c, MARGIN, PAGE_H - 72, 68)
    label(c, "Ferramenta 02 • Plano de ação", MARGIN, PAGE_H - 113)
    c.setFillColor(INK)
    c.setFont("Lora", 29)
    c.drawString(MARGIN, PAGE_H - 155, "Uma agenda, jornadas")
    c.drawString(MARGIN, PAGE_H - 190, "realmente individuais.")
    paragraph(
        c,
        "A barbearia define a operação. Cada profissional mantém seus próprios horários, intervalos e dias de trabalho dentro desse contexto.",
        MARGIN,
        PAGE_H - 220,
        430,
        size=9,
        leading=13,
        color=MUTED,
    )

    c.setFillColor(INK)
    c.roundRect(MARGIN, PAGE_H - 470, PAGE_W - 2 * MARGIN, 198, 9, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(MARGIN + 18, PAGE_H - 300, "QUADRO DE JORNADAS • EXEMPLO DE PREENCHIMENTO")

    cols = ["PROFISSIONAL", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"]
    widths = [120, 52, 52, 52, 52, 52, 52]
    rows = [
        ["Alex", "10–19", "10–19", "—", "12–21", "12–21", "09–17"],
        ["Bruno", "—", "09–18", "09–18", "09–18", "09–18", "08–16"],
        ["Caio", "13–21", "13–21", "13–21", "—", "10–19", "10–18"],
    ]
    table_x = MARGIN + 18
    table_y = PAGE_H - 338
    x = table_x
    c.setFont("PoppinsSemiBold", 6)
    c.setFillColor(rgb_with_alpha("#FFFFFF", 0.55))
    for title, width in zip(cols, widths):
        c.drawString(x + 5, table_y, title)
        x += width
    table_y -= 21
    for row_index, row in enumerate(rows):
        x = table_x
        c.setStrokeColor(rgb_with_alpha("#FFFFFF", 0.16))
        c.line(table_x, table_y + 14, table_x + sum(widths), table_y + 14)
        for cell_index, (cell, width) in enumerate(zip(row, widths)):
            if cell_index == 0:
                c.setFillColor(WHITE)
                c.setFont("PoppinsMedium", 7.5)
            elif cell == "—":
                c.setFillColor(rgb_with_alpha("#FFFFFF", 0.35))
                c.setFont("Poppins", 7)
            else:
                c.setFillColor(GREEN if (row_index + cell_index) % 3 == 0 else WHITE)
                c.setFont("PoppinsMedium", 7)
            c.drawString(x + 5, table_y, cell)
            x += width
        table_y -= 36

    steps = [
        ("01", "Mapeie", "jornadas reais"),
        ("02", "Configure", "cada profissional"),
        ("03", "Teste", "conflitos e pausas"),
        ("04", "Comunique", "a regra à equipe"),
        ("05", "Revise", "a primeira semana"),
    ]
    c.setFillColor(CREAM)
    c.roundRect(MARGIN, 100, PAGE_W - 2 * MARGIN, 210, 9, fill=1, stroke=0)
    label(c, "Sequência recomendada", MARGIN + 18, 282)
    y = 250
    for number, title, note in steps:
        c.setFillColor(GREEN_PALE if number == "03" else WHITE)
        c.circle(MARGIN + 30, y + 2, 13, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK if number == "03" else INK)
        c.setFont("PoppinsBold", 6.5)
        c.drawCentredString(MARGIN + 30, y, number)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 8.5)
        c.drawString(MARGIN + 54, y + 4, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 7.3)
        c.drawString(MARGIN + 124, y + 4, note)
        if number != "05":
            c.setStrokeColor(LINE)
            c.line(MARGIN + 30, y - 13, MARGIN + 30, y - 25)
        y -= 36
    footer(c, 4)
    c.showPage()


def mini_cover(
    c: canvas.Canvas,
    x: float,
    y: float,
    width: float,
    height: float,
    index: str,
    title_lines: list[str],
    subtitle: str,
    accent: str,
) -> None:
    c.setFillColor(STONE)
    c.roundRect(x + 7, y - 7, width, height, 7, fill=1, stroke=0)
    c.setFillColor(PAPER)
    c.roundRect(x, y, width, height, 7, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.roundRect(x, y, width, height, 7, fill=0, stroke=1)
    c.setFillColor(HexColor(accent))
    c.rect(x, y + height - 9, width, 9, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont("PoppinsSemiBold", 6.2)
    c.drawString(x + 14, y + height - 32, f"FLOWO • {index}")
    c.setFillColor(INK)
    c.setFont("Lora", 16)
    title_y = y + height - 72
    for line in title_lines:
        c.drawString(x + 14, title_y, line)
        title_y -= 21
    paragraph(
        c,
        subtitle,
        x + 14,
        title_y - 8,
        width - 28,
        size=6.8,
        leading=10,
        color=MUTED,
        max_lines=4,
    )
    c.setFillColor(INK)
    c.rect(x + 14, y + 18, width - 28, 1, fill=1, stroke=0)
    c.setFont("PoppinsMedium", 6.3)
    c.drawString(x + 14, y + 28, "FERRAMENTA PRÁTICA")


def page_collection(c: canvas.Canvas) -> None:
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_logo(c, MARGIN, PAGE_H - 72, 68)
    label(c, "Sistema editorial", MARGIN, PAGE_H - 113)
    c.setFillColor(INK)
    c.setFont("Lora", 29)
    c.drawString(MARGIN, PAGE_H - 155, "Uma coleção que resolve")
    c.drawString(MARGIN, PAGE_H - 190, "um problema por vez.")
    paragraph(
        c,
        "O playbook principal abre a conversa. Materiais menores aprofundam dores específicas e ajudam a qualificar o interesse do lead.",
        MARGIN,
        PAGE_H - 220,
        430,
        size=9,
        leading=13,
        color=MUTED,
    )

    cover_y = 310
    cover_w = 150
    cover_h = 250
    mini_cover(
        c,
        MARGIN,
        cover_y,
        cover_w,
        cover_h,
        "01",
        ["Diagnóstico", "da agenda"],
        "Scorecard para localizar atritos entre atendimento, equipe e horários.",
        "#171810",
    )
    mini_cover(
        c,
        MARGIN + 169,
        cover_y,
        cover_w,
        cover_h,
        "02",
        ["Comissões sem", "planilha paralela"],
        "Critérios, conferência e rotina para dar clareza à equipe.",
        "#76B38A",
    )
    mini_cover(
        c,
        MARGIN + 338,
        cover_y,
        cover_w,
        cover_h,
        "03",
        ["Reativação", "em 30 dias"],
        "Plano de contato responsável para clientes que deixaram de voltar.",
        "#B49E79",
    )

    c.setFillColor(INK)
    c.roundRect(MARGIN, 92, PAGE_W - 2 * MARGIN, 144, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8.5)
    c.drawString(MARGIN + 18, 208, "ORDEM DE PRODUÇÃO")
    order = [
        ("1", "Agenda sem interrupção", "ativo principal"),
        ("2", "Diagnóstico da agenda", "conversão rápida"),
        ("3", "Comissões sem planilha", "dor financeira"),
        ("4", "Reativação em 30 dias", "retenção"),
    ]
    y = 181
    for number, title, role in order:
        c.setFillColor(GREEN if number == "1" else rgb_with_alpha("#FFFFFF", 0.15))
        c.circle(MARGIN + 26, y + 1, 9, fill=1, stroke=0)
        c.setFillColor(INK if number == "1" else WHITE)
        c.setFont("PoppinsBold", 6.5)
        c.drawCentredString(MARGIN + 26, y - 1, number)
        c.setFillColor(WHITE)
        c.setFont("PoppinsMedium", 7.5)
        c.drawString(MARGIN + 44, y + 1, title)
        c.setFillColor(rgb_with_alpha("#FFFFFF", 0.58))
        c.setFont("Poppins", 6.8)
        c.drawRightString(PAGE_W - MARGIN - 18, y + 1, role)
        y -= 24
    footer(c, 5)
    c.showPage()


def flow_node(
    c: canvas.Canvas,
    x: float,
    y: float,
    width: float,
    title: str,
    body: str,
    fill,
    title_color=INK,
) -> None:
    c.setFillColor(fill)
    c.roundRect(x, y, width, 66, 7, fill=1, stroke=0)
    c.setFillColor(title_color)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(x + 12, y + 44, title)
    paragraph(
        c,
        body,
        x + 12,
        y + 27,
        width - 24,
        size=6.5,
        leading=9,
        color=title_color if title_color != WHITE else rgb_with_alpha("#FFFFFF", 0.72),
        max_lines=2,
    )


def draw_arrow(c: canvas.Canvas, x1: float, y1: float, x2: float, y2: float) -> None:
    c.setStrokeColor(MUTED)
    c.setFillColor(MUTED)
    c.setLineWidth(0.9)
    c.line(x1, y1, x2, y2)
    angle = math.atan2(y2 - y1, x2 - x1)
    arrow = 5
    for delta in (2.55, -2.55):
        c.line(
            x2,
            y2,
            x2 + arrow * math.cos(angle + delta),
            y2 + arrow * math.sin(angle + delta),
        )


def page_funnel(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_logo(c, MARGIN, PAGE_H - 72, 68)
    label(c, "Distribuição e automação", MARGIN, PAGE_H - 113)
    c.setFillColor(INK)
    c.setFont("Lora", 29)
    c.drawString(MARGIN, PAGE_H - 155, "O PDF é o começo")
    c.drawString(MARGIN, PAGE_H - 190, "de uma conversa útil.")
    paragraph(
        c,
        "Segment organiza o comportamento, Convex guarda o relacionamento, Resend entrega e nutre. SMSDev só entra com consentimento específico.",
        MARGIN,
        PAGE_H - 220,
        435,
        size=9,
        leading=13,
        color=MUTED,
    )

    node_w = 145
    flow_node(c, MARGIN, 490, node_w, "1 • DESCOBERTA", "SEO, anúncio ou conteúdo social", CREAM)
    flow_node(c, MARGIN + 174, 490, node_w, "2 • LANDING", "Contexto, prévia e formulário curto", GREEN_PALE, GREEN_DARK)
    flow_node(c, MARGIN + 348, 490, node_w, "3 • ENTREGA", "Download imediato + cópia por e-mail", INK, WHITE)
    draw_arrow(c, MARGIN + node_w + 7, 523, MARGIN + 166, 523)
    draw_arrow(c, MARGIN + 319 + 7, 523, MARGIN + 340, 523)

    c.setStrokeColor(LINE)
    c.line(PAGE_W / 2, 479, PAGE_W / 2, 446)

    flow_node(c, MARGIN, 350, node_w, "SEGMENT", "Eventos, origem e intenção", WHITE)
    flow_node(c, MARGIN + 174, 350, node_w, "CONVEX", "Lead, consentimentos e estágio", CREAM)
    flow_node(c, MARGIN + 348, 350, node_w, "RESEND", "Entrega e sequência editorial", GREEN_PALE, GREEN_DARK)
    draw_arrow(c, MARGIN + node_w + 7, 383, MARGIN + 166, 383)
    draw_arrow(c, MARGIN + 319 + 7, 383, MARGIN + 340, 383)

    c.setFillColor(CREAM)
    c.roundRect(MARGIN, 158, PAGE_W - 2 * MARGIN, 145, 8, fill=1, stroke=0)
    label(c, "Consentimento por finalidade", MARGIN + 18, 276)
    consent = [
        ("ENTREGA", "necessário para atender ao pedido", True),
        ("E-MAIL", "opcional para conteúdo e novidades", False),
        ("SMS", "opcional e separado do e-mail", False),
    ]
    y = 242
    for title, note, required in consent:
        c.setFillColor(GREEN_PALE if required else WHITE)
        c.roundRect(MARGIN + 18, y - 16, 132, 30, 5, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK if required else INK)
        c.setFont("PoppinsSemiBold", 7)
        c.drawString(MARGIN + 29, y - 2, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 7.2)
        c.drawString(MARGIN + 170, y - 2, note)
        c.setFont("PoppinsMedium", 6.5)
        c.drawRightString(
            PAGE_W - MARGIN - 18,
            y - 2,
            "PEDIDO" if required else "OPT-IN",
        )
        y -= 37

    c.setFillColor(INK)
    c.roundRect(MARGIN, 73, PAGE_W - 2 * MARGIN, 58, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(MARGIN + 18, 108, "REGRA DE CUSTO E VELOCIDADE")
    paragraph(
        c,
        "PDF estático na CDN; página de obrigado registra o clique. Sem anexo pesado e sem função de borda por download.",
        MARGIN + 18,
        91,
        PAGE_W - 2 * MARGIN - 36,
        size=7.2,
        leading=10,
        color=rgb_with_alpha("#FFFFFF", 0.72),
    )
    footer(c, 6)
    c.showPage()


def build_pdf() -> Path:
    ensure_fonts()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(PDF_PATH), pagesize=A4)
    c.setTitle("Flowo — Mockups do sistema de lead magnets v1")
    c.setAuthor("Flowo")
    c.setSubject("Direção visual e arquitetura de aquisição para materiais ricos")
    c.setKeywords("Flowo, barbearia, agenda, WhatsApp, lead magnet, marketing")
    page_cover(c)
    page_contents(c)
    page_diagnostic(c)
    page_action_plan(c)
    page_collection(c)
    page_funnel(c)
    c.save()
    return PDF_PATH


if __name__ == "__main__":
    print(build_pdf())
