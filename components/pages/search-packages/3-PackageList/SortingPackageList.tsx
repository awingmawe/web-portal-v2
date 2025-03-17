'use client'

import { ChevronIcon } from '@/components/icons/chevron'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { dissolve } from '@/lib/animation-setup'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'

export interface SortOption {
  value: string
  label: string
}

interface SortingDropdownProps {
  currentSort: string
  createSortUrl: (sortValue: string) => string
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
  { value: 'depart-early', label: 'Berangkat paling cepat (Awal Bulan)' },
  { value: 'depart-late', label: 'Berangkat paling lama (Akhir Bulan)' },
]

export const SortingDropdown: React.FC<SortingDropdownProps> = ({
  currentSort,
  createSortUrl,
}) => {
  // Function to determine if a sort option is active
  const isActive = useCallback(
    (sortValue: string) => {
      return currentSort === sortValue
    },
    [currentSort]
  )

  // Get display text for current sort
  const currentSortText = useMemo(() => {
    const option = SORT_OPTIONS.find((option) => option.value === currentSort)
    return option?.label || 'Harga Terendah'
  }, [currentSort])

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
        {SORT_OPTIONS.map((option, index) => (
          <div key={`sortBy-${option.value}-${index}`}>
            {index > 0 && <div className="mx-1 h-px bg-neutral-100" />}
            <Link
              href={createSortUrl(option.value)}
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
