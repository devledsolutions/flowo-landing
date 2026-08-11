"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getSavedConsent, type ConsentPreferences } from "@/lib/consent";

const ATTRIBUTION_STORAGE_KEY = "flowo:first-touch-attribution";
const SESSION_ATTRIBUTION_STORAGE_KEY = "flowo:first-touch-attribution:session";
const LAST_ATTRIBUTION_STORAGE_KEY = "flowo:last-touch-attribution";
const SESSION_LAST_ATTRIBUTION_STORAGE_KEY = "flowo:last-touch-attribution:session";
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

interface SegmentAnalytics {
  track: (event: string, properties?: object) => void;
  page: (category?: string, name?: string, properties?: object) => void;
  identify: (userId?: string, traits?: object) => void;
  group: (groupId: string, traits?: object) => void;
  alias: (userId: string) => void;
  reset: () => void;
  ready: (callback: () => void) => void;
  user?: () => { anonymousId?: () => string };
  invoked?: boolean;
  initialized?: boolean;
}

interface StoredAttribution {
  capturedAt: number;
  landingPath: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  fbc?: string;
  fbp?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  ttclid?: string;
  ctwaClid?: string;
}

export interface AcquisitionContext {
  landingPath: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  fbc?: string;
  fbp?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  ttclid?: string;
  ctwaClid?: string;
}

function getCookie(name: string): string | undefined {
  const prefix = `${encodeURIComponent(name)}=`;
  const value = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(prefix))
    ?.slice(prefix.length);
  return value ? decodeURIComponent(value) : undefined;
}

function getCurrentAttribution(): StoredAttribution {
  const params = new URLSearchParams(window.location.search);

  return {
    capturedAt: Date.now(),
    landingPath: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || "direct",
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    fbclid: params.get("fbclid") || undefined,
    fbc: getCookie("_fbc"),
    fbp: getCookie("_fbp"),
    gclid: params.get("gclid") || undefined,
    gbraid: params.get("gbraid") || undefined,
    wbraid: params.get("wbraid") || undefined,
    msclkid: params.get("msclkid") || undefined,
    ttclid: params.get("ttclid") || undefined,
    ctwaClid: params.get("ctwa_clid") || undefined,
  };
}

function hasCampaignTouch(attribution: StoredAttribution): boolean {
  return Boolean(
    attribution.utmSource ||
      attribution.utmCampaign ||
      attribution.fbclid ||
      attribution.gclid ||
      attribution.gbraid ||
      attribution.wbraid ||
      attribution.msclkid ||
      attribution.ttclid ||
      attribution.ctwaClid
  );
}

function getLastTouchAttribution(): StoredAttribution {
  const current = getCurrentAttribution();
  const persistent = Boolean(getSavedConsent()?.analytics);
  const storage = persistent ? window.localStorage : window.sessionStorage;
  const storageKey = persistent
    ? LAST_ATTRIBUTION_STORAGE_KEY
    : SESSION_LAST_ATTRIBUTION_STORAGE_KEY;

  try {
    const saved = storage.getItem(storageKey);
    if (hasCampaignTouch(current)) {
      storage.setItem(storageKey, JSON.stringify(current));
      return current;
    }
    if (saved) {
      const parsed = JSON.parse(saved) as StoredAttribution;
      if (
        typeof parsed.capturedAt === "number" &&
        Date.now() - parsed.capturedAt < ATTRIBUTION_TTL_MS
      ) {
        return parsed;
      }
    }
  } catch {
    // Attribution remains best-effort when browser storage is unavailable.
  }

  return getFirstTouchAttribution();
}

function getFirstTouchAttribution(): StoredAttribution {
  const current = getCurrentAttribution();
  const persistent = Boolean(getSavedConsent()?.analytics);
  const storage = persistent ? window.localStorage : window.sessionStorage;
  const storageKey = persistent
    ? ATTRIBUTION_STORAGE_KEY
    : SESSION_ATTRIBUTION_STORAGE_KEY;

  try {
    const saved = storage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved) as StoredAttribution;
      if (
        typeof parsed.capturedAt === "number" &&
        Date.now() - parsed.capturedAt < ATTRIBUTION_TTL_MS
      ) {
        return parsed;
      }
    }

    storage.setItem(storageKey, JSON.stringify(current));
  } catch {
    // Analytics still works when storage is unavailable or blocked.
  }

  return current;
}

