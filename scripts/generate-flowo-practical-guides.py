#!/usr/bin/env python3
"""Generate the production Flowo practical-guide PDF collection."""

from __future__ import annotations

import importlib.util
import shutil
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urlencode

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfdoc import PDFString
from reportlab.pdfgen import canvas

from tagged_pdf import add_accessible_tags


ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = ROOT / "scripts" / "generate-lead-magnet-mockups.py"
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "downloads"

spec = importlib.util.spec_from_file_location("flowo_pdf_base", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Não foi possível importar {BASE_SCRIPT}")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

PAGE_W, PAGE_H = A4
M = 42
CONTENT_W = PAGE_W - 2 * M

# Same tokens the site renders: ink and cream, no third colour. These sheets get
# printed, so contrast and hairlines carry the hierarchy instead of fills.
INK = HexColor("#171811")
INK_STRONG = HexColor("#10100A")
CREAM = HexColor("#F6F6F3")
PAPER = HexColor("#FCFBF9")
SURFACE_2 = HexColor("#F1F0EC")
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#595852")
FAINT = HexColor("#6F6F69")
LINE = HexColor("#DCDBD7")
GRID = HexColor("#C7C5BF")  # table rules, a step darker so they survive printing

# Footer sits at 30pt, so a page's content may run down to here.
CONTENT_FLOOR = 76


@dataclass(frozen=True)
class Guide:
    slug: str
    collection_name: str
    title: str
    subtitle: str
    cover_label: str
    cover_items: tuple[str, ...]
    use_intro: str
    use_steps: tuple[tuple[str, str, str], ...]
    before_start: str
    audit_title: str
    audit_intro: str
    audit_items: tuple[tuple[str, str], ...]
    framework_title: str
    framework_intro: str
    framework: tuple[tuple[str, str, str], ...]
    worksheet_title: str
    worksheet_intro: str
    worksheet_columns: tuple[tuple[str, float], ...]
    worksheet_note: str
    test_title: str
    test_intro: str
    scenarios: tuple[str, ...]
    plan_title: str
    plan_intro: str
    plan: tuple[tuple[str, str, str], ...]
    flowo_intro: str
    flowo_points: tuple[str, ...]
    disclaimer: str
    keywords: str
    cta_path: str
    cover_prompt: str = "Preencha com a rotina real da sua barbearia."
    how_to_title: str = "Faça com quem vive a rotina."
    framework_rule: str = (
        "Se a equipe não consegue explicar, a regra ainda não está pronta."
    )
    worksheet_rows: tuple[tuple[str, ...], ...] = ()


GUIDES = (
    Guide(
        slug="comissoes-sem-planilha-flowo",
        collection_name="COMISSÕES SEM PLANILHA",
        title="Comissões sem\nplanilha paralela",
        subtitle=(
            "Um caderno de acerto para combinar regras, conferir comandas e "
            "fechar o mês sem discussão."
        ),
        cover_label="GUIA + FOLHAS DE CONFERÊNCIA",
        cover_items=(
            "Regra escrita antes do cálculo",
            "Conferência por barbeiro",
            "Tratamento de desconto e estorno",
            "Fechamento com responsável",
        ),
        use_intro=(
            "Preencha este guia com quem define as regras e com quem faz o acerto. "
            "Uma porcentagem sozinha não explica como a comissão funciona."
        ),
        use_steps=(
            ("01", "Combine", "Escreva a regra antes de calcular o primeiro atendimento."),
            ("02", "Registre", "Use a comanda fechada como origem do serviço realizado."),
            ("03", "Confira", "Revise desconto, estorno, produto e adiantamento separadamente."),
            ("04", "Feche", "Mostre a memória de cálculo antes de confirmar o pagamento."),
        ),
        before_start=(
            "Este material organiza o acerto interno. Ele não substitui contrato, "
            "folha de pagamento, orientação contábil ou trabalhista."
        ),
        audit_title="Onde o acerto costuma dar problema?",
        audit_intro=(
            "Marque o que acontece hoje. Um item marcado já indica uma regra que "
            "precisa sair da memória e ir para o papel."
        ),
        audit_items=(
            ("Regra", "A porcentagem muda conforme quem faz o cálculo."),
            ("Base", "Não está claro se desconto reduz a base da comissão."),
            ("Produto", "Venda de pomada ou bebida entra junto com o serviço."),
            ("Estorno", "Cancelamento depois do fechamento fica para o mês seguinte."),
            ("Adiantamento", "Valores antecipados são descontados sem um registro comum."),
            ("Conferência", "O barbeiro só vê o total quando o pagamento já foi feito."),
        ),
        framework_title="Uma regra que cabe numa frase",
        framework_intro=(
            "Para cada tipo de venda, responda cinco perguntas. Se uma resposta muda, "
            "crie uma regra separada."
        ),
        framework=(
            ("01", "O que entra?", "Serviço, produto, combo ou bônus."),
            ("02", "Qual é a base?", "Valor cheio ou valor depois do desconto."),
            ("03", "Qual percentual?", "Regra do barbeiro para aquele item."),
            ("04", "Quando conta?", "Comanda fechada, recebida ou outra condição."),
            ("05", "Como corrigir?", "Estorno, falta, erro e adiantamento."),
        ),
        worksheet_title="Ficha de regra por barbeiro",
        worksheet_intro=(
            "Use uma linha para cada regra. Coloque a data de início quando houver "
            "mudança de percentual."
        ),
        worksheet_columns=(
            ("BARBEIRO", 105),
            ("ITEM", 105),
            ("BASE", 82),
            ("%", 45),
            ("INÍCIO", 75),
            ("APROVOU", 75),
        ),
        worksheet_note=(
            "Não apague a regra antiga. Encerre a vigência e abra uma nova para "
            "preservar a conferência dos meses anteriores."
        ),
        test_title="Conferência antes do pagamento",
        test_intro=(
            "Escolha comandas reais já fechadas e refaça a conta. O resultado esperado "
            "precisa bater com a memória apresentada ao barbeiro."
        ),
        scenarios=(
            "Corte sem desconto",
            "Corte + barba com percentuais iguais",
            "Combo com desconto",
            "Produto vendido junto com serviço",
            "Comanda estornada depois do fechamento",
            "Adiantamento registrado no período",
        ),
        plan_title="Fechamento em sete passos",
        plan_intro=(
            "A ordem evita que o pagamento aconteça antes da conferência. Adapte as "
            "datas à rotina da sua barbearia."
        ),
        plan=(
            ("01", "Fechar comandas", "Confirme atendimentos e formas de pagamento."),
            ("02", "Travar período", "Defina até qual data entra no acerto."),
            ("03", "Aplicar regras", "Use a vigência correta de cada barbeiro."),
            ("04", "Separar ajustes", "Liste descontos, estornos e adiantamentos."),
            ("05", "Compartilhar", "Entregue a memória de cálculo para conferência."),
            ("06", "Resolver diferenças", "Corrija com registro e responsável."),
            ("07", "Confirmar pagamento", "Guarde data, valor e quem aprovou."),
        ),
        flowo_intro=(
            "Na Flowo, o atendimento fechado na comanda pode alimentar a conferência "
            "de comissão conforme as regras e o plano contratados."
        ),
        flowo_points=(
            "Comanda liga serviço, barbeiro, valor e forma de pagamento.",
            "Regras de comissão ficam associadas ao profissional.",
            "A equipe autorizada acompanha o acerto no painel.",
            "A decisão trabalhista e contábil continua com a barbearia.",
        ),
        disclaimer=(
            "Recursos de equipe e comissão variam por plano e configuração. "
            "Confirme o que está incluído antes de contratar."
        ),
        keywords="barbearia, comissões, barbeiros, comanda, acerto, Flowo",
        cta_path="/recursos/comissoes-barbeiros",
    ),
    Guide(
        slug="clientes-na-hora-de-voltar-flowo",
        collection_name="CLIENTES NA HORA DE VOLTAR",
        title="Clientes na hora\nde voltar",
        subtitle=(
            "Um plano de 30 dias para organizar contatos de retorno sem spam, "
            "desconto automático ou promessa de agenda cheia."
        ),
        cover_label="PLANO DE CONTATO RESPONSÁVEL",
        cover_items=(
            "Escolha de público com critério",
            "Mensagem curta e reconhecível",
            "Frequência e consentimento",
            "Retorno medido até a comanda",
        ),
        use_intro=(
            "Comece com um grupo pequeno e verificável. Registre por que cada pessoa "
            "pode receber o contato e acompanhe o resultado antes do próximo ciclo."
        ),
        use_steps=(
            ("01", "Filtre", "Retire quem já agendou, pediu para sair ou foi chamado recentemente."),
            ("02", "Escreva", "Diga quem está falando, por que chamou e qual é o próximo passo."),
            ("03", "Revise", "Confira consentimento, horário de envio e situação do cliente."),
            ("04", "Meça", "Separe mensagem enviada de atendimento realmente concluído."),
        ),
        before_start=(
            "Não use lista comprada. Não invente urgência. Não mande promoção para "
            "quem não autorizou contato ou já pediu para não receber."
        ),
        audit_title="Sua lista está pronta para contato?",
        audit_intro=(
            "Marque o que ainda precisa ser conferido. Na dúvida, não envie até a "
            "barbearia saber por que aquele cliente está na lista."
        ),
        audit_items=(
            ("Identidade", "Nome e telefone pertencem ao cliente correto."),
            ("Consentimento", "Existe base válida para o contato e opção de sair."),
            ("Agenda", "O cliente não possui um horário futuro confirmado."),
            ("Frequência", "Não houve outro contato recente pelo mesmo motivo."),
            ("Atendimento", "Não existe conversa humana aberta esperando resposta."),
            ("Horário", "O envio respeita a janela definida pela barbearia."),
        ),
        framework_title="Quatro partes de uma boa mensagem",
        framework_intro=(
            "A mensagem precisa parecer enviada pela barbearia que o cliente conhece. "
            "Curta, específica e fácil de responder."
        ),
        framework=(
            ("01", "Identificação", "Nome da barbearia e de quem está falando."),
            ("02", "Motivo", "Tempo desde a visita ou serviço relacionado."),
            ("03", "Convite", "Pergunta simples, sem pressão ou escassez falsa."),
            ("04", "Saída", "Forma clara de não receber novos contatos."),
        ),
        worksheet_title="Fila de retorno para revisão",
        worksheet_intro=(
            "Preencha antes do envio. Registre a base do consentimento, o último "
            "contato e qualquer pedido de saída antes de decidir."
        ),
        worksheet_columns=(
            ("CLIENTE", 72),
            ("ÚLT. VISITA", 62),
            ("SERVIÇO", 58),
            ("ÚLT. CONTATO", 70),
            ("BASE/CONSENT.", 90),
            ("SAÍDA?", 51),
            ("MOTIVO", 68),
            ("ENVIAR", 40),
        ),
        worksheet_note=(
            "Pedido de saída bloqueia o envio. Tempo sem voltar depende do serviço e "
            "do hábito do cliente; trinta dias não é uma regra universal."
        ),
        test_title="Antes de chamar a lista inteira",
        test_intro=(
            "Teste com um grupo pequeno e registre cada etapa. Entrega de mensagem não "
            "é o mesmo que cliente de volta."
        ),
        scenarios=(
            "Cliente respondeu e pediu horários",
            "Cliente já tinha agendamento futuro",
            "Cliente pediu para não receber",
            "Número inválido ou mensagem não entregue",
            "Agendamento criado depois do contato",
            "Atendimento concluído e comanda fechada",
        ),
        plan_title="Plano de 30 dias",
        plan_intro=(
            "Use uma ação por etapa. O objetivo do primeiro ciclo é aprender quais "
            "contatos são úteis e seguros para a sua base."
        ),
        plan=(
            ("01", "Dias 1-3", "Defina público, regra de saída e responsável."),
            ("02", "Dias 4-6", "Revise dados, consentimento e horários futuros."),
            ("03", "Dia 7", "Aprove uma mensagem curta e identificada."),
            ("04", "Dias 8-10", "Envie para um grupo pequeno e acompanhe respostas."),
            ("05", "Dias 11-17", "Registre agendamentos sem insistir em silêncio."),
            ("06", "Dias 18-24", "Confira atendimentos concluídos e comandas."),
            ("07", "Dias 25-30", "Revise resultado, reclamações e próxima regra."),
        ),
        flowo_intro=(
            "Campanhas ajudam a criar um contato pontual. O Flowo Recupera, quando "
            "contratado, organiza oportunidades contínuas para revisão do responsável."
        ),
        flowo_points=(
            "Campanhas usam objetivo, público e mensagem escolhidos pela barbearia.",
            "Flowo Recupera é um adicional opcional, não um plano separado.",
            "O responsável revisa a ação antes do contato proativo.",
            "Resultado só é confirmado depois do atendimento e da comanda fechada.",
        ),
        disclaimer=(
            "Flowo Recupera possui ativação, critérios e limites próprios. "
            "Preço e franquia pública ainda não estão definidos."
        ),
        keywords="barbearia, clientes, retorno, reativação, WhatsApp, Flowo Recupera",
        cta_path="/flowo-recupera",
        cover_prompt="Revise cada contato antes de decidir pelo envio.",
        how_to_title="Comece por uma lista pequena e verificável.",
        framework_rule=(
            "Sem origem, consentimento e contexto, o contato não deve sair."
        ),
    ),
    Guide(
        slug="caixa-e-recebimentos-flowo",
        collection_name="CAIXA E RECEBIMENTOS",
        title="Caixa sem\nconfusão",
        subtitle=(
            "Um guia para separar venda, recebimento, comissão e resultado sem "
            "obrigar sua barbearia a trocar de maquininha."
        ),
        cover_label="GUIA DE FECHAMENTO PÓS-ATENDIMENTO",
        cover_items=(
            "Venda não é o mesmo que dinheiro recebido",
            "Pagamento sempre depois do serviço",
            "Dinheiro e maquininha continuam válidos",
            "Conferência por forma de pagamento",
        ),
        use_intro=(
            "Use este guia no fechamento diário e na revisão semanal. A primeira "
            "meta é explicar cada diferença, não produzir um lucro contábil completo."
        ),
        use_steps=(
            ("01", "Feche", "Finalize a comanda com serviços, produtos e descontos corretos."),
            ("02", "Registre", "Marque a forma em que o dinheiro foi recebido."),
            ("03", "Confira", "Compare caixa, maquininha, PIX e valores pendentes."),
            ("04", "Separe", "Não misture faturamento, comissão, despesa e lucro."),
        ),
        before_start=(
            "Controle de atendimento não substitui contabilidade, conciliação bancária "
            "ou apuração fiscal. Use o contador para obrigações e lucro contábil."
        ),
        audit_title="O que costuma ficar misturado?",
        audit_intro=(
            "Marque as situações que aparecem no seu fechamento. Cada uma pede um "
            "registro próprio antes de comparar o saldo."
        ),
        audit_items=(
            ("Venda", "Atendimento concluído entra como dinheiro antes do recebimento."),
            ("Forma", "Dinheiro, PIX e cartão aparecem juntos sem identificação."),
            ("Taxa", "A taxa da maquininha é descontada sem ficar visível."),
            ("Prazo", "Venda no cartão é tratada como saldo disponível no mesmo dia."),
            ("Comissão", "Acerto do barbeiro é confundido com despesa já paga."),
            ("Fiscal", "Nota emitida é usada como prova de recebimento financeiro."),
        ),
        framework_title="Cinco números diferentes",
        framework_intro=(
            "Eles podem coincidir em alguns dias, mas respondem perguntas diferentes. "
            "Não use um no lugar do outro."
        ),
        framework=(
            ("01", "Vendido", "Valor das comandas fechadas no período."),
            ("02", "Recebido", "Dinheiro que entrou em cada forma de pagamento."),
            ("03", "A receber", "Cartão, cobrança ou valor ainda pendente."),
            ("04", "Ajustes", "Taxa, estorno, desconto e retirada registrada."),
            ("05", "Resultado", "Exige despesas, impostos e critérios contábeis."),
        ),
        worksheet_title="Fechamento diário",
        worksheet_intro=(
            "Preencha uma linha por forma de pagamento. Diferença sem explicação não "
            "deve ser apagada: registre o motivo e o responsável."
        ),
        worksheet_columns=(
            ("FORMA", 105),
            ("SISTEMA", 85),
            ("CONFERIDO", 85),
            ("TAXA", 62),
            ("DIFERENÇA", 80),
            ("RESP.", 75),
        ),
        worksheet_note=(
            "Dinheiro, maquininha própria e pagamentos Flowo podem conviver. "
            "Identifique a origem para conferir cada um no lugar certo."
        ),
        test_title="Casos que o fechamento precisa explicar",
        test_intro=(
            "Faça a conferência com exemplos reais. O objetivo é chegar ao mesmo valor "
            "sem depender da memória de quem fechou o caixa."
        ),
        scenarios=(
            "Comanda paga em dinheiro",
            "Comanda dividida entre PIX e cartão",
            "Cartão com prazo de recebimento",
            "Desconto aplicado depois do serviço",
            "Pagamento estornado",
            "Atendimento concluído com valor pendente",
        ),
        plan_title="Revisão em sete passos",
        plan_intro=(
            "Faça diariamente os primeiros quatro passos. Use os últimos três na "
            "revisão semanal com quem responde pelo financeiro."
        ),
        plan=(
            ("01", "Fechar comandas", "Confirme serviço, produto e desconto."),
            ("02", "Somar por forma", "Separe dinheiro, PIX, cartão e pendência."),
            ("03", "Conferir comprovantes", "Compare sistema, caixa e provedores."),
            ("04", "Explicar diferença", "Registre taxa, estorno ou erro encontrado."),
            ("05", "Separar comissão", "Mostre o valor devido e o valor já pago."),
            ("06", "Revisar fiscal", "Confira emissão conforme município e contador."),
            ("07", "Fechar semana", "Guarde saldo, pendências e responsável."),
        ),
        flowo_intro=(
            "A Flowo conecta a comanda ao registro do recebimento depois do serviço. "
            "A barbearia escolhe se quer ativar PIX ou cartão integrados."
        ),
        flowo_points=(
            "Dinheiro e maquininha própria continuam disponíveis.",
            "Pagamento integrado é opcional e sempre pós-atendimento.",
            "Comanda registra serviço, desconto e forma de pagamento.",
            "Nota fiscal depende do município, dos dados fiscais e da liberação da prefeitura.",
        ),
        disclaimer=(
            "Superfícies fiscais estão em piloto assistido. Disponibilidade real "
            "precisa ser confirmada para o município e o negócio."
        ),
        keywords="barbearia, caixa, pagamentos, PIX, cartão, comanda, Flowo",
        cta_path="/software-barbearia-com-pix",
        cover_prompt="Use números que a equipe consegue reconciliar.",
        how_to_title="Feche o dia com as mesmas definições.",
        framework_rule="Diferença sem origem e responsável continua em aberto.",
    ),
)


def page_bg(c: canvas.Canvas, color=PAPER) -> None:
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def footer(c: canvas.Canvas, guide: Guide, page: int, dark: bool = False) -> None:
    color = base.rgb_with_alpha("#FFFFFF", 0.62) if dark else MUTED
    line = base.rgb_with_alpha("#FFFFFF", 0.18) if dark else LINE
    c.setStrokeColor(line)
    c.line(M, 30, PAGE_W - M, 30)
    c.setFillColor(color)
    c.setFont("PoppinsMedium", 6.2)
    c.drawString(M, 16, f"FLOWO • {guide.collection_name}")
    c.drawRightString(PAGE_W - M, 16, f"{page:02d}")


def header(
    c: canvas.Canvas,
    guide: Guide,
    section: str,
    title: str,
    intro: str,
    page: int,
    *,
    dark: bool = False,
) -> float:
    text = WHITE if dark else INK
    muted = base.rgb_with_alpha("#FFFFFF", 0.64) if dark else MUTED
    base.draw_logo(c, M, PAGE_H - 71, 66)
    c.setFillColor(muted)
    c.setFont("PoppinsSemiBold", 7)
    c.drawRightString(PAGE_W - M, PAGE_H - 54, section.upper())
    c.setFillColor(text)
    c.setFont("Lora", 27)
    y = PAGE_H - 125
    for line in base.wrap_text(title, "Lora", 27, CONTENT_W):
        c.drawString(M, y, line)
        y -= 34
    y = base.paragraph(c, intro, M, y - 5, 446, "Poppins", 8.4, 12, muted)
    footer(c, guide, page, dark=dark)
    return y - 24


def checkbox(c: canvas.Canvas, x: float, y: float, size: float = 12) -> None:
    c.setStrokeColor(INK)
    c.setLineWidth(0.8)
    c.rect(x, y - size + 3, size, size, fill=0, stroke=1)


def writing_lines(
    c: canvas.Canvas, x: float, y: float, width: float, count: int, gap: float = 24
) -> None:
    c.setStrokeColor(LINE)
    for _ in range(count):
        c.line(x, y, x + width, y)
        y -= gap


def fit_columns(columns):
    """Scale declared column widths so the table spans the content width exactly."""
    total = sum(width for _title, width in columns)
    if total <= 0:
        return list(columns)
    factor = CONTENT_W / total
    scaled = [(title, width * factor) for title, width in columns]
    # absorb the rounding drift into the last column
    drift = CONTENT_W - sum(width for _t, width in scaled)
    title, width = scaled[-1]
    scaled[-1] = (title, width + drift)
    return scaled


def grid(
    c: canvas.Canvas,
    x0: float,
    bottom: float,
    top: float,
    columns,
    rows: int,
    height: float,
) -> None:
    """Rules for a fill-in table: verticals between columns, one line per row."""
    c.setStrokeColor(GRID)
    c.setLineWidth(0.7)
    x = x0
    for column_index, (_title, width) in enumerate(columns):
        x += width
        if column_index < len(columns) - 1:
            c.line(x, top, x, bottom)
    for row in range(rows + 1):
        y = top - height * row
        c.line(x0, y, x0 + CONTENT_W, y)


def note_block(
    c: canvas.Canvas,
    y_top: float,
    label: str,
    body: str,
    *,
    dark: bool = False,
    lines: int = 0,
) -> None:
    """The closing note of a page, drawn from the content floor up.

    Anchored to the bottom so every page ends on the same line, and sized by
    its own text so a short note never leaves a hole above the footer.
    """
    height = 34 + 12 * max(1, len(base.wrap_text(body, "PoppinsMedium", 8, CONTENT_W - 36)))
    height += 26 * lines
    height = min(height, max(56.0, y_top - CONTENT_FLOOR))
    top = CONTENT_FLOOR + height
    c.setFillColor(INK if dark else SURFACE_2)
    c.rect(M, CONTENT_FLOOR, CONTENT_W, height, fill=1, stroke=0)
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.6) if dark else FAINT)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, top - 20, label.upper())
    base.paragraph(
        c,
        body,
        M + 18,
        top - 40,
        CONTENT_W - 36,
        "PoppinsMedium",
        8,
        11.5,
        WHITE if dark else INK,
    )
    if lines:
        writing_lines(c, M + 18, CONTENT_FLOOR + 26, CONTENT_W - 36, lines, 26)


