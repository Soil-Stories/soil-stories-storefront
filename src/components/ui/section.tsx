import * as React from "react"
import { cn } from "@lib/util/tailwind"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: "default" | "alt" | "white" | "dark"
  padding?: "default" | "sm" | "lg" | "xl"
  container?: "default" | "narrow" | "wide" | "full"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, background = "default", padding = "default", container = "default", children, ...props }, ref) => {
    const backgroundClasses = {
      default: "bg-soil-clay",
      alt: "bg-soil-clay-alt",
      white: "bg-white",
      dark: "bg-soil-charcoal",
    }

    const paddingClasses = {
      sm: "py-12 md:py-16",
      default: "py-16 md:py-20 lg:py-24",
      lg: "py-20 md:py-24 lg:py-28",
      xl: "py-24 md:py-28 lg:py-32",
    }

    const containerClasses = {
      default: "container-wide",
      narrow: "container-narrow",
      wide: "container-wide",
      full: "w-full",
    }

    return (
      <section
        ref={ref}
        className={cn(backgroundClasses[background], paddingClasses[padding], "section-padding", className)}
        {...props}
      >
        <div className={containerClasses[container]}>{children}</div>
      </section>
    )
  },
)
Section.displayName = "Section"

export { Section }
