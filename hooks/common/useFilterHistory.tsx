// hooks/useFilterHistory.ts
import { FilterState } from '@/constant/types/FilterProps'
import { useEffect, useState } from 'react'

// Interface for a saved filter
interface SavedFilter {
  id: string
  label: string
  filters: Partial<FilterState>
  timestamp: number
}

const FILTER_HISTORY_KEY = 'filter_history'
const MAX_HISTORY_ITEMS = 5

export function useFilterHistory() {
  const [filterHistory, setFilterHistory] = useState<SavedFilter[]>([])

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem(FILTER_HISTORY_KEY)
      if (savedHistory) {
        try {
          setFilterHistory(JSON.parse(savedHistory))
        } catch (e) {
          console.error('Failed to parse filter history', e)
          localStorage.removeItem(FILTER_HISTORY_KEY)
        }
      }
    }
  }, [])

  // Generate a descriptive label for the filter
  const generateFilterLabel = (filters: Partial<FilterState>): string => {
    const parts: string[] = []

    if (filters.hotelStars) {
      parts.push(`Hotel Bintang ${filters.hotelStars}`)
    }

    if (filters.departureAirport) {
      parts.push(`Dari ${filters.departureAirport.cityName}`)
    }

    if (filters.arrivalAirport) {
      parts.push(`Ke ${filters.arrivalAirport.cityName}`)
    }

    if (filters.airline) {
      parts.push(filters.airline.name)
    }

    return parts.length > 0 ? parts.join(' - ') : 'Filter Tanpa Nama'
  }

  // Save filter to history
  const addToHistory = (currentFilters: Partial<FilterState>) => {
    // Don't save empty filters
    if (
      !currentFilters.hotelStars &&
      !currentFilters.departureAirport &&
      !currentFilters.arrivalAirport &&
      !currentFilters.airline &&
      !currentFilters.dateRange
    ) {
      return
    }

    // Create a simplified copy of the filters
    const simplifiedFilters = {
      hotelStars: currentFilters.hotelStars,
      dateRange: currentFilters.dateRange,
      departureAirport: currentFilters.departureAirport,
      arrivalAirport: currentFilters.arrivalAirport,
      airline: currentFilters.airline,
    }

    // Generate a label
    const label = generateFilterLabel(simplifiedFilters)

    // Create the saved filter object
    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      label,
      filters: simplifiedFilters,
      timestamp: Date.now(),
    }

    setFilterHistory((prev) => {
      // Check if a similar filter already exists
      const duplicateIndex = prev.findIndex((item) => item.label === label)

      // Create new history array
      let newHistory: SavedFilter[]

      if (duplicateIndex >= 0) {
        // Update existing filter timestamp
        newHistory = [...prev]
        newHistory[duplicateIndex] = {
          ...newHistory[duplicateIndex],
          timestamp: Date.now(),
        }
      } else {
        // Add new filter
        newHistory = [newFilter, ...prev].slice(0, MAX_HISTORY_ITEMS)
      }

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(FILTER_HISTORY_KEY, JSON.stringify(newHistory))
      }

      return newHistory
    })
  }

  // Remove a filter from history
  const removeFromHistory = (id: string) => {
    setFilterHistory((prev) => {
      const newHistory = prev.filter((item) => item.id !== id)

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(FILTER_HISTORY_KEY, JSON.stringify(newHistory))
      }

      return newHistory
    })
  }

  // Clear all history
  const clearHistory = () => {
    setFilterHistory([])

    if (typeof window !== 'undefined') {
      localStorage.removeItem(FILTER_HISTORY_KEY)
    }
  }

  return {
    filterHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}
