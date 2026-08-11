import { ArrowRight, Smartphone } from "lucide-react";
import {
  AgendaPreview,
  ConversationPreview,
  ProductDisclaimer,
} from "@/components/home/product-previews";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { HeroExperimentCopy } from "@/components/home/hero-experiment-copy";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cream">
      <div className="container-page pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <h1
            className="text-[clamp(2.35rem,1.45rem+4vw,4.9rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-strong"
          >
            Sua barbearia atende mesmo{" "}
            <em className="block font-serif font-medium italic tracking-[-0.025em]">
              quando você está cortando.
            </em>
          </h1>
          <HeroExperimentCopy />
          <TrackedLink
            href="/aplicativo-para-barbeiros"
            event="CTA Clicked"
            properties={{
              page: "/",
              placement: "hero",
              destination: "mobile_app_page",
              intent: "learn_about_app",
            }}
            className="mt-5 inline-flex min-h-11 items-center gap-2 border-y border-line px-3 py-2.5 text-caption font-medium text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
          >
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            App Flowo para a equipe
            <span className="font-semibold text-ink">em breve</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </TrackedLink>
        </div>

        <div
          className="relative mx-auto mt-11 h-[22rem] max-w-5xl sm:mt-14 sm:h-[31rem] lg:h-[35rem]"
        >
          <AgendaPreview className="absolute inset-x-0 top-0 sm:inset-x-10 lg:inset-x-16" />
          <div
            aria-hidden="true"
            className="absolute bottom-[4.35rem] left-[7%] right-[7%] hidden h-3 rounded-b-[70%] bg-ink/90 shadow-[0_12px_24px_oklch(0.17_0.012_110/0.22)] sm:block lg:bottom-[4.8rem]"
          />
          <ConversationPreview className="absolute bottom-7 right-0 w-[48%] max-w-[15.5rem] rotate-[1deg] sm:bottom-8 sm:right-4 sm:w-[31%] lg:right-0 lg:max-w-[17rem]" />
          <div className="absolute bottom-7 left-0 w-[62%] rounded-lg border border-line bg-surface/95 p-3 shadow-[0_20px_50px_-34px_oklch(0.17_0.012_110/0.55)] backdrop-blur sm:bottom-12 sm:left-8 sm:w-auto sm:min-w-72 sm:p-4 lg:left-16">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.91_0.08_150)] text-[oklch(0.43_0.11_150)]">
                ✓
              </span>
              <div>
                <p className="text-[10px] font-semibold text-ink sm:text-sm">
                  Agendamento confirmado
                </p>
                <p className="mt-0.5 text-[8px] text-muted-ink sm:text-[11px]">
                  Marcos · 10:30 · Corte com Rafael
                </p>
              </div>
            </div>
          </div>
        </div>

        <ProductDisclaimer className="-mt-1 sm:mt-0" />
      </div>
    </section>
  );
}
