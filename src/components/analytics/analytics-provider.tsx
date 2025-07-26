"use client"

import type React from "react"

import { PlausibleAnalytics } from "./plausible"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    if (typeof window !== "undefined" && window.plausible) {
      // Plausible automatically tracks page views, but we can add custom logic here
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")

      // Custom page view tracking with additional context
      window.plausible("pageview", {
        props: {
          path: pathname,
          search: searchParams.toString(),
        },
      })
    }
  }, [pathname, searchParams])

  return (
    <>
      <PlausibleAnalytics />
      {children}
    </>
  )
}
