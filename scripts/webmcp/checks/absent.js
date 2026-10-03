// For a Chrome without WebMCP: nothing is registered and the tools chunk is never loaded.
(async () => {
  const problems = [];
  if (document.modelContext) problems.push("document.modelContext exists; run this check without the WebMCP flag");
  if (document.documentElement.dataset.webmcp !== undefined) problems.push(`dataset.webmcp=${document.documentElement.dataset.webmcp}`);
  const scripts = performance
    .getEntriesByType("resource")
    .filter((entry) => entry.initiatorType === "script" || entry.name.endsWith(".js"))
    .map((entry) => entry.name);
  let toolChunk = null;
  for (const src of scripts) {
    const text = await fetch(src).then((response) => response.text()).catch(() => "");
    if (text.includes("Busca nas perguntas frequentes oficiais")) {
      toolChunk = src;
      break;
    }
  }
  if (toolChunk) problems.push(`tools chunk loaded: ${toolChunk}`);
  return { ok: problems.length === 0, scriptsChecked: scripts.length, problems };
})()
