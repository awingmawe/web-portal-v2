/* eslint-disable @typescript-eslint/no-unused-vars */
import DrawerSukses from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerSukses'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { toast } from '@/components/ui/sonner'
import { getPostCanceled } from '@/services/umrah-service'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

const DrawerBatalkanPesanan = React.memo(
  ({
    bookingId,
    openForm,
    setOpenForm,
    setOpen,
  }: {
    bookingId?: any
    openForm?: any
    setOpenForm?: any
    setOpen?: any
  }) => {
    const closeRef = useRef<HTMLButtonElement>(null)
    const cancellationReasons = [
      'Masalah kesehatan',
      'Kesulitan melanjutkan pembayaran',
      'Perubahan jadwal pribadi',
      'Situasi keamanan, pandemi, atau pembatasan',
      'Perubahan prioritas',
      'Kesiapan spiritual',
      'Lainnya',
    ]
    const [reason, setReason] = useState('')
    const [description, setDescription] = useState('')
    const [openSukses, setOpenSukses] = useState(false)
    const [isLoadingBatalkan, setIsLoadingBatalkan] = useState(false)
    const isOtherReasonSelected = reason === 'Lainnya'
    // const handleClick = () => {
    //   // handleUseMyDataChangeMobile()
    //   closeRef.current?.click() // Tutup drawer
    // }

    const handleSubmitRefund = async () => {
      setIsLoadingBatalkan(true)
      const payload = {
        bookingId: bookingId,
        reason: description === '' ? reason : description,
      }
      try {
        await getPostCanceled(payload)
        setDescription('')
        setTimeout(() => {
          setOpenForm(false)
          setOpen(false) // tutup drawer refund
          setOpenSukses(true) // buka drawer sukses
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
      <>
        <Drawer open={openForm} onOpenChange={setOpenForm}>
          <DrawerContent className="z-[999] bg-white">
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader className="border-gray-200 px-4">
                <div className="flex items-center">
                  <DrawerClose ref={closeRef} className="hidden" />
                  <DrawerTitle className="flex text-lg font-medium">
                    <Image
                      src="/images/IconModalBatalkan.svg"
                      width={24}
                      height={24}
                      alt="check icon"
                      className="mr-2 "
                    />
                    Batalkan Pesanan
                  </DrawerTitle>
                </div>
              </DrawerHeader>

              <p className="px-4 text-[14px] font-[400] text-gray-500">
                Berikan alasan untuk membatalkan pesanan
              </p>
              <div className="space-y-3 px-4 py-4">
                {cancellationReasons.map((item) => (
                  <label key={item} className="flex items-center gap-3 text-sm">
                    <input
                      type="radio"
                      name="cancelReason"
                      value={item}
                      checked={reason === item}
                      onChange={() => setReason(item)}
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
                    className="focus:border-primary-500 w-full rounded-[20px] border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none"
                  />
                )}

                {/* Refund Info Box */}
                {/* Stil dont know what is this for, but keep it first for now */}
                {/* <div className="mt-6 rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
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
                    *Perhitungan ini hanya simulasi dan dapat berubah sesuai
                    dengan ketentuan mitra terkait.
                  </p>
                </div> */}

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-between gap-4">
                  <Button
                    className="border-primary-500 text-primary-500 h-[40px]  w-full rounded-full border-2 bg-white "
                    onClick={() => {
                      setDescription('')
                      setReason('')
                    }}
                  >
                    Kembali
                  </Button>
                  <Button
                    className="bg-primary-500 hover:bg-primary-600 h-[40px] w-full rounded-full text-white"
                    onClick={handleSubmitRefund}
                    disabled={!reason || isLoadingBatalkan}
                  >
                    Batalkan Pesanan
                  </Button>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <DrawerSukses open={openSukses} onOpenChange={setOpenSukses} />

        {/* Refund Policy Drawer, for now it is not used, so keep it for now */}
        {/* <DrawerRefundPolicy
          dataRefundPolicy={dataRefundPolicy}
          parsedContent={parsedContent}
          description={description}
          reason={reason}
          bookingId={bookingId}
          open={openRefundPolicy}
          setOpen={setOpenRefundPolicy}
          setOpenForm={setOpenForm}
          setDescription={setDescription}
          setReason={setReason}
        /> */}
      </>
    )
  }
)

DrawerBatalkanPesanan.displayName = 'DrawerBatalkanPesanan'

export default DrawerBatalkanPesanan
