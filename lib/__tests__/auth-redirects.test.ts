import { describe, expect, it } from "vitest";
import { authRedirects } from "../auth-redirects";

describe("authRedirects", () => {
  it("sends the marketing domain's auth paths to the app origin", () => {
    expect(authRedirects("https://barber.flowo.com.br/")).toEqual([
      {
        source: "/sign-in",
        destination: "https://barber.flowo.com.br/sign-in",
        permanent: false,
      },
      {
        source: "/sign-in/:rest*",
        destination: "https://barber.flowo.com.br/sign-in/:rest*",
        permanent: false,
      },
      {
        source: "/sign-up",
        destination: "https://barber.flowo.com.br/sign-up",
        permanent: false,
      },
      {
        source: "/sign-up/:rest*",
        destination: "https://barber.flowo.com.br/sign-up/:rest*",
        permanent: false,
      },
    ]);
  });

  it("drops any path, query or credentials from the configured app URL", () => {
    const [first] = authRedirects("https://barber.flowo.com.br/painel?x=1");
    expect(first.destination).toBe("https://barber.flowo.com.br/sign-in");
  });

  it("adds no redirect without a usable app URL", () => {
    expect(authRedirects(undefined)).toEqual([]);
    expect(authRedirects("  ")).toEqual([]);
    expect(authRedirects("not a url")).toEqual([]);
    expect(authRedirects("http://barber.flowo.com.br")).toEqual([]);
  });
});
