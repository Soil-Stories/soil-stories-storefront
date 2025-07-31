import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@lib/util/tailwind"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm", className)} aria-label="Breadcrumb">
      <LocalizedClientLink href="/" className="flex items-center text-soil-earth-grey hover:text-soil-charcoal transition-colors">
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </LocalizedClientLink>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-soil-earth-grey" />
          {item.href ? (
            <LocalizedClientLink href={item.href} className="text-soil-earth-grey hover:text-soil-charcoal transition-colors">
              {item.label}
            </LocalizedClientLink>
          ) : (
            <span className="text-soil-charcoal font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
