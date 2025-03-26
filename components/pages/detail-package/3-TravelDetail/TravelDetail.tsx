'use client'

import WhatsappIcon from '@/components/icons/whatsapp'
import { Button } from '@/components/ui/button'
import { OrganizationInstance } from '@/constant/types/TravelProps'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import {
  capitalizeText,
  formatJoinedDate,
  formatPhoneNumber,
} from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import Image from 'next/image'

const TravelDetail = ({
  organizationInstance,
  title,
  mobile = false,
}: {
  organizationInstance: OrganizationInstance
  title: string
  mobile?: boolean
}) => {
  const { shareViaWhatsApp } = useGallerySharing()

  const {
    thumbnail,
    city,
    name,
    legalInformation: { ppiu },
    createdAt,
    directContact,
    phoneNumber,
    bdm,
  } = organizationInstance

  const phoneNumberUsed = directContact
    ? formatPhoneNumber(phoneNumber)
    : formatPhoneNumber(bdm?.persona?.phoneNumber ?? '628888755101')

  return (
    <div
      className={`items-center justify-between border-b border-neutral-200 pb-4 ${mobile ? 'hidden max-lg:flex' : 'flex max-lg:hidden'}`}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-neutral-200 p-[15px] max-lg:p-[7px]">
          <Image
            src={thumbnail ?? Placeholder?.src}
            alt="User avatar"
            width={0}
            height={0}
            sizes="100vw"
            className="aspect-square h-15 w-15 object-contain max-lg:h-[27px] max-lg:w-[27px]"
          />
        </div>
        <div className="flex flex-col">
          <p className="heading-4-medium text-neutral-900 max-lg:text-xs max-lg:leading-4 max-lg:font-semibold">
            {name}
          </p>
          <p className="text-m-regular text-neutral-500 max-lg:text-[10px] max-lg:leading-3.5">
            {capitalizeText(city?.name)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 max-lg:hidden">
        <p className="text-s-medium text-neutral-500">No. PPIU</p>
        <p className="heading-4-medium text-neutral-900">{ppiu}</p>
      </div>
      <p className="text-m-regular w-1/4 text-neutral-500 max-lg:hidden ">
        {formatJoinedDate(createdAt)}
      </p>
      <Button
        className="!hidden gap-2 px-2 max-lg:!flex"
        size="xs"
        variant="success"
        onClick={() => shareViaWhatsApp(title, phoneNumberUsed)}
      >
        <WhatsappIcon size={16} color="white" />
        <p className="text-xs-regular text-white">Konsultasi</p>
      </Button>
    </div>
  )
}

export default TravelDetail
