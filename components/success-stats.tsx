import Image from "next/image";
import { noShowMechanism } from "@/data/success-metrics";

const MECHANISM_IMAGE =
  "https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=1200&q=80";

/**
 * Antiga grade "Resultados Reais de 340+ barbearias" (+42%, -78%, R$6,8k),
 * toda fabricada. Agora conta o mecanismo anti-falta, sem prometer número:
 * confirmação pelo WhatsApp, nunca sinal ou pagamento antecipado.
 */
export default function SuccessStats() {
  return (
    <section className="section-normal bg-cream">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-[4/5]">
            <Image
              src={MECHANISM_IMAGE}
              alt="Barbeiro de avental fazendo o acabamento do corte de um cliente na cadeira"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="img-duotone object-cover"
            />
          </figure>

          <div>
            <h2 className="max-w-xl text-h2 font-semibold text-ink-strong">
              Falta se combate com confirmação, não com sinal
            </h2>
            <p className="mt-4 max-w-measure text-lead text-muted-ink">
              Nada de travar o horário com pagamento antecipado. O Flowo
              confirma cada agendamento pelo WhatsApp e a agenda se ajusta
              sozinha.
            </p>

            <ol className="mt-9 space-y-7">
              {noShowMechanism.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line text-label font-semibold tabular-nums text-ink"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-ink">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
