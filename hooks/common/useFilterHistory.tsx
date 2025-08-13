// hooks/useFilterHistory.ts
import { FilterState } from '@/constant/types/FilterProps'
import { useEffect, useState } from 'react'

// Interface for a saved filter
interface SavedFilter {
  id: string
  label: string
  filters: Partial<FilterState & { packageType: 'umrah' | 'hajj' }>
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
  const generateFilterLabel = (
    filters: Partial<FilterState & { packageType: 'umrah' | 'hajj' }>
  ): string => {
    const parts: string[] = []

    // Add package type prefix
    const packageTypeLabel = filters.packageType === 'hajj' ? 'Haji' : 'Umrah'
    parts.push(packageTypeLabel)

    if (filters.hotelStars) {
      parts.push(`Hotel Bintang ${filters.hotelStars}`)
    }

    // Only add date range for umrah packages
    if (filters.packageType === 'umrah' && filters.dateRange?.from) {
      const fromDate = new Date(filters.dateRange.from)
      const month = fromDate.toLocaleDateString('id-ID', { month: 'short' })
      const year = fromDate.getFullYear()
      parts.push(`${month} ${year}`)
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

    return parts.length > 1
      ? parts.join(' - ')
      : `${packageTypeLabel} - Filter Tanpa Nama`
  }

  // Save filter to history
  const addToHistory = (
    currentFilters: Partial<FilterState & { packageType: 'umrah' | 'hajj' }>
  ) => {
    const { packageType = 'umrah' } = currentFilters

    // Check if filters have meaningful content based on package type
    const hasUmrahFilters =
      packageType === 'umrah' &&
      (currentFilters.hotelStars ||
        currentFilters.departureAirport ||
        currentFilters.arrivalAirport ||
        currentFilters.airline ||
        currentFilters.dateRange)

    const hasHajjFilters =
      packageType === 'hajj' &&
      (currentFilters.hotelStars ||
        currentFilters.departureAirport ||
        currentFilters.arrivalAirport ||
        currentFilters.airline)

    // Don't save empty filters
    if (!hasUmrahFilters && !hasHajjFilters) {
      return
    }

    // Create a simplified copy of the filters based on package type
    const simplifiedFilters: Partial<
      FilterState & { packageType: 'umrah' | 'hajj' }
    > = {
      packageType,
      hotelStars: currentFilters.hotelStars,
      departureAirport: currentFilters.departureAirport,
      arrivalAirport: currentFilters.arrivalAirport,
      airline: currentFilters.airline,
    }

    // Only include dateRange for umrah packages
    if (packageType === 'umrah') {
      simplifiedFilters.dateRange = currentFilters.dateRange
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
      // Check if a similar filter already exists (same label and package type)
      const duplicateIndex = prev.findIndex(
        (item) =>
          item.label === label && item.filters.packageType === packageType
      )

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

  // Get filtered history by package type
  const getHistoryByPackageType = (packageType: 'umrah' | 'hajj') => {
    return filterHistory.filter(
      (item) => item.filters.packageType === packageType
    )
  }

  return {
    filterHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryByPackageType,
  }
}
