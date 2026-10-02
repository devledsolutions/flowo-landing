"use client";

import { TurnstileWidget } from "@/components/turnstile-widget";

/**
 * Shown when an AI assistant asks to send the visitor's data. The visitor sees
 * what is happening and can cancel; the security check stays the same one the
 * site forms use.
 */
export default function AgentVerificationPanel({
  onToken,
  onCancel,
}: {
  onToken: (token: string) => void;
  onCancel: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[90] w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-line bg-surface p-4 shadow-card"
    >
      <p className="text-sm leading-relaxed text-ink">
        Um assistente de IA pediu para enviar seus dados à Flowo. Fazendo uma verificação de segurança.
      </p>
      <TurnstileWidget
        action="lead_capture"
        appearance="interaction-only"
        onTokenChange={onToken}
        className="mt-3"
      />
      <button
        type="button"
        onClick={onCancel}
        className="mt-3 inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-ink transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        Cancelar
      </button>
    </div>
  );
}
