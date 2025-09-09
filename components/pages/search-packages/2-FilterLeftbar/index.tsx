'use client'

import FacilityFilter from '@/components/pages/search-packages/2-FilterLeftbar/FacilityFilter'
import PriceRangeFilter from '@/components/pages/search-packages/2-FilterLeftbar/PriceRangeFilter'
import RatingHotelFilter from '@/components/pages/search-packages/2-FilterLeftbar/RatingHotelFilter'
import SectionFilter from '@/components/pages/search-packages/2-FilterLeftbar/SectionFilter'
import TagPackageFilter from '@/components/pages/search-packages/2-FilterLeftbar/TagPackageFilter'
import { Accordion } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { PriceParams } from '@/constant/types/PackageProps'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { X } from 'lucide-react'
import React, { Fragment, useCallback, useState } from 'react'

interface FilterLeftbarProps {
  dataMinMax: PriceParams
  dataTagPackages: TagPackages[]
  dataFacility: GenericResponse<Facility>
  dataSection: TagPackages[]
}

// Custom debounce hook
const useDebounce = (callback: (value: string) => void, delay: number) => {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  )

  const debouncedCallback = useCallback(
    (value: string) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      const newTimer = setTimeout(() => {
        callback(value)
      }, delay)

      setDebounceTimer(newTimer)
    },
    [callback, delay, debounceTimer]
  )

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [debounceTimer])

  return { debouncedCallback, debounceTimer, setDebounceTimer }
}

const FilterLeftbar: React.FC<FilterLeftbarProps> = ({
  dataMinMax,
  dataTagPackages,
  dataFacility,
  dataSection,
}) => {
  const { searchQuery, setSearchQuery, resetFilter } = useFilterProduct()
  const updateQueryParams = useUpdateQueryParams()
  const [inputValue, setInputValue] = useState(searchQuery)

  // Debounced function to update search query
  const {
    debouncedCallback: debouncedSetSearchQuery,
    debounceTimer,
    setDebounceTimer,
  } = useDebounce((value: string) => {
    setSearchQuery(value)
  }, 500) // 500ms delay

  React.useEffect(() => {
    updateQueryParams(['query', 'page'], [searchQuery, 1])
  }, [searchQuery, updateQueryParams])

  // Sync input value with search query when reset
  React.useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedSetSearchQuery(value)
  }

  const handleReset = () => {
    // Clear any pending debounced calls
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      setDebounceTimer(null)
    }

    setInputValue('')
    resetFilter('query')

    // Immediately update query params to remove the query
    updateQueryParams(['query', 'page'], ['', 1])
  }

  return (
    <Fragment>
      <div className="relative mb-6">
        <Input
          placeholder="Cari paket, travel, hotel atau airlines"
          className="w-full pr-10"
          value={inputValue}
          onChange={handleInputChange}
        />
        <X
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-100"
          onClick={handleReset}
          onMouseDown={(e) => e.preventDefault()}
        />
      </div>
      <Accordion
        type="multiple"
        defaultValue={['item-1', 'item-2', 'item-3', 'item-4', 'item-5']}
        className="flex w-full flex-col gap-6"
      >
        <PriceRangeFilter dataMinMax={dataMinMax} />
        <RatingHotelFilter />
        <FacilityFilter dataFacility={dataFacility} />
        <SectionFilter dataSectionPackage={dataSection} />
        <TagPackageFilter dataTagPackage={dataTagPackages} />
      </Accordion>
    </Fragment>
  )
}

export default React.memo(FilterLeftbar)
