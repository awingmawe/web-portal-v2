'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import dayjs from 'dayjs'
import { X } from 'lucide-react'
import renderHTML from 'react-render-html'

interface CheckQuotaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dataSK: any
}

const ModalCheckout = ({
  open,
  onOpenChange,
  dataSK,
}: CheckQuotaModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80%] w-full !max-w-[947px] overflow-y-auto rounded-xl px-6 py-4 shadow-lg max-lg:!max-w-[947px]">
        <DialogHeader className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-base font-semibold text-neutral-900">
                {dataSK?.title}
              </DialogTitle>
            </div>

            <button
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </DialogHeader>
        <div className="h-[1px] w-full bg-[#c9c9c9] max-lg:hidden" />
        <div className="mt-4 text-sm text-neutral-700">
          Terakhir diperbarui:{' '}
          {dayjs(dataSK?.modifiedAt).format('DD MMMM YYYY')}
        </div>
        <div className="text-m mt-4 text-neutral-700">
          {renderHTML(dataSK?.body || '')}
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            className="w-[50%] rounded-full bg-yellow-400 text-sm font-semibold text-black hover:bg-yellow-500"
            onClick={() => onOpenChange(false)}
          >
            Mengerti
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCheckout
