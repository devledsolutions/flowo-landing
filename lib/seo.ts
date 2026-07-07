import type { Metadata } from "next"
import { getSiteUrl } from "@/lib/site-url"

/** Canonical site origin (no trailing slash). */
export const SITE_URL = getSiteUrl()

export const SITE_NAME = "Flowo"
export const DEFAULT_OG_IMAGE = "/og-image.jpg"
export const TWITTER_HANDLE = "@flowoapp"

/** Resolve a path or absolute URL against the site origin. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${path}`
}

export interface BuildMetadataOptions {
  /** Page title. Rendered via the root template ("%s | Flowo") unless `absoluteTitle` is true. */
  title: string
  description: string
  /** Route path starting with "/" (e.g. "/precos"). Used for the self-canonical and og:url. */
  path: string
  /** Path or absolute URL to a 1200x630 image. Defaults to /og-image.jpg. */
  ogImage?: string
  /** Set true to bypass the "%s | Flowo" template (root page only). */
  absoluteTitle?: boolean
  /** Set true for noindex pages (legal drafts, thank-you pages). */
  noIndex?: boolean
}

/**
 * Per-route metadata: self-canonical + Open Graph + Twitter with absolute URLs.
 * metadataBase is set in app/layout.tsx; canonical/og:url are emitted absolute
 * here so they are correct regardless of nesting.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  absoluteTitle = false,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path)
  const image = absoluteUrl(ogImage)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "pt_BR",
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: TWITTER_HANDLE,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  }
}
