'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useFilterProduct } from '@/contexts/filter-product-context'
import React from 'react'
import { HotelRatingOptions } from './RatingHotelRadio'

const RatingHotelFilter: React.FC = () => {
  const { filters, setHotelStars, resetFilter } = useFilterProduct()

  // Handle reset click with event stopping
  const handleResetClick = (e: React.MouseEvent) => {
    // Stop the event from bubbling up to the accordion trigger
    e.stopPropagation()

    // Reset the specific filter
    resetFilter('hotelStars')
  }

  return (
    <AccordionItem value="item-2">
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between">
          <p className="text-l-medium text-neutral-900">Bintang Hotel</p>
          <span
            className="text-s-medium text-error-500 cursor-pointer"
            onClick={handleResetClick}
          >
            Reset Bintang Hotel
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <HotelRatingOptions
          selectedRating={filters.hotelStars}
          onRatingChange={setHotelStars}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default React.memo(RatingHotelFilter)
