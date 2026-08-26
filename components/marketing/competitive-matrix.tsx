import Link from "next/link";
import { ArrowUpRight, Check, CircleHelp } from "lucide-react";
import {
  COMPETITIVE_ENTRIES,
  FLOWO_SCENARIO_SUMMARY,
  LAYER_LABELS,
  type ComparisonLayer,
} from "@/data/competitive-matrix";

const layers: ComparisonLayer[] = ["direct", "alternative", "substitute"];

export function CompetitiveMatrix() {
  return (
    <section className="section-normal border-y border-line bg-cream" aria-labelledby="matrix-title">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
              Matriz de decisão
            </p>
            <h2 id="matrix-title" className="mt-3 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
              Compare o que acontece na rotina.
            </h2>
          </div>
          <p className="max-w-measure text-lead text-muted-ink">
            Uma agenda pode ser suficiente para uma operação. A Flowo entra quando a pergunta chega no WhatsApp e alguém precisa responder sem largar o corte. As fontes abaixo são separadas entre declaração oficial, observação e item ainda não verificado.
          </p>
        </div>

        <div className="mt-12 hidden overflow-x-auto border border-line bg-surface lg:block">
          <table className="w-full min-w-[54rem] border-collapse">
            <caption className="sr-only">Cenários comparados e evidência disponível para o Flowo</caption>
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th className="w-[27%] px-5 py-4 text-left text-label font-semibold text-ink">Cenário</th>
                <th className="w-[38%] border-l border-line px-5 py-4 text-left text-label font-semibold text-ink">Com Flowo</th>
                <th className="border-l border-line px-5 py-4 text-left text-label font-semibold text-ink">Evidência</th>
              </tr>
            </thead>
            <tbody>
              {FLOWO_SCENARIO_SUMMARY.map((row) => (
                <tr key={row.scenario} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-4 text-left text-sm font-semibold text-ink">{row.scenario}</th>
                  <td className="border-l border-line px-5 py-4 text-sm text-ink">
                    <span className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.43_0.11_150)]" aria-hidden="true" />Resposta contextual e ação na agenda, quando a configuração permite.</span>
                  </td>
                  <td className="border-l border-line px-5 py-4 text-sm text-muted-ink">{row.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-3 lg:hidden">
          {FLOWO_SCENARIO_SUMMARY.map((row) => (
            <article key={row.scenario} className="border border-line bg-surface p-5">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.43_0.11_150)]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-ink-strong">{row.scenario}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    Resposta contextual e ação na agenda, quando a configuração permite.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-ink">{row.evidence}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {layers.map((layer) => (
            <div key={layer}>
              <h3 className="text-h3 font-semibold text-ink-strong">{LAYER_LABELS[layer]}</h3>
              <div className="mt-5 divide-y divide-line border-y border-line">
                {COMPETITIVE_ENTRIES.filter((entry) => entry.layer === layer).map((entry) => (
                  <article key={entry.name} className="py-5">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold text-ink">{entry.name}</h4>
                      {entry.officialUrl ? (
                        <Link href={entry.officialUrl} target="_blank" rel="noreferrer" className="text-faint-ink transition-colors hover:text-ink" aria-label={`Abrir fonte oficial de ${entry.name}`}>
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      ) : (
                        <CircleHelp className="h-4 w-4 text-faint-ink" aria-hidden="true" />
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-ink">{entry.declared}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink">{entry.whereFlowoDiffers}</p>
                    <p className="mt-3 text-[0.7rem] leading-relaxed text-faint-ink">{entry.sourceNote}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
