/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { SearchIcon } from '@/components/icons/search'
import { tabunganFormSchema } from '@/components/pages/banking/1-Tabungan/TabunganForm'
import { FormLabel, FormMessage } from '@/components/ui/form'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { GenericResponse } from '@/constant/types/GeneralProps'
// import { formSchemaManifest } from '@/constant/schema/manifest'
import { City } from '@/constant/types/LocationProps'
import { dissolve } from '@/lib/animation-setup'
import { capitalizeText } from '@/lib/utils'
import { getKota } from '@/services/identity-service'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import { z } from 'zod'

interface KotaAsalComboboxProps {
  control: Control<z.infer<typeof tabunganFormSchema>>
}

// Create a skeleton component for cities
const CitySkeletonList = ({ count = 5 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={`city-skeleton-${index}`}
        className="flex animate-pulse items-center border-b border-neutral-100 px-3 py-2.5"
      >
        <div className="flex flex-col gap-1">
          <div className="h-4 w-36 rounded bg-neutral-200"></div>
          <div className="h-3 w-24 rounded bg-neutral-100"></div>
        </div>
      </div>
    ))}
  </>
)

export default function KotaAsalCombobox({ control }: KotaAsalComboboxProps) {
  const fetchCity = useCallback(
    async (
      page: number,
      searchQuery: string,
      provinceId: any
    ): Promise<GenericResponse<City> | null> => {
      try {
        const data = await getKota({
          provinceId: provinceId,
          page: page,
          size: 20,
          orderBy: 'name',
          order: 'desc',
          [`name:likeLower`]: searchQuery ? `%${searchQuery}%` : undefined,
        })
        return data
      } catch (error) {
        console.error('Error fetching city:', error)
        return null
      }
    },
    []
  )
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300)
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [error, setError] = useState<Error | null>(null)

  // Use useController for provinceId to get selected province
  const { field: provinceIdField } = useController({
    name: 'provinceId',
    control,
  })

  // Use useController to access field value and methods for cityId
  const { field: cityIdField, fieldState } = useController({
    name: 'cityId',
    control,
  })

  // Use useController for cityName
  const { field: cityNameField } = useController({
    name: 'cityName',
    control,
  })

  // Check if province is selected
  const isProvinceSelected = Boolean(provinceIdField.value)

  // // Reset city selection when province changes
  // useEffect(() => {
  //   if (cityIdField.value || cityNameField.value) {
  //     cityIdField.onChange('')
  //     cityNameField.onChange('')
  //     setSelectedCity(null)
  //   }
  //   // Reset cities list when province changes
  //   setCities([])
  //   setPage(1)
  //   setHasMore(true)
  // }, [provinceIdField.value])

  // Find selected city when field value changes (for initial load or external updates)
  useEffect(() => {
    if (cityIdField.value && cities.length > 0) {
      const city = cities.find((c) => c.id === cityIdField.value)
      if (city) {
        setSelectedCity(city)
      }
    } else if (!cityIdField.value) {
      setSelectedCity(null)
    }
  }, [cityIdField.value, cities])

  // Initial data load - triggered when the popover opens or search query changes
  useEffect(() => {
    if (!isProvinceSelected) return

    const loadInitialData = async () => {
      setLoading(true)
      try {
        // Pass provinceId to fetchCity function
        const data = await fetchCity(
          1,
          debouncedSearchQuery,
          provinceIdField.value
        )
        if (data) {
          setCities(data.results)
          setHasMore(data.results.length < data.total)
          setPage(1)
        } else {
          setCities([])
          setHasMore(false)
        }
      } catch (error) {
        console.error('Error fetching cities:', error)
        setCities([])
        setHasMore(false)
        setError(
          error instanceof Error ? error : new Error('Failed to fetch cities')
        )
      } finally {
        setLoading(false)
        setInitialLoading(false)
      }
    }

    loadInitialData()
  }, [debouncedSearchQuery, open, isProvinceSelected, provinceIdField.value])

  // Load more function for infinite scroll
  const loadMoreCities = useCallback(async () => {
    if (loading || !hasMore || !isProvinceSelected) return

    setLoading(true)
    try {
      const nextPage = page + 1
      // Pass provinceId to fetchCity function
      const data = await fetchCity(
        nextPage,
        debouncedSearchQuery,
        provinceIdField.value
      )

      if (data && data.results.length > 0) {
        setCities((prev) => [...prev, ...data.results])
        setPage(nextPage)
        setHasMore(cities.length + data.results.length < data.total)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error loading more cities:', error)
      setHasMore(false)
      setError(
        error instanceof Error ? error : new Error('Failed to load more cities')
      )
    } finally {
      setLoading(false)
    }
  }, [
    page,
    loading,
    hasMore,
    debouncedSearchQuery,
    cities.length,
    isProvinceSelected,
    provinceIdField.value,
  ])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle city selection - Now sends both city ID and name
  const handleSelectCity = (city: City) => {
    cityIdField.onChange(city.id) // Send city ID to form
    cityNameField.onChange(city.name) // Send city name to form
    setSelectedCity(city)
    setOpen(false)
  }

  return (
    <div className="w-full">
      <FormLabel className="text-s-medium text-neutral-900">
        Kota Asal <span className="text-error-500">*</span>
      </FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={!isProvinceSelected}
          className={`mt-2 flex w-full items-center justify-between rounded-full border border-neutral-200 px-4 py-2.5 text-left ${
            !isProvinceSelected
              ? 'cursor-not-allowed bg-neutral-50 opacity-50'
              : 'cursor-pointer hover:bg-neutral-50'
          }`}
        >
          <span
            className={`${!cityIdField.value ? 'text-neutral-300' : 'text-neutral-900'} text-m-regular`}
          >
            {!isProvinceSelected
              ? 'Pilih provinsi terlebih dahulu'
              : selectedCity?.name || 'Pilih kota asal'}
          </span>
          {open ? (
            <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <div className="max-w-[400px] min-w-[300px] px-4 pt-4">
            {/* Make sure the Input is properly controlled with both value and onChange */}
            <Input
              className="mb-3 py-2"
              placeholder="Cari Kota"
              endIcon={<SearchIcon size={18} className="text-neutral-900" />}
              onChange={handleSearchChange}
              value={searchQuery}
            />

            <div className="scrollbar-hide h-60 max-h-60 overflow-y-auto">
              {/* Province not selected message */}
              {!isProvinceSelected ? (
                <div className="grid h-60 place-content-center p-3 text-center text-neutral-500">
                  Pilih provinsi terlebih dahulu
                </div>
              ) : (
                <>
                  {/* Error handling */}
                  {error && (
                    <div className="grid h-60 place-content-center p-3 text-center text-red-500">
                      Gagal memuat data kota. Silakan coba lagi.
                    </div>
                  )}

                  {/* Loading state */}
                  {initialLoading ? (
                    <CitySkeletonList count={5} />
                  ) : loading && cities.length === 0 ? (
                    <div className="grid h-60 place-content-center p-3 text-center text-neutral-500">
                      Memuat data...
                    </div>
                  ) : cities.length > 0 ? (
                    <InfiniteScroll
                      isLoading={loading}
                      hasMore={hasMore}
                      next={loadMoreCities}
                      threshold={0.8}
                    >
                      {cities.map((city: City) => (
                        <div
                          key={`city-${city.id}`}
                          className={`flex cursor-pointer items-center border-b border-neutral-100 px-3 py-2.5 hover:bg-neutral-100 ${dissolve} ${
                            cityIdField.value === city.id
                              ? 'bg-primary-100'
                              : ''
                          }`}
                          onClick={() => handleSelectCity(city)}
                        >
                          <div className="flex flex-col">
                            <p className="text-m-regular text-neutral-900">
                              {city.name}
                            </p>
                            <p className="text-s-regular text-neutral-500">
                              {capitalizeText(city.name)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </InfiniteScroll>
                  ) : (
                    <div className="grid h-60 place-content-center p-3 text-center text-neutral-500">
                      {searchQuery
                        ? 'Tidak ada kota yang ditemukan'
                        : 'Masukkan nama kota'}
                    </div>
                  )}

                  {/* Loading more indicator */}
                  {loading && hasMore && cities.length > 0 && (
                    <CitySkeletonList count={3} />
                  )}
                </>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Form validation error message */}
      {fieldState.error && (
        <FormMessage className="text-s-regular text-error-500 mt-1">
          {fieldState.error.message || 'Pilih kota asal terlebih dahulu'}
        </FormMessage>
      )}
    </div>
  )
}
