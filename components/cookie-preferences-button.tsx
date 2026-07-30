"use client";

import { COOKIE_PREFERENCES_EVENT } from "@/lib/consent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="flex min-h-11 items-center rounded-sm text-muted-ink outline-none transition-colors duration-200 ease-out-quint hover:text-ink focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      onClick={() => window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))}
    >
      Preferências de cookies
    </button>
  );
}
