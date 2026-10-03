"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { CONSENT_PREFIX } from "@/lib/webmcp/consent";
import type { ConfirmationView } from "@/lib/webmcp/confirmation";

const EDGE_GAP_PX = 16;
/** "Autorizar e enviar" stays disabled briefly, so a tap aimed at what was there before cannot approve. */
export const APPROVE_ARM_MS = 600;

/**
 * Bottom offset that keeps the panel above every bar fixed to the bottom of
 * the screen (cookie notice, campaign and tool CTAs). Measured from the real
 * top of each bar, which campaign pages lift above their own CTA.
 */
function bottomOffset(): number {
  const viewportHeight = window.innerHeight;
  let top = viewportHeight;
  for (const element of Array.from(document.querySelectorAll("[data-bottom-fixed]"))) {
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0 || rect.top >= viewportHeight) continue;
    top = Math.min(top, rect.top);
  }
  return Math.max(EDGE_GAP_PX, viewportHeight - top + EDGE_GAP_PX);
}

function useBottomOffset(): number {
  const [offset, setOffset] = useState(EDGE_GAP_PX);

  useEffect(() => {
    let frame = 0;
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => schedule());
    const observed = new Set<Element>();
    function update() {
      frame = 0;
      for (const element of Array.from(document.querySelectorAll("[data-bottom-fixed]"))) {
        if (!observed.has(element)) {
          observed.add(element);
          resizeObserver?.observe(element);
        }
      }
      setOffset(bottomOffset());
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    update();
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden"],
    });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
    };
  }, []);

  return offset;
}

/**
 * The visitor's own confirmation for a contact request made by an AI
 * assistant: the exact data, the consent text and two buttons. Only a real
 * click or key press by the visitor approves, and only the request on screen.
 */
export default function AgentConfirmationPanel({
  view,
  onApprove,
  onCancel,
  onToken,
  acceptsEvent = (event) => event.isTrusted,
}: {
  view: NonNullable<ConfirmationView>;
  onApprove: (id: number) => void;
  onCancel: () => void;
  onToken: (token: string) => void;
  /** Real input only. Scripts calling `.click()` produce untrusted events and are ignored. */
  acceptsEvent?: (event: { isTrusted: boolean }) => boolean;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const firstControlRef = useRef<HTMLButtonElement>(null);
  const onCancelRef = useRef(onCancel);
  const [armed, setArmed] = useState(false);
  const bottom = useBottomOffset();
  const { id, request, step } = view;

  useEffect(() => {
    onCancelRef.current = onCancel;
  });

  useEffect(() => {
    setArmed(false);
    const timer = window.setTimeout(() => setArmed(true), APPROVE_ARM_MS);
    return () => window.clearTimeout(timer);
  }, [id, request]);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    firstControlRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onCancelRef.current();
    };
    document.addEventListener("keydown", onKeyDown, true);
    const panel = panelRef.current;
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      const active = document.activeElement;
      const focusWasHere = !active || active === document.body || Boolean(panel?.contains(active));
      if (focusWasHere && previous?.isConnected) previous.focus();
    };
  }, []);

  const handleApprove = (event: MouseEvent<HTMLButtonElement>) => {
    if (!armed || step !== "confirm" || !acceptsEvent(event)) return;
    onApprove(id);
  };

  return (
    <section
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="agent-confirmation-title"
      aria-describedby="agent-confirmation-intro"
      data-request-id={id}
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
          <p className="text-xs leading-5 text-muted-ink">
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
          onClick={handleApprove}
          disabled={!armed || step === "verify"}
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-cream transition-colors hover:bg-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Autorizar e enviar
        </button>
      </div>
    </section>
  );
}
