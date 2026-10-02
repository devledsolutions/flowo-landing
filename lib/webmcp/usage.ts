import { WEBMCP_TEST_SESSION_KEY, type ToolName, type ToolOutcome } from "./tool-names";

export const WEBMCP_USAGE_ENDPOINT = "/api/webmcp-usage";
export const WEBMCP_TRACK_EVENT = "WebMCP Tool Called";

type Report = { tool: ToolName; outcome: ToolOutcome; durationMs: number };
type Track = (event: string, properties?: object) => void;

function isSmokeTest(): boolean {
  try {
    return window.sessionStorage.getItem(WEBMCP_TEST_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function sendUsage(body: string): void {
  try {
    if (typeof navigator.sendBeacon === "function") {
      const queued = navigator.sendBeacon(
        WEBMCP_USAGE_ENDPOINT,
        new Blob([body], { type: "application/json" }),
      );
      if (queued) return;
    }
  } catch {
    // Fall back to fetch below.
  }
  void fetch(WEBMCP_USAGE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
    keepalive: true,
    body,
  }).catch(() => {
    // The counter is best effort.
  });
}

/**
 * Two sinks, neither of which ever sees what was typed into a tool:
 * (a) an aggregate counter without cookies or identifiers, for every visitor;
 * (b) the consented analytics event, which `track` drops without consent.
 */
export function createUsageReporter(getTrack: () => Track) {
  return ({ tool, outcome, durationMs }: Report): void => {
    sendUsage(
      JSON.stringify({
        tool,
        outcome,
        path: window.location.pathname,
        teste: isSmokeTest(),
      }),
    );
    getTrack()(WEBMCP_TRACK_EVENT, { tool_name: tool, outcome, duration_ms: durationMs });
  };
}
