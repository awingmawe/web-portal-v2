'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { LocationFilterSkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/LocationFilter/LocationSkeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DrawerFooter } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { City } from '@/constant/types/LocationProps'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import { X } from 'lucide-react'
import React, { useCallback, useMemo, useRef, useState } from 'react'

interface LocationFilterProps {
  dataLocations: City[]
  selectedLocation?: string
  onLocationChangeAction: (locationCode: string) => void
  maxInitialDisplay?: number
  isLoadingSkeleton?: boolean
}

export const LocationCheckboxFilter: React.FC<LocationFilterProps> = ({
  dataLocations,
  selectedLocation,
  onLocationChangeAction,
  maxInitialDisplay = 5,
  isLoadingSkeleton,
}) => {
  const updateQueryParams = useUpdateQueryParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [tempSelectedLocations, setTempSelectedLocations] = useState<string[]>(
    []
  )
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const { isItemSelected, handleSelectionChange } = useCheckboxSelection({
    selectedValues: selectedLocation,
    onSelectionChange: onLocationChangeAction,
    paramName: 'lC',
  })

  // Get first letter of location name
  // If name starts with "KOTA", get the initial from the word after "KOTA"
  const getInitial = (name: string): string => {
    const trimmedName = name.trim()
    const upperName = trimmedName.toUpperCase()

    // Check if the name starts with "KOTA " (with space)
    if (upperName.startsWith('KOTA ')) {
      // Get the word after "KOTA "
      const afterKota = trimmedName.substring(5).trim() // 5 = length of "KOTA "

      // Return the first letter of the word after "KOTA"
      if (afterKota.length > 0) {
        return afterKota.charAt(0).toUpperCase()
      }
    }

    if (upperName.startsWith('KABUPATEN ')) {
      // Get the word after "KABUPATEN "
      const afterKabupaten = trimmedName.substring(10).trim() // 10 = length of "KABUPATEN "

      // Return the first letter of the word after "KABUPATEN"
      if (afterKabupaten.length > 0) {
        return afterKabupaten.charAt(0).toUpperCase()
      }
    }

    // If not starting with "KOTA" or no word after "KOTA", return first letter
    return trimmedName.charAt(0).toUpperCase()
  }

  // Group locations by alphabet
  const groupedLocations = useMemo(() => {
    const locations = dataLocations.filter((loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const grouped = locations.reduce(
      (acc, location) => {
        const initial = getInitial(location.name)
        if (!acc[initial]) {
          acc[initial] = []
        }
        acc[initial].push(location)
        return acc
      },
      {} as { [key: string]: City[] }
    )

    return Object.keys(grouped)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = grouped[key]
          return acc
        },
        {} as { [key: string]: City[] }
      )
  }, [dataLocations, searchQuery])

  const alphabets = Object.keys(groupedLocations)
  const topLocations = useMemo(() => {
    const selectedIds = selectedLocation ? selectedLocation.split(',') : []

    // Case 1: No selected items
    if (selectedIds.length === 0) {
      return dataLocations.slice(0, maxInitialDisplay)
    }

    // Case 2: Has selected items

    // Step 1: Get selected locations (convert IDs to objects)
    const selectedLocs = selectedIds
      .map((id) => dataLocations.find((loc) => loc.id === id))
      .filter(Boolean) as City[]

    // Step 2: Get non-selected locations
    const nonSelectedLocs = dataLocations.filter(
      (loc) => !selectedIds.includes(loc.id)
    )

    // Step 3: Combine (selected first, then non-selected)
    const combined = [...selectedLocs, ...nonSelectedLocs]

    // Step 4: Return up to maxInitialDisplay items
    return combined.slice(0, maxInitialDisplay)
  }, [dataLocations, selectedLocation, maxInitialDisplay])

  // Get temp selected locations data (convert IDs to location objects)
  const tempSelectedLocationsData = useMemo(() => {
    if (tempSelectedLocations.length === 0) return []

    return tempSelectedLocations
      .map((id) => {
        const location = dataLocations.find((loc) => loc.id === id)
        return location
      })
      .filter(Boolean) as City[]
  }, [tempSelectedLocations, dataLocations])

  // Handle dialog open
  const handleOpenDialog = useCallback(() => {
    const currentSelected = selectedLocation ? selectedLocation.split(',') : []
    setTempSelectedLocations(currentSelected)
    setIsDialogOpen(true)
    setSearchQuery('')
  }, [selectedLocation])

  // Check if item is selected in temp state
  const isTempSelected = useCallback(
    (code: string): boolean => {
      return tempSelectedLocations.includes(code)
    },
    [tempSelectedLocations]
  )

  // Handle temp selection change
  const handleTempSelection = useCallback((code: string, checked: boolean) => {
    if (checked) {
      setTempSelectedLocations((prev) => [...prev, code])
    } else {
      setTempSelectedLocations((prev) => prev.filter((item) => item !== code))
    }
  }, [])

  // Apply selections
  const handleApply = useCallback(() => {
    const paramName = 'lC'

    // Update query params based on selection
    if (tempSelectedLocations.length > 0) {
      // If items selected, update params and reset page to 1
      updateQueryParams(
        [paramName, 'page'],
        [tempSelectedLocations.join(','), 1]
      )
    } else {
      // If no items selected, remove the parameter from URL
      updateQueryParams([paramName, 'page'], ['', 1])
    }

    // Call the parent callback
    onLocationChangeAction(tempSelectedLocations.join(','))

    // Close dialog
    setIsDialogOpen(false)
  }, [tempSelectedLocations, updateQueryParams, onLocationChangeAction])

  // Reset temp selections
  const handleReset = useCallback(() => {
    setTempSelectedLocations([])
  }, [])

  // Scroll to alphabet section
  const scrollToSection = useCallback((letter: string) => {
    const element = sectionRefs.current[letter]
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])

  if (isLoadingSkeleton) {
    return <LocationFilterSkeleton count={5} />
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {/* When there's no selected items then use regular but when there's selected items then use selected */}
        {topLocations.map((location) => (
          <Checkbox
            key={location.id}
            id={`location-${location.id}`}
            checked={isItemSelected(location.id)}
            label={location.name}
            onCheckedChange={(checked) =>
              handleSelectionChange(location.id, checked as boolean)
            }
          />
        ))}
      </div>

      {dataLocations.length > maxInitialDisplay && (
        <p
          onClick={handleOpenDialog}
          className="text-s-medium flex cursor-pointer items-center gap-1 text-neutral-500 hover:text-neutral-900"
        >
          Lihat lebih banyak
          <ArrowIcon size={24} />
        </p>
      )}

      {/* Dialog Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl px-5 py-4">
          <div className="flex h-full flex-col">
            {/* Header */}
            <DialogHeader className="pb-4">
              <DialogTitle className="hidden" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between gap-2.5">
                  <p className="text-m-regular w-full">Cari Lokasi Travel</p>

                  {/* Search Input */}
                  <div className="relative w-full">
                    <Input
                      type="text"
                      placeholder="Cari lokasi"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="py-2.5 pr-10 pl-4"
                    />
                    {searchQuery && (
                      <X
                        size={18}
                        className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                        onClick={() => setSearchQuery('')}
                      />
                    )}
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Content with Alphabet Navigation */}
            <div className="scrollbar-hide flex max-h-[500px] flex-col overflow-y-auto">
              {/* Kota Aktif - Show selected locations */}
              {tempSelectedLocationsData.length > 0 && (
                <div className="scrollbar-hide flex max-h-[200px] flex-col gap-2 overflow-y-auto border-b border-neutral-200 pb-1.5">
                  <p className="text-m-regular">Kota Aktif</p>
                  <div className="grid grid-cols-3 gap-x-2">
                    {tempSelectedLocationsData.map((location) => (
                      <Checkbox
                        classNameParent="col-span-1 pb-2.5 flex items-start"
                        key={location.id}
                        id={`active-location-${location.id}`}
                        checked={isTempSelected(location.id)}
                        label={location.name}
                        onCheckedChange={(checked) =>
                          handleTempSelection(location.id, checked as boolean)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="scrollbar-hide relative flex max-h-[500px] flex-1 justify-between overflow-y-auto">
                {/* Locations List */}
                <div className="flex flex-1 flex-col gap-4 py-4 pr-2.5">
                  {alphabets.length > 0 ? (
                    alphabets.map((letter) => (
                      <div
                        key={letter}
                        ref={(el) => {
                          if (el) {
                            sectionRefs.current[letter] = el
                          }
                        }}
                        className="flex flex-col gap-2"
                      >
                        <p className="text-m-regular">{letter}</p>
                        <div className="grid grid-cols-3 gap-x-2">
                          {groupedLocations[letter].map((location) => (
                            <Checkbox
                              classNameParent="col-span-1 pb-2.5 flex items-start"
                              key={location.id}
                              id={`dialog-location-${location.id}`}
                              checked={isTempSelected(location.id)}
                              label={location.name}
                              onCheckedChange={(checked) =>
                                handleTempSelection(
                                  location.id,
                                  checked as boolean
                                )
                              }
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-neutral-500">
                      Lokasi tidak ditemukan
                    </div>
                  )}
                </div>

                {/* Alphabet Navigation */}
                <div className="scrollbar-hide sticky top-0 flex flex-col items-center gap-1 overflow-y-auto py-4">
                  {alphabets.map((letter) => (
                    <p
                      key={letter}
                      onClick={() => scrollToSection(letter)}
                      className="text-m-regular flex h-5 cursor-pointer items-center justify-center text-neutral-400 transition-colors hover:text-neutral-900"
                    >
                      {letter}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <DrawerFooter className="px-0 pt-4 pb-0">
              <div className="ml-auto flex w-full max-w-sm flex-row justify-end gap-3">
                <Button
                  variant="outline"
                  className="border-primary-500 w-full border-2 px-10 py-3"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button className="w-full px-10 py-3" onClick={handleApply}>
                  Terapkan
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
