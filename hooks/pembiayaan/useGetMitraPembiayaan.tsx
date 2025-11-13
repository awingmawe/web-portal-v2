'use client'

import { Provider } from '@/constant/types/Providers'
import { useGetProviderPublic } from '@/services/hooks/banking-service/credits-api'
import { useMemo } from 'react'

/**
 * Hook untuk menghitung `organizationInstanceId` berdasarkan `providerId` yang dipilih.
 * @param providerIds - String ID provider yang dipisahkan koma (dari URL param 'pV').
 * @param isPaused - Boolean untuk menonaktifkan fetch jika tidak diperlukan.
 * @returns Objek yang berisi `organizationInstanceId` yang dihitung dan status loading.
 */
export const useGetOrganizationIdFromProviders = (
  providerIds: string | null,
  isPaused: boolean
) => {
  const { data: dataProviders, isLoading } = useGetProviderPublic(
    {
      page: 1,
      size: 100, // Ambil semua provider untuk memastikan pemetaan yang akurat
    },
    {
      isPaused: () => isPaused,
    }
  )

  const organizationInstanceId = useMemo(() => {
    if (!providerIds || !dataProviders) return ''

    const selectedIds = providerIds.split(',')
    const selectedProviders = dataProviders.filter((p: Provider) =>
      selectedIds.includes(String(p.id))
    )
    const orgIds = selectedProviders.flatMap((p) => p.supported_organizations)
    const uniqueOrgIds = [...new Set(orgIds)]

    return uniqueOrgIds.length > 0 ? uniqueOrgIds.join(',') : '0'
  }, [dataProviders, providerIds])

  return {
    isLoading,
    organizationInstanceId,
  }
}
