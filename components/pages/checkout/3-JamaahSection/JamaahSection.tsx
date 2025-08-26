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
}: JamaahSectionProps) => {
  return (
    <div className="rounded-[20px] border border-neutral-100">
      <div className="mb-4 flex items-center justify-between border-b border-neutral-100 p-4">
        <div className="flex items-center gap-[12px]">
          <Image src="/images/people.svg" width={24} height={24} alt="people" />
          <span className="font-semibold text-neutral-900">
            Jumlah Jemaah Per Kamar
          </span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <SelectHotel
          variant="checkout"
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
