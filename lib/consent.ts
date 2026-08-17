/**
 * LGPD-Compliant Consent Management with Google Consent Mode v2
 *
 * This module provides enterprise-grade consent management following:
 * - LGPD (Lei Geral de Proteção de Dados) requirements
 * - Google Consent Mode v2 specifications
 * - Market best practices for privacy compliance
 */

// Extend Window interface for gtag (compatible with Next.js types)
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentMetadata {
  consentDate: string;
  consentVersion: string;
  userAgent: string;
}

export const COOKIE_PREFERENCES_EVENT = "flowo:open-cookie-preferences";

const CONSENT_STORAGE_KEY = 'cookieConsent';
const CONSENT_DATE_KEY = 'cookieConsentDate';
const CONSENT_VERSION = '1.0';
const CONSENT_EXPIRY_DAYS = 365; // 1 year - LGPD best practice

/**
 * Set a cookie with proper security flags
 */
function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;

  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;

  const attributes = `${expires};path=/;SameSite=Lax;Secure`;

  // Keep a possible legacy host-only cookie aligned before writing the shared
  // cookie. Otherwise both cookies can coexist with conflicting values and the
  // browser may return the older choice first after a reload.
  document.cookie = `${name}=${value};${attributes}`;

  // Share the visitor's choice with barber.flowo.com.br so signup and
  // onboarding never start advertising trackers without the same consent.
  const hostname = window.location.hostname;
  if (hostname === 'flowo.com.br' || hostname.endsWith('.flowo.com.br')) {
    document.cookie = `${name}=${value};${attributes};domain=.flowo.com.br`;
  }
}

/**
 * Get a cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  let match: string | null = null;

  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      // Prefer the most recently written matching cookie during migration from
      // the old host-only scope to the shared .flowo.com.br scope.
      match = c.substring(nameEQ.length, c.length);
    }
  }
  return match;
}

/**
 * Delete a cookie
 */
function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax;Secure`;
  if (
    window.location.hostname === 'flowo.com.br' ||
    window.location.hostname.endsWith('.flowo.com.br')
  ) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=.flowo.com.br;SameSite=Lax;Secure`;
  }
}

/**
 * Initialize default consent state (denied for all non-essential)
 * Must be called BEFORE any tracking scripts load
 */
export function initializeDefaultConsent(): void {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  window.gtag = function(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  // Set default consent to denied (LGPD requirement)
  window.gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'granted', // Necessary cookies always granted
    'personalization_storage': 'denied',
    'security_storage': 'granted', // Security cookies always granted
    'wait_for_update': 500, // Wait 500ms for consent update
  });

  // Check for saved consent and apply immediately
  const savedConsent = getSavedConsent();
  if (savedConsent) {
    applyConsent(savedConsent);
  }
}

/**
 * Get saved consent preferences from cookies (with localStorage fallback)
 */
export function getSavedConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    // Try cookie first (preferred method)
    const cookieValue = getCookie(CONSENT_STORAGE_KEY);
    if (cookieValue) {
      const parsed = JSON.parse(decodeURIComponent(cookieValue)) as ConsentPreferences;

      // Validate structure
      if (
        typeof parsed.necessary === 'boolean' &&
        typeof parsed.analytics === 'boolean' &&
        typeof parsed.marketing === 'boolean'
      ) {
        return parsed;
      }
    }

    // Fallback to localStorage for backwards compatibility
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ConsentPreferences;

      // Validate structure
      if (
        typeof parsed.necessary === 'boolean' &&
        typeof parsed.analytics === 'boolean' &&
        typeof parsed.marketing === 'boolean'
      ) {
        // Migrate to cookie
        saveConsent(parsed);
        return parsed;
      }
    }

    return null;
  } catch (error) {
    console.error('[Consent] Error loading saved consent:', error);
    return null;
  }
}

/**
 * Save consent preferences with metadata (using cookies + localStorage backup)
 */
