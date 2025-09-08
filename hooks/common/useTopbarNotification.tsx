/* eslint-disable @typescript-eslint/no-unused-vars */
// hooks/common/useTopbarNotification.tsx
import { MoneysIcon } from '@/components/icons/moneys'
import { PersonalPaket } from '@/components/icons/personal-paket'
import { PilotSeatIcon } from '@/components/icons/pilot-seat'
import { ReceiptIcon } from '@/components/icons/receipt'
import { Badge, Notification } from '@/constant/types/NotificationProps'
import { getListNotif, postReadNotif } from '@/services/notification-service'
import { getNotificationBadge } from '@/services/umrah-service'
import { easeIn, easeOut } from 'framer-motion'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

// Types

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
// const mockNotifications: Notification[] = [
//   {
//     id: 1,
//     category: 'umroh',
//     title: 'Kuota Umroh September Hampir Penuh!',
//     description:
//       'Paket umroh September tersisa kuota terbatas. Segera amankan slot Kamu sebelum ditutup!',
//     time: '10 m',
//     isRead: false,
//     type: 'warning',
//   },
//   {
//     id: 2,
//     category: 'promo',
//     title: 'Diskon Khusus Hari Asyura!',
//     description:
//       'Dapatkan potongan hingga Rp1.000.000 untuk pembelian paket Umroh Plus Turki. Berlaku hanya sampai malam ini!',
//     time: '15 m',
//     isRead: false,
//     type: 'promo',
//   },
//   {
//     id: 3,
//     category: 'info',
//     title: 'Kini telah hadir Muslim Market!',
//     description:
//       'Dapatkan kemudahan saat berbelanja keperluan kamu di Muslim Market, yuk cek sekarang!',
//     time: '15 m',
//     isRead: false,
//     type: 'info',
//   },
// ]

const tabs: Tab[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'belum-dibaca', label: 'Belum dibaca' },
  { id: 'baca-semua', label: 'Baca Semua' },
]

export const useTopbarNotification = () => {
  // State management
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<Notification[]>()
  const [badge, setBadge] = useState<Badge>()
  const [countBadge, setCountBadge] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<TabId>('semua')
  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  const getDataList = async () => {
    try {
      const filter = {
        size,
        page,
        ...(activeTab !== 'semua' ? { readAt: 'isNull' } : {}),
      }
      const res = await getListNotif(filter)
      setNotifications(res)
    } catch (error) {
      console.log(error)
    }
  }
  const getDataBadge = async () => {
    try {
      const res = await getNotificationBadge()
      setBadge(res)
      const total =
        (res.needToBePaid ?? 0) +
        (res.onGoingTransaction ?? 0) +
        (res.waitingOffers ?? 0) +
        (res.checkAvailabilities ?? 0)
      setCountBadge(total)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDataList()
    getDataBadge()
  }, [activeTab])

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
    // setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))/
  }, [])

  const markAsRead = useCallback(async (notificationId: number) => {
    try {
      await postReadNotif(notificationId)
      getDataList()
      getDataBadge()
    } catch (error) {
      console.error(error)
    }
    // console.log(notificationId)
  }, [])

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
  const categories: Category[] = [
    {
      id: 'payment',
      label: 'Butuh Dibayar',
      count: badge?.needToBePaid ?? 0,
      icon: <MoneysIcon />,
    },
    {
      id: 'transaction',
      label: 'Transaksi',
      count: badge?.onGoingTransaction ?? 0,
      icon: <ReceiptIcon size={24} />,
    },
    {
      id: 'umroh',
      label: 'Umroh Personal',
      count: badge?.waitingOffers ?? 0,
      icon: <PersonalPaket />,
    },
    {
      id: 'quota',
      label: 'Cek Kuota',
      count: badge?.checkAvailabilities ?? 0,
      icon: <PilotSeatIcon />,
    },
  ]
  return {
    // State
    isExpanded,
    notifications,
    activeTab,
    categories,
    tabs,
    badge,
    // Refs
    inputRef,
    containerRef,
    countBadge,

    // Handlers
    handleNotifIconClick,
    handleTabClick,
    markAllAsRead,
    markAsRead,
    // Computed functions
    getNotificationBgClass,

    // Animation variants
    searchNotifVariants,
    notificationPanelVariants,
  }
}
