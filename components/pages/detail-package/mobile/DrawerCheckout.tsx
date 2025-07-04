import { ArrowLongIcon } from '@/components/icons/arrow'
import WhatsappIcon from '@/components/icons/whatsapp'
import CheckAvailibility from '@/components/pages/detail-package/2-PackageVariant/component/CheckAvaibility'
import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
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
import { ACCOUNT_URL, CALL_CENTER, LINKAJA_MAX_LIMIT } from '@/constant/env'
import { PackageVariant } from '@/constant/types/PackageProps'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import { formatCurrency, isEmpty } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'

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
    const isLinkAja = sessionStorage.getItem('isLinkAja') === 'true'
    const { shareViaWhatsApp } = useGallerySharing()
    const {
      selectedVariant,
      getPrice,
      hasDiscount,
      getOriginalPrice,
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

    const handleWhatsAppShare = () => {
      // Include selected package variant information in the message if available
      const variantInfo = selectedVariant
        ? `\nVarian: ${selectedVariant.name || `Varian ${selectedVariant.id}`}`
        : ''

      shareViaWhatsApp(`${title}${variantInfo}`, CALL_CENTER)
    }

    const handleLocalStorage = () => {
      if (!token && isEmpty(token)) {
        window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
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
          variant: selectedVariant,
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
                    </div>
                  </div>
                  <div className="text-s-semibold text-neutral-900">Varian</div>
                  <div className="no-scrollbar flex flex-wrap items-center gap-4 gap-y-6 max-lg:-mx-2 max-lg:-mt-2.5 max-lg:h-[100px] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:px-2">
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
                              className="!text-s-semibold -top-[25px]"
                              title={`Diskon ${handleBadgePromo(variant.discountType, variant.discountAmount)}`}
                            />
                          )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2  max-lg:px-2">
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
                  <CheckAvailibility token={token || ''} />

                  {/* Room Type Selection */}
                  <div className="mb-35">
                    <SelectHotel
                      isMobile
                      disabledAddOnly={
                        isLinkAja
                          ? selectedVariant.package.dpAmount * getTotalQty() >=
                            LINKAJA_MAX_LIMIT
                          : false
                      }
                    />
                  </div>

                  {/* Checkout Buttons */}
                  <div
                    className={`bg-neutral-0 fixed bottom-0 left-0 z-10  w-full items-center px-4 py-3 lg:hidden ${dissolve}`}
                  >
                    <div className="flex items-center justify-between py-3">
                      <div className="text-m-regular text-neutral-500">
                        Total Harga
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-l-semibold text-neutral-900">
                          {isEmpty(getPrice())
                            ? '-'
                            : formatCurrency(getPrice())}
                        </span>
                        {hasDiscount() && getOriginalPrice() > 0 && (
                          <div className="flex items-center">
                            <span className="text-s-regular mr-1 text-neutral-500 line-through">
                              {formatCurrency(getOriginalPrice())}
                            </span>
                            <span className="text-s-regular bg-error-500 rounded-md p-1 text-white">
                              {handleBadgePromo(
                                String(selectedVariant?.discountType),
                                selectedVariant?.discountType === 'percentage'
                                  ? String(selectedVariant?.discountAmount || 0)
                                  : String(
                                      Number(
                                        selectedVariant?.discountAmount || 0
                                      ) * getTotalQty()
                                    )
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <div
                        onClick={handleWhatsAppShare}
                        className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
                      >
                        <WhatsappIcon size={48} />
                      </div>
                      <Link href={`/banking/credit`} className="w-full">
                        <Button
                          variant="outline"
                          className="border-primary-500 w-full rounded-full"
                          size="md"
                          id="btn-pay-later-mobile"
                        >
                          <p className="text-xs-semibold">Bayar Nanti</p>
                        </Button>
                      </Link>
                      <Button
                        className="w-full py-3"
                        variant="default"
                        disabled={isEmptyRoomType}
                        onClick={handleLocalStorage}
                      >
                        Checkout Sekarang
                      </Button>
                    </div>
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
