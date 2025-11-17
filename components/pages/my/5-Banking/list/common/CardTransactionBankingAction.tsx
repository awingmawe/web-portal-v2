import { Calendar3 } from '@/components/icons/calendar'
import { CTA_CONFIG, ViewCta } from '@/components/pages/my/5-Banking/constants'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { SubmissionCreditApplication } from '@/constant/types/SubmissionPembiayaan'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useBankingPaymentHandler } from '@/hooks/pembiayaan/usePaymentBankingCredit'
import { useGetOrderPayment } from '@/services/hooks/umrah-service/booking-api'
import NextLink from 'next/link'
import { useMemo } from 'react'

interface CardTransactionBankingActionsProps {
  cta: ViewCta
  booking_id: number
  application: SubmissionCreditApplication[]
  submissionId: number
  createdAtWithHours: string
}

export function CardTransactionBankingActions({
  cta,
  booking_id,
  application,
  submissionId,
  createdAtWithHours,
}: CardTransactionBankingActionsProps) {
  const { lg: isMobileScreen } = useTailwindBreakpoint()

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
  const { handlePayment, isLoading } = useBankingPaymentHandler({
    cta,
    submissionId,
    orderPayment,
    isOrderPaymentLoading,
  })

  // --- Render Functions ---

  const renderDetailButton = () => (
    <NextLink
      href={`/my/banking/${submissionId}`}
      className="text-s-medium w-full max-lg:hidden"
    >
      <Button
        variant="outline"
        className="w-full border-none p-3 text-nowrap" // Sembunyikan di mobile
      >
        Lihat Detail Pesanan
      </Button>
    </NextLink>
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

      return (
        <Button
          className="p-3 text-nowrap max-lg:w-full max-lg:py-2"
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
        <Button
          className="p-3 text-nowrap max-lg:w-full max-lg:py-2"
          disabled={!href}
        >
          {config.text}
        </Button>
      </NextLink>
    )
  }

  const primaryCta = renderPrimaryCta()
  const detailCta = renderDetailButton()

  // --- Conditional Rendering ---
  if (isMobileScreen && !primaryCta) return null

  // --- Main Render ---
  return (
    <CardFooter className="flex-col items-start gap-4 border-t-1 border-neutral-200 px-4 py-3 max-lg:py-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2 max-lg:hidden">
        <p className="text-s-regular text-neutral-500 ">Dibuat pada</p>
        <Calendar3 size={20} className="text-neutral-500" />
        <p className="text-m-regular text-neutral-500">{createdAtWithHours}</p>
      </div>

      <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:flex-row">
        {detailCta}
        {primaryCta}
      </div>
    </CardFooter>
  )
}
