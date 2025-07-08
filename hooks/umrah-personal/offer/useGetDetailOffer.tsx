import { getOfferUmrahPersonalById } from '@/services/umrah-service'
import { useSWRFetcher } from '@/services/use-swr-fetcher'
import { SWRConfiguration } from 'swr'

export function useOfferUmrahPersonalById(
  id: number | null | undefined,
  shouldFetch = true,
  config?: Partial<SWRConfiguration>
) {
  const fetcher = async (id: number) => {
    return await getOfferUmrahPersonalById(id) // Return the full AxiosResponse
  }
  const swrKey = id ? `umrah-personal-${id}` : null
  const {
    data,
    error,
    isLoading,
    mutate: boundMutate,
  } = useSWRFetcher(shouldFetch && swrKey, () => fetcher(id!), config)

  return {
    data, // Extract data for consumers
    isLoading,
    error,
    refresh: boundMutate,
  }
}
