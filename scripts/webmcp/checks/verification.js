// Security check on demand for the contact tools. Run with a Turnstile site key configured.
// CHECK_ARGS='{"mode":"pass"}'    with the always-pass test key: one request goes out.
// CHECK_ARGS='{"mode":"cancel"}'  with the interactive test key: the visitor cancels, nothing is sent.
// CHECK_ARGS='{"mode":"timeout"}' with the interactive test key: after 30 s, nothing is sent.
// CHECK_ARGS='{"mode":"show"}'    leaves the panel open, for a screenshot.
(async () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const mode = (globalThis.__webmcpCheckArgs || {}).mode || "cancel";
  const mc = document.modelContext;
  if (!mc) return { ok: false, problems: ["document.modelContext is missing"] };
  const tool = (await mc.getTools()).find((item) => item.name === "falar_com_vendas");
  const findPanel = () =>
    Array.from(document.querySelectorAll('[role="status"]')).find((element) =>
      element.textContent.includes("Um assistente de IA pediu"),
    );
  let panelSeen = false;
  const observer = new MutationObserver(() => {
    if (findPanel()) panelSeen = true;
  });
  observer.observe(document.body, { childList: true, subtree: true });
  const stamp = Date.now().toString(36);
  performance.clearResourceTimings();
  const pending = mc
    .executeTool(
      tool,
      JSON.stringify({
        nome: "Teste WebMCP",
        whatsapp: "+1 555 010 0002",
        email: `flowo-qa-webmcp-verif-${stamp}@flowo.com.br`,
        consentimento: true,
      }),
    )
    .then((raw) => (typeof raw === "string" ? JSON.parse(raw) : raw));

  await sleep(3000);
  if (mode === "show") {
    observer.disconnect();
    return { ok: Boolean(findPanel()), panelVisible: Boolean(findPanel()) };
  }
  if (mode === "cancel") {
    const cancel = Array.from(findPanel()?.querySelectorAll("button") || []).find(
      (button) => button.textContent.trim() === "Cancelar",
    );
    cancel?.click();
  }
  const result = await pending;
  observer.disconnect();
  await sleep(300);
  const leadRequests = performance
    .getEntriesByType("resource")
    .filter((entry) => entry.name.includes("/api/lead-capture")).length;
  const expected = { pass: "ok", cancel: "cancelado_pela_pessoa", timeout: "verificacao_pendente" }[mode];
  const outcome = result.ok ? "ok" : result.erro.codigo;
  const problems = [];
  if (outcome !== expected) problems.push(`expected ${expected}, got ${outcome}`);
  if (!panelSeen) problems.push("the verification panel never appeared");
  if (findPanel()) problems.push("the panel is still open");
  if (leadRequests !== (mode === "pass" ? 1 : 0)) problems.push(`lead requests: ${leadRequests}`);
  return { ok: problems.length === 0, mode, outcome, panelSeen, leadRequests, result, problems };
})()
