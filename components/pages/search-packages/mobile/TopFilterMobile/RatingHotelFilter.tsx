/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { StarIconFilterMobile, StarIconPrimary } from '@/components/icons/star'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React, { Fragment, useCallback, useMemo } from 'react'

interface HotelStarSelectorProps {
  selectedRating?: number
  onRatingChange: (rating: number) => void
}

const HotelStarSelector: React.FC<HotelStarSelectorProps> = ({
  selectedRating,
  onRatingChange,
}) => {
  // Star rating options (5, 4, 3, 2, 1 stars)
  const starOptions = useMemo(() => [5, 4, 3, 2, 1], [])

  // Handle star selection
  const handleStarSelection = useCallback((value: string) => {
    const rating = parseInt(value)
    onRatingChange(rating)
  }, [])

  // Render stars based on count
  const renderStars = useCallback((count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <StarIconPrimary key={`star-${count}-${index}`} size={24} />
      ))
  }, [])

  return (
    <Fragment>
      <div className="flex items-center gap-1">
        <StarIconFilterMobile />
        <p className="text-m-semibold w-full">Pilih Bintang Hotel</p>
      </div>
      <div className="flex flex-col">
        <RadioGroup
          defaultValue={selectedRating?.toString()}
          value={selectedRating?.toString()}
          onValueChange={handleStarSelection}
          className="space-y-2"
        >
          {starOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.toString()}
                id={`hotel-star-${option}`}
                className="h-4 w-4"
              />
              <label
                htmlFor={`hotel-star-${option}`}
                className="flex cursor-pointer"
              >
                {renderStars(option)}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Fragment>
  )
}

export default HotelStarSelector
