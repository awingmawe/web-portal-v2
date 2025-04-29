/* eslint-disable react-hooks/exhaustive-deps */
import { Airport } from '@/constant/types/AirportProps'
import { UseSearchParams, UseSearchResult } from '@/hooks/types-props'
import { getAirports } from '@/services/general-service'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

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
