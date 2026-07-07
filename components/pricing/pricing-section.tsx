"use client";

import { useState } from "react";
import { PLANS, type BillingCycle } from "@/data/pricing-data";
import { PricingCard } from "./pricing-card";
import { PricingHeader } from "./pricing-header";
import { PricingToggle } from "./pricing-toggle";
import { TrustSignals } from "./trust-signals";
import styles from "./pricing.module.css";

interface PricingSectionProps {
  /** Renders the /precos page header (the route's single h1). */
  showHeader?: boolean;
  showTrustSignals?: boolean;
}

/**
 * Core pricing block: toggle + the three plan cards. Renders no <section>
 * wrapper and no id — the parent page owns section semantics, so nesting
 * and duplicate-id bugs cannot come from here.
 */
export function PricingSection({
  showHeader = false,
  showTrustSignals = false,
}: PricingSectionProps) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <div>
      {showHeader && (
        <>
          <PricingHeader />
          <h2 className="sr-only">Planos</h2>
        </>
      )}
      <div className={showHeader ? "mt-10" : "mt-2"}>
        <PricingToggle cycle={cycle} onCycleChange={setCycle} />
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl items-stretch gap-5 md:grid-cols-3">
        {PLANS.map((plan, index) => (
          <div
            key={plan.id}
            className={`${styles.rise} h-full`}
            style={{ animationDelay: `${index * 110}ms` }}
          >
            <PricingCard plan={plan} cycle={cycle} />
          </div>
        ))}
      </div>
      {showTrustSignals && <TrustSignals className="mx-auto mt-14 max-w-5xl" />}
    </div>
  );
}
