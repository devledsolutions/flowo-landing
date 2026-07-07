"use client";

import { ANNUAL_DISCOUNT_LABEL, type BillingCycle } from "@/data/pricing-data";
import { cn } from "@/lib/utils";

interface PricingToggleProps {
  cycle: BillingCycle;
  onCycleChange: (cycle: BillingCycle) => void;
}

const OPTIONS: ReadonlyArray<{ value: BillingCycle; label: string }> = [
  { value: "monthly", label: "Mensal" },
  { value: "yearly", label: "Anual" },
];

export function PricingToggle({ cycle, onCycleChange }: PricingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        role="group"
        aria-label="Período de cobrança"
        className="inline-flex items-center rounded-full border border-line bg-surface p-1"
      >
        {OPTIONS.map((option) => {
          const active = cycle === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onCycleChange(option.value)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ease-out-quint",
                active ? "bg-ink text-cream" : "text-muted-ink hover:text-ink"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <p className="text-caption text-muted-ink">
        No plano anual, {ANNUAL_DISCOUNT_LABEL}
      </p>
    </div>
  );
}
