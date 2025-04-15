'use client'

import { AirlineIcon } from '@/components/icons/airline'
import { BuildingIcon } from '@/components/icons/building'
import { TravelRoute } from '@/constant/types/TravelProps'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { dissolve } from '@/lib/animation-setup'
import { PlaneLanding, PlaneTakeoff } from 'lucide-react'
import React from 'react'

interface DetailDepartureProps {
  departure: TravelRoute
  arrival: TravelRoute
  meccaHotel?: string
  madinahHotel?: string
}

const DepartureDetail: React.FC<DetailDepartureProps> = ({
  departure,
  arrival,
  meccaHotel,
  madinahHotel,
}) => {
  const { isLoading } = usePackageVariant()

  // Handle missing data gracefully
  const departureAirportFrom = departure?.from?.airport?.code || '-'
  const departureAirportTo = departure?.to?.airport?.code || '-'
  const arrivelAirportFrom = arrival?.from?.airport?.code || '-'
  const arrivelAirportTo = arrival?.to?.airport?.code || '-'
  const airlineName = departure?.airline?.name || '-'

  // Left column items
  const leftColumnItems = [
    {
      icon: <PlaneTakeoff size={24} />,
      title: 'Keberangkatan',
      value: `${departureAirportFrom} → ${departureAirportTo}`,
    },
    {
      icon: <PlaneLanding size={24} />,
      title: 'Kepulangan',
      value: `${arrivelAirportFrom} → ${arrivelAirportTo}`,
    },
    {
      icon: <AirlineIcon size={24} />,
      title: 'Maskapai Penerbangan',
      value: airlineName,
    },
  ]

  // Right column items
  const rightColumnItems = [
    {
      icon: <BuildingIcon size={24} color="neutral-900" />,
      title: 'Hotel Makkah',
      value: meccaHotel || '-',
    },
    {
      icon: <BuildingIcon size={24} color="neutral-900" />,
      title: 'Hotel Madinah',
      value: madinahHotel || '-',
    },
  ]

  // Render skeleton for loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-12 flex-col border-b border-b-neutral-200 pb-4 max-lg:flex max-lg:gap-2">
        {/* Left Column Skeleton */}
        <div className="col-span-6 flex flex-col gap-4 max-lg:gap-2">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-200"></div>
              <div>
                <div className="mb-1 h-4 w-32 animate-pulse rounded bg-neutral-200"></div>
                <div className="h-5 w-48 animate-pulse rounded bg-neutral-200"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column Skeleton */}
        <div className="col-span-6 flex flex-col gap-4 max-lg:gap-2">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-200"></div>
              <div>
                <div className="mb-1 h-4 w-32 animate-pulse rounded bg-neutral-200"></div>
                <div className="h-5 w-48 animate-pulse rounded bg-neutral-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render item function for both columns
  const renderItem = (item: (typeof leftColumnItems)[0], index: number) => (
    <div key={index} className={`flex items-center gap-3`}>
      {item.icon}
      <div>
        <p className="text-s-medium font-medium text-neutral-500 max-lg:text-xs max-lg:leading-4">
          {item.title}
        </p>
        <p className="text-l-regular text-neutral-900 max-lg:text-sm max-lg:leading-5">
          {item.value}
        </p>
      </div>
    </div>
  )

  return (
    <div
      className={`grid grid-cols-12 flex-col border-b border-b-neutral-200 pb-4 max-lg:flex max-lg:gap-2 ${dissolve}`}
    >
      {/* Left Column */}
      <div className="col-span-6 flex flex-col gap-4 max-lg:gap-2">
        {leftColumnItems.map(renderItem)}
      </div>

      {/* Right Column */}
      <div className="col-span-6 flex flex-col gap-4 max-lg:gap-2">
        {rightColumnItems.map(renderItem)}
      </div>
    </div>
  )
}

export default DepartureDetail
