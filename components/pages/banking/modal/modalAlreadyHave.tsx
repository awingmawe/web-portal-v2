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
  text: any
}

const ModalAlreadyHave = ({
  open,
  onOpenChange,
  text,
}: CheckQuotaModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl px-6 py-4 shadow-lg ">
        <DialogHeader className="p-0">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="flex h-[106px] w-[106px] items-center justify-center rounded-lg bg-red-100">
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-lg bg-[#F0143E]">
                  <X className="h-[50px] w-[50px] text-white" />
                </div>
              </div>
              <DialogTitle className="hidden text-base font-semibold text-neutral-900">
                Tidak Dapat Mengajukan Pendanaan
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 text-center text-[24px] font-[600] text-black">
          Tidak Dapat Mengajukan {text}
        </div>
        <div className="text-center text-sm text-neutral-700">
          Terdapat proses pengajuan yang masih berjalan. Harap menunggu proses
          pengajuan selesai sebelum mengajukan kembali.
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            className="w-[50%] rounded-full bg-yellow-400 text-sm font-semibold text-black hover:bg-yellow-500"
            onClick={() => onOpenChange(false)}
          >
            Lihat Pendanaan Aktif
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAlreadyHave
