import { ArrowLongIcon } from '@/components/icons/arrow'
import BadgePromo from '@/components/shared/Badge'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ACCOUNT_URL } from '@/constant/env'
import { PackageVariant } from '@/constant/types/PackageProps'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { dissolve } from '@/lib/animation-setup'
import { formatCurrency, isEmpty } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { Fragment, useEffect, useMemo } from 'react'

const CheckoutDrawerMobile = React.memo(
  ({
    children,
    title,
    image,
    variants,
    token,
  }: {
    children: React.ReactNode
    title: string
    variants: PackageVariant[]
    image?: string
    token: string
  }) => {
    const {
      selectedVariant,
      getPrice,
      hasDiscount,
      getOriginalPrice,
      setSelectedVariantId,
      selectedVariantId,
      selectedRoomType,
      setSelectedRoomType,
      handleBadgePromo,
      numberOfDays,
      formattedArrival,
      formattedDeparture,
    } = usePackageVariant()

    const path = usePathname()

    const variantName =
      selectedVariant?.name ||
      (selectedVariant ? `Varian ${selectedVariant.id}` : '')

    // Check room type availability based on price
    const availableRoomTypes = useMemo(() => {
      if (!selectedVariant) return { double: false, triple: false, quad: false }

      return {
        double:
          selectedVariant.priceDouble !== null &&
          selectedVariant.priceDouble > 0,
        triple:
          selectedVariant.priceTriple !== null &&
          selectedVariant.priceTriple > 0,
        quad:
          selectedVariant.priceQuad !== null && selectedVariant.priceQuad > 0,
      }
    }, [selectedVariant])

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

    const handleLocalStorage = () => {
      if (!token && isEmpty(token)) {
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
          name: selectedVariant?.name,
        })
      )
      window.location.href = '/checkout'
    }

    return (
      <Drawer>
        <DrawerTrigger className="w-fit" asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="scrollbar-hide gap-3 overflow-y-scroll">
            <DrawerTitle className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <p className="text-m-semibold text-neutral-900">Checkout</p>
              </div>
              <DrawerClose>
                <X className="text-neutral-900" />
              </DrawerClose>
            </DrawerTitle>
            <div className="flex flex-col gap-3">
              {selectedVariant && (
                <Fragment>
                  <div className="flex items-center gap-3">
                    <Image
                      src={image || Placeholder}
                      alt={variantName}
                      width={80}
                      height={80}
                      className="aspect-square rounded-xl"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-s-semibold text-neutral-900">
                        {title}
                      </p>
                      <span className="text-l-semibold text-neutral-900">
                        {formatCurrency(getPrice())}
                        <span className="text-s-regular text-neutral-500">
                          /orang
                        </span>
                      </span>
                      {hasDiscount() && (
                        <span className="text-s-regular text-neutral-500 line-through">
                          {formatCurrency(getOriginalPrice())}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 max-lg:my-2">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="text-s-medium text-nowrap text-neutral-500">
                        Tanggal Berangkat
                      </div>
                      <span className="text-m-regular text-nowrap text-neutral-900">
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
                      <div className="text-s-medium text-nowrap text-neutral-500">
                        Tanggal Pulang
                      </div>
                      <span className="text-m-regular text-nowrap text-neutral-900">
                        {formattedArrival}
                      </span>
                    </div>
                  </div>
                  <div className="text-s-semibold text-neutral-900">Varian</div>
                  <div className="no-scrollbar flex flex-wrap items-center gap-4 gap-y-6 max-lg:-mx-2 max-lg:-mt-2.5 max-lg:h-[100px] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:px-2 max-lg:pb-2">
                    {variants.map((variant) => (
                      <div
                        key={variant.id}
                        id={`variant-btn-${variant.id}`}
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`${dissolve} hover:bg-primary-100 relative min-w-[90px] cursor-pointer rounded-lg p-2.5 text-nowrap max-lg:flex-shrink-0 ${
                          selectedVariantId === variant.id
                            ? 'border-primary-500 bg-primary-100 border-2'
                            : 'border-2 border-neutral-200 bg-transparent'
                        }`}
                      >
                        <p className="text-m-regular text-center text-neutral-900">
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
                    ))}
                  </div>

                  {/* Room Type Selection */}
                  <div className="-mt-[25px]">
                    <div className="text-s-semibold mb-2 text-neutral-900">
                      Kamar Hotel:
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Double Room Option */}
                      <div
                        className={`flex flex-col justify-center rounded-lg border p-2 ${
                          availableRoomTypes.double
                            ? selectedRoomType === 'double'
                              ? 'border-primary-500 bg-primary-100'
                              : 'border-neutral-200 bg-white'
                            : 'border-neutral-200 bg-neutral-50 opacity-50'
                        } cursor-pointer`}
                        onClick={() =>
                          availableRoomTypes.double &&
                          setSelectedRoomType('double')
                        }
                      >
                        <p className="text-sm font-medium text-neutral-900">
                          Double
                        </p>
                        <p className="text-xs text-neutral-500">Berdua</p>
                      </div>

                      {/* Triple Room Option */}
                      <div
                        className={`flex flex-col justify-center rounded-lg border p-2 ${
                          availableRoomTypes.triple
                            ? selectedRoomType === 'triple'
                              ? 'border-primary-500 bg-primary-100'
                              : 'border-neutral-200 bg-white'
                            : 'border-neutral-200 bg-neutral-50 opacity-50'
                        } cursor-pointer`}
                        onClick={() =>
                          availableRoomTypes.triple &&
                          setSelectedRoomType('triple')
                        }
                      >
                        <p className="text-sm font-medium text-neutral-900">
                          Triple
                        </p>
                        <p className="text-xs text-neutral-500">Bertiga</p>
                      </div>

                      {/* Quad Room Option */}
                      <div
                        className={`flex flex-col justify-center rounded-lg border p-2 ${
                          availableRoomTypes.quad
                            ? selectedRoomType === 'quad'
                              ? 'border-primary-500 bg-primary-100'
                              : 'border-neutral-200 bg-white'
                            : 'border-neutral-200 bg-neutral-50 opacity-50'
                        } cursor-pointer`}
                        onClick={() =>
                          availableRoomTypes.quad && setSelectedRoomType('quad')
                        }
                      >
                        <p className="text-sm font-medium text-neutral-900">
                          Quad
                        </p>
                        <p className="text-xs text-neutral-500">
                          {availableRoomTypes.quad
                            ? 'Berempat'
                            : 'Tidak tersedia'}
                        </p>
                      </div>
                    </div>

                    {!hasAvailableRoomTypes && (
                      <div className="bg-error-100 text-error-700 mt-2 rounded-lg p-3 text-xs">
                        Mohon maaf, semua tipe kamar untuk varian ini sudah
                        habis terjual.
                      </div>
                    )}
                  </div>

                  {/* Checkout Buttons */}
                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      className="w-full py-3"
                      variant="default"
                      disabled={!selectedRoomType || !hasAvailableRoomTypes}
                      onClick={handleLocalStorage}
                    >
                      Checkout Sekarang
                    </Button>
                  </div>
                </Fragment>
              )}
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
  }
)

CheckoutDrawerMobile.displayName = 'CheckoutDrawerMobile'

export default CheckoutDrawerMobile
