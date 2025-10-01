'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Facility } from '@/constant/types/FacilityProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Memoized component for a single facility item
const FacilityItem = React.memo(({ facility }: { facility: Facility }) => (
  <div className="flex items-center gap-2">
    <Image
      src={facility.image}
      alt={facility.code}
      width={20}
      height={20}
      className="aspect-square object-contain"
    />
    <p className="text-m-regular text-neutral-900">{facility.name}</p>
  </div>
))

FacilityItem.displayName = 'FacilityItem'

// Memoized component for a row of facilities in the dialog
const FacilityRow = React.memo(
  ({
    facilities,
    isLastRow,
  }: {
    facilities: Facility[]
    isLastRow: boolean
  }) => (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 gap-x-3 gap-y-3 pb-5 sm:grid-cols-2 md:grid-cols-3">
        {facilities.map((facility) => (
          <FacilityItem
            key={`facility-dialog-${facility.code}`}
            facility={facility}
          />
        ))}
      </div>
      {/* Add divider after each row except the last */}
      {!isLastRow && <div className="my-6 h-[1px] w-full bg-[#e5e5e5]" />}
    </div>
  )
)

FacilityRow.displayName = 'FacilityRow'

export const Facilities = ({ facilities = [] }: { facilities: Facility[] }) => {
  const [shouldTruncate, setShouldTruncate] = useState(false)
  const { lg } = useTailwindBreakpoint()
  const contentRef = useRef<HTMLDivElement>(null)

  // Create a memoized truncate check function
  const checkTruncate = useCallback(() => {
    setShouldTruncate(facilities?.length > 12)
  }, [facilities?.length])

  // Check truncation on facilities change or initial load
  useEffect(() => {
    checkTruncate()
  }, [facilities, checkTruncate])

  // Memoize visible facilities to avoid recalculation on every render
  const visibleFacilities = useMemo(
    () => (shouldTruncate ? facilities?.slice(0, 12) : facilities),
    [facilities, shouldTruncate]
  )

  // Memoize facility rows for dialog to avoid recreation on every render
  const dialogRows = useMemo(() => {
    const rows = []
    const colsPerRow = 3

    if (!facilities) return []

    for (let i = 0; i < facilities.length; i += colsPerRow) {
      rows.push(facilities.slice(i, i + colsPerRow))
    }

    return rows
  }, [facilities])

  // Render facilities grid with proper memoization
  const facilitiesGrid = useMemo(
    () => (
      <div className="grid grid-cols-3 gap-x-3 gap-y-13 max-lg:grid-cols-2 max-lg:gap-y-3 max-sm:grid-cols-1">
        {visibleFacilities?.map((facility) => (
          <FacilityItem key={`facility-${facility.code}`} facility={facility} />
        ))}
      </div>
    ),
    [visibleFacilities]
  )

  // Memoized dialog content to avoid recreation on every render
  const dialogContent = useMemo(
    () => (
      <div className="flex flex-col">
        {dialogRows.map((row, rowIndex) => (
          <FacilityRow
            key={`row-${rowIndex}`}
            facilities={row}
            isLastRow={rowIndex === dialogRows.length - 1}
          />
        ))}
      </div>
    ),
    [dialogRows]
  )

  // Memoized drawer content to avoid recreation on every render
  const drawerContent = useMemo(
    () => (
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 max-sm:grid-cols-1">
        {facilities?.map((facility) => (
          <FacilityItem
            key={`facility-drawer-${facility.code}`}
            facility={facility}
          />
        ))}
      </div>
    ),
    [facilities]
  )

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-4 max-lg:col-span-12">
        <p className="text-l-semibold text-neutral-900 max-lg:text-sm max-lg:leading-5">
          Fasilitas
        </p>
      </div>
      <div className="col-span-8 border-b border-neutral-200 pb-6 max-lg:col-span-12">
        <div className="relative">
          <div ref={contentRef} className="overflow-hidden">
            {facilitiesGrid}
          </div>

          {/* Gradient overlay when truncated */}
          {shouldTruncate && (
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[173px] bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {/* Desktop dialog */}
        {shouldTruncate && !lg && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="text-s-medium mt-2 mb-2.5 ml-auto flex w-fit cursor-pointer items-center gap-0.5 text-[#000] underline">
                Lihat Seluruh Fasilitas
              </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-5 border-0 p-8 outline-0 md:max-w-[620px]">
              <DialogHeader className="flex flex-row justify-between">
                <DialogTitle className="text-xl font-semibold">
                  Daftar Fasilitas
                </DialogTitle>
                <DialogClose className="inline-flex w-fit">
                  <X />
                </DialogClose>
              </DialogHeader>
              <div className="overflow-y-auto">{dialogContent}</div>
              <DialogClose className="text-s-regular bg-primary-500 ml-auto inline-block rounded-full px-10 py-3">
                Tutup
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}

        {/* Mobile drawer */}
        {shouldTruncate && lg && (
          <Drawer>
            <DrawerTrigger asChild>
              <button className="text-s-medium mt-2 flex items-center gap-0.5 text-[#000] underline">
                Lihat Selengkapnya
                <ChevronRight size={16} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="border-0 outline-0">
              <DrawerHeader className="p-3">
                <DrawerTitle className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="bg-primary-500 h-auto w-[6px] rounded-full" />
                    <p className="heading-3-semibold font-semibold max-lg:text-sm max-lg:leading-5">
                      Fasilitas
                    </p>
                  </div>
                  <DrawerClose>
                    <X className="text-primary-900" />
                  </DrawerClose>
                </DrawerTitle>
              </DrawerHeader>
              <div className="max-h-[70vh] overflow-y-auto px-4 pb-4">
                {drawerContent}
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  )
}
