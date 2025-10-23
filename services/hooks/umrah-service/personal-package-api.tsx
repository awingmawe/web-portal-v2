import { toast } from '@/components/ui/sonner'
import { getOfferUmrahPersonalById } from '@/services/umrah-service'
import { useSWRFetcher } from '@/services/use-swr-fetcher'
import { useEffect } from 'react'
import { SWRConfiguration } from 'swr'

export function useFetchAirline(
  id: number | null | undefined,
  shouldFetch = true,
  config?: Partial<SWRConfiguration> & {
    showErrorToast?: boolean // Custom option
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}
  const fetcher = async (id: number) => {
    return await getOfferUmrahPersonalById(id) // Return the full AxiosResponse
  }
  const swrKey = id ? `umrah-personal-${id}` : null
  const {
    data,
    error,
    isLoading,
    mutate: boundMutate,
  } = useSWRFetcher(shouldFetch && swrKey, () => fetcher(id!), swrConfig)

  useEffect(() => {
    if (error && showErrorToast) {
      toast.error(error.message, {
        description: error.code,
        action: {
          label: 'Coba Lagi',
          onClick: () => boundMutate(),
        },
      })
    }
  }, [error, showErrorToast, boundMutate])

  return {
    data, // Extract data for consumers
    isLoading,
    error,
    refresh: boundMutate,
  }
}
