'use client'

import { FilterBold } from '@/components/icons/filter'
import { SortIcon } from '@/components/icons/sort'
import { Button } from '@/components/ui/button'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useCallback, useState } from 'react'

const FilterTag = ({
  label = '',
  isActive = false,
  onClick,
}: {
  label?: string
  isActive?: boolean
  onClick?: () => void
}) => {
  return (
    <Button
      variant="default"
      onClick={onClick}
      className={`
        active:bg-primary-200 rounded-full border px-2 py-1 whitespace-nowrap transition-colors
        ${
          isActive
            ? 'bg-primary-100 border-primary-500 text-s-medium '
            : 'text-s-regular border-neutral-200 bg-white'
        }
      `}
    >
      {label}
    </Button>
  )
}

const HorizontalFilterBar = ({
  dataTagPackages,
}: {
  dataTagPackages: TagPackages[]
}) => {
  // State to track active tag IDs
  const [activeTagIds, setActiveTagIds] = useState<number[]>([])

  // Handle filter button click
  const handleFilterClick = () => {
    console.log('Filter clicked')
    // Add your filter modal/dropdown logic here
  }

  // Handle sort button click
  const handleSortClick = () => {
    console.log('Sort clicked')
    // Add your sort modal/dropdown logic here
  }

  // Handle tag click - toggle active state
  const handleTagClick = useCallback((tagId: number) => {
    setActiveTagIds((prevActiveIds) => {
      let newActiveIds: number[]

      if (prevActiveIds.includes(tagId)) {
        // Remove tag if already active
        newActiveIds = prevActiveIds.filter((id) => id !== tagId)
      } else {
        // Add tag if not active
        newActiveIds = [...prevActiveIds, tagId]
      }

      return newActiveIds
    })
  }, [])

  // Helper function to check if a tag is active
  const isTagActive = (tagId: number) => activeTagIds.includes(tagId)

  // Get count of active filters for badge
  const activeFilterCount = activeTagIds.length

  return (
    <div className="flex items-center gap-1 pt-3">
      {/* Filter Button */}
      <div
        className="relative flex cursor-pointer flex-col items-center justify-center px-1"
        onClick={handleFilterClick}
      >
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
      <div
        className="relative flex cursor-pointer flex-col items-center justify-center px-1"
        onClick={handleSortClick}
      >
        <SortIcon size={16} />
        <p className="text-s-regular">Urutkan</p>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch border border-[#e5e5e5]" />

      {/* Dynamic Filter Tags */}
      <div className="scrollbar-hide flex items-center gap-1 overflow-visible overflow-x-auto whitespace-nowrap">
        {dataTagPackages.map((tag) => (
          <FilterTag
            key={tag.id}
            label={tag.name}
            isActive={isTagActive(tag.id)}
            onClick={() => handleTagClick(tag.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default HorizontalFilterBar
