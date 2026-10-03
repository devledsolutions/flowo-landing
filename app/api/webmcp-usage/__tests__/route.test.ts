import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  applyRateLimit: vi.fn(),
  captureLandingUsage: vi.fn(),
}));

vi.mock("@/lib/rate-limit", () => ({ applyRateLimit: mocks.applyRateLimit }));
vi.mock("@/lib/observability/posthog-server", () => ({ captureLandingUsage: mocks.captureLandingUsage }));

import { POST } from "../route";

function request(body: unknown, headers: Record<string, string> = { "sec-fetch-site": "same-origin" }) {
  return new Request("http://localhost:3001/api/webmcp-usage", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.resetAllMocks();
  mocks.applyRateLimit.mockResolvedValue({ allowed: true, retryAfterSeconds: 60 });
  mocks.captureLandingUsage.mockResolvedValue(undefined);
});

describe("POST /api/webmcp-usage", () => {
  it("counts a valid call once and answers 204", async () => {
    const response = await POST(request({ tool: "ver_planos", outcome: "ok", path: "/precos", teste: true }));
    expect(response.status).toBe(204);
    expect(mocks.captureLandingUsage).toHaveBeenCalledExactlyOnceWith("webmcp_tool_called", {
      tool: "ver_planos",
      outcome: "ok",
      path: "/precos",
      teste: true,
    });
  });

  it("uses a separate key in the existing per-minute policy", async () => {
    await POST(
      request({ tool: "ver_planos", outcome: "ok", path: "/" }, { "sec-fetch-site": "same-origin", "x-forwarded-for": "203.0.113.9" }),
    );
    expect(mocks.applyRateLimit).toHaveBeenCalledWith({
      bucket: "growth-signal",
      key: "webmcp:203.0.113.9",
      limit: 60,
      windowMs: 60_000,
    });
    expect(JSON.stringify(mocks.captureLandingUsage.mock.calls)).not.toContain("203.0.113.9");
  });

  it.each([
    [{ tool: "apagar_tudo", outcome: "ok", path: "/" }],
    [{ tool: "ver_planos", outcome: "talvez", path: "/" }],
    [{ tool: "ver_planos", outcome: "ok", path: "https://evil.example" }],
    [{ tool: "ver_planos", outcome: "ok", path: "/precos?email=a@b.c" }],
    [{ tool: "ver_planos", outcome: "ok", path: "/", nome: "Pessoa" }],
    ["not json"],
  ])("rejects %j with 400 and counts nothing", async (body) => {
    const response = await POST(request(body));
    expect(response.status).toBe(400);
    expect(mocks.captureLandingUsage).not.toHaveBeenCalled();
  });

  it("answers 429 when the limit is reached", async () => {
    mocks.applyRateLimit.mockResolvedValueOnce({ allowed: false, retryAfterSeconds: 12 });
    const response = await POST(request({ tool: "ver_planos", outcome: "ok", path: "/" }));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("12");
    expect(mocks.captureLandingUsage).not.toHaveBeenCalled();
  });

  it("never reads the cookie header", async () => {
    const req = request({ tool: "ver_planos", outcome: "ok", path: "/" }, { "sec-fetch-site": "same-origin", cookie: "cookieConsent=x" });
    const get = vi.spyOn(req.headers, "get");
    await POST(req);
    expect(get.mock.calls.map(([name]) => String(name).toLowerCase())).not.toContain("cookie");
  });
});

describe("only the site's own pages may count", () => {
  const VALID = { tool: "ver_planos", outcome: "ok", path: "/" };

  it.each([
    [{ "sec-fetch-site": "same-origin" }, 204],
    [{ "sec-fetch-site": "same-site" }, 204],
    [{ "sec-fetch-site": "cross-site", origin: "http://localhost:3001" }, 403],
    [{ "sec-fetch-site": "none" }, 403],
    [{ origin: "http://localhost:3001" }, 204],
    [{ origin: "https://evil.example" }, 403],
    [{}, 403],
  ] as const)("headers %j answer %i", async (headers, status) => {
    const response = await POST(request(VALID, { ...headers }));
    expect(response.status).toBe(status);
    expect(mocks.captureLandingUsage).toHaveBeenCalledTimes(status === 204 ? 1 : 0);
  });

  it("refuses a cross-site request before touching the rate limit", async () => {
    await POST(request(VALID, { "sec-fetch-site": "cross-site" }));
    expect(mocks.applyRateLimit).not.toHaveBeenCalled();
  });
});
