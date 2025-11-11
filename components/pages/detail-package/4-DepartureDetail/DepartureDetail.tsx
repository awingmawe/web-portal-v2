'use client'

import { AirlineIcon } from '@/components/icons/airline'
import { BuildingIcon } from '@/components/icons/building'
import { KabbahIcon } from '@/components/icons/kabbah'
import DetailPackageModal from '@/components/pages/detail-package/10-DetailModal/DetailModal'
import { Button } from '@/components/ui/button'
import { TravelRoute } from '@/constant/types/TravelProps'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { dissolve } from '@/lib/animation-setup'
import { CircleAlert, PlaneLanding, PlaneTakeoff } from 'lucide-react'
import React, { useState } from 'react'

interface DetailDepartureProps {
  departure: TravelRoute
  arrival: TravelRoute
  meccaHotel?: string
  madinahHotel?: string
  type: string
  variantType: string
  isPlus: boolean
}

const DepartureDetail: React.FC<DetailDepartureProps> = ({
  departure,
  arrival,
  meccaHotel,
  madinahHotel,
  type,
  variantType,
  isPlus,
}) => {
  const { isLoading } = usePackageVariant()

  // Handle missing data gracefully
  const departureAirportFrom = departure?.from?.airport?.code || '-'
  const departureAirportTo = departure?.to?.airport?.code || '-'
  const arrivelAirportFrom = arrival?.from?.airport?.code || '-'
  const arrivelAirportTo = arrival?.to?.airport?.code || '-'
  const airlineName = departure?.airline?.name || '-'

  const [dialogDetailPackage, setOpenDetailPackage] = useState(false)
  const [detailType, setDetailType] = useState<string>('')
  const [variant, setVariant] = useState<string>('')

  // Left column items
  const leftColumnItems = [
    {
      icon: <KabbahIcon size={24} />,
      title: 'Tipe Perjalanan',
      value: `${type}`,
      orderForMobile: 1,
      details: true,
      variantType: isPlus ? 'plus' : variantType,
    },
    {
      icon: <PlaneTakeoff size={24} />,
      title: 'Keberangkatan',
      value: `${departureAirportFrom} → ${departureAirportTo}`,
      orderForMobile: 2,
    },
    {
      icon: <BuildingIcon size={24} color="neutral-900" />,
      title: 'Hotel Makkah',
      value: meccaHotel || '-',
      orderForMobile: 5,
    },
  ]

  // Right column items
  const rightColumnItems = [
    {
      icon: <AirlineIcon size={24} />,
      title: 'Maskapai Penerbangan',
      value: airlineName,
      orderForMobile: 3,
    },
    {
      icon: <PlaneLanding size={24} />,
      title: 'Kepulangan',
      value: `${arrivelAirportFrom} → ${arrivelAirportTo}`,
      orderForMobile: 4,
    },
    {
      icon: <BuildingIcon size={24} color="neutral-900" />,
      title: 'Hotel Madinah',
      value: madinahHotel || '-',
      orderForMobile: 6,
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
      </div>
    )
  }

  // Render item function for both columns
  const renderItem = (item: (typeof leftColumnItems)[0], index: number) => (
    <div
      key={index}
      className={`flex items-center gap-3 order-${item.orderForMobile}`}
    >
      {item.icon}
      <div>
        <p className="text-s-medium font-medium text-neutral-500 max-lg:text-xs max-lg:leading-4">
          {item.title}
        </p>
        <p className="text-l-regular text-neutral-900 max-lg:text-sm max-lg:leading-5">
          {item.value}
        </p>
      </div>

      {item.details && (
        <>
          <Button
            onClick={() => {
              setDetailType(item.value)
              setVariant(item.variantType)
              setOpenDetailPackage(true)
              console.log(variant)
            }}
            className="text-s-regular flex w-min gap-2 rounded-full px-2 py-1"
          >
            Pelajari
            <CircleAlert />
          </Button>
        </>
      )}
    </div>
  )

  return (
    <>
      <DetailPackageModal
        title={detailType}
        open={dialogDetailPackage}
        onOpenChange={setOpenDetailPackage}
        variant={variant}
      />
      <div
        className={`grid grid-cols-12 flex-col border-b border-b-neutral-200 pb-4 max-lg:flex max-lg:gap-2 ${dissolve}`}
      >
        {/* className={`flex flex-col border-b border-b-neutral-200 pb-4 max-lg:gap-2 ${dissolve}`} */}

        {/* Left Column */}
        <div className="col-span-6 flex flex-col gap-4 max-lg:hidden max-lg:gap-2">
          {leftColumnItems.map(renderItem)}
        </div>

        {/* Right Column */}
        <div className="col-span-6 flex flex-col gap-4 max-lg:hidden max-lg:gap-2">
          {rightColumnItems.map(renderItem)}
        </div>

        <div className=" hidden flex-col gap-3 max-lg:flex">
          {leftColumnItems.map(renderItem)}
          {rightColumnItems.map(renderItem)}
        </div>
        {/* predefined tailwindscsss */}
        <div className="order-1 order-2 order-3 order-4 order-5 order-6 order-7 order-8 order-9"></div>
      </div>
    </>
  )
}

export default DepartureDetail
