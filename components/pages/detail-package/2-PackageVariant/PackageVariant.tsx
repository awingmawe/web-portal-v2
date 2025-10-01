/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import ModalSelectHotel from '@/components/pages/detail-package/2-PackageVariant/modal/ModalSelectHotel'
import BookingReleasedInfo from '@/components/shared/BookingReleasedInfo'
import { toast } from '@/components/ui/sonner'
import {
  ACCOUNT_URL,
  CALL_CENTER,
  LINKAJA_MAX_LIMIT,
  LOCAL_STORAGE_DETAIL_VARIANT,
  LOCAL_STORAGE_KURS_OPEN_IDR,
  LOCAL_STORAGE_KURS_OPEN_USD,
  LOCAL_STORAGE_SELECTED_VARIANT,
  PACKAGE_TYPE,
} from '@/constant/env'
import { getLinkAjaTiering } from '@/constant/types/LinkAja'
import { Package, PackageVariant } from '@/constant/types/PackageProps'
import { OrganizationInstance } from '@/constant/types/TravelProps'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import {
  getHotelRating,
  getTripDuration,
  setLocalReferralCode,
} from '@/lib/utils'
import { getStatusLiked, toggleLike } from '@/services/umrah-service'
import { differenceInDays } from 'date-fns'
import { useEffect, useState } from 'react'

// Import the new components
import ModalKurs from '@/components/pages/detail-package/2-PackageVariant/modal/ModalKurs'
import ActionButtons from './component/ActionButtons'
import BottomActions from './component/BottomActions'
import PackageVariantHeader from './component/PackageVariantHeader'
import PackageVariantLoader from './component/PackageVariantLoader'
import TravelDates from './component/TravelDates'
import VariantSelection from './component/VariantSelection'
import VariantsNotAvailable from './component/VariantsNotAvailable'

interface PackageVariantComponentProps {
  variants: PackageVariant[]
  titlePackage: string
  organization?: OrganizationInstance
  package: Package
  token?: string
  packageVariantId: number
  referralCodeParams?: string
}

