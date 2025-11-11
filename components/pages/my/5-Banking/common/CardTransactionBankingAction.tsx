import { Calendar3 } from '@/components/icons/calendar'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import NextLink from 'next/link'

type ViewCta = SubmissionCredit['view_cta']

interface CardTransactionBankingActionsProps {
  cta: ViewCta
  submissionId: number
  packageId: string
  organizationSlug: string
  createdAtWithHours: string
}

export function CardTransactionBankingActions({
  cta,
  submissionId,
  packageId,
  organizationSlug,
  createdAtWithHours,
}: CardTransactionBankingActionsProps) {
  const { lg: isMobile } = useTailwindBreakpoint()
  const renderDetailButton = () => (
    <Button variant="outline" className="border-none p-3 max-lg:hidden">
      <NextLink href={`/my/banking/${submissionId}`} className="text-s-medium">
        Lihat Detail Pesanan
      </NextLink>
    </Button>
  )

  const renderPrimaryCta = () => {
    switch (cta) {
      case 'ready-to-checkout':
        return (
          <Button className="p-3 max-lg:w-full max-lg:py-2">
            <NextLink
              href={`/checkout?submission_id=${submissionId}&type=banking`}
            >
              Pilih & Checkout
            </NextLink>
          </Button>
        )

      case 'change-package':
        return (
          <Button className="p-3 max-lg:w-full max-lg:py-2">
            <NextLink
              href={`/umrah/${organizationSlug}/${packageId}?change_submission=${submissionId}`}
            >
              Ubah Paket
            </NextLink>
          </Button>
        )

      case 'waiting-payment':
        return (
          <Button className="p-3 max-lg:w-full max-lg:py-2">
            <NextLink
              href={`/umrah/${organizationSlug}/${packageId}?change_submission=${submissionId}`}
            >
              Lanjutkan Pembayaran
            </NextLink>
          </Button>
        )
      // Button Lihat Transaksi cuman ada di mobile di desktop tidak ada
      case 'view-transaction':
        return (
          <Button className="p-3 max-lg:w-full max-lg:py-2 lg:hidden">
            <NextLink
              href={`/umrah/${organizationSlug}/${packageId}?change_submission=${submissionId}`}
            >
              Lihat Transaksi
            </NextLink>
          </Button>
        )
      case null:
      default:
        return null
    }
  }

  const primaryCta = renderPrimaryCta()

  // Kalo di mobile jangan munculin footernya kalo button yang harusnya muncul tidak ada
  if (isMobile && !primaryCta) return null

  return (
    <CardFooter className="flex-col items-start gap-4 border-t-1 border-neutral-200 px-4 py-3 max-lg:py-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2 max-lg:hidden">
        <p className="text-s-regular text-neutral-500">Dibuat pada</p>
        <Calendar3 size={20} className="text-neutral-500" />
        <p className="text-m-regular text-neutral-500">{createdAtWithHours}</p>
      </div>
      {/* Action Buttons Container */}
      <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:flex-row">
        {/* Lihat detail akan selalu ada di desktop kalo di mobile tidak ada */}
        {renderDetailButton()}
        {primaryCta}
      </div>
    </CardFooter>
  )
}
