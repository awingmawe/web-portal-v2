/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { SORT_OPTIONS } from '@/components/pages/search-packages/constants'
import { Button } from '@/components/ui/button'
import { DrawerFooter } from '@/components/ui/drawer'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { LOCATION_STORAGE_KEY } from '@/constant/env'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

interface SortDrawerProps {
  toggleDrawerAction: (id: number) => void
  itemId: number
  applyFiltersAction: (id: number) => void
  selectedSort: string
  setSelectedSortAction: (sort: string) => void
}

export function SortDrawer({
  toggleDrawerAction,
  itemId,
  applyFiltersAction,
  selectedSort,
  setSelectedSortAction,
}: SortDrawerProps) {
  const searchParams = useSearchParams()
  const updateQueryParams = useUpdateQueryParams()
  const [isLocationAvailable, setIsLocationAvailable] = useState(false)

  useEffect(() => {
    // Cek ketersediaan lokasi di client-side
    const location = localStorage.getItem(LOCATION_STORAGE_KEY)
    setIsLocationAvailable(!!location)
  }, [])

  const filteredSortOptions = useMemo(() => {
    if (isLocationAvailable) {
      return SORT_OPTIONS
    }
    // Jika lokasi tidak tersedia, filter keluar opsi 'Lokasi Terdekat'
    return SORT_OPTIONS.filter((opt) => opt.value !== 'organization.location')
  }, [isLocationAvailable])

  // Update local state if URL parameters change
  useEffect(() => {
    const currentSort = searchParams.get('sort')
    if (currentSort) {
      setSelectedSortAction(currentSort)
    }
  }, [searchParams])

  // Handle sort selection
  const handleSortChange = (value: string) => {
    setSelectedSortAction(value)
  }

  // Apply sort filter and update URL
  const handleApplySort = () => {
    const paramsToUpdate: { key: string; value: string }[] = [
      { key: 'sort', value: selectedSort },
    ]

    if (selectedSort === 'organization.location') {
      const storedLocation = localStorage.getItem(LOCATION_STORAGE_KEY)
      const { latitude, longitude } = JSON.parse(storedLocation!)
      paramsToUpdate.push({
        key: 'coordinates',
        value: `${latitude},${longitude}`,
      })
    } else {
      // Jika sortir BUKAN berdasarkan lokasi, pastikan parameter coordinates dihapus
      paramsToUpdate.push({ key: 'coordinates', value: '' })
    }

    updateQueryParams(
      paramsToUpdate.map((p) => p.key),
      paramsToUpdate.map((p) => p.value)
    )

    // Close drawer and apply filters
    applyFiltersAction(itemId)
  }

  return (
    <>
      <div className="my-4 space-y-2">
        <RadioGroup
          value={selectedSort}
          onValueChange={handleSortChange}
          className="space-y-2"
        >
          {filteredSortOptions.map((option, index) => (
            <div
              key={option.value}
              className={`flex cursor-pointer items-center gap-2 pb-2 ${index !== filteredSortOptions.length - 1 && 'border-b-1 border-b-neutral-100'}`}
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
          onClick={() => toggleDrawerAction(itemId)}
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
