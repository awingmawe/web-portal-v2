/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import RecommendationList from '@/components/pages/search-packages/3-PackageList/RecommendationPackage'
import { CardPackage } from '@/components/shared/CardPackage'
import { CardPackageCompact } from '@/components/shared/CardPackageCompact'
import { CustomPagination } from '@/components/shared/CustomPagination'
import { CustomInfiniteScroll } from '@/components/shared/InfiniteScroll'
import { LOCATION_STORAGE_KEY, PACKAGE_TYPE } from '@/constant/env'
import { CardData } from '@/constant/types/PackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCustomInfiniteScroll } from '@/hooks/common/useInfiniteScroll'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { useGetOrganizationIdFromProviders } from '@/hooks/pembiayaan/useGetMitraPembiayaan'
import { useUniqueSupportedProviders } from '@/hooks/pembiayaan/useGetSupportedProvider'
import { isEmpty } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
  packageReccomendation?: CardData[]
}

export const PackageResults: React.FC<PackageResultsProps> = ({
  isCompact = false,
  packageReccomendation,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
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

  const { lg: isMobile, mounted } = useTailwindBreakpoint()
  const updateQueryParams = useUpdateQueryParams()
  // Didalam list ini terdapat beberapa type
  // 1. Search list umum: semua paket dimunculkan tanpa adanya filter khusus
  // 2. Search list pembiayaan: paket hanya dimunculkan berdasarkan dari provider yang disupport saja
  // - change_package: flow pembiayaan apabila paket yang diajukan kuotanya tidak tersedia dan provider yang diajukannya tidak dapat di filter
  // - pembiayaan: flow pembiayaan ketika user sedang mencari paket yang support pembiayaan berdasarkan provider
  const isChangePackageFlow = searchParams.get('package') === 'change_package'
  const isPembiayaanFlow = searchParams.get('package') === 'pembiayaan'
  const packagePembiayaan = searchParams.get('package')
  const isRecommendationShow = !isPembiayaanFlow && !isChangePackageFlow

  const showBadgeProvider = isPembiayaanFlow || isChangePackageFlow

  const currentSort = searchParams.get('sort') || 'price-low' // Default sort
  const itemsPerPage = 9 // Define your items per page constant

  // Untuk filter dari provider yang berbeda
  const providerFilter = searchParams.get('pV')
  const { isLoading: isLoadingProvider, organizationInstanceId } =
    useGetOrganizationIdFromProviders(providerFilter, isEmpty(providerFilter))

  // Untuk menampilkan paket hanya jika pencarian dari pembiayaan
  const {
    dataProviders,
    uniqueSupportedProviders,
    isLoading: isLoadingSupportedProviders,
  } = useUniqueSupportedProviders(!showBadgeProvider)

  // First, initialize filters from URL
  useEffect(() => {
    initializeFiltersFromURL()
  }, [])

  useEffect(() => {
    if (
      !isLoadingSkeleton &&
      !isLoadingSupportedProviders &&
      !isLoadingProvider &&
      mounted
    ) {
      const currentSort = searchParams.get('sort') || 'price-low'
      const page = parseInt(searchParams.get('page') || '1', 10)
      const type = searchParams.get('type') || PACKAGE_TYPE.UMRAH

      // Build the params object from search params string
      const paramsFilter = buildQueryParams(
        searchParams.toString(),
        currentSort,
        type,
        page,
        uniqueSupportedProviders,
        organizationInstanceId
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
    organizationInstanceId,
    mounted,
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
      uniqueSupportedProviders,
      organizationInstanceId
    )

    loadMore(paramsFilter)
  }, [
    loading,
    hasMore,
    searchParams,
    uniqueSupportedProviders,
    organizationInstanceId,
  ])

  // Function to reset all filters
  const resetAllFilters = useCallback(() => {
    // 1. Reset the internal state to default values
    resetFilters()

    // 2. Clear all search params except for essential ones
    const params = new URLSearchParams(window.location.search)

    for (const key of Array.from(params.keys())) {
      // Always keep 'type' and 'package'
      if (key === 'type' || key === 'package') {
        continue
      }
      // If it's a change_package flow, also keep 'pV'
      if (isChangePackageFlow && key === 'pV') {
        continue
      }
      // Otherwise, delete the key
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }, [resetFilters, router, pathname])

  // Function to create URL with new sort parameter
  const createSortUrl = useCallback(
    (sortValue: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (sortValue === 'organization.location') {
        const storedLocation = localStorage.getItem(LOCATION_STORAGE_KEY)
        if (storedLocation) {
          const { latitude, longitude } = JSON.parse(storedLocation)
          params.set('coordinates', `${latitude},${longitude}`)
        }
      } else {
        // Hapus parameter coordinates jika sortir bukan berdasarkan lokasi
        params.delete('coordinates')
      }

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

  // Combined loading state to prevent glitch
  const isStillLoading =
    isLoadingSkeleton ||
    isLoading ||
    isLoadingProvider ||
    isLoadingSupportedProviders ||
    loading

  // Render no results component if there are no packages and not loading
  if (displayPackages.length === 0 && !isStillLoading) {
    return (
      <div className="flex flex-col gap-12">
        <NoResults resetAllFiltersAction={resetAllFilters} />
        {isRecommendationShow && (
          <RecommendationList
            packageReccomendation={packageReccomendation || []}
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results info - Show skeleton or actual header */}
      {isStillLoading ? (
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
      {isStillLoading ? (
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
                      dataProviders={showBadgeProvider ? dataProviders : []} // kalo lagi flow pembiayaan maka munculkan data providernya supaya ada tag provider di card componentnya
                      isPembiayaan={packagePembiayaan}
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
                    dataProviders={showBadgeProvider ? dataProviders : []} // kalo lagi flow pembiayaan maka munculkan data providernya supaya ada tag provider di card componentnya
                    isPembiayaan={packagePembiayaan}
                  />
                )}
              </Fragment>
            ))
          )}
        </div>
      )}

      {/* Pagination - Show skeleton or actual pagination (only on desktop) */}
      {isStillLoading ? (
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

      {/* Kalo total itemsnya kurang dari 10 munculin package reccomendation dan bukan lagi dalam section pembiayaan*/}
      {totalCSR < 10 && isRecommendationShow && !isStillLoading && (
        <RecommendationList
          packageReccomendation={packageReccomendation || []}
        />
      )}
    </div>
  )
}
