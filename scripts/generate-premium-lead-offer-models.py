#!/usr/bin/env python3
"""Generate three reference-locked PDF directions for Flowo lead offers."""

from __future__ import annotations

import importlib.util
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = ROOT / "scripts" / "generate-lead-magnet-mockups.py"
OUTPUT = ROOT / "output" / "pdf"
PDF_PATH = OUTPUT / "flowo-premium-lead-offer-models-v2.pdf"
PAGE_W, PAGE_H = A4
M = 42

spec = importlib.util.spec_from_file_location("flowo_pdf_base", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Não foi possível importar {BASE_SCRIPT}")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

INK = HexColor("#171810")
CREAM = HexColor("#F4F0E5")
PAPER = HexColor("#FFFDF8")
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#69685F")
LINE = HexColor("#D8D4C7")
GREEN = HexColor("#76B38A")
GREEN_DARK = HexColor("#2C6A43")
GREEN_PALE = HexColor("#E1F0E5")
SAND = HexColor("#B49E79")
ORANGE = HexColor("#E1A25E")


def page_bg(c: canvas.Canvas, color) -> None:
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def footer(c: canvas.Canvas, page: int, dark: bool = False, model: str = "") -> None:
    color = WHITE if dark else MUTED
    c.setStrokeColor(base.rgb_with_alpha("#FFFFFF", 0.22) if dark else LINE)
    c.line(M, 29, PAGE_W - M, 29)
    c.setFillColor(color)
    c.setFont("PoppinsMedium", 6.5)
    c.drawString(M, 15, f"MODELO {model} • DIREÇÃO PARA APROVAÇÃO")
    c.drawRightString(PAGE_W - M, 15, f"FLOWO • {page:02d}")


def logo_on_dark(c: canvas.Canvas, x: float, y: float, width: float = 78) -> None:
    c.setFillColor(CREAM)
    c.roundRect(x, y - 4, width + 24, 37, 8, fill=1, stroke=0)
    base.draw_logo(c, x + 12, y + 3, width)


def chapter_label(c: canvas.Canvas, text: str, y: float, dark: bool = False) -> None:
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.65) if dark else MUTED)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M, y, text.upper())


def review_cover(c: canvas.Canvas) -> None:
    page_bg(c, CREAM)
    base.draw_logo(c, M, PAGE_H - 75, 82)
    base.pill(c, "Direção comercial + editorial", M, PAGE_H - 122, INK, WHITE)
    c.setFillColor(INK)
    c.setFont("Lora", 35)
    c.drawString(M, PAGE_H - 205, "Três modelos.")
    c.drawString(M, PAGE_H - 247, "Uma oferta coerente.")
    base.paragraph(
        c,
        "Modelos profissionais para transformar diagnóstico, conteúdo e implantação em uma jornada de aquisição útil — sem promessas inventadas.",
        M,
        PAGE_H - 285,
        390,
        "PoppinsMedium",
        10.5,
        16,
        INK,
    )

    models = [
        ("A", "Raio-X da Agenda", "Diagnóstico tático", INK, WHITE),
        ("B", "Agenda sem Interrupção", "Playbook editorial", GREEN, INK),
        ("C", "Desafio Operação em 7 Dias", "Execução guiada", ORANGE, INK),
    ]
    y = 395
    for code, title, role, fill, text_color in models:
        c.setFillColor(fill)
        c.roundRect(M, y, PAGE_W - 2 * M, 84, 8, fill=1, stroke=0)
        c.setFillColor(text_color)
        c.setFont("PoppinsBold", 24)
        c.drawString(M + 18, y + 31, code)
        c.setFont("PoppinsSemiBold", 10)
        c.drawString(M + 68, y + 47, title)
        c.setFont("Poppins", 7.5)
        c.drawString(M + 68, y + 27, role)
        y -= 100

    c.setFillColor(INK)
    c.roundRect(M, 75, PAGE_W - 2 * M, 78, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8.5)
    c.drawString(M + 18, 124, "RECOMENDAÇÃO")
    base.paragraph(
        c,
        "A captura começa pelo Modelo A, a nutrição aprofunda com o Modelo B e o Modelo C é testado como campanha de execução.",
        M + 18,
        104,
        PAGE_W - 2 * M - 36,
        size=7.5,
        leading=10.5,
        color=base.rgb_with_alpha("#FFFFFF", 0.75),
    )
    footer(c, 1, model="SISTEMA")
    c.showPage()


