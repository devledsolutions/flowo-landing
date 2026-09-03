import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SIGNUP_URL } from "@/components/cta-links";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ParallaxPlanes } from "@/components/home/parallax-planes";
import { ProductDisclaimer } from "@/components/home/product-previews";

/**
 * The close, staged the way fora.so stages its last section, in Flowo's skin.
 *
 * Measured on the reference at 1440x900: a 1080 container; a 344px text block
 * on the left, in front; the product card, the same anatomy as the hero's,
 * starting at x 572 and running off the right edge, pulled up 338px so its top
 * meets the copy; and a landscape band 190px tall that starts 64px low and
 * settles as the section arrives, overlapping the footer's first 64px. On a
 * phone the card is gone and the band does the same move.
 *
 * Flowo's skin: the section is the page's one ink band, the card shows the
 * Agenda screen from the v2 design, and the band is the front hills graded
 * to ink, the same plane the hero uses.
 */
const APPEAR =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:duration-[600ms] motion-safe:ease-out";

export default function OnboardingClose() {
  return (
    <ParallaxPlanes
      id="fechamento"
      className="on-ink relative z-10 h-[582px] lg:h-[910px]"
    >
      <div className="relative mx-auto h-full w-full max-w-[1080px] px-6 lg:px-0">
        <div className={`${APPEAR} absolute left-6 top-[104px] z-[1] w-[342px] lg:left-0 lg:top-[204px] lg:w-[344px]`}>
          <h2 className="text-[32px] font-semibold leading-[1.34] tracking-[-0.025em] text-ink-strong lg:text-[40px] lg:leading-[1.35]">
            A gente configura com você.
          </h2>
          <p className="mt-6 text-[16px] leading-6 text-muted-ink">
            Organizamos serviços, profissionais e horários. Antes de ativar, testamos o
            WhatsApp junto com você.
          </p>
          <TrackedLink
            href={SIGNUP_URL}
            event="CTA Clicked"
            properties={{
              page: "/",
              placement: "closing",
              destination: "dashboard_signup",
              intent: "start_now",
            }}
            className="mt-12 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[14px] font-semibold text-cream transition-colors hover:bg-ink/90"
          >
            Criar minha conta
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>
          <p className="mt-5 text-caption text-muted-ink">
            Sem fidelidade. Avaliação assistida de 14 dias para clientes elegíveis.
          </p>
        </div>

        {/* The product card, same anatomy as the hero's, running off the right edge. */}
        <div
          className={`${APPEAR} motion-safe:delay-[150ms] absolute hidden lg:left-[392px] lg:top-[178px] lg:block lg:h-[676px] lg:w-[960px]`}
        >
          <div className="relative h-full w-full overflow-hidden rounded-t-[24px] border border-b-0 border-cream/15 bg-[oklch(0.2_0.012_110)] shadow-[0_40px_90px_-50px_oklch(0.08_0.01_110/0.8)]">
            <Image
              src="/images/product/dashboard-agenda.png"
              alt="Dashboard da Flowo, tela Agenda: a semana da barbearia com uma coluna por barbeiro e os horários livres."
              width={1920}
              height={1041}
              sizes="960px"
              className="h-full w-full object-cover object-left-top"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cream opacity-60 [mask-image:linear-gradient(90deg,transparent_0%,black_50%,transparent_100%)]"
            />
          </div>
          <ProductDisclaimer
            label="Telas do app com dados ilustrativos"
            className="absolute -bottom-7 left-1 text-cream/60 [&_svg]:text-cream/60"
          />
        </div>
      </div>

      {/* The landscape: starts 64px low, settles as the section arrives, and
          runs 64px into the footer. Same front hills as the hero. */}
      <div
        data-plane-origin="settle"
        data-plane-base="64"
        data-plane-start="344"
        data-plane-end="744"
        data-plane-start-lg="300"
        data-plane-end-lg="900"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[392px] z-20 h-[190px] will-change-transform lg:top-[720px]"
      >
        <Image
          src="/images/hero/hills-front-clean.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center [filter:grayscale(1)_sepia(.25)_brightness(.3)_contrast(1.1)]"
        />
      </div>
    </ParallaxPlanes>
  );
}
