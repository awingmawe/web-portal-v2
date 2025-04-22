'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-day-picker'

type CalendarProps = {
  onChange?: (dateRange: DateRange | undefined) => void
  reset?: number // A counter that increments to trigger reset
  selectedDate?: DateRange
  className?: string
  defaultOption?: string
}

export function DateRangeFilterMobile({
  onChange,
  reset = 0,
  className,
  selectedDate,
  defaultOption = 'custom',
}: CalendarProps) {
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption)
  const today = new Date()
  const [months, setMonths] = useState<Date[]>([])
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: selectedDate?.from || today,
    to: selectedDate?.to || today,
  })

  const [tempRange, setTempRange] = useState<{
    from?: Date | null
    to?: Date | null
  }>({ from: selectedDate?.from || today, to: selectedDate?.to || today })

  const scrollRef = useRef<HTMLDivElement>(null)
  const currentMonthRef = useRef<HTMLDivElement>(null)
  const initialScrollDone = useRef(false)
  const prevResetRef = useRef(reset)

  // Initialize months - current month, 12 months back, and 12 months forward
  useEffect(() => {
    const currentMonth = startOfMonth(today)
    const pastMonths = Array.from({ length: 12 }, (_, i) =>
      subMonths(currentMonth, i + 1)
    )
    const futureMonths = Array.from({ length: 12 }, (_, i) =>
      addMonths(currentMonth, i + 1)
    )

    setMonths([...pastMonths.reverse(), currentMonth, ...futureMonths])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update the selectedRange when component mounts to initialize with today's date
  useEffect(() => {
    setSelectedRange({ from: today, to: today })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle reset prop changes
  useEffect(() => {
    // Only reset if the reset counter has changed
    if (reset !== prevResetRef.current) {
      prevResetRef.current = reset

      // Set date range to null when reset is triggered
      setTempRange({ from: null, to: null })
      setSelectedRange({ from: undefined, to: undefined })
      setSelectedOption('custom')

      // Notify parent of the reset with null values
      if (onChange) {
        onChange(undefined)
      }

      // Still scroll to today's date for user convenience
      setTimeout(() => scrollToDate(today), 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, onChange])

  // Improved scroll to current month on initial load
  useEffect(() => {
    if (!initialScrollDone.current && scrollRef.current && months.length > 0) {
      // Find the index of the current month
      const currentMonthIndex = months.findIndex(
        (month) =>
          month.getMonth() === today.getMonth() &&
          month.getFullYear() === today.getFullYear()
      )

      if (currentMonthIndex !== -1) {
        // Use a timeout to ensure the DOM is fully rendered
        setTimeout(() => {
          if (scrollRef.current) {
            const monthElement = scrollRef.current.querySelector(
              `[data-month-index="${currentMonthIndex}"]`
            )
            if (monthElement) {
              // Use scrollIntoView to scroll to the current month
              monthElement.scrollIntoView({ behavior: 'auto', block: 'start' })
              initialScrollDone.current = true
            }
          }
        }, 100)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months])

  // Modify the handleOptionChange function to include scrolling to the selected date
  const handleOptionChange = (value: string) => {
    setSelectedOption(value)

    const now = new Date()

    if (value === '30days') {
      const from = subMonths(now, 1)
      setSelectedRange({ from, to: now })
      if (onChange) onChange({ from, to: now })
      // Schedule scrolling to the "from" date after state update
      setTimeout(() => scrollToDate(from), 0)
    } else if (value === '90days') {
      const from = subMonths(now, 3)
      setSelectedRange({ from, to: now })
      if (onChange) onChange({ from, to: now })
      // Schedule scrolling to the "from" date after state update
      setTimeout(() => scrollToDate(from), 0)
    } else {
      // For custom, keep the current selection
      if (tempRange.from) {
        setTimeout(() => scrollToDate(tempRange.from as Date), 0)
      }
    }
  }

  // Add a new function to scroll to a specific date
  const scrollToDate = (date: Date) => {
    if (scrollRef.current && months.length > 0) {
      // Find the month that contains this date
      const targetMonthIndex = months.findIndex(
        (month) =>
          month.getMonth() === date.getMonth() &&
          month.getFullYear() === date.getFullYear()
      )

      if (targetMonthIndex !== -1) {
        const monthElement = scrollRef.current.querySelector(
          `[data-month-index="${targetMonthIndex}"]`
        )
        if (monthElement) {
          monthElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }

  const handleDateClick = (day: Date) => {
    if (selectedOption !== 'custom') {
      setSelectedOption('custom')
    }

    if (!tempRange.from) {
      setTempRange({ from: day })
      scrollToDate(day)
    } else if (!tempRange.to) {
      // Ensure from date is before to date
      if (day < tempRange.from) {
        setTempRange({ from: day, to: tempRange.from })
        setSelectedRange({ from: day, to: tempRange.from })
        if (onChange) onChange({ from: day, to: tempRange.from })
        scrollToDate(day) // Scroll to the earlier date
      } else {
        setTempRange({ from: tempRange.from, to: day })
        setSelectedRange({ from: tempRange.from, to: day })
        if (onChange) onChange({ from: tempRange.from, to: day })
        // No need to scroll here as we're already viewing this area
      }
    } else {
      // Start a new selection
      setTempRange({ from: day })
      scrollToDate(day)
    }
  }

  const isDateInRange = (day: Date) => {
    if (selectedOption !== 'custom') {
      return (
        selectedRange.from &&
        selectedRange.to &&
        day >= selectedRange.from &&
        day <= selectedRange.to
      )
    }

    if (tempRange.from && tempRange.to) {
      return day >= tempRange.from && day <= tempRange.to
    }

    if (tempRange.from && !tempRange.to) {
      return isSameDay(day, tempRange.from)
    }

    return false
  }

  return (
    <div className={cn('w-full max-w-md rounded-lg bg-white', className)}>
      <div className="sticky top-0 z-40  bg-white">
        <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
          <div className="flex items-center space-x-2 border-b border-neutral-100 py-2">
            <RadioGroupItem value="30days" id="30days" />
            <label htmlFor="30days" className="cursor-pointer">
              30 Hari Terakhir
            </label>
          </div>
          <div className="flex items-center space-x-2 border-b border-neutral-100 py-2">
            <RadioGroupItem value="90days" id="90days" />
            <label htmlFor="90days" className="cursor-pointer">
              90 Hari Terakhir
            </label>
          </div>
          <div className="flex items-center space-x-2 py-2">
            <RadioGroupItem value="custom" id="custom" />
            <label htmlFor="custom" className="cursor-pointer">
              Pilih Sendiri
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="relative z-10">
        <ScrollArea className="h-[400px]" ref={scrollRef}>
          <div className="mt-20">
            {months.map((month, monthIndex) => {
              const isCurrentMonth =
                month.getMonth() === today.getMonth() &&
                month.getFullYear() === today.getFullYear()

              return (
                <div
                  key={monthIndex}
                  data-month-index={monthIndex}
                  className="mb-6 border-b border-neutral-100 pb-2"
                  ref={isCurrentMonth ? currentMonthRef : null}
                  id={isCurrentMonth ? 'current-month' : undefined}
                >
                  <h3 className="mt-4 mb-2 text-lg font-medium">
                    {format(month, 'MMM yyyy')}
                  </h3>
                  <div className="grid grid-cols-7 text-center text-sm">
                    <div className="text-muted-foreground">Mon</div>
                    <div className="text-muted-foreground">Tue</div>
                    <div className="text-muted-foreground">Wed</div>
                    <div className="text-muted-foreground">Thu</div>
                    <div className="text-muted-foreground">Fri</div>
                    <div className="text-muted-foreground">Sat</div>
                    <div className="text-muted-foreground">Sun</div>

                    {Array.from({
                      length:
                        new Date(
                          month.getFullYear(),
                          month.getMonth(),
                          1
                        ).getDay() === 0
                          ? 6
                          : new Date(
                              month.getFullYear(),
                              month.getMonth(),
                              1
                            ).getDay() - 1,
                    }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}

                    {eachDayOfInterval({
                      start: startOfMonth(month),
                      end: endOfMonth(month),
                    }).map((day, dayIndex) => (
                      <button
                        key={dayIndex}
                        type="button"
                        className={cn(
                          'mt-1 aspect-square p-2 text-center focus:outline-none',
                          isToday(day) && 'font-bold',
                          isDateInRange(day) && 'bg-primary-500',
                          !isSameMonth(day, month) &&
                            'text-muted-foreground opacity-50'
                        )}
                        onClick={() => handleDateClick(day)}
                      >
                        {format(day, 'd')}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      <div className="p-4">{/* Buttons removed as requested */}</div>
    </div>
  )
}
