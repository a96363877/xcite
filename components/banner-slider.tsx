"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

type Banner = {
  id: number
  image: string
  title: string
  description: string
  buttonText: string
  href: string
}

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { dir } = useLanguage()

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1))
  }, [banners.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1))
  }, [banners.length])

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, nextSlide])

  if (!banners.length) return null

  return (
    <div className="relative w-full">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0">
              <div className="relative min-w-[250px] md:h-[300px] w-full">
                <img
                  src={
                    banner.image || `/placeholder.svg?height=800&width=1600&query=promotional banner ${banner.title}`
                  }
                  alt={banner.title}
                  className="object-cover"
                  
                />
                 
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={dir === "rtl" ? nextSlide : prevSlide}
        className={`absolute ${dir === "rtl" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors`}
        aria-label="Previous banner"
      >
        <ChevronLeft className={`h-5 w-5 ${dir === "rtl" ? "rtl-mirror" : ""}`} />
      </button>
      <button
        onClick={dir === "rtl" ? prevSlide : nextSlide}
        className={`absolute ${dir === "rtl" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors`}
        aria-label="Next banner"
      >
        <ChevronRight className={`h-5 w-5 ${dir === "rtl" ? "rtl-mirror" : ""}`} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
