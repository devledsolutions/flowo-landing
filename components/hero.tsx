import { Check } from "lucide-react";
import { ParallaxPlanes } from "@/components/home/parallax-planes";
import { PhoneFrame } from "@/components/home/phone-frame";
import { ProductDisclaimer } from "@/components/home/product-previews";
import { HeroExperimentCopy } from "@/components/home/hero-experiment-copy";

/**
 * One object, the way fora.so stages its hero: the copy centred on top, and
 * below it a single wide product stage rising out of the ground. The stage is
 * ink, the app's two screens stand inside it, and a cream ground in front
 * covers its base. The stage lags the page on scroll, so it sinks behind the
 * ground as the reader moves on. Nothing else competes with it.
 */
const RISE =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:duration-700 motion-safe:ease-out-expo";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream">
      <div className="container-page pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-[44rem] text-center">
          <h1 className="text-[clamp(2.4rem,1.9rem+1.55vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-strong">
            <em className="block font-serif font-medium italic tracking-[-0.025em]">
              “Tem horário hoje?”
            </em>
            <span className="block">A Flowo responde.</span>
          </h1>
          <HeroExperimentCopy align="center" />
        </div>
      </div>

      <ParallaxPlanes className="relative mt-12 sm:mt-14 lg:mt-16">
        <div className="container-page">
          <div
            data-plane-rate="0.85"
            className={`${RISE} motion-safe:slide-in-from-bottom-8 mx-auto w-full max-w-[66rem] will-change-transform`}
          >
            <div className="relative h-[24rem] overflow-hidden rounded-t-[1.75rem] border border-b-0 border-ink/15 bg-ink shadow-[0_-1px_0_oklch(0.955_0.004_92/0.18)_inset,0_40px_80px_-40px_oklch(0.08_0.01_110/0.8)] sm:h-[29rem] lg:h-[34rem]">
              <PhoneFrame
                src="/images/product/app-agenda.png"
                alt="Agenda do app da Flowo com cinco barbeiros e os horários do dia."
                width={720}
                height={1564}
                sizes="(min-width: 1024px) 19rem, 44vw"
                className="absolute left-1/2 top-10 w-[48%] max-w-[22rem] -translate-x-[6%] border-cream/25 sm:top-12 lg:top-12"
                priority
              />
              <PhoneFrame
                src="/images/validation-cases/product/whatsapp-booking.png"
                alt="Conversa no WhatsApp: o cliente pede horário e a Flowo oferece três opções e confirma."
                width={1206}
                height={2622}
                sizes="(min-width: 1024px) 16rem, 40vw"
                className="absolute left-1/2 top-20 w-[44%] max-w-[18.5rem] -translate-x-[100%] border-cream/25 sm:top-24 lg:top-24"
                priority
              />

              <div
                className={`${RISE} motion-safe:slide-in-from-bottom-4 motion-safe:delay-300 absolute right-5 top-8 hidden max-w-[16.5rem] items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-[0_18px_40px_-24px_oklch(0.08_0.01_110/0.7)] sm:flex lg:right-8 lg:top-10`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.91_0.08_150)] text-[oklch(0.43_0.11_150)]">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">Horário confirmado</p>
                  <p className="mt-0.5 truncate text-caption text-muted-ink">
                    Amanhã · 18:30 · Corte com João
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The ground: travels with the page and covers the stage's base. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-cream [mask-image:linear-gradient(to_top,black_45%,transparent)] sm:h-28 lg:h-32"
        />
        <div className="container-page relative pb-6 pt-3 lg:pb-8">
          <ProductDisclaimer
            label="Telas reais do app, com dados ilustrativos"
            className="justify-center"
          />
        </div>
      </ParallaxPlanes>
    </section>
  );
}
