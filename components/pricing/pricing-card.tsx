import { Check } from "lucide-react";
import { LeadCaptureModal } from "../lead-capture-modal";
import { cn } from "@/lib/utils";
import {
  ANNUAL_DISCOUNT_LABEL,
  formatBRL,
  planPriceForCycle,
  type BillingCycle,
  type Plan,
} from "@/data/pricing-data";
import { SIGNUP_URL } from "./links";

interface PricingCardProps {
  plan: Plan;
  cycle: BillingCycle;
}

const CTA_BASE =
  "inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-medium transition-colors duration-200 ease-out-quint";

export function PricingCard({ plan, cycle }: PricingCardProps) {
  const isPopular = Boolean(plan.isPopular);
  const price = planPriceForCycle(plan, cycle);

  return (
    <article
      aria-label={`Plano ${plan.name}`}
      className={cn(
        "flex h-full flex-col rounded-[14px] p-7 sm:p-8",
        isPopular ? "on-ink shadow-card" : "border border-line bg-surface"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-ink">{plan.name}</h3>
        {isPopular && (
          <p className="whitespace-nowrap rounded-full border border-line px-2.5 py-1 text-caption font-medium text-ink">
            Mais escolhido
          </p>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-ink">{plan.description}</p>

      <p className="mt-7 flex items-baseline gap-1.5" aria-live="polite">
        <span className="text-sm font-medium text-muted-ink">R$</span>
        <span className="text-[2.75rem] font-bold leading-none tracking-tight text-ink tabular-nums">
          {price.toLocaleString("pt-BR")}
        </span>
        <span className="text-sm text-muted-ink">/mês</span>
      </p>
      <p className="mt-2.5 text-caption text-muted-ink">
        {cycle === "yearly"
          ? `${formatBRL(plan.annualTotal)} faturados uma vez ao ano · ${ANNUAL_DISCOUNT_LABEL}`
          : "Faturado mês a mês"}
      </p>

      <div className="mt-7">
        {plan.salesLed ? (
          <LeadCaptureModal>
            <button
              type="button"
              className={cn(
                CTA_BASE,
                "border border-line bg-transparent text-ink hover:bg-surface-2"
              )}
            >
              Falar com a gente
            </button>
          </LeadCaptureModal>
        ) : (
          <a
            href={SIGNUP_URL}
            aria-label={`Começar agora no plano ${plan.name}`}
            className={cn(CTA_BASE, "bg-ink text-cream hover:bg-ink-strong")}
          >
            Começar agora
          </a>
        )}
        <p className="mt-3 text-center text-caption text-muted-ink">
          {plan.salesLed
            ? "Converse com o time antes de assinar"
            : "Sem fidelidade. Cancele quando quiser"}
        </p>
      </div>

      <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}
