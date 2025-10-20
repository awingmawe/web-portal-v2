import { GetListQuery } from '@/constant/types/GeneralProps'
import { getProvider } from '@/services/banking-service'
import { useSWRFetcher } from '@/services/use-swr-fetcher'
import { SWRConfiguration } from 'swr'

export function useGetProvider(
  query: GetListQuery,
  config: Partial<SWRConfiguration>
) {
  const fetcher = async () => {
    return await getProvider(query) // Return the full AxiosResponse
  }
  const {
    data,
    error,
    isLoading,
    mutate: boundMutate,
  } = useSWRFetcher({}, () => fetcher(), config)

  return {
    data: data?.data, // Extract data for consumers
    isLoading,
    error,
    refresh: boundMutate,
  }
}
