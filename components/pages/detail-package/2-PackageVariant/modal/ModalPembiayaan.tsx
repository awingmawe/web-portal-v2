import { InfoIcon } from '@/components/icons/info'
import { ContentPembiayaan } from '@/components/pages/detail-package/2-PackageVariant/component/ContentPembiayaan'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Facility } from '@/constant/types/FacilityProps'
import { PackageVariant } from '@/constant/types/PackageProps'
import React from 'react'

interface LayoutDrawerDialogProps {
  open: boolean
  hideCloseButton?: boolean
  setOpen: (open: boolean) => void
  title: string
  variants: PackageVariant[]
  image?: string
  currency: string
  packageType: string
  variantType: string
  dataTenor: Facility[]
  isPembiayaan?: 'change_package' | 'pembiayaan'
}

const ModalPembiayaan: React.FC<LayoutDrawerDialogProps> = ({
  hideCloseButton = false,
  open,
  setOpen,
  title,
  variants,
  image,
  currency,
  packageType,
  variantType,
  dataTenor,
  isPembiayaan,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`!max-w-3/4 rounded-[20px] p-8 ${
          hideCloseButton ? '[&>button]:hidden' : ''
        }`}
      >
        <DialogTitle className="text-m-semibold flex flex-col gap-4">
          Kalkulasi Pembiayaan
          <div
            className={`text-s-regular bg-primary-100 flex items-center rounded-lg p-1`}
          >
            <InfoIcon
              className="stroke-warning-700 mr-2 flex-none stroke-0"
              size={20}
            />
            <p className="text-warning-700">
              Harga paket dengan metode pembiayaan mengikuti tarif dasar tanpa
              diskon.
            </p>
          </div>
        </DialogTitle>
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
      </DialogContent>
    </Dialog>
  )
}

export default ModalPembiayaan
