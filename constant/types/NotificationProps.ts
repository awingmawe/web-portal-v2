import { ReactNode } from 'react'

// Types
export interface Notification {
  id: number
  category: string
  title: string
  description: string
  time: string
  isRead: boolean
  type: 'warning' | 'promo' | 'info'
}

export interface Category {
  id: string
  label: string
  count: number
  icon: ReactNode
}
export interface Tab {
  id: 'semua' | 'belum-dibaca' | 'baca-semua'
  label: string
}
