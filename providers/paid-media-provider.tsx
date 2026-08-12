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
    __flowoTikTokPixelId?: string;
    TiktokAnalyticsObject?: string;
    ttq?: TikTokPixelQueue;
  }
}

interface TikTokPixelQueue extends Array<unknown> {
  page: (...args: unknown[]) => void;
  track: (event: string, properties?: Record<string, unknown>) => void;
  grantConsent: () => void;
  revokeConsent: () => void;
  enableCookie: () => void;
  disableCookie: () => void;
}

interface PaidMediaContextValue {
  hasMarketingConsent: boolean;
  isGoogleReady: boolean;
  isTikTokReady: boolean;
  trackLead: (lead: PaidMediaLead) => void;
}

const PaidMediaContext = createContext<PaidMediaContextValue>({
  hasMarketingConsent: false,
  isGoogleReady: false,
  isTikTokReady: false,
  trackLead: () => {},
});

const GOOGLE_SCRIPT_ID = "flowo-google-ads";
const TIKTOK_LOADER_ID = "flowo-tiktok-loader";
const TIKTOK_SCRIPT_ID = "flowo-tiktok-pixel";

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

function removeTikTokCookies(): void {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=", 1)[0]?.trim();
    if (!name || (name !== "_ttp" && !name.startsWith("ttcsid"))) continue;
    removeCookie(name);
  }
}

function initializeTikTokPixel(pixelId: string): TikTokPixelQueue | undefined {
  if (window.__flowoTikTokPixelId === pixelId && window.ttq) {
    window.ttq.grantConsent();
    window.ttq.enableCookie();
    return window.ttq;
  }

  if (!document.getElementById(TIKTOK_LOADER_ID)) {
    const loader = document.createElement("script");
    loader.id = TIKTOK_LOADER_ID;
    loader.textContent = `
      !function(w,d,t){
        w.TiktokAnalyticsObject=t;
        var ttq=w[t]=w[t]||[];
        ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
        ttq.setAndDefer=function(target,method){target[method]=function(){target.push([method].concat(Array.prototype.slice.call(arguments,0)))}};
        for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
        ttq.instance=function(id){var instance=ttq._i[id]||[];for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(instance,ttq.methods[i]);return instance};
        ttq.load=function(id,options){
          var base="https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i=ttq._i||{};ttq._i[id]=[];ttq._i[id]._u=base;
          ttq._t=ttq._t||{};ttq._t[id]=+new Date;
          ttq._o=ttq._o||{};ttq._o[id]=options||{};
          var script=d.createElement("script");script.id=${JSON.stringify(TIKTOK_SCRIPT_ID)};script.type="text/javascript";script.async=true;
          script.src=base+"?sdkid="+id+"&lib="+t;
          var first=d.getElementsByTagName("script")[0];first.parentNode.insertBefore(script,first);
        };
        ttq.load(${JSON.stringify(pixelId)});
      }(window,document,"ttq");
    `;
    document.head.appendChild(loader);
  }

  window.__flowoTikTokPixelId = pixelId;
  window.ttq?.grantConsent();
  window.ttq?.enableCookie();
  return window.ttq;
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
  tiktokPixelId,
}: {
  children: ReactNode;
  googleAnalyticsId?: string;
  googleAdsId?: string;
  googleLeadConversionLabel?: string;
  tiktokPixelId?: string;
}) {
  const pathname = usePathname();
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);
  const [hasMarketingConsent, setHasMarketingConsent] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [isTikTokReady, setIsTikTokReady] = useState(false);

  const initialize = useCallback(() => {
    if (typeof window === "undefined") return;
    const consent = getSavedConsent();
    const analyticsAllowed = consent?.analytics === true;
    const marketingAllowed = consent?.marketing === true;
    setHasAnalyticsConsent(analyticsAllowed);
    setHasMarketingConsent(marketingAllowed);

    if (marketingAllowed && tiktokPixelId) {
      setIsTikTokReady(Boolean(initializeTikTokPixel(tiktokPixelId)));
    } else {
      window.ttq?.revokeConsent();
      window.ttq?.disableCookie();
      removeTikTokCookies();
      setIsTikTokReady(false);
    }

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
  }, [googleAdsId, googleAnalyticsId, tiktokPixelId]);

  useEffect(() => {
    const handleConsent = (event: CustomEvent<ConsentPreferences>) => {
      if (event.detail.analytics || event.detail.marketing) {
        initialize();
        return;
      }

      setHasAnalyticsConsent(false);
      setHasMarketingConsent(false);
      setIsGoogleReady(false);
      setIsTikTokReady(false);
      window.ttq?.revokeConsent();
      window.ttq?.disableCookie();
      removeTikTokCookies();
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
    if (isTikTokReady && hasMarketingConsent && window.ttq) {
      window.ttq.page();
      if (category) {
        window.ttq.track("ViewContent", {
          content_name: document.title,
          content_type: category,
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
    isTikTokReady,
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

      if (isTikTokReady && hasMarketingConsent && window.ttq) {
        window.ttq.track("SubmitForm", {
          content_name: contentName,
          content_type: kind,
          lead_source: source,
        });
      }
    },
    [
      googleAdsId,
      googleAnalyticsId,
      googleLeadConversionLabel,
      hasAnalyticsConsent,
      hasMarketingConsent,
      isGoogleReady,
      isTikTokReady,
    ]
  );

  const value = useMemo<PaidMediaContextValue>(
    () => ({
      hasMarketingConsent,
      isGoogleReady,
      isTikTokReady,
      trackLead,
    }),
    [hasMarketingConsent, isGoogleReady, isTikTokReady, trackLead]
  );

  return (
    <PaidMediaContext.Provider value={value}>
      {children}
    </PaidMediaContext.Provider>
  );
}
