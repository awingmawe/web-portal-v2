'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DrawerFooter } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

interface SectionDrawerProps {
  toggleDrawerAction: (id: number) => void
  itemId: number
  applyFiltersAction: (id: number) => void
  dataSection: any
}

export function SectionDrawer({
  toggleDrawerAction,
  itemId,
  applyFiltersAction,
  dataSection,
}: SectionDrawerProps) {
  const { filters, setSection } = useFilterProduct()
  const { isItemSelected, handleSelectionChange } = useCheckboxSelection({
    selectedValues: filters.section,
    onSelectionChange: setSection,
    paramName: 'section',
  })

  const [searchQuery, setSearchQuery] = useState('')

  // Filter data berdasarkan search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return dataSection
    }

    const query = searchQuery.toLowerCase()
    return dataSection.filter((section: any) =>
      section.name.toLowerCase().includes(query)
    )
  }, [dataSection, searchQuery])

  return (
    <>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="text"
          placeholder="Cari tipe paket"
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
        {filteredSections.length > 0 ? (
          filteredSections.map((option: any, index: any) => (
            <Checkbox
              id={`section-${index}`}
              key={`section-${index}`}
              checked={isItemSelected(option.slug)}
              label={option.name}
              border={index !== filteredSections.length - 1}
              className="border-b-1 border-b-neutral-100 pb-2"
              onCheckedChange={(checked) =>
                handleSelectionChange(option.slug, checked as boolean)
              }
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-neutral-500">
              Tidak ada tipe paket ditemukan
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
