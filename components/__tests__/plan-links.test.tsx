import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PricingCard } from "@/components/pricing/pricing-card";
import { PlanSelector } from "@/components/marketing/growth-tools/plan-selector";
import { getPlan } from "@/data/pricing-data";

function hrefs(markup: string): URL[] {
  return [...markup.matchAll(/href="([^"]+)"/g)]
    .map((match) => match[1].replaceAll("&amp;", "&"))
    .filter((href) => href.startsWith("http"))
    .map((href) => new URL(href));
}

function signupLinks(markup: string): URL[] {
  return hrefs(markup).filter((url) => url.pathname === "/sign-up");
}

describe("pricing card signup link", () => {
  it.each([
    ["solo", "monthly"],
    ["solo", "yearly"],
    ["equipe", "monthly"],
    ["equipe", "yearly"],
  ] as const)("%s/%s carries the plan and the billing cycle", (planId, cycle) => {
    const markup = renderToStaticMarkup(<PricingCard plan={getPlan(planId)} cycle={cycle} />);
    const [link] = signupLinks(markup);
    expect(link?.origin).toBe("http://localhost:3000");
    expect(link?.searchParams.get("plan")).toBe(planId);
    expect(link?.searchParams.get("cycle")).toBe(cycle);
    expect(link?.searchParams.get("utm_campaign")).toBe("pricing_page");
    expect(link?.searchParams.get("utm_content")).toBe(`pricing_card_${planId}`);
  });

  it("Empresarial never links to signup", () => {
    const markup = renderToStaticMarkup(<PricingCard plan={getPlan("empresarial")} cycle="yearly" />);
    expect(signupLinks(markup)).toEqual([]);
    expect(markup).toContain("Falar com um especialista");
  });
});

describe("plan selector", () => {
  it("asks for professionals and units, not how messages arrive", () => {
    const markup = renderToStaticMarkup(<PlanSelector />);
    expect(markup).toContain("Quantos profissionais atendem na agenda?");
    expect(markup).toContain("Quantas unidades a barbearia tem?");
    expect(markup).not.toContain("Como chegam as mensagens?");
  });

  it("starts signup with the recommended plan and keeps 'Ver detalhes' on /precos", () => {
    const markup = renderToStaticMarkup(<PlanSelector />);
    const [link] = signupLinks(markup);
    expect(link?.searchParams.get("plan")).toBe("equipe");
    expect(link?.searchParams.get("utm_campaign")).toBe("qual_plano");
    expect(link?.searchParams.get("utm_content")).toBe("plan_selector");
    expect(markup).toContain('href="/precos"');
    expect(markup).not.toContain("/precos?plan=");
  });
});
