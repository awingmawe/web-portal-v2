'use client'

import { createContext, useContext } from 'react'

type PembiayaanContextProps = {
  setMonthlyPayment: (price: string) => void
  monthlyPayment: string

  setTenor: (tenor: string) => void
  tenor: string

  setTotalPrice: (price: string) => void
  totalPrice: string
}

export const PembiayaanContext = createContext<PembiayaanContextProps>({
  monthlyPayment: '',
  setMonthlyPayment: () => {},

  tenor: '',
  setTenor: () => {},

  totalPrice: '',
  setTotalPrice: () => {},
})

export const usePembiayaan = () => useContext(PembiayaanContext)
