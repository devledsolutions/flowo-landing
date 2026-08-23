"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  action: string;
  onTokenChange: (token: string) => void;
  onStatusChange?: (status: TurnstileStatus) => void;
  className?: string;
};

export type TurnstileStatus =
  | "loading"
  | "verified"
  | "error"
  | "timeout"
  | "expired";

const VERIFICATION_TIMEOUT_MS = 30_000;

export function TurnstileWidget({
  action,
  onTokenChange,
  onStatusChange,
  className,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptAttempt, setScriptAttempt] = useState(0);
  const [status, setStatus] = useState<TurnstileStatus>("loading");
  const [widgetSize, setWidgetSize] = useState<"flexible" | "compact">("flexible");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    onTokenChange("");
  }, [onTokenChange]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);

  useEffect(() => {
    if (!siteKey || status !== "loading") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus("timeout");
    }, VERIFICATION_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [scriptAttempt, siteKey, status]);

  useEffect(() => {
    const updateSize = () => {
      const width = containerRef.current?.clientWidth ?? window.innerWidth;
      setWidgetSize(width < 300 ? "compact" : "flexible");
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!siteKey || !scriptLoaded || !containerRef.current || !window.turnstile) {
      return;
    }

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    setStatus("loading");

    try {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        theme: "auto",
        size: widgetSize,
        callback: (token) => {
          onTokenChange(token);
          setStatus("verified");
        },
        "expired-callback": () => {
          onTokenChange("");
          setStatus("expired");
        },
        "error-callback": () => {
          onTokenChange("");
          setStatus("error");
        },
      });

      widgetIdRef.current = widgetId;
    } catch {
      onTokenChange("");
      setStatus("error");
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [action, onTokenChange, scriptLoaded, siteKey, widgetSize]);

  const handleRetry = () => {
    onTokenChange("");
    setStatus("loading");

    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
        return;
      } catch {
        widgetIdRef.current = null;
      }
    }

    setScriptLoaded(false);
    setScriptAttempt((attempt) => attempt + 1);
  };

  if (!siteKey) {
    return null;
  }

  return (
    <div className={className}>
      <Script
        id={`flowo-turnstile-${scriptAttempt}`}
        key={scriptAttempt}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => {
          if (window.turnstile) {
            setScriptLoaded(true);
            setStatus("loading");
          } else {
            setStatus("error");
          }
        }}
        onError={() => {
          onTokenChange("");
          setScriptLoaded(false);
          setStatus("error");
        }}
      />
      <div ref={containerRef} />
      {status === "loading" ? (
        <p className="mt-2 text-center text-xs text-muted-ink" role="status">
          Carregando verificação de segurança...
        </p>
      ) : status === "verified" ? (
        <p className="mt-2 text-center text-xs text-muted-ink" role="status">
          Verificação de segurança concluída.
        </p>
      ) : (
        <div
          className="mt-2 rounded-lg border border-line bg-surface px-3 py-3 text-center"
          role="alert"
        >
          <p className="text-xs leading-relaxed text-muted-ink">
            {status === "timeout"
              ? "A verificação demorou mais que o esperado."
              : status === "expired"
                ? "A verificação de segurança expirou."
                : "Não foi possível carregar a verificação de segurança."}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-2 min-h-11 rounded-full border border-input px-4 text-xs font-semibold text-ink hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
}
