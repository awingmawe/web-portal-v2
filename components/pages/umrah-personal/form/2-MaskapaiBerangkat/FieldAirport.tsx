import { SearchIcon } from '@/components/icons/search'
import { AirportSkeletonList } from '@/components/pages/homepage/1-Banner/SearchFilter/AirportFilter/AirportSkeleton'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Airport } from '@/constant/types/AirportProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
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
  type: 'departure' | 'arrival'
  classNameTrigger?: string
  classNameContentPopover?: string
  classNameContentDrawer?: string
}

export const FieldAirport = ({
  field,
  placeholder,
  type,
  classNameTrigger,
  classNameContentPopover,
  classNameContentDrawer,
}: FieldAirportProps) => {
  const { lg: isMobile } = useTailwindBreakpoint()
  const [isOpen, setIsOpen] = useState(false)
  const [tempSelection, setTempSelection] = useState<AirportOption | undefined>(
    field.value
  )

  const {
    data: airports,
    loading: airportLoading,
    hasMore: airportHasMore,
    error,
    searchQuery: airportSearchQuery,
    handleSearchChange: handleAirportSearchChange,
    loadMore: loadMoreAirports,
  } = useAirportSearch({ version: 'v1' })

  // Convert Airport to AirportOption
  const convertAirportToOption = (airport: Airport): AirportOption => ({
    id: airport.id,
    code: airport.code,
    name: airport.name,
    cityName: airport.cityName,
  })

  // Handle airport selection for popover (immediate)
  const handleAirportSelectPopover = (airport: Airport) => {
    const airportOption = convertAirportToOption(airport)
    field.onChange(airportOption)
    setIsOpen(false)
  }

  // Handle airport selection for drawer (temporary)
  const handleAirportSelectDrawer = (airport: Airport) => {
    const airportOption = convertAirportToOption(airport)
    setTempSelection(airportOption)
  }

  // Handle drawer confirm
  const handleDrawerConfirm = () => {
    if (tempSelection) {
      field.onChange(tempSelection)
    }
    setIsOpen(false)
  }

  // Handle drawer cancel
  const handleDrawerCancel = () => {
    setTempSelection(field.value)
    setIsOpen(false)
  }

  const hasValue = (field.value?.id ?? 0) > 0

  const dataFiltered =
    type === 'departure'
      ? airports.filter((airport) => ['MED', 'JED'].includes(airport.code))
      : (airports.filter((airport) => !['MED', 'JED'].includes(airport.code)) ??
        [])

  // Common trigger component
  const triggerComponent = (
    <div className="flex w-full items-center justify-between">
      <p
        className={`text-s-regular ${
          hasValue ? 'text-neutral-800' : 'text-neutral-300'
        }`}
      >
        {hasValue ? `${field.value?.name} (${field.value?.code})` : placeholder}
      </p>
      <ChevronDown
        size={18}
        className={cn(
          'shrink-0 transition-transform',
          isOpen && 'rotate-180',
          hasValue ? 'text-primary-500' : 'text-neutral-300'
        )}
      />
    </div>
  )

  // Common content component
  const contentComponent = (
    <div className="space-y-3 p-4">
      <p className="text-l-semibold text-neutral-900 capitalize">
        {placeholder}
      </p>

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
        {error && (
          <div className="grid h-40 place-content-center p-3 text-center text-red-500">
            <p className="text-sm">
              Gagal memuat data bandara. Silakan coba lagi.
            </p>
          </div>
        )}

        {/* Airport list with infinite scroll */}
        {airports.length > 0 ? (
          <InfiniteScroll
            isLoading={airportLoading}
            hasMore={airportHasMore}
            next={loadMoreAirports}
            threshold={0.8}
          >
            {dataFiltered.map((airport: Airport) => {
              const isSelected = isMobile
                ? tempSelection?.id === airport.id
                : field.value?.id === airport.id

              return (
                <div
                  key={`airport-${airport.id}`}
                  className={cn(
                    'flex cursor-pointer items-center border-b border-neutral-100 px-3 py-2.5 transition-colors hover:bg-neutral-100',
                    dissolve,
                    isSelected && 'bg-primary-100'
                  )}
                  onClick={() =>
                    isMobile
                      ? handleAirportSelectDrawer(airport)
                      : handleAirportSelectPopover(airport)
                  }
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
              )
            })}
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
        {airportLoading && airportHasMore && <AirportSkeletonList count={3} />}
      </div>
    </div>
  )

  // Common trigger styling
  const triggerClassName = cn(
    'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-4 py-2.5',
    hasValue
      ? 'border-primary-500'
      : 'border-neutral-200 bg-white hover:border-neutral-300',
    classNameTrigger
  )

  return !isMobile ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className={triggerClassName}>
        {triggerComponent}
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-[400px] p-0', classNameContentPopover)}
        align="start"
      >
        {contentComponent}
      </PopoverContent>
    </Popover>
  ) : (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className={triggerClassName}>
        {triggerComponent}
      </DrawerTrigger>
      <DrawerContent className={cn(classNameContentDrawer, 'z-99')}>
        <DrawerTitle className="hidden"></DrawerTitle>
        <div className="w-full">{contentComponent}</div>
        <DrawerFooter>
          <div className="flex items-center justify-between gap-3">
            <DrawerClose
              onClick={handleDrawerCancel}
              className="border-primary-500 text-s-regular w-full rounded-full border-2 py-3"
            >
              Batal
            </DrawerClose>
            <DrawerClose
              onClick={handleDrawerConfirm}
              className="bg-primary-500 text-s-regular w-full rounded-full py-3"
            >
              Pilih
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
