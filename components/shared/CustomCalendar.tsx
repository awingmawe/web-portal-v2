'use client'

import { CalendarIconFilterMobile } from '@/components/icons/calendar'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

type CalendarViewProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  locale?: any
  minYear?: number
  maxYear?: number
}

export const CustomCalendarView = ({
  value,
  onChange,
  disabled = () => false,
  locale = id,
  minYear = 1890,
  maxYear = new Date().getFullYear(),
}: CalendarViewProps) => {
  const [view, setView] = useState<'days' | 'months' | 'years'>('days')
  const [viewDate, setViewDate] = useState<Date>(value || new Date())

  // Update viewDate when value changes externally
  useEffect(() => {
    if (value) {
      setViewDate(value)
    }
  }, [value])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const currentDate = new Date()

  // Create days grid
  const generateDaysGrid = () => {
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()

    // Get day of week for first day (0 is Sunday)
    let firstDayIndex = firstDayOfMonth.getDay()

    // Convert to Monday as first day (0 is Monday)
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1

    // Get days from previous month to fill in the first row
    const prevMonthDays = firstDayIndex
    const prevMonth = new Date(year, month, 0)
    const prevMonthDaysCount = prevMonth.getDate()

    // Days from next month to fill in the last row
    const totalCells = Math.ceil((daysInMonth + prevMonthDays) / 7) * 7
    const nextMonthDays = totalCells - (daysInMonth + prevMonthDays)

    const days = []

    // Previous month days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDaysCount - i)
      days.push({
        date,
        day: prevMonthDaysCount - i,
        currentMonth: false,
        isToday: false,
        disabled: disabled(date),
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const isToday =
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()

      days.push({
        date,
        day: i,
        currentMonth: true,
        isToday,
        disabled: disabled(date),
      })
    }

    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i)
      days.push({
        date,
        day: i,
        currentMonth: false,
        isToday: false,
        disabled: disabled(date),
      })
    }

    return days
  }

  // Generate array of months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(year, i, 1)
    return {
      date,
      name: date.toLocaleString(locale, { month: 'short' }),
      disabled: disabled(date),
    }
  })

  // Calculate year range for years view
  const calculateYearRange = () => {
    const startYear = Math.max(minYear, Math.floor(year / 12) * 12)
    const endYear = Math.min(startYear + 11, maxYear)

    return Array.from(
      { length: Math.min(12, endYear - startYear + 1) },
      (_, i) => {
        const yearNum = startYear + i
        const date = new Date(yearNum, 0, 1)
        return {
          year: yearNum,
          date,
          disabled: yearNum < minYear || yearNum > maxYear,
        }
      }
    )
  }

  const years = calculateYearRange()
  const startYear = years[0].year
  const endYear = years[years.length - 1].year

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (onChange) {
      onChange(date)
    }
  }

  // Navigation handlers
  const goToPrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1))
  }

  const goToPrevYear = () => {
    setViewDate(new Date(year - 1, month, 1))
  }

  const goToNextYear = () => {
    setViewDate(new Date(year + 1, month, 1))
  }

  const goToPrevYearRange = () => {
    const newYear = Math.max(minYear, startYear - 12)
    setViewDate(new Date(newYear, 0, 1))
  }

  const goToNextYearRange = () => {
    const newYear = Math.min(maxYear, startYear + 12)
    setViewDate(new Date(newYear, 0, 1))
  }

  // Header content based on view
  const headerContent = () => {
    if (view === 'days') {
      return (
        <p
          className="text-l-semibold flex cursor-pointer items-center"
          onClick={() => setView('months')}
        >
          {format(viewDate, 'MMMM yyyy', { locale })}
          <ChevronDown size={12} />
        </p>
      )
    } else if (view === 'months') {
      return (
        <p
          className="text-l-semibold flex cursor-pointer items-center"
          onClick={() => setView('years')}
        >
          {year}
          <ChevronDown size={12} />
        </p>
      )
    } else {
      return (
        <p className="text-l-semibold">
          {startYear}-{endYear}
        </p>
      )
    }
  }

  // Weekday labels
  const weekDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

  return (
    <div className="flex w-[300px] flex-col rounded-2xl p-4 max-lg:w-full">
      {/* Header navigation */}
      <div className="mb-5 flex items-center gap-1">
        <CalendarIconFilterMobile size={24} />
        <p className="text-l-semibold w-full">Pilih Tanggal Kelahiran</p>
      </div>
      <div className="mb-3 flex items-center justify-between">
        {/* Previous button */}
        <Button
          variant="ghost"
          className="py-0"
          onClick={() => {
            if (view === 'days') {
              goToPrevMonth()
            } else if (view === 'months') {
              goToPrevYear()
            } else {
              goToPrevYearRange()
            }
          }}
          disabled={
            (view === 'days' && year === minYear && month === 0) ||
            (view === 'months' && year <= minYear) ||
            (view === 'years' && startYear <= minYear)
          }
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Header title */}
        {headerContent()}

        {/* Next button */}
        <Button
          variant="ghost"
          className="py-0"
          onClick={() => {
            if (view === 'days') {
              goToNextMonth()
            } else if (view === 'months') {
              goToNextYear()
            } else {
              goToNextYearRange()
            }
          }}
          disabled={
            (view === 'days' &&
              year === currentDate.getFullYear() &&
              month >= currentDate.getMonth()) ||
            (view === 'months' && year >= maxYear) ||
            (view === 'years' && endYear >= maxYear)
          }
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Calendar body */}
      {view === 'days' && (
        <>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <p
                key={day}
                className="text-xs-medium my-auto flex h-[35px] items-center justify-center text-center text-neutral-500"
              >
                {day}
              </p>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {generateDaysGrid().map((day, i) => (
              <Button
                key={`${day.date.toISOString()}-${i}`}
                variant="ghost"
                className={`
                  mx-auto h-9 w-9 !rounded-lg p-0
                  ${day.isToday ? 'bg-neutral-100' : ''} 
                  ${
                    value &&
                    day.date.getDate() === value.getDate() &&
                    day.date.getMonth() === value.getMonth() &&
                    day.date.getFullYear() === value.getFullYear()
                      ? 'bg-primary-500 hover:bg-primary-600 text-white'
                      : ''
                  }
                `}
                disabled={day.disabled}
                onClick={() => handleDateSelect(day.date)}
              >
                <p
                  className={`
                  ${!day.currentMonth ? 'text-[#A4A4A2]' : ''} 
                    `}
                >
                  {day.day}
                </p>
              </Button>
            ))}
          </div>
        </>
      )}

      {view === 'months' && (
        <div className="grid grid-cols-3">
          {months.map((month) => (
            <Button
              key={month.name}
              variant="ghost"
              className={`
                mx-auto h-13 w-21 !rounded-lg py-0 text-sm leading-5
                ${viewDate.getMonth() === month.date.getMonth() ? 'bg-primary-500 hover:bg-primary-600 text-[16px] leading-6 font-bold text-white' : ''}
              `}
              disabled={month.disabled}
              onClick={() => {
                setViewDate(month.date)
                setView('days')
              }}
            >
              {month.name}
            </Button>
          ))}
        </div>
      )}

      {view === 'years' && (
        <div className="grid grid-cols-3">
          {years.map((yearObj) => (
            <Button
              key={yearObj.year}
              variant="ghost"
              className={`
                mx-auto h-13 w-21 !rounded-lg py-0 text-sm leading-5
                ${viewDate.getFullYear() === yearObj.year ? 'bg-primary-500 hover:bg-primary-600 text-[16px] leading-6 font-bold text-white' : ''}
              `}
              disabled={yearObj.disabled}
              onClick={() => {
                setViewDate(new Date(yearObj.year, viewDate.getMonth(), 1))
                setView('months')
              }}
            >
              {yearObj.year}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
