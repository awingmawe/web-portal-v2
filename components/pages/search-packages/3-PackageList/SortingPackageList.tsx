'use client'

import { ChevronIcon } from '@/components/icons/chevron'
import { SORT_OPTIONS } from '@/components/pages/search-packages/constants'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/sonner'
import { useGeolocation } from '@/hooks/common/useGetLocation'
import { dissolve } from '@/lib/animation-setup'
import { CheckIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface SortingDropdownProps {
  currentSort: string
  createSortUrlAction: (sortValue: string) => string
}

export const SortingDropdown: React.FC<SortingDropdownProps> = ({
  currentSort,
  createSortUrlAction,
}) => {
  const router = useRouter()
  const { latitude, longitude, permissionStatus, requestLocation, resetError } =
    useGeolocation()
  const [isWaitingForLocation, setIsWaitingForLocation] = useState(false)

  useEffect(() => {
    if (
      isWaitingForLocation &&
      permissionStatus === 'granted' &&
      latitude &&
      longitude
    ) {
      router.push(createSortUrlAction('organization.location'))
      setIsWaitingForLocation(false)
    } else if (isWaitingForLocation && permissionStatus === 'denied') {
      toast.warning(
        'Izin lokasi ditolak. Tidak bisa mengurutkan berdasarkan lokasi.'
      )
      setIsWaitingForLocation(false)
    }

    if (
      permissionStatus === 'denied' &&
      currentSort === 'organization.location'
    ) {
      const url = createSortUrlAction('price-low')
      router.push(url)
    }
  }, [
    permissionStatus,
    latitude,
    longitude,
    currentSort,
    createSortUrlAction,
    router,
    isWaitingForLocation,
  ])

  // Function to determine if a sort option is active
  const isActive = useCallback(
    (sortValue: string) => {
      return currentSort === sortValue
    },
    [currentSort]
  )

  // Handle sort selection
  const handleSortChange = (option: { value: string; label: string }) => {
    if (option.value === 'organization.location') {
      if (latitude && longitude) {
        router.push(createSortUrlAction(option.value))
      } else {
        resetError()
        requestLocation()
        setIsWaitingForLocation(true)
        if (permissionStatus === 'denied') {
          toast.warning(
            'Anda menonaktifkan lokasi, aktifkan Lokasi terlebih dahulu untuk mengurutkan paket berdasarkan lokasi terdekat.'
          )
          setIsWaitingForLocation(false)
        }
      }
    } else {
      setIsWaitingForLocation(false)
      router.push(createSortUrlAction(option.value))
    }
  }

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
            <button
              onClick={handleSortChange.bind(null, option)}
              className={`text-m-regular flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-left hover:bg-neutral-100 ${dissolve} ${isActive(option.value) ? 'bg-primary-50 text-primary-600 font-medium' : ''}`}
            >
              <span>{option.label}</span>
              {isActive(option.value) && <CheckIcon className="h-4 w-4" />}
            </button>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
