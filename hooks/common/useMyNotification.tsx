'use client'

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

interface UseNotificationProps {
  token: string
  mode: 'dropdown' | 'page' | 'mobile' // NEW: Define usage mode
  pageSize?: number // Optional: defaults based on mode
}

export const useNotification = ({
  token,
  mode,
  pageSize,
}: UseNotificationProps) => {
  // Determine default page size based on mode
  const defaultPageSize = pageSize || (mode === 'dropdown' ? 3 : 10)

  // Common state
  const [notifications, setNotifications] = useState<Notification[]>()
  const [badge, setBadge] = useState<Badge>()
  const [countBadge, setCountBadge] = useState<number>(0)
  const [totalNotif, setTotalNotif] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<TabId>('semua')
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Dropdown-specific state
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const currentSizeRef = useRef<number>(defaultPageSize)
  const isInitializedRef = useRef<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef<boolean>(true)

  // Track component mount status
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Update size ref when pageSize changes
  useEffect(() => {
    currentSizeRef.current = defaultPageSize
  }, [defaultPageSize, mode])

  // Handle click outside for dropdown mode
  useEffect(() => {
    if (mode !== 'dropdown') return

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
  }, [isExpanded, mode])

  // Focus input when expanded (dropdown mode)
  useEffect(() => {
    if (mode === 'dropdown' && isExpanded && inputRef.current) {
      inputRef.current?.focus()
    }
  }, [isExpanded, mode])

  const getDataList = useCallback(
    async (signal?: AbortSignal) => {
      if (!token) return

      try {
        setIsLoading(true)
        const filter = {
          size: currentSizeRef.current,
          page,
          order: 'desc',
          orderBy: 'createdAt',
          ...(activeTab === 'belum-dibaca' ? { readAt: 'isNull' } : {}),
        }

        const res = await getListNotif(filter, token)

        if (!signal?.aborted && isMountedRef.current) {
          setNotifications(res.results)
          setTotalNotif(res.total)
        }
      } catch (error: any) {
        if (!signal?.aborted && isMountedRef.current) {
          console.error(
            `useNotification (${mode}): Error fetching notifications:`,
            error
          )
        }
      } finally {
        if (!signal?.aborted && isMountedRef.current) {
          setIsLoading(false)
        }
      }
    },
    [token, page, activeTab, mode]
  )

  const getDataBadge = useCallback(
    async (signal?: AbortSignal) => {
      if (!token) return

      try {
        const [res, resStat] = await Promise.all([
          getNotificationBadge(token),
          getListCountNotif(token),
        ])

        if (!signal?.aborted && isMountedRef.current) {
          setBadge(res)
          const total =
            (res.needToBePaid ?? 0) +
            (res.onGoingTransaction ?? 0) +
            (res.waitingOffers ?? 0) +
            (res.checkAvailabilities ?? 0) +
            (resStat.unread ?? 0)

          setCountBadge(total)
        }
      } catch (error: any) {
        if (!signal?.aborted && isMountedRef.current) {
          console.error(
            `useNotification (${mode}): Error fetching badge:`,
            error
          )
        }
      }
    },
    [token, mode]
  )

  // Initial data load - with AbortController for page/mobile mode
  useEffect(() => {
    if (!token || isInitializedRef.current) return

    if (mode === 'page' || mode === 'mobile') {
      // Use AbortController for page/mobile modes
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      const loadInitialData = async () => {
        await Promise.all([getDataList(signal), getDataBadge(signal)])
        isInitializedRef.current = true
      }

      loadInitialData()

      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }
      }
    } else {
      // Simple load for dropdown mode
      const loadInitialData = async () => {
        await Promise.all([getDataList(), getDataBadge()])
        isInitializedRef.current = true
      }

      loadInitialData()
    }
  }, [token, mode, getDataList, getDataBadge])

  // Data refresh when tab/page changes
  useEffect(() => {
    if (!isInitializedRef.current) return

    if (mode === 'page' || mode === 'mobile') {
      // Use AbortController for page/mobile modes
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()
      getDataList(abortControllerRef.current.signal)

      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }
      }
    } else {
      // Simple refresh for dropdown mode
      getDataList()
    }
  }, [activeTab, page, getDataList, mode])

  const handleNotifIconClick = useCallback(() => {
    if (mode === 'dropdown') {
      setIsExpanded((prev) => !prev)
    }
  }, [mode])

  const handleTabClick = useCallback(
    (tabId: TabId) => {
      setActiveTab(tabId)
      setPage(1)
    },
    [mode]
  )

  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await postReadNotif(notificationId, token)
        // Refresh badge after marking as read
        getDataBadge()
        return true
      } catch (error) {
        console.error(
          `useNotification (${mode}): Error marking notification as read:`,
          error
        )
        throw error
      }
    },
    [token, getDataBadge, mode]
  )

  const markAsReadAll = useCallback(async () => {
    try {
      await postReadNotif('all', token)

      // Refresh data after marking all as read
      setTimeout(() => {
        if (isMountedRef.current) {
          getDataList()
          getDataBadge()
        }
      }, 200)

      return true
    } catch (error) {
      console.error(
        `useNotification (${mode}): Error marking all notifications as read:`,
        error
      )
      throw error
    }
  }, [token, getDataList, getDataBadge, mode])

  // Animation variants (for dropdown mode)
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
      icon: mode === 'dropdown' ? <MoneysIcon size={24} /> : null,
      href: '/my/need-payment?type=completed&page=1&query=&date=',
    },
    {
      id: 'transaction',
      label: 'Transaksi',
      count: badge?.onGoingTransaction ?? 0,
      icon: mode === 'dropdown' ? <ReceiptIcon size={24} /> : null,
      href: '/my/transaction?type=upcoming&page=1&query=&status=all&date=',
    },
    {
      id: 'umroh',
      label: 'Umroh Personal',
      count: badge?.waitingOffers ?? 0,
      icon: mode === 'dropdown' ? <PersonalPaket size={24} /> : null,
      href: '/my/paket-personal',
    },
    {
      id: 'quota',
      label: 'Cek Kuota',
      count: badge?.checkAvailabilities ?? 0,
      icon: mode === 'dropdown' ? <PilotSeatIcon size={24} /> : null,
      href: '/my/check-availability',
    },
  ]

  return {
    // Common state
    notifications,
    activeTab,
    categories,
    tabs,
    badge,
    countBadge,
    totalNotif,
    page,
    isLoading,

    // Dropdown-specific state
    isExpanded,
    inputRef,
    containerRef,

    // Actions
    setNotifications,
    setBadge,
    setCountBadge,
    setPage: (newPage: number) => setPage(newPage), // Keep original signature

    // Handlers
    handleNotifIconClick,
    handleTabClick,
    markAsRead,
    markAsReadAll,

    // Data fetching
    getDataList,
    getDataBadge,

    searchNotifVariants,
    notificationPanelVariants,

    // Debug info
    currentSize: currentSizeRef.current,
    mode,
  }
}
