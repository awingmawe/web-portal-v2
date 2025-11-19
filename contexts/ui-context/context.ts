'use client'

import { createContext, useContext } from 'react'

type UIContextProps = {
  isChangePackageModalOpen: boolean
  setChangePackageModalOpen: (isOpen: boolean) => void
  isPembiayaanDrawerOpen: boolean
  setPembiayaanDrawerOpen: (isOpen: boolean) => void
}

export const UIContext = createContext<UIContextProps>({
  isChangePackageModalOpen: false,
  setChangePackageModalOpen: () => {},
  isPembiayaanDrawerOpen: false,
  setPembiayaanDrawerOpen: () => {},
})

export const useUI = () => {
  return useContext(UIContext)
}
