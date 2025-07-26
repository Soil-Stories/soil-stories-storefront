// /components/layout/nav/index.tsx
"use client"

import { useEffect, useState, Suspense } from "react"
import { Menu, ShoppingBag } from "lucide-react"
import { cn } from "@lib/util/tailwind"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import { navItems } from "@lib/constants"
import { useAuth } from "@lib/context/auth-context"
import { UserMenuPopover } from "../user-menu-popover"
import MobileNav from "../mobile-nav"
import { useRegions } from "@lib/hooks/use-regions"

const Nav = () => {
  const { regions, loading } = useRegions()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isLoggedIn, logout, isLoading } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={cn("sticky top-0 inset-x-0 z-50 group")}>
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
            >
              <div className="relative w-[140px] sm:w-[160px] h-12">
                <Image
                  src="https://res.cloudinary.com/dg56fyfea/image/upload/v1753341013/soil-stories-logo_a7hf1q.png"
                  alt="Soil Stories Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </LocalizedClientLink>
          </div>

          <div className="hidden md:flex gap-x-6">
            {navItems.map((item) => (
              <LocalizedClientLink
                key={item.name}
                href={item.href}
                className="relative text-base font-medium text-soil-charcoal transition-all duration-300 hover:text-soil-indigo-mud group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-soil-terracotta transition-all duration-300 group-hover:w-full" />
              </LocalizedClientLink>
            ))}
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {!isLoading && (
              <UserMenuPopover
                isLoggedIn={isLoggedIn}
                user={user || undefined}
                onLogout={logout}
              />
            )}

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2 relative"
                  href="/cart"
                >
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-soil-terracotta text-xs font-medium text-white flex items-center justify-center">
                    2
                  </span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            <button
              type="button"
              className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-soil-charcoal hover:bg-soil-clay-dark transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open main menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {!loading && (
          <MobileNav
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            regions={regions}
          />
        )}
      </header>
    </div>
  )
}

export default Nav
