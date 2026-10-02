// Lead tools. Without consent nothing is sent. With CHECK_ARGS='{"submit":true}' it also
// sends one sales request and one material request using test contacts.
(async () => {
  const mc = document.modelContext;
  if (!mc) return { ok: false, problems: ["document.modelContext is missing"] };
  const args = globalThis.__webmcpCheckArgs || {};
  const tools = Object.fromEntries((await mc.getTools()).map((tool) => [tool.name, tool]));
  const problems = [];
  const leadRequests = () =>
    performance.getEntriesByType("resource").filter((entry) => entry.name.includes("/api/lead-capture")).length;
  async function run(name, input) {
    const raw = await mc.executeTool(tools[name], JSON.stringify(input));
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  }
  const stamp = Date.now().toString(36);
  const sales = {
    nome: "Teste WebMCP",
    whatsapp: "+1 555 010 0001",
    email: `flowo-qa-webmcp-${stamp}@flowo.com.br`,
    nome_barbearia: "Barbearia Teste WebMCP",
    profissionais: 4,
    unidades: 2,
    mensagem: "Teste local do assistente de IA.",
  };

  performance.clearResourceTimings();
  const refused = await run("falar_com_vendas", { ...sales, consentimento: false });
  if (refused.ok || refused.erro.codigo !== "entrada_invalida") problems.push("falar_com_vendas accepted consent=false");
  const refusedMaterial = await run("receber_material", { material_id: "comissoes-sem-planilha", nome: "Teste", email: sales.email });
  if (refusedMaterial.ok || refusedMaterial.erro.codigo !== "entrada_invalida") problems.push("receber_material accepted missing consent");
  await new Promise((resolve) => setTimeout(resolve, 500));
  const afterRefusal = leadRequests();
  if (afterRefusal !== 0) problems.push(`requests without consent: ${afterRefusal}`);

  const submitted = {};
  if (args.submit === true) {
    submitted.sales = await run("falar_com_vendas", { ...sales, consentimento: true });
    if (!submitted.sales.ok) problems.push(`falar_com_vendas failed: ${JSON.stringify(submitted.sales.erro)}`);
    submitted.material = await run("receber_material", {
      material_id: "comissoes-sem-planilha",
      nome: "Teste WebMCP",
      email: `flowo-qa-webmcp-material-${stamp}@flowo.com.br`,
      consentimento: true,
    });
    if (!submitted.material.ok) problems.push(`receber_material failed: ${JSON.stringify(submitted.material.erro)}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (leadRequests() !== 2) problems.push(`expected 2 lead requests, saw ${leadRequests()}`);
  }
  return { ok: problems.length === 0, stamp, requestsWithoutConsent: afterRefusal, submitted, problems };
})()
