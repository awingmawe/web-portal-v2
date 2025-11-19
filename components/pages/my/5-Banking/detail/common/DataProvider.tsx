'use client'

import { STATUS_CONFIG } from '@/components/pages/my/5-Banking/constants'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import { formatCurrency } from '@/lib/utils'
import TableComparasion from './TableComparasion'
// Import Tipe Data
import Image from 'next/image'

// Helper component untuk Rincian Pembayaran (sesuai layout di gambar)
const InfoRowRincian = ({
  label,
  value,
  isTotal = false,
  description,
}: {
  label: string
  value: string | React.ReactNode
  isTotal?: boolean
  description?: boolean
}) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-col">
      <p
        className={`text-s-regular ${isTotal ? 'text-s-semibold text-neutral-900' : 'text-neutral-500'}`}
      >
        {label}
      </p>
      {description && (
        <p className="text-xs-medium text-neutral-300">
          Dibayar pada saat checkout
        </p>
      )}
    </div>
    <p
      className={`text-s-regular ${isTotal ? 'text-s-semibold text-neutral-900' : 'font-medium text-neutral-900'}`}
    >
      {value || '-'}
    </p>
  </div>
)

// Helper function untuk format tenor
const formatTenor = (value: number | undefined | null) => {
  if (!value) return '- bulan'
  return `${value} bulan`
}

interface DetailDataProviderProps {
  submission: SubmissionCredit
  isExpired: boolean
}

export default function DetailDataProvider({
  submission,
  isExpired,
}: DetailDataProviderProps) {
  const config =
    STATUS_CONFIG[submission.view_status] || STATUS_CONFIG['ongoing']

  // --- Data & Kalkulasi ---
  const application = submission.applications[0]
  const requestLoan = submission.requested_loan
  const providerData = application.provider
  const providerThumbnail = providerData.logo || '/images/logo-koper.svg' // Fallback

  // 1. Data Pengajuan Kamu (dari submission)
  const pengajuanJumlah = formatCurrency(submission.total_price)
  const pengajuanTenor = submission.tenor
  const pengajuanAngsuran = formatCurrency(requestLoan.monthly_payment || 0)

  // 2. Data Pengajuan Diterima (dari application)
  const diterimaJumlah = formatCurrency(application.approved_total_price)
  const diterimaTenor = application.approved_tenor
  const diterimaAngsuran = formatCurrency(application.coverage_amount || 0)

  // 3. Data Rincian (dari application)
  const adminFee = application.admin_fee || 0
  const insuranceFee = application.insurance_fee || 0
  const totalCheckout = application.total_checkout || 0
  const discountPercentage = application.down_payment_percentage || 0

  // Kalkulasi Uang Muka
  const uangMuka = totalCheckout - adminFee - insuranceFee

  // Kondisi memunculkan table
  const showTable =
    submission.view_status !== 'rejected'
      ? config.showTable
      : isExpired
        ? true
        : false

  return (
    <div className="mx-auto w-full space-y-4 px-8 max-lg:space-y-3 max-lg:px-4">
      <p className="text-m-semibold max-lg:text-xs max-lg:leading-4">
        Status Pengajuan
      </p>
      {/* 1. Implementasi Accordion */}
      <Accordion type="single" collapsible defaultValue="provider-item-1">
        <AccordionItem
          value="provider-item-1"
          // Style "Floating": Item tidak punya border
          className="border-none"
        >
          <AccordionTrigger
            // Style "Floating": Trigger adalah kartu yang melayang
            className="relative z-10 rounded-[20px] border border-neutral-200 bg-white px-3 py-4 hover:no-underline max-lg:px-3"
            classNameHeader="rounded-t-[20px] bg-[#F7F7F7] border-x border-neutral-100"
            noSeparator
          >
            <div className="flex items-center gap-3 text-left">
              <Image
                width={24}
                height={24}
                src={providerThumbnail}
                alt={providerData.name}
                className="max-lg:h-4 max-lg:!w-4"
              />
              <span className="text-semibold text-sm max-lg:text-xs">
                {providerData.name}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="relative z-0 mt-[-16px] rounded-b-[20px] border-1 border-neutral-100 bg-[#F7F7F7] px-0 pt-0 pb-0">
            <div className="space-y-3 p-6 pb-4 max-lg:px-3 max-lg:pb-3">
              <p className="text-m-semibold max-lg:text-xs max-lg:leading-4">
                Rincian Pembiayaan
              </p>
              {showTable ? (
                <>
                  {/* --- 1. Tabel Perbandingan --- */}
                  <TableComparasion
                    pengajuanJumlah={pengajuanJumlah}
                    diterimaJumlah={diterimaJumlah}
                    pengajuanTenor={formatTenor(pengajuanTenor)}
                    diterimaTenor={formatTenor(diterimaTenor)}
                    pengajuanAngsuran={pengajuanAngsuran}
                    diterimaAngsuran={diterimaAngsuran}
                  />

                  {/* --- 2. Rincian Pembayaran --- */}
                  <div className="space-y-3">
                    <p className="text-m-semibold max-lg:text-xs max-lg:leading-4">
                      Rincian Pembayaran Di Awal
                    </p>
                    <div className="flex flex-col gap-2">
                      <InfoRowRincian
                        label={`Uang Muka ${discountPercentage}%`}
                        value={formatCurrency(uangMuka)}
                      />
                      <InfoRowRincian
                        label="Biaya Admin"
                        value={formatCurrency(adminFee)}
                      />
                      <InfoRowRincian
                        label="Asuransi"
                        value={formatCurrency(insuranceFee)}
                      />

                      <hr className="border-neutral-200" />

                      <InfoRowRincian
                        label="Total Biaya di Muka"
                        value={formatCurrency(totalCheckout)}
                        isTotal
                        description
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <InfoRowRincian
                      label={'Pengajuan Pembiayaan Kamu'}
                      value={pengajuanJumlah}
                    />
                    <InfoRowRincian
                      label={'Pengajuan Tenor'}
                      value={pengajuanTenor}
                    />
                    <hr className="border-neutral-200" />
                    <div className="flex flex-col gap-2">
                      <p className="text-m-medium text-center">
                        Pengajuan Pembiayaan Kamu Sedang Menunggu Penawaran dari
                        Pihak Mitra
                      </p>
                      <p className="text-s-regular text-center">
                        Kami telah mengirimkan permintaan Kamu ke mitra. Harap
                        menunggu, penawaran sedang diproses.{' '}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* === END: "Fokus disini" === */}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