def row_height(y_top: float, y_bottom: float, count: int, *, gap: float = 10) -> float:
    """Split the free height between `count` rows so the list fills the page."""
    if count <= 0:
        return 0.0
    return min(96.0, max(44.0, (y_top - y_bottom - gap * (count - 1)) / count))


def list_row(
    c: canvas.Canvas,
    y: float,
    height: float,
    *,
    dark: bool = False,
    fill: bool = True,
) -> None:
    """One row of a list: a quiet surface plus a hairline, never a card."""
    if fill:
        c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.06) if dark else PAPER)
        c.rect(M, y - height, CONTENT_W, height, fill=1, stroke=0)
    c.setStrokeColor(base.rgb_with_alpha("#FFFFFF", 0.16) if dark else LINE)
    c.setLineWidth(0.6)
    c.line(M, y - height, PAGE_W - M, y - height)


def cover(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 76)
    c.setFillColor(MUTED)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M, PAGE_H - 112, guide.cover_label)

    title_lines = guide.title.splitlines()
    band_h = 92 + 43 * len(title_lines)
    band_y = 724 - band_h
    c.setFillColor(INK)
    c.rect(0, band_y, PAGE_W, band_h, fill=1, stroke=0)
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.18))
    c.rect(M, band_y, 1, band_h, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Lora", 36)
    y = band_y + band_h - 62
    for line in title_lines:
        c.drawString(M, y, line)
        y -= 43

    base.paragraph(
        c,
        guide.subtitle,
        M,
        band_y - 42,
        440,
        "PoppinsSemiBold",
        11.5,
        17,
        INK,
    )

    list_top = band_y - 118
    c.setFillColor(FAINT)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M, list_top, "VOCÊ VAI ORGANIZAR")
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    y = list_top - 14
    for index, item in enumerate(guide.cover_items, start=1):
        c.line(M, y, PAGE_W - M, y)
        c.setFillColor(FAINT)
        c.setFont("PoppinsBold", 7)
        c.drawString(M, y - 20, f"{index:02d}")
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 8.6)
        c.drawString(M + 30, y - 20, item)
        y -= 32
    c.line(M, y, PAGE_W - M, y)

    c.setFillColor(INK)
    c.rect(M, CONTENT_FLOOR, CONTENT_W, 84, fill=1, stroke=0)
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.6))
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, CONTENT_FLOOR + 58, "MATERIAL PRÁTICO")
    c.setFillColor(WHITE)
    c.setFont("Lora", 15)
    c.drawString(M + 18, CONTENT_FLOOR + 28, guide.cover_prompt)
    footer(c, guide, 1)
    c.showPage()


