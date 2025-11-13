'use client'

import { ProviderOptions } from '@/components/pages/search-packages/2-FilterLeftbar/ProviderFilter/ProviderCheckbox'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Provider } from '@/constant/types/Providers'
import { useFilterProduct } from '@/contexts/filter-product-context'
import React from 'react'

interface ProviderFilterProps {
  dataProvider: Provider[]
}

const ProviderFilter: React.FC<ProviderFilterProps> = ({ dataProvider }) => {
  const { filters, setProviderId, resetFilter, isLoadingSkeleton } =
    useFilterProduct()

  // Handle reset click with event stopping
  const handleResetClick = (e: React.MouseEvent) => {
    // Stop the event from bubbling up to the accordion trigger
    e.stopPropagation()

    // Reset the specific filter
    resetFilter('providerId')
  }

  return (
    <AccordionItem value="item-5">
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between">
          <p className="text-l-medium text-neutral-900">Mitra Pembiayaan</p>
          <span
            className="text-s-medium text-error-500 cursor-pointer"
            onClick={handleResetClick}
          >
            Reset Mitra Pembiayaan
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ProviderOptions
          dataProvider={dataProvider}
          selectedProvider={filters.providerId}
          onProviderChangeAction={setProviderId}
          isLoadingSkeleton={isLoadingSkeleton}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default React.memo(ProviderFilter)
