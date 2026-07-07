import { CreditCard, Shield, ThumbsUp, type LucideIcon } from "lucide-react";
import { trustSignals } from "@/data/pricing-data";
import { cn } from "@/lib/utils";
import { TrustSignal } from "./trust-signal";

/** Explicit map so we only bundle the icons the data actually uses. */
const ICONS: Record<string, LucideIcon> = {
  Shield,
  ThumbsUp,
  CreditCard,
};

export function TrustSignals({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-3", className)}>
      {trustSignals.map((signal) => (
        <TrustSignal
          key={signal.title}
          icon={ICONS[signal.icon] ?? Shield}
          title={signal.title}
          description={signal.description}
        />
      ))}
    </div>
  );
}
