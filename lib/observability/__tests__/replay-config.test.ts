// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { REPLAY_SECRET_SELECTOR, replayUrlWithoutSecrets, webReplayOptions } from "../replay-config";

describe("remote replay policy with a credential safety floor", () => {
  it("leaves general masking and sampling to the remote project", () => {
    expect(webReplayOptions).not.toHaveProperty("maskAllInputs");
    expect(webReplayOptions).not.toHaveProperty("maskTextSelector");
    expect(webReplayOptions).not.toHaveProperty("sampleRate");
  });
  it.each([
    '<input type="password" value="secret">',
    '<input autocomplete="one-time-code" value="123456">',
    '<input autocomplete="cc-number" value="4111111111111111">',
    '<input autocomplete="cc-csc" value="123">',
    '<input name="accessToken" value="secret">',
    '<input id="webhook-secret" value="secret">',
    '<textarea data-replay-secret>secret</textarea>',
    '<div class="ph-no-capture">secret</div>',
    '<div class="cl-rootBox">authentication</div>',
  ])("excludes credential/payment controls: %s", (html) => {
    document.body.innerHTML = html;
    expect(document.querySelector(REPLAY_SECRET_SELECTOR)).not.toBeNull();
  });
  it("does not blanket-mask ordinary customer information", () => {
    document.body.innerHTML = '<input name="customerName"><input type="tel"><p>Agenda</p>';
    expect(document.querySelector(REPLAY_SECRET_SELECTOR)).toBeNull();
  });
  it("disables payloads, headers and cross-origin frames", () => {
    expect(webReplayOptions).toMatchObject({
      recordHeaders: false, recordBody: false, recordCrossOriginIframes: false,
    });
  });
  it.each([
    ["https://flowo.com.br/auth-callback?code=secret#access_token=secret", "https://flowo.com.br/auth-callback"],
    ["/agenda?token=secret#otp", "/agenda"],
    ["https://user:secret@example.com/path?jwt=secret", "https://example.com/path"],
    ["https://barber.flowo.com.br/horario-disponivel/opaque-secret", "https://barber.flowo.com.br/horario-disponivel/[token]"],
    ["/assinatura/opaque-secret?code=secret", "/assinatura/[token]"],
  ])("removes URL credentials and query/hash: %s", (input, expected) => {
    expect(replayUrlWithoutSecrets(input)).toBe(expected);
  });
});
