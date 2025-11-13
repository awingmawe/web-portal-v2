'use client'

import { ChevronIcon } from '@/components/icons/chevron'
import { SORT_OPTIONS } from '@/components/pages/search-packages/constants'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { LOCATION_STORAGE_KEY } from '@/constant/env'
import { dissolve } from '@/lib/animation-setup'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface SortingDropdownProps {
  currentSort: string
  createSortUrlAction: (sortValue: string) => string
}

export const SortingDropdown: React.FC<SortingDropdownProps> = ({
  currentSort,
  createSortUrlAction,
}) => {
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

  // Function to determine if a sort option is active
  const isActive = useCallback(
    (sortValue: string) => {
      return currentSort === sortValue
    },
    [currentSort]
  )

  // Get display text for current sort
  const currentSortText = useMemo(() => {
    const option = filteredSortOptions.find(
      (option) => option.value === currentSort
    )
    return option?.label || 'Harga Terendah'
  }, [currentSort, filteredSortOptions])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`bg-neutral-0 flex cursor-pointer items-center gap-1 rounded-[100px] border border-neutral-200 px-4 py-2.5 ${dissolve} focus-within:outline-0`}
        >
          <span className="text-m-regular w-fit min-w-[150px] text-left text-neutral-900">
            {currentSortText}
          </span>
          <ChevronIcon size={18} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8}>
        {filteredSortOptions.map((option, index) => (
          <div key={`sortBy-${option.value}-${index}`}>
            {index > 0 && <div className="mx-1 h-px bg-neutral-100" />}
            <Link
              href={createSortUrlAction(option.value)}
              className={`text-m-regular flex w-full cursor-pointer items-center justify-between px-3 py-2.5 hover:bg-neutral-100 ${dissolve} ${isActive(option.value) ? 'bg-primary-50 text-primary-600 font-medium' : ''}`}
            >
              <span>{option.label}</span>
              {isActive(option.value) && <CheckIcon className="h-4 w-4" />}
            </Link>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