def model_a_cover(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 72)
    chapter_label(c, "Modelo A • Diagnóstico tático", PAGE_H - 118)

    c.setFillColor(INK)
    c.rect(0, 500, PAGE_W, 235, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsBold", 42)
    c.drawString(M, 668, "RAIO-X")
    c.drawString(M, 621, "DA AGENDA")
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.68))
    c.setFont("PoppinsMedium", 9)
    c.drawString(M, 582, "12 PONTOS DE ATRITO • 1 MAPA DE PRIORIDADE")

    c.setFillColor(GREEN)
    c.rect(PAGE_W - 128, 500, 128, 235, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 70)
    c.drawCentredString(PAGE_W - 64, 620, "12")
    c.setFont("PoppinsSemiBold", 7)
    c.drawCentredString(PAGE_W - 64, 586, "PERGUNTAS")

    base.paragraph(
        c,
        "Descubra onde WhatsApp, horários e equipe deixam de conversar — antes de escolher uma ferramenta.",
        M,
        438,
        400,
        "PoppinsSemiBold",
        13,
        19,
        INK,
    )

    labels = [
        ("CANAL", "onde o pedido chega"),
        ("AGENDA", "onde a resposta nasce"),
        ("EQUIPE", "quem pode atender"),
        ("REGISTRO", "onde o resultado fica"),
    ]
    y = 310
    for title, note in labels:
        c.setStrokeColor(LINE)
        c.line(M, y + 20, PAGE_W - M, y + 20)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 8)
        c.drawString(M, y, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 8)
        c.drawString(M + 105, y, note)
        y -= 48

    c.setFillColor(CREAM)
    c.roundRect(M, 72, PAGE_W - 2 * M, 62, 6, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont("PoppinsMedium", 7)
    c.drawString(M + 16, 106, "MATERIAL SEM COBRANÇA • DOWNLOAD IMEDIATO")
    c.setFillColor(INK)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(M + 16, 88, "Marketing por e-mail e SMS são escolhas separadas.")
    footer(c, 2, model="A")
    c.showPage()


def model_a_score(c: canvas.Canvas) -> None:
    page_bg(c, CREAM)
    base.draw_logo(c, M, PAGE_H - 72, 68)
    chapter_label(c, "Raio-X • Folha 01", PAGE_H - 116)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 27)
    c.drawString(M, PAGE_H - 160, "MARQUE O QUE")
    c.drawString(M, PAGE_H - 192, "ACONTECE HOJE.")
    base.paragraph(
        c,
        "Não é uma nota de desempenho. É um mapa para decidir o que organizar primeiro.",
        M,
        PAGE_H - 220,
        390,
        size=8.5,
        leading=12,
        color=MUTED,
    )

    prompts = [
        ("01", "Uma mensagem interrompe um atendimento em andamento."),
        ("02", "A equipe precisa perguntar quem está disponível."),
        ("03", "Jornadas individuais não aparecem na agenda."),
        ("04", "Confirmações dependem de alguém lembrar."),
        ("05", "Exceções não têm responsável definido."),
        ("06", "O resultado fica espalhado em mais de um lugar."),
    ]
    y = 522
    for number, prompt in prompts:
        c.setFillColor(PAPER)
        c.roundRect(M, y, PAGE_W - 2 * M, 60, 5, fill=1, stroke=0)
        c.setStrokeColor(INK)
        c.rect(M + 14, y + 22, 15, 15, fill=0, stroke=1)
        c.setFillColor(MUTED)
        c.setFont("PoppinsSemiBold", 6.8)
        c.drawString(M + 46, y + 29, number)
        base.paragraph(c, prompt, M + 82, y + 31, 385, size=8.2, leading=11, color=INK)
        y -= 72

    c.setFillColor(INK)
    c.roundRect(M, 72, PAGE_W - 2 * M, 90, 7, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(M + 16, 133, "PRÓXIMA DECISÃO")
    base.paragraph(
        c,
        "Escolha um ponto marcado e defina fonte de verdade, responsável e teste de aceite.",
        M + 16,
        111,
        410,
        size=8,
        leading=11,
        color=base.rgb_with_alpha("#FFFFFF", 0.76),
    )
    footer(c, 3, model="A")
    c.showPage()


def model_a_priority(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 68)
    chapter_label(c, "Raio-X • Folha 02", PAGE_H - 116)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 27)
    c.drawString(M, PAGE_H - 160, "MAPA DE PRIORIDADE")
    base.paragraph(
        c,
        "Organize pelo impacto na rotina e pelo controle que a barbearia já possui.",
        M,
        PAGE_H - 190,
        410,
        size=8.5,
        leading=12,
        color=MUTED,
    )

    grid_x, grid_y, grid_w, grid_h = M + 58, 250, 430, 390
    c.setStrokeColor(INK)
    c.setLineWidth(1.2)
    c.rect(grid_x, grid_y, grid_w, grid_h, fill=0, stroke=1)
    c.line(grid_x + grid_w / 2, grid_y, grid_x + grid_w / 2, grid_y + grid_h)
    c.line(grid_x, grid_y + grid_h / 2, grid_x + grid_w, grid_y + grid_h / 2)

    quadrants = [
        (grid_x + 16, grid_y + grid_h - 34, "ALTO IMPACTO", "EXECUTAR"),
        (grid_x + grid_w / 2 + 16, grid_y + grid_h - 34, "ALTO IMPACTO", "PREPARAR"),
        (grid_x + 16, grid_y + grid_h / 2 - 34, "BAIXO IMPACTO", "SIMPLIFICAR"),
        (grid_x + grid_w / 2 + 16, grid_y + grid_h / 2 - 34, "BAIXO IMPACTO", "ADIAR"),
    ]
    for x, y, label, action in quadrants:
        c.setFillColor(MUTED)
        c.setFont("PoppinsMedium", 6.5)
        c.drawString(x, y, label)
        c.setFillColor(INK)
        c.setFont("PoppinsBold", 10)
        c.drawString(x, y - 19, action)
        c.setStrokeColor(LINE)
        for offset in (55, 91, 127):
            c.line(x, y - offset, x + 175, y - offset)

    c.setFillColor(GREEN)
    c.circle(grid_x + 112, grid_y + grid_h - 112, 13, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 6.5)
    c.drawCentredString(grid_x + 112, grid_y + grid_h - 114, "01")

    c.setFillColor(CREAM)
    c.roundRect(M, 86, PAGE_W - 2 * M, 100, 7, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(M + 16, 158, "SAÍDA DO DIAGNÓSTICO")
    for index, item in enumerate(("1 prioridade", "1 responsável", "1 teste de aceite")):
        x = M + 16 + index * 155
        c.setFillColor(WHITE)
        c.roundRect(x, 105, 142, 35, 5, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 7)
        c.drawString(x + 10, 119, item)
    footer(c, 4, model="A")
    c.showPage()


def model_b_cover(c: canvas.Canvas) -> None:
    page_bg(c, CREAM)
    base.draw_logo(c, M, PAGE_H - 72, 74)
    chapter_label(c, "Modelo B • Playbook editorial", PAGE_H - 116)
    base.pill(c, "Guia de campo", M, PAGE_H - 150, INK, WHITE)
    c.setFillColor(INK)
    c.setFont("Lora", 39)
    c.drawString(M, PAGE_H - 235, "Agenda sem")
    c.drawString(M, PAGE_H - 282, "interrupção.")
    base.paragraph(
        c,
        "Um playbook para organizar WhatsApp, equipe e horários sem copiar informação entre ferramentas.",
        M,
        PAGE_H - 320,
        330,
        "PoppinsMedium",
        10.5,
        16,
        INK,
    )

    c.setFillColor(WHITE)
    c.roundRect(PAGE_W - 205, 168, 135, 415, 9, fill=1, stroke=0)
    c.setStrokeColor(INK)
    c.roundRect(PAGE_W - 205, 168, 135, 415, 9, fill=0, stroke=1)
    c.setFillColor(INK)
    c.setFont("PoppinsSemiBold", 6.5)
    c.drawString(PAGE_W - 188, 548, "C.A.D.E.I.R.A.")
    method = [
        ("C", "CANAL"),
        ("A", "AGENDA"),
        ("D", "DURAÇÃO"),
        ("E", "EQUIPE"),
        ("I", "INTERVENÇÃO"),
        ("R", "REGISTRO"),
        ("A", "AJUSTE"),
    ]
    y = 505
    for index, (letter, word) in enumerate(method):
        c.setFillColor(GREEN_PALE if index in {1, 3, 4} else CREAM)
        c.circle(PAGE_W - 177, y, 11, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK if index in {1, 3, 4} else INK)
        c.setFont("PoppinsBold", 7)
        c.drawCentredString(PAGE_W - 177, y - 2, letter)
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 6.7)
        c.drawString(PAGE_W - 155, y - 2, word)
        if index < len(method) - 1:
            c.setStrokeColor(LINE)
            c.line(PAGE_W - 177, y - 12, PAGE_W - 177, y - 39)
        y -= 51

    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, 92, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(M, 55, "O CONTEÚDO ENTREGA O MÉTODO COMPLETO.")
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.64))
    c.setFont("Poppins", 7)
    c.drawString(M, 40, "A Flowo aparece como uma forma de executar parte da operação.")
    footer(c, 5, dark=True, model="B")
    c.showPage()


