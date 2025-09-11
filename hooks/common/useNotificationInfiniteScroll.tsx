// hooks/common/useNotificationInfiniteScroll.ts
'use client'

import { Notification } from '@/constant/types/NotificationProps'
import { getListNotif } from '@/services/notification-service'
import { useCallback, useState } from 'react'

type TabId = 'semua' | 'belum-dibaca'

interface NotificationParams {
  activeTab: TabId
  token: string
}

interface NotificationFilter {
  size: number
  page: number
  order: 'desc' | 'asc'
  orderBy: string
  readAt?: string
}

export const useNotificationInfiniteScroll = (pageSize: number = 10) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalNotifications, setTotalNotifications] = useState<number>(0)

  const resetNotifications = useCallback(() => {
    setNotifications([])
    setHasMore(true)
    setCurrentPage(1)
    setTotalNotifications(0)
  }, [])

  const fetchInitialNotifications = useCallback(
    async (params: NotificationParams) => {
      setIsLoading(true)
      try {
        setNotifications([])

        const filter: NotificationFilter = {
          size: pageSize,
          page: 1,
          order: 'desc',
          orderBy: 'createdAt',
          ...(params.activeTab !== 'semua' ? { readAt: 'isNull' } : {}),
        }

        const result = await getListNotif(filter, params.token)

        setNotifications(result.results || [])
        setTotalNotifications(result.total || 0)
        setHasMore((result.results?.length || 0) < (result.total || 0))
        setCurrentPage(2) // Set to page 2 for next load
      } catch (error) {
        console.error('Error loading initial notifications:', error)
        setHasMore(false)
      } finally {
        setIsLoading(false)
      }
    },
    [pageSize]
  )

  const loadMoreNotifications = useCallback(
    async (params: NotificationParams) => {
      if (isLoading || !hasMore) return

      setIsLoading(true)
      try {
        const filter: NotificationFilter = {
          size: pageSize,
          page: currentPage,
          order: 'desc',
          orderBy: 'createdAt',
          ...(params.activeTab !== 'semua' ? { readAt: 'isNull' } : {}),
        }

        const result = await getListNotif(filter, params.token)

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...(result.results || []),
        ])

        const newTotalLoaded =
          notifications.length + (result.results?.length || 0)
        setHasMore(newTotalLoaded < (result.total || 0))

        setTotalNotifications(result.total || 0)
        setCurrentPage((prev) => prev + 1)
      } catch (error) {
        console.error('Error loading more notifications:', error)
        setHasMore(false)
      } finally {
        setIsLoading(false)
      }
    },
    [currentPage, hasMore, isLoading, notifications.length, pageSize]
  )

  const addNotification = useCallback((newNotification: Notification) => {
    setNotifications((prev) => [newNotification, ...prev])
    setTotalNotifications((prev) => prev + 1)
  }, [])

  const updateNotification = useCallback(
    (notificationId: string, updates: Partial<Notification>) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id.toString() === notificationId
            ? { ...notif, ...updates }
            : notif
        )
      )
    },
    []
  )

  return {
    notifications,
    hasMore,
    isLoading,
    loadMoreNotifications,
    resetNotifications,
    fetchInitialNotifications,
    totalNotifications,
    addNotification,
    updateNotification,
  }
}
