/* eslint-disable react-hooks/exhaustive-deps */
import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { formatNumberCurrency } from '@/lib/utils'
import { getAirline, getAirports } from '@/services/general-service'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface UseSearchParams {
  initialQuery?: string
  pageSize?: number
}

interface UseSearchResult<T> {
  data: T[]
  loading: boolean
  initialLoading: boolean
  hasMore: boolean
  error: Error | null
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  loadMore: () => Promise<void>
}

interface UsePriceRangeFilterProps {
  initialMin: number
  initialMax: number
  filters: {
    hargaMin: string
    hargaMax: string
  }
  setHargaMin: (value: string) => void
  setHargaMax: (value: string) => void
}

interface UsePriceRangeFilterResult {
  range: [number, number]
  handleSliderChange: (value: [number, number]) => void
  handleSliderChangeEnd: (value: [number, number]) => void
  handleHargaMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleHargaMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleHargaMinBlur: () => void
  handleHargaMaxBlur: () => void
}

interface UseCheckboxSelectionProps {
  selectedValues?: string
  onSelectionChange: (value: string) => void
  paramName: string
}

export function useAirportSearch({
  initialQuery = '',
  pageSize = 15,
}: UseSearchParams = {}): UseSearchResult<Airport> {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [airports, setAirports] = useState<Airport[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState(1)

  // Function to fetch airports
  const fetchAirports = useCallback(
    async (pageNum: number, query: string = '') => {
      try {
        const response = await getAirports({
          page: pageNum,
          size: pageSize,
          search: query,
        })
        return response
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch airports')
        )
        return { results: [], total: 0 }
      }
    },
    [pageSize]
  )

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setInitialLoading(true)

      const data = await fetchAirports(1, searchQuery)
      setAirports(data.results)
      setHasMore(data.results.length < data.total)
      setPage(1)

      setTimeout(() => setInitialLoading(false), 500)
    }

    loadInitialData()
  }, [searchQuery])

  // Load more airports
  const loadMoreAirports = useCallback(async () => {
    if (loading) return

    setLoading(true)
    const nextPage = page + 1
    const data = await fetchAirports(nextPage, searchQuery)

    if (data.results.length > 0) {
      setAirports((prev) => [...prev, ...data.results])
      setPage(nextPage)
    }

    setHasMore(airports.length + data.results.length < data.total)
    setLoading(false)
  }, [page])

  // Debounced search handler
  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    },
    300
  )

  return {
    data: airports,
    loading,
    initialLoading,
    hasMore,
    error,
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    loadMore: loadMoreAirports,
  }
}

export function useAirlineSearch({
  initialQuery = '',
  pageSize = 15,
}: UseSearchParams = {}): UseSearchResult<Airline> {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [airlines, setAirlines] = useState<Airline[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState(1)

  // Function to fetch airlines
  const fetchAirlines = useCallback(
    async (pageNum: number, query: string = '') => {
      try {
        const response = await getAirline({
          page: pageNum,
          size: pageSize,
          search: query,
        })
        return response
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch airlines')
        )
        return { results: [], total: 0 }
      }
    },
    [pageSize]
  )

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setInitialLoading(true)

      const data = await fetchAirlines(1, searchQuery)
      setAirlines(data.results)
      setHasMore(data.results.length < data.total)
      setPage(1)

      setTimeout(() => setInitialLoading(false), 500)
    }

    loadInitialData()
  }, [])

  // Load more airlines
  const loadMoreAirlines = useCallback(async () => {
    if (loading) return

    setLoading(true)
    const nextPage = page + 1
    const data = await fetchAirlines(nextPage, searchQuery)

    if (data.results.length > 0) {
      setAirlines((prev) => [...prev, ...data.results])
      setPage(nextPage)
    }

    setHasMore(airlines.length + data.results.length < data.total)
    setLoading(false)
  }, [page])

  // Debounced search handler
  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    },
    300
  )

  return {
    data: airlines,
    loading,
    initialLoading,
    hasMore,
    error,
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    loadMore: loadMoreAirlines,
  }
}

