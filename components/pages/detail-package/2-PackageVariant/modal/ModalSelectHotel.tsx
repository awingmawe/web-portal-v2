'use client'

import { Warning2Icon } from '@/components/icons/warning'
import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LINKAJA_MAX_LIMIT } from '@/constant/env'
import { getLinkAjaTiering } from '@/constant/types/LinkAja'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useState } from 'react'

interface ModalSelectHotelProps {
  open: boolean
  currency: string
  packageType: string
  onOpenChange: (open: boolean) => void
  onSubmit?: (quotaAmount: string) => void
}

const ModalSelectHotel = ({
  open,
  currency,
  packageType,
  onOpenChange,
  onSubmit,
}: ModalSelectHotelProps) => {
  const isLinkAja = sessionStorage.getItem('isLinkAja') === 'true'

  const [quotaAmount, setQuotaAmount] = useState('')

  const { selectedVariant, getTotalQty } = usePackageVariant()

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(quotaAmount)
      setQuotaAmount('')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full rounded-2xl border-0 p-6">
        <DialogHeader className="pb-0">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-amber-50 p-3">
              <Warning2Icon className="text-primary-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-neutral-900">
                Kamar Belum Dipilih!
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <p className="text-m-regular text-neutral-500">
            Harap memilih jumlah kamar jemaah terlebih dahulu untuk bisa
            melakukan checkout.
          </p>

          <SelectHotel
            currency={currency}
            packageType={packageType}
            disabledAddOnly={
              isLinkAja
                ? Number(selectedVariant?.package.dpAmount) *
                    (getTotalQty() + 1) >=
                  LINKAJA_MAX_LIMIT -
                    getLinkAjaTiering(
                      Number(selectedVariant?.package.dpAmount) *
                        (getTotalQty() + 1)
                    )
                : false
            }
          />

          <div className="flex items-end justify-end gap-3">
            <Button
              variant="outline"
              className="border-primary-500 border-2 px-15 py-2.5"
              onClick={() => onOpenChange(false)}
            >
              Tutup
            </Button>
            <Button className="px-5 py-3" onClick={handleSubmit}>
              Checkout Sekarang
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalSelectHotel
