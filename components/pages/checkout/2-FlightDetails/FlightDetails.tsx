'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { PACKAGE_TYPE } from '@/constant/env'
import { DetailVariant } from '@/constant/types/CheckoutProps'
import { PlaneLanding, PlaneTakeoff } from 'lucide-react'

interface FlightDetailsProps {
  detailVariant: DetailVariant
}

const FlightDetails = ({ detailVariant }: FlightDetailsProps) => {
  return (
    <div className="flex max-lg:justify-around lg:items-center lg:justify-between lg:gap-5 lg:rounded-[20px] lg:border lg:border-neutral-100 lg:p-4">
      {/* Items 1 */}
      <div className="flex items-center max-lg:gap-3 lg:gap-4">
        <PlaneTakeoff size={32} className="max-lg:h-6 max-lg:w-6" />
        <div className="flex flex-col">
          <p className="text-s-medium text-neutral-500 lg:hidden">
            Keberangkatan
          </p>
          <p className="text-l-regular flex flex-wrap items-center text-neutral-900 max-lg:gap-1">
            <span className="max-lg:hidden">
              {detailVariant?.package?.departure?.from?.airport?.cityName} (
              {detailVariant?.package?.departure?.from?.airport?.code})
            </span>
            <span className="lg:hidden">
              {detailVariant?.package?.departure?.from?.airport?.code}
            </span>
            <ArrowIcon size={18} />
            <span className="max-lg:hidden">
              {detailVariant?.package?.departure?.to?.airport?.cityName} (
              {detailVariant?.package?.departure?.to?.airport?.code})
            </span>
            <span className="lg:hidden">
              {detailVariant?.package?.departure?.to?.airport?.code}
            </span>
          </p>
          {detailVariant?.package?.packageType === PACKAGE_TYPE.UMRAH && (
            <p className="text-s-medium text-neutral-500 max-lg:hidden">
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
      <div className="hidden h-10 w-px bg-neutral-100 lg:block" />

      {/* Items 2 */}
      <div className="flex items-center max-lg:gap-3 lg:gap-4">
        <PlaneLanding size={32} className="max-lg:h-6 max-lg:w-6" />
        <div className="flex flex-col">
          <p className="text-s-medium text-neutral-500 lg:hidden">Kedatangan</p>
          <p className="text-l-regular flex flex-wrap items-center text-neutral-900 max-lg:gap-1">
            <span className="max-lg:hidden">
              {detailVariant?.package?.arrival?.from?.airport?.cityName} (
              {detailVariant?.package?.arrival?.from?.airport?.code})
            </span>
            <span className="lg:hidden">
              {detailVariant?.package?.arrival?.from?.airport?.code}
            </span>
            <ArrowIcon size={18} />
            <span className="max-lg:hidden">
              {detailVariant?.package?.arrival?.to?.airport?.cityName} (
              {detailVariant?.package?.arrival?.to?.airport?.code})
            </span>
            <span className=" lg:hidden">
              {detailVariant?.package?.arrival?.to?.airport?.code}
            </span>
          </p>
          {detailVariant?.package?.packageType === PACKAGE_TYPE.UMRAH && (
            <p className="text-s-medium text-neutral-500 max-lg:hidden">
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
