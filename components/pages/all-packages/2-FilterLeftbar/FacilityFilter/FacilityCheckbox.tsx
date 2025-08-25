'use client'

import { FacilitySkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/FacilityFilter/FacilitySkeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import React from 'react'

interface FacilityOptionsProps {
  dataFacility: GenericResponse<Facility>
  selectedFacility?: string
  onFacilityChange: (facilityCode: string) => void
  isLoadingSkeleton?: boolean
}

export const FacilityOptions: React.FC<FacilityOptionsProps> = ({
  dataFacility,
  selectedFacility,
  onFacilityChange,
  isLoadingSkeleton,
}) => {
  const { isItemSelected, handleSelectionChange } = useCheckboxSelection({
    selectedValues: selectedFacility,
    onSelectionChange: onFacilityChange,
    paramName: 'fC',
  })

  if (isLoadingSkeleton) {
    return <FacilitySkeleton count={dataFacility.results.length || 5} />
  }

  return (
    <div className="max-h-[200px] space-y-2 overflow-y-auto">
      {dataFacility.results.map((facility, index) => (
        <Checkbox
          id={`facility-${facility.id}`}
          key={`facility-${index}`}
          checked={isItemSelected(facility.code)}
          label={facility.name}
          onCheckedChange={(checked) =>
            handleSelectionChange(facility.code, checked as boolean)
          }
        />
      ))}
    </div>
  )
}
