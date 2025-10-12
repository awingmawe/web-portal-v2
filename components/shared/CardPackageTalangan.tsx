'use client'

import { Button } from '@/components/ui/button'
import { CardData } from '@/constant/types/PackageProps'
import { useRouter } from 'next/navigation'
import { memo } from 'react'
import { CardPackage } from './CardPackage'

interface CardPackageTalanganProps {
  data: CardData
  eventCategory?: string
  isFromTalangan?: boolean
}

export const CardPackageTalangan = memo(function CardPackageTalangan({
  data,
  eventCategory = 'search',
  isFromTalangan = false,
}: CardPackageTalanganProps) {
  const router = useRouter()

  // Helper function to safely parse price
  const safeParsePrice = (price: any, defaultValue: number = 0): number => {
    if (!price) return defaultValue
    const parsed =
      typeof price === 'string'
        ? parseInt(price.replace(/\D/g, ''))
        : parseInt(price.toString())
    return isNaN(parsed) ? defaultValue : parsed
  }

  const handleSelectPackage = () => {
    // Store the selected package data in session storage
    if (typeof window !== 'undefined') {
      // Clear any existing saved step to avoid conflicts
      sessionStorage.removeItem('talanganCurrentStep')

      // Set package data
      sessionStorage.setItem('talanganSelectedPackage', JSON.stringify(data))
    }

    // Redirect to form with step parameter to avoid hot refresh issues
    router.push('/banking/credit/form?step=2')
  }

  // If not from talangan, use the regular CardPackage
  if (!isFromTalangan) {
    return <CardPackage data={data} eventCategory={eventCategory} />
  }

  // For talangan flow, create a custom card layout
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Package Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={data.src || '/images/no-image-placeholder.png'}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {data.discount && safeParsePrice(data.discount) > 0 && (
          <div className="absolute top-4 left-4">
            <span className="rounded bg-red-500 px-2 py-1 text-sm font-semibold text-white">
              -
              {data.discountType === 'percentage'
                ? data.discount + '%'
                : 'Rp' + safeParsePrice(data.discount).toLocaleString('id-ID')}
            </span>
          </div>
        )}

        {/* Plus Badge */}
        {data.isPlus && (
          <div className="absolute top-4 right-4">
            <span className="rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
              PLUS
            </span>
          </div>
        )}
      </div>

      {/* Package Content */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
          {data.title}
        </h3>

        <p className="mb-2 text-sm text-gray-600">{data.organizationName}</p>

        <div className="mb-3 flex items-center text-sm text-gray-500">
          <span>{data.departureDate}</span>
          <span className="mx-2">-</span>
          <span>{data.arrivalDate}</span>
        </div>

        {/* Rating */}
        {Number(data.rating) > 0 && (
          <div className="mb-3 flex items-center">
            {[...Array(Number(data.rating))].map((_, i) => (
              <span key={i} className="text-yellow-400">
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-500">{data.rating}/5</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          {data.originalPrice &&
            data.originalPrice !== data.price &&
            safeParsePrice(data.originalPrice) > 0 && (
              <p className="text-sm text-gray-500 line-through">
                Rp{safeParsePrice(data.originalPrice).toLocaleString('id-ID')}
              </p>
            )}
          <p className="text-xl font-bold text-yellow-600">
            Rp{safeParsePrice(data.price).toLocaleString('id-ID')}
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleSelectPackage}
          className="w-full rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Pilih Paket Ini
        </Button>
      </div>
    </div>
  )
})
