'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { ChevronIcon } from '@/components/icons/chevron'
import { FilterSquare } from '@/components/icons/filter'
import DateRangePicker from '@/components/pages/my/1-Transaction/Components/DateRangeFilter'
import { DateRangeFilterMobile } from '@/components/pages/my/1-Transaction/Components/DateRangeFilterMobile'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns/format'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { ChangeEvent, SetStateAction, useState } from 'react'
import { DateRange } from 'react-day-picker'

interface SearchAndFilterProps {
  searchQuery: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDateRangeChange: (date: SetStateAction<DateRange | undefined>) => void
}

export const SearchAndFilter = ({
  searchQuery,
  handleSearchChange,
  handleDateRangeChange,
}: SearchAndFilterProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 max-lg:hidden md:grid-cols-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Cari berdasarkan ID"
          className="w-full rounded-full"
          value={searchQuery}
          onChange={handleSearchChange}
          endIcon={<Search className="h-5 w-5 text-gray-400" />}
        />
      </div>
      <div className="relative">
        {/* <DateRangePicker onChange={handleDateRangeChange} /> */}
        <DateRangePicker onChange={handleDateRangeChange} />
      </div>
    </div>
  )
}

interface SearchAndFilterMobileProps {
  searchQuery: string
  dateFilterMobile: DateRange | undefined
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  setIsLoadingMobile: (value: boolean) => void
  handleDateRangeChange: (dateRange: DateRange | undefined) => void
}

export const SearchAndFilterMobile = ({
  searchQuery,
  dateFilterMobile,
  handleSearchChange,
  setIsLoadingMobile,
  handleDateRangeChange,
}: SearchAndFilterMobileProps) => {
  const isLinkAja = sessionStorage.getItem('isLinkAja') === 'true'

  const [resetCounter, setResetCounter] = useState(0)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    dateFilterMobile
  )

  const handleReset = () => {
    // Increment the reset counter to trigger a reset in the component

    setResetCounter((prev) => prev + 1)
  }

  const formatDateRange = () => {
    if (!dateFilterMobile?.from) {
      return 'Pilih tanggal'
    }

    if (dateFilterMobile.to) {
      return `${format(dateFilterMobile.from, 'MMM d, yyyy')} - ${format(dateFilterMobile.to, 'MMM d, yyyy')}`
    }

    return format(dateFilterMobile.from, 'MMM d, yyyy')
  }

  const dateChange = (date: DateRange | undefined) => {
    setDateRange(date)
  }

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-hidden pl-5">
      <div
        className={`pr-t absolute -top-13.5 left-3.5 w-11/12 md:w-10/12 ${isLinkAja ? 'flex items-center' : ''}`}
      >
        {isLinkAja && (
          <Link href={'/linkaja'} className="mr-2">
            <ArrowIcon size={24} className="rotate-180" />
          </Link>
        )}
        <Input
          model="expended"
          startIcon={<Search size={16} className="text-neutral-300" />}
          placeholder="Cari ID Transaksi"
          className="w-full py-1.5"
          value={searchQuery}
          onChange={(e) => {
            setIsLoadingMobile(true)
            handleSearchChange(e)
          }}
        />
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <button
            className="text-s-regular flex items-center gap-0.5 rounded-full bg-neutral-100 px-2 py-1 text-nowrap text-neutral-700
"
          >
            {formatDateRange()}
            <ChevronIcon />
          </button>
        </DrawerTrigger>
        <DrawerContent className="z-100 border-0 outline-0">
          <DrawerHeader className="p-3">
            <DrawerTitle className="flex items-center">
              <div className="flex items-center">
                <FilterSquare className="" />
                <p className="text-m-semibold ml-2 font-semibold">
                  Tanggal Transaksi
                </p>
              </div>
              <Button className="ml-auto" variant="ghost" onClick={handleReset}>
                <span className="text-error-500">Reset Tanggal</span>
              </Button>
            </DrawerTitle>
          </DrawerHeader>
          <div className="space-y-2 overflow-y-hidden px-4 pb-4 text-sm">
            <DateRangeFilterMobile
              onChange={(date) => {
                dateChange(date)
              }}
              reset={resetCounter}
              selectedDate={dateRange}
            />
          </div>
          <div className="flex w-full px-3 pt-3 pb-5">
            <DrawerClose className="mr-3 w-full" asChild>
              <Button
                variant="outline"
                type="button"
                className="border-primary-500 w-full border-2 py-3"
              >
                Batal
              </Button>
            </DrawerClose>
            <DrawerClose className="w-full" asChild>
              <Button
                className="w-full py-3"
                type="button"
                onClick={() => {
                  handleDateRangeChange(dateRange)
                  setIsLoadingMobile(true)
                }}
              >
                Simpan
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
