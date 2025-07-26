import type { Metadata } from "next"

export interface SEOConfig {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article" // Remove invalid types
  noIndex?: boolean
  keywords?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

// Default SEO configuration
export const defaultSEO = {
  title: "SoilStories – Stories in Every Stitch",
  description: "Design-forward garments rooted in artisanal traditions from around the world.",
  canonical: "https://soilstories.co",
  ogImage: "https://soilstories.co/og-default.jpg",
  keywords:
    "sustainable fashion, artisan crafts, indigenous art, handmade clothing, cultural heritage, ethical fashion",
  author: "SoilStories",
  siteName: "SoilStories",
  twitterHandle: "@soilstoriesco",
  locale: "en_US",
}

export function generateSEOMetadata({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noIndex = false,
  keywords,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
}: SEOConfig): Metadata {
  // Construct full title
  const fullTitle = title ? `${title} – SoilStories` : defaultSEO.title

  // Use provided values or fall back to defaults
  const seoDescription = description || defaultSEO.description
  const seoCanonical = canonical || defaultSEO.canonical
  const seoOgImage = ogImage || defaultSEO.ogImage
  const seoKeywords = keywords || defaultSEO.keywords
  const seoAuthor = author || defaultSEO.author

  // Ensure OG image is absolute URL
  const absoluteOgImage = seoOgImage.startsWith("http") ? seoOgImage : `https://soilstories.co${seoOgImage}`

  const metadata: Metadata = {
    title: fullTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: seoAuthor }],
    creator: seoAuthor,
    publisher: defaultSEO.siteName,
    alternates: {
      canonical: seoCanonical,
    },
    robots: noIndex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      type: ogType,
      title: title || defaultSEO.title,
      description: seoDescription,
      url: seoCanonical,
      siteName: defaultSEO.siteName,
      locale: defaultSEO.locale,
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: `${title || defaultSEO.title} - SoilStories`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: defaultSEO.twitterHandle,
      creator: defaultSEO.twitterHandle,
      title: title || defaultSEO.title,
      description: seoDescription,
      images: [absoluteOgImage],
    },
    other: {
      "theme-color": "#1A1A1A",
      "msapplication-TileColor": "#1A1A1A",
    },
  }

  // Add article-specific metadata
  if (ogType === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section,
      tags,
    }
  }

  return metadata
}
