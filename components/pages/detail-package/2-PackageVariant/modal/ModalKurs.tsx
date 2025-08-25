import {
  ContentKurs,
  FooterKurs,
  TitleKurs,
} from '@/components/pages/detail-package/2-PackageVariant/component/ContentKurs'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import React from 'react'

interface LayoutDrawerDialogProps {
  open: boolean
  hideCloseButton?: boolean
  currency: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  setOpen: (open: boolean) => void
  onCheckout: () => void
}

const ModalKurs: React.FC<LayoutDrawerDialogProps> = ({
  hideCloseButton = false,
  currency,
  open,
  checked,
  onCheckedChange,
  setOpen,
  onCheckout,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`!max-w-3/4 rounded-[20px] px-8 py-4 ${
          hideCloseButton ? '[&>button]:hidden' : ''
        }`}
      >
        <DialogTitle>
          <TitleKurs currency={currency} />
        </DialogTitle>
        <ContentKurs currency={currency} />
        <DialogFooter className="pt-3">
          <FooterKurs
            onCheckout={onCheckout}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalKurs
