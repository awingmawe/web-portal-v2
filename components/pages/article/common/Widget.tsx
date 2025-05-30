'use client'

import { ChevronIcon } from '@/components/icons/chevron'
import { SearchIcon } from '@/components/icons/search'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSearchQuery } from '@/hooks/common/useSearchQuery'
import { dissolve } from '@/lib/animation-setup'
import { PopoverClose } from '@radix-ui/react-popover'
import { CheckIcon } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'

const SORT_OPTIONS = [
  { label: 'Terbaru', value: 'new' },
  { label: 'Relevan', value: 'most-relevant' },
]

interface WidgetFilterProps {
  eventCategory: string
}

const WidgetFilter: React.FC<WidgetFilterProps> = ({ eventCategory }) => {
  const [sort, setSort] = useState<string>('new')

  const { searchQuery, setSearchQuery, handleSearch, loading } = useSearchQuery(
    {
      redirectUri: 'article/list',
      sort,
      dataEventTracker: {
        name: 'search_article',
        topic: 'general',
        category: eventCategory,
      },
    }
  )

  const isActive = useCallback(
    (sortValue: string) => {
      return sort === sortValue
    },
    [sort]
  )

  // Get display text for current sort
  const currentSortText = useMemo(() => {
    const option = SORT_OPTIONS.find((option) => option.value === sort)
    return option?.label || 'Terbaru'
  }, [sort])

  return (
    <div className="flex w-full rounded-4xl border-1 border-neutral-100 bg-white p-6 max-lg:flex-col max-lg:gap-4 max-lg:border-0 max-lg:p-4">
      {/* Search input */}
      <div className="relative flex flex-1 items-center max-lg:gap-2">
        <Input
          endIcon={<SearchIcon className="text-primary-900 max-lg:hidden" />}
          placeholder="Cari Artikel"
          value={searchQuery}
          disabled={loading}
          className="max-lg:!text-base"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
        />
        {/* Search button */}
        <Button
          onClick={handleSearch}
          isLoading={loading}
          variant="default"
          className="ml-4 px-10 py-3 max-lg:hidden"
        >
          Cari
        </Button>
        <Button
          className="px-4 py-3 lg:hidden"
          onClick={handleSearch}
          isLoading={loading}
          variant="default"
        >
          <SearchIcon className="text-neutral-900" size={16} />
        </Button>
      </div>

      {/* Sort dropdown */}
      <div className="ml-10 flex items-center gap-5 max-lg:m-0 max-lg:justify-between max-lg:gap-1.5">
        <span className="text-m-regular text-nowrap max-lg:text-xs">
          Urut Berdasarkan
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`bg-neutral-0 flex w-full cursor-pointer items-center gap-1 rounded-[100px] border border-neutral-200 px-4 py-2.5 max-lg:w-fit ${dissolve} focus-within:outline-0`}
            >
              <span className="text-m-regular w-fit text-left text-neutral-900">
                {currentSortText}
              </span>
              <ChevronIcon size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8}>
            {SORT_OPTIONS.map((option, index) => (
              <div key={`sortBy-${option.value}-${index}`}>
                {index > 0 && <div className="mx-1 h-px bg-neutral-100" />}
                <PopoverClose className="w-full">
                  <span
                    onClick={() => setSort(option.value)}
                    className={`text-m-regular flex w-full cursor-pointer items-center justify-between px-3 py-2.5 hover:bg-neutral-100 ${dissolve} ${isActive(option.value) ? 'bg-primary-50 font-medium' : ''}`}
                  >
                    {option.label}
                    {isActive(option.value) && (
                      <CheckIcon className="text-primary-500 h-4 w-4" />
                    )}
                  </span>
                </PopoverClose>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default WidgetFilter
