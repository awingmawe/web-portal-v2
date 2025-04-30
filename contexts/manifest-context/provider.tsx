'use client'

import { ManifestUser } from '@/constant/types/ManifestProps'
import { ManifestContext } from '@/contexts/manifest-context/context'
import { ReactNode, useState } from 'react'

interface ManifestProviderProps {
  children: ReactNode
}

export function ManifestProvider({ children }: ManifestProviderProps) {
  // State to track which manifest is active
  const [manifestActive, setManifestActive] = useState<ManifestUser>(
    {} as ManifestUser
  )

  const value = {
    manifestActive,
    setManifestActive,
  }

  return (
    <ManifestContext.Provider value={value}>
      {children}
    </ManifestContext.Provider>
  )
}