def model_b_method(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 68)
    chapter_label(c, "Capítulo 02 • Mecanismo", PAGE_H - 116)
    c.setFillColor(INK)
    c.setFont("Lora", 29)
    c.drawString(M, PAGE_H - 160, "A conversa precisa")
    c.drawString(M, PAGE_H - 196, "conhecer a agenda.")
    base.paragraph(
        c,
        "Uma agenda isolada organiza horários. Uma recepção conectada consegue usar esses horários para responder.",
        M,
        PAGE_H - 226,
        420,
        size=8.8,
        leading=12.5,
        color=MUTED,
    )

    stages = [
        ("01", "PEDIDO", "O cliente pergunta no WhatsApp."),
        ("02", "CONTEXTO", "Serviço e preferências são identificados."),
        ("03", "DISPONIBILIDADE", "A agenda consulta o profissional correto."),
        ("04", "AÇÃO", "Somente a regra autorizada é executada."),
        ("05", "SUPERVISÃO", "A equipe acompanha ou assume."),
    ]
    y = 548
    for index, (num, title, body) in enumerate(stages):
        c.setFillColor(GREEN_PALE if index == 2 else CREAM)
        c.roundRect(M, y, PAGE_W - 2 * M, 66, 7, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK if index == 2 else INK)
        c.setFont("PoppinsBold", 8)
        c.drawString(M + 16, y + 39, num)
        c.setFont("PoppinsSemiBold", 8.5)
        c.drawString(M + 62, y + 39, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 7.4)
        c.drawString(M + 62, y + 20, body)
        if index < len(stages) - 1:
            c.setStrokeColor(LINE)
            c.line(M + 25, y - 12, M + 25, y)
        y -= 81

    c.setFillColor(INK)
    c.roundRect(M, 82, PAGE_W - 2 * M, 74, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(M + 16, 130, "PROVA QUE A LANDING DEVE MOSTRAR")
    base.paragraph(
        c,
        "Um cenário real de teste: profissional, serviço, disponibilidade oferecida e resultado no painel.",
        M + 16,
        108,
        420,
        size=7.5,
        leading=10,
        color=base.rgb_with_alpha("#FFFFFF", 0.72),
    )
    footer(c, 6, model="B")
    c.showPage()


def model_b_workbook(c: canvas.Canvas) -> None:
    page_bg(c, CREAM)
    base.draw_logo(c, M, PAGE_H - 72, 68)
    chapter_label(c, "Workbook • Equipe", PAGE_H - 116)
    c.setFillColor(INK)
    c.setFont("Lora", 28)
    c.drawString(M, PAGE_H - 160, "Horários individuais")
    c.drawString(M, PAGE_H - 195, "não são exceção.")
    base.paragraph(
        c,
        "A barbearia define a base. Cada profissional mantém sua jornada, intervalo e folga.",
        M,
        PAGE_H - 225,
        420,
        size=8.8,
        leading=12,
        color=MUTED,
    )

    c.setFillColor(INK)
    c.roundRect(M, 342, PAGE_W - 2 * M, 266, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 7.5)
    c.drawString(M + 18, 574, "MAPA DE JORNADA • PREENCHA COM A EQUIPE")
    cols = ["NOME", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"]
    widths = [120, 53, 53, 53, 53, 53, 53]
    table_x = M + 18
    y = 535
    x = table_x
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.5))
    c.setFont("PoppinsSemiBold", 6)
    for title, width in zip(cols, widths):
        c.drawString(x + 4, y, title)
        x += width
    for row in range(4):
        y -= 44
        c.setStrokeColor(base.rgb_with_alpha("#FFFFFF", 0.18))
        c.line(table_x, y + 16, table_x + sum(widths), y + 16)
        x = table_x
        for width in widths:
            c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.1))
            c.roundRect(x + 3, y - 6, width - 8, 24, 3, fill=1, stroke=0)
            x += width

    decisions = [
        ("1", "Quem atualiza uma folga?"),
        ("2", "Qual intervalo precisa ser respeitado?"),
        ("3", "Quando oferecer outro profissional?"),
        ("4", "Quando transferir para a equipe?"),
    ]
    c.setFillColor(PAPER)
    c.roundRect(M, 96, PAGE_W - 2 * M, 202, 8, fill=1, stroke=0)
    chapter_label(c, "Decisões antes da configuração", 270)
    y = 236
    for number, question in decisions:
        c.setFillColor(GREEN_PALE)
        c.circle(M + 27, y + 1, 10, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK)
        c.setFont("PoppinsBold", 6.5)
        c.drawCentredString(M + 27, y - 1, number)
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 8)
        c.drawString(M + 49, y - 1, question)
        c.setStrokeColor(LINE)
        c.line(M + 290, y - 1, PAGE_W - M - 18, y - 1)
        y -= 38
    footer(c, 7, model="B")
    c.showPage()


