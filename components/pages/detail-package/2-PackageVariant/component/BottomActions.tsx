import WhatsappIcon from '@/components/icons/whatsapp'
import CheckAvailibility from '@/components/pages/detail-package/2-PackageVariant/component/CheckAvaibility'
import { PACKAGE_TYPE } from '@/constant/env'
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import React, { Fragment } from 'react'

interface BottomActionsProps {
  variants: any[]
  isLiked: boolean
  token: string
  packageType: string
  onToggleLike: () => void
  onConsultation: () => void
  handlePushEvent: (name: string, withVariant?: boolean) => void
}

const BottomActions: React.FC<BottomActionsProps> = ({
  variants,
  isLiked,
  token,
  packageType,
  onToggleLike,
  onConsultation,
  handlePushEvent,
}) => {
  return (
    <div className="flex items-center justify-evenly max-lg:hidden">
      {variants.length > 0 && (
        <>
          <div
            className="flex cursor-pointer items-center gap-1 transition-colors"
            onClick={onToggleLike}
          >
            <span
              className={`text-s-medium ${isLiked ? 'text-error-500' : 'text-neutral-900'}`}
            >
              {'Wishlist'}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={isLiked ? 'liked' : 'unliked'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                <Heart
                  size={16}
                  className={
                    isLiked
                      ? 'fill-error-500 text-error-500'
                      : 'text-neutral-900'
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="h-[15px] w-px bg-neutral-200" />
          <div
            onClick={onConsultation}
            className="hover:text-primary-500 flex cursor-pointer items-center gap-1 text-sm font-medium text-neutral-900 transition-colors"
          >
            <span className="text-s-medium">Konsultasi</span>
            <WhatsappIcon size={16} />
          </div>
        </>
      )}
      {packageType === PACKAGE_TYPE.UMRAH && (
        <Fragment>
          <div className="h-[15px] w-px bg-neutral-200" />
          <CheckAvailibility
            type="footer"
            token={token}
            handlePushEvent={handlePushEvent}
          />
        </Fragment>
      )}
    </div>
  )
}

export default BottomActions
