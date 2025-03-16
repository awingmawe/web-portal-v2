import { SearchIcon } from '@/components/icons/search'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import { Airport } from '@/constant/types/AirportProps'
import { useAirportSearch } from '@/hooks/filter-product-hooks'
import { dissolve } from '@/lib/animation-setup'
import { capitalizeText } from '@/lib/utils'
import React from 'react'
import { AirportSkeletonList } from './AirportSkeleton'

interface AirportSearchProps {
  onSelectDepartureAirport: (airport: Airport) => void
  onSelectArrivalAirport: (airport: Airport) => void
  selectedDepartureAirport?: Airport | null
  selectedArrivalAirport?: Airport | null
}

const AirportSearch: React.FC<AirportSearchProps> = ({
  onSelectDepartureAirport,
  onSelectArrivalAirport,
  selectedDepartureAirport,
  selectedArrivalAirport,
}) => {
  // Use the custom hook for departure airports
  const {
    data: departureAirports,
    loading: departureLoading,
    initialLoading,
    hasMore: departureHasMore,
    error,
    searchQuery: departureSearchQuery,
    handleSearchChange: handleDepartureSearchChange,
    loadMore: loadMoreDepartureAirports,
  } = useAirportSearch()

  // Use the custom hook for arrival airports
  const {
    data: arrivalAirports,
    loading: arrivalLoading,
    hasMore: arrivalHasMore,
    searchQuery: arrivalSearchQuery,
    handleSearchChange: handleArrivalSearchChange,
    loadMore: loadMoreArrivalAirports,
  } = useAirportSearch()

  // Render skeleton if initial loading
  if (initialLoading) {
    return (
      <div className="w-full px-4 pt-4">
        <div className="flex flex-row">
          <div className="w-full flex-1">
            <p className="text-l-semibold text-neutral-900">
              Bandara Keberangkatan
            </p>
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
          </div>
          <div className="mx-6 border border-[#E8E8E8]" />
          <div className="w-full flex-1">
            <p className="text-l-semibold text-neutral-900">
              Bandara Kedatangan
            </p>
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
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 pt-4">
      <div className="flex flex-row">
        {/* Bandara Keberangkatan List */}
        <div className="flex-1">
          <p className="text-l-semibold text-neutral-900">
            Bandara Keberangkatan
          </p>
          {/* Search input */}
          <div className="relative my-3">
            <Input
              className="py-2"
              placeholder="Cari Bandara"
              endIcon={<SearchIcon size={18} className="text-neutral-900" />}
              onChange={handleDepartureSearchChange}
            />
          </div>

          {/* Results container */}
          <div className="scrollbar-hide h-60 max-h-60 overflow-y-auto">
            {/* Error message */}
            {error && (
              <div className="grid h-60 place-content-center p-3 text-center text-red-500">
                Gagal memuat data bandara. Silakan coba lagi.
              </div>
            )}

            {/* Airport list with infinite scroll */}
            {departureAirports.length > 0 ? (
              <InfiniteScroll
                isLoading={departureLoading}
                hasMore={departureHasMore}
                next={loadMoreDepartureAirports}
                threshold={0.8}
              >
                {departureAirports.map((airport: Airport) => (
                  <div
                    key={`departure-airport-${airport.id}`}
                    className={`flex cursor-pointer items-center border-b border-neutral-100 px-3 py-2.5 hover:bg-neutral-100 ${dissolve} ${
                      selectedDepartureAirport?.id === airport.id
                        ? 'bg-primary-100'
                        : ''
                    }`}
                    onClick={() => onSelectDepartureAirport(airport)}
                  >
                    <div className="flex flex-col">
                      <p className="text-m-regular text-neutral-900">
                        {airport.name} ({airport.code})
                      </p>
                      <p className="text-s-regular text-neutral-500">
                        {capitalizeText(airport.cityName)}
                      </p>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            ) : (
              <div className="grid h-60 place-content-center p-3 text-center text-neutral-500">
                {departureSearchQuery
                  ? 'Tidak ada bandara yang ditemukan'
                  : 'Masukkan nama bandara atau kota'}
              </div>
            )}

            {/* Loading more indicator */}
            {departureLoading && departureHasMore && (
              <AirportSkeletonList count={3} />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 border border-[#E8E8E8]" />

        {/* Bandara Kedatangan List */}
        <div className="flex-1">
          <p className="text-l-semibold text-neutral-900">Bandara Kedatangan</p>
          {/* Search input */}
          <div className="relative my-3">
            <Input
              className="py-2"
              placeholder="Cari Bandara"
              endIcon={<SearchIcon size={18} className="text-neutral-900" />}
              onChange={handleArrivalSearchChange}
            />
          </div>

          {/* Results container */}
          <div className="scrollbar-hide h-60 overflow-y-auto">
            {/* Error message */}
            {error && (
              <div className="grid h-60 place-content-center p-3 text-center text-red-500">
                Gagal memuat data bandara. Silakan coba lagi.
              </div>
            )}

            {/* Airport list with infinite scroll */}
            {arrivalAirports.length > 0 ? (
              <InfiniteScroll
                isLoading={arrivalLoading}
                hasMore={arrivalHasMore}
                next={loadMoreArrivalAirports}
                threshold={0.8}
              >
                {arrivalAirports.map((airport: Airport) => (
                  <div
                    key={`arrival-airport-${airport.id}`}
                    className={`flex cursor-pointer items-center border-b border-neutral-100 px-3 py-2.5 hover:bg-neutral-100 ${dissolve} ${
                      selectedArrivalAirport?.id === airport.id
                        ? 'bg-primary-100'
                        : ''
                    }`}
                    onClick={() => onSelectArrivalAirport(airport)}
                  >
                    <div className="flex flex-col">
                      <p className="text-m-regular text-neutral-900">
                        {airport.name} ({airport.code})
                      </p>
                      <p className="text-s-regular text-neutral-500">
                        {capitalizeText(airport.cityName)}
                      </p>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            ) : (
              <div className="grid h-60 place-content-center p-3 text-center text-neutral-500">
                {arrivalSearchQuery
                  ? 'Tidak ada bandara yang ditemukan'
                  : 'Masukkan nama bandara atau kota'}
              </div>
            )}

            {/* Loading more indicator */}
            {arrivalLoading && arrivalHasMore && (
              <AirportSkeletonList count={3} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirportSearch
