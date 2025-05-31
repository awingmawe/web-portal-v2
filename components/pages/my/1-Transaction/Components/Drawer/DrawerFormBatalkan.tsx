/* eslint-disable @typescript-eslint/no-unused-vars */
import DrawerRefundPolicy from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerRefundPolicy'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { checkRefundPolicy } from '@/services/identity-service'
import { getPreCanceled } from '@/services/umrah-service'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const DrawerBatalkanPesanan = React.memo(
  ({
    bookingId,
    idOrganisasi,
    openForm,
    setOpenForm,
    setOpen,
  }: {
    bookingId?: any
    idOrganisasi?: any
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
    const [dataRefundPolicy, setDataRefundPolicy] = useState<any>()
    const [parsedContent, setParsedContent] = useState<any>(null)
    const [dataPre, setDataPre] = useState<any>()
    const [openRefundPolicy, setOpenRefundPolicy] = useState(false)
    const isOtherReasonSelected = reason === 'Lainnya'
    // const handleClick = () => {
    //   // handleUseMyDataChangeMobile()
    //   closeRef.current?.click() // Tutup drawer
    // }
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
        const response = await checkRefundPolicy(idOrganisasi)
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
      getDataPreCanceled()
      getRefundPolicy()
    }, [])
    return (
      <>
        <Drawer open={openForm} onOpenChange={setOpenForm}>
          <DrawerContent className="z-[999] bg-white p-0">
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader className="border-gray-200 px-4 py-3">
                <div className="flex items-center">
                  <DrawerClose ref={closeRef} className="hidden" />
                  <DrawerTitle className="flex text-lg font-medium">
                    <Image
                      src="/images/IconModalBatalkan.svg"
                      width={20}
                      height={20}
                      alt="check icon"
                      className="mr-2 bg-[#FFF2CC]"
                    />
                    Batalkan Pesanan
                  </DrawerTitle>
                </div>
              </DrawerHeader>

              <p className="p-2 text-[14px] font-[400] text-gray-500">
                Berikan alasan untuk membatalkan pesanan
              </p>
              <div className="space-y-3 p-4">
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
                    *Perhitungan ini hanya simulasi dan dapat berubah sesuai
                    dengan ketentuan mitra terkait.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-between gap-4">
                  <Button
                    className="h-[40px] w-[200px] rounded-full border-2 border-yellow-500 bg-white text-yellow-500 "
                    onClick={() => {
                      setDescription('')
                      setReason('')
                      setOpen(true)
                      setOpenForm(false)
                    }}
                  >
                    Kembali
                  </Button>
                  <Button
                    className="h-[40px] w-1/2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
                    onClick={() => {
                      setOpen(false) // tutup drawer refund
                      setOpenForm(false)
                      setTimeout(() => {
                        setOpenRefundPolicy(true) // buka drawer sukses
                      }, 300)
                    }}
                    disabled={!reason}
                  >
                    Batalkan Pesanan
                  </Button>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <DrawerRefundPolicy
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
        />
      </>
    )
  }
)

DrawerBatalkanPesanan.displayName = 'DrawerBatalkanPesanan'

export default DrawerBatalkanPesanan
