import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import React from 'react'

interface LayoutDrawerDialogProps {
  trigger: React.ReactNode
  content: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  drawerConfirm?: () => void
  drawerCancel?: () => void
}

const LayoutDrawerDialog: React.FC<LayoutDrawerDialogProps> = ({
  trigger,
  content,
  isOpen,
  setIsOpen,
  drawerConfirm,
  drawerCancel,
}) => {
  const { lg: isMobile } = useTailwindBreakpoint()

  return !isMobile ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-8">
        <DialogTitle className="hidden"></DialogTitle>
        {content}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="hidden"></DrawerTitle>
        <div className="w-full px-4 pt-2.5">{content}</div>
        <DrawerFooter className="pt-3">
          <div className={`flex items-center justify-between gap-3`}>
            <DrawerClose
              onClick={drawerCancel}
              className="border-primary-500 text-s-regular w-full rounded-full border-2 py-3"
            >
              Tidak
            </DrawerClose>
            <DrawerClose
              className="bg-primary-500 text-s-regular w-full rounded-full py-3"
              onClick={drawerConfirm}
            >
              Ya
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default LayoutDrawerDialog
