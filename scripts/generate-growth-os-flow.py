#!/usr/bin/env python3
"""Gera o PDF do caminho do lead na Flowo (Growth OS)."""

from __future__ import annotations

import importlib.util
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
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
LAND_W, LAND_H = landscape(A4)
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


def bg(c: canvas.Canvas, color=PAPER, w: float = PAGE_W, h: float = PAGE_H) -> None:
    c.setFillColor(color)
    c.rect(0, 0, w, h, fill=1, stroke=0)


def foot(c: canvas.Canvas, page: int, w: float = PAGE_W) -> None:
    c.setFont("PoppinsMedium", 6.5)
    c.setFillColor(FAINT)
    c.drawString(M, 42, f"Flowo · {DOC_TITLE} · {DOC_DATE}")
    c.drawRightString(w - M, 42, f"{page:02d}")


def head(c: canvas.Canvas, eyebrow: str, title: str,
         w: float = PAGE_W, h: float = PAGE_H) -> float:
    """Cabeçalho de página interna. Devolve o y onde o conteúdo começa."""
    y = h - 62
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
    c.line(M, y, w - M, y)
    return y - 26


def para(c, text, x, y, w, size=9.4, color=MUTED, font="Poppins", leading=None):
    return base.paragraph(c, text, x, y, w, font=font, size=size,
                          leading=leading or size * 1.5, color=color)


def rule(c: canvas.Canvas, y: float, x0: float = M, x1: float | None = None,
         color=LINE, width: float = 0.6) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x0, y, x1 if x1 is not None else PAGE_W - M, y)


# ------------------------------------------------------------ peças de desenho

def box(c: canvas.Canvas, x: float, y: float, w: float, h: float,
        title: str, items: tuple[str, ...] = (), *,
        fill=None, title_color=INK_STRONG, size: float = 8.2) -> None:
    """Caixa de sistema: filete, título e as linhas que couberem."""
    if fill is not None:
        c.setFillColor(fill)
        c.rect(x, y - h, w, h, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.rect(x, y - h, w, h, fill=0, stroke=1)

    ty = y - 13
    c.setFont("PoppinsSemiBold", size + 0.6)
    c.setFillColor(title_color)
    for line in base.wrap_text(title, "PoppinsSemiBold", size + 0.6, w - 16):
        c.drawString(x + 8, ty, line)
        ty -= size + 3.4
    if items:
        ty -= 2
        c.setFont("Poppins", size - 1.1)
        c.setFillColor(MUTED)
        for item in items:
            for line in base.wrap_text(item, "Poppins", size - 1.1, w - 16):
                if ty < y - h + 7:
                    return
                c.drawString(x + 8, ty, line)
                ty -= size + 1.4


def band_label(c: canvas.Canvas, x: float, y: float, text: str) -> None:
    c.setFont("PoppinsSemiBold", 6.8)
    c.setFillColor(FAINT)
    c.drawString(x, y, text.upper())


def arrow(c: canvas.Canvas, x0: float, y0: float, x1: float, y1: float,
          *, head: bool = True, color=GRID, width: float = 0.7,
          dash: bool = False) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(width)
    if dash:
        c.setDash(2, 2.4)
    c.line(x0, y0, x1, y1)
    c.setDash()
    if not head:
        return
    size = 3.0
    if abs(y1 - y0) < 0.6:                       # horizontal
        d = 1 if x1 > x0 else -1
        c.setFillColor(color)
        pth = c.beginPath()
        pth.moveTo(x1, y1)
        pth.lineTo(x1 - d * size, y1 + size * 0.62)
        pth.lineTo(x1 - d * size, y1 - size * 0.62)
        pth.close()
        c.drawPath(pth, fill=1, stroke=0)
    else:                                        # vertical
        d = 1 if y1 > y0 else -1
        c.setFillColor(color)
        pth = c.beginPath()
        pth.moveTo(x1, y1)
        pth.lineTo(x1 + size * 0.62, y1 - d * size)
        pth.lineTo(x1 - size * 0.62, y1 - d * size)
        pth.close()
        c.drawPath(pth, fill=1, stroke=0)


def table(c: canvas.Canvas, y: float, columns: tuple[tuple[str, float], ...],
          rows: tuple[tuple[str, ...], ...], *, x: float = M,
          size: float = 8.2, pad: float = 7) -> float:
    """Tabela de filetes: sem preenchimento, largura por coluna em pontos."""
    xs, cursor = [], x
    for _name, width in columns:
        xs.append(cursor)
        cursor += width

    c.setFont("PoppinsSemiBold", 6.8)
    c.setFillColor(FAINT)
    for (name, _w), cx in zip(columns, xs):
        c.drawString(cx, y, name.upper())
    y -= 8
    rule(c, y, x, cursor, color=GRID, width=0.8)
    y -= pad + 3

    for row in rows:
        wrapped = [
            base.wrap_text(cell, "Poppins", size, columns[i][1] - 10)
            for i, cell in enumerate(row)
        ]
        height = max(len(w) for w in wrapped) * (size + 3.2)
        for i, lines in enumerate(wrapped):
            c.setFont("PoppinsSemiBold" if i == 0 else "Poppins", size)
            c.setFillColor(INK_STRONG if i == 0 else MUTED)
            ly = y
            for line in lines:
                c.drawString(xs[i], ly, line)
                ly -= size + 3.2
        y -= height + pad
        rule(c, y + pad - 3, x, cursor)
        y -= 3
    return y


def section(c: canvas.Canvas, y: float, title: str, *,
            x: float = M, size: float = 14) -> float:
    c.setFont("Lora", size)
    c.setFillColor(INK_STRONG)
    c.drawString(x, y, title)
    return y - size - 3


def block(c: canvas.Canvas, x: float, y: float, w: float,
          title: str, body: str, *, size: float = 8.5,
          leading: float = 12.4, title_size: float = 9.2,
          gap: float = 11) -> float:
    c.setFont("PoppinsSemiBold", title_size)
    c.setFillColor(INK_STRONG)
    for line in base.wrap_text(title, "PoppinsSemiBold", title_size, w):
        c.drawString(x, y, line)
        y -= title_size + 3.4
    y -= 1
    y = para(c, body, x, y, w, size=size, leading=leading)
    return y - gap


def bullets(c: canvas.Canvas, y: float, items: tuple[str, ...], *,
            x: float = M, w: float = CONTENT_W, size: float = 8.6,
            leading: float = 12.6, gap: float = 4) -> float:
    for item in items:
        c.setFillColor(INK)
        c.circle(x + 2.5, y + 3.0, 1.5, fill=1, stroke=0)
        y = para(c, item, x + 13, y, w - 13, size=size, leading=leading)
        y -= gap
    return y


# ---------------------------------------------------------------- capa

CONTENTS = (
    ("02", "O mapa", "O sistema inteiro numa página"),
    ("03", "Anúncios", "Meta, Google e TikTok, e o que cada um aguenta"),
    ("04", "Campanhas", "Como uma campanha nasce e é aprovada"),
    ("05", "Rastreio", "Segment e PostHog, e onde eles se repetem"),
    ("06", "Consentimento", "O que dispara antes e depois do aceite"),
    ("07", "Captura", "As portas do site e como o lead é deduplicado"),
    ("08", "Nutrição no Resend", "25 modelos, 9 automações, 3 tópicos"),
    ("09", "WhatsApp, voz e SMS", "Os outros canais, e o que trava cada um"),
    ("10", "Qualificação", "Quem vira 'pronto para venda', e quem é avisado"),
    ("11", "A Central comercial", "As nove telas e o que cada uma responde"),
    ("12", "As tabelas", "Onde cada pedaço do caminho fica guardado"),
    ("13", "Ligado e desligado", "O estado real da produção hoje"),
    ("14", "Onde o dinheiro se perde", "Dez furos que custam mídia paga"),
    ("15", "Onde o lead se perde", "Dez furos de lead, reputação e risco legal"),
    ("16", "O que não sabemos", "O que ficou sem verificação, e por quê"),
)


def cover(c: canvas.Canvas) -> None:
    bg(c, CREAM)
    base.draw_logo(c, M, PAGE_H - 78, 74)

    y = PAGE_H - 190
    c.setFont("PoppinsSemiBold", 7.5)
    c.setFillColor(FAINT)
    c.drawString(M, y, "GROWTH OS · DOCUMENTO INTERNO")

    y -= 42
    c.setFont("Lora", 42)
    c.setFillColor(INK_STRONG)
    c.drawString(M, y, "O caminho do lead")
    y -= 44
    c.drawString(M, y, "na Flowo")

    y -= 30
    y = para(c, "Do anúncio até a venda: por onde o lead entra, o que o site grava, "
                "quais mensagens ele recebe, quem do time é avisado e como a venda "
                "volta para a plataforma que a pagou.",
             M, y, CONTENT_W * 0.72, size=11, leading=17, color=MUTED)

    y -= 26
    rule(c, y)
    y -= 22
    c.setFont("PoppinsSemiBold", 7)
    c.setFillColor(FAINT)
    c.drawString(M, y, "NESTE DOCUMENTO")
    y -= 18
    for number, item, detail in CONTENTS:
        c.setFont("PoppinsMedium", 7.2)
        c.setFillColor(FAINT)
        c.drawString(M, y, number)
        c.setFont("PoppinsSemiBold", 9.2)
        c.setFillColor(INK_STRONG)
        c.drawString(M + 24, y, item)
        c.setFont("Poppins", 8)
        c.setFillColor(MUTED)
        c.drawRightString(PAGE_W - M, y, detail)
        y -= 10.5
        rule(c, y, color=LINE)
        y -= 10.5

    c.setFont("Poppins", 7.6)
    c.setFillColor(FAINT)
    c.drawString(M, 62, "Apurado no código e no ambiente de produção em "
                        f"{DOC_DATE}. Nenhum valor de segredo aparece aqui.")
    foot(c, 1)


# ---------------------------------------------------------------- 02 · o mapa

BANDS = (
    ("Origem", (
        ("Meta Ads", ("Formulário de lead, clique para o site e "
                      "Click-to-WhatsApp.",)),
        ("Google Ads", ("Formulário de lead e anúncio conversacional, "
                        "pelo mesmo webhook.",)),
        ("TikTok Ads", ("Formulário de lead. Sem o token de acesso em "
                        "produção, o lead não é buscado.",)),
        ("Busca, indicação e direto", ("Chega sem campanha e só vira lead "
                                       "pelo formulário do site.",)),
    )),
    ("Site", (
        ("Aviso de cookies", ("Necessário, analítico e marketing. "
                              "Tudo negado por padrão.",)),
        ("Segment no navegador", ("Só carrega com aceite analítico. Cerca de "
                                  "44 eventos, mais utm e ids de clique.",)),
        ("Seis formulários", ("Contato, download, material, newsletter, lista "
                              "do app e fale com a gente.",)),
        ("Seis rotas de API", ("Limite por IP em todas. Isca e Turnstile nas "
                               "duas que criam lead.",)),
    )),
    ("Base (Convex)", (
        ("websiteLeads", ("Contato, origem, consentimentos com data e versão, "
                          "status e dono.",)),
        ("growthAcquisitionTouches", ("Histórico de toque, nunca sobrescrito. "
                                      "A origem real mora aqui.",)),
        ("growthLifecycleEvents", ("O ledger dos 42 eventos de ciclo de vida, "
                                   "sem repetição.",)),
        ("growthAutomationTasks", ("A obrigação que o evento criou. É o que a "
                                   "fila do dia mostra.",)),
    )),
    ("Canais", (
        ("Resend, e-mail", ("25 modelos, 9 automações, 3 tópicos. Teto de "
                            "2 disparos por semana.",)),
        ("WhatsApp, via YCloud", ("Primeira mensagem por modelo aprovado, "
                                  "a Bia dentro da janela de 24 horas.",)),
        ("Voz, ElevenLabs por Twilio", ("Só com código de 6 dígitos "
                                        "conferido. 2 tentativas por semana.",)),
        ("SMS, SMSdev", ("Ligado e travado: sem o segredo do webhook, "
                         "a fila não anda.",)),
    )),
    ("Comercial", (
        ("Central comercial", ("Nove telas com endereço próprio, de Agora "
                               "a Métricas.",)),
        ("Telegram", ("Grupo de vendas e grupo de operações, com botão de "
                      "abrir o lead.",)),
        ("E-mail interno", ("Mesma mensagem, outro destino. Recibo e "
                            "dedupe por entrega.",)),
        ("Prazo: 15 minutos", ("O prazo do aviso é o mesmo da tarefa e o "
                               "mesmo do lead.",)),
    )),
)


def map_page(c: canvas.Canvas, page: int) -> None:
    c.setPageSize(landscape(A4))
    bg(c, PAPER, LAND_W, LAND_H)

    y = LAND_H - 44
    c.setFont("PoppinsSemiBold", 7)
    c.setFillColor(FAINT)
    c.drawString(M, y, "O SISTEMA INTEIRO")
    y -= 24
    c.setFont("Lora", 22)
    c.setFillColor(INK_STRONG)
    c.drawString(M, y, "O mapa")
    y -= 14
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(M, y, LAND_W - M, y)
    y -= 22

    para(c, "Cada faixa entrega para a seguinte. A última devolve o resultado "
            "para a primeira, e é isso que fecha o custo por cliente.",
         M, y, 620, size=9)

    band_w, gap = 136.0, 18.0
    total = 5 * band_w + 4 * gap
    x0 = (LAND_W - total) / 2
    xs = [x0 + i * (band_w + gap) for i in range(5)]

    top = 452.0
    for x, (label, _boxes) in zip(xs, BANDS):
        band_label(c, x, top + 10, label)

    box_h, box_gap = 68.0, 12.0
    for x, (_label, boxes) in zip(xs, BANDS):
        by = top
        for title, items in boxes:
            box(c, x, by, band_w, box_h, title, items, size=7.8)
            by -= box_h + box_gap

    mid = top - (4 * box_h + 3 * box_gap) / 2
    for i in range(4):
        arrow(c, xs[i] + band_w + 2, mid, xs[i + 1] - 3, mid)

    bottom = top - (4 * box_h + 3 * box_gap)
    back_y = bottom - 36
    arrow(c, xs[4] + band_w, back_y, xs[0] + band_w / 2, back_y,
          head=False, dash=True)
    arrow(c, xs[0] + band_w / 2, back_y, xs[0] + band_w / 2, bottom - 3,
          dash=True)

    c.setFont("PoppinsSemiBold", 6.8)
    c.setFillColor(FAINT)
    c.drawString(M, back_y - 16, "A VOLTA")
    para(c, "A venda é devolvida para a plataforma que a pagou: Meta pela "
            "Conversions API, Google pelo Data Manager, TikTok por CRM Events. "
            "Só sai com consentimento de anúncio registrado. A captura do lead "
            "nunca é reenviada, porque o Pixel do site já contou.",
         M + 62, back_y - 16, LAND_W - 2 * M - 62, size=8)

    foot(c, page, LAND_W)


# ---------------------------------------------------------------- 03 · anúncios

def ads_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Mídia paga", "Anúncios")
    y = para(c, "A Flowo anuncia em três plataformas: Meta, Google e TikTok. "
                "Não existe uma quarta no código. O que cada uma aguenta é "
                "diferente, e a diferença decide o que dá para medir.",
             M, y, CONTENT_W * 0.82)
    y -= 16

    y = table(c, y, (("Capacidade", 132), ("Meta", 120), ("Google", 124),
                     ("TikTok", 127)),
              (("Formulário de lead", "sim, busca os campos na Graph API",
                "sim, os campos já vêm no aviso",
                "sim, busca o lead na API"),
               ("Leitura de gasto", "sim, e é a única que chega hoje",
                "existe no código, mas falta a credencial",
                "existe no código, mas falta a credencial"),
               ("Conversão de volta", "sim, Conversions API",
                "sim, Data Manager", "sim, CRM Events"),
               ("Público", "sim, sincroniza",
                "desligado por flag e por termos não aceitos",
                "bloqueado no código: exige 1.000 identificadores")),
              size=7.9)

    y -= 14
    y = section(c, y, "As seis portas de entrada de lead pago", size=13)
    y -= 2
    y = table(c, y, (("Porta", 132), ("Como entra", 371)),
              (("Meta Lead Ads",
                "O aviso cai na mesma rota do WhatsApp da Meta, que depois "
                "busca os campos na Graph API."),
               ("Meta Click-to-WhatsApp",
                "O id do clique vem no metadado da mensagem recebida. Esta "
                "porta está morta: falta FLOWO_MARKETING_ORGANIZATION_ID em "
                "produção e a rotina sai na primeira linha."),
               ("TikTok Lead Ads",
                "Webhook próprio com token. Precisa de TIKTOK_ADS_ACCESS_TOKEN "
                "para buscar o lead, e essa variável não existe em produção."),
               ("Google Lead Form Ads",
                "Webhook próprio com chave. Os campos já vêm no aviso, sem "
                "chamada de API."),
               ("Google Conversational Ads",
                "Mesma rota da anterior. Não é reconhecido como lead nativo, "
                "então cai na regra de lead de site."),
               ("Clique para o site",
                "Não existe ingestão. O lead nasce do formulário e a origem "
                "vem do utm guardado no navegador.")),
              size=7.9)

    y -= 12
    y = para(c, "As cinco portas nativas passam por uma porta única e "
                "idempotente, deduplicada por plataforma mais id do lead. "
                "Lead nativo sem e-mail e sem telefone válido é gravado como "
                "inválido e segue.", M, y, CONTENT_W, size=8.5, leading=12.4)
    y -= 12

    left_w = 240.0
    right_x = M + left_w + 23
    ly = block(c, M, y, left_w, "Para onde a conversão volta",
               "Lead nativo devolve só para a plataforma que coletou o "
               "consentimento. Lead de site devolve para as três. A captura "
               "do lead nunca volta para lugar nenhum.")
    ly = block(c, M, ly, left_w, "Os oito eventos que viram conversão",
               "Lead qualificado, demonstração feita, cadastro concluído, "
               "pagamento, tenant ativado, assinatura cancelada e estorno. O "
               "oitavo é a captura do lead, e é o único que nunca sai. "
               "Primeira agenda concluída e tenant reativado, os dois melhores "
               "sinais de cliente bom, também não voltam.")
    ry = block(c, right_x, y, left_w, "O gasto",
               "Janela de 31 dias, todo dia às 10h45 UTC. Meta e Google são "
               "assumidos em real; só o TikTok lê a moeda da API. Sem "
               "credencial, a leitura devolve lista vazia em silêncio, sem "
               "erro e sem incidente.")
    ry = block(c, right_x, ry, left_w, "O que está desligado hoje",
               "Cancelamento e estorno nunca chegam ao Google: o ajuste de "
               "conversão está desligado por flag. O público do Google não "
               "sincroniza, por flag e por termos. O do TikTok é bloqueado "
               "pelo próprio código.")
    foot(c, page)


# ---------------------------------------------------------------- 04 · campanhas

def campaigns_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Antes de gastar", "Campanhas")
    y = para(c, "Nada é publicado nem recebe orçamento sem passar por aqui. "
                "A tela Campanhas gera, revisa e aprova. Publicar continua "
                "sendo trabalho de gente, dentro da plataforma de anúncio.",
             M, y, CONTENT_W * 0.82)
    y -= 16

    left_w = 240.0
    right_x = M + left_w + 23
    ly = block(c, M, y, left_w, "Creative Studio",
               "Uma tela de super-admin gera o pacote de criativos: texto, "
               "briefing e as UTMs de cada variante. Não publica nada em "
               "plataforma nenhuma. Objetivos: gerar lead, puxar conversa no "
               "WhatsApp, converter no site e remarketing. Canais: Instagram "
               "feed, reels e stories, TikTok, Google Search e Performance Max.")
    ly = block(c, M, ly, left_w, "A trava de copy",
               "O gerador recusa uma lista de palavras: AI, revolucion, "
               "potencialize, destrave, ecossistema, solução 360, agenda "
               "lotada, responde na hora, garantia, aumente faturamento. Exige "
               "pelo menos duas notas de conformidade e respeita os limites do "
               "Google Search, título até 30 caracteres e texto até 90. Se o "
               "modelo falhar, entra um texto editorial de reserva, marcado "
               "como reserva. Erro nenhum chega ao operador.")
    ly = block(c, M, ly, left_w, "A chave da campanha",
               "O utm_campaign nasce do nome mais a data, com até 70 "
               "caracteres. Desde 3 de setembro, gasto e lead são agrupados "
               "pela mesma chave canônica, e a tela Links de campanha monta o "
               "link já com ela. O destino sai de uma lista de rotas reais, "
               "para não mandar tráfego pago para uma página que não existe.")

    ry = block(c, right_x, y, left_w, "O preflight da página",
               "Antes de aprovar, o sistema busca a URL final com quatro "
               "identidades: navegador Chrome, Googlebot, o robô da Meta e o "
               "do TikTok. Confere resposta 200, tipo HTML, se nenhuma das "
               "quatro UTMs se perdeu no redirecionamento, ausência de "
               "noindex, canonical, título entre 30 e 65 caracteres com a "
               "palavra flowo, descrição entre 90 e 170, as tags de "
               "compartilhamento, idioma pt-br, ao menos um bloco de dados "
               "estruturados e 200 caracteres de texto visível.")
    ry = block(c, right_x, ry, left_w, "Validade: 24 horas",
               "Passou disso, o preflight caduca. E se alguém mexer numa UTM, "
               "caduca na hora, porque a assinatura conferida inclui todas as "
               "UTMs de todas as variantes. Ele nunca roda sozinho: é sempre "
               "pedido pela tela.")
    ry = block(c, right_x, ry, left_w, "O que a aprovação exige",
               "Preflight vigente mais dez itens marcados: página aprovada, "
               "página revisada, prova de produto, todas as variantes "
               "revisadas, público e consentimento, contrato de conversão, "
               "teto de orçamento, segurança de cobrança, regras de pausa, "
               "dono e prazo.")

    y = min(ly, ry) - 6
    rule(c, y, color=GRID, width=0.8)
    y -= 22
    y = section(c, y, "Orçamento e recomendação", size=13)
    y -= 2
    y = para(c, "Janela fixa de 30 dias. A receita considerada é o que entrou "
                "menos o que foi estornado. O custo por cliente é por tenant "
                "ativado, não por lead nem por pagamento. O retorno é receita "
                "dividida por gasto.", M, y, CONTENT_W, size=8.5, leading=12.4)
    y -= 12
    y = table(c, y, (("Situação em 30 dias", 190), ("Recomendação", 100),
                     ("Por quê", 213)),
              (("Menos de 3 tenants ativados", "sem dados",
                "amostra pequena demais para decidir qualquer coisa"),
               ("Retorno 3 ou mais, com 5 ativações", "aumentar",
                "eficiência comprovada com amostra suficiente"),
               ("Retorno abaixo de 1,2", "reduzir",
                "sai mais dinheiro do que volta"),
               ("O resto", "manter",
                "dentro da faixa em que não vale mexer")),
              size=7.9)
    y -= 12
    para(c, "Trava de segurança: as seis entradas do cálculo são lidas até "
            "5.000 linhas cada. Se qualquer uma passar disso, o cálculo para "
            "inteiro e abre incidente crítico, em vez de entregar um número "
            "pela metade. A recomendação nunca mexe no orçamento das "
            "campanhas: ela só lê e sugere.",
         M, y, CONTENT_W, size=8.5, leading=12.4)
    foot(c, page)


# ---------------------------------------------------------------- 05 · rastreio

def tracking_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Quem mede o quê", "Rastreio")
    y = para(c, "Duas ferramentas de medição, com papéis diferentes. O Segment "
                "é o remetente, no navegador e no servidor. O PostHog é "
                "destino, e no painel também é remetente.",
             M, y, CONTENT_W * 0.82)
    y -= 16

    left_w = 240.0
    right_x = M + left_w + 23
    c.setFont("PoppinsSemiBold", 6.8)
    c.setFillColor(FAINT)
    c.drawString(M, y, "SEGMENT")
    c.drawString(right_x, y, "POSTHOG")
    y -= 6
    rule(c, y, M, M + left_w, color=GRID, width=0.8)
    rule(c, y, right_x, right_x + left_w, color=GRID, width=0.8)
    y -= 20

    ly = block(c, M, y, left_w, "No navegador do site",
               "Só carrega depois do aceite analítico, e reconfere o cookie a "
               "cada chamada, não o estado da tela. O identificador é o "
               "anonymousId do próprio Segment, e é ele que viaja para o "
               "painel com as UTMs e os ids de clique de Meta, Google, TikTok "
               "e Click-to-WhatsApp. São cerca de 44 nomes de evento no site.")
    ly = block(c, M, ly, left_w, "No servidor",
               "Duas mensagens por lead: um identify com status, origem e os "
               "quatro consentimentos, e um evento Lead Captured, que manda "
               "apenas tem e-mail e tem telefone, nunca o contato em si. Os "
               "42 eventos de ciclo de vida saem por outra rota.")
    ly = block(c, M, ly, left_w, "As chaves",
               "NEXT_PUBLIC_SEGMENT_WRITE_KEY no site, SEGMENT_SERVER_WRITE_KEY "
               "no servidor, EXPO_PUBLIC_SEGMENT_WRITE_KEY no app. A quarta, "
               "SEGMENT_GROWTH_WRITE_KEY, está em produção e não é lida por "
               "nenhuma linha de código.")

    ry = block(c, right_x, y, left_w, "O site não carrega PostHog",
               "Zero ocorrências no repositório da landing. O PostHog só "
               "recebe o que o Segment encaminha para ele.")
    ry = block(c, right_x, ry, left_w, "No painel",
               "Perfil só para quem é identificado, visita de página por "
               "mudança de histórico, captura automática de clique e envio de "
               "formulário, e gravação de sessão com os campos mascarados. "
               "Não lê consentimento nenhum: inicia assim que a tela monta. No "
               "mesmo painel, o Pixel da Meta e o Google Measurement leem o "
               "cookie antes de subir.")
    ry = block(c, right_x, ry, left_w, "No servidor e na leitura",
               "Dezesseis pontos de captura no backend, quase sempre "
               "identificados pela organização. O botão que verifica a jornada "
               "do lead exige POSTHOG_QUERY_API_KEY e POSTHOG_PROJECT_ID; as "
               "duas faltam em produção, então ele responde não configurado. "
               "Nunca funcionou.")

    y = min(ly, ry) - 4
    rule(c, y, color=GRID, width=0.8)
    y -= 22
    y = section(c, y, "O mesmo fato, com nomes diferentes", size=13)
    y -= 2
    y = table(c, y, (("Fato", 118), ("Como ele chega", 210), ("Situação", 175)),
              (("Lead confirmado",
                "Lead Form Succeeded no site, Lead Captured no servidor, "
                "lead_captured no ledger",
                "três nomes e dois identificadores que nunca se juntam"),
               ("Cadastro concluído",
                "signup_completed sai do ledger e também do painel",
                "chega duas vezes, com identificadores diferentes: a taxa "
                "fica inflada"),
               ("Quem é a pessoa",
                "anonymousId no site, website-lead:id no servidor, id do "
                "Clerk no painel",
                "o painel grava user_2abc e o ledger grava user:user_2abc. "
                "São duas pessoas lá dentro")),
              size=7.9)

    y -= 8
    y = section(c, y, "Quem responde cada pergunta", size=13)
    y -= 2
    y = table(c, y, (("Pergunta", 172), ("Onde está a resposta de verdade", 331)),
              (("De onde veio este lead?",
                "A tabela de toques de aquisição, que nunca é sobrescrita. A "
                "UTM que o painel mostra pode ter sido apagada"),
               ("Ele viu o preço?",
                "A tabela de sinais, e só para quem já é lead, aceitou cookie "
                "e é o único lead daquele navegador"),
               ("Quanto custou cada cliente?",
                "A recomendação de orçamento: só mídia paga, só por tenant "
                "ativado, e hoje só com o gasto da Meta")),
              size=7.9)
    foot(c, page)


# ---------------------------------------------------------------- 06 · consentimento

def consent_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "A porta de tudo", "Consentimento")
    y = para(c, "O aviso de cookies decide o que pode ser rastreado, e é "
                "anterior a qualquer coisa. Sem aceite, não há origem para "
                "guardar.", M, y, CONTENT_W * 0.82)
    y -= 14

    y = block(c, M, y, CONTENT_W, "Como funciona na prática",
              "Três categorias: necessário, analítico e marketing. A escolha "
              "vai para o cookie cookieConsent, e a data, a versão do texto e "
              "o navegador vão para um segundo cookie. Versão 1.0, validade de "
              "365 dias. É gravado duas vezes, no próprio domínio e em "
              ".flowo.com.br, para o painel ler a mesma escolha que o site. O "
              "padrão nega tudo. A trilha de auditoria fica só no console do "
              "navegador, sem registro no servidor.")

    y = table(c, y, (("Momento", 128), ("O que dispara", 375)),
              (("Antes do aceite",
                "O padrão do Google, com tudo negado e sem chamada de rede. O "
                "Sentry, cinco segundos depois do carregamento, sem porta de "
                "consentimento. As fontes, que já vêm do próprio domínio."),
               ("Com aceite analítico",
                "Google Analytics 4 e o Segment."),
               ("Com aceite de marketing",
                "Google Ads, Pixel da Meta e Pixel do TikTok."),
               ("Nunca antes do aceite",
                "Segment, Pixel da Meta, Google Analytics, Google Ads, Pixel "
                "do TikTok e PostHog. Conferido um a um.")),
              size=7.9)

    y -= 14
    y = section(c, y, "São cinco consentimentos, e eles não se misturam", size=13)
    y -= 2
    y = table(c, y, (("Consentimento", 108), ("De onde vem", 250),
                     ("Versão", 145)),
              (("Anúncio",
                "do cookie de marketing, lido no servidor na hora da captura. "
                "Não é caixa de seleção", "1.0, informada pelo cliente"),
               ("E-mail", "caixa de seleção do formulário", "2026-07-30"),
               ("SMS e WhatsApp", "caixas de seleção do formulário",
                "a mesma de e-mail"),
               ("Voz",
                "só a conferência de um código de 6 dígitos enviado para "
                "aquele telefone", "voice-sales-contact-v1")),
              size=7.9)

    y -= 14
    left_w = 240.0
    right_x = M + left_w + 23
    ly = block(c, M, y, left_w, "Recusar cookie não tira ninguém do e-mail",
               "E isso está certo: são finalidades diferentes. A entrada na "
               "nutrição depende do opt-in de e-mail, não do cookie. O que a "
               "recusa custa é outra coisa: o lead fica sem origem, fora do "
               "teste A/B, sem os sinais de 'viu preço', e nenhuma conversão "
               "dele volta para Meta, Google ou TikTok.")
    ry = block(c, right_x, y, left_w, "A rede de proteção tem buraco",
               "O audit de consentimento roda no build e faz oito "
               "verificações, todas sobre TikTok e sobre a lista de destinos "
               "do Segment. Ele não olha Meta, Google Ads, Google Analytics "
               "nem PostHog, e é leitura de texto, não navegador. Retirar o "
               "consentimento também não apaga os cookies do próprio Segment: "
               "o TikTok tem essa limpeza, o Segment não tem.")

    y = min(ly, ry) - 4
    rule(c, y, color=GRID, width=0.8)
    y -= 20
    y = section(c, y, "Sair é tão registrado quanto entrar", size=13)
    y -= 2
    y = para(c, "Cada canal tem o seu próprio opt-out gravado com data: "
                "e-mail, SMS e WhatsApp, mais uma supressão para quando o "
                "provedor devolve a mensagem. E só com consentimento de "
                "anúncio registrado a captura gera o id de evento e repassa "
                "IP, navegador e endereço de origem. Sem ele, nenhuma "
                "conversão desse lead volta para lugar nenhum.",
             M, y, CONTENT_W, size=8.6, leading=12.6)
    y -= 10
    para(c, "Detalhe a corrigir: a versão do consentimento de anúncio vem do "
            "navegador, enquanto a de e-mail é fixa no servidor.",
         M, y, CONTENT_W, size=8.6, leading=12.6)
    foot(c, page)


