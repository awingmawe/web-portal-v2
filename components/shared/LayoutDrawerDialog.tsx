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
  title: React.ReactNode
  content: React.ReactNode
  footerContent?: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  preventClose?: boolean
  sizeDialog?: 'wide' | 'large' | 'medium' | 'default'
  hideCloseButton?: boolean
  onCloseAttempt?: () => void
}

const LayoutDrawerDialog: React.FC<LayoutDrawerDialogProps> = ({
  trigger,
  title,
  content,
  isOpen,
  footerContent,
  setIsOpen,
  sizeDialog = 'default',
  preventClose = false,
  hideCloseButton = false,
  onCloseAttempt,
}) => {
  const { lg: isMobile } = useTailwindBreakpoint()

  const handleOpenChange = (newOpen: boolean) => {
    if (preventClose && !newOpen) {
      onCloseAttempt?.()
      return
    }
    setIsOpen(newOpen)
  }

  const size = {
    wide: '!max-w-3/4',
    large: '!max-w-2/3',
    medium: '!max-w-1/2',
    default: 'w-full',
  }

  const preventCloseEvents = preventClose
    ? {
        onPointerDownOutside: (e: Event) => {
          e.preventDefault()
          onCloseAttempt?.()
        },
        onEscapeKeyDown: (e: KeyboardEvent) => {
          e.preventDefault()
          onCloseAttempt?.()
        },
        onInteractOutside: (e: Event) => {
          e.preventDefault()
          onCloseAttempt?.()
        },
      }
    : {}

  return !isMobile ? (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`${size[sizeDialog || 'default']} rounded-[20px] p-8 ${
          hideCloseButton ? '[&>button]:hidden' : ''
        }`}
        {...preventCloseEvents}
      >
        <DialogTitle>{title}</DialogTitle>
        {content}
        {footerContent && (
          <DialogFooter className="pt-3">{footerContent}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent
        {...preventCloseEvents}
        className={hideCloseButton ? '[&>button]:hidden' : ''}
      >
        <DrawerTitle>{title}</DrawerTitle>
        <div className="w-full px-4 pt-2.5 max-lg:overflow-y-auto">
          {content}
        </div>
        {footerContent && (
          <DrawerFooter className="pt-3">{footerContent}</DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default LayoutDrawerDialog
