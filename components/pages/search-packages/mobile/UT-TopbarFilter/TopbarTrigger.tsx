'use client'

import FilterPanel from '@/components/pages/search-packages/mobile/UT-TopbarFilter/FilterContent'
import PromoTagFilter from '@/components/pages/search-packages/mobile/UT-TopbarFilter/PromoFilter-UT'
import SortFilterComponent from '@/components/pages/search-packages/mobile/UT-TopbarFilter/SortFilter-UT'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { City } from '@/constant/types/LocationProps'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'

// Skeleton Component
const HorizontalFilterSkeleton = () => {
  return (
    <div className="flex items-center gap-1 pt-3">
      {/* Filter Button Skeleton */}
      <div className="relative flex animate-pulse flex-col items-center justify-center px-1">
        <div className="h-6 w-6 rounded bg-neutral-200" />
        <div className="mt-1 h-3 w-10 rounded bg-neutral-200" />
      </div>

      {/* Sort Button Skeleton */}
      <div className="relative flex animate-pulse flex-col items-center justify-center px-1">
        <div className="h-6 w-6 rounded bg-neutral-200" />
        <div className="mt-1 h-3 w-12 rounded bg-neutral-200" />
      </div>

      {/* Divider */}
      <div className="w-px self-stretch border border-[#e5e5e5]" />

      {/* Dynamic Filter Tags Skeleton */}
      <div className="flex items-center gap-1 overflow-hidden">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="h-8 w-24 animate-pulse rounded-full bg-neutral-200"
          />
        ))}
      </div>
    </div>
  )
}

const HorizontalFilterBar = ({
  dataTagPackages,
  dataMinMax,
  dataFacility,
  dataSection,
  dataKota,
}: {
  dataTagPackages: TagPackages[]
  dataMinMax: any
  dataFacility: any
  dataSection: any
  dataKota: GenericResponse<City>
}) => {
  const { isLoadingSkeleton } = useFilterProduct()

  // Show skeleton while loading
  if (isLoadingSkeleton) {
    return <HorizontalFilterSkeleton />
  }

  return (
    <div className="flex items-center gap-1 pt-3">
      {/* Filter Button */}
      <FilterPanel
        dataMinMax={dataMinMax}
        dataFacility={dataFacility}
        dataSection={dataSection}
        dataTagPackages={dataTagPackages}
        dataKota={dataKota}
      />

      {/* Sort Button */}
      <SortFilterComponent />

      {/* Divider */}
      <div className="w-px self-stretch border border-[#e5e5e5]" />

      {/* Dynamic Filter Tags */}
      <div className="scrollbar-hide flex items-center gap-1 overflow-visible overflow-x-auto whitespace-nowrap">
        {dataTagPackages.map((tag) => (
          <PromoTagFilter key={tag.id} label={tag.name} slug={tag.slug} />
        ))}
      </div>
    </div>
  )
}

export default HorizontalFilterBar
