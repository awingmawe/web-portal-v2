/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  screenSize?: 'mobile' | 'desktop'
  submissionData?: any
}

const SuccessModal = ({
  open,
  onOpenChange,
  screenSize = 'mobile',
  submissionData,
}: SuccessModalProps) => {
  const router = useRouter()
  // Mobile version - full screen overlay
  if (screenSize === 'mobile') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!h-full !max-w-full !rounded-none !p-0">
          <DialogTitle className="hidden"></DialogTitle>
          <div className="fixed inset-0 z-50 bg-white">
            {/* Content */}
            <div className="flex h-full flex-col bg-gray-50 pb-20">
              {/* Success Icon and Title Section */}
              <div className="bg-gray-50 px-6 pt-6 pb-6">
                {/* Title with Icon */}
                <div className="mb-3 flex items-center justify-center gap-3">
                  <Image
                    src="/images/icon-sukses.svg"
                    width={56}
                    height={56}
                    alt="check icon"
                    className="rounded-full bg-[#FFF2CC] p-2"
                  />
                  <div>
                    <h1 className=" text-lg font-bold text-gray-800">
                      Form Pengajuan Berhasil Terkirim!
                    </h1>
                    <p className="text-left text-sm leading-relaxed text-gray-600">
                      Pengajuan kamu telah berhasil kami terima dan akan segera
                      kami proses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Card */}
              <div className="mx-4 rounded-2xl bg-white p-4 shadow-sm">
                {/* Package Image and Title */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={
                        submissionData?.packageDetails?.src ||
                        '/api/placeholder/400/200'
                      }
                      alt={submissionData?.packageDetails?.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm leading-tight font-semibold text-gray-800">
                      {submissionData?.packageDetails?.title ||
                        'UMROH SYAWAL PLUS DUBAI PAKET 12 HARI BINTANG 5 SPESIAL AWAL TAHUN'}
                    </h4>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Keberangkatan</p>
                    <p className="text-sm font-medium text-gray-800">
                      {submissionData?.selectedVariantDetails?.departureDate &&
                      submissionData?.selectedVariantDetails?.arrivalDate
                        ? `${new Date(
                            submissionData.selectedVariantDetails.departureDate
                          ).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })} → ${new Date(
                            submissionData.selectedVariantDetails.arrivalDate
                          ).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}`
                        : '03 Januari 2025 → 10 Januari 2025'}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-gray-500">Jumlah Jamaah</p>
                    <p className="text-sm font-medium text-gray-800">
                      {submissionData?.jumlahJamaah || '2'}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-gray-500">Tenor</p>
                    <p className="text-sm font-medium text-gray-800">
                      {submissionData?.tenor || '24'} Bulan
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-gray-500">Total Harga</p>
                    <p className="text-sm font-bold text-gray-800">
                      Rp
                      {(submissionData?.totalPrice || 49000000).toLocaleString(
                        'id-ID'
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      Estimasi Angsuran Per Bulan
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      Rp
                      {Math.round(
                        submissionData?.monthlyInstallment || 3245000
                      ).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-auto px-4">
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      router.push('/')
                      //   onOpenChange(false)
                    }}
                    className="w-full rounded-full bg-yellow-400 py-3 text-sm font-semibold text-gray-800 hover:bg-yellow-500"
                  >
                    Kembali Ke Beranda
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="w-full rounded-full border border-yellow-400 bg-white py-3 text-sm font-semibold text-yellow-600 hover:bg-yellow-50"
                  >
                    Lihat Detail Pengajuan
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom indicator */}
            <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-gray-300"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Desktop version - modal overlay
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-8 shadow-xl">
        <DialogHeader className="p-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="sr-only">
              Form Pengajuan Berhasil Terkirim
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        </DialogHeader>

        {/* Success Icon */}
        <div className="flex justify-center">
          {/* <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100"> */}
          <div className="relative">
            <Image
              src="/images/icon-sukses.svg"
              width={106}
              height={106}
              alt="check icon"
              className="mr-2 rounded rounded-[200px] bg-[#FFF2CC]"
            />
          </div>
          {/* </div> */}
        </div>

        {/* Content */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-gray-800">
            Form Pengajuan Berhasil Terkirim!
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Pengajuan kamu telah berhasil kami terima dan akan segera kami
            proses, silahkan pantau proses pengajuanmu dari halaman pengajuan
            ya!
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Button
            onClick={() => {
              // Handle view details
              onOpenChange(false)
            }}
            className="w-full rounded-full bg-yellow-400 py-3 text-sm font-semibold text-white hover:bg-yellow-500"
          >
            Lihat Detail Pengajuan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessModal
