import { Check } from "lucide-react";
import {
  AgendaPreview,
  ConversationPreview,
  ProductDisclaimer,
} from "@/components/home/product-previews";
import { HeroExperimentCopy } from "@/components/home/hero-experiment-copy";

/**
 * The hero holds four things: the question a customer actually sends, the
 * answer, the lead, and two actions. Everything else moved below the fold.
 *
 * The media is a stack, not a frame: the agenda is the plate, the WhatsApp
 * conversation rests on its lower-left corner and the confirmation chip on the
 * seam between them. Overlap is what reads as depth; the shadows already on
 * each preview do the rest. Entrance is a progressive enhancement and is
 * removed under reduced motion.
 */
const RISE =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:duration-700 motion-safe:ease-out-expo";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream">
      <div className="container-page grid gap-14 pb-16 pt-28 sm:pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-36">
        <div className="max-w-[36rem]">
          <h1 className="text-[clamp(2.4rem,1.9rem+1.55vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-strong">
            <em className="block font-serif font-medium italic tracking-[-0.025em]">
              “Tem horário hoje?”
            </em>
            <span className="block">A Flowo responde.</span>
          </h1>
          <HeroExperimentCopy />
        </div>

        <div className="relative min-w-0 pb-28 sm:pb-20 lg:pb-24">
          <div className={`${RISE} motion-safe:slide-in-from-bottom-6 lg:ml-10`}>
            <AgendaPreview className="border-ink/15" />
          </div>

          <div
            className={`${RISE} motion-safe:slide-in-from-bottom-8 motion-safe:delay-150 absolute -bottom-6 left-0 w-[44%] max-w-[17rem] sm:bottom-6 sm:w-[52%] lg:-left-2`}
          >
            <ConversationPreview />
          </div>

          <div
            className={`${RISE} motion-safe:slide-in-from-bottom-4 motion-safe:delay-300 absolute bottom-0 right-0 hidden max-w-[16.5rem] items-center sm:flex gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-[0_18px_40px_-24px_oklch(0.17_0.012_110/0.55)] sm:right-3`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.91_0.08_150)] text-[oklch(0.43_0.11_150)]">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">Horário confirmado</p>
              <p className="mt-0.5 truncate text-caption text-muted-ink">
                Marcos · 10:30 · Corte com Rafael
              </p>
            </div>
          </div>

          <ProductDisclaimer className="absolute -bottom-10 left-0 sm:-bottom-12" />
        </div>
      </div>
    </section>
  );
}
