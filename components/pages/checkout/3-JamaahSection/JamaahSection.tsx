'use client'

import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import { LINKAJA_MAX_LIMIT } from '@/constant/env'
import { DetailVariant, SelectedVariant } from '@/constant/types/CheckoutProps'
import { getLinkAjaTiering } from '@/constant/types/LinkAja'
import { RoomType } from '@/contexts/package-variant-context'
import Image from 'next/image'

interface JamaahSectionProps {
  detailVariant: DetailVariant
  selectedVariant: SelectedVariant
  totalQty: number
  prebookingLoading: boolean
  isLinkAja: boolean
  sliderValue: number
  setSelectedRoomType: (roomType: RoomType) => void
  setShouldRunCheckPre: (should: boolean) => void
  setPaymentAmount: (amount: number) => void
  setRawInputValue: (value: string) => void
  paymentAmount: number
  isMobile: boolean
}

const JamaahSection = ({
  detailVariant,
  selectedVariant,
  totalQty,
  prebookingLoading,
  isLinkAja,
  sliderValue,
  setSelectedRoomType,
  setShouldRunCheckPre,
  setPaymentAmount,
  setRawInputValue,
  paymentAmount,
  isMobile,
}: JamaahSectionProps) => {
  return (
    <div className="rounded-[20px] border border-neutral-100 max-lg:mx-4 max-lg:p-3">
      <div className="mb-4 flex items-center justify-between border-b border-neutral-100 p-4 max-lg:hidden">
        <div className="flex items-center gap-[12px]">
          <Image src="/images/people.svg" width={24} height={24} alt="people" />
          <p className="text-l-semibold">Jumlah Jemaah Per Kamar</p>
        </div>
      </div>

      <div className="lg:px-4 lg:pb-4">
        <SelectHotel
          variant={isMobile ? 'normal' : 'checkout'}
          currency={detailVariant?.package.currency}
          packageType={detailVariant?.package.packageType}
          totalQty={totalQty}
          isMobile
          defaultValue={{
            double: selectedVariant?.roomType?.double ?? 0,
            triple: selectedVariant?.roomType?.triple ?? 0,
            quad: selectedVariant?.roomType?.quad ?? 0,
          }}
          defaultPackageVariant={selectedVariant.variant}
          defaultPackageVariantId={selectedVariant.variantId}
          disabled={prebookingLoading}
          totalManifest={detailVariant?.totalManifest}
          disabledAddOnly={
            isLinkAja
              ? sliderValue >=
                  LINKAJA_MAX_LIMIT -
                    getLinkAjaTiering(
                      selectedVariant.netAmount * (totalQty + 1)
                    ) ||
                selectedVariant.netAmount * (totalQty + 1) >
                  LINKAJA_MAX_LIMIT -
                    getLinkAjaTiering(
                      selectedVariant.netAmount * (totalQty + 1)
                    )
              : false
          }
          onChange={(roomType) => {
            setSelectedRoomType(roomType)
            setShouldRunCheckPre(true)
            setPaymentAmount(selectedVariant.netAmount)
            setRawInputValue(String(paymentAmount * totalQty))
          }}
        />
      </div>
    </div>
  )
}

export default JamaahSection
