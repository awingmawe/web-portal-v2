'use client'

import { TagPackageSkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/TagPackageFilter/TagPackageSkeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DrawerFooter } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import { Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'

interface PromoDrawerProps {
  dataTagPackages: TagPackages[]
  toggleDrawerAction: (id: number) => void
  itemId: number
  applyFiltersAction: (id: number) => void
}

export const PromoDrawer: React.FC<PromoDrawerProps> = ({
  dataTagPackages,
  toggleDrawerAction,
  itemId,
  applyFiltersAction,
}) => {
  const { filters, setTagSlug, isLoadingSkeleton } = useFilterProduct()
  const { isItemSelected, handleSelectionChange } = useCheckboxSelection({
    selectedValues: filters.tagSlug,
    onSelectionChange: setTagSlug,
    paramName: 'tS',
  })

  const [searchQuery, setSearchQuery] = useState('')

  // Filter data berdasarkan search query
  const filteredTagPackages = useMemo(() => {
    if (!searchQuery.trim()) {
      return dataTagPackages
    }

    const query = searchQuery.toLowerCase()
    return dataTagPackages.filter((tagPackage) =>
      tagPackage.name.toLowerCase().includes(query)
    )
  }, [dataTagPackages, searchQuery])

  if (isLoadingSkeleton) {
    return <TagPackageSkeleton count={dataTagPackages.length || 5} />
  }

  return (
    <>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="text"
          placeholder="Cari promo"
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
        {filteredTagPackages.length > 0 ? (
          filteredTagPackages.map((tagPackage, index) => (
            <Checkbox
              id={`tagPackage-${index}`}
              key={`tagPackage-${index}`}
              checked={isItemSelected(tagPackage.slug)}
              label={tagPackage.name}
              border={index !== filteredTagPackages.length - 1}
              description={tagPackage.activePackageCount}
              onCheckedChange={(checked) =>
                handleSelectionChange(tagPackage.slug, checked as boolean)
              }
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-neutral-500">
              Tidak ada promo ditemukan
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Coba kata kunci lain
            </p>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <DrawerFooter className="mt-4 mb-4 flex flex-row gap-2 p-0">
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
