#!/usr/bin/env python3
"""Generate the production Flowo practical-guide PDF collection."""

from __future__ import annotations

import importlib.util
import shutil
from dataclasses import dataclass
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


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
            "Confirme o escopo antes da contratação."
        ),
        keywords="barbearia, comissões, barbeiros, comanda, acerto, Flowo",
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
            "Comece pequeno. Escolha um grupo que faça sentido, revise a mensagem "
            "e acompanhe o que aconteceu antes de criar o próximo contato."
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
            "Preencha antes do envio. A coluna de motivo ajuda a equipe a entender "
            "por que o cliente apareceu na lista."
        ),
        worksheet_columns=(
            ("CLIENTE", 105),
            ("ÚLTIMA VISITA", 92),
            ("SERVIÇO", 84),
            ("MOTIVO", 115),
            ("REVISOU", 71),
            ("ENVIAR", 45),
        ),
        worksheet_note=(
            "Tempo sem voltar depende do serviço e do costume do cliente. Trinta dias "
            "não é uma regra universal."
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
            "Flowo Recupera é um adicional em beta, não um plano separado.",
            "O responsável revisa a ação antes do contato proativo.",
            "Resultado só é confirmado depois do atendimento e da comanda fechada.",
        ),
        disclaimer=(
            "Flowo Recupera possui ativação, critérios e limites próprios. "
            "Preço e franquia pública ainda não estão definidos."
        ),
        keywords="barbearia, clientes, retorno, reativação, WhatsApp, Flowo Recupera",
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
        framework_title="Quatro números diferentes",
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
            "Nota fiscal depende do município, dos dados e da homologação.",
        ),
        disclaimer=(
            "Superfícies fiscais estão em piloto assistido. Disponibilidade real "
            "precisa ser confirmada para o município e o negócio."
        ),
        keywords="barbearia, caixa, pagamentos, PIX, cartão, comanda, Flowo",
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


