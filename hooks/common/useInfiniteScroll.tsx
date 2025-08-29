// hooks/common/useCustomInfiniteScroll.ts
'use client'

import { toast } from '@/components/ui/sonner'
import { CardData } from '@/constant/types/PackageProps'
import { useFetchPackage } from '@/hooks/filter-product-hooks/useFetchPackage'
import { mapProductsToCardData } from '@/lib/utils'
import { useCallback, useState } from 'react'

export const useCustomInfiniteScroll = (pageSize = 9) => {
  const [items, setItems] = useState<CardData[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0)
  const { fetchPackage } = useFetchPackage()

  // Reset items and related state
  const resetItems = useCallback(() => {
    setItems([])
    setHasMore(true)
    setCurrentPage(1)
    setTotalItems(0)
  }, [])

  // Load initial items
  const fetchInitialItems = useCallback(
    async (params?: any) => {
      setIsLoading(true)
      try {
        // Reset state for fresh data
        setItems([])

        // Always start with page 1 for initial load
        const initialPageParams = {
          ...params,
          page: 1,
          type: 'umrah',
        }
        const result = await fetchPackage(initialPageParams, pageSize)
        const mappedData = mapProductsToCardData(result)

        setItems(mappedData)
        setTotalItems(result.total)
        setHasMore(mappedData.length < result.total)
        setCurrentPage(2) // Set to page 2 for next load
      } catch (error) {
        console.error('Error loading initial items:', error)
        toast.error('Failed to load packages. Please try again.')
        setHasMore(false)
      } finally {
        setIsLoading(false)
      }
    },
    [fetchPackage, pageSize]
  )

  // Load more items
  const loadMore = useCallback(
    async (params?: any) => {
      if (isLoading || !hasMore) return

      setIsLoading(true)
      try {
        // Apply the current page to params
        const nextPageParams = {
          ...params,
          page: currentPage,
          type: 'umrah',
        }

        const result = await fetchPackage(nextPageParams, pageSize)
        const mappedData = mapProductsToCardData(result)

        // Append new items to existing items
        setItems((prevItems) => [...prevItems, ...mappedData])

        // Check if we've loaded all available items
        const newTotalLoaded = items.length + mappedData.length
        setHasMore(newTotalLoaded < result.total)

        // Update total and increment page number
        setTotalItems(result.total)
        setCurrentPage((prev) => prev + 1)
      } catch (error) {
        console.error('Error loading more items:', error)
        toast.error('Failed to load more packages. Please try again.')
        setHasMore(false)
      } finally {
        setIsLoading(false)
      }
    },
    [fetchPackage, currentPage, hasMore, isLoading, items.length, pageSize]
  )

  return {
    packages: items,
    hasMore,
    isLoading,
    loadMore,
    resetItems,
    fetchInitialPackages: fetchInitialItems,
    totalPackages: totalItems,
  }
}
