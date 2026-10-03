// The consent-free counter accepts known tools and rejects anything else.
(async () => {
  const post = (body) =>
    fetch("/api/webmcp-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      body: JSON.stringify(body),
    }).then((response) => response.status);
  const valid = await post({ tool: "ver_planos", outcome: "ok", path: location.pathname, teste: true });
  const unknown = await post({ tool: "apagar_tudo", outcome: "ok", path: "/" });
  const withData = await post({ tool: "ver_planos", outcome: "ok", path: "/", email: "a@b.c" });
  const problems = [];
  if (valid !== 204) problems.push(`valid call returned ${valid}`);
  if (unknown !== 400) problems.push(`unknown tool returned ${unknown}`);
  if (withData !== 400) problems.push(`extra field returned ${withData}`);
  return { ok: problems.length === 0, valid, unknown, withData, problems };
})()
