'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from '@/components/ui/button'
import { dissolve } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'

interface CalendarProps {
  months?: string
  month?: string
  caption?: string
  caption_label?: string
  nav?: string
  nav_button?: string
  nav_button_previous?: string
  nav_button_next?: string
  table?: string
  head_row?: string
  head_cell?: string
  row?: string
  cell?: string
  day?: string
  day_range_start?: string
  day_range_end?: string
  day_selected?: string
  day_today?: string
  day_outside?: string
  day_disabled?: string
  day_range_middle?: string
  day_hidden?: string
  IconLeft?: string
  IconRight?: string
  dropdown_month?: string
  dropdown_year?: string
  caption_dropdowns?: string
}

function Calendar({
  className,
  classNames,
  cellClassName,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker> & { cellClassName?: CalendarProps }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-4', className)}
      classNames={{
        months: cn('flex flex-col sm:flex-row gap-3', cellClassName?.months),
        month: cn('flex flex-col gap-4 p-4', cellClassName?.month),
        caption: cn(
          'flex justify-center pt-1 relative items-center w-full',
          cellClassName?.caption
        ),
        caption_label: cn('text-m-medium', cellClassName?.caption_label),
        nav: cn('flex items-center gap-1', cellClassName?.nav),
        nav_button: cn('bg-transparent p-0', cellClassName?.nav_button),
        nav_button_previous: cn(
          'absolute left-1',
          cellClassName?.nav_button_previous
        ),
        nav_button_next: cn('absolute right-1', cellClassName?.nav_button_next),
        table: cn('w-full border-collapse space-x-1', cellClassName?.table),
        head_row: cn('flex', cellClassName?.head_row),
        head_cell: cn(
          'text-neutral-700 w-8 h-8 text-xs-medium flex justify-center flex-col',
          cellClassName?.head_cell
        ),
        row: cn('flex w-full mt-0.5', cellClassName?.row),
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary [&:has([aria-selected].day-range-end)]:rounded-r-lg',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-lg [&:has(>.day-range-start)]:rounded-l-lg'
            : '[&:has([aria-selected])]:rounded-lg',
          dissolve,
          cellClassName?.cell
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 text-s-regular aria-selected:opacity-100 hover:bg-primary-300 rounded-lg aria-selected:hover:bg-primary focus:bg-primary active:bg-primary',
          dissolve,
          cellClassName?.day
        ),
        day_range_start: cn(
          `day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground ${dissolve}`,
          cellClassName?.day_range_start
        ),
        day_range_end: cn(
          `day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground ${dissolve}`,
          cellClassName?.day_range_end
        ),
        day_selected: cn(
          `bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground ${dissolve}`,
          cellClassName?.day_selected
        ),
        day_today: cn(
          'bg-primary text-accent-foreground',
          cellClassName?.day_today
        ),
        day_outside: cn(
          'day-outside text-neutral-400 aria-selected:text-neutral-400',
          cellClassName?.day_outside
        ),
        day_disabled: cn(
          'text-neutral-400 opacity-50',
          cellClassName?.day_disabled
        ),
        day_range_middle: cn(
          'aria-selected:bg-primaryy aria-selected:text-accent-foreground',
          cellClassName?.day_range_middle
        ),
        day_hidden: cn('invisible', cellClassName?.day_hidden),
        // Styling untuk dropdown year/month picker
        // Styling untuk dropdown year/month picker
        dropdown_month: cn(
          'inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 mr-2',
          cellClassName?.dropdown_month
        ),
        dropdown_year: cn(
          'inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
          cellClassName?.dropdown_year
        ),
        caption_dropdowns: cn(
          'flex items-center justify-center gap-2 pb-4',
          cellClassName?.caption_dropdowns
        ),
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn('size-6 cursor-pointer text-neutral-900', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn('size-6 cursor-pointer text-neutral-900', className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
