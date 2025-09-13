'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { MoneysIcon } from '@/components/icons/moneys'
import { PersonalPaket } from '@/components/icons/personal-paket'
import { PilotSeatIcon } from '@/components/icons/pilot-seat'
import { ReceiptIcon } from '@/components/icons/receipt'
import {
  Badge,
  Category,
  Notification,
} from '@/constant/types/NotificationProps'
import {
  getListCountNotif,
  getListNotif,
  postReadNotif,
} from '@/services/notification-service'
import { getNotificationBadge } from '@/services/umrah-service'
import { easeIn, easeOut } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

// Types

type TabId = 'semua' | 'belum-dibaca' | 'baca-semua'
export interface Tab {
  id: 'semua' | 'belum-dibaca' | 'baca-semua'
  label: string
}

const tabs: Tab[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'belum-dibaca', label: 'Belum dibaca' },
  { id: 'baca-semua', label: 'Baca Semua' },
]

export const useTopbarNotification = ({ token }: { token: string }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<Notification[]>()
  const [badge, setBadge] = useState<Badge>()
  const [countBadge, setCountBadge] = useState<number>(0)
  const [totalNotif, setTotalNotif] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<TabId>('semua')
  const [size, setSize] = useState<number>(3)
  const [page, setPage] = useState<number>(1)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current?.focus()
    }
  }, [isExpanded])

  const getDataList = useCallback(async () => {
    try {
      const filter = {
        size,
        page,
        order: 'desc',
        orderBy: 'createdAt',
        ...(activeTab === 'belum-dibaca' ? { readAt: 'isNull' } : {}),
      }
      const res = await getListNotif(filter, token)
      setNotifications(res.results)
      setTotalNotif(res.total)
    } catch (error) {
      console.error(error)
    }
  }, [size, page, activeTab, token])

  const getDataBadge = useCallback(async () => {
    try {
      const res = await getNotificationBadge(token)
      const resStat = await getListCountNotif(token)

      setBadge(res)

      const total =
        (res.needToBePaid ?? 0) +
        (res.onGoingTransaction ?? 0) +
        (res.waitingOffers ?? 0) +
        (res.checkAvailabilities ?? 0) +
        (resStat.unread ?? 0)

      setCountBadge(total)
    } catch (error) {
      console.error(error)
    }
  }, [token])

  useEffect(() => {
    if (!token) return

    const loadData = async () => {
      await Promise.all([getDataList(), getDataBadge()])
    }

    loadData()
  }, [activeTab, size, page, token])

  const handleNotifIconClick = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  const handleTabClick = useCallback((tabId: TabId) => {
    setActiveTab(tabId)
    setPage(1)
  }, [])

  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await postReadNotif(notificationId, token)
        return true
      } catch (error) {
        console.error('Error marking notification as read:', error)
        throw error
      }
    },
    [token]
  )

  const markAsReadAll = useCallback(async () => {
    try {
      await postReadNotif('all', token)
      setTimeout(async () => {
        await Promise.all([getDataList(), getDataBadge()])
      }, 200)

      return true
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      throw error
    }
  }, [token, getDataList, getDataBadge])

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
      icon: <MoneysIcon size={24} />,
      href: '/my/need-payment?type=completed&page=1&query=&date=',
    },
    {
      id: 'transaction',
      label: 'Transaksi',
      count: badge?.onGoingTransaction ?? 0,
      icon: <ReceiptIcon size={24} />,
      href: '/my/transaction?type=upcoming&page=1&query=&status=all&date=',
    },
    {
      id: 'umroh',
      label: 'Umroh Personal',
      count: badge?.waitingOffers ?? 0,
      icon: <PersonalPaket size={24} />,
      href: '/my/paket-personal',
    },
    {
      id: 'quota',
      label: 'Cek Kuota',
      count: badge?.checkAvailabilities ?? 0,
      icon: <PilotSeatIcon size={24} />,
      href: '/my/check-availability',
    },
  ]

  return {
    isExpanded,
    notifications,
    activeTab,
    categories,
    tabs,
    badge,
    inputRef,
    containerRef,
    countBadge,
    setNotifications,
    setBadge,
    setCountBadge,
    setSize,
    setPage,
    handleNotifIconClick,
    handleTabClick,
    markAsRead,
    markAsReadAll,
    totalNotif,
    page,
    size,
    getNotificationBgClass,
    searchNotifVariants,
    notificationPanelVariants,
    getDataList,
    getDataBadge,
    currentSize: 3,
  }
}
