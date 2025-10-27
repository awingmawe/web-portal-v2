/* eslint-disable @typescript-eslint/no-unused-vars */
// hooks/identity/useGetProvince.ts
import { toast } from '@/components/ui/sonner'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import { SubdistrictPostalCode } from '@/constant/types/LocationProps'
import {
  getDistrict,
  getKota,
  getProvince,
  getSubDistrictAndPostal,
} from '@/services/identity-service'
import { useSWRInfiniteFetcher } from '@/services/use-swr-fetcher'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { SWRInfiniteConfiguration } from 'swr/infinite'

export function useGetProvinceInfinite(
  baseQuery: Omit<GetListQuery, 'page'>, // page will be managed by infinite scroll
  config?: Partial<SWRInfiniteConfiguration> & {
    showErrorToast?: boolean
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}

  // ✅ Key generator function for infinite scroll
  const getKey = (pageIndex: number, previousPageData: any) => {
    // Reached the end
    if (previousPageData && !previousPageData.results.length) return null

    // First page, no previous data
    return [
      'get-province-infinite',
      {
        ...baseQuery,
        page: pageIndex + 1, // SWR uses 0-based index, API uses 1-based
      },
    ]
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
  } = useSWRInfiniteFetcher(
    getKey,
    ([_, query]) => getProvince(query),
    swrConfig
  )

  useEffect(() => {
    if (error && showErrorToast) {
      toast.error(error.message || 'Gagal memuat data provinsi', {
        description: error.code,
        action: {
          label: 'Coba Lagi',
        },
      })
    }
  }, [error, showErrorToast])

  return {
    data, // Flattened array of all provinces
    total,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    error,
    loadMore,
  }
}

export function useGetCityInfinite(
  baseQuery: Omit<GetListQuery, 'page'>,
  config?: Partial<SWRInfiniteConfiguration> & {
    showErrorToast?: boolean
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!baseQuery.provinceId) {
      return null
    }
    if (previousPageData && !previousPageData.results.length) return null
    return [
      'get-city-infinite',
      {
        ...baseQuery,
        page: pageIndex + 1,
      },
    ]
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
  } = useSWRInfiniteFetcher(getKey, ([_, query]) => getKota(query), swrConfig)

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

export function useGetDistrictInfinite(
  baseQuery: Omit<GetListQuery, 'page'>,
  config?: Partial<SWRInfiniteConfiguration> & {
    showErrorToast?: boolean
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!baseQuery.cityId) {
      return null
    }
    if (previousPageData && !previousPageData.results.length) return null
    return [
      'get-district-infinite',
      {
        ...baseQuery,
        page: pageIndex + 1,
      },
    ]
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
  } = useSWRInfiniteFetcher(
    getKey,
    ([_, query]) => getDistrict(query),
    swrConfig
  )

  useEffect(() => {
    if (error && showErrorToast) {
      toast.error(error.message || 'Gagal memuat data kecamatan', {
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

export function useGetSubDistrictInfinite(
  baseQuery: Omit<GetListQuery, 'page'>,
  config?: Partial<SWRInfiniteConfiguration> & {
    showErrorToast?: boolean
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!baseQuery.districtId) {
      return null
    }
    if (previousPageData && !previousPageData.results.length) return null
    return [
      'get-subdistrict-infinite',
      {
        ...baseQuery,
        page: pageIndex + 1,
      },
    ]
  }

  const fetchAndNormalize = async (
    key: any // key dari SWR
  ): Promise<AxiosResponse<GenericResponse<SubdistrictPostalCode>>> => {
    const query = key[1] // Ambil parameter query dari key

    // 1. Panggil fungsi API asli
    const response = await getSubDistrictAndPostal(query) // Ini mengembalikan AxiosResponse<PostalCodeResponse>

    // 2. Ambil data asli (PostalCodeResponse)
    const originalData = response.data

    // 3. Buat objek data yang dinormalisasi (GenericResponse)
    const normalizedData: GenericResponse<SubdistrictPostalCode> = {
      total: originalData.total,
      results: originalData.data, // ⬅️ INI DIA! Ubah `data` menjadi `results`
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
      toast.error(error.message || 'Gagal memuat data kelurahan', {
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
