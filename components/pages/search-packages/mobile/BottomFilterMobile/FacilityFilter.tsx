'use client'

import { FacilitySkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/FacilityFilter/FacilitySkeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DrawerFooter } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import { Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'

interface FacilityOptionsProps {
  dataFacility: GenericResponse<Facility>
  toggleDrawerAction: (id: number) => void
  itemId: number
  applyFiltersAction: (id: number) => void
}

export const FacilityDrawer: React.FC<FacilityOptionsProps> = ({
  dataFacility,
  toggleDrawerAction,
  itemId,
  applyFiltersAction,
}) => {
  const { filters, setFacilityCode, isLoadingSkeleton } = useFilterProduct()
  const { isItemSelected, handleSelectionChange } = useCheckboxSelection({
    selectedValues: filters.facilityCode,
    onSelectionChange: setFacilityCode,
    paramName: 'fC',
  })

  const [searchQuery, setSearchQuery] = useState('')

  // Filter data berdasarkan search query
  const filteredFacilities = useMemo(() => {
    if (!searchQuery.trim()) {
      return dataFacility.results
    }

    const query = searchQuery.toLowerCase()
    return dataFacility.results.filter((facility) =>
      facility.name.toLowerCase().includes(query)
    )
  }, [dataFacility.results, searchQuery])

  if (isLoadingSkeleton) {
    return <FacilitySkeleton count={dataFacility.results.length || 5} />
  }

  return (
    <>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="text"
          placeholder="Cari fasilitas"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-full border-neutral-200 py-1.5 pl-10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Checkbox List */}
      <div className="mt-2 mb-4 max-h-[200px] space-y-2 overflow-y-auto">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map((facility, index) => (
            <Checkbox
              id={`facility-${index}`}
              key={`facility-${index}`}
              checked={isItemSelected(facility.code)}
              label={facility.name}
              border={index !== filteredFacilities.length - 1}
              className="border-b-1 border-b-neutral-100 pb-2"
              onCheckedChange={(checked) =>
                handleSelectionChange(facility.code, checked as boolean)
              }
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-neutral-500">
              Tidak ada fasilitas ditemukan
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Coba kata kunci lain
            </p>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <DrawerFooter className="mb-4 flex flex-row gap-2 p-0">
        <Button
          variant="outline"
          className="border-primary-500 w-full py-3"
          onClick={() => toggleDrawerAction(itemId)}
        >
          Batal
        </Button>
        <Button
          onClick={() => {
            applyFiltersAction(itemId)
          }}
          className="w-full py-3"
        >
          Simpan
        </Button>
      </DrawerFooter>
    </>
  )
}
