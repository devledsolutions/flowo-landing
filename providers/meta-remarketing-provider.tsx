"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { getSavedConsent, type ConsentPreferences } from "@/lib/consent";

type MetaEventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "CompleteRegistration"
  | "InitiateCheckout"
  | "Schedule"
  | "Subscribe";

type MetaEventProperties = Record<string, string | number | boolean | undefined>;

interface MetaPixelFunction {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

interface MetaRemarketingContextValue {
  hasMarketingConsent: boolean;
  isReady: boolean;
  createEventId: () => string;
  track: (
    event: MetaEventName,
    properties?: MetaEventProperties,
    eventId?: string
  ) => void;
  trackCustom: (
    event: string,
    properties?: MetaEventProperties,
    eventId?: string
  ) => void;
}

const MetaRemarketingContext = createContext<MetaRemarketingContextValue>({
  hasMarketingConsent: false,
  isReady: false,
  createEventId: () => "",
  track: () => {},
  trackCustom: () => {},
});

const PIXEL_SCRIPT_ID = "flowo-meta-pixel";
const PIXEL_INITIALIZED_KEY = "flowo-meta-pixel-initialized";

function createEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `flowo-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function installPixelQueue(): MetaPixelFunction {
  if (window.fbq) return window.fbq;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
      return;
    }
    fbq.queue?.push(args);
  }) as MetaPixelFunction;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;
  return fbq;
}

function removeMetaCookies(): void {
  for (const name of ["_fbp", "_fbc"]) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax; Secure`;
    if (
      window.location.hostname === "flowo.com.br" ||
      window.location.hostname.endsWith(".flowo.com.br")
    ) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.flowo.com.br; SameSite=Lax; Secure`;
    }
  }
}

function contentCategory(pathname: string): string | undefined {
  if (pathname.startsWith("/comparar")) return "comparacao";
  if (pathname.startsWith("/recursos")) return "conteudo";
  if (pathname.includes("calculadora") || pathname.includes("raio-x")) {
    return "ferramenta";
  }
  if (pathname.includes("preco")) return "precos";
  if (
    pathname.includes("recepcionista-ia") ||
    pathname.includes("aplicativo-para-barbeiros")
  ) {
    return "produto";
  }
  return undefined;
}

export function useMetaRemarketing(): MetaRemarketingContextValue {
  return useContext(MetaRemarketingContext);
}

export function MetaRemarketingProvider({
  children,
  pixelId,
}: {
  children: ReactNode;
  pixelId?: string;
}) {
  const pathname = usePathname();
  const [hasMarketingConsent, setHasMarketingConsent] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const initialize = useCallback(() => {
    if (typeof window === "undefined" || !pixelId) return;
    if (!getSavedConsent()?.marketing) {
      setHasMarketingConsent(false);
      setIsReady(false);
      return;
    }

    setHasMarketingConsent(true);
    const fbq = installPixelQueue();
    fbq("consent", "grant");

    if (!window.sessionStorage.getItem(PIXEL_INITIALIZED_KEY)) {
      fbq("init", pixelId);
      window.sessionStorage.setItem(PIXEL_INITIALIZED_KEY, "true");
    }

    if (!document.getElementById(PIXEL_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = PIXEL_SCRIPT_ID;
      script.async = true;
      script.src = "https://connect.facebook.net/pt_BR/fbevents.js";
      document.head.appendChild(script);
    }

    setIsReady(true);
  }, [pixelId]);

  useEffect(() => {
    const handleConsent = (event: CustomEvent<ConsentPreferences>) => {
      if (event.detail.marketing) {
        initialize();
        return;
      }

      window.fbq?.("consent", "revoke");
      setHasMarketingConsent(false);
      setIsReady(false);
      removeMetaCookies();
    };

    window.addEventListener("consent-updated", handleConsent as EventListener);
    initialize();
    return () =>
      window.removeEventListener(
        "consent-updated",
        handleConsent as EventListener
      );
  }, [initialize]);

  const track = useCallback(
    (
      event: MetaEventName,
      properties: MetaEventProperties = {},
      eventId?: string
    ) => {
      if (!hasMarketingConsent || !isReady || !window.fbq) return;
      window.fbq(
        "track",
        event,
        properties,
        eventId ? { eventID: eventId } : undefined
      );
    },
    [hasMarketingConsent, isReady]
  );

  const trackCustom = useCallback(
    (
      event: string,
      properties: MetaEventProperties = {},
      eventId?: string
    ) => {
      if (!hasMarketingConsent || !isReady || !window.fbq) return;
      window.fbq(
        "trackCustom",
        event,
        properties,
        eventId ? { eventID: eventId } : undefined
      );
    },
    [hasMarketingConsent, isReady]
  );

  useEffect(() => {
    if (!isReady || !hasMarketingConsent) return;

    track("PageView", {
      page_path: pathname,
    });

    const category = contentCategory(pathname);
    if (category) {
      track("ViewContent", {
        content_name: document.title,
        content_category: category,
        page_path: pathname,
      });
    }
  }, [hasMarketingConsent, isReady, pathname, track]);

  const value = useMemo<MetaRemarketingContextValue>(
    () => ({
      hasMarketingConsent,
      isReady,
      createEventId,
      track,
      trackCustom,
    }),
    [hasMarketingConsent, isReady, track, trackCustom]
  );

  return (
    <MetaRemarketingContext.Provider value={value}>
      {children}
    </MetaRemarketingContext.Provider>
  );
}
