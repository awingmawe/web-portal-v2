'use client'

import { SectionPackageOptions } from '@/components/pages/search-packages/2-FilterLeftbar/SectionFilter/SectionPackageCheckbox'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import React from 'react'

interface SectionPackageFilterProps {
  dataSectionPackage: TagPackages[]
}

const SectionPackagesFilter: React.FC<SectionPackageFilterProps> = ({
  dataSectionPackage,
}) => {
  const { filters, setSection, resetFilter, isLoadingSkeleton } =
    useFilterProduct()

  // Handle reset click with event stopping
  const handleResetClick = (e: React.MouseEvent) => {
    // Stop the event from bubbling up to the accordion trigger
    e.stopPropagation()

    // Reset the specific filter
    resetFilter('section')
  }

  return (
    <AccordionItem value="item-4">
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between">
          <p className="text-l-medium text-neutral-900">Tipe Paket</p>
          <span
            className="text-s-medium text-error-500 cursor-pointer"
            onClick={handleResetClick}
          >
            Reset Paket
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <SectionPackageOptions
          dataSectionPackage={dataSectionPackage}
          selectedSectionPackage={filters.section}
          onSectionPackageChangeAction={setSection}
          isLoadingSkeleton={isLoadingSkeleton}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default React.memo(SectionPackagesFilter)
