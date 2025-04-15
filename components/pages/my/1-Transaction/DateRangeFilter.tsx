'use client'

import { ChevronIcon } from '@/components/icons/chevron'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format, isSameDay, subDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export interface DateRangePickerProps {
  onChange?: (dateRange: DateRange | undefined) => void
}

export default function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<
    '30days' | '90days' | 'custom'
  >('custom')

  const today = new Date()

  // Initialize with a date range (last 20 days to match the highlighted dates in the image)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  // Store the preset date ranges for comparison
  const [presetRanges, setPresetRanges] = useState({
    '30days': {
      from: subDays(today, 30),
      to: today,
    },
    '90days': {
      from: subDays(today, 90),
      to: today,
    },
  })

  // Handle preset selection
  const handlePresetSelection = (preset: '30days' | '90days' | 'custom') => {
    setSelectedOption(preset)

    if (preset === '30days') {
      const range = {
        from: subDays(today, 30),
        to: today,
      }
      setDateRange(range)
      // Update the stored preset range
      setPresetRanges((prev) => ({
        ...prev,
        '30days': range,
      }))
    } else if (preset === '90days') {
      const range = {
        from: subDays(today, 90),
        to: today,
      }
      setDateRange(range)
      // Update the stored preset range
      setPresetRanges((prev) => ({
        ...prev,
        '90days': range,
      }))
    }
    // If custom, keep the current selection
  }

  // Handle calendar selection change
  const handleCalendarSelect = (range: DateRange | undefined) => {
    if (!range) {
      setDateRange(undefined)
      return
    }

    setDateRange(range)

    // If a preset is selected, check if the new range matches the preset
    if (selectedOption !== 'custom') {
      const presetRange = presetRanges[selectedOption]

      // Check if the new range is different from the preset range
      const isRangeDifferent =
        !range.from ||
        !range.to ||
        !presetRange.from ||
        !presetRange.to ||
        !isSameDay(range.from, presetRange.from) ||
        !isSameDay(range.to, presetRange.to)

      // If the range is different, switch to custom
      if (isRangeDifferent) {
        setSelectedOption('custom')
      }
    }
  }

  // Format the selected date range for display
  const formatDateRange = () => {
    if (!dateRange?.from) {
      return 'Pilih tanggal'
    }

    if (dateRange.to) {
      return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`
    }

    return format(dateRange.from, 'MMM d, yyyy')
  }

  // Handle apply button click
  const handleApply = () => {
    // Here you would typically handle the application of the filter
    onChange?.(dateRange)
    setIsOpen(false)
  }

  // Handle reset button click
  const handleReset = () => {
    setDateRange(undefined)
    onChange?.(undefined)
    setSelectedOption('custom')
  }

  return (
    <div className="w-full max-w-md">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className="text-left">
          <button
            className=" text-m-regular flex w-full cursor-pointer items-center justify-between rounded-full border border-gray-300 px-4 py-2 text-left hover:bg-neutral-100"
            onClick={() => setIsOpen(true)}
          >
            {formatDateRange()}
            <ChevronIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="w-full rounded-lg bg-white shadow-lg">
            <div className="grid grid-cols-[350px_1fr]">
              {/* Left column - Preset options */}
              <div className="p-6">
                <div
                  className={`cursor-pointer border-b border-neutral-100 p-3 ${selectedOption === '30days' ? 'bg-primary-100' : 'hover:bg-neutral-50'}`}
                  onClick={() => handlePresetSelection('30days')}
                >
                  30 hari terakhir
                </div>
                <div
                  className={`cursor-pointer border-b border-neutral-100 p-3 ${selectedOption === '90days' ? 'bg-primary-100' : 'hover:bg-neutral-50'}`}
                  onClick={() => handlePresetSelection('90days')}
                >
                  90 hari terakhir
                </div>
                <div
                  className={`cursor-pointer border-b border-neutral-100 p-3 ${selectedOption === 'custom' ? 'bg-primary-100' : 'hover:bg-neutral-50'}`}
                  onClick={() => handlePresetSelection('custom')}
                >
                  Pilih tanggal sendiri
                </div>
              </div>
              {/* Right column - Calendar */}
              <div className="pr-6 pb-6">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleCalendarSelect}
                  numberOfMonths={2}
                  className="p-0"
                />

                {/* Action buttons */}
                <div className="mt-6 flex justify-end gap-4">
                  <Button
                    variant="outline"
                    className="border-primary-500 text-primary-500 rounded-full px-10 py-3"
                    onClick={handleReset}
                  >
                    Reset Filter
                  </Button>
                  <Button
                    className="rounded-full bg-amber-400 px-10 py-3 text-black hover:bg-amber-500"
                    onClick={handleApply}
                  >
                    Terapkan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
