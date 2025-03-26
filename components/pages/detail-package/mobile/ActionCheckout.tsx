'use client'

import WhatsappIcon from '@/components/icons/whatsapp'
import { Button } from '@/components/ui/button'
import { PackageVariant } from '@/constant/types/PackageProps'
import { OrganizationInstance } from '@/constant/types/TravelProps'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { formatPhoneNumber } from '@/lib/utils'
import { Fragment } from 'react'

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
  const phoneNumberUsed = organization?.directContact
    ? formatPhoneNumber(organization?.phoneNumber)
    : formatPhoneNumber(
        organization?.bdm?.persona?.phoneNumber ?? '628888755101'
      )
  return (
    <div className="bg-neutral-0 fixed bottom-0 z-10 flex w-full items-center gap-1.5 border-t-neutral-100 px-4 py-3 shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.15)] lg:hidden">
      {variants.length > 0 ? (
        <Fragment>
          <div onClick={() => shareViaWhatsApp(title, phoneNumberUsed)}>
            <WhatsappIcon size={48} />
          </div>
          <Button
            variant="outline"
            className="border-primary-500 w-full rounded-full"
            size="md"
          >
            <p className="text-xs-semibold">Bayar Nanti</p>
          </Button>
          <Button variant="default" className="w-full rounded-full" size="md">
            <p className="text-xs-semibold">Checkout Sekarang!</p>
          </Button>
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
