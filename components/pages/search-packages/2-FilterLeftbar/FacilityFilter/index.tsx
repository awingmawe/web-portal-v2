// components/pages/search-product/2-FilterLeftbar/FacilityFilter/FacilityFilter.tsx
'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import React from 'react'
import { FacilityOptions } from './FacilityCheckbox'

interface FacilityFilterProps {
  dataFacility: GenericResponse<Facility>
}

const FacilityFilter: React.FC<FacilityFilterProps> = ({ dataFacility }) => {
  const { filters, setFacilityCode, resetFilter } = useFilterProduct()

  // Handle reset click with event stopping
  const handleResetClick = (e: React.MouseEvent) => {
    // Stop the event from bubbling up to the accordion trigger
    e.stopPropagation()

    // Reset the specific filter
    resetFilter('facilityCode')
  }

  return (
    <AccordionItem value="item-3">
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between">
          <p className="text-l-medium text-neutral-900">Fasilitas</p>
          <span
            className="text-s-medium text-error-500 cursor-pointer"
            onClick={handleResetClick}
          >
            Reset Fasilitas
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <FacilityOptions
          dataFacility={dataFacility}
          selectedFacility={filters.facilityCode}
          onFacilityChange={setFacilityCode}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default React.memo(FacilityFilter)
