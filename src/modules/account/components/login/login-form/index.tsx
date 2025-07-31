"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useParams, useRouter } from "next/navigation"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Button } from "@components/ui/button"
import { cn } from "@lib/util/tailwind"
import { Loader2, Phone } from "lucide-react"
// import { authenticateWithPhone } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { useAuthStore } from "@lib/zustang-store/auth"

// Schema
const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
    .transform((val) => val.replace(/[^\d+]/g, "")),
})

type PhoneFormData = z.infer<typeof phoneSchema>

type LoginFormProps = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

export function LoginForm({ setCurrentView }: LoginFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const router = useRouter()
  const { setPhone } = useAuthStore()
  const { countryCode } = useParams() as { countryCode: string }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    mode: "onChange",
    defaultValues: {
      phone: "",
    },
  })

  const phoneValue = watch("phone")

  const onSubmit = async (data: PhoneFormData) => {
    setIsSubmitting(true)
    setError(null)
    console.log('Submitting phone:', data.phone);
    try {
      const response = await fetch("/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: data.phone }),
      })

      const json = await response.json()
      console.log("Login response:", json);
      

      if (!response.ok) {
        setError(json.error || "Something went wrong.")
        return
      }
      setPhone(data.phone)
      setCurrentView(LOGIN_VIEW.VERIFY_OTP)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Phone Input */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-soil-charcoal"
        >
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-4 w-4 text-muted" />
          </div>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                id="phone"
                international
                // @ts-ignore
                defaultCountry={countryCode.toUpperCase()}
                autoComplete="tel"
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-lg border text-soil-charcoal placeholder:text-muted",
                  "focus:outline-none focus:ring-1 transition-colors",
                  errors.phone
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-soil-clay-dark focus:border-soil-indigo-mud focus:ring-soil-indigo-mud"
                )}
              />
            )}
          />
        </div>
        {errors.phone && (
          <p id="phone-error" className="text-sm text-red-600" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Notice */}
      <div className="text-xs text-muted leading-relaxed">
        By continuing, you agree to receive an SMS for verification. Msg & data
        rates may apply.
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isValid || isSubmitting || !phoneValue?.trim()}
        className="w-full py-3 text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending Code...
          </>
        ) : (
          "Send Code"
        )}
      </Button>

      {/* Error */}
      {error && (
        <div
          className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
          role="alert"
        >
          {error}
        </div>
      )}
    </form>
  )
}
