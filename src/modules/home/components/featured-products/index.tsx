import { HttpTypes } from "@medusajs/types"
import { ArrowRight } from "lucide-react"
import { Section } from "@components/ui/section"
import { SectionHeader } from "@components/ui/section-header"
// import { ProductCard } from "@components/ui/product-card"
import { Button } from "@components/ui/button"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  return (
    <Section background="white" padding="default">
      <SectionHeader
        subtitle="Featured Collection"
        title="Stories in Every Stitch"
        description="Our debut collection celebrates six indigenous art forms — each rooted in its land, its people, and its purpose. Wear their stories. Share their voice."
      />

      {/* Products Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"> */}
        {/* {collections.map((collection) => (
          <li key={collection.id}>
            <ProductRail collection={collection} region={region} />
          </li>
        ))} */}
      {/* </div> */}
      <ProductRail region={region} />

      {/* CTA Section */}
      <div className="flex flex-col items-center text-center">
        <Button asChild size="lg" variant="outline" className="group">
          <LocalizedClientLink
            href="/collections"
            className="inline-flex items-center"
          >
            Explore All Collections
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </LocalizedClientLink>
        </Button>
        <p className="mt-4 text-sm text-muted">
          Discover over 200+ handcrafted pieces from artisan communities across
          India
        </p>
      </div>
    </Section>
  )
}