def cover(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, PAPER)
    base.draw_logo(c, M, PAGE_H - 72, 76)
    c.setFillColor(MUTED)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M, PAGE_H - 112, guide.cover_label)

    c.setFillColor(INK)
    c.rect(0, 480, PAGE_W, 244, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.rect(PAGE_W - 116, 480, 116, 244, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Lora", 36)
    y = 656
    for line in guide.title.splitlines():
        c.drawString(M, y, line)
        y -= 43

    base.paragraph(
        c,
        guide.subtitle,
        M,
        432,
        440,
        "PoppinsSemiBold",
        11.5,
        17,
        INK,
    )

    c.setFillColor(CREAM)
    c.roundRect(M, 190, CONTENT_W, 158, 8, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, 320, "VOCÊ VAI ORGANIZAR")
    y = 288
    for index, item in enumerate(guide.cover_items, start=1):
        c.setFillColor(GREEN_PALE)
        c.circle(M + 25, y + 2, 8, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK)
        c.setFont("PoppinsBold", 6)
        c.drawCentredString(M + 25, y, str(index))
        c.setFillColor(INK)
        c.setFont("PoppinsMedium", 7.6)
        c.drawString(M + 46, y - 1, item)
        y -= 27

    c.setFillColor(INK)
    c.roundRect(M, 76, CONTENT_W, 76, 8, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, 125, "MATERIAL PRÁTICO")
    c.setFillColor(WHITE)
    c.setFont("Lora", 15)
    c.drawString(M + 18, 98, "Preencha com a rotina real da sua barbearia.")
    footer(c, guide, 1)
    c.showPage()


def how_to(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, CREAM)
    y = header(c, guide, "Como usar", "Faça com quem vive a rotina.", guide.use_intro, 2)
    for number, title, body in guide.use_steps:
        c.setFillColor(PAPER)
        c.roundRect(M, y - 62, CONTENT_W, 62, 7, fill=1, stroke=0)
        c.setFillColor(GREEN_PALE)
        c.circle(M + 28, y - 31, 12, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK)
        c.setFont("PoppinsBold", 6.5)
        c.drawCentredString(M + 28, y - 33, number)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 8.7)
        c.drawString(M + 58, y - 23, title)
        base.paragraph(c, body, M + 58, y - 41, 420, size=7.1, leading=10, color=MUTED)
        y -= 75

    c.setFillColor(INK)
    c.roundRect(M, 86, CONTENT_W, 112, 8, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, 169, "ANTES DE COMEÇAR")
    base.paragraph(
        c,
        guide.before_start,
        M + 18,
        145,
        CONTENT_W - 36,
        "PoppinsMedium",
        7.8,
        11.5,
        base.rgb_with_alpha("#FFFFFF", 0.76),
    )
    c.showPage()


def audit(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, PAPER)
    y = header(c, guide, "Diagnóstico", guide.audit_title, guide.audit_intro, 3)
    for category, prompt in guide.audit_items:
        c.setFillColor(CREAM)
        c.roundRect(M, y - 66, CONTENT_W, 66, 6, fill=1, stroke=0)
        checkbox(c, M + 16, y - 23)
        c.setFillColor(MUTED)
        c.setFont("PoppinsSemiBold", 6.2)
        c.drawString(M + 45, y - 19, category.upper())
        base.paragraph(
            c,
            prompt,
            M + 45,
            y - 39,
            CONTENT_W - 65,
            "PoppinsMedium",
            7.3,
            10,
            INK,
            max_lines=2,
        )
        y -= 77
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
    for index, (number, title, body) in enumerate(guide.framework):
        highlighted = index in {1, 3}
        c.setFillColor(GREEN if highlighted else base.rgb_with_alpha("#FFFFFF", 0.08))
        c.roundRect(M, y - 59, CONTENT_W, 59, 6, fill=1, stroke=0)
        c.setFillColor(INK if highlighted else WHITE)
        c.setFont("PoppinsBold", 8)
        c.drawString(M + 16, y - 24, number)
        c.setFont("PoppinsSemiBold", 8)
        c.drawString(M + 62, y - 24, title)
        base.paragraph(
            c,
            body,
            M + 190,
            y - 24,
            CONTENT_W - 208,
            "Poppins",
            7,
            10,
            INK if highlighted else base.rgb_with_alpha("#FFFFFF", 0.68),
            max_lines=2,
        )
        y -= 70
    c.setFillColor(base.rgb_with_alpha("#FFFFFF", 0.08))
    c.roundRect(M, 78, CONTENT_W, 82, 7, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 16, 135, "REGRA DE OURO")
    c.setFillColor(WHITE)
    c.setFont("PoppinsMedium", 7.5)
    c.drawString(M + 16, 108, "Se a equipe não consegue explicar, a regra ainda não está pronta.")
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
    c.setFillColor(INK)
    c.roundRect(M, y - 34, CONTENT_W, 34, 6, fill=1, stroke=0)
    x = M
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 5.7)
    for title, width in guide.worksheet_columns:
        c.drawString(x + 6, y - 21, title)
        x += width
    y -= 34
    for row in range(6):
        c.setFillColor(PAPER if row % 2 == 0 else CREAM)
        c.rect(M, y - 58, CONTENT_W, 58, fill=1, stroke=0)
        x = M
        c.setStrokeColor(LINE)
        for _, width in guide.worksheet_columns:
            c.line(x + width, y, x + width, y - 58)
            x += width
        c.line(M, y - 58, PAGE_W - M, y - 58)
        y -= 58

    c.setFillColor(GREEN_PALE)
    c.roundRect(M, 78, CONTENT_W, 102, 7, fill=1, stroke=0)
    c.setFillColor(GREEN_DARK)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 16, 153, "PARA NÃO PERDER O HISTÓRICO")
    base.paragraph(
        c,
        guide.worksheet_note,
        M + 16,
        128,
        CONTENT_W - 32,
        "PoppinsMedium",
        7.4,
        10.8,
        INK,
    )
    c.showPage()


