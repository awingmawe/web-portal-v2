/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ArrowIcon, ArrowLongIcon } from '@/components/icons/arrow'
import { BedIcon } from '@/components/icons/bed'
import { WarningIconInfo } from '@/components/icons/info'
import WhatsappIcon from '@/components/icons/whatsapp'
import CheckQuotaModal from '@/components/pages/detail-package/2-PackageVariant/modal/modalCek'
import ModalSuccess from '@/components/pages/detail-package/2-PackageVariant/modal/modalSukses'
import ModalWaitingHasil from '@/components/pages/detail-package/2-PackageVariant/modal/modalTungguHasil'
import CheckoutDrawerMobile from '@/components/pages/detail-package/mobile/DrawerCheckout'
import BadgePromo from '@/components/shared/Badge'
import BookingReleasedInfo from '@/components/shared/BookingReleasedInfo'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/sonner'
import { ACCOUNT_URL, URL } from '@/constant/env'
import { Package, PackageVariant } from '@/constant/types/PackageProps'
import { OrganizationInstance } from '@/constant/types/TravelProps'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import {
  formatCurrency,
  formatPhoneNumber,
  getHotelRating,
  getTripDuration,
  isEmpty,
} from '@/lib/utils'
import {
  checkAvailibility,
  getStatusLiked,
  getStatusStock,
  toggleLike,
} from '@/services/umrah-service'
import { PopoverClose } from '@radix-ui/react-popover'
import { differenceInDays } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDownIcon, Heart } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useEffect, useMemo, useState } from 'react'

interface PackageVariantComponentProps {
  variants: PackageVariant[]
  titlePackage: string
  organization?: OrganizationInstance
  package: Package
  token?: string
  packageVariantId: number
}