export function saveConsent(preferences: ConsentPreferences): void {
  if (typeof window === 'undefined') return;

  try {
    // Save preferences to cookie (primary storage)
    setCookie(
      CONSENT_STORAGE_KEY,
      encodeURIComponent(JSON.stringify(preferences)),
      CONSENT_EXPIRY_DAYS
    );

    // Save metadata to cookie
    const metadata: ConsentMetadata = {
      consentDate: new Date().toISOString(),
      consentVersion: CONSENT_VERSION,
      userAgent: navigator.userAgent,
    };
    setCookie(
      CONSENT_DATE_KEY,
      encodeURIComponent(JSON.stringify(metadata)),
      CONSENT_EXPIRY_DAYS
    );

    // Also save to localStorage as backup (for backwards compatibility)
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    localStorage.setItem(CONSENT_DATE_KEY, JSON.stringify(metadata));

    // Apply consent immediately
    applyConsent(preferences);

    // Dispatch custom event for listeners (e.g., Segment Analytics)
    window.dispatchEvent(new CustomEvent('consent-updated', {
      detail: preferences
    }));

    // Log for audit trail
    console.info('[Consent] User consent saved:', {
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      timestamp: metadata.consentDate,
      expiryDays: CONSENT_EXPIRY_DAYS,
    });
  } catch (error) {
    console.error('[Consent] Error saving consent:', error);
  }
}

/**
 * Apply consent preferences to tracking services
 */
export function applyConsent(preferences: ConsentPreferences): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Update Google Consent Mode v2
  window.gtag('consent', 'update', {
    'ad_storage': preferences.marketing ? 'granted' : 'denied',
    'ad_user_data': preferences.marketing ? 'granted' : 'denied',
    'ad_personalization': preferences.marketing ? 'granted' : 'denied',
    'analytics_storage': preferences.analytics ? 'granted' : 'denied',
    'functionality_storage': 'granted', // Always granted
    'personalization_storage': preferences.analytics ? 'granted' : 'denied',
    'security_storage': 'granted', // Always granted
  });

  // Fire consent event for analytics
  if (preferences.analytics && window.gtag) {
    window.gtag('event', 'consent_update', {
      'consent_analytics': preferences.analytics,
      'consent_marketing': preferences.marketing,
    });
  }
}

/**
 * Check if analytics consent is granted
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getSavedConsent();
  return consent?.analytics ?? false;
}

/**
 * Check if marketing consent is granted
 */
export function hasMarketingConsent(): boolean {
  const consent = getSavedConsent();
  return consent?.marketing ?? false;
}

/**
 * Clear all consent data (for user withdrawal) - removes both cookies and localStorage
 */
export function clearConsent(): void {
  if (typeof window === 'undefined') return;

  try {
    // Delete cookies
    deleteCookie(CONSENT_STORAGE_KEY);
    deleteCookie(CONSENT_DATE_KEY);

    // Also clear localStorage
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    localStorage.removeItem(CONSENT_DATE_KEY);

    // Reset to denied
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'personalization_storage': 'denied',
      });
    }

    console.info('[Consent] User consent withdrawn');
  } catch (error) {
    console.error('[Consent] Error clearing consent:', error);
  }
}

/**
 * Get consent metadata for audit purposes (from cookies or localStorage)
 */
export function getConsentMetadata(): ConsentMetadata | null {
  if (typeof window === 'undefined') return null;

  try {
    // Try cookie first
    const cookieValue = getCookie(CONSENT_DATE_KEY);
    if (cookieValue) {
      return JSON.parse(decodeURIComponent(cookieValue)) as ConsentMetadata;
    }

    // Fallback to localStorage
    const saved = localStorage.getItem(CONSENT_DATE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as ConsentMetadata;
  } catch (error) {
    console.error('[Consent] Error loading consent metadata:', error);
    return null;
  }
}