def test_page(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, PAPER)
    y = header(c, guide, "Conferência", guide.test_title, guide.test_intro, 6)
    columns = (("SITUAÇÃO", 240), ("ESPERADO", 125), ("RESP.", 78), ("OK", 42))
    c.setFillColor(INK)
    c.roundRect(M, y - 34, CONTENT_W, 34, 6, fill=1, stroke=0)
    x = M
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 5.9)
    for title, width in columns:
        c.drawString(x + 7, y - 21, title)
        x += width
    y -= 34
    for index, scenario in enumerate(guide.scenarios):
        c.setFillColor(CREAM if index % 2 == 0 else PAPER)
        c.rect(M, y - 61, CONTENT_W, 61, fill=1, stroke=0)
        base.paragraph(
            c,
            scenario,
            M + 8,
            y - 23,
            220,
            "PoppinsMedium",
            6.8,
            9,
            INK,
            max_lines=2,
        )
        x = M
        c.setStrokeColor(LINE)
        for _, width in columns:
            c.line(x + width, y, x + width, y - 61)
            x += width
        checkbox(c, PAGE_W - M - 28, y - 22, 12)
        c.line(M, y - 61, PAGE_W - M, y - 61)
        y -= 61
    c.showPage()


def plan_page(c: canvas.Canvas, guide: Guide) -> None:
    page_bg(c, CREAM)
    y = header(c, guide, "Plano", guide.plan_title, guide.plan_intro, 7)
    for number, title, task in guide.plan:
        c.setFillColor(PAPER)
        c.roundRect(M, y - 50, CONTENT_W, 50, 6, fill=1, stroke=0)
        c.setFillColor(GREEN_PALE)
        c.circle(M + 25, y - 25, 10, fill=1, stroke=0)
        c.setFillColor(GREEN_DARK)
        c.setFont("PoppinsBold", 6)
        c.drawCentredString(M + 25, y - 27, number)
        c.setFillColor(INK)
        c.setFont("PoppinsSemiBold", 7.4)
        c.drawString(M + 48, y - 21, title)
        c.setFillColor(MUTED)
        c.setFont("Poppins", 6.7)
        c.drawString(M + 166, y - 21, task)
        checkbox(c, PAGE_W - M - 28, y - 19, 11)
        y -= 59
    c.setFillColor(INK)
    c.roundRect(M, 78, CONTENT_W, 74, 7, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 16, 126, "PRÓXIMA REVISÃO")
    writing_lines(c, M + 16, 100, CONTENT_W - 32, 1)
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
    c.roundRect(M, 332, CONTENT_W, 218, 8, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("PoppinsSemiBold", 7)
    c.drawString(M + 18, 520, "O QUE FICA CONECTADO")
    y = 481
    for point in guide.flowo_points:
        c.setFillColor(GREEN)
        c.circle(M + 23, y + 2, 4, fill=1, stroke=0)
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

    c.setFillColor(CREAM)
    c.roundRect(M, 184, CONTENT_W, 104, 8, fill=1, stroke=0)
    c.setFillColor(MUTED)
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

    c.setFillColor(GREEN)
    c.roundRect(M, 104, 248, 48, 24, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("PoppinsBold", 7.5)
    c.drawCentredString(M + 124, 123, "CONHECER A FLOWO")
    c.setFillColor(MUTED)
    c.setFont("Poppins", 7)
    c.drawString(M, 80, "flowo.com.br/recepcionista-ia-barbearia")
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
    c.setSubject(guide.subtitle)
    c.setKeywords(guide.keywords)
    cover(c, guide)
    how_to(c, guide)
    audit(c, guide)
    framework(c, guide)
    worksheet(c, guide)
    test_page(c, guide)
    plan_page(c, guide)
    next_step(c, guide)
    c.save()
    shutil.copyfile(output_path, public_path)
    return output_path


def main() -> None:
    base.ensure_fonts()
    for guide in GUIDES:
        print(build_guide(guide))


if __name__ == "__main__":
    main()
