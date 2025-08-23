'use client'

import { FacilitySkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/FacilityFilter/FacilitySkeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DrawerFooter } from '@/components/ui/drawer'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import React from 'react'

interface FacilityOptionsProps {
  dataFacility: GenericResponse<Facility>
  toggleDrawer: (id: number) => void
  itemId: number
  applyFilters: (id: number) => void
}

export const FacilityDrawer: React.FC<FacilityOptionsProps> = ({
  dataFacility,
  toggleDrawer,
  itemId,
  applyFilters,
}) => {
  const { filters, setFacilityCode, isLoadingSkeleton } = useFilterProduct()
  const { isItemSelected, handleSelectionChange, onSaveFacilityFilter } =
    useCheckboxSelection({
      selectedValues: filters.facilityCode,
      onSelectionChange: setFacilityCode,
      paramName: 'fC',
    })

  if (isLoadingSkeleton) {
    return <FacilitySkeleton count={dataFacility.results.length || 5} />
  }

  return (
    <>
      <div className="my-4 max-h-[200px] space-y-2 overflow-y-auto">
        {dataFacility.results.map((facility, index) => (
          <Checkbox
            id={`facility-${index}`}
            key={`facility-${index}`}
            checked={isItemSelected(facility.code)}
            label={facility.name}
            border={index !== dataFacility.results.length - 1}
            className="border-b-1 border-b-neutral-100 pb-2"
            onCheckedChange={(checked) =>
              handleSelectionChange(facility.code, checked as boolean)
            }
          />
        ))}
      </div>
      <DrawerFooter className="mb-4 flex flex-row gap-2 p-0">
        <Button
          variant="outline"
          className="border-primary-500 w-full py-3"
          onClick={() => toggleDrawer(itemId)}
        >
          Batal
        </Button>
        <Button
          onClick={() => {
            onSaveFacilityFilter()
            applyFilters(itemId)
          }}
          className="w-full py-3"
        >
          Simpan
        </Button>
      </DrawerFooter>
    </>
  )
}
