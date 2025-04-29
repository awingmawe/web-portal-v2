'use client'

import { SearchIcon } from '@/components/icons/search'
import { Button } from '@/components/ui/button'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { formatDateToYYYYMMDD } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'
import AirlineFilter from './AirlineFilter'
import AirportFilter from './AirportFilter'
import DateFilter from './DateFilter'
import RatingFilter from './RatingFilter'

const SearchFilters: React.FC = () => {
  const { resetFilters, isDisabled, isLoading, filters } = useFilterProduct()

  // Reset filter when first load and when back to homepage
  useEffect(() => {
    resetFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Build the search URL with parameters from filters
  const searchUrl = useMemo(() => {
    const params = new URLSearchParams()

    // Add hotel stars if it exists
    if (filters.hotelStars) {
      params.set('hR', filters.hotelStars.toString())
    }

    // Add date range if it exists
    if (filters.dateRange?.from) {
      params.set('sD', formatDateToYYYYMMDD(filters.dateRange.from))
    }

    if (filters.dateRange?.to) {
      params.set('eD', formatDateToYYYYMMDD(filters.dateRange.to))
    }

    // Add airports if they exist
    if (filters.departureAirport?.code) {
      params.set('dptArpt', filters.departureAirport.code)
    }

    if (filters.arrivalAirport?.code) {
      params.set('arrArpt', filters.arrivalAirport.code)
    }

    // Add airline if it exists
    if (filters.airline?.name) {
      params.set('trvl', filters.airline.name)
    }

    // Generate the URL string
    const queryString = params.toString()
    return queryString ? `/search?${queryString}` : '/search'
  }, [filters])

  return (
    <div className="flex w-full items-center justify-between">
      {/* Hotel Stars Filter */}
      <RatingFilter />
      <div className="mx-6 h-10 w-px bg-[#D2D2D1]" />

      {/* Departure Date Filter */}
      <DateFilter whatPage="homepage" />
      <div className="mx-6 h-10 w-px bg-[#D2D2D1]" />

      {/* Airport Filter */}
      <AirportFilter whatPage="homepage" />
      <div className="mx-6 h-10 w-px bg-[#D2D2D1]" />

      {/* Airline Filter */}
      <AirlineFilter whatPage="homepage" />

      {/* Search Button with Link */}
      <div className="flex items-center justify-end">
        <Link href={searchUrl} passHref>
          <Button
            size="xs"
            className="w-[100px] gap-1 py-2 pr-[22px] pl-4"
            disabled={isDisabled}
            isLoading={isLoading}
            id="button-search-widget-homepage"
          >
            <SearchIcon size={24} />
            Cari
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default React.memo(SearchFilters)
