'use client'

import {
  AirplaneArrival,
  AirplaneDeparture,
  AirplaneWithBorder,
} from '@/components/icons/airplane'
import { CalendarIconFilterMobile } from '@/components/icons/calendar'
import { SearchIcon } from '@/components/icons/search'
import { StarIconFilterMobile } from '@/components/icons/star'
import FilterActionButtons from '@/components/pages/search-packages/mobile/TopFilterMobile/ActionButton'
import AirlineSelector from '@/components/pages/search-packages/mobile/TopFilterMobile/AirlineFilter'
import DepartureAirportSelector from '@/components/pages/search-packages/mobile/TopFilterMobile/AirportFilter'
import DateSelector from '@/components/pages/search-packages/mobile/TopFilterMobile/DateFilter'
import HotelStarSelector from '@/components/pages/search-packages/mobile/TopFilterMobile/RatingHotelFilter'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { formatDateRangeShort, isEmpty } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import React, { useState } from 'react'

type FilterType =
  | 'hotelStars'
  | 'dateRange'
  | 'departureAirport'
  | 'arrivalAirport'
  | 'airline'
  | null

/**
 * A drawer component for mobile filter controls
 */
const FilterDrawer: React.FC = () => {
  const {
    filters,
    resetFilter,
    resetFilters,
    setHotelStars,
    setDateRange,
    setDepartureAirport,
    setArrivalAirport,
    setAirline,
    handleSubmit,
  } = useFilterProduct()
  const { dateRange, arrivalAirport, departureAirport, hotelStars, airline } =
    filters
  const [activeFilter, setActiveFilter] = useState<FilterType>(null)

  // Determine if any filters are applied
  const hasFilters =
    !isEmpty(dateRange) ||
    !isEmpty(arrivalAirport) ||
    !isEmpty(departureAirport) ||
    !isEmpty(airline)

  // Function to open a specific filter panel
  const openFilterPanel = (filterType: FilterType) => {
    setActiveFilter(filterType)
  }

  // Function to close filter panel and return to main filter view
  const closeFilterPanel = () => {
    setActiveFilter(null)
  }

  // Mock data for each filter type selection content
  const renderFilterContent = () => {
    switch (activeFilter) {
      case 'hotelStars':
        return (
          <div className="flex flex-col gap-3.5">
            <HotelStarSelector
              selectedRating={hotelStars}
              onRatingChange={(rating) => {
                setHotelStars(rating)
              }}
            />
            <FilterActionButtons
              onCancel={() => {
                closeFilterPanel()
                resetFilter('hotelStars')
              }}
              onConfirm={() => {
                closeFilterPanel()
              }}
            />
          </div>
        )
      case 'dateRange':
        // Mock calendar UI - in a real app this would be a calendar component
        return (
          <div className="flex flex-col gap-3.5">
            <DateSelector dateRange={dateRange} setDateRange={setDateRange} />
            <FilterActionButtons
              onCancel={() => {
                closeFilterPanel()
                resetFilter('dateRange')
              }}
              onConfirm={() => {
                closeFilterPanel()
              }}
            />
          </div>
        )

      case 'departureAirport':
        return (
          <div className="flex flex-col space-y-3">
            <DepartureAirportSelector
              selectedAirport={departureAirport}
              onSelectAirport={(airport) => {
                setDepartureAirport(airport)
              }}
            />
            <FilterActionButtons
              onCancel={() => {
                closeFilterPanel()
                resetFilter('departureAirport')
              }}
              onConfirm={() => {
                closeFilterPanel()
              }}
            />
          </div>
        )

      case 'arrivalAirport':
        return (
          <div className="flex flex-col space-y-3">
            <DepartureAirportSelector
              selectedAirport={arrivalAirport}
              onSelectAirport={(airport) => {
                setArrivalAirport(airport)
              }}
              type="arrival"
            />
            <FilterActionButtons
              onCancel={() => {
                closeFilterPanel()
                resetFilter('arrivalAirport')
              }}
              onConfirm={() => {
                closeFilterPanel()
              }}
            />
          </div>
        )
      case 'airline':
        return (
          <div className="flex flex-col space-y-3">
            <AirlineSelector
              selectedAirline={airline}
              onSelectAirline={(airline) => {
                setAirline(airline)
              }}
            />
            <FilterActionButtons
              onCancel={() => {
                closeFilterPanel()
                resetFilter('arrivalAirport')
              }}
              onConfirm={() => {
                closeFilterPanel()
              }}
            />
          </div>
        )

      default:
        return null
    }
  }

  // Animation variants for the sliding effect with dynamic height
  const slideVariants = {
    hidden: {
      x: '100%',
      opacity: 1,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exit: {
      x: '100%',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <span className="bg-neutral-0 text-s-medium rounded-[100px] px-3 py-2 text-neutral-900">
          {hasFilters ? 'Ubah' : 'Filter'}
        </span>
      </DrawerTrigger>
      <DrawerContent className="bg-primary-500 !max-h-[90vh] overflow-hidden !border-0 outline-0">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <div className="h-6 w-6" />
          <DrawerTitle className="text-l-semibold">
            {hasFilters ? 'Ubah Pencarian' : 'Filter'}
          </DrawerTitle>
          <DrawerClose>
            <X className="text-neutral-900" />
          </DrawerClose>
        </DrawerHeader>

        <motion.div
          className="bg-neutral-0 scrollbar-hide relative mx-4 mb-4 overflow-y-auto rounded-[20px]"
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="wait">
            {activeFilter ? (
              <motion.div
                key="filter-panel"
                className="scrollbar-hide w-full p-4"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {renderFilterContent()}
              </motion.div>
            ) : (
              <motion.div
                key="main-panel"
                className="scrollbar-hide w-full p-4"
                variants={slideVariants}
                initial={{ x: activeFilter ? '-100%' : 0 }}
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <SearchIcon size={24} />
                    <p className="text-m-semibold w-full">Cari Paket</p>
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
                            <span className="text-s-regular">
                              Hotel Bintang {hotelStars}
                            </span>
                            <span className="text-s-regular text-primary-500 ml-1">
                              ({Array(Number(hotelStars)).fill('⭐').join('')})
                            </span>
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

                  {/* Bulan Keberangkatan */}
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
                            {dateRange?.from
                              ? formatDateRangeShort(dateRange)
                              : ''}
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

                  {/* Bandara Keberangkatan */}
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
                            {departureAirport?.cityName} (
                            {departureAirport?.code})
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

                  {/* Bandara Kedatangan */}
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

                  {/* Maskapai Penerbangan */}
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
                          <span className="text-s-regular">
                            {airline?.name}
                          </span>
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
                </div>
                <DrawerClose
                  className="bg-primary-500 hover:bg-primary-600 mt-4 w-full rounded-full py-3 text-xs text-neutral-900"
                  onClick={() => handleSubmit()}
                >
                  Cari
                </DrawerClose>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DrawerContent>
    </Drawer>
  )
}

export default FilterDrawer