const PackageVariantComponent: React.FC<PackageVariantComponentProps> = ({
  variants = [],
  organization,
  titlePackage,
  package: pkg,
  token,
  packageVariantId,
}) => {
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
    setSelectedRoomType,
    getPrice,
    getOriginalPrice,
    hasDiscount,
    handleBadgePromo,
    formattedArrival,
    formattedDeparture,
    numberOfDays,
  } = usePackageVariant()
  const router = useRouter()
  const path = usePathname()
  const { lg } = useTailwindBreakpoint()
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false)
  const [isQuotaModalSuccess, setIsQuotaModalSuccess] = useState(false)
  const [isQuotaModalWating, setIsQuotaModalWaiting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [statusStock, setStatusStock] = useState<boolean>(false)
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
    }
  }, [isLiked, token])

  const handleToggleLike = async () => {
    if (!token) {
      window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
      return
    }

    if (isLoading) return

    try {
      await toggleLike(pkg.id)

      setIsLiked(!isLiked)
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

      // Default to quad room type if none selected
      if (!selectedRoomType) {
        setSelectedRoomType('quad')
      }

      // Turn off loading after a short delay to allow for smoother transitions
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [variants, selectedVariant, selectedVariantId, selectedRoomType])

  // Set into first variant when first load
  useEffect(() => {
    if (variants.length > 0) {
      const variant = variants.find((v) => v.id === packageVariantId)

      setSelectedVariant(variant || variants[0])
      setSelectedVariantId(packageVariantId)

      // Turn off loading after a short delay to allow for smoother transitions
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [variants])

  const phoneNumberUsed = organization?.directContact
    ? formatPhoneNumber(organization?.phoneNumber)
    : formatPhoneNumber(
        organization?.bdm?.persona?.phoneNumber ?? '628888755101'
      )

  // Check room type availability based on price
  const availableRoomTypes = useMemo(() => {
    if (!selectedVariant) return { double: false, triple: false, quad: false }

    return {
      double:
        selectedVariant.priceDouble !== null && selectedVariant.priceDouble > 0,
      triple:
        selectedVariant.priceTriple !== null && selectedVariant.priceTriple > 0,
      quad: selectedVariant.priceQuad !== null && selectedVariant.priceQuad > 0,
    }
  }, [selectedVariant])

  // Get room type label with availability status
  const getRoomTypeLabel = () => {
    if (!selectedRoomType) return 'Pilih kamar hotel'

    switch (selectedRoomType) {
      case 'double':
        return 'Double (1 Kamar berdua)'
      case 'triple':
        return 'Triple (1 Kamar bertiga)'
      case 'quad':
        return 'Quad (1 Kamar berempat)'
      default:
        return 'Pilih kamar hotel'
    }
  }

  // Check if any room type is available
  const hasAvailableRoomTypes = useMemo(() => {
    return Object.values(availableRoomTypes).some((available) => available)
  }, [availableRoomTypes])

  // Set initial room type if current selection is not available
  useEffect(() => {
    if (selectedVariant && selectedRoomType) {
      // If the current room type is not available, clear the selection
      if (!availableRoomTypes[selectedRoomType]) {
        setSelectedRoomType(null)
      }
    }
  }, [
    selectedVariant,
    selectedRoomType,
    availableRoomTypes,
    setSelectedRoomType,
  ])

  // When all version 2 muslim101 released, remove this
  const handleLocalStorage = () => {
    if (!token) {
      window.location.href =
        `${ACCOUNT_URL}/auth/login?redirectUri=${`${URL}/${path}`} ` ||
        `https://dev.account.moslem101.com/auth/login?redirectUri=${`${URL}/${path}`}`
      return
    }
    localStorage.setItem('detailVariant', JSON.stringify(selectedVariant))
    localStorage.setItem(
      'selectedVariant',
      JSON.stringify({
        netAmount: selectedVariant?.package?.dpAmount,
        packageId: selectedVariant?.packageId,
        price: getPrice(),
        roomType: selectedRoomType,
        variantId: selectedVariant?.id,
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

  const handleQuotaCheck = async (quotaAmount: string) => {
    // Handle the quota check logic here
    try {
      const payload = {
        idVariant: selectedVariant?.id,
        value: quotaAmount,
      }
      await checkAvailibility(payload)

      setIsQuotaModalOpen(false)
      setIsQuotaModalSuccess(true)
    } catch (error) {
      console.log(error)
    }
    // You might want to call an API or update state here
  }
  const isNullOrEmpty = (value: any): boolean => {
    if (value == null) {
      // Checks for null or undefined
      return true
    }

    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length === 0 // Checks for empty string or array
    }

    if (typeof value === 'object') {
      return Object.keys(value).length === 0 // Checks for empty object
    }

    return false // For other types like numbers, booleans, etc.
  }
  const statusStockVariable = async () => {
    if (!isNullOrEmpty(selectedVariant) && token) {
      const status = await getStatusStock(selectedVariant?.id, token)
      setStatusStock(status.status)
    }
  }

  useEffect(() => {
    if (token) {
      statusStockVariable()
    }
  }, [selectedVariant?.id])
  // Show s loader when loading
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
          <div className="no-scrollbar mt-7.5 flex flex-wrap items-center gap-4 gap-y-6 max-lg:-mx-2 max-lg:-mt-1 max-lg:h-[100px] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:px-2 max-lg:pb-2">
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
                    onClick={() => setSelectedVariantId(variant.id)}
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
                          title={`Diskon ${handleBadgePromo(variant.discountType, variant.discountAmount)}`}
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
                        className="!text-s-semibold -top-[20px]"
                        title={`Diskon ${handleBadgePromo(variant.discountType, variant.discountAmount)}`}
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
      {variants.length > 0 && selectedVariant && (
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
            <div className="text-s-medium text-neutral-500">Tanggal Pulang</div>
            <span className="text-m-regular text-neutral-900">
              {formattedArrival}
            </span>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="h-[1px] w-full bg-[#D2D2D1] max-lg:hidden" />

      {/* Hotel selection with Popover */}
      {variants.length > 0 && (
        <div className="max-lg:hidden">
          <div className="text-s-regular mb-1 text-neutral-800">
            Kamar Hotel
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="flex w-full cursor-pointer items-center justify-between rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-left"
                disabled={!hasAvailableRoomTypes}
              >
                <div className="flex items-center gap-1">
                  <BedIcon />
                  <span
                    className={`text-m-regular ${!selectedRoomType ? 'text-neutral-300' : 'text-neutral-900'}`}
                  >
                    {getRoomTypeLabel()}
                  </span>
                </div>
                <ChevronDownIcon size={18} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[300px] p-0"
              align="start"
              sideOffset={4}
            >
              <PopoverClose className="w-full">
                <div
                  className={`flex w-full items-center gap-2 border-b border-neutral-100 px-3 py-2.5 ${
                    availableRoomTypes.double
                      ? 'cursor-pointer hover:bg-neutral-50'
                      : 'cursor-not-allowed bg-neutral-50 opacity-50'
                  }`}
                  onClick={() =>
                    availableRoomTypes.double && setSelectedRoomType('double')
                  }
                >
                  <span className="text-m-regular">
                    Double (1 Kamar berdua)
                  </span>
                  {!availableRoomTypes.double && (
                    <span className="text-s-regular text-error-500 ml-auto">
                      Tidak tersedia
                    </span>
                  )}
                  {selectedRoomType === 'double' &&
                    availableRoomTypes.double && (
                      <svg
                        className="text-primary-500 ml-auto h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                </div>
              </PopoverClose>
              <PopoverClose className="w-full">
                <div
                  className={`flex items-center gap-2 border-b border-neutral-100 px-3 py-2.5 ${
                    availableRoomTypes.triple
                      ? 'cursor-pointer hover:bg-neutral-50'
                      : 'cursor-not-allowed bg-neutral-50 opacity-50'
                  }`}
                  onClick={() =>
                    availableRoomTypes.triple && setSelectedRoomType('triple')
                  }
                >
                  <span className="text-m-regular">
                    Triple (1 Kamar bertiga)
                  </span>
                  {!availableRoomTypes.triple && (
                    <span className="text-s-regular text-error-500 ml-auto">
                      Tidak tersedia
                    </span>
                  )}
                  {selectedRoomType === 'triple' &&
                    availableRoomTypes.triple && (
                      <svg
                        className="text-primary-500 ml-auto h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                </div>
              </PopoverClose>
              <PopoverClose className="w-full">
                <div
                  className={`flex items-center gap-2 border-b border-neutral-100 px-3 py-2.5 ${
                    availableRoomTypes.quad
                      ? 'cursor-pointer hover:bg-neutral-50'
                      : 'cursor-not-allowed bg-neutral-50 opacity-50'
                  }`}
                  onClick={() =>
                    availableRoomTypes.quad && setSelectedRoomType('quad')
                  }
                >
                  <span className="text-m-regular">
                    Quad (1 Kamar berempat)
                  </span>
                  {!availableRoomTypes.quad && (
                    <span className="text-s-regular text-error-500 ml-auto">
                      Tidak tersedia
                    </span>
                  )}
                  {selectedRoomType === 'quad' && availableRoomTypes.quad && (
                    <svg
                      className="text-primary-500 ml-auto h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </PopoverClose>
              {!hasAvailableRoomTypes && (
                <div className="bg-error-100 text-error-700 text-s-regular p-3">
                  Mohon maaf, semua tipe kamar untuk varian ini sudah habis
                  terjual.
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Total price */}
      <div className="flex items-center justify-between max-lg:hidden">
        <div className="text-m-regular text-neutral-500">Total Harga</div>
        <div className="flex items-center">
          {hasDiscount() && (
            <span className="text-s-regular mr-2 text-neutral-500 line-through">
              {formatCurrency(getOriginalPrice())}
            </span>
          )}
          <span className="heading-4-bold text-neutral-900">
            {isEmpty(getPrice()) ? '-' : formatCurrency(getPrice())}
          </span>
        </div>
      </div>

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
            disabled={!selectedVariant}
            // When all version 2 muslim101 released, remove this
            onClick={handleLocalStorage}
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

          <Button
            className="w-full rounded-full py-2 lg:hidden"
            variant="outline"
            size="lg"
            id="btn-check-quota"
            onClick={() => {
              if (token) {
                if (statusStock === false) {
                  setIsQuotaModalOpen(true)
                } else {
                  setIsQuotaModalWaiting(true)
                }
              } else {
                window.location.href =
                  `${ACCOUNT_URL}/auth/login?redirectUri=${`${URL}/${path}`} ` ||
                  `https://dev.account.moslem101.com/auth/login?redirectUri=${`${URL}/${path}`}`
              }
            }}
          >
            Cek Kuota
            <ArrowIcon size={12} className="-rotate-45" />
          </Button>
        </div>
      ) : (
        <Button
          className="w-full rounded-full py-3 max-lg:hidden"
          variant="outline"
          disabled
          size="lg"
        >
          Kursi tidak tersedia
        </Button>
      )}

      {/* Bottom actions */}
      {variants.length > 0 && (
        <div className="flex items-center justify-between max-lg:hidden">
          <div
            className="flex cursor-pointer items-center gap-1 transition-colors"
            onClick={() => handleToggleLike()}
          >
            <span
              className={`text-s-medium ${isLiked ? 'text-error-500' : 'text-neutral-500'}`}
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
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Heart
                  size={16}
                  className={
                    isLiked
                      ? 'fill-error-500 text-error-500'
                      : 'text-neutral-500'
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="h-[15px] w-px bg-neutral-200" />
          <div
            onClick={() => {
              handlePushEvent('click_consultation', false)
              shareViaWhatsApp(titlePackage, phoneNumberUsed)
            }}
            className="hover:text-primary-500 flex items-center gap-1 text-sm font-medium text-neutral-900 transition-colors"
          >
            <span className="text-s-medium">Konsultasi</span>
            <WhatsappIcon size={16} />
          </div>
          <div className="h-[15px] w-px bg-neutral-200" />
          <div
            className="flex cursor-pointer items-center gap-1 text-neutral-200 transition-colors"
            onClick={() => {
              if (token) {
                if (statusStock === false) {
                  setIsQuotaModalOpen(true)
                } else {
                  setIsQuotaModalWaiting(true)
                }
              } else {
                window.location.href =
                  `${ACCOUNT_URL}/auth/login?redirectUri=${`${URL}/${path}`} ` ||
                  `https://dev.account.moslem101.com/auth/login?redirectUri=${`${URL}/${path}`}`
              }
            }}
          >
            <span className="text-s-medium">Cek Kuota</span>
            <ArrowIcon size={16} className="-rotate-45" />
          </div>
        </div>
      )}
      <CheckQuotaModal
        open={isQuotaModalOpen}
        onOpenChange={setIsQuotaModalOpen}
        onSubmit={handleQuotaCheck}
      />
      <ModalSuccess
        open={isQuotaModalSuccess}
        onOpenChange={setIsQuotaModalSuccess}
        statusStockVariable={statusStockVariable}
        // onSubmit={handleQuotaCheck}
      />
      <ModalWaitingHasil
        open={isQuotaModalWating}
        onOpenChange={setIsQuotaModalWaiting}
        // onSubmit={handleQuotaCheck}
      />
    </div>
  )
}

export default PackageVariantComponent
