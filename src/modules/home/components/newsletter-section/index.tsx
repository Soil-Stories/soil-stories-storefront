"use client"

import { Section } from "@components/ui/section"
import { NewsletterForm } from "@components/ui/newsletter-form"

export function NewsletterSection() {
  return (
    <Section background="dark" padding="default">
      <div className="text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6 text-white">Stay Connected to Our Story</h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Subscribe to our newsletter for stories from artisan communities, new collection launches, and insights into
            the world of sustainable fashion and cultural preservation.
          </p>

          <div className="flex justify-center mb-8">
            <NewsletterForm className="w-full max-w-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-serif text-lg font-semibold mb-2 text-white">Artisan Stories</h3>
              <p className="text-white/60 text-sm">Meet the makers behind each piece</p>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold mb-2 text-white">New Collections</h3>
              <p className="text-white/60 text-sm">Be first to discover new arrivals</p>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold mb-2 text-white">Cultural Insights</h3>
              <p className="text-white/60 text-sm">Learn about traditional art forms</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
