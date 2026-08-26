"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { useWebsiteExperiment } from "@/hooks/use-website-experiment";

export function HeroExperimentCopy() {
  const variant = useWebsiteExperiment("homepage-hero-proof-v1");
  const challenger = variant === "challenger";
  return (
    <>
      <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-ink">
        Você continua no corte; o cliente recebe os horários livres e o agendamento fica na agenda.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <TrackedLink
          href="#produto-em-acao"
          event="CTA Clicked"
          properties={{
            page: "/",
            placement: "hero",
            destination: "product_story",
            intent: "see_product",
            experiment_key: "homepage-hero-proof-v1",
            variant_key: variant ?? "unassigned",
          }}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors duration-200 hover:bg-ink/90 sm:w-auto"
        >
          {challenger ? "Ver conversa e agenda" : "Ver o Flowo em ação"}
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </TrackedLink>
        <TrackedLink
          href="#precos"
          event="CTA Clicked"
          properties={{
            page: "/",
            placement: "hero",
            destination: "pricing",
            intent: "compare_plans",
            experiment_key: "homepage-hero-proof-v1",
            variant_key: variant ?? "unassigned",
          }}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-surface/70 px-7 text-label font-semibold text-ink transition-colors duration-200 hover:bg-surface sm:w-auto"
        >
          Ver planos
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </>
  );
}
