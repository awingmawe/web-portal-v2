'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PriceParams } from '@/constant/types/PackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import React from 'react'
import { PriceRangeSlider } from './PriceRangeSlider'

interface PriceRangeFilterProps {
  dataMinMax: PriceParams
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ dataMinMax }) => {
  const { filters, setHargaMax, setHargaMin, resetFilter, isLoadingSkeleton } =
    useFilterProduct()

  // Handle reset click with event stopping
  const handleResetClick = (e: React.MouseEvent) => {
    // Stop the event from bubbling up to the accordion trigger
    e.stopPropagation()

    // Reset both price filters at once
    resetFilter('priceRange', { min: dataMinMax.min, max: dataMinMax.max })
  }

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between">
          <p className="text-l-medium text-neutral-900">Harga</p>
          <span
            className="text-s-medium text-error-500 cursor-pointer"
            onClick={handleResetClick}
          >
            Reset Harga
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <PriceRangeSlider
          minMax={dataMinMax}
          filters={filters}
          setHargaMin={setHargaMin}
          setHargaMax={setHargaMax}
          isLoadingSkeleton={isLoadingSkeleton}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default React.memo(PriceRangeFilter)
