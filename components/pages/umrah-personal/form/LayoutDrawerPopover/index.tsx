import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { cn } from '@/lib/utils'
import React from 'react'

interface LayoutDrawerPopupProps {
  field: {
    value: string | undefined
    onChange: (date: string) => void
  }
  triggerPopup: React.ReactNode
  classNameTriggerPopup?: string
  content: React.ReactNode
  classNameContentPopover?: string
  classNameContentDrawer?: string
  drawerCancel?: () => void
}

const LayoutDrawerPopup: React.FC<LayoutDrawerPopupProps> = ({
  field,
  triggerPopup,
  classNameTriggerPopup,
  content,
  classNameContentPopover,
  classNameContentDrawer,
  drawerCancel,
}) => {
  const { lg: isMobile } = useTailwindBreakpoint()
  const classNameTrigger = cn(
    'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-4 py-2.5',
    field.value
      ? 'border-primary-500'
      : 'border-neutral-200 bg-white hover:border-neutral-300',
    classNameTriggerPopup
  )
  return !isMobile ? (
    <Popover>
      <PopoverTrigger asChild className={classNameTrigger}>
        {triggerPopup}
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-auto p-0', classNameContentPopover)}
        align="start"
      >
        {content}
      </PopoverContent>
    </Popover>
  ) : (
    <Drawer>
      <DrawerTrigger asChild className={classNameTrigger}>
        {triggerPopup}
      </DrawerTrigger>
      <DrawerContent className={cn(classNameContentDrawer, 'z-99')}>
        <DrawerTitle className="hidden"></DrawerTitle>
        <div className="w-full">{content}</div>
        <DrawerFooter>
          <div className={`flex items-center justify-between gap-3`}>
            <DrawerClose
              onClick={drawerCancel}
              className="border-primary-500 text-s-regular w-full rounded-full border-2 py-3"
            >
              Batal
            </DrawerClose>
            <DrawerClose className="bg-primary-500 text-s-regular w-full rounded-full py-3">
              Pilih
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default LayoutDrawerPopup
