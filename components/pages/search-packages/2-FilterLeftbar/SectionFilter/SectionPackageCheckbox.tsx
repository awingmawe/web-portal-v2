'use client'

import { SectionPackageSkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/SectionFilter/SectionPackageSkeleton'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import React, { useCallback, useEffect, useState } from 'react'

interface SectionPackageOptionsProps {
  dataSectionPackage: TagPackages[]
  selectedSectionPackage?: string
  onSectionPackageChange: (section: string) => void
  isLoadingSkeleton?: boolean
}

export const SectionPackageOptions: React.FC<SectionPackageOptionsProps> = ({
  dataSectionPackage,
  selectedSectionPackage,
  onSectionPackageChange,
  isLoadingSkeleton,
}) => {
  const updateQueryParams = useUpdateQueryParams()
  const [localSection, setLocalSection] = useState<string | undefined>(
    selectedSectionPackage
  )

  // Update local rating when prop changes
  useEffect(() => {
    setLocalSection(selectedSectionPackage)
  }, [selectedSectionPackage])

  // Custom debounce hook
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
  // Get debounced value of rating
  const debouncedSection = useDebounce(localSection, 500)

  // Effect to handle debounced rating changes
  useEffect(() => {
    if (
      debouncedSection !== undefined &&
      debouncedSection !== selectedSectionPackage
    ) {
      onSectionPackageChange(debouncedSection)
      updateQueryParams(['section'], [debouncedSection.toString()])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSection])

  // Handle star selection
  const handleSectionChange = useCallback((value: string) => {
    setLocalSection(value)
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