def model_c_cover(c: canvas.Canvas) -> None:
    page_bg(c, INK)
    logo_on_dark(c, M, PAGE_H - 72, 70)
    chapter_label(c, "Modelo C • Campanha de execução", PAGE_H - 128, dark=True)
    c.setFillColor(WHITE)
    c.setFont("PoppinsBold", 35)
    c.drawString(M, PAGE_H - 205, "DESAFIO")
    c.drawString(M, PAGE_H - 247, "OPERAÇÃO")
    c.setFillColor(ORANGE)
    c.setFont("PoppinsBold", 108)
    c.drawString(M - 4, PAGE_H - 376, "7")
    c.setFillColor(WHITE)
    c.setFont("PoppinsBold", 35)
    c.drawString(M + 75, PAGE_H - 342, "DIAS")

    base.paragraph(
        c,
        "Sete decisões curtas para mapear interrupções, organizar horários e testar uma rotina mais supervisionável.",
        M,
        PAGE_H - 415,
        420,
        "PoppinsMedium",
        10,
        15,
        WHITE,
    )

    c.setFillColor(WHITE)
    c.roundRect(M, 145, PAGE_W - 2 * M, 205, 8, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(M + 18, 320, "VOCÊ NÃO PRECISA")
    reject = [
        "trocar de ferramenta para fazer o diagnóstico",
        "prometer resultado financeiro",
        "obrigar a equipe a mudar tudo de uma vez",
    ]
    y = 282
    for item in reject:
        c.setFillColor(ORANGE)
        c.circle(M + 23, y + 2, 5, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 8)
        c.drawString(M + 42, y - 1, item)
        y -= 40

    c.setFillColor(ORANGE)
    c.roundRect(M, 82, 230, 40, 7, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 8)
    c.drawCentredString(M + 115, 97, "COMEÇAR PELO DIA 1")
    footer(c, 8, dark=True, model="C")
    c.showPage()


def model_c_days(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 68)
    chapter_label(c, "Desafio • Plano de execução", PAGE_H - 116)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 28)
    c.drawString(M, PAGE_H - 160, "UMA DECISÃO")
    c.drawString(M, PAGE_H - 193, "POR DIA.")
    base.paragraph(
        c,
        "O desafio entrega tarefas verificáveis. O prazo organiza a execução; não garante resultado comercial.",
        M,
        PAGE_H - 222,
        430,
        size=8.5,
        leading=12,
        color=MUTED,
    )

    days = [
        ("01", "CANAL", "Liste onde os pedidos chegam."),
        ("02", "AGENDA", "Defina a fonte de verdade."),
        ("03", "EQUIPE", "Mapeie jornadas individuais."),
        ("04", "SERVIÇOS", "Revise duração e regras."),
        ("05", "EXCEÇÕES", "Defina quando alguém assume."),
        ("06", "TESTE", "Simule os cenários prioritários."),
        ("07", "REVISÃO", "Escolha o próximo ajuste."),
    ]
    y = 553
    for index, (num, title, body) in enumerate(days):
        dark = index in {0, 5}
        c.setFillColor(INK if dark else CREAM)
        c.roundRect(M, y, PAGE_W - 2 * M, 54, 6, fill=1, stroke=0)
        c.setFillColor(ORANGE if dark else INK)
        c.setFont("PoppinsBold", 8)
        c.drawString(M + 15, y + 23, num)
        c.setFillColor(WHITE if dark else INK)
        c.setFont("PoppinsSemiBold", 8)
        c.drawString(M + 57, y + 30, title)
        c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.65) if dark else MUTED)
        c.setFont("Poppins", 7)
        c.drawString(M + 150, y + 21, body)
        y -= 65

    c.setFillColor(ORANGE)
    c.roundRect(M, 67, PAGE_W - 2 * M, 47, 6, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsSemiBold", 7.5)
    c.drawString(M + 16, 85, "ENTREGA: MAPA PREENCHIDO + UMA PRIORIDADE + UM TESTE DE ACEITE")
    footer(c, 9, model="C")
    c.showPage()


def model_c_tracker(c: canvas.Canvas) -> None:
    page_bg(c, CREAM)
    base.draw_logo(c, M, PAGE_H - 72, 68)
    chapter_label(c, "Desafio • Quadro de acompanhamento", PAGE_H - 116)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 28)
    c.drawString(M, PAGE_H - 160, "PROGRESSO VISÍVEL.")
    base.paragraph(
        c,
        "Cada dia termina com uma evidência simples. Sem gamificação decorativa e sem pontuação arbitrária.",
        M,
        PAGE_H - 192,
        430,
        size=8.5,
        leading=12,
        color=MUTED,
    )

    c.setFillColor(PAPER)
    c.roundRect(M, 255, PAGE_W - 2 * M, 390, 8, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsSemiBold", 7.5)
    c.drawString(M + 18, 615, "DIA")
    c.drawString(M + 72, 615, "EVIDÊNCIA")
    c.drawRightString(PAGE_W - M - 18, 615, "FEITO")
    evidence = [
        "Canais listados",
        "Fonte de verdade definida",
        "Jornadas mapeadas",
        "Serviços revisados",
        "Handoff definido",
        "Teste executado",
        "Próximo ajuste escolhido",
    ]
    y = 575
    for index, item in enumerate(evidence, 1):
        c.setStrokeColor(LINE)
        c.line(M + 18, y + 19, PAGE_W - M - 18, y + 19)
        c.setFillColor(ORANGE if index in {1, 6} else INK)
        c.setFont("PoppinsBold", 8)
        c.drawString(M + 18, y, f"{index:02d}")
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 8)
        c.drawString(M + 72, y, item)
        c.setStrokeColor(INK)
        c.rect(PAGE_W - M - 35, y - 5, 14, 14, fill=0, stroke=1)
        y -= 47

    c.setFillColor(INK)
    c.roundRect(M, 82, PAGE_W - 2 * M, 118, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(M + 16, 171, "PONTE PARA A FLOWO")
    base.paragraph(
        c,
        "Depois do desafio, a landing convida a barbearia a ver como a Flowo executa e supervisiona parte desse mapa.",
        M + 16,
        147,
        420,
        size=8,
        leading=11,
        color=base.rgb_with_alpha("#FFFFFF", 0.74),
    )
    c.setFillColor(ORANGE)
    c.roundRect(M + 16, 99, 190, 31, 5, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 7)
    c.drawCentredString(M + 111, 111, "VER A RECEPÇÃO FUNCIONANDO")
    footer(c, 10, model="C")
    c.showPage()


def comparison(c: canvas.Canvas) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 68)
    chapter_label(c, "Decisão", PAGE_H - 116)
    c.setFillColor(INK)
    c.setFont("Lora", 29)
    c.drawString(M, PAGE_H - 160, "Qual modelo entra")
    c.drawString(M, PAGE_H - 196, "em qual momento?")

    headers = ["MODELO", "MELHOR USO", "INTENÇÃO", "RISCO"]
    widths = [120, 150, 135, 110]
    table_x = M
    y = 585
    x = table_x
    c.setFillColor(INK)
    c.rect(table_x, y, sum(widths), 38, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 6.5)
    for h, w in zip(headers, widths):
        c.drawString(x + 10, y + 15, h)
        x += w

    rows = [
        ("A • RAIO-X", "Captura principal", "Diagnóstico", "Baixo"),
        ("B • PLAYBOOK", "Nutrição e SEO", "Educação", "Baixo"),
        ("C • DESAFIO", "Campanha social", "Execução", "Médio"),
    ]
    y -= 58
    for index, row in enumerate(rows):
        fill = GREEN_PALE if index == 0 else CREAM
        c.setFillColor(fill)
        c.roundRect(table_x, y, sum(widths), 58, 5, fill=1, stroke=0)
        x = table_x
        for cell_index, (cell, w) in enumerate(zip(row, widths)):
            c.setFillColor(GREEN_DARK if index == 0 and cell_index == 0 else INK)
            c.setFont("PoppinsSemiBold" if cell_index == 0 else "Poppins", 7.2)
            c.drawString(x + 10, y + 24, cell)
            x += w
        y -= 75

    c.setFillColor(CREAM)
    c.roundRect(M, 180, PAGE_W - 2 * M, 163, 8, fill=1, stroke=0)
    chapter_label(c, "Jornada recomendada", 319)
    steps = [
        ("1", "Anúncio ou busca", "dor de interrupção"),
        ("2", "Raio-X", "captura e intenção"),
        ("3", "Playbook", "mecanismo e confiança"),
        ("4", "Demonstração", "produto como prova"),
        ("5", "Implantação", "oferta paga"),
    ]
    y = 289
    for number, title, note in steps:
        c.setFillColor(GREEN if number == "2" else WHITE)
        c.circle(M + 27, y + 1, 10, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("PoppinsBold", 6.5)
        c.drawCentredString(M + 27, y - 1, number)
        c.setFont("PoppinsSemiBold", 7.5)
        c.drawString(M + 48, y, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 7)
        c.drawString(M + 165, y, note)
        y -= 24

    c.setFillColor(INK)
    c.roundRect(M, 56, PAGE_W - 2 * M, 112, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 8)
    c.drawString(M + 16, 139, "RECOMENDAÇÃO PARA APROVAÇÃO")
    base.paragraph(
        c,
        "Produzir A como conversão principal, usar B como material de autoridade e testar C somente depois de medir conclusão e qualidade dos leads.",
        M + 16,
        115,
        425,
        size=8,
        leading=11,
        color=base.rgb_with_alpha("#FFFFFF", 0.76),
    )
    c.setFillColor(GREEN)
    c.roundRect(M + 16, 72, 242, 29, 5, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 7)
    c.drawCentredString(M + 137, 83, "APROVAR A + B PARA PRODUÇÃO")
    footer(c, 11, model="SISTEMA")
    c.showPage()


def build_pdf() -> Path:
    base.ensure_fonts()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(PDF_PATH), pagesize=A4)
    c.setTitle("Flowo — Modelos premium de ofertas e materiais para leads")
    c.setAuthor("Flowo")
    c.setSubject("Três direções editoriais e comerciais para aquisição")
    c.setKeywords("Flowo, barbearia, lead magnet, oferta, PDF, landing page")
    review_cover(c)
    model_a_cover(c)
    model_a_score(c)
    model_a_priority(c)
    model_b_cover(c)
    model_b_method(c)
    model_b_workbook(c)
    model_c_cover(c)
    model_c_days(c)
    model_c_tracker(c)
    comparison(c)
    c.save()
    return PDF_PATH


if __name__ == "__main__":
    print(build_pdf())
