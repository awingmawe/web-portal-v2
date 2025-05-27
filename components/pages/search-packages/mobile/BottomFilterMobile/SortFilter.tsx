/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/ui/button'
import { DrawerFooter } from '@/components/ui/drawer'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface SortOption {
  value: string
  label: string
}

interface SortDrawerProps {
  toggleDrawer: (id: number) => void
  itemId: number
  applyFilters: (id: number) => void
  selectedSort: string
  setSelectedSort: (sort: string) => void
}

export function SortDrawer({
  toggleDrawer,
  itemId,
  applyFilters,
  selectedSort,
  setSelectedSort,
}: SortDrawerProps) {
  const searchParams = useSearchParams()
  const updateQueryParams = useUpdateQueryParams()
  const SORT_OPTIONS: SortOption[] = [
    { value: 'price-low', label: 'Harga Terendah' },
    { value: 'price-high', label: 'Harga Tertinggi' },
    { value: 'depart-early', label: 'Berangkat paling cepat (Awal Bulan)' },
    { value: 'depart-late', label: 'Berangkat paling lama (Akhir Bulan)' },
  ]

  // Update local state if URL parameters change
  useEffect(() => {
    const currentSort = searchParams.get('sort')
    if (currentSort) {
      setSelectedSort(currentSort)
    }
  }, [searchParams])

  // Handle sort selection
  const handleSortChange = (value: string) => {
    setSelectedSort(value)
  }

  // Apply sort filter and update URL
  const handleApplySort = () => {
    // Update URL with selected sort option
    updateQueryParams(['sort'], [selectedSort])

    // Close drawer and apply filters
    applyFilters(itemId)
  }

  return (
    <>
      <div className="my-4 space-y-2">
        <RadioGroup
          value={selectedSort}
          onValueChange={handleSortChange}
          className="space-y-2"
        >
          {SORT_OPTIONS.map((option, index) => (
            <div
              key={option.value}
              className={`flex cursor-pointer items-center gap-2 pb-2 ${index !== SORT_OPTIONS.length - 1 && 'border-b-1 border-b-neutral-100'}`}
              onClick={() => handleSortChange(option.value)}
            >
              <RadioGroupItem
                value={option.value}
                id={`sort-${option.value}`}
                className="h-4 w-4"
              />
              <label
                htmlFor={`sort-${option.value}`}
                className="text-m-regular flex-1 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <DrawerFooter className="mb-4 flex flex-row gap-2 p-0">
        <Button
          variant="outline"
          className="border-primary-500 w-full py-3"
          onClick={() => toggleDrawer(itemId)}
        >
          Batal
        </Button>
        <Button onClick={handleApplySort} className="w-full py-3">
          Simpan
        </Button>
      </DrawerFooter>
    </>
  )
}
