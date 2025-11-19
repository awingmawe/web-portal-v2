'use client'

import NextLink from 'next/link'
import { useMemo, useState } from 'react'

// Components & Icons
import { MessageQuestionIcon } from '@/components/icons/message-question'
import TableComparasion from '@/components/pages/my/5-Banking/detail/common/TableComparasion'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { CALL_CENTER } from '@/constant/env'

// Hooks & Utils
import { useBankingPaymentHandler } from '@/hooks/pembiayaan/usePaymentBankingCredit'
import { formatCurrency } from '@/lib/utils'
import { useGetOrderPayment } from '@/services/hooks/umrah-service/booking-api'

// Types & Constants (Import dari file baru)
import {
  CTA_STATIC_CONFIG,
  ViewCta,
} from '@/components/pages/my/5-Banking/constants'
import {
  SubmissionCredit,
  SubmissionCreditApplication,
} from '@/constant/types/SubmissionPembiayaan'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useChangePackage } from '@/hooks/pembiayaan/useChangePackage'

// --- Sub-Components untuk Dialog Content ---
const DialogCheckoutContent = ({
  submission,
}: {
  submission: SubmissionCredit
}) => {
  const app = submission.applications[0]
  const requestLoan = submission.requested_loan

  const formatTenor = (value: number | undefined | null) =>
    value ? `${value} bulan` : '- bulan'

  return (
    <div className="flex flex-col gap-4 max-lg:gap-3">
      <p className="text-m-regular text-neutral-500">
        Pastikan kamu sudah yakin karena pilihan kamu tidak dapat diubah di
        kemudian waktu.
      </p>
      <p className="text-m-semibold">Rincian Pembiayaan</p>
      <TableComparasion
        pengajuanJumlah={formatCurrency(submission.total_price)}
        diterimaJumlah={formatCurrency(app.approved_total_price)}
        pengajuanTenor={formatTenor(submission.tenor)}
        diterimaTenor={formatTenor(app.approved_tenor)}
        pengajuanAngsuran={formatCurrency(requestLoan.monthly_payment || 0)}
        diterimaAngsuran={formatCurrency(app.coverage_amount || 0)}
      />
    </div>
  )
}

const DialogPaymentChangeContent = () => (
  <p className="text-m-regular text-neutral-500">
    Kamu telah memilih metode pembayaran sebelumnya. Setelah diubah, yang lama
    akan hangus dan harap gunakan metode pembayaran yang baru.
  </p>
)

const DialogChangePackageContent = ({
  providerName,
}: {
  providerName: string
}) => (
  <p className="text-m-regular text-neutral-500">
    Kamu belum dapat memilih penawaran dari {providerName}, karena paket yang
    kamu ajukan tidak tersedia. Harap mengubah paket terlebih dahulu
  </p>
)

const DialogHeader = ({ title }: { title: string }) => (
  <div className="flex flex-row items-center gap-6 max-lg:p-4">
    <div className="bg-warning-100 flex rounded-lg p-2.5 max-lg:hidden">
      <MessageQuestionIcon size={36} />
    </div>
    <p className="heading-3-semibold max-lg:text-[14px] max-lg:leading-5 max-lg:font-semibold">
      {title}
    </p>
  </div>
)

// --- Component Utama ---
interface DetailTransactionBankingActionsProps {
  cta: ViewCta
  booking_id: number
  application: SubmissionCreditApplication[]
  submissionId: number
  submission: SubmissionCredit
}

