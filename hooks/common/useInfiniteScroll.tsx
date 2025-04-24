/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from '@/components/ui/sonner'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useFetchPackage } from '@/hooks/filter-product-hooks/useFetchPackage'
import { mapProductsToCardData } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'

export function useInfiniteScroll() {
  const { fetchPackage } = useFetchPackage()
  const {
    buildQueryParams,
    packages,
    setPackages,
    initializeFiltersFromURL,
    filters,
  } = useFilterProduct()

  // Keep track of current page
  const [page, setPage] = useState(1)
  // State for packages data
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  // First, initialize filters from URL
  useEffect(() => {
    async function initialize() {
      setInitialLoading(true)
      await initializeFiltersFromURL()
      setInitialLoading(false)
    }
    initialize()
  }, [initializeFiltersFromURL])

  // Then fetch package data once filters are initialized
  useEffect(() => {
    // Only fetch data after filters are initialized from URL
    if (!initialLoading) {
      fetchInitialPackages()
    }
  }, [initialLoading, filters])

  const fetchInitialPackages = useCallback(async () => {
    try {
      setLoading(true)
      // Get query params based on current filters
      const params = buildQueryParams()

      // Fetch data using the hook
      const data = await fetchPackage(params, 1)
      const mappedData = mapProductsToCardData(data)

      // Update state
      setPackages(mappedData)
      setHasMore(mappedData.length < data.total)
      setPage(1)
    } catch (err) {
      console.error('Error fetching packages:', err)
      toast.error('Failed to load packages. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [buildQueryParams, fetchPackage, setPackages])

  // Function to load more packages
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const nextPage = page + 1
      const params = buildQueryParams()

      const data = await fetchPackage(params, nextPage)

      if (data.results.length > 0) {
        // Properly merge previous data with new data
        setPackages([...packages, ...mapProductsToCardData(data)])
        setPage(nextPage)
      }

      // Check if we have more data to load
      setHasMore(packages.length + data.results.length < data.total)
    } catch (err) {
      console.error('Error loading more packages:', err)
      toast.error('Failed to load more packages. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [
    page,
    loading,
    hasMore,
    packages,
    buildQueryParams,
    fetchPackage,
    setPackages,
  ])

  return {
    packages,
    loading,
    hasMore,
    loadMore,
    initialLoading,
    fetchInitialPackages, // Export this in case you need to trigger a refresh
  }
}
