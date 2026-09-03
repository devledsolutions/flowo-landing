#!/usr/bin/env python3
"""Gera o PDF do caminho do lead na Flowo (Growth OS)."""

from __future__ import annotations

import importlib.util
from dataclasses import dataclass
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas

from tagged_pdf import add_accessible_tags

ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = ROOT / "scripts" / "generate-lead-magnet-mockups.py"
OUTPUT_DIR = ROOT / "output" / "pdf"

spec = importlib.util.spec_from_file_location("flowo_pdf_base", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Não foi possível importar {BASE_SCRIPT}")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

PAGE_W, PAGE_H = A4
M = 46
CONTENT_W = PAGE_W - 2 * M
FLOOR = 72

INK = HexColor("#171811")
INK_STRONG = HexColor("#10100A")
CREAM = HexColor("#F6F6F3")
PAPER = HexColor("#FCFBF9")
SURFACE_2 = HexColor("#F1F0EC")
MUTED = HexColor("#595852")
FAINT = HexColor("#6F6F69")
LINE = HexColor("#DCDBD7")
GRID = HexColor("#C7C5BF")

DOC_TITLE = "O caminho do lead"
DOC_DATE = "3 de setembro de 2026"


def bg(c: canvas.Canvas, color=PAPER) -> None:
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def foot(c: canvas.Canvas, page: int) -> None:
    c.setFont("PoppinsMedium", 6.5)
    c.setFillColor(FAINT)
    c.drawString(M, 42, f"Flowo · {DOC_TITLE} · {DOC_DATE}")
    c.drawRightString(PAGE_W - M, 42, f"{page:02d}")


def head(c: canvas.Canvas, eyebrow: str, title: str) -> float:
    """Cabeçalho de página interna. Devolve o y onde o conteúdo começa."""
    y = PAGE_H - 62
    c.setFont("PoppinsSemiBold", 7)
    c.setFillColor(FAINT)
    c.drawString(M, y, eyebrow.upper())
    y -= 26
    c.setFont("Lora", 23)
    c.setFillColor(INK_STRONG)
    c.drawString(M, y, title)
    y -= 16
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(M, y, PAGE_W - M, y)
    return y - 26


def para(c, text, x, y, w, size=9.4, color=MUTED, font="Poppins", leading=None):
    return base.paragraph(c, text, x, y, w, font=font, size=size,
                          leading=leading or size * 1.5, color=color)


def rule(c: canvas.Canvas, y: float, x0: float = M, x1: float | None = None,
         color=LINE, width: float = 0.6) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x0, y, x1 if x1 is not None else PAGE_W - M, y)


# ---------------------------------------------------------------- conteúdo

@dataclass(frozen=True)
class Stage:
    number: str
    name: str
    what: str
    owner: str


STAGES: tuple[Stage, ...] = (
    Stage("01", "Chegada", "Anúncio no Meta, Google ou TikTok, busca, indicação ou acesso direto. O link do anúncio carrega a campanha.", "Marketing"),
    Stage("02", "Consentimento", "O visitante aceita ou recusa os cookies. A resposta decide o que pode ser rastreado e o que pode ser enviado depois.", "Automático"),
    Stage("03", "Captura", "Formulário do site, material para baixar, newsletter ou pedido de contato. Vira uma linha de lead, com origem.", "Automático"),
    Stage("04", "Nutrição", "Sequência de e-mail escolhida pela intenção de quem chegou. Para sozinha quando a pessoa responde, descadastra ou vira cliente.", "Marketing"),
    Stage("05", "Outros canais", "WhatsApp, ligação do agente de voz e SMS, quando a pessoa se qualifica para eles.", "Marketing"),
    Stage("06", "Qualificação", "O lead ganha etapa, dono e prazo da próxima ação. O time é avisado no Telegram e por e-mail.", "Comercial"),
    Stage("07", "Venda", "A Central comercial mostra quem precisa de atenção hoje, por quê, e qual é a próxima ação.", "Comercial"),
    Stage("08", "Volta", "A conversão é devolvida para a plataforma de anúncio, e o custo por cliente fecha por campanha.", "Automático"),
)