function promoteSessionAttribution(): void {
  try {
    const saved = window.sessionStorage.getItem(SESSION_ATTRIBUTION_STORAGE_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved) as StoredAttribution;
    if (
      typeof parsed.capturedAt === "number" &&
      Date.now() - parsed.capturedAt < ATTRIBUTION_TTL_MS
    ) {
      window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, saved);
    }
    window.sessionStorage.removeItem(SESSION_ATTRIBUTION_STORAGE_KEY);
    const lastTouch = window.sessionStorage.getItem(
      SESSION_LAST_ATTRIBUTION_STORAGE_KEY
    );
    if (lastTouch) {
      window.localStorage.setItem(LAST_ATTRIBUTION_STORAGE_KEY, lastTouch);
      window.sessionStorage.removeItem(SESSION_LAST_ATTRIBUTION_STORAGE_KEY);
    }
  } catch {
    // Attribution remains best-effort when browser storage is unavailable.
  }
}

function getAnalyticsContext(): AnalyticsProperties {
  const consent = getSavedConsent();
  const firstTouch = getFirstTouchAttribution();
  const lastTouch = getLastTouchAttribution();
  const current = getCurrentAttribution();

  return {
    page_path: window.location.pathname,
    first_landing_path: firstTouch.landingPath,
    first_referrer: firstTouch.referrer,
    first_utm_source: firstTouch.utmSource,
    first_utm_medium: firstTouch.utmMedium,
    first_utm_campaign: firstTouch.utmCampaign,
    first_utm_content: firstTouch.utmContent,
    first_utm_term: firstTouch.utmTerm,
    first_fbclid: firstTouch.fbclid,
    first_gclid: firstTouch.gclid,
    first_msclkid: firstTouch.msclkid,
    first_ttclid: firstTouch.ttclid,
    first_ctwa_clid: firstTouch.ctwaClid,
    last_landing_path: lastTouch.landingPath,
    last_referrer: lastTouch.referrer,
    last_utm_source: lastTouch.utmSource,
    last_utm_medium: lastTouch.utmMedium,
    last_utm_campaign: lastTouch.utmCampaign,
    last_utm_content: lastTouch.utmContent,
    last_utm_term: lastTouch.utmTerm,
    last_fbclid: lastTouch.fbclid,
    last_gclid: lastTouch.gclid,
    last_msclkid: lastTouch.msclkid,
    last_ttclid: lastTouch.ttclid,
    last_ctwa_clid: lastTouch.ctwaClid,
    utm_source: current.utmSource,
    utm_medium: current.utmMedium,
    utm_campaign: current.utmCampaign,
    utm_content: current.utmContent,
    utm_term: current.utmTerm,
    fbclid: current.fbclid,
    gclid: current.gclid,
    msclkid: current.msclkid,
    ttclid: current.ttclid,
    consent_analytics: consent?.analytics ?? false,
    consent_marketing: consent?.marketing ?? false,
  };
}

function getAcquisitionContext(): AcquisitionContext {
  if (typeof window === "undefined") {
    return { landingPath: "/" };
  }

  const lastTouch = getLastTouchAttribution();
  return {
    landingPath: lastTouch.landingPath,
    referrer: lastTouch.referrer,
    utmSource: lastTouch.utmSource,
    utmMedium: lastTouch.utmMedium,
    utmCampaign: lastTouch.utmCampaign,
    utmContent: lastTouch.utmContent,
    utmTerm: lastTouch.utmTerm,
    fbclid: lastTouch.fbclid,
    fbc: lastTouch.fbc,
    fbp: lastTouch.fbp,
    gclid: lastTouch.gclid,
    gbraid: lastTouch.gbraid,
    wbraid: lastTouch.wbraid,
    msclkid: lastTouch.msclkid,
    ttclid: lastTouch.ttclid,
    ctwaClid: lastTouch.ctwaClid,
  };
}

// Extend Window interface for Segment
declare global {
  interface Window {
    analytics?: SegmentAnalytics;
  }
}

interface SegmentContextType {
  isReady: boolean;
  hasConsent: boolean;
  track: (event: string, properties?: object) => void;
  page: (category?: string, name?: string, properties?: object) => void;
  identify: (userId?: string, traits?: object) => void;
  getAnonymousId: () => string | undefined;
  getAcquisitionContext: () => AcquisitionContext;
  decorateDestination: (href: string) => string;
}

