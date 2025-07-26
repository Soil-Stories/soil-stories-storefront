"use client"

import useCartClient from "@lib/hooks/use-cart-client"
import CartDropdown from "../cart-dropdown"

export default function CartButton() {
  const { cart, loading } = useCartClient()

  // Optional: show loading spinner or skeleton
  if (loading) return null

  return <CartDropdown cart={cart} />
}
