import { AirplaneWithBorder } from '@/components/icons/airplane'
import { SearchIcon } from '@/components/icons/search'
import { TransitIcon } from '@/components/icons/transit'
import { AirlineSkeletonList } from '@/components/pages/homepage/1-Banner/SearchFilter/AirlineFilter/AirlineSkeleton'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Airline } from '@/constant/types/AirlineProps'
import { useSmoothScroll } from '@/hooks/common/useScrollSmooth'
import { useAirlineSearch } from '@/hooks/filter-product-hooks'
import { dissolve } from '@/lib/animation-setup'
import { isEmpty } from '@/lib/utils'
import Image from 'next/image'
import React, { Fragment, useCallback, useEffect } from 'react'

interface AirlineSearchProps {
  onSelectAirline: (airline: Airline) => void
  selectedAirline?: Airline | null
}
const IS_NOT_TRANSIT = ['GA', 'SV', 'JT']

const AirlineSelector: React.FC<AirlineSearchProps> = ({
  onSelectAirline,
  selectedAirline,
}) => {
  // Use the custom hook for  airlines
  const {
    data: airlines,
    loading: airlineLoading,
    initialLoading,
    hasMore: airlineHasMore,
    error,
    searchQuery: airlineSearchQuery,
    handleSearchChange: handleAirlineSearchChange,
    loadMore: loadMoreAirline,
  } = useAirlineSearch()

  // Use our smooth scroll hook
  const {
    scrollContainerRef,
    scrollToIndex,
    scrollToTop,
    hasScrolled,
    resetScroll,
  } = useSmoothScroll<HTMLDivElement>()

  // Handle airline selection
  const handleAirlineSelection = useCallback(
    (airlineId: string) => {
      const selectedAirline = airlines.find(
        (airline) => airline.id.toString() === airlineId
      )
      if (selectedAirline) {
        onSelectAirline(selectedAirline)
      }
    },
    [airlines, onSelectAirline]
  )

  // Find the index of the selected airline in the current list
  const findSelectedAirportIndex = useCallback(() => {
    if (!selectedAirline) return -1
    return airlines.findIndex((airline) => airline.id === selectedAirline.id)
  }, [airlines, selectedAirline])

  // Handle scrolling to the selected airline
  const handleScrollToSelectedAirport = useCallback(() => {
    const selectedIndex = findSelectedAirportIndex()

    // If the selected airline is in the current list and we haven't scrolled yet
    if (selectedIndex !== -1 && !hasScrolled()) {
      // Scroll to the selected airline (60px is approximate height of each item)
      scrollToIndex(selectedIndex, 45, { duration: 0.5 })
    }
    // If the selected airline not found and no search query, try to load more
    else if (
      !initialLoading &&
      airlineHasMore &&
      !airlineSearchQuery &&
      !hasScrolled()
    ) {
      loadMoreAirline()
      // We'll try again after more data loads
    }
  }, [
    findSelectedAirportIndex,
    hasScrolled,
    initialLoading,
    airlineHasMore,
    airlineSearchQuery,
    scrollToIndex,
    loadMoreAirline,
  ])

  // Trigger scroll when component mounts or when airlines/loading state changes
  useEffect(() => {
    if (!initialLoading && selectedAirline) {
      // Small delay to ensure rendering is complete
      const timer = setTimeout(handleScrollToSelectedAirport, 50)
      return () => clearTimeout(timer)
    }
  }, [initialLoading, selectedAirline, airlines, handleScrollToSelectedAirport])

  // Reset scroll state when selected airline changes
  useEffect(() => {
    resetScroll()
  }, [selectedAirline?.id, resetScroll])

  // Reset scroll position when search query changes
  useEffect(() => {
    scrollToTop(false) // Reset without animation
  }, [scrollToTop])

  // Render skeleton if initial loading
  if (initialLoading) {
    return (
      <Fragment>
        <div className="flex items-center gap-1">
          <AirplaneWithBorder />
          <p className="text-l-semibold w-full">Pilih Maskapai</p>
        </div>
        <div className="relative my-3">
          <Input
            className="py-2"
            placeholder="Cari Maskapai"
            endIcon={<SearchIcon size={18} className="text-neutral-900" />}
          />
        </div>
        <div className="scrollbar-hide h-60 overflow-y-auto">
          <AirlineSkeletonList count={5} />
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className="flex items-center gap-1">
        <AirplaneWithBorder />
        <p className="text-l-semibold w-full">Pilih Maskapai</p>
      </div>

      {/* Search input */}
      <div className="relative my-3">
        <Input
          className="py-2"
          placeholder="Cari Maskapai"
          endIcon={<SearchIcon size={18} className="text-neutral-900" />}
          onChange={handleAirlineSearchChange}
        />
      </div>

      {/* Results container */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide h-60 max-h-60 overflow-y-auto"
        data-testid="airline-scroll-container"
      >
        {/* Error message */}
        {error && (
          <div className="grid h-60 place-content-center p-3 text-center text-red-500">
            Gagal memuat data maskapai. Silakan coba lagi.
          </div>
        )}

        {/* airline list with infinite scroll */}
        {airlines.length > 0 ? (
          <RadioGroup
            value={selectedAirline?.id.toString()}
            onValueChange={handleAirlineSelection}
            className="w-full gap-0"
          >
            <InfiniteScroll
              isLoading={airlineLoading}
              hasMore={airlineHasMore}
              next={loadMoreAirline}
              threshold={0.8}
            >
              {airlines.map((airline: Airline, index: number) => (
                <div
                  key={`airline-${airline.id}`}
                  className={`flex cursor-pointer items-center justify-between gap-2.5 border-b border-neutral-100 py-2.5 hover:bg-neutral-100 ${dissolve} ${
                    selectedAirline?.id === airline.id ? 'bg-primary-100' : ''
                  }`}
                  onClick={() => onSelectAirline(airline)}
                >
                  <RadioGroupItem
                    value={airline.id.toString()}
                    id={`airline-item-${airline.id}-${index}`}
                    className="mr-2 ml-3 h-4 w-4"
                  />
                  {!isEmpty(airline.logo) && (
                    <Image
                      src={airline.logo || ''}
                      width={32}
                      height={32}
                      alt={`logo-${airline.name}`}
                      style={{
                        aspectRatio: '1/1',
                        objectFit: 'contain',
                      }}
                    />
                  )}
                  <div className="flex flex-2 flex-col">
                    <p className="text-m-regular text-neutral-900">
                      {airline.name} ({airline.code})
                    </p>
                    {IS_NOT_TRANSIT.includes(airline.code) && (
                      <p className="text-s-regular text-neutral-500">
                        1x transit
                      </p>
                    )}
                  </div>
                  {IS_NOT_TRANSIT.includes(airline.code) && (
                    <TransitIcon size={20} />
                  )}
                </div>
              ))}
            </InfiniteScroll>
          </RadioGroup>
        ) : (
          <div className="grid h-60 place-content-center p-3 text-center text-neutral-500">
            {airlineSearchQuery
              ? 'Tidak ada maskapai yang ditemukan'
              : 'Masukkan nama maskapai atau kota'}
          </div>
        )}

        {/* Loading more indicator */}
        {airlineLoading && airlineHasMore && <AirlineSkeletonList count={3} />}
      </div>
    </Fragment>
  )
}

export default AirlineSelector
