'use client'

import { useCallback, useEffect, useState } from 'react'

const HISTORY_KEY = 'search_history'
const MAX_HISTORY_ITEMS = 5

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem(HISTORY_KEY)
      if (savedHistory) {
        try {
          setSearchHistory(JSON.parse(savedHistory))
        } catch (e) {
          console.error('Failed to parse search history', e)
          localStorage.removeItem(HISTORY_KEY)
        }
      }
    }
  }, [])

  // Save search query to history
  const addToHistory = useCallback((query: string) => {
    if (!query.trim()) return

    setSearchHistory((prev) => {
      // Remove duplicate if exists
      const filteredHistory = prev.filter((item) => item !== query)

      // Add new query to the beginning
      const newHistory = [query, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS)

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
      }

      return newHistory
    })
  }, [])

  // Remove an item from history
  const removeFromHistory = useCallback((query: string) => {
    setSearchHistory((prev) => {
      const newHistory = prev.filter((item) => item !== query)

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
      }

      return newHistory
    })
  }, [])

  // Clear all history
  const clearHistory = useCallback(() => {
    setSearchHistory([])

    if (typeof window !== 'undefined') {
      localStorage.removeItem(HISTORY_KEY)
    }
  }, [])

  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}
