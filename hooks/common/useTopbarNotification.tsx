// hooks/common/useTopbarNotification.tsx
import { MoneysIcon } from '@/components/icons/moneys'
import { PersonalPaket } from '@/components/icons/personal-paket'
import { PilotSeatIcon } from '@/components/icons/pilot-seat'
import { ReceiptIcon } from '@/components/icons/receipt'
import { easeIn, easeOut } from 'framer-motion'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

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

type TabId = 'semua' | 'belum-dibaca' | 'baca-semua'
export interface Tab {
  id: 'semua' | 'belum-dibaca' | 'baca-semua'
  label: string
}
// Mock data
const mockNotifications: Notification[] = [
  {
    id: 1,
    category: 'umroh',
    title: 'Kuota Umroh September Hampir Penuh!',
    description:
      'Paket umroh September tersisa kuota terbatas. Segera amankan slot Kamu sebelum ditutup!',
    time: '10 m',
    isRead: false,
    type: 'warning',
  },
  {
    id: 2,
    category: 'promo',
    title: 'Diskon Khusus Hari Asyura!',
    description:
      'Dapatkan potongan hingga Rp1.000.000 untuk pembelian paket Umroh Plus Turki. Berlaku hanya sampai malam ini!',
    time: '15 m',
    isRead: false,
    type: 'promo',
  },
  {
    id: 3,
    category: 'info',
    title: 'Kini telah hadir Muslim Market!',
    description:
      'Dapatkan kemudahan saat berbelanja keperluan kamu di Muslim Market, yuk cek sekarang!',
    time: '15 m',
    isRead: false,
    type: 'info',
  },
]

const categories: Category[] = [
  { id: 'payment', label: 'Butuh Dibayar', count: 3, icon: <MoneysIcon /> },
  {
    id: 'transaction',
    label: 'Transaksi',
    count: 1,
    icon: <ReceiptIcon size={24} />,
  },
  { id: 'umroh', label: 'Umroh Personal', count: 1, icon: <PersonalPaket /> },
  { id: 'quota', label: 'Cek Kuota', count: 1, icon: <PilotSeatIcon /> },
]
const tabs: Tab[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'belum-dibaca', label: 'Belum dibaca' },
  { id: 'baca-semua', label: 'Baca Semua' },
]

export const useTopbarNotification = () => {
  // State management
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState<TabId>('semua')

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Computed values
  const unreadCount = notifications.filter((n) => !n.isRead).length

  // Handle click outside to close notification panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  // Focus input when expanded and maintain focus when popover opens
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current?.focus()
    }
  }, [isExpanded])

  const handleNotifIconClick = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  const handleTabClick = useCallback((tabId: TabId) => {
    if (tabId === 'baca-semua') {
      markAllAsRead()
    } else {
      setActiveTab(tabId)
    }
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }, [])

  const markAsRead = useCallback((notificationId: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    )
  }, [])

  const getFilteredNotifications = useCallback((): Notification[] => {
    switch (activeTab) {
      case 'belum-dibaca':
        return notifications.filter((n) => !n.isRead)
      case 'baca-semua':
        return notifications.filter((n) => n.isRead)
      default:
        return notifications
    }
  }, [activeTab, notifications])

  const getNotificationBgClass = useCallback(
    (type: Notification['type']): string => {
      switch (type) {
        case 'warning':
          return 'bg-orange-100'
        case 'promo':
          return 'bg-green-100'
        case 'info':
          return 'bg-blue-100'
        default:
          return 'bg-gray-100'
      }
    },
    []
  )

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now(), // Simple ID generation
      }
      setNotifications((prev) => [newNotification, ...prev])
    },
    []
  )

  const removeNotification = useCallback((notificationId: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }, [])

  // Animation variants
  const searchNotifVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: easeIn,
      },
    },
  }

  const notificationPanelVariants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: easeOut,
      },
    },
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
  }

  return {
    // State
    isExpanded,
    notifications,
    activeTab,
    unreadCount,
    categories,
    tabs,

    // Refs
    inputRef,
    containerRef,

    // Handlers
    handleNotifIconClick,
    handleTabClick,
    markAllAsRead,
    markAsRead,
    addNotification,
    removeNotification,

    // Computed functions
    getFilteredNotifications,
    getNotificationBgClass,

    // Animation variants
    searchNotifVariants,
    notificationPanelVariants,
  }
}
