/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { toast } from '@/components/ui/sonner'
import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { FilterState, initialFilterState } from '@/constant/types/FilterProps'
import { CardData } from '@/constant/types/PackageProps'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { useFetchPackage } from '@/hooks/filter-product-hooks/useFetchPackage'
import { formatDateToYYYYMMDD, mapProductsToCardData } from '@/lib/utils'
import { getAirlineV2, getAirportsV2 } from '@/services/general-service'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { DateRange } from 'react-day-picker'

// Define filter property names for individual resets
export type FilterKey = keyof FilterState

interface FilterProductContextType {
  // Combined filter state
  filters: FilterState
  searchQuery: string
  packages: CardData[]
  totalPackages: number
  setFilters: (filter: FilterState) => void
  setSearchQuery: (query: string) => void
  setPackages: (packages: CardData[]) => void

  // Filter state setters
  setHotelStars: (stars: number) => void
  setDateRange: (range: DateRange | undefined) => void
  setDepartureAirport: (airport: Airport) => void
  setArrivalAirport: (airport: Airport) => void
  setAirline: (airline: Airline) => void
  setPriceRange: (range: any) => void
  setFacilityCode: (code: string) => void
  setSection: (section: string) => void
  setTagSlug: (slug: string) => void
  setFilterName: (filterName: string) => void

  // Reset filter state - full and individual
  resetFilters: (filters?: typeof initialFilterState) => void
  resetFilter: (filterKey: FilterKey) => void // New function to reset individual filter

  // Form submission
  isDisabled: boolean
  setIsDisabled: (disabled: boolean) => void
  setIsLoading: (loading: boolean) => void
  setIsLoadingSkeleton: (loading: boolean) => void
  isLoading: boolean
  isLoadingSkeleton: boolean
  handleSubmit: () => void
  buildQueryParams: (
    searchParamsString: any,
    sortValue: any,
    type: string,
    page: number
  ) => any
  initializeFiltersFromURL: (needLoading?: boolean) => void
  fetchPackageData: (params?: any) => void
}

const FilterProductContext = createContext<
  FilterProductContextType | undefined
>(undefined)

