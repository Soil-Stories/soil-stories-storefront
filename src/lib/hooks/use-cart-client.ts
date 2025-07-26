"use client"

import { useEffect, useState } from "react"
import { retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

export default function useCartClient() {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart = await retrieveCart()
        setCart(cart)
      } catch (error) {
        console.error("Error loading cart", error)
        setCart(null)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  return { cart, loading }
}
