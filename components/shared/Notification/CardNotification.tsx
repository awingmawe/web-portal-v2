'use client'

import { PemabaruanIcon } from '@/components/icons/pembaharuan'
import { PengingatIcon } from '@/components/icons/pengingat'
import { PromoIcon } from '@/components/icons/promo'
import { CustomPagination } from '@/components/shared/CustomPagination'
import { Notification } from '@/constant/types/NotificationProps'
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
  //ini untuk dari pathname my/notifiakasi
  fromMy?: boolean
  mobile?: boolean
  setCountBadge?: React.Dispatch<React.SetStateAction<number>>
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
  mobile,
  setCountBadge,
}: CardNotificationProps) => {
  // Conditionally use hooks based on mode
  const shouldUseInfiniteScroll = mobile && !fromMy

  // Infinite scroll hook (only for mobile)
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

  // Traditional pagination hook (for fromMy and dropdown)
  const {
    tabs,
    activeTab,
    notifications: paginatedNotifications,
    handleTabClick,
    markAsRead: originalMarkAsRead,
    markAsReadAll,
    setSize,
    totalNotif,
    setPage,
    setNotifications,
    page,
  } = useTopbarNotification({ token })

  const { messages } = useWebSocket(token ?? '') as {
    messages: WebSocketMessage[]
  }
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fromMy || mobile) {
      setSize(10)
    } else {
      setSize(3)
    }
  }, [fromMy, setSize])

  useEffect(() => {
    if (shouldUseInfiniteScroll && token && activeTab !== 'baca-semua') {
      fetchInitialNotifications({
        activeTab: activeTab as 'semua' | 'belum-dibaca',
        token,
      })
    }
  }, [shouldUseInfiniteScroll, activeTab, token, fetchInitialNotifications])

  useEffect(() => {
    if (!messages.length) return

    const latest = messages[messages.length - 1]

    if (latest.event === 'new_notif') {
      if (shouldUseInfiniteScroll) {
        addNotification({ ...latest.data.notification, readAt: null })
      } else {
        setNotifications((prev) => [
          { ...latest.data.notification, readAt: null },
          ...(prev ?? []),
        ])
      }
      setCountBadge?.((prev: number) => prev + 1)
    }
  }, [
    messages,
    shouldUseInfiniteScroll,
    addNotification,
    setNotifications,
    setCountBadge,
  ])

  const markAsReadInfinite = useCallback(
    async (notificationId: string) => {
      try {
        updateNotification(notificationId, { readAt: new Date().toISOString() })
        await originalMarkAsRead(notificationId)
      } catch (error) {
        console.error('Error marking notification as read:', error)
        updateNotification(notificationId, { readAt: '' })
      }
    },
    [originalMarkAsRead, updateNotification]
  )

  const markAsRead = shouldUseInfiniteScroll
    ? markAsReadInfinite
    : originalMarkAsRead

  const handleScroll = useCallback(() => {
    if (
      !shouldUseInfiniteScroll ||
      !scrollRef.current ||
      infiniteLoading ||
      !hasMore
    )
      return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const threshold = 100 // Load more when 100px from bottom

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

  const goToPage = useCallback(
    (newPage: number) => {
      setPage(newPage)
      window.scrollTo(0, 0)
    },
    [setPage]
  )

  const notifications = shouldUseInfiniteScroll
    ? infiniteNotifications
    : paginatedNotifications
  const isLoading = shouldUseInfiniteScroll ? infiniteLoading : false

  return (
    <div
      className={fromMy ? `rounded-[20px] border-1 border-neutral-100 p-4` : ''}
    >
      {/* Tabs */}
      <div
        className={`${fromMy && 'mt-0'} my-3 flex items-center justify-between`}
      >
        {/* Group kiri */}
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
          onClick={() => {
            markAsReadAll()

            if (shouldUseInfiniteScroll && activeTab !== 'baca-semua') {
              setTimeout(() => {
                fetchInitialNotifications({
                  activeTab: activeTab as 'semua' | 'belum-dibaca',
                  token,
                })
              }, 500)
            }
          }}
          className={`text-s-regular rounded-fukk cursor-pointer px-3 py-1.5 transition-colors`}
        >
          Baca Semua
        </button>
      </div>

      {/* Notifications List */}
      <div
        ref={scrollRef}
        className={`overflow-y-auto ${
          fromMy ? 'h-full' : mobile ? 'h-[80dvh]' : 'max-h-96'
        }`}
      >
        {isEmpty(notifications) && !isLoading ? (
          <div className="p-8 text-center">
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
          <div>
            {notifications?.map((notification: Notification, index: number) => {
              const notificationContent = (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`hover:bg-warning-200 mb-2 cursor-pointer rounded-lg p-4 transition-colors ${
                    notification.readAt !== null
                      ? ''
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
            {fromMy && (
              <CustomPagination
                currentPage={page}
                totalPages={Math.ceil(totalNotif / 10)}
                goToPage={goToPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardNotification
