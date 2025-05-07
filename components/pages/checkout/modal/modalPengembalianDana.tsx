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
  parsedContent: any
  dataRefundPolicy: any
}

const ModalPengembalianDana = ({
  open,
  onOpenChange,
  parsedContent,
  dataRefundPolicy,
}: CheckQuotaModalProps) => {
  const convertDaysToWeeks = (days: number) => {
    const weeks = Math.floor(days / 7) // Menghitung jumlah minggu
    const remainingDays = days % 7 // Menghitung sisa hari yang tidak mencapai satu minggu

    if (weeks > 0) {
      return `H-${weeks} minggu` // Jika ada minggu, tampilkan dalam format "h-X minggu"
    }

    return `H-${remainingDays} hari` // Jika tidak ada minggu, tampilkan dalam format "h-X hari"
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scrollbar-thin scrollbar-thumb-gray-300 max-h-[90vh] w-full !max-w-[947px] overflow-y-auto rounded-xl px-6 py-4 shadow-lg">
        <DialogHeader className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-base font-semibold text-neutral-900">
                Pengembalian Dana
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
        <div className="h-[1px] w-full bg-[#D2D2D1] max-lg:hidden" />
        <div
          className="mt-4 text-sm text-neutral-700"
          dangerouslySetInnerHTML={{ __html: dataRefundPolicy?.content }}
        ></div>
        {parsedContent && parsedContent.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 text-sm text-neutral-800">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Jumlah
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
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
                      {convertDaysToWeeks(item.berlaku)}
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

export default ModalPengembalianDana
