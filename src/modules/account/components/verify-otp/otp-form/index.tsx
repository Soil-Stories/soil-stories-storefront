"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@components/ui/button"
import { cn } from "@lib/util/tailwind"
import { Loader2, ArrowLeft } from "lucide-react"
import { authenticateWithPhone, verifyOtp } from "@lib/data/customer"
import { useAuthStore } from "@lib/zustang-store/auth"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useAuth } from "@lib/context/auth-context"

// OTP validation schema
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Please enter the complete 6-digit code")
    .regex(/^\d{6}$/, "Code must contain only numbers"),
})

type OTPFormData = z.infer<typeof otpSchema>

export function OTPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(60)
  const router = useRouter()
  const { phone } = useAuthStore()
  const { login } = useAuth()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  })

  const otpValue = watch("otp", "")

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
    return
  }, [countdown])

  // Redirect if no phone number
  useEffect(() => {
    if (!phone) {
      router.push("/login")
    }
  }, [phone, router])

  const onSubmit = async (data: OTPFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/account/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: data.otp, phone }),
      })

      const json = await response.json()

      if (!response.ok) {
        setError(json.error || "Something went wrong.")
        return
      }
      if (json.customer) {
        login(json.customer)
      }

      // Redirect to dashboard or home page
      router.push("/")
    } catch (err) {
      setError("Invalid code. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setError(null)

    try {
      await authenticateWithPhone(phone)
      setCountdown(60)
    } catch (err) {
      setError("Failed to resend code. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOTP = otpValue.split("")
    newOTP[index] = value
    const updatedOTP = newOTP.join("")
    setValue("otp", updatedOTP)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  if (!phone) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <LocalizedClientLink
          href="/account"
          className="inline-flex items-center text-sm text-muted hover:text-soil-charcoal transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </LocalizedClientLink>
        <h1 className="text-2xl font-light text-soil-charcoal mb-2">
          Check your phone
        </h1>
        <p className="text-muted text-sm leading-relaxed">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-soil-charcoal">{phone}</span>
        </p>
      </div>

      {/* OTP Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* OTP Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-soil-charcoal">
            Verification Code
          </label>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otpValue[index] || ""}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={cn(
                  "w-12 h-12 text-center text-lg font-medium rounded-lg border",
                  "focus:outline-none focus:ring-1 transition-colors",
                  errors.otp
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-soil-clay-dark focus:border-soil-indigo-mud focus:ring-soil-indigo-mud"
                )}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-sm text-red-600 text-center" role="alert">
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={otpValue.length !== 6 || isSubmitting}
          className="w-full py-3 text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>

        {/* Error Message */}
        {error && (
          <div
            className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Resend Code */}
        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-sm text-muted">
              Resend code in {countdown} seconds
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResending}
              className="text-sm text-soil-indigo-mud hover:text-soil-deep-forest transition-colors disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
