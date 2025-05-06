'use client'

import { AirplaneArrival, AirplaneDeparture } from '@/components/icons/airplane'
import { SearchIcon } from '@/components/icons/search'
import { AirportSkeletonList } from '@/components/pages/homepage/1-Banner/SearchFilter/AirportFilter/AirportSkeleton'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Airport } from '@/constant/types/AirportProps'
import { useSmoothScroll } from '@/hooks/common/useScrollSmooth'
import { useAirportSearch } from '@/hooks/filter-product-hooks/useAirportSearch'
import { dissolve } from '@/lib/animation-setup'
import { capitalizeText } from '@/lib/utils'
import React, { Fragment, useCallback, useEffect } from 'react'

interface AirportSelectorProps {
  selectedAirport?: Airport | null
  onSelectAirport: (airport: Airport) => void
  type?: 'departure' | 'arrival'
}

const AirportSelector: React.FC<AirportSelectorProps> = ({
  selectedAirport,
  onSelectAirport,
  type = 'departure',
}) => {
  // Use the custom hook for airports
  const {
    data: airports,
    loading,
    initialLoading,
    hasMore,
    error,
    searchQuery,
    handleSearchChange,
    loadMore: loadMoreAirports,
  } = useAirportSearch()

  // Use our smooth scroll hook
  const {
    scrollContainerRef,
    scrollToIndex,
    scrollToTop,
    hasScrolled,
    resetScroll,
  } = useSmoothScroll<HTMLDivElement>()

  // Generate unique keys for each airport
  const getUniqueKey = useCallback((airport: Airport) => {
    return `airport-${airport.id}-${airport.code}`
  }, [])

  // Handle airport selection
  const handleAirportSelection = useCallback(
    (airportId: string) => {
      const selectedAirport = airports.find(
        (airport) => airport.id.toString() === airportId
      )
      if (selectedAirport) {
        onSelectAirport(selectedAirport)
      }
    },
    [airports, onSelectAirport]
  )

  // Find the index of the selected airport in the current list
  const findSelectedAirportIndex = useCallback(() => {
    if (!selectedAirport) return -1
    return airports.findIndex((airport) => airport.id === selectedAirport.id)
  }, [airports, selectedAirport])

  // Handle scrolling to the selected airport
  const handleScrollToSelectedAirport = useCallback(() => {
    const selectedIndex = findSelectedAirportIndex()

    // If the selected airport is in the current list and we haven't scrolled yet
    if (selectedIndex !== -1 && !hasScrolled()) {
      // Scroll to the selected airport (60px is approximate height of each item)
      scrollToIndex(selectedIndex, 60, { duration: 0.5 })
    }
    // If the selected airport not found and no search query, try to load more
    else if (!loading && hasMore && !searchQuery && !hasScrolled()) {
      loadMoreAirports()
      // We'll try again after more data loads
    }
  }, [
    findSelectedAirportIndex,
    hasScrolled,
    scrollToIndex,
    searchQuery,
    loading,
    hasMore,
    loadMoreAirports,
  ])

  // Trigger scroll when component mounts or when airports/loading state changes
  useEffect(() => {
    if (!initialLoading && selectedAirport) {
      // Small delay to ensure rendering is complete
      const timer = setTimeout(handleScrollToSelectedAirport, 50)
      return () => clearTimeout(timer)
    }
  }, [
    initialLoading,
    selectedAirport,
    airports,
    loading,
    handleScrollToSelectedAirport,
  ])

  // Reset scroll state when selected airport changes
  useEffect(() => {
    resetScroll()
  }, [selectedAirport?.id, resetScroll])

  // Reset scroll position when search query changes
  useEffect(() => {
    scrollToTop(false) // Reset without animation
  }, [searchQuery, scrollToTop])

  // Render skeleton if initial loading
  if (initialLoading) {
    return (
      <Fragment>
        <div className="flex items-center gap-1">
          {type === 'departure' ? <AirplaneDeparture /> : <AirplaneArrival />}
          <p className="text-l-semibold w-full">
            Pilih Bandara{' '}
            {type === 'departure' ? 'Keberangkatan' : 'Kedatangan'}
          </p>
        </div>
        <div className="relative my-3">
          <Input
            className="py-2"
            placeholder="Cari Bandara"
            endIcon={<SearchIcon size={18} className="text-neutral-900" />}
          />
        </div>
        <div className="scrollbar-hide h-60 overflow-y-auto">
          <AirportSkeletonList count={5} />
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className="flex items-center gap-1">
        {type === 'departure' ? <AirplaneDeparture /> : <AirplaneArrival />}
        <p className="text-l-semibold w-full">
          Pilih Bandara {type === 'departure' ? 'Keberangkatan' : 'Kedatangan'}
        </p>
      </div>

      {/* Search input */}
      <div className="relative my-3">
        <Input
          className="py-2"
          placeholder="Cari Bandara"
          endIcon={<SearchIcon size={18} className="text-neutral-900" />}
          onChange={handleSearchChange}
        />
      </div>

      {/* Results container */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide h-60 max-h-60 overflow-y-auto"
        data-testid="airport-scroll-container"
      >
        {/* Error message */}
        {error && (
          <div className="grid h-60 place-content-center p-3 text-center text-red-500">
            Gagal memuat data bandara. Silakan coba lagi.
          </div>
        )}

        {/* Airport list with infinite scroll */}
        {airports.length > 0 ? (
          <RadioGroup
            value={selectedAirport?.id.toString()}
            onValueChange={handleAirportSelection}
            className="w-full gap-0"
          >
            <InfiniteScroll
              isLoading={loading}
              hasMore={hasMore}
              next={loadMoreAirports}
              threshold={0.8}
            >
              {airports.map((airport: Airport, index: number) => {
                const isSelected = selectedAirport?.id === airport.id
                // Create a truly unique key that includes position in array for additional uniqueness
                const uniqueKey = `${getUniqueKey(airport)}-${index}-${searchQuery ? 'search' : 'normal'}`

                return (
                  <div
                    key={uniqueKey}
                    className={`flex items-center border-b border-neutral-100 py-2.5 hover:bg-neutral-100 ${isSelected ? 'bg-primary-100' : ''} ${dissolve}`}
                    data-selected={isSelected ? 'true' : 'false'}
                  >
                    <RadioGroupItem
                      value={airport.id.toString()}
                      id={`airport-item-${airport.id}-${index}`}
                      className="mr-2 ml-3 h-4 w-4"
                    />
                    <label
                      htmlFor={`airport-item-${airport.id}-${index}`}
                      className="flex flex-1 cursor-pointer flex-col pr-3"
                    >
                      <p className="text-m-regular text-neutral-900">
                        {airport.name} ({airport.code})
                      </p>
                      <p className="text-s-regular text-neutral-500">
                        {capitalizeText(airport.cityName)}
                      </p>
                    </label>
                  </div>
                )
              })}
            </InfiniteScroll>
          </RadioGroup>
        ) : (
          <div className="grid h-60 place-content-center p-3 text-center text-neutral-500">
            {searchQuery
              ? 'Tidak ada bandara yang ditemukan'
              : 'Masukkan nama bandara atau kota'}
          </div>
        )}

        {/* Loading more indicator */}
        {loading && hasMore && <AirportSkeletonList count={3} />}
      </div>
    </Fragment>
  )
}

export default AirportSelector
