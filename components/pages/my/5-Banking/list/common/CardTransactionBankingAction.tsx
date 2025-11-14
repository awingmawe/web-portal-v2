import { Calendar3 } from '@/components/icons/calendar'
import { CTA_CONFIG, ViewCta } from '@/components/pages/my/5-Banking/constants'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import NextLink from 'next/link'

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
    if (!cta) return null

    const config = CTA_CONFIG[cta]?.list
    if (!config || config.mobile) return null

    const href = config.href({
      submissionId,
      packageId,
      organizationSlug,
    })

    return (
      <Button className="p-3 max-lg:w-full max-lg:py-2">
        <NextLink href={href}>{config.text}</NextLink>
      </Button>
    )
  }

  const primaryCta = renderPrimaryCta()

  // Kalo di mobile jangan munculin footernya
  // Dan kalo view_cta nya null jangan munculin footernya
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
