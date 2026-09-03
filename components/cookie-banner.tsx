"use client";

import { useState, useEffect } from "react";
import { X, Settings, Shield, BarChart3, Megaphone, Check, Cookie } from "lucide-react";
import {
  COOKIE_PREFERENCES_EVENT,
  getSavedConsent,
  saveConsent,
  type ConsentPreferences,
} from "@/lib/consent";
import Link from "next/link";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isCampaignPage, setIsCampaignPage] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    setIsCampaignPage(
      Boolean(document.querySelector('[data-campaign="true"]')),
    );

    const handleOpenPreferences = () => {
      setShowPreferences(true);
      setIsVisible(true);
    };
    window.addEventListener(COOKIE_PREFERENCES_EVENT, handleOpenPreferences);

    const savedConsent = getSavedConsent();
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (savedConsent) {
      setPreferences(savedConsent);
    } else {
      timer = setTimeout(() => setIsVisible(true), 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(
        COOKIE_PREFERENCES_EVENT,
        handleOpenPreferences
      );
    };
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const allRejected: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(allRejected);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <section
      aria-label="Aviso de cookies"
      className={`fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300${
        isCampaignPage ? " flowo-campaign-cookie" : ""
      }`}
    >
      <div className="border-t border-line bg-surface shadow-[0_-4px_8px_-2px_oklch(0.205_0.012_110/0.12)]">
        {!showPreferences ? (
          <div className="mx-auto flex max-w-page flex-col gap-1.5 px-[var(--gutter)] py-2 sm:flex-row sm:items-center sm:gap-5 sm:py-2.5">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <Cookie aria-hidden="true" className="mt-0.5 hidden h-5 w-5 flex-shrink-0 text-ink sm:block" />
              <div>
                <p className="text-xs leading-snug text-muted-ink sm:text-sm sm:leading-relaxed">
                  Usamos cookies para melhorar sua experiência.{" "}
                  <Link
                    href="/privacidade"
                    prefetch={false}
                    className="font-medium text-ink underline underline-offset-4 hover:no-underline"
                  >
                    Saiba mais
                  </Link>
                </p>
              </div>
              <button
                onClick={handleRejectAll}
                className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors sm:inline-flex duration-200 ease-out-quint hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 sm:hidden"
                aria-label="Fechar e rejeitar cookies opcionais"
              >
                <X aria-hidden="true" className="h-4 w-4 text-muted-ink" />
              </button>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-2 sm:justify-start">
              <button
                type="button"
                className="inline-flex h-8 items-center rounded-full px-2 text-xs text-muted-ink hover:text-ink sm:h-9 sm:px-2.5"
                onClick={() => setShowPreferences(true)}
              >
                <Settings aria-hidden="true" className="h-3.5 w-3.5 sm:mr-1.5" />
                <span className="sr-only sm:not-sr-only">Preferências</span>
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center rounded-full border border-line px-3 text-xs text-ink sm:h-9 sm:px-3.5"
                onClick={handleRejectAll}
              >
                Rejeitar
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center rounded-full bg-ink px-3 text-xs font-medium text-cream sm:h-9 sm:px-3.5"
                onClick={handleAcceptAll}
              >
                Aceitar
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-md px-[var(--gutter)] py-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield aria-hidden="true" className="h-4 w-4 text-ink" />
                <h2 className="text-sm font-medium text-ink">
                  Preferências de cookies
                </h2>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 ease-out-quint hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                aria-label="Voltar"
              >
                <X aria-hidden="true" className="h-4 w-4 text-muted-ink" />
              </button>
            </div>

            <div className="mb-4 space-y-2.5">
              <div className="flex items-center justify-between rounded-lg bg-secondary px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <Shield aria-hidden="true" className="h-4 w-4 text-muted-ink" />
                  <span className="text-sm text-ink">Necessários</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check aria-hidden="true" className="h-3.5 w-3.5 text-muted-ink" />
                  <span className="text-xs text-muted-ink">Sempre ativos</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-secondary px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <BarChart3 aria-hidden="true" className="h-4 w-4 text-muted-ink" />
                  <span className="text-sm text-ink">Analíticos</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-label="Cookies analíticos"
                  aria-checked={preferences.analytics}
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      analytics: !prev.analytics,
                    }))
                  }
                  className="relative h-11 w-11 rounded-full before:absolute before:left-0 before:top-2.5 before:h-6 before:w-11 before:rounded-full before:border-2 before:border-line before:bg-white before:content-[''] aria-checked:before:border-ink aria-checked:before:bg-ink"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0.5 top-3 block h-5 w-5 rounded-full bg-background shadow transition-transform ${
                      preferences.analytics ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-secondary px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <Megaphone aria-hidden="true" className="h-4 w-4 text-muted-ink" />
                  <span className="text-sm text-ink">Marketing</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-label="Cookies de marketing"
                  aria-checked={preferences.marketing}
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      marketing: !prev.marketing,
                    }))
                  }
                  className="relative h-11 w-11 rounded-full before:absolute before:left-0 before:top-2.5 before:h-6 before:w-11 before:rounded-full before:border-2 before:border-line before:bg-white before:content-[''] aria-checked:before:border-ink aria-checked:before:bg-ink"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0.5 top-3 block h-5 w-5 rounded-full bg-background shadow transition-transform ${
                      preferences.marketing ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="h-11 flex-1 rounded-full border border-line text-xs text-ink"
                onClick={() => setShowPreferences(false)}
              >
                Voltar
              </button>
              <button
                type="button"
                className="h-11 flex-1 rounded-full bg-ink text-xs font-medium text-cream"
                onClick={handleSavePreferences}
              >
                Salvar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
