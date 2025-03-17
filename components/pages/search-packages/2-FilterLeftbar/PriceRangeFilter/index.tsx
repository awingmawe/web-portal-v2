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
  const { filters, setHargaMax, setHargaMin, isLoadingSkeleton } =
    useFilterProduct()

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <p className="text-l-medium text-neutral-900">Harga</p>
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