# ---------------------------------------------------------------- 07 · captura

def capture_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Onde o lead nasce", "Captura")
    y = para(c, "Seis rotas de API no site, todas rodando em São Paulo. Só as "
                "duas primeiras criam lead.", M, y, CONTENT_W * 0.82)
    y -= 14

    y = table(c, y, (("Rota", 150), ("Limite por IP", 72), ("Defesas", 92),
                     ("O que faz", 189)),
              (("lead-capture", "15 por minuto", "isca e Turnstile",
                "cria o lead. O texto de origem vem do cliente"),
               ("contact-form", "10 por minuto", "isca e Turnstile",
                "cria o lead com origem fixa contact:site"),
               ("growth-signal", "60 por minuto", "nenhuma",
                "grava sinal de comportamento, não cria lead"),
               ("growth-experiment", "30 por minuto", "nenhuma",
                "atribui variante de teste, não cria lead"),
               ("voice-verification/request", "5 por minuto", "isca",
                "manda o código de 6 dígitos"),
               ("voice-verification/confirm", "10 por minuto", "nenhuma",
                "grava a permissão de ligação")),
              size=7.9)

    y -= 14
    y = para(c, "Seis formulários apontam para as duas primeiras rotas: o "
                "modal de contato, o modal de download, o formulário de "
                "material, a newsletter do rodapé, a lista de espera do app e "
                "o Fale com a gente. Cada um grava um texto de origem "
                "diferente, e é esse texto que decide a trilha de e-mail e os "
                "tópicos que o lead recebe.", M, y, CONTENT_W, size=8.5,
             leading=12.4)
    y -= 14

    left_w = 240.0
    right_x = M + left_w + 23
    ly = block(c, M, y, left_w, "Como o lead é reconhecido",
               "A chave de contato é o telefone, se houver, senão o e-mail em "
               "minúsculas. O telefone só perde a máscara: não força o 55, não "
               "valida DDD, não vira padrão internacional. Existe uma função "
               "que faz tudo isso no repositório, e a captura não a usa.")
    ly = block(c, M, ly, left_w, "A consequência",
               "O mesmo número com e sem o código do país vira dois leads. O "
               "Fale com a gente é o único formulário que grava sem o 55. Os "
               "dois leads correm sequências independentes, porque todo freio "
               "é por lead, e a resposta da pessoa cai só na linha mais "
               "recente.")
    ly = block(c, M, ly, left_w, "E-mail repetido",
               "Se o telefone for compatível, atualiza o lead que já existe. "
               "Se os telefones se contradizem, insere um lead novo com o "
               "mesmo e-mail, e o painel esconde justamente esse par.")

    ry = block(c, right_x, y, left_w, "A porta do site e a do anúncio não são iguais",
               "O caminho do anúncio é idempotente, não tem limite de taxa, "
               "aceita lead sem nome, grava contato inválido em vez de "
               "recusar, concede os três tópicos de e-mail e preserva a UTM "
               "que já existia. O caminho do site exige nome e consentimento, "
               "tem limite por contato, e apaga a UTM quando o campo chega "
               "vazio.")
    ry = block(c, right_x, ry, left_w, "Duas defesas frágeis",
               "O Turnstile falha aberto: sem a chave secreta, a verificação "
               "responde que passou. E o limite por IP só é global quando o "
               "Redis está configurado; sem ele, cai para a memória de cada "
               "instância, ou seja, quase nenhum limite.")
    ry = block(c, right_x, ry, left_w, "Seis lugares inserem lead",
               "O site, os webhooks de anúncio, a resposta de e-mail, a "
               "entrada de WhatsApp, o cadastro autenticado e o ensaio interno "
               "de saúde de dados. Os dois primeiros nascem como novo, os dois "
               "do meio já nascem como contatado.")

    y = min(ly, ry) - 4
    rule(c, y, color=GRID, width=0.8)
    y -= 20
    y = section(c, y, "Como o sistema escolhe qual lead atualizar", size=13)
    y -= 4
    bullets(c, y, (
        "Busca em paralelo pela chave de contato exata, pelo e-mail e por até "
        "três variantes do telefone.",
        "Descarta quem se contradiz: dois e-mails diferentes, ou dois "
        "telefones que não casam em variante nenhuma. Campo ausente nunca "
        "contradiz.",
        "Prefere, nessa ordem: o exato compatível, o que casa telefone, o que "
        "casa e-mail, e por fim o único que sobrou.",
        "Devolve também a lista dos leads em conflito, e quem chama ignora "
        "essa lista. É por isso que a duplicata contraditória não aparece na "
        "tela do lead.",
    ))
    foot(c, page)


