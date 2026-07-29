"use client";

import { useState } from "react";
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
import { SIGNUP_URL } from "@/components/cta-links";

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
  solo: ["1 profissional", "Até 200 agendamentos por mês", "50 mensagens de campanha por mês"],
  equipe: ["Até 5 profissionais", "Agendamentos ilimitados", "150 mensagens de campanha por mês"],
  empresarial: ["Profissionais ilimitados", "Múltiplas unidades", "1.000 mensagens de campanha por mês"],
} as const;

export default function HomePricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);

  return (
    <div>
      <PricingToggle cycle={cycle} onCycleChange={setCycle} />
      <header className="mx-auto mt-8 max-w-4xl text-center">
        <h2 className="text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
          Um plano para cada tamanho de operação.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lead text-muted-ink">
          A IA no WhatsApp está em todos. O que muda é a escala da barbearia.
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-3">
        {PLANS.map((plan) => {
          const highlighted = plan.id === "equipe";
          const price = planPriceForCycle(plan, cycle);

          return (
            <article
              key={plan.id}
              aria-label={`Plano ${plan.name}`}
              className={cn(
                "flex min-h-[27rem] flex-col border-b border-line p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-9",
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

              <p className="mt-7 flex flex-wrap items-baseline gap-x-1.5 text-ink">
                {plan.salesLed && (
                  <span className="w-full text-caption text-muted-ink">A partir de</span>
                )}
                <span className="text-base font-medium">R$</span>
                <span className="text-[clamp(2.7rem,4vw,4rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                  {price.toLocaleString("pt-BR")}
                </span>
                <span className="text-label text-muted-ink">/mês</span>
              </p>
              <p className="mt-3 min-h-10 text-caption text-muted-ink">
                {cycle === "yearly"
                  ? `${formatBRL(plan.annualTotal)} cobrados uma vez ao ano · ${ANNUAL_DISCOUNT_LABEL}`
                  : "Cobrança mês a mês"}
              </p>

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
                    <LeadCaptureModal initiallyOpen>
                      <button
                        type="button"
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
                      >
                        Falar com a gente
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </LeadCaptureModal>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
                      onClick={() => setShowEnterpriseForm(true)}
                    >
                      Falar com a gente
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )
                ) : (
                  <a
                    href={SIGNUP_URL}
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-label font-semibold transition-colors",
                      highlighted
                        ? "bg-ink text-cream hover:bg-ink/90"
                        : "bg-ink text-cream hover:bg-ink-strong"
                    )}
                  >
                    Começar agora
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-7 text-center text-caption text-muted-ink">
        Assinatura paga desde o início · sem fidelidade · onboarding acompanhado
      </p>
    </div>
  );
}
