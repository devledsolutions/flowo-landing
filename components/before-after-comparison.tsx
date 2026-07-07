import { ArrowDown, ArrowRight } from "lucide-react";

interface ComparisonItem {
  before: string;
  after: string;
}

interface BeforeAfterComparisonProps {
  items: ComparisonItem[];
  /** Passe null para suprimir o título quando a seção pai já tem um h2. */
  title?: string | null;
}

export default function BeforeAfterComparison({
  items,
  title = "Antes e depois do Flowo",
}: BeforeAfterComparisonProps) {
  return (
    <div className="my-10">
      {title ? (
        <h3 className="mb-6 text-h3 font-semibold text-ink">{title}</h3>
      ) : null}
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.before}
            className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]"
          >
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-caption font-medium text-muted-ink">Antes</p>
              <p className="mt-1.5 leading-relaxed text-muted-ink">
                {item.before}
              </p>
            </div>
            <div
              aria-hidden="true"
              className="flex items-center justify-center text-faint-ink"
            >
              <ArrowDown className="h-5 w-5 md:hidden" strokeWidth={1.75} />
              <ArrowRight
                className="hidden h-5 w-5 md:block"
                strokeWidth={1.75}
              />
            </div>
            <div className="on-ink rounded-xl p-5">
              <p className="text-caption font-medium text-muted-ink">
                Com o Flowo
              </p>
              <p className="mt-1.5 leading-relaxed">{item.after}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
