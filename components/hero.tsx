import Image from "next/image";
import { Check } from "lucide-react";
import { ParallaxPlanes } from "@/components/home/parallax-planes";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat } from "@/components/home/whatsapp-chat";
import { HeroExperimentCopy } from "@/components/home/hero-experiment-copy";
import { ProductDisclaimer } from "@/components/home/product-previews";

/**
 * Flowo's hero on the fora.so staging mechanism.
 *
 * Same planes, same boxes and the same scroll rates as the exact copy kept in
 * `home/hero-fora-exact.tsx`: a sky, far hills (0.69x), middle hills (0.83x),
 * the centred copy, the product (0.80x) between the middle and front planes,
 * and front hills that travel with the page and cover the product's base.
 *
 * What is Flowo's: a cream sky, the hills graded to the brand's ink and olive,
 * ink type and the ink CTA. On a desk the product is the dashboard itself, the
 * Hoje screen from the v2 design, with the customer's WhatsApp resting on its
 * edge. On a phone it is that WhatsApp conversation, large, with the app's
 * agenda behind it: the answer to the headline, then the place it lands.
 */
const APPEAR =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:duration-[600ms] motion-safe:ease-out";

function Hills({
  src,
  rate,
  className,
  delay,
  grade,
}: {
  src: string;
  rate: number;
  className: string;
  delay: string;
  grade: string;
}) {
  return (
    <div
      data-plane-rate={rate}
      aria-hidden="true"
      className={`${APPEAR} ${delay} pointer-events-none absolute will-change-transform lg:inset-x-0 lg:w-auto ${className}`}
    >
      <Image src={src} alt="" fill sizes="100vw" className={`object-cover object-center ${grade}`} priority />
    </div>
  );
}

function ConfirmedChip({ className }: { className?: string }) {
  return (
    <div
      className={`flex w-[15.5rem] items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-[0_18px_40px_-24px_oklch(0.08_0.01_110/0.7)] ${className ?? ""}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.91_0.08_150)] text-[oklch(0.43_0.11_150)]">
        <Check className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">Horário confirmado</p>
        <p className="mt-0.5 truncate text-caption text-muted-ink">Amanhã · 18:30 · Corte com João</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <ParallaxPlanes
      id="hero"
      className="relative isolate h-[1022px] overflow-hidden bg-cream text-ink lg:h-[1269px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(200%_83%_at_50%_0px,oklch(0.988_0.003_95)_0%,oklch(0.972_0.004_95)_42%,oklch(0.86_0.03_70)_100%)]"
      />

      <Hills
        src="/images/hero/hills-far.png"
        rate={0.69}
        delay="motion-safe:delay-[400ms]"
        grade="[filter:grayscale(1)_sepia(.35)_brightness(.72)_contrast(1.05)] opacity-90"
        className="left-[-240px] top-[702px] h-[321px] w-[870px] lg:top-[738px] lg:h-[531px]"
      />
      <Hills
        src="/images/hero/hills-mid.png"
        rate={0.83}
        delay="motion-safe:delay-[450ms]"
        grade="[filter:grayscale(1)_sepia(.3)_brightness(.42)_contrast(1.08)]"
        className="left-[-152px] top-[783px] h-[239px] w-[694px] lg:top-[773px] lg:h-[496px]"
      />

      <div className="relative mx-auto w-full max-w-[1080px] px-6 text-center lg:px-0">
        <div className={`${APPEAR} mt-[121px] flex justify-center lg:mt-[161px]`}>
          <span className="inline-flex items-center rounded-full border border-ink/15 bg-ink/5 px-3 py-1 text-caption font-medium text-muted-ink">
            WhatsApp conectado à agenda
          </span>
        </div>
        <h1
          className={`${APPEAR} motion-safe:delay-[80ms] mx-auto mt-6 max-w-[640px] text-[36px] leading-[1.12] tracking-[-0.04em] text-ink-strong lg:text-[56px]`}
        >
          <em className="block font-serif font-medium italic">“Tem horário hoje?”</em>
          <span className="block font-semibold">A Flowo responde.</span>
        </h1>
        <HeroExperimentCopy align="flowo" />
      </div>

      {/* Desk: the dashboard as the product, the customer's phone on its edge. */}
      <div
        data-plane-rate={0.8}
        className={`${APPEAR} motion-safe:delay-[320ms] absolute hidden will-change-transform lg:left-[calc(50%-480px)] lg:top-[594px] lg:block lg:h-[676px] lg:w-[960px]`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-t-[24px] border border-b-0 border-ink/20 bg-[oklch(0.2_0.012_110)] shadow-[0_40px_90px_-50px_oklch(0.08_0.01_110/0.8)]">
          <Image
            src="/images/product/dashboard-hoje.png"
            alt="Dashboard da Flowo, tela Hoje: as cinco cadeiras da barbearia, o dia inteiro da equipe, o que precisa de decisão e o recebido do dia."
            width={1920}
            height={1040}
            sizes="960px"
            priority
            className="h-full w-full object-cover object-left-top"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cream opacity-60 [mask-image:linear-gradient(90deg,transparent_0%,black_50%,transparent_100%)]"
          />
        </div>
        <PhoneFrame className="absolute -right-6 top-10 w-[15.5rem] border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)]">
          <WhatsAppChat width={248} />
        </PhoneFrame>
        <ConfirmedChip className="absolute -right-2 top-[23rem]" />
      </div>

      {/* Phone: the conversation, large, with the app's agenda behind it. */}
      <div
        data-plane-rate={0.8}
        className={`${APPEAR} motion-safe:delay-[320ms] absolute inset-x-0 top-[500px] h-[522px] will-change-transform lg:hidden`}
      >
        <PhoneFrame
          src="/images/product/app-agenda.png"
          alt="Agenda do app da Flowo com cinco barbeiros e os horários do dia."
          width={720}
          height={1564}
          sizes="52vw"
          className="absolute left-1/2 top-0 h-[22rem] w-[52%] translate-x-[18%] rotate-[4deg] opacity-90"
        />
        <PhoneFrame className="absolute left-1/2 top-7 w-[288px] -translate-x-[58%] border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)]">
          <WhatsAppChat width={288} />
        </PhoneFrame>
      </div>

      <Hills
        src="/images/hero/hills-front-clean.png"
        rate={1}
        delay="motion-safe:delay-[500ms]"
        grade="[filter:grayscale(1)_sepia(.25)_brightness(.3)_contrast(1.1)]"
        className="left-[-120px] top-[897px] h-[125px] w-[630px] lg:top-[984px] lg:h-[285px]"
      />

      <ProductDisclaimer
        label="Telas do app com dados ilustrativos"
        className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-cream/70 [&_svg]:text-cream/70"
      />
    </ParallaxPlanes>
  );
}
