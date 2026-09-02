import { Check } from "lucide-react";
import { PhoneFrame } from "@/components/home/phone-frame";
import { ProductDisclaimer } from "@/components/home/product-previews";
import { HeroExperimentCopy } from "@/components/home/hero-experiment-copy";

/**
 * The hero holds four things: the question a customer actually sends, the
 * answer, the lead, and two actions. Everything else moved below the fold.
 *
 * The media is two real screens in depth: the barbershop's agenda in the app
 * behind, the customer's WhatsApp conversation in front, and the confirmation
 * chip on the seam between them. That is the whole product in one stack: the
 * customer asks, the agenda answers. Entrance is a progressive enhancement and
 * is removed under reduced motion.
 */
const RISE =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:duration-700 motion-safe:ease-out-expo";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream">
      <div className="container-page grid gap-14 pb-16 pt-28 sm:pt-32 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-36">
        <div className="max-w-[36rem]">
          <h1 className="text-[clamp(2.4rem,1.9rem+1.55vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-strong">
            <em className="block font-serif font-medium italic tracking-[-0.025em]">
              “Tem horário hoje?”
            </em>
            <span className="block">A Flowo responde.</span>
          </h1>
          <HeroExperimentCopy />
        </div>

        <div className="relative min-w-0 pb-14 sm:pb-16 lg:pb-20">
          <div className={`${RISE} motion-safe:slide-in-from-bottom-6 ml-auto w-[min(100%,19rem)] lg:w-[20rem]`}>
            <PhoneFrame
              src="/images/product/app-agenda.png"
              alt="Agenda do app da Flowo com cinco barbeiros e os horários do dia."
              width={720}
              height={1564}
              sizes="(min-width: 1024px) 20rem, 19rem"
              className="h-[28rem] sm:h-[31rem] lg:h-[34rem]"
              priority
            />
          </div>

          <div
            className={`${RISE} motion-safe:slide-in-from-bottom-8 motion-safe:delay-150 absolute bottom-0 left-0 w-[46%] max-w-[16rem] lg:left-10 lg:w-[16.5rem]`}
          >
            <PhoneFrame
              src="/images/validation-cases/product/whatsapp-booking.png"
              alt="Conversa no WhatsApp: o cliente pede horário e a Flowo oferece três opções e confirma."
              width={1206}
              height={2622}
              sizes="(min-width: 1024px) 16.5rem, 46vw"
              className="h-[20rem] sm:h-[24rem] lg:h-[27rem]"
              priority
            />
          </div>

          <div
            className={`${RISE} motion-safe:slide-in-from-bottom-4 motion-safe:delay-300 absolute bottom-6 right-0 hidden max-w-[16.5rem] items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-[0_18px_40px_-24px_oklch(0.17_0.012_110/0.55)] sm:flex lg:bottom-10 lg:right-2`}
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
            className="absolute -bottom-9 left-0 sm:-bottom-11"
          />
        </div>
      </div>
    </section>
  );
}
