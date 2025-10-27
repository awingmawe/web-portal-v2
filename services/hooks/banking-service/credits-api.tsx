import { toast } from '@/components/ui/sonner'
import { GetListQuery } from '@/constant/types/GeneralProps'
import {
  ErrorSubmissionPembiayaan,
  RequestPrePembiayaan,
  RequestSubmissionPembiayaan,
} from '@/constant/types/Pembiayaan'
import {
  createCalculateFinancing,
  getProvider,
  preCreatePembiayaan,
  submissionPembiayaan,
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
    'calculate-pembiayaan',
    (data) =>
      createCalculateFinancing({
        totalAmount: data.totalAmount,
        tenor: data.tenor,
      }),
    {
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

export function useCreateSubmissionPembiayaan(config?: {
  showSuccessToast?: boolean
  showErrorToast?: boolean
}) {
  const { showErrorToast = true } = config || {}

  const { trigger, data, error, isMutating } = useSWRMutationFetcher(
    'create-submission',
    (data: RequestSubmissionPembiayaan) => submissionPembiayaan(data),
    {
      onSuccess: () => {
        mutate(
          (key) => typeof key === 'string' && key.includes('create-submission')
        )
      },
      onError: (err: ErrorSubmissionPembiayaan) => {
        if (showErrorToast) {
          toast.error(err.message)
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

export function usePreCreatePembiayaan(config?: {
  showSuccessToast?: boolean
  showErrorToast?: boolean
}) {
  const { showErrorToast = true } = config || {}

  const { trigger, data, error, isMutating } = useSWRMutationFetcher(
    'create-pre',
    (data: RequestPrePembiayaan) => preCreatePembiayaan(data),
    {
      onSuccess: () => {
        mutate((key) => typeof key === 'string' && key.includes('create-pre'))
      },
      onError: (err: ErrorSubmissionPembiayaan) => {
        if (showErrorToast) {
          toast.error(err.message)
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
