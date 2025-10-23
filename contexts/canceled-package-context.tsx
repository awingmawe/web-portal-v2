'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

export const CanceledContext = createContext<any>(null)

export const CanceledProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [openBatalkan, setOpenBatalkan] = useState(false)
  const [openBatalkanInfo, setOpenBatalkanInfo] = useState(false)
  const [openModalRefund, setOpenModalRefund] = useState<any>(false)
  const [openModalSukses, setOpenModalSukses] = useState<any>(false)
  const [dataRefundPolicy, setDataRefundPolicy] = useState<any>()
  const [parsedContent, setParsedContent] = useState<any>(null)
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [openFormRefund, setOpenFormRefund] = useState(false)
  const [openVerifikasiEmail, setOpenVerifikasiEmail] = useState(false)
  const [openSuksesRefund, setOpenSuksesRefund] = useState(false)
  const [selectedBank, setSelectedBank] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const value = {
    open,
    setOpen,
    openBatalkan,
    setOpenBatalkan,
    openBatalkanInfo,
    setOpenBatalkanInfo,
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
    openFormRefund,
    setOpenFormRefund,
    openVerifikasiEmail,
    setOpenVerifikasiEmail,
    openSuksesRefund,
    setOpenSuksesRefund,
    setSelectedBank,
    selectedBank,
    setAccountNumber,
    accountNumber,
    setAccountName,
    accountName,
  }
  return (
    <CanceledContext.Provider value={value}>
      {children}
    </CanceledContext.Provider>
  )
}

export const useCanceled = () => useContext(CanceledContext)
