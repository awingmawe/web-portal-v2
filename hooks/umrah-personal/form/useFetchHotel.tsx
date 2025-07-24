'use client'

import { GetListQuery } from '@/constant/types/GeneralProps'
import { Hotel } from '@/constant/types/HotelProps'
import { getHotelsWithGallery } from '@/services/general-service'
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseHotelsWithGalleryProps {
  hotelQuery?: GetListQuery
  galleryQuery?: GetListQuery
  enabled?: boolean
}

interface UseHotelsWithGalleryReturn {
  hotels: Hotel[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// Custom hook for fetching hotels with galleries
export const useHotelsWithGallery = ({
  hotelQuery = { page: 1, size: 10 },
  galleryQuery = { page: 1, size: 10 },
  enabled = true,
}: UseHotelsWithGalleryProps = {}): UseHotelsWithGalleryReturn => {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dataRef = useRef(false)

  const fetchHotels = useCallback(async () => {
    if (!enabled) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await getHotelsWithGallery(hotelQuery, galleryQuery)

      setHotels(response.results || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch hotels')
      setHotels([])
    } finally {
      setIsLoading(false)
    }
  }, [hotelQuery, galleryQuery, enabled])

  useEffect(() => {
    if (dataRef.current) return
    fetchHotels()
    dataRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    hotels,
    isLoading,
    error,
    refetch: fetchHotels,
  }
}