export function usePriceRangeFilter({
  initialMin,
  initialMax,
  filters,
  setHargaMin,
  setHargaMax,
}: UsePriceRangeFilterProps): UsePriceRangeFilterResult {
  const updateQueryParams = useUpdateQueryParams()

  // Local state for slider values
  const [range, setRange] = useState<[number, number]>([
    initialMin || 0,
    initialMax || 1000000,
  ])

  // Initialize input values from filters on component mount
  useEffect(() => {
    const minValue = filters.hargaMin
      ? parseInt(filters.hargaMin.replace(/\D/g, ''))
      : initialMin || 0

    const maxValue = filters.hargaMax
      ? parseInt(filters.hargaMax.replace(/\D/g, ''))
      : initialMax || 1000000

    setRange([minValue, maxValue])

    if (filters.hargaMin) {
      setHargaMin(formatNumberCurrency(filters.hargaMin))
    }
    if (filters.hargaMax) {
      setHargaMax(formatNumberCurrency(filters.hargaMax))
    }
  }, [filters.hargaMin, filters.hargaMax, initialMin, initialMax])

  // Handler for slider change
  const handleSliderChange = useCallback((value: [number, number]) => {
    setRange(value)

    // Update min value
    const formattedMin = formatNumberCurrency(value[0].toString())
    setHargaMin(formattedMin.replace(/\D/g, ''))

    // Update max value
    const formattedMax = formatNumberCurrency(value[1].toString())
    setHargaMax(formattedMax.replace(/\D/g, ''))
  }, [])

  // Handler when slider interaction ends - update URL params
  const handleSliderChangeEnd = useCallback((value: [number, number]) => {
    updateQueryParams(['prMin', 'prMax'], [value[0], value[1]])
  }, [])

  // Input handlers
  const handleHargaMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const formattedDisplay = formatNumberCurrency(value)
      const numericValue = formattedDisplay.replace(/\D/g, '')
      const valueToSet =
        parseInt(numericValue) > initialMax
          ? initialMax.toString()
          : numericValue

      // Only update the input value while typing
      setHargaMin(valueToSet)

      // If the min input more than the max input, change the value max input same as min input
      if (Number(numericValue) > range[1]) {
        setHargaMax(valueToSet)
      }

      // Update slider if valid number
      const parsedValue = parseInt(numericValue)
      if (!isNaN(parsedValue)) {
        // Ensure value is within range
        const boundedValue = Math.max(
          initialMin || 0,
          Math.min(parsedValue, range[1])
        )
        setRange([boundedValue, range[1]])
      }
    },
    [initialMin, initialMax, range]
  )

  const handleHargaMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const formattedDisplay = formatNumberCurrency(value)
      const numericValue = formattedDisplay.replace(/\D/g, '')

      // Parse the value to check against max
      const parsedValue = parseInt(numericValue)

      // Update the input with either the numeric value or the bounded value
      const valueToSet =
        parsedValue > initialMax ? initialMax.toString() : numericValue
      setHargaMax(valueToSet)

      if (Number(valueToSet) < range[0]) {
        setHargaMin(valueToSet)
      }

      if (!isNaN(parsedValue)) {
        // If the value exceeds the max, use the max value instead
        const boundedValue = Math.min(
          initialMax || 1000000,
          Math.max(parsedValue, range[0])
        )

        // Update slider with bounded value
        setRange([range[0], boundedValue])
      } else {
        // Handle non-numeric input
        setHargaMax(numericValue)
      }
    },
    [initialMax, range]
  )

  const handleHargaMaxBlur = useCallback(() => {
    // Parse the current value
    const parsedValue = parseInt(filters.hargaMax.replace(/\D/g, ''))

    if (!isNaN(parsedValue)) {
      // Ensure value is within range
      const boundedValue = Math.min(
        initialMax || 1000000,
        Math.max(parsedValue, range[0])
      )

      // Update the filter and URL params on blur
      updateQueryParams(['prMax', 'prMin'], [boundedValue, range[0]])
    }
  }, [filters.hargaMax, initialMax, range])

  const handleHargaMinBlur = useCallback(() => {
    // Parse the current value
    const parsedValue = parseInt(filters.hargaMin.replace(/\D/g, ''))

    if (!isNaN(parsedValue)) {
      // Ensure value is within range
      const boundedValue = Math.max(
        initialMin || 0,
        Math.min(parsedValue, range[1])
      )

      // Update the filter and URL params on blur
      updateQueryParams(['prMin', 'prMax'], [boundedValue, range[1]])
    }
  }, [filters.hargaMin, initialMin, range])

  return {
    range,
    handleSliderChange,
    handleSliderChangeEnd,
    handleHargaMinChange,
    handleHargaMaxChange,
    handleHargaMinBlur,
    handleHargaMaxBlur,
  }
}

export function useCheckboxSelection({
  selectedValues,
  onSelectionChange,
  paramName,
}: UseCheckboxSelectionProps) {
  const updateQueryParams = useUpdateQueryParams()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Initialize selected items from props
  useEffect(() => {
    if (selectedValues) {
      setSelectedItems(selectedValues.split(','))
    } else {
      setSelectedItems([])
    }
  }, [selectedValues])

  // Check if an item is selected
  const isItemSelected = useCallback(
    (itemCode: string) => selectedItems.includes(itemCode),
    [selectedItems]
  )

  // Handle item selection/deselection
  const handleSelectionChange = useCallback(
    (itemCode: string, checked: boolean) => {
      let newSelectedItems

      if (checked) {
        // Add the item if checked
        newSelectedItems = [...selectedItems, itemCode]
      } else {
        // Remove the item if unchecked
        newSelectedItems = selectedItems.filter((code) => code !== itemCode)
      }

      // Join all selected items with commas
      const itemsString = newSelectedItems.join(',')

      // Update the parent component
      onSelectionChange(itemsString)

      // Update URL parameters
      if (itemsString) {
        updateQueryParams([paramName], [itemsString])
      } else {
        // If no items selected, remove the parameter from URL
        updateQueryParams([paramName], [''])
      }

      // Update local state
      setSelectedItems(newSelectedItems)
    },
    [selectedItems, paramName]
  )

  return {
    selectedItems,
    isItemSelected,
    handleSelectionChange,
  }
}
