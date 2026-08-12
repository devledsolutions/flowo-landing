#!/usr/bin/env python3
"""Refresh evergreen Flowo guides that must keep their public URLs stable."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GENERATOR = ROOT / "scripts" / "generate-flowo-practical-guides.py"

spec = importlib.util.spec_from_file_location("flowo_practical_guides", GENERATOR)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Não foi possível importar {GENERATOR}")
guides = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = guides
spec.loader.exec_module(guides)


REFRESHED_GUIDES = (
    guides.Guide(
        slug="guia-completo-barbearia",
        collection_name="GUIA DE GESTÃO DA BARBEARIA",
        title="Barbearia organizada\ndo primeiro corte\nà rotina",
        subtitle=(
            "Um guia prático para estruturar agenda, equipe, caixa e atendimento "
            "sem depender da memória do dono."
        ),
        cover_label="MAPA DE OPERAÇÃO + PLANO DE 30 DIAS",
        cover_items=(
            "Oferta e rotina antes da ferramenta",
            "Agenda por profissional",
            "Venda, recebimento e comissão separados",
            "Indicadores que levam a uma ação",
        ),
        use_intro=(
            "Use o guia com a rotina real na mesa. Se a barbearia já funciona, "
            "comece pelo ponto que mais interrompe o atendimento."
        ),
        use_steps=(
            ("01", "Mapeie", "Registre como o cliente entra, agenda, paga e volta."),
            ("02", "Defina", "Escolha um responsável e uma regra para cada etapa."),
            ("03", "Teste", "Aplique uma mudança pequena durante sete dias."),
            ("04", "Revise", "Mantenha o que funcionou e corrija o que gerou dúvida."),
        ),
        before_start=(
            "Regras fiscais, sanitárias, trabalhistas e municipais variam. Confirme "
            "obrigações com prefeitura, contador e profissionais habilitados."
        ),
        audit_title="Onde a operação ainda depende de você?",
        audit_intro=(
            "Marque os pontos que param quando o dono sai da barbearia. Comece pelo "
            "item que mais afeta o cliente ou a equipe."
        ),
        audit_items=(
            ("Entrada", "O cliente não sabe onde pedir informação ou agendar."),
            ("Agenda", "Horários de cada barbeiro ficam em lugares diferentes."),
            ("Atendimento", "Perguntas repetidas interrompem cortes durante o dia."),
            ("Equipe", "Escala, comissão ou responsabilidade não têm regra escrita."),
            ("Caixa", "Venda, recebimento, taxa e retirada aparecem misturados."),
            ("Retorno", "A barbearia não sabe quem voltou depois de um contato."),
        ),
        framework_title="Cinco blocos para organizar primeiro",
        framework_intro=(
            "Uma ferramenta ajuda quando a regra já é compreensível. Escreva cada "
            "bloco em uma frase antes de configurar o sistema."
        ),
        framework=(
            ("01", "Oferta", "Serviços, duração, preço e quem pode executar."),
            ("02", "Disponibilidade", "Horários reais de cada profissional e unidade."),
            ("03", "Atendimento", "Perguntas, confirmações, encaixes e exceções."),
            ("04", "Fechamento", "Comanda, forma de pagamento, comissão e ajustes."),
            ("05", "Revisão", "Indicador, responsável e próxima ação da semana."),
        ),
        worksheet_title="Mapa da rotina da barbearia",
        worksheet_intro=(
            "Preencha uma linha por etapa. O objetivo é enxergar a passagem de "
            "responsabilidade, não criar um manual enorme."
        ),
        worksheet_columns=(
            ("ETAPA", 94),
            ("ENTRADA", 105),
            ("REGRA", 110),
            ("RESP.", 75),
            ("SISTEMA", 68),
            ("REVISÃO", 59),
        ),
        worksheet_note=(
            "Se a mesma informação precisa ser digitada em dois lugares, registre "
            "isso como uma interrupção a eliminar."
        ),
        test_title="Situações que a rotina precisa suportar",
        test_intro=(
            "Simule situações comuns antes de considerar a configuração pronta. "
            "Anote o que acontece e quem assume quando surge uma exceção."
        ),
        scenarios=(
            "Cliente pergunta por horário no mesmo dia",
            "Profissional altera a própria disponibilidade",
            "Cliente pede para remarcar ou cancelar",
            "Atendimento termina com mais de um serviço",
            "Pagamento acontece fora da plataforma",
            "Cliente retorna depois de um contato da barbearia",
        ),
        plan_title="Primeiros 30 dias sem atropelo",
        plan_intro=(
            "Trabalhe em blocos curtos. Só avance quando a equipe conseguir usar a "
            "regra anterior durante um dia normal."
        ),
        plan=(
            ("01", "Dias 1-3", "Liste serviços, duração, preço e responsáveis."),
            ("02", "Dias 4-7", "Defina agenda e horários de cada profissional."),
            ("03", "Dias 8-10", "Escreva regras de confirmação e exceção."),
            ("04", "Dias 11-15", "Teste agendamento, remarcação e cancelamento."),
            ("05", "Dias 16-20", "Organize comandas e formas de pagamento."),
            ("06", "Dias 21-25", "Revise equipe, comissão e permissões."),
            ("07", "Dias 26-30", "Escolha indicadores e a reunião semanal."),
        ),
        flowo_intro=(
            "A Flowo conecta atendimento no WhatsApp, agenda, equipe, comandas e "
            "gestão para que a informação acompanhe a rotina da barbearia."
        ),
        flowo_points=(
            "A agenda respeita a disponibilidade de cada barbeiro.",
            "A inteligência artificial atende e chama a equipe nas exceções.",
            "Pagamentos pela plataforma são opcionais.",
            "Recursos de equipe, financeiro e fiscal variam por plano e configuração.",
        ),
        disclaimer=(
            "A contratação não garante faturamento, ocupação ou redução automática "
            "de faltas. O resultado depende da operação e do uso da barbearia."
        ),
        keywords="barbearia, gestão, agenda, equipe, caixa, WhatsApp, Flowo",
    ),
    guides.Guide(
        slug="referencia-rapida-barbearia",
        collection_name="PAINEL SEMANAL DA BARBEARIA",
        title="Uma semana\nque cabe em\numa página",
        subtitle=(
            "Um painel prático para transformar agenda, faltas, ticket e retorno "
            "em decisões que a equipe consegue executar."
        ),
        cover_label="MÉTRICAS + RITUAL DE 20 MINUTOS",
        cover_items=(
            "Número com origem conhecida",
            "Comparação com a própria rotina",
            "Uma decisão por indicador",
            "Responsável e prazo definidos",
        ),
        use_intro=(
            "Preencha no mesmo dia da semana e compare períodos equivalentes. Uma "
            "métrica só serve quando alguém sabe o que fará com ela."
        ),
        use_steps=(
            ("01", "Feche", "Confirme atendimentos, faltas e comandas do período."),
            ("02", "Calcule", "Use a mesma origem e a mesma fórmula toda semana."),
            ("03", "Converse", "Escolha um desvio importante com a equipe."),
            ("04", "Aja", "Registre uma ação, um responsável e uma data de revisão."),
        ),
        before_start=(
            "Não existe meta universal para toda barbearia. Serviço, preço, cidade, "
            "equipe e fase do negócio mudam a leitura dos números."
        ),
        audit_title="Seu número ajuda ou só ocupa espaço?",
        audit_intro=(
            "Marque os sinais de que a métrica ainda não está pronta para orientar "
            "uma decisão. Corrija a origem antes de cobrar a equipe."
        ),
        audit_items=(
            ("Origem", "Ninguém sabe de qual tela ou registro o número saiu."),
            ("Período", "A comparação mistura semanas com quantidades de dias diferentes."),
            ("Definição", "Falta, cancelamento e remarcação entram na mesma conta."),
            ("Responsável", "O resultado é visto, mas nenhuma ação recebe um dono."),
            ("Prazo", "A reunião termina sem uma data para rever o indicador."),
            ("Contexto", "Uma variação isolada é tratada como tendência."),
        ),
        framework_title="Cinco perguntas antes de agir",
        framework_intro=(
            "Use as perguntas em qualquer indicador. Elas evitam decisões rápidas "
            "baseadas em um número incompleto."
        ),
        framework=(
            ("01", "O que mede?", "Definição simples e fórmula conhecida."),
            ("02", "De onde vem?", "Agenda, comanda, caixa ou contato registrado."),
            ("03", "Com o que compara?", "Período equivalente da própria barbearia."),
            ("04", "O que mudou?", "Equipe, preço, horário, campanha ou feriado."),
            ("05", "Qual é a ação?", "Responsável, prazo e forma de conferir."),
        ),
        worksheet_title="Painel de revisão semanal",
        worksheet_intro=(
            "Use poucas linhas. Agenda ocupada, faltas, ticket, retorno e caixa já "
            "formam um começo útil quando as definições estão claras."
        ),
        worksheet_columns=(
            ("INDICADOR", 105),
            ("ATUAL", 66),
            ("ANTERIOR", 76),
            ("MUDOU", 80),
            ("AÇÃO", 112),
            ("RESP.", 72),
        ),
        worksheet_note=(
            "Registre a fórmula ao lado do painel. Quando a definição mudar, comece "
            "uma nova série e preserve o histórico anterior."
        ),
        test_title="Conferências antes da reunião",
        test_intro=(
            "Revise estas situações com dados reais. Uma divergência encontrada antes "
            "da reunião vale mais que uma meta bonita com base errada."
        ),
        scenarios=(
            "Horário bloqueado não contado como disponível",
            "Remarcação não tratada como falta",
            "Desconto separado do valor cheio do serviço",
            "Atendimento concluído ligado à comanda correta",
            "Cliente que voltou contado uma única vez",
            "Comparação feita com período equivalente",
        ),
        plan_title="Ritual semanal em sete passos",
        plan_intro=(
            "Mantenha a reunião curta e sempre na mesma ordem. O painel deve reduzir "
            "dúvida, não abrir uma investigação sem fim."
        ),
        plan=(
            ("01", "Fechar período", "Confirme agenda, comandas e ajustes."),
            ("02", "Validar origem", "Revise fórmulas e eventos fora do comum."),
            ("03", "Ler tendência", "Compare períodos equivalentes."),
            ("04", "Escolher foco", "Selecione um desvio que merece ação."),
            ("05", "Definir ação", "Diga exatamente o que será feito."),
            ("06", "Atribuir", "Registre responsável e prazo."),
            ("07", "Revisar", "Confira o efeito na semana seguinte."),
        ),
        flowo_intro=(
            "A Flowo reúne agenda, atendimentos, comandas e equipe para reduzir a "
            "reconciliação manual antes da revisão da barbearia."
        ),
        flowo_points=(
            "Agenda e atendimento compartilham o mesmo contexto.",
            "Comandas registram serviços, valores e formas de pagamento.",
            "A equipe autorizada acompanha indicadores no painel.",
            "Metas e decisões continuam sob responsabilidade da barbearia.",
        ),
        disclaimer=(
            "Indicadores operacionais não substituem contabilidade ou orientação "
            "financeira. Compare dados completos e preserve o contexto."
        ),
        keywords="barbearia, indicadores, agenda, faltas, ticket, retorno, Flowo",
    ),
    guides.Guide(
        slug="templates-stories-barbearia",
        collection_name="STORIES PARA BARBEARIAS",
        title="Stories com cara\nda sua barbearia",
        subtitle=(
            "Um sistema de conteúdo para mostrar trabalho, rotina e horários sem "
            "encher o perfil de promoção genérica."
        ),
        cover_label="IDEIAS + ROTEIRO DE PUBLICAÇÃO",
        cover_items=(
            "Prova do trabalho antes da oferta",
            "Bastidor que aproxima sem forçar intimidade",
            "Horário disponível com contexto",
            "Chamada simples para conversar ou agendar",
        ),
        use_intro=(
            "Escolha ideias que combinam com a barbearia e grave durante a rotina. "
            "Não copie um personagem que a equipe não sustentaria no atendimento."
        ),
        use_steps=(
            ("01", "Capture", "Grave detalhes reais do ambiente, corte e equipe."),
            ("02", "Organize", "Separe prova, bastidor, informação e convite."),
            ("03", "Publique", "Use texto curto, legível e uma ação por Story."),
            ("04", "Aprenda", "Registre respostas, cliques e agendamentos relacionados."),
        ),
        before_start=(
            "Peça autorização antes de mostrar clientes. Evite expor conversas, "
            "dados pessoais, crianças ou situações que possam constranger alguém."
        ),
        audit_title="O conteúdo parece feito pela sua equipe?",
        audit_intro=(
            "Marque os sinais de conteúdo genérico. O melhor Story é reconhecível "
            "como parte da experiência que o cliente encontra na barbearia."
        ),
        audit_items=(
            ("Imagem", "A foto poderia pertencer a qualquer barbearia da internet."),
            ("Texto", "A legenda usa palavras que ninguém da equipe fala."),
            ("Prova", "A oferta aparece sem trabalho, ambiente ou resultado real."),
            ("Leitura", "Texto pequeno ou comprido demais cobre o vídeo."),
            ("Ação", "O Story pede para clicar, responder e compartilhar ao mesmo tempo."),
            ("Medição", "Respostas e agendamentos não são ligados ao conteúdo."),
        ),
        framework_title="Quatro tipos de Story que se alternam",
        framework_intro=(
            "Use a rotina como matéria-prima. A sequência ganha variedade sem perder "
            "a identidade da barbearia."
        ),
        framework=(
            ("01", "Prova", "Resultado, detalhe do corte, avaliação ou retorno."),
            ("02", "Bastidor", "Preparação, ferramenta, ambiente ou equipe."),
            ("03", "Informação", "Cuidados, escolha de serviço ou dúvida comum."),
            ("04", "Agenda", "Disponibilidade real, profissional e período."),
            ("05", "Convite", "Responder, pedir horário ou abrir o agendamento."),
        ),
        worksheet_title="Banco de Stories da semana",
        worksheet_intro=(
            "Planeje o suficiente para não improvisar tudo. Deixe espaço para a "
            "rotina real e para horários que surgirem."
        ),
        worksheet_columns=(
            ("DIA", 54),
            ("TIPO", 78),
            ("CENA", 125),
            ("TEXTO", 125),
            ("AÇÃO", 80),
            ("OK", 49),
        ),
        worksheet_note=(
            "Não publique disponibilidade antiga. Confira a agenda antes de chamar "
            "o cliente e retire o Story quando o horário for ocupado."
        ),
        test_title="Ideias para adaptar, não copiar",
        test_intro=(
            "Use cada linha várias vezes com cenas diferentes. O valor está no que "
            "aconteceu na barbearia, não em um template decorativo."
        ),
        scenarios=(
            "Detalhe do acabamento com autorização",
            "Ferramenta preparada antes do primeiro cliente",
            "Dúvida comum respondida em uma frase",
            "Horários livres de um profissional específico",
            "Antes e depois sem filtro que altere o resultado",
            "Convite para responder e pedir um horário",
        ),
        plan_title="Sequência de sete dias",
        plan_intro=(
            "Repita a estrutura com cenas novas. A consistência vem do formato, mas "
            "a credibilidade vem do que aconteceu naquele dia."
        ),
        plan=(
            ("01", "Segunda", "Mostre agenda da semana e preparação."),
            ("02", "Terça", "Publique um detalhe de resultado."),
            ("03", "Quarta", "Responda uma dúvida frequente."),
            ("04", "Quinta", "Apresente alguém da equipe ou um bastidor."),
            ("05", "Sexta", "Mostre movimento e disponibilidade real."),
            ("06", "Sábado", "Reúna prova social e resultado do dia."),
            ("07", "Domingo", "Abra a próxima semana com um convite simples."),
        ),
        flowo_intro=(
            "A agenda da Flowo ajuda a equipe a publicar disponibilidade real e a "
            "levar o cliente para uma conversa ou agendamento organizado."
        ),
        flowo_points=(
            "Horários refletem a disponibilidade de cada profissional.",
            "O cliente pode pedir atendimento pelo WhatsApp.",
            "A origem do contato pode ser preservada no funil comercial.",
            "Conteúdo, autorização de imagem e publicação continuam com a barbearia.",
        ),
        disclaimer=(
            "O material não garante alcance, seguidores ou vendas. Use conteúdo "
            "próprio, respeite direitos de imagem e acompanhe respostas reais."
        ),
        keywords="barbearia, Instagram, Stories, conteúdo, agenda, Flowo",
    ),
)


def main() -> None:
    guides.base.ensure_fonts()
    for guide in REFRESHED_GUIDES:
        print(guides.build_guide(guide))


if __name__ == "__main__":
    main()
