import { ManifestUser } from '@/constant/types/ManifestProps'
import { createContext, useContext } from 'react'

type ManifestContextProps = {
  manifestActive: ManifestUser
  setManifestActive: (manifest: ManifestUser) => void
}

export const ManifestContext = createContext<ManifestContextProps>({
  manifestActive: {} as ManifestUser,
  setManifestActive: () => {},
})

export const useManifest = () => useContext(ManifestContext)