export function DetailTransactionBankingActions({
  cta,
  booking_id,
  application,
  submissionId,
  submission,
}: DetailTransactionBankingActionsProps) {
  const { lg: isMobileScreen } = useTailwindBreakpoint()
  const [open, setOpen] = useState(false)
  const config = cta ? CTA_STATIC_CONFIG[cta] : null

  // --- Data Fetching ---
  const { data: orderPayment, isLoading: isOrderPaymentLoading } =
    useGetOrderPayment(String(booking_id), {
      revalidateOnFocus: false,
      isPaused: () => cta !== 'waiting-payment',
    })

  // --- Change Package Status Handlers ---
  const allProviderIds = useMemo(
    () => application.map((app) => app.provider_id).join(','),
    [application]
  )
  const targetHref = useMemo(() => {
    if (!config?.href) return ''
    return (
      config.href({
        providerId: allProviderIds,
        bookingId: String(booking_id),
      }) || ''
    )
  }, [config, allProviderIds, booking_id])

  // --- Payment Handlers ---
  const { handlePayment, isLoading, changePayment } = useBankingPaymentHandler({
    cta,
    submissionId,
    bookingId: booking_id,
    orderPayment,
    isOrderPaymentLoading,
  })

  // --- Custom Hooks ---
  const { handleChangePackage } = useChangePackage(submission, targetHref)

  // --- Render Logic ---
  const renderBantuanButton = () => (
    <NextLink
      href={`https://wa.me/${CALL_CENTER}?text=Assalamualaikum,+maaf+saya+ingin+bertanya`}
      className="text-s-medium w-full max-lg:hidden"
    >
      <Button
        variant="outline"
        size="sm"
        className="border-primary-500 w-full border-2"
      >
        Bantuan
      </Button>
    </NextLink>
  )
  // Logic Utama Render CTA
  const renderPrimaryCta = () => {
    if (!config || !cta) return null
    // A. Jika Tipe Link (Tanpa Dialog) (View Transaction)
    // Logic: Punya requiresDialog = false
    if (targetHref && !config.requiresDialog) {
      return (
        <NextLink
          href={targetHref}
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button size="sm" className="w-full max-lg:p-3">
            {config.text}
          </Button>
        </NextLink>
      )
    }

    // B. Jika Tipe Dialog (Checkout / Waiting Payment / Change Package)
    // Logic: Punya requiresDialog = true
    const isCheckout = cta === 'ready-to-checkout'
    const isWaitingPayment = cta === 'waiting-payment'
    const isChangePackage = cta === 'change-package'

    // Tentukan konten dialog secara dinamis
    let dialogTitle = ''
    let DialogBody = null
    let onConfirm = () => {}
    let confirmText = ''
    const providerName = submission.applications[0].provider.name

    if (isCheckout) {
      dialogTitle = `Apakah Kamu Ingin Memilih Tawaran ${providerName}?`
      DialogBody = <DialogCheckoutContent submission={submission} />
      onConfirm = () => handlePayment()
      confirmText = 'Ya, Pilih'
    } else if (isWaitingPayment) {
      dialogTitle = 'Apakah Kamu ingin Mengubah Metode Pembayaran?'
      DialogBody = <DialogPaymentChangeContent />
      onConfirm = () => changePayment()
      confirmText = 'Ya, Ubah'
    } else if (isChangePackage) {
      dialogTitle = 'Kuota Paket Tidak Tersedia'
      DialogBody = <DialogChangePackageContent providerName={providerName} />
      onConfirm = handleChangePackage
      confirmText = 'Ubah Paket'
    }

    const loadingText = isOrderPaymentLoading
      ? 'Memuat data...'
      : 'Memproses...'

    return (
      <>
        <LayoutDrawerDialog
          isOpen={open}
          setIsOpen={setOpen}
          title={<DialogHeader title={dialogTitle} />}
          content={DialogBody}
          trigger={
            // Trigger Button Logic
            isWaitingPayment ? (
              <Button
                variant="outline"
                size="sm"
                className="border-error-500 w-full border-2 max-lg:p-3"
                disabled={isLoading}
              >
                <p className="text-error-500">{config.secondText}</p>
              </Button>
            ) : (
              <Button
                size="sm"
                className="w-full max-lg:p-3"
                disabled={isLoading}
              >
                {config.text}
              </Button>
            )
          }
          footerContent={
            <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
              <Button
                onClick={() => setOpen(false)}
                size="sm"
                variant="outline"
                className="border-primary-500 w-full border-2 max-lg:p-3"
              >
                Kembali
              </Button>
              <Button
                size="sm"
                className="w-full max-lg:p-3"
                onClick={onConfirm}
              >
                {isLoading ? loadingText : confirmText}
              </Button>
            </div>
          }
        />

        {/* Tombol Tambahan Khusus Waiting Payment (Lanjutkan Pembayaran) */}
        {isWaitingPayment && (
          <Button
            size="sm"
            className="w-full  max-lg:p-3"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? loadingText : config.text}
          </Button>
        )}
      </>
    )
  }

  const primaryCta = renderPrimaryCta()
  const bantuanCta = renderBantuanButton()

  if (isMobileScreen && !primaryCta) return null

  return (
    <div className="z-10 flex w-full flex-col items-center gap-3 bg-white max-lg:fixed max-lg:right-0 max-lg:bottom-0 max-lg:left-0 max-lg:w-auto max-lg:flex-row max-lg:gap-2.5 max-lg:p-3 max-lg:shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      {primaryCta}
      {bantuanCta}
    </div>
  )
}
