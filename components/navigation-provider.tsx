"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { usePathname, useSearchParams } from "next/navigation"

type NavigationContextType = {
  isNavigating: boolean
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
})

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
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

    // Start navigation state
    setIsNavigating(true)

    // Set minimum timeout for loading
    timeoutRef.current = setTimeout(() => {
      setIsNavigating(false)
    }, MIN_LOADING_TIME)

    // Clean up on unmount or when route changes
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [pathname, searchParams])

  return <NavigationContext.Provider value={{ isNavigating }}>{children}</NavigationContext.Provider>
}

export function useNavigation() {
  return useContext(NavigationContext)
}
