import { toast } from '@/components/ui/sonner'
import { getFacilityEnum } from '@/services/general-service'
import { useSWRFetcher } from '@/services/use-swr-fetcher'
import { useEffect } from 'react'
import { SWRConfiguration } from 'swr'

export function useGetReference(
  type: string,
  config?: Partial<SWRConfiguration> & {
    showErrorToast?: boolean // Custom option
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}
  const fetcher = async () => {
    return await getFacilityEnum(type)
  }
  const swrKey = `get-reference`
  const {
    data,
    error,
    isLoading,
    mutate: boundMutate,
  } = useSWRFetcher([swrKey, type], () => fetcher(), swrConfig)

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
    data: data?.results,
    isLoading,
    error,
    refresh: boundMutate,
  }
}
