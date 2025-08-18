/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CardPackageTalangan } from '@/components/shared/CardPackageTalangan'
import { CustomPagination } from '@/components/shared/CustomPagination'
import { CustomInfiniteScroll } from '@/components/shared/InfiniteScroll'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCustomInfiniteScroll } from '@/hooks/common/useInfiniteScroll'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { ResultsSummary } from '@/components/pages/search-packages/3-PackageList/HeaderPackageList'
import { NoResults } from '@/components/pages/search-packages/3-PackageList/NoResultPackageList'
import {
  PackageGridSkeleton,
  PaginationSkeleton,
  ResultsHeaderSkeleton,
} from '@/components/pages/search-packages/3-PackageList/SkeletonPackageList'

export const TalanganPackageResults: React.FC = () => {
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
    packages: infinitePackages,
  } = useCustomInfiniteScroll()

  const { lg: isMobile } = useTailwindBreakpoint()
  const updateQueryParams = useUpdateQueryParams()

  // Build query string for fetching packages
  const queryParams = useMemo(() => {
    const currentSort = searchParams.get('sort') || 'price-low'
    const page = parseInt(searchParams.get('page') || '1', 10)
    
    const params = buildQueryParams(
      searchParams.toString(),
      currentSort,
      page
    )
    
    // Ensure we're fetching umrah packages for talangan
    return {
      ...params,
      packageType: 'umrah'
    }
  }, [buildQueryParams, searchParams])

  // Initialize filters on mount and when search params change
  useEffect(() => {
    initializeFiltersFromURL()
  }, [searchParams])

  // Fetch package data based on current filters and pagination
  useEffect(() => {
    if (queryParams) {
      if (isMobile) {
        fetchInitialPackages(queryParams)
      } else {
        fetchPackageData(queryParams)
      }
    }
  }, [queryParams, isMobile, fetchPackageData, fetchInitialPackages])

  const currentSort = searchParams.get('sort') || 'relevan'

  // Callback for infinite scroll
  const loadMoreData = useCallback(() => {
    if (queryParams) {
      loadMore({
        ...queryParams,
        packageType: 'umrah'
      })
    }
  }, [loadMore, queryParams])

  // Reset all filters callback
  const resetAllFilters = useCallback(() => {
    resetFilters()
    window.history.pushState({}, '', window.location.pathname)
  }, [resetFilters])

  // Function to create URL with new sort parameter
  const createSortUrl = useCallback(
    (sortValue: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', sortValue)
      params.set('page', '1')
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
      updateQueryParams(['page'], [page.toString()])
    },
    [updateQueryParams]
  )

  // Get the actual package data based on the current view mode
  const displayPackages = isMobile ? infinitePackages : packageDataCSR
  const totalDisplayCount = isMobile
    ? infinitePackages.length
    : packageDataCSR.length

  // Render no results component if there are no packages and not loading
  if (displayPackages.length === 0 && !isLoadingSkeleton && !isLoading) {
    return <NoResults resetAllFilters={resetAllFilters} />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results info - Show skeleton or actual header */}
      {isLoadingSkeleton ? (
        <ResultsHeaderSkeleton />
      ) : (
        <ResultsSummary
          resultsCount={totalDisplayCount}
          totalCount={totalCSR}
          currentSort={currentSort}
          createSortUrlAction={createSortUrl}
        />
      )}

      {/* Package grid */}
      {isLoadingSkeleton || isLoading ? (
        <PackageGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isMobile ? (
            // Mobile view with infinite scroll
            <>
              {infinitePackages?.map((packageData, index) => (
                <Fragment key={`packages-${packageData.slugPackage}-${index}`}>
                  <CardPackageTalangan
                    data={packageData}
                    eventCategory="talangan"
                    isFromTalangan={true}
                  />
                </Fragment>
              ))}
              {/* Only show infinite scroll on mobile */}
              <CustomInfiniteScroll
                isLoading={loading}
                hasMore={hasMore}
                next={loadMoreData}
                threshold={0.8}
              />
            </>
          ) : (
            // Desktop view with pagination
            packageDataCSR?.map((packageData, index) => (
              <Fragment key={`packages-${packageData.slugPackage}-${index}`}>
                <CardPackageTalangan
                  data={packageData}
                  eventCategory="talangan"
                  isFromTalangan={true}
                />
              </Fragment>
            ))
          )}
        </div>
      )}

      {/* Pagination - Show skeleton or actual pagination (only on desktop) */}
      {isLoadingSkeleton ? (
        <PaginationSkeleton />
      ) : (
        !isMobile && (
          <CustomPagination
            currentPage={parseInt(searchParams.get('page') || '1', 10)}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        )
      )}
    </div>
  )
}