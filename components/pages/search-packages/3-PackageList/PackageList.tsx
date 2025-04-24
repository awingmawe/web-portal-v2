'use client'

import { CardPackage } from '@/components/shared/CardPackage'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { CardData } from '@/constant/types/PackageProps'
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

interface PackageResultsProps {
  dataPackages: CardData[]
  currentPage: number
  pageSize: number
  total: number
}

export const PackageResults: React.FC<PackageResultsProps> = ({
  dataPackages: initialDataPackages,
  currentPage: initialPage,
  pageSize,
  total: initialTotal,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {
    isLoadingSkeleton,
    isLoading,
    resetFilters,
    packages: packageDataCSR,
    totalPackages: totalCSR,
    isUsingCSRData,
    setIsUsingCSRData,
  } = useFilterProduct()
  const {
    loadMore,
    hasMore,
    loading,
    packages: infinitePackages, // this packages is same like packageDataCSR but in different state
  } = useInfiniteScroll()
  const { lg: isMobile } = useTailwindBreakpoint()

  // Derived values based on data source
  const displayPackages = useMemo(() => {
    return isUsingCSRData ? packageDataCSR : initialDataPackages
  }, [isUsingCSRData, packageDataCSR, initialDataPackages])

  const displayTotal = useMemo(() => {
    return isUsingCSRData ? totalCSR : initialTotal
  }, [isUsingCSRData, totalCSR, initialTotal])

  const currentSort = searchParams.get('sort') || 'price-low' // Default sort

  // Switch to CSR data when filters change
  useEffect(() => {
    if (packageDataCSR && packageDataCSR.length > 0) {
      setIsUsingCSRData(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageDataCSR])

  // Function to reset all filters
  const resetAllFilters = useCallback(() => {
    // 1. Reset the internal state to default values
    resetFilters()

    // 2. Delete all search params
    window.history.pushState({}, '', '/search')

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    return Math.ceil(displayTotal / pageSize)
  }, [displayTotal, pageSize])

  // Create page navigation function
  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', page.toString())
      window.location.href = `${pathname}?${params.toString()}`
    },
    [pathname, searchParams]
  )

  // Render no results component if there are no packages and not loading
  if (displayPackages.length === 0 && !isLoadingSkeleton) {
    return <NoResults resetAllFilters={resetAllFilters} />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results info - Show skeleton or actual header */}
      {isLoadingSkeleton ? (
        <ResultsHeaderSkeleton />
      ) : (
        <ResultsSummary
          resultsCount={displayPackages.length}
          totalCount={displayTotal}
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
                next={loadMore}
                threshold={0.8}
              >
                {hasMore && (
                  <Loader2 className="mx-auto my-4 h-8 w-8 animate-spin" />
                )}
              </InfiniteScroll>
            </>
          ) : (
            displayPackages?.map((packageData, index) => (
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
          currentPage={
            isUsingCSRData
              ? parseInt(searchParams.get('page') || '1', 10)
              : initialPage
          }
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}
    </div>
  )
}
