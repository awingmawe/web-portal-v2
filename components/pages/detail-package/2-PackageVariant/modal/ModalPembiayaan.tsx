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
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`!max-w-3/4 rounded-[20px] px-8 py-4 ${
          hideCloseButton ? '[&>button]:hidden' : ''
        }`}
      >
        <DialogTitle className="text-m-semibold">
          Kalkulasi Pembiayaan
        </DialogTitle>
        <ContentPembiayaan
          title={title}
          packageType={packageType}
          variants={variants}
          currency={currency}
          image={image}
          variantType={variantType}
          dataTenor={dataTenor}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ModalPembiayaan
