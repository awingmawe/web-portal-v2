'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { useState } from 'react'

interface CheckQuotaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (quotaAmount: string) => void
}

const CheckQuotaModal = ({
  open,
  onOpenChange,
  onSubmit,
}: CheckQuotaModalProps) => {
  const [quotaAmount, setQuotaAmount] = useState('')

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(quotaAmount)
      setQuotaAmount('')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg p-0 sm:max-w-md">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-amber-50 p-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 5H3C2.4 5 2 5.4 2 6V18C2 18.6 2.4 19 3 19H21C21.6 19 22 18.6 22 18V6C22 5.4 21.6 5 21 5Z"
                  stroke="#FFB800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 5V19"
                  stroke="#FFB800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 5V19"
                  stroke="#FFB800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9H15"
                  stroke="#FFB800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 13H15"
                  stroke="#FFB800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-neutral-900">
                Cek Kuota
              </DialogTitle>
              <p className="mt-1 text-sm text-neutral-600">
                Masukkan jumlah kuota yang Anda butuhkan
              </p>
            </div>
          </div>
          <button
            className="ring-offset-background absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="p-6 pt-4">
          <Input
            placeholder="Masukkan jumlah kuota yang anda butuhkan"
            value={quotaAmount}
            onChange={(e) => setQuotaAmount(e.target.value)}
            className="mb-4 rounded-full px-4 py-6"
            type="number"
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-full font-medium"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button
              className="flex-1 rounded-full bg-amber-500 font-medium hover:bg-amber-600"
              onClick={handleSubmit}
            >
              Kirim
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CheckQuotaModal
