import Image from "next/image";
import {
  CalendarDays,
  Check,
  Home,
  MessageCircle,
  Receipt,
  Search,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";
import { ParallaxPlanes } from "@/components/home/parallax-planes";
import { PhoneFrame } from "@/components/home/phone-frame";
import { HeroExperimentCopy } from "@/components/home/hero-experiment-copy";
import { ProductDisclaimer } from "@/components/home/product-previews";

/**
 * A faithful reproduction of fora.so's hero staging, with Flowo's content.
 *
 * Layers, back to front, in DOM order: a radial sky gradient; a far hills
 * plane (0.69x page speed); a middle hills plane (0.83x); the centred copy;
 * the product card (0.80x), which sits between the middle and the front
 * plane; and a front hills plane that travels with the page and paints over
 * the card's base. Boxes and type follow the reference measured at 1440x900
 * and 390x844; see DESIGN.md, "Layout e ritmo", for the recorded exception.
 */
const APPEAR =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:duration-[600ms] motion-safe:ease-out";

const menu = [
  { icon: Home, label: "Hoje" },
  { icon: CalendarDays, label: "Agenda" },
  { icon: Receipt, label: "Comandas" },
  { icon: Users, label: "Clientes" },
  { icon: MessageCircle, label: "Conversas" },
  { icon: Wallet, label: "Financeiro" },
  { icon: UsersRound, label: "Equipe" },
] as const;

function Hills({
  src,
  rate,
  className,
  delay,
}: {
  src: string;
  rate: number;
  className: string;
  delay: string;
}) {
  return (
    <div
      data-plane-rate={rate}
      aria-hidden="true"
      className={`${APPEAR} ${delay} pointer-events-none absolute will-change-transform lg:inset-x-0 lg:w-auto ${className}`}
    >
      <Image src={src} alt="" fill sizes="100vw" className="object-cover object-center" priority />
    </div>
  );
}

export default function Hero() {
  return (
    <ParallaxPlanes
      id="hero"
      className="relative isolate h-[1022px] overflow-hidden text-[rgb(255,243,240)] lg:h-[1269px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(200%_83%_at_50%_0px,rgb(27,34,40)_0%,rgb(53,63,68)_42%,rgb(211,151,148)_100%)]"
      />

      <Hills
        src="/images/hero/hills-far.png"
        rate={0.69}
        delay="motion-safe:delay-[400ms]"
        className="left-[-240px] top-[702px] h-[321px] w-[870px] lg:top-[738px] lg:h-[531px]"
      />
      <Hills
        src="/images/hero/hills-mid.png"
        rate={0.83}
        delay="motion-safe:delay-[450ms]"
        className="left-[-152px] top-[783px] h-[239px] w-[694px] lg:top-[773px] lg:h-[496px]"
      />

      <div className="relative mx-auto w-full max-w-[1080px] px-6 text-center lg:px-0">
        <div className={`${APPEAR} mt-[121px] flex justify-center lg:mt-[161px]`}>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[14px] leading-[21px] text-white/80">
            WhatsApp conectado à agenda
          </span>
        </div>
        <h1
          className={`${APPEAR} motion-safe:delay-[80ms] mx-auto mt-6 max-w-[620px] text-[36px] font-normal leading-[1.3] tracking-[-0.04em] lg:text-[56px]`}
        >
          <em className="block font-serif font-medium italic">“Tem horário hoje?”</em>
          <span className="block font-semibold">A Flowo responde.</span>
        </h1>
        <HeroExperimentCopy align="fora" />
      </div>

      <div
        data-plane-rate={0.8}
        className={`${APPEAR} motion-safe:delay-[320ms] absolute left-6 right-6 top-[569px] mx-auto h-[452px] w-auto will-change-transform lg:left-[calc(50%-480px)] lg:right-auto lg:top-[594px] lg:h-[676px] lg:w-[960px]`}
      >
        <div className="relative flex h-full w-full gap-1.5 rounded-t-[24px] border border-b-0 border-white/10 bg-[rgba(23,23,23,0.85)] p-1.5 backdrop-blur-[24px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgb(250,230,225)] opacity-75 [mask-image:linear-gradient(90deg,transparent_0%,black_50%,transparent_100%)]"
          />

          <nav aria-label="Menu do app" className="flex w-[42px] shrink-0 flex-col gap-1 pt-2 lg:w-[220px] lg:pt-3">
            <div className="mx-1.5 mb-2 flex h-8 items-center gap-2 rounded-md bg-white/10 px-2 text-white/50 lg:mx-2">
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden text-[13px] lg:block">Buscar</span>
            </div>
            {menu.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex h-9 items-center gap-2.5 rounded-md px-2.5 text-[14px] text-white/80 lg:px-3"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="hidden lg:block">{label}</span>
              </span>
            ))}
          </nav>

          <div className="relative min-w-0 flex-1 overflow-hidden rounded-[18px] bg-cream">
            <PhoneFrame
              src="/images/validation-cases/product/whatsapp-booking.png"
              alt="Conversa no WhatsApp: o cliente pede horário e a Flowo oferece três opções e confirma."
              width={1206}
              height={2622}
              sizes="(min-width: 1024px) 15rem, 38vw"
              className="absolute left-[7%] top-8 w-[44%] max-w-[15rem] lg:left-[9%] lg:top-12"
              priority
            />
            <PhoneFrame
              src="/images/product/app-agenda.png"
              alt="Agenda do app da Flowo com cinco barbeiros e os horários do dia."
              width={720}
              height={1564}
              sizes="(min-width: 1024px) 17rem, 44vw"
              className="absolute right-[6%] top-4 w-[50%] max-w-[17rem] lg:right-[8%] lg:top-6"
              priority
            />
            <div className="absolute bottom-6 left-1/2 hidden w-[15.5rem] -translate-x-1/2 items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-ink shadow-[0_18px_40px_-24px_oklch(0.08_0.01_110/0.7)] sm:flex lg:bottom-10">
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

      <Hills
        src="/images/hero/hills-front.png"
        rate={1}
        delay="motion-safe:delay-[500ms]"
        className="left-[-120px] top-[897px] h-[125px] w-[630px] lg:top-[984px] lg:h-[285px]"
      />

      <ProductDisclaimer
        label="Telas reais do app, com dados ilustrativos"
        className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-white/60 [&_svg]:text-white/60"
      />
    </ParallaxPlanes>
  );
}
