'use client'

import { LocationCheckboxFilter } from '@/components/pages/search-packages/2-FilterLeftbar/LocationFilter/LocationCheckbox'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { City } from '@/constant/types/LocationProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import React from 'react'

interface LocationFilterProps {
  dataKota: City[]
}

const LocationFilter: React.FC<LocationFilterProps> = ({ dataKota }) => {
  const { filters, setLocationFilter, resetFilter, isLoadingSkeleton } =
    useFilterProduct()

  // Handle reset click with event stopping
  const handleResetClick = (e: React.MouseEvent) => {
    // Stop the event from bubbling up to the accordion trigger
    e.stopPropagation()

    // Reset the specific filter
    resetFilter('organizationInstanceCity')
  }

  return (
    <AccordionItem value="item-6">
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between">
          <p className="text-l-medium text-neutral-900">Lokasi Travel</p>
          <span
            className="text-s-medium text-error-500 cursor-pointer"
            onClick={handleResetClick}
          >
            Reset Lokasi
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <LocationCheckboxFilter
          dataLocations={dataKota}
          selectedLocation={filters.organizationInstanceCity}
          onLocationChangeAction={setLocationFilter}
          isLoadingSkeleton={isLoadingSkeleton}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default React.memo(LocationFilter)
