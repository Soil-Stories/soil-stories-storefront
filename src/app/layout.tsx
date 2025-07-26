import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { AnalyticsProvider } from "@components/analytics/analytics-provider"
import { ErrorBoundary } from "@components/error/error-boundary"
import { JsonLd } from "@components/seo/json-ld"
import { createWebsiteSchema, createOrganizationSchema } from "@lib/json-ld"
import { ScrollToTop } from "@components/ui/scroll-to-top"
import { Suspense } from "react"
import { AuthProvider } from "@lib/context/auth-context"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const websiteJsonLd = createWebsiteSchema()
  const organizationJsonLd = createOrganizationSchema()
  return (
    <html lang="en" data-mode="light">
      <body>
        <JsonLd data={[websiteJsonLd, organizationJsonLd]} />
        <Suspense fallback={null}>
          <ErrorBoundary>
            <AuthProvider>
              <AnalyticsProvider>
                <main className="relative">{props.children}</main>
                <ScrollToTop />
              </AnalyticsProvider>
            </AuthProvider>
          </ErrorBoundary>
        </Suspense>
      </body>
    </html>
  )
}
