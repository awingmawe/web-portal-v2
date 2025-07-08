import { Airline } from '@/constant/types/AirlineProps'
import { UseSearchParams, UseSearchResult } from '@/hooks/types-props'
import { getAirline, getAirlineV2 } from '@/services/general-service'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function useAirlineSearch({
  initialQuery = '',
  pageSize = 15,
  version = 'v2',
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
        const params = { page: pageNum, size: pageSize, search: query }
        const response =
          version === 'v1'
            ? await getAirline(params)
            : await getAirlineV2(params)
        return response
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch airlines')
        )
        return { results: [], total: 0 }
      }
    },
    [pageSize, version]
  )

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setInitialLoading(true)

      const data = await fetchAirlines(1, searchQuery)
      setAirlines(data.results)
      setHasMore(data.results.length < data.total)
      setPage(1)

      setInitialLoading(false)
    }

    loadInitialData()
  }, [fetchAirlines, searchQuery])

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
  }, [airlines.length, fetchAirlines, loading, page, searchQuery])

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
