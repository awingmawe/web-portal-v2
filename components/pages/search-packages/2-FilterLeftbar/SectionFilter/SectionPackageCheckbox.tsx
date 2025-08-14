'use client'

import { SectionPackageSkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/SectionFilter/SectionPackageSkeleton'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import React, { useCallback, useEffect, useRef, useState } from 'react'

// Move debounce hook outside component or to a separate file
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

interface SectionPackageOptionsProps {
  dataSectionPackage: TagPackages[]
  selectedSectionPackage?: string
  onSectionPackageChangeAction: (section: string) => void
  isLoadingSkeleton?: boolean
}

export const SectionPackageOptions: React.FC<SectionPackageOptionsProps> = ({
  dataSectionPackage,
  selectedSectionPackage,
  onSectionPackageChangeAction,
  isLoadingSkeleton,
}) => {
  const updateQueryParams = useUpdateQueryParams()
  const [localSection, setLocalSection] = useState<string | undefined>(
    selectedSectionPackage
  )

  // Use ref to track if we're updating from parent to prevent circular updates
  const isUpdatingFromParent = useRef(false)

  // Get debounced value of section
  const debouncedSection = useDebounce(localSection, 500)

  // Update local section when prop changes (only if it's different)
  useEffect(() => {
    if (selectedSectionPackage !== localSection) {
      isUpdatingFromParent.current = true
      setLocalSection(selectedSectionPackage)
      // Reset the flag after state update
      setTimeout(() => {
        isUpdatingFromParent.current = false
      }, 0)
    }
  }, [selectedSectionPackage, localSection])

  // Effect to handle debounced section changes
  useEffect(() => {
    // Only trigger if:
    // 1. We have a debounced value
    // 2. It's different from the selected prop
    // 3. We're not currently updating from parent
    // 4. Local section is not undefined (to handle initial render)
    if (
      debouncedSection !== undefined &&
      debouncedSection !== selectedSectionPackage &&
      !isUpdatingFromParent.current &&
      localSection !== undefined
    ) {
      onSectionPackageChangeAction(debouncedSection)
      updateQueryParams(['section', 'page'], [debouncedSection.toString(), '1'])
    }
  }, [
    debouncedSection,
    selectedSectionPackage,
    onSectionPackageChangeAction,
    updateQueryParams,
    localSection,
  ])

  // Handle section selection
  const handleSectionChange = useCallback((value: string) => {
    if (!isUpdatingFromParent.current) {
      setLocalSection(value)
    }
  }, [])

  if (isLoadingSkeleton) {
    return <SectionPackageSkeleton count={dataSectionPackage.length || 5} />
  }

  return (
    <RadioGroup
      defaultValue={selectedSectionPackage?.toString()}
      value={localSection?.toString()}
      onValueChange={handleSectionChange}
      className="space-y-2"
    >
      {dataSectionPackage.map((section) => (
        <div
          id={`section-${section.id}`}
          key={section.id}
          className="flex items-center space-x-2"
        >
          <RadioGroupItem
            value={section.slug}
            id={`section-paket-${section.id}`}
            className="h-4 w-4"
          />
          <label
            htmlFor={`section-paket-${section.id}`}
            className="mr-1 flex cursor-pointer flex-row text-sm font-medium text-neutral-900"
          >
            {section.name}
          </label>
          <p className="text-s-regular text-neutral-500">
            ({section.activePackageCount})
          </p>
        </div>
      ))}
    </RadioGroup>
  )
}
