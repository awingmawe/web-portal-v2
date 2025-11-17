import { ContentPembiayaan } from '@/components/pages/detail-package/2-PackageVariant/component/ContentPembiayaan'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Facility } from '@/constant/types/FacilityProps'
import { PackageVariant } from '@/constant/types/PackageProps'
import { X } from 'lucide-react'
import React from 'react'

const PembiayaanDrawerMobile = React.memo(
  ({
    children,
    title,
    image,
    variants,
    currency,
    packageType,
    variantType,
    dataTenor,
    isPembiayaan,
  }: {
    children: React.ReactNode
    title: string
    variants: PackageVariant[]
    image?: string
    currency: string
    packageType: string
    variantType: string
    dataTenor: Facility[]
    isPembiayaan?: 'change_package' | 'pembiayaan'
  }) => {
    return (
      <Drawer>
        <DrawerTrigger className="w-fit" asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="scrollbar-hide gap-3 overflow-y-scroll">
            <DrawerTitle className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <p className="text-m-semibold text-neutral-900">
                  Kalkulasi Pembiayaan
                </p>
              </div>
              <DrawerClose>
                <X className="text-neutral-900" />
              </DrawerClose>
            </DrawerTitle>
            <ContentPembiayaan
              title={title}
              packageType={packageType}
              variants={variants}
              currency={currency}
              image={image}
              variantType={variantType}
              dataTenor={dataTenor}
              isPembiayaan={isPembiayaan}
            />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
  }
)

PembiayaanDrawerMobile.displayName = 'PembiayaanDrawerMobile'

export default PembiayaanDrawerMobile
