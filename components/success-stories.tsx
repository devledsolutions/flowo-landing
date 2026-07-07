import Image from "next/image";
import {
  ILLUSTRATIVE_LABEL,
  ILLUSTRATIVE_NOTE,
  illustrativeScenarios,
} from "@/data/success-metrics";

/**
 * Antigos "casos de sucesso" com clientes fictícios e R$ inventados
 * (Dom Pedro, Barber House SP, R$8.000/mês). Agora são cenários de uso
 * claramente rotulados, sem números e sem nomes de clientes.
 */
export default function SuccessStories() {
  return (
    <section className="section-normal bg-cream">
      <div className="container-page">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <h2 className="max-w-2xl text-h2 font-semibold text-ink-strong">
            Como uma barbearia usa o Flowo
          </h2>
          <span className="inline-flex items-center rounded-full border border-line bg-surface px-3.5 py-1 text-caption font-medium text-muted-ink">
            {ILLUSTRATIVE_LABEL}
          </span>
        </div>
        <p className="mt-4 max-w-measure text-lead text-muted-ink">
          Três jeitos de trabalhar, o mesmo atendimento no WhatsApp.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {illustrativeScenarios.map((scenario) => (
            <article key={scenario.id} className="group">
              <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                <Image
                  src={scenario.image}
                  alt={scenario.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="img-duotone object-cover transition-[filter,transform] duration-500 ease-out-quint group-hover:scale-[1.02] group-hover:[filter:grayscale(0.7)_contrast(1.05)_brightness(0.97)_sepia(0.18)]"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-ink">
                {scenario.name}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-ink">
                {scenario.story}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 border-t border-line pt-4 text-caption text-muted-ink">
          {ILLUSTRATIVE_NOTE}
        </p>
      </div>
    </section>
  );
}
