'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ChangeEvent, SetStateAction } from 'react'
import { DateRange } from 'react-day-picker'

interface SearchAndFilterProps {
  searchQuery: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  statusFilter: string
  handleStatusFilterChange: (value: string) => void
  handleDateRangeChange: (date: SetStateAction<DateRange | undefined>) => void
}

export const SearchAndFilter = ({
  searchQuery,
  handleSearchChange,
}: SearchAndFilterProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 max-lg:hidden md:grid-cols-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Cari berdasarkan Journey Code"
          className="w-full rounded-full"
          value={searchQuery}
          onChange={handleSearchChange}
          endIcon={<Search className="h-5 w-5 text-gray-400" />}
        />
      </div>
    </div>
  )
}

interface SearchAndFilterMobileProps {
  statusFilterMobile: string
  searchQuery: string
  dateFilterMobile: DateRange | undefined
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleStatusFilterChange: (value: string) => void
  setStatusFilterMobile: (value: string) => void
  setIsLoadingMobile: (value: boolean) => void
  handleDateRangeChange: (dateRange: DateRange | undefined) => void
}

export const SearchAndFilterMobile = ({
  searchQuery,

  handleSearchChange,

  setIsLoadingMobile,
}: SearchAndFilterMobileProps) => {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-hidden pl-5">
      <div className={`pr-t absolute -top-13.5 left-3.5 w-11/12 md:w-10/12`}>
        <Input
          model="compact"
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
    </div>
  )
}
