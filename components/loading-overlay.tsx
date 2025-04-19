"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function LoadingOverlay() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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

    // Start loading animation
    setIsLoading(true)

    // Set minimum timeout for loading
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
    }, MIN_LOADING_TIME)

    // Clean up on unmount or when route changes
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [pathname, searchParams])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
