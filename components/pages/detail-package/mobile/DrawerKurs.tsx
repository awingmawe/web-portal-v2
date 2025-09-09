import {
  ContentKurs,
  FooterKurs,
  TitleKurs,
} from '@/components/pages/detail-package/2-PackageVariant/component/ContentKurs'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { X } from 'lucide-react'
import React from 'react'

interface LayoutDrawerDialogProps {
  open: boolean
  currency: string
  checked: boolean

  onCheckedChange: (checked: boolean) => void
  setOpen: (open: boolean) => void
  onCheckout: () => void
}

const DrawerKurs: React.FC<LayoutDrawerDialogProps> = ({
  currency,
  open,
  checked,
  onCheckedChange,
  setOpen,
  onCheckout,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className={`w-full px-4 pt-2.5`}>
        <DrawerHeader>
          <DrawerTitle className="relative">
            <TitleKurs currency={currency} />
            <DrawerClose className="absolute top-0 right-0">
              <X className="text-neutral-900" />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <ContentKurs currency={currency} />
        <DrawerFooter className="pt-3">
          <FooterKurs
            onCheckout={onCheckout}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerKurs
