// Empty and wrongly typed inputs must come back as entrada_invalida, in Portuguese.
(async () => {
  const mc = document.modelContext;
  if (!mc) return { ok: false, problems: ["document.modelContext is missing"] };
  const tools = Object.fromEntries((await mc.getTools()).map((tool) => [tool.name, tool]));
  const NO_REQUIRED_FIELDS = ["ver_planos", "buscar_materiais"];
  const problems = [];
  const samples = {};
  async function run(name, rawInput) {
    const raw = await mc.executeTool(tools[name], rawInput);
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  }
  for (const name of Object.keys(tools)) {
    const result = await run(name, "{}");
    if (NO_REQUIRED_FIELDS.includes(name)) {
      if (!result.ok) problems.push(`${name}: {} should work`);
      continue;
    }
    if (result.ok || result.erro.codigo !== "entrada_invalida") problems.push(`${name}: {} gave ${JSON.stringify(result)}`);
    else if (!result.erro.campos || result.erro.campos.length === 0) problems.push(`${name}: no campos`);
    samples[name] = result.erro && result.erro.campos;
  }
  const wrongTypes = [
    ["ver_planos", { ciclo: "semanal" }],
    ["calcular_comissao", { servicos_reais: "mil", comissao_servicos_pct: 40 }],
    ["recomendar_plano", { profissionais: 0 }],
    ["comparar_concorrente", { concorrente: "inexistente" }],
    ["falar_com_vendas", { nome: "Teste", whatsapp: "123", consentimento: "sim" }],
  ];
  for (const [name, input] of wrongTypes) {
    const result = await run(name, JSON.stringify(input));
    samples[`${name} wrong`] = result.erro && result.erro.campos;
    if (result.ok || result.erro.codigo !== "entrada_invalida") problems.push(`${name}: wrong types accepted`);
  }
  // Chrome 154 refuses non-JSON input before calling the tool; older builds pass it through.
  let nonJson;
  try {
    const result = await run("ver_planos", "{plano: solo");
    nonJson = result.ok || result.erro.codigo !== "entrada_invalida" ? "accepted" : "entrada_invalida";
  } catch (error) {
    nonJson = `browser rejected: ${error && error.message}`;
  }
  if (nonJson === "accepted") problems.push("ver_planos: non-JSON accepted");
  samples.nonJson = nonJson;
  const text = JSON.stringify(samples);
  if (/Invalid input|expected|received/i.test(text)) problems.push("English validation text leaked");
  return { ok: problems.length === 0, problems, samples };
})()
