'use client'

import {
  AirplaneArrival,
  AirplaneDeparture,
  AirplaneWithBorder,
} from '@/components/icons/airplane'
import { CalendarIconFilterMobile } from '@/components/icons/calendar'
import { StarIconFilterMobile, StarIconPrimary } from '@/components/icons/star'
import { FilterHistory } from '@/components/pages/search-mobile/FilterHistory'
import AirlineSelector from '@/components/pages/search-packages/mobile/TopFilterMobile/AirlineFilter'
import AirportSelector from '@/components/pages/search-packages/mobile/TopFilterMobile/AirportFilter'
import DateSelector from '@/components/pages/search-packages/mobile/TopFilterMobile/DateFilter'
import HotelStarSelector from '@/components/pages/search-packages/mobile/TopFilterMobile/RatingHotelFilter'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { PACKAGE_TYPE } from '@/constant/env'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useFilterHistory } from '@/hooks/common/useFilterHistory'
import {
  formatDateRangeShort,
  formatDateToYYYYMMDD,
  isEmpty,
} from '@/lib/utils'
import { SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SearchMobileUmrohProps {
  packageType?: 'umrah' | 'hajj'
}

const SearchMobileUmroh: React.FC<SearchMobileUmrohProps> = ({
  packageType = 'umrah',
}) => {
  const router = useRouter()
  const {
    filters,
    resetFilter,
    resetFilters,
    setHotelStars,
    setDateRange,
    setDepartureAirport,
    setArrivalAirport,
    setAirline,
  } = useFilterProduct()
  const { dateRange, arrivalAirport, departureAirport, hotelStars, airline } =
    filters

  // Use filter history hook
  const { addToHistory } = useFilterHistory()

  // State to control which drawer is open
  const [openDrawer, setOpenDrawer] = useState<string | null>(null)

  // Open drawer for specific filter
  const openFilterPanel = (filterType: string) => {
    setOpenDrawer(filterType)
  }

  // Close drawer
  const closeDrawer = () => {
    setOpenDrawer(null)
  }

  // Handle search with history saving
  const handleSearchWithHistory = () => {
    // Create filters object with packageType
    const filtersWithPackageType = {
      ...filters,
      packageType,
    }

    // Add current filters to history before searching
    addToHistory(filtersWithPackageType)

    // Build query parameters for the URL
    const queryParams = new URLSearchParams()

    // Add package type to query params
    queryParams.append('type', packageType)

    // Add all relevant filters to query params
    if (hotelStars) {
      queryParams.append('hR', hotelStars.toString())
    }

    // Only add date range for umrah packages
    if (packageType === PACKAGE_TYPE.UMRAH) {
      if (dateRange?.from) {
        queryParams.append('sD', formatDateToYYYYMMDD(dateRange.from))
      }

      if (dateRange?.to) {
        queryParams.append('eD', formatDateToYYYYMMDD(dateRange.to))
      }
    }

    if (departureAirport?.code) {
      queryParams.append('dptArpt', departureAirport.code)
    }

    if (arrivalAirport?.code) {
      queryParams.append('arrArpt', arrivalAirport.code)
    }

    if (airline?.name) {
      queryParams.append('trvl', airline.name)
    }

    // Use router.push to navigate to the search page with query parameters
    router.push(`/search?${queryParams.toString()}`)
  }

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <SearchIcon size={24} />
          <p className="text-m-semibold w-full">
            Cari Paket {packageType === PACKAGE_TYPE.HAJJ ? 'Haji' : 'Umrah'}
          </p>
        </div>
        <p
          className="text-s-regular text-error-500"
          onClick={() => resetFilters()}
        >
          Reset
        </p>
      </div>

      {/* Filter Sections */}
      <div className="mt-2 flex flex-col space-y-3">
        {/* Bintang Hotel */}
        <Drawer
          open={openDrawer === 'hotelStars'}
          onOpenChange={(open) => !open && closeDrawer()}
        >
          <DrawerTrigger asChild>
            <div
              className="cursor-pointer border-b border-neutral-100 pb-1.5"
              onClick={() => openFilterPanel('hotelStars')}
            >
              <div className="text-xs-regular mb-2.5 tracking-[0px] text-neutral-500">
                Bintang Hotel
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <StarIconFilterMobile />
                  {isEmpty(hotelStars) || hotelStars === 0 ? (
                    <p className="text-s-regular text-neutral-500">
                      Pilih Rating Hotel
                    </p>
                  ) : (
                    <div className="flex items-center">
                      <span className="text-s-regular mr-1">
                        Hotel Bintang {hotelStars}
                      </span>
                      (
                      <span className="text-s-regular text-primary-500 flex">
                        {Array.from({ length: hotelStars }).map((_, index) => (
                          <StarIconPrimary key={`star-${index}`} size={13} />
                        ))}
                      </span>
                      )
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  {!isEmpty(hotelStars) && hotelStars !== 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        resetFilter('hotelStars')
                      }}
                      className="mr-2"
                    >
                      <X className="h-5 w-5 text-neutral-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className="px-4 pt-4 pb-8">
            <DrawerTitle className="p-0" />
            <div className="mb-14 space-y-4 overflow-y-auto">
              <HotelStarSelector
                onRatingChange={setHotelStars}
                selectedRating={hotelStars}
              />
            </div>
            <DrawerFooter className="justify-betweengap-3 fixed bottom-0 left-0 z-99 flex w-full flex-row items-center bg-white px-2.5 py-4">
              <DrawerClose className="border-primary-500 text-s-regular w-full flex-1 rounded-full border-2  px-10 py-3">
                Batal
              </DrawerClose>
              <DrawerClose className="bg-primary-500 text-s-regular w-full flex-1 rounded-full px-10 py-3">
                Pilih
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Bulan Keberangkatan - Only show for umrah packages */}
        {packageType === 'umrah' && (
          <Drawer
            open={openDrawer === 'dateRange'}
            onOpenChange={(open) => !open && closeDrawer()}
          >
            <DrawerTrigger asChild>
              <div
                className="cursor-pointer border-b border-neutral-100 pb-1.5"
                onClick={() => openFilterPanel('dateRange')}
              >
                <div className="text-xs-regular mb-2.5 text-neutral-500">
                  Tanggal Keberangkatan
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CalendarIconFilterMobile />
                    {isEmpty(dateRange) ? (
                      <p className="text-s-regular text-neutral-500">
                        Pilih Tanggal Keberangkatan
                      </p>
                    ) : (
                      <span className="text-s-regular">
                        {dateRange?.from ? formatDateRangeShort(dateRange) : ''}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {!isEmpty(dateRange) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          resetFilter('dateRange')
                        }}
                        className="mr-2"
                      >
                        <X className="h-5 w-5 text-neutral-500" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent className="px-4 pt-4 pb-8">
              <DrawerTitle className="p-0" />
              <div className="mb-12 space-y-4 overflow-y-auto">
                <DateSelector
                  setDateRange={setDateRange}
                  dateRange={dateRange}
                />
              </div>
              <DrawerFooter className="justify-betweengap-3 fixed bottom-0 left-0 z-99 flex w-full flex-row items-center bg-white px-2.5 py-4">
                <DrawerClose className="border-primary-500 text-s-regular w-full flex-1 rounded-full border-2  px-10 py-3">
                  Batal
                </DrawerClose>
                <DrawerClose className="bg-primary-500 text-s-regular w-full flex-1 rounded-full px-10 py-3">
                  Pilih
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}

        {/* Bandara Keberangkatan */}
        <Drawer
          open={openDrawer === 'departureAirport'}
          onOpenChange={(open) => !open && closeDrawer()}
        >
          <DrawerTrigger asChild>
            <div
              className="cursor-pointer border-b border-neutral-100 pb-1.5"
              onClick={() => openFilterPanel('departureAirport')}
            >
              <div className="text-xs-regular mb-2.5 text-neutral-500">
                Bandara Keberangkatan
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AirplaneDeparture />
                  {isEmpty(departureAirport) ? (
                    <p className="text-s-regular text-neutral-500">
                      Pilih Bandara Keberangkatan
                    </p>
                  ) : (
                    <span className="text-s-regular">
                      {departureAirport?.cityName} ({departureAirport?.code})
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {!isEmpty(departureAirport) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        resetFilter('departureAirport')
                      }}
                      className="mr-2"
                    >
                      <X className="h-5 w-5 text-neutral-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className="px-4 pt-4 pb-8">
            <DrawerTitle className="p-0" />
            <div className="mb-12 space-y-4">
              <AirportSelector
                type="departure"
                selectedAirport={departureAirport}
                onSelectAirport={setDepartureAirport}
              />
            </div>
            <DrawerFooter className="justify-betweengap-3 fixed bottom-0 left-0 z-99 flex w-full flex-row items-center bg-white px-2.5 py-4">
              <DrawerClose className="border-primary-500 text-s-regular w-full flex-1 rounded-full border-2  px-10 py-3">
                Batal
              </DrawerClose>
              <DrawerClose className="bg-primary-500 text-s-regular w-full flex-1 rounded-full px-10 py-3">
                Pilih
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Bandara Kedatangan */}
        <Drawer
          open={openDrawer === 'arrivalAirport'}
          onOpenChange={(open) => !open && closeDrawer()}
        >
          <DrawerTrigger asChild>
            <div
              className="cursor-pointer border-b border-neutral-100 pb-1.5"
              onClick={() => openFilterPanel('arrivalAirport')}
            >
              <div className="text-xs-regular mb-2.5 text-neutral-500">
                Bandara Kedatangan
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AirplaneArrival />
                  {isEmpty(arrivalAirport) ? (
                    <p className="text-s-regular text-neutral-500">
                      Pilih Bandara Kedatangan
                    </p>
                  ) : (
                    <span className="text-s-regular">
                      {arrivalAirport?.cityName} ({arrivalAirport?.code})
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {!isEmpty(arrivalAirport) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        resetFilter('arrivalAirport')
                      }}
                      className="mr-2"
                    >
                      <X className="h-5 w-5 text-neutral-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className="px-4 pt-4 pb-8">
            <DrawerTitle className="p-0" />
            <div className="mb-12 space-y-4">
              <AirportSelector
                type="arrival"
                selectedAirport={arrivalAirport}
                onSelectAirport={setArrivalAirport}
              />
            </div>
            <DrawerFooter className="justify-betweengap-3 fixed bottom-0 left-0 z-99 flex w-full flex-row items-center bg-white px-2.5 py-4">
              <DrawerClose className="border-primary-500 text-s-regular w-full flex-1 rounded-full border-2  px-10 py-3">
                Batal
              </DrawerClose>
              <DrawerClose className="bg-primary-500 text-s-regular w-full flex-1 rounded-full px-10 py-3">
                Pilih
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Maskapai Penerbangan */}
        <Drawer
          open={openDrawer === 'airline'}
          onOpenChange={(open) => !open && closeDrawer()}
        >
          <DrawerTrigger asChild>
            <div
              className="cursor-pointer border-b border-neutral-100 pb-1.5"
              onClick={() => openFilterPanel('airline')}
            >
              <div className="text-xs-regular mb-2.5 text-neutral-500">
                Maskapai Penerbangan
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AirplaneWithBorder />
                  {isEmpty(airline) ? (
                    <p className="text-s-regular text-neutral-500">
                      Pilih Maskapai
                    </p>
                  ) : (
                    <span className="text-s-regular">{airline?.name}</span>
                  )}
                </div>
                <div className="flex items-center">
                  {!isEmpty(airline) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        resetFilter('airline')
                      }}
                      className="mr-2"
                    >
                      <X className="h-5 w-5 text-neutral-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className="px-4 pt-4 pb-8">
            <DrawerTitle className="p-0" />
            <div className="mb-12 space-y-4">
              <AirlineSelector
                selectedAirline={airline}
                onSelectAirline={setAirline}
              />
            </div>
            <DrawerFooter className="justify-betweengap-3 fixed bottom-0 left-0 z-99 flex w-full flex-row items-center bg-white px-2.5 py-4">
              <DrawerClose className="border-primary-500 text-s-regular w-full flex-1 rounded-full border-2  px-10 py-3">
                Batal
              </DrawerClose>
              <DrawerClose className="bg-primary-500 text-s-regular w-full flex-1 rounded-full px-10 py-3">
                Pilih
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="my-4 flex flex-col gap-1">
        <Button
          className="bg-primary-500 hover:bg-primary-600 w-full rounded-full py-3 text-xs text-neutral-900"
          onClick={handleSearchWithHistory}
        >
          Cari
        </Button>
        <p className="text-xs-regular text-center text-neutral-500">atau</p>
        <Link href={`/search?type=${packageType}`} className="w-full">
          <Button
            variant="outline"
            className="border-primary-500 w-full rounded-full border-2 py-3 text-xs text-neutral-900"
          >
            Lihat Semua Paket
          </Button>
        </Link>
      </div>

      {/* Filter History Component */}
      <FilterHistory packageType={packageType} />
    </div>
  )
}

export default SearchMobileUmroh
