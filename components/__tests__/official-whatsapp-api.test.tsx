import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/use-website-experiment", () => ({ useWebsiteExperiment: () => null }));

import Hero from "@/components/hero";
import HomePricingSection from "@/components/home-pricing-section";
import { homeFaqItems } from "@/data/faq-items";

describe("official WhatsApp API on the home page", () => {
  it("is the badge above the hero title", () => {
    const markup = renderToStaticMarkup(<Hero />);
    const badge = markup.indexOf("API oficial do WhatsApp");
    expect(badge).toBeGreaterThan(-1);
    expect(badge).toBeLessThan(markup.indexOf("<h1"));
  });

  it("answers whether the number can be blocked without promising zero risk", () => {
    const item = homeFaqItems.find((entry) => entry.question === "Meu número pode ser bloqueado?");
    expect(item?.answer).toContain("API oficial do WhatsApp");
    expect(item?.answer).toContain("Provedor de Tecnologia verificado pela Meta");
    expect(item?.answer).not.toMatch(/sem risco|nunca|parceir/i);
  });

  it("is listed with the purchase facts below the plans", () => {
    const markup = renderToStaticMarkup(<HomePricingSection />);
    expect(markup).toContain("API oficial do WhatsApp");
    expect(markup).toContain("A Devled, que faz a Flowo, é Provedor de Tecnologia verificado pela Meta.");
  });
});
