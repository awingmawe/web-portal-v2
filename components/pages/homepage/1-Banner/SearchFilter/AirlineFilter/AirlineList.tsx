import { SearchIcon } from '@/components/icons/search'
import { TransitIcon } from '@/components/icons/transit'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import { Airline } from '@/constant/types/AirlineProps'
import { useAirlineSearch } from '@/hooks/filter-product-hooks/useAirlineSearch'
import { dissolve } from '@/lib/animation-setup'
import { isEmpty } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { AirlineSkeletonList } from './AirlineSkeleton'

interface AirlineSearchProps {
  onSelectAirline: (airline: Airline) => void
  selectedAirline?: Airline | null
  isNotTransit: string[]
}

const AirlineList: React.FC<AirlineSearchProps> = ({
  onSelectAirline,
  selectedAirline,
  isNotTransit,
}) => {
  // Use the custom hook for  airports
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

  // Render skeleton if initial loading
  if (initialLoading) {
    return (
      <div className="w-[320px] px-4 pt-4">
        <Input
          className="mb-3 py-2"
          placeholder="Cari Maskapai"
          endIcon={<SearchIcon size={18} className="text-neutral-900" />}
        />
        <div className="scrollbar-hide h-60 overflow-y-auto">
          <AirlineSkeletonList count={5} />
        </div>
      </div>
    )
  }

  return (
    <div className="w-[320px] px-4 pt-4">
      {/* Maskapai List */}
      {/* Search input */}
      <Input
        className="mb-3 py-2"
        placeholder="Cari Maskapai"
        endIcon={<SearchIcon size={18} className="text-neutral-900" />}
        onChange={handleAirlineSearchChange}
      />

      {/* Results container */}
      <div className="scrollbar-hide h-60 max-h-60 overflow-y-auto">
        {/* Error message */}
        {error && (
          <div className="grid h-60 place-content-center p-3 text-center text-red-500">
            Gagal memuat data maskapai. Silakan coba lagi.
          </div>
        )}

        {/* Airport list with infinite scroll */}
        {airlines.length > 0 ? (
          <InfiniteScroll
            isLoading={airlineLoading}
            hasMore={airlineHasMore}
            next={loadMoreAirline}
            threshold={0.8}
          >
            {airlines.map((airline: Airline) => (
              <div
                key={`airline-${airline.id}`}
                className={`flex cursor-pointer items-center justify-between gap-2.5 border-b border-neutral-100 px-3 py-2.5 hover:bg-neutral-100 ${dissolve} ${
                  selectedAirline?.id === airline.id ? 'bg-primary-100' : ''
                }`}
                onClick={() => onSelectAirline(airline)}
              >
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
                  {!isNotTransit.includes(airline.code) && (
                    <p className="text-s-regular text-neutral-500">
                      1x transit
                    </p>
                  )}
                </div>
                {!isNotTransit.includes(airline.code) && (
                  <TransitIcon size={20} />
                )}
              </div>
            ))}
          </InfiniteScroll>
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
    </div>
  )
}

export default AirlineList
