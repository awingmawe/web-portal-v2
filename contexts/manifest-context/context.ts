'use client'

import { GenericResponse } from '@/constant/types/GeneralProps'
import { City } from '@/constant/types/LocationProps'
import { ManifestUser } from '@/constant/types/ManifestProps'
import { createContext, useContext } from 'react'

type ManifestContextProps = {
  manifestActive: ManifestUser
  setManifestActive: (manifest: ManifestUser) => void
  fetchCity: (
    page: number,
    searchQuery: string
  ) => Promise<GenericResponse<City> | null>
}

export const ManifestContext = createContext<ManifestContextProps>({
  manifestActive: {} as ManifestUser,
  setManifestActive: () => {},
  fetchCity: async () => null,
})

export const useManifest = () => useContext(ManifestContext)
