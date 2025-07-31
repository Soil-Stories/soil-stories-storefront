"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@components/ui/button"
import { ChevronLeft, ChevronRight, Home, Store } from "lucide-react"
import Link from "next/link"

const poeticMessages = [
  "The story you seek is still being woven — written not in code, but in the stars.",
  "Some patterns are too rare to be found — like this one. Perhaps it's waiting to become your next favorite thread elsewhere.",
  "Looks like you've wandered off the path. This tale wasn't meant for now — but maybe another thread will lead you home.",
  "The story you seek is still being stitched — not lost, just waiting to be found.",
  "The loom missed a beat, the fabric unraveled. What you're looking for doesn't exist — yet.",
]

export function NotFoundContent() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % poeticMessages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % poeticMessages.length)
  }

  const prevMessage = () => {
    setCurrentMessage((prev) => (prev - 1 + poeticMessages.length) % poeticMessages.length)
  }

  const goToMessage = (index: number) => {
    setCurrentMessage(index)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-soil-clay/20 via-parchment/30 to-soil-clay/10">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-soil-terracotta/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated loom icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-16 h-16 border-2 border-soil-terracotta/30 rounded-full flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 border border-soil-deep-forest/40 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-soil-charcoal rounded-full" />
                </motion.div>
              </motion.div>

              {/* Thread lines */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-px bg-gradient-to-r from-transparent via-soil-terracotta/40 to-transparent"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "left center",
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                  }}
                  animate={{
                    scaleX: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <span className="text-6xl md:text-8xl font-bold text-soil-charcoal/20 tracking-wider">404</span>
          </motion.div>

          {/* Poetic message carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 relative"
          >
            <div className="relative h-32 md:h-24 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentMessage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl lg:text-3xl font-serif text-soil-charcoal leading-relaxed max-w-3xl px-4"
                >
                  {poeticMessages[currentMessage]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevMessage}
                className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
                aria-label="Previous message"
              >
                <ChevronLeft className="w-4 h-4 text-soil-charcoal" />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {poeticMessages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToMessage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentMessage ? "bg-soil-terracotta" : "bg-soil-charcoal/30 hover:bg-soil-charcoal/50"
                    }`}
                    aria-label={`Go to message ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextMessage}
                className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
                aria-label="Next message"
              >
                <ChevronRight className="w-4 h-4 text-soil-charcoal" />
              </button>
            </div>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-soil-charcoal/70 text-lg mb-8 max-w-md mx-auto"
          >
            But don't worry — there's still beauty to be found.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="bg-soil-charcoal hover:bg-soil-charcoal/90">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-soil-charcoal/20 hover:bg-soil-charcoal/5 bg-transparent"
            >
              <Link href="/store">
                <Store className="w-4 h-4 mr-2" />
                Browse Collection
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
