// Lead tools. Without consent nothing is sent and no panel opens. With CHECK_ARGS='{"submit":true}'
// it also sends one sales request and one material request with test contacts, with a real
// click (CDP mouse events from the driver) on "Autorizar e enviar" in the panel for each.
(async () => {
  const mc = document.modelContext;
  if (!mc) return { ok: false, problems: ["document.modelContext is missing"] };
  const args = globalThis.__webmcpCheckArgs || {};
  const tools = Object.fromEntries((await mc.getTools()).map((tool) => [tool.name, tool]));
  const problems = [];
  const leadRequests = () =>
    performance.getEntriesByType("resource").filter((entry) => entry.name.includes("/api/lead-capture")).length;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const findDialog = () => document.querySelector('[role="dialog"][aria-labelledby="agent-confirmation-title"]');
  async function run(name, input) {
    const raw = await mc.executeTool(tools[name], JSON.stringify(input));
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  }
  // The person approves in the page: the request only leaves after this click.
  async function runApproved(name, input) {
    const pending = run(name, input);
    let dialog = null;
    for (let waited = 0; waited < 5000 && !dialog; waited += 100) {
      dialog = findDialog();
      if (!dialog) await sleep(100);
    }
    if (!dialog) {
      problems.push(`${name}: no confirmation panel`);
      return pending;
    }
    if (leadRequests() !== sentBefore()) problems.push(`${name}: request before the click`);
    if (!globalThis.__webmcpRealInput) {
      problems.push("run this check through scripts/webmcp/cdp.mjs");
      return pending;
    }
    await globalThis.__webmcpRealInput({ click: "Autorizar e enviar" });
    return pending;
  }
  let baseline = 0;
  const sentBefore = () => baseline;
  const stamp = Date.now().toString(36);
  // Reserved test number (+1 555 ...), unique per run: the backend refuses the same contact twice in a row.
  const testPhone = `+1555${String(Date.now() % 10_000_000).padStart(7, "0")}`;
  const sales = {
    nome: "Teste WebMCP",
    whatsapp: testPhone,
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
  if (findDialog()) problems.push("a confirmation panel opened without consent");

  const submitted = {};
  if (args.submit === true) {
    baseline = leadRequests();
    submitted.sales = await runApproved("falar_com_vendas", { ...sales, consentimento: true });
    if (!submitted.sales.ok) problems.push(`falar_com_vendas failed: ${JSON.stringify(submitted.sales.erro)}`);
    baseline = leadRequests();
    submitted.material = await runApproved("receber_material", {
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
