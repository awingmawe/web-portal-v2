import { getGalleryHotelByHotelId } from '@/services/general-service'
import { useSWRFetcher } from '@/services/use-swr-fetcher'
import { SWRConfiguration } from 'swr'

export function useGetHotelGalleryByHotelId(
  hotelId: number | null | undefined,
  shouldFetch = true,
  config?: Partial<SWRConfiguration>
) {
  const fetcher = async (hotelId: number) => {
    return await getGalleryHotelByHotelId(hotelId) // Return the full AxiosResponse
  }
  const swrKey = hotelId ? `hotel-gallery-${hotelId}` : null
  const {
    data,
    error,
    isLoading,
    mutate: boundMutate,
  } = useSWRFetcher(shouldFetch && swrKey, () => fetcher(hotelId!), config)

  return {
    data: data?.results, // Extract data for consumers
    isLoading,
    error,
    refresh: boundMutate,
  }
}
