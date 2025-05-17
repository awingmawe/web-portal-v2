'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CheckCircle } from 'lucide-react'

interface CheckSukseslProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fetchTransactions: any
}

const ModalSuccessCanceled = ({
  open,
  onOpenChange,
  fetchTransactions,
}: CheckSukseslProps) => {
  // const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl px-6 py-4 shadow-lg ">
        <DialogHeader className="p-0">
          {/* <div className="flex items-center justify-between"> */}
          <div className="flex justify-center gap-3">
            <div className="flex h-[106px] w-[106px] items-center justify-center rounded-[60px] bg-green-100">
              <CheckCircle className="h-[52px] w-[52px] text-green-600" />
            </div>
            <DialogTitle className="text-base font-semibold text-neutral-900">
              {/* Pengecekan Kuota Berhasil Terkirim */}
            </DialogTitle>
          </div>
          {/* </div> */}
        </DialogHeader>
        <div className="mt-4 text-center text-[24px] font-[600] text-[#000000]">
          Pesanan Berhasil Dibatalkan
        </div>

        <div className="text-center text-[14px] font-[400] text-[#5F5F5D]">
          Pesanan kamu sebelumnya berhasil dibatalkan, kamu dapat melanjutkan
          proses pengembalian dana atau dapat mengganti paket lain.
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            className="w-[100%] rounded-full bg-yellow-400 text-sm font-semibold text-black hover:bg-yellow-500"
            onClick={() => {
              // router.push(
              //   '/my/transaction?type=upcoming&page=1&query=&status=all&date='
              // )
              fetchTransactions()
              onOpenChange(false)
            }}
          >
            Lihat Detail Transaksi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalSuccessCanceled
