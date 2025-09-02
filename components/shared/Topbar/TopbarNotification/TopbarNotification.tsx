'use client'
import { NotifIcon, NotifIconBlack } from '@/components/icons/notif'
import NotificationComponent from '@/components/shared/Notification'
import { useTopbarNotification } from '@/hooks/common/useTopbarNotification'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const TopbarNotification: React.FC = () => {
  const {
    // State
    isExpanded,

    unreadCount,
    // Refs
    containerRef,

    // Handlers
    handleNotifIconClick,
  } = useTopbarNotification()

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="relative flex cursor-pointer items-center gap-1"
        onClick={handleNotifIconClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative hidden lg:block">
          <NotifIcon
            size={24}
            className="text-neutral-600 hover:text-neutral-800"
          />
          {unreadCount > 0 && (
            <span className="absolute -top-3 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#B3261E] text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </motion.div>
      <Link href={'/notification-mobile'}>
        <div className="relative lg:hidden">
          <div className=" r flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white ">
            <div className="ml-1 flex items-center justify-center">
              <NotifIconBlack size={20} className="text--700" />
            </div>
          </div>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#B3261E] text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </Link>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-999 mt-2 w-[350px] overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-xl"
          >
            <NotificationComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TopbarNotification
