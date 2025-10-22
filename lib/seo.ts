// src/lib/seo.ts
import type { Metadata } from "next"

// ---- Site URL helpers
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://example.com"

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`

// ---- Public types you can import elsewhere
export interface SEOProps {
  title: string
  description: string
  /** Optional keywords; Next supports string | string[], we prefer string[] */
  keywords?: string[]
  /** Convenience: single OG/Twitter image; can still override via openGraph/twitter */
  ogImage?: string
  /** If true, sets robots noindex/nofollow (can still override via robots) */
  noIndex?: boolean
  /** Canonical path starting with "/", e.g. "/about" */
  path: string

  /** Advanced overrides (optional) */
  openGraph?: Metadata["openGraph"]
  twitter?: Metadata["twitter"]
  alternates?: Metadata["alternates"]
  robots?: Metadata["robots"]
}

export function generateSEO({
  title,
  description,
  keywords = [],
  ogImage = "/og-image.jpg",
  noIndex = false,
  path,
  openGraph,
  twitter,
  alternates,
  robots,
}: SEOProps): Metadata {
  const siteTitle = "Creative Agency"
  const fullTitle = `${title} | ${siteTitle}`

  const canonical = absoluteUrl(path || "/")
  const ogImageAbs = ogImage?.startsWith("http")
    ? ogImage
    : `${SITE_URL}${ogImage?.startsWith("/") ? ogImage : `/${ogImage}`}`

  const computedRobots: Metadata["robots"] =
    noIndex
      ? { index: false, follow: false, nocache: false, googleBot: { index: false, follow: false } }
      : undefined

  return {
    title: fullTitle,
    description,
    // Prefer array form; Next also accepts string
    keywords: keywords.length ? keywords : undefined,

    // Canonical
    alternates: {
      canonical,
      ...alternates,
    },

    // Robots (noIndex toggle, then merge overrides if provided)
    robots: robots ?? computedRobots,

    // Open Graph (merge with overrides)
    openGraph: {
      type: "website",
      url: canonical,
      title: fullTitle,
      description,
      images: ogImageAbs ? [{ url: ogImageAbs }] : undefined,
      ...openGraph,
    },

    // Twitter Card (merge with overrides)
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImageAbs ? [ogImageAbs] : undefined,
      ...twitter,
    },

    // Helps Next construct absolute URLs when needed
    metadataBase: new URL(SITE_URL),
  }
}

// Alias to your existing name so imports stay the same
export const generateMetadata = generateSEO

// ---- JSON-LD helper stays the same (you can JSON.stringify this)
interface StructuredDataProps {
  type: "Organization" | "Service" | "Article" | "FAQPage" | "BreadcrumbList"
  data: Record<string, unknown>
}

export function generateStructuredData({ type, data }: StructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  }
}
