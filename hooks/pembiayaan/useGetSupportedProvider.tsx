'use client'

import { useGetProviderPublic } from '@/services/hooks/banking-service/credits-api'
import { useMemo } from 'react'

export const useUniqueSupportedProviders = (isPaused: boolean) => {
  const { data: dataProviders, isLoading } = useGetProviderPublic(
    {
      page: 1,
      size: 10,
    },
    {
      isPaused: () => isPaused,
    }
  )

  const uniqueSupportedProviders = useMemo(
    () =>
      dataProviders
        ? [
            ...new Set(
              dataProviders.flatMap(
                (provider) => provider.supported_organizations
              )
            ),
          ]
        : [],
    [dataProviders]
  )

  return {
    isLoading,
    dataProviders,
    uniqueSupportedProviders: uniqueSupportedProviders.join(','),
  }
}
