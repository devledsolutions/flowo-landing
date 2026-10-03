import { describe, expect, it } from "vitest";
import {
  calcularComissao,
  calcularOcupacaoAgenda,
  calcularOportunidadeWhatsapp,
  calcularTempoWhatsapp,
  diagnosticarAgenda,
  diagnosticarGestao,
  planejarRetornoCliente,
  recomendarPlano,
} from "../tools/calculadoras";
import { call, okData } from "./helpers";

describe("calculator tools (golden inputs)", () => {
  it("calcular_tempo_whatsapp", async () => {
    const data = okData(await call(calcularTempoWhatsapp, {
      mensagens_por_dia: 28, minutos_por_conversa: 2.5, dias_por_semana: 6, duracao_servico_min: 45,
    }));
    expect(data).toMatchObject({ horas_por_semana: 7, horas_por_mes: 30.3, servicos_equivalentes_por_mes: 40 });
    expect(data.observacao).toContain("mede tempo");
  });

  it("calcular_oportunidade_whatsapp", async () => {
    const data = okData(await call(calcularOportunidadeWhatsapp, {
      perguntas_por_dia: 18, dias_por_semana: 6, percentual_sem_resposta: 25, ticket_medio: 60,
    }));
    expect(data).toMatchObject({ mensagens_por_mes: 468, conversas_para_revisar_por_mes: 117, valor_de_referencia_reais: 7015 });
  });

  it("calcular_ocupacao_agenda", async () => {
    const data = okData(await call(calcularOcupacaoAgenda, {
      profissionais: 3, horas_por_dia: 8, dias_por_semana: 6, duracao_servico_min: 45, atendimentos_marcados_semana: 72,
    }));
    expect(data).toMatchObject({ capacidade_semanal: 192, ocupacao_percentual: 37.5, horarios_livres_semana: 120 });
  });

  it("calcular_comissao", async () => {
    const data = okData(await call(calcularComissao, {
      servicos_reais: 8200, comissao_servicos_pct: 45, produtos_reais: 650, comissao_produtos_pct: 10, descontos_reais: 120,
    }));
    expect(data).toMatchObject({ base_servicos_reais: 8080, total_reais: 3701 });
  });

  it("calcular_comissao rejects a rate above 100%", async () => {
    const result = await call(calcularComissao, { servicos_reais: 1000, comissao_servicos_pct: 150 });
    expect(!result.ok && result.erro.campos?.[0]).toEqual({
      campo: "comissao_servicos_pct",
      problema: "Use um número de 0 a 100.",
    });
  });

  it("planejar_retorno_cliente", async () => {
    const data = okData(await call(planejarRetornoCliente, {
      ultima_visita: "2026-09-04", intervalo_dias: 30, antecedencia_dias: 3, servico: "corte_e_barba", tom: "direto",
    }));
    expect(data).toMatchObject({ data_retorno_estimada: "2026-10-04", data_para_revisar_contato: "2026-10-01" });
    expect(data.mensagem_sugerida).toContain("corte e barba");
  });

  it("planejar_retorno_cliente rejects an impossible date", async () => {
    const result = await call(planejarRetornoCliente, { ultima_visita: "2026-02-30", intervalo_dias: 30 });
    expect(!result.ok && result.erro.codigo).toBe("entrada_invalida");
  });

  it("recomendar_plano sends a team to Equipe with a signup link", async () => {
    const data = okData<{ plano: string; preco_texto: string; proximo_passo: { tipo: string; url?: string } }>(
      await call(recomendarPlano, { profissionais: 3 }),
    );
    expect(data.plano).toBe("equipe");
    expect(data.preco_texto.replace(/ /g, " ")).toContain("R$ 789/mês");
    expect(data.proximo_passo.tipo).toBe("link");
    expect(new URL(data.proximo_passo.url ?? "").searchParams.get("plan")).toBe("equipe");
    expect((data.proximo_passo as { explicacao?: string }).explicacao).toBe(
      "Abre o cadastro com o plano indicado já marcado. A pessoa confirma o plano antes de pagar.",
    );
  });

  it("recomendar_plano sends multiple units to sales", async () => {
    const data = okData<{ plano: string; preco_texto: string; proximo_passo: { ferramenta?: string } }>(
      await call(recomendarPlano, { profissionais: 3, unidades: 2 }),
    );
    expect(data.plano).toBe("empresarial");
    expect(data.preco_texto).toBe("Sob consulta");
    expect(data.proximo_passo.ferramenta).toBe("falar_com_vendas");
  });

  it("diagnosticar_gestao counts only real problems", async () => {
    const data = okData(await call(diagnosticarGestao, {
      whatsapp_interrompe_atendimento: true,
      horarios_diferentes_por_profissional: true,
      fechamento_em_lugares_diferentes: true,
      tem_rotina_de_retorno: true,
      equipe_sabe_quem_assume: true,
    }));
    expect(data.rotinas_para_olhar).toBe(3);
  });

  it("diagnosticar_agenda scores letters", async () => {
    const data = okData(await call(diagnosticarAgenda, {
      whatsapp_owner: "c", availability_discovery: "b", no_show_rule: "b", schedule_rules: "b", fit_in_rule: "b",
    }));
    expect(data).toMatchObject({ pontuacao: 60, faixa: "Organizada por pessoas" });
    expect(data.ponto_mais_fragil).toContain("Como o cliente descobre horário");
  });

  it("diagnosticar_agenda requires every answer", async () => {
    const result = await call(diagnosticarAgenda, { whatsapp_owner: "a" });
    expect(!result.ok && result.erro.campos?.length).toBe(4);
  });
});
