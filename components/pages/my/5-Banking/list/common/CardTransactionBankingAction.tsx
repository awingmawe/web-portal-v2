import NextLink from 'next/link'
import { useMemo } from 'react'

// Components & Icons
import { Calendar3 } from '@/components/icons/calendar'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'

// Hooks & Services
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useChangePackage } from '@/hooks/pembiayaan/useChangePackage'
import { useBankingPaymentHandler } from '@/hooks/pembiayaan/usePaymentBankingCredit'
import { useGetOrderPayment } from '@/services/hooks/umrah-service/booking-api'

// Constants & Types (Import dari file yang sudah dipisah)
import {
  CTA_STATIC_CONFIG,
  ViewCta,
} from '@/components/pages/my/5-Banking/constants'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'

interface CardTransactionBankingActionsProps {
  cta: ViewCta
  booking_id: number
  submission: SubmissionCredit
  submissionId: number
  createdAtWithHours: string
}

export function CardTransactionBankingActions({
  cta,
  booking_id,
  submission,
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
    () => submission.applications.map((app) => app.provider_id).join(','),
    [submission.applications]
  )

  // --- Payment Handler ---
  const { handlePayment, isLoading } = useBankingPaymentHandler({
    cta,
    submissionId,
    bookingId: booking_id, // Fix: prop name di hook biasanya bookingId (camelCase)
    orderPayment,
    isOrderPaymentLoading,
  })

  // --- Change Package Handler ---
  const config = cta ? CTA_STATIC_CONFIG[cta] : null
  const targetHref = useMemo(() => {
    if (!config?.href) return ''
    return (
      config.href({
        providerId: allProviderIds,
        bookingId: String(booking_id),
      }) || ''
    )
  }, [config, allProviderIds, booking_id])

  const { handleChangePackage } = useChangePackage(submission, targetHref)

  // --- Render Helpers ---
  const renderDetailButton = () => (
    <NextLink
      href={`/my/banking/${submissionId}`}
      className="text-s-medium w-full max-lg:hidden"
    >
      <Button variant="outline" className="w-full border-none p-3 text-nowrap">
        Lihat Detail Pesanan
      </Button>
    </NextLink>
  )

  const renderPrimaryCta = () => {
    if (!config || !config.text) return null

    // Jika CTA adalah 'change-package', gunakan dialog
    if (cta === 'change-package') {
      return (
        <Button
          className="w-full p-3 text-nowrap max-lg:py-2"
          onClick={handleChangePackage}
        >
          {config.text}
        </Button>
      )
    }

    if (targetHref) {
      return (
        <NextLink href={targetHref} className="w-full">
          <Button
            className="p-3 text-nowrap max-lg:w-full max-lg:py-2"
            disabled={!targetHref}
          >
            {config.text}
          </Button>
        </NextLink>
      )
    }

    // Jika Action Button (Trigger Payment/Checkout)
    const loadingText =
      cta === 'waiting-payment' && isOrderPaymentLoading
        ? 'Memuat data...'
        : 'Memproses...'

    return (
      <Button
        className="p-3 text-nowrap max-lg:w-full max-lg:py-2"
        onClick={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? loadingText : config.text}
      </Button>
    )
  }

  const primaryCta = renderPrimaryCta()
  const detailCta = renderDetailButton()

  // --- Conditional Rendering ---
  // Jika tampilan mobile (bukan desktop) dan tidak ada tombol primary, sembunyikan footer
  if (isMobileScreen && !primaryCta) return null

  return (
    <CardFooter className="flex-col items-start gap-4 border-t-1 border-neutral-200 px-4 py-3 max-lg:py-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2 max-lg:hidden">
        <p className="text-s-regular text-neutral-500">Dibuat pada</p>
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
