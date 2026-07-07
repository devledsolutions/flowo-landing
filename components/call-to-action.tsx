"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LeadCaptureModal } from "./lead-capture-modal"

const SIGNUP_URL = "https://barber.flowo.com.br/sign-up"

export default function CallToAction() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="cta-final-title"
      className="on-ink relative isolate overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={reduceMotion ? { scale: 1 } : { scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.185_0.01_110/0.88)] via-[oklch(0.185_0.01_110/0.62)] to-[oklch(0.185_0.01_110/0.94)]" />
      </motion.div>

      <div className="container-page section-loose relative text-center">
        <h2
          id="cta-final-title"
          className="mx-auto max-w-3xl text-h2 font-semibold tracking-[-0.02em] text-ink"
        >
          Enquanto você corta, a{" "}
          <em className="font-serif font-medium italic tracking-[-0.008em]">
            Bia
          </em>{" "}
          atende.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lead text-muted-ink">
          A IA do Flowo responde, agenda e confirma pelo WhatsApp da sua
          barbearia. Todo dia, a qualquer hora.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-8 text-base font-semibold"
          >
            <a href={SIGNUP_URL}>Começar agora</a>
          </Button>
          <LeadCaptureModal>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-line bg-transparent px-8 text-base text-ink hover:bg-surface hover:text-ink"
            >
              Tirar dúvidas
            </Button>
          </LeadCaptureModal>
        </div>

        <p className="mt-6 text-caption text-muted-ink">
          Assinatura mensal ou anual. Sem fidelidade, cancele quando quiser.
        </p>
      </div>
    </section>
  )
}
