import { SendIcon } from '@/components/icons/send'
import ShareIcon from '@/components/icons/share'
import WhatsappIcon from '@/components/icons/whatsapp'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { toast } from '@/components/ui/sonner'
import { ACCOUNT_URL } from '@/constant/env'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { toggleLike } from '@/services/umrah-service'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import React, { useState } from 'react'

// Share drawer component for transparent variant
const ShareDrawer = React.memo(
  ({
    titleLink,
    buttonClasses,
    token,
    id,
  }: {
    titleLink: string
    buttonClasses: string
    token?: string
    id?: number
  }) => {
    const { shareViaCopyLink, shareViaWhatsApp } = useGallerySharing()
    const { pushEvent } = useEventTracker()

    const [isLiked, setIsLiked] = useState(false)
    const handleToggleLike = async () => {
      if (!token) {
        window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
        return
      }

      try {
        await toggleLike(Number(id))

        setIsLiked(!isLiked)
        if (isLiked) {
          handlePushEvent('add_to_wishlist')
        }
      } catch (error: any) {
        setIsLiked(isLiked)

        toast.error(
          error?.message ??
            'Terjadi kesalahan saat like paket. Silakan coba lagi.'
        )
      } finally {
      }
    }

    function handlePushEvent(name: string) {
      pushEvent({
        name,
        category: 'detail_package',
        topic: 'umrah',
      })
    }
    return (
      <Drawer>
        <div className="flex items-center gap-2">
          <DrawerTrigger>
            <div className={buttonClasses}>
              <SendIcon size={20} />
            </div>
          </DrawerTrigger>
          <div className={buttonClasses}>
            <AnimatePresence mode="wait">
              <motion.div
                key={isLiked ? 'liked' : 'unliked'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Heart
                  size={20}
                  onClick={() => handleToggleLike()}
                  className={
                    isLiked
                      ? 'fill-error-500 text-error-500'
                      : 'text-neutral-900'
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <DrawerContent>
          <DrawerHeader className="gap-3">
            <DrawerTitle className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <SendIcon size={14} />
                <p className="text-m-semibold text-neutral-900">Share</p>
              </div>
              <DrawerClose>
                <X className="text-primary-900" />
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full"
                size="xs"
                onClick={() => shareViaWhatsApp(titleLink || '')}
              >
                <WhatsappIcon size={24} className="mr-[9px]" />
                Share ke WhatsApp
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="xs"
                onClick={shareViaCopyLink}
              >
                <ShareIcon size={24} className="mr-[9px]" />
                Salin Link
              </Button>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
  }
)
ShareDrawer.displayName = 'ShareDrawer'

export default ShareDrawer
