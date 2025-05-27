'use client'

import { CalendarIconFilterMobile } from '@/components/icons/calendar'
import { Calendar } from '@/components/ui/calendar'
import { id } from 'date-fns/locale'
import React, { Fragment } from 'react'

interface DateSelectorProps {
  dateRange?: any
  setDateRange: (dateRange: any) => void
}

const DateSelector: React.FC<DateSelectorProps> = ({
  dateRange,
  setDateRange,
}) => {
  return (
    <Fragment>
      <div className="flex items-center gap-1">
        <CalendarIconFilterMobile />
        <p className="text-m-semibold w-full">Pilih Tanggal Keberangkatan</p>
      </div>
      <div className="flex flex-col">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          locale={id}
          fromDate={new Date()}
          className="p-0"
          cellClassName={{
            cell: 'w-full',
            head_cell: 'w-full h-full',
            month: 'p-0 flex-1',
            day: 'w-full',
          }}
        />
      </div>
    </Fragment>
  )
}

export default DateSelector
