import { toast } from '@/components/ui/sonner'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useFetchPackage } from '@/hooks/filter-product-hooks/useFetchPackage'
import { mapProductsToCardData } from '@/lib/utils'
import { useCallback, useState } from 'react'

export function useInfiniteScroll() {
  const { fetchPackage } = useFetchPackage()
  const { packages, setPackages, isLoading, setIsLoading } = useFilterProduct()

  // Keep track of current page
  const [page, setPage] = useState(1)
  // State for packages data
  const [hasMore, setHasMore] = useState(true)

  const fetchInitialPackages = useCallback(
    async (params: any) => {
      setIsLoading(true)
      try {
        // Fetch data using the hook
        const data = await fetchPackage(params)
        const mappedData = mapProductsToCardData(data)

        // Update state
        setPackages(mappedData)
        setHasMore(mappedData.length < data.total)
        setPage(1)
      } catch (err) {
        console.error('Error fetching packages:', err)
        toast.error('Failed to load packages. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [fetchPackage, setIsLoading, setPackages]
  )

  // Function to load more packages
  const loadMore = useCallback(
    async (params: any) => {
      if (isLoading || !hasMore) return

      setIsLoading(true)
      try {
        const nextPage = page + 1

        const data = await fetchPackage(params, nextPage)

        if (data.results.length > 0) {
          // Properly merge previous data with new data
          setPackages([...packages, ...mapProductsToCardData(data)])
          setPage(nextPage)
        }

        // Check if we have more data to load
        setHasMore(packages.length + data.results.length < data.total)
      } catch (err) {
        console.error('Error isLoading more packages:', err)
        toast.error('Failed to load more packages. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [
      isLoading,
      hasMore,
      setIsLoading,
      page,
      fetchPackage,
      packages,
      setPackages,
    ]
  )

  return {
    packages,
    isLoading,
    hasMore,
    loadMore,
    fetchInitialPackages, // Export this in case you need to trigger a refresh
  }
}