const PackageVariantComponent: React.FC<PackageVariantComponentProps> = ({
  variants = [],
  titlePackage,
  package: pkg,
  token,
  packageVariantId,
  referralCodeParams,
}) => {
  const [isLinkAja, setIsLinkAja] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLinkAja(sessionStorage.getItem('isLinkAja') === 'true')
    }
  }, [])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (pkg.currency === 'IDR') {
        setIsChecked(
          localStorage.getItem(LOCAL_STORAGE_KURS_OPEN_IDR) === 'true'
            ? true
            : false
        )
      } else {
        setIsChecked(
          localStorage.getItem(LOCAL_STORAGE_KURS_OPEN_USD) === 'true'
            ? true
            : false
        )
      }
    }
  }, [pkg.currency])

  const { shareViaWhatsApp } = useGallerySharing()
  const { pushEvent } = useEventTracker()
  const {
    selectedVariant,
    selectedVariantId,
    selectedRoomType,
    isLoading,
    setVariants,
    setIsLoading,
    setSelectedVariant,
    setSelectedVariantId,
    getPrice,
    handleBadgePromo,
    formattedArrival,
    formattedDeparture,
    numberOfDays,
    getTotalQty,
    availableRoomTypes,
  } = usePackageVariant()

  const { lg } = useTailwindBreakpoint()
  const [isLiked, setIsLiked] = useState(false)
  const [isSelectHotelModalOpen, setIsSelectHotelModalOpen] = useState(false)
  const [isKursModalOpen, setIsKursModalOpen] = useState(false)

  const statusLike = async () => {
    const statusLike = await getStatusLiked(pkg?.id as number)
    setIsLiked(statusLike.data)
  }

  const onCheckedChange = (checked: boolean) => {
    setIsChecked(checked)
  }

  useEffect(() => {
    if (token) {
      statusLike()
      if (referralCodeParams) {
        setLocalReferralCode(referralCodeParams)
      }
    }
  }, [isLiked, token, referralCodeParams])

  const handleToggleLike = async () => {
    if (!token) {
      window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
      return
    }

    if (isLoading) return

    try {
      await toggleLike(pkg.id)
      setIsLiked(!isLiked)
      if (isLiked) {
        handlePushEvent('add_to_wishlist', false)
      }
    } catch (error: any) {
      setIsLiked(isLiked)
      toast.error(
        error?.message ??
          'Terjadi kesalahan saat like paket. Silakan coba lagi.'
      )
    } finally {
    }
  }

  // Initialize variants in context when component mounts
  useEffect(() => {
    if (variants?.length > 0) {
      setVariants(variants)
    }
  }, [variants, setVariants])

  // Effect to update selected variant when selected variant ID changes
  useEffect(() => {
    if (selectedVariantId && variants.length > 0) {
      const variant = variants.find((v) => v.id === selectedVariantId)
      if (variant) {
        setSelectedVariant(variant)
      }
    }
  }, [selectedVariantId, variants])

  // Effect to automatically select the first variant when variants are loaded
  useEffect(() => {
    if (variants.length > 0 && !selectedVariant && !selectedVariantId) {
      setSelectedVariant(variants[0])
      setSelectedVariantId(variants[0].id)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [variants, selectedVariant, selectedVariantId])

  // Set into first variant when first load
  useEffect(() => {
    if (variants.length > 0) {
      const variant = variants.find((v) => v.id === packageVariantId)
      setSelectedVariant(variant || variants[0])
      setSelectedVariantId(packageVariantId)
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [variants])

  useEffect(() => {
    if (pkg.currency === 'IDR') {
      localStorage.setItem(LOCAL_STORAGE_KURS_OPEN_IDR, isChecked.toString())
    } else {
      localStorage.setItem(LOCAL_STORAGE_KURS_OPEN_USD, isChecked.toString())
    }
  }, [isChecked, pkg.currency])

  const handleSubmit = () => {
    localStorage.setItem(
      LOCAL_STORAGE_DETAIL_VARIANT,
      JSON.stringify(selectedVariant)
    )
    localStorage.setItem(
      LOCAL_STORAGE_SELECTED_VARIANT,
      JSON.stringify({
        netAmount: selectedVariant?.package?.dpAmount,
        packageId: selectedVariant?.packageId,
        price: getPrice(),
        roomType: selectedRoomType,
        variantId: selectedVariant?.id,
        variant: selectedVariant,
        name: selectedVariant?.name,
      })
    )
    handlePushEvent('click_checkout')
    window.location.href = '/checkout' // why using this to prevent caching effect to checkout page
  }

  const handleCheckout = () => {
    if (!token) {
      window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
      return
    }
    if (
      selectedRoomType &&
      Object.keys(selectedRoomType).length > 0 &&
      Object.values(selectedRoomType).every((v) => v === 0)
    ) {
      setIsSelectHotelModalOpen(true)
      return
    } else {
      const isKursOpenIDR =
        localStorage.getItem(LOCAL_STORAGE_KURS_OPEN_IDR) === 'true'
      const isKursOpenUSD =
        localStorage.getItem(LOCAL_STORAGE_KURS_OPEN_USD) === 'true'
      if (
        (pkg.packageType === PACKAGE_TYPE.HAJJ &&
          pkg.currency === 'IDR' &&
          !isKursOpenIDR) ||
        (pkg.currency === 'USD' && !isKursOpenUSD)
      ) {
        setIsKursModalOpen(true)
        setIsSelectHotelModalOpen(false)
      } else {
        handleSubmit()
      }
    }
  }

  function handlePushEvent(name: string, withVariant = true) {
    pushEvent({
      name,
      category: 'detail_package',
      topic: pkg.packageType,
      data: {
        packageId: pkg.id,
        packageType: pkg.packageType,
        title: pkg.title,
        slug: pkg.slug,
        hotelRating: getHotelRating(pkg),
        tripDuration: getTripDuration(pkg),
        travelName: pkg.organizationInstance.name,
        travelCity: pkg.organizationInstance.city.name,
        travelCityId: pkg.organizationInstance.cityId,
        travelProvinceName: pkg.organizationInstance.province.name,
        travelProvinceId: pkg.organizationInstance.provinceId,
        lastCall: selectedVariant?.isLastCall,
        price: getPrice(),
        organizationId: pkg.organizationId,
        organizationInstanceId: pkg.organizationInstanceId,
        ...(withVariant && {
          roomType: selectedRoomType,
          variantId: selectedVariant?.id,
          variantName: selectedVariant?.name,
          departureDate: selectedVariant?.departureDate,
        }),
      },
    })
  }

  const handleConsultation = () => {
    handlePushEvent('click_consultation', true)
    shareViaWhatsApp(titlePackage, CALL_CENTER)
  }

  // Shows loader when loading
  if (isLoading) {
    return <PackageVariantLoader />
  }

  return (
    <div
      className={`flex flex-col gap-3 rounded-[20px] border border-neutral-100 bg-white p-4 max-lg:gap-2 max-lg:rounded-none max-lg:border-x-0 max-lg:border-t-0 max-lg:border-b max-lg:border-b-neutral-200 max-lg:px-0 max-lg:pt-0 max-lg:pb-4 ${dissolve}`}
    >
      {/* Header */}
      <PackageVariantHeader packageType={pkg.packageType} />

      {/* Booking Released Info */}
      {selectedVariant &&
        differenceInDays(selectedVariant?.releasedAt as string, new Date()) <=
          10 && <BookingReleasedInfo variant={selectedVariant} />}

      {/* Variants selection */}
      {pkg.packageType === PACKAGE_TYPE.UMRAH && (
        <VariantSelection
          variants={variants}
          selectedVariantId={selectedVariantId}
          lg={lg}
          pkg={pkg}
          token={token || ''}
          onVariantSelect={setSelectedVariantId}
          handleBadgePromo={handleBadgePromo}
          handlePushEvent={handlePushEvent}
        />
      )}

      {/* Variants not available */}
      {variants.length === 0 && <VariantsNotAvailable />}

      {/* Travel dates */}
      <TravelDates
        variants={variants}
        selectedVariant={selectedVariant}
        packageType={pkg.packageType}
        formattedDeparture={formattedDeparture}
        formattedArrival={formattedArrival}
        numberOfDays={numberOfDays}
        variantType={pkg.variantType}
        waitingPeriod={selectedVariant?.waitingPeriod}
        context="main"
      />

      {/* Divider */}
      <div className="h-[1px] w-full bg-[#c9c9c9] max-lg:hidden" />

      {/* Hotel selection with Popover */}
      {variants.length > 0 && (
        <SelectHotel
          currency={pkg.currency}
          packageType={pkg.packageType}
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
      )}

      {/* Action buttons */}
      <ActionButtons
        variants={variants}
        availableRoomTypes={availableRoomTypes}
        selectedVariant={selectedVariant}
        packageType={pkg.packageType}
        token={token || ''}
        onCheckout={handleCheckout}
        currency={pkg.currency}
        handlePushEvent={handlePushEvent}
      />

      {/* Bottom actions */}
      {/* Like, Whatsapp, and Check Availability */}
      <BottomActions
        variants={variants}
        packageType={pkg.packageType}
        isLiked={isLiked}
        token={token || ''}
        onToggleLike={handleToggleLike}
        onConsultation={handleConsultation}
        handlePushEvent={handlePushEvent}
      />

      {/* Modals for showing notes for kurs in USD and IDR for hajj packages */}
      <ModalKurs
        open={isKursModalOpen}
        setOpen={setIsKursModalOpen}
        onCheckout={handleSubmit}
        checked={isChecked}
        onCheckedChange={onCheckedChange}
        currency={pkg.currency}
      />

      {/* Modal for selecting hotel if none of the rooms are chosen */}
      <ModalSelectHotel
        currency={pkg.currency}
        packageType={pkg.packageType}
        open={isSelectHotelModalOpen}
        onOpenChange={setIsSelectHotelModalOpen}
        onSubmit={handleCheckout}
      />
    </div>
  )
}

export default PackageVariantComponent
