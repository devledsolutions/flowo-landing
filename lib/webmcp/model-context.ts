/**
 * The WebMCP API, only when the browser has it and the page is the top-level
 * document (agents ignore tools registered inside iframes). Kept free of other
 * imports so the site-wide mount stays tiny for normal visitors.
 */
export function getModelContext(): ModelContext | null {
  if (typeof window === "undefined" || typeof document === "undefined") return null;
  if (window.top !== window) return null;
  const modelContext = document.modelContext;
  return typeof modelContext?.registerTool === "function" ? modelContext : null;
}
