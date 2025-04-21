/* eslint-disable react-hooks/exhaustive-deps */
import { CardData } from '@/constant/types/PackageProps'
import { mapProductsToCardData } from '@/lib/utils'
import { getPackageList } from '@/services/umrah-service'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface UseSearchParams {
  pageSize?: number
}

export function useInfiniteScroll({ pageSize = 9 }: UseSearchParams = {}) {
  const searchParams = useSearchParams()

  // Keep track of current page
  const [page, setPage] = useState(1)

  // State for packages data
  const [packages, setPackages] = useState<CardData[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)

  // Cache the search params values to prevent unnecessary refetches
  const query = searchParams.get('query') || undefined
  const endDate = searchParams.get('eD') || undefined
  const startDate = searchParams.get('sD') || undefined
  const departureFromAirportCode = searchParams.get('dptArpt') || undefined
  const arrivalFromAirportCode = searchParams.get('arrArpt') || undefined
  const departureAirlineName = searchParams.get('trvl') || undefined
  const minPrice = searchParams.get('prMin') || undefined
  const maxPrice = searchParams.get('prMax') || undefined
  const hotelRating = searchParams.get('hR') || undefined
  const facilityCode = searchParams.get('fC') || undefined
  const section = searchParams.get('sC') || undefined
  const tagSlug = searchParams.get('tS') || undefined
  const sortParam = searchParams.get('sort') || 'price-low'

  // Determine sort order and field based on sort parameter
  const getSortParams = useCallback(() => {
    let orderBy = 'packageVariant.priceQuad' // Default sort field
    let order = 'asc' // Default sort order

    // Price sorting
    if (sortParam === 'price-low') {
      orderBy = 'packageVariant.priceQuad'
      order = 'asc'
    } else if (sortParam === 'price-high') {
      orderBy = 'packageVariant.priceDouble'
      order = 'desc'
    }
    // Departure date sorting
    else if (sortParam === 'depart-early') {
      orderBy = 'packageVariant.departureDate'
      order = 'asc'
    } else if (sortParam === 'depart-late') {
      orderBy = 'packageVariant.departureDate'
      order = 'desc'
    }

    return { orderBy, order }
  }, [sortParam])

  // Function to fetch airports
  const fetchPackage = useCallback(
    async (pageNum: number) => {
      try {
        const { orderBy, order } = getSortParams()

        const response = await getPackageList({
          page: pageNum,
          size: pageSize,
          orderBy,
          order,
          [`search`]: query ? `%${query}%` : undefined,
          startDate,
          endDate,
          departureFromAirportCode,
          arrivalFromAirportCode,
          departureAirlineName,
          minPrice,
          maxPrice,
          hotelRating,
          facilityCode,
          section,
          tagSlug,
        })
        return response
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch package list')
        )
        return { results: [], total: 0 }
      }
    },
    [
      arrivalFromAirportCode,
      departureAirlineName,
      departureFromAirportCode,
      endDate,
      facilityCode,
      hotelRating,
      maxPrice,
      minPrice,
      pageSize,
      query,
      section,
      startDate,
      tagSlug,
    ]
  )

  useEffect(() => {
    const loadInitialData = async () => {
      setInitialLoading(true)

      const data = await fetchPackage(1)
      setPackages(mapProductsToCardData(data))
      setHasMore(data.results.length < data.total)
      setPage(1)

      setTimeout(() => setInitialLoading(false), 500)
    }

    loadInitialData()
  }, [])

  // Function to load more packages
  const loadMore = useCallback(async () => {
    if (loading) return

    setLoading(true)
    const nextPage = page + 1
    const data = await fetchPackage(nextPage)

    if (data.results.length > 0) {
      setPackages((prev) => [...prev, ...mapProductsToCardData(data)])
      setPage(nextPage)
    }

    setHasMore(packages.length + data.results.length < data.total)
    setLoading(false)
  }, [page])

  return {
    packages,
    loading,
    hasMore,
    error,
    loadMore,
    initialLoading,
  }
}
