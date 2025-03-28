'use client'

import WhatsappIcon from '@/components/icons/whatsapp'
import { Button } from '@/components/ui/button'
import { PackageVariant } from '@/constant/types/PackageProps'
import { OrganizationInstance } from '@/constant/types/TravelProps'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import { formatPhoneNumber, isEmpty } from '@/lib/utils'
import Link from 'next/link'
import { useEffect } from 'react'

interface ActionCheckoutProps {
  variants: PackageVariant[]
  title: string
  organization?: OrganizationInstance
}

export default function ActionCheckoutMobile({
  variants,
  title,
  organization,
}: ActionCheckoutProps) {
  const { shareViaWhatsApp } = useGallerySharing()
  const { isLoading, selectedVariant, setVariants, selectedRoomType } =
    usePackageVariant()

  // Initialize variants in context when component mounts
  useEffect(() => {
    if (variants?.length > 0) {
      setVariants(variants)
    }
  }, [variants, setVariants])

  const phoneNumberUsed = organization?.directContact
    ? formatPhoneNumber(organization?.phoneNumber)
    : formatPhoneNumber(
        organization?.bdm?.persona?.phoneNumber ?? '628888755101'
      )

  // Create a richer message when variant is selected
  const handleWhatsAppShare = () => {
    // Include selected package variant information in the message if available
    const variantInfo = selectedVariant
      ? `\nVarian: ${selectedVariant.name || `Varian ${selectedVariant.id}`}`
      : ''

    shareViaWhatsApp(`${title}${variantInfo}`, phoneNumberUsed)
  }

  // Show skeleton loader when loading
  if (isLoading) {
    return (
      <div className="bg-neutral-0 fixed bottom-0 z-10 flex w-full items-center gap-1.5 border-t border-neutral-100 px-4 py-3 shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.15)] lg:hidden">
        <div className="h-12 w-12 animate-pulse rounded-full bg-neutral-200"></div>
        <div className="h-10 flex-1 animate-pulse rounded-full bg-neutral-200"></div>
        <div className="h-10 flex-1 animate-pulse rounded-full bg-neutral-200"></div>
      </div>
    )
  }

  return (
    <div
      className={`bg-neutral-0 fixed bottom-0 z-10 flex w-full items-center gap-1.5 border-t border-neutral-100 px-4 py-3 shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.15)] lg:hidden ${dissolve}`}
    >
      {variants.length > 0 ? (
        <>
          <div
            onClick={handleWhatsAppShare}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <WhatsappIcon size={48} />
          </div>
          <Link href={`/banking/credit`} className="w-full">
            <Button
              variant="outline"
              className="border-primary-500 w-full rounded-full"
              size="md"
              id="btn-pay-later-mobile"
            >
              <p className="text-xs-semibold">Bayar Nanti</p>
            </Button>
          </Link>
          <Link
            href={`https://dev.v1.moslem101.com/checkout?packageId=${selectedVariant?.id}&roomType=${selectedRoomType}`}
            className="w-full"
          >
            <Button
              variant="default"
              className="w-full rounded-full"
              size="md"
              id="btn-checkout-mobile"
              disabled={isEmpty(selectedRoomType)}
            >
              <p className="text-xs-semibold">Checkout Sekarang</p>
            </Button>
          </Link>
        </>
      ) : (
        <Button
          className="w-full rounded-full py-3"
          variant="outline"
          disabled
          size="lg"
        >
          Kursi tidak tersedia
        </Button>
      )}
    </div>
  )
}
