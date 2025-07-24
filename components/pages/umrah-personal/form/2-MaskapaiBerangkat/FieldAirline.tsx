import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Airline } from '@/constant/types/AirlineProps'
import { useAirlineSearch } from '@/hooks/filter-product-hooks/useAirlineSearch'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

// Define props for the component
export interface AirportOption {
  id: number
  code: string
  name: string
  countryName: string
  logo?: string
}

interface AirlineSelectionProps {
  field: {
    value?: AirportOption
    onChange: (airline: AirportOption) => void
  }
  showSearch?: boolean
  pageSize?: number
  flightRoute?: string
}

const AirlineSelection: React.FC<AirlineSelectionProps> = ({
  field,
  showSearch = true,
  flightRoute,
  pageSize = 6,
}) => {
  const {
    data: airlines,
    loading,
    initialLoading,
    hasMore,
    error,
    searchQuery,
    handleSearchChange,
    loadMore: handleLoadMore,
  } = useAirlineSearch({
    pageSize,
    version: 'v1',
    isTransit: flightRoute === 'transit',
  })

  const handleValueChange = (value: string) => {
    const selectedAirline = airlines.find(
      (airline) => airline.id.toString() === value
    )
    if (selectedAirline) {
      field.onChange({
        id: selectedAirline.id,
        code: selectedAirline.code,
        name: selectedAirline.name,
        logo: selectedAirline.logo ?? '',
        countryName: selectedAirline.countryName,
      })
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <p>Error loading airlines: {error.message}</p>
      </div>
    )
  }
  return (
    <div className={'space-y-4 overflow-y-auto px-2'}>
      {/* Search Input */}
      {showSearch && (
        <div className="relative">
          <Input
            type="text"
            placeholder="Search airlines..."
            defaultValue={searchQuery}
            onChange={handleSearchChange}
            className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-neutral-200 px-4 py-2 focus:ring-2 focus:outline-none"
          />
          {loading && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
              <div className="border-primary-500 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {initialLoading ? (
        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse flex-col items-center gap-2 rounded-lg border border-neutral-200 p-4"
            >
              <div className="h-12 w-16 rounded bg-neutral-200"></div>
              <div className="h-3 w-16 rounded bg-neutral-200"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {airlines.length > 0 ? (
            <RadioGroup
              onValueChange={handleValueChange}
              value={field.value?.id?.toString()}
              className="grid grid-cols-3 gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1"
            >
              {airlines.map((airline: Airline) => (
                <label
                  key={airline.id}
                  className={cn(
                    'relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border-1 px-8 py-2 transition-colors',
                    field.value?.id === airline.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  )}
                >
                  <div className="absolute top-2 left-2">
                    <RadioGroupItem
                      value={airline.id.toString()}
                      className="h-4 w-4"
                    />
                  </div>

                  <p className="text-m-regular text-center">{airline.name}</p>
                  <Image
                    src={airline.logo || '/images/no-image.png'}
                    alt={airline.name}
                    width={64}
                    height={48}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      // Fallback for broken images
                      const target = e.target as HTMLImageElement
                      target.src = `/images/no-image.png`
                    }}
                    unoptimized={airline.logo ? false : true}
                  />
                </label>
              ))}
            </RadioGroup>
          ) : (
            <div className="flex items-center justify-center p-8 text-neutral-500">
              <p>No airlines found{searchQuery && ` for "${searchQuery}"`}</p>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && airlines.length > 0 && (
            <div className="flex justify-center">
              <Button
                onClick={handleLoadMore}
                disabled={loading}
                className={cn(
                  'rounded-lg border border-neutral-200 bg-white px-6 py-2 text-neutral-700 transition-colors hover:bg-neutral-50',
                  loading && 'cursor-not-allowed opacity-50'
                )}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent"></div>
                    Loading...
                  </div>
                ) : (
                  'Load More Airlines'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AirlineSelection