export const FilterProductProvider: React.FC<{
  children: React.ReactNode
  initialDisabled?: boolean
}> = ({ children, initialDisabled = false }) => {
  // Hooks
  const updateQueryParams = useUpdateQueryParams()
  const { pushEvent } = useEventTracker()
  const { fetchPackage } = useFetchPackage()
  const { lg: isMobile } = useTailwindBreakpoint()

  // Combined filter state
  const [filters, setFilters] = useState<FilterState>(initialFilterState)

  // Form states
  const [isDisabled, setIsDisabled] = useState<boolean>(initialDisabled)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState<boolean>(true)
  const [packages, setPackages] = useState<CardData[]>([])
  const [totalPackages, setTotalPackages] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [previousPage, setPreviousPage] = useState<string | null>(null)

  // Filter state setters
  const setHotelStars = useCallback((stars: number) => {
    setFilters((prev) => ({ ...prev, hotelStars: stars }))
  }, [])

  const setDateRange = useCallback((range: DateRange | undefined) => {
    setFilters((prev) => ({ ...prev, dateRange: range }))
  }, [])

  const setDepartureAirport = useCallback((airport: Airport) => {
    setFilters((prev) => ({ ...prev, departureAirport: airport }))
  }, [])

  const setArrivalAirport = useCallback((airport: Airport) => {
    setFilters((prev) => ({ ...prev, arrivalAirport: airport }))
  }, [])

  const setAirline = useCallback((airline: Airline) => {
    setFilters((prev) => ({ ...prev, airline: airline }))
  }, [])

  const setPriceRange = useCallback((range: any) => {
    setFilters((prev) => ({ ...prev, priceRange: range }))
  }, [])

  const setFacilityCode = useCallback((code: string) => {
    setFilters((prev) => ({ ...prev, facilityCode: code }))
  }, [])

  const setSection = useCallback((section: string) => {
    setFilters((prev) => ({ ...prev, section: section }))
  }, [])

  const setTagSlug = useCallback((slug: string) => {
    setFilters((prev) => ({ ...prev, tagSlug: slug }))
  }, [])

  const setFilterName = useCallback((filterName: string) => {
    setFilters((prev) => ({ ...prev, filterName }))
  }, [])

  const setDpRange = useCallback((filterName: string) => {
    setFilters((prev) => ({ ...prev, filterName }))
  }, [])

  // Reset all filters
  const resetFilters = useCallback((filters = initialFilterState) => {
    setFilters(filters)
    setSearchQuery('')
  }, [])

  // Reset individual filter
  const resetFilter = useCallback(
    (filterKey: FilterKey) => {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: initialFilterState[filterKey],
      }))

      if (!isMobile) {
        // Also update the URL if needed
        const urlParamMap: Record<FilterKey, string | null> = {
          hotelStars: 'hR',
          dateRange: null, // Special case - has two params
          departureAirport: 'dptArpt',
          arrivalAirport: 'arrArpt',
          airline: 'trvl',
          facilityCode: 'fC',
          section: 'section',
          tagSlug: 'tS',
          type: 'type',
          query: '',
          filterName: null,
          priceRange: null,
          dpRange: null,
        }
        if (filterKey === 'dateRange') {
          // Remove both start and end date params
          updateQueryParams(['sD', 'eD'], ['', ''])
          return
        }

        const urlParam = urlParamMap[filterKey]
        if (urlParam) {
          // Remove the param from URL
          updateQueryParams([urlParam], [''])
        }
      }
    },
    [isMobile, updateQueryParams]
  )

  // Set default value states filter from search params
  // Function to initialize filters from URL parameters
  const initializeFiltersFromURL = useCallback(
    async (needLoading: boolean = true) => {
      if (typeof window === 'undefined') return

      try {
        if (needLoading) {
          setIsLoadingSkeleton(true)
        }
        const params = new URLSearchParams(window.location.search)

        // Create a copy of initial filters to build complete state
        const updatedFilters = { ...initialFilterState }

        // Process URL parameters for simple values
        // Hotel stars
        const starsParam = params.get('hR')
        if (starsParam) {
          updatedFilters.hotelStars = parseInt(starsParam, 10)
        }

        // Date range
        const departureDateParam = params.get('sD')
        const returnDateParam = params.get('eD')
        if (departureDateParam || returnDateParam) {
          const range: DateRange = { from: undefined }
          if (departureDateParam) {
            range.from = new Date(departureDateParam)
          }
          if (returnDateParam) {
            range.to = new Date(returnDateParam)
          }
          updatedFilters.dateRange = range
        }

        // Initialize price range
        updatedFilters.priceRange = {
          hargaMin: params.get('prMin') || '',
          hargaMax: params.get('prMax') || '',
        }

        // Other params
        updatedFilters.facilityCode = params.get('fC') || ''
        updatedFilters.section = params.get('section') || ''
        updatedFilters.tagSlug = params.get('tS') || ''
        updatedFilters.type = params.get('type') || 'umrah'

        // Handle complex objects that need async fetching
        const promises = []

        // Departure airport
        const departureAirportParam = params.get('dptArpt')
        if (departureAirportParam) {
          const departurePromise = fetchAirportByCode(
            departureAirportParam
          ).then((airport) => {
            if (airport) updatedFilters.departureAirport = airport
          })
          promises.push(departurePromise)
        }

        // Arrival airport
        const arrivalAirportParam = params.get('arrArpt')
        if (arrivalAirportParam) {
          const arrivalPromise = fetchAirportByCode(arrivalAirportParam).then(
            (airport) => {
              if (airport) updatedFilters.arrivalAirport = airport
            }
          )
          promises.push(arrivalPromise)
        }

        // Airline
        const airlineParam = params.get('trvl')
        if (airlineParam) {
          const airlinePromise = fetchAirlineByName(airlineParam).then(
            (airline) => {
              if (airline) updatedFilters.airline = airline
            }
          )
          promises.push(airlinePromise)
        }

        // Wait for all async operations to complete
        await Promise.all(promises)

        // Set all filter values at once to prevent multiple rerenders
        setFilters(updatedFilters)

        // Get search query if it exists
        const queryParam = params.get('query')
        if (queryParam) {
          setSearchQuery(queryParam)
        }

        const page = params.get('page')
        const pageHasChanged = page !== previousPage

        // Update the previous page value for next comparison
        if (pageHasChanged && page !== null) {
          setPreviousPage(page)
          // Scroll to top only when page has actually changed
          window.scrollTo({
            top: window.scrollY,
            behavior: 'smooth',
          })
        }
      } catch (error) {
        console.error('Error initializing filters from URL:', error)
      } finally {
        // Turn off loading skeleton after all processing is done
        setIsLoadingSkeleton(false)
      }
    },
    []
  )

  // Update value filter to fetch packageList
  // This is for client side
  // Add this to your FilterProductContext provider
  const buildQueryParams = useCallback(
    (
      searchParamsString: string,
      sortValue: string = 'price-low',
      type: string = 'umrah',
      page: number = 1
    ) => {
      const params = new URLSearchParams(searchParamsString)
      const queryObject: Record<string, any> = {
        sortParam: sortValue,
        type,
        page,
      }

      // Extract query/search term
      if (params.has('query')) {
        queryObject.query = params.get('query')
      }

      // Extract date range
      if (params.has('sD')) {
        queryObject.startDate = params.get('sD')
      }
      if (params.has('eD')) {
        queryObject.endDate = params.get('eD')
      }

      // Extract airports
      if (params.has('dptArpt')) {
        queryObject.departureFromAirportCode = params.get('dptArpt')
      }
      if (params.has('arrArpt')) {
        queryObject.arrivalFromAirportCode = params.get('arrArpt')
      }

      // Extract airline
      if (params.has('trvl')) {
        queryObject.departureAirlineName = params.get('trvl')
      }

      // Extract price range
      if (params.has('prMin')) {
        queryObject.minPrice = params.get('prMin')
      }
      if (params.has('prMax')) {
        queryObject.maxPrice = params.get('prMax')
      }

      // Extract hotel rating
      if (params.has('hR')) {
        queryObject.hotelRating = params.get('hR')
      }

      // Extract facility codes
      if (params.has('fC')) {
        queryObject.facilityCode = params.get('fC')
      }

      // Extract section
      if (params.has('section')) {
        queryObject.section = params.get('section')
      }

      // Extract tag slug
      if (params.has('tS')) {
        queryObject.tagSlug = params.get('tS')
      }

      if (params.has('dpMin')) {
        queryObject.minDp = params.get('dpMin')
      }
      if (params.has('dpMax')) {
        queryObject.maxDp = params.get('dpMax')
      }

      // Extract type
      if (params.has('type')) {
        queryObject.type = params.get('type')
      }

      return queryObject
    },
    []
  )

  const fetchPackageData = useCallback(
    async (params?: any) => {
      setIsLoading(true)
      try {
        // Fetch data using the hook
        const data = await fetchPackage(params)

        const mappedData = mapProductsToCardData(data)

        // Update state
        setPackages(mappedData)
        setTotalPackages(data.total)
      } catch (err) {
        console.error('Error fetching packages:', err)
        toast.error('Failed to load packages. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [buildQueryParams, fetchPackage]
  )

  const fetchAirportByCode = async (code: string): Promise<Airport | null> => {
    try {
      const data = await getAirportsV2({
        page: 1,
        size: 1,
        search: code,
      })
      return data.results[0] || null
    } catch (error) {
      console.error('Error fetching airport:', error)
      return null
    }
  }

  const fetchAirlineByName = async (name: string): Promise<Airline | null> => {
    try {
      const data = await getAirlineV2({
        page: 1,
        size: 1,
        search: name,
      })
      return data.results[0] || null
    } catch (error) {
      console.error('Error fetching airline:', error)
      return null
    }
  }

  // Submit handler
  const handleSubmit = useCallback(() => {
    try {
      const {
        hotelStars,
        dateRange,
        departureAirport,
        arrivalAirport,
        airline,
      } = filters

      setIsLoading(true)

      // Define all possible filter keys that we want to manage
      const filterKeys = ['hR', 'sD', 'eD', 'dptArpt', 'arrArpt', 'trvl']
      const filterValues: string[] = []

      // Always include all filter keys, use empty string to remove parameters
      filterValues.push(hotelStars ? hotelStars.toString() : '') // hR
      filterValues.push(
        dateRange?.from ? formatDateToYYYYMMDD(dateRange.from) : ''
      ) // sD
      filterValues.push(dateRange?.to ? formatDateToYYYYMMDD(dateRange.to) : '') // eD
      filterValues.push(departureAirport?.code || '') // dptArpt
      filterValues.push(arrivalAirport?.code || '') // arrArpt
      filterValues.push(airline?.name || '') // trvl

      // Always reset page to 1 when filters are applied
      filterKeys.push('page')
      filterValues.push('1')

      // Optional: Add analytics tracking
      pushEvent({
        name: 'submit_filter',
        category: 'umrah',
        data: {
          hotelRating: hotelStars || null,
          dateRangeFrom: dateRange?.from
            ? formatDateToYYYYMMDD(dateRange.from)
            : null,
          dateRangeTo: dateRange?.to
            ? formatDateToYYYYMMDD(dateRange.to)
            : null,
          departureAirport: departureAirport?.name || null,
          arrivalAirport: arrivalAirport?.name || null,
          airline: airline?.name || null,
        },
      })

      const pathName = window.location.pathname

      updateQueryParams(filterKeys, filterValues, pathName)
    } catch (err) {
      // Handle errors
      toast.error(
        err
          ? (err as string)
          : 'Terjadi kesalahan pada server. Mohon ulangi beberapa saat lagi.'
      )
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }, [filters, updateQueryParams])

  const value = {
    // Combined filter state
    filters,
    searchQuery,
    packages,
    totalPackages,
    setFilters,
    setSearchQuery,
    setPackages,

    // Filter state setters
    setHotelStars,
    setDateRange,
    setDepartureAirport,
    setArrivalAirport,
    setAirline,
    setPriceRange,
    setFacilityCode,
    setSection,
    setTagSlug,
    setFilterName,
    setDpRange,
    // Reset filter state - full and individual
    resetFilters,
    resetFilter,

    // Form states
    isDisabled,
    setIsDisabled,
    setIsLoading,
    setIsLoadingSkeleton,
    isLoading,
    isLoadingSkeleton,
    handleSubmit,
    buildQueryParams,
    initializeFiltersFromURL,
    fetchPackageData,
  }

  return (
    <FilterProductContext.Provider value={value}>
      {children}
    </FilterProductContext.Provider>
  )
}

// Custom hook to use the context
export const useFilterProduct = () => {
  const context = useContext(FilterProductContext)
  if (context === undefined) {
    throw new Error(
      'useFilterProduct must be used within a FilterProductProvider'
    )
  }
  return context
}
