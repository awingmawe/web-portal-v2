import { toast } from '@/components/ui/sonner'
import { GetListQuery } from '@/constant/types/GeneralProps'
import {
  createCalculateFinancing,
  getProvider,
} from '@/services/banking-service'
import {
  useSWRFetcher,
  useSWRMutationFetcher,
} from '@/services/use-swr-fetcher'
import { useEffect } from 'react'
import { mutate, SWRConfiguration } from 'swr'

export function useGetProvider(
  query: GetListQuery,
  config?: Partial<SWRConfiguration> & {
    showErrorToast?: boolean // Custom option
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}
  const fetcher = async () => {
    return await getProvider(query)
  }
  const swrKey = `get-providers`
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
    data: data?.data,
    isLoading,
    error,
    refresh: boundMutate,
  }
}

export function useCalculateFinancing(config?: {
  showSuccessToast?: boolean
  showErrorToast?: boolean
}) {
  const { showErrorToast = true } = config || {}

  const { trigger, data, error, isMutating } = useSWRMutationFetcher(
    'create-provider',
    (data) =>
      createCalculateFinancing({
        totalAmount: data.totalAmount,
        tenor: data.tenor,
      }),
    {
      onSuccess: () => {
        mutate(
          (key) => typeof key === 'string' && key.includes('credit-providers')
        )
      },
      onError: (err) => {
        if (showErrorToast) {
          toast.error('Gagal menghitung kalkulasi pembiayaan', {
            description: err?.message || 'Terjadi kesalahan',
          })
        }
      },
    }
  )

  return {
    create: trigger, // Trigger function
    data,
    error,
    isLoading: isMutating,
  }
}
