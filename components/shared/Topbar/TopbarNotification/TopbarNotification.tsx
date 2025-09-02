'use client'
import { NotifIcon, NotifIconBlack } from '@/components/icons/notif'
import { PemabaruanIcon } from '@/components/icons/pembaharuan'
import { PengingatIcon } from '@/components/icons/pengingat'
import { PromoIcon } from '@/components/icons/promo'
import {
  Category,
  Notification,
  Tab,
  useTopbarNotification,
} from '@/hooks/common/useTopbarNotification'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const TopbarNotification: React.FC = () => {
  const {
    // State
    isExpanded,
    categories,
    tabs,
    unreadCount,

    // Refs
    containerRef,

    // Handlers
    handleNotifIconClick,
    activeTab,
    getFilteredNotifications,
    handleTabClick,
  } = useTopbarNotification()
  const filteredNotifications = getFilteredNotifications()
  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="relative flex cursor-pointer items-center gap-1"
        onClick={handleNotifIconClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Mobile */}
        {/* Mobile - dengan background buletan putih dan perfect centering */}
        <div className="relative lg:hidden">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-gray-100 bg-white shadow-md">
            <div className="ml-1 flex items-center justify-center">
              <NotifIconBlack size={20} className="text-gray-700" />
            </div>
          </div>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#B3261E] text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Desktop (lg ke atas) - tanpa background */}
        <div className="relative hidden lg:block">
          <NotifIcon size={24} className="text-gray-600 hover:text-gray-800" />
          {unreadCount > 0 && (
            <span className="absolute -top-3 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#B3261E] text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-999 mt-2 w-[350px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
          >
            {/* Header */}
            <div className="border-b border-gray-100 p-4">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">
                Notifikasi
              </h3>

              {/* Category Icons */}
              <div className="mb-4 flex justify-between">
                {categories.map((category: Category) => (
                  <div
                    key={category.id}
                    className="relative flex flex-col items-center gap-2"
                  >
                    {category.icon}

                    <span className="text-m-regular text-center text-neutral-900 ">
                      {category.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex items-center justify-between">
                {/* Group kiri */}
                <div className="flex space-x-1">
                  {tabs
                    .filter((tab) => tab.id !== 'baca-semua')
                    .map((tab: Tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`text-s-regular rounded-xl px-3 py-1.5 transition-colors ${
                          activeTab === tab.id
                            ? 'bg-orange-100 text-orange-800'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                </div>

                {/* Tombol kanan */}
                <button
                  onClick={() => handleTabClick('baca-semua')}
                  className={`text-s-regular rounded-xl px-3 py-1.5 transition-colors ${
                    activeTab === 'baca-semua'
                      ? 'bg-orange-100 text-orange-800'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  Baca Semua
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
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
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification: Notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`cursor-pointer p-4 transition-colors  ${
                        !notification.isRead ? 'bg-[#FFF1E3]' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`flex h-8 w-8 justify-center rounded-lg text-sm `}
                        >
                          {notification.type === 'warning' ? (
                            <PengingatIcon size={20} />
                          ) : notification.type === 'info' ? (
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
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-s-regular leading-relaxed text-neutral-600">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredNotifications.length !== 0 && (
              <div className="mb-4">
                <button className="text-m-medium w-full py-1 text-center text-neutral-900">
                  Lihat Selengkapnya
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TopbarNotification
