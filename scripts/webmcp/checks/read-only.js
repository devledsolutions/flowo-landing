// Golden executions for the 12 read-only tools, plus a leak check for internal prices.
(async () => {
  const mc = document.modelContext;
  if (!mc) return { ok: false, problems: ["document.modelContext is missing"] };
  const tools = Object.fromEntries((await mc.getTools()).map((tool) => [tool.name, tool]));
  const results = {};
  const problems = [];
  async function run(name, input) {
    const raw = await mc.executeTool(tools[name], JSON.stringify(input));
    const result = typeof raw === "string" ? JSON.parse(raw) : raw;
    results[`${name} ${JSON.stringify(input)}`] = result;
    if (!result || result.ok !== true) problems.push(`${name}: ${JSON.stringify(result && result.erro)}`);
    return result && result.dados;
  }
  const expect = (condition, message) => { if (!condition) problems.push(message); };

  const plans = await run("ver_planos", {});
  expect(plans && plans.planos.length === 3, "ver_planos: three plans");
  expect(plans && plans.planos.find((p) => p.id === "solo").preco.mensal === 379, "ver_planos: Solo 379");
  expect(plans && plans.planos.find((p) => p.id === "equipe").preco.mensal === 789, "ver_planos: Equipe 789");
  expect(plans && plans.planos.find((p) => p.id === "empresarial").preco === null, "ver_planos: Empresarial without price");
  const yearly = await run("ver_planos", { plano: "equipe", ciclo: "anual" });
  expect(yearly && yearly.planos[0].link_para_contratar.includes("plan=equipe&cycle=yearly"), "ver_planos: yearly link");
  const faq = await run("buscar_perguntas_frequentes", { busca: "tem fidelidade?" });
  expect(faq && faq.resultados.length > 0, "faq: results");
  const comparison = await run("comparar_concorrente", { concorrente: "trinks" });
  expect(comparison && comparison.fontes.length > 0 && comparison.fontes.every((f) => f.verificado_em), "comparar: dated sources");
  const materials = await run("buscar_materiais", { tema: "comissao" });
  expect(materials && materials.materiais.some((m) => m.material_id === "comissoes-sem-planilha"), "materiais: commission");
  const time = await run("calcular_tempo_whatsapp", { mensagens_por_dia: 28, minutos_por_conversa: 2.5, dias_por_semana: 6, duracao_servico_min: 45 });
  expect(time && time.horas_por_semana === 7 && time.servicos_equivalentes_por_mes === 40, "tempo: golden");
  const opportunity = await run("calcular_oportunidade_whatsapp", { perguntas_por_dia: 18, dias_por_semana: 6, percentual_sem_resposta: 25, ticket_medio: 60 });
  expect(opportunity && opportunity.valor_de_referencia_reais === 7015, "oportunidade: golden");
  const occupancy = await run("calcular_ocupacao_agenda", { profissionais: 3, horas_por_dia: 8, dias_por_semana: 6, duracao_servico_min: 45, atendimentos_marcados_semana: 72 });
  expect(occupancy && occupancy.ocupacao_percentual === 37.5, "ocupacao: golden");
  const commission = await run("calcular_comissao", { servicos_reais: 8200, comissao_servicos_pct: 45, produtos_reais: 650, comissao_produtos_pct: 10, descontos_reais: 120 });
  expect(commission && commission.total_reais === 3701, "comissao: golden");
  const ret = await run("planejar_retorno_cliente", { ultima_visita: "2026-09-04", intervalo_dias: 30, antecedencia_dias: 3, servico: "corte", tom: "proximo" });
  expect(ret && ret.data_retorno_estimada === "2026-10-04" && ret.data_para_revisar_contato === "2026-10-01", "retorno: golden");
  const plan = await run("recomendar_plano", { profissionais: 3, unidades: 1 });
  expect(plan && plan.plano === "equipe", "recomendar: equipe");
  const enterprise = await run("recomendar_plano", { profissionais: 3, unidades: 2 });
  expect(enterprise && enterprise.plano === "empresarial" && enterprise.proximo_passo.ferramenta === "falar_com_vendas", "recomendar: empresarial");
  const management = await run("diagnosticar_gestao", {
    whatsapp_interrompe_atendimento: true, horarios_diferentes_por_profissional: true, fechamento_em_lugares_diferentes: true,
    tem_rotina_de_retorno: true, equipe_sabe_quem_assume: true,
  });
  expect(management && management.rotinas_para_olhar === 3, "gestao: all Sim gives 3");
  const agenda = await run("diagnosticar_agenda", { whatsapp_owner: "c", availability_discovery: "b", no_show_rule: "b", schedule_rules: "b", fit_in_rule: "b" });
  expect(agenda && agenda.pontuacao === 60, "agenda: 60");

  const serialized = JSON.stringify(results);
  if (/\b1\.?578|157800|15780|\b449\b|\b929\b|44900|92900/.test(serialized)) problems.push("internal or app-store price leaked");
  return { ok: problems.length === 0, calls: Object.keys(results).length, problems };
})()
