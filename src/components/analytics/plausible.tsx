"use client"
// TODO: change to posthog 

import Script from "next/script"
import { useEffect } from "react"

interface PlausibleProps {
  domain?: string
  src?: string
  enabled?: boolean
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void
  }
}

export function PlausibleAnalytics({
  domain = "soilstories.co",
  src = "https://plausible.io/js/script.js",
  enabled = process.env.NODE_ENV === "production",
}: PlausibleProps) {
  useEffect(() => {
    // Custom event tracking function
    if (typeof window !== "undefined" && window.plausible) {
      // Track page views automatically handled by Plausible
      // Custom events can be tracked using window.plausible()
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
      onLoad={() => {
        console.log("Plausible Analytics loaded")
      }}
    />
  )
}

// Custom hook for tracking events
export function usePlausible() {
  const trackEvent = (eventName: string, props?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible(eventName, { props })
    }
  }

  return { trackEvent }
}
