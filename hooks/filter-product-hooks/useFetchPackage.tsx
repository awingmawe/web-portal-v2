// hooks/filter-product-hooks/useFetchPackage.ts
import { getPackageList } from '@/services/umrah-service'
import { useCallback } from 'react'

export function useFetchPackage() {
  // Function to fetch packages with filter params
  const fetchPackage = useCallback(
    async (queryParams: any, page = 1, size = 9) => {
      try {
        // Extract the sort param to determine order and orderBy
        const sortParam = queryParams.sortParam || 'price-low'

        // Determine sort order and field
        let orderBy = 'packageVariant.priceQuad'
        let order = 'asc'

        if (sortParam === 'price-low') {
          orderBy = 'packageVariant.priceQuad'
          order = 'asc'
        } else if (sortParam === 'price-high') {
          orderBy = 'packageVariant.priceDouble'
          order = 'desc'
        } else if (sortParam === 'depart-early') {
          orderBy = 'packageVariant.departureDate'
          order = 'asc'
        } else if (sortParam === 'depart-late') {
          orderBy = 'packageVariant.departureDate'
          order = 'desc'
        }

        // Prepare API parameters
        const apiParams = {
          page,
          size,
          orderBy,
          order,
          [`search`]: queryParams.query ? `%${queryParams.query}%` : undefined,
          startDate: queryParams.startDate,
          endDate: queryParams.endDate,
          departureFromAirportCode: queryParams.departureFromAirportCode,
          arrivalFromAirportCode: queryParams.arrivalFromAirportCode,
          departureAirlineName: queryParams.departureAirlineName,
          minPrice: queryParams.minPrice,
          maxPrice: queryParams.maxPrice,
          hotelRating: queryParams.hotelRating,
          facilityCode: queryParams.facilityCode,
          section: queryParams.section,
          tagSlug: queryParams.tagSlug,
        }

        const response = await getPackageList(apiParams)
        return response
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : 'Failed to fetch package list'
        )
      }
    },
    []
  )

  return {
    fetchPackage,
  }
}
