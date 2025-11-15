'use client'

import { useSearchParams } from 'next/navigation'

/**
 * Custom hook to determine if the provider filter should be locked.
 * This is typically used in a "change package" flow where a provider is pre-selected via URL parameters.
 *
 * @returns {boolean} `true` if the provider filter should be locked, otherwise `false`.
 */
export const useIsProviderFilterLocked = (): boolean => {
  const searchParams = useSearchParams()
  const packageParam = searchParams.get('package')
  const providerParam = searchParams.get('pV')

  return packageParam === 'change_package' && !!providerParam
}
