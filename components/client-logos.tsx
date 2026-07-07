"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const BAND_IMAGE =
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=80";

/**
 * Banda de tinta da prova social. Os logos fabricados ("Empresa A..E") foram
 * removidos: sem clientes reais para exibir, a banda carrega UMA declaração
 * honesta do que o Flowo faz, o único momento serif (Lora) desta fatia.
 */
export default function ClientLogos() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="on-ink relative isolate overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={BAND_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="img-duotone object-cover opacity-30"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[oklch(0.185_0.01_110/0.65)] via-[oklch(0.185_0.01_110/0.25)] to-[oklch(0.185_0.01_110/0.8)]"
      />

      <div className="container-page section-loose relative text-center">
        <h2 className="mx-auto max-w-4xl font-serif text-h2 font-medium leading-[1.15] tracking-[-0.008em] text-ink-strong">
          A IA atende no WhatsApp, agenda e confirma. Você cuida do corte.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lead text-muted-ink">
          Feito para barbearias brasileiras, do barbeiro solo à rede com várias
          unidades.
        </p>
      </div>
    </section>
  );
}
