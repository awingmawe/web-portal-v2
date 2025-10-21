'use client'

import { useGetProvider } from '@/hooks/filter-product-hooks/useGetProvider'
import { useMemo } from 'react'

export const useUniqueSupportedProviders = (isPaused: boolean) => {
  const { data: dataProviders } = useGetProvider(
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

  return uniqueSupportedProviders.join(',')
}
