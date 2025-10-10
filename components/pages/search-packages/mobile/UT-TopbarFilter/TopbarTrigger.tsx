'use client'

import { FilterBold } from '@/components/icons/filter'
import PromoTagFilter from '@/components/pages/search-packages/mobile/UT-TopbarFilter/PromoFilter-UT'
import SortFilterComponent from '@/components/pages/search-packages/mobile/UT-TopbarFilter/SortFilter-UT'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'

const HorizontalFilterBar = ({
  dataTagPackages,
}: {
  dataTagPackages: TagPackages[]
}) => {
  const { setTagSlug, filters } = useFilterProduct()

  // Get count of active filters for badge
  const activeFilterCount = filters?.tagSlug
    ? filters.tagSlug.split(',').filter(Boolean).length
    : 0

  return (
    <div className="flex items-center gap-1 pt-3">
      {/* Filter Button */}
      <div className="relative flex cursor-pointer flex-col items-center justify-center px-1">
        <FilterBold />
        <p className="text-s-regular">Filter</p>
        {/* Notification Badge - shows active filter count */}
        {activeFilterCount > 0 && (
          <span className="bg-primary-500 text-xs-regular absolute -top-2 right-0 flex h-4 w-4 items-center justify-center rounded-full text-white">
            {activeFilterCount}
          </span>
        )}
      </div>

      {/* Sort Button */}
      <SortFilterComponent />

      {/* Divider */}
      <div className="w-px self-stretch border border-[#e5e5e5]" />

      {/* Dynamic Filter Tags */}
      <div className="scrollbar-hide flex items-center gap-1 overflow-visible overflow-x-auto whitespace-nowrap">
        {dataTagPackages.map((tag) => (
          <PromoTagFilter
            key={tag.id}
            label={tag.name}
            slug={tag.slug}
            setTagSlug={setTagSlug}
            filters={filters}
          />
        ))}
      </div>
    </div>
  )
}

export default HorizontalFilterBar
