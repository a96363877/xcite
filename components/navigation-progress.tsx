"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Track previous path to detect actual navigation
  const prevPathRef = useRef(pathname)
  const prevSearchParamsRef = useRef(searchParams)

  // Minimum loading time in milliseconds
  const MIN_LOADING_TIME = 800

  useEffect(() => {
    // Only trigger loading on actual navigation
    const isNewNavigation = prevPathRef.current !== pathname || prevSearchParamsRef.current !== searchParams

    prevPathRef.current = pathname
    prevSearchParamsRef.current = searchParams

    if (!isNewNavigation) return

    // Clean up any existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)

    // Start loading animation
    setIsLoading(true)
    setProgress(0)

    // Quickly progress to 80%
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 80
        }
        return prev + 10
      })
    }, 100)

    // Set minimum timeout for loading
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setProgress(100)

      // Small delay to show 100% before hiding
      const hideTimeout = setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 200)

      // Store the new timeout
      timeoutRef.current = hideTimeout
    }, MIN_LOADING_TIME)

    // Clean up on unmount or when route changes
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [pathname, searchParams]) // Remove timeoutId from dependencies

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-transparent z-50 transition-opacity duration-300",
        isLoading ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="h-full bg-cyan-600 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}
