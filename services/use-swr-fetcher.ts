import { AxiosResponse } from 'axios'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'

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
