'use client'

import { FilterBold } from '@/components/icons/filter'
import { SortIcon } from '@/components/icons/sort'
import { SortDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/SortFilter'
import PromoTagFilter from '@/components/pages/search-packages/mobile/UT-TopbarFilter/PromoFilter-UT'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const HorizontalFilterBar = ({
  dataTagPackages,
}: {
  dataTagPackages: TagPackages[]
}) => {
  const { setTagSlug, filters } = useFilterProduct()
  const searchParams = useSearchParams()
  const updateQueryParams = useUpdateQueryParams()
  const [selectedSort, setSelectedSort] = useState<string>(
    searchParams.get('sort') || 'price-low'
  )
  const [openDrawerSort, setOpenDrawerSort] = useState(false)

  // Define itemId for sort drawer (using same ID as BottomNavigation)
  const sortItemId = 1

  // Define applyFilters function to close drawer
  const applyFilters = () => {
    setOpenDrawerSort(false)
  }

  // Define toggleDrawer function
  const toggleDrawer = () => {
    setOpenDrawerSort((prev) => !prev)
  }

  // Handle tag click - toggle active state
  const handleTagClick = (tagSlug: string) => {
    // Get current active tags from context
    const currentTags = filters?.tagSlug
      ? filters.tagSlug.split(',').filter(Boolean)
      : []

    let newActiveIds: string[]

    if (currentTags.includes(tagSlug)) {
      // Remove tag if already active
      newActiveIds = currentTags.filter((slug) => slug !== tagSlug)
    } else {
      // Add tag if not active
      newActiveIds = [...currentTags, tagSlug]
    }

    const itemsString = newActiveIds.join(',')

    // Update context
    setTagSlug(itemsString)

    // Update URL params
    if (itemsString) {
      updateQueryParams(['tS', 'page'], [itemsString, '1'])
    } else {
      // If no items selected, remove the parameter from URL
      updateQueryParams(['tS'], [''])
    }
  }

  // Helper function to check if a tag is active
  const isTagActive = (slug: string) => {
    if (!filters?.tagSlug) return false
    const activeTags = filters.tagSlug.split(',').filter(Boolean)
    return activeTags.includes(slug)
  }

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
      <Drawer open={openDrawerSort} onOpenChange={setOpenDrawerSort}>
        <DrawerTrigger asChild>
          <div className="relative flex cursor-pointer flex-col items-center justify-center px-1">
            <SortIcon size={16} />
            <p className="text-s-regular">Urutkan</p>
          </div>
        </DrawerTrigger>
        <DrawerContent className="px-4">
          <DrawerHeader className="px-0 pb-0">
            <DrawerTitle className="flex items-center justify-between px-0">
              <span className="flex items-center gap-2">
                <SortIcon size={16} />
                Urutkan
              </span>
              {!!searchParams.get('sort') && (
                <p
                  className="h-8 text-red-500"
                  onClick={() => setSelectedSort('')}
                >
                  Reset Urutkan
                </p>
              )}
            </DrawerTitle>
          </DrawerHeader>

          <SortDrawer
            applyFiltersAction={applyFilters}
            itemId={sortItemId}
            toggleDrawerAction={toggleDrawer}
            selectedSort={selectedSort}
            setSelectedSortAction={setSelectedSort}
          />
        </DrawerContent>
      </Drawer>

      {/* Divider */}
      <div className="w-px self-stretch border border-[#e5e5e5]" />

      {/* Dynamic Filter Tags */}
      <div className="scrollbar-hide flex items-center gap-1 overflow-visible overflow-x-auto whitespace-nowrap">
        {dataTagPackages.map((tag) => (
          <PromoTagFilter
            key={tag.id}
            label={tag.name}
            isActive={isTagActive(tag.slug)}
            onClick={() => handleTagClick(tag.slug)}
          />
        ))}
      </div>
    </div>
  )
}

export default HorizontalFilterBar
