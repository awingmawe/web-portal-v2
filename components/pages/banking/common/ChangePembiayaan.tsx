import FinancingSimulation from '@/components/pages/banking/common/TenorCalculation'
import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import TravelDates from '@/components/pages/detail-package/2-PackageVariant/component/TravelDates'
import BadgePromo from '@/components/shared/Badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/sonner'
import { LOCAL_STORAGE_PEMBIAYAAN, PACKAGE_TYPE } from '@/constant/env'
import { Facility } from '@/constant/types/FacilityProps'
import { PackageVariant } from '@/constant/types/PackageProps'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { usePembiayaanPackageEventData } from '@/hooks/pembiayaan/usePembiayaanEventData'
import { dissolve } from '@/lib/animation-setup'
import { mapSelectedPackagePembiayaan } from '@/lib/data-formatter'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { useGetPackageVariantList } from '@/services/hooks/umrah-service/package-variant-api'
import Image from 'next/image'
import { Fragment, useEffect } from 'react'

interface ChangePembiayaanContentProps {
  dataTenor: Facility[]
  dataPembiayaan?: PembiayaanDataLocalStorage | null
  setOpen: (open: boolean) => void
}

const ChangePembiayaanContent = ({
  dataTenor,
  dataPembiayaan,
  setOpen,
}: ChangePembiayaanContentProps) => {
  const { pushEvent } = useEventTracker()
  const packageEventData = usePembiayaanPackageEventData()
  const {
    getPrice,
    setSelectedVariantId,
    setSelectedVariant,
    setSelectedRoomType,
    selectedVariantId,
    selectedVariant,
    selectedRoomType,
    isEmptyRoomType,
    handleBadgePromo,
    numberOfDays,
    formattedArrival,
    formattedDeparture,
    getTotalQty,
  } = usePackageVariant()
  const { data: variants, isLoading } = useGetPackageVariantList(
    {
      packageId: dataPembiayaan?.selectedPackage?.packageId,
      page: 1,
      size: 50,
      orderBy: 'createdAt',
      order: 'asc',
    },
    {
      isPaused: () => !dataPembiayaan?.selectedPackage?.packageId,
      revalidateIfStale: false,
    }
  )

  // Hanya untuk set default value berdasarkan localStorage dataPembiayaan
  useEffect(() => {
    if (!variants || isLoading) return

    if (
      !selectedVariantId &&
      dataPembiayaan?.selectedPackage?.packageVariantId
    ) {
      const dataVariant = variants.find(
        (variant: PackageVariant) =>
          variant.id === dataPembiayaan.selectedPackage.packageVariantId
      )

      if (dataVariant) {
        setSelectedVariantId(dataVariant.id)
        setSelectedVariant(dataVariant)
        setSelectedRoomType(dataPembiayaan.selectedRoomType)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants, isLoading])

  // Untuk merubah rubah variants saat selectedVariantId berubah
  useEffect(() => {
    if (!selectedVariantId || !variants) return

    const dataVariant = variants.find(
      (variant: PackageVariant) => variant.id === selectedVariantId
    )

    if (dataVariant) {
      if (!selectedVariant || selectedVariant.id !== dataVariant.id) {
        console.log('Selected variant changed:', dataVariant)
        setSelectedVariant(dataVariant)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariantId, variants])

  const handleNextPembiayaan = () => {
    // make sure selectedVariant exist
    if (!selectedVariant) {
      toast.error('No variant selected')
      return
    }

    // Track room type change event
    const oldRoomType = dataPembiayaan?.selectedRoomType
    const newRoomType = selectedRoomType

    pushEvent({
      name: 'click_change_room_type_banking_credit',
      category: 'banking-credit',
      topic: 'umrah',
      data: {
        ...packageEventData,
        oldRoomType: oldRoomType,
        newRoomType: newRoomType,
      },
    })

    const mappedPackage = mapSelectedPackagePembiayaan(selectedVariant)

    const pembiayaanData = {
      selectedPackage: mappedPackage,
      selectedRoomType: selectedRoomType,
      totalQty: getTotalQty(),
      price: getPrice(),
      tenor: dataPembiayaan?.tenor,
    } as PembiayaanDataLocalStorage

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

    setOpen(false)
  }
  return (
    <div className="grid grid-cols-12 gap-4">
      {selectedVariant && (
        <Fragment>
          <div className="col-span-6 flex flex-col gap-4 max-lg:col-span-12">
            {/* Image and Name Package */}
            <div className="flex items-center gap-3">
              <Image
                src={
                  dataPembiayaan?.selectedPackage?.packageThumbnail ||
                  Placeholder
                }
                alt={dataPembiayaan?.selectedPackage?.packageName || ''}
                width={80}
                height={80}
                className="aspect-square rounded-xl"
              />
              <p className="text-s-medium text-neutral-900">
                {dataPembiayaan?.selectedPackage?.packageName}
              </p>
            </div>

            {/* Variants Section */}
            <p className="text-s-medium lg:hidden">Varian: </p>
            <div
              className={`no-scrollbar flex flex-nowrap items-center gap-4 overflow-x-auto ${variants?.some((e) => e.discountAmount != '0') ? 'px-2' : ''}`}
            >
              {variants?.map((variant) => (
                <div
                  key={variant.id}
                  id={`variant-btn-${variant.id}`}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`${dissolve} ${variants.some((e) => e.discountAmount != '0') ? 'mt-5.5' : ''} hover:bg-primary-100 relative min-w-[90px] shrink-0 cursor-pointer rounded-lg p-2.5 ${
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
                        className="text-s-semibold! -top-[25px] left-0"
                        title={`Diskon ${handleBadgePromo(variant.discountType, variant.discountAmount, 'IDR')}`}
                      />
                    )}
                </div>
              ))}
            </div>

            <TravelDates
              variants={variants || []}
              selectedVariant={selectedVariant}
              packageType={PACKAGE_TYPE.UMRAH}
              formattedDeparture={formattedDeparture}
              formattedArrival={formattedArrival}
              numberOfDays={numberOfDays}
              variantType={PACKAGE_TYPE.UMRAH}
              waitingPeriod={selectedVariant?.waitingPeriod}
              context="drawer"
            />

            {/* Room Type Selection */}
            <SelectHotel
              isMobile
              currency={'IDR'}
              packageType={PACKAGE_TYPE.UMRAH}
              hideTotalPrice
              defaultValue={dataPembiayaan?.selectedRoomType}
              defaultPackageVariant={selectedVariant}
              defaultPackageVariantId={
                dataPembiayaan?.selectedPackage.packageVariantId
              }
              className="max-xl:flex-row max-lg:flex-col"
            />
          </div>

          <div className="col-span-6 max-lg:col-span-12 max-lg:mb-17.5">
            <FinancingSimulation dataTenor={dataTenor} price={getPrice()} />
          </div>

          {/* Checkout Buttons */}
          <div
            className={`z-10 col-span-12 ml-auto items-center border-none px-4 py-3 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:bg-white max-lg:px-4 ${dissolve}`}
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
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export { ChangePembiayaanContent }
