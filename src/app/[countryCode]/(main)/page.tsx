import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { NewsletterSection } from "@modules/home/components/newsletter-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { generateSEOMetadata } from "@lib/metadata"
import { StoriesPreviewSection } from "@modules/home/components/stories-preview-section"
import { JournalSection } from "@modules/home/components/journal-section"
import { TestimonialsSection } from "@modules/home/components/testimonials-section"

export const metadata: Metadata = generateSEOMetadata({
  title: "Stories in Every Stitch",
  description:
    "Crafting wearable heritage rooted in artisanal wisdom and soil-bound cultures from across the world.",
  canonical: "https://soilstories.co",
})

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <FeaturedProducts collections={collections} region={region} />
        <StoriesPreviewSection />
        <JournalSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
    </>
  )
}
