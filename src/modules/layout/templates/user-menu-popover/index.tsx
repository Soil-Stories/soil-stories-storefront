"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  User,
  Package,
  Heart,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { cn } from "@lib/util/tailwind"

interface UserMenuProps {
  isLoggedIn: boolean
  user?: {
    id: string
    name: string
    email: string
    phone: string
  }
  onLogout: () => void
}

export function UserMenuPopover({ isLoggedIn, user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = () => {
    onLogout()
    setIsOpen(false)
  }

  const loggedOutItems = [
    {
      icon: User,
      label: "Sign In / Join",
      href: "/login",
    },
    {
      icon: Package,
      label: "Track Order",
      href: "/track-order",
    },
    {
      icon: HelpCircle,
      label: "Help / FAQ",
      href: "/faq",
    },
  ]

  const loggedInItems = [
    {
      icon: Package,
      label: "My Orders",
      href: "/my-orders",
    },
    {
      icon: Heart,
      label: "Saved Items",
      href: "/saved",
    },
    {
      icon: FileText,
      label: "My SoilStory",
      href: "/my-soilstory",
    },
    {
      icon: Settings,
      label: "Account Settings",
      href: "/account",
    },
    {
      icon: HelpCircle,
      label: "Help / FAQ",
      href: "/faq",
    },
  ]

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center rounded-full p-2 text-soil-charcoal transition-colors",
          "hover:bg-soil-clay-dark focus:outline-none focus:ring-2 focus:ring-soil-terracotta focus:ring-offset-2",
          isLoggedIn &&
            "bg-soil-terracotta text-white hover:bg-soil-terracotta/90"
        )}
        aria-label={
          isLoggedIn ? `Account menu for ${user?.name}` : "Account menu"
        }
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isLoggedIn && user ? (
          <span className="text-xs font-medium">{getInitials(user.name)}</span>
        ) : (
          <User className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            "absolute right-0 top-full mt-2 min-w-[200px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5",
            "animate-in fade-in-0 zoom-in-95 duration-100",
            "focus:outline-none"
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <div className="py-1">
            {isLoggedIn && user && (
              <>
                <div className="px-4 py-3 border-b border-soil-clay-dark">
                  <p className="text-sm font-medium text-soil-charcoal">
                    {user.name}
                  </p>
                  <p className="text-xs text-soil-charcoal/70">{user.email}</p>
                </div>
              </>
            )}

            {(isLoggedIn ? loggedInItems : loggedOutItems).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm text-soil-charcoal transition-colors",
                    "hover:bg-soil-clay-dark focus:bg-soil-clay-dark focus:outline-none"
                  )}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="mr-3 h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}

            {isLoggedIn && (
              <>
                <div className="border-t border-soil-clay-dark" />
                <button
                  onClick={handleLogout}
                  className={cn(
                    "flex w-full items-center px-4 py-2 text-sm text-soil-charcoal transition-colors",
                    "hover:bg-soil-clay-dark focus:bg-soil-clay-dark focus:outline-none"
                  )}
                  role="menuitem"
                >
                  <LogOut className="mr-3 h-4 w-4" aria-hidden="true" />
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
