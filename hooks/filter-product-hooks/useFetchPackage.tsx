// hooks/filter-product-hooks/useFetchPackage.ts
import { getPackageList } from '@/services/umrah-service'
import { useCallback } from 'react'

export function useFetchPackage() {
  // Function to fetch packages with filter params
  const fetchPackage = useCallback(async (queryParams: any, size = 9) => {
    try {
      // Extract the sort param to determine order and orderBy
      const sortParam = queryParams.sortParam || 'price-low'

      // Determine sort order and field
      let orderBy
      let filterPrice
      let order = 'asc'

      if (sortParam === 'price-low') {
        filterPrice = 'lowest-price'
      } else if (sortParam === 'price-high') {
        filterPrice = 'highest-price'
      } else if (sortParam === 'depart-early') {
        orderBy = 'packageVariant.departureDate'
        order = 'asc'
      } else if (sortParam === 'depart-late') {
        orderBy = 'packageVariant.departureDate'
        order = 'desc'
      }

      // Prepare API parameters
      const apiParams = {
        page: queryParams.page || 1,
        size,
        orderBy,
        filterPrice,
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
        minDpAmount: queryParams.minDp,
        maxDpAmount: queryParams.maxDp,
      }

      const response = await getPackageList(apiParams)
      return response
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to fetch package list'
      )
    }
  }, [])

  return {
    fetchPackage,
  }
}
