'use client'

import { ReactNode, useState } from 'react'
import { PembiayaanContext } from './context'

export const PembiayaanProvider = ({ children }: { children: ReactNode }) => {
  const [monthlyPayment, setMonthlyPayment] = useState('')
  const [tenor, setTenor] = useState('')
  const [totalPrice, setTotalPrice] = useState('')

  const value = {
    monthlyPayment,
    setMonthlyPayment,
    tenor,
    setTenor,
    totalPrice,
    setTotalPrice,
  }

  return (
    <PembiayaanContext.Provider value={value}>
      {children}
    </PembiayaanContext.Provider>
  )
}
