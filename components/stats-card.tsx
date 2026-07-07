import type { LucideIcon } from "lucide-react";

export interface StatsCardProps {
  icon?: LucideIcon;
  label: string;
  detail: string;
}

/**
 * Fact unit for the honest capability strip. Não exibe métricas inventadas:
 * recebe uma capacidade verificável (label) e a explicação curta (detail).
 * Token-driven: funciona em fundo creme e dentro de bandas .on-ink.
 */
export function StatsCard({ icon: Icon, label, detail }: StatsCardProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {Icon ? (
        <Icon
          aria-hidden="true"
          strokeWidth={1.75}
          className="h-5 w-5 text-muted-ink"
        />
      ) : null}
      <p className="font-semibold leading-snug text-ink">{label}</p>
      <p className="text-[0.9375rem] leading-relaxed text-muted-ink">
        {detail}
      </p>
    </div>
  );
}
