/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CardPackage } from '@/components/shared/CardPackage'
import { CardPackageCompact } from '@/components/shared/CardPackageCompact'
import { CustomPagination } from '@/components/shared/CustomPagination'
import { CustomInfiniteScroll } from '@/components/shared/InfiniteScroll'
import { PACKAGE_TYPE } from '@/constant/env'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCustomInfiniteScroll } from '@/hooks/common/useInfiniteScroll'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { useUniqueSupportedProviders } from '@/hooks/pembiayaan/useGetSupportedProvider'
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
  const itemsPerPage = 9 // Define your items per page constant
  const packagePembiayaan = searchParams.get('package')
  const {
    dataProviders,
    uniqueSupportedProviders,
    isLoading: isLoadingSupportedProviders,
  } = useUniqueSupportedProviders(packagePembiayaan !== 'pembiayaan')

  // First, initialize filters from URL
  useEffect(() => {
    initializeFiltersFromURL()
  }, [])

  useEffect(() => {
    if (!isLoadingSkeleton && !isLoadingSupportedProviders) {
      const currentSort = searchParams.get('sort') || 'price-low'
      const page = parseInt(searchParams.get('page') || '1', 10)
      const type = searchParams.get('type') || PACKAGE_TYPE.UMRAH

      // Build the params object from search params string
      const paramsFilter = buildQueryParams(
        searchParams.toString(),
        currentSort,
        type,
        page,
        uniqueSupportedProviders
      )

      initializeFiltersFromURL(false)

      if (isMobile) {
        fetchInitialPackages(paramsFilter)
      } else {
        fetchPackageData(paramsFilter)
      }
    }
  }, [
    isLoadingSkeleton,
    currentSort,
    searchParams,
    isMobile,
    uniqueSupportedProviders,
  ])

  // Improved loadMoreData function that checks loading/hasMore status first
  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return

    const currentSort = searchParams.get('sort') || 'price-low'
    const page = parseInt(searchParams.get('page') || '1', 10) + 1
    const type = searchParams.get('type') || PACKAGE_TYPE.UMRAH

    // Build the params object from search params string
    const paramsFilter = buildQueryParams(
      searchParams.toString(),
      currentSort,
      type,
      page,
      uniqueSupportedProviders
    )

    loadMore(paramsFilter)
  }, [loading, hasMore, searchParams, uniqueSupportedProviders])

  // Function to reset all filters
  const resetAllFilters = useCallback(() => {
    // 1. Reset the internal state to default values
    resetFilters()

    // 2. Clear all search params except type and package
    const params = new URLSearchParams(window.location.search)
    for (const key of Array.from(params.keys())) {
      if (key !== 'type' && key !== 'package') {
        params.delete(key)
      }
    }
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    )
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
    return Math.ceil(totalCSR / itemsPerPage)
  }, [totalCSR])

  // Calculate results display info
  const resultsDisplayInfo = useMemo(() => {
    if (isMobile) {
      // For mobile infinite scroll, show cumulative count
      return {
        displayCount: infinitePackages.length,
        isRange: false,
      }
    } else {
      // For desktop pagination, calculate the range
      const currentPage = parseInt(searchParams.get('page') || '1', 10)
      const startItem = (currentPage - 1) * itemsPerPage + 1
      const endItem = Math.min(currentPage * itemsPerPage, totalCSR)

      return {
        startItem,
        endItem,
        isRange: true,
      }
    }
  }, [isMobile, infinitePackages.length, searchParams, totalCSR])

  // Create page navigation function
  const goToPage = useCallback(
    (page: number) => {
      updateQueryParams(['page'], [page.toString()])
      window.scrollTo(0, 0)
    },
    [updateQueryParams]
  )

  // Get the actual package data based on the current view mode
  const displayPackages = isMobile ? infinitePackages : packageDataCSR

  // Render no results component if there are no packages and not loading
  if (displayPackages.length === 0 && !isLoadingSkeleton && !isLoading) {
    return <NoResults resetAllFiltersAction={resetAllFilters} />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results info - Show skeleton or actual header */}
      {isLoadingSkeleton || isLoadingSupportedProviders ? (
        <ResultsHeaderSkeleton />
      ) : (
        <ResultsSummary
          resultsDisplayInfo={resultsDisplayInfo}
          totalCount={totalCSR}
          currentSort={currentSort}
          createSortUrlAction={createSortUrl}
        />
      )}

      {/* Package grid */}
      {isLoadingSkeleton || isLoading || isLoadingSupportedProviders ? (
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
                    <CardPackage
                      data={packageData}
                      eventCategory="search"
                      dataProviders={packagePembiayaan ? dataProviders : []}
                    />
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
                  <CardPackage
                    data={packageData}
                    eventCategory="search"
                    dataProviders={packagePembiayaan ? dataProviders : []}
                  />
                )}
              </Fragment>
            ))
          )}
        </div>
      )}

      {/* Pagination - Show skeleton or actual pagination (only on desktop) */}
      {isLoadingSkeleton || isLoadingSupportedProviders ? (
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
