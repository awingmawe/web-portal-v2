'use client'

import { PemabaruanIcon } from '@/components/icons/pembaharuan'
import { PengingatIcon } from '@/components/icons/pengingat'
import { PromoIcon } from '@/components/icons/promo'
import { Category, Notification, Tab } from '@/constant/types/NotificationProps'
import { useTopbarNotification } from '@/hooks/common/useTopbarNotification'
import { isEmpty, timeSince } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const NotificationComponent: React.FC = () => {
  const {
    categories,
    tabs,
    activeTab,
    notifications,
    handleTabClick,
    markAsRead,
  } = useTopbarNotification()
  return (
    <div className={`p-4 max-lg:mt-10`}>
      {/* Header */}
      <div className="border-b border-neutral-100 p-4">
        <p className="text-l-semibold mb-3 text-neutral-800 max-lg:hidden">
          Notifikasi
        </p>

        {/* Category Icons */}
        <div className="mb-4 flex justify-between">
          {categories.map((category: Category) => (
            <div
              key={category.id}
              className="relative flex flex-col items-center gap-2"
            >
              <span className="absolute -top-3 -right-0 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#B3261E] text-xs font-medium text-white">
                {category.count}
              </span>
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
                      : 'text-neutral-600 hover:bg-gray-100 hover:text-neutral-800'
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
                ? 'bg-primary-100 text-primary-800'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'
            }`}
          >
            Baca Semua
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {isEmpty(notifications) ? (
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
          <div className="divide-y divide-neutral-100">
            {!isEmpty(notifications) &&
              notifications?.map(
                (notification: Notification, index: number) => {
                  if (notification.platformRoutes?.web) {
                    return (
                      <Link
                        href={notification.platformRoutes.web}
                        onClick={() => markAsRead(notification.id)}
                        key={index}
                      >
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`cursor-pointer p-4 transition-colors  ${
                            notification.readAt !== null ? '' : 'bg-primary-100'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`text-s-regular flex h-8 w-8 justify-center rounded-lg `}
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
                                  {timeSince(notification.createdAt)}
                                </span>
                              </div>
                              <p className="text-s-regular text-neutral-600">
                                {notification.body}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    )
                  }

                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => markAsRead(notification.id)}
                      className={`cursor-pointer p-4 transition-colors  ${
                        notification.readAt !== null ? '' : 'bg-primary-100'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`text-s-regular flex h-8 w-8 justify-center rounded-lg `}
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
                }
              )}
          </div>
        )}
      </div>

      {/* Footer */}
      {isEmpty(notifications) && (
        <div className={`mb-4 max-lg:mt-5 max-lg:mb-0`}>
          <button className="text-m-medium w-full py-1 text-center text-neutral-900">
            Lihat Selengkapnya
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationComponent
