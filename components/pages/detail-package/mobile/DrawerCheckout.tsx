import { MessageQuestionIcon } from '@/components/icons/message-question'
import WhatsappIcon from '@/components/icons/whatsapp'
import CheckAvailibility from '@/components/pages/detail-package/2-PackageVariant/component/CheckAvaibility'
import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import TravelDates, {
  TEXT_TOOLTIP,
} from '@/components/pages/detail-package/2-PackageVariant/component/TravelDates'
import DrawerKurs from '@/components/pages/detail-package/mobile/DrawerKurs'
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
import { PackageVariant } from '@/constant/types/PackageProps'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import { formatCurrency, isEmpty } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

const CheckoutDrawerMobile = React.memo(
  ({
    children,
    title,
    image,
    variants,
    token,
    currency,
    packageType,
    variantType,
  }: {
    children: React.ReactNode
    title: string
    variants: PackageVariant[]
    image?: string
    token: string
    currency: string
    packageType: string
    variantType: string
  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenKurs, setIsOpenKurs] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [isLinkAja, setIsLinkAja] = useState(false)
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setIsLinkAja(sessionStorage.getItem('isLinkAja') === 'true')
      }
    }, [])
    useEffect(() => {
      if (typeof window !== 'undefined') {
        if (currency === 'IDR') {
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
    }, [currency])

    useEffect(() => {
      if (currency === 'IDR') {
        localStorage.setItem(LOCAL_STORAGE_KURS_OPEN_IDR, isChecked.toString())
      } else {
        localStorage.setItem(LOCAL_STORAGE_KURS_OPEN_USD, isChecked.toString())
      }
    }, [isChecked, currency])

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

    const handleWhatsAppShare = () => {
      // Include selected package variant information in the message if available
      const variantInfo = selectedVariant
        ? `\nVarian: ${selectedVariant.name || `Varian ${selectedVariant.id}`}`
        : ''

      shareViaWhatsApp(`${title}${variantInfo}`, CALL_CENTER)
    }

    const variantName =
      selectedVariant?.name ||
      (selectedVariant ? `Varian ${selectedVariant.id}` : '')

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
      window.location.href = '/checkout' // why using this to prevent caching effect to checkout page
    }

    const handleLocalStorage = () => {
      if (!token && isEmpty(token)) {
        window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
        return
      }
      const isKursOpenIDR =
        localStorage.getItem(LOCAL_STORAGE_KURS_OPEN_IDR) === 'true'
      const isKursOpenUSD =
        localStorage.getItem(LOCAL_STORAGE_KURS_OPEN_USD) === 'true'
      if (
        (packageType === PACKAGE_TYPE.HAJJ &&
          currency === 'IDR' &&
          !isKursOpenIDR) ||
        (currency === 'USD' && !isKursOpenUSD)
      ) {
        setIsOpenKurs(true)
      } else {
        handleSubmit()
      }
    }

    const onCheckedChange = (checked: boolean) => {
      setIsChecked(checked)
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
                  {/* Image and Name Package */}
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

                  {/* Variants Section */}
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

                  {packageType === PACKAGE_TYPE.UMRAH && (
                    <CheckAvailibility token={token || ''} />
                  )}

                  {/* Room Type Selection */}
                  <div className="mb-32.5">
                    <SelectHotel
                      isMobile
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
                  </div>

                  {/* Checkout Buttons */}
                  <div
                    className={`bg-neutral-0 fixed bottom-0 left-0 z-10  w-full items-center px-4 py-3 lg:hidden ${dissolve}`}
                  >
                    <div className="flex items-center justify-between pb-3">
                      <div className="flex items-center gap-1">
                        <div className="text-m-regular text-neutral-500">
                          Total Harga
                        </div>
                        {packageType === PACKAGE_TYPE.HAJJ && (
                          <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                            <TooltipTrigger onClick={() => setIsOpen(true)}>
                              <MessageQuestionIcon size={16} />
                            </TooltipTrigger>
                            <TooltipContent
                              className="z-[9999] max-w-[250px] bg-white p-4"
                              arrowColor="bg-white fill-white"
                            >
                              <div className="flex flex-col gap-2">
                                <p className="text-m-medium text-[#484848]">
                                  Ketentuan Harga
                                </p>
                                <p className="text-s-regular text-[#333]">
                                  {TEXT_TOOLTIP.PRICE}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-l-semibold text-neutral-900">
                          {isEmpty(getPrice())
                            ? '-'
                            : formatCurrency(getPrice(), currency)}
                        </span>
                        {hasDiscount() && getOriginalPrice() > 0 && (
                          <div className="flex items-center">
                            <span className="text-s-regular mr-1 text-neutral-500 line-through">
                              {formatCurrency(getOriginalPrice(), currency)}
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
                      {packageType === PACKAGE_TYPE.UMRAH && (
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
                      )}
                      <Button
                        className="w-full py-3"
                        variant="default"
                        disabled={
                          isEmptyRoomType &&
                          Object.values(selectedRoomType || {}).every(
                            (value) => value === 0
                          )
                        }
                        onClick={handleLocalStorage}
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </DrawerHeader>
        </DrawerContent>
        <DrawerKurs
          open={isOpenKurs}
          setOpen={setIsOpenKurs}
          onCheckout={handleSubmit}
          currency={currency}
          checked={isChecked}
          onCheckedChange={onCheckedChange}
        />
      </Drawer>
    )
  }
)

CheckoutDrawerMobile.displayName = 'CheckoutDrawerMobile'

export default CheckoutDrawerMobile
