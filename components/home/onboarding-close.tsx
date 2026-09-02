import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SIGNUP_URL, WHATSAPP_URL } from "@/components/cta-links";
import { TrackedLink } from "@/components/analytics/tracked-link";

const steps = [
  "Crie sua conta",
  "Escolha o plano",
  "Conecte o WhatsApp com a nossa equipe",
] as const;

/**
 * The one dark move on the page, and the one photograph. The copy sits on a
 * column of plain ink because the photo is masked away from it: no scrim over
 * the whole frame, no text on skin. On the right, a real screenshot of the
 * product rises out of the section and keeps going behind the footer, which
 * is what makes the close and the footer read as one place instead of a page
 * that ends and a footer that begins.
 */
export default function OnboardingClose() {
  return (
    <section
      aria-labelledby="onboarding-close-title"
      className="on-ink relative z-10 isolate"
    >
      <Image
        src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1600&q=82"
        alt=""
        fill
        sizes="100vw"
        className="img-duotone z-0 object-cover object-[64%_center] opacity-90 [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_34%,black_72%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,transparent_40%,black_66%)]"
      />

      <div className="container-page relative z-10 grid gap-12 pt-[var(--section-y-loose)] lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:items-end lg:gap-16">
        <div className="max-w-[33rem] lg:pb-[var(--section-y-loose)]">
          <h2
            id="onboarding-close-title"
            className="text-h2 font-semibold leading-tight tracking-[-0.025em] text-ink-strong"
          >
            A gente configura com você.
          </h2>
          <p className="mt-5 max-w-[28rem] text-lead text-muted-ink">
            Organizamos serviços, profissionais e horários. Antes de ativar,
            testamos o WhatsApp junto com você.
          </p>

          <ol className="mt-8 divide-y divide-line border-y border-line">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-4 py-3.5">
                <span className="w-5 text-caption font-semibold tabular-nums text-muted-ink">
                  {index + 1}
                </span>
                <span className="text-body font-medium text-ink">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={SIGNUP_URL}
              event="CTA Clicked"
              properties={{
                page: "/",
                placement: "closing",
                destination: "dashboard_signup",
                intent: "start_now",
              }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
            >
              Criar minha conta
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href={WHATSAPP_URL}
              event="CTA Clicked"
              properties={{
                page: "/",
                placement: "closing",
                destination: "whatsapp_sales",
                intent: "ask_question",
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink/50 bg-cream px-7 text-label font-semibold text-ink transition-colors hover:bg-surface"
            >
              Falar com a Flowo
            </TrackedLink>
          </div>
          <p className="mt-5 max-w-[28rem] text-caption text-muted-ink">
            Antes de ativar, revisamos a agenda e fazemos uma conversa de teste.
            Sem fidelidade. Avaliação assistida de 14 dias para clientes elegíveis.
          </p>
        </div>

        <div className="relative z-10 -mb-28 mx-auto w-[min(100%,19rem)] lg:-mb-40 lg:mr-0 lg:w-[min(100%,21rem)]">
          <div className="h-[30rem] overflow-hidden rounded-[2rem] border border-ink/25 bg-surface shadow-[0_44px_90px_-46px_oklch(0.08_0.01_110/0.95)] lg:h-[34rem]">
            <Image
              src="/images/validation-cases/product/whatsapp-booking.png"
              alt="Conversa real de agendamento pelo WhatsApp da Flowo, com o horário confirmado na agenda."
              width={1206}
              height={2622}
              sizes="(min-width: 1024px) 21rem, 19rem"
              className="w-full object-cover object-top"
            />
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-caption text-muted-ink">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Tela real do produto, de um teste acompanhado
          </p>
        </div>
      </div>
    </section>
  );
}
