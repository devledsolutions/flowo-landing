import type { AutocaptureConfig, SessionRecordingOptions } from "posthog-js";

// General text/input masking and sampling belong to the PostHog project.
// These exclusions are a credential/payment safety floor, not a blanket mask.
export const REPLAY_SECRET_SELECTOR = [
  ".ph-no-capture",
  "[data-replay-secret]",
  'input[type="password"]',
  '[autocomplete="one-time-code"]',
  '[autocomplete^="cc-"]',
  'input[name*="token" i]',
  'input[name*="secret" i]',
  'input[name*="api_key" i]',
  'input[name*="apiKey" i]',
  'input[id*="token" i]',
  'input[id*="secret" i]',
  'a[href*="token=" i]',
  'a[href*="secret=" i]',
  'a[href*="horario-disponivel/"]',
  'a[href*="/contratar/"]',
  'a[href*="/assinatura/"]',
  ".cl-rootBox",
].join(", ");

export const webAutocaptureOptions: AutocaptureConfig = {
  dom_event_allowlist: ["click", "change", "submit"],
  css_selector_ignorelist: [
    ".ph-no-autocapture", "[data-ph-no-autocapture]", REPLAY_SECRET_SELECTOR,
  ],
  // Values and credential-bearing destination attributes are not analytics.
  element_attribute_ignorelist: ["value", "href", "src"],
  capture_copied_text: false,
};

export function replayUrlWithoutSecrets(value: string): string {
  try {
    const url = new URL(value, "https://replay.invalid");
    url.pathname = url.pathname.replace(
      /\/(horario-disponivel|contratar|avaliar|lista-espera|assinatura)\/[^/]+/g,
      "/$1/[token]",
    );
    // Auth callbacks can carry arbitrary provider-specific credential names.
    // Campaign attribution remains in explicit analytics properties.
    return value.startsWith("/") ? url.pathname : url.origin + url.pathname;
  } catch {
    return "[invalid URL]";
  }
}

export const webReplayOptions: SessionRecordingOptions = {
  blockSelector: REPLAY_SECRET_SELECTOR,
  recordCrossOriginIframes: false,
  recordHeaders: false,
  recordBody: false,
  maskCapturedNetworkRequestFn: (request) => ({
    ...request,
    name: replayUrlWithoutSecrets(request.name),
  }),
};
