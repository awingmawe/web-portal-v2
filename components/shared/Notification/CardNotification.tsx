'use client'

import { PemabaruanIcon } from '@/components/icons/pembaharuan'
import { PengingatIcon } from '@/components/icons/pengingat'
import { PromoIcon } from '@/components/icons/promo'
import { CustomPagination } from '@/components/shared/CustomPagination'
import { Notification } from '@/constant/types/NotificationProps'
import { useMyNotification } from '@/hooks/common/useMyNotification' // NEW: Import isolated hook
import { useNotificationInfiniteScroll } from '@/hooks/common/useNotificationInfiniteScroll'
import {
  Tab,
  useTopbarNotification,
} from '@/hooks/common/useTopbarNotification'
import { useWebSocket } from '@/hooks/websocket/useWebcoket'
import { isEmpty, timeSince } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'

interface CardNotificationProps {
  token: string
  fromMy: boolean
  mobile?: boolean
  setCountBadge?: React.Dispatch<React.SetStateAction<number>>
  webSocketMessages?: WebSocketMessage[]
  isDropdownOpen?: boolean
}

interface WebSocketMessage {
  event: string
  data: {
    notification: Notification
  }
}

const CardNotification = ({
  token,
  fromMy,
  mobile = false,
  setCountBadge,
  webSocketMessages,
  isDropdownOpen = false,
}: CardNotificationProps) => {
  const shouldUseInfiniteScroll = mobile && !fromMy
  const shouldUseIsolatedHook = fromMy || mobile

  const {
    notifications: infiniteNotifications,
    hasMore,
    isLoading: infiniteLoading,
    loadMoreNotifications,
    resetNotifications,
    fetchInitialNotifications,
    addNotification,
    updateNotification,
  } = useNotificationInfiniteScroll(10)
  const isolatedHook = useMyNotification({
    token,
    pageSize: fromMy || mobile ? 10 : 3,
    isMyPage: fromMy,
  })
  const traditionalHook = useTopbarNotification({ token })
  const {
    tabs,
    activeTab,
    notifications: paginatedNotifications,
    handleTabClick,
    markAsRead: originalMarkAsRead,
    markAsReadAll,
    totalNotif,
    setPage,
    setNotifications,
    page,
    getDataList,
    getDataBadge,
  } = shouldUseIsolatedHook ? isolatedHook : traditionalHook

  const localWebSocket = useWebSocket(
    webSocketMessages ? '' : (token ?? '')
  ) as {
    messages: WebSocketMessage[]
  }

  const messages = webSocketMessages || localWebSocket.messages
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (shouldUseInfiniteScroll && token && activeTab !== 'baca-semua') {
      fetchInitialNotifications({
        activeTab: activeTab as 'semua' | 'belum-dibaca',
        token,
      })
    }
  }, [shouldUseInfiniteScroll, activeTab, token, fetchInitialNotifications])

  const processedMessagesRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!messages.length) return

    const latest = messages[messages.length - 1]
    const messageId = `${latest.event}-${latest.data.notification.id}-${latest.data.notification.createdAt}`

    if (processedMessagesRef.current.has(messageId)) {
      return
    }

    processedMessagesRef.current.add(messageId)

    if (latest.event === 'new_notif') {
      const newNotification = { ...latest.data.notification, readAt: null }

      if (shouldUseInfiniteScroll) {
        addNotification(newNotification)
      } else {
        setNotifications((prev) => [newNotification, ...(prev ?? [])])
        if (isDropdownOpen && !fromMy && !mobile) {
          setTimeout(() => {
            getDataList?.()
          }, 100)
        }
      }

      setCountBadge?.((prev: number) => prev + 1)
    }

    if (processedMessagesRef.current.size > 50) {
      const messagesArray = Array.from(processedMessagesRef.current)
      processedMessagesRef.current = new Set(messagesArray.slice(-25))
    }
  }, [
    messages,
    shouldUseInfiniteScroll,
    addNotification,
    setNotifications,
    setCountBadge,
    isDropdownOpen,
    fromMy,
    mobile,
    getDataList,
  ])

  const markAsReadInfinite = useCallback(
    async (notificationId: string) => {
      try {
        updateNotification(notificationId, { readAt: new Date().toISOString() })
        setCountBadge?.((prev: number) => Math.max(0, prev - 1))
        await originalMarkAsRead(notificationId)
        getDataBadge?.()
      } catch (error) {
        console.error('Error marking notification as read:', error)
        updateNotification(notificationId, { readAt: '' })
        setCountBadge?.((prev: number) => prev + 1)
      }
    },
    [originalMarkAsRead, updateNotification, setCountBadge, getDataBadge]
  )

  const markAsReadPaginated = useCallback(
    async (notificationId: string) => {
      try {
        setNotifications(
          (prev) =>
            prev?.map((notif) =>
              notif.id.toString() === notificationId
                ? { ...notif, readAt: new Date().toISOString() }
                : notif
            ) ?? []
        )
        setCountBadge?.((prev: number) => Math.max(0, prev - 1))
        await originalMarkAsRead(notificationId)
        getDataBadge?.()
      } catch (error) {
        console.error('Error marking notification as read:', error)
        setNotifications(
          (prev) =>
            prev?.map((notif) =>
              notif.id.toString() === notificationId
                ? { ...notif, readAt: null }
                : notif
            ) ?? []
        )
        setCountBadge?.((prev: number) => prev + 1)
      }
    },
    [originalMarkAsRead, setNotifications, setCountBadge, getDataBadge]
  )

  const markAsRead = shouldUseInfiniteScroll
    ? markAsReadInfinite
    : markAsReadPaginated

  const handleScroll = useCallback(() => {
    if (
      !shouldUseInfiniteScroll ||
      !scrollRef.current ||
      infiniteLoading ||
      !hasMore
    )
      return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const threshold = 100

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMoreNotifications({
        activeTab: activeTab as 'semua' | 'belum-dibaca',
        token,
      })
    }
  }, [
    shouldUseInfiniteScroll,
    infiniteLoading,
    hasMore,
    loadMoreNotifications,
    activeTab,
    token,
  ])

  useEffect(() => {
    if (!shouldUseInfiniteScroll) return

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [shouldUseInfiniteScroll, handleScroll])

  const handleTabClickWithReset = useCallback(
    (tabId: 'semua' | 'belum-dibaca' | 'baca-semua') => {
      handleTabClick(tabId)
      if (shouldUseInfiniteScroll && tabId !== 'baca-semua') {
        resetNotifications()
      }
    },
    [handleTabClick, resetNotifications, shouldUseInfiniteScroll]
  )

  const notifications = shouldUseInfiniteScroll
    ? infiniteNotifications
    : paginatedNotifications

  const handleMarkAsReadAll = useCallback(async () => {
    try {
      if (shouldUseInfiniteScroll) {
        if (activeTab === 'belum-dibaca') {
          resetNotifications()
        }
      } else {
        if (activeTab === 'belum-dibaca') {
          setNotifications([])
        } else {
          setNotifications(
            (prev) =>
              prev?.map((notif) => ({
                ...notif,
                readAt: new Date().toISOString(),
              })) ?? []
          )
        }
      }

      setCountBadge?.(0)
      await markAsReadAll()

      setTimeout(() => {
        getDataBadge?.()
      }, 200)
    } catch (error) {
      console.error('Error marking all as read:', error)
      window.location.reload()
    }
  }, [
    notifications,
    shouldUseInfiniteScroll,
    activeTab,
    resetNotifications,
    setNotifications,
    setCountBadge,
    markAsReadAll,
    getDataBadge,
  ])

  const goToPage = useCallback(
    (newPage: number) => {
      setPage(newPage)
      window.scrollTo(0, 0)
    },
    [setPage]
  )

  const isLoading = shouldUseInfiniteScroll
    ? infiniteLoading
    : isolatedHook?.isLoading || false
  return (
    <div
      className={
        fromMy ? `rounded-[20px] border-1 border-neutral-100 bg-white p-4` : ''
      }
    >
      {/* Tabs */}
      <div
        className={`${fromMy && 'mt-0'} my-3 flex items-center justify-between`}
      >
        <div className="flex space-x-1">
          {tabs
            .filter((tab: Tab) => tab.id !== 'baca-semua')
            .map((tab: Tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClickWithReset(tab.id)}
                className={`text-s-regular cursor-pointer rounded-full px-3 py-1.5 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-300 font-bold text-neutral-900'
                    : 'bg-primary-100 text-neutral-900 '
                }`}
              >
                {tab.label}
              </button>
            ))}
        </div>

        <button
          onClick={handleMarkAsReadAll}
          className={`text-s-regular cursor-pointer rounded-full bg-red-100 px-3 py-1.5 transition-colors hover:bg-red-200`}
        >
          Baca Semua
        </button>
      </div>

      {/* Notifications List */}
      <div
        ref={scrollRef}
        className={`overflow-y-auto ${
          fromMy ? 'min-h-[400px]' : mobile ? 'h-[80dvh]' : 'max-h-96'
        }`}
      >
        {isEmpty(notifications) && !isLoading ? (
          <div className="rounded bg-gray-50 p-8 text-center">
            <div className="text-center">
              <p className="text-s-semibold mb-2 text-neutral-900">
                Belum ada pembaruan lagi, nih
              </p>
              <p className="text-s-regular text-neutral-500">
                Coba cek berkala lagi nanti yaa!
              </p>
            </div>
          </div>
        ) : (
          <div className={fromMy ? 'space-y-2' : ''}>
            {notifications?.map((notification: Notification, index: number) => {
              const notificationContent = (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`hover:bg-warning-200 mb-2 cursor-pointer rounded-lg p-4 transition-colors ${
                    notification.readAt !== null
                      ? 'bg-gray-50'
                      : notification.category === 'PROMO'
                        ? 'bg-warning-100'
                        : 'bg-primary-100'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-s-regular flex h-8 w-8 justify-center rounded-lg">
                      {notification.category === 'PENGINGAT' ? (
                        <PengingatIcon size={20} />
                      ) : notification.category === 'PEMBAHARUAN' ? (
                        <PemabaruanIcon size={20} />
                      ) : (
                        <PromoIcon size={20} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="text-m-medium break-words text-neutral-900">
                          {notification.title}
                        </h4>
                        <span className="text-s-regular ml-2 flex-shrink-0 text-neutral-500">
                          {timeSince(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-s-regular text-neutral-600">
                        {notification.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )

              if (notification.platformRoutes?.web) {
                return (
                  <Link
                    href={notification.platformRoutes.web}
                    onClick={() => markAsRead(notification.id.toString())}
                    key={`${notification.id}-${index}`}
                  >
                    {notificationContent}
                  </Link>
                )
              }

              return (
                <div
                  key={`${notification.id}-${index}`}
                  onClick={() => markAsRead(notification.id.toString())}
                >
                  {notificationContent}
                </div>
              )
            })}

            {shouldUseInfiniteScroll && isLoading && (
              <div className="flex justify-center py-4">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-orange-500"></div>
              </div>
            )}

            {fromMy && totalNotif > 0 && (
              <div className="mt-6 flex justify-center">
                <CustomPagination
                  currentPage={page}
                  totalPages={Math.ceil(totalNotif / 10)}
                  goToPage={goToPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardNotification
