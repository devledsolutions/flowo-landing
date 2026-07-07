import type { LucideIcon } from "lucide-react";

interface KeyResult {
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface KeyResultsProps {
  results: KeyResult[];
}

/**
 * Grade de números de um cenário ilustrativo. Os valores vêm da página que
 * chama; a legenda de honestidade abaixo da grade é fixa e não pode ser
 * removida enquanto os números não forem casos reais auditáveis.
 */
export default function KeyResults({ results }: KeyResultsProps) {
  return (
    <div className="mb-12">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {results.map((result) => {
          const Icon = result.icon;
          return (
            <li
              key={result.label}
              className="rounded-xl bg-surface-2 p-5 text-center"
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className="mx-auto h-5 w-5 text-muted-ink"
              />
              <p className="mt-3 text-h3 font-semibold tabular-nums leading-none text-ink">
                {result.prefix}
                {result.value.toLocaleString("pt-BR")}
                {result.suffix}
              </p>
              <p className="mt-2 text-caption text-muted-ink">{result.label}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-caption text-muted-ink">
        Números de um cenário ilustrativo. Não são resultados médios nem
        promessa de resultado.
      </p>
    </div>
  );
}
