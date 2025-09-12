'use client'
import { NotifIcon, NotifIconBlack } from '@/components/icons/notif'
import NotificationComponent from '@/components/shared/Notification'
import { useTopbarNotification } from '@/hooks/common/useTopbarNotification'
import { useWebSocket } from '@/hooks/websocket/useWebcoket'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
interface WebSocketMessage {
  event: string
  data: {
    notification: Notification
  }
}
const TopbarNotification = ({ token }: { token: string }) => {
  const {
    // State
    isExpanded,

    countBadge,
    setCountBadge,
    // Refs
    containerRef,

    // Handlers
    handleNotifIconClick,
  } = useTopbarNotification({ token })
  const { messages } = useWebSocket(token ?? '') as {
    messages: WebSocketMessage[]
  }

  useEffect(() => {
    if (!messages.length) return

    const latest = messages[messages.length - 1]

    if (latest.event === 'new_notif') {
      setCountBadge?.((prev: number) => prev + 1)
    }
  }, [messages, setCountBadge])
  return (
    <div ref={containerRef} className="relative">
      {/* Desktop Notification */}
      <motion.div
        className="relative flex cursor-pointer items-center gap-1"
        onClick={handleNotifIconClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative hidden lg:block">
          <NotifIcon size={24} className="text-neutral-600 " />
          {countBadge > 0 && (
            <span
              className={`text-s-regular absolute -top-3 -right-2 flex items-center justify-center rounded-full bg-[#B3261E] text-white
      ${countBadge > 99 ? 'h-6 w-6' : 'h-5 w-5'}`}
            >
              {countBadge > 99 ? '99+' : countBadge}
            </span>
          )}
        </div>
      </motion.div>
      {/* Mobile Notification */}
      <Link href={'/notification-mobile'}>
        <div className="relative lg:hidden">
          <div className=" r flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white ">
            <div className="ml-1 flex items-center justify-center">
              <NotifIconBlack size={20} className="text--700" />
            </div>
          </div>
          {countBadge > 0 && (
            <span
              className={`text-s-regular absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#B3261E] text-white 
                ${countBadge < 100 ? 'h-5 w-5' : 'h-6 w-6'}`}
            >
              {countBadge > 99 ? '99+' : countBadge}
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
            <NotificationComponent
              fromMy={false}
              token={token}
              setCountBadge={setCountBadge}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TopbarNotification
