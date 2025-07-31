"use client"

import { useState } from "react"
import Login from "@modules/account/components/login"
import VerifyOTP from "../components/verify-otp"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  VERIFY_OTP = "verify-otp",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState(LOGIN_VIEW.SIGN_IN)

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView === LOGIN_VIEW.SIGN_IN ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <VerifyOTP />
      )}
    </div>
  )
}

export default LoginTemplate
