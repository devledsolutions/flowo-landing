"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { PricingToggle } from "@/components/pricing/pricing-toggle";
import {
  ANNUAL_DISCOUNT_LABEL,
  formatBRL,
  planPriceForCycle,
  PLANS,
  type BillingCycle,
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
      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-5 text-label font-semibold text-cream opacity-75"
        disabled
      >
        Abrindo…
      </button>
    ),
  },
);

const summaryFeatures = {
  solo: [
    "1 profissional",
    "IA atende, agenda e confirma no WhatsApp",
    "Até 200 agendamentos por mês",
  ],
  equipe: [
    "Até 5 profissionais, cada um com seus horários",
    "IA atende, agenda e confirma no WhatsApp",
    "Agendamentos ilimitados",
  ],
  empresarial: [
    "Profissionais ilimitados",
    "Múltiplas unidades",
    "Implantação acompanhada com o time Flowo",
  ],
} as const;

const purchaseFacts = [
  ["Seu número continua", "Os clientes seguem chamando no WhatsApp que já conhecem."],
  ["A configuração é acompanhada", "Serviços, equipe, horários e respostas são revisados com você."],
  ["A cobrança começa na contratação", "A assinatura vale desde o primeiro dia; não há período de teste."],
  ["Sem fidelidade", "Você pode cancelar sem multa e usar até o fim do período já pago."],
] as const;

export default function HomePricingSection() {
  const { track } = useSegment();
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);
  const experimentVariant = useWebsiteExperiment(ENTERPRISE_EXPERIMENT_KEY);
  const implementationVariant = experimentVariant === "implementation";

  useEffect(() => {
    track("Pricing Viewed", {
      page: "/",
      billing_cycle: cycle,
      plan_count: PLANS.length,
    });
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

  return (
    <div>
      <PricingToggle
        cycle={cycle}
        onCycleChange={(nextCycle) => {
          setCycle(nextCycle);
          track("Pricing Cycle Changed", {
            page: "/",
            billing_cycle: nextCycle,
          });
        }}
      />
      <header className="mx-auto mt-8 max-w-4xl text-center">
        <h2 className="text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
          Um plano para cada tamanho de operação.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lead text-muted-ink">
          A IA no WhatsApp está em todos. O que muda é a escala da barbearia.
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-caption font-medium text-ink">
          Assinatura paga desde o início · sem fidelidade · onboarding acompanhado
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-3">
        {PLANS.map((plan) => {
          const highlighted = plan.id === "equipe";
          const price = plan.salesLed ? null : planPriceForCycle(plan, cycle);
          const signupUrl = buildSignupUrl({
            plan: plan.id,
            cycle,
            campaign: "homepage_pricing",
            content: `pricing_card_${plan.id}`,
          });

          return (
            <article
              key={plan.id}
              id={`plano-${plan.id}`}
              aria-label={`Plano ${plan.name}`}
              className={cn(
                "flex min-h-[27rem] scroll-mt-24 flex-col border-b border-line p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-9",
                highlighted && "on-ink"
              )}
            >
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.1em] text-ink">
                  {plan.name}
                </p>
                {highlighted && (
                  <p className="mt-2 text-caption text-muted-ink">Para equipes</p>
                )}
              </div>

              {plan.salesLed ? (
                <>
                  <p className="mt-7 text-[clamp(2.35rem,4vw,3.35rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                    {plan.consultationLabel}
                  </p>
                  <p className="mt-3 min-h-10 text-caption text-muted-ink">
                    {implementationVariant
                      ? "Planejamento, implantação e cobrança definidos com sua equipe."
                      : "Proposta e implantação desenhadas para a sua operação."}
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-7 flex flex-wrap items-baseline gap-x-1.5 text-ink">
                    <span className="text-base font-medium">R$</span>
                    <span className="text-[clamp(2.7rem,4vw,4rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                      {price?.toLocaleString("pt-BR")}
                    </span>
                    <span className="text-label text-muted-ink">/mês</span>
                  </p>
                  <p className="mt-3 min-h-10 text-caption text-muted-ink">
                    {cycle === "yearly"
                      ? `${formatBRL(plan.annualTotal)} cobrados uma vez ao ano · ${ANNUAL_DISCOUNT_LABEL}`
                      : "Cobrança mês a mês"}
                  </p>
                </>
              )}

              <ul className="mt-6 divide-y divide-line border-y border-line">
                {summaryFeatures[plan.id].map((feature) => (
                  <li key={feature} className="py-3 text-sm text-ink">
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                {plan.salesLed ? (
                  showEnterpriseForm ? (
                    <LeadCaptureModal
                      initiallyOpen
                      intent="enterprise"
                      source="enterprise_home_pricing"
                      experimentKey={ENTERPRISE_EXPERIMENT_KEY}
                      experimentVariant={experimentVariant}
                    >
                      <button
                        type="button"
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
                      >
                        {implementationVariant ? "Planejar implantação" : "Falar com um especialista"}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </LeadCaptureModal>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
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
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )
                ) : (
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
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-label font-semibold transition-colors",
                      highlighted
                        ? "bg-ink text-cream hover:bg-ink/90"
                        : "bg-ink text-cream hover:bg-ink-strong"
                    )}
                  >
                    Começar agora
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                )}
              </div>
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
              <p className="mt-2 text-caption leading-relaxed text-muted-ink">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