const SegmentContext = createContext<SegmentContextType>({
  isReady: false,
  hasConsent: false,
  track: () => {},
  page: () => {},
  identify: () => {},
  getAnonymousId: () => undefined,
  getAcquisitionContext: () => ({ landingPath: "/" }),
  decorateDestination: (href) => href,
});

export const useSegment = () => useContext(SegmentContext);

interface SegmentProviderProps {
  children: ReactNode;
  writeKey?: string;
}

export function SegmentProvider({ children, writeKey }: SegmentProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const pathname = usePathname();

  // Initialize Segment when consent is granted
  const initializeSegment = useCallback((): void => {
    if (typeof window === "undefined" || !writeKey) return;

    const consent = getSavedConsent();
    if (!consent?.analytics) {
      setHasConsent(false);
      return;
    }

    setHasConsent(true);

    const markReady = () => setIsReady(true);

    if (window.analytics) {
      window.analytics.ready(markReady);
      return;
    }

    // Official Analytics.js snippet, loaded only after analytics consent.
    const script = document.createElement("script");
    script.id = "segment-analytics-loader";
    script.innerHTML = `
      !function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel=canonical]");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="${writeKey}";;analytics.SNIPPET_VERSION="5.2.1";
        analytics.load("${writeKey}");
      }}();
    `;
    document.head.appendChild(script);
    const loadedAnalytics = window.analytics as SegmentAnalytics | undefined;
    loadedAnalytics?.ready(markReady);
  }, [writeKey]);

  // Listen for consent changes
  useEffect(() => {
    getFirstTouchAttribution();
    getLastTouchAttribution();

    const handleConsentUpdate = (event: CustomEvent<ConsentPreferences>) => {
      if (event.detail.analytics) {
        promoteSessionAttribution();
        initializeSegment();
      } else {
        setHasConsent(false);
        setIsReady(false);
        // Reset Segment if consent is withdrawn
        if (window.analytics?.reset) {
          window.analytics.reset();
        }
        window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
        window.sessionStorage.removeItem(SESSION_ATTRIBUTION_STORAGE_KEY);
        window.localStorage.removeItem(LAST_ATTRIBUTION_STORAGE_KEY);
        window.sessionStorage.removeItem(SESSION_LAST_ATTRIBUTION_STORAGE_KEY);
      }
    };

    window.addEventListener("consent-updated", handleConsentUpdate as EventListener);

    // Check initial consent
    initializeSegment();

    return () => {
      window.removeEventListener("consent-updated", handleConsentUpdate as EventListener);
    };
  }, [initializeSegment]);

  const sendKnownLeadSignal = useCallback(
    (
      signal:
        | "pricing_viewed"
        | "comparison_viewed"
        | "case_study_viewed"
        | "demo_requested"
        | "signup_started"
        | "lead_magnet_viewed"
    ) => {
      if (!hasConsent || !window.analytics?.user) return;
      const segmentAnonymousId = window.analytics.user().anonymousId?.();
      if (!segmentAnonymousId) return;
      void fetch("/api/growth-signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        keepalive: true,
        body: JSON.stringify({
          segmentAnonymousId,
          signal,
          path: window.location.pathname,
        }),
      }).catch(() => {
        // Convex remains the source of truth; optional intent enrichment must
        // never interrupt navigation or the lead form.
      });
    },
    [hasConsent]
  );

  // Track page views on route change
  useEffect(() => {
    if (!isReady || !hasConsent || !window.analytics) return;

    // Read the query string inside the effect so the analytics provider does
    // not suspend the entire document during static rendering. UTM values are
    // still captured on first load and on every pathname transition, while
    // the page content remains present in the initial HTML for crawlers.
    const search = window.location.search.slice(1);
    const url = pathname + window.location.search;

    window.analytics.page(undefined, undefined, {
      path: pathname,
      url,
      search,
      title: document.title,
      ...getAnalyticsContext(),
    });
    if (pathname === "/precos") sendKnownLeadSignal("pricing_viewed");
    else if (pathname === "/comparar" || pathname.startsWith("/flowo-vs-")) {
      sendKnownLeadSignal("comparison_viewed");
    } else if (
      pathname.startsWith("/casos-de-sucesso") ||
      pathname.startsWith("/casos-de-validacao")
    ) {
      sendKnownLeadSignal("case_study_viewed");
    }
  }, [pathname, isReady, hasConsent, sendKnownLeadSignal]);

  // Context methods
  const track = useCallback((event: string, properties?: object) => {
    if (!hasConsent) {
      console.debug("[Segment] Track skipped - no consent:", event);
      return;
    }
    if (window.analytics) {
      window.analytics.track(event, {
        ...properties,
        ...getAnalyticsContext(),
      });
    }
    const values = (properties ?? {}) as Record<string, unknown>;
    if (event === "Pricing Viewed") sendKnownLeadSignal("pricing_viewed");
    else if (event === "Case Study Viewed") sendKnownLeadSignal("case_study_viewed");
    else if (event === "Lead Magnet Viewed") sendKnownLeadSignal("lead_magnet_viewed");
    else if (event === "Plan Selected") sendKnownLeadSignal("signup_started");
    else if (event === "CTA Clicked") {
      const destination = String(values.destination ?? "");
      const label = String(values.buttonText ?? values.button_text ?? "").toLowerCase();
      if (destination === "dashboard_signup") sendKnownLeadSignal("signup_started");
      else if (destination.includes("demo") || label.includes("demonstra")) {
        sendKnownLeadSignal("demo_requested");
      }
    }
  }, [hasConsent, sendKnownLeadSignal]);

  const page = useCallback((category?: string, name?: string, properties?: object) => {
    if (!hasConsent) {
      console.debug("[Segment] Page skipped - no consent");
      return;
    }
    if (window.analytics) {
      window.analytics.page(category, name, properties);
    }
  }, [hasConsent]);

  const identify = useCallback((userId?: string, traits?: object) => {
    if (!hasConsent) {
      console.debug("[Segment] Identify skipped - no consent");
      return;
    }
    if (window.analytics) {
      window.analytics.identify(userId, traits);
    }
  }, [hasConsent]);

  const getAnonymousId = useCallback((): string | undefined => {
    if (!hasConsent || !window.analytics?.user) return undefined;
    return window.analytics.user().anonymousId?.();
  }, [hasConsent]);

  const decorateDestination = useCallback(
    (href: string): string => {
      if (typeof window === "undefined") return href;

      try {
        const destination = new URL(href, window.location.origin);
        if (destination.hostname !== "barber.flowo.com.br") return href;

        const anonymousId = getAnonymousId();
        const attribution = getAcquisitionContext();
        if (anonymousId) destination.searchParams.set("flowo_aid", anonymousId);
        if (attribution.utmSource) {
          destination.searchParams.set("utm_source", attribution.utmSource);
        }
        if (attribution.utmMedium) {
          destination.searchParams.set("utm_medium", attribution.utmMedium);
        }
        if (attribution.utmCampaign) {
          destination.searchParams.set("utm_campaign", attribution.utmCampaign);
        }
        return destination.toString();
      } catch {
        return href;
      }
    },
    [getAnonymousId]
  );

  // Cover legacy and content-page CTAs that do not yet use TrackedLink. The
  // listener also decorates dashboard handoffs before the browser navigates.
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || anchor.dataset.segmentTracked === "true") return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      let destination: URL;
      try {
        destination = new URL(rawHref, window.location.origin);
      } catch {
        return;
      }

      const label = (anchor.textContent || anchor.getAttribute("aria-label") || "link")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 100);
      const sectionId = anchor.closest("section")?.id;
      const placement =
        sectionId ||
        (anchor.closest("footer")
          ? "footer"
          : anchor.closest("nav")
            ? "navigation"
            : "content");

      if (destination.hostname === "barber.flowo.com.br") {
        anchor.href = decorateDestination(destination.toString());
        track("CTA Clicked", {
          button_text: label,
          placement,
          destination: destination.pathname.includes("sign-up")
            ? "dashboard_signup"
            : "dashboard_login",
        });
        return;
      }

      if (
        destination.hostname === "wa.me" ||
        destination.hostname === "api.whatsapp.com" ||
        destination.hostname === "apps.apple.com" ||
        destination.hostname === "play.google.com"
      ) {
        track("External Link Clicked", {
          link_text: label,
          placement,
          destination_host: destination.hostname,
          destination_path: destination.pathname,
        });
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [decorateDestination, track]);

  return (
    <SegmentContext.Provider
      value={{
        isReady,
        hasConsent,
        track,
        page,
        identify,
        getAnonymousId,
        getAcquisitionContext,
        decorateDestination,
      }}
    >
      {children}
    </SegmentContext.Provider>
  );
}
