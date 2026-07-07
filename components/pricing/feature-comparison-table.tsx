import { Check } from "lucide-react";
import { featureComparison, type FeatureComparisonItem } from "@/data/feature-comparison";
import { formatBRL, getPlan, type PlanId } from "@/data/pricing-data";
import { cn } from "@/lib/utils";

const PLAN_COLUMNS: ReadonlyArray<{ id: PlanId; highlight: boolean }> = [
  { id: "solo", highlight: false },
  { id: "equipe", highlight: true },
  { id: "empresarial", highlight: false },
];

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <>
        <Check className="mx-auto h-4 w-4 text-ink" aria-hidden />
        <span className="sr-only">Incluído</span>
      </>
    ) : (
      <>
        <span aria-hidden className="text-faint-ink">
          –
        </span>
        <span className="sr-only">Não incluído</span>
      </>
    );
  }
  return <span className="text-sm text-ink">{value}</span>;
}

function FeatureRow({ feature }: { feature: FeatureComparisonItem }) {
  return (
    <tr className="border-b border-line">
      <th scope="row" className="px-5 py-3.5 text-left align-top font-normal">
        <span className="block text-sm font-medium text-ink">{feature.name}</span>
        {feature.note && (
          <span className="mt-0.5 block max-w-[36ch] text-caption text-muted-ink">
            {feature.note}
          </span>
        )}
      </th>
      <td className="px-4 py-3.5 text-center align-middle">
        <CellValue value={feature.solo} />
      </td>
      <td className="px-4 py-3.5 text-center align-middle">
        <CellValue value={feature.equipe} />
      </td>
      <td className="px-4 py-3.5 text-center align-middle">
        <CellValue value={feature.empresarial} />
      </td>
    </tr>
  );
}

export function FeatureComparisonTable() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-h2 font-semibold text-ink-strong">
          Compare os planos
        </h2>
        <p className="mt-3 text-lead text-muted-ink">
          A IA atende no WhatsApp em todos. A diferença está no tamanho da
          equipe e no volume.
        </p>
      </div>

      {/* [contain:paint] stops the wide table's intrinsic width from leaking
          into the page scroll width on mobile (Chromium table quirk). */}
      <div className="mt-10 overflow-x-auto rounded-[14px] border border-line bg-surface [contain:paint]">
        <table className="w-full min-w-[40rem] border-collapse text-left [&_tbody:last-child>tr:last-child]:border-b-0">
          <caption className="sr-only">
            Comparação de recursos entre os planos Solo, Equipe e Empresarial
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[34%] px-5 py-4 text-label text-muted-ink">
                Recurso
              </th>
              {PLAN_COLUMNS.map(({ id, highlight }) => {
                const plan = getPlan(id);
                return (
                  <th key={id} scope="col" className="px-4 py-4 text-center align-top">
                    <span
                      className={cn(
                        "block text-base text-ink",
                        highlight ? "font-semibold" : "font-medium"
                      )}
                    >
                      {plan.name}
                    </span>
                    <span className="mt-0.5 block text-caption font-normal text-muted-ink">
                      {formatBRL(plan.monthly)}/mês
                    </span>
                    {highlight && (
                      <span className="mt-1.5 inline-block rounded-full border border-line px-2 py-0.5 text-caption font-medium text-ink">
                        Mais escolhido
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          {Object.entries(featureComparison).map(([category, features]) => (
            <tbody key={category}>
              <tr className="border-b border-line bg-surface-2">
                <th
                  colSpan={4}
                  scope="rowgroup"
                  className="px-5 py-2.5 text-left text-label text-ink"
                >
                  {category}
                </th>
              </tr>
              {features.map((feature) => (
                <FeatureRow key={feature.name} feature={feature} />
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
