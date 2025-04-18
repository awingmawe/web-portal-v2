'use client'

import { Button } from '@/components/ui/button'
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
import * as React from 'react'

type DateRange = {
  from: Date
  to: Date
}

type CalendarProps = {
  onDateSelect?: (range: DateRange) => void
  className?: string
}

export function DateRangeFilterMobile({
  onDateSelect,
  className,
}: CalendarProps) {
  const [selectedOption, setSelectedOption] = React.useState<string>('custom')
  const today = new Date()
  const [months, setMonths] = React.useState<Date[]>([])
  const [selectedRange, setSelectedRange] = React.useState<DateRange>({
    from: new Date(),
    to: new Date(),
  })
  const [tempRange, setTempRange] = React.useState<{
    from?: Date
    to?: Date
  }>({ from: today, to: today })

  const scrollRef = React.useRef<HTMLDivElement>(null)
  const currentMonthRef = React.useRef<HTMLDivElement>(null)
  const initialScrollDone = React.useRef(false)

  // Initialize months - current month, 12 months back, and 12 months forward
  React.useEffect(() => {
    const currentMonth = startOfMonth(today)
    const pastMonths = Array.from({ length: 12 }, (_, i) =>
      subMonths(currentMonth, i + 1)
    )
    const futureMonths = Array.from({ length: 12 }, (_, i) =>
      addMonths(currentMonth, i + 1)
    )

    setMonths([...pastMonths.reverse(), currentMonth, ...futureMonths])
  }, [])

  // Update the selectedRange when component mounts to initialize with today's date
  React.useEffect(() => {
    setSelectedRange({ from: today, to: today })
  }, [])

  // Improved scroll to current month on initial load
  React.useEffect(() => {
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

              // Log for debugging
              console.log(
                'Scrolled to current month:',
                format(months[currentMonthIndex], 'MMMM yyyy')
              )
            }
          }
        }, 100)
      }
    }
  }, [months])

  // Modify the handleOptionChange function to include scrolling to the selected date
  const handleOptionChange = (value: string) => {
    setSelectedOption(value)

    const now = new Date()

    if (value === '30days') {
      const from = subMonths(now, 1)
      setSelectedRange({ from, to: now })
      if (onDateSelect) onDateSelect({ from, to: now })
      // Schedule scrolling to the "from" date after state update
      setTimeout(() => scrollToDate(from), 0)
    } else if (value === '90days') {
      const from = subMonths(now, 3)
      setSelectedRange({ from, to: now })
      if (onDateSelect) onDateSelect({ from, to: now })
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
        if (onDateSelect) onDateSelect({ from: day, to: tempRange.from })
        scrollToDate(day) // Scroll to the earlier date
      } else {
        setTempRange({ from: tempRange.from, to: day })
        setSelectedRange({ from: tempRange.from, to: day })
        if (onDateSelect) onDateSelect({ from: tempRange.from, to: day })
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
        day >= selectedRange.from &&
        selectedRange.to &&
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

  const resetDates = () => {
    const today = new Date()
    setTempRange({ from: today, to: today })
    setSelectedRange({ from: today, to: today })
    setSelectedOption('custom')
    // Scroll to today's date
    setTimeout(() => scrollToDate(today), 0)
  }

  const handleSave = () => {
    if (tempRange.from && tempRange.to) {
      if (onDateSelect) onDateSelect({ from: tempRange.from, to: tempRange.to })
      console.log('Saved date range:', {
        from: tempRange.from,
        to: tempRange.to,
      })
    } else if (tempRange.from) {
      if (onDateSelect)
        onDateSelect({ from: tempRange.from, to: tempRange.from })
      console.log('Saved single date:', tempRange.from)
    }
  }

  return (
    <div
      className={cn('w-full max-w-md rounded-lg border bg-white', className)}
    >
      <div className="border-b p-4">
        <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
          <div className="flex items-center space-x-2 border-b py-2">
            <RadioGroupItem value="30days" id="30days" />
            <label htmlFor="30days" className="cursor-pointer">
              30 Hari Terakhir
            </label>
          </div>
          <div className="flex items-center space-x-2 border-b py-2">
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

      <div className="relative">
        <ScrollArea className="h-[400px] px-4" ref={scrollRef}>
          {months.map((month, monthIndex) => {
            const isCurrentMonth =
              month.getMonth() === today.getMonth() &&
              month.getFullYear() === today.getFullYear()

            return (
              <div
                key={monthIndex}
                data-month-index={monthIndex}
                className="mb-6"
                ref={isCurrentMonth ? currentMonthRef : null}
                id={isCurrentMonth ? 'current-month' : undefined}
              >
                <h3 className="mt-4 mb-2 text-lg font-medium">
                  {format(month, 'MMM yyyy')}
                  {isCurrentMonth && (
                    <span className="ml-2 text-sm text-amber-500">
                      (Current)
                    </span>
                  )}
                </h3>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
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
                        'aspect-square p-2 text-center focus:outline-none',
                        isToday(day) && 'font-bold',
                        isDateInRange(day) && 'bg-amber-200',
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
        </ScrollArea>
      </div>

      <div className="flex gap-4 p-4">
        <Button
          variant="outline"
          className="flex-1 rounded-full"
          onClick={() => setTempRange({})}
        >
          Batal
        </Button>
        <Button
          className="flex-1 rounded-full bg-amber-400 text-black hover:bg-amber-500"
          onClick={handleSave}
        >
          Simpan
        </Button>
      </div>
    </div>
  )
}
