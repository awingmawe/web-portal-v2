import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
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
  footerContent: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const LayoutDrawerDialog: React.FC<LayoutDrawerDialogProps> = ({
  trigger,
  content,
  isOpen,
  footerContent,
  setIsOpen,
}) => {
  const { lg: isMobile } = useTailwindBreakpoint()

  return !isMobile ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-[20px] p-8">
        <DialogTitle className="hidden"></DialogTitle>
        {content}
        <DialogFooter className="pt-3">{footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="hidden"></DrawerTitle>
        <div className="w-full px-4 pt-2.5">{content}</div>
        <DrawerFooter className="pt-3">{footerContent}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default LayoutDrawerDialog
