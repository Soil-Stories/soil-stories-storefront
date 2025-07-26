"use client"

import { StoreRegion } from "@medusajs/types"
import Image from "next/image"
import { X, ShoppingBag } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { cn } from "@lib/util/tailwind"
import { navItems } from "@lib/constants"
import { useAuth } from "@lib/context/auth-context"

type MobileNavProps = {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  regions: StoreRegion[]
}

export default function MobileNav({
  mobileMenuOpen,
  setMobileMenuOpen,
  regions,
}: MobileNavProps) {
  const { user, isLoggedIn, logout, isLoading } = useAuth()

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-soil-clay-dark transition-transform duration-300 md:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between">
        <LocalizedClientLink
          href="/"
          className="flex items-center space-x-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="relative w-[120px] h-10">
            <Image
              src="https://res.cloudinary.com/dg56fyfea/image/upload/v1753341013/soil-stories-logo_a7hf1q.png"
              alt="Soil Stories Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </LocalizedClientLink>

        <button
          type="button"
          className="rounded-md p-2 text-soil-charcoal hover:bg-soil-clay-dark transition-colors"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-soil-clay-dark">
          {/* Navigation Links */}
          <div className="space-y-2 py-6">
            {navItems.map((item) => (
              <LocalizedClientLink
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-soil-charcoal hover:bg-soil-clay-dark transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </LocalizedClientLink>
            ))}
          </div>

          {/* Auth & Cart Actions */}
          <div className="py-6">
            <div className="grid grid-cols-2 gap-4">
              {!isLoggedIn ? (
                <LocalizedClientLink
                  href="/login"
                  className="flex items-center justify-center rounded-lg border border-soil-clay-dark px-3 py-2 text-sm font-medium text-soil-charcoal hover:bg-soil-clay-dark transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </LocalizedClientLink>
              ) : (
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center justify-center rounded-lg border border-soil-clay-dark px-3 py-2 text-sm font-medium text-soil-charcoal hover:bg-soil-clay-dark transition-colors"
                >
                  Sign Out
                </button>
              )}

              <LocalizedClientLink
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-lg bg-soil-deep-forest px-3 py-2 text-sm font-medium text-white hover:bg-soil-forest-light transition-colors"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Cart (2)
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
