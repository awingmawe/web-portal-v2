'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks'
import React from 'react'

interface TagPackageOptionsProps {
  dataTagPackage: TagPackages[]
  selectedTagPackage?: string
  onTagPackageChange: (tagSlug: string) => void
}

export const TagPackageOptions: React.FC<TagPackageOptionsProps> = ({
  dataTagPackage,
  selectedTagPackage,
  onTagPackageChange,
}) => {
  const { isItemSelected, handleSelectionChange } = useCheckboxSelection({
    selectedValues: selectedTagPackage,
    onSelectionChange: onTagPackageChange,
    paramName: 'tS',
  })

  // if (isLoadingSkeleton) {
  //   return <TagPackageSkeleton count={dataTagPackage.length || 5} />
  // }

  return (
    <div className="max-h-[200px] space-y-2 overflow-y-auto">
      {dataTagPackage.map((tagSlug) => (
        <Checkbox
          id={`tagSlug-${tagSlug.id}`}
          key={tagSlug.id}
          checked={isItemSelected(tagSlug.slug)}
          label={tagSlug.name}
          description={tagSlug.activePackageCount}
          onCheckedChange={(checked) =>
            handleSelectionChange(tagSlug.slug, checked as boolean)
          }
        />
      ))}
    </div>
  )
}
