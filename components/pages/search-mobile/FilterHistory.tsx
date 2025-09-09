import { AirlineIcon } from '@/components/icons/airline'
import { BuildingIcon } from '@/components/icons/building'
import { Calendar3 } from '@/components/icons/calendar'
import { SearchIconStatus } from '@/components/icons/search'
import { StarIconPrimary } from '@/components/icons/star'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useFilterHistory } from '@/hooks/common/useFilterHistory'
import { format } from 'date-fns'
import { PlaneTakeoff } from 'lucide-react'

interface FilterHistoryProps {
  packageType?: 'umrah' | 'hajj'
}

export function FilterHistory({ packageType = 'umrah' }: FilterHistoryProps) {
  const { getHistoryByPackageType } = useFilterHistory()
  const {
    setHotelStars,
    setDateRange,
    setDepartureAirport,
    setArrivalAirport,
    setAirline,
  } = useFilterProduct()

  // Get filtered history based on package type
  const relevantHistory = getHistoryByPackageType(packageType)

  // Apply a filter history item
  const applyHistoryItem = (historyItem: any) => {
    const savedFilters = historyItem.filters

    // Apply hotel stars if present
    if (savedFilters.hotelStars) {
      setHotelStars(savedFilters.hotelStars)
    }

    // Apply date range only for umrah packages
    if (packageType === 'umrah' && savedFilters.dateRange) {
      setDateRange(savedFilters.dateRange)
    }

    // Apply departure airport if present
    if (savedFilters.departureAirport) {
      setDepartureAirport(savedFilters.departureAirport)
    }

    // Apply arrival airport if present
    if (savedFilters.arrivalAirport) {
      setArrivalAirport(savedFilters.arrivalAirport)
    }

    // Apply airline if present
    if (savedFilters.airline) {
      setAirline(savedFilters.airline)
    }
  }

  // Render star icons based on the star count
  const renderStars = (starCount: number) => {
    return Array.from({ length: starCount }).map((_, index) => (
      <StarIconPrimary key={`star-${index}`} size={13} />
    ))
  }

  const formatDate = (date: Date) => {
    return format(date, 'dd MMM yyyy')
  }

  if (relevantHistory.length === 0) {
    return null
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-1">
        <SearchIconStatus />
        <p className="text-m-semibold text-neutral-900">
          Terakhir Dicari {packageType === 'hajj' ? 'Haji' : 'Umrah'}
        </p>
      </div>

      {/* Horizontal scrollable container */}
      <div className="scrollbar-hide -mx-4 overflow-x-auto px-4">
        <div className="flex flex-row gap-3">
          {relevantHistory.map((historyItem) => (
            <div
              key={historyItem.id}
              className="w-[280px] flex-shrink-0 cursor-pointer rounded-xl border border-neutral-100 p-3 transition-colors hover:bg-neutral-50"
              onClick={() => applyHistoryItem(historyItem)}
            >
              {/* Hotel */}
              <div className="flex items-center gap-1 py-1">
                <BuildingIcon size={16} color="text-neutral-900" />
                <span className="text-s-regular text-neutral-900">
                  {historyItem.filters.hotelStars ? (
                    <div className="flex">
                      {renderStars(historyItem.filters.hotelStars)}
                    </div>
                  ) : (
                    'Seluruh Kelas Hotel'
                  )}
                </span>
              </div>

              {/* Date - Only show for umrah packages */}
              {packageType === 'umrah' && (
                <div className="flex items-center gap-1 py-1">
                  <Calendar3 size={16} />
                  <span className="text-s-regular truncate text-neutral-900">
                    {historyItem.filters.dateRange?.from
                      ? `${formatDate(historyItem.filters.dateRange.from)} → ${
                          historyItem.filters.dateRange.to
                            ? formatDate(historyItem.filters.dateRange.to)
                            : 'Seluruh Tanggal'
                        }`
                      : 'Seluruh Tanggal'}
                  </span>
                </div>
              )}

              {/* Airport */}
              <div className="flex items-center gap-1 py-1">
                <PlaneTakeoff size={16} />
                <span className="text-s-regular text-neutral-900">
                  {historyItem.filters.departureAirport
                    ? `${historyItem.filters.departureAirport.code} → `
                    : 'Seluruh Keberangkatan → '}
                  {historyItem.filters.arrivalAirport
                    ? historyItem.filters.arrivalAirport.code
                    : 'Seluruh Kedatangan'}
                </span>
              </div>

              {/* Airline */}
              <div className="flex items-center gap-1 py-1">
                <AirlineIcon size={16} />
                <span className="text-s-regular truncate text-neutral-900">
                  {historyItem.filters.airline
                    ? historyItem.filters.airline.name
                    : 'Seluruh Maskapai'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
