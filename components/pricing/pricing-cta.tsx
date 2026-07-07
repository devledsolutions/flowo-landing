import Image from "next/image";
import { LeadCaptureModal } from "../lead-capture-modal";
import { SIGNUP_URL } from "./links";

const CTA_BASE =
  "inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium transition-colors duration-200 ease-out-quint";

/**
 * Closing band for /precos: full-bleed ink section over the native
 * black-and-white barber photo, with the page's serif statement.
 */
export function PricingCTA() {
  return (
    <section
      aria-labelledby="pricing-cta-title"
      className="on-ink relative isolate overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-50"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[oklch(0.185_0.01_110_/_0.45)]"
      />
      <div className="container-page section-loose relative text-center">
        <h2
          id="pricing-cta-title"
          className="mx-auto max-w-[22ch] font-serif text-h2 font-medium tracking-[-0.008em] text-ink"
        >
          Enquanto você corta, a IA atende.
        </h2>
        <p className="mx-auto mt-4 max-w-measure text-lead text-muted-ink">
          Assine, conecte seu WhatsApp e os próximos horários são marcados sem
          você largar a tesoura.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SIGNUP_URL}
            className={`${CTA_BASE} bg-ink text-cream hover:bg-ink-strong`}
          >
            Começar agora
          </a>
          <LeadCaptureModal>
            <button
              type="button"
              className={`${CTA_BASE} border border-line text-ink hover:bg-surface`}
            >
              Tirar dúvidas
            </button>
          </LeadCaptureModal>
        </div>
      </div>
    </section>
  );
}
