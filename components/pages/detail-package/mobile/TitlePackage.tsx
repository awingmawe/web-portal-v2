'use client'

import BookingReleasedInfo from '@/components/shared/BookingReleasedInfo'
import { PACKAGE_TYPE } from '@/constant/env'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { dissolve } from '@/lib/animation-setup'
import { formatCurrency } from '@/lib/utils'
import { differenceInDays } from 'date-fns'

interface TitlePackageMobileProps {
  title: string
  currency: string
  packageType: string
}

export default function TitlePackageMobile({
  title,
  currency,
  packageType,
}: TitlePackageMobileProps) {
  const {
    isLoading,
    selectedVariant,
    getPriceSelected,
    hasDiscount,
    getOriginalPriceSelected,
  } = usePackageVariant()

  // Show skeleton loader when loading
  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-2 lg:hidden">
        <div className="h-7 w-3/4 animate-pulse rounded-md bg-neutral-200"></div>
        <div className="h-5 w-1/2 animate-pulse rounded-md bg-neutral-200"></div>
        <div className="mt-2 h-6 w-32 animate-pulse rounded-md bg-neutral-200"></div>
      </div>
    )
  }

  const variantName =
    selectedVariant?.name ||
    (selectedVariant ? `Varian ${selectedVariant.id}` : '')

  return (
    <div className={`flex w-full flex-col gap-0.5 lg:hidden ${dissolve}`}>
      {selectedVariant &&
        differenceInDays(selectedVariant?.releasedAt as string, new Date()) <=
          10 && (
          <BookingReleasedInfo variant={selectedVariant} className="mb-3 " />
        )}
      <h1 className="text-l-semibold break-all text-neutral-900">{title}</h1>
      {selectedVariant && (
        <>
          {packageType === PACKAGE_TYPE.UMRAH && (
            <p className="text-s-regular text-neutral-600">{variantName}</p>
          )}
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xs-medium text-neutral-500">
                Harga Mulai Dari
              </p>
              <span className="text-l-semibold text-neutral-900">
                {formatCurrency(getPriceSelected(), currency)}
              </span>
              {hasDiscount() && (
                <span className="text-s-regular text-neutral-500 line-through">
                  {formatCurrency(getOriginalPriceSelected(), currency)}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
