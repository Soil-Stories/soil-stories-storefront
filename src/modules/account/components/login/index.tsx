import type { Metadata } from "next"
import { generateSEOMetadata } from "@lib/metadata"
import { LoginForm } from "@modules/account/components/login/login-form"
import { Section } from "@components/ui/section"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"

export const metadata: Metadata = generateSEOMetadata({
  title: "Sign In",
  description:
    "Sign in or join SoilStories using your phone number and a one-time code.",
  canonical: "https://soilstories.co/login",
})

type LoginProps = {
  setCurrentView: (view: LOGIN_VIEW) => void
};

export default function Login({ setCurrentView }: LoginProps) {
  return (
    <main className="min-h-screen">
      <Section
        variant="white"
        className="min-h-screen flex items-center justify-center py-12"
      >
        <div className="w-full max-w-md mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <h1 className="text-2xl font-light text-soil-charcoal mb-2">
                Let's keep this simple.
              </h1>
              <p className="text-muted text-sm leading-relaxed">
                Enter your phone number and we'll send you a one-time code.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <LoginForm setCurrentView={setCurrentView} />

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted leading-relaxed">
              New to SoilStories? No worries — we'll create your account
              automatically.
            </p>
          </div>
        </div>
      </Section>
    </main>
  )
}
