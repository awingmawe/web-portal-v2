'use client'

import { CardPackage } from '@/components/shared/CardPackage'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { CardData } from '@/constant/types/PackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { Loader2 } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
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
  dataPackages,
  currentPage,
  pageSize,
  total,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isLoadingSkeleton, resetFilters } = useFilterProduct()
  const { loadMore, hasMore, loading, packages } = useInfiniteScroll()
  const { lg } = useTailwindBreakpoint()

  const currentSort = searchParams.get('sort') || 'price-low' // Default sort

  // Function to reset all filters
  const resetAllFilters = useCallback(() => {
    // 1. Reset the internal state to default values
    resetFilters()

    // 2. Navigate to the base URL without any query parameters
    window.location.href = pathname
  }, [pathname, resetFilters])

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
    return Math.ceil(total / pageSize)
  }, [total, pageSize])

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
  if (dataPackages.length === 0 && !isLoadingSkeleton) {
    return <NoResults resetAllFilters={resetAllFilters} />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results info - Show skeleton or actual header */}
      {isLoadingSkeleton ? (
        <ResultsHeaderSkeleton />
      ) : (
        <ResultsSummary
          resultsCount={dataPackages.length}
          totalCount={total}
          currentSort={currentSort}
          createSortUrl={createSortUrl}
        />
      )}

      {/* Package grid */}
      {isLoadingSkeleton ? (
        <PackageGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lg ? (
            <>
              {packages?.map((packageData, index) => (
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
            dataPackages?.map((packageData, index) => (
              <CardPackage
                key={`packages-${packageData.slugPackage}-${index}`}
                data={packageData}
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
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}
    </div>
  )
}
