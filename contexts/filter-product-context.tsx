'use client'

import { toast } from '@/components/ui/sonner'
import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { FilterState } from '@/constant/types/FilterProps'
import { CardData } from '@/constant/types/PackageProps'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { useFetchPackage } from '@/hooks/filter-product-hooks/useFetchPackage'
import { formatDateToYYYYMMDD, mapProductsToCardData } from '@/lib/utils'
import { getAirline, getAirports } from '@/services/general-service'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { DateRange } from 'react-day-picker'

// Initial filter state
const initialFilterState: FilterState = {
  hotelStars: 0,
  dateRange: undefined,
  departureAirport: null,
  arrivalAirport: null,
  airline: null,
  // Add new attributes if there's a new state for filter
  hargaMin: '',
  hargaMax: '',
  facilityCode: '',
  section: '',
  tagSlug: '',
  filterName: '',
}

// Define filter property names for individual resets
export type FilterKey = keyof FilterState

interface FilterProductContextType {
  // Combined filter state
  filters: FilterState
  packages: CardData[]
  totalPackages: number
  setFilters: (filter: FilterState) => void

  // Filter state setters
  setHotelStars: (stars: number) => void
  setDateRange: (range: DateRange | undefined) => void
  setDepartureAirport: (airport: Airport) => void
  setArrivalAirport: (airport: Airport) => void
  setAirline: (airline: Airline) => void
  setHargaMin: (price: string) => void
  setHargaMax: (price: string) => void
  setFacilityCode: (code: string) => void
  setSection: (section: string) => void
  setTagSlug: (slug: string) => void
  setFilterName: (filterName: string) => void

  // Reset filter state - full and individual
  resetFilters: (filters?: typeof initialFilterState) => void
  resetFilter: (filterKey: FilterKey, value?: any) => void // New function to reset individual filter

  // Form submission
  isDisabled: boolean
  isUsingCSRData: boolean
  setIsUsingCSRData: (value: boolean) => void
  setIsDisabled: (disabled: boolean) => void
  setIsLoading: (loading: boolean) => void
  isLoading: boolean
  isLoadingSkeleton: boolean
  handleSubmit: () => void
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
  const isInitialRender = useRef(true)

  // Form states
  const [isDisabled, setIsDisabled] = useState<boolean>(initialDisabled)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState<boolean>(true)
  const [packages, setPackages] = useState<CardData[]>([])
  const [totalPackages, setTotalPackages] = useState<number>(0)
  const [isUsingCSRData, setIsUsingCSRData] = useState(false)

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

  const setHargaMin = useCallback((price: string) => {
    setFilters((prev) => ({ ...prev, hargaMin: price }))
  }, [])

  const setHargaMax = useCallback((price: string) => {
    setFilters((prev) => ({ ...prev, hargaMax: price }))
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

  // Reset all filters
  const resetFilters = useCallback((filters = initialFilterState) => {
    setFilters(filters)
  }, [])

  // Reset individual filter
  const resetFilter = useCallback(
    (filterKey: FilterKey, value?: any) => {
      if (filterKey === 'priceRange' && value) {
        // Handle price range reset as a special case
        setHargaMin(value.min)
        setHargaMax(value.max)
      } else {
        setFilters((prev) => ({
          ...prev,
          [filterKey]: initialFilterState[filterKey],
        }))
      }

      if (!isMobile) {
        // Also update the URL if needed
        const urlParamMap: Record<FilterKey, string | null> = {
          hotelStars: 'hR',
          dateRange: null, // Special case - has two params
          departureAirport: 'dptArpt',
          arrivalAirport: 'arrArpt',
          airline: 'trvl',
          hargaMin: 'prMin',
          hargaMax: 'prMax',
          facilityCode: 'fC',
          section: 'sC',
          tagSlug: 'tS',
          filterName: null,
          priceRange: null,
        }
        // Special handling for dateRange which maps to two URL params
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
    [isMobile, setHargaMax, setHargaMin, updateQueryParams]
  )

  // Set default value states filter from search params
  // This one is for SSR fetching when first load
  // The package list is already fetched in the server side /search/page.tsx
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const newFilters = { ...initialFilterState }
      let hasUpdates = false

      // Set hotel stars if exists
      const starsParam = params.get('hR')
      if (starsParam) {
        newFilters.hotelStars = parseInt(starsParam, 10)
        hasUpdates = true
      }

      // Set date range if exists
      const departureDateParam = params.get('sD')
      const returnDateParam = params.get('eD')
      if (departureDateParam || returnDateParam) {
        const range: DateRange = {
          from: undefined,
        }
        if (departureDateParam) {
          // Parse the YYYY-MM-DD format
          range.from = new Date(departureDateParam)
        }
        if (returnDateParam) {
          // Parse the YYYY-MM-DD format
          range.to = new Date(returnDateParam)
        }
        newFilters.dateRange = range
        hasUpdates = true
      }

      // Set price min if exists
      const minPriceParam = params.get('prMin')
      if (minPriceParam) {
        newFilters.hargaMin = minPriceParam
        hasUpdates = true
      }

      // Set price max if exists
      const maxPriceParam = params.get('prMax')
      if (maxPriceParam) {
        newFilters.hargaMax = maxPriceParam
        hasUpdates = true
      }

      // Set facility code if exists
      const facilityCodeParam = params.get('fC')
      if (facilityCodeParam) {
        newFilters.facilityCode = facilityCodeParam
        hasUpdates = true
      }

      // Set section if exists
      const sectionParam = params.get('sC')
      if (sectionParam) {
        newFilters.section = sectionParam
        hasUpdates = true
      }

      // Set tag slug if exists
      const tagSlugParam = params.get('tS')
      if (tagSlugParam) {
        newFilters.tagSlug = tagSlugParam
        hasUpdates = true
      }

      // Apply non-async updates right away
      if (hasUpdates) {
        setFilters((prev) => ({ ...prev, ...newFilters }))
      }

      // Async updates for airports and airline
      const promises = []

      // Set departure airport
      const departureAirportParam = params.get('dptArpt')
      if (departureAirportParam) {
        promises.push(
          fetchAirportByCode(departureAirportParam).then((airport) => {
            if (airport) {
              setFilters((prev) => ({ ...prev, departureAirport: airport }))
            }
          })
        )
      }

      // Set arrival airport
      const arrivalAirportParam = params.get('arrArpt')
      if (arrivalAirportParam) {
        promises.push(
          fetchAirportByCode(arrivalAirportParam).then((airport) => {
            if (airport) {
              setFilters((prev) => ({ ...prev, arrivalAirport: airport }))
            }
          })
        )
      }

      // Set airline
      const airlineParam = params.get('trvl')
      if (airlineParam) {
        promises.push(
          fetchAirlineByName(airlineParam).then((airline) => {
            if (airline) {
              setFilters((prev) => ({ ...prev, airline: airline }))
            }
          })
        )
      }

      // Wait for all promises to resolve or turn off loading after timeout
      Promise.all(promises).finally(() => {
        setTimeout(() => {
          setIsLoadingSkeleton(false)
        }, 1000)
      })
    }
  }, [])

  // Update value filter to fetch packageList
  // This is for client side
  const buildQueryParams = useCallback(() => {
    return {
      query: undefined, // Add if you have a search query
      startDate: filters.dateRange?.from
        ? formatDateToYYYYMMDD(filters.dateRange.from)
        : undefined,
      endDate: filters.dateRange?.to
        ? formatDateToYYYYMMDD(filters.dateRange.to)
        : undefined,
      departureFromAirportCode: filters.departureAirport?.code || undefined,
      arrivalFromAirportCode: filters.arrivalAirport?.code || undefined,
      departureAirlineName: filters.airline?.name || undefined,
      minPrice: filters.hargaMin.replace(/\D/g, '') || undefined,
      maxPrice: filters.hargaMax.replace(/\D/g, '') || undefined,
      hotelRating: filters.hotelStars ? String(filters.hotelStars) : undefined,
      facilityCode: filters.facilityCode || undefined,
      section: filters.section || undefined,
      tagSlug: filters.tagSlug || undefined,
    }
  }, [filters])

  const fetchPackageData = useCallback(
    async (page = 1) => {
      setIsLoading(true)
      try {
        // Get query params based on current filters
        const params = buildQueryParams()

        // Fetch data using the hook
        const data = await fetchPackage(params, page)
        const mappedData = mapProductsToCardData(data)

        console.log(data)

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

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    // Fetch data whenever filters change, reset to page 1
    if (!isMobile) {
      fetchPackageData(1)
    }
  }, [fetchPackageData, filters, isMobile])

  const fetchAirportByCode = async (code: string): Promise<Airport | null> => {
    try {
      const data = await getAirports({
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
      const data = await getAirline({
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

      // Set loading state
      setIsLoading(true)

      // Collect all filter values as keys and values arrays for updateQueryParams
      const keys: string[] = []
      const values: string[] = []

      // Add all parameters that need to be included in the URL
      if (hotelStars) {
        keys.push('hR')
        values.push(hotelStars.toString())
      }

      if (dateRange?.from) {
        keys.push('sD')
        values.push(formatDateToYYYYMMDD(dateRange.from)) // Format as YYYY-MM-DD
      }

      if (dateRange?.to) {
        keys.push('eD')
        values.push(formatDateToYYYYMMDD(dateRange.to)) // Format as YYYY-MM-DD
      }

      if (departureAirport?.code) {
        keys.push('dptArpt')
        values.push(departureAirport.code)
      }

      if (arrivalAirport?.code) {
        keys.push('arrArpt')
        values.push(arrivalAirport.code)
      }

      if (airline?.name) {
        keys.push('trvl')
        values.push(airline.name)
      }

      pushEvent({
        name: 'submit_filter',
        category: 'umrah',
        data: {
          filterName: filters.filterName,
          hotelRating: filters.hotelStars,
          dateRangeFrom: filters.dateRange?.from,
          dateRangeTo: filters.dateRange?.to,
          airport: filters.departureAirport?.name,
          airline: filters.airline?.name,
        },
      })

      // Simulate API call with setTimeout
      setTimeout(() => {
        // Reset loading
        setIsLoading(false)

        // Navigate to search results page
        // Only update the query parameters if we have keys/values to update
        updateQueryParams(keys, values, '/search')
        fetchPackageData(1) // Fetch packages with updated filters
      }, 1000)
    } catch (err) {
      // Handle errors
      toast.error(
        err
          ? (err as string)
          : 'Terjadi kesalahan pada server. Mohon ulangi beberapa saat lagi.'
      )
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const value = {
    // Combined filter state
    filters,
    packages,
    totalPackages,
    setFilters,

    // Filter state setters
    setHotelStars,
    setDateRange,
    setDepartureAirport,
    setArrivalAirport,
    setAirline,
    setHargaMin,
    setHargaMax,
    setFacilityCode,
    setSection,
    setTagSlug,
    setFilterName,

    // Reset filter state - full and individual
    resetFilters,
    resetFilter,

    // Form states
    isDisabled,
    isUsingCSRData,
    setIsUsingCSRData,
    setIsDisabled,
    setIsLoading,
    isLoading,
    isLoadingSkeleton,
    handleSubmit,
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
