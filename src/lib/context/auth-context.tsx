"use client"

import { retrieveCustomer } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

interface AuthContextType {
  customer: HttpTypes.StoreCustomer | null
  isLoggedIn: boolean
  login: (customer: HttpTypes.StoreCustomer) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const customer = await retrieveCustomer()
        if (customer) {
          setCustomer(customer)
        } else {
          setCustomer(null)
        }
      } catch (err) {
        console.error("Failed to retrieve customer:", err)
        setCustomer(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (customer: HttpTypes.StoreCustomer) => {
    console.log(customer, 'customer');
    
    setCustomer(customer)
  }

  const logout = () => {
    setCustomer(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("customer")
      window.location.href = "/"
    }
  }

  const value: AuthContextType = {
    customer,
    isLoggedIn: !!customer,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
