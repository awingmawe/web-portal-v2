import FinancingSimulation from '@/components/pages/banking/common/TenorCalculation'
import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import TravelDates from '@/components/pages/detail-package/2-PackageVariant/component/TravelDates'
import BadgePromo from '@/components/shared/Badge'
import { Button } from '@/components/ui/button'
import { LOCAL_STORAGE_PEMBIAYAAN, PACKAGE_TYPE } from '@/constant/env'
import { Facility } from '@/constant/types/FacilityProps'
import { PackageVariant } from '@/constant/types/PackageProps'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { dissolve } from '@/lib/animation-setup'
import { mapSelectedPackagePembiayaan } from '@/lib/data-formatter'
import Placeholder from '@/public/images/no-image-placeholder.png'
import Image from 'next/image'
import { Fragment } from 'react'

interface ContentPembiayaanProps {
  title: string
  variants: PackageVariant[]
  image?: string
  currency: string
  packageType: string
  variantType: string
  dataTenor: Facility[]
}

const ContentPembiayaan = ({
  image,
  title,
  packageType,
  variants,
  currency,
  variantType,
  dataTenor,
}: ContentPembiayaanProps) => {
  const {
    getPrice,
    selectedVariant,
    setSelectedVariantId,
    selectedVariantId,
    selectedRoomType,
    isEmptyRoomType,
    handleBadgePromo,
    numberOfDays,
    formattedArrival,
    formattedDeparture,
    getTotalQty,
  } = usePackageVariant()

  const variantName =
    selectedVariant?.name ||
    (selectedVariant ? `Varian ${selectedVariant.id}` : '')

  const handleNextPembiayaan = () => {
    // make sure selectedVariant exist
    if (!selectedVariant) {
      console.error('No variant selected')
      return
    }

    const mappedPackage = mapSelectedPackagePembiayaan(selectedVariant)

    const pembiayaanData = {
      selectedPackage: mappedPackage,
      selectedRoomType: selectedRoomType,
      totalQty: getTotalQty(),
      price: getPrice(),
    }

    if (localStorageUtils.has(LOCAL_STORAGE_PEMBIAYAAN)) {
      localStorageUtils.updateJSON(LOCAL_STORAGE_PEMBIAYAAN, (prev) => {
        if (prev && typeof prev === 'object') {
          return {
            ...prev,
            ...pembiayaanData,
          }
        }
        return pembiayaanData
      })
    } else {
      localStorageUtils.setJSON(LOCAL_STORAGE_PEMBIAYAAN, pembiayaanData)
    }

    // Navigate to next page
    window.location.href = '/banking/credit' // Uncomment when ready
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {selectedVariant && (
        <Fragment>
          <div className="col-span-6 flex flex-col gap-4 max-lg:col-span-12">
            {/* Image and Name Package */}
            <div className="flex items-center gap-3">
              <Image
                src={image || Placeholder}
                alt={variantName}
                width={80}
                height={80}
                className="aspect-square rounded-xl"
              />
              <p className="text-s-medium text-neutral-900">{title}</p>
            </div>

            {/* Variants Section */}
            <p className="text-s-medium lg:hidden">Varian: </p>
            {packageType === PACKAGE_TYPE.UMRAH && (
              <div
                className={`no-scrollbar flex flex-nowrap items-center gap-4 overflow-x-auto ${variants.some((e) => e.discountAmount != '0') ? 'px-2' : ''}`}
              >
                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    id={`variant-btn-${variant.id}`}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`${dissolve} ${variants.some((e) => e.discountAmount != '0') ? 'mt-5.5' : ''} hover:bg-primary-100 relative min-w-[90px] flex-shrink-0 cursor-pointer rounded-lg p-2.5 ${
                      selectedVariantId === variant.id
                        ? 'border-primary-500 bg-primary-100 border-2'
                        : 'border-2 border-neutral-200 bg-transparent'
                    }`}
                  >
                    <p className="text-m-regular text-neutral-900">
                      {variant.name || `Varian ${variant.id}`}
                    </p>
                    {variant.discountAmount &&
                      Number(variant.discountAmount) > 0 && (
                        <BadgePromo
                          className="!text-s-semibold -top-[25px] left-0"
                          title={`Diskon ${handleBadgePromo(variant.discountType, variant.discountAmount, currency)}`}
                        />
                      )}
                  </div>
                ))}
              </div>
            )}

            <TravelDates
              variants={variants}
              selectedVariant={selectedVariant}
              packageType={packageType}
              formattedDeparture={formattedDeparture}
              formattedArrival={formattedArrival}
              numberOfDays={numberOfDays}
              variantType={variantType}
              waitingPeriod={selectedVariant?.waitingPeriod}
              context="drawer"
            />

            {/* Room Type Selection */}
            <SelectHotel
              isMobile
              currency={currency}
              packageType={packageType}
              hideTotalPrice
              className="max-xl:flex-row max-lg:flex-col"
            />
          </div>

          <div className="col-span-6 max-lg:col-span-12 max-lg:mb-15">
            <FinancingSimulation dataTenor={dataTenor} price={getPrice()} />
          </div>

          {/* Checkout Buttons */}
          <div
            className={`bg-neutral-0 z-10 col-span-12 ml-auto items-center px-4 py-3 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:px-4 ${dissolve}`}
          >
            <div className="flex gap-1.5">
              <Button
                className="w-full px-10 py-3"
                variant="default"
                disabled={
                  isEmptyRoomType &&
                  Object.values(selectedRoomType || {}).every(
                    (value) => value === 0
                  )
                }
                onClick={handleNextPembiayaan}
              >
                Lanjutkan Pengajuan Pembiayaan
              </Button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export { ContentPembiayaan }
