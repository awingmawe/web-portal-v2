'use client'

import { ReactNode, useState } from 'react'
import { UIContext } from './context'

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isChangePackageModalOpen, setChangePackageModalOpen] = useState(false)
  const [isPembiayaanDrawerOpen, setPembiayaanDrawerOpen] = useState(false)

  const value = {
    isChangePackageModalOpen,
    setChangePackageModalOpen,
    isPembiayaanDrawerOpen,
    setPembiayaanDrawerOpen,
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
