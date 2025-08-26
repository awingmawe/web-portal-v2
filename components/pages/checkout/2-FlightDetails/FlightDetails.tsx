'use client'

import { PACKAGE_TYPE } from '@/constant/env'
import { DetailVariant } from '@/constant/types/CheckoutProps'
import { PlaneLanding, PlaneTakeoff } from 'lucide-react'

interface FlightDetailsProps {
  detailVariant: DetailVariant
}

const FlightDetails = ({ detailVariant }: FlightDetailsProps) => {
  return (
    <div className="flex flex-col justify-between rounded-[20px] border border-gray-200 p-4 md:flex-row md:items-center md:space-x-6">
      <div className="mb-4 flex items-center md:mb-0 md:w-1/2">
        <div className="mr-4 flex flex-col items-center">
          <PlaneTakeoff size={24} className="text-primary" />
        </div>
        <div>
          <p className="text-l-regular text-neutral-900">
            {detailVariant?.package?.departure?.from?.airport?.cityName} (
            {detailVariant?.package?.departure?.from?.airport?.code}) →
            {detailVariant?.package?.departure?.to?.airport?.cityName} (
            {detailVariant?.package?.departure?.to?.airport?.code})
          </p>
          {detailVariant?.package?.packageType === PACKAGE_TYPE.UMRAH && (
            <p className="text-s-medium text-neutral-500">
              {detailVariant?.departureDate &&
                new Date(detailVariant.departureDate).toLocaleDateString(
                  'id-ID',
                  {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
            </p>
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="hidden h-10 w-px bg-gray-200 md:block" />

      <div className="flex items-center md:w-1/2">
        <div className="mr-4 flex flex-col items-center">
          <PlaneLanding size={24} className="text-primary" />
        </div>
        <div>
          <p className="text-l-regular text-neutral-900">
            {detailVariant?.package?.arrival?.from?.airport?.cityName} (
            {detailVariant?.package?.arrival?.from?.airport?.code}) →
            {detailVariant?.package?.arrival?.to?.airport?.cityName} (
            {detailVariant?.package?.arrival?.to?.airport?.code})
          </p>
          {detailVariant?.package?.packageType === PACKAGE_TYPE.UMRAH && (
            <p className="text-s-medium text-neutral-500">
              {detailVariant?.arrivalDate &&
                new Date(detailVariant.arrivalDate).toLocaleDateString(
                  'id-ID',
                  {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FlightDetails
