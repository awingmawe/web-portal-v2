'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getPostCanceled } from '@/services/umrah-service'
import { X } from 'lucide-react'
import renderHTML from 'react-render-html'

interface CheckQuotaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  parsedContent: any
  dataRefundPolicy: any
  openBatalkan: any
  bookingId: any
  description: any
  reason: any
  setDescription: any
  setReason: any
  setOpenModalSukses: any
}

const ModalPengembalianDanaDetail = ({
  open,
  onOpenChange,
  parsedContent,
  dataRefundPolicy,
  openBatalkan,
  bookingId,
  description,
  reason,
  setDescription,
  setReason,
  setOpenModalSukses,
}: CheckQuotaModalProps) => {
  const submitData = async () => {
    try {
      const payload = {
        bookingId: bookingId,
        reason: description === '' ? reason : description,
      }

      await getPostCanceled(payload)
      onOpenChange(false)
      setOpenModalSukses(true)
      setDescription('')
      setReason('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[580px] w-[640px] rounded-2xl bg-white px-8 py-6 text-black">
        <DialogHeader className="p-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[24px] font-bold text-black">
              Syarat Ketentuan Pengembalian Dana
            </DialogTitle>
            <button
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          {/* <p className="text-sm font-normal text-neutral-500">
            The Haramain Project
          </p> */}
        </DialogHeader>

        {/* Konten scrollable */}
        <div className="mt-4 max-h-[370px] overflow-y-auto pr-1">
          <div className="text-[14px] leading-relaxed font-[400] text-[#424242]">
            {renderHTML(dataRefundPolicy?.content || '')}
          </div>

          {parsedContent && parsedContent.length > 0 ? (
            <div className="mt-6">
              <table className="w-full table-auto border border-gray-300 text-sm text-neutral-800">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                      Jumlah
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                      Berlaku
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parsedContent.map((item: any, index: number) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {item.jumlah}%
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        H-{item.berlaku} Hari
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 text-sm text-neutral-700">
              Tidak ada informasi pengembalian dana yang tersedia.
            </div>
          )}
        </div>

        {/* Tombol selalu di bawah */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            className="w-1/2 rounded-full border border-gray-300 text-black hover:bg-gray-100"
            onClick={() => {
              onOpenChange(false)
              openBatalkan(true)
            }}
          >
            Kembali
          </Button>
          <Button
            className="w-1/2 rounded-full bg-yellow-400 text-sm font-semibold text-black hover:bg-yellow-500"
            onClick={submitData}
          >
            Setujui dan Batalkan Pesanan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalPengembalianDanaDetail
