'use client'

import React from 'react'

interface SectionPackageSkeletonProps {
  count: number
}

export const SectionPackageSkeleton: React.FC<SectionPackageSkeletonProps> = ({
  count,
}) => {
  return (
    <div className="max-h-[200px] space-y-2 overflow-y-auto">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={`facility-skeleton-${index}`}
            className="flex items-center gap-2"
          >
            <div className="h-4 w-4 animate-pulse rounded bg-neutral-200"></div>
            <div className="h-5 w-24 animate-pulse rounded bg-neutral-200"></div>
          </div>
        ))}
    </div>
  )
}