# ---------------------------------------------------------------- 08 · nutrição

def nurture_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "E-mail", "Nutrição no Resend")
    y = para(c, "São 25 modelos e 9 automações, e os números são travados por "
                "verificação no script que publica tudo. Um lead entra em uma "
                "automação, nunca em duas pelo caminho normal.",
             M, y, CONTENT_W * 0.82)
    y -= 14

    c.setFont("PoppinsSemiBold", 6.8)
    c.setFillColor(FAINT)
    c.drawString(M, y, "OS 25 MODELOS, POR TRILHA")
    y -= 6
    rule(c, y, color=GRID, width=0.8)
    y -= 14
    tracks = (
        "Venda, 6: boas-vindas A e B, rotina, operação, objeções e fechamento.",
        "Material, 4 · Lista do app, 2 · Institucional, 3 · Conteúdo prático, 3.",
        "Newsletter, 1: A Semana da Barbearia · Oferta, 2 · Jornadas, 4.",
    )
    for line in tracks:
        y = para(c, line, M, y, CONTENT_W, size=8.5, leading=12.4)
        y -= 2
    y -= 12

    y = table(c, y, (("Automação", 168), ("Gatilho", 158), ("E-mails", 42),
                     ("Dias a partir do gatilho", 135)),
              (("Intenção, ramo venda (padrão)", "flowo.lead.marketing_opt_in",
                "5", "0, 4, 8, 12 e 16"),
               ("Intenção, ramo material", "o mesmo gatilho, jornada resource",
                "4", "0, 4, 8 e 12"),
               ("Intenção, ramo lista do app",
                "o mesmo gatilho, jornada app_waitlist", "2", "0 e 8"),
               ("Institucional", "flowo.lead.institutional_start", "3",
                "0, 4 e 8"),
               ("Conteúdo prático", "flowo.lead.content_start", "3",
                "0, 8 e 16"),
               ("A Semana da Barbearia", "flowo.lead.newsletter", "1", "0"),
               ("Ofertas comerciais", "flowo.lead.promotion_start", "1", "0"),
               ("Jornadas: retomar cadastro, valor "
                "semanal, recuperação e winback",
                "flowo.lead.journey mais o nome da jornada", "1 cada",
                "0, no momento do disparo")),
              size=7.9)

    y -= 12
    left_w = 240.0
    right_x = M + left_w + 23
    ly = block(c, M, y, left_w, "Os três tópicos",
               "Conteúdo, produto e ofertas. Quem baixa um material recebe só "
               "conteúdo, então toda campanha posterior, institucional, "
               "jornada ou oferta, é pulada com o motivo tópico recusado. "
               "Tópicos são somados, nunca reduzidos.")
    ly = block(c, M, ly, left_w, "Quem assina a newsletter não recebe a newsletter",
               "O cadastro do rodapé cai na automação de Conteúdo prático. A "
               "automação da newsletter só é disparada um lead por vez, na "
               "mão, pelo painel. Não existe cron de edição.")

    ry = block(c, right_x, y, left_w, "O teto de pressão",
               "Uma sequência institucional ou de conteúdo ativa bloqueia tudo "
               "por 24 dias. Fora isso: no máximo 2 disparos em 7 dias, 1 "
               "newsletter em 7 dias, 2 promoções em 30 dias, e nada "
               "institucional ou promocional a menos de 48 horas de uma "
               "newsletter. Na prática, 2 e-mails de marketing na primeira "
               "semana.")
    ry = block(c, right_x, ry, left_w, "O que faz o lead sair",
               "Descadastro de um clique, mudança de preferências, resposta "
               "por e-mail, WhatsApp ou SMS, pagamento, tenant ativado, "
               "contato humano no painel, pausa manual, ganho ou perdido, "
               "unificação de identidade e exclusão de conta. O buraco: o "
               "aviso de parada só é emitido para quem entrou pela trilha de "
               "opt-in, então um cliente que acabou de pagar pode continuar "
               "recebendo prospecção.")

    ly = block(c, M, ly, left_w, "Quantos e-mails na primeira semana",
               "Quem entra pela trilha de venda ou de material recebe dois até "
               "o dia 7, no dia 0 e no dia 4. Quem entra pela lista do app ou "
               "pela newsletter do rodapé recebe um, no dia 0, e o próximo só "
               "chega no dia 8. Pela política de pressão dá para chegar a três "
               "numa semana, porque newsletter não arma o bloqueio de 24 dias. "
               "Fora disso vem o transacional: um e-mail por material, num "
               "catálogo de 23.")

    foot(c, page)


# ---------------------------------------------------------------- 09 · canais

def channels_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Além do e-mail", "WhatsApp, voz e SMS")
    y = para(c, "Não existe orquestrador de canal. Cada rotina decide por si, "
                "e quem decide de verdade é o lead marcando caixas no "
                "formulário. A única política de pressão que existe é de "
                "e-mail.", M, y, CONTENT_W * 0.82)
    y -= 14

    y = block(c, M, y, CONTENT_W, "WhatsApp",
              "Tudo sai do número oficial da Flowo, pela YCloud. São três "
              "coisas diferentes: a primeira mensagem automática, que exige "
              "modelo aprovado pela Meta e hoje está aprovada; a Bia "
              "respondendo dentro da janela de 24 horas, sem modelo; e a "
              "reescrita por IA, em que o texto determinístico é sempre o de "
              "reserva e o link de contratação é trocado por um token antes de "
              "ir para o modelo. Para um humano abrir conversa é preciso "
              "janela de 24 horas aberta, pedido explícito de contato ou "
              "consentimento de marketing. Ter o telefone nunca é permissão.")

    y = block(c, M, y, CONTENT_W, "Voz",
              "ElevenLabs discando por Twilio, e está ligado. Sete condições, "
              "todas obrigatórias: telefone brasileiro válido, lead nem ganho "
              "nem perdido, permissão de menos de 90 dias na versão de texto "
              "atual, sem pedido de não ligar, menos de 4 tentativas na vida e "
              "menos de 2 em 7 dias, e horário de segunda a sexta, das 9h às "
              "18h de São Paulo. A permissão só nasce da conferência de um "
              "código de 6 dígitos: o formulário público grava apenas um "
              "pedido pendente. A fila roda a cada 15 minutos, com 5 ligações "
              "por execução, 40 por dia e 4 horas entre rediscagens. Toda "
              "decisão, inclusive a de não ligar, vira linha com o motivo.")

    y = block(c, M, y, CONTENT_W, "SMS",
              "SMSdev, ligado por flag e travado na prática. Falta o segredo "
              "do webhook em produção, então o contrato de liberação fica em "
              "provedor não configurado e o cron sai na primeira linha. Só que "
              "a inscrição continua enfileirando mensagens, que ficam paradas "
              "para sempre. Pior: uma entrega parada põe o lead na lista de "
              "quem tem automação em andamento, então o painel diz que ele "
              "está coberto quando não está.")

    y -= 2
    y = section(c, y, "Os tetos, um por canal, sem nada entre eles", size=13)
    y -= 2
    y = table(c, y, (("Canal", 150), ("Teto", 353)),
              (("E-mail de campanha", "2 disparos em 7 dias"),
               ("E-mail de nutrição",
                "sem teto semanal. É idempotente pelo instante do "
                "consentimento, não por evento"),
               ("WhatsApp, primeira mensagem",
                "sem repetição para o mesmo pedido, e 5 pedidos por hora por "
                "contato"),
               ("Voz",
                "2 tentativas em 7 dias, 4 na vida, 4 horas entre elas, "
                "40 por dia no total"),
               ("SMS", "5 por dia no total, em lotes de 1")),
              size=7.9)
    y -= 12
    y = para(c, "Somando: um lead pode receber e-mail, WhatsApp e ligação no "
                "mesmo dia, e nada no código impede isso.",
             M, y, CONTENT_W, size=8.5, leading=12.4)
    y -= 16
    y = section(c, y, "O que ainda trava esses canais", size=13)
    y -= 4
    bullets(c, y, (
        "O teto de gasto do agente de voz é US$ 5,00, e a reserva por ligação "
        "também é US$ 5,00. Ou trava tudo depois da primeira ligação com "
        "custo, ou nunca trava.",
        "A Bia tem nove ferramentas na ligação, de buscar o contexto do lead a "
        "encerrar a chamada, mas não pode mandar link de contratação: o modelo "
        "não está aprovado. As ligações também não são gravadas.",
        "O SMS previsto era curto: duas mensagens na trilha de venda, em duas "
        "horas e em quatro dias, e uma só nas outras. Nenhuma saiu.",
    ))
    foot(c, page)


# ---------------------------------------------------------------- 10 · qualificação

def qualify_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Passagem para vendas", "Qualificação")
    y = para(c, "O lead tem cinco estados: novo, contatado, qualificado, ganho "
                "e perdido. Não existe régua de qualificação: qualificado é o "
                "que a Bia ou um operador decidiu.", M, y, CONTENT_W * 0.82)
    y -= 14

    left_w = 240.0
    right_x = M + left_w + 23
    ly = block(c, M, y, left_w, "Quem escreve 'qualificado'",
               "O evento de qualificação do funil, quatro ferramentas do "
               "agente de voz (atualizar qualificação, marcar demonstração, "
               "passar para um humano e pedir teste), a Bia no WhatsApp quando "
               "conclui que qualificou, e o operador no painel. O critério da "
               "Bia mora no texto do agente, não em regra de negócio.")
    ly = block(c, M, ly, left_w, "Existe pontuação, e ela não qualifica ninguém",
               "Pedido de demonstração e cadastro começado valem 5 pontos, "
               "preço e comparação valem 3, caso valem 2, material vale 1, com "
               "teto de 100. Ela só é gravada se o navegador resolver para "
               "exatamente um lead, e o número não aparece em nenhuma tela do "
               "painel. Não decide canal, prioridade nem aviso.")
    ly = block(c, M, ly, left_w, "O que o código trata como quente",
               "Não é a pontuação, é uma regra de exclusão: o lead é quente se "
               "não pediu material, se a origem não é newsletter, e se não veio "
               "de uma conversa que a Bia já atende no WhatsApp. Só ela cria a "
               "tarefa urgente de 15 minutos e interrompe o grupo de vendas.")

    ry = block(c, right_x, y, left_w, "Quem é avisado, e como",
               "Um ponto único de publicação manda o mesmo aviso para dois "
               "destinos em paralelo: e-mail interno e Telegram. Cada entrega "
               "tem recibo, não se repete, e um destino que falhou tenta de "
               "novo em 30 segundos. No Telegram vai título em negrito, a "
               "ação, o trecho que a pessoa escreveu, o telefone e dois "
               "botões: abrir o lead e chamar no WhatsApp.")
    ry = block(c, right_x, ry, left_w, "O prazo de 15 minutos é real",
               "Não é frase de efeito. É o mesmo prazo carimbado na tarefa de "
               "follow-up e no próprio lead. Quando não dá para prometer "
               "resposta, o texto muda: um lead que chegou sem telefone e sem "
               "e-mail vira aviso de alerta, com a frase 'ninguém consegue "
               "responder'.")
    ry = block(c, right_x, ry, left_w, "O dono do lead",
               "Vem de um e-mail configurado, se essa pessoa for super-admin "
               "ativa, senão do primeiro super-admin em ordem alfabética. "
               "Determinístico, nunca sorteado. Um dono que já existe nunca é "
               "sobrescrito, e não existe rodízio, escalada nem expiração em "
               "lugar nenhum do backend. A única troca é manual.")

    y = min(ly, ry) - 6
    rule(c, y, color=GRID, width=0.8)
    y -= 20
    y = section(c, y, "O que move o estado do lead", size=13)
    y -= 2
    y = table(c, y, (("Evento", 150), ("O que ele faz", 353)),
              (("Lead qualificado",
                "carimba a data e põe em qualificado, a não ser que já esteja "
                "ganho ou perdido"),
               ("Pagamento recebido",
                "carimba a data e pausa o marketing"),
               ("Tenant ativado",
                "põe em ganho, limpa a próxima ação e pausa o marketing"),
               ("Contatado",
                "só é escrito quando o lead nasce de uma resposta por e-mail "
                "ou por WhatsApp"),
               ("Reabertura",
                "um lead perdido só volta para novo se for reconhecido pelo "
                "mesmo navegador")),
              size=7.9)

    y -= 16
    y = section(c, y, "O que o time lê no Telegram", size=13)
    y -= 4
    bullets(c, y, (
        "Fulano pediu contato pelo site. Responder em até 15 minutos. Prefere "
        "WhatsApp.",
        "Fulano chegou por anúncio no Meta. Lead novo na fila comercial. "
        "Ninguém do time falou com ele ainda.",
        "Fulano pediu para testar antes de assinar. Responder hoje. A Bia não "
        "prometeu teste nenhum.",
    ), size=8.4)
    foot(c, page)


# ---------------------------------------------------------------- 11 · central

def central_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Onde o time trabalha", "A Central comercial")
    y = para(c, "Até 3 de setembro era uma página só, com nove estados "
                "guardados por dentro: o endereço nunca mudava e recarregar "
                "jogava fora o lugar do operador. Agora cada destino é uma "
                "rota de verdade, com link.", M, y, CONTENT_W * 0.86)
    y -= 14

    y = table(c, y, (("Tela", 96), ("Grupo", 62), ("O que ela responde", 345)),
              (("Agora", "Trabalho",
                "Quem precisa de atenção, por quê e qual é a próxima ação"),
               ("Leads", "Trabalho",
                "Todos os contatos vindos do site, e quem precisa avançar"),
               ("Pipeline", "Trabalho",
                "A evolução das oportunidades, sem duplicar contato entre "
                "etapas"),
               ("Trials", "Trabalho",
                "A próxima ação, o primeiro valor entregue e a conversão, sem "
                "conta sem responsável"),
               ("Voz", "Canais",
                "Ligações autorizadas, decisões da fila e passagens para o "
                "time"),
               ("Campanhas", "Canais",
                "Preparar e revisar campanha. Nada é publicado nem recebe "
                "orçamento sem aprovação"),
               ("Automações", "Saúde",
                "Jornadas com gatilho claro, consentimento visível e saída "
                "segura"),
               ("Métricas", "Análise",
                "Aquisição, ativação e receita, sem misturar com a fila do "
                "dia"),
               ("Sistemas", "Saúde",
                "Conexões, eventos e falhas, fora da rotina comercial")),
              size=7.9)

    y -= 14
    left_w = 240.0
    right_x = M + left_w + 23
    ly = block(c, M, y, left_w, "Mais três telas novas",
               "Links de campanha monta o link rastreado com a chave canônica "
               "e destino de uma lista de rotas reais. Avisos troca o grupo do "
               "Telegram de cada fila sem precisar de deploy, com a variável "
               "de ambiente virando só reserva. E a exclusão de lead apaga a "
               "cascata inteira, exige um motivo escrito e recusa lead com "
               "checkout pago.")
    ry = block(c, right_x, y, left_w, "Cuidado com o nome",
               "Duas telas se chamam Leads e são coisas diferentes: a de "
               "aquisição lista os contatos vindos do site, e a de plataforma "
               "lista os pedidos internos de upgrade, que nem têm o estado "
               "qualificado. Existe ainda a tela de detalhe de um lead, que "
               "não é uma das nove.")

    y = min(ly, ry) - 4
    rule(c, y, color=GRID, width=0.8)
    y -= 20
    y = section(c, y, "O que roda sozinho, sem ninguém abrir tela", size=13)
    y -= 4
    y = para(c, "São 14 rotinas agendadas só no domínio de aquisição.",
             M, y, CONTENT_W, size=8.5, leading=12.4)
    y -= 8

    crons_left = (
        "Fila de SMS, a cada 5 minutos",
        "Jornadas automatizadas, a cada 5 minutos",
        "Reconciliação de públicos, a cada 5 minutos",
        "Recuperação de entregas travadas, a cada 15 minutos",
        "Fila de ligações, a cada 15 minutos",
        "Status das campanhas nas plataformas, a cada 15 minutos",
        "Auditoria de saúde de dados, a cada 30 minutos",
    )
    crons_right = (
        "Reconciliação dos modelos de WhatsApp, a cada 30 minutos",
        "Varredura de checkout abandonado, de hora em hora",
        "Lembrete de leads parados, de hora em hora",
        "Importação de gasto de mídia, uma vez por dia",
        "Avaliação de saúde, uma vez por dia",
        "Criação dos experimentos do site, uma vez por dia",
        "Identidade oficial do WhatsApp, uma vez por dia",
    )
    cy = y
    for item in crons_left:
        cy = para(c, item, M, cy, left_w, size=8.4, leading=12.2)
        cy -= 1
    ry2 = y
    for item in crons_right:
        ry2 = para(c, item, right_x, ry2, left_w, size=8.4, leading=12.2)
        ry2 -= 1

    y = min(cy, ry2) - 10
    para(c, "Quatro rodam quase à toa: a auditoria de saúde faz 48 varreduras "
            "completas da base por dia; o status das campanhas faz 96 "
            "execuções sem detectar mudança; o experimento cria um rascunho "
            "que nunca roda; e a fila de SMS roda 288 vezes por dia numa fila "
            "que não anda.", M, y, CONTENT_W, size=8.5, leading=12.4)
    foot(c, page)


# ---------------------------------------------------------------- 12 · tabelas

