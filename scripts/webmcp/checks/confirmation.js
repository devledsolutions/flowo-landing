// The visitor's confirmation for a contact request made by an AI assistant.
// CHECK_ARGS='{"mode":"approve"}'   clicks "Autorizar e enviar"; expects one request (optional "expect": outcome code).
// CHECK_ARGS='{"mode":"cancel"}'    clicks "Cancelar"; nothing is sent.
// CHECK_ARGS='{"mode":"escape"}'    run with KEYS=Escape; nothing is sent.
// CHECK_ARGS='{"mode":"keyboard"}'  run with KEYS=Tab,Enter; focus starts on Cancelar, Tab reaches the approve button.
// CHECK_ARGS='{"mode":"timeout"}'   waits for the 90 s limit; nothing is sent.
// CHECK_ARGS='{"mode":"show"}'      leaves the panel open, for a screenshot.
(async () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const args = globalThis.__webmcpCheckArgs || {};
  const mode = args.mode || "cancel";
  const mc = document.modelContext;
  if (!mc) return { ok: false, problems: ["document.modelContext is missing"] };
  const tool = (await mc.getTools()).find((item) => item.name === "falar_com_vendas");
  const findDialog = () => document.querySelector('[role="dialog"][aria-labelledby="agent-confirmation-title"]');
  const leadRequests = () =>
    performance.getEntriesByType("resource").filter((entry) => entry.name.includes("/api/lead-capture")).length;
  const button = (dialog, label) =>
    Array.from(dialog.querySelectorAll("button")).find((item) => item.textContent.trim() === label);
  const stamp = Date.now().toString(36);
  // Reserved test number (+1 555 ...), unique per run: the backend refuses the same contact twice in a row.
  const testPhone = `+1555${String(Date.now() % 10_000_000).padStart(7, "0")}`;
  const email = `flowo-qa-webmcp-confirm-${stamp}@flowo.com.br`;
  const problems = [];

  performance.clearResourceTimings();
  const pending = mc
    .executeTool(
      tool,
      JSON.stringify({
        nome: "Teste WebMCP",
        whatsapp: testPhone,
        email,
        nome_barbearia: "Barbearia Teste WebMCP",
        mensagem: "",
        consentimento: true,
      }),
    )
    .then((raw) => (typeof raw === "string" ? JSON.parse(raw) : raw));

  let dialog = null;
  for (let waited = 0; waited < 5000 && !dialog; waited += 100) {
    dialog = findDialog();
    if (!dialog) await sleep(100);
  }
  if (!dialog) return { ok: false, problems: ["the confirmation panel did not appear"] };
  await sleep(300);

  const panelText = dialog.textContent;
  const active = document.activeElement;
  const focused = active && active.tagName === "BUTTON" ? active.textContent.trim() : active && active.tagName;
  const banner = document.querySelector("[data-cookie-banner]");
  const overlapsBanner = banner ? dialog.getBoundingClientRect().bottom > banner.getBoundingClientRect().top + 1 : false;
  if (!panelText.includes(email) || !panelText.includes(testPhone) || !panelText.includes("Barbearia Teste WebMCP")) {
    problems.push("the panel does not show the data to be sent");
  }
  if (panelText.includes("Mensagem")) problems.push("an empty message was shown as a field");
  if (!panelText.includes("Autorizo a Flowo a usar estes dados para responder meu contato")) problems.push("consent text missing");
  if (focused !== "Cancelar") problems.push(`focus starts on ${focused}`);
  if (overlapsBanner) problems.push("the panel covers the cookie notice");
  await sleep(500);
  if (leadRequests() !== 0) problems.push("a request left before the click");

  if (mode === "show") return { ok: problems.length === 0, panelVisible: true, bannerVisible: Boolean(banner), problems };
  if (mode === "approve") button(dialog, "Autorizar e enviar").click();
  if (mode === "cancel") button(dialog, "Cancelar").click();

  const result = await pending;
  await sleep(500);
  const expected =
    mode === "approve" || mode === "keyboard"
      ? args.expect || "ok"
      : { cancel: "cancelado_pela_pessoa", escape: "cancelado_pela_pessoa", timeout: "verificacao_pendente" }[mode];
  const outcome = result.ok ? "ok" : result.erro.codigo;
  const sent = leadRequests();
  if (outcome !== expected) problems.push(`expected ${expected}, got ${outcome}`);
  if (findDialog()) problems.push("the panel is still open");
  const shouldSend = mode === "approve" || mode === "keyboard";
  if (sent !== (shouldSend ? 1 : 0)) problems.push(`lead requests: ${sent}`);
  return { ok: problems.length === 0, mode, outcome, sent, focused, bannerVisible: Boolean(banner), overlapsBanner, email, result, problems };
})()
