'use client'

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

interface UseMyNotificationProps {
  token: string
  pageSize: number
  isMyPage?: boolean
}

export const useMyNotification = ({
  token,
  pageSize,
  isMyPage = false,
}: UseMyNotificationProps) => {
  const [notifications, setNotifications] = useState<Notification[]>()
  const [badge, setBadge] = useState<Badge>()
  const [countBadge, setCountBadge] = useState<number>(0)
  const [totalNotif, setTotalNotif] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<TabId>('semua')
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const currentSizeRef = useRef<number>(pageSize)
  const isInitializedRef = useRef<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    currentSizeRef.current = pageSize
    console.log(
      `useMyNotification: Size set to ${pageSize} for isMyPage: ${isMyPage}`
    )
  }, [pageSize, isMyPage])

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

        if (!signal?.aborted) {
          setNotifications(res.results)
          setTotalNotif(res.total)
          console.log(
            `useMyNotification: Fetched ${res.results.length} notifications`
          )
        }
      } catch (error: any) {
        if (!signal?.aborted) {
          console.error(
            'useMyNotification: Error fetching notifications:',
            error
          )
        }
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false)
        }
      }
    },
    [token, page, activeTab]
  )

  const getDataBadge = useCallback(
    async (signal?: AbortSignal) => {
      if (!token) return

      try {
        const [res, resStat] = await Promise.all([
          getNotificationBadge(token),
          getListCountNotif(token),
        ])

        if (!signal?.aborted) {
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
        if (!signal?.aborted) {
          console.log('useMyNotification: Error fetching badge:', error)
        }
      }
    },
    [token]
  )

  useEffect(() => {
    if (!token || isInitializedRef.current) return

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    const loadInitialData = async () => {
      console.log(
        `useMyNotification: Initial data load for isMyPage: ${isMyPage}`
      )
      await Promise.all([getDataList(signal), getDataBadge(signal)])
      isInitializedRef.current = true
    }

    loadInitialData()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [token, isMyPage, getDataList, getDataBadge])

  useEffect(() => {
    if (!isInitializedRef.current) return
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
  }, [activeTab, page, getDataList])

  const handleTabClick = useCallback((tabId: TabId) => {
    console.log(`useMyNotification: Tab clicked: ${tabId}`)
    setActiveTab(tabId)
    setPage(1)
  }, [])

  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await postReadNotif(notificationId, token)
        getDataBadge()
        return true
      } catch (error) {
        console.error(
          'useMyNotification: Error marking notification as read:',
          error
        )
        throw error
      }
    },
    [token, getDataBadge]
  )

  const markAsReadAll = useCallback(async () => {
    try {
      await postReadNotif('all', token)

      setTimeout(() => {
        getDataList()
        getDataBadge()
      }, 200)

      return true
    } catch (error) {
      console.error(
        'useMyNotification: Error marking all notifications as read:',
        error
      )
      throw error
    }
  }, [token, getDataList, getDataBadge])

  const categories: Category[] = [
    {
      id: 'payment',
      label: 'Butuh Dibayar',
      count: badge?.needToBePaid ?? 0,
      icon: null,
      href: '/my/need-payment?type=completed&page=1&query=&date=',
    },
    {
      id: 'transaction',
      label: 'Transaksi',
      count: badge?.onGoingTransaction ?? 0,
      icon: null,
      href: '/my/transaction?type=upcoming&page=1&query=&status=all&date=',
    },
    {
      id: 'umroh',
      label: 'Umroh Personal',
      count: badge?.waitingOffers ?? 0,
      icon: null,
      href: '/my/paket-personal',
    },
    {
      id: 'quota',
      label: 'Cek Kuota',
      count: badge?.checkAvailabilities ?? 0,
      icon: null,
      href: '/my/check-availability',
    },
  ]

  return {
    notifications,
    activeTab,
    categories,
    tabs,
    badge,
    countBadge,
    totalNotif,
    page,
    isLoading,
    setNotifications,
    setBadge,
    setCountBadge,
    setPage,
    handleTabClick,
    markAsRead,
    markAsReadAll,
    getDataList,
    getDataBadge,
    currentSize: currentSizeRef.current,
  }
}