def how_to(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, CREAM)
    y = header(c, guide, "Como usar", guide.how_to_title, guide.use_intro, 2)
    note_top = CONTENT_FLOOR + 96
    height = row_height(y, note_top + 24, len(guide.use_steps))
    for number, title, body in guide.use_steps:
        mid = y - height / 2
        list_row(c, y, height)
        c.setFillColor(FAINT)
        c.setFont("PoppinsBold", 8)
        c.drawString(M + 14, mid + 5, number)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 9.2)
        c.drawString(M + 44, mid + 5, title)
        base.paragraph(c, body, M + 44, mid - 12, 430, size=8, leading=11, color=MUTED)
        y -= height + 10

    note_block(c, y, "Antes de começar", guide.before_start, dark=True)
    c.showPage()


def audit(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, PAPER)
    y = header(c, guide, "Diagnóstico", guide.audit_title, guide.audit_intro, 3)
    height = row_height(y, CONTENT_FLOOR, len(guide.audit_items), gap=8)
    for category, prompt in guide.audit_items:
        mid = y - height / 2
        list_row(c, y, height)
        checkbox(c, M + 16, mid + 3, 13)
        c.setFillColor(FAINT)
        c.setFont("PoppinsSemiBold", 6.6)
        c.drawString(M + 46, mid + 8, category.upper())
        base.paragraph(
            c,
            prompt,
            M + 46,
            mid - 10,
            CONTENT_W - 66,
            "PoppinsMedium",
            8.2,
            11,
            INK,
            max_lines=2,
        )
        y -= height + 8
    c.showPage()


def framework(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, INK)
    y = header(
        c,
        guide,
        "Método",
        guide.framework_title,
        guide.framework_intro,
        4,
        dark=True,
    )
    note_top = CONTENT_FLOOR + 84
    height = row_height(y, note_top + 24, len(guide.framework))
    for number, title, body in guide.framework:
        mid = y - height / 2
        list_row(c, y, height, dark=True)
        c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.55))
        c.setFont("PoppinsBold", 8)
        c.drawString(M + 16, mid - 3, number)
        c.setFillColor(WHITE)
        c.setFont("PoppinsSemiBold", 9)
        c.drawString(M + 50, mid - 3, title)
        base.paragraph(
            c,
            body,
            M + 190,
            mid - 3,
            CONTENT_W - 206,
            "Poppins",
            8,
            11,
            base.rgb_with_alpha("#FFFFFF", 0.72),
            max_lines=2,
        )
        y -= height + 10

    height = 84
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.1))
    c.rect(M, CONTENT_FLOOR, CONTENT_W, height, fill=1, stroke=0)
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.6))
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, CONTENT_FLOOR + height - 20, "REGRA DE OURO")
    base.paragraph(
        c,
        guide.framework_rule,
        M + 18,
        CONTENT_FLOOR + height - 40,
        CONTENT_W - 36,
        "PoppinsMedium",
        8.4,
        12,
        WHITE,
        max_lines=2,
    )
    c.showPage()


def worksheet(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, CREAM)
    y = header(
        c,
        guide,
        "Folha de trabalho",
        guide.worksheet_title,
        guide.worksheet_intro,
        5,
    )
    columns = fit_columns(guide.worksheet_columns)
    c.setFillColor(INK)
    c.rect(M, y - 30, CONTENT_W, 30, fill=1, stroke=0)
    x = M
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 6.2)
    for title, width in columns:
        c.drawString(x + 8, y - 19, title)
        x += width
    y -= 30
    note_top = CONTENT_FLOOR + 84
    rows = 6
    height = max(46.0, (y - note_top - 20) / rows)
    table_top, table_bottom = y, y - height * rows

    # Fill first, rule after: a row's fill would otherwise cover the rule above it.
    c.setFillColor(PAPER)
    c.rect(M, table_bottom, CONTENT_W, height * rows, fill=1, stroke=0)
    grid(c, M, table_bottom, table_top, columns, rows, height)

    for row in range(rows):
        row_y = table_top - height * row
        values = guide.worksheet_rows[row] if row < len(guide.worksheet_rows) else ()
        x = M
        for column_index, (_, width) in enumerate(columns):
            if column_index < len(values) and values[column_index]:
                base.paragraph(
                    c,
                    values[column_index],
                    x + 8,
                    row_y - 21,
                    width - 16,
                    "PoppinsMedium",
                    6.6,
                    9,
                    INK,
                    max_lines=2,
                )
            x += width
    y = table_bottom

    note_block(c, y, "Para não perder o histórico", guide.worksheet_note)
    c.showPage()


def test_page(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, PAPER)
    y = header(c, guide, "Conferência", guide.test_title, guide.test_intro, 6)
    columns = fit_columns(
        (("SITUAÇÃO", 240), ("ESPERADO", 125), ("RESP.", 78), ("OK", 42))
    )
    c.setFillColor(INK)
    c.rect(M, y - 30, CONTENT_W, 30, fill=1, stroke=0)
    x = M
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 6.2)
    for title, width in columns:
        c.drawString(x + 8, y - 19, title)
        x += width
    y -= 30
    rows = len(guide.scenarios)
    height = max(48.0, (y - CONTENT_FLOOR) / max(1, rows))
    table_top, table_bottom = y, y - height * rows
    c.setFillColor(PAPER)
    c.rect(M, table_bottom, CONTENT_W, height * rows, fill=1, stroke=0)
    grid(c, M, table_bottom, table_top, columns, rows, height)

    for index, scenario in enumerate(guide.scenarios):
        row_y = table_top - height * index
        base.paragraph(
            c,
            scenario,
            M + 10,
            row_y - 24,
            columns[0][1] - 20,
            "PoppinsMedium",
            7.6,
            10,
            INK,
            max_lines=3,
        )
        checkbox(c, PAGE_W - M - 28, row_y - 24, 13)
    c.showPage()


def plan_page(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, CREAM)
    y = header(c, guide, "Plano", guide.plan_title, guide.plan_intro, 7)
    note_top = CONTENT_FLOOR + 86
    height = row_height(y, note_top + 20, len(guide.plan), gap=8)
    for number, title, task in guide.plan:
        list_row(c, y, height)
        c.setFillColor(FAINT)
        c.setFont("PoppinsBold", 7.5)
        c.drawString(M + 14, y - height / 2 - 3, number)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 8.4)
        c.drawString(M + 44, y - height / 2 - 3, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 7.6)
        c.drawString(M + 190, y - height / 2 - 3, task)
        checkbox(c, PAGE_W - M - 28, y - height / 2 - 1, 12)
        y -= height + 8

    height = 86
    c.setFillColor(INK)
    c.rect(M, CONTENT_FLOOR, CONTENT_W, height, fill=1, stroke=0)
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.6))
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, CONTENT_FLOOR + height - 22, "PRÓXIMA REVISÃO")
    c.setStrokeColor(base.rgb_with_alpha("#FFFFFF", 0.28))
    c.setLineWidth(0.6)
    c.line(M + 18, CONTENT_FLOOR + 28, PAGE_W - M - 18, CONTENT_FLOOR + 28)
    c.showPage()


def next_step(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 76)
    c.setFillColor(MUTED)
    c.setFont("PoppinsSemiBold", 7)
    c.drawRightString(PAGE_W - M, PAGE_H - 54, "COMO A FLOWO AJUDA")
    c.setFillColor(INK)
    c.setFont("Lora", 31)
    c.drawString(M, PAGE_H - 138, "Do papel para")
    c.drawString(M, PAGE_H - 176, "a rotina da barbearia.")
    base.paragraph(
        c,
        guide.flowo_intro,
        M,
        PAGE_H - 215,
        438,
        "PoppinsMedium",
        9.4,
        14,
        INK,
    )

    c.setFillColor(INK)
    c.rect(M, 332, CONTENT_W, 218, fill=1, stroke=0)
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.6))
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, 520, "O QUE FICA CONECTADO")
    y = 481
    for point in guide.flowo_points:
        c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.55))
        c.circle(M + 23, y + 2, 3, fill=1, stroke=0)
        base.paragraph(
            c,
            point,
            M + 40,
            y + 2,
            CONTENT_W - 62,
            "PoppinsMedium",
            7.6,
            10.5,
            WHITE,
            max_lines=2,
        )
        y -= 41

    c.setFillColor(SURFACE_2)
    c.rect(M, 184, CONTENT_W, 104, fill=1, stroke=0)
    c.setFillColor(FAINT)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 16, 260, "CONDIÇÃO IMPORTANTE")
    base.paragraph(
        c,
        guide.disclaimer,
        M + 16,
        235,
        CONTENT_W - 32,
        "PoppinsMedium",
        7.5,
        11,
        INK,
    )

    c.setFillColor(INK)
    c.roundRect(M, 104, 248, 48, 24, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsBold", 7.5)
    c.drawCentredString(M + 124, 123, "CONHECER A FLOWO")
    c.setFillColor(MUTED)
    c.setFont("Poppins", 7)
    cta_display_url = f"https://www.flowo.com.br{guide.cta_path}"
    cta_query = urlencode(
        {
            "utm_source": "flowo_material",
            "utm_medium": "pdf",
            "utm_campaign": guide.slug,
            "utm_content": "final_cta",
        }
    )
    cta_url = f"{cta_display_url}?{cta_query}"
    c.drawString(M, 80, cta_display_url.removeprefix("https://www."))
    c.linkURL(cta_url, (M, 104, M + 248, 152), relative=0)
    footer(c, guide, 8)
    c.showPage()


def build_guide(guide: Guide) -> Path:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    output_path = OUTPUT_DIR / f"{guide.slug}.pdf"
    public_path = PUBLIC_DIR / f"{guide.slug}.pdf"
    c = canvas.Canvas(str(output_path), pagesize=A4, pageCompression=1)
    c.setTitle(f"Flowo - {guide.collection_name.title()}")
    c.setAuthor("Flowo")
    c.setCreator("Flowo")
    c.setSubject(guide.subtitle)
    c.setKeywords(guide.keywords)
    c.setViewerPreference("DisplayDocTitle", "true")
    c._doc.Catalog.Lang = PDFString("pt-BR")
    pages = (
        ("Capa", "cover", cover),
        ("Como usar", "how-to", how_to),
        ("Diagnóstico", "audit", audit),
        ("Método", "framework", framework),
        ("Folha de trabalho", "worksheet", worksheet),
        ("Teste", "test", test_page),
        ("Plano de ação", "plan", plan_page),
        ("Como a Flowo ajuda", "next-step", next_step),
    )
    for title, key, render in pages:
        c.bookmarkPage(key)
        c.addOutlineEntry(title, key, level=0, closed=False)
        render(c, guide)
    c.save()
    add_accessible_tags(
        output_path,
        title=f"Flowo - {guide.collection_name.title()}",
        page_titles=[title for title, _key, _render in pages],
    )
    shutil.copyfile(output_path, public_path)
    return output_path


def main() -> None:
    base.ensure_fonts()
    for guide in GUIDES:
        print(build_guide(guide))


if __name__ == "__main__":
    main()
