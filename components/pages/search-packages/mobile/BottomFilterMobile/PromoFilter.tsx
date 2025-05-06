'use client'

import { TagPackageSkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/TagPackageFilter/TagPackageSkeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DrawerFooter } from '@/components/ui/drawer'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import React from 'react'

interface PromoDrawerProps {
  dataTagPackages: TagPackages[]
  toggleDrawer: (id: number) => void
  itemId: number
  applyFilters: (id: number) => void
}

export const PromoDrawer: React.FC<PromoDrawerProps> = ({
  dataTagPackages,
  toggleDrawer,
  itemId,
  applyFilters,
}) => {
  const { filters, setTagSlug, isLoadingSkeleton } = useFilterProduct()
  const { isItemSelected, handleSelectionChange, onSaveFacilityFilter } =
    useCheckboxSelection({
      selectedValues: filters.tagSlug,
      onSelectionChange: setTagSlug,
      paramName: 'tS',
    })

  if (isLoadingSkeleton) {
    return <TagPackageSkeleton count={dataTagPackages.length || 5} />
  }

  return (
    <>
      <div className="my-4 max-h-[200px] space-y-2 overflow-y-auto">
        {dataTagPackages.map((tagPackage, index) => (
          <Checkbox
            id={`tagPackage-${tagPackage.id}`}
            key={tagPackage.id}
            checked={isItemSelected(tagPackage.slug)}
            label={tagPackage.name}
            border={index !== dataTagPackages.length - 1}
            description={tagPackage.activePackageCount}
            onCheckedChange={(checked) =>
              handleSelectionChange(tagPackage.slug, checked as boolean)
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
