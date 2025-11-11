import { toast } from '@/components/ui/sonner'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import {
  ErrorSubmissionPembiayaan,
  RequestSubmissionPembiayaan,
} from '@/constant/types/Pembiayaan'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import {
  listSubmissionPembiayaan,
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

export function useGetSubmissionList(
  query: GetListQuery,
  config?: Partial<SWRConfiguration> & {
    showErrorToast?: boolean // Custom option
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}
  const fetcher = async () => {
    return await listSubmissionPembiayaan(query)
  }
  const swrKey = `get-submission`
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
    data,
    isLoading,
    error,
    refresh: boundMutate,
  }
}

export function useGetSubmissionListInfinite(
  baseQuery: Omit<GetListQuery, 'page'>,
  config?: Partial<SWRInfiniteConfiguration> & {
    showErrorToast?: boolean
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data.length) return null
    return [
      'get-submission-infinite',
      {
        ...baseQuery,
        page: pageIndex + 1,
      },
    ]
  }

  const fetchAndNormalize = async (
    key: any // key dari SWR
  ): Promise<AxiosResponse<GenericResponse<SubmissionCredit>>> => {
    const query = key[1] // Ambil parameter query dari key

    // 1. Panggil fungsi API asli
    const response = await listSubmissionPembiayaan(query) // Ini mengembalikan AxiosResponse<PostalCodeResponse>

    // 2. Ambil data asli (PostalCodeResponse)
    const originalData = response.data

    // 3. Buat objek data yang dinormalisasi (GenericResponse)
    const normalizedData: GenericResponse<SubmissionCredit> = {
      total: originalData.total,
      results: originalData.data,
    }

    // 4. Kembalikan AxiosResponse yang baru dengan data yang sudah dinormalisasi
    return {
      ...response, // Salin status, headers, dll.
      data: normalizedData, // Timpa `data` dengan versi normalisasi kita
    }
  }

  const {
    data,
    total,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
  } = useSWRInfiniteFetcher(getKey, fetchAndNormalize, swrConfig)

  useEffect(() => {
    if (error && showErrorToast) {
      toast.error(error.message || 'Gagal memuat data kota', {
        description: error.code,
        action: {
          label: 'Coba Lagi',
        },
      })
    }
  }, [error, showErrorToast])

  return {
    data,
    total,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    error,
    loadMore,
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
