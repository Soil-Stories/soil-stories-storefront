import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-soil-charcoal text-white">
      <div className="container-wide section-padding section-padding-y">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-serif text-2xl font-bold">SoilStories</span>
              <div className="w-2 h-2 bg-soil-terracotta rounded-full" />
            </div>
            <p className="text-white/80 text-lg font-serif italic mb-4">
              "Born from the Earth. Told through Fabric."
            </p>
            <p className="text-white/60 leading-relaxed max-w-md">
              Celebrating indigenous art forms through contemporary fashion.
              Each piece carries the stories of its land and people.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                "Collections",
                "Studio",
                "Stories",
                "Journal",
                "About",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <LocalizedClientLink
                    href={`/${link.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                "Size Guide",
                "Shipping",
                "Returns",
                "Care Instructions",
                "FAQ",
                "Help",
              ].map((link) => (
                <li key={link}>
                  <LocalizedClientLink
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} SoilStories. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