HOLES = (
    ("Cookie recusado apaga a origem",
     "Quem recusa cookies chega sem a marca de campanha e é contado como acesso direto.",
     "Dinheiro"),
    ("Cadastro pelo app não leva a origem",
     "O aplicativo manda três campos no cadastro; o site manda o pacote inteiro.",
     "Dinheiro"),
    ("Ajuste de conversão desligado",
     "Cancelamento e estorno nunca voltam para a plataforma de anúncio, que segue otimizando para venda que não existe.",
     "Dinheiro"),
    ("Pedido de contato sem conversão",
     "A página de contato não avisa nenhuma plataforma, e grava o telefone sem o código do país.",
     "Lead"),
    ("SMS ligado sem transporte",
     "A fila enche, nada sai, e a linha parada faz o painel contar o lead como se estivesse em automação.",
     "Lead"),
    ("Lead qualificado sem prazo some",
     "Sem data de próxima ação, ele desaparece das três telas que listam trabalho.",
     "Lead"),
    ("Teto do agente de voz mal posto",
     "O limite de gasto é igual à reserva de uma ligação, então ou trava na primeira, ou nunca trava.",
     "Dinheiro"),
    ("Duas sequências ao mesmo tempo",
     "A trilha de quem pede material não consulta o teto de mensagens da semana.",
     "Reputação"),
    ("Painel rastreia sem consentimento",
     "A gravação de sessão roda no painel interno sem o aceite que o site exige.",
     "Risco legal"),
)

LIMITS = (
    ("E-mails na primeira semana", "2", "É o teto quando o freio funciona. Sobe para 4 com o furo das duas sequências."),
    ("Tempo até o time ser avisado", "Imediato", "Telegram e e-mail saem no mesmo evento, assim que o lead se qualifica."),
    ("Corte da fila de trabalho", "30", "A fila mostra as 30 tarefas mais próximas do prazo e diz quantas existem."),
    ("Origens de anúncio ativas", "3", "Meta, Google e TikTok, com gasto lido de volta para calcular o custo."),
)


CONTENTS = (
    ("02", "O caminho em uma página", "As oito etapas, na ordem, com o responsável de cada uma."),
    ("03", "Da chegada à captura", "Como o lead entra e o que decide se a origem sobrevive."),
    ("04", "Da nutrição à venda", "Que sequência ele recebe, por qual canal, e quando o time entra."),
    ("05", "Da venda à volta", "Como o comercial trabalha e como a venda volta para o anúncio."),
    ("06", "Onde o lead se perde", "Nove pontos apurados no código, com o que se perde em cada um."),
    ("07", "Limites que valem hoje", "Os quatro números que decidem o comportamento do sistema."),
)


def cover(c: canvas.Canvas) -> None:
    bg(c, CREAM)
    base.draw_logo(c, M, PAGE_H - 78, 74)

    y = PAGE_H - 250
    c.setFont("PoppinsSemiBold", 7.5)
    c.setFillColor(FAINT)
    c.drawString(M, y, "GROWTH OS · DOCUMENTO INTERNO")

    y -= 44
    c.setFont("Lora", 44)
    c.setFillColor(INK_STRONG)
    c.drawString(M, y, "O caminho do lead")
    y -= 46
    c.drawString(M, y, "na Flowo")

    y -= 34
    y = para(c, "Da primeira visita até a venda: o que acontece, em que ordem, "
                "quem é responsável por cada etapa e onde o lead se perde hoje.",
             M, y, CONTENT_W * 0.66, size=11.5, leading=18, color=MUTED)

    y -= 30
    rule(c, y)
    y -= 24
    c.setFont("PoppinsSemiBold", 7)
    c.setFillColor(FAINT)
    c.drawString(M, y, "NESTE DOCUMENTO")
    y -= 20
    for number, item, detail in CONTENTS:
        c.setFont("PoppinsMedium", 7.5)
        c.setFillColor(FAINT)
        c.drawString(M, y, number)
        c.setFont("PoppinsSemiBold", 9.6)
        c.setFillColor(INK_STRONG)
        c.drawString(M + 26, y, item)
        c.setFont("Poppins", 8.6)
        c.setFillColor(MUTED)
        c.drawString(M + 26, y - 13, detail)
        y -= 20
        rule(c, y, color=LINE)
        y -= 18

    c.setFont("Poppins", 8)
    c.setFillColor(FAINT)
    c.drawString(M, 64, f"Apurado no código e nas plataformas em {DOC_DATE}.")
    foot(c, 1)


