import {
  ContentKurs,
  FooterKurs,
  TitleKurs,
} from '@/components/pages/detail-package/2-PackageVariant/component/ContentKurs'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { X } from 'lucide-react'
import React from 'react'

interface LayoutDrawerDialogProps {
  open: boolean
  hideCloseButton?: boolean
  currency: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  setOpen: (open: boolean) => void
  onCheckout: () => void
  disabledCheck?: boolean
  disableCheckout?: boolean
}

const ModalKurs: React.FC<LayoutDrawerDialogProps> = ({
  hideCloseButton = false,
  currency,
  open,
  checked,
  onCheckedChange,
  setOpen,
  onCheckout,
  disabledCheck = false,
  disableCheckout = false,
}) => {
  const { lg } = useTailwindBreakpoint()

  if (!lg) {
    // DESKTOP
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`!max-w-3/4 rounded-[20px] px-8 py-4 ${
            hideCloseButton ? '[&>button]:hidden' : ''
          }`}
        >
          <DialogHeader>
            <DialogClose asChild>
              <X
                size={30}
                className="absolute -top-10 -right-6 cursor-pointer rounded-full bg-white p-1 text-(--primary-500) hover:text-gray-600"
              />
            </DialogClose>
          </DialogHeader>
          <DialogTitle>
            <TitleKurs currency={currency} />
          </DialogTitle>
          <ContentKurs currency={currency} />
          <DialogFooter className="pt-3">
            <FooterKurs
              onCheckout={onCheckout}
              checked={checked}
              onCheckedChange={onCheckedChange}
              disabledCheck={disabledCheck}
              disableCheckout={disableCheckout}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  } else {
    // MOBILE
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        {/* <DrawerTrigger asChild>
          <button className="text-s-regular flex items-center gap-0.5 rounded-full bg-neutral-100 px-2 py-1 text-nowrap text-neutral-700">
            <ChevronIcon />
          </button>
        </DrawerTrigger> */}
        <DrawerContent className="z-100 border-0 outline-0">
          <DrawerHeader className="items-center p-3">
            <DrawerTitle className="flex items-center">
              <div className="flex items-center">
                <TitleKurs currency={currency} />
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="space-y-2 overflow-y-auto px-4 pb-4 text-sm">
            <ContentKurs currency={currency} />
          </div>
          <div className="flex w-full px-3 pt-3 pb-5">
            <DrawerClose className="w-full" asChild>
              <FooterKurs
                onCheckout={onCheckout}
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabledCheck={disabledCheck}
                disableCheckout={disableCheckout}
              />
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
}

export default ModalKurs
