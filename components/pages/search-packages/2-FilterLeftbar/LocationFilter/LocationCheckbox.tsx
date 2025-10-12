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
import { GenericResponse } from '@/constant/types/GeneralProps'
import { City } from '@/constant/types/LocationProps'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import { X } from 'lucide-react'
import React, { useMemo, useRef, useState } from 'react'

interface LocationFilterProps {
  dataLocations: GenericResponse<City>
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

    // If not starting with "KOTA" or no word after "KOTA", return first letter
    return trimmedName.charAt(0).toUpperCase()
  }

  // Group locations by alphabet
  const groupedLocations = useMemo(() => {
    const locations = dataLocations.results.filter((loc) =>
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
  }, [dataLocations.results, searchQuery])

  const alphabets = Object.keys(groupedLocations)
  const topLocations = dataLocations.results.slice(0, maxInitialDisplay)

  // Handle dialog open
  const handleOpenDialog = () => {
    const currentSelected = selectedLocation ? selectedLocation.split(',') : []
    setTempSelectedLocations(currentSelected)
    setIsDialogOpen(true)
    setSearchQuery('')
  }

  // Check if item is selected in temp state
  const isTempSelected = (code: string): boolean => {
    return tempSelectedLocations.includes(code)
  }

  // Handle temp selection change
  const handleTempSelection = (code: string, checked: boolean) => {
    if (checked) {
      setTempSelectedLocations([...tempSelectedLocations, code])
    } else {
      setTempSelectedLocations(
        tempSelectedLocations.filter((item) => item !== code)
      )
    }
  }

  // Apply selections
  const handleApply = () => {
    tempSelectedLocations.forEach((code) => {
      if (!isItemSelected(code)) {
        handleSelectionChange(code, true)
      }
    })

    const currentSelected = selectedLocation ? selectedLocation.split(',') : []
    currentSelected.forEach((code) => {
      if (!tempSelectedLocations.includes(code)) {
        handleSelectionChange(code, false)
      }
    })

    setIsDialogOpen(false)
  }

  // Reset temp selections
  const handleReset = () => {
    setTempSelectedLocations([])
  }

  // Scroll to alphabet section
  const scrollToSection = (letter: string) => {
    sectionRefs.current[letter]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  if (isLoadingSkeleton) {
    return <LocationFilterSkeleton count={5} />
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
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

      {dataLocations.results.length > maxInitialDisplay && (
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
        <DialogContent className="max-h-[85vh] max-w-2xl p-0">
          <div className="flex h-full flex-col">
            {/* Header */}
            <DialogHeader className="flex flex-row items-center justify-between gap-2.5 border-b border-neutral-200 p-4">
              <DialogTitle className="text-m-regular w-full">
                Cari Lokasi Travel
              </DialogTitle>

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
                    className=" absolute top-1/2 right-3 -translate-y-1/2 transform"
                    onClick={() => setSearchQuery('')}
                  />
                )}
              </div>
            </DialogHeader>

            {/* Content with Alphabet Navigation */}
            <div className="flex max-h-[500px] flex-1 justify-between">
              {/* Locations List */}
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
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
                      <div className="grid grid-cols-3 space-y-2.5">
                        {groupedLocations[letter].map((location) => (
                          <Checkbox
                            className="col-span-1"
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
              <div className="flex w-12 flex-col items-center overflow-y-auto py-4">
                {alphabets.map((letter) => (
                  <p
                    key={letter}
                    onClick={() => scrollToSection(letter)}
                    className="text-m-regular flex h-8 w-8 cursor-pointer items-center justify-center text-neutral-400 transition-colors hover:text-neutral-900"
                  >
                    {letter}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <DrawerFooter className="border-t border-neutral-200 p-4">
              <div className="ml-auto flex w-full max-w-sm flex-row justify-end gap-3 ">
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
