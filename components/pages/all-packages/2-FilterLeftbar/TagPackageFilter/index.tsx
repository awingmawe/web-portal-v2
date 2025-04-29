'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import React from 'react'
import { TagPackageOptions } from './TagPackageCheckbox'

interface TagPackageFilterProps {
  dataTagPackage: TagPackages[]
}

const TagPackagesFilter: React.FC<TagPackageFilterProps> = ({
  dataTagPackage,
}) => {
  const { filters, setTagSlug, resetFilter, isLoadingSkeleton } =
    useFilterProduct()

  // Handle reset click with event stopping
  const handleResetClick = (e: React.MouseEvent) => {
    // Stop the event from bubbling up to the accordion trigger
    e.stopPropagation()

    // Reset the specific filter
    resetFilter('tagSlug')
  }

  return (
    <AccordionItem value="item-5">
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between">
          <p className="text-l-medium text-neutral-900">Promo & Diskon</p>
          <span
            className="text-s-medium text-error-500 cursor-pointer"
            onClick={handleResetClick}
          >
            Reset Promo
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <TagPackageOptions
          dataTagPackage={dataTagPackage}
          selectedTagPackage={filters.tagSlug}
          onTagPackageChange={setTagSlug}
          isLoadingSkeleton={isLoadingSkeleton}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default React.memo(TagPackagesFilter)
