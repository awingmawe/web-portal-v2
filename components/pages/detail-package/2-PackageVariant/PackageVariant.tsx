'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PackageVariant } from '@/constant/types/PackageProps'
import { usePricing, useVariantSelection } from '@/hooks/package-variant-hooks'
import { formatDateToRangeString } from '@/lib/utils'
import { ArrowRight, Calendar, Hotel } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

interface PackageVariantComponentProps {
  variants: PackageVariant[]
  initialSelectedVariantId?: number
  titlePackage?: string
  isAddToWishlist?: boolean
  organizationInstanceSlug?: string
  packageSlug?: string
}

const PackageVariantComponent: React.FC<PackageVariantComponentProps> = ({
  variants = [],
  initialSelectedVariantId,
}) => {
  // State to track if initialization has occurred
  const [isInitialized, setIsInitialized] = useState(false)

  // Use package variant hooks
  const { selectedVariant, selectVariantById, selectFirstVariant } =
    useVariantSelection()
  const {
    selectedRoomType,
    setSelectedRoomType,
    currentPrice,
    hasDiscount,
    originalPrice,
  } = usePricing()

  // Format the price for display
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(currentPrice || 0)

  // Format dates when a variant is selected
  const formattedDates = selectedVariant
    ? {
        departureDate: new Date(selectedVariant.departureDate),
        arrivalDate: new Date(selectedVariant.arrivalDate),
      }
    : null

  // Calculate number of days
  const numberOfDays = formattedDates
    ? Math.ceil(
        (formattedDates.arrivalDate.getTime() -
          formattedDates.departureDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    : 0

  // Format dates to strings
  const formattedDeparture = formattedDates
    ? formatDateToRangeString(formattedDates.departureDate)
    : ''

  const formattedArrival = formattedDates
    ? formatDateToRangeString(formattedDates.arrivalDate)
    : ''

  // Change room type handler
  const handleRoomTypeChange = useCallback(
    (roomType: 'quad' | 'triple' | 'double') => {
      setSelectedRoomType(roomType)
    },
    [setSelectedRoomType]
  )

  // Get room type label
  const getRoomTypeLabel = useCallback(() => {
    switch (selectedRoomType) {
      case 'double':
        return 'Kamar Double (2 Orang)'
      case 'triple':
        return 'Kamar Triple (3 Orang)'
      case 'quad':
      default:
        return 'Kamar Quad (4 Orang)'
    }
  }, [selectedRoomType])

  // Handle variant selection with smooth animation
  const handleVariantSelect = useCallback(
    (variantId: number) => {
      console.log('Selecting variant ID:', variantId)

      // Add subtle animation when selecting a variant
      const button = document.getElementById(`variant-btn-${variantId}`)
      if (button) {
        button.classList.add('animate-pulse')
        setTimeout(() => {
          button.classList.remove('animate-pulse')
        }, 300)
      }

      selectVariantById(variantId)
    },
    [selectVariantById]
  )

  // Initialize selected variant
  useEffect(() => {
    // Only run this effect once when variants are available
    if (variants.length > 0 && !isInitialized) {
      console.log('Initializing variant selection')

      if (initialSelectedVariantId) {
        console.log('Using initial variant ID:', initialSelectedVariantId)
        selectVariantById(initialSelectedVariantId)
      } else {
        console.log('Selecting first variant')
        selectFirstVariant()
      }

      setIsInitialized(true)
    }
  }, [
    variants,
    initialSelectedVariantId,
    selectVariantById,
    selectFirstVariant,
    isInitialized,
  ])

  // Make sure a variant is selected after component mount
  useEffect(() => {
    if (!selectedVariant && variants.length > 0 && isInitialized) {
      console.log(
        'No variant selected after initialization, selecting first variant'
      )
      selectFirstVariant()
    }
  }, [selectedVariant, variants, selectFirstVariant, isInitialized])

  // Log selected variant for debugging
  useEffect(() => {
    console.log('Selected variant:', selectedVariant?.id)
  }, [selectedVariant])

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-l-semibold text-neutral-900">Cek Harga!</h2>
        {variants.length > 0 && (
          <div className="text-s-regular text-neutral-500">
            Terjual {variants[0]?.soldCount || 300}
          </div>
        )}
      </div>

      {/* Variants selection */}
      <div className="mb-4">
        <div className="text-s-regular mb-2 text-neutral-700">Varian</div>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              id={`variant-btn-${variant.id}`}
              type="button"
              onClick={() => handleVariantSelect(variant.id)}
              className={`relative rounded-lg border ${
                selectedVariant?.id === variant.id
                  ? 'border-primary-500 bg-primary-100 z-10 scale-105 font-medium shadow-sm'
                  : 'border-neutral-200 bg-white'
              } hover:bg-primary-50 px-2.5 py-1 transition-all duration-200`}
            >
              <>
                {selectedVariant?.id === variant.id && (
                  <div className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center">
                    <span className="bg-primary-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                    <span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full"></span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  {selectedVariant?.id === variant.id && (
                    <svg
                      className="text-primary-500 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  <span
                    className={`text-s-medium ${selectedVariant?.id === variant.id ? 'text-primary-700' : ''}`}
                  >
                    {new Date(variant.departureDate).toLocaleDateString(
                      'id-ID',
                      {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </span>
                </div>
              </>
            </button>
          ))}
        </div>
      </div>

      {/* Travel dates */}
      <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex flex-col">
          <div className="text-s-medium text-neutral-700">
            Tanggal Berangkat
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-neutral-500" />
            <span className="text-m-regular">{formattedDeparture}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-xs text-neutral-500">{numberOfDays} Hari</div>
          <ArrowRight className="h-4 w-4 text-neutral-500" />
        </div>

        <div className="flex flex-col items-end">
          <div className="text-s-medium text-right text-neutral-700">
            Tanggal Pulang
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-neutral-500" />
            <span className="text-m-regular">{formattedArrival}</span>
          </div>
        </div>
      </div>

      {/* Hotel selection with Popover */}
      <div className="mb-4">
        <div className="text-s-medium mb-1 text-neutral-700">Kamar Hotel</div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-left">
              <div className="flex items-center gap-2">
                <Hotel className="h-5 w-5 text-neutral-500" />
                <span className="text-m-regular">{getRoomTypeLabel()}</span>
              </div>
              <svg
                className="h-5 w-5 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[300px] p-0"
            align="start"
            sideOffset={4}
          >
            <div
              className="flex cursor-pointer items-center gap-2 border-b border-neutral-100 px-3 py-2.5 hover:bg-neutral-50"
              onClick={() => handleRoomTypeChange('quad')}
            >
              <Hotel className="h-5 w-5 text-neutral-500" />
              <span className="text-m-regular">Kamar Quad (4 Orang)</span>
              {selectedRoomType === 'quad' && (
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
            <div
              className="flex cursor-pointer items-center gap-2 border-b border-neutral-100 px-3 py-2.5 hover:bg-neutral-50"
              onClick={() => handleRoomTypeChange('triple')}
            >
              <Hotel className="h-5 w-5 text-neutral-500" />
              <span className="text-m-regular">Kamar Triple (3 Orang)</span>
              {selectedRoomType === 'triple' && (
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
            <div
              className="flex cursor-pointer items-center gap-2 px-3 py-2.5 hover:bg-neutral-50"
              onClick={() => handleRoomTypeChange('double')}
            >
              <Hotel className="h-5 w-5 text-neutral-500" />
              <span className="text-m-regular">Kamar Double (2 Orang)</span>
              {selectedRoomType === 'double' && (
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
          </PopoverContent>
        </Popover>
      </div>

      {/* Total price */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-l-medium text-neutral-900">Total Harga</div>
        <div className="flex items-center">
          {hasDiscount && (
            <span className="text-s-regular mr-2 text-neutral-500 line-through">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(originalPrice || 0)}
            </span>
          )}
          <span className="text-l-semibold text-neutral-900">
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        <Button
          className="w-full rounded-full py-3.5"
          variant="default"
          size="lg"
        >
          Checkout Sekarang
        </Button>

        <div className="text-center text-neutral-500">atau</div>

        <Button
          className="border-primary-500 text-primary-500 w-full rounded-full py-3.5"
          variant="outline"
          size="lg"
        >
          Pesan Sekarang, Bayar Nanti
        </Button>
      </div>

      {/* Bottom actions */}
      <div className="mt-4 flex items-center justify-between">
        <button className="flex items-center gap-1.5 text-neutral-700">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-s-regular">Wishlist</span>
        </button>

        <Link href="#" className="flex items-center gap-1.5 text-neutral-700">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 17.1999C7.9 17.1999 7 16.2999 7 15.1999V8.7999C7 7.6999 7.9 6.7999 9 6.7999C10.1 6.7999 11 7.6999 11 8.7999V15.1999C11 16.2999 10.1 17.1999 9 17.1999Z"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.2 13.2C14.6 13.2 14 12.6 14 12V8.80005C14 8.20005 14.5 7.60005 15.2 7.60005C15.9 7.60005 16.4 8.10005 16.4 8.80005V12C16.4 12.6 15.8 13.2 15.2 13.2Z"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 10H5.5C4.1 10 3 8.90005 3 7.50005V6.90005C3 5.50005 4.1 4.40005 5.5 4.40005C6.9 4.40005 8 5.50005 8 6.90005"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 10H17.5C18.9 10 20 8.90005 20 7.50005V6.90005C20 5.50005 18.9 4.40005 17.5 4.40005C16.1 4.40005 15 5.50005 15 6.90005"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-s-regular">Konsultasi</span>
        </Link>

        <Link href="#" className="flex items-center gap-1.5 text-neutral-700">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M16.9998 6.99994C18.1998 6.99994 19.1998 6.00008 19.1998 4.80008C19.1998 3.60008 18.1998 2.59998 16.9998 2.59998C15.7998 2.59998 14.7998 3.60008 14.7998 4.80008C14.7998 6.00008 15.7998 6.99994 16.9998 6.99994Z"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.99988 14.1998C8.19988 14.1998 9.19974 13.2 9.19974 12C9.19974 10.8 8.19988 9.79993 6.99988 9.79993C5.79988 9.79993 4.80078 10.8 4.80078 12C4.80078 13.2 5.79988 14.1998 6.99988 14.1998Z"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.0004 21.3999C18.2004 21.3999 19.2003 20.4 19.2003 19.2C19.2003 18 18.2004 17 17.0004 17C15.8004 17 14.8008 18 14.8008 19.2C14.8008 20.4 15.8004 21.3999 17.0004 21.3999Z"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.96875 13.3999L15.0312 17.7999"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.0312 6.19995L8.96875 10.6"
              stroke="#30302F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-s-regular">Cek Kuota</span>
        </Link>
      </div>
    </div>
  )
}

export default PackageVariantComponent
