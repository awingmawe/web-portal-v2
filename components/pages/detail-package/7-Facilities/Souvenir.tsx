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
import { OthersFacilities } from '@/constant/types/FacilityProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { ChevronRight, X } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Memoized component for a single facility item
const FacilityItem = React.memo(({ item }: { item: string }) => (
  <div className="flex items-center gap-1 max-lg:pl-2 lg:break-all">
    <div className="h-1 min-h-1.5 w-1 min-w-1.5 flex-shrink-0 rounded-full bg-neutral-900" />
    <p className="text-m-regular text-neutral-900">{item}</p>
  </div>
))

FacilityItem.displayName = 'FacilityItem'

// Individual facility category component with its own truncation
const FacilityCategory = React.memo(
  ({
    label,
    items,
    maxItems = 12,
  }: {
    label: string
    items: string[]
    maxItems?: number
  }) => {
    const [shouldTruncate, setShouldTruncate] = useState(false)
    const { lg } = useTailwindBreakpoint()
    const contentRef = useRef<HTMLDivElement>(null)

    // Check if truncation is needed
    const checkTruncation = useCallback(() => {
      setShouldTruncate(items.length > maxItems)
    }, [items.length, maxItems])

    useEffect(() => {
      checkTruncation()
    }, [checkTruncation])

    // Get visible items (truncated or full)
    const visibleItems = useMemo(
      () => (shouldTruncate ? items.slice(0, maxItems) : items),
      [items, shouldTruncate, maxItems]
    )

    // Dialog content showing all items
    const dialogContent = useMemo(
      () => (
        <div className="grid grid-cols-3 gap-x-3 gap-y-13 max-lg:grid-cols-2 max-lg:gap-y-3 max-sm:grid-cols-1">
          {items.map((item, idx) => (
            <FacilityItem key={`dialog-item-${idx}-${item}`} item={item} />
          ))}
        </div>
      ),
      [items]
    )

    // Drawer content showing all items
    const drawerContent = useMemo(
      () => (
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 max-sm:grid-cols-1">
          {items.map((item, idx) => (
            <FacilityItem key={`drawer-item-${idx}-${item}`} item={item} />
          ))}
        </div>
      ),
      [items]
    )

    return (
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4 max-lg:col-span-12">
          <p className="text-l-semibold text-neutral-900 max-lg:text-sm max-lg:leading-5">
            {label}
          </p>
        </div>
        <div className="col-span-8 border-b border-neutral-200 pb-6 max-lg:col-span-12">
          <div className="relative">
            <div ref={contentRef} className="overflow-hidden">
              <div className="grid grid-cols-3 gap-x-3 gap-y-13 max-lg:grid-cols-2 max-lg:gap-y-3 max-sm:grid-cols-1">
                {visibleItems.map((item, idx) => (
                  <FacilityItem key={`item-${idx}-${item}`} item={item} />
                ))}
              </div>
            </div>

            {/* Gradient overlay when truncated */}
            {shouldTruncate && (
              <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[173px] bg-gradient-to-t from-white to-transparent" />
            )}

            {/* Show more buttons for this category */}
            {shouldTruncate && (
              <>
                {/* Desktop dialog */}
                {!lg && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="text-s-medium mt-2 mb-2.5 ml-auto flex w-fit cursor-pointer items-center gap-0.5 text-[#000] underline">
                        Lihat Seluruh Fasilitas
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-5 border-0 p-8 outline-0 md:max-w-[620px]">
                      <DialogHeader className="flex flex-row justify-between">
                        <DialogTitle className="text-xl font-semibold">
                          {label}
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
                {lg && (
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
                              {label}
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
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
)

FacilityCategory.displayName = 'FacilityCategory'

export const OtherFacilities = ({
  otherFacilities = [],
}: {
  otherFacilities: OthersFacilities[]
}) => {
  // If no facilities, don't render anything
  if (!otherFacilities?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      {otherFacilities.map((facility, index) => (
        <FacilityCategory
          key={`facility-${facility.label}-${index}`}
          label={facility.label}
          items={facility.items || []}
          maxItems={12}
        />
      ))}
    </div>
  )
}
