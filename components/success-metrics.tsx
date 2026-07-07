import BeforeAfterComparison from "./before-after-comparison";
import { beforeAfterFlowo } from "@/data/success-metrics";

/**
 * Substitui a antiga grade "Resultados Comprovados" (40%, 60%, 98%, números
 * fabricados) por um antes/depois qualitativo de capacidades verificáveis.
 */
export default function SuccessMetrics() {
  return (
    <section className="section-normal bg-cream">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="text-h2 font-semibold text-ink-strong">
            Antes e depois do Flowo
          </h2>
          <p className="mt-4 max-w-measure text-lead text-muted-ink">
            Sem número mágico. O que muda na sua rotina é isto, desde o
            primeiro dia.
          </p>
        </div>
        <div className="mt-6">
          <BeforeAfterComparison items={[...beforeAfterFlowo]} title={null} />
        </div>
      </div>
    </section>
  );
}
