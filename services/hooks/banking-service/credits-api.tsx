import { toast } from '@/components/ui/sonner'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import {
  ErrorSubmissionPembiayaan,
  RequestPrePembiayaan,
  RequestSubmissionPembiayaan,
} from '@/constant/types/Pembiayaan'
import { Coverage, CoverageResponse } from '@/constant/types/Providers'
import {
  createCalculateFinancing,
  getProviderByCoverage,
  getProviderPublic,
  getProviders,
  preCreatePembiayaan,
  submissionPembiayaan,
} from '@/services/banking-service'
import {
  useSWRFetcher,
  useSWRInfiniteFetcher,
  useSWRMutationFetcher,
} from '@/services/use-swr-fetcher'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { mutate, SWRConfiguration } from 'swr'
import { SWRInfiniteConfiguration } from 'swr/infinite'

export function useGetProviderPublic(
  query: GetListQuery,
  config?: Partial<SWRConfiguration> & {
    showErrorToast?: boolean // Custom option
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}
  const fetcher = async () => {
    return await getProviderPublic(query)
  }
  const swrKey = `get-providers-public`
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

export function useGetProvider(
  query: GetListQuery,
  config?: Partial<SWRConfiguration> & {
    showErrorToast?: boolean // Custom option
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}
  const fetcher = async () => {
    return await getProviders(query)
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
      onSuccess: () => {
        mutate(
          (key) =>
            typeof key === 'string' && key.includes('calculate-pembiayaan')
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

export function useGetProviderByCoverage(
  providerId: number,
  query: GetListQuery,
  config?: Partial<SWRInfiniteConfiguration> & {
    showErrorToast?: boolean // Custom option
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}

  const getKey = (
    pageIndex: number,
    previousPageData: AxiosResponse<GenericResponse<Coverage>> | null
  ) => {
    // Jika providerId tidak ada, jangan fetch data
    if (!providerId) return null

    // Reached the end
    if (previousPageData && !previousPageData.data.results.length) return null

    // First page, no previous data
    return [
      'get-provider-by-coverage-infinite',
      providerId,
      {
        ...query,
        page: pageIndex + 1, // SWR uses 0-based index, API uses 1-based
      },
    ]
  }

  const fetchAndNormalize = async (
    key: any
  ): Promise<AxiosResponse<GenericResponse<Coverage>>> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, pId, q] = key
    const response: AxiosResponse<CoverageResponse> =
      await getProviderByCoverage(pId, q)
    const originalData = response.data

    const normalizedData: GenericResponse<Coverage> = {
      total: originalData.total,
      results: originalData.coverages, // Normalisasi dari 'coverages' ke 'results'
    }

    return {
      ...response,
      data: normalizedData,
    }
  }

  const {
    data,
    total,
    error,
    isLoading,
    isLoadingMore,
    loadMore,
    isReachingEnd,
  } = useSWRInfiniteFetcher(getKey, fetchAndNormalize, swrConfig)

  useEffect(() => {
    if (error && showErrorToast) {
      toast.error(error.message || 'Gagal memuat data jangkauan', {
        description: error.code,
      })
    }
  }, [error, showErrorToast])

  return {
    data,
    total,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    error,
    loadMore,
  }
}
