import { toast } from '@/components/ui/sonner'
import { GetListQuery } from '@/constant/types/GeneralProps'
import { getPackageVariantList } from '@/services/umrah-service'
import { useSWRFetcher } from '@/services/use-swr-fetcher'
import { useEffect } from 'react'
import { SWRConfiguration } from 'swr'

export function useGetPackageVariantList(
  query: GetListQuery,
  config?: Partial<SWRConfiguration> & {
    showErrorToast?: boolean
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}
  const fetcher = async () => {
    return await getPackageVariantList(query)
  }
  const swrKey = `get-package-variant-list`
  const {
    data,
    error,
    isLoading,
    mutate: boundMutate,
  } = useSWRFetcher([swrKey, query], () => fetcher(), swrConfig)

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
