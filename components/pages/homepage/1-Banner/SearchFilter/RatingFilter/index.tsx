'use client'

import { StarIcon, StarIconPrimary } from '@/components/icons/star'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { dissolve } from '@/lib/animation-setup'
import React, { useCallback, useMemo } from 'react'

const HotelStarFilter: React.FC = () => {
  const { filters, setHotelStars, isDisabled } = useFilterProduct()

  const hotelStars = filters.hotelStars
  // Memoized handlers
  const handleHotelStar1 = useCallback(() => setHotelStars(1), [setHotelStars])
  const handleHotelStar2 = useCallback(() => setHotelStars(2), [setHotelStars])
  const handleHotelStar3 = useCallback(() => setHotelStars(3), [setHotelStars])
  const handleHotelStar4 = useCallback(() => setHotelStars(4), [setHotelStars])
  const handleHotelStar5 = useCallback(() => setHotelStars(5), [setHotelStars])

  // Memoized star icons
  const starIcons = useMemo(() => {
    if (!hotelStars) return null

    return Array.from({ length: hotelStars }).map((_, index) => (
      <StarIconPrimary size={20} key={`star-${index + 1}`} />
    ))
  }, [hotelStars])

  // Memoized hotel stars options
  const hotelStarOptions = useMemo(
    () => [
      {
        value: 5,
        label: 'Hotel Bintang 5',
        stars: 5,
        handler: handleHotelStar5,
      },
      {
        value: 4,
        label: 'Hotel Bintang 4',
        stars: 4,
        handler: handleHotelStar4,
      },
      {
        value: 3,
        label: 'Hotel Bintang 3',
        stars: 3,
        handler: handleHotelStar3,
      },
      {
        value: 2,
        label: 'Hotel Bintang 2',
        stars: 2,
        handler: handleHotelStar2,
      },
      {
        value: 1,
        label: 'Hotel Bintang 1',
        stars: 1,
        handler: handleHotelStar1,
      },
    ],
    [
      handleHotelStar1,
      handleHotelStar2,
      handleHotelStar3,
      handleHotelStar4,
      handleHotelStar5,
    ]
  )

  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none" asChild>
        <div
          className={`flex w-full items-center gap-2 ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`}
          onClick={isDisabled ? (e) => e.preventDefault() : undefined}
        >
          <StarIcon size={32} />
          <div className="flex flex-col">
            <p
              className={`text-s-regular ${hotelStars ? 'text-neutral-500' : 'text-neutral-900'}`}
            >
              Bintang Hotel
            </p>
            <p className="text-s-regular flex flex-row text-neutral-300">
              {starIcons || 'Pilih bintang hotel'}
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8}>
        {hotelStarOptions.map((option) => (
          <React.Fragment key={option.value}>
            <div
              className={`${dissolve} flex cursor-pointer flex-col gap-1 px-3 py-2.5 hover:bg-gray-200`}
              onClick={option.handler}
            >
              <span className="text-s-regular text-neutral-500">
                {option.label}
              </span>
              <div className="flex flex-row gap-[5px]">
                {Array.from({ length: option.stars }).map((_, index) => (
                  <StarIconPrimary size={20} key={`star-${index + 1}`} />
                ))}
              </div>
            </div>
            {option.value > 3 && <div className="mx-1 h-px bg-neutral-100" />}
          </React.Fragment>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(HotelStarFilter)
