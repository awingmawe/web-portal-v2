/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import EmptyStateWishlist from '@/components/pages/my/3-Wishlist/EmptyState'
import { SearchAndFilterWishlist } from '@/components/pages/my/3-Wishlist/TopFilter'
import { CustomPagination } from '@/components/pages/search-packages/3-PackageList/PaginationPackageList'
import { CardPackage } from '@/components/shared/CardPackage'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { CardData } from '@/constant/types/PackageProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { mapProductsToCardData } from '@/lib/utils'
import { getWishlistList } from '@/services/umrah-service'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type React from 'react'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function Wishlist() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { lg } = useTailwindBreakpoint()

  // State for filters and data
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('query') ? String(searchParams.get('query')) : ''
  )
  const [wishlistItems, setWishlistItems] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  )
  const [totalItems, setTotalItems] = useState(0)
  const pageSize = 9 // Items per page

  // Calculate total pages for pagination
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize)
  }, [totalItems, pageSize])

  // Debounced function to update URL parameters
  const updateSearchParams = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }

    params.set('page', '1') // Reset to page 1 when search changes
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })

    // Reset and fetch new data with the updated search query
    setWishlistItems([])
    setPage(1)
    fetchWishlistData(1, value, true)
  }, 500)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    updateSearchParams(value)
  }

  // Function to fetch wishlist data
  const fetchWishlistData = useCallback(
    async (
      pageNum: number,
      query: string = searchQuery,
      isNewSearch: boolean = false
    ) => {
      setIsLoading(true)
      try {
        const response = await getWishlistList({
          page: pageNum,
          size: pageSize,
          [`search`]: query ? `%${query}%` : undefined,
          //   [`search`]: query ? `%${query}%` : undefined,
          // Add any other parameters you might need
        })

        const mappedData = mapProductsToCardData(response)

        if (isNewSearch || pageNum === 1 || !lg) {
          setWishlistItems(mappedData)
        } else {
          setWishlistItems((prev) => [...prev, ...mappedData])
        }

        setTotalItems(response.total)
        setPage(pageNum)
        setHasMore(
          mappedData.length > 0 &&
            wishlistItems.length + mappedData.length < response.total
        )
      } catch (error) {
        console.error('Error fetching wishlist:', error)
        // Handle error - you might want to show a toast or error message
      } finally {
        setIsLoading(false)
      }
    },
    [searchQuery, lg]
  )

  // Initial data fetch
  useEffect(() => {
    fetchWishlistData(
      parseInt(searchParams.get('page') || '1', 10),
      searchParams.get('query') || '',
      true
    )
  }, []) // Empty dependency array for initial load only

  // For desktop: Update when URL page parameter changes
  useEffect(() => {
    if (!lg) {
      const pageFromURL = parseInt(searchParams.get('page') || '1', 10)
      if (page !== pageFromURL) {
        setPage(pageFromURL)
        fetchWishlistData(pageFromURL, searchQuery, true)
      }
    }
  }, [searchParams, lg, fetchWishlistData, searchQuery, page])

  // Load more data for infinite scroll (mobile only)
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore && lg) {
      fetchWishlistData(page + 1, searchQuery)
    }
  }, [fetchWishlistData, isLoading, hasMore, page, searchQuery, lg])

  // Create page navigation function for desktop pagination
  const goToPage = useCallback(
    (pageNum: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', pageNum.toString())
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  return (
    <Fragment>
      {/* Search and Filters */}
      <SearchAndFilterWishlist
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />

      {/* Wishlist Items */}
      <div className="mt-6">
        {isLoading && page === 1 ? (
          // Initial loading skeleton
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={`skeleton-${index}`} className="animate-pulse">
                  <div className="aspect-square w-full rounded-[20px] bg-neutral-200"></div>
                  <div className="mt-3 space-y-2">
                    <div className="h-5 w-full rounded bg-neutral-200"></div>
                    <div className="h-4 w-1/2 rounded bg-neutral-200"></div>
                    <div className="h-4 w-3/4 rounded bg-neutral-200"></div>
                  </div>
                </div>
              ))}
          </div>
        ) : wishlistItems.length > 0 ? (
          // Display wishlist items with conditional infinite scroll/pagination
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((item, index) => (
                <CardPackage
                  key={`wishlist-${item.id}-${index}`}
                  data={item}
                  eventCategory="wishlist"
                />
              ))}

              {/* Mobile: Infinite Scroll */}
              {lg && (
                <InfiniteScroll
                  isLoading={isLoading}
                  hasMore={hasMore}
                  next={loadMore}
                  threshold={0.8}
                >
                  {isLoading && hasMore && (
                    <Loader2 className="mx-auto my-4 h-8 w-8 animate-spin" />
                  )}
                </InfiniteScroll>
              )}
            </div>

            {/* Desktop: Pagination */}
            {!lg && totalPages > 1 && (
              <div className="mt-8">
                <CustomPagination
                  currentPage={page}
                  totalPages={totalPages}
                  goToPage={goToPage}
                />
              </div>
            )}
          </>
        ) : (
          // Empty state
          <EmptyStateWishlist />
        )}
      </div>
    </Fragment>
  )
}
