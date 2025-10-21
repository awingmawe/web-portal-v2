'use client'

import WhatsappIcon from '@/components/icons/whatsapp'
import CheckoutDrawerMobile from '@/components/pages/detail-package/mobile/DrawerCheckout'
import PembiayaanDrawerMobile from '@/components/pages/detail-package/mobile/DrawerPembiayaan'
import { Button } from '@/components/ui/button'
import { CALL_CENTER, PACKAGE_TYPE } from '@/constant/env'
import { Facility } from '@/constant/types/FacilityProps'
import { PackageVariant } from '@/constant/types/PackageProps'
import { OrganizationInstance } from '@/constant/types/TravelProps'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import { Fragment, useEffect, useMemo } from 'react'

interface ActionCheckoutProps {
  variants: PackageVariant[]
  title: string
  organization?: OrganizationInstance
  thumbnail?: string
  token: string
  packageType: string
  currency: string
  variantType: string
  dataTenor: Facility[]
}

export default function ActionCheckoutMobile({
  variants,
  title,
  packageType,
  variantType,
  // organization,
  thumbnail,
  token,
  currency,
  dataTenor,
}: ActionCheckoutProps) {
  const { shareViaWhatsApp } = useGallerySharing()
  const { isLoading, selectedVariant, setVariants, availableRoomTypes } =
    usePackageVariant()

  // Initialize variants in context when component mounts
  useEffect(() => {
    if (variants?.length > 0) {
      setVariants(variants)
    }
  }, [variants, setVariants])

  const phoneNumberUsed = CALL_CENTER

  const hasAvailableRoomTypes = useMemo(() => {
    return Object.values(availableRoomTypes).some((available) => available)
  }, [availableRoomTypes])

  // const phoneNumberUsed = organization?.directContact
  //   ? formatPhoneNumber(organization?.phoneNumber)
  //   : formatPhoneNumber(
  //       organization?.bdm?.persona?.phoneNumber ?? 'CALL_CENTER'
  //     )

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
      className={`bg-neutral-0 fixed bottom-0 z-10 flex w-full items-center gap-1.5 border-t border-neutral-100 px-1 py-3 shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.15)] lg:hidden ${dissolve}`}
    >
      {variants.length > 0 ? (
        <Fragment>
          <div
            onClick={handleWhatsAppShare}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <WhatsappIcon size={48} />
          </div>
          {packageType === PACKAGE_TYPE.UMRAH && (
            <PembiayaanDrawerMobile
              title={title}
              packageType={packageType}
              variants={variants}
              currency={currency}
              image={thumbnail}
              variantType={variantType}
              dataTenor={dataTenor}
            >
              <Button
                variant="outline"
                className="border-primary-500 w-full rounded-full"
                size="md"
                id="btn-pay-later-mobile"
              >
                <p className="text-xs-semibold">Ajukan Pembiayaan</p>
              </Button>
            </PembiayaanDrawerMobile>
          )}
          <CheckoutDrawerMobile
            title={title}
            packageType={packageType}
            variants={variants}
            currency={currency}
            image={thumbnail}
            token={token}
            variantType={variantType}
          >
            <Button
              variant="default"
              className="w-full rounded-full"
              size="md"
              id="btn-checkout-mobile"
              disabled={!hasAvailableRoomTypes}
            >
              <p className="text-xs-semibold">Checkout Sekarang</p>
            </Button>
          </CheckoutDrawerMobile>
        </Fragment>
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
