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
import { X } from 'lucide-react'
import React from 'react'

// Share drawer component for transparent variant
const ShareDrawer = React.memo(
  ({
    titleLink,
    buttonClasses,
    shareViaWhatsApp,
    shareViaCopyLink,
  }: {
    titleLink: string
    buttonClasses: string
    shareViaWhatsApp: (link: string) => void
    shareViaCopyLink: () => void
  }) => {
    return (
      <Drawer>
        <DrawerTrigger>
          <div className="flex items-center gap-2">
            <div className={buttonClasses}>
              <SendIcon size={20} />
            </div>
          </div>
        </DrawerTrigger>
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
