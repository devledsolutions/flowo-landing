"use client";

import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { useWebsiteExperiment } from "@/hooks/use-website-experiment";

/**
 * `fora` is the home hero: one centred 14px lead and a single light pill CTA,
 * boxed to the reference (lead 420px wide, CTA 172x48, gaps 16 and 48).
 */
export function HeroExperimentCopy({ align = "start" }: { align?: "start" | "center" | "fora" | "flowo" }) {
  const variant = useWebsiteExperiment("homepage-hero-proof-v1");
  const challenger = variant === "challenger";
  const label = challenger ? "Ver conversa e agenda" : "Ver uma conversa completa";
  const props = {
    page: "/",
    placement: "hero",
    destination: "booking_validation_demo",
    intent: "see_product",
    experiment_key: "homepage-hero-proof-v1",
    variant_key: variant ?? "unassigned",
  };

  if (align === "flowo") {
    return (
      <>
        <p className="mx-auto mt-5 max-w-[30rem] text-lead text-muted-ink">
          Ela consulta a agenda de cada barbeiro e confirma o horário pelo WhatsApp. Você
          continua atendendo.
        </p>
        <div className="mt-9 flex justify-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:duration-[600ms] motion-safe:delay-[240ms]">
          <TrackedLink
            href="/demonstracao-agendamento-whatsapp"
            event="CTA Clicked"
            properties={props}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors duration-200 hover:bg-ink/90"
          >
            {label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </>
    );
  }

  if (align === "fora") {
    return (
      <>
        <p className="mx-auto mt-4 max-w-[420px] text-[14px] leading-[21px] text-white/80">
          Ela consulta a agenda de cada barbeiro e confirma o horário pelo WhatsApp. Você
          continua atendendo.
        </p>
        <div className="mt-12 flex justify-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:duration-[600ms] motion-safe:delay-[240ms]">
          <TrackedLink
            href="/demonstracao-agendamento-whatsapp"
            event="CTA Clicked"
            properties={props}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[rgb(255,243,240)] bg-white/80 px-5 text-[14px] font-medium text-[rgb(1,16,29)] transition-colors duration-200 hover:bg-white"
          >
            {label}
          </TrackedLink>
        </div>
      </>
    );
  }

  const centered = align === "center";
  return (
    <>
      <p className={centered ? "mx-auto mt-6 max-w-[34rem] text-lead text-muted-ink" : "mt-6 max-w-[30rem] text-lead text-muted-ink"}>
        Ela consulta a agenda de cada barbeiro e confirma o horário pelo
        WhatsApp. Você continua atendendo.
      </p>
      <div className={centered ? "mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center" : "mt-8 flex flex-col gap-3 sm:flex-row"}>
        <TrackedLink
          href="/demonstracao-agendamento-whatsapp"
          event="CTA Clicked"
          properties={props}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors duration-200 hover:bg-ink/90 sm:w-auto"
        >
          {label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </TrackedLink>
        <TrackedLink
          href="#precos"
          event="CTA Clicked"
          properties={{ ...props, destination: "pricing", intent: "compare_plans" }}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-surface/70 px-7 text-label font-semibold text-ink transition-colors duration-200 hover:bg-surface sm:w-auto"
        >
          Ver planos
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </>
  );
}
