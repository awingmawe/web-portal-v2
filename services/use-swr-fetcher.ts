import { AxiosResponse } from 'axios'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

type SWRHookFn<T> = (params: any) => Promise<AxiosResponse<T, any>>

/**
 * Generic SWR Mutation fetcher
 * For GET operations
 */
export function useSWRFetcher<T>(
  key: any,
  fetcherFunction: SWRHookFn<T>,
  config?: Partial<SWRConfiguration>
) {
  const { data, ...response } = useSWR(key, fetcherFunction, config)

  return {
    data: data?.data,
    ...response,
  }
}

type MutationKey = string | [string, any]

/**
 * Generic SWR Mutation fetcher
 * For POST, PATCH, PUT, DELETE operations
 */
export function useSWRMutationFetcher<TData, TArg = any>(
  key: MutationKey,
  mutationFunction: (arg: TArg) => Promise<AxiosResponse<TData>>,
  config?: SWRMutationConfiguration<TData, any, MutationKey, TArg>
) {
  const { trigger, data, error, isMutating, reset } = useSWRMutation(
    key,
    async (_: any, { arg }: { arg: TArg }) => {
      const response = await mutationFunction(arg)
      return response.data
    },
    config
  )

  return {
    trigger,
    data,
    error,
    isMutating,
    reset,
  }
}

/**
 * Generic SWR Infinite fetcher for pagination
 */
export function useSWRInfiniteFetcher<T>(
  getKey: (pageIndex: number, previousPageData: any) => any,
  fetcherFunction: (key: any) => Promise<AxiosResponse<T>>,
  config?: SWRInfiniteConfiguration
) {
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite(
      getKey,
      async (key) => {
        const response = await fetcherFunction(key)
        return response.data
      },
      {
        revalidateFirstPage: false,
        revalidateAll: false,
        ...config,
      }
    )

  // Flatten all pages data
  const flattenedData = data ? data.flatMap((page) => page.results) : []

  // Check if we're loading more (not initial load)
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')

  // Check if we've reached the end
  const isEmpty = data?.[0]?.results?.length === 0
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.results?.length < (data[0]?.size || 10))

  // Get total count
  const total = data?.[0]?.total || 0

  return {
    data: flattenedData, // All data flattened
    pages: data, // Original pages data
    total,
    error,
    isLoading, // Initial loading
    isLoadingMore, // Loading more pages
    isValidating,
    isReachingEnd, // No more data
    isEmpty,
    size, // Current page count
    setSize, // Function to load more
    loadMore: () => setSize(size + 1), // Helper to load next page
    refresh: mutate,
  }
}
