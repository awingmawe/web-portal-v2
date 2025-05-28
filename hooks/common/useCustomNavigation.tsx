// hooks/useCustomNavigation.ts
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const MAX_HISTORY_LENGTH = 10
const HISTORY_KEY = 'app_navigation_history'
const EXCLUDED_PATHS = ['/login', '/register', '/my', '/banking', '/umrah'] // Add paths you want to exclude from history

export function useCustomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  // Update history whenever the path changes
  useEffect(() => {
    // Skip tracking certain paths
    if (EXCLUDED_PATHS.includes(pathname)) return

    try {
      // Get existing history
      const historyString = localStorage.getItem(HISTORY_KEY)
      const history: string[] = historyString ? JSON.parse(historyString) : []

      // Only add path if it's different from the last one
      if (history.length === 0 || history[history.length - 1] !== pathname) {
        // Add current path to history
        history.push(pathname)

        // Keep history within max length
        if (history.length > MAX_HISTORY_LENGTH) {
          history.shift()
        }

        // Save updated history
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
      }
    } catch (error) {
      console.error('Error updating navigation history:', error)
    }
  }, [pathname])

  // Custom back function
  const goBack = (fallbackPath = '/') => {
    try {
      // Get existing history
      const historyString = localStorage.getItem(HISTORY_KEY)
      const history: string[] = historyString ? JSON.parse(historyString) : []

      if (EXCLUDED_PATHS.includes(pathname)) router.back()

      if (history.length > 0) {
        // Remove current path
        history.pop()

        // Get previous path
        const previousPath = history.pop() || fallbackPath

        // Update history in storage
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history))

        // Navigate to previous path
        router.push(previousPath)
      } else {
        // If no history, go to fallback
        router.push(fallbackPath)
      }
    } catch (error) {
      console.error('Error navigating back:', error)
      router.push(fallbackPath)
    }
  }

  return { goBack }
}
