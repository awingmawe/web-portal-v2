'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'

interface CheckQuotaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ModalWaitingHasil = ({ open, onOpenChange }: CheckQuotaModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl px-6 py-4 shadow-lg ">
        <DialogHeader className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <DialogTitle className="hidden text-base font-semibold text-neutral-900">
                Tidak Dapat Mengajukan Pendanaan
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

        <div className="mt-4 text-sm text-neutral-700">
          Tidak Dapat Mengajukan Pendanaan
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            className="w-[50%] rounded-full bg-yellow-400 text-sm font-semibold text-black hover:bg-yellow-500"
            onClick={() => onOpenChange(false)}
          >
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalWaitingHasil
