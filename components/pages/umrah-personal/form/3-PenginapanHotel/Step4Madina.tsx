'use client'

import { ChevronIcon } from '@/components/icons/chevron'
import { HotelCard } from '@/components/pages/umrah-personal/form/3-PenginapanHotel/HotelCard'
import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { Hotel } from '@/constant/types/HotelProps'
import { STEP_4 } from '@/contexts/umrah-personal/constant'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { useHotelsWithGallery } from '@/hooks/umrah-personal/form/useFetchHotel'
import { dissolve } from '@/lib/animation-setup'
import { cn, isEmpty } from '@/lib/utils'
import { CheckIcon, Search, Star } from 'lucide-react'
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

interface Step4HotelInfoProps {
  form: UseFormReturn<UmrahPersonalFormType>
  data: Hotel[]
  inputSearch: ReactNode
  sortingDropdown: ReactNode
  ratingFilter: ReactNode
  currentSortText: string
  isLoadingHotels: boolean
  searchQuery: string
}

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Rekomendasi' },
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
]

const Step4HotelInfo: React.FC<Step4HotelInfoProps> = ({
  form,
  data,
  inputSearch,
  sortingDropdown,
  ratingFilter,
  currentSortText,
  isLoadingHotels,
  searchQuery,
}) => {
  const { handleNext } = useUmrahPersonal()

  const handleSelectHotel = (hotel: Hotel) => async () => {
    form.setValue(`${STEP_4}.hotelMedina`, {
      id: hotel.id,
      name: hotel.name,
      hotelDestination: hotel.hotelDestination,
      hotelGallery: hotel.hotelGallery ?? [],
    })
    if (handleNext) {
      handleNext(form.trigger, form)
    }
  }

  // Dynamic content based on typeHotel
  const hotelContent = useMemo(() => {
    return {
      title: `Penginapan Madinah`,
      description: `Pilih penginapan Anda saat berada di Madinah.`,
      selectHotelText: `Pilih Hotel Madinah`,
    }
  }, [])

  return (
    <div
      className={`scrollbar-hide mx-auto hidden w-full max-w-5xl max-xl:max-w-3xl`}
      id={`umrah-personal-step-4`}
    >
      <div className="lg:rounded-[24px] lg:border lg:border-neutral-100">
        {/* Form Content */}
        <div className="space-y-6 p-8 pb-6 max-lg:p-4">
          {/* Title and Description */}
          <div className="space-y-2">
            <p className="text-l-medium text-neutral-900">
              {hotelContent.title}
            </p>
            <p className="text-m-regular text-neutral-500">
              {hotelContent.description}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Makkah Hotel Rating */}
            <FormItem className="gap-1">
              <p className="text-s-regular text-neutral-800">Bintang Hotel</p>
              {ratingFilter}

              <FormMessage />
            </FormItem>

            {/* Divider */}
            <div className="h-px w-full bg-neutral-100" />

            {/* Hotel Selection */}
            <div className="space-y-3">
              <p className="text-l-medium">{hotelContent.selectHotelText}</p>

              {/* Search and Sort */}
              <div className="flex justify-between gap-3 max-lg:flex-col">
                <div className="lg:w-1/3">{inputSearch}</div>
                <div className="flex items-center gap-3">
                  <span className="text-m-regular max-lg:hidden">
                    Urutkan Berdasarkan
                  </span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <span className="text-m-regular flex w-fit cursor-pointer items-center justify-between gap-1 rounded-full border border-neutral-200 px-4 py-2.5 text-left text-neutral-900 focus-within:outline-0 max-lg:w-full lg:min-w-[200px]">
                        {currentSortText}
                        <ChevronIcon size={18} />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      sideOffset={8}
                      className="w-full"
                    >
                      {sortingDropdown}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Hotel List */}
              <div className="max-h-[400px] space-y-3 overflow-y-auto pr-3">
                {isLoadingHotels ? (
                  <div className="flex h-[180px] w-full items-center justify-center">
                    <div className="border-primary-500 h-5 w-5 animate-spin rounded-full border-b-2"></div>
                  </div>
                ) : data?.length === 0 ? (
                  searchQuery || ratingFilter ? (
                    <div className="flex h-[180px] w-full items-center justify-center">
                      <p className="text-m-regular text-center text-neutral-500">
                        Tidak ada data yang sesuai dengan pencarian
                      </p>
                    </div>
                  ) : (
                    <div className="flex h-[180px] w-full items-center justify-center">
                      <p className="text-m-regular text-center text-neutral-500">
                        Tidak ada data yang tersedia
                      </p>
                    </div>
                  )
                ) : (
                  data?.map((hotel, index) => (
                    <HotelCard
                      key={`hotel-${hotel.name}-${index}`}
                      hotel={hotel}
                      form={form}
                      onSelect={handleSelectHotel(hotel)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Step4MadinahHotel = ({
  form,
}: {
  form: UseFormReturn<UmrahPersonalFormType>
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Rekomendasi')
  const [rating, setRating] = useState('5')
  const ref = useRef(false)

  const currentSortText = useMemo(() => {
    const option = SORT_OPTIONS.find((option) => option.value === sortBy)
    return option?.label || 'Rekomendasi'
  }, [sortBy])

  const isActive = useCallback(
    (sortValue: string) => {
      return sortBy === sortValue
    },
    [sortBy]
  )
  const handleRatingChange = (selectedRating: string) => {
    setRating(selectedRating)
  }
  // Fetch hotels with galleries
  const {
    hotels: meccaHotels,
    isLoading: isLoadingHotels,
    refetch: refetchHotels,
  } = useHotelsWithGallery({
    hotelQuery: {
      page: 1,
      size: 10,
      cityName: 'MADINAH',
      name: isEmpty(searchQuery) ? undefined : searchQuery,
      rating: Number(rating),
    },
  })

  const debouncedRefetchHotels = useDebouncedCallback(() => {
    if (ref.current) {
      refetchHotels()
    } else {
      ref.current = true
    }
  }, 500)

  useEffect(() => {
    debouncedRefetchHotels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, searchQuery, sortBy])
  return (
    <Step4HotelInfo
      form={form}
      isLoadingHotels={isLoadingHotels}
      data={meccaHotels}
      currentSortText={currentSortText}
      searchQuery={searchQuery}
      inputSearch={
        <Input
          placeholder="Cari Hotel"
          model="compact"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-m-regular"
          endIcon={<Search size={16} color="#30302F" />}
        />
      }
      sortingDropdown={
        <>
          {SORT_OPTIONS.map((option, index) => (
            <div
              key={`sortBy-${option.value}-${index}`}
              onClick={() => setSortBy(option.value)}
            >
              {index > 0 && <div className="mx-1 h-px bg-neutral-100" />}
              <span
                className={`text-m-medium flex w-full cursor-pointer items-center justify-between px-3 py-2.5 hover:bg-neutral-100 ${dissolve} ${isActive(option.value) ? 'text-primary-500 ' : ''}`}
              >
                {option.label}
                {isActive(option.value) && <CheckIcon className="h-4 w-4" />}
              </span>
            </div>
          ))}
        </>
      }
      ratingFilter={
        <FormControl>
          <RadioGroup
            className="flex gap-3 max-lg:flex-col max-lg:gap-1"
            onValueChange={handleRatingChange}
            value={rating} // Now uses state instead of ref.current
          >
            {/* Use labels instead of FormItems for better radio group behavior */}
            <label
              className={cn(
                'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-2 py-2.5',
                rating === '5'
                  ? 'border-primary-500'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              )}
            >
              <RadioGroupItem value="5" />
              <p className="text-s-regular flex flex-row items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    color="#FFC100"
                    className="fill-primary-500"
                  />
                ))}
              </p>
            </label>
            <label
              className={cn(
                'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-2 py-2.5',
                rating === '4'
                  ? 'border-primary-500'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              )}
            >
              <RadioGroupItem value="4" />
              <p className="text-s-regular flex flex-row items-center gap-1.5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    color="#FFC100"
                    className="fill-primary-500"
                  />
                ))}
              </p>
            </label>
            <label
              className={cn(
                'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-2 py-2.5',
                rating === '3'
                  ? 'border-primary-500'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              )}
            >
              <RadioGroupItem value="3" />
              <p className="text-s-regular flex flex-row items-center gap-1.5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    color="#FFC100"
                    className="fill-primary-500"
                  />
                ))}
              </p>
            </label>
          </RadioGroup>
        </FormControl>
      }
    />
  )
}

export default Step4MadinahHotel
