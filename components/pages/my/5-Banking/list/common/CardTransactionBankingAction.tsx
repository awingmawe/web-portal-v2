import NextLink from 'next/link'
import { useEffect, useMemo, useState } from 'react'

// Components & Icons
import { Calendar3 } from '@/components/icons/calendar'
import { MessageQuestionIcon } from '@/components/icons/message-question'
import TableComparasion from '@/components/pages/my/5-Banking/detail/common/TableComparasion'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

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
import { useGetSubmissionById } from '@/services/hooks/banking-service/submission-credits-api'

interface CardTransactionBankingActionsProps {
  cta: ViewCta
  booking_id: number
  submission: SubmissionCredit
  submissionId: number
  createdAtWithHours: string
}

const DialogCheckoutContent = ({
  submission,
  isLoading,
}: {
  submission: SubmissionCredit
  isLoading?: boolean
}) => {
  if (isLoading)
    return (
      <div className="flex h-20 items-center justify-center">
        <div className="border-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent" />
      </div>
    )

  const app = submission?.applications[0]
  // If app is null or undefined, it means the submission data is not fully loaded or there's an issue.
  // In this case, we might want to return a placeholder or handle it gracefully.
  const requestLoan = submission?.requested_loan

  if (!submission || !app || !requestLoan) {
    return (
      <p className="text-m-regular text-neutral-500">
        Gagal memuat rincian pembiayaan. Silakan coba lagi.
      </p>
    )
  }

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
        pengajuanJumlah={formatCurrency(submission?.total_price || 0)}
        diterimaJumlah={formatCurrency(app?.approved_total_price) || '0'}
        pengajuanTenor={formatTenor(submission?.tenor) || '0'}
        diterimaTenor={formatTenor(app?.approved_tenor) || '0'}
        pengajuanAngsuran={formatCurrency(requestLoan?.monthly_payment || 0)}
        diterimaAngsuran={formatCurrency(app?.coverage_amount || 0)}
      />
    </div>
  )
}

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

export function CardTransactionBankingActions({
  cta,
  booking_id,
  submission,
  submissionId,
  createdAtWithHours,
}: CardTransactionBankingActionsProps) {
  const { lg: isMobileScreen } = useTailwindBreakpoint()
  const [open, setOpen] = useState(false)

  const {
    data: dataDetail,
    isLoading: isDataDetailLoading,
    refresh: refreshSubmissionDetail,
  } = useGetSubmissionById(submissionId, {
    revalidateOnFocus: false, // Prevent refetching on window focus
    revalidateIfStale: false,
    isPaused: () => !open,
  })

  useEffect(() => {
    if (open) {
      // Ketika dialog terbuka (open: true) dan hook di-unpause,
      // kita panggil `refreshSubmissionDetail` secara eksplisit.
      // Ini memastikan network request DILAKUKAN, meskipun SWR mengira
      // data di cache masih "fresh".
      refreshSubmissionDetail()
    } // refreshSubmissionDetail berasal dari SWR/useGetSubmissionById,
    // yang seharusnya stabil, tetapi disertakan sebagai dependency
    // untuk kepatuhan eslint/hooks.
  }, [open, refreshSubmissionDetail])

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

  // --- On Click Handler ---
  const handleCheckout = () => {
    setOpen(false)
    handlePayment()
  }

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
    const isCheckout = cta === 'ready-to-checkout'
    const isChangePackage = cta === 'change-package'

    if (isCheckout) {
      const providerName = submission.applications[0].provider.name
      const dialogTitle = `Apakah Kamu Ingin Memilih Tawaran ${providerName}?`
      const confirmText = 'Ya, Pilih'
      const loadingText = 'Memproses...'

      return (
        <LayoutDrawerDialog
          isOpen={open}
          setIsOpen={setOpen}
          title={<DialogHeader title={dialogTitle} />}
          content={
            <DialogCheckoutContent
              submission={dataDetail as SubmissionCredit}
              isLoading={isDataDetailLoading}
            />
          }
          trigger={
            <Button
              className="w-full p-3 text-nowrap max-lg:py-2"
              disabled={isLoading}
            >
              {config.text}
            </Button>
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
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? loadingText : confirmText}
              </Button>
            </div>
          }
        />
      )
    }

    if (isChangePackage) {
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
