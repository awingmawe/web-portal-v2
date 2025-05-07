// components/pages/homepage/SearchFilter/AirlineFilter.tsx
'use client'

import { AirlineIcon } from '@/components/icons/airline'
import { AirlineFilterSkeleton } from '@/components/pages/homepage/1-Banner/SearchFilter/AirlineFilter/AirlineSkeleton'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { OtherProps } from '@/constant/types/GeneralProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { capitalizeText } from '@/lib/utils'
import React, { Fragment } from 'react'
import AirlineList from './AirlineList'

const IS_NOT_TRANSIT = ['GA', 'SV', 'JT']

const AirlineFilter: React.FC<OtherProps> = ({ colorIcon, whatPage }) => {
  const { filters, setAirline, isDisabled, isLoadingSkeleton } =
    useFilterProduct()
  const airline = filters.airline

  if (whatPage === 'filter_search' && isLoadingSkeleton) {
    return <AirlineFilterSkeleton />
  }
  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none" asChild>
        <div
          className={`flex w-full cursor-pointer items-center gap-2 ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`}
          onClick={isDisabled ? (e) => e.preventDefault() : undefined}
        >
          <AirlineIcon size={32} color={colorIcon} />
          <div className="flex flex-1 flex-col">
            {airline ? (
              <Fragment>
                <p className="text-s-regular text-neutral-900">
                  {capitalizeText(airline.name)}
                </p>
                {!IS_NOT_TRANSIT.includes(airline.code) && (
                  <p className="text-s-regular text-neutral-500">
                    Memerlukan 1x transit
                  </p>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <p className="text-s-regular text-neutral-900">
                  Maskapai Penerbangan
                </p>
                <p className="text-s-regular text-neutral-300">
                  Pilih maskapai penerbangan
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start">
        <AirlineList
          selectedAirline={airline}
          onSelectAirline={setAirline}
          isNotTransit={IS_NOT_TRANSIT}
        />
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(AirlineFilter)
