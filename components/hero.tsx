import { Check } from "lucide-react";
import {
  AgendaPreview,
  ConversationPreview,
  ProductDisclaimer,
} from "@/components/home/product-previews";
import { HeroExperimentCopy } from "@/components/home/hero-experiment-copy";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream">
      <div className="container-page grid gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-36">
        <div className="max-w-[36rem]">
          <p className="text-caption font-medium text-faint-ink">
            WhatsApp conectado à agenda
          </p>
          <h1
            className="mt-4 text-[clamp(2.55rem,2.1rem+1.45vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink-strong"
          >
            <span className="lg:block">“Tem horário hoje?”</span>{" "}
            <span className="lg:block">A Flowo responde.</span>{" "}
            <span className="lg:block">Você continua atendendo.</span>
          </h1>
          <HeroExperimentCopy />
          <div className="mt-8 flex items-start gap-3 border-t border-line pt-5 text-label text-muted-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
            <p>
              A agenda de cada profissional é consultada antes de oferecer um
              horário.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="rounded-2xl border border-line bg-surface-2 p-3 shadow-[0_28px_80px_-55px_oklch(0.17_0.012_110/0.72)] sm:p-4">
            <div className="grid gap-3 sm:grid-cols-[0.78fr_1.22fr] sm:items-start">
              <ConversationPreview className="shadow-none" />
              <AgendaPreview className="shadow-none" />
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.91_0.08_150)] text-[oklch(0.43_0.11_150)]">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Horário confirmado</p>
                <p className="mt-0.5 text-caption text-muted-ink">
                  Marcos · 10:30 · Corte com Rafael
                </p>
              </div>
            </div>
          </div>
          <ProductDisclaimer className="mt-4" />
        </div>
      </div>
    </section>
  );
}
