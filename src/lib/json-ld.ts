// JSON-LD Structured Data Helpers

// Website Schema
export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://soilstories.co/#website",
    url: "https://soilstories.co",
    name: "SoilStories",
    description: "Design-forward garments rooted in artisanal traditions from around the world.",
    publisher: {
      "@type": "Organization",
      "@id": "https://soilstories.co/#organization",
      name: "SoilStories",
      logo: {
        "@type": "ImageObject",
        url: "https://soilstories.co/logo.png",
        width: 600,
        height: 60,
      },
    },
    inLanguage: "en-US",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: "https://soilstories.co/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    ],
  }
}

// Organization Schema
export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://soilstories.co/#organization",
    name: "SoilStories",
    url: "https://soilstories.co",
    logo: {
      "@type": "ImageObject",
      url: "https://soilstories.co/logo.png",
      width: 600,
      height: 60,
    },
    sameAs: [
      "https://instagram.com/soilstoriesco",
      "https://twitter.com/soilstoriesco",
      "https://facebook.com/soilstoriesco",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-555-5555",
      contactType: "customer service",
      email: "hello@soilstories.co",
      availableLanguage: "English",
    },
  }
}

// Product Schema
export function createProductSchema({
  id,
  name,
  description,
  image,
  price,
  currency = "INR",
  availability = "InStock",
  sku,
  brand = "SoilStories",
  reviewCount = 0,
  reviewRating = 0,
  category,
  condition = "NewCondition",
}: {
  id: string
  name: string
  description: string
  image: string
  price: number
  currency?: string
  availability?: "InStock" | "OutOfStock" | "PreOrder"
  sku?: string
  brand?: string
  reviewCount?: number
  reviewRating?: number
  category?: string
  condition?: string
}) {
  const availabilityMap = {
    InStock: "https://schema.org/InStock",
    OutOfStock: "https://schema.org/OutOfStock",
    PreOrder: "https://schema.org/PreOrder",
  }

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://soilstories.co/products/${id}#product`,
    name: name,
    description: description,
    image: image.startsWith("http") ? image : `https://soilstories.co${image}`,
    sku: sku || id,
    mpn: id,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    category: category,
    condition: `https://schema.org/${condition}`,
    offers: {
      "@type": "Offer",
      "@id": `https://soilstories.co/products/${id}#offer`,
      url: `https://soilstories.co/products/${id}`,
      price: price,
      priceCurrency: currency,
      availability: availabilityMap[availability],
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 1 year from now
      seller: {
        "@type": "Organization",
        "@id": "https://soilstories.co/#organization",
        name: "SoilStories",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 10,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: currency,
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
    },
    manufacturer: {
      "@type": "Organization",
      name: "SoilStories",
    },
    material: "Cotton",
    pattern: "Traditional",
    isRelatedTo: {
      "@type": "Thing",
      name: "Sustainable Fashion",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Sustainability",
        value: "Handmade with traditional techniques",
      },
      {
        "@type": "PropertyValue",
        name: "Origin",
        value: "Made in India",
      },
    ],
  }

  // Add reviews if available
  if (reviewCount > 0 && reviewRating > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviewRating,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return schema
}

// Collection Page Schema
export function createCollectionPageSchema({
  name = "Collections",
  description = "Discover our debut collection of 20 timeless designs inspired by the world's artistic soils.",
  url = "https://soilstories.co/collections",
  image = "https://soilstories.co/og-collections.jpg",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collectionpage`,
    name: name,
    description: description,
    url: url,
    image: image,
    isPartOf: {
      "@id": "https://soilstories.co/#website",
    },
    inLanguage: "en-US",
    publisher: {
      "@id": "https://soilstories.co/#organization",
    },
  }
}

// Blog Posting Schema
export function createBlogPostingSchema({
  id,
  title,
  description,
  image,
  publishedDate,
  modifiedDate,
  authorName,
  authorUrl,
  category,
  tags = [],
}: {
  id: string
  title: string
  description: string
  image: string
  publishedDate: string
  modifiedDate?: string
  authorName: string
  authorUrl?: string
  category?: string
  tags?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://soilstories.co/journal/${id}#blogposting`,
    headline: title,
    description: description,
    image: image.startsWith("http") ? image : `https://soilstories.co${image}`,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@id": "https://soilstories.co/#organization",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://soilstories.co/journal/${id}`,
    },
    keywords: tags.join(", "),
    articleSection: category,
    inLanguage: "en-US",
  }
}
