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
  const { filters, setTagSlug, isLoadingSkeleton } = useFilterProduct()

  return (
    <AccordionItem value="item-5">
      <AccordionTrigger>
        <p className="text-l-medium text-neutral-900">Promo & Diskon</p>
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