def tables_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Onde o dado mora", "As tabelas")
    y = para(c, "O domínio de growth define 43 tabelas no Convex. Estas são as "
                "que guardam o caminho do lead.", M, y, CONTENT_W * 0.82)
    y -= 14

    y = table(c, y, (("Tabela", 176), ("O que guarda", 327)),
              (("websiteLeads",
                "A linha durável do lead: contato, origem, todos os "
                "consentimentos com data e versão, marcos, status e dono"),
               ("growthAcquisitionTouches",
                "Todo toque de aquisição, nunca sobrescrito. É a única fonte "
                "que não perde a origem, e nenhuma tela a usa como principal"),
               ("growthLeadBrowserIdentities",
                "Cada navegador consentido, ligado ao lead"),
               ("growthAdInboundEvents",
                "O recibo idempotente do webhook de lead de anúncio"),
               ("growthLifecycleEvents",
                "O ledger canônico dos 42 eventos de ciclo de vida, sem "
                "repetição"),
               ("growthAutomationTasks",
                "A obrigação criada por um evento, como o follow-up de 15 "
                "minutos. É o que a fila do dia mostra"),
               ("growthBehaviorSignals",
                "Viu preço, viu comparação, viu caso, pediu demonstração, "
                "começou cadastro, viu material"),
               ("websiteLeadCampaignDispatches",
                "Cada disparo de campanha de e-mail. É o que a trava de "
                "pressão conta"),
               ("websiteLeadWhatsAppDispatches",
                "Modelos enviados e respostas da Bia dentro da janela de "
                "sessão"),
               ("websiteLeadSmsDeliveries", "Os envios de SMS. Hoje, a fila parada"),
               ("growthVoiceCalls e as três tabelas ao lado",
                "Ligações, eventos dentro da ligação, a prova legal do "
                "consentimento de voz e o motivo de cada decisão da fila"),
               ("websiteLeadAdConversions",
                "Uma linha por plataforma por evento, com status, tentativas "
                "e erro"),
               ("growthAdSpendSnapshots e growthBudgetRecommendations",
                "O gasto por dia e por campanha, e o custo por cliente com a "
                "recomendação"),
               ("growthAdCreativePacks",
                "Os pacotes do Creative Studio, com checklist e preflight"),
               ("growthDataHealthIncidents",
                "Os incidentes abertos pela varredura de saúde de dados"),
               ("growthIdentityLinks e growthIdentityConflicts",
                "A ponte entre lead, usuário e organização, e os conflitos "
                "detectados na passagem"),
               ("growthLeadPhoneVerifications",
                "O código de posse do telefone: guardado com sal, uso único, "
                "cinco tentativas em dez minutos"),
               ("growthJourneys e growthJourneyExecutions",
                "A jornada automatizada instanciada, e cada passo executado"),
               ("growthAudienceMemberships",
                "A quem o lead pertence em cada público: interno, Meta, "
                "Google e TikTok. Duas dessas linhas nascem condenadas"),
               ("growthEmailContactBlocks",
                "Bloqueio de e-mail: descadastro, devolução e reclamação"),
               ("growthAttributionOutcomes",
                "O resultado atribuído a uma origem e a uma campanha, com "
                "valor"),
               ("growthAiUsage",
                "O custo de IA do agente comercial da Flowo, separado do "
                "custo de IA de cada cliente"),
               ("internalNotificationDeliveries e ...Routes",
                "Recibo, dedupe e destino dos avisos internos"),
               ("salesCheckoutIntents",
                "A passagem do lead qualificado para o checkout")),
              size=7.9, pad=5)
    foot(c, page)


# ---------------------------------------------------------------- 13 · flags

def flags_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "O estado da produção", "Ligado e desligado")
    y = para(c, "Lido no ambiente de produção em 3 de setembro. Só nomes de "
                "variável: nenhum valor de segredo aparece aqui.",
             M, y, CONTENT_W * 0.82)
    y -= 14

    c.setFont("PoppinsSemiBold", 6.8)
    c.setFillColor(FAINT)
    c.drawString(M, y, "LIGADO")
    y -= 12
    y = table(c, y, (("Variável", 258), ("O que ela liga", 245)),
              (("RESEND_LEAD_AUTOMATION_ENABLED",
                "a nutrição por e-mail dispara de verdade"),
               ("GROWTH_AD_SPEND_SYNC_ENABLED",
                "importa gasto de mídia, mas só o da Meta chega"),
               ("META_ADS_CONVERSIONS_ENABLED", "a conversão volta para a Meta"),
               ("GOOGLE_ADS_CONVERSIONS_ENABLED",
                "a conversão volta para o Google, sem modo de validação"),
               ("TIKTOK_ADS_CONVERSIONS_ENABLED",
                "a conversão volta para o TikTok, sem modo de validação"),
               ("META_ADS_AUDIENCE_SYNC_ENABLED", "o público da Meta sincroniza"),
               ("FLOWO_GROWTH_VOICE_SDR_ENABLED",
                "o agente de voz liga para leads, inclusive de teste"),
               ("FLOWO_SALES_WHATSAPP_SDR_START_ENABLED",
                "a primeira mensagem automática de WhatsApp sai"),
               ("FLOWO_SALES_WHATSAPP_AI_ENABLED",
                "a Bia reescreve as respostas antes de mandar"),
               ("LEAD_MARKETING_SMS_ENABLED",
                "SMS de marketing ligado, e travado por falta de transporte"),
               ("MARKETING_BILLING_ENABLED",
                "cobrança de mensagem de marketing. O AGENTS.md descreve essa "
                "flag como travada até decisão do fundador, e em produção ela "
                "está ligada. Vale confirmar se é intencional")),
              size=7.9, pad=5)

    y -= 16
    c.setFont("PoppinsSemiBold", 6.8)
    c.setFillColor(FAINT)
    c.drawString(M, y, "DESLIGADO")
    y -= 12
    y = table(c, y, (("Variável", 258), ("O que fica de fora", 245)),
              (("GOOGLE_ADS_CONVERSION_ADJUSTMENTS_ENABLED",
                "cancelamento e estorno nunca voltam para o Google"),
               ("GOOGLE_ADS_AUDIENCE_SYNC_ENABLED",
                "o público do Google não sincroniza"),
               ("GOOGLE_CUSTOMER_MATCH_TERMS_ACCEPTED",
                "o mesmo público, agora por termos não aceitos"),
               ("FLOWO_VOICE_CHECKOUT_TEMPLATE_APPROVED",
                "a Bia não pode mandar link de contratação na ligação"),
               ("FLOWO_VOICE_RECORDING_ENABLED", "as ligações não são gravadas"),
               ("LEAD_MARKETING_WHATSAPP_ENABLED",
                "nada. Nenhum código de execução lê essa variável")),
              size=7.9, pad=5)

    y -= 16
    c.setFont("PoppinsSemiBold", 6.8)
    c.setFillColor(FAINT)
    c.drawString(M, y, "QUEM É O PROVEDOR DE CADA COISA")
    y -= 12
    y = table(c, y, (("Variável", 258), ("Valor em produção", 245)),
              (("WHATSAPP_DEFAULT_PROVIDER", "ycloud"),
               ("SMS_PROVIDER", "smsdev"),
               ("FLOWO_VOICE_PROVIDER", "elevenlabs_twilio")),
              size=7.9, pad=5)

    y -= 14
    para(c, "E o que simplesmente não existe em produção: "
            "GOOGLE_ADS_DEVELOPER_TOKEN e TIKTOK_ADS_ACCESS_TOKEN, sem os quais "
            "o gasto dessas duas plataformas nunca é importado; "
            "FLOWO_MARKETING_ORGANIZATION_ID, sem o qual o Click-to-WhatsApp "
            "não captura lead nenhum; SMS_PROVIDER_WEBHOOK_SECRET, que trava o "
            "SMS; POSTHOG_QUERY_API_KEY e POSTHOG_PROJECT_ID, sem as quais a "
            "verificação de jornada nunca funcionou; e SALES_LEAD_EMAIL, sem a "
            "qual o aviso de lead quente cai na mesma caixa dos alertas de "
            "infraestrutura.", M, y, CONTENT_W, size=8.5, leading=12.4)
    foot(c, page)


# ---------------------------------------------------------------- 14 · furos

MONEY_HOLES = (
    ("Click-to-WhatsApp nunca captura lead",
     "Falta a variável da organização de marketing, e a rotina sai na primeira "
     "linha. Uma das seis portas de lead pago está morta.", "Dinheiro"),
    ("Gasto do Google e do TikTok nunca é importado",
     "Sem as credenciais, a leitura devolve lista vazia em silêncio. O custo "
     "por cliente de duas das três plataformas é impossível, e nenhum "
     "incidente é aberto.", "Dinheiro"),
    ("Cancelamento e estorno nunca voltam para o Google",
     "O ajuste de conversão está desligado, então o Google segue otimizando "
     "para comprar quem cancela.", "Dinheiro"),
    ("O formulário de contato nunca vira conversão",
     "A rota não passa consentimento de anúncio, id de evento, IP nem "
     "navegador. Para o algoritmo dos anúncios, o lead de maior intenção do "
     "site não existe.", "Dinheiro"),
    ("Segundo envio do formulário apaga a origem e a qualificação",
     "Campo vazio remove o que estava lá: some a UTM, o nome da empresa, o "
     "número de profissionais e o prazo de compra. O caminho do anúncio faz o "
     "contrário e preserva.", "Dinheiro"),
    ("Cadastro pelo app nasce sem origem",
     "O aplicativo manda três campos no cadastro, mesmo com a campanha "
     "guardada no aparelho. O site manda o pacote inteiro.", "Dinheiro"),
    ("Lead de material nunca pode receber oferta",
     "A captura concede só o tópico de conteúdo, então toda campanha comercial "
     "posterior é pulada. É a maior fonte de lead do site.", "Dinheiro"),
    ("Orçamento do agente de voz igual à reserva por ligação",
     "US$ 5,00 de teto contra US$ 5,00 reservados por ligação. Ou trava tudo "
     "depois da primeira ligação com custo, ou nunca trava.", "Dinheiro"),
    ("Público de exclusão do Google desligado",
     "Quem já assinou continua vendo anúncio de aquisição. É dinheiro gasto "
     "para reconquistar quem já é cliente.", "Dinheiro"),
    ("A moeda do gasto é assumida como real",
     "Só o TikTok lê a moeda da API. Meta e Google entram fixados em real. Se "
     "a conta não for em real, o custo por cliente está errado e nada acusa.",
     "Dinheiro"),
)

