import { ReactNode } from 'react'

// Types
export interface Notification {
  id: number
  category: string
  body: string
  title: string

  platformRoutes: {
    web: string
  }
  createdAt: string
  readAt?: string
  type: string
}

export interface Category {
  id: string
  label: string
  count: number
  icon: ReactNode
  href: string
}
export interface Tab {
  id: 'semua' | 'belum-dibaca' | 'baca-semua'
  label: string
}

export interface Badge {
  checkAvailabilities: number
  needToBePaid: number
  onGoingTransaction: number
  waitingOffers: number
}
