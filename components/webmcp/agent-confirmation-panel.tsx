"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { CONSENT_PREFIX } from "@/lib/webmcp/consent";
import type { ConfirmationView } from "@/lib/webmcp/confirmation";

const EDGE_GAP_PX = 16;

/**
 * Distance from the bottom of the screen that keeps the panel above the
 * cookie notice while it is open, instead of covering its buttons.
 */
function useBottomOffset(): number {
  const [offset, setOffset] = useState(EDGE_GAP_PX);

  useEffect(() => {
    let observed: Element | null = null;
    let resizeObserver: ResizeObserver | null = null;
    const update = () => {
      const banner = document.querySelector("[data-cookie-banner]");
      if (banner !== observed) {
        resizeObserver?.disconnect();
        observed = banner;
        if (banner && typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(update);
          resizeObserver.observe(banner);
        }
      }
      setOffset(EDGE_GAP_PX + (banner ? banner.getBoundingClientRect().height : 0));
    };
    update();
    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
    };
  }, []);

  return offset;
}

/**
 * The visitor's own confirmation for a contact request made by an AI
 * assistant: the exact data, the consent text and two buttons. Nothing is
 * verified or sent before "Autorizar e enviar" is clicked.
 */
export default function AgentConfirmationPanel({
  view,
  onApprove,
  onCancel,
  onToken,
}: {
  view: NonNullable<ConfirmationView>;
  onApprove: () => void;
  onCancel: () => void;
  onToken: (token: string) => void;
}) {
  const firstControlRef = useRef<HTMLButtonElement>(null);
  const bottom = useBottomOffset();
  const { request, step } = view;

  useEffect(() => {
    firstControlRef.current?.focus();
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onCancel();
    }
  };

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="agent-confirmation-title"
      aria-describedby="agent-confirmation-intro"
      onKeyDown={handleKeyDown}
      style={{ bottom, maxHeight: `calc(100dvh - ${bottom + EDGE_GAP_PX}px)` }}
      className="fixed right-4 z-[60] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-line bg-surface p-5 text-ink shadow-card"
    >
      <h2 id="agent-confirmation-title" className="text-base font-semibold leading-snug text-ink-strong">
        Um assistente de IA quer enviar seus dados à Flowo
      </h2>
      <p id="agent-confirmation-intro" className="mt-1 text-sm leading-relaxed text-muted-ink">
        {request.titulo}. Confira os dados antes de autorizar.
      </p>

      <dl className="mt-4 divide-y divide-line rounded-lg border border-line text-sm">
        {request.campos.map((campo) => (
          <div key={campo.rotulo} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 px-3 py-2">
            <dt className="text-muted-ink">{campo.rotulo}</dt>
            <dd className="break-words text-ink">{campo.valor}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs leading-5 text-muted-ink">
        {CONSENT_PREFIX[request.consentimento]}, conforme a{" "}
        <Link className="underline underline-offset-2" href="/privacidade" target="_blank">
          Política de Privacidade
        </Link>{" "}
        e os{" "}
        <Link className="underline underline-offset-2" href="/termos" target="_blank">
          Termos de Uso
        </Link>
        .
      </p>

      {step === "verify" ? (
        <div className="mt-3">
          <p className="text-xs leading-5 text-muted-ink" role="status">
            Autorizado. Fazendo uma verificação de segurança antes de enviar.
          </p>
          <TurnstileWidget
            action="lead_capture"
            appearance="interaction-only"
            onTokenChange={onToken}
            className="mt-2"
          />
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap justify-end gap-3">
        <button
          ref={firstControlRef}
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-ink transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onApprove}
          disabled={step === "verify"}
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-cream transition-colors hover:bg-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Autorizar e enviar
        </button>
      </div>
    </section>
  );
}
