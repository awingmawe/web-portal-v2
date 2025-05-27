'use client'

import { StarIconPrimary } from '@/components/icons/star'
import { HotelRatingSkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/RatingHotelFilter/RatingHotelSkeleton'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { starOptions } from '@/lib/utils'
import React, { useCallback, useEffect, useState } from 'react'

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
  const [localRating, setLocalRating] = useState<number | undefined>(
    selectedRating
  )

  // Update local rating when prop changes
  useEffect(() => {
    setLocalRating(selectedRating)
  }, [selectedRating])

  // Custom debounce hook
  const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  }

  // Get debounced value of rating
  const debouncedRating = useDebounce(localRating, 500)

  // Effect to handle debounced rating changes
  useEffect(() => {
    if (debouncedRating !== undefined && debouncedRating !== selectedRating) {
      onRatingChange(debouncedRating)
      updateQueryParams(['hR'], [debouncedRating.toString()])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRating])

  // Handle star selection
  const handleStarSelection = useCallback((value: string) => {
    const rating = parseInt(value)
    setLocalRating(rating)
  }, [])

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
      value={localRating?.toString()}
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
