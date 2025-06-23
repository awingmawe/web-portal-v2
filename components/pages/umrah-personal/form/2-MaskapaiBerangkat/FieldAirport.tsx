import { SearchIcon } from '@/components/icons/search'
import { AirportSkeletonList } from '@/components/pages/homepage/1-Banner/SearchFilter/AirportFilter/AirportSkeleton'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Airport } from '@/constant/types/AirportProps'
import { useAirportSearch } from '@/hooks/filter-product-hooks/useAirportSearch'
import { dissolve } from '@/lib/animation-setup'
import { capitalizeText, cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export interface AirportOption {
  id: number
  code: string
  name: string
  cityName: string
}

interface FieldAirportProps {
  field: {
    value: AirportOption | undefined
    onChange: (value: AirportOption) => void
  }
  placeholder: string
}

export const FieldAirport = ({ field, placeholder }: FieldAirportProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    data: airports,
    loading: airportLoading,
    hasMore: airportHasMore,
    error,
    searchQuery: airportSearchQuery,
    handleSearchChange: handleAirportSearchChange,
    loadMore: loadMoreAirports,
  } = useAirportSearch()

  // Convert Airport to AirportOption
  const convertAirportToOption = (airport: Airport): AirportOption => ({
    id: airport.id,
    code: airport.code,
    name: airport.name,
    cityName: airport.cityName,
  })

  // Handle airport selection
  const handleAirportSelect = (airport: Airport) => {
    const airportOption = convertAirportToOption(airport)
    field.onChange(airportOption)
    setIsOpen(false) // Close the popover after selection
  }

  const hasValue = (field.value?.id ?? 0) > 0

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        asChild
        className={cn(
          'flex w-full cursor-pointer items-center justify-between gap-2 rounded-full border px-4 py-2.5 text-left',
          hasValue
            ? 'border-primary-500 bg-primary-50'
            : 'border-neutral-200 bg-white hover:border-neutral-300'
        )}
      >
        <p
          className={`text-s-regular ${
            hasValue ? 'text-neutral-800' : 'text-neutral-300'
          }`}
        >
          {hasValue
            ? `${field.value?.name} (${field.value?.code})`
            : placeholder}
          <ChevronDown
            size={18}
            className={cn(
              'shrink-0 transition-transform',
              isOpen && 'rotate-180',
              hasValue ? 'text-primary-500' : 'text-neutral-300'
            )}
          />
        </p>
      </PopoverTrigger>

      <PopoverContent className="w-[400px] p-4" align="start">
        <div className="space-y-3">
          <p className="text-l-semibold text-neutral-900">Pilih Bandara</p>

          {/* Search input */}
          <Input
            className="py-2"
            placeholder="Cari Bandara"
            endIcon={<SearchIcon size={18} className="text-neutral-900" />}
            onChange={handleAirportSearchChange}
          />

          {/* Results container */}
          <div className="scrollbar-hide max-h-60 overflow-y-auto">
            {/* Error message */}
            {error ? (
              <div className="grid h-40 place-content-center p-3 text-center text-red-500">
                <p className="text-sm">
                  Gagal memuat data bandara. Silakan coba lagi.
                </p>
              </div>
            ) : (
              <>
                {/* Airport list with infinite scroll */}
                {airports.length > 0 ? (
                  <InfiniteScroll
                    isLoading={airportLoading}
                    hasMore={airportHasMore}
                    next={loadMoreAirports}
                    threshold={0.8}
                  >
                    {airports.map((airport: Airport) => (
                      <div
                        key={`airport-${airport.id}`}
                        className={cn(
                          'flex cursor-pointer items-center border-b border-neutral-100 px-3 py-2.5 transition-colors hover:bg-neutral-100',
                          dissolve,
                          field.value?.id === airport.id && 'bg-primary-100'
                        )}
                        onClick={() => handleAirportSelect(airport)}
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
                  <div className="grid h-40 place-content-center p-3 text-center text-neutral-500">
                    <p className="text-sm">
                      {airportSearchQuery
                        ? 'Tidak ada bandara yang ditemukan'
                        : 'Masukkan nama bandara atau kota'}
                    </p>
                  </div>
                )}

                {/* Loading more indicator */}
                {airportLoading && airportHasMore && (
                  <AirportSkeletonList count={3} />
                )}
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
