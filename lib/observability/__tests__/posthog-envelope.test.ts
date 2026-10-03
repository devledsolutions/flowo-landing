import { describe, expect, it } from "vitest";
import { sanitizeLandingPostHogEvent } from "../posthog-shared";

const publicProjectKey = "phc_public_project_fixture";

describe("PostHog SDK ingestion envelope", () => {
  it("preserves the configured public ingestion key without exposing other tokens", () => {
    const event = sanitizeLandingPostHogEvent({
      event: "$exception",
      properties: {
        token: publicProjectKey,
        details: { token: "private-credential", email: "customer@example.com" },
      },
    }, publicProjectKey);
    expect(event?.properties).toEqual({
      token: publicProjectKey,
      details: { token: "[Redacted]", email: "[Redacted]" },
    });
  });

  it("does not exempt an arbitrary token because it is named token", () => {
    const event = sanitizeLandingPostHogEvent({
      event: "$pageview", properties: { token: "private-credential" },
    }, publicProjectKey);
    expect(event?.properties.token).toBe("[Redacted]");
  });

  it("preserves page metadata and SDK identifiers while removing URL credentials", () => {
    const event = sanitizeLandingPostHogEvent({
      event: "$pageview",
      properties: {
        token: publicProjectKey,
        $pathname: "/recursos",
        $session_id: "019a1234-1234-7123-8123-123456789012",
        $current_url: "https://flowo.com.br/recursos?code=private#secret",
        $referrer: "https://example.com/?token=private",
      },
    }, publicProjectKey);
    expect(event?.properties).toEqual({
      token: publicProjectKey,
      $pathname: "/recursos",
      $session_id: "019a1234-1234-7123-8123-123456789012",
      $current_url: "https://flowo.com.br/recursos",
      $referrer: "https://example.com/",
    });
  });

  it("does not recursively truncate the already-protected rrweb snapshot", () => {
    const snapshot = [{ type: 2, data: { node: {
      type: 0, childNodes: [{ type: 2, tagName: "html", childNodes: [{
        type: 2, tagName: "body", childNodes: [{ type: 2, tagName: "main", childNodes: [{
          type: 3, textContent: "Agenda da barbearia", id: 12,
        }] }],
      }] }],
    } }, timestamp: 1791000000000 }];
    const event = sanitizeLandingPostHogEvent({
      event: "$snapshot",
      properties: { token: publicProjectKey, $snapshot_data: snapshot },
    }, publicProjectKey);
    expect(event?.properties.$snapshot_data).toEqual(snapshot);
  });

  it("retains the SDK's protected autocapture structure", () => {
    const elements = [{ tag_name: "button", $el_text: "Ver planos" }];
    const event = sanitizeLandingPostHogEvent({
      event: "$autocapture", properties: { token: publicProjectKey, $elements: elements },
    }, publicProjectKey);
    expect(event?.properties.$elements).toEqual(elements);
  });
});