LEAD_HOLES = (
    ("A mesma pessoa vira dois leads",
     "O telefone não é normalizado na captura, então o número com e sem o "
     "código do país gera chaves diferentes. Histórico partido, nutrição "
     "dobrada no mesmo inbox, e a resposta cai só numa das linhas.", "Lead"),
    ("SMS ligado sem transporte, e a fila parada conta como automação",
     "Nada sai, e mesmo assim o painel marca o lead como coberto por "
     "automação, escondendo quem está sem cobertura nenhuma.", "Lead"),
    ("Lead qualificado não cria tarefa nem aviso",
     "Sem data de próxima ação, ele some da fila, do aviso e do resumo diário. "
     "É o lead mais quente do funil.", "Lead"),
    ("O dono do lead nunca é reatribuído nem escalado",
     "É sempre a mesma pessoa, e não existe rodízio, escalada ou expiração em "
     "todo o backend. Se ela não responder, nada muda.", "Lead"),
    ("O sinal de 'viu preço' é jogado fora para quem ainda não é lead",
     "E também quando dois leads dividem o mesmo navegador. Perde-se o sinal "
     "mais quente do funil, justamente antes da conversa.", "Lead"),
    ("E-mail barrado pela trava de pressão é descartado, não reagendado",
     "A data de reenvio chega a ser calculada e gravada no texto do erro, e "
     "ninguém a usa. O toque de recuperação some de vez.", "Lead"),
    ("Cliente que pagou continua recebendo prospecção",
     "O aviso de saída da nutrição só é emitido para quem entrou pela trilha "
     "de opt-in. Quem entrou por campanha nunca gera parada.", "Reputação"),
    ("O painel roda PostHog sem consentimento",
     "Com gravação de sessão, cookies e captura automática, e sem banner. No "
     "mesmo painel, o Pixel da Meta e o Google Measurement leem o cookie.",
     "Risco legal"),
    ("Retirar o consentimento não apaga os cookies do Segment",
     "O script já injetado continua lá, e os dois cookies de identidade "
     "também. O TikTok tem essa limpeza e é exigida pelo audit; o Segment "
     "não tem.", "Risco legal"),
    ("O identify do Segment manda e-mail, nome e telefone",
     "Em seis formulários, sob consentimento apenas analítico, não de "
     "marketing. O evento de track, esse manda só tem e-mail e tem telefone.",
     "Risco legal"),
)


def holes_page(c: canvas.Canvas, page: int, *, title: str, intro: str,
               items: tuple[tuple[str, str, str], ...]) -> None:
    bg(c)
    y = head(c, "Diagnóstico", title)
    y = para(c, intro, M, y, CONTENT_W * 0.86, size=9)
    y -= 12
    rule(c, y, color=GRID, width=0.8)
    y -= 15

    kind_x = PAGE_W - M
    for name, detail, kind in items:
        c.setFont("PoppinsSemiBold", 9.0)
        c.setFillColor(INK_STRONG)
        c.drawString(M, y, name)
        c.setFont("PoppinsSemiBold", 6.6)
        c.setFillColor(FAINT)
        c.drawRightString(kind_x, y + 0.5, kind.upper())
        y -= 12
        y = para(c, detail, M, y, CONTENT_W - 66, size=8.4, leading=12.0)
        y -= 10
        rule(c, y)
        y -= 14
    foot(c, page)


def money_holes_page(c: canvas.Canvas, page: int) -> None:
    holes_page(c, page, title="Onde o dinheiro se perde",
               intro="Dos 58 pontos apurados, 43 passam o corte de custar "
                     "dinheiro, perder lead ou criar risco legal, com "
                     "evidência no código ou no ambiente. Estes dez custam "
                     "mídia paga, e quase nenhum faz barulho quando falha.",
               items=MONEY_HOLES)


def lead_holes_page(c: canvas.Canvas, page: int) -> None:
    holes_page(c, page, title="Onde o lead se perde",
               intro="Os outros dez que mais pesam. Seis custam lead, um custa "
                     "reputação de envio, e três são risco legal, no sentido "
                     "de fazer no painel o que o site promete não fazer.",
               items=LEAD_HOLES)


# ---------------------------------------------------------------- 15 · honesto

UNKNOWNS = (
    ("As variáveis do lado da Vercel",
     "A leitura de ambiente do Convex não alcança a landing nem as rotas de "
     "API do painel. Ficam sem conferência a chave do Turnstile, as três do "
     "e-mail de entrada do Resend, a chave do webhook do Google e os três ids "
     "de pixel. Se as do Resend faltarem, toda resposta de lead por e-mail "
     "está sendo descartada em silêncio."),
    ("Se as automações do Resend estão ligadas hoje",
     "Confirmar exige a chave de produção do Resend, que não foi usada."),
    ("O volume real",
     "Quantos leads, quantos e-mails, quantos SMS presos, quantos leads "
     "qualificados sem próxima ação e quantas duplicatas com o mesmo e-mail. "
     "Exige consultar dados de produção."),
    ("Se o webhook de voz manda custo",
     "É o que decide qual dos dois defeitos do orçamento de voz está ativo "
     "hoje: travar depois da primeira ligação, ou nunca travar."),
    ("Se o grupo de vendas no Telegram recebe mesmo",
     "Depende do bot estar dentro do grupo. Só se prova olhando o grupo."),
    ("Se a moeda das contas de anúncio é real",
     "Meta e Google são assumidos em real pelo código. Se as contas forem em "
     "real, esse ponto não existe na prática."),
    ("O critério de qualificação da Bia",
     "Está no texto do agente, não em regra de negócio, e não foi lido nesta "
     "rodada."),
    ("Se o Segment entrega mesmo no PostHog",
     "Os destinos configurados na fonte do site só aparecem no console do "
     "Segment, e ele não foi aberto nesta rodada."),
    ("Se o dono padrão dos leads é super-admin ativo",
     "O e-mail está configurado, mas a lista de super-admins é dado de "
     "produção. Se ele não estiver na lista, o dono cai no primeiro "
     "super-admin em ordem alfabética."),
    ("Se a cobrança de marketing ligada é intencional",
     "O AGENTS.md descreve a flag como travada até decisão do fundador. Em "
     "produção ela está ligada. Só o fundador sabe se foi decisão."),
)


def unknowns_page(c: canvas.Canvas, page: int) -> None:
    bg(c)
    y = head(c, "Honestidade", "O que não sabemos")
    y = para(c, "Um documento que só afirma o que conferiu vale mais do que um "
                "que afirma tudo. Isto aqui ficou de fora, e o motivo está ao "
                "lado.", M, y, CONTENT_W * 0.82)
    y -= 16

    y = table(c, y, (("Item", 172), ("Por que ficou sem resposta", 331)),
              tuple(UNKNOWNS), size=7.9)

    y -= 18
    rule(c, y + 8, color=GRID, width=0.8)
    y = section(c, y - 8, "Como isto foi apurado", size=13)
    y -= 4
    y = para(c, "Tudo o que está neste documento foi lido no código do "
                "monorepo e da landing, ou no ambiente de produção, em 3 de "
                "setembro de 2026. A leitura de produção foi feita com o "
                "comando de listar variáveis do Convex, e nenhum valor de "
                "segredo foi copiado para lugar nenhum: só nomes de variável e "
                "valores de configuração que não são segredo.",
             M, y, CONTENT_W, size=8.6, leading=12.6)
    y -= 12
    y = para(c, "Cinco pontos foram corrigidos no próprio dia 3 e não contam "
                "como furo aberto: o custo por campanha, que agora agrupa "
                "gasto e lead pela mesma chave; o destino do Telegram, que "
                "virou tela e não exige mais deploy; a Central comercial, que "
                "virou nove rotas de verdade; o motivo escrito quando um aviso "
                "interno falha; e a exclusão de lead, que passou a existir.",
             M, y, CONTENT_W, size=8.6, leading=12.6)
    y -= 12
    para(c, "Onde a fonte é um relatório de auditoria e não a leitura direta, "
            "o número foi conferido de novo antes de entrar aqui. Onde os dois "
            "discordaram, vale o código.",
         M, y, CONTENT_W, size=8.6, leading=12.6)
    foot(c, page)


# ---------------------------------------------------------------- build

PAGE_TITLES = [
    "Capa",
    "O mapa",
    "Anuncios",
    "Campanhas",
    "Rastreio",
    "Consentimento",
    "Captura",
    "Nutricao no Resend",
    "WhatsApp, voz e SMS",
    "Qualificacao",
    "A Central comercial",
    "As tabelas",
    "Ligado e desligado",
    "Onde o dinheiro se perde",
    "Onde o lead se perde",
    "O que nao sabemos",
]


def build() -> Path:
    base.ensure_fonts()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUTPUT_DIR / "flowo-caminho-do-lead.pdf"
    c = canvas.Canvas(str(path), pagesize=A4)
    c.setTitle(f"Flowo · {DOC_TITLE}")
    c.setAuthor("Flowo")
    c.setSubject("Growth OS: o caminho do lead, do anúncio à venda")

    cover(c)
    c.showPage()

    map_page(c, 2)
    c.showPage()
    c.setPageSize(A4)

    for index, draw in enumerate((
        ads_page, campaigns_page, tracking_page, consent_page, capture_page,
        nurture_page, channels_page, qualify_page, central_page, tables_page,
        flags_page, money_holes_page, lead_holes_page, unknowns_page,
    ), start=3):
        draw(c, index)
        c.showPage()

    c.save()

    add_accessible_tags(path, title=f"Flowo - {DOC_TITLE}",
                        page_titles=PAGE_TITLES)
    return path


if __name__ == "__main__":
    print(build())
