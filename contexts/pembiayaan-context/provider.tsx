'use client'

import { ReactNode, useState } from 'react'
import { PembiayaanContext } from './context'

export const PembiayaanProvider = ({ children }: { children: ReactNode }) => {
  const [monthlyPayment, setMonthlyPayment] = useState('')
  const [tenor, setTenor] = useState('')

  const value = {
    monthlyPayment,
    setMonthlyPayment,
    tenor,
    setTenor,
  }

  return (
    <PembiayaanContext.Provider value={value}>
      {children}
    </PembiayaanContext.Provider>
  )
}
