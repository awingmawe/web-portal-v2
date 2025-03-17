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
  const { filters, setHotelStars, isLoadingSkeleton } = useFilterProduct()

  return (
    <AccordionItem value="item-2">
      <AccordionTrigger>
        <p className="text-l-medium text-neutral-900">Bintang Hotel</p>
      </AccordionTrigger>
      <AccordionContent>
        <HotelRatingOptions
          selectedRating={filters.hotelStars}
          onRatingChange={setHotelStars}
          isLoadingSkeleton={isLoadingSkeleton}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default React.memo(RatingHotelFilter)