def flow_page(c: canvas.Canvas) -> None:
    bg(c)
    y = head(c, "Visão geral", "O caminho em uma página")

    y = para(c, "Cada etapa entrega para a seguinte. Quando uma delas perde o dado, "
                "todas as seguintes trabalham com menos informação.",
             M, y, CONTENT_W * 0.78)
    y -= 18

    spine_x = M + 15
    owner_x = PAGE_W - M
    top = y
    # O ultimo bloco ainda ocupa titulo mais duas linhas depois do ponto.
    last_block = 44
    gap = (top - FLOOR - last_block) / (len(STAGES) - 1)

    for index, stage in enumerate(STAGES):
        cy = top - index * gap
        # trilho entre os pontos
        if index < len(STAGES) - 1:
            c.setStrokeColor(LINE)
            c.setLineWidth(0.8)
            c.line(spine_x, cy - 7, spine_x, cy - gap + 4)
        # ponto
        c.setFillColor(INK)
        c.circle(spine_x, cy, 3.1, fill=1, stroke=0)

        tx = spine_x + 18
        c.setFont("PoppinsSemiBold", 7)
        c.setFillColor(FAINT)
        c.drawString(tx, cy + 8, stage.number)

        c.setFont("PoppinsSemiBold", 11.5)
        c.setFillColor(INK_STRONG)
        c.drawString(tx, cy - 4, stage.name)

        c.setFont("PoppinsMedium", 7)
        c.setFillColor(FAINT)
        c.drawRightString(owner_x, cy - 3, stage.owner.upper())

        para(c, stage.what, tx, cy - 20, CONTENT_W - 130, size=8.6, leading=12.6)

    foot(c, 2)


def stages_detail(c: canvas.Canvas, page: int, title: str,
                  blocks: tuple[tuple[str, str, tuple[str, ...]], ...]) -> None:
    bg(c)
    y = head(c, "Etapa por etapa", title)
    for name, summary, bullets in blocks:
        c.setFont("Lora", 15)
        c.setFillColor(INK_STRONG)
        c.drawString(M, y, name)
        y -= 17
        y = para(c, summary, M, y, CONTENT_W * 0.86, size=9.4)
        y -= 8
        for bullet in bullets:
            c.setFillColor(INK)
            c.circle(M + 2.5, y + 3.2, 1.5, fill=1, stroke=0)
            y = para(c, bullet, M + 13, y, CONTENT_W - 20, size=8.8, leading=13)
            y -= 3
        y -= 12
        rule(c, y)
        y -= 22
    foot(c, page)


def holes_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Diagnóstico", "Onde o lead se perde")
    y = para(c, "Nove pontos apurados no código. A coluna da direita diz o que se perde "
                "quando o ponto falha.", M, y, CONTENT_W * 0.78)
    y -= 16

    kind_x = PAGE_W - M
    rule(c, y, color=GRID, width=0.8)
    y -= 16
    for name, detail, kind in HOLES:
        c.setFont("PoppinsSemiBold", 9.6)
        c.setFillColor(INK_STRONG)
        c.drawString(M, y, name)
        c.setFont("PoppinsSemiBold", 7)
        c.setFillColor(FAINT)
        c.drawRightString(kind_x, y + 0.5, kind.upper())
        y -= 13
        y = para(c, detail, M, y, CONTENT_W - 90, size=8.6, leading=12.4)
        y -= 11
        rule(c, y)
        y -= 15
    foot(c, page)


def limits_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Os números", "Limites que valem hoje")
    y = para(c, "Quatro números que decidem o comportamento do sistema. "
                "Qualquer mudança neles muda o que o lead recebe.",
             M, y, CONTENT_W * 0.78)
    y -= 24

    # Coluna de valor com largura fixa: sem isso um valor por extenso empurra
    # o rotulo e a lista perde a margem esquerda comum.
    value_w = 96
    text_x = M + value_w + 20
    for name, value, detail in LIMITS:
        size = 30
        while pdfmetrics.stringWidth(value, "Lora", size) > value_w and size > 13:
            size -= 1
        c.setFont("Lora", size)
        c.setFillColor(INK_STRONG)
        c.drawRightString(M + value_w, y, value)
        c.setFont("PoppinsSemiBold", 10)
        c.setFillColor(INK)
        c.drawString(text_x, y + 3, name)
        para(c, detail, text_x, y - 12, PAGE_W - M - text_x, size=8.6, leading=12.4)
        y -= 52
        rule(c, y)
        y -= 26

    y -= 14
    rule(c, y + 30, color=GRID, width=0.8)
    c.setFont("Lora", 15)
    c.setFillColor(INK_STRONG)
    c.drawString(M, y, "A regra que não se negocia")
    y -= 18
    para(c, "Ninguém recebe mensagem de marketing sem ter pedido, e quem vira cliente "
            "sai da nutrição. Quando o freio e o consentimento discordam, vale o "
            "consentimento.", M, y, CONTENT_W * 0.86, size=9.4)
    foot(c, page)


