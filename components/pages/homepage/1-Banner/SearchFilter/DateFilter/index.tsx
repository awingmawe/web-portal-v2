'use client'

import { DateIcon } from '@/components/icons/date'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { OtherProps } from '@/constant/types/GeneralProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { formatDateRangeShort } from '@/lib/utils'
import { id } from 'date-fns/locale'
import React from 'react'

const DateFilter: React.FC<OtherProps> = ({ colorIcon }) => {
  const { filters, setDateRange, isDisabled } = useFilterProduct()

  const dateRange = filters.dateRange

  // if (whatPage === 'filter_search' && isLoadingSkeleton) {
  //   return <DateSkeleton />
  // }

  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none" asChild>
        <div
          className={`flex w-full items-center gap-2 ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`}
          onClick={isDisabled ? (e) => e.preventDefault() : undefined}
        >
          <DateIcon size={32} color={colorIcon} />
          <div className="flex flex-col">
            {dateRange?.from ? (
              <p className="text-s-regular text-neutral-900">
                {formatDateRangeShort(dateRange)}
              </p>
            ) : (
              <>
                <p className="text-s-regular text-neutral-900">
                  Tanggal Keberangkatan
                </p>
                <p className="text-s-regular text-neutral-300">
                  Pilih tanggal keberangkatan
                </p>
              </>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto" align="center">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          locale={id}
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(DateFilter)
