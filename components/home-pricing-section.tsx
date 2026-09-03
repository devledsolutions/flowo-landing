"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Check } from "lucide-react";
import { PricingToggle } from "@/components/pricing/pricing-toggle";
import {
  ANNUAL_DISCOUNT_LABEL,
  formatBRL,
  planPriceForCycle,
  PLANS,
  type BillingCycle,
  type Plan,
} from "@/data/pricing-data";
import { cn } from "@/lib/utils";
import { buildSignupUrl } from "@/components/cta-links";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { useSegment } from "@/providers/segment-provider";
import { useWebsiteExperiment } from "@/hooks/use-website-experiment";
import { ENTERPRISE_EXPERIMENT_KEY } from "@/components/pricing/pricing-card";

const LeadCaptureModal = dynamic(
  () =>
    import("@/components/lead-capture-modal").then(
      (module) => module.LeadCaptureModal,
    ),
  {
    ssr: false,
    loading: () => (
      <button type="button" className={cn(CTA, "opacity-75")} disabled>
        Abrindo…
      </button>
    ),
  },
);

/**
 * Pricing on the fora.so composition, in Flowo's skin.
 *
 * Measured on the reference at 1440x900, relative to the section top: a chip
 * at +184, the h2 at +238, one panel at +410 (1080 x 667, radius 16) with
 * three 360px columns; the middle column rises 16px above the panel and
 * carries the primary CTA. Inside a column, 36px of padding, the tier label
 * at +60 over a hairline, the price at +118, a two-line description at +182,
 * a 36px pill CTA at +253, and feature rows from +325 on a 61px pitch. On a
 * phone the three tiers stack inside one card on a 49px pitch.
 *
 * Every price comes from data/pricing-data.ts; nothing here types a number.
 */
const CTA =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-5 text-[14px] font-medium transition-colors duration-200";
const CTA_PRIMARY = cn(CTA, "bg-ink text-cream hover:bg-ink/90");
const CTA_SECONDARY = cn(CTA, "border border-control-border text-ink hover:bg-surface-2");

const purchaseFacts = [
  ["Antes de conectar o WhatsApp", "A gente confere com você se o número atual pode ser usado."],
  ["A gente configura com você", "Serviços, equipe, horários e respostas são revisados antes da ativação."],
  ["14 dias para clientes elegíveis", "A avaliação assistida não pede cartão nem renova automaticamente."],
  ["Você pode cancelar", "Cancele no Flowo ou na loja onde assinou, sem multa de fidelidade."],
] as const;

function Price({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) {
  if (plan.salesLed) {
    return (
      <p className="mt-7 text-[36px] font-medium leading-none tracking-[-0.03em] text-ink-strong">
        {plan.consultationLabel}
      </p>
    );
  }
  const price = planPriceForCycle(plan, cycle);
  return (
    <p className="mt-7 flex items-baseline gap-1.5 text-ink-strong">
      <span className="text-[16px] font-medium">R$</span>
      {/* Re-keyed on the cycle so the number arrives, the way the reference switches it. */}
      <span
        key={cycle}
        className="text-[36px] font-medium leading-none tracking-[-0.03em] tabular-nums motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-200 motion-safe:ease-out"
      >
        {price.toLocaleString("pt-BR")}
      </span>
      <span className="text-[16px] text-muted-ink">/mês</span>
    </p>
  );
}

export default function HomePricingSection() {
  const { track } = useSegment();
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);
  const experimentVariant = useWebsiteExperiment(ENTERPRISE_EXPERIMENT_KEY);
  const implementationVariant = experimentVariant === "implementation";

  useEffect(() => {
    track("Pricing Viewed", { page: "/", billing_cycle: cycle, plan_count: PLANS.length });
  }, [cycle, track]);

  useEffect(() => {
    if (!experimentVariant) return;
    track("Enterprise Offer Viewed", {
      page: "/",
      placement: "pricing_card_empresarial",
      experiment_key: ENTERPRISE_EXPERIMENT_KEY,
      experiment_variant: experimentVariant,
    });
  }, [experimentVariant, track]);

  const onCycleChange = (nextCycle: BillingCycle) => {
    setCycle(nextCycle);
    track("Pricing Cycle Changed", { page: "/", billing_cycle: nextCycle });
  };

  return (
    <div className="mx-auto w-full max-w-[1080px] px-1 pt-12 lg:px-0 lg:pt-16">
      <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-3 py-1 text-[14px] leading-[21px] text-muted-ink">
        <i aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-ink" />
        Planos
      </span>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <header className="max-w-[560px]">
          <h2 className="text-[32px] font-medium leading-[1.34] tracking-[-0.025em] text-ink-strong lg:text-[40px] lg:leading-[1.35]">
            Você trabalha sozinho ou tem uma equipe?
          </h2>
          <p className="mt-2 text-[16px] leading-6 text-muted-ink">
            Escolha pelo número de profissionais. O atendimento no WhatsApp está nos dois planos.
          </p>
        </header>
        <PricingToggle cycle={cycle} onCycleChange={onCycleChange} />
      </div>

      <div className="mt-6 grid rounded-2xl border border-line bg-surface lg:mt-1 lg:grid-cols-3 lg:items-start">
        {PLANS.map((plan) => {
          const highlighted = plan.id === "equipe";
          const signupUrl = plan.salesLed
            ? null
            : buildSignupUrl({ plan: plan.id, cycle, campaign: "homepage_pricing", content: `pricing_card_${plan.id}` });
          const features = plan.features.slice(0, 6);

          return (
            <article
              key={plan.id}
              id={`plano-${plan.id}`}
              aria-label={`Plano ${plan.name}`}
              className={cn(
                "scroll-mt-24 px-9 pb-6 pt-[60px] first:rounded-t-2xl last:rounded-b-2xl lg:first:rounded-r-none lg:last:rounded-l-none",
                highlighted && "on-ink rounded-2xl lg:-mt-4 lg:rounded-t-2xl lg:rounded-b-none lg:pt-[76px]"
              )}
            >
              <p className="border-b border-line pb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-muted-ink">
                {plan.name}
              </p>

              <Price plan={plan} cycle={cycle} />

              <p className="mt-6 min-h-[42px] max-w-[240px] text-[14px] leading-[21px] text-muted-ink">
                {plan.salesLed
                  ? plan.description
                  : cycle === "yearly"
                    ? `${formatBRL(plan.annualTotal)} cobrados uma vez ao ano · ${ANNUAL_DISCOUNT_LABEL}`
                    : plan.description}
              </p>

              <div className="mt-[29px]">
                {plan.salesLed ? (
                  showEnterpriseForm ? (
                    <LeadCaptureModal
                      initiallyOpen
                      intent="enterprise"
                      source="enterprise_home_pricing"
                      experimentKey={ENTERPRISE_EXPERIMENT_KEY}
                      experimentVariant={experimentVariant}
                    >
                      <button type="button" className={CTA_SECONDARY}>
                        {implementationVariant ? "Planejar implantação" : "Falar com um especialista"}
                      </button>
                    </LeadCaptureModal>
                  ) : (
                    <button
                      type="button"
                      className={CTA_SECONDARY}
                      onClick={() => {
                        track("Enterprise CTA Clicked", {
                          source: "enterprise_home_pricing",
                          experiment_key: ENTERPRISE_EXPERIMENT_KEY,
                          experiment_variant: experimentVariant,
                        });
                        track("Enterprise Form Started", {
                          source: "enterprise_home_pricing",
                          experiment_key: ENTERPRISE_EXPERIMENT_KEY,
                          experiment_variant: experimentVariant,
                        });
                        setShowEnterpriseForm(true);
                      }}
                    >
                      {implementationVariant ? "Planejar implantação" : "Falar com um especialista"}
                    </button>
                  )
                ) : signupUrl ? (
                  <TrackedLink
                    href={signupUrl}
                    event="CTA Clicked"
                    properties={{
                      page: "/",
                      placement: `pricing_card_${plan.id}`,
                      destination: "dashboard_signup",
                      intent: "start_plan",
                      billing_cycle: cycle,
                      plan_id: plan.id,
                      displayed_price: planPriceForCycle(plan, cycle),
                    }}
                    onClick={() => {
                      track("Plan Selected", {
                        page: "/",
                        placement: `pricing_card_${plan.id}`,
                        plan_id: plan.id,
                        billing_cycle: cycle,
                        displayed_price: planPriceForCycle(plan, cycle),
                      });
                    }}
                    className={highlighted ? CTA_PRIMARY : CTA_SECONDARY}
                  >
                    Criar minha conta
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                ) : null}
              </div>

              <ul className="mt-9 max-w-[288px]">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex h-[49px] items-center gap-[13px] border-b border-line text-[14px] text-ink last:border-b-0 lg:h-[61px]"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-ink">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="mt-10 border-y border-line bg-surface">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {purchaseFacts.map(([title, description]) => (
            <div
              key={title}
              className="border-b border-line p-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r-0 lg:p-6"
            >
              <h3 className="text-sm font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-caption leading-relaxed text-muted-ink">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
