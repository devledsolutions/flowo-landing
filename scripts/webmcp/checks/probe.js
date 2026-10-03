// Registration: count, names, schemas, annotations, and no duplicates after a client navigation.
(async () => {
  const EXPECTED = [
    "buscar_materiais", "buscar_perguntas_frequentes", "calcular_comissao", "calcular_ocupacao_agenda",
    "calcular_oportunidade_whatsapp", "calcular_tempo_whatsapp", "comparar_concorrente", "diagnosticar_agenda",
    "diagnosticar_gestao", "falar_com_vendas", "planejar_retorno_cliente", "receber_material",
    "recomendar_plano", "ver_planos",
  ];
  const CONSEQUENTIAL = ["falar_com_vendas", "receber_material"];
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const mc = document.modelContext;
  if (!mc) return { ok: false, problems: ["document.modelContext is missing"] };

  async function snapshot() {
    const tools = (await mc.getTools()).filter((tool) => !tool.origin || tool.origin === location.origin);
    const names = tools.map((tool) => tool.name);
    const problems = [];
    const dataset = document.documentElement.dataset.webmcp;
    if (dataset !== `registered:${EXPECTED.length}`) problems.push(`dataset.webmcp=${dataset}`);
    const sorted = [...names].sort();
    if (JSON.stringify(sorted) !== JSON.stringify(EXPECTED)) problems.push(`names=${sorted.join(",")}`);
    if (new Set(names).size !== names.length) problems.push("duplicate names");
    for (const tool of tools) {
      const schema = typeof tool.inputSchema === "string" ? JSON.parse(tool.inputSchema) : tool.inputSchema;
      if (!schema || schema.type !== "object") problems.push(`${tool.name}: schema is not an object`);
      if (schema && "$schema" in schema) problems.push(`${tool.name}: schema has $schema`);
      const annotations = tool.annotations ?? {};
      if (CONSEQUENTIAL.includes(tool.name)) {
        if (annotations.consequentialHint !== true) problems.push(`${tool.name}: missing consequentialHint`);
      } else if (annotations.readOnlyHint !== true) {
        problems.push(`${tool.name}: missing readOnlyHint`);
      }
    }
    return { path: location.pathname, dataset, count: names.length, problems };
  }

  const before = await snapshot();
  const link = Array.from(document.querySelectorAll('a[href^="/"]')).find(
    (anchor) => !anchor.getAttribute("href").startsWith("/#") && anchor.getAttribute("href") !== location.pathname,
  );
  let after = null;
  if (link) {
    link.click();
    await sleep(3500);
    after = await snapshot();
  }
  const problems = [...before.problems, ...(after ? after.problems : ["no internal link to navigate"])];
  if (after && after.path === before.path) problems.push("client navigation did not change the path");
  return { ok: problems.length === 0, before, after, problems };
})()
