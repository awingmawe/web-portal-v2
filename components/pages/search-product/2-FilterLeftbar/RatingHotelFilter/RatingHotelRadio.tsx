'use client'

import { StarIconPrimary } from '@/components/icons/star'
import { HotelRatingSkeleton } from '@/components/pages/search-product/2-FilterLeftbar/RatingHotelFilter/RatingHotelSkeleton'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import React, { useCallback, useMemo } from 'react'

interface HotelRatingOptionsProps {
  selectedRating?: number
  onRatingChange: (rating: number) => void
  isLoadingSkeleton?: boolean
}

export const HotelRatingOptions: React.FC<HotelRatingOptionsProps> = ({
  selectedRating,
  onRatingChange,
  isLoadingSkeleton,
}) => {
  const updateQueryParams = useUpdateQueryParams()

  // Star rating options (5, 4, 3 stars)
  const starOptions = useMemo(() => [5, 4, 3], [])

  // Handle star selection
  const handleStarSelection = useCallback(
    (value: string) => {
      const rating = parseInt(value)
      onRatingChange(rating)
      updateQueryParams(['hR'], [value])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Render stars based on count
  const renderStars = useCallback((count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <StarIconPrimary key={`star-${count}-${index}`} size={24} />
      ))
  }, [])

  if (isLoadingSkeleton) {
    return <HotelRatingSkeleton starOptions={starOptions} />
  }
  return (
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
  )
}
