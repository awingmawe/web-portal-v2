'use client'

import { SearchIcon } from '@/components/icons/search'
// Use component from widget homepage
import AirlineFilter from '@/components/pages/homepage/1-Banner/SearchFilter/AirlineFilter'
import AirportFilter from '@/components/pages/homepage/1-Banner/SearchFilter/AirportFilter'
import DateFilter from '@/components/pages/homepage/1-Banner/SearchFilter/DateFilter'
import { Button } from '@/components/ui/button'
import { useFilterProduct } from '@/contexts/filter-product-context'
import React from 'react'

const SearchFilters: React.FC = () => {
  const { isDisabled, isLoading, handleSubmit, isLoadingSkeleton } =
    useFilterProduct()

  return (
    <div className="flex w-full items-center justify-between px-20 py-3 shadow-[0px_6px_24px_0px_rgba(0,0,0,0.15)]">
      {/* Departure Date Filter */}
      <DateFilter colorIcon="primary-500" whatPage="filter_search" />
      <div className="mx-6 h-10 w-px bg-[#D2D2D1]" />

      {/* Airport Filter */}
      <AirportFilter colorIcon="primary-500" whatPage="filter_search" />
      <div className="mx-6 h-10 w-px bg-[#D2D2D1]" />

      {/* Airline Filter */}
      <AirlineFilter colorIcon="text-primary-500" whatPage="filter_search" />

      {/* Search Button */}
      <div className="flex items-center justify-end">
        <Button
          size="xs"
          className="w-[100px] gap-1 py-2 pr-[22px] pl-4"
          disabled={isDisabled || isLoadingSkeleton}
          onClick={handleSubmit}
          isLoading={isLoading}
          id="button-search-topbar-search"
        >
          <SearchIcon size={24} />
          Cari
        </Button>
      </div>
    </div>
  )
}

export default React.memo(SearchFilters)
