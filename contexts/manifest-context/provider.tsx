'use client'

import { GenericResponse } from '@/constant/types/GeneralProps'
import { City } from '@/constant/types/LocationProps'
import { ManifestUser } from '@/constant/types/ManifestProps'
import { ManifestContext } from '@/contexts/manifest-context/context'
import { getKota } from '@/services/identity-service'
import { ReactNode, useCallback, useState } from 'react'

interface ManifestProviderProps {
  children: ReactNode
}

export function ManifestProvider({ children }: ManifestProviderProps) {
  // State to track which manifest is active
  const [manifestActive, setManifestActive] = useState<ManifestUser>(
    {} as ManifestUser
  )

  const fetchCity = useCallback(
    async (
      page: number,
      searchQuery: string,
      countryId?: string
    ): Promise<GenericResponse<City> | null> => {
      try {
        const data = await getKota({
          page: page,
          size: 20,
          orderBy: 'name',
          order: 'desc',
          [`name:likeLower`]: searchQuery ? `%${searchQuery}%` : undefined,
          ...(countryId && { countryId }),
        })
        return data
      } catch (error) {
        console.error('Error fetching city:', error)
        return null
      }
    },
    []
  )

  const value = {
    manifestActive,
    setManifestActive,
    fetchCity,
  }

  return (
    <ManifestContext.Provider value={value}>
      {children}
    </ManifestContext.Provider>
  )
}
