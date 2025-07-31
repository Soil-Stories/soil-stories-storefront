import type { Metadata } from "next"
import { Suspense } from "react"
import { generateSEOMetadata } from "@lib/metadata"
import { OTPForm } from "@modules/account/components/verify-otp/otp-form"
import { Section } from "@components/ui/section"

export const metadata: Metadata = generateSEOMetadata({
  title: "Verify Code",
  description: "Enter the verification code sent to your phone number.",
  canonical: "https://soilstories.co/verify-otp",
  noIndex: true, // Don't index this page
})

export default function VerifyOTP() {
  return (
    <main className="min-h-screen">
      <Section variant="white" className="min-h-screen flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <Suspense fallback={<div>Loading...</div>}>
            <OTPForm />
          </Suspense>
        </div>
      </Section>
    </main>
  )
}
