/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CardPackage } from '@/components/shared/CardPackage'
import { CardPackageCompact } from '@/components/shared/CardPackageCompact'
import { CustomPagination } from '@/components/shared/CustomPagination'
import { CustomInfiniteScroll } from '@/components/shared/InfiniteScroll'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCustomInfiniteScroll } from '@/hooks/common/useInfiniteScroll'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { ResultsSummary } from './HeaderPackageList'
import { NoResults } from './NoResultPackageList'
import {
  PackageGridSkeleton,
  PaginationSkeleton,
  ResultsHeaderSkeleton,
} from './SkeletonPackageList'
export interface PackageResultsProps {
  isCompact?: boolean
}

export const PackageResults: React.FC<PackageResultsProps> = ({
  isCompact = false,
}) => {
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
  }, [isLoadingSkeleton, currentSort, searchParams, isMobile])

  // Improved loadMoreData function that checks loading/hasMore status first
  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return

    const currentSort = searchParams.get('sort') || 'price-low'
    const page = parseInt(searchParams.get('page') || '1', 10) + 1

    // Build the params object from search params string
    const paramsFilter = buildQueryParams(
      searchParams.toString(),
      currentSort,
      page
    )

    loadMore(paramsFilter)
  }, [searchParams, loadMore, loading, hasMore, buildQueryParams])

  // Function to reset all filters
  const resetAllFilters = useCallback(() => {
    // 1. Reset the internal state to default values
    resetFilters()

    // 2. Delete all search params
    window.history.pushState({}, '', window.location.pathname)
  }, [resetFilters])

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
          createSortUrl={createSortUrl}
        />
      )}

      {/* Package grid */}
      {isLoadingSkeleton || isLoading ? (
        <PackageGridSkeleton />
      ) : (
        <div
          className={`${isCompact ? 'grid grid-cols-1 gap-10' : 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'} `}
        >
          {isMobile ? (
            // Mobile view with infinite scroll
            <>
              {infinitePackages?.map((packageData, index) => (
                <Fragment key={`packages-${packageData.slugPackage}-${index}`}>
                  {isCompact ? (
                    <CardPackageCompact
                      data={packageData}
                      eventCategory="search"
                    />
                  ) : (
                    <CardPackage data={packageData} eventCategory="search" />
                  )}
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
                {isCompact ? (
                  <CardPackageCompact
                    data={packageData}
                    eventCategory="search"
                  />
                ) : (
                  <CardPackage data={packageData} eventCategory="search" />
                )}
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
