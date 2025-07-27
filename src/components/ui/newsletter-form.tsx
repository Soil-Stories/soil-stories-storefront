"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { cn } from "@lib/util/tailwind"

interface NewsletterFormProps {
  className?: string
  variant?: "default" | "minimal"
}

export function NewsletterForm({ className, variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setEmail("")

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  if (isSubmitted) {
    return (
      <div className={cn("text-center", className)}>
        <div className="inline-flex items-center justify-center w-12 h-12 bg-soil-deep-forest rounded-full mb-4">
          <span className="text-white text-xl">✓</span>
        </div>
        <p className="text-soil-charcoal font-medium">Thank you for subscribing!</p>
        <p className="text-muted text-sm">You'll receive our latest stories and collections.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-md", className)}>
      <div className={cn("flex gap-2", variant === "minimal" ? "flex-col sm:flex-row" : "")}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 rounded-lg border border-soil-clay-dark px-4 py-3 text-soil-charcoal placeholder:text-muted focus:border-soil-indigo-mud focus:outline-none focus:ring-1 focus:ring-soil-indigo-mud"
        />
        <Button type="submit" disabled={isSubmitting} className="whitespace-nowrap">
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted">
        By subscribing, you agree to our privacy policy and consent to receive updates from our company.
      </p>
    </form>
  )
}
