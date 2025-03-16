// components/pages/homepage/SearchFilter/index.tsx
'use client'

import { SearchIcon } from '@/components/icons/search'
import { Button } from '@/components/ui/button'
import { useFilterProduct } from '@/contexts/filter-product-context'
import React, { useEffect } from 'react'
import AirlineFilter from './AirlineFilter'
import AirportFilter from './AirportFilter'
import DateFilter from './DateFilter'
import RatingFilter from './RatingFilter'

const SearchFilters: React.FC = () => {
  const { resetFilters, isDisabled, isLoading, handleSubmit } =
    useFilterProduct()

  // Reset filter when first load and when back to homepage
  useEffect(() => {
    resetFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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

      {/* Search Button */}
      <div className="flex items-center justify-end">
        <Button
          size="xs"
          className="w-[100px] gap-1 py-2 pr-[22px] pl-4"
          disabled={isDisabled}
          onClick={handleSubmit}
          isLoading={isLoading}
          id="button-search-widget-homepage"
        >
          <SearchIcon size={24} />
          Cari
        </Button>
      </div>
    </div>
  )
}

export default React.memo(SearchFilters)
