"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { cn } from "@lib/util/tailwind"

interface CarouselSlide {
  id: number
  image: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
  theme: "light" | "dark"
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dg56fyfea/image/upload/v1753032775/samples/smile.jpg",
    title: "Threads Rooted in Place",
    subtitle: "Born from the Earth",
    description: "Discover garments that carry the textures, colors, and culture of the world's diverse soils.",
    buttonText: "Explore Collection",
    buttonLink: "/store",
    theme: "dark",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dg56fyfea/image/upload/v1753032777/cld-sample-3.jpg",
    title: "Crafted from Culture",
    subtitle: "Told through Fabric",
    description: "From brushstrokes to weaves — we co-create with artisans to let local stories live on.",
    buttonText: "Meet the Makers",
    buttonLink: "/studio",
    theme: "light",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dg56fyfea/image/upload/v1753032777/cld-sample-5.jpg",
    title: "Wear the World",
    subtitle: "Stories in Every Stitch",
    description: "Folk, tribal, and contemporary forms. Across lands, told in fabric.",
    buttonText: "Read Our Stories",
    buttonLink: "/stories",
    theme: "dark",
  },
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [isPlaying, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide()
      } else if (event.key === "ArrowRight") {
        nextSlide()
      } else if (event.key === " ") {
        event.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, isPlaying])

  // Set loaded state
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const currentSlide = slides[activeIndex]

  return (
    <section
      className="relative h-[70vh] md:h-[85vh] lg:h-screen w-full overflow-hidden"
      aria-label="Hero carousel"
      role="region"
    >
      {/* Slides container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative min-w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
            aria-hidden={index !== activeIndex}
          >
            {/* Overlay */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                slide.theme === "dark" ? "bg-black/40" : "bg-white/20",
              )}
            />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container-wide section-padding">
                <div className="max-w-3xl">
                  {/* Subtitle */}
                  <div
                    className={cn(
                      "mb-4 animate-slide-up opacity-0 transition-all duration-1000 delay-300",
                      isLoaded && index === activeIndex && "opacity-100 translate-y-0",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider",
                        slide.theme === "dark"
                          ? "bg-white/20 text-white backdrop-blur-sm"
                          : "bg-soil-charcoal/20 text-soil-charcoal backdrop-blur-sm",
                      )}
                    >
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className={cn(
                      "mb-6 font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-slide-up opacity-0 transition-all duration-1000 delay-500",
                      slide.theme === "dark" ? "text-white" : "text-soil-charcoal",
                      isLoaded && index === activeIndex && "opacity-100 translate-y-0",
                    )}
                  >
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p
                    className={cn(
                      "mb-8 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl animate-slide-up opacity-0 transition-all duration-1000 delay-700",
                      slide.theme === "dark" ? "text-white/90" : "text-soil-charcoal/90",
                      isLoaded && index === activeIndex && "opacity-100 translate-y-0",
                    )}
                  >
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div
                    className={cn(
                      "animate-slide-up opacity-0 transition-all duration-1000 delay-1000",
                      isLoaded && index === activeIndex && "opacity-100 translate-y-0",
                    )}
                  >
                    <Link
                      href={slide.buttonLink}
                      className={cn(
                        "inline-flex items-center px-8 py-4 rounded-full text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-medium",
                        slide.theme === "dark"
                          ? "bg-white text-soil-charcoal hover:bg-soil-clay"
                          : "bg-soil-charcoal text-white hover:bg-soil-charcoal-light",
                      )}
                    >
                      {slide.buttonText}
                      <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-20 md:bottom-8 right-4 md:right-8 z-10 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50",
              index === activeIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75 hover:scale-110",
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: isPlaying ? "100%" : "0%",
            transitionDuration: isPlaying ? "6000ms" : "300ms",
          }}
          key={activeIndex}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center text-white/80">
          <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
          <div className="w-px h-8 bg-white/40" />
        </div>
      </div>
    </section>
  )
}
