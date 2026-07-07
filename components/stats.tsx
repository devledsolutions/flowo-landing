import { StatsCard } from "./stats-card";
import { productFacts } from "@/data/success-metrics";

interface StatsProps {
  /** Renderiza a faixa dentro de uma banda de tinta (.on-ink). */
  onInk?: boolean;
}

/**
 * Faixa editorial de fatos do produto. Substitui a antiga grade de números
 * fabricados (30% faturamento, 50.000 agendamentos) por capacidades
 * verificáveis, sem métrica inventada.
 */
export default function Stats({ onInk = false }: StatsProps) {
  return (
    <section className={onInk ? "on-ink section-tight" : "section-tight bg-cream"}>
      <div className="container-page">
        <h2 className="sr-only">O que o Flowo faz pela sua barbearia</h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-9 border-y border-line py-10 sm:grid-cols-2 lg:grid-cols-4">
          {productFacts.map((fact) => (
            <StatsCard
              key={fact.title}
              icon={fact.icon}
              label={fact.title}
              detail={fact.detail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
