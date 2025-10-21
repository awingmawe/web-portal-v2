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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PACKAGE_TYPE, STATUS_BOOKING } from '@/constant/env'
import { format } from 'date-fns/format'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { ChangeEvent, SetStateAction, useState } from 'react'
import { DateRange } from 'react-day-picker'

interface SearchAndFilterProps {
  searchQuery: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  statusFilter: string
  statusFilterType: string
  handleStatusFilterChange: (value: string) => void
  handleDateRangeChange: (date: SetStateAction<DateRange | undefined>) => void
  handleStatusFilterTypeChange: (value: string) => void
}

export const SearchAndFilter = ({
  searchQuery,
  handleSearchChange,
  statusFilter,
  handleStatusFilterChange,
  handleDateRangeChange,
  handleStatusFilterTypeChange,
  statusFilterType,
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
      </div>{' '}
      <div className="relative">
        <Select
          defaultValue="all"
          value={statusFilterType}
          onValueChange={handleStatusFilterTypeChange}
        >
          <SelectTrigger className="h-10 w-full rounded-3xl border-neutral-200 shadow-none">
            <SelectValue placeholder="Semua Produk" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-neutral-200">
            <SelectGroup>
              <SelectItem className="rounded-2xl" value="all">
                Semua Produk
              </SelectItem>
              <SelectItem className="rounded-2xl" value="umrah">
                Umroh
              </SelectItem>
              <SelectItem className="rounded-2xl" value="umrah-personal">
                Umroh Personal
              </SelectItem>
              <SelectItem className="rounded-2xl" value={PACKAGE_TYPE.HAJJ}>
                Haji
              </SelectItem>
              <SelectItem
                className="rounded-2xl"
                value={PACKAGE_TYPE.HAJJ_DAKHILI}
              >
                Haji Dakhili
              </SelectItem>
              <SelectItem
                className="rounded-2xl"
                value={PACKAGE_TYPE.HAJJ_FURODA}
              >
                Haji Furoda
              </SelectItem>
              <SelectItem
                className="rounded-2xl"
                value={PACKAGE_TYPE.HAJJ_SPECIAL}
              >
                Haji Khusus
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="relative">
        <Select
          defaultValue="all"
          value={statusFilter}
          onValueChange={handleStatusFilterChange}
        >
          <SelectTrigger className="h-10 w-full rounded-3xl border-neutral-200 shadow-none">
            <SelectValue placeholder="Semua Tahapan" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-neutral-200">
            <SelectGroup>
              <SelectItem className="rounded-2xl" value="all">
                Semua Tahapan
              </SelectItem>
              <SelectItem
                className="rounded-2xl"
                value={STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION}
              >
                Menunggu Penerbitan Tagihan
              </SelectItem>
              <SelectItem
                className="rounded-2xl"
                value={STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ}
              >
                Menunggu Uang Muka
              </SelectItem>
              <SelectItem className="rounded-2xl" value="waiting-approval">
                Menunggu Konfirmasi
              </SelectItem>
              <SelectItem className="rounded-2xl" value="coming-soon">
                Menunggu Pelunasan & Data Jemaah
              </SelectItem>
              <SelectItem className="rounded-2xl" value="siap-berangkat">
                Siap Berangkat
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="relative">
        {/* <DateRangePicker onChange={handleDateRangeChange} /> */}
        <DateRangePicker onChange={handleDateRangeChange} />
      </div>
    </div>
  )
}

interface SearchAndFilterMobileProps {
  statusFilterMobile: string
  searchQuery: string
  dateFilterMobile: DateRange | undefined
  statusFilterType: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleStatusFilterChange: (value: string) => void
  setStatusFilterMobile: (value: string) => void
  setIsLoadingMobile: (value: boolean) => void
  setStatusFilterType: (value: string) => void
  handleDateRangeChange: (dateRange: DateRange | undefined) => void
  handleStatusFilterTypeChange: (value: string) => void
}

export const SearchAndFilterMobile = ({
  statusFilterMobile,
  searchQuery,
  dateFilterMobile,
  handleSearchChange,
  handleStatusFilterChange,
  setStatusFilterMobile,
  setIsLoadingMobile,
  handleDateRangeChange,
  statusFilterType,
  handleStatusFilterTypeChange,
  setStatusFilterType,
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

  const renderStatusFilterTahapanText = (value: string) => {
    switch (value) {
      case 'all':
        return 'Semua Tahapan'
      case STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION:
        return 'Menunggu Penerbitan Tagihan'
      case STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ:
        return 'Menunggu Uang Muka'
      case 'waiting-approval':
        return 'Menunggu Konfirmasi'
      case 'coming-soon':
        return 'Menunggu Pelunasan & Data Jemaah'
      case 'siap-berangkat':
        return 'Siap Berangkat'
      default:
        return 'Semua Tahapan'
    }
  }

  const renderStatusFilterTypeText = (value: string) => {
    switch (value) {
      case 'all':
        return 'Semua Produk'
      case 'umrah':
        return 'Umroh'
      case PACKAGE_TYPE.UMRAH_PERSONAL:
        return 'Umroh Personal'
      case PACKAGE_TYPE.HAJJ:
        return 'Haji'
      case PACKAGE_TYPE.HAJJ_DAKHILI:
        return 'Haji Dakhili'
      case PACKAGE_TYPE.HAJJ_FURODA:
        return 'Haji Furoda'
      case PACKAGE_TYPE.HAJJ_SPECIAL:
        return 'Haji Khusus'
      default:
        return 'Semua Produk'
    }
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

      {/* Status Filter Drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <button className="text-s-regular flex items-center gap-0.5 rounded-full bg-neutral-100 px-2 py-1 text-nowrap text-neutral-700">
            {renderStatusFilterTahapanText(statusFilterMobile)}
            <ChevronIcon />
          </button>
        </DrawerTrigger>
        <DrawerContent className="z-100 border-0 outline-0">
          <DrawerHeader className="p-3">
            <DrawerTitle className="flex items-center">
              <FilterSquare className="" />
              <p className="text-m-semibold ml-2 font-semibold">Tahapan</p>
            </DrawerTitle>
          </DrawerHeader>
          <div className="space-y-2 overflow-y-auto px-4 pb-4 text-sm">
            <RadioGroup
              value={statusFilterMobile}
              onValueChange={setStatusFilterMobile}
            >
              <div className="flex items-center space-x-2 pt-2">
                <RadioGroupItem
                  value="all"
                  id="status-tahapan-all"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-tahapan-all"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Semua Tahapan
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value={STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION}
                  id="status-tahapan-tagihan"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-tahapan-tagihan"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Menunggu Penerbitan Tagihan
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value={STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ}
                  id="status-tahapan-uang-muka"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-tahapan-uang-muka"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Menunggu Uang Muka
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value="waiting-approval"
                  id="status-tahapan-konfirmasi"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-tahapan-konfirmasi"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Menunggu Konfirmasi
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value="coming-soon"
                  id="status-tahapan-pelunasan"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-tahapan-pelunasan"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Menunggu Pelunasan & Data Jemaah
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value="siap-berangkat"
                  id="status-tahapan-siap-berangkat"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-tahapan-siap-berangkat"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Siap Berangkat
                </label>
              </div>
            </RadioGroup>
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
                  handleStatusFilterChange(statusFilterMobile)
                  setIsLoadingMobile(true)
                }}
              >
                Simpan
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Product Type Filter Drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <button className="text-s-regular flex items-center gap-0.5 rounded-full bg-neutral-100 px-2 py-1 text-nowrap text-neutral-700">
            {renderStatusFilterTypeText(statusFilterType)}
            <ChevronIcon />
          </button>
        </DrawerTrigger>
        <DrawerContent className="z-100 border-0 outline-0">
          <DrawerHeader className="p-3">
            <DrawerTitle className="flex items-center">
              <FilterSquare className="" />
              <p className="text-m-semibold ml-2 font-semibold">Produk</p>
            </DrawerTitle>
          </DrawerHeader>
          <div className="space-y-2 overflow-y-auto px-4 pb-4 text-sm">
            <RadioGroup
              value={statusFilterType}
              onValueChange={setStatusFilterType}
            >
              <div className="flex items-center space-x-2 pt-2">
                <RadioGroupItem
                  value="all"
                  id="status-produk-all"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-produk-all"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Semua Produk
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value="umrah"
                  id="status-umrah"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-umrah"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Umroh
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value="umrah-personal"
                  id="status-umrah-personal"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-umrah-personal"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Umroh Personal
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value={PACKAGE_TYPE.HAJJ}
                  id="status-hajj"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-hajj"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Haji
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value={PACKAGE_TYPE.HAJJ_DAKHILI}
                  id="status-hajj-dakhili"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-hajj-dakhili"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Haji Dakhili
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value={PACKAGE_TYPE.HAJJ_FURODA}
                  id="status-hajj-furoda"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-hajj-furoda"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Haji Furoda
                </label>
              </div>
              <div className="flex items-center space-x-2 border-t border-neutral-100 pt-2">
                <RadioGroupItem
                  value={PACKAGE_TYPE.HAJJ_SPECIAL}
                  id="status-hajj-special"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="status-hajj-special"
                  className="text-s-regular ml-1 flex cursor-pointer"
                >
                  Haji Khusus
                </label>
              </div>
            </RadioGroup>
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
                  handleStatusFilterTypeChange(statusFilterType)
                }}
              >
                Simpan
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Date Filter Drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <button className="text-s-regular flex items-center gap-0.5 rounded-full bg-neutral-100 px-2 py-1 text-nowrap text-neutral-700">
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
