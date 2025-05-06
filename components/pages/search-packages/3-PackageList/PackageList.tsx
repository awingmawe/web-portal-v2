/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CardPackage } from '@/components/shared/CardPackage'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { Loader2 } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import { ResultsSummary } from './HeaderPackageList'
import { NoResults } from './NoResultPackageList'
import { CustomPagination } from './PaginationPackageList'
import {
  PackageGridSkeleton,
  PaginationSkeleton,
  ResultsHeaderSkeleton,
} from './SkeletonPackageList'

export const PackageResults: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {
    isLoadingSkeleton,
    isLoading,
    resetFilters,
    packages: packageDataCSR,
    totalPackages: totalCSR,
    initializeFiltersFromURL,
    fetchPackageData,
    buildQueryParams,
  } = useFilterProduct()
  const {
    loadMore,
    hasMore,
    isLoading: loading,
    fetchInitialPackages,
    packages: infinitePackages, // this packages is same like packageDataCSR but in different state for mobile
  } = useInfiniteScroll()
  const { lg: isMobile } = useTailwindBreakpoint()

  const currentSort = searchParams.get('sort') || 'price-low' // Default sort

  // First, initialize filters from URL
  useEffect(() => {
    initializeFiltersFromURL()
  }, [])

  useEffect(() => {
    if (!isLoadingSkeleton) {
      const currentSort = searchParams.get('sort') || 'price-low'
      const page = parseInt(searchParams.get('page') || '1', 10)

      // Build the params object from search params string
      const paramsFilter = buildQueryParams(
        searchParams.toString(),
        currentSort,
        page
      )

      initializeFiltersFromURL(false)

      if (isMobile) {
        fetchInitialPackages(paramsFilter)
      } else {
        fetchPackageData(paramsFilter)
      }
    }
  }, [isLoadingSkeleton, currentSort, searchParams])

  const loadMoreData = useCallback(() => {
    const currentSort = searchParams.get('sort') || 'price-low'
    const page = parseInt(searchParams.get('page') || '1', 10) + 1

    // Build the params object from search params string
    const paramsFilter = buildQueryParams(
      searchParams.toString(),
      currentSort,
      page
    )

    loadMore(paramsFilter)
  }, [])

  // Function to reset all filters
  const resetAllFilters = useCallback(() => {
    // 1. Reset the internal state to default values
    resetFilters()

    // 2. Delete all search params
    window.history.pushState({}, '', '/search')
  }, [])

  // Function to create URL with new sort parameter
  const createSortUrl = useCallback(
    (sortValue: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', sortValue)
      params.set('page', '1') // Reset to page 1 when sorting changes
      return `${pathname}?${params.toString()}`
    },
    [pathname, searchParams]
  )

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(totalCSR / 9)
  }, [totalCSR])

  // Create page navigation function
  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', page.toString())
      window.location.href = `${pathname}?${params.toString()}`
    },
    [pathname, searchParams]
  )

  // Render no results component if there are no packages and not isLoading: loading
  if (
    (packageDataCSR.length === 0 || infinitePackages.length === 0) &&
    !isLoadingSkeleton &&
    !isLoading
  ) {
    return <NoResults resetAllFilters={resetAllFilters} />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results info - Show skeleton or actual header */}
      {isLoadingSkeleton ? (
        <ResultsHeaderSkeleton />
      ) : (
        <ResultsSummary
          resultsCount={packageDataCSR.length}
          totalCount={totalCSR}
          currentSort={currentSort}
          createSortUrl={createSortUrl}
        />
      )}

      {/* Package grid */}
      {isLoadingSkeleton || isLoading ? (
        <PackageGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isMobile ? (
            <>
              {infinitePackages?.map((packageData, index) => (
                <CardPackage
                  key={`packages-${packageData.slugPackage}-${index}`}
                  data={packageData}
                />
              ))}
              <InfiniteScroll
                isLoading={loading}
                hasMore={hasMore}
                next={loadMoreData}
                threshold={0.8}
              >
                {hasMore && (
                  <Loader2 className="mx-auto my-4 h-8 w-8 animate-spin" />
                )}
              </InfiniteScroll>
            </>
          ) : (
            packageDataCSR?.map((packageData, index) => (
              <CardPackage
                key={`packages-${packageData.slugPackage}-${index}`}
                data={packageData}
                eventCategory="search"
              />
            ))
          )}
        </div>
      )}

      {/* Pagination - Show skeleton or actual pagination */}
      {isLoadingSkeleton ? (
        <PaginationSkeleton />
      ) : (
        <CustomPagination
          currentPage={parseInt(searchParams.get('page') || '1', 10)}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}
    </div>
  )
}
