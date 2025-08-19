/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ArrowLongIcon } from '@/components/icons/arrow'
import { WarningIconInfo } from '@/components/icons/info'
import WhatsappIcon from '@/components/icons/whatsapp'
import CheckAvailibility from '@/components/pages/detail-package/2-PackageVariant/component/CheckAvaibility'
import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import ModalSelectHotel from '@/components/pages/detail-package/2-PackageVariant/modal/ModalSelectHotel'
import CheckoutDrawerMobile from '@/components/pages/detail-package/mobile/DrawerCheckout'
import BadgePromo from '@/components/shared/Badge'
import BookingReleasedInfo from '@/components/shared/BookingReleasedInfo'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/sonner'
import {
  ACCOUNT_URL,
  CALL_CENTER,
  LINKAJA_MAX_LIMIT,
  LOCAL_STORAGE_DETAIL_VARIANT,
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
  isEmpty,
  setLocalReferralCode,
} from '@/lib/utils'
import { getStatusLiked, toggleLike } from '@/services/umrah-service'
import { differenceInDays } from 'date-fns'
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
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
  // organization,
  titlePackage,
  package: pkg,
  token,
  packageVariantId,
  referralCodeParams,
}) => {
  const isLinkAja = sessionStorage.getItem('isLinkAja') === 'true'
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
  } = usePackageVariant()
  const router = useRouter()
  const { lg } = useTailwindBreakpoint()
  const [isLiked, setIsLiked] = useState(false)
  const [isSelectHotelModalOpen, setIsSelectHotelModalOpen] = useState(false)
  // const [likeCount, setLikeCount] = useState<number>(0)
  // const totalLike = async () => {
  //   const totalLike = await getTotalLikedPackage(pkg?.id as number)
  //   setLikeCount(totalLike.count)
  // }

  const statusLike = async () => {
    const statusLike = await getStatusLiked(pkg?.id as number)
    setIsLiked(statusLike.data)
  }

  // useEffect(() => {
  //   totalLike()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLiked])
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

      // Turn off loading after a short delay to allow for smoother transitions
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

      // Turn off loading after a short delay to allow for smoother transitions
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [variants])

  const phoneNumberUsed = CALL_CENTER

  // Uncomment this when need to change again
  // const phoneNumberUsed = organization?.directContact
  //   ? formatPhoneNumber(organization?.phoneNumber)
  //   : formatPhoneNumber(
  //       organization?.bdm?.persona?.phoneNumber ?? 62888855110'
  //     )

  // Check room type availability based on price

  const handleCheckout = () => {
    // !selectedRoomType || Object.keys(selectedRoomType).length === 0
    if (
      selectedRoomType &&
      Object.keys(selectedRoomType).length > 0 &&
      Object.values(selectedRoomType).every((v) => v === 0)
    ) {
      setIsSelectHotelModalOpen(true)
      return
    }
    if (!token) {
      window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
      return
    }
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
    router.push('/checkout')

    handlePushEvent('click_checkout')
  }

  function handlePushEvent(name: string, withVariant = true) {
    pushEvent({
      name,
      category: 'detail_package',
      topic: 'umrah',
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

  // Shows loader when loading
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 rounded-[20px] border border-neutral-100 bg-white p-4 max-lg:gap-2 max-lg:rounded-none max-lg:border-x-0 max-lg:border-t-0 max-lg:border-b max-lg:border-b-neutral-200 max-lg:px-0 max-lg:pt-0 max-lg:pb-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-28 animate-pulse rounded bg-neutral-200 max-lg:hidden"></div>
          <div className="h-5 w-24 animate-pulse rounded bg-neutral-200 lg:hidden"></div>
        </div>
        <div className="max-lg:h-[60px]">
          <div className="mb-2 h-4 w-16 animate-pulse rounded bg-neutral-200 max-lg:hidden"></div>
          <div className="no-scrollbar flex flex-wrap items-center gap-4 gap-y-6 max-lg:-mx-2 max-lg:h-[100px] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:px-2 max-lg:pb-2">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="h-12 w-24 animate-pulse rounded-lg bg-neutral-200 max-lg:flex-shrink-0"
              ></div>
            ))}
          </div>
        </div>
        <div className="h-[1px] w-full bg-neutral-200 max-lg:hidden"></div>
        <div className="flex items-center justify-between max-lg:my-2">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="h-4 w-32 animate-pulse rounded bg-neutral-200"></div>
            <div className="mt-1 h-5 w-24 animate-pulse rounded bg-neutral-200"></div>
          </div>
          <div className="h-6 w-16 animate-pulse rounded bg-neutral-200"></div>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="h-4 w-32 animate-pulse rounded bg-neutral-200"></div>
            <div className="mt-1 h-5 w-24 animate-pulse rounded bg-neutral-200"></div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-neutral-200 max-lg:hidden"></div>
        <div className="h-12 w-full animate-pulse rounded-full bg-neutral-200 max-lg:hidden"></div>
        <div className="flex items-center justify-between max-lg:hidden">
          <div className="h-5 w-24 animate-pulse rounded bg-neutral-200"></div>
          <div className="h-7 w-32 animate-pulse rounded bg-neutral-200"></div>
        </div>
        <div className="h-12 w-full animate-pulse rounded-full bg-neutral-200 max-lg:hidden"></div>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col gap-3 rounded-[20px] border border-neutral-100 bg-white p-4 max-lg:gap-2 max-lg:rounded-none max-lg:border-x-0 max-lg:border-t-0 max-lg:border-b max-lg:border-b-neutral-200 max-lg:px-0 max-lg:pt-0 max-lg:pb-4 ${dissolve}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="heading-4-medium text-neutral-900 max-lg:hidden">
          Cek Harga!
        </p>
        <p className="text-m-semibold mb-2 text-neutral-900 lg:hidden">
          Varian Paket
        </p>
      </div>
      {/* Variants selection */}
      {selectedVariant &&
        differenceInDays(selectedVariant?.releasedAt as string, new Date()) <=
          10 && <BookingReleasedInfo variant={selectedVariant} />}
      {variants.length > 0 && (
        <div className="mb-2 max-lg:h-[60px]">
          <div className="text-s-regular mb-2 text-neutral-800 max-lg:hidden">
            Varian
          </div>
          <div
            className={`no-scrollbar ${variants.some((e) => {
              if (!isEmpty(e.discountAmount)) return 'mt-7.5'
            })} flex flex-wrap items-center gap-4 gap-y-6 max-lg:-mx-2 max-lg:-mt-1 max-lg:h-[100px] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:px-2 max-lg:pb-2`}
          >
            {variants.map((variant) =>
              lg ? (
                <CheckoutDrawerMobile
                  key={variant.id}
                  title={pkg.title}
                  variants={variants}
                  image={pkg.thumbnail}
                  token={token || ''}
                >
                  <div
                    key={variant.id}
                    id={`variant-btn-${variant.id}`}
                    onClick={() => {
                      setSelectedVariantId(variant.id)
                      handlePushEvent('click_package_variant', true)
                    }}
                    className={`${dissolve} hover:bg-primary-100 relative min-w-[90px] cursor-pointer rounded-lg p-2.5 max-lg:flex-shrink-0 ${
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
                          className="!text-s-semibold -top-[24px]"
                          title={`Diskon ${handleBadgePromo(variant.discountType, variant.discountAmount, pkg.currency)}`}
                        />
                      )}
                  </div>
                </CheckoutDrawerMobile>
              ) : (
                <div
                  key={variant.id}
                  id={`variant-btn-${variant.id}`}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`${dissolve} hover:bg-primary-100 relative min-w-[90px] cursor-pointer rounded-lg p-2.5  max-lg:flex-shrink-0 ${
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
                        className="!text-s-semibold -top-[25px]"
                        title={`Diskon ${handleBadgePromo(variant.discountType, variant.discountAmount, pkg.currency)}`}
                      />
                    )}
                </div>
              )
            )}
          </div>
        </div>
      )}
      {/* Variants not available */}
      {variants.length === 0 && (
        <Fragment>
          {/* Divider */}
          <div className="h-[1px] w-full bg-[#D2D2D1] max-lg:hidden" />
          <div className="bg-primary-100 border-primary-500 flex items-center gap-1 rounded-xl border p-2">
            <WarningIconInfo size={20} />
            <p className="text-xs-regular">
              Mohon maaf, kursi untuk paket ini sudah tidak tersedia.
            </p>
          </div>
        </Fragment>
      )}
      {/* Travel dates */}
      {variants.length > 0 &&
        selectedVariant &&
        pkg.packageType === PACKAGE_TYPE.UMRAH && (
          <div className="flex items-center justify-between max-lg:my-2">
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="text-s-medium text-neutral-500">
                Tanggal Berangkat
              </div>
              <span className="text-m-regular text-neutral-900">
                {formattedDeparture}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-s-regular -mb-2 text-neutral-300">
                {numberOfDays} Hari
              </div>
              <ArrowLongIcon />
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="text-s-medium text-neutral-500">
                Tanggal Pulang
              </div>
              <span className="text-m-regular text-neutral-900">
                {formattedArrival}
              </span>
            </div>
          </div>
        )}
      {/* {pkg.packageType === PACKAGE_TYPE.HAJJ && (
        
      )} */}
      {/* Divider */}
      <div className="h-[1px] w-full bg-[#D2D2D1] max-lg:hidden" />
      {/* Hotel selection with Popover */}
      {variants.length > 0 && (
        <SelectHotel
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
      {variants.length > 0 ? (
        <div>
          {/* <Link
            href={`/checkout?packageId=${selectedVariant?.packageId}&roomType=${selectedRoomType}`}
          > */}
          <Button
            className="w-full rounded-full py-3 max-lg:hidden"
            variant="default"
            size="lg"
            id="btn-checkout-desktop"
            // When all version 2 muslim101 released, remove this
            onClick={handleCheckout}
          >
            Checkout Sekarang
          </Button>
          {/* </Link> */}

          <div className="text-s-regular my-1 text-center text-neutral-500 max-lg:hidden">
            atau
          </div>
          <Link
            href={`/banking/credit`}
            onClick={() => handlePushEvent('click_paylater')}
          >
            <Button
              className="border-primary-500 text-primary-500 w-full rounded-full py-3 max-lg:hidden"
              variant="outline"
              size="lg"
              id="btn-pay-later-desktop"
            >
              Pesan Sekarang, Bayar Nanti
            </Button>
          </Link>
          <CheckAvailibility
            token={token || ''}
            handlePushEvent={handlePushEvent}
          />
        </div>
      ) : (
        <div>
          <Button
            className="w-full rounded-full py-3 max-lg:hidden"
            variant="outline"
            disabled
            size="lg"
          >
            Kursi tidak tersedia
          </Button>
          <CheckAvailibility
            token={token || ''}
            handlePushEvent={handlePushEvent}
          />
        </div>
      )}
      {/* Bottom actions */}
      <div className="flex items-center justify-between max-lg:hidden">
        {variants.length > 0 && (
          <>
            <div
              className="flex cursor-pointer items-center gap-1 transition-colors"
              onClick={() => handleToggleLike()}
            >
              <span
                className={`text-s-medium ${isLiked ? 'text-error-500' : 'text-neutral-900'}`}
              >
                {'Wishlist'}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLiked ? 'liked' : 'unliked'}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                >
                  <Heart
                    size={16}
                    className={
                      isLiked
                        ? 'fill-error-500 text-error-500'
                        : 'text-neutral-900'
                    }
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="h-[15px] w-px bg-neutral-200" />
            <div
              onClick={() => {
                handlePushEvent('click_consultation', true)
                shareViaWhatsApp(titlePackage, phoneNumberUsed)
              }}
              className="hover:text-primary-500 flex cursor-pointer items-center gap-1 text-sm font-medium text-neutral-900 transition-colors"
            >
              <span className="text-s-medium">Konsultasi</span>
              <WhatsappIcon size={16} />
            </div>
            <div className="h-[15px] w-px bg-neutral-200" />
          </>
        )}
        <CheckAvailibility
          type="footer"
          token={token || ''}
          handlePushEvent={handlePushEvent}
        />
        <ModalSelectHotel
          open={isSelectHotelModalOpen}
          onOpenChange={setIsSelectHotelModalOpen}
          onSubmit={handleCheckout}
        />
      </div>
    </div>
  )
}

export default PackageVariantComponent
