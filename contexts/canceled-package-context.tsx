'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

export const CanceledContext = createContext<any>(null)

export const CanceledProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [openBatalkan, setOpenBatalkan] = useState(false)
  const [openModalRefund, setOpenModalRefund] = useState<any>(false)
  const [openModalSukses, setOpenModalSukses] = useState<any>(false)
  const [dataRefundPolicy, setDataRefundPolicy] = useState<any>()
  const [parsedContent, setParsedContent] = useState<any>(null)
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const value = {
    open,
    setOpen,
    openBatalkan,
    setOpenBatalkan,
    openModalRefund,
    setOpenModalRefund,
    openModalSukses,
    setOpenModalSukses,
    dataRefundPolicy,
    setDataRefundPolicy,
    parsedContent,
    setParsedContent,
    reason,
    setReason,
    description,
    setDescription,
  }
  return (
    <CanceledContext.Provider value={value}>
      {children}
    </CanceledContext.Provider>
  )
}

export const useCanceled = () => useContext(CanceledContext)
