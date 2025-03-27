'use client'

import { OthersFacilities } from '@/constant/types/FacilityProps'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Memoized component for a single facility item
const FacilityItem = React.memo(({ item }: { item: string }) => (
  <div className="flex items-center gap-1 max-lg:pl-2">
    <div className="h-1 w-1 rounded-full bg-neutral-900" />
    <p className="text-m-regular text-neutral-900">{item}</p>
  </div>
))

FacilityItem.displayName = 'FacilityItem'

// Memoized component for a facility category
const FacilityCategory = React.memo(
  ({ label, items }: { label: string; items: string[] }) => (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-4 max-lg:col-span-12">
        <p className="text-l-semibold text-neutral-900 max-lg:text-sm max-lg:leading-5">
          {label}
        </p>
      </div>
      <div className="col-span-8 border-b border-neutral-200 pb-6 max-lg:col-span-12">
        <div className="grid grid-cols-3 gap-x-3 gap-y-13 max-lg:grid-cols-2 max-lg:gap-y-3 max-sm:grid-cols-1">
          {items.map((item, idx) => (
            <FacilityItem key={`item-${idx}-${item}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
)

FacilityCategory.displayName = 'FacilityCategory'

export const OtherFacilities = ({
  otherFacilities = [],
}: {
  otherFacilities: OthersFacilities[]
}) => {
  const [shouldTruncate, setShouldTruncate] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Calculate total items with memoization
  const totalItems = useMemo(
    () =>
      otherFacilities?.reduce(
        (total, facility) => total + (facility.items?.length || 0),
        0
      ) || 0,
    [otherFacilities]
  )

  // Determine if we should truncate based on total number of items
  const checkTruncation = useCallback(() => {
    setShouldTruncate(totalItems > 12)
  }, [totalItems])

  useEffect(() => {
    checkTruncation()
  }, [checkTruncation])

  // Function to calculate max items to show while keeping categories together
  const visibleFacilities = useMemo(() => {
    if (!shouldTruncate || !otherFacilities) return otherFacilities || []

    const visibleFacs: OthersFacilities[] = []
    let itemCount = 0

    // Add categories until we reach 12 items
    for (const facility of otherFacilities) {
      const itemsLength = facility.items?.length || 0

      // If adding this category would exceed 12 items and we already have some items, stop
      if (itemCount + itemsLength > 12 && itemCount > 0) {
        break
      }

      // Otherwise, add this category
      visibleFacs.push(facility)
      itemCount += itemsLength
    }

    return visibleFacs
  }, [otherFacilities, shouldTruncate])

  // If no facilities, don't render anything
  if (!otherFacilities?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-6" ref={contentRef}>
      {visibleFacilities.map((facility, index) => (
        <FacilityCategory
          key={`facility-${facility.label}-${index}`}
          label={facility.label}
          items={facility.items || []}
        />
      ))}

      {/* Gradient overlay when truncated */}
      {shouldTruncate && (
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[173px] bg-gradient-to-t from-white to-transparent" />
      )}
    </div>
  )
}
