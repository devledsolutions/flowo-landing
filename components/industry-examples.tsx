import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { formatBRL, getPlan, type PlanId } from "@/data/pricing-data";

interface Scenario {
  planId: PlanId;
  icon: LucideIcon;
  name: string;
  blurb: string;
}

/**
 * Cada cartão espelha o plano correspondente em data/pricing-data.ts
 * (fonte única de preço e recursos). Os antigos recursos inventados
 * ("API completa", "gerente de conta dedicado", "PIX garante o horário")
 * foram removidos.
 */
const scenarios: readonly Scenario[] = [
  {
    planId: "solo",
    icon: User,
    name: "Barbeiro solo",
    blurb:
      "Você corta o dia inteiro e ninguém responde o WhatsApp por você. A IA assume o chat e a agenda.",
  },
  {
    planId: "equipe",
    icon: Users,
    name: "Barbearia com equipe",
    blurb:
      "Cada barbeiro com a própria agenda. O cliente escolhe o profissional no chat e ninguém marca em cima de ninguém.",
  },
  {
    planId: "empresarial",
    icon: Building2,
    name: "Rede de barbearias",
    blurb:
      "Várias unidades no mesmo padrão de atendimento, com relatórios para acompanhar o todo.",
  },
];

export default function IndustryExamples() {
  return (
    <section className="section-normal bg-cream">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="text-h2 font-semibold text-ink-strong">
            Para todo tamanho de barbearia
          </h2>
          <p className="mt-4 max-w-measure text-lead text-muted-ink">
            Do barbeiro solo à rede com várias unidades, o plano acompanha o
            tamanho da sua operação.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {scenarios.map((scenario) => {
            const plan = getPlan(scenario.planId);
            const highlighted = Boolean(plan.isPopular);
            return (
              <article
                key={scenario.planId}
                className={
                  highlighted
                    ? "on-ink flex flex-col rounded-xl p-7"
                    : "flex flex-col rounded-xl border border-line bg-surface p-7"
                }
              >
                <scenario.icon
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-6 w-6 text-muted-ink"
                />
                <h3 className="mt-4 text-h3 font-semibold leading-tight text-ink">
                  {scenario.name}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-ink">
                  {scenario.blurb}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden="true"
                        strokeWidth={2}
                        className="mt-1 h-4 w-4 flex-none text-muted-ink"
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-ink">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-7 text-label text-muted-ink">
                  Plano {plan.name} ·{" "}
                  <span className="font-semibold tabular-nums text-ink">
                    {formatBRL(plan.monthly)}/mês
                  </span>
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/precos"
            className="inline-flex items-center gap-2 text-label font-semibold text-ink transition-colors duration-200 ease-out-quint hover:text-muted-ink"
          >
            Ver planos e preços
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
