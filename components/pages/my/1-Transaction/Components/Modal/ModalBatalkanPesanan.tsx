'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { toast } from '@/components/ui/sonner'
import { useCanceled } from '@/contexts/canceled-package-context'
import { getPostCanceled } from '@/services/umrah-service'
import { DialogClose } from '@radix-ui/react-dialog'
import { CircleX } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface TransactionDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookingId?: any
  setDescription: any
  setReason: any
  description: any
  reason: any
}

const cancellationReasons = [
  'Masalah kesehatan',
  'Kesulitan melanjutkan pembayaran',
  'Perubahan jadwal pribadi',
  'Situasi keamanan, pandemi, atau pembatasan',
  'Perubahan prioritas',
  'Kesiapan spiritual',
  'Lainnya',
]

export function BatalkanPesanan({
  open,
  onOpenChange,
  bookingId,
  setDescription,
  setReason,
  description,
  reason,
}: TransactionDetailProps) {
  const [isLoadingBatalkan, setIsLoadingBatalkan] = useState(false)

  const { setOpenModalSukses, setOpenBatalkan } = useCanceled()
  const isOtherReasonSelected = reason === 'Lainnya'

  const handleSubmit = async () => {
    onOpenChange(false)
    setIsLoadingBatalkan(true)
    const payload = {
      bookingId: bookingId,
      reason: description === '' ? reason : description,
    }
    try {
      await getPostCanceled(payload)
      setDescription('')
      setTimeout(() => {
        setOpenBatalkan(false)
        setOpenModalSukses(true) // buka drawer sukses
      }, 300)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsLoadingBatalkan(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[640px] gap-0 overflow-hidden rounded-2xl bg-white px-6 py-4 text-black">
        {/* Header */}
        <DialogTitle asChild>
          <div className="relative flex items-center gap-3 pb-3">
            <Image
              src="/images/IconModalBatalkan.svg"
              width={56}
              height={56}
              alt="check icon"
              className="mr-2 bg-[#fff1e3]"
            />
            <div>
              <p className="text-[24px] font-semibold">Batalkan pesanan</p>
              <p className="mt-2 text-[14px] font-[400] text-gray-500">
                Berikan alasan untuk membatalkan pesanan
              </p>
            </div>
            <DialogClose className="absolute top-4 right-4">
              <CircleX className="text-gray-500" />
            </DialogClose>
          </div>
        </DialogTitle>

        {/* Cancellation Form */}
        <div className="mt-6 space-y-3">
          {cancellationReasons.map((item) => (
            <label key={item} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="cancelReason"
                value={item}
                checked={reason === item}
                onChange={() => setReason(item)}
                // className="h-4 w-4 text-yellow-500 accent-yellow-500"
              />
              <span className="text-[16px] font-[400] text-[#000000]">
                {item}
              </span>
            </label>
          ))}

          {isOtherReasonSelected && (
            <input
              type="text"
              placeholder="Berikan keterangan pembatalan"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-[20px] border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
            />
          )}
        </div>

        {/* Refund Info Box */}
        {/* Stil dont know what is this for, but keep it first for now */}
        {/* <div className="mt-6 rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
          <p className="font-[14px] font-[500] text-[#131313]">
            Estimasi Dana yang Dapat Dikembalikan
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-[12px] font-[400] text-[#424242]">
              Total dana kamu
            </p>
            <p className="font-[14px] font-[600] text-[#131313]">
              Rp{dataPre?.totalPayment.toLocaleString()}
            </p>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="font-[12px] font-[400] text-[#424242]">
              Pengembalian {dataPre?.totalPercentage}%
            </p>
            <p className="font-[14px] font-[600] text-[#131313]">
              Rp{dataPre?.totalRefund.toLocaleString()}
            </p>
          </div>
          <p className="mt-2 text-center font-[12px] font-[400] text-[#424242]">
            *Perhitungan ini hanya simulasi dan dapat berubah sesuai dengan
            ketentuan mitra terkait.
          </p>
        </div> */}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            className="w-1/2 rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-100"
            disabled={isLoadingBatalkan}
            onClick={() => {
              setDescription('')
              setReason('')
              onOpenChange(false)
            }}
          >
            Kembali
          </Button>
          <Button
            className="w-1/2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={handleSubmit}
            disabled={!reason || isLoadingBatalkan}
          >
            Batalkan Pesanan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
