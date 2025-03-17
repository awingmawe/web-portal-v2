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
  const { filters, setFacilityCode, isLoadingSkeleton } = useFilterProduct()

  return (
    <AccordionItem value="item-3">
      <AccordionTrigger>
        <p className="text-l-medium text-neutral-900">Fasilitas</p>
      </AccordionTrigger>
      <AccordionContent>
        <FacilityOptions
          dataFacility={dataFacility}
          selectedFacility={filters.facilityCode}
          onFacilityChange={setFacilityCode}
          isLoadingSkeleton={isLoadingSkeleton}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default React.memo(FacilityFilter)
