'use client'

import { DateIcon } from '@/components/icons/date'
import { DateSkeleton } from '@/components/pages/homepage/1-Banner/SearchFilter/DateFilter/DateSkeleton'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { OtherProps } from '@/constant/types/GeneralProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import DisableDate from '@/hooks/disable-date-hooks'
import { doesRangeCrossDisabled } from '@/hooks/does-date-range'
import { formatDateRangeShort } from '@/lib/utils'
import { id } from 'date-fns/locale'
import React, { useState } from 'react'
import { DateRange } from 'react-day-picker'

const DateFilter: React.FC<OtherProps> = ({ colorIcon, whatPage }) => {
  const { filters, setDateRange, isDisabled, isLoadingSkeleton } =
    useFilterProduct()

  const dateRange = filters.dateRange

  // GET DISABLED DATE
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const currentYear = currentMonth.getFullYear().toString()
  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month)
  }

  // CALL DISALBE DATE HOOKS
  const disabledRanges = DisableDate({ year: currentYear })
  // END OF DISABLE DATE

  if (whatPage === 'filter_search' && isLoadingSkeleton) {
    return <DateSkeleton />
  }

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) {
      setDateRange(range)
      return
    }

    // Jika hanya from yang dipilih, boleh lanjut
    if (range.from && !range.to) {
      setDateRange(range)
      return
    }

    // Jika to dipilih, cek apakah melewati disabled date
    if (range.from && range.to) {
      const crossesDisabled = doesRangeCrossDisabled(
        range.from,
        range.to,
        disabledRanges
      )

      if (crossesDisabled) {
        // Tidak update dateRange, end date tidak bisa dipilih
        setDateRange(undefined)
        return
      }
    }

    setDateRange(range)
  }

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
          onSelect={handleSelect}
          numberOfMonths={2}
          locale={id}
          fromDate={new Date()}
          disabled={disabledRanges}
          onMonthChange={handleMonthChange}
        />
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(DateFilter)
