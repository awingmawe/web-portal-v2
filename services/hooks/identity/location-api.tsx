// hooks/identity/useGetProvince.ts
import { toast } from '@/components/ui/sonner'
import { GetListQuery } from '@/constant/types/GeneralProps'
import {
  getDistrict,
  getKota,
  getProvince,
  getSubDistrictAndPostal,
} from '@/services/identity-service'
import { useSWRInfiniteFetcher } from '@/services/use-swr-fetcher'
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
    pages,
    total,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
    refresh,
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
          onClick: () => refresh(),
        },
      })
    }
  }, [error, showErrorToast, refresh])

  return {
    data, // Flattened array of all provinces
    pages, // Original pages data
    total,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    error,
    loadMore,
    refresh,
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
    pages,
    total,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
    refresh,
  } = useSWRInfiniteFetcher(getKey, ([_, query]) => getKota(query), swrConfig)

  useEffect(() => {
    if (error && showErrorToast) {
      toast.error(error.message || 'Gagal memuat data kota', {
        description: error.code,
        action: {
          label: 'Coba Lagi',
          onClick: () => refresh(),
        },
      })
    }
  }, [error, showErrorToast, refresh])

  return {
    data,
    pages,
    total,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    error,
    loadMore,
    refresh,
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
    pages,
    total,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
    refresh,
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
          onClick: () => refresh(),
        },
      })
    }
  }, [error, showErrorToast, refresh])

  return {
    data,
    pages,
    total,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    error,
    loadMore,
    refresh,
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
    if (previousPageData && !previousPageData.results.length) return null
    return [
      'get-subdistrict-infinite',
      {
        ...baseQuery,
        page: pageIndex + 1,
      },
    ]
  }

  const {
    data,
    pages,
    total,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
    refresh,
  } = useSWRInfiniteFetcher(
    getKey,
    ([_, query]) => getSubDistrictAndPostal(query),
    swrConfig
  )

  useEffect(() => {
    if (error && showErrorToast) {
      toast.error(error.message || 'Gagal memuat data kelurahan', {
        description: error.code,
        action: {
          label: 'Coba Lagi',
          onClick: () => refresh(),
        },
      })
    }
  }, [error, showErrorToast, refresh])

  return {
    data,
    pages,
    total,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    error,
    loadMore,
    refresh,
  }
}
