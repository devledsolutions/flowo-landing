import { Check } from "lucide-react";
import { ParallaxPlanes } from "@/components/home/parallax-planes";
import { PhoneFrame } from "@/components/home/phone-frame";
import { AgendaPreview, ProductDisclaimer } from "@/components/home/product-previews";
import { HeroExperimentCopy } from "@/components/home/hero-experiment-copy";

/**
 * The hero holds four things: the question a customer actually sends, the
 * answer, the lead, and two actions. Everything else moved below the fold.
 *
 * The media is a stage in depth. Back to front: the web agenda (slowest, so
 * it reads as furthest), the app agenda on a phone, the customer's WhatsApp
 * conversation, and a cream ground with the confirmation chip that travels
 * with the page. Scrolling makes the screens sink behind that ground, the
 * same staging fora.so uses with its hills. On phones and under reduced
 * motion the stage is a still stack. Entrances are progressive enhancement.
 */
const RISE =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:duration-700 motion-safe:ease-out-expo";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream">
      <div className="container-page grid gap-14 pb-16 pt-28 sm:pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-36">
        <div className="max-w-[36rem]">
          <h1 className="text-[clamp(2.4rem,1.9rem+1.55vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-strong">
            <em className="block font-serif font-medium italic tracking-[-0.025em]">
              “Tem horário hoje?”
            </em>
            <span className="block">A Flowo responde.</span>
          </h1>
          <HeroExperimentCopy />
        </div>

        <ParallaxPlanes className="relative min-w-0 pb-14 sm:pb-16 lg:min-h-[38rem] lg:pb-24">
          <div
            data-plane-rate="0.7"
            className={`${RISE} motion-safe:slide-in-from-bottom-4 hidden will-change-transform lg:absolute lg:inset-x-0 lg:top-0 lg:block lg:opacity-90`}
          >
            <AgendaPreview className="border-ink/10 shadow-none" />
          </div>

          <div
            data-plane-rate="0.82"
            className={`${RISE} motion-safe:slide-in-from-bottom-6 relative ml-auto w-[min(100%,19rem)] will-change-transform lg:absolute lg:right-6 lg:top-16 lg:w-[19rem]`}
          >
            <PhoneFrame
              src="/images/product/app-agenda.png"
              alt="Agenda do app da Flowo com cinco barbeiros e os horários do dia."
              width={720}
              height={1564}
              sizes="19rem"
              className="h-[28rem] sm:h-[31rem] lg:h-[30rem]"
              priority
            />
          </div>

          <div
            data-plane-rate="0.9"
            className={`${RISE} motion-safe:slide-in-from-bottom-8 motion-safe:delay-150 absolute bottom-0 left-0 w-[46%] max-w-[16rem] will-change-transform lg:bottom-auto lg:left-8 lg:top-40 lg:w-[16rem]`}
          >
            <PhoneFrame
              src="/images/validation-cases/product/whatsapp-booking.png"
              alt="Conversa no WhatsApp: o cliente pede horário e a Flowo oferece três opções e confirma."
              width={1206}
              height={2622}
              sizes="(min-width: 1024px) 16rem, 46vw"
              className="h-[20rem] sm:h-[24rem] lg:h-[26rem]"
              priority
            />
          </div>

          {/* The ground: travels with the page, so the screens above sink behind it. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-8%] bottom-0 hidden h-52 bg-cream [mask-image:linear-gradient(to_top,black_55%,transparent)] lg:block"
          />

          <div
            className={`${RISE} motion-safe:slide-in-from-bottom-4 motion-safe:delay-300 absolute bottom-6 right-0 hidden max-w-[16.5rem] items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-[0_18px_40px_-24px_oklch(0.17_0.012_110/0.55)] sm:flex lg:bottom-14 lg:right-2`}
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

          <ProductDisclaimer
            label="Telas reais do app, com dados ilustrativos"
            className="absolute -bottom-9 left-0 sm:-bottom-11 lg:bottom-2"
          />
        </ParallaxPlanes>
      </div>
    </section>
  );
}
