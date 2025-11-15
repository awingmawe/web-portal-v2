'use client'

import { MessageQuestionIcon } from '@/components/icons/message-question'
import { CTA_CONFIG, ViewCta } from '@/components/pages/my/5-Banking/constants'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { SubmissionCreditApplication } from '@/constant/types/SubmissionPembiayaan'
import { useBankingPaymentHandler } from '@/hooks/pembiayaan/usePaymentBankingCredit'
import { useGetOrderPayment } from '@/services/hooks/umrah-service/booking-api'
import NextLink from 'next/link'
import { useMemo, useState } from 'react'

interface DetailTransactionBankingActionsProps {
  cta: ViewCta
  booking_id: number
  application: SubmissionCreditApplication[]
  submissionId: number
}

export function DetailTransactionBankingActions({
  cta,
  booking_id,
  application,
  submissionId,
}: DetailTransactionBankingActionsProps) {
  const [open, setOpen] = useState(false)
  // --- Data Fetching ---
  const { data: orderPayment, isLoading: isOrderPaymentLoading } =
    useGetOrderPayment(String(booking_id), {
      revalidateOnFocus: false,
      isPaused: () => cta !== 'waiting-payment',
    })

  // --- Memoized Values ---
  const allProviderIds = useMemo(
    () => application.map((app) => app.provider_id).join(','),
    [application]
  )

  // --- Reusable Payment Logic ---
  const { handlePayment, isLoading, changePayment } = useBankingPaymentHandler({
    cta,
    submissionId,
    bookingId: booking_id,
    orderPayment,
    isOrderPaymentLoading,
  })

  const changePaymentOnClick = () => {
    setOpen(false)
    changePayment()
  }

  // --- Render Functions ---
  const renderBantuanButton = () => (
    <Button
      variant="outline"
      className="border-primary-500 w-full border-2 p-4 max-lg:hidden"
    >
      <NextLink href={`/my/banking/${submissionId}`} className="text-s-medium">
        Bantuan
      </NextLink>
    </Button>
  )
  const renderPrimaryCta = () => {
    if (!cta) return null

    const config = CTA_CONFIG[cta]
    if (!config || !config.text) return null

    const href =
      config?.href?.({
        providerId: allProviderIds,
        bookingId: String(booking_id),
      }) || ''

    // Kasus 1: Tombol untuk memicu pembayaran (Payment/Checkout)
    const isPaymentCta =
      cta === 'ready-to-checkout' || cta === 'waiting-payment'
    if (isPaymentCta) {
      const loadingText =
        cta === 'waiting-payment' && isOrderPaymentLoading
          ? 'Memuat data...' // Feedback spesifik saat SWR loading
          : 'Memproses...'

      if (cta === 'waiting-payment') {
        return (
          <>
            <LayoutDrawerDialog
              isOpen={open}
              setIsOpen={setOpen}
              title={
                <div className="flex flex-row items-center gap-6 max-lg:p-4">
                  <div className="bg-warning-100 flex rounded-lg p-2.5 max-lg:hidden">
                    <MessageQuestionIcon size={36} />
                  </div>
                  <p className="heading-3-semibold max-lg:text-[14px] max-lg:leading-5 max-lg:font-semibold">
                    Apakah Kamu ingin Mengubah Metode Pembayaran?
                  </p>
                </div>
              }
              content={
                <p className="text-m-regular text-neutral-500">
                  Kamu telah memilih metode pembayaran sebelumnya. Setelah
                  diubah, yang lama akan hangus dan harap gunakan metode
                  pembayaran yang baru.
                </p>
              }
              trigger={
                <Button
                  variant="outline"
                  className="border-error-500  w-full border-2 p-4 max-lg:p-3"
                  disabled={isLoading}
                >
                  <p className="text-error-500">
                    {isLoading ? loadingText : config.secondText}
                  </p>
                </Button>
              }
              footerContent={
                <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outline"
                    className="border-primary-500 w-full border-2 p-4 max-lg:p-3"
                  >
                    Kembali
                  </Button>
                  <Button
                    className="w-full p-4 max-lg:p-3"
                    onClick={changePaymentOnClick}
                  >
                    Ya, Ubah
                  </Button>
                </div>
              }
            />
            <Button
              className="w-full p-4 max-lg:p-3"
              onClick={handlePayment}
              disabled={isLoading} // Gunakan state loading yang benar
            >
              {isLoading ? loadingText : config.text}
            </Button>
          </>
        )
      }
      return (
        <Button
          className="w-full p-4 max-lg:p-3"
          onClick={handlePayment}
          disabled={isLoading} // Gunakan state loading yang benar
        >
          {isLoading ? loadingText : config.text}
        </Button>
      )
    }

    // Kasus 2: Tombol sebagai link (misal: Lihat Pembayaran)
    return (
      <NextLink href={href} rel="noopener noreferrer" className="w-full">
        <Button className="w-full p-4 max-lg:p-3" disabled={!href}>
          {config.text}
        </Button>
      </NextLink>
    )
  }

  const primaryCta = renderPrimaryCta()
  const bantuanCta = renderBantuanButton()

  // --- Main Render ---
  return (
    <div className="z-10 flex w-full flex-col items-center gap-3 bg-white max-lg:fixed max-lg:right-0 max-lg:bottom-0 max-lg:left-0 max-lg:w-auto max-lg:flex-row max-lg:gap-2.5 max-lg:p-3 max-lg:shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      {primaryCta}
      {bantuanCta}
    </div>
  )
}
