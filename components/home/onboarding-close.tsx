import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { SIGNUP_URL, WHATSAPP_URL } from "@/components/cta-links";
import { TrackedLink } from "@/components/analytics/tracked-link";

const steps = [
  "Crie sua conta",
  "Escolha o plano",
  "Conecte o WhatsApp com ajuda da Flowo",
] as const;

export default function OnboardingClose() {
  return (
    <section aria-labelledby="onboarding-close-title" className="overflow-hidden">
      <div className="grid min-h-[680px] lg:grid-cols-2">
        <div className="on-ink relative isolate flex items-end overflow-hidden !bg-transparent">
          <Image
            src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1400&q=82"
            alt="Barbeiro atendendo um cliente"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="img-duotone z-0 object-cover object-center"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[oklch(0.15_0.01_110/0.78)] via-[oklch(0.15_0.01_110/0.34)] to-transparent" />
          <div className="relative z-10 w-full px-[var(--gutter)] py-14 lg:ml-auto lg:max-w-[37.5rem] lg:py-20">
            <h2
              id="onboarding-close-title"
              className="max-w-xl text-h2 font-semibold leading-tight tracking-[-0.025em] text-ink-strong"
            >
              Você começa com acompanhamento, não com uma tela vazia.
            </h2>
            <p className="mt-5 max-w-lg text-lead text-muted-ink">
              Escolha o plano, conecte o WhatsApp da barbearia e configure a
              agenda com a nossa equipe.
            </p>
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
                Começar agora
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
                className="inline-flex h-12 items-center justify-center rounded-full border border-line px-7 text-label font-semibold text-ink transition-colors hover:bg-surface"
              >
                Tirar dúvidas
              </TrackedLink>
            </div>
            <p className="mt-5 text-caption text-muted-ink">
              Jornada pública paga · sem fidelidade · configuração acompanhada
            </p>
          </div>
        </div>

        <div className="flex items-center bg-cream px-[var(--gutter)] py-14 lg:py-20">
          <div className="w-full lg:max-w-[32rem]">
            <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
              Primeiros passos
            </p>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {steps.map((step, index) => (
                <li key={step} className="flex items-center gap-5 py-6">
                  <span className="font-serif text-3xl italic text-ink">
                    {index + 1}
                  </span>
                  <span className="text-body font-medium text-ink">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[oklch(0.58_0.11_150)] text-[oklch(0.45_0.1_150)]">
                <Check className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-ink">Configuração acompanhada</p>
                <p className="mt-1 text-body text-muted-ink">
                  Sua agenda fica pronta com os serviços, profissionais e horários
                  de cada pessoa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
