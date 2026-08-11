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

type PaidMediaLead = {
  source: string;
  resource?: string;
  kind: "lead" | "newsletter" | "waitlist";
};

declare global {
  interface Window {
    __flowoGoogleAnalyticsId?: string;
    __flowoGoogleAdsId?: string;
  }
}

interface PaidMediaContextValue {
  hasMarketingConsent: boolean;
  isGoogleReady: boolean;
  trackLead: (lead: PaidMediaLead) => void;
}

const PaidMediaContext = createContext<PaidMediaContextValue>({
  hasMarketingConsent: false,
  isGoogleReady: false,
  trackLead: () => {},
});

const GOOGLE_SCRIPT_ID = "flowo-google-ads";

function ensureGtag(): NonNullable<Window["gtag"]> {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  }
  return window.gtag;
}

function removeCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax; Secure`;
  if (
    window.location.hostname === "flowo.com.br" ||
    window.location.hostname.endsWith(".flowo.com.br")
  ) {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.flowo.com.br; SameSite=Lax; Secure`;
  }
}

function removeGoogleCookies(): void {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=", 1)[0]?.trim();
    if (
      !name ||
      (name !== "_ga" &&
        !name.startsWith("_ga_") &&
        name !== "_gcl_au" &&
        !name.startsWith("_gcl_"))
    ) {
      continue;
    }
    removeCookie(name);
  }
}

function contentCategory(pathname: string): string | undefined {
  if (pathname.startsWith("/comparar") || pathname.startsWith("/flowo-vs-")) {
    return "comparacao";
  }
  if (
    pathname.includes("calculadora") ||
    pathname.includes("diagnostico") ||
    pathname.includes("raio-x")
  ) {
    return "ferramenta";
  }
  if (pathname.startsWith("/recursos")) return "conteudo";
  if (pathname.includes("preco")) return "precos";
  if (
    pathname.includes("demonstracao") ||
    pathname.includes("recepcionista-ia") ||
    pathname.includes("aplicativo-para-barbeiros")
  ) {
    return "produto";
  }
  return undefined;
}

export function usePaidMedia(): PaidMediaContextValue {
  return useContext(PaidMediaContext);
}

export function PaidMediaProvider({
  children,
  googleAnalyticsId,
  googleAdsId,
  googleLeadConversionLabel,
}: {
  children: ReactNode;
  googleAnalyticsId?: string;
  googleAdsId?: string;
  googleLeadConversionLabel?: string;
}) {
  const pathname = usePathname();
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);
  const [hasMarketingConsent, setHasMarketingConsent] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);

  const initialize = useCallback(() => {
    if (typeof window === "undefined") return;
    const consent = getSavedConsent();
    const analyticsAllowed = consent?.analytics === true;
    const marketingAllowed = consent?.marketing === true;
    setHasAnalyticsConsent(analyticsAllowed);
    setHasMarketingConsent(marketingAllowed);

    if (!analyticsAllowed && !marketingAllowed) {
      removeGoogleCookies();
      setIsGoogleReady(false);
      return;
    }

    const tagId = analyticsAllowed && googleAnalyticsId
      ? googleAnalyticsId
      : marketingAllowed
        ? googleAdsId
        : undefined;
    if (!tagId) {
      setIsGoogleReady(false);
      return;
    }

    const gtag = ensureGtag();
    if (!document.getElementById(GOOGLE_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = GOOGLE_SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
      document.head.appendChild(script);
    }
    gtag("consent", "update", {
      analytics_storage: analyticsAllowed ? "granted" : "denied",
      ad_storage: marketingAllowed ? "granted" : "denied",
      ad_user_data: marketingAllowed ? "granted" : "denied",
      ad_personalization: marketingAllowed ? "granted" : "denied",
    });

    if (
      analyticsAllowed &&
      googleAnalyticsId &&
      window.__flowoGoogleAnalyticsId !== googleAnalyticsId
    ) {
      gtag("js", new Date());
      gtag("config", googleAnalyticsId, { send_page_view: false });
      window.__flowoGoogleAnalyticsId = googleAnalyticsId;
    }

    if (marketingAllowed && googleAdsId) {
      if (window.__flowoGoogleAdsId !== googleAdsId) {
        gtag("js", new Date());
        gtag("config", googleAdsId, { send_page_view: false });
        window.__flowoGoogleAdsId = googleAdsId;
      }
      setIsGoogleReady(true);
    } else {
      setIsGoogleReady(false);
    }
  }, [googleAdsId, googleAnalyticsId]);

  useEffect(() => {
    const handleConsent = (event: CustomEvent<ConsentPreferences>) => {
      if (event.detail.analytics || event.detail.marketing) {
        initialize();
        return;
      }

      setHasAnalyticsConsent(false);
      setHasMarketingConsent(false);
      setIsGoogleReady(false);
      // Segment owns TikTok Pixel + Events API and handles its own consent
      // teardown. Keeping a second local TikTok loader would double-count.
      removeCookie("_ttp");
      removeCookie("ttcsid");
    };

    window.addEventListener("consent-updated", handleConsent as EventListener);
    initialize();
    return () =>
      window.removeEventListener(
        "consent-updated",
        handleConsent as EventListener
      );
  }, [initialize]);

  useEffect(() => {
    if (!hasAnalyticsConsent && !hasMarketingConsent) return;

    const category = contentCategory(pathname);
    if (hasAnalyticsConsent && googleAnalyticsId && window.gtag) {
      window.gtag("event", "page_view", {
        send_to: googleAnalyticsId,
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
      if (category) {
        window.gtag("event", "view_content", {
          send_to: googleAnalyticsId,
          content_category: category,
          page_path: pathname,
        });
      }
    }
    if (isGoogleReady && googleAdsId && window.gtag) {
      window.gtag("event", "page_view", {
        send_to: googleAdsId,
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
      if (category) {
        window.gtag("event", "view_content", {
          send_to: googleAdsId,
          content_category: category,
          page_path: pathname,
        });
      }
    }
  }, [
    googleAdsId,
    googleAnalyticsId,
    hasAnalyticsConsent,
    hasMarketingConsent,
    isGoogleReady,
    pathname,
  ]);

  const trackLead = useCallback(
    ({ source, resource, kind }: PaidMediaLead) => {
      if (!hasAnalyticsConsent && !hasMarketingConsent) return;
      const contentName = resource || source;

      if (hasAnalyticsConsent && googleAnalyticsId && window.gtag) {
        window.gtag("event", "generate_lead", {
          send_to: googleAnalyticsId,
          lead_source: source,
          content_name: contentName,
          content_category: kind,
        });
      }

      if (isGoogleReady && googleAdsId && window.gtag) {
        window.gtag("event", "generate_lead", {
          send_to: googleAdsId,
          lead_source: source,
          content_name: contentName,
          content_category: kind,
        });
        if (googleLeadConversionLabel) {
          window.gtag("event", "conversion", {
            send_to: `${googleAdsId}/${googleLeadConversionLabel}`,
            lead_source: source,
          });
        }
      }
    },
    [
      googleAdsId,
      googleAnalyticsId,
      googleLeadConversionLabel,
      hasAnalyticsConsent,
      hasMarketingConsent,
      isGoogleReady,
    ]
  );

  const value = useMemo<PaidMediaContextValue>(
    () => ({
      hasMarketingConsent,
      isGoogleReady,
      trackLead,
    }),
    [hasMarketingConsent, isGoogleReady, trackLead]
  );

  return (
    <PaidMediaContext.Provider value={value}>
      {children}
    </PaidMediaContext.Provider>
  );
}
