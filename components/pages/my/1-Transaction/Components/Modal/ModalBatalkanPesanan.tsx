'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { checkRefundPolicy } from '@/services/identity-service'
import { getPreCanceled } from '@/services/umrah-service'
import { DialogClose } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface TransactionDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  organizationInstanceId: any
  setParsedContent?: any
  setDataRefundPolicy?: any
  setOpenModalRefund?: any
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
  organizationInstanceId,
  setParsedContent,
  setDataRefundPolicy,
  setOpenModalRefund,
  bookingId,
  setDescription,
  setReason,
  description,
  reason,
}: TransactionDetailProps) {
  const [dataPre, setDataPre] = useState<any>()

  const isOtherReasonSelected = reason === 'Lainnya'

  // const dataPre = {
  //   totalDana: 50000000,
  //   totalPercentage: 75,
  //   totalRefund: 37500000,
  // }

  const handleSubmit = () => {
    setOpenModalRefund(true)
    onOpenChange(false)

    // Lanjutkan dengan logic pembatalan
  }
  const getDataPreCanceled = async () => {
    try {
      const res = await getPreCanceled(bookingId)
      setDataPre(res)
    } catch (error) {
      console.log(error)
    }
  }
  const getRefundPolicy = async () => {
    try {
      const response = await checkRefundPolicy(organizationInstanceId)
      setDataRefundPolicy(response)
      const parsedContent = response?.kondisi
        ? JSON.parse(response?.kondisi)
        : ''
      setParsedContent(parsedContent)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (open) {
      getDataPreCanceled()
      getRefundPolicy()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[640px] gap-0 overflow-hidden rounded-2xl bg-white px-6 py-4 text-black">
        {/* Header */}
        <DialogTitle asChild>
          <div className="flex items-center gap-3  pb-3">
            {/* <div className="rounded-md bg-yellow-100 p-2"> */}
            {/* Icon bisa diganti sesuai kebutuhan */}
            <Image
              src="/images/IconModalBatalkan.svg"
              width={56}
              height={56}
              alt="check icon"
              className="mr-2 bg-[#FFF2CC]"
            />
            {/* </div> */}
            <div>
              <p className="text-[24px] font-semibold">Batalkan pesanan</p>
              <p className="mt-2 text-[14px] font-[400] text-gray-500">
                Berikan alasan untuk membatalkan pesanan
              </p>
            </div>
            <DialogClose className="ml-auto">
              <X className="text-gray-500" />
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
        <div className="mt-6 rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
          <p className="font-[14px] font-[500] text-[#30302F]">
            Estimasi Dana yang Dapat Dikembalikan
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-[12px] font-[400] text-[#8E8E8B]">
              Total dana kamu
            </p>
            <p className="font-[14px] font-[600] text-[#30302F]">
              Rp{dataPre?.totalPayment.toLocaleString()}
            </p>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="font-[12px] font-[400] text-[#8E8E8B]">
              Pengembalian {dataPre?.totalPercentage}%
            </p>
            <p className="font-[14px] font-[600] text-[#30302F]">
              Rp{dataPre?.totalRefund.toLocaleString()}
            </p>
          </div>
          <p className="mt-2 text-center font-[12px] font-[400] text-[#8E8E8B]">
            *Perhitungan ini hanya simulasi dan dapat berubah sesuai dengan
            ketentuan mitra terkait.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            className="w-1/2 rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-100"
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
            disabled={!reason}
          >
            Batalkan Pesanan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
