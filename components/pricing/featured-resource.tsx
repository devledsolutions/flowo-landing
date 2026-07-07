import { Check, type LucideIcon } from "lucide-react";

interface FeaturedResourceProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
}

export function FeaturedResource({
  icon: Icon,
  title,
  description,
  benefits,
}: FeaturedResourceProps) {
  return (
    <div className="flex h-full flex-col rounded-[14px] border border-line bg-surface p-6">
      <Icon className="h-5 w-5 text-ink" aria-hidden />
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-muted-ink">{description}</p>
      <ul className="mt-4 space-y-2">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