DETAIL_PAGES = (
    ("Da chegada à captura", (
        ("01 · Chegada",
         "O lead entra por anúncio, por busca, por indicação ou direto. O link do anúncio é montado numa tela só, e leva o nome da campanha na forma que o sistema de custo entende.",
         ("O nome no anúncio e o nome no link precisam ser o mesmo, senão o custo por cliente não fecha.",
          "Um clique que cai numa página sem checagem prévia vira lead sem origem.")),
        ("02 · Consentimento",
         "A resposta ao aviso de cookies decide o que pode ser rastreado. Ela é anterior a tudo: sem aceite, não há origem para guardar.",
         ("Consentimento de anúncio e consentimento de e-mail são coisas diferentes, e valem separadamente.",
          "Quem recusa segue navegando e pode virar cliente, só que sem origem conhecida.")),
        ("03 · Captura",
         "Existem várias portas: formulário, material para baixar, newsletter e pedido de contato. Todas gravam a mesma linha de lead, com telefone e e-mail conferidos.",
         ("E-mail repetido atualiza o lead que já existe, em vez de criar outro.",
          "O material prometido é entregue no mesmo movimento da captura.")),
    )),
    ("Da nutrição à venda", (
        ("04 · Nutrição",
         "A sequência de e-mail é escolhida pela intenção de quem chegou: quem baixou material, quem assinou a newsletter e quem pediu contato recebem trilhas diferentes.",
         ("A sequência para sozinha quando a pessoa responde, descadastra ou vira cliente.",
          "Existe um teto de mensagens por semana, para ninguém receber duas trilhas ao mesmo tempo.")),
        ("05 · Outros canais",
         "WhatsApp, ligação do agente de voz e SMS entram quando o lead se qualifica para eles, e não em paralelo com tudo.",
         ("Toda ligação tem consentimento registrado e teto de gasto.",
          "O canal certo depende do que a pessoa fez, não de quando ela chegou.")),
        ("06 · Qualificação e passagem",
         "O lead ganha etapa, dono e prazo da próxima ação. O time comercial é avisado no Telegram e por e-mail no mesmo evento.",
         ("Sem prazo marcado, o lead some das telas que listam trabalho.",
          "O dono padrão é o responsável comercial, e pode ser trocado por lead.")),
    )),
    ("Da venda à volta", (
        ("07 · Venda",
         "A Central comercial abre em Agora: quem precisa de atenção hoje, por quê, e qual é a próxima ação. Leads, pipeline e trials são telas próprias, cada uma com endereço.",
         ("Cada tela tem URL, então dá para mandar o link de um lead para alguém.",
          "A fila mostra as tarefas mais próximas do prazo e diz quantas existem no total.")),
        ("08 · Conversão e volta",
         "A venda é devolvida para a plataforma de anúncio, que aprende com ela. É o que permite dizer quanto custou cada cliente, por origem.",
         ("Cancelamento e estorno também precisam voltar, senão a plataforma otimiza para venda que não existiu.",
          "O custo por campanha só fecha porque gasto e lead passam pela mesma chave.")),
    )),
)


def build() -> Path:
    base.ensure_fonts()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUTPUT_DIR / "flowo-caminho-do-lead.pdf"
    c = canvas.Canvas(str(path), pagesize=A4)
    c.setTitle(f"Flowo · {DOC_TITLE}")
    c.setAuthor("Flowo")
    c.setSubject("Growth OS: o caminho do lead, da chegada à venda")

    cover(c)
    c.showPage()
    flow_page(c)
    c.showPage()
    page = 3
    for title, blocks in DETAIL_PAGES:
        stages_detail(c, page, title, blocks)
        c.showPage()
        page += 1
    holes_page(c, page)
    c.showPage()
    page += 1
    limits_page(c, page)
    c.showPage()
    c.save()

    add_accessible_tags(
        path,
        title=f"Flowo - {DOC_TITLE}",
        page_titles=[
            "Capa",
            "O caminho em uma pagina",
            *[title for title, _blocks in DETAIL_PAGES],
            "Onde o lead se perde",
            "Limites que valem hoje",
        ],
    )
    return path


if __name__ == "__main__":
    print(build())
