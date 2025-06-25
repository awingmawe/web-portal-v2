import { useHotelsWithGallery } from '@/hooks/umrah-personal/form/useFetchHotel'
import { isEmpty } from '@/lib/utils'
import { useCallback, useMemo, useState } from 'react'

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Rekomendasi' },
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
]
export interface HotelStepConfig {
  cityName: 'MAKKAH' | 'MADINAH'
  formField: string
  stepNumber: number
}
export const useHotelStep = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recommended')
  const [rating, setRating] = useState('5')

  const currentSortText = useMemo(() => {
    const option = SORT_OPTIONS.find((option) => option.value === sortBy)
    return option?.label || 'Rekomendasi'
  }, [sortBy])

  const isActive = useCallback(
    (sortValue: string) => sortBy === sortValue,
    [sortBy]
  )

  const handleRatingChange = (selectedRating: string) => {
    setRating(selectedRating)
  }

  // Fetch hotels with galleries
  const {
    hotels: hotelMecca,
    isLoading: isLoadingHotelsMecca,
    refetch: refetchHotelsMecca,
  } = useHotelsWithGallery({
    hotelQuery: {
      page: 1,
      size: 10,
      cityName: 'MAKKAH',
      name: isEmpty(searchQuery) ? undefined : searchQuery,
      rating: Number(rating),
    },
  })
  const {
    hotels: hotelMedina,
    isLoading: isLoadingHotelsMedina,
    refetch: refetchHotelsMedina,
  } = useHotelsWithGallery({
    hotelQuery: {
      page: 1,
      size: 10,
      cityName: 'MADINAH',
      name: isEmpty(searchQuery) ? undefined : searchQuery,
      rating: Number(rating),
    },
  })

  return {
    // State
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    rating,
    handleRatingChange,

    // Computed
    currentSortText,
    isActive,

    // Data
    hotelMecca,
    isLoadingHotelsMecca,
    refetchHotelsMecca,

    hotelMedina,
    isLoadingHotelsMedina,
    refetchHotelsMedina,

    // Constants
    SORT_OPTIONS,
  }
}
