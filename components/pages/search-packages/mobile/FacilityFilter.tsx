'use client'

import { FacilitySkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/FacilityFilter/FacilitySkeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import React from 'react'

interface FacilityOptionsProps {
  dataFacility: GenericResponse<Facility>
}

export const FacilityDrawer: React.FC<FacilityOptionsProps> = ({
  dataFacility,
}) => {
  const { filters, setFacilityCode, isLoadingSkeleton } = useFilterProduct()
  const { isItemSelected, handleSelectionChange } = useCheckboxSelection({
    selectedValues: filters.facilityCode,
    onSelectionChange: setFacilityCode,
    paramName: 'fC',
  })

  if (isLoadingSkeleton) {
    return <FacilitySkeleton count={dataFacility.results.length || 5} />
  }

  return (
    <div className="my-4 max-h-[200px] space-y-2 overflow-y-auto">
      {dataFacility.results.map((facility) => (
        <Checkbox
          id={`facility-${facility.id}`}
          key={facility.id}
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
