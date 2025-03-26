import { AirlineIcon } from '@/components/icons/airline'
import { BuildingIcon } from '@/components/icons/building'
import { DateIcon } from '@/components/icons/date'
import { TravelRoute } from '@/constant/types/TravelProps'
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
  const {
    airline: { name: airlineName },
    to: {
      airport: { code: departureAirportTo },
    },
    from: {
      airport: { code: departureAirportFrom },
    },
  } = departure

  const {
    to: {
      airport: { code: arrivelAirportTo },
    },
    from: {
      airport: { code: arrivelAirportFrom },
    },
  } = arrival

  // Left column items
  const leftColumnItems = [
    {
      icon: <DateIcon size={24} />,
      title: 'Tanggal Keberangkatan dan Kepulangan',
      value: '',
      className: 'max-lg:hidden', // Hide on mobile
    },
    {
      icon: <PlaneTakeoff size={24} />,
      title: 'Keberangkatan',
      value: `${departureAirportFrom} → ${departureAirportTo}`,
    },
    {
      icon: <PlaneLanding size={24} />,
      title: 'Kedatangan',
      value: `${arrivelAirportFrom} → ${arrivelAirportTo}`,
    },
  ]

  // Right column items
  const rightColumnItems = [
    {
      icon: <AirlineIcon size={24} />,
      title: 'Maskapai Penerbangan',
      value: airlineName || '',
    },
    {
      icon: <BuildingIcon size={24} color="neutral-900" />,
      title: 'Building Makkah',
      value: meccaHotel || '',
    },
    {
      icon: <BuildingIcon size={24} color="neutral-900" />,
      title: 'Hotel Madinah',
      value: madinahHotel || '',
    },
  ]

  // Render item function for both columns
  const renderItem = (item: (typeof leftColumnItems)[0], index: number) => (
    <div
      key={index}
      className={`flex items-center gap-3 ${item.className || ''}`}
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
    </div>
  )

  return (
    <div className="grid grid-cols-12 flex-col border-b border-b-neutral-200 pb-4 max-lg:flex max-lg:gap-2">
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
